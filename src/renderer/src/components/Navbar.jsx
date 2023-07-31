import { AppBar, Toolbar, Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import { makeStyles } from '@mui/styles'

const useStyles = makeStyles({
  root: {
    '& a': {
      color: 'white',
      textDecoration: 'none',
      '&:hover': {
        color: '#122'
      }
    }
  },
  feed: {
    margin: '0 16px'
  }
})
const Navbar = () => {
  const classes = useStyles()

  return (
    <AppBar position="fixed" className={classes.root}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          RSS Reader
        </Typography>
        <Link color="inherit" to="/add-new-feed">
          Add New Feed
        </Link>
        <Link className={classes.feed} color="red" to="/">
          Feeds
        </Link>
        <Link color="white" to="/about">
          About
        </Link>
      </Toolbar>
    </AppBar>
  )
}

export default Navbar
