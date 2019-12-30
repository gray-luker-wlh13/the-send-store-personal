INSERT INTO order_items (
    consumer_order_id,
    product_id,
    qty,
    price
) VALUES 
(
    ${consumer_order_id},
    ${product_id},
    1,
    ${price}
);