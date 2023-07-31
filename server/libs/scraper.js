const db = require('./db')
const logger = require('./logger')
const Parser = require('rss-parser')
const crypto = require('crypto')
const parser = new Parser()
// const cheerio = require('cheerio')

const INTERNAL_SCRAPE_CHECKER_MS = 5000

// url to sha1
const urlToHash = (url) => {
  const hash = crypto.createHash('sha1')
  hash.update(url)

  return hash.digest('hex')
}

const extractDescription = (descriptionRaw) => {
  const descriptionEol = '<br /><b>'

  return descriptionRaw.split(descriptionEol)[0]
}

const extractSummary = (summaryRaw) => {
  const summaryEol = /\n\n?Hourly|\n\n?Budget/
  const summaryParts = summaryRaw.split(summaryEol)
  summaryParts.splice(-1)

  return summaryParts.join('')
}

const extractMeta = (descriptionRaw) => {
  const rawMeta = {}
  const meta = {}
  const metaParts = descriptionRaw.split('<b>')
  // drop first part which is summary
  metaParts.splice(0, 1)

  for (const part of metaParts) {
    const [key, value] = part
      .split('</b>')
      .map((v) => v.replace(':', '').replace('<br />', '').trim())

    const lowerKey = key.toLowerCase()

    const keyValueMap = {
      budget: 'budget',
      'posted on': 'postedOn',
      category: 'category',
      'hourly range': 'hourlyRange'
    }

    if (lowerKey === 'skills') {
      meta.skills = value.split(/,\s\s+/)
    }

    if (lowerKey === 'country') {
      meta.country = value.split('\n')[0]
    }

    if (keyValueMap[lowerKey]) {
      const mappedKey = keyValueMap[lowerKey]

      meta[mappedKey] = value
    }

    rawMeta[key] = value
  }

  return { meta, rawMeta }
}

const parseFeedItems = (items) => {
  return items.map((item) => {
    const {
      title,
      link,
      isoDate: createdAt,
      contentSnippet: summaryRaw,
      content: descriptionRaw
    } = item

    const description = extractDescription(descriptionRaw)
    const summary = extractSummary(summaryRaw)
    const { meta, rawMeta } = extractMeta(descriptionRaw)

    return {
      title,
      link,
      description,
      summary,
      summaryRaw,
      descriptionRaw,
      createdAt,
      meta,
      rawMeta
    }
  })
}

const startScraper = async (forceScrape = false) => {
  const urls = db.get('userSettings.rss.urls').value()

  if (!urls?.length) {
    logger.warn('[Scraper] No RSS feeds to scrape')

    return
  }

  const updatedAt = db.get('rssFeeds.updatedAt').value()
  const intervalInSec = db.get('userSettings.rss.intervalInSec').value()
  const passedInterval =
    (updatedAt && Date.now() - new Date(updatedAt).getTime() > intervalInSec * 1000) || !updatedAt

  if (passedInterval || forceScrape) {
    const dbFeeds = db.get('rssFeeds.urlHashes').value()
    logger.info(`[Scraper] Scraping ${urls.length} RSS feeds`)

    for (const url of urls) {
      try {
        const feed = await parser.parseURL(url)
        const urlHash = urlToHash(url)
        const dbFeed = dbFeeds[urlHash]
        const parsedFeedItems = parseFeedItems(feed.items)
        const filteredItems = dbFeed
          ? parsedFeedItems.filter((item) => !dbFeed.items.find((i) => i.link === item.link))
          : parsedFeedItems

        const updatedFeed = {
          url,
          urlHash,
          scrapedAt: new Date().toISOString(),
          // merge previous items with old items
          items: dbFeed ? [...filteredItems, ...dbFeed.items] : filteredItems
        }

        db.get('rssFeeds.urlHashes').set(urlHash, updatedFeed).write()

        logger.info(
          `[Scraper] urlHash="${urlHash}" total="${feed.items.length}" newItems="${filteredItems.length}"`
        )
      } catch (e) {
        logger.error(`[Scraper] Error scraping ${url}`, e)
      }
    }

    db.set('rssFeeds.updatedAt', new Date().toISOString()).write()
  }
}

const indefiniteScraper = () => {
  startScraper()

  setTimeout(indefiniteScraper, INTERNAL_SCRAPE_CHECKER_MS)
}

module.exports = {
  startScraper,
  indefiniteScraper
}
