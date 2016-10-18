/// <reference path="../../webmidi.d.ts" />
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { IMidiInput } from './IMidiInput';

@Injectable()
export class WebMidiService {

    private access: any;
    private data: Observable<Object>;
    private dataObservers: Observer<IMidiInput>[];
    public ts: number;

    constructor() {
        this.dataObservers = [];
        this.ts = (new Date()).getTime();
        // Le principe est le suivant : 
        // Notre service héberge un flux de donnnées (this.data)
        // C'est un observable qui accepte des observers.
        this.data = new Observable(observer => {
            this.dataObservers.push(observer);
        });
    }

    init(): Promise<any> {
        return navigator.requestMIDIAccess().then(
            (access) => {
                console.log('Web MIDI initialized ok');
                this.access = access;
                this.access.inputs.forEach(
                    (input) => input.onmidimessage = this.midiInCallback
                );
            },
            () => { throw 'Cannot init MIDI'; }
        );
    }

    getData() {
        return this.data;
    }

    private midiInCallback = (event) => {
        //console.log(event.data[1]);        
        this.dataObservers.forEach(dataObserver => dataObserver.next({ controlId: event.data[1], value: event.data[2] }));
    }
}