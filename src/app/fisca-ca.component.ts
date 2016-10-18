import { Component, NgZone } from '@angular/core';
import { WebMidiService } from './shared/webmidi.service';
import { IMidiInput } from './shared/IMidiInput';

@Component({
  selector: 'fisca-ca',
  template: `
    <midi-input control-id="14" (value-change)="onChange($event)"></midi-input>
    ca = {{ca}}
  `
})
export class FiscaCaComponent {

  ca: number;

  constructor(private zone: NgZone) {
  }

  onChange(value) {
    this.zone.run(() => this.ca = value);
  }

}
