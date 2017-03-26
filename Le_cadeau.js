
		/*Déclaration des variables*/

var N=parseInt(readline());		//Nombre de Oods participant au cadeau
var C=parseInt(readline());		//Prix du cadeau
var B=[];						//Liste des budgets des participants
var D=[];						//Liste des sommes dépensées par les participants
var budgetTot=0;				//Somme des budgets des N participants
var depenseTot=0;				//Somme courante dépensée pour acheter le cadeau
var resultat=[];				//Liste triée des sommes dépensées par les participants



		/*Lecture des entrées et initialisation*/

for (var i=0;i<N;i++) {
	B[i]=parseInt(readline());
	D[i]=0;
	budgetTot=budgetTot+B[i];
}



		/*Corps du programme*/

if (budgetTot<C) {		//Si le somme des budgets est inférieure au prix du cadeau, on retourne "IMPOSSIBLE"
	print("IMPOSSIBLE");
} else {				//Sinon, tant que l'on a pas atteint le prix du cadeau
	while(depenseTot<C) {
		for (var i=0;i<N;i++) {
			if (depenseTot<C && D[i]<B[i]) {		//Si on a pas atteint le prix du cadeau et que l'Ood numéro i n'a pas atteint son budget maximal
				D[i]++;								//Il dépense 1 de plus
				depenseTot++;
			}
		}
	}
	resultat=triFusion(D);		//On trie la liste des sommes dépensées par les participants par ordre croissant
	for (var i=0;i<N;i++) {		//On renvoie N lignes contenant chacune la contribution d'un participant
		print(resultat[i]);
	}
}



		/*Fonctions pour le tri fusion*/

//Fonction retournant le tri fusion de tab
function triFusion(tab) {
	var L=tab.length;
	if (L<=1) {
		return tab;
	} else {
		var q=Math.trunc(L/2);
		var gauche=triFusion(tab.slice(0,q));
		var droite=triFusion(tab.slice(q,L));
		return fusion(gauche,droite); 
	}
}

//Fonction retournant la fusion des listes gauche et droite
function fusion(gauche,droite) {
	var result=[];
	var LGauche=gauche.length;
	var LDroite=droite.length;
	var cptG=0;
	var cptD=0;
	while ((cptG<LGauche) && (cptD<LDroite)) {
		if (gauche[cptG]>droite[cptD]) {
			result.push(droite[cptD]);
			cptD++;
		} else {
			result.push(gauche[cptG]);
			cptG++;
		}
	}
	for (var i=cptG;i<LGauche;i++) {
		result.push(gauche[i]);
	}
	for (var j=cptD;j<LDroite;j++) {
		result.push(droite[j]);
	}
	return result;
}
