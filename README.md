# Charlie's Spotify

> Thank you so much for your time and comming to see my first full-stack web application on my github page. Any comments or feedbacks would be very much appreciated!

## App Description

This app is a mini version of Spotify app that can play songs based on a user's followed playslists. Users can play songs, change playlists, contol the music player, change volume, like a song and etc.

There are two top level directories tn the app, which are 'charlies-player' and 'server' that represent frontend and backend respectively.

## _Disclaimer_

This app requires a Spotify premium account in order to fully function. Feel free to contact me on jeonghak4142@gmail.com for a demo trial of the app if you don't have a premium account.

## To Run React App

First, open up your termnial and type the followings to install all the modules and dependencies that the app requires:

```
cd 'charlies-player'

npm install
```

Once all the dependencies are installed successfully, type the following commands to start the react app:

```
npm run start
```

This will open up the react app on your local machine.

## To Run Server

Second, similar to the first step, _open up a new terminal_ and type the following commands to install the dependencies that sever-side needs

(_If you are not on the root directory but in a react app side currently, which defines like "path/Charlies-player/charlies-player", then type cd .. and cd server. Type pwd in your terminal to check where you are currently at now_).

```
cd server

npm install
```

Once all the dependencies are installed successfully, type the following command to start the server:

```
nodemon server
```

## Environment Variables (Credentials)

At this point, the app should technically be running yet, it is missing some envrionment variables (credentials) for the app to run without any glitches, errors or unexpected behaviors.

To cope with this, in server folder, go to .env.env file.
Rename ".env.env" to ".env" and update values/settings to your own to:

NODE_ENV = development

PORT = 5000

MY_USER_ID = your spotify user id

SPOTIFY_CLIENT_ID = your spotify client id

SPOTIFY_CLIENT_SECRET = your spotify client secret

_Further information on How to get or find Spotify Client ID and Spotify Client Secret_
https://developer.spotify.com/documentation/general/guides/authorization/app-settings
