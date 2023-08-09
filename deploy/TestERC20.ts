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

  const existingDeployments = await deployments.all()
  const n = Object.keys(existingDeployments).filter(key => key.startsWith('TestERC20')).length;
  const nextDeployment = `TestERC20-${n}`
  const tokenSymbol = `TEST-${n}`

  await deploy(nextDeployment, {
    from: deployer,
    // args from test/shared/completeFixture.ts
    args: [ethers.constants.MaxUint256.div(2), tokenSymbol],
    log: true,
    deterministicDeployment: false,
    contract: 'TestERC20'
  })
}

func.tags = ['TestERC20']

export default func

// Usage: yarn hardhat --network docker deploy --tags TestERC20
