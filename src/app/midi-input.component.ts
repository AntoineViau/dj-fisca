import { Component, Input, Output, EventEmitter, NgZone } from '@angular/core';
import { WebMidiService } from './shared/webmidi.service';
import { IMidiInput } from './shared/IMidiInput';

@Component({
    selector: 'midi-input',
    template: `
    `
})
export class MidiInputComponent {
    @Input('control-id') controlId: string;
    @Output('value-change') valueChange = new EventEmitter<number>();
    //controlId: number;
    val: string;

    constructor(private midiService: WebMidiService, private zone: NgZone) { }

    ngOnInit() {
        this.midiService.getData().subscribe(
            (value: IMidiInput) => {
                if (value.controlId.toString() === this.controlId) {
                    this.valueChange.emit(value.value);
                }
            }
        );
    }
}
