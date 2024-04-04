const express = require("express");
const router = express.Router();
const {   _getUsersNFTs,
    _viewLoyaltyPointsOfUser,
    _assignNFT,
    _changeLoyaltyThreshold,
    _addLoyaltyPointsOfUser
} = require('../controllers/user.controller');

router.post('/loyaltyPoints/view', _viewLoyaltyPointsOfUser);
router.post('/nfts', _getUsersNFTs);
router.post('/assignNFT', _assignNFT);
router.post('/changeLoyaltyThreshold', _changeLoyaltyThreshold);
router.post('/loyaltyPoints/add', _addLoyaltyPointsOfUser);

module.exports = router;