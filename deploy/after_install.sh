#!/bin/bash

#Instalacion paquetes necesarios
sudo apt-get update
sudo apt -y install npm

#nvm installation
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.4/install.sh | bash
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
nvm install v18.13.0
node -v

#create directory for app logs
sudo mkdir /var/log/merge-sort-app

#we add the api as a service unit in systemd service manager 
cat > /home/ubuntu/merge-sort-app.service <<EOF
[Unit]
Description=Simple NodeJs App with merge-sort algorithm and other endpoints for testing
After=network.target
[Service]
ExecStart=/usr/bin/node /home/ubuntu/merge-sort-api/index.js
WorkingDirectory=/home/ubuntu/merge-sort-api
Restart=always
User=ubuntu
Environment=PATH=/usr/bin:/usr/local/bin
Environment=NODE_ENV=production
Environment=PORT=3000
StandardOutput=file:/var/log/merge-sort-app/logs.log
StandardError=file:/var/log/merge-sort-app/logs.log
[Install]
WantedBy=multi-user.target
EOF

sudo mv /home/ubuntu/merge-sort-app.service /etc/systemd/system/

#create link to nodejs executable
sudo ln -s "$(which node)" /usr/bin/node 2> /dev/null

echo "--------------------------------after_install.sh successfully completed--------------------------------"


