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

router.post('/tasks', (req, res, next) => {
  const { taskName, dueDate, categoryName, taskDetail } = req.body;
  let categoryId = null;
  Category.findOrCreate({ where: { categoryName } })
    .then(() => {
      return Category.findAll({ where: { categoryName } });
    })
    .then((data) => {
      categoryId = data[0].id;
      const newTask = new Task({ taskName, dueDate, taskDetail });
      return newTask.save();
    })
    .then((newTask) => {
      return newTask.update({ categoryId });
    })
    .then((newTask) => {
      res.send(newTask);
    });
});

router.put('/tasks/:id', (req, res, next) => {
  const { id } = req.params;
  const { taskName, dueDate, categoryName, taskDetail } = req.body;
  let categoryId = null;
  Category.findOrCreate({ where: { categoryName } })
    .then(() => {
      return Category.findAll({ where: { categoryName } });
    })
    .then((data) => {
      categoryId = data[0].id;
      return Task.findByPk(id, { include: Category });
    })
    .then((task) => {
      return task.update({ taskName, dueDate, taskDetail, categoryId });
    })
    .then(() => {
      res.send(true);
    })
    .catch((err) => next(err));
});

router.delete('/tasks/:id', (req, res, next) => {
  const { id } = req.params;
  Task.findByPk(id)
    .then((taskToDelete) => {
      return taskToDelete.destroy();
    })
    .then(() => {
      res.redirect(202, '../');
    })
    .catch((err) => next(err));
});

module.exports = router;
