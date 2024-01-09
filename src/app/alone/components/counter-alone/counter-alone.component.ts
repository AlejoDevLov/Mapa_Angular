import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'counter-alone',
  standalone: true,
  // imports: [
  //   CommonModule,
  // ],
  templateUrl: './counter-alone.component.html',
  styleUrls: ['./counter-alone.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CounterAloneComponent {

  @Input()
  public baseCounter: number = 0;

  increaseCounter(){
    this.baseCounter += 1;
  }

  decreaseCounter(){
    this.baseCounter -= 1;
  }
}
