import { Injectable } from '@angular/core';
import { NamedList } from '../models/named-list';

@Injectable({ providedIn: 'root' })
export class ListService {
  private storageKey = 'namedLists';
  private lists: NamedList[] = this.load();

  private load(): NamedList[] {
    const raw = localStorage.getItem(this.storageKey);
    return raw ? JSON.parse(raw) : [];
  }

  private save() {
    localStorage.setItem(this.storageKey, JSON.stringify(this.lists));
  }

  constructor() {
    const raw = localStorage.getItem(this.storageKey);
    this.lists = raw ? JSON.parse(raw) : [];

    // 🟢 Automatikus "05.01" minta lista létrehozása, ha még nincs
    if (!this.lists.find(l => l.name === '05.01')) {
      const allExpensesRaw = localStorage.getItem('expenses');
      const allExpenses = allExpensesRaw ? JSON.parse(allExpensesRaw) : [];

      const items = allExpenses.map((e: any) => ({
        id: e.id,
        quantity: 1
      }));

      this.lists.push({
        id: Date.now() + 999,
        name: '05.01',
        items: items
      });

      this.save();
    }
  }

  getAll(): NamedList[] {
    return [...this.lists];
  }

  getListById(id: number): NamedList | undefined {
    return this.lists.find(list => list.id === id);
  }

  addList(name: string): NamedList {
    const newList: NamedList = {
      id: Date.now(),
      name,
      items: []
    };
    this.lists.push(newList);
    this.save();
    return newList;
  }

  deleteList(id: number): void {
    this.lists = this.lists.filter(list => list.id !== id);
    this.save();
  }

  addItemToList(listId: number, itemId: number, quantity: number): void {
    const list = this.lists.find(l => l.id === listId);
    if (!list) return;

    const existing = list.items.find(item => item.id === itemId);
    if (existing) {
      existing.quantity += quantity;
    } else {
      list.items.push({ id: itemId, quantity });
    }

    this.save();
  }

  removeItemFromList(listId: number, itemId: number): void {
    const list = this.lists.find(l => l.id === listId);
    if (!list) return;

    list.items = list.items.filter(item => item.id !== itemId);
    this.save();
  }
}
