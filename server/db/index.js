const db = require('./db');
const Task = require('./Task');
const Category = require('./Category');

Task.belongsTo(Category);
Category.hasMany(Task);

const syncAndSeed = () => {
  return new Promise((res, rej) => {
    const [fakeTask1, fakeTask2, fakeTask3] = [
      {
        taskName: 'Fake Task 1',
        dueDate: '2021-04-07',
        taskDetail: 'This is a fake task to seed db',
      },
      {
        taskName: 'Fake Task 2',
        dueDate: '2022-04-07',
        taskDetail: 'This is a fake task to seed db',
      },
      {
        taskName: 'Fake Task 3',
        dueDate: '2021-05-08',
        taskDetail: 'This is a fake task to seed db',
      },
    ].map(
      ({ taskName, dueDate, taskDetail }) =>
        new Task({ taskName, dueDate, taskDetail })
    );
    const [fakeCategory1, fakeCategory2] = [
      { categoryName: 'Fake Category 1' },
      { categoryName: 'Fake Category 2' },
    ].map(({ categoryName }) => new Category({ categoryName }));
    db.sync({ force: true })
      .then(() => {
        console.log('seeding db . . . ');
        return Promise.all([
          fakeTask1.save(),
          fakeTask2.save(),
          fakeTask3.save(),
        ]);
      })
      .then(() => {
        return Promise.all([fakeCategory1.save(), fakeCategory2.save()]);
      })
      .then(() => {
        fakeTask1.categoryId = fakeCategory1.id;
        fakeTask2.categoryId = fakeCategory1.id;
        fakeTask3.categoryId = fakeCategory2.id;
        return Promise.all([
          fakeTask1.save(),
          fakeTask2.save(),
          fakeTask3.save(),
        ]);
      })
      .then(() => {
        res();
        console.log('seeded db');
      })
      .catch((err) => rej(err));
  });
};

module.exports = { db, models: { Category, Task }, syncAndSeed };
