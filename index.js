const express = require('express');
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');
const doc = require('./swagger.json');
require('dotenv').config();

const PORT = process.env.PORT || '3000';
const app = express();
app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(200).send();
});

// app.use((req, _res, next) => {
//   console.log('req.method:', req.method);
//   console.log('req.path:', req.path);
//   console.log('req.params:', req.params);
//   console.log('req.query:', req.query);
//   console.log('req.headers:', req.headers);
//   console.log('req.body:', req.body);
//   next();
// });

const talkerRouter = require('./routers/talker');

app.use('/talker', talkerRouter);

const loginRouter = require('./routers/login');

app.use('/login', loginRouter);

app.use('/doc', swaggerUi.serve, swaggerUi.setup(doc));

app.use((err, _req, res, _next) =>
  res.status(500)
    .json({ error: `Erro: ${err.message}` }));

app.listen(PORT, () => console.log(`App running on port ${PORT}`));
