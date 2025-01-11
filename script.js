// Encryption using CryptoJS
function encrypt(data, key) {
  return CryptoJS.AES.encrypt(data, key).toString();
}

function decrypt(data, key) {
  const bytes = CryptoJS.AES.decrypt(data, key);
  return bytes.toString(CryptoJS.enc.Utf8);
}

// Password management
const storedPassword = localStorage.getItem("appPassword");
const encryptionKey = "secure_encryption_key"; // Replace with a strong key

function verifyPassword() {
  const inputPassword = document.getElementById("app-password").value;

  if (storedPassword) {
    const decryptedPassword = decrypt(storedPassword, encryptionKey);
    if (inputPassword === decryptedPassword) {
      loadApp();
    } else {
      alert("Incorrect password. Try again.");
    }
  } else {
    const encryptedPassword = encrypt(inputPassword, encryptionKey);
    localStorage.setItem("appPassword", encryptedPassword);
    alert("Password set successfully.");
    loadApp();
  }
}

function loadApp() {
  document.getElementById("login-screen").style.display = "none";
  document.getElementById("app").style.display = "block";
}

// Load CryptoJS library dynamically
const script = document.createElement("script");
script.src =
  "https://cdnjs.cloudflare.com/ajax/libs/crypto-js/4.1.1/crypto-js.min.js";
document.head.appendChild(script);
