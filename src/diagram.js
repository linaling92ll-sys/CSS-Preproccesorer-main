"use strict";

import Chart from 'chart.js/auto';

/**
 * Hämtar antagningsdata från extern JSON-fil.
 * @async
 * @returns {Promise <array>} En lista med kurs- och programobjekt.
 * @throws {Error} Om datan inte kan hämtas.
 */
async function fetchData() {
  const response = await fetch("https://mallarmiun.github.io/Frontend-baserad-webbutveckling/Moment%205%20-%20Dynamiska%20webbplatser/statistik_sokande_ht25.json");
  if (!response.ok) {
    throw new Error("Kunde inte hämta data");
  }
  return await response.json();
}

/**
 * Skapar ett stapeldiagram med de mest sökta kurserna.
 * @param {array} courses - Lista med kurser
 */
function createBarChart(courses) {
  const ctx = document.getElementById('barChart');

  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: courses.map(c => c.name.split(" ")),
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
/**
 * Skapar cirkeldiagram med de mest sökta programmen.
 * @param {Array} programs - Lista med program
 */
function createPieChart(programs) {
  const ctx = document.getElementById("pieChart");

  new Chart(ctx, {
    type: "pie",
    data: {
      labels: programs.map(p => p.name),
      datasets: [{
        data: programs.map(p =>
          Number(p.applicantsTotal.trim())
        ),
        backgroundColor: [
          "#3a6ea5",
          "#ff9f40",
          "#4bc0c0",
          "#9966ff",
          "#ff6384"
        ]
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

  const topPrograms = data
    .filter(item => item.type === "Program")
    .sort((a, b) =>
      Number(b.applicantsTotal.trim()) -
      Number(a.applicantsTotal.trim())
    )
    .slice(0, 5);

  createBarChart(topCourses);
  createPieChart(topPrograms);
}

/**
 * Initierar diagrammen genom att hämta data,
 * filtrera och sortera kurser och program.
 */
init();