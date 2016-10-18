import { Component, NgZone } from '@angular/core';
import { WebMidiService } from './shared/webmidi.service';
import { FormatService } from './shared/format.service';

@Component({
    selector: 'app-root',
    template: `
    <div class="container">
        <midi-input 
            control-id="14" 
            (value-change)="onChange($event, 'tj', 600, 10)">
        </midi-input>
        <midi-input 
            control-id="15" 
            (value-change)="onChange($event, 'nbJours', 250, 5)">
        </midi-input>
        <midi-input 
            control-id="16" 
            (value-change)="onChange($event,'charges', 20000, 1000)">
        </midi-input>
        <midi-input 
            control-id="17" 
            (value-change)="onChange($event, 'accre', 22000, 1000)"></midi-input>
        <midi-input 
            control-id="18" 
            (value-change)="onChange($event, 'are', 9000, 500)">
        </midi-input>

        <midi-input 
            control-id="2" 
            (value-change)="onChange($event, 'loyer', 2000, 50)">
        </midi-input>

        <midi-input 
            control-id="3" 
            (value-change)="onChange($event, 'depensesCourantes', 2000, 50)">
        </midi-input>


        <div class="callout callout-warning">
            TJ : {{tj}}<br />
            NbJours : {{nbJours}} ({{nbMois}} mois)<br />
            CA: {{ca}}<br />
            Rémunération : {{remuneration}}<br />
            Charges : {{charges}}<br />
            Accre : {{accre}}<br />
            ARE : {{are}}<br />
            Net: {{net/12}}<br />
            <br />
            Loyer : {{loyer}} <br />
            Dépenses courantes : {{depensesCourantes}}<br />
            Dépenses : {{depenses}}<br />
            Epargne disponible : {{epargne}}<br />
        </div>

        <hr />

        <eurl 
            type="EurlService"
            [ca]="ca" 
            [nbJours]="nbJours"
            [charges]="charges" 
            [remuneration]="remuneration" 
            [dividendes]="0" 
            [accre]="accre" 
            [are]="are"
            (on-results)="onResults($event)">
        </eurl>
    </div>
  `
})
export class AppComponent {

    private tj: number = 0;
    private nbJours: number = 0;
    private nbMois: string;
    private ca: number = 0;
    private remuneration: number = 0;
    private charges: number = 0;
    private accre: number;
    private are: number;
    private loyer: number;
    private depensesCourantes: number;
    private depenses: string;
    private net: number;
    private epargne: string;

    private nbJoursMoyenParMois = (22 + 20 + 23 + 19 + 20 + 21 + 21 + 22 + 21 + 22 + 21 + 20) / 12;

    constructor(private midiService: WebMidiService, private fmt: FormatService, private zone: NgZone) {
        midiService.init();
    }

    private adjust(value: number, max: number, step: number): number {
        let ranged: number = Math.floor(value / 127 * max);
        return Math.floor(ranged / step) * step;
    }

    onChange(value, field, max, step) {
        this.zone.run(() => {
            this[field] = this.adjust(value, max, step);
            this.ca = this.tj * this.nbJours;
            this.remuneration = this.ca - this.charges;
            this.nbMois = (this.nbJours / this.nbJoursMoyenParMois).toFixed(2);
            this.depenses = this.fmt.e( this.loyer + this.depensesCourantes);
            this.epargne = this.fmt.e(this.net / 12 - this.loyer + this.depensesCourantes);
        });
    }

    onResults(results) {
        this.net = results.net;
    }

}
