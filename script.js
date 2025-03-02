document.addEventListener('DOMContentLoaded', () => {
    const character = document.getElementById('character');
    const tapSound = document.getElementById('tap-sound');
    const scoreDisplay = document.getElementById('score');
    const explosionVideo = document.getElementById('explosion-video'); // Video element for explosion
    const endingVideo = document.getElementById('ending-video'); // Video element for ending

    const images = ['asuka1.jpeg', 'asuka2.jpeg', 'asuka3.jpeg'];
    let currentImageIndex = 0;
    let score = 0;

    // Function to handle the click event
    function handleClick() {
        if (score < 200) { // Only allow clicks if score is less than 200
            tapSound.currentTime = 0;
            tapSound.play();

            currentImageIndex = (currentImageIndex + 1) % images.length;
            character.src = images[currentImageIndex];

            score++;
            scoreDisplay.textContent = score;

            // Check for explosion trigger
            if (score % 50 === 0) {
                triggerExplosion();
            }

            // Check for ending condition
            if (score === 200) {
                triggerEnding();
            }
        }
    }

    // Function to trigger explosion effect
    function triggerExplosion() {
        explosionVideo.style.left = `${character.offsetLeft}px`;
        explosionVideo.style.top = `${character.offsetTop}px`;
        explosionVideo.style.width = `${character.offsetWidth}px`;
        explosionVideo.style.height = `${character.offsetHeight}px`;
        explosionVideo.style.position = 'absolute';
        explosionVideo.style.display = 'block';
        explosionVideo.play();

        explosionVideo.onended = () => {
            explosionVideo.style.display = 'none';
            triggerEnding();
        };
    }

    // Function to trigger ending effect
    function triggerEnding() {
        endingVideo.style.display = 'block';
        endingVideo.playbackRate = 2.0; // Speed up the video
        endingVideo.play();
    }

    // Add event listener to character element
    character.addEventListener('click', handleClick);
});