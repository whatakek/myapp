import express from 'express';
import dotenv from 'dotenv';
import axios from 'axios';
import multer from 'multer';
const upload = multer({ dest: 'uploads/' })
dotenv.config({ path: './keys.env' });
const app = express();
//axios распознает только полный url адрес, в котором указан протокол
const WEBSITE_HOST = process.env.WEBSITE_HOST;
const REAL_1C_HOST = process.env.REAL_1C_HOST;
const PROXY_PASS = process.env.PROXY_PASS;

app.get('/', (req, res) => {
  res.send('status: ' + res.statusCode + '<br/>Hello World!');
})

//Получение дебиторской задолженности
app.get('/user/debtInfo', (req, res) => {
  if (PROXY_PASS) {
    axios.get(REAL_1C_HOST)
      .then(res => {
        console.log(res.data);
      })
    return;
  }

  res.json({
    debt: 4,
    paydate: "",
    overdebt: 8,
    paysum: 15
  })

})

//Создание заказа 
app.post('/order', upload.none(), (req, res) => {
  if (PROXY_PASS) {
    axios.get(REAL_1C_HOST)
      .then(res => {
        console.log(res.data);
      })
    return;
  }
  // парсер multer обрабатывает multipart/formdata, надеюсь, что реализовал правильно
  // также он может парсить отправленные данные, например, из формы
  // насколько я понял, это не требуется, поэтому проверку ниже закомментил
  // if (!req.body) return res.status(400).send('Error');
  res.send({
    orderId: 1,
    clientId: 10,
    items: [{
      code: 16,
      pkg: 23,
      price: 42,
      quantity: 4,
      comment: ''
    }]
  }).status(200);

  return axios.post(WEBSITE_HOST, {
    orderId: 1,
    clientId: 10,
    items: [{
      code: 11,
      pkg: 22,
      price: 33,
      quantity: 4,
      comment: ''
    }]
  })
    .then(res => {
      console.log(res.data);
      console.log(res.status);
      return;
    })
    .catch(error => {
      console.log(error);
    })
})

//Получение моего ассортимента
app.get('/order/recommended', (req, res) => {
  if (PROXY_PASS) {
    axios.get(REAL_1C_HOST)
      .then(res => {
        console.log(res.data);
      })
    return;
  }

  const recObj = { [req.query.userId]: 100 };
  res.json(recObj)

})

//Получение акта сверки
app.get('/reconciliation', (req, res) => {
  if (PROXY_PASS) {
    axios.get(REAL_1C_HOST)
      .then(res => {
        console.log(res.data);
      })
    return;
  }

  res.download('./6.pdf')
})

app.listen(8000, console.log('Server listen'))