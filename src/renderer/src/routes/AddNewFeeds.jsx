import { Box, Button, TextField, Typography } from '@mui/material'
import StyledTextarea from '../components/StyledTextarea'
import { useState } from 'react'
import { request } from '../api/api'

export default function AddNewFeeds() {
  const [interval, setInterval] = useState(60)
  const [rssFeeds, setRssFeeds] = useState('') // State for RSS Feeds

  const handleIntervalChange = (e) => {
    setInterval(Number(e.target.value))
  }

  const handleRssFeedsChange = (e) => {
    setRssFeeds(e.target.value)
  }

  return (
    <Box ml={1} mt={10}>
      <Typography variant="h5" color="gray">
        Add New Feeds
      </Typography>

      <Box mt={1} mr={2} width={350}>
        <Typography>Interval in seconds</Typography>
        <TextField
          sx={{ borderRadius: 25 }}
          fullWidth
          id="outlined-basic"
          label="Interval"
          variant="outlined"
          size="small"
          type="number"
          value={interval}
          onChange={handleIntervalChange}
        />
      </Box>

      <Box mt={3}>
        <Typography>RSS Feeds (feed per line) </Typography>
        <StyledTextarea value={rssFeeds} onChange={handleRssFeedsChange} />
      </Box>

      <Button variant="contained" color="success" onClick={handleSubmit}>
        Save
      </Button>
    </Box>
  )
}
