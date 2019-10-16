const express = require('express');
const session = require('express-session');
const massive = require('massive');
const app = express();

app.use(express.json());

// massive().then(db => {
//     app.set('db', db);
//     console.log('database connected')
// })

app.use(session({
    resave: false,
    saveUninitialized: true,
    //session secret goes here
    cookie: {maxAge: 1000 * 60 * 60}
}))

app.listen(4040, () => console.log(`Server listening on 4040`));