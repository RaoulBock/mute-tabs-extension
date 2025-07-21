const tabList = document.getElementById("tabList");

chrome.tabs.query({}, function (tabs) {
  tabs.forEach((tab) => {
    // Create list item container
    const listItem = document.createElement("li");

    // Create title span
    const titleSpan = document.createElement("span");
    titleSpan.className = "title";
    titleSpan.textContent =
      tab.title.length > 100 ? tab.title.substring(0, 100) + "..." : tab.title;

    // Tooltip for full title
    titleSpan.title = tab.title;

    // Create Mute button
    const muteBtn = document.createElement("button");
    muteBtn.textContent = "Mute";
    muteBtn.disabled = tab.mutedInfo.muted;

    // Create Unmute button
    const unmuteBtn = document.createElement("button");
    unmuteBtn.textContent = "Unmute";
    unmuteBtn.disabled = !tab.mutedInfo.muted;

    // Add click listeners
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

    // Add everything to the list item
    listItem.appendChild(titleSpan);
    listItem.appendChild(muteBtn);
    listItem.appendChild(unmuteBtn);

    // Add to UI
    tabList.appendChild(listItem);
  });
});
