import { Injectable, signal } from "@angular/core";
import { DogService } from "./dog.service";

@Injectable({ providedIn: 'root' })
export class FavoritesService {
    readonly favorites = signal<any[]>([])

    constructor(private dogService: DogService) {
        this.loadFavorites();
    }

    loadFavorites() {
        this.dogService.getFavorites().subscribe(data => {
            this.favorites.set(data);
        });
    }

    addFavorite(dog: any) {
        const dogId = String(dog.id);

        if (!this.favorites().some(fav => String(fav.dogId ?? fav.id) === dogId)) {
            this.dogService.addFavorite({ ...dog, dogId }).subscribe((createdFavorite) => {
                this.favorites.update(favs => [...favs, createdFavorite]);
            })
        }
    }

    removeFavorite(dogId: string) {
        this.dogService.removeFavorite(dogId).subscribe(() => {
            this.favorites.update(favs => favs.filter(fav => String(fav.id) !== String(dogId)));
        });
    }
}