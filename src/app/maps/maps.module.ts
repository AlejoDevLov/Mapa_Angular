import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapsRoutingModule } from './maps-routing.module';
import { MiniMapComponent } from './components/mini-map/mini-map.component';
import { SideMenuComponent } from '../alone/components/side-menu/side-menu.component';
import { MapsLayoutComponent } from './layout/maps-layout/maps-layout.component';
import { FullScreenPageComponent } from './pages/full-screen-page/full-screen-page.component';
import { MarkerPageComponent } from './pages/marker-page/marker-page.component';
import { PropertiesPageComponent } from './pages/properties-page/properties-page.component';
import { ZoomRangePageComponent } from './pages/zoom-range-page/zoom-range-page.component';

import { config } from '@maptiler/sdk';
import { environment } from 'src/environments/environment';
import { CounterAloneComponent } from '../alone/components/counter-alone/counter-alone.component';
config.apiKey = environment.API_KEY;



@NgModule({
  declarations: [
    FullScreenPageComponent,
    MapsLayoutComponent,
    MarkerPageComponent,
    MiniMapComponent,
    PropertiesPageComponent,
    ZoomRangePageComponent
  ],
  imports: [
    CommonModule,
    CounterAloneComponent,
    MapsRoutingModule,
    SideMenuComponent,
  ]
})
export class MapsModule { }
