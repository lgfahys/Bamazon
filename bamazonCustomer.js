var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",

    port: 3306,

    user: "root",

    password: "wrigley1",
    database: "bamazon"
});

connection.connect(function(err) {
    if (err) throw err;
    chooseProduct();
  });

function chooseProduct() {
    console.log("\n" + "\033[38;5;1m" + "Searching all products..." + "\033[0m" + "\n");
    connection.query("SELECT * FROM products", function(err, res) {
      if (err) throw err;
      // Log all results of the SELECT statement
      for (i = 0; i < res.length; i++) {
        console.log("\033[38;5;6m" + "     Item ID: " + "\033[0m" + "\033[38;5;10m" + res[i].item_id + "\033[0m");
        console.log("\033[38;5;6m" + "Product Name: " + "\033[0m" + res[i].product_name);
        console.log("\033[38;5;6m" + "       Price: " + "\033[0m" + "$" + res[i].price + "\n");
      }

      var products = [];
      for (i = 0; i < res.length; i++) {
          let string = "";
          string = "\033[38;5;10m" + res[i].item_id + "\033[0m" + " " + res[i].product_name;
          products.push(string);
      }

      inquirer.prompt([

        {
            type: "list",
            name: "itemChoice",
            message: "What item would you like to buy?",
            choices: products
        },

        {
            type: "prompt",
            name: "itemQuantity",
            message: "What quantity would you like to purchase?",
        }

    ]).then(function (choice) {
        // console.log(choices.indexOf(choice.itemChoice));

        console.log("");
    });
      connection.end();
    });
  }

