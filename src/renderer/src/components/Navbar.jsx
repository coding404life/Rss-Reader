import { AppBar, Toolbar, Typography, Button, IconButton } from '@mui/material'

const Navbar = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="menu">
          X
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          RSS Reader
        </Typography>
        <Button color="inherit">Add new Feeds</Button>
        <Button color="inherit">Feeds</Button>
        <Button color="inherit">About</Button>
      </Toolbar>
    </AppBar>
  )
}

export default Navbar
