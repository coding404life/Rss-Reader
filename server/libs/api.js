const db = require('./db')

const getRssFromDb = () => {
  const { updatedAt, urlHashes } = db.get('rssFeeds').value()
  const userUrls = db.get('userSettings.rss.urls')
  const jobs = []

  for (const urlHash in urlHashes) {
    const { url, scrapedAt, items } = urlHashes[urlHash]

    if (userUrls && !userUrls.value().includes(url)) {
      continue
    }

    items.forEach((item) => {
      jobs.push({
        ...item,
        url,
        scrapedAt
      })
    })
  }

  jobs.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())

  return {
    updatedAt,
    jobs
  }
}

module.exports = {
  getRssFromDb
}
