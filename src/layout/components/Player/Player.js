import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { makeStyles } from '@mui/styles'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Slider from '@mui/material/Slider'
import FavoriteIcon from '@mui/icons-material/Favorite'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import PlaylistCover from '../PlaylistCover/PlaylistCover'
import ShuffleIcon from '@mui/icons-material/Shuffle'
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious'
import PlayCircleIcon from '@mui/icons-material/PlayCircle'
import PauseCircleIcon from '@mui/icons-material/PauseCircle'
import SkipNextIcon from '@mui/icons-material/SkipNext'
import RepeatIcon from '@mui/icons-material/Repeat'
import RepeatOneIcon from '@mui/icons-material/RepeatOne'
import VolumeOffIcon from '@mui/icons-material/VolumeOff'
import VolumeDownIcon from '@mui/icons-material/VolumeDown'
import VolumeUpIcon from '@mui/icons-material/VolumeUp'
import CustomSnackbar from '../utils/CustomSnackbar/CustomSnackbar'
import {
  playSong,
  likeSong,
  unlikeSong,
  toggleShuffle,
  toggleRepeat,
  setPlaybackVolume,
} from '../../../redux/actions/actions'

const useStyle = makeStyles({
  play: {
    '&:hover': {
      transform: 'scale(105%)',
    },
  },
  icon: {
    '&:hover': {
      color: '#fff',
    },
  },
  active: {
    color: '#1DB954',
  },
})

const Player = () => {
  const classes = useStyle()

  const dispatch = useDispatch()

  const player = useSelector((state) => state.player)
  const { playerController, playerState, currentTrack } = player

  const playlist = useSelector((state) => state.playlist)
  const { playlistInfo } = playlist

  const myLikedSongs = useSelector((state) => state.myLikedSongs)
  const { myLikedSongsInfo } = myLikedSongs

  const myLikedSongsIds = myLikedSongsInfo?.items?.map(
    (likedSong) => likedSong?.track?.id
  )

  const likeHandler = useSelector((state) => state.likeHandler)
  const { like, unlike } = likeHandler

  const [volume, setVolume] = useState(50)

  const [sliderPosition, setSliderPosition] = useState(
    Math.floor(playerState?.position / 1000)
  )

  // track position
  const index = playlistInfo?.tracks?.items?.findIndex(
    (item) => item?.track?.id === currentTrack?.id
  )

  // song control
  // 1. onMouseDown pause player
  // 2. setSliderPosition
  // 3. onMouseUp playSong(sliderPosition) & start timer
  const handleMouseDown = () => {
    playerController.pause()
  }

  const handlePosition = (e, newValue) => {
    setSliderPosition(newValue)
  }

  const handleMouseUp = () => {
    dispatch(playSong(playlistInfo?.id, index, sliderPosition))
  }

  const togglePlay = () => {
    playerController.togglePlay()
  }

  const playPreviousTrack = () => {
    setSliderPosition(0)
    playerController.previousTrack()
  }

  const playNextTrack = () => {
    setSliderPosition(0)
    playerController.nextTrack()
  }

  // other player functions
  const isAlreadyLiked = myLikedSongsIds?.includes(currentTrack?.id)

  const updateLike = () => {
    if (isAlreadyLiked) {
      dispatch(unlikeSong(currentTrack?.id))
    } else {
      dispatch(likeSong(currentTrack?.id))
    }
  }

  const updateShuffle = () => {
    dispatch(toggleShuffle())
  }

  const updateRepeat = () => {
    dispatch(toggleRepeat())
  }

  const handleVolume = (e, newValue) => {
    setVolume(newValue)
    playerController.setVolume(newValue / 100)
    dispatch(setPlaybackVolume(volume))
  }

  const muteVolume = () => {
    setVolume(0)
    playerController.setVolume(0)
    dispatch(setPlaybackVolume(0))
  }

  useEffect(() => {
    setSliderPosition(Math.floor(playerState?.position / 1000))

    if (!playerState?.paused) {
      const timer = setInterval(() => {
        setSliderPosition((sliderPosition) => sliderPosition + 1)
      }, 1000)
      return () => clearInterval(timer)
    }
  }, [playerState])

  const formatDuration = (duration) => {
    const minutes = Math.floor(duration / 60000)
    const seconds = ((duration % 60000) / 1000).toFixed(0)
    return minutes + ':' + (seconds < 10 ? '0' : '') + seconds
  }

  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
      }}
    >
      <Box
        sx={{
          backgroundColor: '',
          padding: '20px ',
          width: '30%',
          display: 'flex',

          alignItems: 'center',
        }}
      >
        <Box
          sx={{
            backgroundColor: 'red',
            marginRight: '15px',
            height: '60px',
            width: '60px',
          }}
        >
          <PlaylistCover image={currentTrack?.album?.images[0]?.url} />
        </Box>

        <Box sx={{ marginRight: '25px' }}>
          <Typography variant='body2'>{currentTrack?.name}</Typography>
          <Typography variant='subtitle2'>
            {currentTrack?.artists?.map((artist) => artist.name).join(', ')}
          </Typography>
        </Box>

        <Box>
          {isAlreadyLiked ? (
            <FavoriteIcon
              color='primary'
              className={classes.active}
              sx={{
                '&:hover': {
                  color: '#1DB954',
                },
              }}
              onClick={updateLike}
            />
          ) : !isAlreadyLiked ? (
            <FavoriteBorderIcon
              color='secondary'
              className={classes.icon}
              onClick={updateLike}
            />
          ) : (
            <FavoriteBorderIcon
              color='secondary'
              className={classes.icon}
              onClick={updateLike}
            />
          )}
        </Box>
      </Box>

      <Box
        sx={{
          padding: '20px 10px',
          width: '40%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
        }}
      >
        <Box
          sx={{
            width: 'inehrit',
            textAlign: 'center',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <ShuffleIcon
            color='secondary'
            className={playerState?.shuffle ? classes.active : classes.icon}
            fontSize='medium'
            sx={{ mr: 1 }}
            onClick={updateShuffle}
          />
          <SkipPreviousIcon
            color='secondary'
            className={classes.icon}
            fontSize='large'
            sx={{ mr: 1 }}
            onClick={playPreviousTrack}
          />
          {playerState?.paused ? (
            <PlayCircleIcon
              color='white'
              className={classes.play}
              sx={{
                fontSize: 45,
                mr: 1,
              }}
              onClick={togglePlay}
            />
          ) : (
            <PauseCircleIcon
              color='white'
              className={classes.play}
              sx={{
                fontSize: 45,
                mr: 1,
                '&:hover': {
                  transform: 'scale(105%)',
                },
              }}
              onClick={togglePlay}
            />
          )}
          <SkipNextIcon
            color='secondary'
            className={classes.icon}
            fontSize='large'
            sx={{ mr: 1 }}
            onClick={playNextTrack}
          />
          {playerState?.repeat_mode === 0 ? (
            <RepeatIcon
              color='secondary'
              className={classes.icon}
              onClick={updateRepeat}
            />
          ) : playerState?.repeat_mode === 1 ? (
            <RepeatIcon
              color='secondary'
              className={classes.active}
              onClick={updateRepeat}
            />
          ) : (
            <RepeatOneIcon className={classes.active} onClick={updateRepeat} />
          )}
        </Box>

        <Box
          sx={{
            width: '100%',
            display: 'flex',
            justifyContent: 'space-around',
            alignItems: 'center',
          }}
        >
          <Typography variant='subtitle2'>
            {!playerState?.position
              ? '0:00'
              : formatDuration(sliderPosition * 1000)}
          </Typography>
          <Slider
            defaultValue={0}
            value={sliderPosition}
            max={Math.floor(parseInt(playerState?.duration / 1000))}
            color='secondary'
            size='small'
            sx={{ margin: '0 10px' }}
            onMouseDown={handleMouseDown}
            onChange={handlePosition}
            onMouseUp={handleMouseUp}
          />
          <Typography variant='subtitle2'>
            {!playerState?.duration
              ? '0:00'
              : formatDuration(playerState?.duration)}
          </Typography>
        </Box>
      </Box>

      <Box
        sx={{
          backgroundColor: '',
          padding: '20px 40px 20px 20px',
          width: '30%',
          height: '50px',
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'center',
        }}
      >
        {/* <QueueMusicIcon
          color='secondary'
          className={classes.icon}
          sx={{ mr: 1 }}
        /> */}
        {volume === 0 ? (
          <VolumeOffIcon
            color='secondary'
            className={classes.icon}
            onClick={muteVolume}
          />
        ) : volume > 0 && volume <= 40 ? (
          <VolumeDownIcon
            color='secondary'
            className={classes.icon}
            onClick={muteVolume}
          />
        ) : volume > 40 ? (
          <VolumeUpIcon
            color='secondary'
            className={classes.icon}
            onClick={muteVolume}
          />
        ) : (
          <VolumeUpIcon
            color='secondary'
            className={classes.icon}
            onClick={muteVolume}
          />
        )}

        <Slider
          min={0}
          max={100}
          value={volume}
          color='secondary'
          size='small'
          sx={{ margin: '0 10px', width: '20%' }}
          onChange={handleVolume}
        />
        {/* <OpenInFullIcon
          color='secondary'
          size='small'
          className={classes.icon}
        /> */}
      </Box>
      <CustomSnackbar
        like={like ? like : null}
        unlike={unlike ? unlike : null}
      />
    </Box>
  )
}

export default Player
