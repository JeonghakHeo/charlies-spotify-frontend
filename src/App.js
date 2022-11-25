import axios from 'axios'
import './App.css'
import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import Main from './layout/Main/Main'
import Spinner from './layout/components/utils/Spinner/Spinner'
import connectPlayer from './redux/actions/connectPlayer'

const App = () => {
  const dispatch = useDispatch()

  const [token, setToken] = useState(null)

  const player = useSelector((state) => state.player)
  const { loading } = player

  const params = new URLSearchParams(window.location.search)

  const getToken = async () => {
    try {
      const data = await axios.get(
        `/api/auth/callback?code=${params.get('code')}&state=${params.get(
          'state'
        )}`
      )
      setToken(data?.data?.access_token)
      localStorage.setItem('token', JSON.stringify(data?.data?.access_token))
    } catch (error) {
      console.log(error)
    }
  }

  if (!token || (token === null && params.has('code') && params.has('state'))) {
    getToken()
  }

  const getRedirectUrl = async () => {
    try {
      const { data } = await axios.get('/api/auth/login')
      window.location.replace(data.redirectUrl)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (token) {
      dispatch(connectPlayer(token))
    }
  }, [dispatch, token])

  const Login = () => {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '90vh',
        }}
      >
        <Button
          variant='contained'
          sx={{
            backgroundColor: '#1DB954',
            color: '#000',
            borderRadius: '500px',
            '&:hover': {
              backgroundColor: '#1ED760',
            },
          }}
          onClick={getRedirectUrl}
        >
          Login with Spotify
        </Button>
      </Box>
    )
  }

  return (
    <>
      {token || (JSON.parse(localStorage.getItem('token')) && !loading) ? (
        <Main />
      ) : loading && token ? (
        <Spinner />
      ) : !token ? (
        <Login />
      ) : (
        ''
      )}
    </>
  )
}

export default App
