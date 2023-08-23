import { Component, OnInit } from '@angular/core';
import {
  Observable,
  debounceTime,
  distinct,
  distinctUntilChanged,
  filter,
  map,
  startWith,
  switchMap,
} from 'rxjs';
import { FetchUsersService } from '../services/fetch-users.service';
import { FormControl } from '@angular/forms';

export interface User {
  id: string;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: number;
    geo: {
      lat: number;
      lng: number;
    };
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
}

@Component({
  selector: 'app-auto-complete',
  templateUrl: './auto-complete.component.html',
  styleUrls: ['./auto-complete.component.css'],
})
export class AutoCompleteComponent implements OnInit {
  searchInput = new FormControl();
  options: User[] = [];
  users!: Observable<User[]>;

  constructor(private service: FetchUsersService) {}

  ngOnInit(): void {
    this.users = this.searchInput.valueChanges.pipe(
      startWith(''),
      debounceTime(200),
      map((inputValue) => this.fetch(inputValue || ''))
    );
  }

  fetch(inputValue: string): User[] {
    this.service.fetchUsers().subscribe((data) => (this.options = data));
    return this.options.filter((val) =>
      val.name.toLowerCase().includes(inputValue.toLowerCase())
    );
  }
}
