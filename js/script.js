document.addEventListener("DOMContentLoaded", function () {
    const audios = [
        { nombre: "Agustin", archivo: "../audios/audio1.mp3" },
        { nombre: "Papa", archivo: "../audios/audio2.mp3" },
        { nombre: "Paula Clandestino", archivo: "../audios/audio3.mp3" },
        { nombre: "Oriol", archivo: "../audios/audio1.mp3" },
        // Más audios si los tienes...
    ];

    const audioList = document.getElementById("audioList");
    let currentAudio = null;
    let currentAudioElement = null;

    audios.forEach((audio, index) => {
        const gradientClass = index % 2 === 0 ? "gradient-a" : "gradient-b";

        // Creamos el contenedor de la card
        const cardCol = document.createElement("div");
        cardCol.classList.add("col-12", "mb-4");

        // Estructura HTML de la card
        cardCol.innerHTML = `
            <div class="card shadow-sm rounded p-3 ${gradientClass}" id="card-${index}">
                <div class="d-flex justify-content-between align-items-center">
                    <!-- Texto que se muestra por defecto y donde se revelará el nombre -->
                    <h4 class="m-0" id="audio-name-${index}">Descubre quién hay detrás</h4>

                    <!-- Botón con icono del ojo -->
                    <button class="toggle-name ms-auto" data-index="${index}" aria-label="Ver nombre">
                        <i class="fa-solid fa-eye"></i>
                    </button>
                </div>

                <!-- Contenedor con el audio (oculto por defecto) -->
                <div class="audio-container" id="audio-container-${index}" style="display: none;">
                    <audio controls playsinline id="audio-${index}">
                        <source src="${audio.archivo}" type="audio/mp3">
                        Tu navegador no soporta el elemento de audio.
                    </audio>
                </div>
            </div>
        `;

        // Referencia a la card
        const card = cardCol.querySelector(`#card-${index}`);

        // Evento de click en la card para mostrar/ocultar el audio
        card.addEventListener("click", function (e) {
            // Evitamos que se abra/cierre la card si:
            // - el click viene del botón toggle-name (ojo)
            // - o si el click viene de un elemento <audio>
            //   (p.ej. Play, barra de progreso...) para no cerrarse en Safari
            if (e.target.closest('.toggle-name') || e.target.closest('audio')) {
                return;
            }

            const audioContainer = document.getElementById(`audio-container-${index}`);
            const audioElement = document.getElementById(`audio-${index}`);

            // Si hay un audio abierto, lo cerramos antes de abrir otro
            if (currentAudio && currentAudio !== audioContainer) {
                currentAudio.style.display = "none";
                if (currentAudioElement) {
                    currentAudioElement.pause();
                    currentAudioElement.currentTime = 0;
                }
            }

            // Abrimos/cerramos el audio actual
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

        // Evento para mostrar/ocultar el nombre en el h4 y cambiar el icono
        const toggleNameBtn = cardCol.querySelector(".toggle-name");
        toggleNameBtn.addEventListener("click", function (e) {
            // Evitamos que el click en el botón “ojo” cierre la card
            e.stopPropagation();

            const nameElement = document.getElementById(`audio-name-${index}`);
            const icon = this.querySelector("i");

            if (nameElement.textContent === "Descubre quién hay detrás") {
                nameElement.textContent = audio.nombre;
                icon.classList.remove("fa-eye");
                icon.classList.add("fa-eye-slash");
            } else {
                nameElement.textContent = "Descubre quién hay detrás";
                icon.classList.remove("fa-eye-slash");
                icon.classList.add("fa-eye");
            }
        });

        audioList.appendChild(cardCol);
    });
});
