import ImpotSociete from './ImpotSociete';

export default class Dividendes {

    constructor(private distribuable: number) {
    }

    getIS() {
        return (new ImpotSociete(this.distribuable, 0.33)).getImpot();
    }

    getCsgCrds() {
        return (this.distribuable - this.getIS()) * 0.155;
    }

    getPrelevements() {
        return this.getIS() + this.getCsgCrds();
    }

    getDividendes() {
        return this.distribuable - this.getPrelevements();
    }

    getBaseIR() {
        return this.getDividendes() * 0.6;
    }

}