function showPage(page) {
  document.querySelectorAll(".page").forEach((section) => {
    section.classList.add("hidden");
  });

  const targetPage = document.getElementById(page + "Page");

  if (targetPage) {
    targetPage.classList.remove("hidden");
    window.scrollTo({ top: 0, behavior: "smooth" });
  } else {
    console.error("Page not found:", page + "Page");
  }
}

function scrollProducts() {
  showPage("home");

  setTimeout(() => {
    const shopSection = document.getElementById("shopSection");
    if (shopSection) {
      shopSection.scrollIntoView({ behavior: "smooth" });
    }
  }, 80);
}

// Init
document.addEventListener("DOMContentLoaded", () => {
  if (typeof renderCategories === "function") renderCategories();
  if (typeof renderProducts === "function") renderProducts();
  if (typeof updateCartCount === "function") updateCartCount();
  if (typeof addColorRow === "function") addColorRow();

  showPage("home");
});