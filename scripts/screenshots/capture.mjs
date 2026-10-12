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

async function save(page, name, {png = false, clip} = {}) {
  await new Promise((r) => setTimeout(r, 600))
  // captureBeyondViewport off: by default a clipped screenshot resizes the
  // viewport, and the resize closes the connection dialog before it is drawn.
  await page.screenshot({path: `${WEB}/${name}.webp`, type: 'webp', quality: 88, clip, captureBeyondViewport: false})
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

const meta = async (page, key) => {
  await page.keyboard.down('Meta'); await page.keyboard.press(key); await page.keyboard.up('Meta')
}

// Clicks the first element of a kind whose visible text contains `text`.
async function clickText(page, selector, text) {
  const handle = await page.waitForFunction((selector, text) =>
    [...document.querySelectorAll(selector)].find((el) => el.innerText.trim().includes(text)), {}, selector, text)
  await handle.asElement().click()
}

async function fill(page, selector, value) {
  await page.waitForSelector(selector)
  await page.click(selector, {clickCount: 3})
  await page.type(selector, value, {delay: 10})
}

// The open dialog with a margin of the app around it: legible on the page,
// and still plainly inside mssh.
async function dialogClip(page, margin = 56) {
  const box = await (await page.$('[role="dialog"]')).boundingBox()
  const viewport = page.viewport()
  const x = Math.max(0, box.x - margin), y = Math.max(0, box.y - margin)
  return {
    x, y,
    width: Math.min(viewport.width - x, box.width + 2 * margin),
    height: Math.min(viewport.height - y, box.height + 2 * margin),
  }
}

const scenes = {
  async home() {
    const page = await newPage('dark')
    await page.goto(`${BASE}/`, {waitUntil: 'networkidle0'})
    await save(page, 'home')
  },
  async terminal() {
    const page = await newPage('dark')
    await connected(page)
    await save(page, 'terminal', {png: true})
    await meta(page, 'e')
    await page.waitForFunction(() => document.body.innerText.includes('heap-2026-10-11.heapsnapshot'))
    await save(page, 'files', {png: true})
    await meta(page, 'e')
    await new Promise((r) => setTimeout(r, 500))
    await meta(page, 'p')
    await new Promise((r) => setTimeout(r, 300))
    await page.keyboard.type('stag', {delay: 40})
    await save(page, 'palette', {png: true})
  },
  async newWorkspace() {
    const page = await newPage('dark', {}, 1280, 860)
    await page.goto(`${BASE}/`, {waitUntil: 'networkidle0'})
    await clickText(page, 'main button', 'New workspace')
    await fill(page, '#workspace-name', 'Data Platform')
    await page.click('button[aria-label="violet"]')
    await fill(page, '#aws-profile', 'data-prod')
    await fill(page, '#aws-region', 'eu-west-1')
    await page.click('#workspace-name')
    await save(page, 'new-workspace', {clip: await dialogClip(page)})
  },
  async newConnection() {
    const page = await newPage('dark', {}, 1280, 1000)
    await page.goto(`${BASE}/workspaces/w-prod/servers/c-bastion`, {waitUntil: 'networkidle0'})
    await clickText(page, 'button', 'New connection')
    await clickText(page, '[role="dialog"] button', 'SSH over SSM')
    await fill(page, '#conn-name', 'reporting-db')
    await fill(page, '#conn-target', 'i-0b7f3a1c9d2e45f60')
    await fill(page, '#conn-username', 'ec2-user')
    await page.click('label[for="auth-key"]')
    await fill(page, '#conn-keypath', '~/.ssh/acme-prod-ed25519')
    await page.click('#conn-name')
    await save(page, 'new-connection', {clip: await dialogClip(page)})
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
    await clickText(page, 'main button', 'Dracula')
    await page.mouse.move(0, 0)
    await save(page, 'themes')
  },
  async dracula() {
    const page = await newPage('dark', {'terminal.theme': 'dracula'})
    await connected(page)
    await save(page, 'terminal-dracula')
  },
  async light() {
    // Auto follows the app: light mode gives GitHub Light.
    const page = await newPage('light', {'terminal.theme': 'auto'})
    await connected(page)
    await save(page, 'terminal-light')
  },
}

for (const [name, scene] of Object.entries(scenes)) {
  if (only && only !== name) continue
  await scene()
}
await browser.close()
