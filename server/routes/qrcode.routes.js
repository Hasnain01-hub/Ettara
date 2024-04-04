const express = require("express");
const router = express.Router();
const {   QRCodeGenerator,
    almondFrappeColdCoffee,
    bonBonColdCoffee,
    classicFrappeColdCoffee,
    hazelnutFrappeColdCoffee,
    icedAmericanoColdCoffee,
    icedLatteColdCoffee,
    madagascarChocoChipFrappeColdCoffee,
    nariyalIrishCreamFrappe,
    originalSouthIndiaFrappe,
    vietnameseColdCoffee,
    americano,
    bellatte,
    cafeLatte,
    cafeMocha,
    cappucino,
    doubleRestritto,
    espresso,
    flatWhite,
    kaapi_cino,
    seaSaltDarkMocha,
    southIndianFilterKaapi,
    hotChocolate,
    madagascarHotChocolate,
    coldBrew
} = require('../controllers/qrcode.controller');

router.post('/generate', QRCodeGenerator);
router.get('/almondFrappeColdCoffee', almondFrappeColdCoffee);
router.get('/bonBonColdCoffee', bonBonColdCoffee);
router.get('/classicFrappeColdCoffee', classicFrappeColdCoffee);
router.get('/hazelnutFrappeColdCoffee', hazelnutFrappeColdCoffee);
router.get('/icedAmericanoColdCoffee', icedAmericanoColdCoffee);
router.get('/icedLatteColdCoffee', icedLatteColdCoffee);
router.get('/madagascarChocoChipFrappeColdCoffee', madagascarChocoChipFrappeColdCoffee);
router.get('/nariyalIrishCreamFrappe', nariyalIrishCreamFrappe);
router.get('/originalSouthIndiaFrappe', originalSouthIndiaFrappe);
router.get('/vietnameseColdCoffee', vietnameseColdCoffee);
router.get('/americano', americano);
router.get('/bellatte', bellatte);
router.get('/cafeLatte', cafeLatte);
router.get('/cafeMocha', cafeMocha);
router.get('/cappucino', cappucino);
router.get('/doubleRestritto', doubleRestritto);
router.get('/espresso', espresso);
router.get('/flatWhite', flatWhite);
router.get('/kaapi_cino', kaapi_cino);
router.get('/seaSaltDarkMocha', seaSaltDarkMocha);
router.get('/southIndianFilterKaapi', southIndianFilterKaapi);
router.get('/hotChocolate', hotChocolate);
router.get('/madagascarHotChocolate', madagascarHotChocolate);
router.get('/coldBrew', coldBrew);

module.exports = router;