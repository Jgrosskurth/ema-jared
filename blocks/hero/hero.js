export default function decorate(block) {
  const rows = [...block.children];
  const contentElements = [];

  rows.forEach((row) => {
    const cells = [...row.children];
    cells.forEach((cell) => {
      if (cell.querySelector('picture')) {
        const pic = cell.querySelector('picture');
        pic.classList.add('hero-bg');
        block.prepend(pic);
      } else if (cell.textContent.trim()) {
        contentElements.push(...cell.children);
      }
    });
  });

  // Clear original rows
  rows.forEach((row) => row.remove());

  // Create content wrapper
  if (contentElements.length > 0) {
    const content = document.createElement('div');
    content.className = 'hero-content';

    contentElements.forEach((el) => {
      // Check for eyebrow text (first small paragraph before heading)
      if (el.tagName === 'P' && !el.querySelector('a') && !el.classList.contains('button-wrapper')) {
        const nextSibling = el.nextElementSibling;
        if (nextSibling && /^H[1-6]$/.test(nextSibling.tagName)) {
          el.classList.add('hero-eyebrow');
        }
      }
      content.append(el);
    });

    block.append(content);
  }
}
