import { HardhatRuntimeEnvironment } from 'hardhat/types'
import { DeployFunction } from 'hardhat-deploy/dist/types'

const func: DeployFunction = async function ({
  ethers,
  getNamedAccounts,
  deployments,
  getChainId,
}: HardhatRuntimeEnvironment) {
  const { deploy } = deployments

  const { deployer } = await getNamedAccounts()

  await deploy('TestERC20', {
    from: deployer,
    // args from test/shared/completeFixture.ts
    args: [ethers.constants.MaxUint256.div(2)],
    log: true,
    deterministicDeployment: false,
  })
}

func.tags = ['TestERC20']

export default func

// Usage: yarn hardhat --network docker deploy --tags TestERC20
