UPDATE consumer
SET profile_img = ${profileImg}, favorite_climb = ${favoriteClimb}
WHERE consumer_id = ${id};
SELECT * FROM consumer WHERE consumer_id = ${id}
