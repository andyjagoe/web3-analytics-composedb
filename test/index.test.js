import { jest } from '@jest/globals'
import 'dotenv/config'
import { createWeb3AnalyticsComposite } from '../src/functions/create-composite.js'
import { compileWeb3AnalyticsComposite } from '../src/functions/compile-composite.js'
import { deployWeb3AnalyticsComposite } from '../src/functions/deploy-composite.js'
import { ComposeClient } from '@composedb/client'
import { DID } from 'dids'
import { Ed25519Provider } from 'key-did-provider-ed25519'
import { getResolver } from 'key-did-resolver'
import { fromString } from 'uint8arrays/from-string'


const CERAMIC_HOST = process.env.CERAMIC_HOST
const CERAMIC_ADMIN_KEY = process.env.CERAMIC_ADMIN_KEY

const privateKey = fromString(CERAMIC_ADMIN_KEY, 'base16') 
const did = new DID({
  resolver: getResolver(),
  provider: new Ed25519Provider(privateKey),
})
await did.authenticate()


describe('Set up Web3 Analytics for compositeDb', () => {
  
    it('Create composite', async () => {
        await createWeb3AnalyticsComposite()
    });

    it('Compile composite', async () => {
        await compileWeb3AnalyticsComposite()
    });

    it('Deploy composite', async () => {
        await deployWeb3AnalyticsComposite()
    });

    it('Can add data', async () => {
        let { definition } = await import('../src/__generated__/definition.js');
        const compose = new ComposeClient({ ceramic: CERAMIC_HOST, definition })
        compose.setDID(did)

        const result = await compose.executeQuery(`
            mutation CreateNewEvent($i: CreateEventInput!){
                createEvent(input: $i){
                    document{
                        id
                        did
                        app_id
                        created_at
                        updated_at
                    }
                }
            }
        `,
        {
            "i": {
              "content": {
                "did": "did:key:zQ3shviNesaR4tePLzV5dAe3VhyMxMkCu2jgwwKZ9fSCikQ8E", 
                "app_id": "0xD2306Ed7C66dEe0A23FDc4225FAe18CaA1dCF14A", 
                "created_at": "2022-12-12T18:48:06Z", 
                "updated_at": 1657746000077
              }
            }
          }
        )
        //console.log(JSON.stringify(result, null, 2))

        const myDid = result.data.createEvent.document.did
        expect(myDid).toBe('did:key:zQ3shviNesaR4tePLzV5dAe3VhyMxMkCu2jgwwKZ9fSCikQ8E')        
    });

    it('Can query data', async () => {
        let { definition } = await import('../src/__generated__/definition.js');
        const compose = new ComposeClient({ ceramic: CERAMIC_HOST, definition })
        const result = await compose.executeQuery(`
            query{
                eventIndex(last:1000) {
                    edges {
                        node {
                        did
                        id
                        app_id
                        }
                    }
                }
            }
        `)
        //console.log(JSON.stringify(result, null, 2))

        expect(result.data.eventIndex.edges.length > 0).toBe(true)
    });

});  