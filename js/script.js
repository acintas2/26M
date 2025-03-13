document.addEventListener("DOMContentLoaded", function () {
    // 1) Inyectamos un pequeño bloque de CSS para la animación (si prefieres, muévelo a tu style.css)
    const style = document.createElement('style');
    style.innerHTML = `
        /* Oculta la card y la desplaza un poco hacia abajo */
        .card-hidden {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.5s ease, transform 0.5s ease;
        }
        /* Al hacerse visible, vuelve a su posición y opacidad 100% */
        .card-visible {
            opacity: 1;
            transform: translateY(0);
        }
    `;
    document.head.appendChild(style);

    // 2) Array de audios
    const audios = [
        { nombre: "Agustin Cintas", archivo: "../audios/audio1.mp3" },
        { nombre: "Gloria López", archivo: "../audios/gloria.mp3" },
        { nombre: "Mama", archivo: "../audios/mama.mp3" },
        { nombre: "Papa", archivo: "../audios/papa.mp3" },
        { nombre: "Francesc Cintas", archivo: "../audios/francesc.mp3" },
        { nombre: "Mireia Meya", archivo: "../audios/meya.mp3" },
        { nombre: "Mireia Petardos CM", archivo: "../audios/mireiapetardos.mp3" },
        { nombre: "Pedro Petardos CM", archivo: "../audios/pedropetardos.mp3" },
        { nombre: "Merche Petardos CM", archivo: "../audios/merchepetardos.mp3" },
        { nombre: "Marta Balada", archivo: "../audios/balada.mp3" },
        // Más audios...
    ];

    const audioList = document.getElementById("audioList");
    let currentAudio = null;
    let currentAudioElement = null;

    // 3) Generamos dinámicamente las cards
    audios.forEach((audio, index) => {
        const gradientClass = index % 2 === 0 ? "gradient-a" : "gradient-b";

        const cardCol = document.createElement("div");
        cardCol.classList.add("col-12", "mb-4");

        // Contenido de la card
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

        // Referencia principal a la card
        const card = cardCol.querySelector(`#card-${index}`);
        // Inicialmente la card estará oculta con animación
        card.classList.add("card-hidden");

        // Lógica de abrir/cerrar audio
        card.addEventListener("click", function (e) {
            // Evita que al hacer click en el botón (ojo) o en el audio
            // se abra/cierre la card (especialmente Safari)
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

            // Alternar la visibilidad de este audio
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

        // Lógica de mostrar/ocultar el nombre con el botón del “ojo”
        const toggleNameBtn = cardCol.querySelector(".toggle-name");
        toggleNameBtn.addEventListener("click", function (e) {
            e.stopPropagation(); // evita que se cierre la card

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

    // 4) Configuramos IntersectionObserver para que cada card se haga visible al aparecer en pantalla
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                // Si la card está a la vista, le añadimos "card-visible"
                entry.target.classList.add("card-visible");
                // Dejar de observar esa card, para no volver a animarla cada vez que sale/entra
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    // Observar cada card con clase “card” y no “cardCol” (para asegurarnos de observar el elemento exacto)
    const allCards = document.querySelectorAll(".card.shadow-sm");
    allCards.forEach((card) => observer.observe(card));
});
