import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule} from '@angular/router';

import { AppComponent } from './app.component';
import { OverviewComponent } from './views/overview/overview.component';
import { TestComponent } from './views/test/test.component';
import { EventDisplayComponent } from './components/event-display/event-display.component';
import { LoginComponent } from './views/login/login.component';
import { EventFormComponent } from './views/event-form/event-form.component';

@NgModule({
  declarations: [
    AppComponent,
    OverviewComponent,
    LoginComponent,
    TestComponent,
    EventDisplayComponent,
    EventFormComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      {path: "test", component: TestComponent},
      {path: "login", component: LoginComponent},
      {path: "list", component: OverviewComponent},
      {path: "form", component: EventFormComponent}
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
