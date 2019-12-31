/* Modules */
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Constants } from './utils/constants';

/* Routes */
import { APP_ROUTING } from './app.routes';

/* Services */
import { MusiciansService } from './services/musicians.service';

/* Components */
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { AlgorithmsComponent } from './components/algorithms/algorithms.component';
import { ResultBoxComponent } from './components/shared/result-box/result-box.component';
import { FormsModule } from '@angular/forms';
import { InputBoxComponent } from './components/shared/input-box/input-box.component';
import { DataTableComponent } from './components/shared/data-table/data-table.component';
import { EvolutionChartComponent } from './components/evolution-chart/evolution-chart.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    AboutComponent,
    AlgorithmsComponent,
    ResultBoxComponent,
    InputBoxComponent,
    DataTableComponent,
    EvolutionChartComponent,
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