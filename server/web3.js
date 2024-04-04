// import Web3 from "web3";
// import fs from "fs";
// import { connection } from "./connection";
const Web3 = require("web3");
const fs = require("fs");
// const connection = require('./connection');

let _web3;

// exports.web3 = {

//     connectToServer: async function (callback) {
//         const db = await connection.getDb();
//         const collection = db.collection('config');
//         _web3 = await collection.findOne({
//             _id: "web3"
//         });
//         return _web3.web3_link;
//     },

//     getWeb3: function () {
//         return new Web3(
//             new Web3.providers.HttpProvider(_web3.web3_link)
//         );
//     }
// };

// exports.web3 = async () => {
//     const web3 = await  new Web3(
//         new Web3.providers.HttpProvider('https://e159-103-250-36-82.ngrok.io'));
//     return web3;
// }

exports.web3config = async () => {
  // const web3_ = await con.connection.db.collection('config').findOne({_id: 'web3'})
  // _web3 = web3_
  // console.log(_web3)
};

exports.web3 = () => {
  return new Web3(new Web3.providers.HttpProvider(`http://127.0.0.1:7545`));
  // new Web3.providers.HttpProvider(_web3.web3_link));
};

// exports.web3 = async () => {

exports.EttarraABI = JSON.parse(
  fs.readFileSync(
    "blockchain/artifacts/contracts/Ettarra.sol/Ettarra.json",
    "utf-8"
  )
);
