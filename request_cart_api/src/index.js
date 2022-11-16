const cors = require("cors");
const express = require("express");
const dataService = require("./dataService/dataService");
const app = express();
const { v4: uuidv4 } = require('uuid');
const ws = require("ws");
// const WEBSOCKET_SERVER_URL = "ws://localhost:7071";
const WEBSOCKET_SERVER_URL = "wss://requestbin.ahullstackdeveloper.com/wsapp"
port = 4568;

app.use(cors());
app.use(express.json());
app.use(express.text());
app.use(express.urlencoded());
app.use(express.static("build"));


app.get("/carts", async (request, response) => {
  // const ip = request.ip //use locally
  const ip = request.headers['x-forwarded-for']; // use this on nginx

  try{
    const result = await dataService.getBinsFromIp(ip)
    response.json(result)
  } catch (err) {
    response.status(500).json({error: err})
  }

})

app.all("/req/:publicId", async (request, response) => {
  console.log(`${request.method} request received`);

  const binExists = await dataService.binExists(request.params.publicId);
  if (!binExists) {
    response.status(400).json({ error: "bin does not exist" });
  } else {
    await dataService.insert(request);

    const websocket = new ws(WEBSOCKET_SERVER_URL);
    console.log(websocket)
    websocket.on("open", () => {
      const message = {
        type: "new_request",
        publicId: request.params.publicId,
      };
      websocket.send(JSON.stringify(message));
      websocket.close();
    });

    response.status(200).send("thanks");
  }
});

app.get("/carts/:cartId", async (request, response) => {
  const cartId = request.params.cartId;
  try {
    const cartAndRequetsObj = await dataService.getBinInfoAndRequests(cartId);
    response.status(200).json(cartAndRequetsObj);
  } catch (err) {
    response.status(500).json({ error: err.message });
  }
});

app.post("/carts", async (request, response) => {
  const ip = request.ip
  const binId = uuidv4();
  try {
    dataService.createBin(binId, ip);
    response.status(200).json({binId})
  } catch (err) {
    response.status(500).json({err})
  }
})

app.delete("/carts/:cartId", async (request, response) => {
  const cartId = request.params.cartId
  try {
    dataService.deleteCart(cartId)
    response.sendStatus(200)
  } catch (err) {
    console.log(err)
    response.status(500).json({err})
  }
  
})

app.listen(port, () => console.log(`Server running on port ${port}`));