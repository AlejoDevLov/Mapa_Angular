import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';

// import { Map, MapStyle, config } from '@maptiler/sdk';
import * as MapTiler from '@maptiler/sdk';

// import '@maptiler/sdk/dist/maptiler-sdk.css';
import { environment } from 'src/environments/environment';



@Component({
  selector: 'map-full-screen-page',
  templateUrl: './full-screen-page.component.html',
  styleUrls: ['./full-screen-page.component.css']
})
export class FullScreenPageComponent implements OnInit, OnDestroy, AfterViewInit {

  public map: MapTiler.Map | undefined;
  @ViewChild('map')
  private mapContainer!: ElementRef<HTMLElement>;

  ngOnInit(): void {
    MapTiler.config.apiKey = environment.API_KEY;
  }

  ngAfterViewInit(): void {
    const initialState = { lng: 139.753, lat: 35.6844, zoom: 14 };

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
