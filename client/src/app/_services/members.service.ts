import { Injectable } from '@angular/core';
import {HttpClient } from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Member} from '../_models/member'
import {of} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MembersService {
  baseUrl = environment.apiUrl;

  members: Member[] = [];


constructor(private http: HttpClient) {}
  getMembers()  {
  if (this.members.length >0) return of(this.members);
    return this.http.get<Member[]>(`${this.baseUrl}users/`).pipe(
      map(members => {
        this.members = members;
        return members;
      })
    )
  }

  getMember(userName: string) {
  const member = this.members.find(member => member.userName === userName);
  if (member !== undefined) return of(member);
  return this.http.get<Member>(`${this.baseUrl}users/${userName}`)
  }

  updateMember(member: Member) {
  return this.http.put(`${this.baseUrl}users`, member).pipe(
    map(() => {
      const idx = this.members.indexOf(member);
      this.members[idx] = member;
    })
  );
  }
}
