import { Component, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';
import { MySubject } from 'app/utils/subjects';
import { environment } from 'environments/environment';
import { Subject } from 'rxjs';

@Component({
  template: ''
})
export class UnSubableComponent implements OnDestroy, OnChanges {
  UnSub: Subject<void> = new Subject<void>();
  Env = environment;
  OnChanges$: MySubject<SimpleChanges> = new MySubject<SimpleChanges>();
  constructor() { }
  ngOnChanges(changes: SimpleChanges): void {
    this.OnChanges$.onChanged(changes);
  }

  ngOnDestroy(): void {
    this.UnSub.next();
    this.UnSub.complete();
  }
}
