const fullname = document.getElementById("fullname");
const email = document.getElementById("email");
function showError(fieldId, mess) {
  const input = document.getElementById(fieldId);
  const err = document.getElementById(fieldId + "-error");
  if (err) {
    err.innerHTML = mess;
  }
  if (input) {
    input.classList.add("is-error");
  }
}
function clearError(fieldId) {
  const input = document.getElementById(fieldId);
  const error = document.getElementById(fieldId + "-error");
  if (input) {
    input.classList.remove("is-error");
  }
  if (error) {
    error.innerHTML = "";
    //   errorEl.classList.remove('visible');
  }
}
function validateFullname() {
  const val = document.getElementById("fullname").value.trim();
  const err = document.querySelector("#fullname-error");
  if (!val) {
    showError("fullname", "Họ và tên không được để trống");
    return false;
  }
  if (val.length < 3) {
    showError("fullname", "Họ và tên phải có ít nhất 3 ký tự");
    return false;
  }
  if (!/^[a-zA-ZÀ-ỹ\s]+$/u.test(val)) {
    showError("fullname", "Họ và tên chỉ được chứa chữ cái và khoảng trắng");
    return false;
  }
  clearError("fullname");
  return true;
}
function validateEmail() {
  const val = document.getElementById("email").value.trim();
  if (!val) {
    showError("email", "Email không được để trống");
    return false;
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(val)) {
    showError("email", "Email không đúng định dạng (vd: ten@domain.com)");
    return false;
  }
  clearError("email");
  return true;
}
function validatePhone() {
  const val = document.getElementById("phone").value.trim();
  if (!val) {
    showError("phone", "Số điện thoại không được để trống");
    return false;
  }
  if (!/^0\d{9}$/.test(val)) {
    showError(
      "phone",
      "Số điện thoại phải có đúng 10 chữ số và bắt đầu bằng 0",
    );
    return false;
  }
  clearError("phone");
  return true;
}
function validatePassword() {
  const val = document.getElementById("password").value;
  if (!val) {
    showError("password", "Mật khẩu không được để trống");
    return false;
  }
  if (val.length < 8) {
    showError("password", "Mật khẩu phải có ít nhất 8 ký tự");
    return false;
  }
  if (!/[A-Z]/.test(val)) {
    showError("password", "Mật khẩu phải chứa ít nhất 1 chữ hoa");
    return false;
  }
  if (!/[a-z]/.test(val)) {
    showError("password", "Mật khẩu phải chứa ít nhất 1 chữ thường");
    return false;
  }
  if (!/[0-9]/.test(val)) {
    showError("password", "Mật khẩu phải chứa ít nhất 1 chữ số");
    return false;
  }
  clearError("password");
  return true;
}
function validateConfirmPassword() {
  const pw = document.getElementById("password").value;
  const cpw = document.getElementById("confirm-password").value;
  if (!cpw) {
    showError("confirm-password", "Vui lòng xác nhận mật khẩu");
    return false;
  }
  if (pw !== cpw) {
    showError("confirm-password", "Mật khẩu xác nhận không khớp");
    return false;
  }
  clearError("confirm-password");
  //   markValid("confirm-password");
  return true;
}
function validateGender() {
  const selected = document.querySelector('input[name="gender"]:checked');
  if (!selected) {
    showError("gender", "Vui lòng chọn giới tính");
    return false;
  }
  clearError("gender");
  return true;
}
function validateTerms() {
  const checked = document.getElementById("terms").checked;
  if (!checked) {
    showError("terms", "Bạn cần đồng ý với điều khoản dịch vụ");
    return false;
  }
  clearError("terms");
  return true;
}
fullname.addEventListener("blur", validateFullname);
email.addEventListener("blur", validateEmail);
document.getElementById("phone").addEventListener("blur", validatePhone);
document.getElementById("password").addEventListener("blur", validatePassword);
document
  .getElementById("confirm-password")
  .addEventListener("blur", validateConfirmPassword);
document
  .querySelectorAll('input[name="gender"]')
  .forEach((r) => r.addEventListener("change", validateGender));
document.getElementById("terms").addEventListener("change", validateTerms);

["fullname", "email", "phone", "password", "confirm-password"].forEach((id) => {
  document.getElementById(id).addEventListener("input", function () {
    if (this.classList.contains("is-error")) {
      clearError(id);
    }
    // special: password strength meter
    // if (id === "password") {
    //   updatePasswordStrength(this.value);
    // }
  });
});

document
  .getElementById("register-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const isValid =
      validateFullname() &
      validateEmail() &
      validatePhone() &
      validatePassword() &
      validateConfirmPassword() &
      validateGender() &
      validateTerms();

    // ── Thành công ──
    if (isValid) {
      const name = document.getElementById("fullname").value.trim();
      // document.getElementById("success-name").textContent = name;
      alert("dang ki thanh cong: " + fullname.value);
    }
  });
