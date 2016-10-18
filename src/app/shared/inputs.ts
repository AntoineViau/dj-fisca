/*

Mon niveau de vie : 
 - Loyer : 1000
 - Bouffe : 300
 - Taxe d'habitation : 150
 - Liquide : 300
 - Divers lissé (scooter, etc.) : 150 = 1800 /an
Total : 1900, qu'on arrondit à 2000.
Je pense qu'avec ce niveau je peux être célibataire à Paris.

A supposer 4500 mensuels, il reste donc 2500.
Sur an ça représente : 30K.
Je mets une marge de sécurité de 1000. Donc 1500.
Sur 1 an : 18K.
En 6 ans je rembourse un emprunt de 100K.

J'ai 80K dispos.
J'ajoute 40K dans 2 ans. 
Apport : 120K
Achat dans le neuf, 3 pièces, 60 m2 min, location, je complète.
100K d'emprunt, soit 115 sur 10 ans.
500 de location + 500 de ma part.
Défiscalidsation intérêts. 



*/

interface IFrais {
    label: string,
    montant: number,
    immo?: number
}



export const FRAIS: IFrais[] = [
    { label: 'desktop', montant: 2000 /1.2},
    { label: 'ecran', montant: 500/1.2 },
    { label: 'laptop', montant: 2500 /1.2, immo: 0.33 }, 
    { label: 'logiciels', montant: 150 / 1.2 /*windows 7 pro*/ + 8.80 * 12 /* office 365 business */ + 70 /* sublime */ +  250/1.2 /* soft montage */},
    //{ label: 'comptable', montant: 2500 },
    { label: 'abonnement-telephone', montant: 300 },
    { label: 'rcp', montant: 500 },
    { label: 'mutuelle', montant: 1000 },
    { label: 'aga', montant: 250 },
    { label: 'fournitures', montant: 1000 }, // scanner, imprimante, divers électronique (arduino, pi, etc.)
    { label: 'formations', montant: 3000 },
    { label: 'livres', montant: 200 },
    { label: 'abonnements', montant: 100 * 12 },
];

export const CA = 550 * 200;

export const ACCRE = 21116;

export const ARE = 10 * 900;