"use strict";

import Chart from 'chart.js/auto';

/**
 * Hämtar antagningsdata från extern källa
 * @returns {Promise <array>} JSON-data
 */
async function fetchData() {
    const response = await fetch("https://mallarmiun.github.io/Frontend-baserad-webbutveckling/Moment%205%20-%20Dynamiska%20webbplatser/statistik_sokande_ht25.json");
        if (!response.ok) {
            throw new Error("Kunde inte hämta data");
        }
        return await response.json();
}

/**
 * Skapar stapeldiagram
 * @param {array} courses - Lista med kurser
 */
function createBarChart(courses) {
    const ctx =document.getElementById('barChart');

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: courses.map(c => c.name),
            datasets: [{
                label: 'Totalt antal sökande',
                data: courses.map(c => Number(c.applicantsTotal.trim())),
                backgroundColor: '#3a6ea5'
            }]
        },
        options: {
            responsive: true
        }
    });
}
async function init() {
    const data = await fetchData();

    const topCourses = data
        .filter(item => item.type === "Kurs")
        .sort((a, b) =>
            Number(b.applicantsTotal.trim()) -
            Number(a.applicantsTotal.trim())
        )
        .slice(0, 6);

    createBarChart(topCourses);
}

init();