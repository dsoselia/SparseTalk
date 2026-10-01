// Add the public repository URL here when the code is released.
const GITHUB_URL = '';

const notification = document.querySelector('#notification');
let notificationTimeout;
function notify(message) {
  clearTimeout(notificationTimeout);
  notification.textContent = message;
  notification.classList.add('visible');
  notificationTimeout = setTimeout(() => notification.classList.remove('visible'), 4500);
}

const githubButton = document.querySelector('#github-link');
if (GITHUB_URL) {
  document.querySelector('#github-status').remove();
  githubButton.setAttribute('aria-label', 'Open the SparseTalk GitHub repository');
}
githubButton.addEventListener('click', () => {
  if (GITHUB_URL) window.open(GITHUB_URL, '_blank', 'noopener,noreferrer');
  else notify('The code repository is coming soon. Its link will appear here.');
});

document.querySelectorAll('[data-budget]').forEach(button => {
  button.addEventListener('click', () => {
    const budget = button.dataset.budget;
    document.querySelectorAll('[data-budget]').forEach(control => {
      control.setAttribute('aria-pressed', String(control === button));
    });
    for (const [scene, label] of [['classroom', 'Classroom'], ['office', 'Office'], ['conference', 'Conference room']]) {
      const image = document.querySelector(`#scene-${scene}`);
      image.src = `assets/${scene}-${budget}.webp`;
      image.alt = `${label} Gaussian reconstruction with ${budget} selected semantic embeddings marked in blue and gray`;
      const zoomButton = image.closest('[data-zoom]');
      zoomButton.dataset.zoom = image.getAttribute('src');
      zoomButton.dataset.caption = `${label}: ${budget} selected semantic embeddings`;
    }
    document.querySelector('#budget-caption').textContent = `Object-based selection with ${budget} embeddings per scene.`;
  });
});

const datasetTabs = [...document.querySelectorAll('[data-dataset]')];
function selectDataset(tab) {
  datasetTabs.forEach(control => {
    const selected = control === tab;
    control.setAttribute('aria-selected', String(selected));
    control.tabIndex = selected ? 0 : -1;
    document.querySelector(`#panel-${control.dataset.dataset}`).hidden = !selected;
  });
}
datasetTabs.forEach((tab, index) => {
  tab.addEventListener('click', () => selectDataset(tab));
  tab.addEventListener('keydown', event => {
    let next;
    if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') next = datasetTabs[(index + 1) % datasetTabs.length];
    if (event.key === 'Home') next = datasetTabs[0];
    if (event.key === 'End') next = datasetTabs.at(-1);
    if (next) {
      event.preventDefault();
      selectDataset(next);
      next.focus();
    }
  });
});

document.querySelector('#copy-citation').addEventListener('click', async () => {
  const button = document.querySelector('#copy-citation');
  const text = document.querySelector('#bibtex').textContent.trim();
  try {
    await navigator.clipboard.writeText(text);
    button.querySelector('span').textContent = 'Copied!';
    notify('BibTeX citation copied.');
    setTimeout(() => { button.querySelector('span').textContent = 'Copy citation'; }, 2500);
  } catch {
    const range = document.createRange();
    range.selectNodeContents(document.querySelector('#bibtex'));
    const selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);
    notify('Citation selected. Press Ctrl+C or ⌘C to copy.');
  }
});

const figureDialog = document.querySelector('#figure-dialog');
document.querySelectorAll('[data-zoom]').forEach(button => {
  button.addEventListener('click', () => {
    const image = document.querySelector('#dialog-image');
    image.src = button.dataset.zoom;
    image.alt = button.querySelector('img').alt;
    image.classList.toggle('scene-detail', button.classList.contains('scene-zoom'));
    document.querySelector('#dialog-caption').textContent = button.dataset.caption;
    figureDialog.showModal();
  });
});
document.querySelector('#close-dialog').addEventListener('click', () => figureDialog.close());
figureDialog.addEventListener('click', event => {
  if (event.target === figureDialog) {
    const rect = figureDialog.getBoundingClientRect();
    if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) figureDialog.close();
  }
});

// Preload the other paper selections after the first screen is ready.
window.addEventListener('load', () => {
  const preload = () => {
    for (const scene of ['classroom', 'office', 'conference']) {
      for (const budget of [8, 32, 729]) {
        const image = new Image();
        image.src = `assets/${scene}-${budget}.webp`;
      }
    }
  };
  if ('requestIdleCallback' in window) window.requestIdleCallback(preload);
  else setTimeout(preload, 1000);
});
