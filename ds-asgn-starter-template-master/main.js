// DS ASGN STARTER TEMPLATE

// DOM Elements
let outputEl = document.getElementById('output');

// Global variables
let groceryData = [];

//Load Grovery Data into array 
fetch('grocery-data.txt').then((rawData) => rawData.text()).then(processData);

//Create Data Struction Functions
function processData(textData) {
    //Split text file into lines
    let lines = textData.split('\r\n');

    //For each lines, create an object and add to groceryData.array
    for (let i = 0; i < lines.length; i++) {
        groceryData.push(newProductObject(lines[i]));
        
    }
    
}

//Split the product into a separate string
function newProductObject(productString) {
    let productArray = productString.split(";");
    return {
        name : productArray[0],
        price : Number(productArray[1]),
        country : productArray[2]
    }
}

//Display all products
function displayAllProducts() {
    //Output the total # of products
    outputEl.innerHTML = "<h2>Display All Products</h2>";
    outputStr = "<ul>";
    for (let i = 0; i < groceryData.length; i++) {
        outputEl.innerHTML += "<li>"  + productString(groceryData[i]) + "</li>";
    }
    outputStr = "</ul>";
    outputEl.innerHTML += "<p>Total number of products : " + groceryData.length + "</p>";
}

//Display price range the user offers
function displayPriceRange() {
    //Output all products with a user specified price range
    let lowPrice = Number(prompt("Please enter lowest price: "));
    let highPrice = Number(prompt("Please enter highest price: "));

    let count = 0;

    outputEl.innerHTML = "<h2>Display Price Products</h2>";
    outputStr = "<ul>";
    for (let i = 0; i < groceryData.length; i++) {
        let product = groceryData[i];
        if (product.price >= lowPrice && product.price <= highPrice){
            outputEl.innerHTML += "<li>"  + productString(product) + "</li>";
            count++;
        }
        
    }
    outputStr = "</ul>";
    outputEl.innerHTML += "<p>Total number of products : " + count + "</p>";
    
}

//Display country the user wants
function displayCountryofOrgin() {
    //Output all products with a user specified price range
    let nameCountry = prompt("Please enter a country: ");

    let count = 0;

    outputEl.innerHTML = "<h2>Display Country of Orgin</h2>";
    outputStr = "<ul>";
    for (let i = 0; i < groceryData.length; i++) {
        let specificCountry = groceryData[i];
        if (specificCountry.country == nameCountry){
            outputEl.innerHTML += "<li>"  + productString(specificCountry) + "</li>";
            count++;
        }
        
    }
    outputStr = "</ul>";
    outputEl.innerHTML += "<p>Total number of products : " + count + "</p>";
    
}

//Display a random product
function displayRandomProduct() {
    //Display a random product
    outputEl.innerHTML = "<h2>Display A Random Product</h2>";
    let randomProduct = Math.randomElement(groceryData);
    outputEl.innerHTML += productString(randomProduct);
}

//Display the inflation for each products
function productInflation() {
    //Increase each products price by 7%
    outputEl.innerHTML = "<h2>Display Inflation</h2>";
    outputStr = "<ul>";
    for (let i = 0; i < groceryData.length; i++) {
        let charge = groceryData[i];
        let outputStr = charge.name + " $" + Math.round(charge.price * 1.07) + " (" + charge.country + ")";
        outputEl.innerHTML += "<li>" + outputStr + "</li>";
    }
    outputStr = "</ul>";
    outputEl.innerHTML += "<p>Each products has increased by 7% </p>";
    
}

//Add a new product
function addNewProduct() {
    //Get new product info from the user and add to groceryData
    let newName = prompt("Please enter a product you like to eat: ");
    let newPrice = Number(prompt("Please enter the price of the product: "));
    let newCountry = Number(prompt("Where does the product make: "));

    let newProduct = {
        name : newName,
        price : newPrice,
        country : newCountry
    }

    groceryData.push(newProduct);

    outputEl.innerHTML = "<h3>Add New Products</h3>";
    outputEl.innerHTML += productString(newProduct);
    
}

//Product Price Stats
function productPriceStats() {
    //Display the max, min and average product prices
    let min = groceryData[0].price;
    let max = groceryData[0].price ;
    let sum = 0;
    for (let i = 0; i < groceryData.length; i++) {
        let product = groceryData[i];
        //Check for minimum
        if (product.price < min) {
            min = product.price;
        }

        //Check for maximum
        if (product.price > max) {
            max = product.price;
        }

        //Add to the sum
        sum += product.price;
        outputEl.innerHTML = "<h3>Product Price Stats</h3>";
        outputEl.innerHTML += "Minimum product price is : $" + round(min) + "<br>";
        outputEl.innerHTML += "Maximum product price is : $" + round(max)  + "<br>";
        outputEl.innerHTML += "Average product price is : $" + round((sum / groceryData.length));
    }

    

}


function removeLowPrice() {
    let count = 0;
    for (let i = groceryData.length -1 ; i >= 0; i--) {
        groceryData.splice(i,1);
        count++;
    }
    
    //Output the result
    outputEl.innerHTML = "<h3>Remove Low Products</h3>";
    outputEl.innerHTML += "Number of products removed :" + count;
}


function removeProductByName() {
    //Remove the product with the name specified from the user
    let name = prompt("Enter the name of product to remove: ");

    let found = false;

    for (let i = 0; i < groceryData.length; i++) {
        if (groceryData[i].name == name) {
            found  = true;
            groceryData.splice(i,1);
            break;
        }
        
        
    }

    //Output
    outputEl.innerHTML = "<h3>Remove Products By Name</h3>";
    if (found) {
        outputEl.innerHTML += "Removed the product with the name :" + name;
    } else {
        outputEl.innerHTML += "The product with the" + name + "could not be found";
    }
    
}

//Helper Function
function productString(aProduct) {
    return aProduct.name + " $" + Math.round(aProduct.price * 1.07) + " (" + aProduct.country + ")"
}



// Main Menu & Go Button
document.getElementById('go').addEventListener('click', mainMenu);

function mainMenu() {
    // Get value of menu select element
    let selection = document.getElementById('menu').value;

    // Take action based on menu selection
    if (selection == 'display-all') {
        displayAllProducts();
    } else if (selection == 'display-price-range') {
       displayPriceRange();
    } else if (selection == 'display-country-of-orgin') {
        displayCountryofOrgin();
    } else if (selection == 'display-random-product') {
        displayRandomProduct();
    } else if (selection == "inflation") {
        productInflation();
    } else if (selection == "price-stats") {
        productPriceStats();
    } else if (selection == "new-product") {
        addNewProduct();
    } else if (selection == "remove-low") {
        removeLowPrice();
    } else if (selection == "remove-product") {
        removeProductByName();
    } 
}


