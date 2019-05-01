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
            choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product", "Exit"]
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
    connection.query("SELECT * FROM products", function (err, res) {
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
function viewLowInventory() {
    console.log("\n" + "\033[38;5;1m" + "Searching all products..." + "\033[0m");
    console.log("The following products have an inventory less than 5");
    connection.query("SELECT * FROM products WHERE stock <= 5", function (err, res) {
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
// * If a manager selects `Add to Inventory`, your app should display a prompt that will let the manager "add more" of any item currently in the store.
function addInventory() {
    console.log("\n" + "\033[38;5;1m" + "Searching all products..." + "\033[0m" + "\n");
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        // Log all results of the SELECT statement
        for (i = 0; i < res.length; i++) {
            console.log("\033[38;5;6m" + "     Item ID: " + "\033[0m" + "\033[38;5;10m" + res[i].item_id + "\033[0m");
            console.log("\033[38;5;6m" + "Product Name: " + "\033[0m" + res[i].product_name);
            console.log("\033[38;5;6m" + "       Price: " + "\033[0m" + "$" + res[i].price);
            console.log("\033[38;5;6m" + "    Quantity: " + "\033[0m" + res[i].stock + "\n")
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
                message: "What item would you like to update the inventory for?",
                choices: products
            },

            {
                type: "prompt",
                name: "itemQuantity",
                message: "What quantity would you like to add?",
            }

        ]).then(function (choice) {
            var itemIndex = products.indexOf(choice.itemChoice);
            var itemId = itemIndex + 1;
            var currentStock = res[itemIndex].stock;
            var updatedStock = parseInt(currentStock) + parseInt(choice.itemQuantity);

            console.log("\n" + "\033[38;5;1m" + "Searching all product quantities..." + "\033[0m" + "\n");
            var query = connection.query(
                "UPDATE products SET ? WHERE ?",
                [
                    {
                        stock: updatedStock
                    },
                    {
                        item_id: itemId
                    }
                ],
                function (err, res) {
                    if (err) throw err;
                    console.log(res.affectedRows + " products updated!\n");
                }
            );
            console.log("You have added " + choice.itemQuantity + " of the product " + res[itemIndex].product_name);
            console.log(query.sql);
            connection.end();
        });
    });
};
// * If a manager selects `Add New Product`, it should allow the manager to add a completely new product to the store.
function addProduct() {
    console.log("\n" + "\033[38;5;1m" + "Answer the questions to add a new product" + "\033[0m" + "\n")
    inquirer.prompt([

        {
            type: "prompt",
            name: "itemName",
            message: "What is the name of the product you would like to add?",
        },

        {
            type: "prompt",
            name: "itemDepartment",
            message: "What is the name of the department you would like to insert this product in to?",
        },

        {
            type: "prompt",
            name: "itemPrice",
            message: "What is the price of this product?",
        },

        {
            type: "prompt",
            name: "itemQuantity",
            message: "What quantity is availabile for this product?",
        }


    ]).then(function (item) {
        console.log("Inserting a new product...\n");
        var query = connection.query(
            "INSERT INTO products SET ?",
            {
                product_name: item.itemName,
                department_name: item.itemDepartment,
                price: item.itemPrice,
                stock: item.itemQuantity
            },
            function (err, res) {
                console.log(res.affectedRows + " product inserted!\n");
            });      
        connection.end();
    });
};


