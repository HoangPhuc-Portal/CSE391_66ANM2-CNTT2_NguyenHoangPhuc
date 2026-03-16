const prices = {
  Áo: 150000,
  Quần: 200000,
  Giày: 350000,
  Mũ: 80000,
  Túi: 250000,
};

// ===== LẤY CÁC PHẦN TỬ =====
const elSanPham = document.getElementById("san-pham");
const elSoLuong = document.getElementById("so-luong");
const elNgayGiao = document.getElementById("ngay-giao");
const elDiaChi = document.getElementById("dia-chi");
const elGhiChu = document.getElementById("ghi-chu");
const elCharCount = document.getElementById("char-count");
const elTongTien = document.getElementById("tong-tien-gia");
const btnSubmit = document.getElementById("btn-submit");
const divXacNhan = document.getElementById("xac-nhan-div");
const divThanhCong = document.getElementById("thanh-cong-div");
const btnXacNhan = document.getElementById("btn-xac-nhan");
const btnHuy = document.getElementById("btn-huy");

// ===== HÀM HIỂN THỊ LỖI =====
function showError(id, msg) {
  document.getElementById(id).textContent = msg;
}
function clearError(id) {
  document.getElementById(id).textContent = "";
}

// ===== HÀM THÊM / XÓA VIỀN ĐỎ =====
function setInputError(el) {
  el.classList.add("input-error");
}
function clearInputError(el) {
  el.classList.remove("input-error");
}

// ===== TÍNH TỔNG TIỀN =====
function tinhTongTien() {
  const sanPham = elSanPham.value;
  const soLuong = parseInt(elSoLuong.value);
  if (sanPham && prices[sanPham] && soLuong >= 1 && soLuong <= 99) {
    const tong = prices[sanPham] * soLuong;
    elTongTien.textContent = Number(tong).toLocaleString("vi-VN") + "đ";
  } else {
    elTongTien.textContent = "--";
  }
}

// Sự kiện: khi chọn sản phẩm hoặc nhập số lượng → tính lại tổng
elSanPham.addEventListener("change", tinhTongTien);
elSoLuong.addEventListener("input", tinhTongTien);

// ===== ĐẾM KÝ TỰ GHI CHÚ (realtime) =====
elGhiChu.addEventListener("input", function () {
  const len = elGhiChu.value.length;
  elCharCount.textContent = len + "/200";

  if (len > 200) {
    elCharCount.classList.add("over");
    showError("err-ghi-chu", "Ghi chú không được vượt quá 200 ký tự.");
    setInputError(elGhiChu);
  } else {
    elCharCount.classList.remove("over");
    clearError("err-ghi-chu");
    clearInputError(elGhiChu);
  }
});

// ===== XÓA LỖI KHI NGƯỜI DÙNG BẮT ĐẦU NHẬP (blur / input) =====
elSanPham.addEventListener("change", function () {
  clearError("err-san-pham");
  clearInputError(elSanPham);
});

elSoLuong.addEventListener("input", function () {
  clearError("err-so-luong");
  clearInputError(elSoLuong);
});

elNgayGiao.addEventListener("input", function () {
  clearError("err-ngay-giao");
  clearInputError(elNgayGiao);
});

elDiaChi.addEventListener("input", function () {
  clearError("err-dia-chi");
  clearInputError(elDiaChi);
});

document.querySelectorAll("input[name='thanh-toan']").forEach(function (radio) {
  radio.addEventListener("change", function () {
    clearError("err-thanh-toan");
  });
});

// ===== HÀM VALIDATE TOÀN BỘ FORM =====
function validateForm() {
  let hopLe = true;

  // 1. Sản phẩm
  if (elSanPham.value === "") {
    showError("err-san-pham", "Vui lòng chọn sản phẩm.");
    setInputError(elSanPham);
    hopLe = false;
  } else {
    clearError("err-san-pham");
    clearInputError(elSanPham);
  }

  // 2. Số lượng
  const soLuong = parseInt(elSoLuong.value);
  if (elSoLuong.value === "" || isNaN(soLuong)) {
    showError("err-so-luong", "Vui lòng nhập số lượng.");
    setInputError(elSoLuong);
    hopLe = false;
  } else if (soLuong < 1 || soLuong > 99) {
    showError("err-so-luong", "Số lượng phải từ 1 đến 99.");
    setInputError(elSoLuong);
    hopLe = false;
  } else {
    clearError("err-so-luong");
    clearInputError(elSoLuong);
  }

  // 3. Ngày giao hàng
  const ngayGiao = elNgayGiao.value;
  if (ngayGiao === "") {
    showError("err-ngay-giao", "Vui lòng chọn ngày giao hàng.");
    setInputError(elNgayGiao);
    hopLe = false;
  } else {
    const homNay = new Date();
    homNay.setHours(0, 0, 0, 0); // bỏ giờ phút giây

    const ngayChon = new Date(ngayGiao);

    const han30Ngay = new Date();
    han30Ngay.setDate(han30Ngay.getDate() + 30);
    han30Ngay.setHours(0, 0, 0, 0);

    if (ngayChon.getTime() < homNay.getTime()) {
      showError("err-ngay-giao", "Ngày giao không được là ngày trong quá khứ.");
      setInputError(elNgayGiao);
      hopLe = false;
    } else if (ngayChon.getTime() > han30Ngay.getTime()) {
      showError(
        "err-ngay-giao",
        "Ngày giao không được quá 30 ngày từ hôm nay.",
      );
      setInputError(elNgayGiao);
      hopLe = false;
    } else {
      clearError("err-ngay-giao");
      clearInputError(elNgayGiao);
    }
  }

  // 4. Địa chỉ
  const diaChi = elDiaChi.value.trim();
  if (diaChi === "") {
    showError("err-dia-chi", "Vui lòng nhập địa chỉ giao hàng.");
    setInputError(elDiaChi);
    hopLe = false;
  } else if (diaChi.length < 10) {
    showError("err-dia-chi", "Địa chỉ phải có ít nhất 10 ký tự.");
    setInputError(elDiaChi);
    hopLe = false;
  } else {
    clearError("err-dia-chi");
    clearInputError(elDiaChi);
  }

  // 5. Ghi chú (không bắt buộc, nhưng nếu có thì kiểm tra)
  if (elGhiChu.value.length > 200) {
    showError("err-ghi-chu", "Ghi chú không được vượt quá 200 ký tự.");
    setInputError(elGhiChu);
    hopLe = false;
  }

  // 6. Phương thức thanh toán
  const thanhToanChon = document.querySelector(
    "input[name='thanh-toan']:checked",
  );
  if (!thanhToanChon) {
    showError("err-thanh-toan", "Vui lòng chọn phương thức thanh toán.");
    hopLe = false;
  } else {
    clearError("err-thanh-toan");
  }

  return hopLe;
}

// ===== XỬ LÝ SUBMIT =====
btnSubmit.addEventListener("click", function () {
  // Ẩn thông báo cũ trước
  divXacNhan.style.display = "none";
  divThanhCong.style.display = "none";

  const hopLe = validateForm();

  if (hopLe) {
    // Điền thông tin vào div xác nhận
    const soLuong = parseInt(elSoLuong.value);
    const tong = prices[elSanPham.value] * soLuong;

    document.getElementById("xn-san-pham").textContent = elSanPham.value;
    document.getElementById("xn-so-luong").textContent = soLuong;
    document.getElementById("xn-tong-tien").textContent =
      Number(tong).toLocaleString("vi-VN") + "đ";
    document.getElementById("xn-ngay-giao").textContent = elNgayGiao.value;
    document.getElementById("xn-dia-chi").textContent = elDiaChi.value.trim();
    document.getElementById("xn-thanh-toan").textContent =
      document.querySelector("input[name='thanh-toan']:checked").value;

    // Hiện div xác nhận
    divXacNhan.style.display = "block";
  }
});

// ===== NÚT XÁC NHẬN =====
btnXacNhan.addEventListener("click", function () {
  divXacNhan.style.display = "none";
  divThanhCong.style.display = "block";
});

// ===== NÚT HỦY =====
btnHuy.addEventListener("click", function () {
  divXacNhan.style.display = "none";
});
