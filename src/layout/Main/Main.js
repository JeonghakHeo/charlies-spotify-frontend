import React, { useEffect, lazy, Suspense } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import './Main.css'
import Spinner from '../components/utils/Spinner/Spinner'
// import Navbar from '../components/Navbar/Navbar'
// import PlaylistInfo from '../components/PlaylistInfo/PlaylistInfo'
// import Playlists from '../components/Playlists/Playlists'
// import Player from '../components/Player/Player'
import {
  getPlaylistInfo,
  getMyLikedSongs,
  getMyPlaylists,
  getMyProfile,
  getArtistInfo,
} from '../../redux/actions/actions'

const Navbar = lazy(() => import('../components/Navbar/Navbar'))
const PlaylistInfo = lazy(() =>
  import('../components/PlaylistInfo/PlaylistInfo')
)
const Playlists = lazy(() => import('../components/Playlists/Playlists'))
const Player = lazy(() => import('../components/Player/Player'))

const Main = () => {
  const myProfile = useSelector((state) => state.myProfile)
  const { loading: myProfileInfoLoading } = myProfile

  const myPlaylists = useSelector((state) => state.myPlaylists)
  const { loading: myPlaylistsInfoLoading } = myPlaylists

  const playlist = useSelector((state) => state.playlist)
  const { loading: playlistLoding } = playlist

  const myLikedSongs = useSelector((state) => state.myLikedSongs)
  const { loading: myLikedSongsLoading } = myLikedSongs

  const artist = useSelector((state) => state.artist)
  const { loading: artistLoading } = artist

  const dispatch = useDispatch()

  const token = JSON.parse(localStorage.getItem('token'))
  useEffect(() => {
    if (token) {
      dispatch(getMyProfile())
      dispatch(getMyPlaylists())
      dispatch(getPlaylistInfo())
      dispatch(getMyLikedSongs())
      dispatch(getArtistInfo())
    }
  }, [dispatch, token])

  return (
    <>
      {myProfileInfoLoading ||
      myPlaylistsInfoLoading ||
      playlistLoding ||
      myLikedSongsLoading ||
      artistLoading ? (
        <Spinner />
      ) : (
        <Suspense fallback={<Spinner />}>
          <div className='app'>
            <div className='playlist'>
              <nav className='navbar'>
                <Navbar />
              </nav>
              <div className='playlist-info'>
                <PlaylistInfo />
              </div>
            </div>
            <div className='playlist-playlist'>
              <Playlists />
            </div>
            <div className='playlist-player'>
              <hr
                className='divider'
                style={{
                  position: 'absolute',
                  top: '0px',
                  transform: 'translate(-20px, -9px)',
                }}
              />
              <Player />
            </div>
          </div>
        </Suspense>
      )}
    </>
  )
}

export default Main
