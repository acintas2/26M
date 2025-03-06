document.addEventListener("DOMContentLoaded", function () {
    const audios = [
        { nombre: "Audio 1", archivo: "audios/audio1.mp3" },
        { nombre: "Audio 2", archivo: "audios/audio2.mp3" },
        { nombre: "Audio 3", archivo: "audios/audio3.mp3" },
        { nombre: "Audio 3", archivo: "audios/audio3.mp3" },
        { nombre: "Audio 3", archivo: "audios/audio3.mp3" },
        { nombre: "Audio 3", archivo: "audios/audio3.mp3" },
        { nombre: "Audio 3", archivo: "audios/audio3.mp3" },
        { nombre: "Audio 3", archivo: "audios/audio3.mp3" },
        { nombre: "Audio 3", archivo: "audios/audio3.mp3" },
        { nombre: "Audio 3", archivo: "audios/audio3.mp3" },
        { nombre: "Audio 3", archivo: "audios/audio3.mp3" },
        { nombre: "Audio 3", archivo: "audios/audio3.mp3" },
        { nombre: "Audio 3", archivo: "audios/audio3.mp3" },
        { nombre: "Audio 3", archivo: "audios/audio3.mp3" },
        { nombre: "Audio 3", archivo: "audios/audio3.mp3" },
        { nombre: "Audio 3", archivo: "audios/audio3.mp3" },
        { nombre: "Audio 3", archivo: "audios/audio3.mp3" }
    ];

    const audioList = document.getElementById("audioList");
    let currentAudio = null;
    let currentAudioElement = null;

    audios.forEach((audio, index) => {
        const gradientClass = index % 2 === 0 ? "gradient-a" : "gradient-b";
        const card = document.createElement("div");
        card.classList.add("col-12", "mb-4");
        card.innerHTML = `
            <div class="card shadow-sm rounded p-3 ${gradientClass}" id="card-${index}">
                <h4 class="font-bold test">${audio.nombre}</h4>
                <div class="audio-container" id="audio-container-${index}" style="display: none;">
                    <audio controls id="audio-${index}">
                        <source src="${audio.archivo}" type="audio/mp3">
                        Tu navegador no soporta el elemento de audio.
                    </audio>
                </div>
            </div>
        `;

        card.addEventListener("click", function () {
            const audioContainer = document.getElementById(`audio-container-${index}`);
            const audioElement = document.getElementById(`audio-${index}`);

            if (currentAudio && currentAudio !== audioContainer) {
                currentAudio.style.display = "none";
                if (currentAudioElement) {
                    currentAudioElement.pause();
                    currentAudioElement.currentTime = 0;
                }
            }

            if (audioContainer.style.display === "none" || audioContainer.style.display === "") {
                audioContainer.style.display = "block";
                currentAudio = audioContainer;
                currentAudioElement = audioElement;
            } else {
                audioContainer.style.display = "none";
                audioElement.pause();
                audioElement.currentTime = 0;
                currentAudio = null;
                currentAudioElement = null;
            }
        });

        audioList.appendChild(card);
    });
});
