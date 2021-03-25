const factorial = (n) => (n == 1 ? 1 : n * factorial(n - 1));
const timers = [];
const button = document.querySelector("#start");
const stopBtn = document.querySelector("#stop");
button.addEventListener("click", (e) => {
  destroyBrowser();
});
stopBtn.addEventListener("click", (e) => {
  timers.forEach((item) => clearInterval(item));
});

function destroyBrowser() {
  for (let i = 0; i < 1000; i++) {
    document.body.append(createBlock()());
  }
}

function createBlock() {
  const top = getRandomInt(0, window.screen.availHeight);
  const left = getRandomInt(0, window.screen.availWidth);
  const array = Array.from({ length: 1000 }).map((item, index) => index + 1);
  return () => {
    const block = document.createElement("div");
    block.addEventListener("click", (e) => console.log(1));
    block.textContent = "JS";
    block.style.top = `${top}px`;
    block.style.left = `${left}px`;
    block.style.backgroundColor = `#${(0x1000000 + Math.random() * 0xffffff)
      .toString(16)
      .substr(1, 6)}`;
    block.classList.add("block");
    timers.push(
      setInterval(() => {
        destroyBrowser();
      }, 40)
    );
    array.push(block);
    return block;
  };
}
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}
factorial(100000);
