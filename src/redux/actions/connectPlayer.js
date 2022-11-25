import {
  SET_PLAYER_REQUEST,
  SET_PLAYER_SUCCESS,
  CONNECT_PLAYER_REQUEST,
  CONNECT_PLAYER_SUCCESS,
  SET_TRACK,
  SET_PLAYER_STATE,
} from '../constants/playerConstants'

const connectPlayer = (token) => async (dispatch) => {
  try {
    dispatch({ type: SET_PLAYER_REQUEST })

    const script = document.createElement('script')
    script.src = 'https://sdk.scdn.co/spotify-player.js'
    script.async = true

    document.body.appendChild(script)

    window.onSpotifyWebPlaybackSDKReady = () => {
      const player = new window.Spotify.Player({
        name: `Charlie's player`,
        getOAuthToken: (cb) => {
          cb(token)
        },
        volume: 0.5,
      })

      dispatch({ type: SET_PLAYER_SUCCESS, payload: player })

      dispatch({ type: CONNECT_PLAYER_REQUEST })
      player.addListener('ready', ({ device_id }) => {
        console.log('Ready with Device ID', device_id)
        localStorage.setItem('deviceId', JSON.stringify(device_id))
      })

      player.addListener('not_ready', ({ device_id }) => {
        console.log('Device ID has gone offline', device_id)
      })

      player.connect()
      dispatch({ type: CONNECT_PLAYER_SUCCESS, payload: true })

      player.addListener('player_state_changed', (state) => {
        if (!state) {
          return
        }

        dispatch({
          type: SET_TRACK,
          payload: state.track_window.current_track,
        })

        player.getCurrentState().then((state) => {
          dispatch({ type: SET_PLAYER_STATE, payload: state })
        })
      })
    }
  } catch (error) {
    console.log(error)
  }
}

export default connectPlayer
