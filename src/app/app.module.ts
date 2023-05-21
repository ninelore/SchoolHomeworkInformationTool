import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule} from '@angular/router';

import { AppComponent } from './app.component';
import { TestComponent } from './test/test.component';
import { AngularComponent } from './angular/angular.component';

@NgModule({
  declarations: [
    AppComponent,
    TestComponent,
    AngularComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      {path: "test", component: TestComponent},
      {path: "angular", component: AngularComponent},
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
