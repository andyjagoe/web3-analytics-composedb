import { createWeb3AnalyticsComposite } from './functions/create-composite.js'
import { deployWeb3AnalyticsComposite } from './functions/deploy-composite.js'
import { compileWeb3AnalyticsComposite } from './functions/compile-composite.js'

await createWeb3AnalyticsComposite()
await compileWeb3AnalyticsComposite()
await deployWeb3AnalyticsComposite()