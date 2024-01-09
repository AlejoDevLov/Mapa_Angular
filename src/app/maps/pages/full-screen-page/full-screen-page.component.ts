import { Component, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';

// import { Map, MapStyle, config } from '@maptiler/sdk';
import * as MapTiler from '@maptiler/sdk';

// import '@maptiler/sdk/dist/maptiler-sdk.css';


@Component({
  selector: 'map-full-screen-page',
  templateUrl: './full-screen-page.component.html',
  styleUrls: ['./full-screen-page.component.css']
})
export class FullScreenPageComponent implements OnDestroy, AfterViewInit {

  public map: MapTiler.Map | undefined;
  @ViewChild('map')
  private mapContainer?: ElementRef<HTMLElement>;
  ngAfterViewInit(): void {
    const initialState = { lng: -75.5708, lat: 6.2457, zoom: 14 };

    if(!this.mapContainer) throw new Error('El elemento HTML  no fue encontrado');

    this.map = new MapTiler.Map({
      container: this.mapContainer.nativeElement,
      style: MapTiler.MapStyle.STREETS,
      center: [initialState.lng, initialState.lat],
      zoom: initialState.zoom
    });
  }

  ngOnDestroy(): void {
    this.map?.remove();
  }

}
