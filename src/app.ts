import { Card, createCard, loadCards, saveCards, toggleFreeze } from './cards.js';

export type App = {
  getCards: () => Card[];
  openAddCardModal: () => void;
  submitNewCard: (holderName: string) => void;
  toggleCardFreeze: (id: string) => void;
  selectCard: (id: string) => void;
};

export const createApp = (root: HTMLElement, storage: Storage): App => {
  let cards = loadCards(storage);
  let activeCardId = cards[0]?.id ?? '';

  root.replaceChildren();

  const page = document.createElement('div');
  page.className = 'page';

  const sidebar = document.createElement('aside');
  sidebar.className = 'sidebar';

  const subtitle = document.createElement('p');
  subtitle.className = 'subtitle';
  subtitle.textContent = 'Available balance';

  const balance = document.createElement('p');
  balance.textContent = 'S$ 3,000';
  balance.className = 'balance';

  const addButton = document.createElement('button');
  addButton.textContent = '+ New card';
  addButton.className = 'primary-btn';

  sidebar.append(subtitle, balance, addButton);

  const content = document.createElement('main');
  content.className = 'content';

  const heroCard = document.createElement('section');
  heroCard.className = 'hero-card';
  heroCard.setAttribute('data-testid', 'active-card');

  const list = document.createElement('ul');
  list.className = 'cards-list';
  list.setAttribute('data-testid', 'cards-list');

  const modal = document.createElement('div');
  modal.hidden = true;
  modal.className = 'modal-overlay';
  modal.setAttribute('data-testid', 'add-card-modal');

  const modalCard = document.createElement('form');
  modalCard.className = 'modal';

  const modalTitle = document.createElement('h2');
  modalTitle.textContent = 'Add new card';

  const nameLabel = document.createElement('label');
  nameLabel.textContent = 'Card holder name';
  nameLabel.setAttribute('for', 'holder-name-input');

  const nameInput = document.createElement('input');
  nameInput.id = 'holder-name-input';
  nameInput.setAttribute('aria-label', 'holder name');
  nameInput.placeholder = 'Card holder name';

  const actions = document.createElement('div');
  actions.className = 'modal-actions';

  const cancelButton = document.createElement('button');
  cancelButton.type = 'button';
  cancelButton.textContent = 'Cancel';

  const createButton = document.createElement('button');
  createButton.type = 'submit';
  createButton.textContent = 'Create';
  createButton.className = 'primary-btn';

  actions.append(cancelButton, createButton);
  modalCard.append(modalTitle, nameLabel, nameInput, actions);
  modal.append(modalCard);

  const closeModal = (): void => {
    modal.hidden = true;
    nameInput.value = '';
  };

  const persistCards = (): void => {
    saveCards(storage, cards);
  };

  const renderHeader = (): void => {
    const active = cards.find((card) => card.id === activeCardId) ?? cards[0];

    heroCard.replaceChildren();
    if (!active) {
      return;
    }

    activeCardId = active.id;

    const brand = document.createElement('p');
    brand.textContent = 'aspire';
    brand.className = 'brand';

    const holder = document.createElement('p');
    holder.textContent = active.holderName;
    holder.className = 'holder';

    const number = document.createElement('p');
    number.textContent = active.cardNumber;
    number.className = 'number';

    const meta = document.createElement('p');
    meta.className = 'meta';
    meta.textContent = `Thru ${active.expiry}   CVV ***`;

    heroCard.append(brand, holder, number, meta);
  };

  const renderCards = (): void => {
    list.replaceChildren();

    cards.forEach((card) => {
      const item = document.createElement('li');
      item.className = `card-row ${card.frozen ? 'frozen' : ''} ${card.id === activeCardId ? 'selected' : ''}`;

      const infoButton = document.createElement('button');
      infoButton.type = 'button';
      infoButton.className = 'card-info';
      infoButton.setAttribute('aria-label', `Select ${card.holderName} card`);

      const info = document.createElement('div');
      const holderName = document.createElement('p');
      holderName.className = 'card-name';
      holderName.textContent = card.holderName;
      const number = document.createElement('p');
      number.textContent = card.cardNumber;
      const expiry = document.createElement('p');
      expiry.textContent = `Exp ${card.expiry}`;
      info.append(holderName, number, expiry);
      infoButton.append(info);

      infoButton.addEventListener('click', () => {
        activeCardId = card.id;
        render();
      });

      const control = document.createElement('div');
      control.className = 'card-controls';
      const status = document.createElement('p');
      status.textContent = card.frozen ? 'Frozen' : 'Active';
      status.setAttribute('data-testid', `card-status-${card.id}`);

      const freezeButton = document.createElement('button');
      freezeButton.type = 'button';
      freezeButton.textContent = card.frozen ? 'Unfreeze card' : 'Freeze card';
      freezeButton.setAttribute('data-testid', `card-toggle-${card.id}`);
      freezeButton.addEventListener('click', () => {
        cards = toggleFreeze(cards, card.id);
        persistCards();
        render();
      });

      control.append(status, freezeButton);
      item.append(infoButton, control);
      list.append(item);
    });
  };

  const render = (): void => {
    renderHeader();
    renderCards();
  };

  addButton.addEventListener('click', () => {
    modal.hidden = false;
    nameInput.focus();
  });

  cancelButton.addEventListener('click', closeModal);

  modal.addEventListener('click', (event) => {
    if (event.target === modal) {
      closeModal();
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && !modal.hidden) {
      closeModal();
    }
  });

  modalCard.addEventListener('submit', (event) => {
    event.preventDefault();
    const trimmedName = nameInput.value.trim();

    if (!trimmedName) {
      return;
    }

    const newCard = createCard(trimmedName);
    cards = [...cards, newCard];
    activeCardId = newCard.id;
    persistCards();
    closeModal();
    render();
  });

  content.append(heroCard, list);
  page.append(sidebar, content, modal);
  root.append(page);
  render();

  return {
    getCards: () => cards,
    openAddCardModal: () => {
      addButton.click();
    },
    submitNewCard: (holderName: string) => {
      nameInput.value = holderName;
      modalCard.requestSubmit();
    },
    toggleCardFreeze: (id: string) => {
      const button = list.querySelector<HTMLButtonElement>(`[data-testid='card-toggle-${id}']`);
      button?.click();
    },
    selectCard: (id: string) => {
      activeCardId = id;
      render();
    }
  };
};
