"use strict";
/**
 * Hämtar koordinater från Nominatim API
 * @param {string} location - Platsnamn
 * @returns {Promise<Object>} Objekt med lattitud och longitud
 */
async function fetchCoordinates(location) {
    const response = await fetch(
  `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(location)}&limit=1`
);
    if (!response.ok) {
        throw new Error("Kunde inte hämta koordinater");
    }

    const data = await response.json();

    if (data.length === 0) {
        throw new Error("Platsen hittades inte");
    }

    return {
        lat: data[0].lat,
        lon: data[0].lon
    };
}

/**
 * Visar plats på kartan
 * @param {number} lat - Latitud
 * @param {number} lon - Longitud
 */
function showMap(lat, lon) {
  const mapFrame = document.getElementById("mapFrame");

  mapFrame.src = `https://www.openstreetmap.org/export/embed.html?bbox=${lon - 0.01},${lat - 0.01},${lon + 0.01},${lat + 0.01}&layer=mapnik&marker=${lat},${lon}`;
}

/**
 * Initierar formulär
 */
function init() {
    showMap(62.39, 17.31);
    const form = document.getElementById("mapForm");
    const input = document.getElementById("locationInput");

    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        try {
            const coords = await fetchCoordinates(input.value);
            showMap(Number(coords.lat), Number(coords.lon));
        } catch (error) {
            alert(error.message);
        }
    })
}

init();