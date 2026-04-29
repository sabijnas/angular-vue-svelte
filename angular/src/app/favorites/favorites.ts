import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FavoritesService } from '../favorites.service';

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './favorites.html',
  styleUrls: ['./favorites.css'],
})
export class Favorites implements OnInit {
  private favoriteService = inject(FavoritesService);
  readonly favorites = this.favoriteService.favorites;

  ngOnInit() {
    this.favoriteService.loadFavorites();
  }

  removeFavorite(dogId: string) {
    this.favoriteService.removeFavorite(dogId);
  }
}
