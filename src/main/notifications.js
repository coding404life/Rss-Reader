import axios from 'axios'
import { Notification } from 'electron'
import { exec } from 'child_process'

export const BASE_URL = 'http://localhost:5555'

let prevJobs = []

export const sendNotifications = async () => {
  try {
    const response = await axios(`${BASE_URL}/jobs`)

    if (response.status === 200) {
      prevJobs = response.data.jobs
    }

    if (prevJobs.length) {
      const newJobs = response.data.jobs.filter(
        (newJob) => !prevJobs.some((prevJob) => prevJob.link === newJob.link)
      )

      if (newJobs.length) {
        newJobs.forEach((job) => {
          const notification = new Notification({ title: job.title, body: job.summary })

          notification.on('click', () => {
            const command = `open -a "Google Chrome" ${job.link}`
            exec(command)
          })

          notification.show()
        })
      }
    }
  } catch (error) {
    console.error('Error fetching data:', error)
  }
}
