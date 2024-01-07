import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import * as MapTiler from '@maptiler/sdk';
import { LngLat, Marker } from 'maplibre-gl';


interface MarkerAndColor {
  color: string,
  marker: Marker
}

interface PlainMarker {
  color: string,
  lngLat: number[]
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
    });

    this.readFromLocalStorage();

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
    this.saveToLocalStorage();

    // Crear evento para actualizar referencia en localStorage cuando el marcador se termina de mover
    marker.on('dragend', () => {
      this.saveToLocalStorage();
    })
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

  saveToLocalStorage(){
    // Debemos crear un objeto con la informacion necesaria para almacenar en el localStorage,
    // no podemos almacenar el objeto completo de marker ya que es un elemento muy complejo y no permite ser almacenado en el localStorage
    const plainMarkers: PlainMarker[] = this.markers.map( ({ color, marker }) => {
      return {
        color,
        lngLat: marker.getLngLat().toArray()
      }
    })
    localStorage.setItem('plainMarkers', JSON.stringify(plainMarkers));
  }

  readFromLocalStorage(){
    const plainMarkers: PlainMarker[] = JSON.parse(localStorage.getItem('plainMarkers')!) ?? [];
    plainMarkers.forEach( ({ color, lngLat }) => {
      const [lng, lat] = lngLat;
      const coords = new LngLat(lng, lat);
      this.addMarker(coords, color);
    })
  }
}
