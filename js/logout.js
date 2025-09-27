const token = localStorage.getItem("jwtToken");
const logoutBtn = document.getElementById("logout-Btn");


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