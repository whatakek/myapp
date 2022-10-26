import express from 'express';
import dotenv from 'dotenv';
import axios from 'axios';
import multer from 'multer';
const upload = multer({ dest: 'uploads/' })
dotenv.config({path:'./keys.env'});
const app = express();
const WEBSITE_HOST = process.env.WEBSITE_HOST;
const REAL_1C_HOST = process.env.REAL_1C_HOST;
let PROXY_PASS;
const router = express.Router();

app.get('/', (req, res) => {
   res.send('status: ' + res.statusCode + '<br/>Hello World!');
})

//Получение дебиторской задолженности
app.get('/user/debtInfo', (req, res) => {
  if(PROXY_PASS){
    const req1C = app.get(REAL_1C_HOST);
    res.send(req1C)
  }
  else{res.json({
      debt: 4,
      paydate: "",
      overdebt: 8,
      paysum: 15
  })}
})

//Создание заказа 
router.post('/', upload.none(), (req, res) => {
  if(PROXY_PASS){
    const req1C = app.get(REAL_1C_HOST);
    res.send(req1C)
  }
  else{
  if(!req.body) return res.sendStatus(400);
  res.send({orderId: 1,
            clientId: 10,
            items: [{
              code: 16,
              pkg: 23,
              price: 42,
              quantity: 4,
              comment: ''
}]});
  res.sendStatus(200);
  axios.post('/', {orderId: 1,
                  clientId: 10,
                  items: [{
                    code: 16,
                    pkg: 23,
                    price: 42,
                    quantity: 4,
                    comment: ''
  }]});
  res.sendStatus(200);
}
})

//Получение моего ассортимента
router.get('/recommended', (req, res) => {
  if(PROXY_PASS){
    const req1C = app.get(REAL_1C_HOST);
    res.send(req1C)
  }
  else{
  const recObj = {[req.query.userId] : 100}
  res.json(recObj)
  }
})

app.use('/order', router)

//Получение акта сверки
app.get('/reconciliation', (req, res) => {
  if(PROXY_PASS){
    const req1C = app.get(REAL_1C_HOST);
    res.send(req1C)
  }
  else{res.download('./6.pdf')}
})

app.listen(WEBSITE_HOST)