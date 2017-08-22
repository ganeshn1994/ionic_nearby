import { Component } from '@angular/core';

import { CinemaPage } from '../cinema/cinema';
import { FunPage } from '../fun/fun';
import { FoodPage } from '../food/food';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = FoodPage;
  tab2Root = CinemaPage;
  tab3Root = FunPage;

  constructor() {

  }
}
