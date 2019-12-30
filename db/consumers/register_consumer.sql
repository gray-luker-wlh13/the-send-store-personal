INSERT INTO consumers (
    profile_img,
    username,
    password,
    favorite_climb
) VALUES (
    ${profile_img},
    ${username},
    ${password},
    ${favorite_climb}
)
RETURNING consumer_id, profile_img, username, favorite_climb;