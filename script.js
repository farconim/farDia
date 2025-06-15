// Анімація для крапок
const blobs = document.querySelectorAll('.blob');

blobs.forEach((blob, index) => {
    const startX = Math.random() * 100;
    const startY = Math.random() * 100;
    const startScale = 1.1 + Math.random() * 0.5;
    blob.style.transform = `translate(${startX}vw, ${startY}vh) scale(${startScale})`;
    animateBlob(blob, index * 3000);
});

function animateBlob(blob, delay) {
    const animate = () => {
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        const scale = 1.1 + Math.random() * 0.5;
        blob.animate([
            { transform: `translate(${x}vw, ${y}vh) scale(${scale})` }
        ], {
            duration: 40000 + Math.random() * 10000,
            direction: 'alternate',
            iterations: Infinity,
            easing: 'ease-in-out',
            delay
        });
    };
    animate();
}

// Масштабування карток
const scrollContainer = document.querySelector('.card-scroll-container');
const cards = document.querySelectorAll('.passport-card');

const state = {
    scaleTargets: [],
    scaleCurrents: [],
};

cards.forEach(() => {
    state.scaleTargets.push(1);
    state.scaleCurrents.push(1);
});

function updateCardScales() {
    const containerRect = scrollContainer.getBoundingClientRect();
    const containerCenter = containerRect.left + containerRect.width / 2;

    cards.forEach((card, i) => {
        const cardRect = card.getBoundingClientRect();
        const cardCenter = cardRect.left + cardRect.width / 2;
        const distance = Math.abs(containerCenter - cardCenter);

        const maxDistance = containerRect.width / 2 + cardRect.width;
        const minScale = 0.85;
        const targetScale = Math.max(minScale, 1 - distance / maxDistance * (1 - minScale));

        state.scaleTargets[i] = targetScale;
    });
}

function animateScales() {
    cards.forEach((card, i) => {
        const current = state.scaleCurrents[i];
        const target = state.scaleTargets[i];
        const lerped = current + (target - current) * 0.15;
        state.scaleCurrents[i] = lerped;
        card.style.transform = `scale(${lerped})`;
    });

    requestAnimationFrame(animateScales);
}

scrollContainer.addEventListener('scroll', updateCardScales);
window.addEventListener('load', () => {
    updateCardScales();
    animateScales();
});
window.addEventListener('resize', updateCardScales);

// Перевертання картки
cards.forEach(card => {
    const inner = document.createElement('div');
    inner.classList.add('passport-card-inner');

    const front = document.createElement('div');
    front.classList.add('passport-card-front');

    const back = document.createElement('div');
    back.classList.add('passport-card-back');

    while (card.firstChild) {
        front.appendChild(card.firstChild);
    }

    inner.appendChild(front);
    inner.appendChild(back);
    card.appendChild(inner);

    card.addEventListener('click', () => {
        card.classList.toggle('flipped');
    });
});
