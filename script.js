(() => {
  'use strict';

  const toggle = document.querySelector('.menu-toggle');
  const navigation = document.querySelector('#primary-navigation');
  if (!toggle || !navigation) return;

  const mobileScreen = window.matchMedia('(max-width: 600px)');

  function setExpanded(expanded) {
    toggle.setAttribute('aria-expanded', String(expanded));
    navigation.hidden = !expanded;
    toggle.querySelector('span').textContent = expanded ? '−' : '+';
  }

  function syncMenu() {
    toggle.hidden = !mobileScreen.matches;
    setExpanded(!mobileScreen.matches);
  }

  toggle.addEventListener('click', () => {
    setExpanded(toggle.getAttribute('aria-expanded') !== 'true');
  });

  navigation.addEventListener('click', (event) => {
    if (mobileScreen.matches && event.target.closest('a')) {
      setExpanded(false);
      toggle.focus({ preventScroll: true });
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && mobileScreen.matches && !navigation.hidden) {
      setExpanded(false);
      toggle.focus({ preventScroll: true });
    }
  });

  mobileScreen.addEventListener('change', syncMenu);
  syncMenu();
})();
