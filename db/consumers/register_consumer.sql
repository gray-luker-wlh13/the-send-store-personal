INSERT INTO consumer (
    profile_img,
    username,
    password,
    favorite_climb
) VALUES (
    ${profile_img},
    ${username},
    ${hash},
    ${favorite_climb}
)
RETURNING consumer_id, profile_img, username, favorite_climb;