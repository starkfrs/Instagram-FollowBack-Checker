// Instagram Followback Checker — following collector
// Open the corresponding Instagram dialog before running this script.
// Review the source before pasting it into DevTools.

(async () => {
  const kind = "following";
  const globalName = kind === "following" ? "igFollowing" : "igFollowers";
  const dialog = document.querySelector('[role="dialog"]');

  if (!dialog) {
    console.error(`Open your Instagram ${kind} dialog first, then run this script again.`);
    return;
  }

  const ignoredPaths = new Set([
    "explore", "direct", "accounts", "about", "developer",
    "legal", "privacy", "reels", "stories", "web"
  ]);

  const getUsernames = () => {
    const found = [];
    for (const anchor of dialog.querySelectorAll('a[href]')) {
      try {
        const url = new URL(anchor.href);
        if (url.hostname !== "www.instagram.com" && url.hostname !== "instagram.com") continue;
        const parts = url.pathname.split("/").filter(Boolean);
        if (parts.length !== 1) continue;
        const username = decodeURIComponent(parts[0]).trim();
        if (!username || ignoredPaths.has(username.toLowerCase())) continue;
        if (/^[a-zA-Z0-9._]+$/.test(username)) found.push(username);
      } catch (_) {}
    }
    return found;
  };

  const candidates = [dialog, ...dialog.querySelectorAll("*")].filter(el => {
    const style = getComputedStyle(el);
    return el.scrollHeight > el.clientHeight + 20 &&
      /(auto|scroll)/.test(style.overflowY);
  });

  const scroller = candidates.sort((a, b) => b.clientHeight - a.clientHeight)[0];

  if (!scroller) {
    console.error("Could not find a scrollable list inside the dialog. Instagram may have changed its layout.");
    return;
  }

  const users = new Set();
  let stableRounds = 0;
  let rounds = 0;
  const maxRounds = 500;

  console.log(`Collecting ${kind} usernames. Keep this tab open while the script runs.`);

  while (stableRounds < 7 && rounds < maxRounds) {
    const before = users.size;
    getUsernames().forEach(username => users.add(username));

    scroller.scrollTop = Math.min(
      scroller.scrollTop + Math.max(250, Math.floor(scroller.clientHeight * 0.8)),
      scroller.scrollHeight
    );

    await new Promise(resolve => setTimeout(resolve, 900));
    getUsernames().forEach(username => users.add(username));

    stableRounds = users.size === before ? stableRounds + 1 : 0;
    rounds++;

    if (rounds % 10 === 0) {
      console.log(`Progress: ${users.size} unique usernames collected...`);
    }

    if (scroller.scrollTop + scroller.clientHeight >= scroller.scrollHeight - 5) {
      await new Promise(resolve => setTimeout(resolve, 1200));
      getUsernames().forEach(username => users.add(username));
      if (scroller.scrollTop + scroller.clientHeight >= scroller.scrollHeight - 5) {
        stableRounds++;
      }
    }
  }

  window[globalName] = [...users];
  console.log(`Finished collecting ${kind}: ${window[globalName].length} unique usernames.`);
  console.log(`Saved to window.${globalName} for this tab session.`);
  console.table(window[globalName].map(username => ({ username: "@" + username })));

  if (rounds >= maxRounds) {
    console.warn("Reached the maximum scroll limit. The list may be incomplete.");
  }
})();
