var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require('cli-table');

var connection = mysql.createConnection({
    host: "localhost",

    port: 3306,

    user: "root",

    password: "wrigley1",
    database: "bamazon"
});

connection.connect(function (err) {
    if (err) throw err;
    superviseProducts();
});

function superviseProducts() {
    console.log("\n" + "\033[38;5;1m" + "Welcome Bamazon Supervisor" + "\033[0m" + "\n");
    inquirer.prompt([

        {
            type: "list",
            name: "supervisorChoice",
            message: "What would you like to do?",
            choices: ["View Product Sales by Department", "Create New Department"]
        }

    ]).then(function (choice) {
        switch (choice.supervisorChoice) {
            case "View Product Sales by Department":
                viewDepartmentSales();
                break;

            case "Create New Department":
                createDepartment();
                break;

            case "Exit":
                process.exit();
                break;
        }
    });
}