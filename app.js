const express = require('express');
const router = require('./router/routes');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(router);

const port = 3000;

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
