const bcrypt = require('bcryptjs');

module.exports = {
    register: async (req, res) => {
        console.log(req.body);
        const {profile_img, username, password, favorite_climb} = req.body;
        const {session} = req;
        const db = req.app.get('db');

        let consumer = await db.consumers.check_consumer(username);
        consumer = consumer[0];
        if(consumer){
            return res.status(400).send('User already exists')
        }
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);
        let newConsumer = await db.consumers.register_consumer({profile_img, username, hash, favorite_climb})
        newConsumer = newConsumer[0];
        let consumerCart = await db.orders.create_order(newConsumer.consumer_id);
        consumerCart = consumerCart[0];
        let sessionConsumer = {...newConsumer, ...consumerCart};
        session.consumer = sessionConsumer;
        res.status(201).send(session.consumer);
    },

    login: async (req, res) => {
        const {username, password} = req.body;
        const {session} = req;
        const db = req.app.get('db');

        let consumer = await db.consumers.check_consumer(username);
        consumer = consumer[0];
        if(!consumer){
            res.status(400).send('Username not found')
        }
        const authenticated = bcrypt.compareSync(password, consumer.password);
        if(authenticated){
            delete consumer.password;
            session.consumer = authenticated;
            res.status(200).send(session.consumer);
        }
    },

    logout: (req, res) => {
        req.session.destroy();
        res.sendStatus(200);
    }
};