import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-new-expense-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './new-expense-form.component.html',
  styleUrls: ['./new-expense-form.component.scss']
})
export class NewExpenseFormComponent {
  @Output() add = new EventEmitter<{ name: string; amount: number }>();
  @Output() closeModal = new EventEmitter<void>();

  name = '';
  amount = 0;

  submit() {
    if (!this.name.trim() || this.amount <= 0) {
      alert('Minden mező kötelező!');
      return;
    }

    this.add.emit({
      name: this.name.trim(),
      amount: this.amount
    });

    this.clearForm();
    this.closeModal.emit();
  }

  close() {
    this.closeModal.emit();
  }

  private clearForm() {
    this.name = '';
    this.amount = 0;
  }
}
