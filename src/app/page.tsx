import {
  ArrowDownToLine,
  CirclePlay,
  Cloud,
  FileCode2,
  FolderOpen,
  History,
  KeyRound,
  Layers,
  LockKeyhole,
  Network,
  Plus,
  RotateCw,
  Search,
  ShieldCheck,
  SquareTerminal,
  Workflow,
} from 'lucide-react'

import Image from 'next/image'

import appIcon from '@/app/icon.png'
import { GithubIcon } from '@/components/github-icon'
import { WindowFrame } from '@/components/window-frame'
import { YouTubeVideo } from '@/components/youtube-video'
import files from '@/assets/screenshots/files.webp'
import history from '@/assets/screenshots/history.webp'
import home from '@/assets/screenshots/home.webp'
import newConnection from '@/assets/screenshots/new-connection.webp'
import newWorkspace from '@/assets/screenshots/new-workspace.webp'
import palette from '@/assets/screenshots/palette.webp'
import terminalDracula from '@/assets/screenshots/terminal-dracula.webp'
import terminalLight from '@/assets/screenshots/terminal-light.webp'
import terminal from '@/assets/screenshots/terminal.webp'
import themes from '@/assets/screenshots/themes.webp'
import { faqs } from '@/lib/faqs'
import { site } from '@/lib/site'

const kinds = [
  {
    icon: FileCode2,
    name: 'System SSH',
    line: 'One alias from your ~/.ssh/config.',
    detail: 'OpenSSH does the rest — user, key, ProxyCommand, jump hosts — exactly as on the command line.',
  },
  {
    icon: KeyRound,
    name: 'Direct SSH',
    line: 'Host, user and credentials.',
    detail: 'The SSH client is compiled in. Agent, key file or a saved password; host keys always checked.',
  },
  {
    icon: Cloud,
    name: 'AWS SSM',
    line: 'An instance id, a profile, a region.',
    detail: 'Session Manager reaches instances with no open port and no public IP. You land as ssm-user.',
  },
  {
    icon: Workflow,
    name: 'SSH over SSM',
    line: 'Session Manager, then real SSH inside it.',
    detail: 'The private-subnet tunnel, your own user, and file transfer — all through the same connection.',
  },
]

const details = [
  { icon: Layers, title: 'Tabs that survive', text: 'Several terminals per machine. Switch pages and come back to the same scrollback, the same directory, the same running top.' },
  { icon: SquareTerminal, title: 'A real terminal', text: 'A full pty with xterm-256color: vim, htop and colours work, and the remote shell follows the window as you resize it.' },
  { icon: Search, title: 'Search the scrollback', text: '⌘F finds text anywhere in a session, every match highlighted, with a running count.' },
  { icon: ShieldCheck, title: 'Host keys, checked', text: 'The first time, mssh shows the fingerprint and asks — even through an SSM tunnel. A key that changed is refused, never offered.' },
  { icon: RotateCw, title: 'Busy servers, handled', text: 'When sshd’s MaxStartups turns a login away before it authenticates, mssh tries again on its own — over SSM too.' },
  { icon: Cloud, title: 'AWS your way', text: 'Use the AWS CLI’s own profiles and SSO, or keep a key pair on a workspace — imported from your shell in one click.' },
]

const security = [
  'Connections, passwords and any AWS keys live in a local SQLite file — 0600 in a 0700 directory. No account, no sync, no telemetry.',
  'Stored AWS keys reach the AWS CLI through its environment, never its command line, where any user could read them with ps.',
  'Host keys are verified against ~/.ssh/known_hosts. There is no “connect anyway”.',
  'The session history never contains a password or a key — only where the credentials came from.',
  'Only PATH is taken from your login shell, so mssh can find aws and ssh when opened from Finder.',
]

export default function Home() {
  return (
    <>
      <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur">
        <nav className="mx-auto flex h-14 max-w-6xl items-center gap-6 px-4 sm:px-6" aria-label="Main">
          <a href="#top" className="flex items-center gap-2 font-semibold tracking-tight">
            <Image src={appIcon} alt="" width={28} height={28} className="size-7" />
            mssh
          </a>
          <div className="hidden items-center gap-6 text-sm text-muted md:flex">
            <a href="#tour" className="hover:text-foreground">Tour</a>
            <a href="#connections" className="hover:text-foreground">Connections</a>
            <a href="#setup" className="hover:text-foreground">Setup</a>
            <a href="#features" className="hover:text-foreground">Features</a>
            <a href="#security" className="hover:text-foreground">Security</a>
            <a href="#faq" className="hover:text-foreground">FAQ</a>
          </div>
          <div className="ml-auto flex items-center gap-3">
            <a href={site.repo} className="text-muted hover:text-foreground" aria-label="mssh on GitHub">
              <GithubIcon className="size-5" />
            </a>
            <a
              href="#download"
              className="rounded-lg bg-accent px-3 py-1.5 text-sm font-medium text-background hover:bg-accent-strong"
            >
              Download
            </a>
          </div>
        </nav>
      </header>

      <main id="top">
        {/* Hero */}
        <section className="relative overflow-hidden">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 -top-40 h-[36rem] bg-[radial-gradient(ellipse_at_top,rgba(62,232,160,0.16),transparent_60%)]"
          />
          <div className="relative mx-auto max-w-6xl px-4 pt-20 pb-12 text-center sm:px-6 sm:pt-28">
            <p className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1 text-xs text-muted">
              <span className="size-1.5 rounded-full bg-accent" />
              New in v{site.version}: Windows preview — installer and portable zip
            </p>
            <h1 className="mx-auto mt-6 max-w-4xl text-4xl font-semibold tracking-tight text-balance sm:text-6xl">
              The SSH client for servers you <span className="text-accent">can’t SSH into</span>.
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-pretty text-muted">
              Every machine you look after, in one window — plain SSH, your <code className="font-mono text-foreground">~/.ssh/config</code>,
              and EC2 instances behind AWS Session Manager with no open port and no public IP.
            </p>
            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row sm:flex-wrap">
              <a
                href={site.download}
                className="inline-flex items-center gap-2 rounded-lg bg-accent px-5 py-3 font-medium text-background hover:bg-accent-strong"
              >
                <ArrowDownToLine className="size-5" />
                Download for macOS
              </a>
              <a
                href="#download"
                className="inline-flex items-center gap-2 rounded-lg border border-border bg-surface px-5 py-3 font-medium hover:bg-surface-raised"
              >
                <ArrowDownToLine className="size-5" />
                Download for Linux
              </a>
              <a
                href="#download"
                className="inline-flex items-center gap-2 rounded-lg border border-border bg-surface px-5 py-3 font-medium hover:bg-surface-raised"
              >
                <ArrowDownToLine className="size-5" />
                Download for Windows
              </a>
              <a
                href={site.repo}
                className="inline-flex items-center gap-2 rounded-lg border border-border bg-surface px-5 py-3 font-medium hover:bg-surface-raised"
              >
                <GithubIcon className="size-5" />
                View on GitHub
              </a>
            </div>
            <p className="mt-4 text-xs text-muted">
              Free · v{site.version} · macOS universal, Linux x86_64 and ARM64, Windows x64 (preview).
            </p>
            <a href="#tour" className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-accent hover:underline">
              <CirclePlay className="size-4" />
              Watch the 2-minute tour
            </a>
          </div>
          <div className="relative mx-auto max-w-6xl px-4 pb-24 sm:px-6">
            <WindowFrame
              src={terminal}
              priority
              title="api-gateway — SSH over SSM"
              alt="mssh connected to an EC2 instance over SSH through AWS Session Manager, showing a terminal with systemctl status and an access log, and a sidebar of workspaces"
            />
          </div>
        </section>

        {/* Video tour */}
        <section id="tour" className="scroll-mt-14 border-t border-border py-24">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <SectionHeading
              eyebrow="The tour"
              title="See mssh in two minutes"
              text="From a new workspace to a shell on an instance in a private subnet — the whole path, start to finish."
            />
            <YouTubeVideo id={site.tourVideo} title="A tour of mssh" poster={home} className="mt-14" />
            <p className="mt-4 text-center text-xs text-muted">
              Plays from YouTube once you press play — or{' '}
              <a href={`https://youtu.be/${site.tourVideo}`} className="text-accent hover:underline">watch it there</a>.
            </p>
          </div>
        </section>

        {/* Connection kinds */}
        <section id="connections" className="border-t border-border bg-surface/40 py-24">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <SectionHeading
              eyebrow="Four ways in"
              title="From a VPS you rent by the month to an instance in a private subnet"
              text="Each connection records exactly how to reach its machine, so you never assemble the command again."
            />
            <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {kinds.map(({ icon: Icon, name, line, detail }) => (
                <article key={name} className="rounded-xl border border-border bg-surface p-6">
                  <Icon className="size-6 text-accent" />
                  <h3 className="mt-4 font-semibold">{name}</h3>
                  <p className="mt-1 text-sm text-foreground/90">{line}</p>
                  <p className="mt-3 text-sm text-muted">{detail}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Setting up */}
        <section id="setup" className="py-24">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <SectionHeading
              eyebrow="Setting up"
              title="Add a machine in under a minute"
              text="Describe the machine once — mssh remembers how to reach it. Paste an ssh command and it fills the form in for you."
            />
            <div className="mt-14 grid items-start gap-8 lg:grid-cols-2">
              <Shot
                step={1}
                title="Make a workspace"
                text="A name, a colour, and the AWS profile and region its SSM machines inherit. Use the AWS CLI's own configuration, or keep a key pair here."
                image={newWorkspace}
                alt="The New workspace dialog: name Data Platform, violet colour, AWS CLI configuration, profile data-prod in eu-west-1"
              />
              <Shot
                step={2}
                title="Add a connection"
                text="Pick how to reach it, then fill in only what that way needs. Here: SSH over SSM, by instance id, as ec2-user with a key file — profile and region inherited."
                image={newConnection}
                alt="The New connection dialog with SSH over SSM selected, an instance id, user ec2-user and a key file"
              />
            </div>
          </div>
        </section>

        {/* Feature rows */}
        <section id="features" className="border-t border-border py-24">
          <div className="mx-auto flex max-w-6xl flex-col gap-28 px-4 sm:px-6">
            <Feature
              icon={Network}
              eyebrow="Workspaces"
              title="One workspace per account, environment or customer"
              text="Group machines with a colour and their own AWS profile and region. The home page picks up where you left off, and the sidebar shows which machines have a session open."
              image={home}
              alt="The mssh home page: recently used machines and three colour-coded workspaces"
            />
            <Feature
              icon={FolderOpen}
              eyebrow="Files · ⌘E"
              title="Move files over the connection you already have"
              text="Browse, download and upload over SFTP on the terminal’s own SSH connection — no second login, no second tunnel, and it works through Session Manager too. Every transfer writes to a hidden file and takes its real name only when complete, so a cancelled upload never leaves half a file behind."
              image={files}
              alt="The Files drawer listing a remote home directory, with a download in progress and finished transfers"
              reverse
            />
            <Feature
              icon={History}
              eyebrow="History"
              title="Who connected to which machine, when, and for how long"
              text="Every session is recorded with its machine, workspace, AWS profile and how it ended. Filter by workspace, machine and time, and export CSV or JSON. The record stays when a machine is renamed or deleted — and it stays on your computer."
              image={history}
              alt="The History page: a table of sessions with their duration, machine, workspace, AWS profile and how they ended"
            />
            <Feature
              icon={Search}
              eyebrow="⌘P"
              title="Jump to any machine by name, host or workspace"
              text="A command palette for your whole fleet. Type a few letters, press return, and you are on the machine — with its last session still there if it is open."
              image={palette}
              alt="The command palette filtering machines by the text stag"
              reverse
            />
          </div>
        </section>

        {/* Appearance */}
        <section id="appearance" className="border-t border-border py-24">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <SectionHeading
              eyebrow="Appearance"
              title="A terminal that looks like yours"
              text="GitHub, iTerm2, VS Code, Dracula, Nord, Solarized, Gruvbox and Tokyo Night — or Auto, which follows macOS between light and dark. Font, size, line height and cursor apply to live sessions, without reconnecting."
            />
            <WindowFrame
              src={themes}
              title="Appearance"
              className="mt-14"
              alt="The Appearance page: light, dark or system app theme, and ten terminal colour presets shown as live previews, with Dracula selected"
            />
            <div className="mt-8 grid gap-8 md:grid-cols-2">
              <figure>
                <WindowFrame src={terminalDracula} title="Dracula" alt="The same session in the Dracula terminal theme" />
                <figcaption className="mt-3 text-center text-sm text-muted">Dracula, in the dark app</figcaption>
              </figure>
              <figure>
                <WindowFrame src={terminalLight} title="GitHub Light" alt="The same session in the GitHub Light theme, with the app in light mode" />
                <figcaption className="mt-3 text-center text-sm text-muted">Auto: GitHub Light when macOS is light</figcaption>
              </figure>
            </div>
          </div>
        </section>

        {/* Smaller details */}
        <section className="border-t border-border bg-surface/40 py-24">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <SectionHeading eyebrow="The details" title="Built by debugging the hard parts" />
            <div className="mt-14 grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
              {details.map(({ icon: Icon, title, text }) => (
                <div key={title}>
                  <Icon className="size-5 text-accent" />
                  <h3 className="mt-3 font-semibold">{title}</h3>
                  <p className="mt-2 text-sm text-muted">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Security */}
        <section id="security" className="py-24">
          <div className="mx-auto grid max-w-6xl gap-12 px-4 sm:px-6 lg:grid-cols-[1fr_1.4fr]">
            <div>
              <LockKeyhole className="size-7 text-accent" />
              <h2 className="mt-4 text-3xl font-semibold tracking-tight">Nothing leaves your computer</h2>
              <p className="mt-4 text-muted">
                mssh has no servers of its own. It talks to your machines and to AWS, and to nothing else.
              </p>
            </div>
            <ul className="space-y-4">
              {security.map((item) => (
                <li key={item} className="flex gap-3 rounded-lg border border-border bg-surface p-4 text-sm">
                  <ShieldCheck className="mt-0.5 size-4 shrink-0 text-accent" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Download and install */}
        <section id="download" className="border-t border-border bg-surface/40 py-24">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <SectionHeading
              eyebrow={`Download · v${site.version}`}
              title="macOS, Linux and Windows, free"
              text="Pick the file for your system. Every build, including earlier ones, is on the GitHub releases page."
            />
            <div className="mt-12 grid gap-6 lg:grid-cols-3">
              <DownloadGroup title="macOS" files={site.downloads.macos} />
              <DownloadGroup title="Linux" files={site.downloads.linux} />
              <DownloadGroup title="Windows · preview" files={site.downloads.windows} />
            </div>
            <p className="mt-6 text-center text-sm text-muted">
              <a href={site.releases} className="text-accent hover:underline">All releases on GitHub</a>
            </p>

            <div className="mt-20 grid gap-12 lg:grid-cols-3">
              <div>
                <h3 className="text-xl font-semibold tracking-tight">Install on macOS</h3>
                <ol className="mt-6 space-y-6">
                  <Step n={1} title="Drag mssh into Applications">Open the disk image and drop the app on the Applications folder.</Step>
                  <Step n={2} title="Open it — macOS will block it the first time">
                    mssh is not signed with an Apple Developer ID yet, so the first time you open it macOS says it
                    “cannot be opened” or “cannot verify” the app. Choose <strong className="text-foreground">Done</strong>{' '}
                    (not Move to Bin).
                  </Step>
                  <Step n={3} title="Allow it in Privacy & Security">
                    Open <strong className="text-foreground">System Settings → Privacy &amp; Security</strong> and scroll down to
                    Security. Next to “mssh was blocked to protect your Mac”, click{' '}
                    <strong className="text-foreground">Open Anyway</strong>, then confirm with your password or Touch ID. You
                    only do this once; after that mssh opens like any other app.
                    <p className="mt-3">Or clear the quarantine flag from a terminal instead:</p>
                    <pre className="mt-3 overflow-x-auto rounded-lg border border-border bg-background p-4 font-mono text-xs text-foreground">
{`xattr -dr com.apple.quarantine /Applications/mssh.app`}
                    </pre>
                  </Step>
                  <Step n={4} title="For Session Manager only">
                    Install the AWS CLI and the Session Manager plugin. mssh checks for both before it connects and tells you
                    which one is missing.
                    <pre className="mt-3 overflow-x-auto rounded-lg border border-border bg-background p-4 font-mono text-xs text-foreground">
{`brew install awscli
brew install --cask session-manager-plugin`}
                    </pre>
                  </Step>
                </ol>
              </div>
              <div>
                <h3 className="text-xl font-semibold tracking-tight">Install on Linux</h3>
                <ol className="mt-6 space-y-6">
                  <Step n={1} title="Install with your package manager">
                    It brings in GTK and WebKitGTK, and mssh appears in your applications menu.
                    <pre className="mt-3 overflow-x-auto rounded-lg border border-border bg-background p-4 font-mono text-xs text-foreground">
{`sudo apt install ./mssh_${site.version}_amd64.deb
sudo dnf install ./mssh-${site.version}-1.x86_64.rpm
sudo zypper install --allow-unsigned-rpm ./mssh-${site.version}-1.x86_64.rpm`}
                    </pre>
                  </Step>
                  <Step n={2} title="Or run the AppImage">
                    For Arch, Manjaro and anything else: it carries GTK and WebKitGTK inside, so there is nothing to install.
                    <pre className="mt-3 overflow-x-auto rounded-lg border border-border bg-background p-4 font-mono text-xs text-foreground">
{`chmod +x mssh-${site.version}-x86_64.AppImage
./mssh-${site.version}-x86_64.AppImage`}
                    </pre>
                  </Step>
                  <Step n={3} title="For Session Manager only">
                    Install AWS’s own{' '}
                    <a href="https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html" className="text-accent hover:underline">AWS CLI v2</a>
                    {' '}— not the version 1 in Ubuntu’s apt — and the{' '}
                    <a href="https://docs.aws.amazon.com/systems-manager/latest/userguide/session-manager-working-with-install-plugin.html" className="text-accent hover:underline">Session Manager plugin</a>.
                    Shortcuts on Linux take Shift as well — Ctrl+Shift+T, Ctrl+Shift+P — leaving Ctrl+letter to the shell.
                  </Step>
                </ol>
              </div>
              <div>
                <h3 className="text-xl font-semibold tracking-tight">Install on Windows <span className="text-sm font-normal text-muted">· preview</span></h3>
                <ol className="mt-6 space-y-6">
                  <Step n={1} title="Run the installer">
                    It asks for administrator rights once, installs into{' '}
                    <code className="font-mono text-foreground">C:\Program Files\HaNo\mssh</code>, adds mssh to the Start menu
                    and the desktop, and installs Microsoft’s WebView2 runtime if the machine does not have it yet (Windows 11
                    does).
                    <p className="mt-3">
                      Or unzip the portable <code className="font-mono text-foreground">mssh.exe</code> anywhere and run it —
                      nothing installed, but WebView2 must already be present.
                    </p>
                  </Step>
                  <Step n={2} title="SmartScreen will warn you the first time">
                    Neither file is signed with a code signing certificate yet, so Windows says “Windows protected your PC”.
                    Choose <strong className="text-foreground">More info</strong>, then{' '}
                    <strong className="text-foreground">Run anyway</strong> — once. Your browser may ask whether to keep the
                    download first, for the same reason.
                  </Step>
                  <Step n={3} title="For Session Manager only">
                    Install the AWS CLI and the{' '}
                    <a href="https://docs.aws.amazon.com/systems-manager/latest/userguide/session-manager-working-with-install-plugin.html" className="text-accent hover:underline">Session Manager plugin</a>,
                    then start mssh again — a running program keeps the PATH it started with.
                    <pre className="mt-3 overflow-x-auto rounded-lg border border-border bg-background p-4 font-mono text-xs text-foreground">
{`winget install Amazon.AWSCLI`}
                    </pre>
                  </Step>
                  <Step n={4} title="Uninstall from Settings → Apps">
                    Your connections stay in <code className="font-mono text-foreground">%AppData%\mssh\mssh.db</code>, so
                    installing again picks up where you left off. Shortcuts take Shift, as on Linux — Ctrl+Shift+T,
                    Ctrl+Shift+P.
                  </Step>
                </ol>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="py-24">
          <div className="mx-auto max-w-3xl px-4 sm:px-6">
            <SectionHeading eyebrow="FAQ" title="Questions" />
            <div className="mt-12 divide-y divide-border rounded-xl border border-border bg-surface">
              {faqs.map((faq) => (
                <details key={faq.question} className="group p-6">
                  <summary className="cursor-pointer list-none font-medium marker:hidden">
                    <span className="flex items-center justify-between gap-4">
                      {faq.question}
                      <span className="text-muted transition group-open:rotate-45">+</span>
                    </span>
                  </summary>
                  <p className="mt-3 text-sm text-muted">{faq.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* Closing call to action */}
        <section className="border-t border-border py-24 text-center">
          <div className="mx-auto max-w-2xl px-4 sm:px-6">
            <h2 className="text-3xl font-semibold tracking-tight">Stop assembling the command</h2>
            <p className="mt-4 text-muted">Free, local, and built for the machines that are hardest to reach.</p>
            <a
              href="#download"
              className="mt-8 inline-flex items-center gap-2 rounded-lg bg-accent px-5 py-3 font-medium text-background hover:bg-accent-strong"
            >
              <ArrowDownToLine className="size-5" />
              Download mssh {site.version}
            </a>
          </div>
        </section>
      </main>

      <footer className="border-t border-border py-10 text-sm text-muted">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 sm:flex-row sm:px-6">
          <p>© 2026 {site.author}. mssh is built with Wails, Go and React.</p>
          <div className="flex gap-6">
            <a href={site.repo} className="hover:text-foreground">GitHub</a>
            <a href={site.releases} className="hover:text-foreground">Releases</a>
            <a href={`${site.repo}#readme`} className="hover:text-foreground">Documentation</a>
          </div>
        </div>
      </footer>
    </>
  )
}

function SectionHeading({ eyebrow, title, text }: { eyebrow: string; title: string; text?: string }) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      <p className="text-sm font-medium text-accent">{eyebrow}</p>
      <h2 className="mt-3 text-3xl font-semibold tracking-tight text-balance sm:text-4xl">{title}</h2>
      {text && <p className="mt-4 text-muted text-pretty">{text}</p>}
    </div>
  )
}

function Feature({
  icon: Icon,
  eyebrow,
  title,
  text,
  image,
  alt,
  reverse = false,
}: {
  icon: typeof Network
  eyebrow: string
  title: string
  text: string
  image: Parameters<typeof WindowFrame>[0]['src']
  alt: string
  reverse?: boolean
}) {
  return (
    <div className="grid items-center gap-10 lg:grid-cols-[1fr_1.6fr]">
      <div className={reverse ? 'lg:order-2' : ''}>
        <p className="flex items-center gap-2 text-sm font-medium text-accent">
          <Icon className="size-4" />
          {eyebrow}
        </p>
        <h2 className="mt-3 text-2xl font-semibold tracking-tight text-balance sm:text-3xl">{title}</h2>
        <p className="mt-4 text-muted text-pretty">{text}</p>
      </div>
      <WindowFrame src={image} alt={alt} className={reverse ? 'lg:order-1' : ''} />
    </div>
  )
}

function Shot({
  step,
  title,
  text,
  image,
  alt,
}: {
  step: number
  title: string
  text: string
  image: Parameters<typeof WindowFrame>[0]['src']
  alt: string
}) {
  return (
    <div>
      <div className="flex gap-4">
        <span className="grid size-8 shrink-0 place-items-center rounded-full border border-border bg-surface font-mono text-sm text-accent">
          {step}
        </span>
        <div className="min-w-0">
          <h3 className="flex items-center gap-2 font-semibold">
            <Plus className="size-4 text-accent" />
            {title}
          </h3>
          <p className="mt-1 text-sm text-muted">{text}</p>
        </div>
      </div>
      <WindowFrame src={image} alt={alt} className="mt-6" />
    </div>
  )
}

function DownloadGroup({
  title,
  files,
}: {
  title: string
  files: { label: string; note: string; ext: string; url: string }[]
}) {
  return (
    <div className="rounded-xl border border-border bg-surface p-6">
      <h3 className="font-semibold">{title}</h3>
      <ul className="mt-4 space-y-2">
        {files.map((f) => (
          <li key={f.url}>
            <a
              href={f.url}
              className="flex items-center gap-3 rounded-lg border border-border bg-background px-4 py-3 hover:border-accent"
            >
              <ArrowDownToLine className="size-4 shrink-0 text-accent" />
              <span className="min-w-0 flex-1">
                <span className="block text-sm font-medium">{f.label}</span>
                <span className="block text-xs text-muted">{f.note}</span>
              </span>
              <span className="font-mono text-xs text-accent">{f.ext}</span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}

function Step({ n, title, children }: { n: number; title: string; children: React.ReactNode }) {
  return (
    <li className="flex gap-4">
      <span className="grid size-8 shrink-0 place-items-center rounded-full border border-border bg-surface font-mono text-sm text-accent">
        {n}
      </span>
      {/* min-w-0: a flex child will not shrink below its content without it,
          and the command block would push the page wider than a phone. */}
      <div className="min-w-0">
        <h3 className="font-semibold">{title}</h3>
        <div className="mt-1 text-sm text-muted">{children}</div>
      </div>
    </li>
  )
}
