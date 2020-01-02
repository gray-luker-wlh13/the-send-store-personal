module.exports = {
    getMyProducts: (req, res) => {
        const {id} = req.params;
        const db = req.app.get('db');
        db.products.get_my_products(+id).then(products => {
            res.status(200).send(products)
        })
        .catch(err => res.status(500).send(err))
    },

    deleteProduct: (req, res) => {
        const {id} = req.params;
        const db = req.app.get('db');
        db.products.delete_product(+id).then(() => {
            res.sendStatus(200)
        })
        .catch(err => res.status(500).send(err))
    }
}