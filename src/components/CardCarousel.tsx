import { FormEvent } from 'react';

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
  const first = digits.slice(0, 12).replace(/\d/g, '●');
  const last = digits.slice(-4);
  return `${first.match(/.{1,4}/g)?.join(' ') ?? ''} ${last}`.trim();
};

export const CardCarousel = ({
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
}: CardCarouselProps) => {
  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    addCard();
  };

  return (
    <section>
      <div className="show-number">👁 Show card number</div>
      <article className={`hero-card ${selectedCard?.status === 'frozen' ? 'hero-card--frozen' : ''}`}>
        <div className="hero-card__brand">aspire</div>
        <h2>{selectedCard?.cardName ?? 'Card holder'}</h2>
        <p className="hero-card__number">{maskCardNumber(selectedCard?.cardNumber ?? '')}</p>
        <div className="hero-card__meta">
          <p>Thru: {selectedCard?.expirationDate ?? '--/--'}</p>
          <p>CVV: ***</p>
        </div>
        <div className="hero-card__visa">VISA</div>
      </article>

      <div className="carousel-dots" aria-label="cards carousel">
        {cards.map((card) => (
          <button
            key={card.id}
            type="button"
            className={`dot ${selectedCardId === card.id ? 'active' : ''}`}
            onClick={() => selectCard(card.id)}
            aria-label={`Select ${card.cardName}`}
          />
        ))}
      </div>

      <div className="actions-bar">
        <button className="action-btn" type="button" onClick={toggleCardFreeze}>❄️ <span>{cardActionLabel} card</span></button>
        <button className="action-btn" type="button">⏱ <span>Set spend limit</span></button>
        <button className="action-btn" type="button">G <span>Add to GPay</span></button>
        <button className="action-btn" type="button">↻ <span>Replace card</span></button>
        <button className="action-btn" type="button" onClick={openAddCardModal}>🗑 <span>Cancel card</span></button>
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
