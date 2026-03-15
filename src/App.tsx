const navigationItems = ['Home', 'Cards', 'Payments', 'Credit', 'Settings'];

const actionItems = [
  { label: 'Freeze card', icon: '❄️' },
  { label: 'Set spend limit', icon: '💸' },
  { label: 'Add to GPay', icon: '📱' },
  { label: 'Replace card', icon: '🔁' },
  { label: 'Cancel card', icon: '🚫' },
];

const transactions = [
  { merchant: 'Hamleys', category: 'Refund on debit card', amount: '+ S$ 150', when: 'Today' },
  { merchant: 'Hamleys', category: 'Charged to debit card', amount: '- S$ 150', when: 'Yesterday' },
  { merchant: 'Hamleys', category: 'Charged to debit card', amount: '- S$ 150', when: '20 May 2024' },
];

function App() {
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
              <h2>3,000</h2>
              <button type="button" className="new-card-btn">
                + New card
              </button>
            </div>
          </header>

          <div className="tabs">
            <button className="tab active">My debit cards</button>
            <button className="tab">All company cards</button>
          </div>

          <section className="card-panel">
            <article className="debit-card">
              <p className="card-name">Mark Henry</p>
              <p className="card-number">••••  ••••  ••••  2020</p>
              <div className="card-meta">
                <span>Thru: 12/20</span>
                <span>CVV: ***</span>
              </div>
              <p className="visa">VISA</p>
            </article>
            <div className="carousel-dots">
              <span className="dot active" />
              <span className="dot" />
              <span className="dot" />
            </div>
          </section>

          <section className="actions-bar">
            {actionItems.map((item) => (
              <button key={item.label} type="button" className="action-btn">
                <span>{item.icon}</span>
                {item.label}
              </button>
            ))}
          </section>
        </section>

        <aside className="details-panel">
          <section className="panel card-details">
            <h3>Card details</h3>
            <p>View card number, CVV and billing address.</p>
          </section>

          <section className="panel recent-transactions">
            <h3>Recent transactions</h3>
            <ul>
              {transactions.map((transaction) => (
                <li key={`${transaction.merchant}-${transaction.when}`}>
                  <div>
                    <strong>{transaction.merchant}</strong>
                    <p>{transaction.category}</p>
                    <small>{transaction.when}</small>
                  </div>
                  <span className={transaction.amount.startsWith('+') ? 'amount positive' : 'amount'}>{transaction.amount}</span>
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
