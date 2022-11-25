import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import {
  myProfileReducer,
  myPlaylistsReducer,
  myLikedSongsReducer,
  likeHandlerReducer,
  playlistReducer,
  artistReducer,
} from './reducers/spotifyReducer'
import { playerReducer } from './reducers/playerReducer'

const reducer = combineReducers({
  myProfile: myProfileReducer,
  myPlaylists: myPlaylistsReducer,
  myLikedSongs: myLikedSongsReducer,
  likeHandler: likeHandlerReducer,
  playlist: playlistReducer,
  player: playerReducer,
  artist: artistReducer,
})

const initialState = {}

const middleware = [thunk]

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
)

export default store
