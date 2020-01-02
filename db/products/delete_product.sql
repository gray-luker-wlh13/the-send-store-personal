DELETE FROM order_items
WHERE product_id = $1;
DELETE FROM products
WHERE product_id = $1;