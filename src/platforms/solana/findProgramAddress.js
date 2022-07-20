import { provider } from '@depay/web3-client'
import { PublicKey, Buffer } from '@depay/solana-web3.js'
import { TOKEN_PROGRAM, ASSOCIATED_TOKEN_PROGRAM } from './constants'

export default async ({ token, owner })=>{

  const [address] = await PublicKey.findProgramAddress(
    [
      (new PublicKey(owner)).toBuffer(),
      (new PublicKey(TOKEN_PROGRAM)).toBuffer(),
      (new PublicKey(token)).toBuffer()
    ],
    new PublicKey(ASSOCIATED_TOKEN_PROGRAM)
  )

  let exists = await provider('solana').getAccountInfo(address)

  if(exists) {
    return address?.toString()
  }
}
