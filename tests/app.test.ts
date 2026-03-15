import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { createApp } from '../src/app.js';
import { PRELOADED_CARDS, storageKey } from '../src/cards.js';

class StorageMock implements Storage {
  private readonly store = new Map<string, string>();

  get length(): number {
    return this.store.size;
  }

  clear(): void {
    this.store.clear();
  }

  getItem(key: string): string | null {
    return this.store.get(key) ?? null;
  }

  key(index: number): string | null {
    return [...this.store.keys()][index] ?? null;
  }

  removeItem(key: string): void {
    this.store.delete(key);
  }

  setItem(key: string, value: string): void {
    this.store.set(key, value);
  }
}

describe('createApp', () => {
  beforeEach(() => {
    document.body.innerHTML = '<main id="app"></main>';
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('startup renders preloaded cards', () => {
    const storage = new StorageMock();
    const root = document.querySelector<HTMLElement>('#app');

    expect(root).not.toBeNull();
    createApp(root!, storage);

    const list = document.querySelector('[data-testid="cards-list"]');
    expect(list?.querySelectorAll('li')).toHaveLength(PRELOADED_CARDS.length);
    expect(document.body.textContent).toContain(PRELOADED_CARDS[0].holderName);
    expect(document.body.textContent).toContain(PRELOADED_CARDS[1].holderName);
  });

  it('add-card modal creates a new card with generated fields', () => {
    vi.spyOn(Math, 'random').mockReturnValue(0.1);
    vi.spyOn(Date, 'now').mockReturnValue(123456789);

    const storage = new StorageMock();
    const root = document.querySelector<HTMLElement>('#app');

    createApp(root!, storage);
    const addButton = document.querySelector('button');
    addButton?.click();

    const modal = document.querySelector<HTMLElement>('[data-testid="add-card-modal"]');
    expect(modal?.hidden).toBe(false);

    const input = modal?.querySelector<HTMLInputElement>('input[aria-label="holder name"]');
    const createButton = modal?.querySelector<HTMLButtonElement>('button[type="submit"]');
    if (!input || !createButton) {
      throw new Error('Expected modal input and create button to exist');
    }

    input.value = 'Grace Hopper';
    createButton.click();

    expect(document.body.textContent).toContain('Grace Hopper');
    expect(document.body.textContent).toContain('1111 1111 1111 1111');
    expect(document.body.textContent).toContain('Exp 02/27');
  });

  it('freeze/unfreeze toggles card state and UI label', () => {
    const storage = new StorageMock();
    const root = document.querySelector<HTMLElement>('#app');

    createApp(root!, storage);

    const firstCardId = PRELOADED_CARDS[0].id;
    const toggleButton = document.querySelector<HTMLButtonElement>(
      `[data-testid='card-toggle-${firstCardId}']`
    );

    toggleButton?.click();

    const status = document.querySelector(`[data-testid='card-status-${firstCardId}']`);
    const refreshedToggle = document.querySelector<HTMLButtonElement>(
      `[data-testid='card-toggle-${firstCardId}']`
    );
    expect(status?.textContent).toBe('Frozen');
    expect(refreshedToggle?.textContent).toBe('Unfreeze card');

    refreshedToggle?.click();

    const statusAfter = document.querySelector(`[data-testid='card-status-${firstCardId}']`);
    const toggleAfter = document.querySelector<HTMLButtonElement>(
      `[data-testid='card-toggle-${firstCardId}']`
    );
    expect(statusAfter?.textContent).toBe('Active');
    expect(toggleAfter?.textContent).toBe('Freeze card');
  });

  it('persistence roundtrip via local storage mock', () => {
    const storage = new StorageMock();
    let root = document.querySelector<HTMLElement>('#app');

    createApp(root!, storage);

    const addButton = document.querySelector('button');
    addButton?.click();

    const modal = document.querySelector<HTMLElement>('[data-testid="add-card-modal"]');
    const input = modal?.querySelector<HTMLInputElement>('input[aria-label="holder name"]');
    const createButton = modal?.querySelector<HTMLButtonElement>('button[type="submit"]');

    if (!input || !createButton) {
      throw new Error('Expected modal input and create button to exist');
    }

    input.value = 'Persisted User';
    createButton.click();

    const saved = storage.getItem(storageKey);
    expect(saved).not.toBeNull();
    expect(saved).toContain('Persisted User');

    document.body.innerHTML = '<main id="app"></main>';
    root = document.querySelector<HTMLElement>('#app');
    createApp(root!, storage);

    expect(document.body.textContent).toContain('Persisted User');
  });
});
