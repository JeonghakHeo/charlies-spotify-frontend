import axios from 'axios'
import {
  GET_MY_PLAYLISTS_REQUEST,
  GET_MY_PLAYLISTS_FAIL,
  GET_MY_PLAYLISTS_SUCCESS,
  GET_PLAYLIST_REQUEST,
  GET_PLAYLIST_SUCCESS,
  GET_PLAYLIST_FAIL,
  GET_ARTIST_REQUEST,
  GET_ARTIST_SUCCESS,
  GET_ARTIST_FAIL,
  GET_MY_PROFILE_REQUEST,
  GET_MY_PROFILE_SUCCESS,
  GET_MY_PROFILE_FAIL,
  GET_MY_LIKED_SONG_FAIL,
  GET_MY_LIKED_SONG_REQUEST,
  GET_MY_LIKED_SONG_SUCCESS,
} from '../constants/spotifyConstants'
import {
  PLAY_SONG_REQUEST,
  PLAY_SONG_SUCCESS,
  PLAY_SONG_FAIL,
  SET_PLAYBACK_VOLUME_SUCCESS,
  SET_PLAYBACK_VOLUME_FAIL,
  LIKE_SONG_SUCCESS,
  LIKE_SONG_FAIL,
  TOGGLE_SHUFFLE_SUCCESS,
  TOGGLE_SHUFFLE_FAIL,
  TOGGLE_REPEAT_SUCCESS,
  TOGGLE_REPEAT_FAIL,
  LOG_OUT,
  UNLIKE_SONG_SUCCESS,
  UNLIKE_SONG_FAIL,
} from '../constants/playerConstants'

export const getMyProfile = () => async (dispatch) => {
  try {
    dispatch({ type: GET_MY_PROFILE_REQUEST })

    const token = JSON.parse(localStorage.getItem('token'))

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    }
    const { data } = await axios.get('/api/spotify/myprofile', config)

    dispatch({ type: GET_MY_PROFILE_SUCCESS, payload: data })
  } catch (error) {
    dispatch({ type: GET_MY_PROFILE_FAIL })
    console.log(error)
  }
}

export const getMyPlaylists = () => async (dispatch) => {
  try {
    dispatch({ type: GET_MY_PLAYLISTS_REQUEST })

    const token = JSON.parse(localStorage.getItem('token'))

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    }
    const { data } = await axios.get('/api/spotify/myplaylists', config)

    dispatch({ type: GET_MY_PLAYLISTS_SUCCESS, payload: data })
  } catch (error) {
    dispatch({ type: GET_MY_PLAYLISTS_FAIL })
    console.log(error)
  }
}

export const getMyLikedSongs = () => async (dispatch) => {
  try {
    dispatch({ type: GET_MY_LIKED_SONG_REQUEST })

    const token = JSON.parse(localStorage.getItem('token'))

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    }
    const { data } = await axios.get(`/api/spotify/mylikedsongs`, config)

    dispatch({ type: GET_MY_LIKED_SONG_SUCCESS, payload: data })
  } catch (error) {
    dispatch({ type: GET_MY_LIKED_SONG_FAIL, payload: error })
    console.log(error)
  }
}

export const getPlaylistInfo =
  (playlistId = '37i9dQZEVXbMDoHDwVN2tF') =>
  async (dispatch) => {
    try {
      dispatch({ type: GET_PLAYLIST_REQUEST })

      const token = JSON.parse(localStorage.getItem('token'))

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
      const { data } = await axios.get(
        `/api/spotify/playlist/${playlistId}`,
        config
      )

      dispatch({ type: GET_PLAYLIST_SUCCESS, payload: data })
    } catch (error) {
      dispatch({ type: GET_PLAYLIST_FAIL })
      console.log(error)
    }
  }

export const getArtistInfo =
  (artistId = 'spotify') =>
  async (dispatch) => {
    try {
      dispatch({ type: GET_ARTIST_REQUEST })

      const token = JSON.parse(localStorage.getItem('token'))

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
      const { data } = await axios.get(
        `/api/spotify/artist/${artistId}`,
        config
      )

      dispatch({ type: GET_ARTIST_SUCCESS, payload: data })
    } catch (error) {
      dispatch({ type: GET_ARTIST_FAIL })
      console.log(error)
    }
  }

// position = index of song in playlist
export const playSong =
  (playlistId = '1H8NiwW6ogBH2bSfBKY0EN', position = 0, positionMs = 0) =>
  async (dispatch, getState) => {
    try {
      dispatch({ type: PLAY_SONG_REQUEST })

      const token = JSON.parse(localStorage.getItem('token'))
      const deviceId = JSON.parse(localStorage.getItem('deviceId'))
      const { playlistInfo } = getState().playlist

      const playlistId = playlistInfo.id

      const body = {
        context_uri: `spotify:playlist:${playlistId}`,
        offset: {
          position: position,
        },
        position_ms: positionMs * 1000,
      }

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }

      await axios.put(`/api/spotify/player/track/${deviceId}`, body, config)

      dispatch({ type: PLAY_SONG_SUCCESS })
    } catch (error) {
      dispatch({ type: PLAY_SONG_FAIL })
      console.log(error)
    }
  }

export const likeSong = (songId) => async (dispatch) => {
  try {
    const token = JSON.parse(localStorage.getItem('token'))

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    }

    const { data } = await axios.put(`/api/spotify/track/${songId}`, {}, config)

    dispatch({ type: LIKE_SONG_SUCCESS, payload: data })
  } catch (error) {
    dispatch({ type: LIKE_SONG_FAIL, payload: error })
    console.log(error)
  }
}

export const unlikeSong = (songId) => async (dispatch) => {
  try {
    const token = JSON.parse(localStorage.getItem('token'))

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    }

    const { data } = await axios.delete(`/api/spotify/track/${songId}`, config)

    dispatch({ type: UNLIKE_SONG_SUCCESS, payload: data })
  } catch (error) {
    dispatch({ type: UNLIKE_SONG_FAIL, payload: error })
    console.log(error)
  }
}

export const toggleShuffle = () => async (dispatch, getState) => {
  try {
    const token = JSON.parse(localStorage.getItem('token'))
    const { playerState } = getState().player

    const shuffle = playerState.shuffle

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    }

    if (shuffle === false) {
      const { data } = await axios.put(
        `/api/spotify/shuffle/${!shuffle}`,
        {},
        config
      )
      dispatch({ type: TOGGLE_SHUFFLE_SUCCESS, payload: data })
    }

    if (shuffle === true) {
      const { data } = await axios.put(
        `/api/spotify/shuffle/${!shuffle}`,
        {},
        config
      )
      dispatch({ type: TOGGLE_SHUFFLE_SUCCESS, payload: data })
    }
  } catch (error) {
    dispatch({ type: TOGGLE_SHUFFLE_FAIL, payload: error })
    console.log(error)
  }
}

export const toggleRepeat = () => async (dispatch, getState) => {
  try {
    const token = JSON.parse(localStorage.getItem('token'))
    const deviceId = JSON.parse(localStorage.getItem('deviceId'))

    const { playerState } = getState().player

    const repeat = playerState.repeat_mode

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    }

    if (repeat === 0) {
      const { data } = await axios.put(
        `/api/spotify/repeat/context`,
        { deviceId },
        config
      )
      dispatch({ type: TOGGLE_REPEAT_SUCCESS, payload: data })
    }

    if (repeat === 1) {
      const { data } = await axios.put(
        `/api/spotify/repeat/track`,
        { deviceId },
        config
      )
      dispatch({ type: TOGGLE_REPEAT_SUCCESS, payload: data })
    }

    if (repeat === 2) {
      const { data } = await axios.put(
        `/api/spotify/repeat/off`,
        { deviceId },
        config
      )
      dispatch({ type: TOGGLE_REPEAT_SUCCESS, payload: data })
    }
  } catch (error) {
    dispatch({ type: TOGGLE_REPEAT_FAIL })
    console.log(error)
  }
}

export const setPlaybackVolume = (volume) => async (dispatch, getState) => {
  try {
    const token = JSON.parse(localStorage.getItem('token'))
    const deviceId = JSON.parse(localStorage.getItem('deviceId'))

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    }

    await axios.put(`/api/player/volume/${deviceId}`, { volume }, config)
    dispatch({ type: SET_PLAYBACK_VOLUME_SUCCESS })
  } catch (error) {
    dispatch({ type: SET_PLAYBACK_VOLUME_FAIL })
    console.log(error)
  }
}

export const logout = () => async (dispatch, getState) => {
  try {
    localStorage.removeItem('token')
    localStorage.removeItem('deviceId')

    window.location.reload()
    dispatch({ type: LOG_OUT })
  } catch (error) {
    console.log(error)
  }
}
