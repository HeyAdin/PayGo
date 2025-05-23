const express = require('express');
const app = express();
const cors = require('cors');
const routes = require('./routes/index');
require('dotenv').config();
const PORT = process.env.PORT
app.use(express.json(),cors());
app.use('/api/v1/',routes);

app.listen(PORT,()=>{
    console.log(`server is listening on port ${PORT}`);
})