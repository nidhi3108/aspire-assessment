import { Card, createCard, loadCards, saveCards, toggleFreeze } from './cards.js';

export type App = {
  getCards: () => Card[];
  openAddCardModal: () => void;
  submitNewCard: (holderName: string) => void;
  toggleCardFreeze: (id: string) => void;
};

export const createApp = (root: HTMLElement, storage: Storage): App => {
  let cards = loadCards(storage);

  const page = document.createElement('div');
  page.className = 'page';

  const sidebar = document.createElement('aside');
  sidebar.className = 'sidebar';

  const title = document.createElement('h1');
  title.textContent = 'Available balance';

  const balance = document.createElement('p');
  balance.textContent = 'S$ 3,000';
  balance.className = 'balance';

  const addButton = document.createElement('button');
  addButton.textContent = '+ New card';
  addButton.className = 'primary-btn';

  sidebar.append(title, balance, addButton);

  const content = document.createElement('main');
  content.className = 'content';

  const heroCard = document.createElement('section');
  heroCard.className = 'hero-card';

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

  const nameInput = document.createElement('input');
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

  actions.append(cancelButton, createButton);
  modalCard.append(modalTitle, nameInput, actions);
  modal.append(modalCard);

  const renderHeader = (): void => {
    const active = cards[0];

    heroCard.replaceChildren();
    if (!active) {
      return;
    }

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
    meta.textContent = `Thru ${active.expiry}   CVV ***`;

    heroCard.append(brand, holder, number, meta);
  };

  const renderCards = (): void => {
    list.replaceChildren();

    cards.forEach((card) => {
      const item = document.createElement('li');
      item.className = `card-row ${card.frozen ? 'frozen' : ''}`;

      const info = document.createElement('div');
      const holderName = document.createElement('p');
      holderName.textContent = card.holderName;
      const number = document.createElement('p');
      number.textContent = card.cardNumber;
      const expiry = document.createElement('p');
      expiry.textContent = `Exp ${card.expiry}`;
      info.append(holderName, number, expiry);

      const control = document.createElement('div');
      const status = document.createElement('p');
      status.textContent = card.frozen ? 'Frozen' : 'Active';
      status.setAttribute('data-testid', `card-status-${card.id}`);

      const freezeButton = document.createElement('button');
      freezeButton.textContent = card.frozen ? 'Unfreeze card' : 'Freeze card';
      freezeButton.setAttribute('data-testid', `card-toggle-${card.id}`);
      freezeButton.addEventListener('click', () => {
        cards = toggleFreeze(cards, card.id);
        saveCards(storage, cards);
        render();
      });

      control.append(status, freezeButton);
      item.append(info, control);
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

  cancelButton.addEventListener('click', () => {
    modal.hidden = true;
  });

  modalCard.addEventListener('submit', (event) => {
    event.preventDefault();
    const trimmedName = nameInput.value.trim();

    if (!trimmedName) {
      return;
    }

    cards = [...cards, createCard(trimmedName)];
    saveCards(storage, cards);
    nameInput.value = '';
    modal.hidden = true;
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
    }
  };
};
