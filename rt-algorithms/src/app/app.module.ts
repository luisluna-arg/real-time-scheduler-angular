/* Modules */
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Constants } from './utils/constants';
import { FormsModule } from '@angular/forms';

/* Routes */
import { APP_ROUTING } from './app.routes';

/* Services */
import { MusiciansService } from './services/musicians.service';

/* Components */

/* ** Shared */
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { DataTableComponent } from './components/shared/data-table/data-table.component';
import { ResultBoxComponent } from './components/shared/result-box/result-box.component';
import { InputBoxComponent } from './components/shared/input-box/input-box.component';

/* ** Autonomous */
import { AboutComponent } from './components/about/about.component';
import { HomeComponent } from './components/home/home.component';
import { EvolutionChartComponent } from './components/evolution-chart/evolution-chart.component';
import { AlgorithmsMainComponent } from './components/algorithms/algorithms-main/algorithms-main.component';
import { AlgorithmsResultComponent } from './components/algorithms/algorithms-result/algorithms-result.component';
import { SchedulingResultComponent } from './components/algorithms/scheduling-result/scheduling-result.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    AboutComponent,
    AlgorithmsMainComponent,
    ResultBoxComponent,
    InputBoxComponent,
    DataTableComponent,
    EvolutionChartComponent,
    AlgorithmsResultComponent,
    SchedulingResultComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    APP_ROUTING,
    Constants
  ],
  providers: [
    MusiciansService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }