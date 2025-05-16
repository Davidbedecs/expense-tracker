import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html'
})
export class LoginComponent {
  username = '';
  password = '';

  constructor(private router: Router, private userService: UserService) {}

  login() {
    if (!this.username.trim() || !this.password.trim()) {
      alert('Kérlek, tölts ki minden mezőt!');
      return;
    }

    this.userService.setUsername(this.username.trim());
    this.router.navigate(['/categories']);
  }
}
