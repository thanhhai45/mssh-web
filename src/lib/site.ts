/**
 * Everything the page and its metadata say about the product, in one place.
 * Bump `version` with each release: the download button links to that exact
 * file, and the structured data reports it.
 */

const version = '0.8.1'
const repo = 'https://github.com/thanhhai45/mssh'

export const site = {
  name: 'mssh',
  version,
  // Where the site is published. Set NEXT_PUBLIC_SITE_URL when it moves to a
  // domain of its own; canonical URLs, the sitemap and Open Graph all follow.
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://thanhhai45.github.io/mssh-web').replace(/\/$/, ''),
  title: 'mssh — the SSH client for servers you can’t SSH into',
  shortTitle: 'mssh — SSH and AWS Session Manager in one window',
  description:
    'A free macOS app for the servers you keep having to reach. Plain SSH, your ~/.ssh/config, ' +
    'and EC2 instances behind AWS Session Manager — no open port, no public IP — in one window, ' +
    'with tabs, file transfer over the same connection and a local session history.',
  keywords: [
    'SSH client', 'macOS SSH client', 'AWS Session Manager', 'SSM', 'SSH over SSM',
    'EC2 private subnet', 'SFTP', 'terminal', 'aws ssm start-session GUI', 'ssh config manager',
    'session audit log', 'DevOps tools',
  ],
  repo,
  releases: `${repo}/releases`,
  download: `${repo}/releases/download/v${version}/mssh-v${version}-macos-universal.dmg`,
  downloadZip: `${repo}/releases/download/v${version}/mssh-v${version}-macos-universal.zip`,
  author: 'HaNo',
}
