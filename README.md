# 🔗 SHORTY - Technical Task (Primary  Bid)

[![SERVER-CI](https://github.com/uFlock/primaryBid/actions/workflows/test-server.yml/badge.svg)](https://github.com/uFlock/primaryBid/actions/workflows/test-server.yml)
[![CLIENT-CI](https://github.com/uFlock/primaryBid/actions/workflows/test-client.yml/badge.svg)](https://github.com/uFlock/primaryBid/actions/workflows/test-client.yml)

### ☀️ Features

     📐 Responsive Design  
     📏 Link Shortening  
     🌏 Link Title Scraping 
     📃 List of Shortened Links When Logged in   
     📝 Client Registration   
     🔑 Client Login  
     🔐 Client Logout  
     📋 One Click Copy To Clipboard    

### Project prerequisites

1. Node and Npm - get the latest LTS version from [here](https://nodejs.org/en/).
2. [Docker](https://docs.docker.com/get-docker/) - Please follow the instructions for your respective platform.
3. The demo is designed to run on localhost so please make sure `3000`, `80` and `8080` ports are free, to use 
   different ports/hostnames adjust the environment variables in the respective .env files as well as docker compose port mappings.

### Getting Started

1. Simply clone the project from `https://github.com/uFlock/primaryBid.git`.
2. Commands:
   * `npm run start` - builds and starts the "production" release that
     by default will run on `localhost:80` (client), `localhost:3000` (api server).
   * `npm run dev` - starts development version with live reload in the docker containers, by default it will run on `localhost:8080` (client), `localhost:3000` (api server).
   * `npm run npm-install` - If you want proper type checking and module resolution whilst developing, this swill install
    all the dependencies in the respective Server and Client directories.

### Project Development


