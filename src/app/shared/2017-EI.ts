/*
--------------------------------------------
ARE : 
Vérifier si je peux profiter de l'ARE. 
J'aurais tendandce à penser que non puisque je ne fais qu'un avec ma société.
Même topo pour les cotisations sociales. Tout Euro gagné est-il un Euro taxé socialement ?
Est-ce que l'IS me permet d'éviter ça ?
--------------------------------------------
LOYER : 
L'EI(RL) me permet de déduire 20% mon loyer et je ne passe pas par la case taxes fonccières.
--------------------------------------------
LOYER vs ARE : 
L'ARE c'est 9000.
Les loyers c'est 20% * 12 de 1200 à 1500, soit 2880 à 3600.
Même en EURL je peux gratter un peu dessus.
--------------------------------------------
RACHAT D'ACTIFS : 
Possible avec l'EURL. Je touche en cash direct : 
 - Clevo : 1000
 - Surface : 1000
 - Scooter : 1000
 - Ecran : 200
Soit 3200. Mais qui s'ajoutent à l'IR ?
Je peux zapper mais en cas de contrôle c'est quand même pas clean du tout.
Donc oui, j'ajoute à l'IR.
--------------------------------------------
IS OU IR ?
Je ne touche rien pendant 10 mois pour toucher l'ARE, puis en novembre ou décembre je me 
verse ma rémunération. Je peux laisser un peu d'argent en société, mais je ne vois toujours pas l'intérêt.
En l'état, puisque je me reverse tout, c'est comme si ma société était à l'IR.
http://www.lecoindesentrepreneurs.fr/eirl-imposition-des-benefices/
"L’option pour l’imposition à l’IS permet d’avoir une imposition sur l’entreprise et non pas directement en son nom. 
Les taux d’imposition sont fixes peu import le montant du bénéfice. Il s’agit également d’un choix potentiellement 
intéressant pour l’entrepreneur qui n’envisage pas de s’approprier l’ensemble du profit qu’il génère par l’intermédiaire 
de l’EIRL, mais qui préfère réinvestir dans le développement de l’entreprise."
Autrement dit : à moins que je sorte du cadre libéral, l'IS n'a pas grand intérêt pour moi.
--------------------------------------------
Attention : en EI, faut que je fasse gaffe au statut d'EI qui mélange mon patrimoine avec celui de mon activité.
--------------------------------------------
PB EIRL : http://www.lecoindesentrepreneurs.fr/le-capital-social/
"Contrairement aux apports en capital social d’une société (qui remplit certains critères), les apports de fonds à une EIRL
ne permettent pas de bénéficier à titre personnel d’une réduction d’IR ou d’ISF."
Lire : http://www.lecoindesentrepreneurs.fr/reduction-impot-souscription-capital-pme/
C'EST DEAD, IL FAUT DES SALARIES
--------------------------------------------
RACHAT D'ACTIFS : 
Ma société achète avec de l'argent vierge certains biens persos : 
scooter, Clevo, Surface
*/

/// <reference path="node.d.ts" />




import {ARE, ACCRE, CA, FRAIS} from './inputs';
import Outputer from './Outputer';
import EI from './ei';

var ca = CA;
var frais = FRAIS;
frais.push({ label: 'loyers', montant: 1500 * 0.2 * 12 });
var charges = frais.reduce((sum, cur) => sum + (cur.immo ? cur.montant * cur.immo : cur.montant), 0);
var dividendes = 0;
var accre = 21116;
var are = 10 * 900;
var remuneration = ca - charges - dividendes;

var ei = (new EI(ca, charges, remuneration, dividendes, accre, are)).exercice();

let o: Outputer = new Outputer();
o.w('CA : ' + o.e(ca));
o.w('Charges : ' + o.e(charges));
o.w('Dividendes : ' + o.e(dividendes));
o.w('Rémunération : ' + o.e(remuneration));
o.w('ACCRE : ' + o.e(accre));
o.w('ARE : ' + o.e(are));
o.w('');
o.w('Cotisations sociales rémunération : ' + o.e(ei.cotisationsRemu));
o.w('IS : ' + o.e(ei.is));
o.w('base IR : ' + o.e(ei.baseIR));
o.w('IR : ' + o.e(ei.IR));
ei.tranches.forEach((tranche, idx) => o.w(
    ' - Tranche ' + idx +
    ' (' + tranche.min + ' - ' + tranche.max + ', ' + o.pc(tranche.taux) + ') : ' + o.e(tranche.value)));

o.w('Brut : ' + o.e(ei.brut));
o.w('Net : ' + o.e(ei.net));
o.w('Mensuel : ' + o.e(ei.net / 12));
o.w('Pourcentage de prélèvements : ' + o.pc((ei.brut - ei.net) / ei.brut));

