setTimeout(() => {
    document.querySelector('#transition-full').style.height = '0';
}, 200);

let curVerify = 1;
document.querySelector(`#_${curVerify}`).style.maxHeight = '2000px';
document.querySelector(`#check${curVerify}`).style.height = "0px";

const nextVerify = () => {
    document.querySelector(`#check${curVerify}`).classList.add('checkmark');
    document.querySelector(`#check${curVerify}`).style.height = "";
    document.querySelector(`#circle${curVerify}`).classList.add('checkmark__circle');
    document.querySelector(`#path${curVerify}`).classList.add('checkmark__check');
    document.querySelector('#correct-sound').play();

    setTimeout(() => {
        document.querySelector(`#_${curVerify}`).style.maxHeight = "0px";
        curVerify++;
        console.log(`#check${curVerify}`);
        document.querySelector(`#check${curVerify}`).style.height = "0px";
        setTimeout(() => {
            document.querySelector(`#_${(curVerify-1)}`).innerHTML = "";
            document.querySelector(`#_${curVerify}`).style.maxHeight = "2000px";
        }, 1500);
    }, 500);
};

const revealGift = () => {
    document.querySelector(`#check${curVerify}`).classList.add('checkmark');
    document.querySelector(`#check${curVerify}`).style.height = "";
    document.querySelector(`#circle${curVerify}`).classList.add('checkmark__circle');
    document.querySelector(`#path${curVerify}`).classList.add('checkmark__check');

    document.querySelector('#correct-sound').play();
    confetti.start();

    setTimeout(() => {
        document.querySelector(`#_${curVerify}`).style.maxHeight = "0px";
        
        curVerify++;
        setTimeout(() => {
            document.querySelector(`#_${(curVerify-1)}`).innerHTML = "";
            document.querySelector(`#_${curVerify}`).style.maxHeight = "2000px";
        }, 1500);
    }, 500);
};

const checkBoxes = document.getElementsByName('verify-checks');

for(let i = 0; i < checkBoxes.length; i++) {
    checkBoxes[i].addEventListener('click', e => {
        let allChecked = true;
        for(let i = 0; i < checkBoxes.length; i++) {
            if(!checkBoxes[i].checked)  allChecked = false;
        }
        if(allChecked) {
            nextVerify();
            console.log("Verify #2 complete");
        } 
    });
}

const capitalInput = document.querySelector('#capital-input');

let check3_valid = false;
capitalInput.addEventListener('keyup', e => {
    if(!check3_valid && capitalInput.value.toLowerCase() == "jakarta") {
        check3_valid = true;
        nextVerify();
        console.log("Verify #3 complete");
    }
});

const chessPos = {
    "c8": "bK",
    "h8": "bR",
    "c7": "bP",
    "f7": "bP",
    "g7": "bP",
    "e2": "wB",
    "f2": "wP",
    "b7": "bP",
    "a7": "bP",
    "g8": "bN",
    "e5": "bP",
    "h4": "bP",
    "c6": "bQ",
    "b4": "wP",
    "a3": "wP",
    "d3": "wQ",
    "e3": "wP",
    "g2": "wP",
    "h2": "wP",
    "g1": "wK",
    "d1": "wR"
}

const config = {
    draggable: true,
    dropOffBoard: 'snapback',
    position: chessPos,
    onDrop: onDrop
}
const board = Chessboard('chessboard', config);

function onDrop(srcPos, targetPos, piece, newPos) {
    console.log("moved");
    if(piece != 'wB' || targetPos != 'g4') {
        return 'snapback';
    } else {
        console.log("Revealing gift location...");
        setTimeout(() => {
            revealGift();
        }, 500);
    }
}
