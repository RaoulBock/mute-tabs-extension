const filterAudible = document.getElementById("filterAudible");

filterAudible.checked = localStorage.getItem("filterAudible") === "true";

filterAudible.addEventListener("change", () => {
  localStorage.setItem("filterAudible", filterAudible.checked);
});
