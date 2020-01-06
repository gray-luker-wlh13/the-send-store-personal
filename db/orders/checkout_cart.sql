UPDATE consumer_order
SET paid = TRUE
WHERE consumer_id = $1;