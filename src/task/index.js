const express = require("express");
const bodyParser = require("body-parser");

const PORT = process.env.PORT || 4001;

const initApp = () => {
  const app = express();
  const tasks = [
    {
      id: "1",
      userId: "2",
      status: true,
      title: "Eai pessoal",
      description: "oi wiix aqui",
    },
    {
      id: "2",
      status: false,
      userId: "3",
      title: "Caio",
      description: "eae",
    },
    {
      id: "3",
      status: false,
      userId: "3",
      title: "Bom dia ",
      description: "oi wiix aqui",
    },
  ];

  app.listen(PORT, "0.0.0.0", () => {
    console.log("App Listening on port", PORT);
  });

  app.use(bodyParser.json({ type: "application/json" }));

  app.get("/tasks", (req, res) => {
    const { userId } = req.query;
    const uTasks = tasks.filter((t) => t.userId === userId);
    res.json(uTasks);
  });

  app.get("/tasks/:id", (req, res) => {
    const { id } = req.params;
    const task = tasks.find((fTask) => fTask.id === id);
    res.json(task);
  });

  app.post("/tasks", (req, res) => {
    tasks.push(req.body);
    res.status(201).json(req.body);
  });

  app.put("/tasks/:id", (req, res) => {
    const { id } = req.params;

    const foundTask = tasks.findIndex((task) => task.id === id);
    tasks[foundTask] = {
      ...tasks[foundTask],
      ...req.body,
      id: tasks[foundTask].id,
    };
    res.status(200).json(tasks[foundTask]);
  });

  app.delete("/tasks/:id", (req, res) => {
    const { id } = req.params;

    const index = tasks.findIndex((task) => task.id === id);
    tasks.splice(index, 1);
    res.status(200).json(tasks);
  });
};

initApp();
