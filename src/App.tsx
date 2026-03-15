import { CardCarousel } from './components/CardCarousel';
import { useCards } from './hooks/useCards';
import './styles/global.css';

const navigationItems = ['Home', 'Cards', 'Payments', 'Credit', 'Settings'];

const mobileNavigationItems = ['Home', 'Cards', 'Payments', 'Credit', 'Profile'];

function App() {
  const cardsState = useCards();
  const { cards, selectedCard } = cardsState;

  const transactions = selectedCard?.transactions ?? [];

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <h1 className="brand">aspire</h1>
        <p className="tagline">Trusted way of banking for 3,000+ SMEs and startups in Singapore</p>
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
            <div>
              <p>{window.innerWidth < 840 ? 'Account balance' : 'Available balance'}</p>
              <div className="balance-row">
                <span className="currency-pill">S$</span>
                <h2>{(cards.length * 3000).toLocaleString()}</h2>
              </div>
            </div>
            <button className="new-card-btn" type="button" onClick={cardsState.openAddCardModal}>+ New card</button>
          </header>

          <div className="tabs">
            <button className="tab active">My debit cards</button>
            <button className="tab">All company cards</button>
          </div>

          <section className="card-panel">
            <CardCarousel {...cardsState} />
          </section>
        </section>

        <aside className="details-panel">
          <section className="panel section-title">
            <h3>Card details</h3>
          </section>

          <section className="panel recent-transactions">
            <h3>Recent transactions</h3>
            {transactions.length > 0 ? (
              <ul>
                {transactions.map((tx) => (
                  <li key={tx.id}>
                    <div className="tx-left">
                      <strong>{tx.merchant}</strong>
                      <small>{new Date(tx.occurredAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</small>
                      <p>{tx.description}</p>
                    </div>
                    <span className={tx.amount >= 0 ? 'amount positive' : 'amount'}>
                      {tx.amount >= 0 ? '+' : '-'} S$ {Math.abs(tx.amount)}
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No transactions for this card.</p>
            )}
          </section>
        </aside>
      </main>

      <nav className="mobile-bottom-nav">
        {mobileNavigationItems.map((item) => (
          <button key={item} className={`mobile-nav-item ${item === 'Cards' ? 'active' : ''}`}>
            {item}
          </button>
        ))}
      </nav>
    </div>
  );
}

export default App;
