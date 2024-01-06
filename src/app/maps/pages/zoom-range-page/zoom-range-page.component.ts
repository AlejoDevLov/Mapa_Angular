import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import * as MapTiler from '@maptiler/sdk';


@Component({
  selector: 'app-zoom-range-page',
  templateUrl: './zoom-range-page.component.html',
  styleUrls: ['./zoom-range-page.component.css']
})
export class ZoomRangePageComponent implements AfterViewInit, OnDestroy {

  public map: MapTiler.Map | undefined;
  @ViewChild('map')
  private mapContainer?: ElementRef<HTMLElement>;
  public zoom: number = 10;
  public lngLat = [139.753, 35.6844];

  ngAfterViewInit(): void {
    const initialState = { lng: this.lngLat[0], lat: this.lngLat[1], zoom: this.zoom };

    if(!this.mapContainer) throw new Error('El elemento HTML  no fue encontrado');

    this.map = new MapTiler.Map({
      container: this.mapContainer.nativeElement,
      style: MapTiler.MapStyle.STREETS,
      center: [initialState.lng, initialState.lat],
      zoom: initialState.zoom
    });

    this.mapListeners();
  }

  ngOnDestroy(): void {
    // Elimina la instancia del mapa y limpia todos los listeners creados
    this.map?.remove();
  }

  // Este metodo se ejecuta al iniciar el componente y ejecuta el evento on, el cual contiene diferentes eventos
  mapListeners(): void {
    // El evento zoom sirve para tomar el valor del zoom actual y establecerlo en el atributo zoom.
    this.map?.on('zoom', (ev) => {
      this.zoom = this.map!.getZoom();
    });

    // El evento move se activa cada vez que movemos el mapa y nos regresa las coordenadas actuales
    this.map?.on('move', () => {
      const { lng, lat } = this.map!.getCenter();
      this.lngLat = [lng, lat];
    })
  }

  // Este metodo decrementa el zoom por medio del metodo zoomIn
  increaseZoom(): void {
    if(this.zoom >= 18) return;
    this.map?.zoomIn();
  }

  // Este evento aumenta el zoom por medio del metodo zoomOut
  decreaseZoom(): void{
    if(this.zoom <= 0) return;
    this.map?.zoomOut();
  }

  // settea el valor del zoom con el metodo zoomTo
  changeZoom(value: string): void {
    this.zoom = Number(value);
    this.map?.zoomTo(this.zoom)
  }

}
