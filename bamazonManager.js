var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",

    port: 3306,

    user: "root",

    password: "wrigley1",
    database: "bamazon"
});

connection.connect(function (err) {
    if (err) throw err;
    manageProducts();
});

function manageProducts() {
    console.log("\n" + "\033[38;5;1m" + "Welcome Bamazon Manager" + "\033[0m" + "\n");
    inquirer.prompt([

        {
            type: "list",
            name: "managementChoice",
            message: "What would you like to do?",
            choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product"]
        }

    ]).then(function (choice) {
        switch (choice.managementChoice) {
            case "View Products for Sale":
                viewProducts();
                break;

            case "View Low Inventory":
                viewLowInventory();
                break;

            case "Add to Inventory":
                addInventory();
                break;

            case "Add New Product":
                addProduct();
                break;

            case "Exit":
                process.exit();
                break;
        }
    });
}

// * If a manager selects `View Products for Sale`, the app should list every available item: the item IDs, names, prices, and quantities.
function viewProducts() {
    console.log("\n" + "\033[38;5;1m" + "Searching all products..." + "\033[0m" + "\n");
    connection.query("SELECT * FROM products", function(err, res) {
      if (err) throw err;
      // Log all results of the SELECT statement
      for (i = 0; i < res.length; i++) {
      console.log("\033[38;5;6m" + "\nItem ID: " + "\033[0m" + "\033[38;5;10m" + res[i].item_id + "\033[0m" +
      "\033[38;5;6m" + "\nItem Name: " + "\033[0m" + res[i].product_name + 
      "\033[38;5;6m" + "\nItem Price: " + "\033[0m" + res[i].price + 
      "\033[38;5;6m" + "\nItem Quantity: " + "\033[0m" + res[i].stock);
      }
      connection.end();
    });
};
// * If a manager selects `View Low Inventory`, then it should list all items with an inventory count lower than five.
function  viewLowInventory() {

};
// * If a manager selects `Add to Inventory`, your app should display a prompt that will let the manager "add more" of any item currently in the store.
function addInventory() {

};
// * If a manager selects `Add New Product`, it should allow the manager to add a completely new product to the store.
function addProduct() {

};
