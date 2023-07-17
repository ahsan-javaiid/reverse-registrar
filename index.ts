import { JsonRpcProvider } from "@ethersproject/providers"
import { Contract, ethers } from "ethers"

// REF: https://developers.rsk.co/rif/rns/architecture/registry/
const RNS_REGISTRY_ADDRESS = "0xc1cb803d5169e0a9894bf0f8dcdf83090999842a"

const provider = new JsonRpcProvider("https://public-node.testnet.rsk.co")

const privKey = process.env.pk;

const signer = new ethers.Wallet(privKey, provider)

const reverseRegisterContract = new Contract(
  RNS_REGISTRY_ADDRESS,
  [
    "function claim(address owner) public returns (bytes32 node)",
    "function setName(string memory name) public returns (bytes32 node)",
  ],
  signer
)

;(async () => {
  const addr = "0x8F1c0185bb6276638774B9e94985d69d3CdB444A".toLowerCase()
  const domain = "ahsan.rsk"

  const setNameResp = await reverseRegisterContract.setName(domain)
  console.log(setNameResp)
  await setNameResp.wait()

  const claimResp = await reverseRegisterContract.claim(addr)
  console.log(claimResp)
  await claimResp.wait()

  console.log("--- all done ---")
})()
