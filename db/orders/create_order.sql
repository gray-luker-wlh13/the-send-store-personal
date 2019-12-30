INSERT INTO consumer_order (
    consumer_id,
    paid
) VAlUES
(
    $1,
    false
)
RETURNING consumer_order_id, paid;