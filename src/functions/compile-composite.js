import 'dotenv/config'
import { CeramicClient } from '@ceramicnetwork/http-client'
import { writeEncodedCompositeRuntime } from '@composedb/devtools-node'
import { DID } from 'dids'
import { Ed25519Provider } from 'key-did-provider-ed25519'
import { getResolver } from 'key-did-resolver'
import { fromString } from 'uint8arrays/from-string'

const CERAMIC_HOST = process.env.CERAMIC_HOST
const CERAMIC_ADMIN_KEY = process.env.CERAMIC_ADMIN_KEY

// Hexadecimal-encoded private key for a DID having admin access to the target Ceramic node
const privateKey = fromString(CERAMIC_ADMIN_KEY, 'base16') 

const did = new DID({
  resolver: getResolver(),
  provider: new Ed25519Provider(privateKey),
})
await did.authenticate()

// Replace by the URL of the Ceramic node you want to deploy the Models to
const ceramic = new CeramicClient(CERAMIC_HOST)
// An authenticated DID with admin access must be set on the Ceramic instance
ceramic.did = did


const compileWeb3AnalyticsComposite = async () => {
    // Compile runtime definition
    await writeEncodedCompositeRuntime(
      ceramic, 
      'src/__generated__/event.json', 
      'src/__generated__/definition.js'
    )
}

export { compileWeb3AnalyticsComposite }