const PRODUCTS = [
  { name:"Laptop",      category:"Electronics", price:1000, image:"https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=500&q=80" },
  { name:"Phone",       category:"Electronics", price:500,  image:"https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=500&q=80" },
  { name:"Tablet",      category:"Electronics", price:300,  image:"https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=500&q=80" },
  { name:"Headphones",  category:"Electronics", price:150,  image:"https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=500&q=80" },
  { name:"Smart Watch", category:"Electronics", price:200,  image:"https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=500&q=80" },
  { name:"Camera",      category:"Electronics", price:800,  image:"https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=500&q=80" },
  { name:"Notebook",    category:"Stationery",  price:5,    image:"https://images.unsplash.com/photo-1531346878377-a5be20888e57?auto=format&fit=crop&w=500&q=80" },
  { name:"Pen",         category:"Stationery",  price:2,    image:"https://images.unsplash.com/photo-1585336261022-680e295ce3fe?auto=format&fit=crop&w=500&q=80" },
  { name:"Pencil",      category:"Stationery",  price:1,    image:"images/pencil.png" },
  { name:"Marker",      category:"Stationery",  price:3,    image:"images/marker.png" },
  { name:"Eraser",      category:"Stationery",  price:1,    image:"images/eraser.png" },
  { name:"Stapler",     category:"Stationery",  price:6,    image:"images/stapler.png" },
  { name:"T-Shirt",     category:"Clothing",    price:20,   image:"https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=500&q=80" },
  { name:"Jeans",       category:"Clothing",    price:40,   image:"https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=500&q=80" },
  { name:"Bag",         category:"Clothing",    price:25,   image:"https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=500&q=80" },
  { name:"Jacket",      category:"Clothing",    price:60,   image:"https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=500&q=80" },
  { name:"Shoes",       category:"Clothing",    price:70,   image:"https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=500&q=80" },
  { name:"Cap",         category:"Clothing",    price:15,   image:"https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&w=500&q=80" },
];

const EMOJIS = { Electronics:"⚡", Stationery:"✏️", Clothing:"👕" };
let cart = [];

// Populate category filter
const catSelect = document.getElementById("categoryFilter");
[...new Set(PRODUCTS.map(p => p.category))].forEach(cat => {
  const opt = document.createElement("option");
  opt.value = cat; opt.textContent = cat;
  catSelect.appendChild(opt);
});

function displayProducts(products) {
  const container = document.getElementById("productList");
  container.innerHTML = "";
  if (!products.length) {
    container.innerHTML = `<div class="empty-state"><div style="font-size:3rem;margin-bottom:14px">🔍</div><h3>No products found</h3><p>Try a different search or category.</p></div>`;
    return;
  }
  const grouped = {};
  products.forEach(p => { (grouped[p.category] = grouped[p.category] || []).push(p); });
  for (let cat in grouped) {
    const section = document.createElement("section");
    section.className = "category-section";
    const grid = document.createElement("div");
    grid.className = "category-grid";
    grouped[cat].forEach((p, i) => {
      const card = createCard(p);
      card.style.animationDelay = (i * 0.05) + "s";
      grid.appendChild(card);
    });
    section.innerHTML = `<div class="category-header"><h2 class="category-title">${EMOJIS[cat]||"🏷️"} ${cat}</h2><span class="category-count">${grouped[cat].length} items</span></div>`;
    section.appendChild(grid);
    container.appendChild(section);
  }
}

function createCard(product) {
  const div = document.createElement("article");
  div.className = "product";
  const imgHtml = product.image
    ? `<img src="${product.image}" alt="${product.name}" loading="lazy">`
    : `<div class="product-img-placeholder">${EMOJIS[product.category]||"📦"}</div>`;
  div.innerHTML = `
    <div class="product-img-wrap">${imgHtml}</div>
    <div class="product-body">
      <div class="product-category">${product.category}</div>
      <div class="product-name">${product.name}</div>
      <div class="product-footer">
        <span class="price">$${product.price}</span>
        <button class="add-to-cart">Add to cart</button>
      </div>
    </div>`;
  div.querySelector("button").onclick = (e) => {
    addToCart(product);
    const btn = e.target;
    btn.textContent = "✓ Added"; btn.classList.add("added");
    setTimeout(() => { btn.textContent = "Add to cart"; btn.classList.remove("added"); }, 1400);
  };
  return div;
}

function addToCart(product) {
  cart.push(product); updateCart();
  showToast(`${product.name} added to cart!`);
}
function removeFromCart(i) { cart.splice(i, 1); updateCart(); }
function updateCart() {
  document.getElementById("cartCount").textContent = cart.length;
  const list = document.getElementById("cartItems");
  const footer = document.getElementById("cartTotal");
  if (!cart.length) {
    list.innerHTML = `<div class="cart-empty"><div style="font-size:2.5rem;margin-bottom:10px">🛒</div><p>Your cart is empty.</p></div>`;
    footer.innerHTML = ""; return;
  }
  list.innerHTML = "";
  let total = 0;
  cart.forEach((item, i) => {
    total += item.price;
    const li = document.createElement("li");
    li.innerHTML = `<span class="cart-item-name">${item.name}</span><span class="cart-item-price">$${item.price}</span><button>✕</button>`;
    li.querySelector("button").onclick = () => removeFromCart(i);
    list.appendChild(li);
  });
  footer.innerHTML = `<span>Total</span><span>$${total}</span>`;
}

function showToast(msg) {
  const t = document.getElementById("toast");
  t.textContent = msg; t.classList.add("show");
  setTimeout(() => t.classList.remove("show"), 2200);
}

document.getElementById("themeToggle").addEventListener("click", () => {
  document.body.classList.toggle("dark");
  document.getElementById("themeToggle").textContent = document.body.classList.contains("dark") ? "☀️ Light" : "🌙 Dark";
});
document.getElementById("closeCart").onclick = () => document.getElementById("cartPopup").classList.add("hidden");
document.getElementById("cartCounter").onclick = () => document.getElementById("cartPopup").classList.toggle("hidden");
document.getElementById("checkoutBtn").onclick = () => {
  if (!cart.length) { showToast("Your cart is empty!"); return; }
  showToast("🎉 Order placed! Thank you!");
  cart = []; updateCart();
  document.getElementById("cartPopup").classList.add("hidden");
};

function filterProducts() {
  const search = document.getElementById("search").value.toLowerCase();
  const category = document.getElementById("categoryFilter").value;
  const sort = document.getElementById("sortFilter").value;
  let filtered = PRODUCTS.filter(p =>
    p.name.toLowerCase().includes(search) &&
    (category === "all" || p.category === category)
  );
  if (sort === "price-asc") filtered.sort((a,b) => a.price - b.price);
  if (sort === "price-desc") filtered.sort((a,b) => b.price - a.price);
  displayProducts(filtered);
}
document.getElementById("search").addEventListener("input", filterProducts);
document.getElementById("categoryFilter").addEventListener("change", filterProducts);
document.getElementById("sortFilter").addEventListener("change", filterProducts);

document.getElementById("chatToggle").addEventListener("click", () => {
  document.getElementById("chatbot").classList.toggle("hidden");
});

// ── AI Chat — calls OUR backend, not Anthropic directly
function addMsg(text, role) {
  const msgs = document.getElementById("chatMessages");
  const div = document.createElement("div");
  div.className = `chat-msg ${role}`;
  div.textContent = text;
  msgs.appendChild(div);
  msgs.scrollTop = msgs.scrollHeight;
  return div;
}

async function sendChat() {
  const input = document.getElementById("chatInput");
  const text = input.value.trim();
  if (!text) return;
  input.value = "";
  addMsg(text, "user");
  const typing = addMsg("Thinking…", "bot");

  try {
    // fetch() calls our own Express server at /api/chat
    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: text })
    });
    const data = await res.json();
    typing.textContent = data.reply || data.error || "No response.";
  } catch {
    typing.textContent = "Could not reach the server. Please try again.";
  }
}

document.getElementById("chatBtn").addEventListener("click", sendChat);
document.getElementById("chatInput").addEventListener("keydown", e => { if (e.key === "Enter") sendChat(); });

displayProducts(PRODUCTS);
updateCart();