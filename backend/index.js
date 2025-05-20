const express = require('express');
const app = express();
const cors = require('cors');
const routes = require('./routes/index');
require('dotenv').config();

app.use(express.json(),cors());
app.use('/api/v1/',routes);

app.listen(3000,()=>{
    console.log(`server is listening on port 3000`);
})