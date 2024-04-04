#!/bin/zsh

cd $HOME/Projects/lunch-bot/

# Get the current date in the desired format
DATE=$(date '+%Y-%m-%d %H:%M:%S')
pnpm run download

git add lunch.json
git commit -m "Commit-$MESSAGE"
git push
