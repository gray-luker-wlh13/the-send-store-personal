SELECT oi.order_item_id, oi.consumer_order_id, p.product_id, p.price, p.consumer_id, p.product_img, p.product_title, p.product_description, p.condition, c.username, c.profile_img, c.consumer_id, c.favorite_climb FROM order_items oi
JOIN products p ON oi.product_id = p.product_id
JOIN consumer c ON p.consumer_id = c.consumer_id
WHERE oi.consumer_order_id = $1;
