const express = require('express');
const morgan = require('morgan');
const app = express();
app.use(morgan('dev'));

var initData = [
    {
      todoItemId: 0,
      name: 'an item',
      priority: 3,
      completed: false
    },
    {
      todoItemId: 1,
      name: 'another item',
      priority: 2,
      completed: false
    },
    {
      todoItemId: 2,
      name: 'a done item',
      priority: 1,
      completed: true
    }
];

app.get('/', (req, res) => {
  var generic = {Status: "ok"};
  res.status(200).send(generic);
});

app.get('/api/TodoItems', (req, res) => {
  res.status(200).send(initData);
});

app.get('/api/TodoItems/:number', (req, res) => {
  for (var i = 0; i < initData.length; i++) {
    if (initData[i]['todoItemId'] == req.params.number) {
      res.status(200).send(initData[i]);
    }
  }
});

app.post('/api/TodoItems' , (req, res) => {
  var itemPost = {
    todoItemId: 0,
    name: 'wow, new thingy.',
    priority: 3,
    completed: true
  };
  for (var i = 0; i < initData.length; i++) {
    if (initData[i]['todoItemId'] == itemPost['todoItemId']) {
      initData[i] = itemPost;
    }
  }
  initData.push(itemPost);
  return res.status(201).send(itemPost);
});

app.delete('/api/TodoItems/:number', (req, res) => {
  var itemDel = [];
  for (var i = 0; i < initData.length; i++) {
    if (initData[i]['todoItemId'] == req.params.number) {
      itemDel = initData.splice(i, 1);
    }
  }
  res.status(200).send(itemDel[0]);
});
module.exports = app;