export default function decorate(block) {
  const tabList = document.createElement('div');
  tabList.className = 'tabs-list';
  tabList.setAttribute('role', 'tablist');

  const tabPanels = document.createElement('div');
  tabPanels.className = 'tabs-panels';

  [...block.children].forEach((row, i) => {
    const cells = [...row.children];
    const tabLabel = cells[0]?.textContent.trim();
    const tabContent = cells[1];

    const tabButton = document.createElement('button');
    tabButton.className = 'tabs-tab';
    tabButton.setAttribute('role', 'tab');
    tabButton.setAttribute('aria-selected', i === 0 ? 'true' : 'false');
    tabButton.setAttribute('aria-controls', `tabpanel-${i}`);
    tabButton.setAttribute('tabindex', i === 0 ? '0' : '-1');
    tabButton.textContent = tabLabel;
    tabList.append(tabButton);

    const panel = document.createElement('div');
    panel.className = 'tabs-panel';
    panel.id = `tabpanel-${i}`;
    panel.setAttribute('role', 'tabpanel');
    panel.setAttribute('aria-hidden', i !== 0 ? 'true' : 'false');
    if (tabContent) panel.append(...tabContent.children);
    tabPanels.append(panel);
  });

  block.replaceChildren(tabList, tabPanels);

  tabList.addEventListener('click', (e) => {
    const clickedTab = e.target.closest('.tabs-tab');
    if (!clickedTab) return;

    tabList.querySelectorAll('.tabs-tab').forEach((tab) => {
      tab.setAttribute('aria-selected', 'false');
      tab.setAttribute('tabindex', '-1');
    });
    clickedTab.setAttribute('aria-selected', 'true');
    clickedTab.setAttribute('tabindex', '0');

    const panelId = clickedTab.getAttribute('aria-controls');
    tabPanels.querySelectorAll('.tabs-panel').forEach((panel) => {
      panel.setAttribute('aria-hidden', panel.id !== panelId ? 'true' : 'false');
    });
  });

  tabList.addEventListener('keydown', (e) => {
    const tabs = [...tabList.querySelectorAll('.tabs-tab')];
    const current = tabs.indexOf(document.activeElement);
    let next;
    if (e.key === 'ArrowRight') next = (current + 1) % tabs.length;
    else if (e.key === 'ArrowLeft') next = (current - 1 + tabs.length) % tabs.length;
    if (next !== undefined) {
      tabs[next].click();
      tabs[next].focus();
    }
  });
}
