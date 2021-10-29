import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Bank } from '../../models/Bank';

@Injectable({
  providedIn: 'root'
})
export class BankService {

  endpoint = 'banks';
  apiUrl = 'https://brasilapi.com.br/api';

  constructor(private http: HttpClient) { }

  getAll(): Observable<Bank[]> {
    return this.http.get<Bank[]>(`${this.apiUrl}/${this.endpoint}/v1`);
  }

  getByCode(code: string): Observable<Bank> {
    return this.http.get<Bank>(`${this.apiUrl}/${this.endpoint}/v1/${code}`);
  }
}
