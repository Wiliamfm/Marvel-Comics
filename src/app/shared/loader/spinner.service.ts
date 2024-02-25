import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {
  private readonly spinnerSubject = new Subject<boolean>();

  constructor() { }

  open(){
    this.spinnerSubject.next(true);
  }

  close(){
    this.spinnerSubject.next(false);
  }

  getObservable(){
    return this.spinnerSubject.asObservable();
  }
}
