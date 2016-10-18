/*

Todo ici : c'est idiot de refaire le même type de component pour chaque
type d'entreprise. Je voudrais donc pouvoir injecter (ou instancier)
dynamiquement le service que je veux dans le composant.
Le composant se présenterait alors comme ceci : 
<entreprise type="eurl" tj="500" nb-jours="200" ... />

On peut oublier l'injection. A la limite, l'injection d'une factory
qui prendra l'attribut "type" pour instancier le bon service.

*/
import { Component, Input, Output, NgZone, EventEmitter } from '@angular/core';
import { EurlService } from './shared/eurl.service';
import { FormatService } from './shared/format.service';

@Component({
    selector: 'eurl',
    template: `
    <div class="callout callout-warning">
        IR: {{IR}}<br />
        CS: {{CS}}<br />
        Net annuel : {{net}}<br />
        Net mensuel : {{netMensuel}}<br />
        Net journalier : {{netJournalier}}<br />
        Pourcentage de prélèvements : {{percent}} %<br />
    </div>
  `,
    //  providers: []

})
export class EurlComponent {

    @Input() type: string;
    @Input() nbJours: number;
    @Input() ca: number;
    @Input() charges: number;
    @Input() remuneration: number;
    @Input() dividendes: number;
    @Input() accre: number;
    @Input() are: number;

    @Output('on-results') resultsChange = new EventEmitter<Object>();

    private IR: string;
    private CS: string;
    private net: string;
    private netMensuel: string;
    private netJournalier: string;
    private percent: string;
    private entreprise;

    constructor(private eurlService: EurlService, private fmt: FormatService, private zone: NgZone) {
        //let toto = 'EurlService';
        //let service = Object.create(toto);
    }

    private compute() {
        let res: any = this.eurlService.compute(
            this.ca,
            this.charges,
            this.remuneration,
            this.dividendes,
            this.accre,
            this.are
        );
        this.zone.run(() => {
            this.IR = this.fmt.e(res.IR);
            this.CS = this.fmt.e(res.cotisationsRemu);
            this.net = this.fmt.e(res.net);
            this.netMensuel = this.fmt.e(res.net / 12);
            this.netJournalier = this.fmt.e(res.net / this.nbJours);
            this.percent = this.fmt.pc((res.brut - res.net) / res.brut);
            this.resultsChange.emit({net: res.net});
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
