import { Box, Button, TextField, Typography } from '@mui/material'
import StyledTextarea from '../components/StyledTextarea'

export default function AddNewFeeds() {
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
        />
      </Box>

      <Box mt={3}>
        <Typography>RSS Feeds (feed per line) </Typography>
        <StyledTextarea />
      </Box>

      <Button variant="contained" color="success">
        Save
      </Button>
    </Box>
  )
}
