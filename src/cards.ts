export type Card = {
  id: string;
  holderName: string;
  cardNumber: string;
  expiry: string;
  frozen: boolean;
};

const STORAGE_KEY = 'aspire.cards';

export const PRELOADED_CARDS: Card[] = [
  {
    id: 'preloaded-1',
    holderName: 'Mark Henry',
    cardNumber: '1111 2222 3333 4444',
    expiry: '12/30',
    frozen: false
  },
  {
    id: 'preloaded-2',
    holderName: 'Ada Lovelace',
    cardNumber: '5555 6666 7777 8888',
    expiry: '10/29',
    frozen: false
  }
];

export const loadCards = (storage: Storage): Card[] => {
  const stored = storage.getItem(STORAGE_KEY);
  if (!stored) {
    return [...PRELOADED_CARDS];
  }

  try {
    const parsed = JSON.parse(stored) as Card[];
    if (!Array.isArray(parsed)) {
      return [...PRELOADED_CARDS];
    }

    return parsed;
  } catch {
    return [...PRELOADED_CARDS];
  }
};

export const saveCards = (storage: Storage, cards: Card[]): void => {
  storage.setItem(STORAGE_KEY, JSON.stringify(cards));
};

const randomDigits = (length: number): string => {
  return Array.from({ length }, () => Math.floor(Math.random() * 10).toString()).join('');
};

const randomExpiry = (): string => {
  const month = `${Math.floor(Math.random() * 12) + 1}`.padStart(2, '0');
  const year = Math.floor(Math.random() * 5) + 27;
  return `${month}/${year}`;
};

export const createCard = (holderName: string): Card => {
  const digits = randomDigits(16);
  const cardNumber = digits.replace(/(.{4})/g, '$1 ').trim();

  return {
    id: `card-${Date.now()}-${randomDigits(4)}`,
    holderName,
    cardNumber,
    expiry: randomExpiry(),
    frozen: false
  };
};

export const toggleFreeze = (cards: Card[], id: string): Card[] => {
  return cards.map((card) =>
    card.id === id
      ? {
          ...card,
          frozen: !card.frozen
        }
      : card
  );
};

export const storageKey = STORAGE_KEY;
