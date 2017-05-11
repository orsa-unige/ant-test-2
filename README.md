

# Install node

From:
http://yoember.com/nodejs/the-best-way-to-install-node-js/

On Linux (other OS are treated in the previous link):

```bash
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.2/install.sh | bash	

nvm list
nvm ls-remote
nvm install 7.10.0
nvm use 7.10.0
nvm alias default 7.10.0
node -v
npm install -g npm
npm -v

```

# Clone this repository

```bash
git clone https://github.com/vertighel/ant-test.git

```
# Install missing modules

```bash
npm -f install

```

# Launch the project

 - Launch the websocket server,
 - launch the webserver,
 - open the html page and send messages;
 - launch as many websoket clients you want, they will send random data as messages.

The server will recieve messages from connected peers and it will dispatch these messages back, such as in an IM chat.
