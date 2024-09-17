# PersonaAPI

Rest API server using the **Domain-Driven Design (DDD)** principles, token-based authentication and mongo as datasource.

## TypeScript and NodeJS Usage

**ts-node** is implemented for dev purposes. Down below, config instructions:

1. Install TypeScript and dependencies
```
npm i -D typescript @types/node ts-node-dev rimraf
```
2. Initialize TypeScript config file
```
npx tsc --init --outDir dist/ --rootDir src
```

3. Defining scripts
```
  "dev": "tsnd --respawn --clear src/app.ts",
  "build": "rimraf ./dist && tsc",
  "start": "npm run build && node dist/app.js"
```
