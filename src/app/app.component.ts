import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {PhotoListComponent } from './components/photo-list/photo-list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, PhotoListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'santander-technical-assessment';
}
