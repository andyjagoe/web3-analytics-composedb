# Setting up composeDB for use with Web3 Analytics

These instructions detail how to create, compile and deploy the composite required to run Web3 Analytics with ComposeDB under Ceramic. This process can be done by running a script that uses the API or it can be done using the CLI. Instructions for each are below.

Documentation for [Web3 Analytics](http://web3analytics.network/) is available [here](https://web3-analytics.gitbook.io/product-docs/).


## API Instructions

### Create .env
Set CERAMIC_HOST=http://localhost:7007

Generate [private admin key](https://composedb.js.org/docs/0.3.x/configuration#generating-a-did-private-key) and save as CERAMIC_ADMIN_KEY using:
`composedb did:generate-private-key`

### Run setup script
Run the following script from the project root directory.
`node src/index.js`

### Add model id to ~/.ceramic/daemon.config.json under indexing.models 


## CLI Instructions

### Setup
Setup Ceramic and generate private key [according to these instructions](https://composedb.js.org/docs/0.3.x/configuration#generating-a-did-private-key)

### Create composite
`composedb composite:create event.graphql --output=event.json --ceramic-url=http://localhost:7007 --did-private-key=your_private_key`

### Compile composite
`composedb composite:compile event.json src/__generated__/definition.js --ceramic-url=http://localhost:7007`

### Add model to ~/.ceramic/daemon.config.json under indexing.models 

### Explore using Graphiql
`composedb graphql:server --ceramic-url=http://localhost:7007 --graphiql runtime-composite.json --did-private-key=your_private_key`

