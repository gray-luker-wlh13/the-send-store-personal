UPDATE products
SET product_img = ${img}, product_title = ${title}, price = ${price}, condition = ${condition}, product_description = ${description}
WHERE product_id = ${id};
SELECT * FROM products;