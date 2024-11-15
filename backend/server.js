import http from 'http'
import puppeteer from 'puppeteer'
import cron from 'node-cron'

let selepkaMenu = []
let vivaMenu = []
let sonoMenu = []
let sevenMenu = []
let zelenaKockaMenu = []
let plzenskyDvurMenu = []
let uPrimuMenu = []
let korzarMenu = []

const callPuppeteer = async (RESTAURANT_URL) => {
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null,
  })

  const page = await browser.newPage()

  await page.goto(RESTAURANT_URL, {
    waitUntil: 'domcontentloaded',
  })

  return { browser, page }
}

export const getSelepkaMenu = async () => {
  const { browser, page } = await callPuppeteer('https://www.selepova.cz/denni-menu/')

  const menuDataSelepka = await page.evaluate(() => {
    const days = document.querySelectorAll('.den')
    const menuArray = []

    days.forEach((day) => {
      const menuObject = {}

      menuObject.day = day.querySelector('.nazev').textContent.trim()

      const menuItems = []

      const soup = day.querySelector('.polevka')
      menuObject.soup = soup ? soup.textContent.trim() : ''

      const menuElements = day.querySelectorAll('.seznam ol li')
      menuElements.forEach((menuItem) => {
        const menuItemName = menuItem.querySelector('h6').textContent.trim()
        const menuItemPrice = menuItem.querySelector('.cena').textContent.trim()
        menuItems.push({ name: menuItemName, price: menuItemPrice })
      })

      menuObject.menuItems = menuItems
      menuArray.push(menuObject)
    })

    return menuArray
  })
    selepkaMenu = menuDataSelepka

  await page.close()
  await browser.close()
}

export const getVivaMenu = async () => {
  const { browser, page } = await callPuppeteer('https://www.pizzerie-viva.cz/')

  const menuDataViva = await page.evaluate(() => {
    const menuData = []
    const menuItemListItems = document.querySelectorAll(
      '.menus-carousel .list-group li.list-group-item'
    )

    menuItemListItems.forEach((menuItemListItem) => {
      const dayElement = menuItemListItem
        .closest('.menu-same-height')
        .querySelector('h3')
      const day = dayElement ? dayElement.textContent.trim() : ''
      const menuItemTextElement = menuItemListItem.querySelector('.menu-item')
      const menuItemPriceElement = menuItemListItem.querySelector('.menu-item-price')

      if (day && menuItemTextElement && menuItemPriceElement) {
        const menuItemName = menuItemTextElement.textContent.trim()
        const menuItemPrice = menuItemPriceElement.textContent.trim()

        const dayIndex = menuData.findIndex((item) => item.day === day)
        if (dayIndex !== -1) {
          menuData[dayIndex].menuItems.push({
            name: menuItemName,
            price: menuItemPrice,
          })
        } else {
          menuData.push({
            day: day,
            menuItems: [{ name: menuItemName, price: menuItemPrice }],
          })
        }
      }
    })

    return menuData
  })

  vivaMenu = menuDataViva

  await page.close()
  await browser.close()
}

export const getSonoMenu = async () => {
  const { browser, page } = await callPuppeteer('https://www.flames-grill.cz/')

  const menuDataSono = await page.evaluate(() => {
    const menuData = []
    const menuItemListItems = document.querySelectorAll('.foodlist li')
    let name
    let price

    menuItemListItems.forEach((menuItemListItem, index) => {
      const menuItemText = menuItemListItem.textContent.trim()
      const menuItemPriceElement = menuItemListItem.querySelector('.price')
      const menuItemPrice = menuItemPriceElement
        ? menuItemPriceElement.textContent.trim()
        : ''

      if (index === 0 && menuItemText.endsWith('CZK')) {
        name = menuItemText.slice(0, -6)
        price = menuItemText.slice(-6)
      } else {
        name = menuItemText.replace(menuItemPrice, '').trim()
        price = menuItemPrice
      }

      menuData.push({ name: name, price: price })
    })

    return menuData
  })

  sonoMenu = menuDataSono

  await page.close()
  await browser.close()
}

export const getSevenMenu = async () => {
  const { browser, page } = await callPuppeteer('https://www.menicka.cz/4838-seven-food.html')

  const menuDataSeven = await page.evaluate(() => {
    const days = document.querySelectorAll('.menicka')
    const menuArray = []

    days.forEach((day) => {
      const menuObject = {}
      const menuItems = []

      const menuElements = day.querySelectorAll('ul .popup-gallery li')

      menuElements.forEach((menuItem) => {
        const menuItemName = menuItem.querySelector('.polozka').textContent.trim()
        const menuItemPriceElement = menuItem.querySelector('.cena')
        const menuItemPrice = menuItemPriceElement
          ? menuItemPriceElement.textContent.trim()
          : ''
        menuItems.push({ name: menuItemName, price: menuItemPrice })
      })

      menuObject.menuItems = menuItems
      menuArray.push(menuObject)
    })

    return menuArray
  })

  sevenMenu = menuDataSeven

  await page.close()
  await browser.close()
}

export const getZelenaKockaMenu = async () => {
  const { browser, page } = await callPuppeteer('https://www.menicka.cz/3185-zelen-koka.html')

  const menuDataKocka = await page.evaluate(() => {
    const days = document.querySelectorAll('.menicka')
    const menuArray = []

    days.forEach((day) => {
      const menuObject = {}
      const menuItems = []

      const menuElements = day.querySelectorAll('ul .popup-gallery li')

      menuElements.forEach((menuItem) => {
        const menuItemName = menuItem.querySelector('.polozka').textContent.trim()
        const menuItemPriceElement = menuItem.querySelector('.cena')
        const menuItemPrice = menuItemPriceElement
          ? menuItemPriceElement.textContent.trim()
          : ''
        menuItems.push({ name: menuItemName, price: menuItemPrice })
      })

      menuObject.menuItems = menuItems
      menuArray.push(menuObject)
    })

    return menuArray
  })

  zelenaKockaMenu = menuDataKocka

  await page.close()
  await browser.close()
}

export const getPlzenskyDvurMenu = async () => {
  const { browser, page } = await callPuppeteer('https://www.menicka.cz/2724-plzensky-dvur.html')

  const menuDataDvur = await page.evaluate(() => {
    const days = document.querySelectorAll('.menicka')
    const menuArray = []

    days.forEach((day) => {
      const menuObject = {}
      const menuItems = []

      const menuElements = day.querySelectorAll('ul .popup-gallery li')

      menuElements.forEach((menuItem) => {
        const menuItemName = menuItem.querySelector('.polozka').textContent.trim()
        const menuItemPriceElement = menuItem.querySelector('.cena')
        const menuItemPrice = menuItemPriceElement
          ? menuItemPriceElement.textContent.trim()
          : ''
        menuItems.push({ name: menuItemName, price: menuItemPrice })
      })

      menuObject.menuItems = menuItems
      menuArray.push(menuObject)
    })

    return menuArray
  })

  plzenskyDvurMenu = menuDataDvur

  await page.close()
  await browser.close()
}

export const getUPrimuMenu = async () => {
  const { browser, page } = await callPuppeteer('https://www.menicka.cz/8409-u-prim.html')

  const menuDataUPrimu = await page.evaluate(() => {
    const days = document.querySelectorAll('.menicka')
    const menuArray = []

    days.forEach((day) => {
      const menuObject = {}
      const menuItems = []

      const menuElements = day.querySelectorAll('ul .popup-gallery li')

      menuElements.forEach((menuItem) => {
        const menuItemName = menuItem.querySelector('.polozka').textContent.trim()
        const menuItemPriceElement = menuItem.querySelector('.cena')
        const menuItemPrice = menuItemPriceElement
          ? menuItemPriceElement.textContent.trim()
          : ''
        menuItems.push({ name: menuItemName, price: menuItemPrice })
      })

      menuObject.menuItems = menuItems
      menuArray.push(menuObject)
    })

    return menuArray
  })

  uPrimuMenu = menuDataUPrimu

  await page.close()
  await browser.close()
}

export const getMenuKorzar = async () => {
  const { browser, page } = await callPuppeteer('https://www.menicka.cz/2663-restaurace-korzr.html')

  const menuDataKorzar = await page.evaluate(() => {
    const days = document.querySelectorAll('.menicka')
    const menuArray = []

    days.forEach((day) => {
      const menuObject = {}
      const menuItems = []

      const menuElements = day.querySelectorAll('ul .popup-gallery li')

      menuElements.forEach((menuItem) => {
        const menuItemName = menuItem.querySelector('.polozka').textContent.trim()
        const menuItemPriceElement = menuItem.querySelector('.cena')
        const menuItemPrice = menuItemPriceElement
          ? menuItemPriceElement.textContent.trim()
          : ''
        menuItems.push({ name: menuItemName, price: menuItemPrice })
      })

      menuObject.menuItems = menuItems
      menuArray.push(menuObject)
    })

    return menuArray
  })

  korzarMenu = menuDataKorzar

  await page.close()
  await browser.close()
}

// Define a variable to store the scraped data
let menuData = {}

// Function to scrape the menus
async function scrapeMenuData() {
    try {
        // Scrape all menus
        await Promise.allSettled([
            getSelepkaMenu(),
            getVivaMenu(),
            getSonoMenu(),
            getSevenMenu(),
            getZelenaKockaMenu(),
            getPlzenskyDvurMenu(),
            getUPrimuMenu(),
            getMenuKorzar()
        ])

        // Prepare the scraped data
        menuData = {
            selepkaMenu,
            vivaMenu,
            sonoMenu,
            sevenMenu,
            zelenaKockaMenu,
            plzenskyDvurMenu,
            uPrimuMenu,
            korzarMenu
        }
        console.log('Menu data scraped successfully')
    } catch (error) {
        console.error('Error scraping data:', error.message)
    }
}

// Schedule the scraping to run once a day at midnight
cron.schedule('05 9 * * *', scrapeMenuData)

// Set up HTTP server
const server = http.createServer(async (req, res) => {

    // Enable CORS
    res.setHeader('Access-Control-Allow-Origin', '*') // Allow any domain (can be restricted to specific domains)

    // Simple welcome message
    if (req.url === '/' && req.method === 'GET') {
        res.writeHead(200, { 'Content-Type': 'text/plain' })
        res.end('Welcome to the Menu Scraper API!')
    }

    // Menu scraping API endpoint
    else if (req.url === '/api/menu' && req.method === 'GET') {
      console.log('Menu data:', menuData);  // Add this line for debugging
      if (Object.keys(menuData).length === 0) {
          res.writeHead(503, { 'Content-Type': 'text/plain' })
          res.end('Menu data is not available yet. Please try again later.')
      } else {
          res.writeHead(200, { 'Content-Type': 'application/json' })
          res.end(JSON.stringify(menuData))
      }
  }

    // Handle 404 errors for other endpoints
    else {
        res.writeHead(404, { 'Content-Type': 'text/plain' })
        res.end('Not Found')
    }
})

const PORT = 3000
server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
})
