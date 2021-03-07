const express = require('express');
const router = express.Router();
const {
  models: { Task, Category },
} = require('../db');

//This router is mounted on '/api'

router.get('/tasks', (req, res, next) => {
  Task.findAll()
    .then((tasks) => {
      res.send(tasks);
    })
    .catch((err) => next(err));
});

router.get('/tasks/:id', (req, res, next) => {
  const { id } = req.params;
  Task.findByPk(id, { include: { model: Category } })
    .then((task) => {
      res.send(task);
    })
    .catch((err) => next(err));
});

module.exports = router;
