module.exports = {
    getProducts: (req, res) => {
        const db = req.app.get('db');
        db.get_products().then(products => {
            res.status(200).send(products)
        })
        .catch(err => res.status(500).send(err))
    },

    addToCart: (req, res) => {
        const {consumer_order_id, product_id, price} = req.body;
        const db = req.app.get('db');
        db.orders.add_to_cart({consumer_order_id, product_id, price}).then(res => {
            res.sendStatus(200)
        })
        .catch(err => res.status(500).send(err))
    }
}