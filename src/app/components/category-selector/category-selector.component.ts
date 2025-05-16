import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ExpenseService } from '../../services/expense.service';
import { Expense } from '../../models/expense';
import { NewExpenseFormComponent } from '../new-expense-form/new-expense-form.component';

@Component({
  selector: 'app-category-selector',
  standalone: true,
  imports: [CommonModule, FormsModule, NewExpenseFormComponent],
  templateUrl: './category-selector.component.html'
})
export class CategorySelectorComponent {
  categories = [
    { name: 'Étel', subcategories: ['Tejtermék', 'Zöldség', 'Gyümölcs'] },
    { name: 'Szórakozás', subcategories: ['Kikapcsolódás', 'Játék', 'Zene'] },
    { name: 'Lakhatás', subcategories: ['Bérlet', 'Rezsi', 'Karbantartás'] },
    { name: 'Bevétel', subcategories: ['Munkahely', 'Maszek', 'Egyéb'] }
  ];

  selectedCategory = this.categories[0].name;
  selectedSubcategory = this.categories[0].subcategories[0];

  filteredExpenses: Expense[] = [];
  showModal = false;

  constructor(private expenseService: ExpenseService) {
    this.updateFilteredExpenses();
  }

  getSubcategories(): string[] {
    const found = this.categories.find(c => c.name === this.selectedCategory);
    return found ? found.subcategories : [];
  }

  onCategoryChange() {
    this.selectedSubcategory = this.getSubcategories()[0];
    this.updateFilteredExpenses();
  }

  updateFilteredExpenses() {
    this.filteredExpenses = this.expenseService.getAll().filter(
      e => e.category === this.selectedCategory && e.subcategory === this.selectedSubcategory
    );
  }

  handleAdd(data: { name: string; amount: number }) {
    this.expenseService.add({
      // id is removed as it is not allowed in the type
      category: this.selectedCategory,
      subcategory: this.selectedSubcategory,
      name: data.name,
      amount: data.amount
    });
    this.updateFilteredExpenses();
    this.showModal = false;
  }

  removeExpense(id: number) {
    this.expenseService.remove(id);
    this.updateFilteredExpenses();
  }
}
