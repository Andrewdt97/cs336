const express = require('express')
const app = express()
const port = 9001


app.get('/yeamom', (req, res) => res.send('Hello Sheila!'))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

app.use(express.static('public'))
