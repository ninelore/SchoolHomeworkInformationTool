import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule} from '@angular/router';

import { AppComponent } from './app.component';
import { OverviewComponent } from './views/overview/overview.component';
import { TestComponent } from './test/test.component';
import { EventDisplayComponent } from './components/event-display/event-display.component';

@NgModule({
  declarations: [
    AppComponent,
    OverviewComponent,
    TestComponent,
    EventDisplayComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      {path:"list", component: OverviewComponent},
      {path: "test", component: TestComponent}
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
