const express = require("express");
const bodyParser = require("body-parser");
const { AWS } = require("./config");

const PORT = process.env.PORT || 4001;
const initApp = () => {
  const app = express();
  const dynamoDb = new AWS.DynamoDB();

  app.listen(PORT, "0.0.0.0", () => {
    console.log("App Listening on port", PORT);
  });

  const users = [
    {
      id: "1",
      name: "luizinho",
    },
    {
      id: "2",
      name: "evaristinho costa",
    },
    {
      id: "3",
      name: "da massa",
    },
  ];

  app.use(bodyParser.json({ type: "application/json" }));

  app.get("/users", async (req, res) => {
    const results = await dynamoDb.scan({
      TableName: 'user' 
    }).promise();
    console.log(JSON.stringify(results));
    res.status(200).json(results);

  });

  app.get("/users/:id", async (req, res) => {
    const { id } = req.params;
    const result = await dynamoDb.getItem({
      TableName: 'user',
      Key: {
        'id': { S: id }
      }
    }).promise();

    console.log(result);
    res.status(200).json(result);
  });

  app.post("/users", async (req, res) => {
    const { id, email } = req.body;

    const result = await dynamoDb.putItem({ 
      TableName: 'user',
      Item: {
        'id': { S: id },
        'email': { S: email },
      }
    }).promise();

    console.log(result);
    res.status(201).json(req.body);
  });

  app.put("/users/:id", async (req, res) => {
    const { id } = req.params;
    const { email } = req.body;

    const result = await dynamoDb.putItem({ 
      TableName: 'user',
      Item: {
        'id': { S: id },
        'email': { S: email },
      }
    }).promise();

    console.log(result);

    res.status(200);
  });

  app.delete("/users/:id", async (req, res) => {
    const { id } = req.params;
    const result = await dynamoDb.deleteItem({
      TableName: 'user',
      Key: {
        'id': { S: id }
      }
    }).promise();
    console.log(result);
    res.status(204);
  });
};

initApp();
