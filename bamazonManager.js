var mysql = require("mysql");
var inquirer = require("inquirer");

// create the connection information for the sql database
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "pass123",
    database: "bamazon_db"
});

// connect to the mysql server and sql database
connection.connect(function(err) {
    if (err) throw err;
    // run the start function after the connection is made to prompt the user
    start();
});

function start() {
    inquirer
        .prompt([
            {
                name: "MainMenuOption",
                type: "list",
                message: "bamazon Manager.\nPick an action:",
                choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product"]
            }
        ])
        .then(function(answer) {
            //console.log(JSON.stringify(answers, null, 2));
            //console.log(answers);
            if (answer.MainMenuOption === "View Products for Sale") {
                connection.query("SELECT * FROM products",  function(err, res) {
                    if (err) throw err;
                    console.log("bamazon stock:")
                    for (var i = 0; i < res.length; i++) {
                        console.log(res[i].item_id + "-" + res[i].product_name + ", " + res[i].stock_quantity + " in stock, $" + res[i].price + " each");
                    }
                    start();
                });
            }
            else if (answer.MainMenuOption === "View Low Inventory") {
                connection.query("SELECT * FROM products WHERE stock_quantity < 5",  function(err, res) {
                    if (err) throw err;
                    console.log("bamazon low quantity items:")
                    for (var i = 0; i < res.length; i++) {
                        console.log(res[i].item_id + "-" + res[i].product_name + ", " + res[i].stock_quantity + " left");
                    }
                    start();
                });
            }
            else if (answer.MainMenuOption === "Add to Inventory") {
                inquirer
                    .prompt([
                        {
                            name: "itemIdQuestion",
                            type: "input",
                            message: "Which id would you like to add to?"
                        },
                        {
                            name: "itemQuantity",
                            type: "input",
                            message: "How many would you like to add?"
                        }
                        ])
                    .then(function(answer) {
                        connection.query("UPDATE products SET stock_quantity = stock_quantity + " + answer.itemQuantity + " WHERE item_id = " + answer.itemIdQuestion,  function(err, res) {
                            if (err) throw err;
                            console.log("Successfuly added " + answer.itemQuantity + "x to item id:" + answer.itemIdQuestion);
                            start();
                        });
                    });
            }
            else if (answer.MainMenuOption === "Add New Product") {
                inquirer
                    .prompt([
                        {
                            name: "itemName",
                            type: "input",
                            message: "What is the name of the new product?"
                        },
                        {
                            name: "itemDepartment",
                            type: "input",
                            message: "What is the department of the new product?"
                        },
                        {
                            name: "itemPrice",
                            type: "input",
                            message: "How much does each item cost?"
                        },
                        {
                            name: "itemQuantity",
                            type: "input",
                            message: "How many would you like to add to stock?"
                        }
                    ])
                    .then(function(answer) {
                        connection.query("INSERT INTO products (product_name,department_name,price,stock_quantity) VALUES (\"" + answer.itemName + "\",\"" + answer.itemDepartment + "\"," + answer.itemPrice + "," + answer.itemQuantity + ")",  function(err, res) {
                            if (err) throw err;
                            console.log("Successfuly added " + answer.itemQuantity + "x of " + answer.itemName);
                            start();
                        });
                    });
            }
         });
}