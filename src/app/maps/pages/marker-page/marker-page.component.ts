import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import * as MapTiler from '@maptiler/sdk';
import { LngLat, Marker } from 'maplibre-gl';


interface MarkerAndColor {
  color: string,
  marker: Marker
}

@Component({
  selector: 'app-marker-page',
  templateUrl: './marker-page.component.html',
  styleUrls: ['./marker-page.component.css']
})
export class MarkerPageComponent implements AfterViewInit, OnDestroy {

  public map: MapTiler.Map | undefined;
  @ViewChild('map')
  private mapContainer?: ElementRef<HTMLElement>;
  public zoom: number = 14;
  public lngLat: [number, number] = [-75.5708,6.2457];
  public markers: MarkerAndColor[] = []

  ngAfterViewInit(): void {
    const initialState = { zoom: 14 };

    if(!this.mapContainer) throw new Error('El elemento HTML  no fue encontrado');

    this.map = new MapTiler.Map({
      container: this.mapContainer.nativeElement,
      style: MapTiler.MapStyle.STREETS,
      center: [-75.5708,6.2457],
      zoom: initialState.zoom
    })

    // Personalizar marcador
    // const markerHtml = document.createElement('div');
    // markerHtml.textContent = 'Alejo'

    new MapTiler.Marker({
      color: "#FF0000",
      // element: markerHtml
    })
      .setLngLat([-75.5708, 6.2457])
      .addTo(this.map);
  }

  ngOnDestroy(): void {
    this.map?.remove();
  }

  createMarker(){
    if ( !this.map ) return;

    const color = '#xxxxxx'.replace(/x/g, y=>(Math.random()*16|0).toString(16));
    const lngLat = this.map.getCenter();

    this.addMarker(lngLat, color);
  }

  addMarker(lngLat: LngLat, color: string): void {
    if ( !this.map ) return;

    const marker = new MapTiler.Marker({
      color,
      draggable: true
    })
    .setLngLat(lngLat)
    .addTo(this.map)

    this.markers.push({ color, marker });
  }

  deleteMarker( index: number ): void{
    // this.markers = this.markers.filter( (element, i, array) => {
    //   return i != index;
    // });
    this.markers[index].marker.remove();
    this.markers.splice(index,1);
  }

  // Desplazarnos hacia el marcador clickeado
  flyTo(marker: Marker) {
    this.map?.flyTo({
      zoom: 14,
      center: marker.getLngLat()
    })
  }
}
