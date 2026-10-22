# Instagram Followback Checker

A lightweight browser-console utility that compares Instagram follower and following lists to identify accounts you follow that do not appear in your followers list.

The project is designed for local use in a desktop browser. It does not ask for your Instagram password, use a third-party login service, or automatically unfollow accounts.

> **Independent project:** This project is not affiliated with, endorsed by, or sponsored by Instagram or Meta Platforms, Inc.

## Features

- Collect usernames from the currently open Instagram Followers or Following dialog.
- Scroll through the dialog to load more entries.
- Compare the collected lists using a case-insensitive username comparison.
- Display accounts found in Following but not in Followers.
- Export comparison results to CSV.
- Run locally in Chrome on Windows and macOS without installing a separate application.

## Requirements

- A desktop or laptop with Google Chrome.
- Access to your own Instagram account through [Instagram.com](https://www.instagram.com/).
- The JavaScript files in this repository.

The scripts rely on Instagram's current website structure. Instagram can change its interface at any time, so compatibility is not guaranteed.

## Quick start

### 1. Open Instagram

Go to [Instagram.com](https://www.instagram.com/) and sign in normally. Navigate to your own profile.

### 2. Open Chrome DevTools Console

**Windows / Linux:** press `Ctrl + Shift + J`

**macOS:** press `Option + Command + J`

You can also open it from Chrome's menu: **More Tools → Developer Tools**, then select **Console**.

### 3. Collect your Following list

1. Open your profile's **Following** dialog.
2. Open `scripts/collect-following.js` from this repository.
3. Copy the entire file and paste it into the Console.
4. Press Enter and wait for the script to finish.
5. Check the Console message showing how many usernames were collected.

### 4. Collect your Followers list

1. Close the Following dialog and open your **Followers** dialog.
2. Copy and run `scripts/collect-followers.js` in the same Console and same tab.
3. Wait for the script to finish.

Keep the same Instagram tab open. The scripts store results in the page's JavaScript memory, so refreshing or closing the tab clears them.

### 5. Compare the lists

Copy and run `scripts/compare-lists.js` in the same Console.

The script reports the number of collected usernames and displays accounts that appear in Following but not in Followers. A CSV export button is added to the page.

## How it works

The comparison is a set difference:

`accounts not following back = Following − Followers`

For example, if Following contains `alex`, `jordan`, and `taylor`, while Followers contains `alex` and `taylor`, the result is `jordan`.

Usernames are normalized to lowercase for comparison. The tool only compares the entries its collection scripts managed to read from the page; it does not independently verify account relationships.

## Troubleshooting

### The script says to open a dialog first

Open the correct Instagram Followers or Following dialog before running the corresponding collection script.

### No usernames are collected

Instagram may have changed its page structure, the dialog may not have loaded, or the browser may not expose the list in the expected way. Try closing and reopening the dialog. If the issue persists, the script may need an update.

### The collected count is lower than Instagram's displayed count

The collection may have stopped early, or Instagram may not have loaded every entry. Do not treat the results as complete unless the collected counts look reasonable. The scripts include a maximum scroll limit so they do not run indefinitely.

### The comparison script says one list is missing

Run both collection scripts in the same Instagram tab without refreshing the page in between.

### Chrome blocks pasting into the Console

Chrome may display a warning about pasting code into Developer Tools. Read the warning and follow Chrome's current guidance only if you understand and trust the code. Never paste unknown code into your Console.

## Privacy and security

- Never share your Instagram password, session cookies, authentication tokens, or recovery codes.
- Read the source code before running it. Browser-console code runs in the context of the current page.
- The scripts in this repository are intended to collect and compare usernames locally in the current tab. They do not intentionally transmit collected usernames to an external service.
- Do not publish CSV results containing real usernames unless you have considered the privacy implications.
- Do not run modified scripts unless you trust their source.

Local execution is not, by itself, a guarantee of safety. Always inspect the code you run.

## Limitations and responsible use

- Instagram may change its interface and break the scripts.
- Lists may be incomplete if entries fail to load or selectors no longer match.
- Results become outdated when follow relationships or usernames change.
- The project does not guarantee that every account will be detected.
- This repository does not automate unfollowing or other account actions.

Use the tool only with an account you are authorized to access, and follow Instagram's applicable terms and policies. Avoid excessive automated interactions.

## Contributing

Bug reports, documentation improvements, and code contributions are welcome.

1. Fork the repository.
2. Create a branch for your change.
3. Test your change locally.
4. Submit a pull request explaining what changed and how it was tested.

Do not include passwords, session cookies, authentication tokens, or private follower exports in issues or pull requests.

## License

This project is released under the MIT License. See [`LICENSE`](LICENSE) for details.
