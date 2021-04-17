# oblig2_nettverk

## Server
1. The backend is node.js with express.
2. Install dependencies by running `npm install` in the server directory.
3. Then start the server with `node app.js`


## Client
The client is a fully browser-based client

1. The frontend is vanilla `html/js/css`, and utilises the Javascript `fetch`-api to make HTTP-requests.
2. To run the frontend we suggest to use the npm-package `http-server` and run the command `http-server` within the client folder
3. If the client is unable to fetch, check that the `BASE_URL`- variable located in the `api.js` file matches the
IP and PORT the server is running from.

### Known limitations
The bots are session-based, so by refreshing the browser, the bot-context is lost, but is 


