let totalPrice = 0;
const cartItems = [];


async function fetchData() {
    const response = await fetch('https://fakestoreapi.com/products');
    const data = await response.json();

    const cardHTML = data.map((item) => {
        const splicedTitle = item.title.slice(0, 18);

        // console.log(item.title + " " + item.price + " " + item.image)
        return `
            <div class="card w-25 m-3">
                <div class="card-img">
                    <img src="${item.image}" alt="">
                </div>
                <div class="card-info text-center">
                    <h4>${splicedTitle}</h4>
                    <p class="mb-0 fw-bold" >Price : $${item.price}</p>
                    <button class="btn btn-info text-white mt-2 mb-2 addtocart btn-sm " >Add To Cart</button>
                </div>
            </div>
        `;


    }).join('');

    document.getElementById('cards-container').innerHTML = cardHTML;
}

// Function to handle search functionality
function searchProducts() {
    const searchTerm = document.getElementById('search').value.trim().toLowerCase();
    const cards = document.querySelectorAll('.card');

    let found = false;
    cards.forEach((card) => {
        const title = card.querySelector('h4').innerText.toLowerCase();
        if (title.includes(searchTerm)) {
            card.style.display = 'block';
            found = true;
        } else {
            card.style.display = 'none';
        }
    });

    if (!found) {
        alert('Nothing found');
    }
}

// Event listener for the search input
document.getElementById('search').addEventListener('input', searchProducts);

// Event delegation for dynamically generated elements
document.getElementById('cards-container').addEventListener('click', function (event) {
    if (event.target.classList.contains('addtocart')) {
        const card = event.target.closest('.card');
        const image = card.querySelector('img').src;
        const price = card.querySelector('.fw-bold').textContent.replace('Price : $', '');
        addCart(image, price);
     
    }
});




// Function to handle adding to cart
function addCart(image, price) {

    // Convert price string to number
    const productPrice = parseFloat(price);
    // Push product details to the cart
    cartItems.push({ image, price: productPrice });
    // Get the total count of products in the cart
    const totalCount = cartItems.length;
    document.getElementById('totalproduct').textContent = `${totalCount.toFixed(0)}`;
    // Log the total count in the console
    console.log("Total Number of Products in Cart:", totalCount);
    // Add product price to the total price
    totalPrice += productPrice;
    // Update the HTML to display the total price
    document.getElementById('cartTotal').textContent = `$${totalPrice.toFixed(2)}`;


    const cartItemHTML = `
    <div class="border rounded cartlayout d-flex">
        <img src="${image}" alt="tt">
        <i class="fa-solid fa-dollar"></i><span>${price}</span>
        <span class="removeproduct" ><i class="fa-solid fa-xmark"></i></span>
    </div>
    `;

    const cardRenderData = document.getElementById("cardrenderdata");
    cardRenderData.innerHTML += cartItemHTML;
}

// Event delegation for remove product
document.getElementById('cardrenderdata').addEventListener('click', function (event) {
    // let price = 100;
    
    
    if (event.target.classList.contains('fa-xmark')) {
        // Find the parent element of the icon, which is the cart item
        const cartItem = event.target.closest('.cartlayout');
        const priceText = cartItem.textContent; // Get the text content of cartItem
        const price = parseFloat(priceText); // Convert the text content to a floating-point number
        const formattedPrice = price.toFixed(2); // Format the price with two decimal places




        
        // Find the index of the cart item in the cartItems array
        const index = Array.from(cartItem.parentElement.children).indexOf(cartItem);
        // Get the price of the item to be removed
        cartItems.splice(index, 1);
        const totalCount = cartItems.length - 1;
         document.getElementById('totalproduct').textContent = `${totalCount.toFixed(0)}`;
        
         
        
        // Remove the cart item from the HTML
        cartItem.remove();
        // Show alert
        alert('Item is removed');
        // Recalculate total price
        calculateTotalPrice(formattedPrice) 
        
    }
});



// Function to calculate total price
function calculateTotalPrice(removedPrice) {
    totalPrice -= removedPrice; // Subtract the removed item's price from the total price
    document.getElementById('cartTotal').textContent = `$${totalPrice.toFixed(2)}`;
    // console.log(totalPrice);
    
}

fetchData()










