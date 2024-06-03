var i;
for (i=0;i<=63;i++) {
    document.getElementsByClassName("square")[i].setAttribute("id",i+"");
}
class Piece{
    constructor(x, name, pieceClass, player) {
        this.currentCell = x;
        this.name = name;
        this.pieceClass = pieceClass;
        this.player = player;
      this.initPiece();
    }
initPiece(){
        let cell = document.getElementById(this.currentCell + "");
        cell.classList.add(this.pieceClass);
        cell.textContent = this.name;
        cell.onclick = () => {
       this.handleClick();
        };
    }

    movePiece(newCell) {
        document.getElementById(this.currentCell + "").classList.remove(this.pieceClass);
        document.getElementById(newCell + "").classList.add(this.pieceClass);
        document.getElementById(newCell + "").textContent = this.name;
        document.getElementById(this.currentCell + "").textContent = "";
        this.currentCell = newCell;
        this.clearHighlights();
        this.playerCanonShoot();
    }

    clearHighlights() {
        let highlights = document.querySelectorAll(".highlight");
        for (let highlight of highlights) {
            highlight.classList.remove("highlight");
            highlight.onclick = null;
        }
    }

    playerCanonShoot() {
        if (this.player === 'a') {
            aCanonPiece.shootBullet();
        } else if (this.player === 'b') {
            bCanonPiece.shootBullet();
        }
    }
}

class aTank extends Piece {
    constructor(x) {
        super(x,"Tank","aTank",'a');
    }

    handleClick() {
        let hcell = [
            this.currentCell- 1,this.currentCell+1, 
            this.currentCell+7,this.currentCell+8,this.currentCell+9, 
            this.currentCell-7,this.currentCell-8,this.currentCell-9
        ];
        this.highlightMoves(hcell);
    }

    highlightMoves(possibleMoves) {
        for (let move of possibleMoves) {
            if (move>=0 && move<=63 && (document.getElementById(move + "").classList.contains("square") || 
                 document.getElementById(move + "").classList.contains("square highlight"))) {
                document.getElementById(move + "").classList.add("highlight");
                document.getElementById(move + "").onclick = () => {
                    this.movePiece(move);
                };
                 }
                  }
    }
}

class bTank extends Piece {
    constructor(x) {
        super(x, "Tank", "bTank", 'b');
    }

    handleClick() {
        let hcell = [
            this.currentCell - 1, this.currentCell + 1, 
            this.currentCell + 7, this.currentCell + 8, this.currentCell + 9, 
            this.currentCell - 7, this.currentCell - 8, this.currentCell - 9
        ];
        this.highlightMoves(hcell);
    }

    highlightMoves(possibleMoves) {
        for (let move of possibleMoves) {
            if (move >= 0 && move <= 63 && (document.getElementById(move + "").classList.contains("square") || 
                 document.getElementById(move + "").classList.contains("square highlight"))) {
                document.getElementById(move + "").classList.add("highlight");
                document.getElementById(move + "").onclick = () => {
                    this.movePiece(move);
                     };
                }
           }
     }
}

class aTitan extends Piece {
    constructor(x) {
        super(x, "Titan", "aTitan", 'a');
    }

    handleClick() {
        let hcell = [
            this.currentCell - 1, this.currentCell + 1, 
            this.currentCell + 7, this.currentCell + 8, this.currentCell + 9, 
            this.currentCell - 7, this.currentCell - 8, this.currentCell - 9
        ];
        this.highlightMoves(hcell);
    }

    highlightMoves(possibleMoves) {
        for (let move of possibleMoves) {
            if (move >= 0 && move <= 63 && (document.getElementById(move + "").classList.contains("square") || 
                 document.getElementById(move +"").classList.contains("square highlight"))) {
                document.getElementById(move +"").classList.add("highlight");
                document.getElementById(move +"").onclick = () => {
                    this.movePiece(move);
                     };
                }
        }
    }
}

class bTitan extends Piece {
    constructor(x) {
        super(x, "Titan", "bTitan", 'b');
    }

    handleClick() {
        let hcell = [
            this.currentCell - 1, this.currentCell + 1, 
            this.currentCell + 7, this.currentCell + 8, this.currentCell + 9, 
            this.currentCell - 7, this.currentCell - 8, this.currentCell - 8, this.currentCell - 9
        ];
        this.highlightMoves(hcell);
    }

    highlightMoves(possibleMoves) {
        for (let move of possibleMoves) {
            if (move >= 0 && move <= 63 && 
                (document.getElementById(move + "").classList.contains("square") || 
                 document.getElementById(move + "").classList.contains("square highlight"))) {
                document.getElementById(move + "").classList.add("highlight");
                document.getElementById(move + "").onclick = () => {
                    this.movePiece(move);
                };
            }
        }
    }
}

class aCanon extends Piece {
    constructor(x) {
        super(x, "Canon", "aCanon", 'a');
    }

    handleClick() {
        let possibleMoves = [];
        for (let i = this.currentCell - 8; i >= 0; i -= 8) {
            if (i !== this.currentCell) possibleMoves.push(i);
        }
        for (let i = this.currentCell + 8; i < 64; i += 8) {
            if (i !== this.currentCell) possibleMoves.push(i);
        }
        this.highlightMoves(possibleMoves);
    }

    highlightMoves(possibleMoves) {
        for (let move of possibleMoves) {
            if (document.getElementById(move + "").classList.contains("square")) {
                document.getElementById(move + "").classList.add("highlight");
                document.getElementById(move + "").onclick = () => {
                    this.movePiece(move);
                };
            }
        }
    }

    shootBullet() {
        let bullet = document.createElement("div");
        bullet.classList.add("bullet");
        document.body.appendChild(bullet);

        let startCell = document.getElementById(this.currentCell + "").getBoundingClientRect();
        bullet.style.left = startCell.left + "px";
        bullet.style.top = startCell.top + "px";

        setTimeout(() => {
            bullet.style.left = (this.currentCell % 8 === 0 ? startCell.left + 560 : startCell.left - 560) + "px";
        }, 50);

        setTimeout(() => {
            bullet.remove();
        }, 550);
    }
}

class bCanon extends Piece {
    constructor(x) {
        super(x, "Canon", "bCanon", 'b');
    }

    handleClick() {
        let possibleMoves = [];
        for (let i = this.currentCell - 8; i >= 0; i -= 8) {
            if (i !== this.currentCell) possibleMoves.push(i);
        }
        for (let i = this.currentCell + 8; i < 64; i += 8) {
            if (i !== this.currentCell) possibleMoves.push(i);
        }
        this.highlightMoves(possibleMoves);
    }

    highlightMoves(possibleMoves) {
        for (let move of possibleMoves) {
            if (document.getElementById(move + "").classList.contains("square")) {
                document.getElementById(move + "").classList.add("highlight");
                document.getElementById(move + "").onclick = () => {
                    this.movePiece(move);
                };
            }
        }
    }

    shootBullet() {
        let bullet = document.createElement("div");
        bullet.classList.add("bullet");
        document.body.appendChild(bullet);

        let startCell = document.getElementById(this.currentCell + "").getBoundingClientRect();
        bullet.style.left = startCell.left + "px";
        bullet.style.top = startCell.top + "px";

        setTimeout(() => {
            bullet.style.left = (this.currentCell % 8 === 0 ? startCell.left + 560 : startCell.left - 560) + "px";
        }, 50);

        setTimeout(() => {
            bullet.remove();
        }, 550);
    }
}

window.addEventListener("DOMContentLoaded", function() {
    for (let i = 0; i <= 63; i++) {
        document.getElementsByClassName("square")[i].setAttribute("id", i.toString());
    }

    let atank = new aTank(13);
});


window.addEventListener("DOMContentLoaded", function() {
    for (let i = 0; i <= 63; i++) {
        document.getElementsByClassName("square")[i].setAttribute("id", i.toString());
    }

    let btank = new bTank(26);
});

window.addEventListener("DOMContentLoaded", function() {
    for (let i = 0; i <= 63; i++) {
        document.getElementsByClassName("square")[i].setAttribute("id", i.toString());
    }

    let atitan = new aTitan(29);
});


window.addEventListener("DOMContentLoaded", function() {
    for (let i = 0; i <= 63; i++) {
        document.getElementsByClassName("square")[i].setAttribute("id", i.toString());
    }

    let btitan = new bTitan(41);
});

window.addEventListener("DOMContentLoaded", function() {
    for (let i = 0; i <= 63; i++) {
        document.getElementsByClassName("square")[i].setAttribute("id", i.toString());
    }

    let acanon = new aCanon(47);
});


window.addEventListener("DOMContentLoaded", function() {
    for (let i = 0; i <= 63; i++) {
        document.getElementsByClassName("square")[i].setAttribute("id", i.toString());
    }

    let bcanon = new bCanon(32);
});












    


