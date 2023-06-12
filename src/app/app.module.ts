import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule} from '@angular/router';

import { AppComponent } from './app.component';
import { OverviewComponent } from './views/overview/overview.component';
import { EventDisplayComponent } from './components/event-display/event-display.component';
import { SubcriptionModalComponent } from './components/subscription-modal/subcription-modal.component';
import { EventFormComponent } from './views/event-form/event-form.component';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import {MatExpansionModule} from "@angular/material/expansion";
import {MatSidenavModule} from '@angular/material/sidenav';
import {CdkAccordionModule} from "@angular/cdk/accordion";
import {MatToolbarModule} from "@angular/material/toolbar";
import {HttpClientModule} from "@angular/common/http";
import { UserSettingsComponent } from './views/user-settings/user-settings.component';
import { GroupsComponent } from './views/groups/groups.component';
import { IndexComponent } from './views/index/index.component';
import { CreateEventModalComponent } from './components/create-event-modal/create-event-modal.component';
import { GroupDisplayComponent } from './components/group-display/group-display.component';
import { EditGroupModalComponent } from './components/edit-group-modal/edit-group-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    OverviewComponent,
    SubcriptionModalComponent,
    EventDisplayComponent,
    EventFormComponent,
    UserSettingsComponent,
    GroupsComponent,
    IndexComponent,
    CreateEventModalComponent,
    GroupDisplayComponent,
    EditGroupModalComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      {path: "", redirectTo: "index", pathMatch: "full"},
      {path: "index", component: IndexComponent},
      {path: "events", component: OverviewComponent},
      {path: "settings",component: UserSettingsComponent},
      {path: "groups",component:GroupsComponent},
      {path: "form", component: EventFormComponent}
    ]),
    HttpClientModule,
    NoopAnimationsModule,
    MatExpansionModule,
    CdkAccordionModule,
    MatToolbarModule,
    MatSidenavModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
