// Instagram Followback Checker — compare lists
// Run after both collector scripts have completed in the same tab.

(() => {
  if (!Array.isArray(window.igFollowing) || !Array.isArray(window.igFollowers)) {
    console.error("Both lists are required. Run collect-following.js and collect-followers.js in this tab first.");
    return;
  }

  const normalize = username => String(username).replace(/^@/, "").trim().toLowerCase();
  const followersSet = new Set(window.igFollowers.map(normalize));
  const followingSet = new Set(window.igFollowing.map(normalize));

  const results = [...followingSet]
    .filter(username => username && !followersSet.has(username))
    .sort()
    .map(username => ({
      username: "@" + username,
      profile: `https://www.instagram.com/${encodeURIComponent(username)}/`
    }));

  window.igNotFollowingBack = results.map(item => item.username.slice(1));

  console.log(`Following collected: ${followingSet.size}`);
  console.log(`Followers collected: ${followersSet.size}`);
  console.log(`Not following back: ${results.length}`);
  console.table(results);

  const oldButton = document.getElementById("ig-followback-csv-button");
  if (oldButton) oldButton.remove();

  const button = document.createElement("button");
  button.id = "ig-followback-csv-button";
  button.textContent = "Download followback results (CSV)";
  Object.assign(button.style, {
    position: "fixed",
    top: "20px",
    right: "20px",
    zIndex: "2147483647",
    padding: "12px 16px",
    background: "#1877f2",
    color: "#fff",
    border: "0",
    borderRadius: "8px",
    font: "14px Arial, sans-serif",
    cursor: "pointer",
    boxShadow: "0 2px 10px #0003"
  });

  button.onclick = () => {
    const quote = value => `"${String(value).replace(/"/g, '""')}"`;
    const csv = [
      "Username,Profile",
      ...results.map(row => `${quote(row.username)},${quote(row.profile)}`)
    ].join("\r\n");
    const blobUrl = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8;" }));
    const anchor = document.createElement("a");
    anchor.href = blobUrl;
    anchor.download = "instagram-not-following-back.csv";
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
    setTimeout(() => URL.revokeObjectURL(blobUrl), 1000);
  };

  document.body.appendChild(button);
})();
