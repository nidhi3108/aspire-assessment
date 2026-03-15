import { FormEvent } from 'react';

import { useCards } from '../hooks/useCards';
import './CardCarousel.css';

export const CardCarousel = () => {
  const {
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
  } = useCards();

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    addCard();
  };

  return (
    <section>
      <div className="card-list" aria-label="cards carousel">
        {cards.map((card) => (
          <button
            key={card.id}
            type="button"
            className={`card ${card.status === 'frozen' ? 'card--frozen' : ''} ${selectedCardId === card.id ? 'card--selected' : ''}`}
            onClick={() => selectCard(card.id)}
          >
            <p className="card__name">{card.cardName}</p>
            <p className="card__number">{card.cardNumber}</p>
            <p className="card__expiration">Exp: {card.expirationDate}</p>
            {card.status === 'frozen' && <span className="card__overlay">Frozen</span>}
          </button>
        ))}
      </div>

      <div className="card-actions">
        <button type="button" onClick={openAddCardModal}>
          Add Card
        </button>
        <button type="button" onClick={toggleCardFreeze} disabled={!selectedCard}>
          {cardActionLabel}
        </button>
      </div>

      {isAddCardModalOpen && (
        <div className="modal-backdrop" role="presentation" onClick={closeAddCardModal}>
          <form className="modal" onSubmit={onSubmit} onClick={(event) => event.stopPropagation()}>
            <label htmlFor="cardName">Card Name</label>
            <input
              id="cardName"
              value={cardName}
              onChange={(event) => setCardName(event.target.value)}
              placeholder="Enter card name"
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
