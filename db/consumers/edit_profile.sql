UPDATE consumer
SET profile_img = ${profileImg}, favorite_climb = ${favoriteClimb}
WHERE consumer_id = ${id};
SELECT consumer.consumer_id, consumer.profile_img, consumer.username, consumer.favorite_climb, consumer_order.consumer_order_id, consumer_order.paid 
FROM consumer 
JOIN consumer_order ON consumer.consumer_id = consumer_order.consumer_id
WHERE consumer.consumer_id = ${id};
