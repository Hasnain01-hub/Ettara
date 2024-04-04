const {
  getFirestore,
  Timestamp,
  FieldValue,
} = require("firebase-admin/firestore");

const db = getFirestore();

async function dbSaveNFTMetaData(req, tokenId) {
  const docRef = db.collection("NFTs").doc(tokenId);
  console.log(req.body);
  await docRef.set(req.body);
}

async function dbGetNextTokenId() {
  const docRef = db.collection("NFTs").doc("tokenCounter");

  const doc = await docRef.get();
  if (!doc.exists) {
    console.log("No such document!");
    return -1;
  }

  const tokenId = doc.data().tokenId;

  await docRef.update({
    tokenId: FieldValue.increment(1),
  });

  return tokenId;
}

module.exports = { dbSaveNFTMetaData, dbGetNextTokenId };
