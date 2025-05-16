import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SummaryComponent } from './components/summary/summary.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, SummaryComponent],
  template: `
    <app-summary></app-summary>
    <router-outlet></router-outlet>
  `
})
export class AppComponent {}
