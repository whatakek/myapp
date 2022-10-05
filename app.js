const express = require('express')
const app = express()

app.get('/', (req, res) => {
  res.send('status: ' + res.statusCode + '<br/>Hello World!');
})

app.listen(8080, () => console.log(`Example app listening on port 8080!`))