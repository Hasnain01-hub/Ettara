require("dotenv").config({ path: "./.env" });
const express = require("express");
const cors = require("cors");
const { callDatabase } = require("./config/firebase");
const { web3, web3config } = require("./web3");
const Web3 = require("web3");
const Moralis = require("moralis").default;

const main = async () => {
  const app = express();

  callDatabase();

  try {
    // console.log(await web3.eth.getBlockNumber());
    // const webya = Web3(web3T)

    web3config().then(async () => {
      try {
        console.log(await web3().eth.getBlockNumber());
        Moralis.start({
          apiKey: process.env.MORALIS_KEY,
        }).then(async (result) => {
          console.log("Web3 Connected");
        });
      } catch (e) {
        console.log(e);
      }
    });

    // console.log(await (web3(_web3.web3_link)).eth.getBlockNumber());
    // const _balance =
    // console.log(_balance)
  } catch (err) {
    console.log("Change the ngrok link! ", err);
  }

  app.use(express.json());
  app.use(
    cors({
      origin: ["http://localhost:3000/", "*"],
      credentials: true,
    })
  );
  app.use(express.urlencoded({ extended: true }));

  // Route imports
  const nftRoutes = require("./routes/nft.routes");
  const userRoutes = require("./routes/user.routes");
  const qrcodeRoutes = require("./routes/qrcode.routes");

  // Routes
  app.use("/api/nft", nftRoutes);
  app.use("/api/user", userRoutes);
  app.use("/api/qrcode", qrcodeRoutes);

  // Default URL landing page
  // Serve static assets if in production
  app.use("/", function (req, res) {
    res.sendFile(path.join(__dirname + "/express/index.html"));
    //__dirname : It will resolve to your project folder.
  });

  // PORT
  const port = process.env.PORT || 6969;
  app.listen(port, () => console.log(`Server running on port: ${port}`));
};

main().catch((e) => {
  console.log(e);
});
