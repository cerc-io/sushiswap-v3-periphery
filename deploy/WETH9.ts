import { HardhatRuntimeEnvironment } from 'hardhat/types'
import { DeployFunction } from 'hardhat-deploy/dist/types'

import {
  abi as WETH9_ABI,
  bytecode as WETH9_BYTECODE,
} from '../test/contracts/WETH9.json'

const func: DeployFunction = async function ({
  ethers,
  getNamedAccounts,
  deployments,
  getChainId,
}: HardhatRuntimeEnvironment) {
  const { deploy } = deployments

  const { deployer } = await getNamedAccounts()

  await deploy('WETH9', {
    from: deployer,
    args: [],
    log: true,
    deterministicDeployment: false,
    contract: {
      abi: WETH9_ABI,
      bytecode: WETH9_BYTECODE,
    },
  })
}

func.tags = ['WETH9']

export default func
