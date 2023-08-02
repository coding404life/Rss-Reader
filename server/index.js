const express = require('express')
const app = express()
const logger = require('./libs/logger')
const db = require('./libs/db')
const cors = require('cors')
const { getRssFromDb } = require('./libs/api')
const { startScraper, indefiniteScraper } = require('./libs/scraper')

const PORT = 5555

/** Middlewares **/
app.use(express.json())
app.use(cors())

/** Routes **/
// get user settings
app.get('/config', (req, res) => res.send(db.get('userSettings').value()))

// set user settings
app.post('/config', (req, res) => {
  logger.info(`[User Settings] /config: ${JSON.stringify(req.body)}`)

  db.set('userSettings', req.body).write()

  const currentFeeds = db.get('userSettings').value()

  // force a re-run of scraper
  startScraper(true)

  res.send(currentFeeds)
})

// get rss feeds
app.get('/rss', (req, res) => res.send(db.get('rssFeeds').value()))

app.get('/jobs', (req, res) => {
  const result = getRssFromDb()

  res.send(result)
})

app.listen(PORT, () => logger.info(`Server listening on port ${PORT}`))

// Run scraper
indefiniteScraper()
