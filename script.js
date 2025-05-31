
function updateCountdown() {
    const electionDate = new Date("2026-04-12T00:00:00").getTime();
    const now = new Date().getTime();
    const diff = electionDate - now;

    if (diff < 0) {
        document.getElementById("countdown").innerHTML = "A választás napja elérkezett!";
        return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    document.getElementById("countdown").innerHTML =
        `${days} nap ${hours} óra ${minutes} perc ${seconds} másodperc`;
}

setInterval(updateCountdown, 1000);
updateCountdown();
