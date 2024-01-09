// import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CounterAloneComponent } from '../../components/counter-alone/counter-alone.component';
import { SideMenuComponent } from '../../components/side-menu/side-menu.component';

@Component({
  selector: 'app-alone-page',
  standalone: true,
  imports: [
    CounterAloneComponent,
    SideMenuComponent,
  ],
  templateUrl: './alonePage.component.html',
  styleUrls: ['./alonePage.component.css'],
})
export class AlonePageComponent { }
