import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Avatar from '@mui/material/Avatar'
import Collapse from '@mui/material/Collapse'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItemText'
import ListItemButton from '@mui/material/ListItemButton'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp'
import ListIcon from '@mui/icons-material/List'
import {
  getArtistInfo,
  getPlaylistInfo,
  logout,
} from '../../../redux/actions/actions'

const Navbar = () => {
  const dispatch = useDispatch()

  const myProfile = useSelector((state) => state.myProfile)
  const { myProfileInfo } = myProfile

  const myPlaylists = useSelector((state) => state.myPlaylists)
  const { myPlaylistsInfo } = myPlaylists

  const playlist = useSelector((state) => state.playlist)
  const { playlistInfo } = playlist

  const [openProfile, setOpenProfile] = useState(false)
  const [openPlaylists, setOpenPlaylists] = useState(false)

  const handleProfile = () => {
    setOpenProfile(!openProfile)
  }

  const handlePlaylistsMenu = () => {
    setOpenPlaylists(!openPlaylists)
  }

  const handleLogout = () => {
    dispatch(logout())
  }

  const changePlaylist = (playlist) => {
    dispatch(getPlaylistInfo(playlist?.id))
    dispatch(getArtistInfo(playlist?.owner?.id))
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        color='transparent'
        sx={{ boxShadow: 'none', padding: '0px 20px' }}
      >
        <Toolbar sx={{ position: 'relative' }}>
          <IconButton
            size='small'
            edge='start'
            color='white'
            disableRipple
            sx={{ mr: 1, backgroundColor: '#1c3e3c' }}
            onClick={handlePlaylistsMenu}
          >
            <ListIcon fontSize='small' />
          </IconButton>

          <Typography
            variant='h2'
            noWrap
            component='div'
            color='white'
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
            {playlistInfo?.name}
          </Typography>
          <Collapse in={openPlaylists} timeout='auto' unmountOnExit>
            <List
              disablePadding
              sx={{
                position: 'absolute',
                width: '200px',
                top: '55px',
                left: '20px',
                backgroundColor: '#282828',
                borderRadius: '3px',
              }}
            >
              <ListItem>
                {myPlaylistsInfo?.items.map((playlist) => (
                  <ListItemButton
                    key={playlist.id}
                    disableRipple
                    sx={{
                      borderRadius: '3px',
                      margin: '5px 5px',
                      '&:hover': {
                        backgroundColor: '#3e3e3e',
                      },
                    }}
                    onClick={() => changePlaylist(playlist)}
                  >
                    <Typography color='white' variant='body2'>
                      {playlist?.name}
                    </Typography>
                  </ListItemButton>
                ))}
              </ListItem>
            </List>
          </Collapse>
          <Box
            sx={{
              width: '118px',
              height: '35px',
              backgroundColor: '#1c3e3c',
              borderRadius: '35px',
              display: 'flex',
              alignItems: 'center',
              cursor: 'pointer',
              position: 'relative',
              '&:hover': {
                backgroundColor: '#282828',
              },
            }}
            onClick={handleProfile}
          >
            <Avatar
              sx={{
                width: '30px',
                height: '30px',
                marginLeft: '2px',
                marginRight: '10px',
                backgroundColor: '#535353',
              }}
              src={myProfileInfo?.images[0]?.url}
            />
            <Typography variant='h4' textTransform='none' sx={{ mr: 0.5 }}>
              {myProfileInfo?.display_name}
            </Typography>
            {openProfile ? (
              <ArrowDropUpIcon color='white' />
            ) : (
              <ArrowDropDownIcon color='white' />
            )}
          </Box>
          <Collapse in={openProfile} timeout='auto' unmountOnExit>
            <List
              disablePadding
              sx={{
                position: 'absolute',
                width: '180px',
                top: '57px',
                right: '25px',
                backgroundColor: '#282828',
                borderRadius: '3px',
              }}
            >
              <ListItem
                sx={{
                  borderRadius: '3px',
                  margin: '5px 5px',
                  '&:hover': {
                    backgroundColor: '#3e3e3e',
                  },
                }}
              >
                <ListItemButton onClick={handleLogout} disableRipple>
                  <Typography color='white' variant='body2'>
                    Log out
                  </Typography>
                </ListItemButton>
              </ListItem>
            </List>
          </Collapse>
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default Navbar
