const express = require("express");
const { mintNFT } = require("../controllers/mintNFT.controller");
const upload = require("../middlewares/multer.middleware");
const router = express.Router();
require("dotenv").config();

// Mint the NFT and save it in the database
router.post("/mint_nft", upload.single("nft_img"), mintNFT);

module.exports = router;
