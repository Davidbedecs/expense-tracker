import { Injectable } from '@angular/core';
import { Expense } from '../models/expense';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ExpenseService {
  private storageKey = 'expenses';
  private expenses: Expense[] = [];

  expenses$ = new BehaviorSubject<Expense[]>([]);

  // Omit<Expense, 'id' | 'dateAdded'> típusú alap tételek
  private defaultExpenses: Omit<Expense, 'id' | 'dateAdded'>[] = [
    { name: 'Sajt', amount: 700, category: 'Étel', subcategory: 'Tejtermék' },
    { name: 'Uborka', amount: 300, category: 'Étel', subcategory: 'Zöldség' },
    { name: 'Alma', amount: 250, category: 'Étel', subcategory: 'Gyümölcs' },

    { name: 'Spotify', amount: 3000, category: 'Szórakozás', subcategory: 'Zene' },
    { name: 'Játék vétel', amount: 8000, category: 'Szórakozás', subcategory: 'Játék' },
    { name: 'Mozi jegy', amount: 2500, category: 'Szórakozás', subcategory: 'Kikapcsolódás' },

    { name: 'Villanyszámla', amount: 12000, category: 'Lakhatás', subcategory: 'Rezsi' },
    { name: 'Bérleti díj', amount: 80000, category: 'Lakhatás', subcategory: 'Bérlet' },
    { name: 'Karbantartás', amount: 10000, category: 'Lakhatás', subcategory: 'Karbantartás' },

    { name: 'Munkabér', amount: 300000, category: 'Bevétel', subcategory: 'Munkahely' }
  ];

  constructor() {
    const stored = localStorage.getItem(this.storageKey);
    if (stored) {
      this.expenses = JSON.parse(stored);
    } else {
      this.expenses = this.defaultExpenses.map(e => ({
        ...e,
        id: Date.now() + Math.floor(Math.random() * 10000),
        dateAdded: new Date().toISOString()
      }));
      this.saveExpenses();
    }

    this.expenses$.next(this.expenses);
  }

  getAll(): Expense[] {
    return [...this.expenses];
  }

  // 💡 Új termék hozzáadása — automatikus id + dátum
  add(expense: Omit<Expense, 'id' | 'dateAdded'>) {
    const newExpense: Expense = {
      ...expense,
      id: Date.now() + Math.floor(Math.random() * 10000),
      dateAdded: new Date().toISOString()
    };
    this.expenses.push(newExpense);
    this.saveExpenses();
    this.expenses$.next(this.expenses);
  }

  remove(id: number) {
    this.expenses = this.expenses.filter(e => e.id !== id);
    this.saveExpenses();
    this.expenses$.next(this.expenses);
  }

  clearAll() {
    this.expenses = [];
    this.saveExpenses();
    this.expenses$.next(this.expenses);
  }

  private saveExpenses() {
    localStorage.setItem(this.storageKey, JSON.stringify(this.expenses));
  }
}
