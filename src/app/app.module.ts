import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ConfirmOrderComponent} from './components/confirm-order/confirm-order.component'
import { NavBarComponent} from './components/nav-bar/nav-bar.component'
import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';

@NgModule({
  imports:      [ BrowserModule, FormsModule, ReactiveFormsModule ],
  declarations: [ AppComponent, HelloComponent, NavBarComponent, ConfirmOrderComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
