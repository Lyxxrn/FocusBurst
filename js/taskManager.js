document.addEventListener("DOMContentLoaded", () => {
    const addTaskButton = document.getElementById("addTaskButton");
    const taskTitleInput = document.getElementById("taskTitle");
    const taskDescriptionInput = document.getElementById("taskDescription");
    const taskDueDateInput = document.getElementById("taskDueDate");
    const taskPriorityInput = document.getElementById("taskPriority");
    const createdList = document.getElementById("createdList"); // "Erstellt"-Section
    const inProgressList = document.getElementById("inProgressList");
    const completedList = document.getElementById("completedList");
    const deletedList = document.getElementById("deletedList");

    // Task Section Headers
    const sectionHeaders = document.querySelectorAll(".card-header");

    // Füge für jede Section einen Event Listener zum Ein- und Ausklappen hinzu
    sectionHeaders.forEach(header => {
        header.addEventListener("click", function () {
            const taskList = this.nextElementSibling; // Die nächste Liste finden (die ul nach dem Header)
            const arrow = this.querySelector('.arrow'); // Finde das Pfeilsymbol

            if (taskList.style.display === "none" || taskList.style.display === "") {
                taskList.style.display = "block"; // Sichtbar machen
                arrow.style.transform = "rotate(90deg)"; // Pfeil nach unten drehen
            } else {
                taskList.style.display = "none"; // Verstecken
                arrow.style.transform = "rotate(0deg)"; // Pfeil nach rechts drehen
            }
        });
    });

    // Standardmäßig alle Listen ausblenden (optional)
    [createdList, inProgressList, completedList, deletedList].forEach(list => {
        list.style.display = "none";
    });

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
        listItem.classList.add("list-group-item", "task-item");

        // Füge den Inhalt zum Listenelement hinzu
        listItem.innerHTML = `
            <div class="task-info">
                <strong>${title}</strong>
                <p>${description}</p>
                <small>Fällig am: ${dueDate} | Priorität: ${getPriorityText(priority)}</small>
            </div>
            <button class="btn btn-primary start-btn">Starten</button> <!-- Button zum Starten -->
            <button class="btn btn-danger delete-btn">Löschen</button>
        `;

        // Event Listener für den "Starten"-Button
        listItem.querySelector(".start-btn").addEventListener("click", () => {
            moveToInProgress(listItem);
        });

        // Event Listener für die "Löschen"-Schaltfläche
        listItem.querySelector(".delete-btn").addEventListener("click", () => {
            moveToDeleted(listItem);
        });

        // Füge das Listenelement zur "Erstellt"-Section hinzu
        createdList.appendChild(listItem);

        // Leere die Eingabefelder nach dem Hinzufügen
        resetInputFields();

        // Aktualisiere die Aufgabenzähler
        updateTaskCount("createdSection", createdList.children.length);
    }

    function moveToInProgress(listItem) {
        inProgressList.appendChild(listItem);
        listItem.querySelector(".start-btn").remove(); // Entferne den "Starten"-Button
        listItem.querySelector(".delete-btn").textContent = "Erledigt";
        listItem.querySelector(".delete-btn").classList.replace("btn-danger", "btn-success");

        // Event Listener für "Erledigt" hinzufügen
        listItem.querySelector(".delete-btn").addEventListener("click", () => {
            moveToCompleted(listItem);
        });

        // Füge einen neuen "Löschen"-Button hinzu
        const deleteButton = document.createElement("button");
        deleteButton.classList.add("btn", "btn-danger", "delete-btn");
        deleteButton.textContent = "Löschen";
        listItem.appendChild(deleteButton);

        // Event Listener für den "Löschen"-Button
        deleteButton.addEventListener("click", () => {
            moveToDeleted(listItem);
        });

        // Aktualisiere die Aufgabenzähler
        updateTaskCount("inProgressSection", inProgressList.children.length);
    }

    function moveToCompleted(listItem) {
        // Entferne vorhandene Buttons, um doppelte "Endgültig Löschen"-Buttons zu vermeiden
        listItem.querySelectorAll("button").forEach(button => button.remove());

        // Füge den Button "Endgültig Löschen" hinzu
        const deleteButton = document.createElement("button");
        deleteButton.classList.add("btn", "btn-warning", "delete-btn");
        deleteButton.textContent = "Endgültig Löschen";
        listItem.appendChild(deleteButton);

        // Event Listener für endgültiges Löschen
        deleteButton.addEventListener("click", () => {
            finalDeleteTask(listItem);
        });

        // Verschiebe das Listenelement in die "Erledigt"-Liste
        completedList.appendChild(listItem);

        // Aktualisiere die Aufgabenzähler
        updateTaskCount("completedSection", completedList.children.length);
    }

    function moveToDeleted(listItem) {
        deletedList.appendChild(listItem);

        // Entferne "Starten"-Button oder einen weiteren "Löschen"-Button
        listItem.querySelector(".start-btn")?.remove();
        listItem.querySelector(".delete-btn").remove();

        // Füge einen neuen "Endgültig Löschen"-Button hinzu (nur einer)
        const deleteButton = document.createElement("button");
        deleteButton.classList.add("btn", "btn-secondary", "delete-btn");
        deleteButton.textContent = "Endgültig Löschen";
        listItem.appendChild(deleteButton);

        // Event Listener für endgültiges Löschen hinzufügen
        deleteButton.addEventListener("click", () => {
            finalDeleteTask(listItem);
        });

        // Aktualisiere die Aufgabenzähler
        updateTaskCount("deletedSection", deletedList.children.length);
    }

    // Finales Löschen einer Aufgabe nach Bestätigung
    function finalDeleteTask(listItem) {
        if (confirm("Sind Sie sicher, dass Sie diese Aufgabe endgültig löschen möchten?")) {
            listItem.remove();

            // Aktualisiere die Aufgabenzähler nach dem endgültigen Löschen
            updateTaskCount("completedSection", completedList.children.length);
            updateTaskCount("deletedSection", deletedList.children.length);
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

    function updateTaskCount(sectionId, count) {
        const section = document.getElementById(sectionId);
        section.querySelector('.task-count').textContent = `(${count})`;
    }
});
