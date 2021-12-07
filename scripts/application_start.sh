#!/bin/bash

#give permission for everything in the express-app directory
sudo chmod -R 777 /home/ubuntu/acetechnosys-server

#navigate into our working directory where we have all our github files
cd /home/ubuntu/acetechnosys-server

#add npm and node to path
export NVM_DIR="$HOME/.nvm"	
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # loads nvm	
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # loads nvm bash_completion (node is in path now)

#git pull
#install node modules
git pull
npm install

#start our node app in the background
sudo systemctl restart ace-technosys-server.service