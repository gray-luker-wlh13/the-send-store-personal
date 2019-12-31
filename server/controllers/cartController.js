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
        db.orders.remove_order(newId).then(res => {
            // console.log(typeof newId)
            res.sendStatus(200)
        })
        .catch(err => res.status(500).send(err))
    }
}