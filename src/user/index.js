const express = require('express');
const bodyParser = require('body-parser')

const PORT = process.env.PORT || 3001;

const initApp = () => {
  const app = express();
    const users = [{
      id: '1', name: 'luizinho'
    }, {
      id: '2',
      name: 'evaristinho costa'
    }, {
      id: '3',
      name: 'da massa'
    }];

    app.listen(PORT, '0.0.0.0', () => {
        console.log('App Listening on port', PORT);
    });

    app.use(bodyParser.json({ type: 'application/json' }));

    app.get('/users', (req, res) => {
      res.json(users);
    });

    app.get('/users/:id', (req, res) => {
      const { id } = req.params;
      const user = users.find(fUser => fUser.id === id);
      res.json(user);
    });

    app.post('/users', (req, res) => {
        users.push(req.body);
        res.status(201).json(req.body);
    });

    app.put('/users/:id', (req, res) => {
      const { id } = req.params;
      
      const foundUser = users.findIndex((user) => user.id === id);
      users[foundUser] = {
        ...users[foundUser],
        ...req.body,
        id: users[foundUser].id
      };
      res.status(200).json(users[foundUser]);
    });

    app.delete('/users/:id', (req, res) => {
      const { id } = req.params;

      const index = users.findIndex(user => user.id === id);
      users.splice(index, 1);
      res.status(200).json(users);
    });
  
  
}

initApp();
