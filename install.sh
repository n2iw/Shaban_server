#!/bin/sh

#update apt-get
sudo apt-get update

#install git
sudo apt-get install -y git

#install dotfiles
cd
git clone https://github.com/n2iw/dotfiles.git
cd dotfiles
./install.sh

# install MySQL
sudo apt-get install -y mysql-server mysql-client libmysqlclient-dev

#install node.js
curl -sL https://deb.nodesource.com/setup_4.x | sudo -E bash -
sudo apt-get install -y nodejs

#install build essentials
sudo apt-get install -y build-essential

# install sails
sudo npm install -g sails

#install Server-side Packages
npm install
