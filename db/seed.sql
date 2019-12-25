CREATE TABLE consumer (
    consumer_id SERIAL PRIMARY KEY,
    profile_img VARCHAR(300),
    username VARCHAR(20),
    password VARCHAR(250),
    favorite_climb TEXT
);

CREATE TABLE products (
    product_id SERIAL PRIMARY KEY,
    consumer_id INT REFERENCES consumer(consumer_id),
    product_img VARCHAR(300),
    product_title VARCHAR(50),
    price DECIMAL,
    condition TEXT,
    product_description TEXT
);

CREATE TABLE consumer_order (
    consumer_order_id SERIAL PRIMARY KEY,
    consumer_id INT REFERENCES consumer(consumer_id),
    paid BOOLEAN
);

CREATE TABLE order_items (
    order_item_id SERIAL PRIMARY KEY,
    consumer_order_id INT REFERENCES consumer_order(consumer_order_id),
    product_id INT REFERENCES products(product_id),
    qty INT,
    price DECIMAL
);