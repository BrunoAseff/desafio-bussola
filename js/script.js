document.addEventListener("DOMContentLoaded", function () {
  initializeExpandableMenus();
  initializeSidebarToggle();
});

function initializeExpandableMenus() {
  const expandableMenus = document.querySelectorAll(".sidebar .expandable");

  expandableMenus.forEach((menu) => {
    const menuTrigger = menu.querySelector(".menu-trigger");

    if (menuTrigger) menuTrigger.addEventListener("click", handleMenuToggle);
  });
}

function handleMenuToggle(event) {
  event.preventDefault();

  const menu = this.closest(".expandable");
  const submenu = this.nextElementSibling;

  if (!menu || !submenu) return;

  const isExpanded = this.getAttribute("aria-expanded") === "true";
  
  menu.classList.toggle("active");
  this.setAttribute("aria-expanded", !isExpanded);

  if (submenu.style.maxHeight) {
    submenu.style.maxHeight = null;
  } else {
    submenu.style.maxHeight = submenu.scrollHeight + "px";
  }
}

function initializeSidebarToggle() {
  const sidebar = document.querySelector(".sidebar");
  const sidebarToggle = document.querySelector(".sidebar-toggle");

  if (!sidebar || !sidebarToggle) return;

  sidebarToggle.addEventListener("click", handleSidebarToggle);
  document.addEventListener("click", handleOutsideClick);
}

function handleSidebarToggle() {
  const sidebar = document.querySelector(".sidebar");
  if (sidebar) {
    sidebar.classList.toggle("active");
  }
}

function handleOutsideClick(event) {
  const sidebar = document.querySelector(".sidebar");
  const sidebarToggle = document.querySelector(".sidebar-toggle");

  if (!sidebar || !sidebarToggle) return;

  const isSidebarOpen = sidebar.classList.contains("active");
  const isClickOutsideSidebar = !sidebar.contains(event.target);
  const isClickOutsideToggle = !sidebarToggle.contains(event.target);

  if (isSidebarOpen && isClickOutsideSidebar && isClickOutsideToggle) {
    sidebar.classList.remove("active");
  }
}
