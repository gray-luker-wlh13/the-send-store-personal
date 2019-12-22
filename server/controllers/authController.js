const bcrypt = require('bcryptjs');

module.exports = {
    login: async (req, res) => {
        const {username, password} = req.body;
        const {session} = req;
        const db = req.app.get('db');

        let consumer = await db.check_consumer(username);
        consumer = consumer[0];
        if(!consumer){
            res.status(400).send('User already exists')
        }
        const authenticated = bcrypt.compareSync(password, consumer.password);
        if(authenticated){
            delete consumer.password;
            session.user = authenticated;
            res.status(200).send(session.user);
        }
    },

    logout: (req, res) => {
        req.session.destroy();
        res.sendStatus(200);
    }
};