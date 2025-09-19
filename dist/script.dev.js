"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

// Global variables
var cartCount = 0; // DOM Elements

var topBanner = document.getElementById('topBanner');
var navMenu = document.getElementById('navMenu');
var cartCountElement = document.getElementById('cartCount'); // Close top banner

function closeBanner() {
  if (topBanner) {
    topBanner.style.display = 'none';
    document.body.style.paddingTop = '80px'; // Adjust for removed banner
    // Update navbar position

    var navbar = document.querySelector('.navbar');

    if (navbar) {
      navbar.style.top = '0';
    } // Update hero padding


    var hero = document.querySelector('.hero');

    if (hero) {
      hero.style.paddingTop = '80px';
    }
  }
} // Toggle mobile menu


function toggleMobileMenu() {
  if (navMenu) {
    navMenu.classList.toggle('active');
  }
} // Update cart count (sync from localStorage if not provided)


function updateCartCount(count) {
  if (typeof count !== 'number') {
    var cartLS = JSON.parse(localStorage.getItem('cart') || '[]');
    cartCount = cartLS.reduce(function (sum, it) {
      return sum + (Number(it.qty) || 0);
    }, 0);
  } else {
    cartCount = count;
  }

  if (cartCountElement) {
    cartCountElement.textContent = cartCount;
    cartCountElement.style.display = cartCount > 0 ? 'flex' : 'none';
  }
} // Minimal product map for homepage quick add → stores real items so cart shows them


var HOME_PRODUCTS = {
  '1': {
    id: 1,
    name: 'T-shirt With Tape Details',
    price: 120,
    img: 'shopco-web-master/src/assets/images/newarrivalimg1.png'
  },
  '2': {
    id: 2,
    name: 'Skinny Fit Jeans',
    price: 240,
    img: 'shopco-web-master/src/assets/images/newarrivalimg2.png'
  },
  '3': {
    id: 3,
    name: 'Checkered Shirt',
    price: 180,
    img: 'shopco-web-master/src/assets/images/newarrivalimg3.png'
  },
  '4': {
    id: 4,
    name: 'Sleeve Striped T-shirt',
    price: 130,
    img: 'shopco-web-master/src/assets/images/newarrivalimg4.png'
  },
  '5': {
    id: 5,
    name: 'Vertical Striped Shirt',
    price: 212,
    img: 'shopco-web-master/src/assets/images/topsellingimg1.png'
  },
  '6': {
    id: 6,
    name: 'Courage Graphic T-shirt',
    price: 145,
    img: 'shopco-web-master/src/assets/images/topsellingimg2.png'
  },
  '7': {
    id: 7,
    name: 'Loose Fit Bermuda Shorts',
    price: 80,
    img: 'shopco-web-master/src/assets/images/topsellingimg3.png'
  },
  '8': {
    id: 8,
    name: 'Faded Skinny Jeans',
    price: 210,
    img: 'shopco-web-master/src/assets/images/topsellingimg4.png'
  }
};

function addToCart(productIdOrObj) {
  var cart = JSON.parse(localStorage.getItem('cart') || '[]');

  if (_typeof(productIdOrObj) === 'object' && productIdOrObj) {
    var keyMatch = function keyMatch(a, b) {
      return a.id === b.id && a.color === b.color && a.size === b.size;
    };

    var existing = cart.find(function (it) {
      return keyMatch(it, productIdOrObj);
    });
    if (existing) existing.qty += productIdOrObj.qty || 1;else cart.push(_objectSpread({}, productIdOrObj, {
      qty: productIdOrObj.qty || 1
    }));
  } else if (HOME_PRODUCTS[String(productIdOrObj)]) {
    var base = HOME_PRODUCTS[String(productIdOrObj)];
    var quick = {
      id: base.id,
      name: base.name,
      price: base.price,
      img: base.img,
      color: 'Black',
      size: 'M',
      qty: 1
    };

    var _existing = cart.find(function (it) {
      return it.id === quick.id && it.color === quick.color && it.size === quick.size;
    });

    if (_existing) _existing.qty += 1;else cart.push(quick);
  }

  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartCount();
  showNotification('Added to cart!');
} // Show notification


function showNotification(message) {
  // Create notification element
  var notification = document.createElement('div');
  notification.className = 'notification';
  notification.textContent = message;
  notification.style.cssText = "\n        position: fixed;\n        top: 20px;\n        right: 20px;\n        background: #000;\n        color: white;\n        padding: 12px 24px;\n        border-radius: 8px;\n        z-index: 9999;\n        animation: slideIn 0.3s ease;\n    ";
  document.body.appendChild(notification); // Remove notification after 3 seconds

  setTimeout(function () {
    notification.style.animation = 'slideOut 0.3s ease';
    setTimeout(function () {
      document.body.removeChild(notification);
    }, 300);
  }, 3000);
} // Smooth scroll for navigation links


function scrollToSection(sectionId) {
  var target = document.getElementById(sectionId);

  if (target) {
    // Calculate offset for fixed navbar
    var navbarHeight = document.querySelector('.navbar').offsetHeight;
    var bannerHeight = document.getElementById('topBanner').style.display === 'none' ? 0 : document.getElementById('topBanner').offsetHeight;
    var totalOffset = navbarHeight + bannerHeight; // Scroll to show the section title clearly (not hidden by navbar)

    var targetPosition = target.offsetTop - totalOffset - 150; // 150px extra margin to show title clearly

    window.scrollTo({
      top: targetPosition,
      behavior: 'smooth'
    });
  }
} // Search functionality


function handleSearch(query) {
  console.log('Searching for:', query); // Implement search logic here
} // Handle navbar scroll effect


function handleNavbarScroll() {
  var navbar = document.querySelector('.navbar');
  var hero = document.querySelector('.hero');

  if (navbar && hero) {
    var heroBottom = hero.offsetTop + hero.offsetHeight;
    var scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > heroBottom - 100) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }
} // Initialize when DOM is loaded


document.addEventListener('DOMContentLoaded', function () {
  // Sync badge from localStorage
  updateCartCount(); // Add scroll listener for navbar effect

  window.addEventListener('scroll', handleNavbarScroll); // Add search functionality

  var searchInput = document.querySelector('.search-input');

  if (searchInput) {
    searchInput.addEventListener('keypress', function (e) {
      if (e.key === 'Enter') {
        handleSearch(this.value);
      }
    });
  } // Close mobile menu when clicking outside


  document.addEventListener('click', function (e) {
    if (navMenu && !navMenu.contains(e.target) && !e.target.classList.contains('hamburger')) {
      navMenu.classList.remove('active');
    }
  }); // Close dropdown when clicking outside

  document.addEventListener('click', function (e) {
    var dropdowns = document.querySelectorAll('.dropdown-menu');
    dropdowns.forEach(function (dropdown) {
      if (!dropdown.parentElement.contains(e.target)) {
        dropdown.style.display = 'none';
      }
    });
  }); // Load additional sections only if placeholders exist (prevents errors on other pages)

  if (document.getElementById('new-arrivals')) loadNewArrivals();
  if (document.getElementById('top-selling')) loadTopSelling();
  if (document.getElementById('dressStyle')) loadDressStyle();
  if (document.getElementById('footer')) loadFooter();
}); // Load New Arrivals section

function loadNewArrivals() {
  var newArrivalsHTML = "\n        <section class=\"new-arrivals py-5\">\n            <div class=\"container\">\n                <div class=\"text-center mb-5\">\n                    <h2 class=\"section-title\">NEW ARRIVALS</h2>\n                </div>\n                <div class=\"products-grid\">\n                    <div class=\"product-card\">\n                        <div class=\"product-image\">\n                            <img src=\"shopco-web-master/src/assets/images/newarrivalimg1.png\" alt=\"T-shirt With Tape Details\" style=\"cursor:pointer;\" onclick=\"location.href='product-detail.html?id=1'\">\n                        </div>\n                        <div class=\"product-info\">\n                            <h3 style=\"cursor:pointer\" onclick=\"location.href='product-detail.html?id=1'\">T-shirt With Tape Details</h3>\n                            <div class=\"rating\">\n                                <span class=\"stars\">\u2605\u2605\u2605\u2605\u2605</span>\n                                <span>4.5/5</span>\n                            </div>\n                            <div class=\"price\">$120</div>\n                            <button class=\"add-to-cart-btn\" onclick=\"addToCart('1')\">Add to Cart</button>\n                        </div>\n                    </div>\n                    <div class=\"product-card\">\n                        <div class=\"product-image\">\n                            <img src=\"shopco-web-master/src/assets/images/newarrivalimg2.png\" alt=\"Skinny Fit Jeans\" style=\"cursor:pointer;\" onclick=\"location.href='product-detail.html?id=2'\">\n                        </div>\n                        <div class=\"product-info\">\n                            <h3 style=\"cursor:pointer\" onclick=\"location.href='product-detail.html?id=2'\">Skinny Fit Jeans</h3>\n                            <div class=\"rating\">\n                                <span class=\"stars\">\u2605\u2605\u2605\u2605\u2606</span>\n                                <span>3.5/5</span>\n                            </div>\n                            <div class=\"price\">\n                                <span class=\"current-price\">$240</span>\n                                <span class=\"old-price\">$260</span>\n                                <span class=\"discount\">-20%</span>\n                            </div>\n                            <button class=\"add-to-cart-btn\" onclick=\"addToCart('2')\">Add to Cart</button>\n                        </div>\n                    </div>\n                    <div class=\"product-card\">\n                        <div class=\"product-image\">\n                            <img src=\"shopco-web-master/src/assets/images/newarrivalimg3.png\" alt=\"Checkered Shirt\" style=\"cursor:pointer;\" onclick=\"location.href='product-detail.html?id=3'\">\n                        </div>\n                        <div class=\"product-info\">\n                            <h3 style=\"cursor:pointer\" onclick=\"location.href='product-detail.html?id=3'\">Checkered Shirt</h3>\n                            <div class=\"rating\">\n                                <span class=\"stars\">\u2605\u2605\u2605\u2605\u2605</span>\n                                <span>4.5/5</span>\n                            </div>\n                            <div class=\"price\">$180</div>\n                            <button class=\"add-to-cart-btn\" onclick=\"addToCart('3')\">Add to Cart</button>\n                        </div>\n                    </div>\n                    <div class=\"product-card\">\n                        <div class=\"product-image\">\n                            <img src=\"shopco-web-master/src/assets/images/newarrivalimg4.png\" alt=\"Sleeve Striped T-shirt\" style=\"cursor:pointer;\" onclick=\"location.href='product-detail.html?id=4'\">\n                        </div>\n                        <div class=\"product-info\">\n                            <h3 style=\"cursor:pointer\" onclick=\"location.href='product-detail.html?id=4'\">Sleeve Striped T-shirt</h3>\n                            <div class=\"rating\">\n                                <span class=\"stars\">\u2605\u2605\u2605\u2605\u2605</span>\n                                <span>4.5/5</span>\n                            </div>\n                            <div class=\"price\">\n                                <span class=\"current-price\">$130</span>\n                                <span class=\"old-price\">$160</span>\n                                <span class=\"discount\">-30%</span>\n                            </div>\n                            <button class=\"add-to-cart-btn\" onclick=\"addToCart('4')\">Add to Cart</button>\n                        </div>\n                    </div>\n                </div>\n                <div class=\"text-center py-5\">\n                    <button class=\"view-all-btn\">View All</button>\n                </div>\n            </div>\n        </section>\n    ";
  document.getElementById('new-arrivals').innerHTML = newArrivalsHTML;
} // Load Top Selling section


function loadTopSelling() {
  var topSellingHTML = "\n        <section class=\"top-selling py-5\">\n            <div class=\"container\">\n                <div class=\"text-center mb-5\">\n                    <h2 class=\"section-title\">TOP SELLING</h2>\n                </div>\n                <div class=\"products-grid\">\n                    <div class=\"product-card\">\n                        <div class=\"product-image\">\n                            <img src=\"shopco-web-master/src/assets/images/topsellingimg1.png\" alt=\"Vertical Striped Shirt\" style=\"cursor:pointer;\" onclick=\"location.href='product-detail.html?id=5'\">\n                        </div>\n                        <div class=\"product-info\">\n                            <h3 style=\"cursor:pointer\" onclick=\"location.href='product-detail.html?id=5'\">Vertical Striped Shirt</h3>\n                            <div class=\"rating\">\n                                <span class=\"stars\">\u2605\u2605\u2605\u2605\u2605</span>\n                                <span>5.0/5</span>\n                            </div>\n                            <div class=\"price\">\n                                <span class=\"current-price\">$212</span>\n                                <span class=\"old-price\">$232</span>\n                                <span class=\"discount\">-20%</span>\n                            </div>\n                            <button class=\"add-to-cart-btn\" onclick=\"addToCart('5')\">Add to Cart</button>\n                        </div>\n                    </div>\n                    <div class=\"product-card\">\n                        <div class=\"product-image\">\n                            <img src=\"shopco-web-master/src/assets/images/topsellingimg2.png\" alt=\"Courage Graphic T-shirt\" style=\"cursor:pointer;\" onclick=\"location.href='product-detail.html?id=6'\">\n                        </div>\n                        <div class=\"product-info\">\n                            <h3 style=\"cursor:pointer\" onclick=\"location.href='product-detail.html?id=6'\">Courage Graphic T-shirt</h3>\n                            <div class=\"rating\">\n                                <span class=\"stars\">\u2605\u2605\u2605\u2605\u2606</span>\n                                <span>4.0/5</span>\n                            </div>\n                            <div class=\"price\">$145</div>\n                            <button class=\"add-to-cart-btn\" onclick=\"addToCart('6')\">Add to Cart</button>\n                        </div>\n                    </div>\n                    <div class=\"product-card\">\n                        <div class=\"product-image\">\n                            <img src=\"shopco-web-master/src/assets/images/topsellingimg3.png\" alt=\"Loose Fit Bermuda Shorts\" style=\"cursor:pointer;\" onclick=\"location.href='product-detail.html?id=7'\">\n                        </div>\n                        <div class=\"product-info\">\n                            <h3 style=\"cursor:pointer\" onclick=\"location.href='product-detail.html?id=7'\">Loose Fit Bermuda Shorts</h3>\n                            <div class=\"rating\">\n                                <span class=\"stars\">\u2605\u2605\u2605\u2606\u2606</span>\n                                <span>3.0/5</span>\n                            </div>\n                            <div class=\"price\">$80</div>\n                            <button class=\"add-to-cart-btn\" onclick=\"addToCart('7')\">Add to Cart</button>\n                        </div>\n                    </div>\n                    <div class=\"product-card\">\n                        <div class=\"product-image\">\n                            <img src=\"shopco-web-master/src/assets/images/topsellingimg4.png\" alt=\"Faded Skinny Jeans\" style=\"cursor:pointer;\" onclick=\"location.href='product-detail.html?id=8'\">\n                        </div>\n                        <div class=\"product-info\">\n                            <h3 style=\"cursor:pointer\" onclick=\"location.href='product-detail.html?id=8'\">Faded Skinny Jeans</h3>\n                            <div class=\"rating\">\n                                <span class=\"stars\">\u2605\u2605\u2605\u2605\u2605</span>\n                                <span>4.5/5</span>\n                            </div>\n                            <div class=\"price\">$210</div>\n                            <button class=\"add-to-cart-btn\" onclick=\"addToCart('8')\">Add to Cart</button>\n                        </div>\n                    </div>\n                </div>\n                <div class=\"text-center py-5\">\n                    <button class=\"view-all-btn\">View All</button>\n                </div>\n            </div>\n        </section>\n    ";
  document.getElementById('top-selling').innerHTML = topSellingHTML;
} // Load Dress Style section


function loadDressStyle() {
  var dressStyleHTML = "\n        <section class=\"dress-style py-5\">\n            <div class=\"container\">\n                <div class=\"text-center mb-5\">\n                    <h2 class=\"section-title\">BROWSE BY DRESS STYLE</h2>\n                </div>\n                <div class=\"style-grid\">\n                    <div class=\"style-card casual\">\n                        <h3>Casual</h3>\n                    </div>\n                    <div class=\"style-card formal\">\n                        <h3>Formal</h3>\n                    </div>\n                    <div class=\"style-card party\">\n                        <h3>Party</h3>\n                    </div>\n                    <div class=\"style-card gym\">\n                        <h3>Gym</h3>\n                    </div>\n                </div>\n            </div>\n        </section>\n    ";
  document.getElementById('dressStyle').innerHTML = dressStyleHTML;
} // Load Footer section


function loadFooter() {
  var footerHTML = "\n        <footer class=\"footer\">\n            <div class=\"container\">\n                <div class=\"footer-content\">\n                    <div class=\"footer-section\">\n                        <h2>SHOP.CO</h2>\n                        <p>We have clothes that suits your style and which you're proud to wear. From women to men.</p>\n                        <div class=\"social-icons\" role=\"group\" aria-label=\"Social links\">\n                            <a class=\"icon\" href=\"#\" aria-label=\"Twitter\">\n                                <svg width=\"20\" height=\"20\" viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n                                    <path d=\"M22 5.92c-.77.34-1.6.57-2.47.68.89-.53 1.57-1.37 1.89-2.37-.83.49-1.75.84-2.73 1.03A4.13 4.13 0 0 0 12.1 8.1c0 .32.03.62.1.92-3.43-.17-6.47-1.82-8.5-4.34-.36.63-.56 1.36-.56 2.13 0 1.47.75 2.76 1.89 3.52-.7-.02-1.36-.22-1.94-.54v.05c0 2.05 1.5 3.77 3.49 4.16-.36.1-.75.15-1.14.15-.28 0-.55-.03-.82-.08.55 1.72 2.15 2.97 4.05 3A8.3 8.3 0 0 1 2 19.54a11.72 11.72 0 0 0 6.29 1.85c7.55 0 11.68-6.33 11.68-11.82 0-.18 0-.36-.01-.53.8-.6 1.5-1.34 2.04-2.18Z\" fill=\"currentColor\"/>\n                                </svg>\n                            </a>\n                            <a class=\"icon\" href=\"#\" aria-label=\"Facebook\">\n                                <svg width=\"20\" height=\"20\" viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n                                    <path d=\"M13.5 22v-8h2.7l.4-3h-3.1V9.1c0-.9.25-1.5 1.55-1.5h1.7V4.1A23 23 0 0 0 14 4c-2.38 0-4 1.45-4 4.1V11H7v3h3v8h3.5Z\" fill=\"currentColor\"/>\n                                </svg>\n                            </a>\n                            <a class=\"icon\" href=\"#\" aria-label=\"Instagram\">\n                                <svg width=\"20\" height=\"20\" viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n                                    <rect x=\"3\" y=\"3\" width=\"18\" height=\"18\" rx=\"5\" stroke=\"currentColor\" stroke-width=\"1.6\"/>\n                                    <circle cx=\"12\" cy=\"12\" r=\"3.5\" stroke=\"currentColor\" stroke-width=\"1.6\"/>\n                                    <circle cx=\"17.5\" cy=\"6.5\" r=\"1.2\" fill=\"currentColor\"/>\n                                </svg>\n                            </a>\n                            <a class=\"icon\" href=\"#\" aria-label=\"GitHub\">\n                                <svg width=\"20\" height=\"20\" viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n                                    <path d=\"M12 .5C5.73.5.5 5.73.5 12c0 5.1 3.29 9.42 7.86 10.95.58.1.8-.25.8-.57v-2.02c-3.2.7-3.87-1.36-3.87-1.36-.53-1.33-1.28-1.69-1.28-1.69-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.04 1.78 2.73 1.26 3.4.96.1-.75.41-1.25.74-1.54-2.55-.29-5.23-1.27-5.23-5.65 0-1.25.45-2.27 1.19-3.07-.12-.3-.52-1.5.11-3.14 0 0 .98-.32 3.2 1.21.93-.26 1.91-.39 2.89-.39.98 0 1.96.13 2.89.39 2.22-1.53 3.19-1.21 3.19-1.21.64 1.64.24 2.84.12 3.14.74.8 1.19 1.82 1.19 3.07 0 4.4-2.69 5.35-5.25 5.64.42.36.8 1.06.8 2.14v3.17c0 .32.21.69.81.57C20.21 21.41 23.5 17.1 23.5 12 23.5 5.73 18.27.5 12 .5Z\" fill=\"currentColor\"/>\n                                </svg>\n                            </a>\n                        </div>\n                    </div>\n                    <div class=\"footer-section\">\n                        <h4>COMPANY</h4>\n                        <ul>\n                            <li><a href=\"#\">About</a></li>\n                            <li><a href=\"#\">Features</a></li>\n                            <li><a href=\"#\">Works</a></li>\n                            <li><a href=\"#\">Career</a></li>\n                        </ul>\n                    </div>\n                    <div class=\"footer-section\">\n                        <h4>HELP</h4>\n                        <ul>\n                            <li><a href=\"#\">Customer Support</a></li>\n                            <li><a href=\"#\">Delivery Details</a></li>\n                            <li><a href=\"#\">Terms & Conditions</a></li>\n                            <li><a href=\"#\">Privacy Policy</a></li>\n                        </ul>\n                    </div>\n                    <div class=\"footer-section\">\n                        <h4>FAQ</h4>\n                        <ul>\n                            <li><a href=\"#\">Account</a></li>\n                            <li><a href=\"#\">Manage Deliveries</a></li>\n                            <li><a href=\"#\">Orders</a></li>\n                            <li><a href=\"#\">Payments</a></li>\n                        </ul>\n                    </div>\n                    <div class=\"footer-section\">\n                        <h4>RESOURCES</h4>\n                        <ul>\n                            <li><a href=\"#\">Free eBooks</a></li>\n                            <li><a href=\"#\">Development Tutorial</a></li>\n                            <li><a href=\"#\">How to - Blog</a></li>\n                            <li><a href=\"#\">Youtube Playlist</a></li>\n                        </ul>\n                    </div>\n                </div>\n                <div class=\"footer-bottom\">\n                    <p>Shop.co \xA9 2000-2023, All Rights Reserved</p>\n                    <div class=\"payment-icons\" aria-label=\"Payment methods\">\n                        <span class=\"pm\">\n                            <!-- VISA -->\n                            <svg width=\"36\" height=\"16\" viewBox=\"0 0 64 24\" xmlns=\"http://www.w3.org/2000/svg\" aria-hidden=\"true\">\n                                <rect width=\"64\" height=\"24\" rx=\"4\" fill=\"#1A1F71\"/>\n                                <path fill=\"#fff\" d=\"M25.1 17.9l1.8-11.6h2.9l-1.8 11.6h-2.9zm13.7-11.4c-.6-.2-1.5-.4-2.6-.4-2.9 0-4.9 1.5-4.9 3.7 0 1.6 1.5 2.5 2.6 3 1.2.6 1.6 1 1.6 1.5 0 .8-1 1.1-1.9 1.1-1.3 0-2-.2-3.1-.6l-.4-.2-.4 2.6c.8.3 2.3.6 3.9.6 3.7 0 6.1-1.5 6.1-3.9 0-1.3-.9-2.3-2.7-3.1-1.1-.5-1.8-.9-1.8-1.5 0-.5.6-1 1.9-1 1 0 1.8.2 2.3.4l.3.1.4-2.5zm11 0h-2.3c-.7 0-1.2.2-1.5.9l-4.4 10.7h3.1l.6-1.6h3.7l.3 1.6H52l-2.2-11.6zM46.3 15l1.5-4.2 0-.1.9 4.3h-2.4zM21.3 6.3l-2.9 7.9-.3-1.5c-.7-1.9-2.5-4-4.7-5.4l2.7 10.6h3.2l4.7-11.6h-2.7zM14.7 6.3H9.5l-.1.2c4.3 1.1 7.2 3.7 8.4 6.8l-1.2-6.7c-.1-.2-.3-.3-.5-.3z\"/>\n                            </svg>\n                        </span>\n                        <span class=\"pm\">\n                            <!-- MasterCard -->\n                            <svg width=\"36\" height=\"16\" viewBox=\"0 0 64 24\" xmlns=\"http://www.w3.org/2000/svg\" aria-hidden=\"true\">\n                                <rect width=\"64\" height=\"24\" rx=\"4\" fill=\"#fff\" stroke=\"#E6E6E6\"/>\n                                <circle cx=\"28\" cy=\"12\" r=\"6.5\" fill=\"#EB001B\"/>\n                                <circle cx=\"36\" cy=\"12\" r=\"6.5\" fill=\"#F79E1B\"/>\n                                <path d=\"M31.8 7.5h0A6.5 6.5 0 0031.8 16.5h0A6.5 6.5 0 0031.8 7.5z\" fill=\"#FF5F00\"/>\n                            </svg>\n                        </span>\n                        <span class=\"pm\">\n                            <!-- PayPal -->\n                            <svg width=\"36\" height=\"16\" viewBox=\"0 0 64 24\" xmlns=\"http://www.w3.org/2000/svg\" aria-hidden=\"true\">\n                                <rect width=\"64\" height=\"24\" rx=\"4\" fill=\"#fff\" stroke=\"#E6E6E6\"/>\n                                <path fill=\"#003087\" d=\"M16 16l1.3-8h6c2.4 0 3.9 1.2 3.9 3 0 2.8-2.3 5-5.6 5H16z\"/>\n                                <path fill=\"#009CDE\" d=\"M38 8h6.8c2 0 3.2 1 3.2 2.6 0 2.5-2 4.4-4.8 4.4H38l1.1-7z\"/>\n                            </svg>\n                        </span>\n                        <span class=\"pm\">\n                            <!-- Apple Pay -->\n                            <svg width=\"36\" height=\"16\" viewBox=\"0 0 64 24\" xmlns=\"http://www.w3.org/2000/svg\" aria-hidden=\"true\">\n                                <rect width=\"64\" height=\"24\" rx=\"4\" fill=\"#fff\" stroke=\"#E6E6E6\"/>\n                                <path fill=\"#000\" d=\"M23.7 12.6c0-2.4 2-3.6 2-3.6-.9-1.3-2.3-1.3-2.8-1.3-1.2 0-2.2.7-2.8.7-.6 0-1.4-.7-2.3-.7-1.2 0-2.4.7-3 1.7-1.3 2.3-.3 5.7.9 7.6.6.9 1.3 1.9 2.2 1.9.9 0 1.2-.6 2.3-.6 1.1 0 1.3.6 2.3.6.9 0 1.5-.9 2.1-1.8.7-1 1-2 1-2s-1.9-.7-1.9-2.9zM38.8 7.7v8.8h1.6v-2.9h1.8c1.9 0 3.1-1.3 3.1-2.9 0-1.6-1.2-3-3.1-3H38.8zm1.6 1.3H42c.9 0 1.6.7 1.6 1.7s-.7 1.7-1.6 1.7h-1.6V9zM49 7.7v8.8h1.6v-3.5h1.5c1.5 0 2.7-1.1 2.7-2.6 0-1.4-1.1-2.6-2.7-2.6H49zm1.6 1.3h1.5c.7 0 1.2.6 1.2 1.3 0 .8-.5 1.3-1.2 1.3H50.6V9z\"/>\n                            </svg>\n                        </span>\n                        <span class=\"pm\">\n                            <!-- Google Pay (GPay) -->\n                            <svg width=\"36\" height=\"16\" viewBox=\"0 0 64 24\" xmlns=\"http://www.w3.org/2000/svg\" aria-hidden=\"true\">\n                                <rect width=\"64\" height=\"24\" rx=\"4\" fill=\"#fff\" stroke=\"#E6E6E6\"/>\n                                <path d=\"M28 12a6 6 0 116 6h-3v-2h3a4 4 0 10-1.2-7.8l1.2 1.8H30V8h8\" fill=\"#4285F4\"/>\n                                <path d=\"M23.7 12a6 6 0 016-6v3a3 3 0 00-3 3h-3z\" fill=\"#34A853\"/>\n                                <path d=\"M23.7 12a6 6 0 001.8 4.2l2.1-2.1A3 3 0 0126.7 12h-3z\" fill=\"#FBBC05\"/>\n                                <path d=\"M27.6 16.2A6 6 0 0030 17.1l1.8-2.7-2.1-2.1-2.1 3.9z\" fill=\"#EA4335\"/>\n                            </svg>\n                        </span>\n                    </div>\n                </div>\n            </div>\n        </footer>\n    ";
  document.getElementById('footer').innerHTML = footerHTML;
} // Add CSS animations


var style = document.createElement('style');
style.textContent = "\n    @keyframes slideIn {\n        from { transform: translateX(100%); opacity: 0; }\n        to { transform: translateX(0); opacity: 1; }\n    }\n    \n    @keyframes slideOut {\n        from { transform: translateX(0); opacity: 1; }\n        to { transform: translateX(100%); opacity: 0; }\n    }\n";
document.head.appendChild(style);
//# sourceMappingURL=script.dev.js.map
