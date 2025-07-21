const tabList = document.getElementById("tabList");
const searchInput = document.getElementById("searchInput");
const refreshBtn = document.getElementById("refreshBtn");
const filterAudible = document.getElementById("filterAudible");

filterAudible.checked = localStorage.getItem("filterAudible") === "true";

filterAudible.addEventListener("change", () => {
  localStorage.setItem("filterAudible", filterAudible.checked);
  renderTabs(searchInput.value);
});

searchInput.addEventListener("input", (e) => {
  renderTabs(e.target.value);
});

refreshBtn.addEventListener("click", () => {
  renderTabs(searchInput.value);
});

function renderTabs(filter = "") {
  tabList.innerHTML = "";

  chrome.tabs.query({}, function (tabs) {
    tabs.forEach((tab) => {
      if (filter && !tab.title.toLowerCase().includes(filter.toLowerCase()))
        return;
      if (filterAudible.checked && !tab.audible) return;

      const listItem = document.createElement("li");

      const titleSpan = document.createElement("span");
      titleSpan.className = "title";
      titleSpan.textContent =
        tab.title.length > 100
          ? tab.title.substring(0, 100) + "..."
          : tab.title;
      titleSpan.title = tab.title;

      const muteBtn = document.createElement("button");
      muteBtn.textContent = "Mute";
      muteBtn.disabled = tab.mutedInfo.muted;

      const unmuteBtn = document.createElement("button");
      unmuteBtn.textContent = "Unmute";
      unmuteBtn.disabled = !tab.mutedInfo.muted;

      muteBtn.addEventListener("click", () => {
        chrome.tabs.update(tab.id, { muted: true });
        muteBtn.disabled = true;
        unmuteBtn.disabled = false;
      });

      unmuteBtn.addEventListener("click", () => {
        chrome.tabs.update(tab.id, { muted: false });
        muteBtn.disabled = false;
        unmuteBtn.disabled = true;
      });

      listItem.appendChild(titleSpan);
      listItem.appendChild(muteBtn);
      listItem.appendChild(unmuteBtn);
      tabList.appendChild(listItem);
    });
  });
}

renderTabs();
