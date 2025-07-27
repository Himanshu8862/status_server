const { io } = require("socket.io-client");

const socket = io("http://localhost:5000", {
  withCredentials: true
});

const ORG_SLUG = "eternal-zomato"; // replace this with an actual slug from your DB

socket.on("connect", () => {
  console.log("✅ Connected:", socket.id);
  socket.emit("join-org", ORG_SLUG);
});

socket.on("status-update", (data) => {
  console.log("📡 Status Update:", data);
});

socket.on("disconnect", () => {
  console.log("❌ Disconnected");
});

socket.on("connect_error", (err) => {
  console.error("❌ Connection error:", err.message);
});