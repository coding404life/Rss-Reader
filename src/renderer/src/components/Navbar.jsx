import { AppBar, Toolbar, Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import { makeStyles } from '@mui/styles'

const useStyles = makeStyles({
  link: {
    margin: '0 16px'
  }
})
const Navbar = () => {
  const classes = useStyles()

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          RSS Reader
        </Typography>
        <Link color="inherit" to="/add-new-feed">
          Add new Feed
        </Link>
        <Link className={classes.link} color="inherit" to="/feeds">
          Feeds
        </Link>
        <Link color="inherit" to="/about">
          About
        </Link>
      </Toolbar>
    </AppBar>
  )
}

export default Navbar
