const PRODUCTS = [
  {
    id: 1,
    name: "Trợ Lý AI Viết Content & SEO Toàn Diện",
    category: "Tài khoản AI",
    badge: "Bán chạy",
    badgeClass: "badge-hot",
    rating: "4.9 (128)",
    price: 290000,
    oldPrice: 450000,
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=700&q=80",
    desc: "Tự động hóa quy trình lên dàn ý, viết bài chuẩn SEO, kịch bản TikTok và email bán hàng chỉ trong 30 giây.",
    features: ["Tài khoản riêng tư, bảo hành trọn đời", "Tích hợp sẵn 100+ mẫu câu lệnh chuẩn", "Hỗ trợ đa ngôn ngữ tiếng Việt tự nhiên"]
  },
  {
    id: 2,
    name: "Phần Mềm Tự Động Đăng Bài & Chăm Sóc Đa Kênh",
    category: "Phần mềm Marketing",
    badge: "Phổ biến",
    badgeClass: "badge-pro",
    rating: "4.8 (94)",
    price: 550000,
    oldPrice: 800000,
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=700&q=80",
    desc: "Quản lý hàng chục fanpage, hội nhóm và kênh truyền thông trên một bảng điều khiển duy nhất.",
    features: ["Lên lịch đăng bài tự động cả tháng", "Tự động trả lời bình luận & inbox", "Báo cáo thống kê tương tác trực quan"]
  },
  {
    id: 3,
    name: "Studio Tạo Video AI & Giọng Đọc Truyền Cảm",
    category: "Thiết kế & Video",
    badge: "Mới",
    badgeClass: "badge-new",
    rating: "5.0 (62)",
    price: 420000,
    oldPrice: 600000,
    image: "https://images.unsplash.com/photo-1536240478700-b869070f9279?auto=format&fit=crop&w=700&q=80",
    desc: "Biến văn bản thành video thuyết minh chuyên nghiệp với nhân vật ảo MC và hơn 50 giọng đọc 3 miền.",
    features: ["Xuất video độ phân giải Full HD / 4K", "Không dính logo bản quyền (Watermark)", "Kho nhạc nền và hiệu ứng miễn phí"]
  },
  {
    id: 4,
    name: "Combo Thiết Kế Website Bán Hàng Chuẩn SEO",
    category: "Giải pháp Web",
    badge: "Trọn gói",
    badgeClass: "badge-pro",
    rating: "4.9 (210)",
    price: 1990000,
    oldPrice: 3500000,
    image: "https://images.unsplash.com/photo-1547658719-da2b51169166?auto=format&fit=crop&w=700&q=80",
    desc: "Xây dựng trang giới thiệu doanh nghiệp, cửa hàng trực tuyến tối ưu tốc độ tải trang trên điện thoại và máy tính.",
    features: ["Giao diện chuẩn Mobile, Tablet, Desktop", "Tích hợp nút gọi, Zalo, Messenger nhanh", "Tặng kèm tên miền & hướng dẫn quản trị"]
  },
  {
    id: 5,
    name: "Khóa Học Ứng Dụng AI Xây Dựng Hệ Thống Bán Hàng",
    category: "Đào tạo số",
    badge: "Ưu đãi",
    badgeClass: "badge-hot",
    rating: "4.9 (315)",
    price: 690000,
    oldPrice: 1200000,
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=700&q=80",
    desc: "Lộ trình thực chiến giúp chủ shop và marketer cắt giảm 70% chi phí nhân sự nhờ ứng dụng công cụ AI.",
    features: ["35 video bài giảng quay sẵn sắc nét", "Nhóm hỗ trợ giải đáp 1-1 hàng tuần", "Cập nhật miễn phí các công cụ AI mới nhất"]
  },
  {
    id: 6,
    name: "Chatbot AI Tư Vấn & Chốt Đơn Tự Động 24/7",
    category: "Tài khoản AI",
    badge: "Hot",
    badgeClass: "badge-hot",
    rating: "4.8 (87)",
    price: 890000,
    oldPrice: 1300000,
    image: "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?auto=format&fit=crop&w=700&q=80",
    desc: "Huấn luyện AI học toàn bộ bảng giá, chính sách của shop để tự động tư vấn và xin số điện thoại khách hàng.",
    features: ["Kết nối dễ dàng với Fanpage & Website", "Hiểu ngữ cảnh, trả lời tự nhiên như nhân viên", "Tự động gửi thông báo đơn hàng về Telegram"]
  }
];

let selectedCategory = "Tất cả";

function formatVND(amount) {
  return Number(amount).toLocaleString("vi-VN") + " đ";
}

function initPage() {
  renderCategories();
  renderProducts();

  document.getElementById("searchInput").addEventListener("input", renderProducts);
  document.getElementById("sortSelect").addEventListener("change", renderProducts);
}

function renderCategories() {
  const categories = ["Tất cả", ...new Set(PRODUCTS.map(p => p.category))];
  const container = document.getElementById("categoryTabs");

  container.innerHTML = categories.map(cat => `
    <button class="tab-btn ${cat === selectedCategory ? 'active' : ''}" onclick="setCategory('${cat}')">
      ${cat}
    </button>
  `).join("");
}

function setCategory(cat) {
  selectedCategory = cat;
  renderCategories();
  renderProducts();
}

function renderProducts() {
  const keyword = document.getElementById("searchInput").value.toLowerCase().trim();
  const sortBy = document.getElementById("sortSelect").value;
  const grid = document.getElementById("productsGrid");

  let filtered = PRODUCTS.filter(p => {
    const matchCat = selectedCategory === "Tất cả" || p.category === selectedCategory;
    const matchText = p.name.toLowerCase().includes(keyword) || p.desc.toLowerCase().includes(keyword);
    return matchCat && matchText;
  });

  if (sortBy === "price-asc") filtered.sort((a, b) => a.price - b.price);
  if (sortBy === "price-desc") filtered.sort((a, b) => b.price - a.price);

  if (filtered.length === 0) {
    grid.innerHTML = `
      <div style="grid-column: 1/-1; text-align: center; padding: 3rem 1rem; background: #fff; border-radius: 16px; border: 1px solid var(--border);">
        <p style="color: var(--muted); font-size: 1.05rem;">Không tìm thấy sản phẩm nào khớp với từ khóa của bạn.</p>
      </div>`;
    return;
  }

  grid.innerHTML = filtered.map(p => `
    <article class="product-card">
      <div class="product-thumb">
        ${p.badge ? `<span class="badge-tag ${p.badgeClass}">${p.badge}</span>` : ""}
        <img src="${p.image}" alt="${p.name}" loading="lazy">
      </div>
      <div class="product-body">
        <div class="product-meta">
          <span class="product-cat">${p.category}</span>
          <span class="product-rating">★ ${p.rating}</span>
        </div>
        <h3 class="product-title">${p.name}</h3>
        <p class="product-desc">${p.desc}</p>
        <ul class="product-features">
          ${p.features.slice(0, 2).map(f => `<li>${f}</li>`).join("")}
        </ul>
        <div class="product-footer">
          <div class="price-box">
            ${p.oldPrice ? `<span class="price-old">${formatVND(p.oldPrice)}</span>` : ""}
            <span class="price-current">${formatVND(p.price)}</span>
          </div>
          <div class="card-actions">
            <button class="btn btn-outline btn-icon" onclick="openDetailModal(${p.id})" title="Xem chi tiết">Chi tiết</button>
            <button class="btn btn-primary" onclick="openOrderModal(${p.id})">Đăng ký</button>
          </div>
        </div>
      </div>
    </article>
  `).join("");
}

// Xem chi tiết sản phẩm
function openDetailModal(id) {
  const p = PRODUCTS.find(item => item.id === id);
  if (!p) return;

  document.getElementById("detailContent").innerHTML = `
    <img src="${p.image}" alt="${p.name}" style="width:100%; height:210px; object-fit:cover; border-radius:12px; margin-bottom:1rem;">
    <span class="product-cat">${p.category}</span>
    <h3 style="font-size:1.3rem; margin:0.5rem 0; color:var(--secondary);">${p.name}</h3>
    <p style="color:var(--muted); font-size:0.95rem; margin-bottom:1rem;">${p.desc}</p>
    <h4 style="font-size:0.92rem; margin-bottom:0.5rem;">Quyền lợi & Tính năng nổi bật:</h4>
    <ul class="product-features" style="margin-bottom:1.25rem;">
      ${p.features.map(f => `<li>${f}</li>`).join("")}
    </ul>
    <div style="display:flex; justify-content:space-between; align-items:center; padding-top:1rem; border-top:1px solid var(--border);">
      <div>
        ${p.oldPrice ? `<span class="price-old">${formatVND(p.oldPrice)}</span><br>` : ""}
        <span class="price-current" style="font-size:1.35rem;">${formatVND(p.price)}</span>
      </div>
      <div style="display:flex; gap:8px;">
        <button class="btn btn-outline" onclick="closeModal('detailModal')">Đóng</button>
        <button class="btn btn-primary" onclick="closeModal('detailModal'); openOrderModal(${p.id});">Đăng ký ngay</button>
      </div>
    </div>
  `;
  document.getElementById("detailModal").classList.add("open");
}

// Mở form đăng ký tư vấn / đặt mua
function openOrderModal(id) {
  const p = PRODUCTS.find(item => item.id === id);
  if (!p) return;

  document.getElementById("orderSummary").innerText = `${p.name} — ${formatVND(p.price)}`;
  document.getElementById("orderModal").classList.add("open");
}

function closeModal(modalId) {
  document.getElementById(modalId).classList.remove("open");
}

function handleOrderSubmit(e) {
  e.preventDefault();
  const name = document.getElementById("cusName").value;
  const phone = document.getElementById("cusPhone").value;
  alert(`Cảm ơn ${name}! Chúng tôi đã nhận được yêu cầu và sẽ liên hệ qua số ${phone} trong ít phút.`);
  closeModal("orderModal");
  e.target.reset();
}

document.addEventListener("DOMContentLoaded", initPage);