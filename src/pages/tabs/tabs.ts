import { Component } from '@angular/core';

import { HomePage } from '../home/home';
import { TagsPage } from '../tags/tags';
import { ConfigPage } from '../config/config';


@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = TagsPage;
  tab3Root = ConfigPage;

  constructor() {

  }
}
