import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-summary',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss']
})
export class SummaryComponent {
  private router = inject(Router);
  private userService = inject(UserService);

  username = this.userService.username;

  logout() {
    this.userService.clearUsername();
    this.router.navigateByUrl('/');
  }
}
