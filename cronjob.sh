!#/bin/bash

NODE_BIN_PATH=/home1/irteam/.nvm/versions/node/v16.13.1/bin
SCRIPT_PATH=/home1/irteam/apps/lunch-bot/dist

$NODE_BIN_PATH/node $SCRIPT_PATH/script.bundle.js $@
