import { FormEvent, useRef, useState } from 'react';

import type { Card } from '../models/domain';
import './CardCarousel.css';

type CardCarouselProps = {
  cards: Card[];
  selectedCardId: string;
  selectedCard?: Card;
  isAddCardModalOpen: boolean;
  cardName: string;
  cardActionLabel: 'Freeze' | 'Unfreeze';
  openAddCardModal: () => void;
  closeAddCardModal: () => void;
  setCardName: (name: string) => void;
  addCard: () => void;
  selectCard: (cardId: string) => void;
  toggleCardFreeze: () => void;
};

const maskCardNumber = (value: string) => {
  const digits = value.replace(/\s+/g, '');
  const last = digits.slice(-4);
  return `•••• •••• •••• ${last}`;
};

export const CardCarousel = ({
  cards,
  selectedCardId,
  selectedCard,
  isAddCardModalOpen,
  cardName,
  cardActionLabel,
  closeAddCardModal,
  setCardName,
  addCard,
  selectCard,
  toggleCardFreeze,
}: CardCarouselProps) => {
  const [showNumber, setShowNumber] = useState(false);
  const dragStartX = useRef<number | null>(null);
  const isDragging = useRef(false);

  const currentIndex = cards.findIndex((c) => c.id === selectedCardId);

  const goTo = (index: number) => {
    if (index < 0 || index >= cards.length) return;
    selectCard(cards[index].id);
    setShowNumber(false);
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    dragStartX.current = e.clientX;
    isDragging.current = false;
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (dragStartX.current === null) return;
    if (Math.abs(e.clientX - dragStartX.current) > 8) {
      isDragging.current = true;
    }
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (dragStartX.current === null) return;
    const delta = e.clientX - dragStartX.current;
    dragStartX.current = null;
    if (!isDragging.current || Math.abs(delta) < 40) return;
    if (delta < 0) goTo(currentIndex + 1);
    else goTo(currentIndex - 1);
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    addCard();
  };

  const displayNumber = showNumber
    ? (selectedCard?.cardNumber ?? '')
    : maskCardNumber(selectedCard?.cardNumber ?? '');

  return (
    <section>
      <div className="show-number-row">
        <button
          type="button"
          className="show-number-btn"
          onClick={() => setShowNumber((v) => !v)}
        >
          <span className="show-number-eye">👁</span>
          {showNumber ? 'Hide card number' : 'Show card number'}
        </button>
      </div>

      <div
        className="carousel-track"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        style={{ touchAction: 'pan-y', userSelect: 'none' }}
      >
        <article className={`hero-card ${selectedCard?.status === 'frozen' ? 'hero-card--frozen' : ''}`}>
          <div className="hero-card__brand">aspire</div>
          <h2 className="hero-card__name">{selectedCard?.cardName ?? 'Card holder'}</h2>
          <p className="hero-card__number">{displayNumber}</p>
          <div className="hero-card__meta">
            <p>Thru: {selectedCard?.expirationDate ?? '--/--'}</p>
            <p>CVV: ***</p>
          </div>
          <div className="hero-card__visa">VISA</div>
        </article>
      </div>

      <div className="carousel-dots" aria-label="cards carousel">
        {cards.map((card, i) => (
          <button
            key={card.id}
            type="button"
            className={`dot ${selectedCardId === card.id ? 'active' : ''}`}
            onClick={() => goTo(i)}
            aria-label={`Select ${card.cardName}`}
          />
        ))}
      </div>

      <div className="actions-bar">
        <button className="action-btn" type="button" onClick={toggleCardFreeze}>
          <span className="action-icon">❄️</span>
          <span>{cardActionLabel} card</span>
        </button>
        <button className="action-btn" type="button">
          <span className="action-icon">⏱</span>
          <span>Set spend limit</span>
        </button>
        <button className="action-btn" type="button">
          <span className="action-icon">G</span>
          <span>Add to GPay</span>
        </button>
        <button className="action-btn" type="button">
          <span className="action-icon">↻</span>
          <span>Replace card</span>
        </button>
        <button className="action-btn" type="button">
          <span className="action-icon">🗑</span>
          <span>Cancel card</span>
        </button>
      </div>

      {isAddCardModalOpen && (
        <div className="modal-backdrop" role="presentation" onClick={closeAddCardModal}>
          <form className="modal" onSubmit={onSubmit} onClick={(event) => event.stopPropagation()}>
            <label htmlFor="cardName">Add new card</label>
            <input
              id="cardName"
              value={cardName}
              onChange={(event) => setCardName(event.target.value)}
              placeholder="Enter card holder name"
              autoFocus
            />
            <div className="modal__actions">
              <button type="button" onClick={closeAddCardModal}>
                Cancel
              </button>
              <button type="submit">Create Card</button>
            </div>
          </form>
        </div>
      )}
    </section>
  );
};
