require('dotenv').config();
const express = require('express');
const session = require('express-session');
const massive = require('massive');

const {SERVER_PORT, CONNECTION_STRING, SESSION_SECRET} = process.env;
const app = express();

app.use(express.json());

massive(CONNECTION_STRING).then(db => {
    app.set('db', db);
    console.log('database connected')
})

app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: SESSION_SECRET,
    cookie: {maxAge: 1000 * 60 * 60}
}))

const port = SERVER_PORT
app.listen(port, () => console.log(`Server listening on ${port}`));