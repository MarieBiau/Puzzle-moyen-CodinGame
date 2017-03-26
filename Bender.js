
		/*Lecture des entrées*/
		
var inputs = readline().split(' ');
var L = parseInt(inputs[0]);
var C = parseInt(inputs[1]);



		/*Déclaration des variables*/

//Tableau représentant la carte de la ville
var plateau=[];

//Coordonnées de Bender
var x;
var y;

//Direction actuelle
var direction='S';

//Nombre de déplacements
var cpt=0;

//Liste des déplacements effectués
var chemin=[];

//Booléen correspondant à l'inversion de priorité
var inversion=false;

//Booléen correspondant au mode casseur
var casseur=false;

//Coordonnées des 2 téléporteurs (null s'il n'y en a pas)
var teleporteur1=null;
var teleporteur2=null;

//Existance d'une boucle infinie
var boucleInfinie=false;



		/*Initialisation du plateau*/

for (var i=0; i<L; i++) {
    plateau[i]=readline();
    printErr(plateau[i]);	//Affichage de la carte
    for (var j=0; j<C; j++) {
        if (plateau[i][j]==='@') {	//On initialise des coordonnées de Bender
            x=i;
            y=j;
        }
		if (plateau[i][j]=='T') {	//On mémorise la position des téléporteurs s'ils existent
			if (teleporteur1===null) {
				teleporteur1=[i,j];
			} else {
				teleporteur2=[i,j]
			}
		}
    }
}



		/*Fonctions*/

//Fonction de modification de la trajectoire (lorsque Bender rencontre un modificateur de trajectoire)
function modifTrajectoire() {
    if (plateau[x][y]==='S') {
        direction='S';
    } else if (plateau[x][y]==='E') {
        direction='E';
    } else if (plateau[x][y]==='N') {
        direction='N';
    } else if (plateau[x][y]==='W') {
        direction='W';
    }
}

//Fonction d'inversion de la priorité (lorsque Bender rencontre un inverseur de priorité)
function inversionPrior() {
	if (plateau[x][y]==='I') {
		if (inversion===false) {
			inversion=true;
		} else {
			inversion=false;
		}
	}
}

//Fonction d'activation/de désactivation du mode casseur (lorsque Bender rencontre une bière)
function biere() {
	if (plateau[x][y]==='B') {
		if (casseur===false) {
			casseur=true;
		} else {
			casseur=false;
		}
	}
}

//Fonction de destruction d'un obstacle de type 'X'
//a et b sont les coordonnées de l'obstacle
function detruireObstacle(a,b) {
	var copie = plateau[a];		//Copie de la ligne contenant l'obstacle à détruire
	copie = copie.split('');
	copie[b]=' ';				//Suppression de l'obstacle
	plateau[a]=copie.join('');	//Actualisation de la ligne de la carte
}

//Fonction de déplacement vers le sud
//Renvoie un booléen indiquant si le déplacement a pu se réaliser ou non
function deplacementS() {
	var xNouv=x+1;
	if (plateau[xNouv][y]!=='#' && (plateau[xNouv][y]!=='X' || casseur===true)) {		//Si le déplacement est réalisable
		direction='S';
		chemin[cpt]="SOUTH";
		cpt++;
		if (plateau[xNouv][y]==='T') {			//S'il y a un téléporteur
			if (xNouv===teleporteur1[0] && y==teleporteur1[1]) {
				x=teleporteur2[0];
				y=teleporteur2[1];
			} else {
				x=teleporteur1[0];
				y=teleporteur1[1];				
			}
		} else {								//S'il n'y a pas de téléporteur
			if (plateau[xNouv][y]==='X') {
				detruireObstacle(xNouv,y);
			}
			x=xNouv;
			modifTrajectoire();
			inversionPrior();
			biere();
		}
		return true;
    }
    return false;
}

//Fonction de déplacement vers l'est
//Renvoie un booléen indiquant si le déplacement a pu se réaliser ou non
function deplacementE() {
	var yNouv=y+1;
	if (plateau[x][yNouv]!=='#' && (plateau[x][yNouv]!=='X' || casseur===true)) {		//Si le déplacement est réalisable
		direction='E';
		chemin[cpt]="EAST";
		cpt++;
		if (plateau[x][yNouv]==='T') {			//S'il y a un téléporteur
			if (x===teleporteur1[0] && yNouv==teleporteur1[1]) {
				x=teleporteur2[0];
				y=teleporteur2[1];
			} else {
				x=teleporteur1[0];
				y=teleporteur1[1];				
			}
		} else {								//S'il n'y a pas de téléporteur	
			if (plateau[x][yNouv]==='X') {
				detruireObstacle(x,yNouv);
			}
			y=yNouv;
			modifTrajectoire();
			inversionPrior();
			biere();
		}
		return true;
    }
    return false;
}

//Fonction de déplacement vers le nord
//Renvoie un booléen indiquant si le déplacement a pu se réaliser ou non
function deplacementN() {
	var xNouv=x-1;
	if (plateau[xNouv][y]!=='#' && (plateau[xNouv][y]!=='X' || casseur===true)) {		//Si le déplacement est réalisable
		direction='N';
		chemin[cpt]="NORTH";
		cpt++;
		if (plateau[xNouv][y]==='T') {			//S'il y a un téléporteur
			if (xNouv===teleporteur1[0] && y==teleporteur1[1]) {
				x=teleporteur2[0];
				y=teleporteur2[1];
			} else {
				x=teleporteur1[0];
				y=teleporteur1[1];				
			}
		} else {								//S'il n'y a pas de téléporteur	
			if (plateau[xNouv][y]==='X') {
				detruireObstacle(xNouv,y);
			}
			x=xNouv;
			modifTrajectoire();
			inversionPrior();
			biere();
		}
		return true;
    }
    return false;
}

//Fonction de déplacement vers l'ouest
//Renvoie un booléen indiquant si le déplacement a pu se réaliser ou non
function deplacementW() {
	var yNouv=y-1;
	if (plateau[x][yNouv]!=='#' && (plateau[x][yNouv]!=='X' || casseur===true)) {		//Si le déplacement est réalisable
		direction='W';
		chemin[cpt]="WEST";
		cpt++;
		if (plateau[x][yNouv]==='T') {			//S'il y a un téléporteur
			if (x===teleporteur1[0] && yNouv==teleporteur1[1]) {
				x=teleporteur2[0];
				y=teleporteur2[1];
			} else {
				x=teleporteur1[0];
				y=teleporteur1[1];				
			}
		} else {								//S'il n'y a pas de téléporteur		
			if (plateau[x][yNouv]==='X') {
				detruireObstacle(x,yNouv);
			}
			y=yNouv;
			modifTrajectoire();
			inversionPrior();
			biere();
		}
		return true;
    }
    return false;
}

//Fonction de choix du type de déplacement à réaliser lorsqu'il n'y a pas d'inversion de priorité 
function deplacement() {
	if (direction==='S') {
		if (deplacementS()===false) {
            if (deplacementE()===false) {
                if (deplacementN()===false) {
                    deplacementW();
                }
            }
        }
    }
    if (direction==='E') {
        if (deplacementE()===false) {
            if (deplacementS()===false) {
                if (deplacementN()===false) {
                    deplacementW();
                }
            }
        }
    }
    if (direction==='N') {
        if (deplacementN()===false) {
            if (deplacementS()===false) {
                if (deplacementE()===false) {
                    deplacementW();
                }
            }
        }
    }
    if (direction==='W') {
        if (deplacementW()===false) {
            if (deplacementS()===false) {
                if (deplacementE()===false) {
                    deplacementN();
                }
            }
        }
    }
}

//Fonction de choix du type de déplacement à réaliser lorsqu'il y a inversion de priorité 
function deplacementInversion() {
	if (direction==='S') {
		if (deplacementS()===false) {
            if (deplacementW()===false) {
                if (deplacementN()===false) {
                    deplacementE();
                }
            }
        }
    }
    if (direction==='E') {
        if (deplacementE()===false) {
            if (deplacementW()===false) {
                if (deplacementN()===false) {
                    deplacementS();
                }
            }
        }
    }
    if (direction==='N') {
        if (deplacementN()===false) {
            if (deplacementW()===false) {
                if (deplacementE()===false) {
                    deplacementS();
                }
            }
        }
    }
    if (direction==='W') {
        if (deplacementW()===false) {
            if (deplacementN()===false) {
                if (deplacementE()===false) {
                    deplacementS();
                }
            }
        }
    }
}

//Fonction de test de l'existence d'une boucle infinie (on considère des boucles inférieures à 200 déplacements)
function testBoucleInf() {
	for (var k=0;k<cpt-200;k++) {		//On compare tous les éléments du chemin 2 à 2 excepté les 200 derniers
		for (var l=0;l<cpt-200;l++) {
			if (chemin[k]===chemin[l] && chemin[k+1]===chemin[l+1]) {		//Si on remarque deux déplacements consécutifs identiques 2 à 2
				if(recursBoucleInf(k,l,200)) {								//Alors on teste si les 200 déplacements suivants le sont également
					boucleInfinie=true;
				}
			}
		}
	}
}

//Fonction récursive testant si l'égalité chemin[k+i]=chemin[l+i] est vraie pour i allant de i à 1 et retournant un booléen
function recursBoucleInf(k,l,i) {
	if (i===1) {		//Cas de base retournant vrai car testé avant l'appel de la fonction
		return true;
	} else {			//Récursion
		return (chemin[k+i]===chemin[l+i] && recursBoucleInf(k,l,i-1));
	}
}



		/*Corps du programme*/
		
while (plateau[x][y]!=='$' && boucleInfinie===false) {		//Tant que Bender n'est pas arrivé à la cabine à suicide et qu'il n'y a pas de boucle infinie
    if (inversion===false) {		//Si l'inversion de priorité n'est pas activée, on lance un déplacement
		deplacement();
	} else {						//Sinon on lance un déplacement avec inversion de priorité
		deplacementInversion();
	}
	testBoucleInf();				//On teste l'existence d'une boucle infinie
}



		/*Terminaison du programme*/

if (boucleInfinie===false) {		//Si le programme s'est arrêté car Bender est arrivé à la cabine à suicide, on renvoie le chemin parcouru
	for (var k=0;k<cpt;k++) {
		print(chemin[k]);
	}
} else {							//Si le programme s'est arrêté à cause d'une boucle infinie, on renvoie "LOOP"
	print("LOOP");
}