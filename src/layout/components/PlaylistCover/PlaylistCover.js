import React from 'react'
import Paper from '@mui/material/Paper'

import Card from '@mui/material/Card'
import CardMedia from '@mui/material/CardMedia'

const PlaylistCover = ({ image }) => {
  return (
    <Paper elevation={5} sx={{ width: '100%', height: '100%' }}>
      <Card
        sx={{
          width: '100%',
          height: '100%',
          borderRadius: '0',
          boxShadow:
            'rgba(0, 0, 0, 0.2) 0px 12px 28px 0px, rgba(0, 0, 0, 0.1) 0px 2px 4px 0px, rgba(255, 255, 255, 0.05) 0px 0px 0px 1px inset',
        }}
      >
        <CardMedia component='img' width='100%' height='100%' image={image} />
      </Card>
    </Paper>
  )
}

export default PlaylistCover
