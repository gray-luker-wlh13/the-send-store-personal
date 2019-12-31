module.exports = {
    getCart: (req, res) => {
        console.log(req.params)
        const {id} = req.params;
        const db = req.app.get('db');
        db.orders.get_cart(+id).then(cart => {
            res.status(200).send(cart)
        })
        .catch(err => res.status(500).send(err))
    }
}