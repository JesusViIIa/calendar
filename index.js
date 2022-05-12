require('dotenv').config()
const express = require('express')
const cors = require('cors')


const dbConnect = require('./src/database/database')
const authRoute = require('./src/routes/authRoute')
const eventsRoute = require('./src/routes/eventsRoute')
const path = require('path');


//app config
const app = express()
dbConnect()
app.use(cors());
const port = process.env.PORT || 3000

//middleware/
app.use(express.json());

//ruta publica y rutas
app.use(express.static('public'))
app.use('/api/auth', authRoute);
app.use('/api/events', eventsRoute);
app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, '/public', 'index.html'));
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))