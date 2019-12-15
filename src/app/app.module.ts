import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { FilterComponent } from './filter/filter.component';

import { FormsModule }   from '@angular/forms';
import { Filtration } from './service/filtration.service';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';

@NgModule({
  declarations: [
    AppComponent,
    FilterComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    NgMultiSelectDropDownModule
  ],
  providers: [Filtration],
  bootstrap: [AppComponent]
})
export class AppModule { }
