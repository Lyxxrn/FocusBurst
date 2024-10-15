document.addEventListener('DOMContentLoaded', () => {
    let completedTasks = 50; // Beispielhafte abgeschlossene Tasks
    let totalTasks = 2100; // Beispielhafte erstellte Tasks

    // DOM-Elemente
    const completedTasksCountElement = document.getElementById('completedTasksCount');
    const totalTasksCountElement = document.getElementById('totalTasksCount');
    const taskProgressElement = document.getElementById('taskProgress'); // Progress Bar Element
    const currentYearElements = document.getElementsByClassName('currentYear'); // Elemente für das aktuelle Jahr

    // Funktion zur Aktualisierung der Progress-Bar
    function updateProgressBar() {
        taskProgressElement.value = (completedTasks / totalTasks) * 100; // Setzt den Wert der Progress-Bar
    }

    // Funktion zur Aktualisierung der Task-Werte
    function updateTaskCounts() {
        completedTasksCountElement.textContent = completedTasks; // Aktualisiert abgeschlossene Tasks
        totalTasksCountElement.textContent = totalTasks; // Aktualisiert erstellte Tasks
    }

    // Zeige das aktuelle Jahr in allen Elementen mit der Klasse 'currentYear' an
    const currentYear = getCurrentYear();
    Array.from(currentYearElements).forEach((element) => {
        element.textContent = currentYear;
    });

    // Berechnet die aktuelle Kalenderwoche
    function getWeekNumber(date) {
        const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
        const pastDaysOfYear = (date - firstDayOfYear) / 86400000;
        return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
    }

    // Holt die Kalenderwochen des aktuellen Monats
    function getCalendarWeeksOfCurrentMonth() {
        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();
        const weeks = new Set();

        // Start am ersten Tag des Monats
        let date = new Date(year, month, 1);

        // Gehe durch den Monat, um die Kalenderwochen zu sammeln
        while (date.getMonth() === month) {
            weeks.add(`KW ${getWeekNumber(date)}`);
            date.setDate(date.getDate() + 7); // Zur nächsten Woche springen
        }

        return Array.from(weeks);
    }

    // Holt die Tage der aktuellen Woche (Montag bis Sonntag)
    function getCurrentWeekDays() {
        const today = new Date();
        const dayOfWeek = today.getDay(); // 0 (Sonntag) bis 6 (Samstag)
        const weekDays = [];

        // Berechne den Montag der aktuellen Woche
        const monday = new Date(today);
        monday.setDate(today.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1)); // Gehe auf Montag zurück

        // Füge die Tage der Woche hinzu
        for (let i = 0; i < 7; i++) {
            const day = new Date(monday);
            day.setDate(monday.getDate() + i);
            weekDays.push(day.toLocaleDateString('de-DE', { weekday: 'short', day: 'numeric' }));
        }

        return weekDays;
    }

    function getYearMonths() {
        return ['Jan', 'Feb', 'Mär', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dez'];
    }

    function getCurrentYear() {
        const currentDate = new Date();
        return currentDate.getFullYear();
    }

    // Charts initialisieren
    const taskChart = new Chart(document.getElementById('taskChart'), {
        type: 'bar',
        data: {
            labels: getCurrentWeekDays(), // Tage der aktuellen Woche für den Start
            datasets: [{
                label: 'Abgeschlossene Tasks',
                backgroundColor: '#007bff',
                data: [5, 6, 7, 8, 9, 10, 11] // Beispielhafte Daten für die Woche
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

    const pomodoroChart = new Chart(document.getElementById('pomodoroChart'), {
        type: 'bar',
        data: {
            labels: getCurrentWeekDays(), // Tage der aktuellen Woche für den Start
            datasets: [{
                label: 'Absolvierte Pomodoros',
                backgroundColor: '#28a745',
                data: [8, 6, 7, 9, 5, 10, 12] // Beispielhafte Daten für die Woche
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

    // Task-Statistiken aktualisieren
    function updateTaskStats(period) {
        let data, labels;

        if (period === 'weekly') {
            labels = getCurrentWeekDays(); // Tage der aktuellen Woche
            data = [5, 6, 7, 8, 9, 10, 11]; // Beispiel-Daten für die Woche
        } else if (period === 'monthly') {
            labels = getCalendarWeeksOfCurrentMonth(); // Kalenderwochen des aktuellen Monats
            data = [50, 45, 60, 70, 20]; // Beispiel-Daten für den Monat
        } else if (period === 'yearly') {
            labels = getYearMonths(); // Monate des aktuellen Jahres
            data = [400, 380, 500, 450, 470, 420, 430, 460, 480, 500, 520, 540]; // Beispiel-Daten für das Jahr
        }

        taskChart.data.labels = labels;
        taskChart.data.datasets[0].data = data;
        taskChart.update();
    }

    // Pomodoro-Statistiken aktualisieren
    function updatePomodoroStats(period) {
        let data, labels;

        if (period === 'weekly') {
            labels = getCurrentWeekDays(); // Tage der aktuellen Woche
            data = [8, 6, 7, 9, 5, 10, 12]; // Beispiel-Daten für die Woche
        } else if (period === 'monthly') {
            labels = getCalendarWeeksOfCurrentMonth(); // Kalenderwochen des aktuellen Monats
            data = [40, 35, 60, 50]; // Beispiel-Daten für den Monat
        } else if (period === 'yearly') {
            labels = getYearMonths(); // Monate des aktuellen Jahres
            data = [300, 320, 310, 330, 300, 310, 320, 350, 340, 360, 370, 380]; // Beispiel-Daten für das Jahr
        }

        pomodoroChart.data.labels = labels;
        pomodoroChart.data.datasets[0].data = data;
        pomodoroChart.update();
    }

    // Funktionen global verfügbar machen
    window.filterTaskStats = updateTaskStats;
    window.filterPomodoroStats = updatePomodoroStats;

    // Initiale Statistiken laden
    updateTaskStats('weekly');
    updatePomodoroStats('weekly');
    // Initiale Aktualisierung der Progress-Bar
    updateProgressBar();
    updateTaskCounts();
});
