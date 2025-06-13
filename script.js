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
