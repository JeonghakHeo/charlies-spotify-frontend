import React from 'react'
import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'

const Spinner = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '90vh',
      }}
    >
      <CircularProgress
        sx={{
          color: 'rgb(158, 158, 158)',
        }}
      />
    </Box>
  )
}

export default Spinner
