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
      name: "itemIdQuestion",
      type: "input",
      message: "Which item ID you would like to buy?",
      
        },
      {
        name: "numberOfUnits",
        type: "input",
        message: "How many units of the product would you like to buy?"
         

      },
       ])

    .then(function(answer) {
        //console.log("answers",answer);
        connection.query("SELECT * FROM products WHERE item_id = " + answer.itemIdQuestion ,  function(err, res) { 
           if (err) throw err;
           //console.log(res[0]);

            // based on their answer, either call the bid or the post functions
            if (answer.numberOfUnits > res[0].stock_quantity) {
                console.log("Insufficient quantity!");
            }
            else {
                console.log("Thank you for your order: " + answer.numberOfUnits + "x of " + res[0].product_name + "!\n$" + res[0].price * answer.numberOfUnits + " has been charged to your account.");
                var newQuantity = res[0].stock_quantity - answer.numberOfUnits;
                connection.query("UPDATE products SET stock_quantity = " + newQuantity + " WHERE item_id = " + answer.itemIdQuestion);
            }
            start();
         });
    
    });
}