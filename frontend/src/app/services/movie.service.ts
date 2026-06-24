import { computed, Injectable, signal } from '@angular/core';
import { environment } from '../envoriments/enviroment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CT_movie, DTO_Movie } from '../models/CT_Movie.class';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  urlApi = environment.urlApiBackend + 'Movie'

  constructor(private http: HttpClient) {
    this.getAll();
  }

  moviestable = computed(() => {
    return this.allMovies().map(q => {
      const [hour, minutes, seconds] = q.duration.split(':').map(q => parseFloat(q));

      const durationNumber = (hour * 3600) + (minutes * 60) + seconds;
      let releseDateObj = new Date(q.releasedate);
      releseDateObj.setDate(releseDateObj.getDate() + 1);
      return {
        ...q,
        durationNumber,
        releseDateObj
      }
    })
  })
  genders = computed(() => {
    return [... new Set(this.allMovies().map(q => q.gender))]
  });
  directors = computed(() => {
    return [... new Set(this.allMovies().map(q => q.director && q.director.name))]
  });

  loadingMovies = signal<boolean>(true);
  allMovies = signal<CT_movie[]>([]);
  getAll() {
    this.loadingMovies.set(true);
    const httpOptions = {
      headers: new HttpHeaders({
        'Accept': '*/*'
      }),
    };
    this.http.get<{ message: string, data: CT_movie[] | null }>(`${this.urlApi}/get-movies-director`).subscribe(res => {
      this.loadingMovies.set(false);
      this.allMovies.set(res.data ?? []);
    }, error => {
      this.loadingMovies.set(false);
      this.allMovies.set([]);
      let messageError = (error.error) ? error.error.message : error.message;
      console.error('Error on getting all users', error);
    })
  }
}
