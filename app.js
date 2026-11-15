// Dữ liệu khởi tạo mặc định (sẽ hiển thị ngay khi bạn mở web lần đầu)
const DEFAULT_DATA = {
  categories: ["Tài khoản AI", "Phần mềm Marketing", "Thiết kế & Video", "Khóa học số"],
  products: [
    {
      id: 101,
      name: "Gói Trợ Lý AI Viết Content Chuẩn SEO",
      category: "Tài khoản AI",
      price: 290000,
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=600&q=80",
      desc: "Tài khoản chính chủ, hỗ trợ viết bài blog, kịch bản TikTok và email marketing tự động."
    },
    {
      id: 102,
      name: "Phần Mềm Tự Động Đăng Bài Đa Kênh",
      category: "Phần mềm Marketing",
      price: 550000,
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80",
      desc: "Lên lịch đăng bài tự động lên Facebook, Zalo, TikTok tiết kiệm 80% thời gian quản trị."
    },
    {
      id: 103,
      name: "Công Cụ Tạo Video AI Giọng Đọc Tự Nhiên",
      category: "Thiết kế & Video",
      price: 420000,
      image: "https://images.unsplash.com/photo-1536240478700-b869070f9279?auto=format&fit=crop&w=600&q=80",
      desc: "Chuyển văn bản thành video thuyết minh chuyên nghiệp với hơn 50 giọng đọc tiếng Việt."
    },
    {
      id: 104,
      name: "Khóa Học Ứng Dụng AI Vào Kinh Doanh Thực Chiến",
      category: "Khóa học số",
      price: 790000,
      image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=600&q=80",
      desc: "Trọn bộ 30 video hướng dẫn xây dựng quy trình bán hàng tự động từ A-Z."
    }
  ]
};

// Lấy dữ liệu từ LocalStorage hoặc nạp mặc định
function getStoreData() {
  const saved = localStorage.getItem("shop_ai_data");
  if (!saved) {
    localStorage.setItem("shop_ai_data", JSON.stringify(DEFAULT_DATA));
    return DEFAULT_DATA;
  }
  return JSON.parse(saved);
}

function saveStoreData(data) {
  localStorage.setItem("shop_ai_data", JSON.stringify(data));
}

function formatVND(number) {
  return Number(number).toLocaleString("vi-VN") + " đ";
}

// ================= LOGIC TRANG CHỦ (index.html) =================
let currentCategory = "Tất cả";

function initShopPage() {
  const productGrid = document.getElementById("productsGrid");
  if (!productGrid) return;

  renderCategoryTabs();
  renderProducts();

  document.getElementById("searchInput").addEventListener("input", renderProducts);
}

function renderCategoryTabs() {
  const data = getStoreData();
  const tabsContainer = document.getElementById("categoryTabs");
  const allCats = ["Tất cả", ...data.categories];

  tabsContainer.innerHTML = allCats.map(cat => `
    <button class="tab-btn ${cat === currentCategory ? 'active' : ''}" onclick="selectCategory('${cat}')">
      ${cat}
    </button>
  `).join("");
}

function selectCategory(cat) {
  currentCategory = cat;
  renderCategoryTabs();
  renderProducts();
}

function renderProducts() {
  const data = getStoreData();
  const keyword = document.getElementById("searchInput").value.toLowerCase().trim();
  const grid = document.getElementById("productsGrid");

  const filtered = data.products.filter(p => {
    const matchCat = currentCategory === "Tất cả" || p.category === currentCategory;
    const matchKey = p.name.toLowerCase().includes(keyword) || p.desc.toLowerCase().includes(keyword);
    return matchCat && matchKey;
  });

  if (filtered.length === 0) {
    grid.innerHTML = `<p style="grid-column: 1/-1; text-align:center; color:#64748b; padding:2rem;">Không tìm thấy sản phẩm phù hợp.</p>`;
    return;
  }

  grid.innerHTML = filtered.map(p => `
    <div class="product-card">
      <img src="${p.image || 'https://via.placeholder.com/400x250?text=San+Pham'}" alt="${p.name}" class="product-img">
      <div class="product-body">
        <span class="product-cat">${p.category}</span>
        <h3 class="product-title">${p.name}</h3>
        <p class="product-desc">${p.desc}</p>
        <div class="product-footer">
          <span class="product-price">${formatVND(p.price)}</span>
          <button class="btn btn-primary" onclick="openOrderModal('${p.name}', ${p.price})">Đăng ký ngay</button>
        </div>
      </div>
    </div>
  `).join("");
}

// Modal đặt hàng / nhận tư vấn nhanh
function openOrderModal(productName, price) {
  document.getElementById("orderProductName").innerText = `${productName} (${formatVND(price)})`;
  document.getElementById("orderModal").classList.add("open");
}

function closeOrderModal() {
  document.getElementById("orderModal").classList.remove("open");
}

function submitOrder(e) {
  e.preventDefault();
  const name = document.getElementById("cusName").value;
  const phone = document.getElementById("cusPhone").value;
  alert(`Cảm ơn ${name}! Yêu cầu tư vấn đã được ghi nhận. Chúng tôi sẽ liên hệ qua số ${phone} trong ít phút.`);
  closeOrderModal();
  e.target.reset();
}

// ================= LOGIC TRANG QUẢN TRỊ (admin.html) =================
function initAdminPage() {
  const tableBody = document.getElementById("adminProductTable");
  if (!tableBody) return;

  renderAdminCategories();
  renderAdminProducts();

  document.getElementById("productForm").addEventListener("submit", handleSaveProduct);
}

function renderAdminCategories() {
  const data = getStoreData();
  const select = document.getElementById("prodCategory");
  const list = document.getElementById("categoryList");

  select.innerHTML = data.categories.map(c => `<option value="${c}">${c}</option>`).join("");
  list.innerHTML = data.categories.map((c, idx) => `
    <span style="display:inline-flex; align-items:center; gap:6px; background:#e2e8f0; padding:4px 10px; border-radius:6px; font-size:0.85rem; margin:3px;">
      ${c} <b style="cursor:pointer; color:#ef4444;" onclick="deleteCategory(${idx})">&times;</b>
    </span>
  `).join("");
}

function addCategory() {
  const input = document.getElementById("newCatName");
  const val = input.value.trim();
  if (!val) return;

  const data = getStoreData();
  if (!data.categories.includes(val)) {
    data.categories.push(val);
    saveStoreData(data);
    renderAdminCategories();
  }
  input.value = "";
}

function deleteCategory(index) {
  if (!confirm("Xóa danh mục này?")) return;
  const data = getStoreData();
  data.categories.splice(index, 1);
  saveStoreData(data);
  renderAdminCategories();
}

function renderAdminProducts() {
  const data = getStoreData();
  const tbody = document.getElementById("adminProductTable");

  tbody.innerHTML = data.products.map(p => `
    <tr>
      <td><strong>${p.name}</strong><br><small style="color:#64748b">${p.category}</small></td>
      <td style="color:#ef4444; font-weight:600;">${formatVND(p.price)}</td>
      <td>
        <button class="btn btn-outline" style="padding:4px 8px; font-size:0.8rem;" onclick="editProduct(${p.id})">Sửa</button>
        <button class="btn btn-danger" style="padding:4px 8px; font-size:0.8rem;" onclick="deleteProduct(${p.id})">Xóa</button>
      </td>
    </tr>
  `).join("");
}

function handleSaveProduct(e) {
  e.preventDefault();
  const data = getStoreData();
  const editId = document.getElementById("prodId").value;

  const productObj = {
    id: editId ? Number(editId) : Date.now(),
    name: document.getElementById("prodName").value.trim(),
    category: document.getElementById("prodCategory").value,
    price: Number(document.getElementById("prodPrice").value),
    image: document.getElementById("prodImage").value.trim(),
    desc: document.getElementById("prodDesc").value.trim()
  };

  if (editId) {
    const idx = data.products.findIndex(p => p.id === Number(editId));
    if (idx !== -1) data.products[idx] = productObj;
  } else {
    data.products.unshift(productObj);
  }

  saveStoreData(data);
  resetProductForm();
  renderAdminProducts();
  alert("Đã lưu sản phẩm thành công!");
}

function editProduct(id) {
  const data = getStoreData();
  const p = data.products.find(item => item.id === id);
  if (!p) return;

  document.getElementById("prodId").value = p.id;
  document.getElementById("prodName").value = p.name;
  document.getElementById("prodCategory").value = p.category;
  document.getElementById("prodPrice").value = p.price;
  document.getElementById("prodImage").value = p.image;
  document.getElementById("prodDesc").value = p.desc;
  document.getElementById("formTitle").innerText = "Cập nhật sản phẩm";
}

function deleteProduct(id) {
  if (!confirm("Bạn chắc chắn muốn xóa sản phẩm này?")) return;
  const data = getStoreData();
  data.products = data.products.filter(p => p.id !== id);
  saveStoreData(data);
  renderAdminProducts();
}

function resetProductForm() {
  document.getElementById("productForm").reset();
  document.getElementById("prodId").value = "";
  document.getElementById("formTitle").innerText = "Thêm sản phẩm mới";
}

// Xuất dữ liệu ra file JSON để cập nhật cứng lên GitHub khi cần
function exportJSON() {
  const data = JSON.stringify(getStoreData(), null, 2);
  const blob = new Blob([data], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "shop-data.json";
  a.click();
}

document.addEventListener("DOMContentLoaded", () => {
  initShopPage();
  initAdminPage();
});