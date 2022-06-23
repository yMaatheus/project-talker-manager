const express = require('express');
const bodyParser = require('body-parser');
const { HTTP_OK, HTTP_500 } = require('./helpers/httpCodeStatus');

const PORT = '3000';
const app = express();
app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK).send();
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

const talkerRouter = require('./routers/talker');

app.use('/talker', talkerRouter);

const loginRouter = require('./routers/login');

app.use('/login', loginRouter);

app.use((err, _req, res, _next) =>
  res.status(HTTP_500)
    .json({ error: `Erro: ${err.message}` }));

app.listen(PORT, () => console.log(`App running on port ${PORT}`));
