import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ListService } from '../../services/list.service';
import { ExpenseService } from '../../services/expense.service';
import { NamedList } from '../../models/named-list';
import { Expense } from '../../models/expense';

@Component({
  selector: 'app-expense-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './expense-list.component.html',
  styleUrls: ['./expense-list.component.scss']
})
export class ExpenseListComponent {
  lists: NamedList[] = [];
  selectedListId: number | null = null;
  selectedListItems: (Expense & { quantity: number })[] = [];
  availableItems: Expense[] = [];
  selectedItemName: string = '';
  selectedItemQuantity: number = 1;
  newListName = '';

  constructor(
    private listService: ListService,
    private expenseService: ExpenseService
  ) {
    this.loadLists();
  }

  loadLists() {
    this.lists = this.listService.getAll();
  }

  addList() {
    if (!this.newListName.trim()) {
      alert('Lista neve kötelező!');
      return;
    }

    this.listService.addList(this.newListName.trim());
    this.newListName = '';
    this.loadLists();
  }

  selectList(id: number) {
    this.selectedListId = id;
    const list = this.listService.getListById(id);
    const allExpenses = this.expenseService.getAll();

    this.selectedListItems = list?.items.map(item => {
      const found = allExpenses.find(e => e.id === item.id);
      return {
        ...found!,
        quantity: item.quantity
      };
    }) ?? [];

    this.availableItems = allExpenses;
    this.selectedItemName = '';
    this.selectedItemQuantity = 1;
  }

  addItemByName() {
    if (!this.selectedListId || !this.selectedItemName || this.selectedItemQuantity <= 0) return;

    const item = this.availableItems.find(
      e => e.name.toLowerCase() === this.selectedItemName.toLowerCase()
    );
    if (!item) {
      alert('Nincs ilyen nevű termék!');
      return;
    }

    this.listService.addItemToList(this.selectedListId, item.id, this.selectedItemQuantity);
    this.selectList(this.selectedListId);
    this.selectedItemName = '';
    this.selectedItemQuantity = 1;
  }

  removeItemFromSelectedList(itemId: number) {
    if (!this.selectedListId) return;

    this.listService.removeItemFromList(this.selectedListId, itemId);
    this.selectList(this.selectedListId);
  }

  getTotal(): number {
    return this.selectedListItems.reduce((acc, e) => {
      const sign = e.category === 'Bevétel' ? 1 : -1;
      return acc + sign * e.amount * (e.quantity ?? 1);
    }, 0);
  }

  deleteSelectedList() {
    if (!this.selectedListId) return;

    const confirmDelete = confirm('Biztosan törölni szeretnéd ezt a listát?');
    if (confirmDelete) {
      this.listService.deleteList(this.selectedListId);
      this.selectedListId = null;
      this.selectedListItems = [];
      this.loadLists();
    }
  }
}
