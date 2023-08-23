import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../auto-complete/auto-complete.component';

@Injectable({
  providedIn: 'root',
})
export class FetchUsersService {
  url: string = 'https://jsonplaceholder.typicode.com/users';
  constructor(private http: HttpClient) {}

  fetchUsers() {
    return this.http.get<User[]>(this.url);
  }
}
