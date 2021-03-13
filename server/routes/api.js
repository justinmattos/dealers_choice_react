const express = require('express');
const router = express.Router();
const {
  models: { Task, Category },
} = require('../db');

//This router is mounted on '/api'

router.use(express.json({ strict: false }));

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

router.put('/tasks/:id', (req, res, next) => {
  const { id } = req.params;
  console.log(req.body);
  const { taskName, dueDate, categoryName, taskDetail } = req.body;
  console.log(categoryName);
  let categoryId = null;
  Category.findOrCreate({ where: { categoryName } })
    .then(() => {
      // return Category.findA
      return Task.findByPk(id);
    })
    .then((task) => {
      return task.update({ taskName, dueDate, taskDetail, categoryId });
    })
    .then((updatedTask) => {
      res.send(updatedTask);
    })
    .catch((err) => next(err));
});

module.exports = router;
