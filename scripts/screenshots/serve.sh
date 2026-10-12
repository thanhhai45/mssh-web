#!/bin/sh
# Serves mssh's frontend with a fake Wails bridge, for screenshots.
#
# The frontend is copied to a temporary folder so the mssh repository is never
# touched; only the copy gets mock-wails.js. Needs `npm install` to have run in
# mssh/frontend once.
set -eu
here=$(cd "$(dirname "$0")" && pwd)
mssh=${MSSH_DIR:-"$here/../../../mssh"}
work=$(mktemp -d)
trap 'rm -rf "$work"' EXIT

rsync -a --exclude node_modules --exclude dist "$mssh/frontend/" "$work/"
ln -s "$(cd "$mssh/frontend" && pwd)/node_modules" "$work/node_modules"
mkdir -p "$work/public"
cp "$here/mock-wails.js" "$work/public/"
sed -i.bak 's#<div id="root"></div>#<div id="root"></div><script src="/mock-wails.js"></script>#' "$work/index.html"

cd "$work" && npx vite --port 5192 --strictPort
