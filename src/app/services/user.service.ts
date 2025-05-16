import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class UserService {
  username = signal<string>(localStorage.getItem('username') || 'Vendég');

  setUsername(name: string) {
    this.username.set(name);
    localStorage.setItem('username', name);
  }

  clearUsername() {
    this.username.set('Vendég');
    localStorage.removeItem('username');
  }
}
