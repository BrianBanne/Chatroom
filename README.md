# oblig2_nettverk

## Server
1. The backend is written in python3 with the help of the swagger flask-server boilerplate
2. Start the server with `cd flask-server && python3 -m swagger_server`
3. Due to the server and client may be running on different domains, we have utilised the `flask-cors`-package to 
make cors request to the server. 

## Client
1. The frontend is vanilla `html/js/css`, and utilises the Javascript `fetch`-api to make HTTP-requests.
2. To run the frontend we suggest to use the npm-package `http-server` and run the coomand `http-server` within the client folder
