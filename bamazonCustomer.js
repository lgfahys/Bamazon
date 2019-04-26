var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",

    port: 3306,

    user: "root",

    password: "wrigley1",
    database: "bamazon"
});

function readProducts() {
    console.log("Selecting all products...\n");
    connection.query("SELECT * FROM products", function(err, res) {
      if (err) throw err;
      // Log all results of the SELECT statement
      for (i = 0; i < res.length; i++) {
        console.log("\033[38;5;6m" + "Item ID: " + "\033[0m" + res[i].item_id);
        console.log("\033[38;5;6m" + "Product Name: " + "\033[0m" + res[i].product_name);
        console.log("\033[38;5;6m" + "Price: " + "\033[0m" + "$" + res[i].price + "\n");
      }
      connection.end();
    });
  }

  readProducts();