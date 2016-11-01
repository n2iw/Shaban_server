#!/bin/sh

#update apt-get
sudo apt-get update

#install git
sudo apt-get install -y git

#install node.js
curl -sL https://deb.nodesource.com/setup_4.x | sudo -E bash -
sudo apt-get install -y nodejs

#install build essentials
sudo apt-get install -y build-essential

# install sails
sudo npm install -g sails
