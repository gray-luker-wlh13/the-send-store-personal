SELECT * FROM products p
JOIN consumer c ON p.consumer_id = c.consumer_id
WHERE p.consumer_id = $1;