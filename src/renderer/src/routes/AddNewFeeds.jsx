import { Box, Button, TextField, Typography } from '@mui/material'
import StyledTextarea from '../components/StyledTextarea'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { BASE_URL } from '../api/api'

export default function AddNewFeeds() {
  const [interval, setInterval] = useState(0)
  const [rssFeeds, setRssFeeds] = useState('') // State for RSS Feeds
  console.log(interval)
  const handleSubmit = async () => {
    const rssUrls = rssFeeds.trim().split('\n').filter(Boolean)

    const body = {
      rss: {
        intervalInSec: Number(interval),
        urls: rssUrls
      }
    }

    try {
      await axios.post(`${BASE_URL}/config`, body)
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  useEffect(() => {
    const fetchConfig = async () => {
      try {
        const response = await axios(`${BASE_URL}/config`)
        if (response.status === 200) {
          setInterval(response.data.rss.interval)
          setRssFeeds(response.data.rss.urls[0])
        }
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchConfig()
  }, [])

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
          variant="outlined"
          placeholder="Interval"
          size="small"
          type="number"
          value={interval}
          onChange={(e) => setInterval(e.target.value)}
        />
      </Box>

      <Box mt={3}>
        <Typography>RSS Feeds (feed per line) </Typography>
        <StyledTextarea value={rssFeeds} onChange={(e) => setRssFeeds(e.target.value)} />
      </Box>

      <Button variant="contained" color="success" onClick={handleSubmit}>
        Save
      </Button>
    </Box>
  )
}
