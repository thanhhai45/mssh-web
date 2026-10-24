/**
 * Everything the page and its metadata say about the product, in one place.
 * Bump `version` with each release: the download button links to that exact
 * file, and the structured data reports it.
 */

const version = '0.10.0'
const repo = 'https://github.com/thanhhai45/mssh'
const file = (name: string) => `${repo}/releases/download/v${version}/${name}`

/** Every file a release ships, in the order the Download section lists them. */
const downloads = {
  macos: [
    { label: 'Disk image', note: 'Universal · Apple silicon and Intel', ext: '.dmg', url: file(`mssh-v${version}-macos-universal.dmg`) },
    { label: 'Zip archive', note: 'Universal · Apple silicon and Intel', ext: '.zip', url: file(`mssh-v${version}-macos-universal.zip`) },
  ],
  linux: [
    { label: 'Ubuntu, Debian, Mint', note: 'x86_64', ext: '.deb', url: file(`mssh_${version}_amd64.deb`) },
    { label: 'Ubuntu, Debian, Mint', note: 'ARM64', ext: '.deb', url: file(`mssh_${version}_arm64.deb`) },
    { label: 'Fedora, openSUSE', note: 'x86_64', ext: '.rpm', url: file(`mssh-${version}-1.x86_64.rpm`) },
    { label: 'Fedora, openSUSE', note: 'ARM64', ext: '.rpm', url: file(`mssh-${version}-1.aarch64.rpm`) },
    { label: 'Any other distribution', note: 'x86_64 · nothing to install', ext: '.AppImage', url: file(`mssh-${version}-x86_64.AppImage`) },
  ],
  windows: [
    { label: 'Installer', note: 'x64 · Windows 10 and 11', ext: '.exe', url: file(`mssh-v${version}-windows-amd64-installer.exe`) },
    { label: 'Portable', note: 'x64 · nothing to install, needs WebView2', ext: '.zip', url: file(`mssh-v${version}-windows-amd64.zip`) },
  ],
}

export const site = {
  name: 'mssh',
  version,
  // Where the site is published. Set NEXT_PUBLIC_SITE_URL when it moves to a
  // domain of its own; canonical URLs, the sitemap and Open Graph all follow.
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://thanhhai45.github.io/mssh-web').replace(/\/$/, ''),
  title: 'mssh — the SSH client for servers you can’t SSH into',
  shortTitle: 'mssh — SSH and AWS Session Manager in one window',
  description:
    'A free macOS, Linux and Windows app for the servers you keep having to reach. Plain SSH, your ~/.ssh/config, ' +
    'and EC2 instances behind AWS Session Manager — no open port, no public IP — in one window, ' +
    'with tabs, file transfer over the same connection and a local session history.',
  keywords: [
    'SSH client', 'macOS SSH client', 'Linux SSH client', 'Windows SSH client', 'AWS Session Manager', 'SSM', 'SSH over SSM',
    'EC2 private subnet', 'SFTP', 'terminal', 'aws ssm start-session GUI', 'ssh config manager',
    'session audit log', 'DevOps tools',
  ],
  repo,
  releases: `${repo}/releases`,
  download: downloads.macos[0].url,
  downloads,
  author: 'HaNo',
  // The two-minute tour on YouTube.
  tourVideo: 'zkfG-HS-8aY',
}
