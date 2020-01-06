UPDATE consumer_order
SET paid = TRUE
WHERE consumer_order_id = $1;
DELETE FROM order_items
WHERE consumer_order_id = $1;