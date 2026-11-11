# Happy Birthday, Syarifah Syazwani 🎂

A single-page birthday surprise built with plain HTML, CSS and JavaScript.

## What's inside

- `index.html` — the page
- `css/style.css` — blush & gold theme, responsive layout
- `js/script.js` — countdown, confetti, flip cards, typewriter letter, cake, music
- `images/` — put her photos here
- `music/` — put the song here

## Add your photos

Drop them into `images/` and name them `1.jpg` through `12.jpg` (JPEG or swap the
file extensions in `index.html`). Nine were set up first, then the rest were
added. Until one is added, a styled placeholder shows the expected filename. To
use fewer photos, delete the extra `<figure>` blocks in `index.html`.

## Add the song

Save the track as `music/Raim Laode - Dunia Yang Nanti - Raim Laode.mp3` (the
path already referenced in `index.html`), or rename your file and update the
`<source>` tag. Browsers block unmuted autoplay, so the page opens with a
tap-to-open envelope; tapping it starts the song, which is a valid user gesture.
The floating button in the bottom-right toggles the music on and off.

## Personalise

- Names, dates and messages: edit `index.html`.
- Age / birthday logic: edit `CONFIG` at the top of `js/script.js`.
  `birthdayMonthIndex: 10` is **November** (months are zero-based), `birthdayDay: 12`.
- Letter signature: replace `[Your Name]` in the letter.
- Timeline: the "Our story so far" chapters are date-free — edit the titles and
  lines in the timeline section if you want to personalise them.

The countdown automatically shows a celebration message on her birthday and
counts down to the next one on every other day.

## View it locally

Double-click `index.html`, or serve the folder:

```
python -m http.server 8000
```

Then open `http://localhost:8000`.

## Publish with GitHub Pages

1. Create a new repository and push this folder:
   ```
   git init
   git add .
   git commit -m "Birthday page"
   git branch -M main
   git remote add origin https://github.com/<your-username>/<repo>.git
   git push -u origin main
   ```
2. On GitHub: **Settings → Pages → Build and deployment → Source: Deploy from a branch**.
3. Choose **main** and the **/ (root)** folder, then save.
4. Your page will be live at `https://<your-username>.github.io/<repo>/` in a minute or two.

Keep the `.nojekyll` file so GitHub Pages serves the assets correctly.
