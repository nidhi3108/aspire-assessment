import { useEffect, useMemo, useState } from 'react';

import type { Card } from '../models/domain';
import { generateCardNumber, generateExpirationDate } from '../utils/cardGenerators';

const STORAGE_KEY = 'aspire.cards';

const defaultCards: Card[] = [
  {
    id: 'card-default-1',
    cardName: 'Mark Henry',
    cardNumber: generateCardNumber(),
    expirationDate: '12/20',
    status: 'active',
    createdAt: new Date().toISOString(),
    transactions: [
      {
        id: 'tx-1',
        cardId: 'card-default-1',
        description: 'Refund on debit card',
        amount: 150,
        merchant: 'Hamleys',
        occurredAt: '2020-05-20T00:00:00.000Z',
      },
      {
        id: 'tx-2',
        cardId: 'card-default-1',
        description: 'Charged to debit card',
        amount: -150,
        merchant: 'Hamleys',
        occurredAt: '2020-05-20T00:00:00.000Z',
      },
      {
        id: 'tx-3',
        cardId: 'card-default-1',
        description: 'Charged to debit card',
        amount: -150,
        merchant: 'Hamleys',
        occurredAt: '2020-05-20T00:00:00.000Z',
      },
    ],
  },
  {
    id: 'card-default-2',
    cardName: 'Ada Lovelace',
    cardNumber: generateCardNumber(),
    expirationDate: generateExpirationDate(),
    status: 'active',
    createdAt: new Date().toISOString(),
    transactions: [],
  },
];

const hydrateCards = (): Card[] => {
  if (typeof window === 'undefined') {
    return defaultCards;
  }

  const persistedCards = window.localStorage.getItem(STORAGE_KEY);
  if (!persistedCards) {
    return defaultCards;
  }

  try {
    const parsed = JSON.parse(persistedCards) as Card[];
    return parsed.length ? parsed : defaultCards;
  } catch {
    return defaultCards;
  }
};

export interface UseCardsState {
  cards: Card[];
  selectedCardId: string;
  selectedCard: Card | undefined;
  isAddCardModalOpen: boolean;
  cardName: string;
  cardActionLabel: 'Freeze' | 'Unfreeze';
  openAddCardModal: () => void;
  closeAddCardModal: () => void;
  setCardName: (name: string) => void;
  addCard: () => void;
  selectCard: (cardId: string) => void;
  toggleCardFreeze: () => void;
  isSelectedCardFrozen: boolean;
}

export const useCards = (): UseCardsState => {
  const [cards, setCards] = useState<Card[]>(hydrateCards);
  const [selectedCardId, setSelectedCardId] = useState(cards[0]?.id ?? '');
  const [isAddCardModalOpen, setIsAddCardModalOpen] = useState(false);
  const [cardName, setCardName] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(cards));
    }
  }, [cards]);

  const selectedCard = useMemo(
    () => cards.find((card) => card.id === selectedCardId) ?? cards[0],
    [cards, selectedCardId],
  );

  const openAddCardModal = () => setIsAddCardModalOpen(true);

  const closeAddCardModal = () => {
    setIsAddCardModalOpen(false);
    setCardName('');
  };

  const addCard = () => {
    const trimmedName = cardName.trim();
    if (!trimmedName) return;

    const newCard: Card = {
      id: `card-${Date.now()}`,
      cardName: trimmedName,
      cardNumber: generateCardNumber(),
      expirationDate: generateExpirationDate(),
      status: 'active',
      createdAt: new Date().toISOString(),
      transactions: [],
    };

    setCards((prevCards) => [...prevCards, newCard]);
    setSelectedCardId(newCard.id);
    closeAddCardModal();
  };

  const selectCard = (cardId: string) => setSelectedCardId(cardId);

  const toggleCardFreeze = () => {
    if (!selectedCard) return;

    setCards((prevCards) =>
      prevCards.map((card) => {
        if (card.id !== selectedCard.id) return card;

        return {
          ...card,
          status: card.status === 'frozen' ? 'active' : 'frozen',
        };
      }),
    );
  };

  const isSelectedCardFrozen = selectedCard?.status === 'frozen';
  const cardActionLabel = isSelectedCardFrozen ? 'Unfreeze' : 'Freeze';

  return {
    cards,
    selectedCardId,
    selectedCard,
    isAddCardModalOpen,
    cardName,
    cardActionLabel,
    openAddCardModal,
    closeAddCardModal,
    setCardName,
    addCard,
    selectCard,
    toggleCardFreeze,
    isSelectedCardFrozen,
  };
};
