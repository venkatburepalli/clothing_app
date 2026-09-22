let products = [];
let cart = [];

async function loadProducts() {
    try {
        const response = await fetch("/api/products");
        products = await response.json();
        displayProducts();
    } catch (error) {
        console.error("Unable to load products", error);
    }
}

function displayProducts() {
    const container = document.getElementById("productsContainer");
    container.innerHTML = "";

    products.forEach(product => {
        container.innerHTML += `
            <div class="product-card">
                <img src="${product.image}" alt="${product.name}">
                <div class="product-info">
                    <h3>${product.name}</h3>
                    <p class="category">${product.category}</p>
                    <p class="price">₹${product.price}</p>
                    <button class="add-button" onclick="addToCart(${product.id})">
                        Add to Cart
                    </button>
                </div>
            </div>
        `;
    });
}

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existing = cart.find(item => item.id === productId);

    if (existing) {
        existing.quantity++;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    updateCart();
}

function updateCart() {
    const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
    document.getElementById("cartCount").innerText = cartCount;
    displayCart();
}

function displayCart() {
    const container = document.getElementById("cartItems");
    container.innerHTML = "";

    if (cart.length === 0) {
        container.innerHTML = "<p>Your cart is empty.</p>";
        document.getElementById("cartTotal").innerText = "0";
        return;
    }

    let total = 0;

    cart.forEach(item => {
        total += item.price * item.quantity;

        container.innerHTML += `
            <div class="cart-item">
                <div>
                    <strong>${item.name}</strong>
                    <p>₹${item.price}</p>
                </div>
                <div class="quantity-controls">
                    <button onclick="changeQuantity(${item.id}, -1)">-</button>
                    <span>${item.quantity}</span>
                    <button onclick="changeQuantity(${item.id}, 1)">+</button>
                    <button class="remove-button" onclick="removeItem(${item.id})">✕</button>
                </div>
            </div>
        `;
    });

    document.getElementById("cartTotal").innerText = total;
}

function changeQuantity(id, change) {
    const item = cart.find(item => item.id === id);
    if (!item) return;

    item.quantity += change;

    if (item.quantity <= 0) {
        cart = cart.filter(item => item.id !== id);
    }

    updateCart();
}

function removeItem(id) {
    cart = cart.filter(item => item.id !== id);
    updateCart();
}

function openCart() {
    document.getElementById("cartOverlay").style.display = "block";
}

function closeCart() {
    document.getElementById("cartOverlay").style.display = "none";
}

function checkout() {
    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }

    cart = [];
    updateCart();
    closeCart();
    document.getElementById("successMessage").style.display = "flex";
}

function closeSuccess() {
    document.getElementById("successMessage").style.display = "none";
}

function scrollToProducts() {
    document.getElementById("products").scrollIntoView({
        behavior: "smooth"
    });
}

loadProducts();