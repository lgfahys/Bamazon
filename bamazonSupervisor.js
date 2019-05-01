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

    var sqlQuery = "SELECT departments.department_id, departments.department_name, departments.over_head_costs, SUM(products.product_sales) AS 'product_sales', (SUM(products.product_sales) - departments.over_head_costs) AS 'total_profit' FROM departments INNER JOIN products ON departments.department_id = products.department_id GROUP BY department_name, departments.department_id, departments.over_head_costsme";

    connection.query(sqlQuery, function (err, res) {
        if (err) throw err;
        var table = new Table({
            head: ['Department ID', 'Department Name', 'Over Head Costs', 'Product Sales', 'Total Profit'],
        });

        for (i = 0; i < res.length; i++) {
            table.push(
                [res[i].department_id, res[i].department_name, res[i].over_head_costs, res[i].product_sales, res[i].total_profit]
            );
        }

        console.log(table.toString());
        // console.log(res);
        connection.end();
    });
}

function createDepartment() {

    inquirer.prompt([
        {
            type: "prompt",
            name: "departmentName",
            message: "What would you like to name the new department?",
        },

        {
            type: "prompt",
            name: "departmentCosts",
            message: "What are the overhead costs for this department?",
        }
    ]).then(function (choice) {
        var departmentName = choice.departmentName;
        var overheadCosts = choice.departmentCosts;
            var query = connection.query(
                "INSERT INTO departments SET ?",
                [
                    {
                        department_name: departmentName,
                        over_head_costs: overheadCosts
                    }
                ],
                function (err, res) {
                    if (err) throw err;
                    console.log("The department " + departmentName + " has been added!");
                }
            );

        connection.end();
    });
}

