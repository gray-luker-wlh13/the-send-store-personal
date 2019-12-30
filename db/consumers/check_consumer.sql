SELECT * FROM consumer c
JOIN consumer_order co ON c.consumer_id = co.consumer_id
WHERE c.username = $1
AND co.paid = false;