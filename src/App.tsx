import { CardCarousel } from './components/CardCarousel';
import { useCards } from './hooks/useCards';
import './styles/global.css';

const navigationItems = ['Home', 'Cards', 'Payments', 'Credit', 'Settings'];

function App() {
  const { cards, selectedCard, selectedCardId, selectCard } = useCards();

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <h1 className="brand">Aspire</h1>
        <p className="tagline">Trusted way of banking for 3,000+ SMEs and startups in Singapore.</p>
        <nav className="nav-menu">
          {navigationItems.map((item) => (
            <button key={item} className={`nav-item ${item === 'Cards' ? 'active' : ''}`}>
              {item}
            </button>
          ))}
        </nav>
      </aside>

      <main className="content-layout">
        <section className="card-workspace">
          <header className="balance-header">
            <p>Available balance</p>
            <div className="balance-row">
              <span className="currency-pill">S$</span>
              <h2>{(cards.length * 3000).toLocaleString()}</h2>
            </div>
          </header>

          <div className="tabs">
            <button className="tab active">My debit cards</button>
            <button className="tab">All company cards</button>
          </div>

          <section className="card-panel">
            <CardCarousel />
          </section>
        </section>

        <aside className="details-panel">
          <section className="panel card-details">
            <h3>Card details</h3>
            {selectedCard ? (
              <div>
                <p><strong>{selectedCard.cardName}</strong></p>
                <p className="card-number-display">{selectedCard.cardNumber}</p>
                <p>Exp: {selectedCard.expirationDate}</p>
                <p>
                  Status:{' '}
                  <span className={selectedCard.status === 'frozen' ? 'amount' : 'amount positive'}>
                    {selectedCard.status}
                  </span>
                </p>
              </div>
            ) : (
              <p>Select a card to view details.</p>
            )}
          </section>

          <section className="panel recent-transactions">
            <h3>Recent transactions</h3>
            {selectedCard && selectedCard.transactions.length > 0 ? (
              <ul>
                {selectedCard.transactions.map((tx) => (
                  <li key={tx.id}>
                    <div>
                      <strong>{tx.merchant}</strong>
                      <p>{tx.description}</p>
                      <small>{new Date(tx.occurredAt).toLocaleDateString()}</small>
                    </div>
                    <span className={tx.amount >= 0 ? 'amount positive' : 'amount'}>
                      {tx.amount >= 0 ? '+ ' : '- '}S$ {Math.abs(tx.amount).toLocaleString()}
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No transactions for this card.</p>
            )}
          </section>

          <section className="panel cards-summary">
            <h3>All cards ({cards.length})</h3>
            <ul className="cards-summary-list">
              {cards.map((card) => (
                <li
                  key={card.id}
                  className={`cards-summary-item ${card.id === selectedCardId ? 'cards-summary-item--active' : ''}`}
                  onClick={() => selectCard(card.id)}
                >
                  <span>{card.cardName}</span>
                  <span className={card.status === 'frozen' ? 'amount' : 'amount positive'}>
                    {card.status}
                  </span>
                </li>
              ))}
            </ul>
          </section>
        </aside>
      </main>
    </div>
  );
}

export default App;
