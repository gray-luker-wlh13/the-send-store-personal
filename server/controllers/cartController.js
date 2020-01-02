const stripe = require('stripe')(process.env.STRIPE_SECRET)

module.exports = {
    getCart: (req, res) => {
        // console.log(req.params)
        const {id} = req.params;
        const db = req.app.get('db');
        db.orders.get_cart(+id).then(cart => {
            res.status(200).send(cart)
        })
        .catch(err => res.status(500).send(err))
    },

    removeFromCart: (req, res) => {
        console.log(req.params)
        const {id} = req.params;
        const newId = +id;
        const db = req.app.get('db');
        db.orders.remove_order(newId).then(() => {
            // console.log(typeof newId)
            res.sendStatus(200)
        })
        .catch(err => res.status(500).send(err))
    },

    checkOut: (req, res) => {
        // const db = req.app.get('db');
        const {token:{id}, price} = req.body;
        console.log(id, price, stripe);
        stripe.charges.create(
            {
                price,
                currency: 'usd',
                source: id,
                description: 'Test Charge'
            },
            (err, charge) => {
                if(err){
                    console.log(err)
                    return res.status(500).send(err)
                } else {
                    console.log('Successful payment', charge);
                    // do something with that purchase like storing that info on the db
                    return res.status(200).send(charge)
                }
            }
        )
    }
}