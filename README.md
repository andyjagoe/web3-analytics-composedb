# Setting up composeDB for use with Web3 Analytics

Deploy the Web3 Analytics encoded composite definition `web3-analytics-composite.json` found [here](https://github.com/andyjagoe/web3-analytics-composedb/blob/main/web3-analytics-composite.json) to your Ceramic node running ComposeDB using [these instructions](https://composedb.js.org/docs/preview/guides/using-composites/deployment). It is recommended to use this existing composite rather than deploying a new one so your data interoperates and remains composable with other analytics data.

Documentation for [Web3 Analytics](http://web3analytics.network/) is available [here](https://web3-analytics.gitbook.io/product-docs/).


# Creating and deploying a new model
Only use the approach below if you're creating a new model and don't want your data to be interoperable/composable with other Web3 Analytics data.

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

