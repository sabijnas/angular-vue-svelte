import { Component, signal, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DogService } from './dog.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})

export class App {
protected readonly title = signal('angular');
protected readonly dogs = signal<any[]>([]);

private readonly dogService = inject(DogService);

constructor() {
  this.dogService.getDogs().subscribe((d) => this.dogs.set(d));
}
}
