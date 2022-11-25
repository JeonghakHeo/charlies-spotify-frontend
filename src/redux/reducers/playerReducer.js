import {
  SET_PLAYER_REQUEST,
  SET_PLAYER_SUCCESS,
  CONNECT_PLAYER_REQUEST,
  CONNECT_PLAYER_SUCCESS,
  SET_TRACK,
  SET_PAUSE,
  SET_PLAYER_STATE,
  SET_ACTIVE,
  TOGGLE_SHUFFLE_SUCCESS,
  TOGGLE_REPEAT_SUCCESS,
} from '../constants/playerConstants'

const initialState = {
  loading: false,
  isConnected: false,
  isActive: false,
  playerController: {},
  currentTrack: {
    name: 'Shake The Tree',
    artists: [
      { name: 'Simon Field', uri: 'spotify:artist:2S0tj8IQ2ytFKa5HdCni57' },
    ],
    album: {
      images: [
        {
          url: 'https://i.scdn.co/image/ab67616d0000b273df757641bb992e0ce6423473',
        },
      ],
    },
  },
  playerState: {
    duration: 184419,
    position: 0,
    paused: true,
    shuffle: false,
    repeat_mode: 0,
  },
}

export const playerReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_PLAYER_REQUEST:
      return {
        ...state,
        loading: true,
      }

    case SET_PLAYER_SUCCESS:
      return {
        ...state,
        loading: false,
        playerController: action.payload,
      }

    case CONNECT_PLAYER_REQUEST:
      return {
        ...state,
        loading: true,
        isConnected: false,
      }

    case CONNECT_PLAYER_SUCCESS:
      return {
        ...state,
        loading: false,
        isConnected: action.payload,
      }

    case SET_TRACK:
      return {
        ...state,
        currentTrack: action.payload,
      }

    case SET_PAUSE:
      return {
        ...state,
        playerState: {
          ...state.playerState,
          paused: action.payload,
        },
      }

    case SET_PLAYER_STATE:
      return {
        ...state,
        playerState: action.payload,
      }

    case SET_ACTIVE:
      return {
        ...state,
        isActive: action.payload,
      }

    case TOGGLE_SHUFFLE_SUCCESS:
      return {
        ...state,
        playerState: {
          ...state.playerState,
          shuffle: action.payload,
        },
      }

    case TOGGLE_REPEAT_SUCCESS:
      return {
        ...state,
        playerState: {
          ...state.playerState,
          repeat_mode: action.payload,
        },
      }
    default:
      return state
  }
}
