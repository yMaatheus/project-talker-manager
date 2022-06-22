const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const PORT = '3000';

const { HTTP_OK_STATUS, HTTP_500_STATUS } = require('./helpers/httpCodeStatus');

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.use((req, _res, next) => {
  console.log('req.method:', req.method);
  console.log('req.path:', req.path);
  console.log('req.params:', req.params);
  console.log('req.query:', req.query);
  console.log('req.headers:', req.headers);
  console.log('req.body:', req.body);
  next();
});

const talkerRouter = require('./routes/talker');

app.use('/talker', talkerRouter);

app.use((err, _req, res, _next) =>
  res.status(HTTP_500_STATUS)
    .json({ error: `Erro: ${err.message}` }));

app.listen(PORT, () => console.log(`App running on port ${PORT}`));
