import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule} from '@angular/router';

import { AppComponent } from './app.component';
import { OverviewComponent } from './views/overview/overview.component';
import { TestComponent } from './test/test.component';
import { EventDisplayComponent } from './components/event-display/event-display.component';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    OverviewComponent,
    LoginComponent,
    TestComponent,
    EventDisplayComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      {path: "test", component: TestComponent},
      {path: "login", component: LoginComponent},
      {path:"list", component: OverviewComponent}
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
