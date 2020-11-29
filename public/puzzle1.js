setTimeout(() => {
    document.querySelector('#transition-full').style.height = '0%';
}, 200);

const correct = false;

document.querySelector('#submit-btn').addEventListener('click', (e) => {
    console.log("Submitting...");
    if (document.querySelector('#album-year').value) {
        correct = fetch('http://localhost:5000/api/puzzle1', {
            body: document.querySelector('#album-year')
        });
    }
});
