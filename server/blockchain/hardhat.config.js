require("@nomiclabs/hardhat-waffle");
module.exports = {
  solidity: "0.8.19",
  networks: {
    hardhat: {
      chainId: 1337,
    },
    ganache: {
      url: "http://127.0.0.1:7545",
      accounts: [
        `0x01a5b6b5aa5a90d8a35e75ac590cb949bc36c0eca063fd8a4a1c4f6f1a32051e`,
      ],
    },
  },
};
