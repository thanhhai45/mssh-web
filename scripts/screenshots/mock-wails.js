// Screenshot-only stand-in for the Wails bridge: realistic, deterministic data.
(function () {
  const listeners = {}
  const emit = (name, data) => (listeners[name] || []).slice().forEach((cb) => cb(data))
  const now = Math.floor(Date.now() / 1000)
  const H = 3600, D = 86400

  // Terminal output for a session, sent the moment the terminal subscribes.
  const transcripts = {}
  window.runtime = new Proxy({
    EventsOnMultiple(name, cb) {
      (listeners[name] ||= []).push(cb)
      const sessionId = name.startsWith('session:output:') && name.slice('session:output:'.length)
      if (sessionId && transcripts[sessionId]) setTimeout(() => cb(transcripts[sessionId]), 50)
      return () => { listeners[name] = listeners[name].filter((x) => x !== cb) }
    },
    EventsEmit: emit,
    Environment: async () => ({platform: 'darwin', arch: 'arm64', buildType: 'production'}),
  }, {get: (t, k) => t[k] || (() => {})})

  const ws = (id, name, color, profile, region, source = 'cli') => ({
    id, name, color, awsProfile: profile, awsRegion: region, awsCredentialsSource: source,
    awsAccessKeyId: '', sortOrder: 0, createdAt: now - 90 * D, updatedAt: now - 3 * D,
  })
  const workspaces = [
    ws('w-prod', 'Acme Production', 'red', 'acme-prod', 'ap-southeast-1'),
    ws('w-stg', 'Acme Staging', 'amber', 'acme-staging', 'ap-southeast-1'),
    ws('w-home', 'Personal', 'teal', '', ''),
  ]
  const conn = (id, workspaceId, name, kind, target, username, extra = {}) => ({
    id, workspaceId, name, kind, target, port: kind === 'ssh' || kind === 'ssm-ssh' ? 22 : 0,
    username, authMethod: kind === 'ssm' || kind === 'ssh-config' ? '' : 'agent', keyPath: '',
    awsProfile: '', awsRegion: '', extra: '', color: '', sortOrder: 0,
    createdAt: now - 60 * D, updatedAt: now - 2 * D, lastUsedAt: 0, ...extra,
  })
  const connections = {
    'w-prod': [
      conn('c-api', 'w-prod', 'api-gateway', 'ssm-ssh', 'i-0a1b2c3d4e5f60718', 'ec2-user', {lastUsedAt: now - 120}),
      conn('c-pay', 'w-prod', 'payments-worker', 'ssm', 'i-0f9e8d7c6b5a40312', '', {lastUsedAt: now - 2 * H}),
      conn('c-bastion', 'w-prod', 'bastion', 'ssh', '203.0.113.10', 'deploy', {lastUsedAt: now - D}),
    ],
    'w-stg': [
      conn('c-web', 'w-stg', 'web-staging', 'ssh', '10.20.1.15', 'ubuntu', {lastUsedAt: now - 3 * H}),
      conn('c-db', 'w-stg', 'db-staging', 'ssm-ssh', 'i-07c3e2a91b5d4f286', 'ec2-user', {lastUsedAt: now - 2 * D}),
    ],
    'w-home': [
      conn('c-lab', 'w-home', 'homelab', 'ssh-config', 'homelab', '', {lastUsedAt: now - 5 * H}),
      conn('c-vps', 'w-home', 'vps-singapore', 'ssh', '198.51.100.24', 'hai', {lastUsedAt: now - 6 * D}),
    ],
  }
  const allConnections = Object.values(connections).flat()

  const G = '\x1b[32m', B = '\x1b[1m', D0 = '\x1b[0m', C = '\x1b[36m', Y = '\x1b[33m', M = '\x1b[90m'
  const prompt = `${G}[ec2-user@ip-10-0-3-41 ${B}~${D0}${G}]$${D0} `
  const lines = [
    'Last login: Sun Oct 12 09:14:02 2026 from 10.0.1.12',
    '',
    `${prompt}systemctl status api-gateway --no-pager`,
    `${G}●${D0} api-gateway.service - Acme API gateway`,
    `     Loaded: loaded (/etc/systemd/system/api-gateway.service; ${G}enabled${D0})`,
    `     Active: ${G}${B}active (running)${D0} since Sat 2026-10-11 22:41:07 UTC; 10h ago`,
    '   Main PID: 2817 (node)',
    '      Tasks: 11 (limit: 4596)',
    '     Memory: 182.4M',
    '        CPU: 6min 12.884s',
    '',
    `${prompt}df -h /`,
    'Filesystem      Size  Used Avail Use% Mounted on',
    '/dev/nvme0n1p1   30G   11G   20G  35% /',
    '',
    `${prompt}tail -n 5 /var/log/api-gateway/access.log`,
    `${M}10.0.12.7${D0} - - [12/Oct/2026:09:31:02 +0000] "${C}GET /v1/orders/8812${D0}" ${G}200${D0} 1.9kB 12ms`,
    `${M}10.0.12.7${D0} - - [12/Oct/2026:09:31:03 +0000] "${C}POST /v1/payments${D0}" ${G}201${D0} 412B 48ms`,
    `${M}10.0.14.2${D0} - - [12/Oct/2026:09:31:03 +0000] "${C}GET /v1/health${D0}" ${G}200${D0} 18B 1ms`,
    `${M}10.0.12.9${D0} - - [12/Oct/2026:09:31:05 +0000] "${C}GET /v1/orders?page=2${D0}" ${G}200${D0} 7.4kB 22ms`,
    `${M}10.0.14.2${D0} - - [12/Oct/2026:09:31:06 +0000] "${C}PATCH /v1/orders/8812${D0}" ${Y}409${D0} 96B 9ms`,
    '',
    prompt,
  ]
  transcripts['s-api'] = lines.join('\r\n')

  const e = (dir, name, isDir, size, ago, extra = {}) => ({
    name, path: (dir === '/' ? '' : dir) + '/' + name, isDir, isLink: false, size,
    modifiedAt: now - ago, mode: isDir ? 'drwxr-xr-x' : '-rw-r--r--', ...extra,
  })
  const home = '/home/ec2-user'
  const fs = {
    [home]: [
      e(home, 'api-gateway', true, 0, 10 * H),
      e(home, 'logs', true, 0, 60, {isLink: true}),
      e(home, 'releases', true, 0, 2 * D),
      e(home, '.bashrc', false, 3771, 120 * D),
      e(home, 'config.yaml', false, 2148, 3 * D),
      e(home, 'deploy.sh', false, 1906, 9 * D, {mode: '-rwxr-xr-x'}),
      e(home, 'heap-2026-10-11.heapsnapshot', false, 214958080, 14 * H),
      e(home, 'release-2026.10.12.tar.gz', false, 48234496, 30),
    ],
  }
  const transfers = [
    {id: 't3', sessionId: 's-api', direction: 'download', name: 'heap-2026-10-11.heapsnapshot',
      source: home + '/heap-2026-10-11.heapsnapshot', destination: '/Users/hai/Downloads/heap-2026-10-11.heapsnapshot',
      done: 131072000, total: 214958080, state: 'running', message: '', startedAt: now - 20},
    {id: 't2', sessionId: 's-api', direction: 'upload', name: 'release-2026.10.12.tar.gz',
      source: '/Users/hai/build/release-2026.10.12.tar.gz', destination: home + '/release-2026.10.12.tar.gz',
      done: 48234496, total: 48234496, state: 'done', message: '', startedAt: now - 60},
    {id: 't1', sessionId: 's-api', direction: 'download', name: 'config.yaml',
      source: home + '/config.yaml', destination: '/Users/hai/Downloads/config.yaml',
      done: 2148, total: 2148, state: 'done', message: '', startedAt: now - 300},
  ]

  const byId = Object.fromEntries(allConnections.map((c) => [c.id, c]))
  const wsById = Object.fromEntries(workspaces.map((w) => [w.id, w]))
  const log = (n, connectionId, openedAgo, minutes, endReason, endMessage = '') => {
    const c = byId[connectionId], w = wsById[c.workspaceId]
    const opened = now - openedAgo
    return {
      id: 'log-' + n, connectionId, workspaceId: w.id, connectionName: c.name, workspaceName: w.name,
      kind: c.kind, target: c.target, username: c.username,
      awsProfile: c.kind.startsWith('ssm') ? w.awsProfile : '', awsRegion: c.kind.startsWith('ssm') ? w.awsRegion : '',
      awsCredentialsSource: c.kind.startsWith('ssm') ? 'cli' : '',
      openedAt: opened, closedAt: endReason ? opened + minutes * 60 : 0, endReason, endMessage, reconnectOf: '',
    }
  }
  const sessionLog = [
    log(1, 'c-api', 5 * 60, 0, ''),
    log(2, 'c-pay', 2 * H, 21, 'failed', 'Session Manager ended the session with i-0f9e8d7c6b5a40312 - most often the idle timeout on the account, which defaults to 20 minutes'),
    log(3, 'c-lab', 5 * H, 47, 'closed'),
    log(4, 'c-web', 3 * H + 600, 12, 'ended'),
    log(5, 'c-bastion', D, 8, 'closed'),
    log(6, 'c-api', D + 2 * H, 95, 'closed'),
    log(7, 'c-db', 2 * D, 33, 'app-quit'),
    log(8, 'c-pay', 2 * D + 5 * H, 4, 'failed', 'i-0f9e8d7c6b5a40312 is not reachable through Session Manager'),
    log(9, 'c-web', 3 * D, 61, 'closed'),
    log(10, 'c-vps', 6 * D, 15, 'ended'),
    log(11, 'c-bastion', 6 * D + 3 * H, 2, 'interrupted'),
  ]

  let sessionCount = 0
  const App = {
    ListWorkspaces: async () => workspaces,
    GetWorkspace: async (id) => wsById[id],
    ListConnections: async (id) => connections[id] || [],
    GetConnection: async (id) => byId[id],
    OpenSessions: async () => [{sessionId: 's-pay', connectionId: 'c-pay'}],
    GetAllSettings: async () => (window.__mockSettings || {}),
    SetSetting: async () => null,
    ListTransfers: async () => transfers,
    ListSessionLog: async (filter) => sessionLog.filter((row) => !filter.from || row.openedAt >= filter.from),
    HasConnectionPassword: async () => false,
    HasWorkspaceAWSSecret: async () => false,
    CheckSSMTools: async () => null,
    ResolveAWSForConnection: async () => ({profile: 'acme-prod', region: 'ap-southeast-1', profileFrom: 'workspace', regionFrom: 'workspace'}),
    async ConnectSession(connectionId) {
      sessionCount++
      const id = connectionId === 'c-api' ? 's-api' : 's-' + connectionId + '-' + sessionCount
      setTimeout(() => emit('session:status', {sessionId: id, connectionId, state: 'connected', message: ''}), 10)
      return id
    },
    async ListRemoteDirectory(sessionId, dir) {
      const path = dir === '' ? home : dir
      if (!fs[path]) throw 'list ' + path + ': file does not exist'
      const entries = fs[path].slice().sort((a, b) => (b.isDir - a.isDir) || a.name.toLowerCase().localeCompare(b.name.toLowerCase()))
      return {path, parent: path.slice(0, path.lastIndexOf('/')) || '/', entries}
    },
  }
  window.go = {main: {App: new Proxy(App, {get: (t, k) => t[k] || (async () => null)})}}
})()
