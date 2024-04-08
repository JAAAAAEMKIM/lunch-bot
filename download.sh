#!/bin/zsh

cd $HOME/Projects/lunch-bot/

# Get the current date in the desired format
DATE=$(date '+%Y-%m-%d %H:%M:%S')
pnpm run download
pnpm run build

git add lunch.json dist/
git commit -m "Commit-$DATE"
git push
