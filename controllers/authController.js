const bcrypt = require('bcryptjs');

module.exports = {
    register: (req, res) => {
        const {username, password} = req.body;
        const db = req.app.get('db');
        const {session} = req;

        let user = await db.check_user(username);
        user = user[0];
        if(user){
            return res.status(400).send('User already exists');
        }

        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);

        let newUser = await db.register_user(username, hash);
        newUser = newUser[0];
        // delete newUser.password;

        session.user = newUser;
        res.status(201).send(session.user);
    },

    login: async(req, res) => {
        const {username, password} = req.body;
        const db = req.app.get('db');
        const {session} = req;

        let user = await db.check_user(username);
        user = user[0];
        if(!user){
            return res.status(400).send('User not found');
        }
        let foundUser = bcrypt.compareSync(password, user.password);
        if(foundUser){
            delete user.password;
            session.user = user;
            res.status(202).send(session.user);
        } else {
            res.status(400).send('Incorrect Password');
        }
    },

    getUser: (req,res) => {
        const {user} = req.session;
        if(user){
            res.status(200).send(user);
        } else {
            res.status(500).send('User not on session')
        }
    },

    logout: (req, res) => {
        req.session.destroy();
        res.sendStatus(200);
    }
}