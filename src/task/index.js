require('trace');
const express = require("express");
const uuid = require("uuid");
const bodyParser = require("body-parser");
const { AWS } = require("./config");

const PORT = process.env.PORT || 4002;

const initApp = () => {
  const app = express();
  const dynamoDb = new AWS.DynamoDB();

  app.listen(PORT, "0.0.0.0", () => {
    console.log("App Listening on port", PORT);
  });

  app.use(bodyParser.json({ type: "application/json" }));

  app.get("/tasks", async (req, res) => {
    const { userId } = req.query;
    
    const result = await dynamoDb.query({
      KeyConditionExpression: 'userId = :userId',
      ExpressionAttributeValues: {
        ':userId': { S: userId }, 
      },
      TableName: 'task',
    }).promise();


    res.json(result);
  });

  app.get("/tasks/:id", (req, res) => {
    const { id } = req.params;
    const task = tasks.find((fTask) => fTask.id === id);
    res.json(task);
  });

  app.post("/tasks", async (req, res) => {
    const { userId, title, description, status } = req.body;

    const result = await dynamoDb.putItem({ 
      TableName: 'task',
      Item: {
        id: { S: uuid.v1() },
        userId: { S: userId },
        title: { S: title },
        status: { BOOL: status }, 
        description: { S: description }
      }
    }).promise();

    console.log(result);
    res.status(201).json(req.body);
  });

  app.put("/tasks/:id", async (req, res) => {
    const { id } = req.params;
    const { description, title, status, userId } = req.body;
    const result = await dynamoDb.putItem({
      TableName: 'task',
      Item: {
        id: { S: id },
        userId: { S: userId },
        title: { S: title },
        status: { BOOL: status }, 
        description: { S: description }
      }
    }).promise();
    console.log(JSON.stringify(result, null, 2));
    
    res.json(result);
  });

  app.delete("/tasks/:id", async (req, res) => {
    const { id } = req.params;
    const { userId } = req.body;
    const result = await dynamoDb.deleteItem({
      TableName: 'task',
      Key: {
        id: { S: id },
        userId: { S: userId }
      }
    }).promise();
    console.log(result);
    res.status(204);
  });
};

initApp();
