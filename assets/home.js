(() => {
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
