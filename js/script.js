//const loginBtn = document.getElementById("login-btn");
//const signupBtn = document.getElementById("signup-btn");
const loginForm = document.getElementById("login-form");
const registerForm = document.getElementById("register-form");
const formModal = document.getElementById("form-modal");
//const showRegisterLink = document.getElementById("show-register");
const token = localStorage.getItem("jwtToken");
const logoutBtn = document.getElementById("logout-Btn");

// show login form
const loginBtn = document.getElementById("login-btn");
if (loginBtn) {
  loginBtn.addEventListener("click", () => {
    formModal.style.display = "flex";
    loginForm.style.display = "block";
    registerForm.style.display = "none";
  });
}

// show registration form
const signupBtn = document.getElementById("signup-btn");
if (signupBtn) {
  signupBtn.addEventListener("click", () => {
    formModal.style.display = "flex";
    registerForm.style.display = "block";
    loginForm.style.display = "none";
    // registerForm.style.display = "block";
  });
}
//  show registration form from login
const showRegisterLink = document.getElementById("show-register");
if (showRegisterLink) {
  showRegisterLink.addEventListener("click", (e) => {
    e.preventDefault();
    loginForm.style.display = "none";
    registerForm.style.display = "block";
  });
}

// close modal when clicking outside form

window.addEventListener("click", (e) => {
  if (e.target == formModal) {
    formModal.style.display = "none";
  }
});

registerForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const userData = {
    username: document.getElementById("username").value,
    email: document.getElementById("email").value,
    password: document.getElementById("password").value,
    mobile: document.getElementById("mobile").value,
  };
  console.log("Submitting:", userData);

  fetch("http://13.126.154.255:9090/api/v1/message/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("User Registered:", data);
      if (data.status === 201) {
        alert("Registration Successfull");
        registerForm.reset();
        document.getElementById("form-modal").style.display = "none";
      } else if (data.status === 409) {
        alert("username is already Available"); //
      } else if (data.status === 410) {
        alert("Email is already Available");
      } else if (data.status === 411) {
        alert("Mobile is already Registered");
      } else {
        alert("Registration failed");
      }
    })

    .catch((error) => console.error("Error", error));
});

loginForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const loginData = {
    email: document.getElementById("login-email").value.trim(),
    password: document.getElementById("login-password").value.trim(),
  };

  console.log("Sending login data:", loginData);

  fetch("http://13.126.154.255:9090/api/v1/message/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(loginData),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Response from backend:", data); // <-- check response
      if (data.status === 200) {
        localStorage.setItem("jwtToken", data.data);
        // decode JWT to extract role
        function parseJwt(token) {
          try {
            return JSON.parse(atob(token.split(".")[1]));
          } catch (e) {
            console.error("Invalid JWT", e);
            return null;
          }
        }
        const decoded = parseJwt(data.data);
        console.log("decoded JWT", decoded);

        //Redirect based on role
        if (decoded && decoded.role === "ROLE_ADMIN") {
          window.location.href = "admin-dashboard.html";
        } else if (decoded && decoded.role === "ROLE_USER") {
          window.location.href = "user-dashboard.html";
        } else {
          window.location.href = "index.html";
        }
      } else if (data.status === 401) {
        alert("Invalid Credentials");
      } else {
        alert("Login Failed:" + data.data);
      }
    })
    .catch((error) => {
      console.error("Error sending login request:", error);
      alert("Something went wrong. Check console.");
    });
});
