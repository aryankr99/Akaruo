// Product Database
const products = [
    { name: "Akaruo Iced Coffee Mix", price: 129 },
    { name: "Akaruo Instant Coffee Mix", price: 99 },
    { name: "Akaruo Classic Black Coffee", price: 119 },
    { name: "Akaruo Zest Lemon Tea", price: 169 },
    { name: "Akaruo Royal Masala Milk", price: 169 },
    { name: "Akaruo Velvet Hot Chocolate", price: 179 }
];

// Product Images Mapping
const productImages = {
    "Akaruo Iced Coffee Mix": "https://i.ibb.co/bjr4Yb5h/1000066584.jpg",
    "Akaruo Instant Coffee Mix": "https://i.ibb.co/Rpy3Hk5D/1000066585.jpg",
    "Akaruo Classic Black Coffee": "https://i.ibb.co/Swzzwj71/1000066588.jpg",
    "Akaruo Zest Lemon Tea": "https://i.ibb.co/bjr4Yb5h/1000066584.jpg",
    "Akaruo Royal Masala Milk": "https://i.ibb.co/Rpy3Hk5D/1000066585.jpg",
    "Akaruo Velvet Hot Chocolate": "https://i.ibb.co/Swzzwj71/1000066588.jpg"
};

// Current selected product for order
let currentSelectedProduct = "";

// Initialize pages on load
document.addEventListener('DOMContentLoaded', function() {
    populateSignatureProducts();
    populateItemsProducts();
});

// Populate Signature Collection
function populateSignatureProducts() {
    const container = document.getElementById('signatureProducts');
    container.innerHTML = '';
    
    products.forEach((product, index) => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.style.animationDelay = `${index * 0.1}s`;
        
        card.innerHTML = `
            <div class="product-name">${product.name}</div>
            <div class="product-price">₹${product.price}</div>
            <button class="btn-lux" style="width: 100%;" onclick="selectProductAndNavigate('${product.name}')">
                <i class="fas fa-shopping-cart"></i> BUY NOW
            </button>
        `;
        
        container.appendChild(card);
    });
}

// Populate Items Page
function populateItemsProducts() {
    const container = document.getElementById('itemsProducts');
    container.innerHTML = '';
    
    products.forEach(product => {
        const card = document.createElement('div');
        card.className = 'item-card';
        
        const imageUrl = productImages[product.name] || 'https://i.ibb.co/bjr4Yb5h/1000066584.jpg';
        
        card.innerHTML = `
            <img src="${imageUrl}" alt="${product.name}">
            <div class="item-name">${product.name}</div>
            <button class="btn-lux" style="margin-top: 1rem;" onclick="selectProductAndNavigate('${product.name}')">
                <i class="fas fa-shopping-bag"></i> Buy Now
            </button>
        `;
        
        container.appendChild(card);
    });
}

// Navigation Function
function navigateTo(page) {
    // Hide all pages
    document.querySelectorAll('.page').forEach(p => {
        p.classList.remove('active');
    });
    
    // Show selected page
    if (page === 'floating') {
        document.getElementById('floatingPage').classList.add('active');
    } else if (page === 'signature') {
        document.getElementById('signaturePage').classList.add('active');
    } else if (page === 'items') {
        document.getElementById('itemsPage').classList.add('active');
    } else if (page === 'order') {
        document.getElementById('orderPage').classList.add('active');
    }
    
    // Smooth scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Handle Login
function handleLogin(event) {
    event.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    // Simple validation (for demo purposes)
    if (email && password) {
        // Add fade animation
        document.getElementById('loginPage').style.opacity = '0';
        
        setTimeout(() => {
            document.querySelectorAll('.page').forEach(p => {
                p.classList.remove('active');
            });
            document.getElementById('welcomePage').classList.add('active');
            document.getElementById('loginPage').style.opacity = '1';
        }, 300);
    }
}

// Select product and navigate to order page
function selectProductAndNavigate(productName) {
    currentSelectedProduct = productName;
    document.getElementById('selectedProduct').value = productName;
    
    // Add smooth transition
    const currentPage = document.querySelector('.page.active');
    currentPage.style.opacity = '0';
    
    setTimeout(() => {
        navigateTo('order');
        currentPage.style.opacity = '1';
        
        // Pre-fill a message in the form (optional hint)
        const addressField = document.getElementById('address');
        if (addressField) {
            addressField.placeholder = `Ordering: ${productName}`;
        }
    }, 300);
}

// Handle Order Submit
function handleOrderSubmit(event) {
    event.preventDefault();
    
    // Get form values
    const fullName = document.getElementById('fullName').value;
    const mobile = document.getElementById('mobile').value;
    const address = document.getElementById('address').value;
    const city = document.getElementById('city').value;
    const state = document.getElementById('state').value;
    const pincode = document.getElementById('pincode').value;
    const product = currentSelectedProduct || document.getElementById('selectedProduct').value || 'Akaruo Product';
    
    // Get product price
    const productData = products.find(p => p.name === product);
    const price = productData ? productData.price : 'Price on request';
    
    // Create WhatsApp message
    const message = `🟫 *AKARUO LUXURY COFFEE ORDER* 🟫%0A%0A` +
                   `👤 *Customer Details*%0A` +
                   `Name: ${fullName}%0A` +
                   `Mobile: ${mobile}%0A%0A` +
                   `📍 *Shipping Address*%0A` +
                   `${address}%0A` +
                   `${city}, ${state} - ${pincode}%0A%0A` +
                   `☕ *Order Details*%0A` +
                   `Product: ${product}%0A` +
                   `Price: ₹${price}%0A` +
                   `Payment: Cash on Delivery%0A%0A` +
                   `✨ _Premium Order via Akaruo Luxury_ ✨`;
    
    // Open WhatsApp
    const whatsappURL = `https://wa.me/919608891170?text=${message}`;
    window.open(whatsappURL, '_blank');
    
    // Show success animation
    const button = event.target.querySelector('button[type="submit"]');
    button.innerHTML = '<i class="fas fa-check"></i> ORDER SENT!';
    button.style.background = 'linear-gradient(135deg, #00a86b, #90ee90)';
    
    setTimeout(() => {
        button.innerHTML = '<i class="fas fa-whatsapp"></i> PLACE ORDER';
        button.style.background = '';
        
        // Navigate back to welcome after order
        document.querySelectorAll('.page').forEach(p => {
            p.classList.remove('active');
        });
        document.getElementById('welcomePage').classList.add('active');
        
        // Reset form
        document.getElementById('orderForm').reset();
    }, 2000);
}

// Add keyboard navigation for better UX
document.addEventListener('keydown', function(e) {
    if (e.key === 'Enter' && document.getElementById('loginPage').classList.contains('active')) {
        const loginForm = document.getElementById('loginForm');
        if (loginForm) {
            handleLogin(e);
        }
    }
});

// Smooth page transitions
window.addEventListener('load', function() {
    // Add fade-in effect to initial page
    const activePage = document.querySelector('.page.active');
    if (activePage) {
        activePage.style.animation = 'fadeSlideUp 0.8s ease-out';
    }
});

// Prevent default form submissions
document.addEventListener('submit', function(e) {
    if (e.target.id === 'loginForm' || e.target.id === 'orderForm') {
        // Already handled
    } else {
        e.preventDefault();
    }
});
