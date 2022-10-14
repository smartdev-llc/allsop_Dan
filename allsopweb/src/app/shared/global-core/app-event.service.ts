import { Injectable } from '@angular/core';
import { AppEvent } from 'app/interfaces/app-event';
import { MyBehaviorSubject } from 'app/utils/subjects';

@Injectable({
  providedIn: 'root'
})
export class AppEventService {
  AppEventBus: MyBehaviorSubject<AppEvent | undefined> = new MyBehaviorSubject<AppEvent | undefined>(undefined);
  constructor() { }
}
