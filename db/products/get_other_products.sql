SELECT * FROM products p
JOIN consumers c ON c.consumer_id = p.consumer_id
WHERE c.consumer_id = ${id};