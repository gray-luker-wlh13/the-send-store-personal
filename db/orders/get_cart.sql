SELECT * FROM order_items oi
JOIN products p ON oi.product_id = p.product_id
JOIN consumer c ON p.consumer_id = c.consumer_id
WHERE oi.consumer_order_id = $1;