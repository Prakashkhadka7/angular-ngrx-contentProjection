import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CommonserviceService {
  // searchTerm!: string;
  filteredUsers$!: Observable<any>;

  constructor() {}
}
