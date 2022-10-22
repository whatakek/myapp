import express from 'express';
require('dotenv').load();
const app = express();
const jsonParser = express.json();
const WEBSITE_HOST = keys.env.WEBSITE_HOST;
const REAL_1C_HOST = keys.env.REAL_1C_HOST;
let PROXY_PASS = keys.env.PROXY_PASS;
const router = express.Router();

app.get('/', (req, res) => {
  res.send('status: ' + res.statusCode + '<br/>Hello World!');
})

//Получение дебиторской задолженности
app.get('/user/debtInfo?userId=(<integer>)?', (req, res) => {
  res.json({
      debt: Number,
      paydate: "20.04.2022",
      overdebt: Number,
      paysum: Number
  })
})

//Создание заказа 
//Здесь должен быть get запрос, который отправит пользователю форму или иным образом получит данные, которые мы затем распарсим
router.post('/', jsonParser, (req, res, next) => {
  if(!req.body) return res.sendStatus(400);
  res.json({orderId: '<integer>',
            clientId: '<integer>',
            items: {
              code: Number,
              pkg: Number,
              price: Number,
              quantity: Number,
              'comment?': String
  }});
  res.send(res.statusCode);
  if (res.statusCode === 200) {
    app.listen(WEBSITE_HOST);
    next()
  };
})

router.put('/:id', jsonParser, (req,res) => {
  res.json({
  orderId: '<integer>',
  items: {
    code: Number,
    pkg: Number,
    price: Number,
    quantity: Number,
    'comment?': String,
  }});
})

//Получение моего ассортимента
router.get('/recommended?userId=<integer>', (req, res) => {
  res.json({
      "<integer>": integer
  })
})

app.use('/order', router)

//Получение акта сверки
app.get('/reconciliation?userId=<integer>&start=<"20220701">&end=<"20220801">', (req, res) => {
  res.download(`./${filename}.pdf`)
})
