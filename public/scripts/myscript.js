document.getElementById("toggleButton").addEventListener("click", function() {
    var notificationPanel = document.getElementById("notification_panel");
    if (notificationPanel.classList.contains("hidden")) {
        notificationPanel.classList.remove("hidden");
        notificationPanel.style.right = "0"; 
    } else {
        notificationPanel.classList.add("hidden");
        notificationPanel.style.right = "-350px"; 
    }
});