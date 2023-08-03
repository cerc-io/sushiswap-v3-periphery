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

  const chainId = await getChainId()

  // Use tokens as done in tests?
  // (test/shared/completeFixture.ts)
  const weth9 = await deployments.get('WETH9')

  // 'ETH' as a bytes32 string
  const ethCurrencyLabel = '0x4554480000000000000000000000000000000000000000000000000000000000'

  console.log('Deploying NonfungibleTokenPositionDescriptor...', {
    args: [weth9.address, ethCurrencyLabel],
  })

  const NFTDescriptor = await deployments.get('NFTDescriptor')

  await deploy('NonfungibleTokenPositionDescriptor', {
    from: deployer,
    args: [weth9.address, ethCurrencyLabel],
    log: true,
    deterministicDeployment: false,
    libraries: {
      NFTDescriptor: NFTDescriptor.address,
    },
  })
}

func.tags = ['NonfungibleTokenPositionDescriptor']

func.dependencies = ['NFTDescriptor', 'WETH9']

export default func
