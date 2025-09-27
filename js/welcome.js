const loginForm = document.getElementById("login-form");
const registerForm = document.getElementById("register-form");
const formModal = document.getElementById("form-modal");
//const showRegisterLink = document.getElementById("show-register");
const token = localStorage.getItem("jwtToken");
const logoutBtn = document.getElementById("logout-Btn");

function fetchProtectedData() {
  const token = localStorage.getItem("jwtToken");
  if (!token) {
    alert("no token found, please login first");
    window.location.href = "login.html";
    return;
  }
  fetch("http://localhost:9090/api/v1/message/login/", {
    method: "GET",
    headers: {
      Authorization: " Bearer " + token,
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (response.status === 401) {
        alert("unauthorized please login again");
        window.location.href = "login.html";
        return;
      }
      return response.json();
    })
    .then((data) => {
      console.log("protected data", data);
      const userInfo = document.getElementById("user-info");
      if (userInfo) {
        userInfo.textContent = 'Welcome ${data.username || "User"}!';
      }
    })
    .catch((error) => console.error("error fetching protected data", data));
}

//---------Admin dashboard----------------

if (!token) {
  alert("Please login first!");
  window.location.href = "login.html";
}

fetch("http://localhost:9090/api/v1/admin/dashboard", {
  method: "GET",
  headers: {
    Authorization: "Bearer " + token,
  },
})
  .then((res) => {
    if (res.status === 401) {
      alert("Unauthorized! Please login again.");
      window.location.href = "login.html";
    } else if (res.status === 403) {
      document.getElementById("admin-data").innerText =
        "Access Denied! You are not an Admin.";
    } else if (!res.ok) {
      throw new Error("Request failed with status " + res.status);
    } else {
      return res.text();
    }
  })
  .then((text) => {
    if (text) {
      document.getElementById("admin-data").innerText = text;
    }
  })
  .catch((err) => {
    console.error("Fetch error:", err);
    document.getElementById("admin-data").innerText = "Error fetching data.";
  });

//----------Logout-----------
// const logoutBtn = document.getElementById("logout-Btn");

// logoutBtn.addEventListener("click", function () {
//   // Remove token
//   localStorage.removeItem("token");

//   // Redirect to login page
//   window.location.href = "index.html";
// });
document.addEventListener("DOMContentLoaded", () => {
  if (logoutBtn) {
    console.log("Logout button found:", logoutBtn);
    logoutBtn.addEventListener("click", () => {
      console.log("Logout clicked!");
      localStorage.removeItem("jwtToken");
      window.location.href = "index.html";
    });
  } else {
    console.error("Logout button NOT found!");
  }
});
