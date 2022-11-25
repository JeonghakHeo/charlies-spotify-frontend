import React from 'react'
import { useSelector } from 'react-redux'
import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import PlaylistCover from '../PlaylistCover/PlaylistCover'

const PlaylistInfo = () => {
  const playlist = useSelector((state) => state.playlist)
  const { playlistInfo } = playlist

  const artist = useSelector((state) => state.artist)
  const { artistInfo } = artist

  const totalPlaylistDurationMs = playlistInfo?.tracks?.items
    ?.map((item) => item?.track?.duration_ms)
    .filter((duration) => duration !== undefined)
    .reduce((previousValue, currentValue) => previousValue + currentValue)

  const formatTime = (ms) => {
    const seconds = Math.floor((ms / 1000) % 60)
    const minutes = Math.floor((ms / 1000 / 60) % 60)
    const hours = Math.floor((ms / 1000 / 60 / 60) % 24)

    return [
      hours.toString().padStart(2, '0'),
      minutes.toString().padStart(2, '0'),
      seconds.toString().padStart(2, '0'),
    ].join(':')
  }

  const totalPlaylistDuration = formatTime(totalPlaylistDurationMs)

  return (
    <>
      <Grid container sx={{ height: '100%' }}>
        <Grid item xs={2} sx={{ width: '100%' }}>
          <Box sx={{ width: '100%', height: '100%' }}>
            <PlaylistCover image={playlistInfo?.images[0]?.url} />
          </Box>
        </Grid>

        <Grid container item xs={10}>
          <Box
            sx={{
              width: '100%',
              padding: '30px 30px 0px 30px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-end',
            }}
          >
            <Typography variant='h4'>
              {playlistInfo?.public ? 'PUBLIC PLAYLIST' : 'PRIVATE PLAYLIST'}
            </Typography>

            <Typography variant='h1' component='h1'>
              {playlistInfo?.name}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Avatar
                src={artistInfo?.images[0]?.url}
                sx={{ width: '30px', height: '30px', marginRight: '5px' }}
              />
              <Typography variant='h4'>
                {playlistInfo?.owner?.display_name}{' '}
                <span style={{ fontWeight: 'normal' }}>
                  •{' '}
                  {Intl.NumberFormat('en-US').format(
                    playlistInfo?.followers?.total
                  )}{' '}
                  likes • {playlistInfo?.tracks?.total} songs,{' '}
                </span>
                <span style={{ color: '#b2b2b2', fontWeight: 'normal' }}>
                  {totalPlaylistDuration.split(':')[0].startsWith('0')
                    ? totalPlaylistDuration.split(':')[0].slice(-1)
                    : totalPlaylistDuration.split(':')[0]}{' '}
                  hr {totalPlaylistDuration.split(':')[1]} min
                </span>
              </Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </>
  )
}

export default PlaylistInfo
