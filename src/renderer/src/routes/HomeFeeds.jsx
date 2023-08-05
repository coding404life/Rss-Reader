import { useCallback, useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import Drawer from '@mui/material/Drawer'
import List from '@mui/material/List'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import InboxIcon from '@mui/icons-material/MoveToInbox'
import MailIcon from '@mui/icons-material/Mail'
import axios from 'axios'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { Accordion, AccordionDetails, AccordionSummary, Chip, Stack } from '@mui/material'

import { BASE_URL } from '../api/api'
import { toLocalDate } from '../../util/localDate'

const drawerWidth = 240

export default function HomeFeeds() {
  const [jobs, setJobs] = useState([])
  const [updatedAt, setUpdatedAt] = useState('')

  const fetchJobs = useCallback(async () => {
    try {
      const response = await axios(`${BASE_URL}/jobs`)
      if (response.status === 200) {
        const prevJobs = jobs

        // Update the state with the new fetched jobs
        setJobs(response.data.jobs)
        setUpdatedAt(toLocalDate(response.data.updatedAt))

        // Find the new jobs that are not present in the previous jobs
        const newJobs = response.data.jobs.filter(
          (newJob) => !prevJobs.some((prevJob) => prevJob.link === newJob.link)
        )
        console.log(newJobs)

        newJobs.data.jobs.map((job) => {
          new window.Notification(job.title, {
            body: job.summary
          })
        })
      }
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }, [])

  useEffect(() => {
    // Fetch data initially when the component mounts
    fetchJobs()

    // Fetch data every 10 seconds
    const intervalId = setInterval(fetchJobs, 60000)

    // Cleanup function to clear the interval when the component unmounts
    return () => {
      clearInterval(intervalId)
    }
  }, [fetchJobs])

  // console.log(jobs)

  return (
    <Box sx={{ display: 'flex' }}>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: 'border-box',
            marginTop: 8,
            zIndex: 0
          }
        }}
      >
        <Box sx={{ overflow: 'auto' }}>
          <List>
            {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
              <ListItem key={text} disablePadding>
                <ListItemButton>
                  <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Divider />
          <List>
            {['All mail', 'Trash', 'Spam'].map((text, index) => (
              <ListItem key={text} disablePadding>
                <ListItemButton>
                  <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>

      <Box component="main" sx={{ flexGrow: 1, p: 3, marginTop: 7 }}>
        <Box mb={2}>
          <Typography variant="h5">Updated at: {updatedAt}</Typography>
        </Box>
        {jobs.map((job) => (
          <Accordion key={job.link}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Box display="flex" flexDirection="column">
                <Typography variant="h6">{job.title}</Typography>
                <Typography variant="body1" color="gray">
                  Posted at: {toLocalDate(job.createdAt)}
                </Typography>
                <Typography variant="body1" color="gray">
                  {job.meta.hourlyRange ? job.meta.hourlyRange : 'Hourly Not specified'}
                </Typography>

                <Stack direction="row" spacing={1} flexWrap="wrap">
                  {job.meta.skills.map((skill) => (
                    <Chip
                      sx={{ mb: 0.5 }}
                      key={skill}
                      label={skill}
                      color="primary"
                      variant="outlined"
                    />
                  ))}
                </Stack>
              </Box>
            </AccordionSummary>
            <AccordionDetails>
              <Box display="flex" flexDirection="column">
                <Typography sx={{ mb: 2 }} variant="body1">
                  {job.summary}
                </Typography>
                <Typography
                  component="a"
                  href={job.link}
                  rel="noreferrer"
                  target="_blank"
                  sx={{ textDecoration: 'none' }}
                  color="primary"
                >
                  Job Link
                </Typography>
              </Box>
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>
    </Box>
  )
}
