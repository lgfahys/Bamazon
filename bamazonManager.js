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


function viewProducts() {

};

function  viewLowInventory() {

};

function addInventory() {

};

function addProduct() {

};