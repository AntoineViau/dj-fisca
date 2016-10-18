import { Component, Input, Output, NgZone } from '@angular/core';
import { EiService } from './shared/ei.service';

@Component({
    selector: 'ei',
    template: `
    <div class="callout callout-warning">
        IR: {{IR}}<br />
        CS: {{CS}}<br />
        Net annuel : {{net}}<br />
        Net mensuel : {{netMensuel}}<br />
        Net journalier : {{netJournalier}}<br />
        Pourcentage de prélèvements : {{percent}} %<br />
    </div>
  `
})
export class EiComponent {

    @Input() nbJours: number;
    @Input() ca: number;
    @Input() charges: number;
    @Input() remuneration: number;
    @Input() dividendes: number;
    @Input() accre: number;
    @Input() are: number;

    private IR: string;
    private CS: string;
    private net: string;
    private netMensuel: string;
    private netJournalier: string;
    private percent: string;

    constructor(private eiService: EiService, private zone: NgZone) { }

    private e(value): string {
        value = Math.floor(value);
        if (value > 10000) {
            let str = value.toString();
            return Math.floor(value / 1000) + ' ' + str.substr(-3) + ' €';
        }
        return value.toFixed(2) + ' €';
    }

    private pc(value): string {
        return (value * 100).toFixed(2) + ' %';
    }

    private compute() {
        let res: any = this.eiService.compute(this.ca, this.charges, this.remuneration, this.dividendes, this.accre, this.are);
        this.zone.run(() => {
            this.IR = this.e(res.IR);
            this.CS = this.e(res.cotisationsRemu);
            this.net = this.e(res.net);
            this.netMensuel = this.e(res.net / 12);
            this.netJournalier = this.e(res.net / this.nbJours);
            this.percent = this.pc((res.brut - res.net) / res.brut);
        });
    }

    ngOnInit() {
        this.compute();
    }

    ngOnChanges(changes) {
        for (let key in changes) {
            this[key] = changes[key].currentValue;
        }
        this.compute();
    }

}
