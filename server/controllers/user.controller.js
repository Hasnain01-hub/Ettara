const { web3, EttarraABI } = require('../web3')
const Moralis = require('moralis').default
const axios = require('axios')

const _getUsersNFTs = async (req, res) => {
  const _userAddress = req.body.userAddress
  const response = await Moralis.EvmApi.utils.runContractFunction({
    address: process.env.ETTARRA_ADDRESS,
    functionName: 'getUsersNFTs',
    abi: EttarraABI.abi,
    chain: 80001,
    params: {
      userAddress: _userAddress
    }
  })
  console.log(response)
  res.status(200).json(response)
  return
}

const _viewLoyaltyPointsOfUser = async (req, res) => {
  const _userAddress = req.body.userAddress
  const response = await Moralis.EvmApi.utils.runContractFunction({
    address: process.env.ETTARRA_ADDRESS,
    functionName: 'viewLoyaltyPointsOfUser',
    abi: EttarraABI.abi,
    chain: 80001,
    params: {
      userAddress: _userAddress,
    }
  })
  console.log(response)
  res.status(200).json(response)
  return
}

const _assignNFT = async (req, res) => {
  console.log(req.body)
  const _userAddress= req.body.userAddress
  const _tokenId = req.body.tokenId

  try {
    const ettarraContract = new (web3().eth.Contract)(
        EttarraABI.abi,
        process.env.ETTARRA_ADDRESS,
      {}
    )
      var encodedData = ettarraContract.methods.assignNFT(_userAddress, _tokenId).encodeABI()
      const gasPrice = await web3().eth.getGasPrice()
      const gasEstimate = await ettarraContract.methods
        .assignNFT(_userAddress, _tokenId)
        .estimateGas({})
      const transactionParam = {
        to: process.env.ETTARRA_ADDRESS,
        gas: '300000',
        gasPrice: gasPrice,
        // value: encodedValue,
        data: encodedData
      }

      await web3()
        .eth.accounts.signTransaction(
          transactionParam,
          process.env.OWNER_PRIVATE_KEY
        )
        .then(signed => {
          web3()
            .eth.sendSignedTransaction(signed.rawTransaction)
            .then(async (blockchain_result, events) => {
              console.log(blockchain_result)
              logs = {
                blockchain_result
              }
              var block = await web3().eth.getBlock('latest')
              var blockNumber = await web3().eth.getBlockNumber()

              await ettarraContract
                .getPastEvents('assignNFTEvent', {
                  fromBlock: blockNumber - 5,
                  toBlock: 'latest'
                })
                .then(function (blockchain_result) {
                    if (blockchain_result) {
                      console.log(blockchain_result)

                      res.status(200).json(blockchain_result)
                      return
                    }
                  res.status(400).json('No event emitted')
                  return
                })
            })
        })
        .catch(err => {
          console.log(err)
          logs = {
            field: 'Blockchain Event Error',
            message: err
          }

          res.status(400).json(logs)
          return { logs }
        })
    
  } catch (err) {
    console.log(err)
    logs = {
      field: 'Blockchain Unknown Error',
      message: err
    }
    res.status(400).json(logs)
    return { logs }
  }
}

const _changeLoyaltyThreshold = async (req, res) => {
    console.log(req.body)
    const _newThreshold = req.body.newThreshold
    const _tokenId = req.body.tokenId
  
    try {
      const ettarraContract = new (web3().eth.Contract)(
          EttarraABI.abi,
          process.env.ETTARRA_ADDRESS,
        {}
      )

        var encodedData = ettarraContract.methods
          .changeLoyaltyThreshold(_tokenId, _newThreshold)
          .encodeABI()
        const gasPrice = await web3().eth.getGasPrice()
        const gasEstimate = await ettarraContract.methods
          .changeLoyaltyThreshold(_tokenId, _newThreshold)
          .estimateGas({})
        const transactionParam = {
          to: process.env.ETTARRA_ADDRESS,
          gas: '300000',
          gasPrice: gasPrice,
          // value: encodedValue,
          data: encodedData
        }
  
        await web3()
          .eth.accounts.signTransaction(
            transactionParam,
            process.env.OWNER_PRIVATE_KEY
          )
          .then(signed => {
            web3()
              .eth.sendSignedTransaction(signed.rawTransaction)
              .then(async (blockchain_result, events) => {
                console.log(blockchain_result)
                logs = {
                  blockchain_result
                }
                var block = await web3().eth.getBlock('latest')
                var blockNumber = await web3().eth.getBlockNumber()
  
                await ettarraContract
                  .getPastEvents('changeLoyaltyThresholdEvent', {
                    fromBlock: blockNumber - 5,
                    toBlock: 'latest'
                  })
                  .then(function (blockchain_result) {
                      if (blockchain_result) {
                        console.log(blockchain_result)
  
                        res.status(200).json(blockchain_result)
                        return
                      }
                    res.status(400).json('No event emitted')
                    return
                  })
              })
          })
          .catch(err => {
            console.log(err)
            logs = {
              field: 'Blockchain Event Error',
              message: err
            }
  
            res.status(400).json(logs)
            return { logs }
          })
      
    } catch (err) {
      console.log(err)
      logs = {
        field: 'Blockchain Unknown Error',
        message: err
      }
      res.status(400).json(logs)
      return { logs }
    }
}

const _addLoyaltyPointsOfUser = async (req, res) => {
    console.log(req.body)
    const _userAddress = req.body.userAddress
    const _points = req.body.points
  
    try {
      const ettarraContract = new (web3().eth.Contract)(
          EttarraABI.abi,
          process.env.ETTARRA_ADDRESS,
        {}
      )

        var encodedData = ettarraContract.methods
          .addLoyaltyPointsOfUser(_userAddress, _points)
          .encodeABI()
        const gasPrice = await web3().eth.getGasPrice()
        const gasEstimate = await ettarraContract.methods
            .addLoyaltyPointsOfUser(_userAddress, _points)
            .estimateGas({})
        const transactionParam = {
          to: process.env.ETTARRA_ADDRESS,
          gas: '300000',
          gasPrice: gasPrice,
          // value: encodedValue,
          data: encodedData
        }
  
        await web3()
          .eth.accounts.signTransaction(
            transactionParam,
            process.env.OWNER_PRIVATE_KEY
          )
          .then(signed => {
            web3()
              .eth.sendSignedTransaction(signed.rawTransaction)
              .then(async (blockchain_result, events) => {
                console.log(blockchain_result)
                logs = {
                  blockchain_result
                }
                var block = await web3().eth.getBlock('latest')
                var blockNumber = await web3().eth.getBlockNumber()
  
                await ettarraContract
                  .getPastEvents('addLoyaltyPointsOfUserEvent', {
                    fromBlock: blockNumber - 5,
                    toBlock: 'latest'
                  })
                  .then(function (blockchain_result) {
                      if (blockchain_result) {
                        console.log(blockchain_result)
  
                        res.status(200).json(blockchain_result)
                        return
                      }
                    res.status(400).json('No event emitted')
                    return
                  })
              })
          })
          .catch(err => {
            console.log(err)
            logs = {
              field: 'Blockchain Event Error',
              message: err
            }
  
            res.status(400).json(logs)
            return { logs }
          })
      
    } catch (err) {
      console.log(err)
      logs = {
        field: 'Blockchain Unknown Error',
        message: err
      }
      res.status(400).json(logs)
      return { logs }
    }
}

module.exports = {
  _getUsersNFTs,
  _viewLoyaltyPointsOfUser,
  _assignNFT,
  _changeLoyaltyThreshold,
  _addLoyaltyPointsOfUser
}
