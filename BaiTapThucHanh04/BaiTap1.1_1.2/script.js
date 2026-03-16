const yourName = document.querySelector("#enter-name");
const yourMark = document.querySelector("#enter-mark");
const btnAdd = document.querySelector("#btn-add");
const tableBody = document.querySelector("#display-infor tbody");
const datas = [];
function dataValid() {
  let valid = false;
  if (
    yourMark.value <= 10 &&
    yourMark.value >= 0 &&
    yourMark.value.length != 0 &&
    !isNaN(yourMark.value) &&
    yourName.value.length != 0
  ) {
    valid = true;
  }
  return valid;
}
function xepLoai(diem) {
  //   const diem = yourMark.value;
  if (diem >= 8.5) return "Giỏi";
  else if (diem >= 7.0 && diem < 8.5) return "Khá";
  else if (diem >= 5.0 && diem < 7) return "Trung bình";
  else return "Yếu";
}
function themData() {
  const diem = yourMark.value;
  const ten = yourName.value;
  const loai = xepLoai(diem);
  const row = tableBody.insertRow();
  row.insertCell(0).innerHTML = datas.length;
  row.insertCell(1).innerHTML = ten;
  row.insertCell(2).innerHTML = diem;
  row.insertCell(3).innerHTML = loai;
  const btnDel = document.createElement("button");
  btnDel.innerText = "Xóa";
  btnDel.setAttribute("data-index", datas.length);
  btnDel.onclick = function () {
    row.remove();
    const index = btnDel.getAttribute("data-index");
    datas.splice(index, 1);
    hienThiData();
  };
  row.insertCell(4).append(btnDel);
  if (diem <= 5) {
    row.setAttribute("style", "background: yellow");
  }
  datas.push({
    STT: diem,
    "Họ Tên": ten,
    Điểm: diem,
    "Xếp Loại": loai,
    "Thao Tác": "xóa",
  });
  yourName.value = "";
  yourMark.value = "";
  thongKe();
  renderFiltered();
}
function hienThiData() {
  tableBody.innerHTML = "";
  for (item of datas) {
    const row = tableBody.insertRow();
    row.insertCell(0).innerHTML = item.STT;
    row.insertCell(1).innerHTML = item["Họ Tên"];
    row.insertCell(2).innerHTML = item["Điểm"];
    row.insertCell(3).innerHTML = item["Xếp Loại"];

    const btnDel = document.createElement("button");
    btnDel.innerText = "Xóa";
    btnDel.setAttribute("data-index", datas.length);
    btnDel.onclick = function () {
      row.remove();
      const index = btnDel.getAttribute("data-index");
      datas.splice(index, 1);
      hienThiData();
    };
    if (item["Điểm"] <= 5) {
      row.setAttribute("style", "background: yellow");
    }
    row.insertCell(4).append(btnDel);
  }
  thongKe();
  renderFiltered();
}
function thongKe() {
  const tongSV = datas.length;
  const diemTB =
    tongSV === 0
      ? 0
      : datas.reduce((sum, item) => sum + parseFloat(item["Điểm"]), 0) / tongSV;

  document.getElementById("tong-sv").innerText = tongSV;
  document.getElementById("diem-tb").innerText = diemTB.toFixed(2);
}
// 1.2
yourMark.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    if (!dataValid()) {
      alert("Data is no valid");
      return;
    }
    themData();
  }
});

let sortOrder = null; // null | "asc" | "desc"
const colDiem = document.getElementById("col-diem");

function renderFiltered() {
  const keyword = document.getElementById("search-name").value.toLowerCase();
  const filterLoai = document.getElementById("filter-loai").value;

  //  Lọc từ datas gốc
  let result = datas.filter((item) => {
    const matchName = item["Họ Tên"].toLowerCase().includes(keyword);
    const matchLoai = filterLoai === "all" || item["Xếp Loại"] === filterLoai;
    return matchName && matchLoai;
  });

  //  Sắp xếp nếu đang có sortOrder
  if (sortOrder === "asc") {
    result.sort((a, b) => parseFloat(a["Điểm"]) - parseFloat(b["Điểm"])); //tang
  } else if (sortOrder === "desc") {
    result.sort((a, b) => parseFloat(b["Điểm"]) - parseFloat(a["Điểm"])); //giam
  }

  //  Render vào tbody
  tableBody.innerHTML = "";

  if (result.length === 0) {
    const row = tableBody.insertRow();
    const cell = row.insertCell(0);
    cell.colSpan = 5;
    cell.style.textAlign = "center";
    cell.innerText = "Không có kết quả";
    return;
  }

  result.forEach((item, idx) => {
    const row = tableBody.insertRow();
    row.insertCell(0).innerHTML = idx + 1;
    row.insertCell(1).innerHTML = item["Họ Tên"];
    row.insertCell(2).innerHTML = item["Điểm"];
    row.insertCell(3).innerHTML = item["Xếp Loại"];

    const btnDel = document.createElement("button");
    btnDel.innerText = "Xóa";
    btnDel.onclick = function () {
      // Xóa khỏi datas gốc theo đúng item
      const realIndex = datas.indexOf(item);
      if (realIndex !== -1) datas.splice(realIndex, 1);
      capNhatThongKe();
      renderFiltered();
    };
    row.insertCell(4).append(btnDel);

    if (parseFloat(item["Điểm"]) <= 5) {
      row.style.background = "yellow";
    }
  });
}

// Chức năng 1 — Tìm kiếm realtime

document.getElementById("search-name").addEventListener("input", function () {
  renderFiltered();
});

//  Chức năng 2 — Lọc theo xếp loại

document.getElementById("filter-loai").addEventListener("change", function () {
  renderFiltered();
});

//  Chức năng 3 — Sắp xếp theo Điểm

colDiem.addEventListener("click", function () {
  if (sortOrder === null || sortOrder === "desc") {
    sortOrder = "asc";
    colDiem.innerText = "Điểm ▲";
  } else {
    sortOrder = "desc";
    colDiem.innerText = "Điểm ▼";
  }
  renderFiltered();
});
btnAdd.addEventListener("click", function () {
  if (!dataValid()) {
    alert("Data is no valid");
    return;
  }
  themData();
});
