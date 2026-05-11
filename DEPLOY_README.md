# 💗 Marshmallow Birthday Site — Setup Guide

A 6-page birthday surprise for Kripa. This guide walks you through deploying it on GitHub Pages with zero technical background.

> **Total time: ~25 minutes including photos.** You can deploy with placeholders first and add photos/audio later — they'll just slot in automatically.

---

## What's in this folder

```
marshmallow-birthday/
├── index.html            ← homepage with caricature
├── origin.html           ← timeline (1997 → 2026)
├── stats.html            ← Marshmallow by the numbers
├── moods.html            ← mood board
├── soundtrack.html       ← songs with play buttons
├── letter.html           ← the love letter (REWRITE THIS!)
├── 404.html              ← cute error page
├── styles.css            ← all the styling
├── script.js             ← loader + interactions
├── images/               ← drop photos here (see images/_README.txt)
│   ├── hero/
│   ├── timeline/
│   └── moods/
└── audio/                ← drop MP3s here (see audio/_README.txt)
```

---

## STEP 1 — Edit the love letter (5 min)

Open `letter.html` in any text editor (Notepad on Windows, TextEdit on Mac, or even VS Code if you have it). Find the section that starts with `<article class="letter-page">` and rewrite the paragraphs inside `<p>...</p>` tags in your own words.

**Also delete this block** (it's the yellow "note to you" warning at the top):
```html
<div class="letter-edit-note">
   ...delete this whole block...
</div>
```

Save the file. The rest of the strawman draft is okay if you want to leave it, but the letter will land harder if it's actually yours.

---

## STEP 2 — Add photos (10 min)

1. Open `images/_README.txt` to see exactly which photo goes in which folder with which filename.
2. For each photo:
   - Save with the exact filename listed (`1997.jpg`, `precoffee.jpg`, etc.)
   - Drop into the correct subfolder
3. **Don't have a photo for one slot?** No problem. The site will show a placeholder card for any missing image — you can deploy first and add later.

**Optional: compress photos** for faster loading. Drag any photo into [squoosh.app](https://squoosh.app) and download the compressed version. Aim for under 500KB per photo.

---

## STEP 3 — Add audio (5 min, optional)

1. Open `audio/_README.txt` to see which MP3 filenames to use.
2. Drop MP3 files into the `audio/` folder.
3. Missing audio = missing audio. The play button will pop up a friendly note saying "add this song." Totally fine to skip.

> 🎁 **Bonus move:** If you can secretly record her playing one of the ABBA songs on piano, save it as `dancing-queen.mp3` (or whichever) and use that instead of the studio version. She'll lose her mind.

---

## STEP 4 — Test it locally (1 min)

Just double-click `index.html`. It opens in your browser. Click around. Make sure everything looks right. The marshmallow heart loader should play on first visit.

If something looks broken, check that all files are in the right folders.

---

## STEP 5 — Put it on GitHub Pages (10 min)

This is the part that sounds scarier than it is.

### 5a. Make a GitHub account
Go to [github.com](https://github.com) and sign up. Free.

### 5b. Create a new repository
1. Click the **+** icon (top right) → **New repository**
2. Name it: `marshmallow-birthday` (or anything you want)
3. Set it to **Public** (required for free GitHub Pages)
4. **Do NOT** check "Add a README" — you already have files
5. Click **Create repository**

### 5c. Upload your files
1. On the new empty repo page, click **uploading an existing file** (it's a link in the middle of the page)
2. Drag the **contents** of the `marshmallow-birthday/` folder into the upload area — that means index.html, origin.html, etc., AND the images/ and audio/ folders. **Don't drag the marshmallow-birthday folder itself** — drag what's inside it.
3. Scroll down. Click **Commit changes**

### 5d. Turn on GitHub Pages
1. Click **Settings** (top of the repo page)
2. In the left sidebar, click **Pages**
3. Under "Source," select **Deploy from a branch**
4. Under "Branch," select **main** and **/ (root)**, then click **Save**
5. Wait ~1 minute. Refresh the page. You'll see: "Your site is live at https://[your-username].github.io/marshmallow-birthday/"

### 5e. Send her the link
That URL is the site. Send it to her on the 12th however you want — text, hidden in a card, set as the wifi name, taped inside her gym bag, smuggled into a handwritten letter. Pick your move.

---

## How to make changes after launching

You can edit anything later:
1. Go to your GitHub repo
2. Click the file you want to edit (e.g., `letter.html`)
3. Click the pencil icon (top right of the file view)
4. Make changes, scroll down, click **Commit changes**
5. Live within ~30 seconds

To add more photos: go to your repo → click into `images/timeline/` (or wherever) → **Add file** → **Upload files** → drag → commit.

---

## Easter eggs to know about

- **Marshmallow heart loader** plays on her first visit (and resets per session)
- **Hover over any tattoo, the piano, or the heart sticker** on the homepage caricature — they're all clickable
- **Try the Konami code**: ↑ ↑ ↓ ↓ ← → ← → B A — confetti and a small dancing-queen surprise
- **404 page**: type a wrong URL like `yoursite.github.io/marshmallow-birthday/asdf` to see it

---

## If something goes wrong

- **Site shows the file list instead of the homepage** → Check that `index.html` is in the root of the repo (not inside a subfolder)
- **Photos not showing** → Check the filename matches exactly. JPG must be lowercase `.jpg` not `.JPG`. Filenames are case-sensitive on GitHub.
- **Loader stuck** → Open in an incognito/private window to clear sessionStorage
- **Anything else** → Open in Chrome, right-click anywhere → Inspect → Console tab. Any red error message there will tell you what's wrong.

---

Made with ♡ for Kripa. Happy birthday, Marshmallow.
