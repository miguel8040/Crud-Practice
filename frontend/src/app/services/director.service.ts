import { computed, Injectable, signal } from '@angular/core';
import { environment } from '../envoriments/enviroment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CT_Director } from '../models/CT_Director.class';
import { PrimeIcons } from 'primeng/api';


@Injectable({
  providedIn: 'root',
})
export class DirectorService {
  urlApi = environment.urlApiBackend + 'Director'

  constructor(private http: HttpClient) {
    this.getAll();
  }

  nationalities = computed(() => {
    return [... new Set(this.allDirectors().map(q => q.nationality))]
  });

  loadingDirectors = signal<boolean>(true);
  allDirectors = signal<CT_Director[]>([]);
  getAll() {
    this.loadingDirectors.set(true);
    const httpOptions = {
      headers: new HttpHeaders({
        'Accept': '*/*'
      }),
    };
    this.http.get<{ message: string, data: CT_Director[] | null }>(`${this.urlApi}`).subscribe(res => {
      this.loadingDirectors.set(false);
      this.allDirectors.set(res.data ?? []);
    }, error => {
      this.loadingDirectors.set(false);
      this.allDirectors.set([]);
      let messageError = (error.error) ? error.error.message : error.message;
      console.error('Error on getting all users', error);
    })
  }

  //#region post New ----------
  post(director: CT_Director): Promise<{ message: string, status: boolean, data: CT_Director | null }> {
    return new Promise<{ message: string, status: boolean, data: CT_Director | null }>((resolve) => {
      const httpOptions = {
        headers: new HttpHeaders({
          'Accept': '*/*'
        }),
      };
      this.http.post<{ message: string, data: CT_Director | null }>(`${this.urlApi}`, director, httpOptions).subscribe(res => {
        if (res.data) this.getAll();
        resolve({ status: true, message: 'Ok', data: res.data })
      }, error => {
        let messageError = (error.error) ? error.error.message : 'Server error, please contact technical support.';
        resolve({ status: false, message: messageError, data: null });
        console.error('Error to save new dierctor')
      })
    })
  }
  //#endregion
  //#region post New ----------
  put(director: CT_Director): Promise<{ message: string, status: boolean, data: CT_Director | null }> {
    return new Promise<{ message: string, status: boolean, data: CT_Director | null }>((resolve) => {
      const httpOptions = {
        headers: new HttpHeaders({
          'Accept': '*/*'
        }),
      };
      this.http.put<{ message: string, data: CT_Director | null }>(`${this.urlApi}/${director.pkDirector}`, director, httpOptions).subscribe(res => {
        if (res.data) this.getAll();
        resolve({ status: true, message: 'Ok', data: res.data })
      }, error => {
        let messageError = (error.error) ? error.error.message : 'Server error, please contact technical support.';
        resolve({ status: false, message: messageError, data: null });
        console.error('Error to update dierctor')
      })
    })
  }
  //#endregion

  //#region   Delete -----
  delete(pkDirector: number): Promise<{ message: string, status: boolean, data: CT_Director | null }> {
    return new Promise<{ message: string, status: boolean, data: CT_Director | null }>((resolve) => {
      const httpOptions = {
        headers: new HttpHeaders({
          'Accept': '*/*'
        }),
      };
      this.http.delete<{ message: string, data: CT_Director | null }>(`${this.urlApi}/${pkDirector}`, httpOptions).subscribe(res => {
        this.getAll();
        resolve({ status: true, message: 'Ok', data: res.data })
      }, error => {
        let messageError = (error.error) ? error.error.message : 'Server error, please contact technical support.';
        resolve({ status: false, message: messageError, data: null });
        console.error('Error to delete dierctor')
      })
    })
  }
  //#endregion
}
