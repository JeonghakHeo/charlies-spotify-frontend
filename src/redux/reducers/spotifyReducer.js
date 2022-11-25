import {
  LIKE_SONG_RESET,
  LIKE_SONG_SUCCESS,
  UNLIKE_SONG_RESET,
  UNLIKE_SONG_SUCCESS,
} from '../constants/playerConstants'
import {
  GET_MY_PROFILE_REQUEST,
  GET_MY_PROFILE_SUCCESS,
  GET_MY_PROFILE_FAIL,
  GET_MY_PLAYLISTS_REQUEST,
  GET_MY_PLAYLISTS_SUCCESS,
  GET_MY_PLAYLISTS_FAIL,
  GET_MY_LIKED_SONG_REQUEST,
  GET_MY_LIKED_SONG_SUCCESS,
  GET_MY_LIKED_SONG_FAIL,
  GET_PLAYLIST_REQUEST,
  GET_PLAYLIST_SUCCESS,
  GET_PLAYLIST_FAIL,
  GET_ARTIST_REQUEST,
  GET_ARTIST_SUCCESS,
  GET_ARTIST_FAIL,
} from '../constants/spotifyConstants'

export const myProfileReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_MY_PROFILE_REQUEST:
      return {
        loading: true,
      }

    case GET_MY_PROFILE_SUCCESS:
      return {
        loading: false,
        myProfileInfo: action.payload,
      }

    case GET_MY_PROFILE_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    default:
      return state
  }
}

export const myPlaylistsReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_MY_PLAYLISTS_REQUEST:
      return {
        loading: true,
      }

    case GET_MY_PLAYLISTS_SUCCESS:
      return {
        loading: false,
        myPlaylistsInfo: action.payload,
      }

    case GET_MY_PLAYLISTS_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    default:
      return state
  }
}

export const playlistReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_PLAYLIST_REQUEST:
      return {
        loading: true,
      }

    case GET_PLAYLIST_SUCCESS:
      return {
        loading: false,
        playlistInfo: action.payload,
      }

    case GET_PLAYLIST_FAIL:
      return {
        loading: false,
        error: action.payload,
      }

    default:
      return state
  }
}

export const artistReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_ARTIST_REQUEST:
      return {
        loading: true,
      }

    case GET_ARTIST_SUCCESS:
      return {
        loading: false,
        artistInfo: action.payload,
      }

    case GET_ARTIST_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    default:
      return state
  }
}

export const myLikedSongsReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_MY_LIKED_SONG_REQUEST:
      return {
        loading: true,
      }

    case GET_MY_LIKED_SONG_SUCCESS:
      return {
        loading: false,
        myLikedSongsInfo: action.payload,
      }

    case GET_MY_LIKED_SONG_FAIL:
      return {
        loading: false,
        error: action.payload,
      }

    case LIKE_SONG_SUCCESS:
      return {
        myLikedSongsInfo: action.payload,
      }

    case UNLIKE_SONG_SUCCESS:
      return {
        myLikedSongsInfo: action.payload,
      }
    default:
      return state
  }
}

export const likeHandlerReducer = (
  state = { like: false, unlike: false },
  action
) => {
  switch (action.type) {
    case LIKE_SONG_SUCCESS:
      return {
        like: true,
      }

    case LIKE_SONG_RESET: {
      return {
        like: false,
      }
    }
    case UNLIKE_SONG_SUCCESS:
      return {
        unlike: true,
      }

    case UNLIKE_SONG_RESET:
      return {
        unlike: false,
      }
    default:
      return state
  }
}
