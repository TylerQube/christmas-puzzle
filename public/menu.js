document.querySelector("#begin-btn").addEventListener("click", (event) => {
  document.querySelector("#transition-screen").style.height = "100%";
  console.log("fullscreen...");

  setTimeout(() => {
    fetch("http://localhost:5000/puzzle/1").then((html) => {
        window.location.href = "http://localhost:5000/puzzle1";
    });
  }, 550);
});
