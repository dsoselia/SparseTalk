# SparseTalk project page

Academic project page for [SparseTalk](https://arxiv.org/abs/2609.15137). Works on GitHub Pages with no build step.

## Run locally

From this directory, run:

```sh
python3 -m http.server 4173 --bind 127.0.0.1
```

Then open http://127.0.0.1:4173.

## Add the code repository

Set `GITHUB_URL` at the top of `script.js` to the public repository URL. This enables the GitHub button and removes its “Coming soon” label.

## Publish to GitHub Pages

Upload the contents of this directory to a repository. In **Settings → Pages**, choose **Deploy from a branch**, select the branch containing these files and the **/ (root)** folder, then save. All asset paths are relative, so this works for both a project page and a user/organization page.

## Contents

- `index.html`: paper title, authors, affiliation, paper links, interactive scene figures, abstract, method, results, and BibTeX citation.
- `styles.css`: layout and typography (Noto Sans via Google Fonts, with system fallbacks).
- `script.js`: paper-selection controls, dataset tabs, figure enlargement, citation copying, and the GitHub button.
- `assets/`: figures for the classroom, office, and conference scenes at 8, 32, 128, and 729 tokens, plus method and results plots.

The scene panel lets you switch embedding budgets (8, 32, 128, 729 tokens) and enlarge any scene.

## Design references

Layout draws inspiration from [SplatTalk](https://splat-talk.github.io/), [GaussianVLM](https://insait-institute.github.io/gaussianvlm.github.io/), and [SemanticSplat](https://semanticsplat.github.io/).
