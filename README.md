# bamazon
bamazon project


                                             #**BAMAZON**
Bamazon Customer is a nodeJS app backed by a MySQL database. It is created with a table inside of the database called products. The products table
has the following columns: item_id, product name, department name, price to the customer, and stock quantity. The
database is populated with ten different products. The app prompts users with two questions. The first question is what ID of
the product they would like to buy. The second question is how many units of the product does the user want to buy. Once the
customer has placed the order, Bamazon checks if the store has enough of the product to the meet the customer's request.
If not, Bamazon will log a phrase that says "Insufficient Quantity", and then prevents the order from going through. If
the store does enough of the product, then the customer's order will be fulfilled. Also, the SQL database will be updated to reflect the
remaining quantity. Once the update goes through, the store will show the customer the total cost of their purchase.

Bamazon Manager is a nodeJS app backed by a MySQL database. It lists a set of menu options that shows four options: "View Products for Sale",
"View low inventory", "Add to Inventory", and "Add New Product". When a manager selects
"View Products for Sale", the app will list every available item showing the item IDs, names, department, prices, and quantity in stock. If a manager selects
"View Low Inventory", the app will list all items with an inventory count lower than five. If a manager selects "Add to Inventory",
then the customer will display a prompt that will let the manager add more of any item currently in the store. If the
manager selects "Add New Product", the app will allow the manager to add a completely new product to the store.