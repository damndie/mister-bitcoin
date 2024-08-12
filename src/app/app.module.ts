import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app-root/app.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { ContactPageComponent } from './pages/contact-page/contact-page.component';
import { ContactDetailsPageComponent } from './pages/contact-details-page/contact-details-page.component';
import { StatisticPageComponent } from './pages/statistic-page/statistic-page.component';
import { provideHttpClient } from '@angular/common/http';
import { ContactListComponent } from './components/contact-list/contact-list.component';
import { ContactPreviewComponent } from './components/contact-preview/contact-preview.component';
import { ContactFilterComponent } from './components/contact-filter/contact-filter.component';
import { ChartComponent } from './components/chart/chart.component';
import { AppHeaderComponent } from './components/app-header/app-header.component';
import { AgCharts } from 'ag-charts-angular';
import { FormsModule } from '@angular/forms';
import { ContactEditComponent } from './components/contact-edit/contact-edit.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    ContactPageComponent,
    ContactDetailsPageComponent,
    StatisticPageComponent,
    ContactListComponent,
    ContactPreviewComponent,
    ContactFilterComponent,
    ChartComponent,
    AppHeaderComponent,
    ContactEditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AgCharts,
    FormsModule,
    NgxChartsModule
  ],
  providers: [provideHttpClient()],
  bootstrap: [AppComponent]
})
export class AppModule { }
