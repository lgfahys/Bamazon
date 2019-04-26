DROP DATABASE IF EXISTS bamazon;
CREATE database bamazon;

USE bamazon;

DROP TABLE IF EXISTS products;
CREATE TABLE products (
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(100) NOT NULL,
  department_name VARCHAR(100) NULL,
  price DECIMAL(10,2),
  stock INT(10),
  PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock)
VALUES ('Sulfate Free Shampoo', 'Beauty', 12.99, 65);
SELECT * FROM products;

update products set department_name = 
replace(department_name,'Excersise','Excercise');

UPDATE products SET stock = 10 WHERE item_id = 2;