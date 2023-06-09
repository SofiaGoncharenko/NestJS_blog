import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CategoryModel } from 'src/app/models/category.model';
import { UserModel } from 'src/app/models/user.model';
import { authorsSimpleSelector } from 'src/app/ngrx/selectors/author.selectors';
import { categoriesSimpleSelector } from 'src/app/ngrx/selectors/category.selectors';

import { isLoggedInSelector, userSelector } from '../../auth/state/auth.selectors';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutComponent implements OnInit {
  isCollapsed = !true;
  user$: Observable<UserModel>;
  isLoggedIn$: Observable<boolean>;
  categories$: Observable<CategoryModel[]>;
  authors$: Observable<UserModel[]>;

  constructor(private readonly store: Store<any>) {}

  ngOnInit() {
    this.user$ = this.store.select(userSelector);
    this.isLoggedIn$ = this.store.select(isLoggedInSelector);
    this.categories$ = this.store.select(categoriesSimpleSelector);
    this.authors$ = this.store.select(authorsSimpleSelector);
  }

  toggleSideBar(): void {
    this.isCollapsed = !this.isCollapsed;
  }
}
