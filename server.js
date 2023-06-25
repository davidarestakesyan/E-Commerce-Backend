const express = require('express')
const app = express()
const cors = require("cors")
app.use('/_uploads', express.static('_uploads'));
app.use(express.json());
const routes = require ('./routes')

app.use("/" ,routes)
app.use(cors())  
app.listen("5000")