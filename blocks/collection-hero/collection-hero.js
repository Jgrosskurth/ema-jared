export default function decorate(block) {
  const rows = [...block.children];
  const wrapper = document.createElement('div');
  wrapper.className = 'collection-hero-inner';

  let imageDiv;
  let contentDiv;

  rows.forEach((row) => {
    const cells = [...row.children];
    cells.forEach((cell) => {
      if (cell.querySelector('picture')) {
        imageDiv = document.createElement('div');
        imageDiv.className = 'collection-hero-image';
        imageDiv.append(...cell.children);
      } else if (cell.textContent.trim()) {
        contentDiv = document.createElement('div');
        contentDiv.className = 'collection-hero-content';
        contentDiv.append(...cell.children);
      }
    });
  });

  if (imageDiv) wrapper.append(imageDiv);
  if (contentDiv) wrapper.append(contentDiv);
  block.replaceChildren(wrapper);
}
