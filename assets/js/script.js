document.addEventListener("DOMContentLoaded", () => {
  var cartIcon = document.querySelector(".cart-icon");
  var cartOverlay = document.querySelector(".cart-overlay");
  var cartItemsContainer = document.querySelector(".cart-items");
  var cartTotalElement = document.querySelector(".cart-total");
  var closeCartBtn = document.querySelector(".close-cart");
  var addToCartButtons = document.querySelectorAll(".add-to-cart");
  var themeToggle = document.querySelector(".theme-toggle");
  var themeIcon = document.getElementById("theme-icon");
  var body = document.body;

  let cart = new Map();

  // ✅ تحميل السلة من localStorage بأمان
  try {
    var savedCart = localStorage.getItem("cart");
    if (savedCart) {
      cart = new Map(JSON.parse(savedCart));
    }
  } catch (error) {
    console.error("Error loading cart from localStorage:", error);
  }

  // ✅ تحديث عدد المنتجات في أيقونة السلة
  function updateCartCount() {
    document.querySelector(".cart-count").innerText = [...cart.values()]
      .reduce((sum, item) => sum + item.quantity, 0);
  }

  // ✅ تحديث السلة وعرضها في الـ HTML
  function updateCart() {
    cartItemsContainer.innerHTML = "";
    let total = 0;

    cart.forEach((item, key) => {
      total += item.price * item.quantity;

      var cartItem = document.createElement("div");
      cartItem.classList.add("cart-item");
      cartItem.innerHTML = `
        <span>${item.name} × ${item.quantity}</span>
        <span>${(item.price * item.quantity).toFixed(2)} $</span>
        <button class="remove-item" data-key="${key}">❌</button>
      `;
      cartItemsContainer.appendChild(cartItem);
    });

    cartTotalElement.innerText = total.toFixed(2);
    updateCartCount();
    localStorage.setItem("cart", JSON.stringify([...cart]));
  }

  // ✅ إضافة منتج إلى السلة
  function addToCart(productName, price) {
    if (cart.has(productName)) {
      cart.get(productName).quantity += 1;
    } else {
      cart.set(productName, { name: productName, price: price, quantity: 1 });
    }

    updateCart();
    animateCartIcon();
    cartOverlay.style.display = "flex";
  }

  // ✅ إزالة منتج من السلة
  function removeFromCart(productName) {
    cart.delete(productName);
    updateCart();
  }

  // ✅ تأثير بسيط عند إضافة منتج إلى السلة
  function animateCartIcon() {
    cartIcon.classList.add("shake");
    setTimeout(() => cartIcon.classList.remove("shake"), 300);
  }

  // ✅ عند الضغط على زر الإضافة إلى السلة
  var productNames = ["ليمون أصفر", "ليمون أخضر", "برتقال", "بوملي", "كموكوا", "كلمنتينا"];
  var prices = [5.99, 5.99, 5.99, 5.99, 5.99, 5.99];

  addToCartButtons.forEach((button, index) => {
    button.addEventListener("click", () => {
      addToCart(productNames[index], prices[index]);
    });
  });

  // ✅ إظهار السلة عند الضغط على الأيقونة
  cartIcon.addEventListener("click", () => {
    cartOverlay.style.display = "flex";
  });

  // ✅ إغلاق السلة
  closeCartBtn.addEventListener("click", () => {
    cartOverlay.style.display = "none";
  });

  // ✅ إزالة منتج عند الضغط على زر الحذف داخل السلة
  cartItemsContainer.addEventListener("click", (e) => {
    if (e.target.classList.contains("remove-item")) {
      removeFromCart(e.target.dataset.key);
    }
  });

  // ✅ تحديث السلة عند تحميل الصفحة
  updateCart();

  // ✅ تفعيل الوضع الليلي المحفوظ في localStorage
  if (localStorage.getItem("theme") === "dark-theme") {
    body.classList.add("dark-theme");
    themeIcon.classList.replace("bi-moon-fill", "bi-sun-fill");
  }

  // ✅ تبديل الثيم عند النقر على الأيقونة
  themeToggle.addEventListener("click", () => {
    body.classList.toggle("dark-theme");
    var isDarkTheme = body.classList.contains("dark-theme");
    themeIcon.classList.toggle("bi-moon-fill", !isDarkTheme);
    themeIcon.classList.toggle("bi-sun-fill", isDarkTheme);
    localStorage.setItem("theme", isDarkTheme ? "dark-theme" : "");
  });

  // ✅ تفعيل القائمة الجانبية عند الضغط على زر القائمة (للفواكة)
  document.querySelector(".bars-menu").addEventListener("click", () => {
    document.querySelector(".nav-items").classList.toggle("active");
  });

  document.querySelectorAll(".nav-link").forEach((item) => {
    item.addEventListener("click", () => {
      document.querySelector(".nav-items").classList.toggle("active");
    });
  });
});
