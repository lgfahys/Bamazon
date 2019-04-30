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
    chooseProduct();
});

function chooseProduct() {
    console.log("\n" + "\033[38;5;1m" + "Searching all products..." + "\033[0m" + "\n");
    connection.query("SELECT * FROM products", function (err, res) {
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
            var itemIndex = products.indexOf(choice.itemChoice);
            var itemId = itemIndex + 1;
            var currentStock = res[itemIndex].stock;
            var updatedStock = parseInt(currentStock) - parseInt(choice.itemQuantity);
            var itemPrice = res[itemIndex].price;
            var currentSales = res[itemIndex].product_sales;
            var totalPrice = parseFloat(choice.itemQuantity) * parseFloat(itemPrice);
            var totalProductSales = totalPrice + parseFloat(currentSales);
            if (updatedStock >= 0) {
                console.log("\n" + "\033[38;5;1m" + "Searching all product quantities..." + "\033[0m" + "\n");
                var query = connection.query(
                    "UPDATE products SET ? WHERE ?",
                    [
                        {
                            stock: updatedStock,
                            product_sales: totalProductSales
                        },
                        {
                            item_id: itemId
                        }
                    ],
                    function (err, res) {
                        if (err) throw err;
                        console.log(res.affectedRows + " products updated!\n");
                        // console.log(choice.itemQuantity);
                        // console.log(itemPrice);
                        // console.log(currentSales);
                        // console.log(totalProductSales);
                    }
                );
                console.log("You have purchased " + choice.itemQuantity + " of the product " + res[itemIndex].product_name);
                console.log(query.sql);
            } else {
                console.log("\n" + "\033[38;5;1m" + "Insufficient Quantity! We have " + "\033[0m" + currentStock + "\033[38;5;1m" + " of the product " + "\033[0m" + res[itemIndex].product_name + "\033[38;5;1m" + " left" + "\033[0m");
            }
            // var itemIndex = products.indexOf(choice.itemChoice);
            // console.log(res[itemIndex].stock - choice.itemQuantity);
            // console.log(choice.itemQuantity);
            // console.log(itemIndex);
            connection.end();
        });
    });
}

