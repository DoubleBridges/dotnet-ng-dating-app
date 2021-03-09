import { Injectable } from '@angular/core';
import {HttpClient } from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Member} from '../_models/member'

@Injectable({
  providedIn: 'root'
})
export class MembersService {
  baseUrl = environment.apiUrl;


constructor(private http: HttpClient) {}
  getMembers()  {
    return this.http.get<Member[]>(`${this.baseUrl}users/`);
  }

  getMember(userName: string) {
  return this.http.get<Member>(`${this.baseUrl}users/${userName}`)
  }
}
