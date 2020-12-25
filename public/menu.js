document.querySelector("#transition-full").style.height = "0%";

document.querySelector("#begin-btn").addEventListener("click", (event) => {
  document.querySelector("#transition-full").style.height = "100%";

  setTimeout(() => {
    fetch(window.location.href + 'puzzle1', {
      redirect: 'follow'
    }).then(res => {
      window.location = res.url;
    });
  }, 550);
});

fetch(window.location.href + "curPuzzle")
.then(res => res.json())
.then(resJSON => {
  console.log(resJSON.curPuzzle);
  if(resJSON.curPuzzle > 1) {
    showContinueBtn(parseInt(resJSON.curPuzzle));
  }
}).catch(err => {
  console.log(err);
});

let currentPuzzle = 1;

const showContinueBtn = (cur) => {
  document.querySelector('#continue-btn').style.display = "inline-block";
  document.querySelector('#begin-btn').style.display = "none";
  currentPuzzle = cur;
};

document.querySelector("#continue-btn").addEventListener("click", (event) => {
  document.querySelector("#transition-full").style.height = "100%";

  setTimeout(() => {
    fetch(window.location.href + `puzzle${currentPuzzle}`, {
      redirect: 'follow'
    }).then(res => {
      window.location = res.url;
    });
  }, 550);
});