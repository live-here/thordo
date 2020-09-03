const express = require("express");
const bodyParser = require("body-parser");
const { AWS } = require("./config");

const PORT = process.env.PORT || 4001;
const initApp = () => {
  const app = express();

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

  app.get("/users", (req, res) => {
    res.json(users);
  });

  app.get("/users/:id", (req, res) => {
    const { id } = req.params;
    const user = users.find((fUser) => fUser.id === id);
    res.json(user);
  });

  app.post("/users", async (req, res) => {
    const dynamoDb = new AWS.DynamoDB();
    const result = await dynamoDb.putItem({
      ...req.body,
    });
    console.log(result);
    res.status(201).json(req.body);
  });

  // app.put("/users/:id", (req, res) => {
  //   const { id } = req.params;

  //     id: users[foundUser].id,
  //   };
  //   res.status(200).json(users[foundUser]);
  // });

  app.delete("/users/:id", (req, res) => {});
};

initApp();
