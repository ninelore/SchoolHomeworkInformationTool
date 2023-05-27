import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule} from '@angular/router';

import { AppComponent } from './app.component';
import { OverviewComponent } from './views/overview/overview.component';
import { TestComponent } from './views/test/test.component';
import { EventDisplayComponent } from './components/event-display/event-display.component';
import { EventFormComponent } from './views/event-form/event-form.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import {MatExpansionModule} from "@angular/material/expansion";
import {CdkAccordionModule} from "@angular/cdk/accordion";
import {MatToolbarModule} from "@angular/material/toolbar";
import {HttpClientModule} from "@angular/common/http";

@NgModule({
  declarations: [
    AppComponent,
    OverviewComponent,
    TestComponent,
    EventDisplayComponent,
    EventFormComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      {path: "test", component: TestComponent},
      {path: "list", component: OverviewComponent},
      {path: "form", component: EventFormComponent}
    ]),
    HttpClientModule,
    NoopAnimationsModule,
    MatExpansionModule,
    CdkAccordionModule,
    MatToolbarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
