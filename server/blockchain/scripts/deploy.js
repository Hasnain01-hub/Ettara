const hre = require("hardhat");
require("@nomiclabs/hardhat-waffle");
async function main() {
  const OrganizationFactory = await hre.ethers.getContractFactory("Ettarra");
  const orgFactory = await OrganizationFactory.deploy();

  await orgFactory.deployed();

  console.log("Factory deployed to:", orgFactory.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });
