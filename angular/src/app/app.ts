import { Component, signal, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DogService } from './dog.service';
import { FavoritesService } from './favorites.service';
import { Favorites } from "./favorites/favorites";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, Favorites],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})

export class App {
protected readonly title = signal('angular');
protected readonly dogs = signal<any[]>([]);
get favorites() {
  return this.favoriteService.favorites();
}

constructor(private dogService: DogService,
  public favoriteService: FavoritesService) {
  
    effect(() => {
      this.dogService.getDogs().subscribe(data => {
        this.dogs.set(data);
      });
    });
}

addToFavorites(dog: any) {
  this.favoriteService.addFavorite(dog);
}
 
isFavorite(id: any) {
  return this.favoriteService.favorites().some((f: any) => String(f.dogId ?? f.id) === String(id));
}
}