

# Install node

From:
http://yoember.com/nodejs/the-best-way-to-install-node-js/
	 
```bash
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.2/install.sh | bash	

nvm list
nvm ls-remote
nvm install 6.10.3
nvm use 6.10.3
nvm alias default 6.10.3
node -v
npm install -g npm
npm -v

echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf && sudo sysctl -p

```

# Clone this repository

https://github.com/vertighel/ant-test.git

```bash
mkdir ant-test
cd ant-test
```
# Install modules

```
npm -f install
```
# Launch the project

 - Launch the websocket server,
 - launch the webserver,
 - open the html page and send messages;
 - launch as many websoket clients you want, they will send random data as messages.

The server will recieve messages from connected peers and it will dispatch these messages back, such as in an IM chat.
