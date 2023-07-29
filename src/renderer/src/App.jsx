import { Box } from '@mui/material'
import Navbar from './components/Navbar'
import { Outlet } from 'react-router-dom'

function App() {
  return (
    <>
      <Navbar />
      <Box mt={1}>
        <Outlet />
      </Box>
    </>
  )
}

export default App
