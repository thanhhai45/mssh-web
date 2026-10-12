// Renders the 1200x630 social card from the app icon and a real screenshot.
import {readFileSync} from 'node:fs'
import puppeteer from 'puppeteer'

const WEB = new URL('../..', import.meta.url).pathname.replace(/\/$/, '')
const data = (path, type) => `data:${type};base64,${readFileSync(path).toString('base64')}`
const icon = data(`${WEB}/src/app/icon.png`, 'image/png')
const shot = data(`${WEB}/src/assets/screenshots/terminal.webp`, 'image/webp')

const html = `<!doctype html><html><head><style>
  * { margin: 0; box-sizing: border-box; }
  body { width: 1200px; height: 630px; overflow: hidden; background: #080b12; color: #e8ecf3;
         font-family: -apple-system, 'SF Pro Display', 'Helvetica Neue', sans-serif; position: relative; }
  .glow { position: absolute; inset: -200px 0 auto; height: 600px;
          background: radial-gradient(ellipse at 30% 20%, rgba(62,232,160,.20), transparent 60%); }
  .text { position: absolute; left: 72px; top: 92px; width: 520px; }
  .brand { display: flex; align-items: center; gap: 18px; font-size: 40px; font-weight: 700; }
  .brand img { width: 76px; height: 76px; }
  h1 { margin-top: 44px; font-size: 54px; line-height: 1.08; font-weight: 700; letter-spacing: -1.5px; }
  h1 span { color: #3ee8a0; }
  p { margin-top: 26px; font-size: 24px; line-height: 1.4; color: #8b95a7; }
  .shot { position: absolute; left: 640px; top: 96px; width: 820px; border-radius: 14px; overflow: hidden;
          border: 1px solid #1f2735; box-shadow: 0 30px 80px rgba(0,0,0,.6); }
  .bar { height: 30px; background: #141a26; display: flex; gap: 8px; align-items: center; padding-left: 14px; }
  .bar i { width: 11px; height: 11px; border-radius: 50%; display: block; }
  .shot img { display: block; width: 100%; }
</style></head><body>
  <div class="glow"></div>
  <div class="text">
    <div class="brand"><img src="${icon}">mssh</div>
    <h1>The SSH client for servers you <span>can’t SSH into</span>.</h1>
    <p>SSH, ~/.ssh/config and AWS Session Manager in one window. Free for macOS.</p>
  </div>
  <div class="shot"><div class="bar"><i style="background:#ff5f57"></i><i style="background:#febc2e"></i><i style="background:#28c840"></i></div><img src="${shot}"></div>
</body></html>`

const browser = await puppeteer.launch({headless: true})
const page = await browser.newPage()
await page.setViewport({width: 1200, height: 630, deviceScaleFactor: 1})
await page.setContent(html, {waitUntil: 'load'})
for (const name of ['opengraph-image', 'twitter-image']) {
  await page.screenshot({path: `${WEB}/src/app/${name}.png`, type: 'png'})
}
await browser.close()
console.log('og done')
