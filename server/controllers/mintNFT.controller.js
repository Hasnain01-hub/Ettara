const generateDataUri = require("../utils/dataUriParser");
require("dotenv").config({ path: "../.env" });
const {
  dbSaveNFTMetaData,
  dbGetNextTokenId,
} = require("../utils/dbOperations");
const { uploadImage } = require("../utils/uploadmage");
const { web3, EttarraABI } = require("../web3");

async function mintNFT(req, res) {
  try {
    // Generate the data uri from the file buffer data
    const dataUri = await generateDataUri(req.file);

    // // Save the profile image file to the database
    const secure_url = await uploadImage(dataUri.content, dataUri.fileName);
    console.log(secure_url.split("/"), "9999");
    var tokenId = secure_url.split("/")[7].split(".")[0];
    req.body.secure_url = secure_url;
    req.body.tokenId = parseInt(tokenId);
    const { title, description, reward_points } = req.body;
    console.log("this is reward", reward_points);

    // ***************************************************************
    // TODO: Call the Smart Contract to mint the NFT with the tokenId

    // Save the NFT metadata to the database
    await dbSaveNFTMetaData(req, tokenId);

    const _to = process.env.OWNER_ADDRESS;
    const _tokenId = parseInt(tokenId);
    const _uri = secure_url;
    const _threshold = reward_points;
    console.log(process.env.OWNER_ADDRESS);
    let logs;
    const ettarraContract = new (web3().eth.Contract)(
      EttarraABI.abi,
      process.env.ETTARRA_ADDRESS,
      {}
    );

    var encodedData = await ettarraContract.methods
      .safeMint(_to, _tokenId, _uri, _threshold)
      .encodeABI();

    const gasPrice = await web3().eth.getGasPrice();
    const gasEstimate = await ettarraContract.methods
      .safeMint(_to, _tokenId, _uri, _threshold)
      .estimateGas({});

    const transactionParam = {
      to: process.env.ETTARRA_ADDRESS,
      gas: gasEstimate,
      gasPrice: gasPrice,
      // value: encodedValue,
      data: encodedData,
    };
    await web3()
      .eth.accounts.signTransaction(
        transactionParam,
        process.env.OWNER_PRIVATE_KEY
      )
      .then(async (signed) => {
        await web3()
          .eth.sendSignedTransaction(signed.rawTransaction)
          .then(function (blockchain_result, events) {
            console.log("result", blockchain_result);
            logs = {
              blockchain_result,
            };
            // res.status(200).json(logs);
            // return { logs };
          });
      })
      .catch((err) => {
        console.log(err);
        logs = {
          field: "Blockchain Error",
          message: err,
        };

        res.status(400).json(logs);
        return { logs };
      });

    var block = await web3().eth.getBlock("latest");
    var blockNumber = await web3().eth.getBlockNumber();

    await ettarraContract
      .getPastEvents("safeMintEvent", {
        fromBlock: blockNumber - 5,
        toBlock: "latest",
      })
      .then(async (blockchain_result) => {
        if (blockchain_result) {
          res.status(200).json({
            success: true,
            message: "User registered successfully!",
            data: blockchain_result,
            secure_url,
          });
        }
        res.status(400).json("No event emitted");
        return;
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong!",
      error: error.message,
    });
  }
}

module.exports = { mintNFT };
