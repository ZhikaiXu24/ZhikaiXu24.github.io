(() => {
  const toggle = document.querySelector(".theme-toggle");
  const root = document.documentElement;
  function syncToggle() {
    const dark = root.dataset.theme === "dark";
    toggle.setAttribute("aria-pressed", String(dark));
    toggle.title = dark ? "Switch to light mode" : "Switch to dark mode";
    document.querySelector('meta[name="theme-color"]').content = dark ? "#181c21" : "#ffffff";
  }
  syncToggle();
  toggle.hidden = false;
  toggle.addEventListener("click", () => {
    root.dataset.theme = root.dataset.theme === "dark" ? "light" : "dark";
    syncToggle();
    try { localStorage.setItem("homepage-theme", root.dataset.theme); } catch {}
  });

  const englishName = document.querySelector(".name-en");
  const chineseName = document.querySelector(".name-zh");

  if (!englishName || !chineseName) return;

  let showEnglish = true;
  window.setInterval(() => {
    showEnglish = !showEnglish;
    englishName.classList.toggle("is-visible", showEnglish);
    chineseName.classList.toggle("is-visible", !showEnglish);
  }, 2800);
})();
