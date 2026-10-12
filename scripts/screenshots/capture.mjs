// Captures mssh screens from the mocked frontend, for the README and the site.
import puppeteer from 'puppeteer'

const BASE = 'http://localhost:5192'
const here = new URL('.', import.meta.url).pathname
const WEB = process.env.WEB_SHOTS ?? `${here}../../src/assets/screenshots`
const REPO = process.env.REPO_SHOTS ?? `${here}../../../mssh/.github/assets`
const only = process.argv[2]

const browser = await puppeteer.launch({headless: true})

async function newPage(theme, settings = {}, width = 1280, height = 800) {
  const page = await browser.newPage()
  await page.setViewport({width, height, deviceScaleFactor: 2})
  await page.emulateMediaFeatures([{name: 'prefers-color-scheme', value: theme}])
  await page.evaluateOnNewDocument((theme, settings) => {
    localStorage.setItem('mssh-ui-theme', theme)
    window.__mockSettings = settings
  }, theme, settings)
  return page
}

async function save(page, name, {png = false} = {}) {
  await new Promise((r) => setTimeout(r, 600))
  await page.screenshot({path: `${WEB}/${name}.webp`, type: 'webp', quality: 88})
  if (png) await page.screenshot({path: `${REPO}/${name}.png`, type: 'png'})
  console.log('saved', name)
}

async function connected(page) {
  await page.goto(`${BASE}/workspaces/w-prod/servers/c-api`, {waitUntil: 'networkidle0'})
  const [button] = await page.$$('xpath/.//button[normalize-space()="Connect"]')
  await button.click()
  await page.waitForFunction(() => document.body.innerText.includes('PATCH /v1/orders/8812'), {timeout: 10000})
  await page.mouse.move(0, 0)
}

const scenes = {
  async home() {
    const page = await newPage('dark')
    await page.goto(`${BASE}/`, {waitUntil: 'networkidle0'})
    await save(page, 'home', {png: true})
  },
  async terminal() {
    const page = await newPage('dark')
    await connected(page)
    await save(page, 'terminal', {png: true})
    await page.keyboard.down('Meta'); await page.keyboard.press('e'); await page.keyboard.up('Meta')
    await page.waitForFunction(() => document.body.innerText.includes('heap-2026-10-11.heapsnapshot'))
    await save(page, 'files', {png: true})
    await page.keyboard.down('Meta'); await page.keyboard.press('e'); await page.keyboard.up('Meta')
    await new Promise((r) => setTimeout(r, 500))
    await page.keyboard.down('Meta'); await page.keyboard.press('p'); await page.keyboard.up('Meta')
    await new Promise((r) => setTimeout(r, 300))
    await page.keyboard.type('stag', {delay: 40})
    await save(page, 'palette', {png: true})
  },
  async history() {
    // Wider: the table scrolls sideways at 1280, and a screenshot cannot.
    const page = await newPage('dark', {}, 1600, 1000)
    await page.goto(`${BASE}/history`, {waitUntil: 'networkidle0'})
    await page.waitForFunction(() => document.body.innerText.includes('payments-worker'))
    await save(page, 'history', {png: true})
  },
  async themes() {
    const page = await newPage('dark')
    await page.goto(`${BASE}/themes`, {waitUntil: 'networkidle0'})
    await save(page, 'themes')
  },
}

for (const [name, scene] of Object.entries(scenes)) {
  if (only && only !== name) continue
  await scene()
}
await browser.close()
