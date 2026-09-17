const businesses = {
  restaurant: {
    title: 'Restaurant / Imbiss', icon: '🍕', summary: 'Take orders while the kitchen keeps moving.',
    features: ['Digital menu','Online ordering','Online payments','Pickup & delivery','Reservations','AI menu assistant'],
    kicker: 'FRESH · FAST · LOCAL', preview: 'Dinner is<br>ready.', emoji: '🍕', color: '#f1c447'
  },
  supermarket: {
    title: 'Supermarket', icon: '🛒', summary: 'Make local shopping as convenient as it should be.',
    features: ['Product catalog','Live inventory','Click & collect','Delivery slots','Digital offers','Stock alerts'],
    kicker: 'YOUR LOCAL MARKET', preview: 'Everything<br>on your list.', emoji: '🥑', color: '#b8cf87'
  },
  bookstore: {
    title: 'Bookstore', icon: '📚', summary: 'Help readers find, reserve and collect their next book.',
    features: ['Searchable catalog','Stock lookup','Reservations','Recommendations','Events','AI book finder'],
    kicker: 'READ · DISCOVER · REPEAT', preview: 'Your next<br>great read.', emoji: '📖', color: '#8fb4c7'
  },
  jeweler: {
    title: 'Jeweler', icon: '💎', summary: 'Turn considered purchases into personal experiences.',
    features: ['Luxury website','Collections','Appointments','Custom inquiries','Care guides','Secure payments'],
    kicker: 'CRAFTED TO LAST', preview: 'Find your<br>signature piece.', emoji: '💍', color: '#d6c9a2'
  },
  florist: {
    title: 'Florist', icon: '💐', summary: 'Sell moments, not just bouquets.',
    features: ['Seasonal catalog','Local delivery','Pickup','Occasion finder','Subscriptions','Order notifications'],
    kicker: 'GROWN · CUT · ARRANGED', preview: 'Say it with<br>flowers.', emoji: '💐', color: '#dba993'
  },
  retail: {
    title: 'Retail', icon: '🛍', summary: 'Connect the shop floor to a modern online storefront.',
    features: ['Online shop','Click & collect','Inventory sync','Customer accounts','Gift cards','Sales dashboard'],
    kicker: 'CURATED FOR YOU', preview: 'Local finds.<br>Online ease.', emoji: '👜', color: '#c3b2d2'
  }
};

const qs = (selector, scope = document) => scope.querySelector(selector);
const qsa = (selector, scope = document) => [...scope.querySelectorAll(selector)];

// Mobile navigation
const menuButton = qs('.menu-button');
const mobileMenu = qs('#mobile-menu');
menuButton?.addEventListener('click', () => {
  const open = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!open));
  menuButton.setAttribute('aria-label', open ? 'Open menu' : 'Close menu');
  mobileMenu.hidden = open;
});
qsa('a', mobileMenu).forEach(link => link.addEventListener('click', () => {
  mobileMenu.hidden = true;
  menuButton.setAttribute('aria-expanded', 'false');
}));

// Business selector
qsa('.business-tab').forEach(tab => tab.addEventListener('click', () => {
  const data = businesses[tab.dataset.business];
  qsa('.business-tab').forEach(item => {
    const active = item === tab;
    item.classList.toggle('is-active', active);
    item.setAttribute('aria-selected', String(active));
  });
  const result = qs('.selector-result');
  result.animate([{ opacity: .45, transform: 'translateY(5px)' }, { opacity: 1, transform: 'none' }], { duration: 330, easing: 'ease-out' });
  qs('#result-title').textContent = data.title;
  qs('#result-icon').textContent = data.icon;
  qs('#result-summary').textContent = data.summary;
  qs('#result-features').innerHTML = data.features.map(item => `<li>${item}</li>`).join('');
  qs('.result-content .text-link').innerHTML = `See ${data.title.toLowerCase()} setup <span>↗</span>`;
  qs('#preview-kicker').textContent = data.kicker;
  qs('#preview-title').innerHTML = data.preview;
  qs('#preview-emoji').textContent = data.emoji;
  qs('.result-ui').style.background = data.color;
}));

// Ordering demo
const placeOrder = qs('#place-order');
const acceptOrder = qs('#accept-order');
placeOrder?.addEventListener('click', () => {
  placeOrder.disabled = true;
  placeOrder.innerHTML = 'Order sent <span>✓</span>';
  qs('.transfer-dot').classList.add('is-moving');
  qs('#order-status').textContent = 'Incoming order…';
  setTimeout(() => {
    qs('#empty-order').hidden = true;
    qs('#incoming-order').hidden = false;
    qs('#order-status').textContent = '1 new order';
    qs('.transfer-dot').classList.remove('is-moving');
  }, 850);
});
acceptOrder?.addEventListener('click', () => {
  acceptOrder.innerHTML = 'Order accepted <span>✓</span>';
  acceptOrder.style.background = '#3f8759';
  qs('#order-status').textContent = 'Preparing #1042';
});

// Practical AI interaction
let stockAsked = false;
qs('#ask-stock')?.addEventListener('click', () => {
  if (stockAsked) return;
  stockAsked = true;
  const messages = qs('#chat-messages');
  messages.insertAdjacentHTML('beforeend', '<div class="message message-user stock-response">Is Atomic Habits in stock?</div>');
  setTimeout(() => {
    messages.insertAdjacentHTML('beforeend', '<div class="message message-ai stock-response"><span class="avatar small">✦</span><div><p><b>Yes — 3 copies are available.</b><br>You can reserve one for pickup today.</p></div></div>');
    messages.scrollTo({ top: messages.scrollHeight, behavior: 'smooth' });
  }, 450);
});

// Scroll reveals and sequential automation
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: .12, rootMargin: '0px 0px -40px' });
qsa('.reveal').forEach(item => revealObserver.observe(item));

const workflow = qs('.workflow');
const workflowObserver = new IntersectionObserver(entries => {
  if (!entries[0].isIntersecting) return;
  const nodes = qsa('.workflow-node', workflow);
  nodes.forEach((node, index) => setTimeout(() => {
    node.classList.add('is-active');
    workflow.style.setProperty('--progress', `${(index / (nodes.length - 1)) * 84}%`);
  }, index * 380));
  workflowObserver.disconnect();
}, { threshold: .35 });
if (workflow) workflowObserver.observe(workflow);

// Demo form stays local until a real recipient is connected.
qs('#contact-form')?.addEventListener('submit', event => {
  event.preventDefault();
  const note = qs('#form-note');
  note.textContent = 'Thanks — the form experience works. Connect your inbox to receive requests.';
  note.style.color = '#b8e5c5';
  event.currentTarget.querySelector('.submit-button').innerHTML = 'Request prepared <span>✓</span>';
});

qs('#year').textContent = new Date().getFullYear();
