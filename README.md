# oblig2_nettverk

We are using the package concurrently to run both server and client in the same terminal window.


## How to get started:
1. from the root folder, run `npm install` to get all dependencies. It is assumed that `node` is already installed on the system.
2. Run `npm run start` to start both the server and client.
Navigate to the local address/port it is currently on. Navigate to  


## Server
1. The backend is node.js with express.


## Client
The client is a fully browser-based client

1. The frontend is vanilla `html/js/css`, and utilises the Javascript `fetch`-api to make HTTP-requests.
2. To run the frontend we suggest to use the npm-package `http-server` and run the command `http-server` within the client folder
3. If the client is unable to fetch, check that the `BASE_URL`- variable located in the `api.js` file matches the
IP and PORT the server is running from.

### Known limitations
The bots are session-based, so by refreshing the browser, the bot-context is lost, but is 


