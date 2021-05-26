# 🔗 SHORTY - Technical Task (Primary  Bid)

[![SERVER-CI](https://github.com/uFlock/primaryBid/actions/workflows/test-server.yml/badge.svg)](https://github.com/uFlock/primaryBid/actions/workflows/test-server.yml)
[![CLIENT-CI](https://github.com/uFlock/primaryBid/actions/workflows/test-client.yml/badge.svg)](https://github.com/uFlock/primaryBid/actions/workflows/test-client.yml)

### ☀️ Features



### Project prerequisites

Before you can start working on the project you need to install the following tools:

1. Node and Npm - you can get the latest LTS version from [here](https://nodejs.org/en/). Alternatively you can use **NVM** to manage your node versions.
2. [Docker](https://docs.docker.com/get-docker/) - Please follow the instructions for your respective platform.
3. The demo is designed to run on localhost so please make sure your `3000`, `80` and `8080` ports are free, if you would
like to use different ports/hostnames you can do so by adjusting the environment variables in the respective .env files.

### Getting Source Code and Project Setup

1. Simply clone the project from `https://github.com/uFlock/primaryBid.git`.
2. Commands:
   * `npm run start` - If you want to just run the demo you can run, it will build and deploy "production" release that
     by default will run on `localhost:80` (client), `localhost:3000` (api server).
   * `npm run dev` - If you want to start development with live reload in the docker containers, it will 
     start the dev version on `localhost:8080` (client), `localhost:3000` (api server).
   * `npm run npm-install` - If you want proper type checking and module resolution whilst developing, this swill install
    all the dependencies in the respective Server and Client directories.

### Project Development


