import { HardhatRuntimeEnvironment } from 'hardhat/types'
import { DeployFunction } from 'hardhat-deploy/dist/types'

import {
  abi as WFIL_ABI,
  bytecode as WFIL_BYTECODE,
} from '../test/contracts/WFIL.json'

const func: DeployFunction = async function ({
  ethers,
  getNamedAccounts,
  deployments,
  getChainId,
}: HardhatRuntimeEnvironment) {
  const { deploy } = deployments

  const { deployer } = await getNamedAccounts()

  await deploy('WFIL', {
    from: deployer,
    args: [deployer],
    log: true,
    deterministicDeployment: false,
    contract: {
      abi: WFIL_ABI,
      bytecode: WFIL_BYTECODE,
    },
  })
}

func.tags = ['WFIL']

export default func
