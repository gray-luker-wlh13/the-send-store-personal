INSERT INTO products (
    consumer_id,
    product_img,
    product_title,
    price,
    condition,
    product_description,
    purchased
) VALUES (
    ${consumer_id},
    ${img},
    ${title},
    ${price},
    ${condition},
    ${description},
    FALSE
);