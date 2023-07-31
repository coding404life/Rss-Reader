const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

const adapter = new FileSync('lowdb.json')
const db = low(adapter)

const defaultDb = {
  // Read/write access to user settings
  userSettings: {
    enableNotifications: true,
    rss: {
      urls: [],
      intervalInSec: 60
    }
  },
  // External Read-only access to rss feeds
  // We only write to it when we scrape
  rssFeeds: {
    updatedAt: null,
    urlHashes: {}
  }
}

// Set some defaults
db.defaults(defaultDb).write()

module.exports = db
