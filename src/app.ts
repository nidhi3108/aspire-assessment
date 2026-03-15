import { Card, createCard, loadCards, saveCards, toggleFreeze } from './cards.js';

export type App = {
  getCards: () => Card[];
  openAddCardModal: () => void;
  submitNewCard: (holderName: string) => void;
  toggleCardFreeze: (id: string) => void;
};

export const createApp = (root: HTMLElement, storage: Storage): App => {
  let cards = loadCards(storage);

  const title = document.createElement('h1');
  title.textContent = 'Aspire Cards';

  const addButton = document.createElement('button');
  addButton.textContent = 'Add card';

  const modal = document.createElement('div');
  modal.hidden = true;
  modal.setAttribute('data-testid', 'add-card-modal');

  const nameInput = document.createElement('input');
  nameInput.setAttribute('aria-label', 'holder name');
  nameInput.placeholder = 'Card holder name';

  const createButton = document.createElement('button');
  createButton.textContent = 'Create';

  modal.append(nameInput, createButton);

  const list = document.createElement('ul');
  list.setAttribute('data-testid', 'cards-list');

  const render = (): void => {
    list.replaceChildren();

    cards.forEach((card) => {
      const item = document.createElement('li');
      item.setAttribute('data-testid', `card-${card.id}`);

      const holderName = document.createElement('p');
      holderName.textContent = card.holderName;

      const number = document.createElement('p');
      number.textContent = card.cardNumber;

      const expiry = document.createElement('p');
      expiry.textContent = `Exp ${card.expiry}`;

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

      item.append(holderName, number, expiry, status, freezeButton);
      list.append(item);
    });
  };

  addButton.addEventListener('click', () => {
    modal.hidden = false;
    nameInput.focus();
  });

  createButton.addEventListener('click', () => {
    if (!nameInput.value.trim()) {
      return;
    }

    cards = [...cards, createCard(nameInput.value.trim())];
    saveCards(storage, cards);
    nameInput.value = '';
    modal.hidden = true;
    render();
  });

  root.append(title, addButton, modal, list);
  render();

  return {
    getCards: () => cards,
    openAddCardModal: () => {
      addButton.click();
    },
    submitNewCard: (holderName: string) => {
      nameInput.value = holderName;
      createButton.click();
    },
    toggleCardFreeze: (id: string) => {
      const button = list.querySelector<HTMLButtonElement>(`[data-testid='card-toggle-${id}']`);
      button?.click();
    }
  };
};
