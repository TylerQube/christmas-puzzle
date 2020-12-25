setTimeout(() => {
    document.querySelector('#transition-full').style.height = '0%';
}, 200);

const transition = document.querySelector('#transition-full');
const input = document.querySelector('#ans-input');
const submitBtn = document.querySelector('#submit-btn');
const msgP = document.querySelector('#msg');
const audioVol = "0.5";

const successMsgs = [
    "Well Done!",
    "Correct!",
    "Great Job!",
    "Success!"
]

const failMsgs = [
    "Not Quite!",
    "Try Again!",
    "Incorrect!",
    "Access Denied!"
]

const puzzleNum = parseInt(document.querySelector('#puzzle-num').innerHTML);
const submitURL = `${window.location.href}submit`;

let nextPuzzleURL = window.location.href.slice(0, window.location.href.length-2) + (puzzleNum+1);
if(puzzleNum >= 6) {
    nextPuzzleURL = window.location.href.replace(`puzzle${puzzleNum}/`, 'final-prize');
}
console.log(nextPuzzleURL);
const options = {
    redirect: 'follow'
}

console.log("this is Puzzle #" + puzzleNum);

const submit = () => {
    console.log("Submitting...");
    if (input.value) {
        const json = {
            "code" : input.value
        };
        fetch(submitURL, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(json)
        })
        .then(res => res.json())
        .then(resJSON => {
            checkAnswer(resJSON.isCorrect);
        });
    }
}

submitBtn.addEventListener('click', submit);

const checkAnswer = (correct) => {
    const animDur = 500;
    if(correct) {
        console.log("correct");
        transition.style.backgroundColor = '';
        document.querySelector('#correct-sound').volume = audioVol;
        document.querySelector('#correct-sound').play();
        submitBtn.classList.add('correct-code');

        setTimeout(() => {
            transition.style.height = '100%';
            msgP.textContent = successMsgs[Math.floor(Math.random()*successMsgs.length)];
        }, 800);

        // redirect
        setTimeout(() => {
            fetch(nextPuzzleURL, options)
            .then(res => {
                window.location = res.url;
            });
        }, 2000);
    } else {
        console.log("incorrect");
        submitBtn.classList.add('wrong-code');
        document.querySelector('#incorrect-sound').volume = audioVol;
        document.querySelector('#incorrect-sound').play();
        transition.style.backgroundColor = 'red';
        setTimeout(() => {
            transition.style.height = '100%';
            msgP.textContent = failMsgs[Math.floor(Math.random()*failMsgs.length)];
        }, animDur)
        setTimeout(() => {
            transition.style.height = '0%'; 
            input.value = "";
            submitBtn.classList.remove('wrong-code');
        }, animDur+800);
    }
};
