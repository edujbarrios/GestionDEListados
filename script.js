let highlightedLinesArray = [];

document.addEventListener('DOMContentLoaded', () => {
    // Evento para cargar un archivo
    document.getElementById('fileInput').addEventListener('change', function() {
        const reader = new FileReader();
        reader.onload = function() {
            document.getElementById('textBox').value = this.result;
        };
        reader.readAsText(this.files[0]);
    });

    // Seleccionamos el elemento de entrada de texto y el botón de búsqueda
    const searchInput = document.getElementById('searchInput');
    const searchButton = document.querySelector('button');

    // Añadimos el detector de eventos 'keydown'
    searchInput.addEventListener('keydown', function(event) {
        // Verificamos si la tecla presionada es "Enter"
        if (event.key === 'Enter') {
            // Evitamos que se envíe un formulario si estamos dentro de uno
            event.preventDefault();

            // Llamamos a la función de búsqueda
            searchText();
        }
    });

    // Este es solo un ejemplo. Asegúrate de llamar a tu propia función de búsqueda
    // cuando el botón de búsqueda sea presionado.
    searchButton.addEventListener('click', function() {
        searchText();
    });
});

function searchText() {
    const searchValue = document.getElementById('searchInput').value.trim();
    const lines = document.getElementById('textBox').value.split('\n');
    let found = false;

    for (let i = 0; i < lines.length; i++) {
        const wordsInLine = lines[i].split(' ');
        if (wordsInLine.includes(searchValue)) {
            if (!highlightedLinesArray.includes(lines[i])) {
                highlightedLinesArray.push(lines[i]);
                found = true;
            }
        }
    }

    if (found) {
        document.getElementById('result').innerText = "Línea(s) resaltada(s).";
    } else {
        document.getElementById('result').innerText = "Sin resultados.";
    }

    document.getElementById('highlightedLines').innerHTML = highlightedLinesArray.map(line => `<div class="highlighted">${line}</div>`).join('');
    document.getElementById('lineCounter').innerText = `Total líneas resaltadas: ${highlightedLinesArray.length}`;

    // Limpiamos el cuadro de búsqueda
    document.getElementById('searchInput').value = '';
}

function toggleDarkMode() {
    const currentTheme = document.body.getAttribute("data-theme");
    const newTheme = currentTheme === "dark" ? "light" : "dark";
    document.body.setAttribute("data-theme", newTheme);
    document.getElementById('darkModeToggle').innerText = newTheme === "dark" ? "☀️ Modo Claro" : "🌙 Modo Oscuro";
}
