const track = document.querySelector(".track");
const cards = [...track.children];
const prev = document.querySelector(".prev");
const next = document.querySelector(".next");
const dots = document.querySelector(".dots");

const step = () => cards[1].offsetLeft - cards[0].offsetLeft;
const perView = () => Math.max(1, Math.round(track.clientWidth / step()));
const pages = () => Math.max(1, cards.length - perView() + 1);
const current = () => Math.round(track.scrollLeft / step());

function renderDots() {
  dots.replaceChildren(...Array.from({ length: pages() }, (_, i) => {
    const b = document.createElement("button");
    b.setAttribute("role", "tab");
    b.setAttribute("aria-label", `Go to slide ${i + 1}`);
    b.addEventListener("click", () => track.scrollTo({ left: i * step(), behavior: "smooth" }));
    return b;
  }));
  update();
}

function update() {
  const i = current();
  [...dots.children].forEach((d, n) => d.setAttribute("aria-selected", n === i));
  prev.disabled = i <= 0;
  next.disabled = i >= pages() - 1;
}

prev.addEventListener("click", () => track.scrollBy({ left: -step(), behavior: "smooth" }));
next.addEventListener("click", () => track.scrollBy({ left: step(), behavior: "smooth" }));
track.addEventListener("scroll", update, { passive: true });
window.addEventListener("resize", renderDots);
track.addEventListener("keydown", (e) => {
  if (e.key === "ArrowRight") next.click();
  if (e.key === "ArrowLeft") prev.click();
});

renderDots();
