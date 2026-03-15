import { useRef, useState } from 'react';

import { CardCarousel } from './components/CardCarousel';
import { useCards } from './hooks/useCards';
import './styles/global.css';

const navigationItems = ['Home', 'Cards', 'Payments', 'Credit', 'Settings'];

const mobileNavItems = [
  { label: 'Home', icon: '⌂' },
  { label: 'Cards', icon: '▬' },
  { label: 'Payments', icon: '⇄' },
  { label: 'Credit', icon: '↑' },
  { label: 'Profile', icon: '◯' },
];

const mobileActions = [
  { id: 'freeze', label: 'Freeze\ncard', icon: '❄' },
  { id: 'spend', label: 'Set spend\nlimit', icon: '◷' },
  { id: 'gpay', label: 'Add to\nGPay', icon: 'G' },
  { id: 'replace', label: 'Replace\ncard', icon: '↺' },
  { id: 'cancel', label: 'Cancel\ncard', icon: '⊟' },
];

function App() {
  const cardsState = useCards();
  const { cards, selectedCard } = cardsState;
  const transactions = selectedCard?.transactions ?? [];

  const [sheetExpanded, setSheetExpanded] = useState(false);
  const [cardDetailsOpen, setCardDetailsOpen] = useState(false);
  const [txOpen, setTxOpen] = useState(false);

  const dragStartY = useRef<number | null>(null);
  const isDragging = useRef(false);

  const onSheetPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    dragStartY.current = e.clientY;
    isDragging.current = false;
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const onSheetPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (dragStartY.current === null) return;
    if (Math.abs(e.clientY - dragStartY.current) > 8) isDragging.current = true;
  };

  const onSheetPointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (dragStartY.current === null) return;
    const delta = e.clientY - dragStartY.current;
    dragStartY.current = null;
    if (!isDragging.current || Math.abs(delta) < 30) return;
    setSheetExpanded(delta < 0);
  };

  const handleActionClick = (id: string) => {
    if (isDragging.current) return;
    if (id === 'freeze') cardsState.toggleCardFreeze();
  };

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
              <p className="balance-label">Available balance</p>
              <div className="balance-row">
                <span className="currency-pill">S$</span>
                <h2>{(cards.length * 3000).toLocaleString()}</h2>
              </div>
            </div>
            <button className="new-card-btn" type="button" onClick={cardsState.openAddCardModal}>
              + New card
            </button>
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
                      <small>
                        {new Date(tx.occurredAt).toLocaleDateString('en-GB', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric',
                        })}
                      </small>
                      <p>{tx.description}</p>
                    </div>
                    <span className={tx.amount >= 0 ? 'amount positive' : 'amount'}>
                      {tx.amount >= 0 ? '+' : '-'} S$ {Math.abs(tx.amount)}
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="no-tx">No transactions for this card.</p>
            )}
          </section>
        </aside>
      </main>

      {/* ── Mobile bottom sheet ── */}
      <div className={`mobile-sheet${sheetExpanded ? ' mobile-sheet--expanded' : ''}`}>
        {/* Drag handle zone */}
        <div
          className="mobile-sheet-drag"
          onPointerDown={onSheetPointerDown}
          onPointerMove={onSheetPointerMove}
          onPointerUp={onSheetPointerUp}
        >
          <div className="mobile-sheet-pill" />
        </div>

        {/* Action buttons */}
        <div className="mobile-actions">
          {mobileActions.map((action) => (
            <button
              key={action.id}
              type="button"
              className="mobile-action-btn"
              onClick={() => handleActionClick(action.id)}
            >
              <span className="mobile-action-circle">{action.icon}</span>
              <span className="mobile-action-label">{action.label}</span>
            </button>
          ))}
        </div>

        {/* Card details accordion */}
        <div className="sheet-accordion">
          <button
            type="button"
            className="sheet-accordion-header"
            onClick={() => setCardDetailsOpen((v) => !v)}
          >
            <span className="sheet-accordion-icon">📋</span>
            <span className="sheet-accordion-title">Card details</span>
            <span className={`sheet-accordion-chevron${cardDetailsOpen ? ' open' : ''}`}>⌄</span>
          </button>
          {cardDetailsOpen && selectedCard && (
            <div className="sheet-accordion-body">
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
          )}
        </div>

        {/* Recent transactions accordion */}
        <div className="sheet-accordion">
          <button
            type="button"
            className="sheet-accordion-header"
            onClick={() => setTxOpen((v) => !v)}
          >
            <span className="sheet-accordion-icon">⇄</span>
            <span className="sheet-accordion-title">Recent transactions</span>
            <span className={`sheet-accordion-chevron${txOpen ? ' open' : ''}`}>⌄</span>
          </button>
          {txOpen && (
            <div className="sheet-accordion-body">
              {transactions.length > 0 ? (
                <ul className="sheet-tx-list">
                  {transactions.map((tx) => (
                    <li key={tx.id} className="sheet-tx-item">
                      <div className="sheet-tx-avatar">💳</div>
                      <div className="sheet-tx-info">
                        <strong>{tx.merchant}</strong>
                        <small>
                          {new Date(tx.occurredAt).toLocaleDateString('en-GB', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric',
                          })}
                        </small>
                        <span className="sheet-tx-category">{tx.description}</span>
                      </div>
                      <span className={tx.amount >= 0 ? 'amount positive sheet-tx-amount' : 'amount sheet-tx-amount'}>
                        {tx.amount >= 0 ? '+' : '-'} S$ {Math.abs(tx.amount)}
                      </span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="no-tx">No transactions for this card.</p>
              )}
            </div>
          )}
        </div>
      </div>

      {/* ── Mobile bottom nav ── */}
      <nav className="mobile-bottom-nav">
        {mobileNavItems.map((item) => (
          <button key={item.label} className={`mobile-nav-item${item.label === 'Cards' ? ' active' : ''}`}>
            <span className="mobile-nav-icon">{item.icon}</span>
            <span>{item.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
}

export default App;
