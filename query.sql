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

ALTER TABLE products ADD COLUMN product_sales DECIMAL(10,2) NOT NULL DEFAULT 0;

DROP TABLE IF EXISTS departments;
CREATE TABLE departments (
  department_id INT NOT NULL AUTO_INCREMENT,
  department_name VARCHAR(100) NOT NULL,
  over_head_costs DECIMAL(10,2),
  PRIMARY KEY (department_id)
);

UPDATE products SET department_id = 6 WHERE department_name = 'Beauty';