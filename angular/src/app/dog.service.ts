import { inject, Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";


@Injectable({
    providedIn: 'root'
})

export class DogService {
    private apiUrl = "http://localhost:3000/dogs";
    private http = inject(HttpClient);

    getDogs(): Observable<any[]> {
        return this.http.get<any[]>(this.apiUrl);
    }

    addFavorite(dog: any): Observable<any> {
        return this.http.post("http://localhost:3000/favorites", dog)
    } 

    getFavorites(): Observable<any[]> {
        return this.http.get<any[]>("http://localhost:3000/favorites");
    }

    removeFavorite(dogId: string): Observable<any> {
        return this.http.delete(`http://localhost:3000/favorites/${dogId}`)
    }
}