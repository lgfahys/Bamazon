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
            choices: ["View Product Sales by Department", "Create New Department", "Exit"]
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

function viewDepartmentSales() {

    var sqlQuery = "SELECT departments.department_id, departments.department_name, departments.over_head_costs, SUM(products.product_sales) AS 'product_sales', (SUM(products.product_sales) - departments.over_head_costs) AS 'total_profit' FROM departments INNER JOIN products ON departments.department_id = products.department_id GROUP BY department_name, departments.department_id, departments.over_head_costs";

    connection.query(sqlQuery, function (err, res) {
        // connection.query("SELECT * FROM departments", function (err, res) {
        if (err) throw err;
        var table = new Table({
            head: ['Department ID', 'Department Name', 'Over Head Costs', 'Product Sales', 'Total Profit'],
        });

        for (i = 0; i < res.length; i++) {
            table.push(
                [ res[i].department_id, res[i].department_name, res[i].over_head_costs, res[i].product_sales, res[i].total_profit ]
            );
        }
         
        console.log(table.toString());
        // console.log(res);
        connection.end();
    });
}

// 5. The `total_profit` column should be calculated on the fly using the difference between 
// `over_head_costs` and `product_sales`. `total_profit` should not be stored in any database. 
// You should use a custom alias.

// | department_id | department_name | over_head_costs | product_sales | total_profit |
// | ------------- | --------------- | --------------- | ------------- | ------------ |
// | 01            | Electronics     | 10000           | 20000         | 10000        |
// | 02            | Clothing        | 60000           | 100000        | 40000        |
