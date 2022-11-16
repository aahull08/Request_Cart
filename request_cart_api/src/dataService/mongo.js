const mongoose = require('mongoose');
const reqModel = require('./models');

main().catch(err => console.log(err));

async function main() {
  // await mongoose.connect('mongodb://localhost:27017/requestBin');
  await mongoose.connect('mongodb://127.0.0.1:27017/requestBin');
  console.log("connected to Mongodb")
}

async function insertOne(req) {
  const reqDoc = new reqModel(req);
  const { _id: id } = await reqDoc.save();
  return id.toString();
}

function deleteOne(id) {
  return reqModel.findByIdAndDelete(id);
}

function readOne(id) {
  return reqModel.findById(id);
}

//todo: is there a better way to do this? Couldn't find an easy mongoose function
//for querying multiple documents by ID
async function readMany(idArr) {
  var requestArr = []
  for (var i = 0; i < idArr.length; i++) {
    const id = idArr[i];
    var request = await readOne(id)
    requestArr.push(request)
  }
  return requestArr
}


module.exports = { insertOne, readOne, deleteOne, readMany };