import { Component, Input, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Category } from 'app/entities/category';
import { BaseComponent } from 'app/shared/global-core/base.component';

@Component({
  selector: 'app-category-name',
  templateUrl: './category-name.component.html',
  styleUrls: ['./category-name.component.scss']
})
export class CategoryNameComponent extends BaseComponent implements OnInit {

  @Input() id?: string;
  category$: Observable<Category | undefined> = of(undefined);
  constructor() {
    super();
  }

  ngOnInit() {
    this.category$ = this.Store?.CategoryStore.getById(this.id!.toString())!;
  }

}
