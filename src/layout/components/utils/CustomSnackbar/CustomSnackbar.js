import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import Alert from '@mui/material/Alert'
import Snackbar from '@mui/material/Snackbar'
import {
  LIKE_SONG_RESET,
  UNLIKE_SONG_RESET,
} from '../../../../redux/constants/playerConstants'

const CustomSnackbar = ({ like, unlike }) => {
  const [open, setOpen] = useState(false)

  const dispatch = useDispatch()

  useEffect(() => {
    if (like) {
      setOpen(like)
      setTimeout(() => {
        setOpen(false)
      }, 3000)
      setTimeout(() => {
        dispatch({ type: LIKE_SONG_RESET })
      }, 3300)
    } else if (unlike) {
      setOpen(unlike)
      setTimeout(() => {
        setOpen(false)
      }, 3000)
      setTimeout(() => {
        dispatch({ type: UNLIKE_SONG_RESET })
      }, 3300)
    }
  }, [like, unlike, dispatch])

  return (
    <React.Fragment>
      <Snackbar
        open={open}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          variant='filled'
          severity='info'
          icon={false}
          sx={{
            margin: '0px 0px 80px 23px',
          }}
        >
          {like && 'Added to Liked Songs'}
          {unlike && 'Removed from Liked Songs'}
        </Alert>
      </Snackbar>
    </React.Fragment>
  )
}

export default CustomSnackbar
