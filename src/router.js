const express = require('express');
const router = express.Router();

let users = [
  {
    id: 1,
    name: 'Okabe'
  },
  {
    id: 2,
    name: "Hashida"
  },
  {
    id: 3,
    name: "Makise"
  }
]

router.get('/', (req, res) => {
  return res.json(users);
})

router.get('/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (!id) {
    return res.status(400).json({error: 'Incorrect id'});
  }
  let user = users.filter(user => {
    return user.id === id;
  })[0];
  if (!user) {
    return res.status(404).json({error: 'Unknown User'});
  }
  return res.json(user);
  //return !id ? res.json(id) : res.status(400).json({error: 'Incorrect id'});
})

router.post('/', (req, res) => {
  const name = req.body.name || '';
  if (!name.length) {
    return res.status(400).json({error: 'Incorrect name'});
  }
  const id = users.reduce((maxId, user) => {
    return user.id > maxId ? user.id : maxId;
  }, 0) + 1;
  const newUser = {
    id: id,
    name: name
  };
  users.push(newUser);
  return res.status(201).json(newUser);
})

module.exports = router;
