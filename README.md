<<<<<<< HEAD
# shopco-web-master
Thiết kế giao diện
=======
# SHOP.CO - Website Thời Trang

Đây là phiên bản HTML/CSS thuần được chuyển đổi từ React app gốc. Website bán quần áo thời trang với thiết kế hiện đại và responsive.

## 🚀 Cấu trúc dự án

```
shopco-html/
├── index.html          # File HTML chính
├── styles.css          # File CSS chính với tất cả styles
├── script.js           # JavaScript cho các tính năng tương tác
├── README.md           # File hướng dẫn này
└── shopco-web-master/  # Thư mục chứa assets gốc
    └── src/
        └── assets/
            └── images/ # Hình ảnh sản phẩm
```

## 📋 Tính năng chính

### ✅ Đã hoàn thành:
- **Navigation Bar**: Menu điều hướng với dropdown và tìm kiếm
- **Hero Section**: Banner chính với call-to-action
- **New Arrivals**: Hiển thị sản phẩm mới
- **Top Selling**: Hiển thị sản phẩm bán chạy
- **Browse by Style**: Danh mục theo phong cách
- **Footer**: Thông tin liên hệ và links
- **Responsive Design**: Tương thích mobile và tablet
- **Shopping Cart**: Chức năng giỏ hàng cơ bản
- **Interactive Elements**: Hiệu ứng hover và animations

### 🎨 Thiết kế:
- **Font**: Inter (Google Fonts)
- **Color Scheme**: Đen trắng với accent vàng (#FFC633)
- **Layout**: CSS Grid và Flexbox
- **Responsive**: Mobile-first approach

## 🔧 Cách sử dụng

### 1. Cài đặt:
```bash
# Clone hoặc download project
# Không cần cài đặt dependencies vì chỉ sử dụng HTML/CSS/JS thuần
```

### 2. Chạy website:
```bash
# Mở file index.html bằng trình duyệt
# Hoặc sử dụng Live Server extension trong VS Code
```

### 3. Cấu trúc thư mục assets:
- Đảm bảo thư mục `shopco-web-master/src/assets/images/` chứa đầy đủ hình ảnh
- Các file ảnh cần thiết:
  - `heroimg.png` - Ảnh hero section
  - `heroimg1.png` - Background hero
  - `newarrivalimg1-4.png` - Ảnh sản phẩm mới
  - `topsellingimg1-4.png` - Ảnh sản phẩm bán chạy
  - `dressstyleimg1-4.png` - Ảnh phong cách thời trang

## 📱 Responsive Breakpoints

- **Desktop**: > 768px
- **Tablet**: 768px - 600px  
- **Mobile**: < 600px

## 🎯 Các tính năng JavaScript

### Navigation:
```javascript
toggleMobileMenu()    // Bật/tắt menu mobile
closeBanner()         // Đóng banner top
```

### Shopping Cart:
```javascript
addToCart(productId)  // Thêm sản phẩm vào giỏ
updateCartCount(count) // Cập nhật số lượng giỏ hàng
```

### Notifications:
```javascript
showNotification(message) // Hiển thị thông báo
```

## 🎨 Customization

### Thay đổi màu sắc:
```css
/* Trong styles.css */
:root {
  --primary-color: #000;
  --accent-color: #FFC633;
  --bg-color: #F2F0F1;
}
```

### Thay đổi fonts:
```css
/* Thay đổi font family */
body {
    font-family: 'Your-Font', sans-serif;
}
```

### Thêm sản phẩm mới:
1. Thêm ảnh vào thư mục assets
2. Cập nhật HTML trong JavaScript functions:
   - `loadNewArrivals()`
   - `loadTopSelling()`

## 🚀 Deployment

### GitHub Pages:
1. Upload files lên GitHub repository
2. Bật GitHub Pages trong Settings
3. Chọn source từ main branch

### Netlify:
1. Drag & drop thư mục vào Netlify
2. Website sẽ được deploy tự động

### Hosting thông thường:
1. Upload tất cả files lên server
2. Đảm bảo `index.html` ở root directory

## 🔍 SEO Optimization

- ✅ Meta tags cơ bản
- ✅ Semantic HTML structure
- ✅ Alt text cho images
- ✅ Mobile-friendly design
- ✅ Fast loading time

## 🐛 Troubleshooting

### Ảnh không hiển thị:
- Kiểm tra đường dẫn tới thư mục `shopco-web-master/src/assets/images/`
- Đảm bảo tên file ảnh chính xác
- Kiểm tra case-sensitive trong tên file

### Menu mobile không hoạt động:
- Kiểm tra JavaScript đã load đúng cách
- Mở Developer Tools để xem console errors

### Responsive không hoạt động:
- Kiểm tra viewport meta tag trong HTML
- Xem CSS media queries đã được load đúng

## 📞 Support

Nếu gặp vấn đề, hãy kiểm tra:
1. Console errors trong Developer Tools
2. Network tab để xem resources có load đúng
3. CSS styles có được apply đúng

## 📝 Changelog

**v1.0.0** - Chuyển đổi hoàn chỉnh từ React sang HTML/CSS thuần
- ✅ Tất cả components đã được convert
- ✅ Responsive design hoạt động tốt
- ✅ JavaScript interactivity hoàn chỉnh
- ✅ Performance optimization

---

**Lưu ý**: Đây là phiên bản static, không có backend. Để thêm tính năng dynamic (database, payment, user auth), cần tích hợp với backend service.
>>>>>>> 2b439f9 (Shop.co static site: index, product, product-detail, cart)
