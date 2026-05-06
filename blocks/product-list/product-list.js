import { createOptimizedPicture } from '../../scripts/aem.js';

export default function decorate(block) {
  const rows = [...block.children];
  const grid = document.createElement('div');
  grid.className = 'product-list-grid';

  rows.forEach((row) => {
    const cells = [...row.children];
    const card = document.createElement('div');
    card.className = 'product-list-item';

    cells.forEach((cell) => {
      if (cell.querySelector('picture')) {
        const imageWrap = document.createElement('div');
        imageWrap.className = 'product-list-image';
        imageWrap.append(...cell.children);
        card.append(imageWrap);
      } else {
        const body = document.createElement('div');
        body.className = 'product-list-body';
        body.append(...cell.children);
        card.append(body);
      }
    });

    card.querySelectorAll('picture > img').forEach((img) => {
      img.closest('picture').replaceWith(
        createOptimizedPicture(img.src, img.alt, false, [{ width: '400' }]),
      );
    });

    grid.append(card);
  });

  block.replaceChildren(grid);
}
