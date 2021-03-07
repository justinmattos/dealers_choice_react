const express = require('express');
const path = require('path');
const apiRouter = require('./routes/api.js');
const { syncAndSeed } = require('./db');

const app = express();

app.use('/api', apiRouter);
app.use('/public', express.static('./public'));

app.get('/', (req, res, next) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

const innit = () => {
  syncAndSeed().then(() => {
    const PORT = process.env.PORT || 4343;
    app.listen(PORT, () => console.log(`Server running on PORT: ${PORT}`));
  });
};

innit();
