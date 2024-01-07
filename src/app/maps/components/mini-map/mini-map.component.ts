import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import * as MapTiler from '@maptiler/sdk';



@Component({
  selector: 'maps-mini-map',
  templateUrl: './mini-map.component.html',
  styleUrls: ['./mini-map.component.css']
})
export class MiniMapComponent {

  @Input()
  public lngLat?: [number, number]

  public map: MapTiler.Map | undefined;
  @ViewChild('map')
  private mapContainer?: ElementRef<HTMLElement>;

  ngAfterViewInit(): void {
    if(!this.mapContainer) throw new Error('El elemento HTML  no fue encontrado');
    if(!this.lngLat) throw 'Las coordenadas son necesarias'

    const initialState = { zoom: 13 };

    this.map = new MapTiler.Map({
      container: this.mapContainer.nativeElement,
      style: MapTiler.MapStyle.STREETS,
      center: this.lngLat,
      zoom: initialState.zoom
    });

    new MapTiler.Marker({
      color: "#FF0000",
      // element: markerHtml
    })
      .setLngLat(this.lngLat)
      .addTo(this.map);
  }

  ngOnDestroy(): void {
    this.map?.remove();
  }
}
