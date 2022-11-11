import express from 'express';
import dotenv from 'dotenv';
import axios from 'axios';
import multer from 'multer';
import request from 'request';
import { readFileSync } from 'fs';
const upload = multer({ dest: 'uploads/' })
dotenv.config({ path: './keys.env' });
const app = express();
//axios распознает только полный url адрес, в котором указан протокол
const WEBSITE_HOST = process.env.WEBSITE_HOST;
const REAL_1C_HOST = process.env.REAL_1C_HOST;
const PROXY_PASS = process.env.PROXY_PASS;

if (PROXY_PASS) {
  app.use((req, res) => {
    let url = REAL_1C_HOST + req.url;
    if (req.is('json')) {
      req.pipe(request({
        uri: url,
        headers: req.headers,
        qs: req.query,
        body: req.readable ? undefined : req.body,
        json: true,
      })).pipe(res);
      return;
    }
    req.pipe(request({
      uri: url,
      headers: req.headers,
      qs: req.query,
      body: req.readable ? undefined : req.body
    })).pipe(res);
    console.log(res)
  })
}

app.get('/', (req, res) => {
  res.send('status: ' + res.statusCode + '<br/>Hello World!');
})

//Получение дебиторской задолженности
app.get('/user/debtInfo', (req, res) => {
  res.json({
    debt: 4,
    paydate: "",
    overdebt: 8,
    paysum: 15
  })
})

//Создание заказа 
app.post('/order', upload.none(), (req, res) => {
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
      console.log(res.status);
      return;
    })
    .catch(error => {
      console.log(error);
    })
})

//Получение моего ассортимента
app.get('/order/recommended', (req, res) => {
  const recObj = { [req.query.userId]: 100 };
  res.json(recObj)
})

//Получение акта сверки
app.get('/reconciliation', (req, res) => {
  let data = readFileSync('./6.pdf');
  res.contentType('application/pdf');
  res.send(data);
})

app.listen(8000, console.log('Server listen'))