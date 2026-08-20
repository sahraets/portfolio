// Filtrering av loggen.
const buttons = document.querySelectorAll(".filter");
const entries = document.querySelectorAll(".entry");
const count = document.getElementById("log-count");

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    buttons.forEach((b) => b.setAttribute("aria-pressed", String(b === button)));

    let visible = 0;
    entries.forEach((entry) => {
      const show =
        button.dataset.filter === "alle" ||
        entry.dataset.cat === button.dataset.filter;
      entry.hidden = !show;
      if (show) visible++;
    });

    count.textContent = `${visible} ${visible === 1 ? "oppføring" : "oppføringer"}`;
  });
});

// Marker hvilken seksjon som er i view i seksjonsmenyen.
const links = document.querySelectorAll(".rail a");
const spy = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      links.forEach((link) =>
        link.hash === `#${entry.target.id}`
          ? link.setAttribute("aria-current", "true")
          : link.removeAttribute("aria-current")
      );
    });
  },
  { rootMargin: "-45% 0px -50% 0px" }
);
document.querySelectorAll("[data-spy]").forEach((el) => spy.observe(el));
