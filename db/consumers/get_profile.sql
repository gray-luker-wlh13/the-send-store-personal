SELECT * FROM consumer c
JOIN products p ON p.consumer_id = c.consumer_id
WHERE c.consumer_id = ${id};