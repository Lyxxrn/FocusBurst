// taskManager.js

document.addEventListener("DOMContentLoaded", () => {
    const addTaskButton = document.getElementById("addTaskButton");
    const taskTitleInput = document.getElementById("taskTitle");
    const taskDescriptionInput = document.getElementById("taskDescription");
    const taskDueDateInput = document.getElementById("taskDueDate");
    const taskPriorityInput = document.getElementById("taskPriority");
    const inProgressList = document.getElementById("inProgressList");
    const completedList = document.getElementById("completedList");
    const deletedList = document.getElementById("deletedList");

    addTaskButton.addEventListener("click", addTask);

    function addTask() {
        const title = taskTitleInput.value.trim();
        const description = taskDescriptionInput.value.trim();
        const dueDate = taskDueDateInput.value;
        const priority = taskPriorityInput.value;

        // Eingabewerte validieren
        if (!title || !description || !dueDate || !priority) {
            alert("Bitte füllen Sie alle Felder aus.");
            return;
        }

        // Erstelle ein neues Listenelement
        const listItem = document.createElement("li");
        listItem.classList.add("task-item");

        // Füge den Inhalt zum Listenelement hinzu
        listItem.innerHTML = `
            <div class="task-info">
                <strong>${title}</strong>
                <p>${description}</p>
                <small>Fällig am: ${dueDate} | Priorität: ${getPriorityText(priority)}</small>
            </div>
            <button class="complete-btn">Erledigt</button>
            <button class="delete-btn">Löschen</button>
        `;

        // Event Listener für die Erledigt-Schaltfläche
        listItem.querySelector(".complete-btn").addEventListener("click", () => {
            moveToCompleted(listItem);
        });

        // Event Listener für die Löschen-Schaltfläche
        listItem.querySelector(".delete-btn").addEventListener("click", () => {
            moveToDeleted(listItem);
        });

        // Füge das Listenelement zur In Bearbeitung-Liste hinzu
        inProgressList.appendChild(listItem);

        // Leere die Eingabefelder nach dem Hinzufügen
        resetInputFields();
    }

    function moveToCompleted(listItem) {
        completedList.appendChild(listItem);
        listItem.querySelector(".complete-btn").remove(); // Entferne den Erledigt-Button
        listItem.querySelector(".delete-btn").textContent = "Endgültig Löschen";
        listItem.querySelector(".delete-btn").addEventListener("click", () => {
            finalDeleteTask(listItem);
        });
    }

    function moveToDeleted(listItem) {
        deletedList.appendChild(listItem);
        listItem.querySelector(".complete-btn").remove(); // Entferne den Erledigt-Button
        listItem.querySelector(".delete-btn").textContent = "Endgültig Löschen";
        listItem.querySelector(".delete-btn").addEventListener("click", () => {
            finalDeleteTask(listItem);
        });
    }

    function finalDeleteTask(listItem) {
        if (confirm("Sind Sie sicher, dass Sie diese Aufgabe endgültig löschen möchten?")) {
            listItem.remove();
        }
    }

    function resetInputFields() {
        taskTitleInput.value = "";
        taskDescriptionInput.value = "";
        taskDueDateInput.value = "";
        taskPriorityInput.selectedIndex = 0; // Setze das Dropdown zurück
    }

    function getPriorityText(priority) {
        switch (priority) {
            case "1":
                return "Niedrig";
            case "2":
                return "Mittel";
            case "3":
                return "Hoch";
            default:
                return "Unbekannt";
        }
    }
});
