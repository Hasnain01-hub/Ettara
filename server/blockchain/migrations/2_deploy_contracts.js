const AttarraContract = artifacts.require("AttarraContract");
// const Validation = artifacts.require("Validation");
// const Tracking = artifacts.require("Tracking");

module.exports = function (deployer) {
    deployer.deploy(AttarraContract, { from: '0xd06479182193D2c0EDDFcc9bA7d4b607868b804C', value: "240000000000000" });
};
