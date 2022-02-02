const express = require('express')
var session = require('express-session')
const path = require('path')
const app = express()
const db = require('./queries')
const port = process.env.PORT || 5000

app.use(express.json());
app.use(express.urlencoded({ extended: false}));

app.get('/api/codes', db.getCodes)
app.get('/api/addcode/:usages', db.addCode)
app.get('/open/:code', db.codeUsed)

if (process.env.NODE_ENV === "production") {
  app.use(express.static("./frontend/build"));
}

app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "./frontend/build/index.html"));
});

app.listen(port, () => {
    console.log(`App running on port ${port}.`)
})
