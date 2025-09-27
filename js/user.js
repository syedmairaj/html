// Function to toggle forms
function showSection(sectionId) {
  document.querySelectorAll(".form-section").forEach((sec) => {
    sec.classList.remove("active");
  });
  document.getElementById(sectionId).classList.add("active");

  // Optional: highlight active menu item
  document.querySelectorAll(".sidebar ul li").forEach((item) => {
    item.classList.remove("active-menu");
  });
  event.target.classList.add("active-menu");
}

// Show SMS by default when page loads
window.onload = () => {
  showSection("sms");
};

// SMS Submit
// SMS Submit
document.getElementById("smsForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const from = document.getElementById("smsFrom").value;
  const to = document.getElementById("smsTo").value;
  const message = document.getElementById("smsMessage").value;

  const res = await fetch("http://<your-backend-ip>:9090/api/sms/send", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ from, to, message }),
  });

  const data = await res.json();
  alert(data.message || "SMS Sent!");
});

// Email Submit
document.getElementById("emailForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const formData = new FormData();
  formData.append("to", document.getElementById("emailTo").value);
  formData.append("subject", document.getElementById("emailSubject").value);
  formData.append("body", document.getElementById("emailBody").value);
  const file = document.getElementById("emailAttachment").files[0];
  if (file) formData.append("attachment", file);

  const res = await fetch("http://<your-backend-ip>:9090/api/email/send", {
    method: "POST",
    body: formData,
  });

  const data = await res.json();
  alert(data.message || "Email Sent!");
});
