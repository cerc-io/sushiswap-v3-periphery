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
  const wfil = await deployments.get('WFIL')

  // 'FIL' as a bytes32 string
  const currencyLabelBuffer = Buffer.alloc(32).fill(0)
  Buffer.from('FIL', "utf8").copy(currencyLabelBuffer);
  const currencyLabel = `0x${currencyLabelBuffer.toString("hex")}`;

  console.log('Deploying NonfungibleTokenPositionDescriptor...', {
    args: [wfil.address, currencyLabel],
  })

  const NFTDescriptor = await deployments.get('NFTDescriptor')

  await deploy('NonfungibleTokenPositionDescriptor', {
    from: deployer,
    args: [wfil.address, currencyLabel],
    log: true,
    deterministicDeployment: false,
    libraries: {
      NFTDescriptor: NFTDescriptor.address,
    },
  })
}

func.tags = ['NonfungibleTokenPositionDescriptor']

func.dependencies = ['NFTDescriptor', 'WFIL']

export default func
