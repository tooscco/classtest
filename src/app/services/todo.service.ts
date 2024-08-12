import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor() { }

  public getTodo(){
    return JSON.parse (localStorage.getItem('todoapp') || '[]');
  }


}
