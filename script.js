document.getElementById('addRow').addEventListener('click', function() {
    let table = document.querySelector('table');
    let newRow = table.insertRow();

    let courseCell = newRow.insertCell(0);
    let gradeCell = newRow.insertCell(1);
    let weightCell = newRow.insertCell(2);

    courseCell.innerHTML = '<input type="text" placeholder="Course">';
    gradeCell.innerHTML = '<input type="text" placeholder="Grade (%)">';
    weightCell.innerHTML = `
        <select>
            <option value="1.0">1.0</option>
            <option value="0.5">0.5</option>
        </select>`;
});

document.getElementById('computeGPA').addEventListener('click', function() {
    let table = document.querySelector('table');
    let rows = table.rows;
    let totalGPA = 0;
    let totalWeight = 0;

    for (let i = 1; i < rows.length; i++) {
        let grade = parseFloat(rows[i].cells[1].querySelector('input').value);
        let weight = parseFloat(rows[i].cells[2].querySelector('select').value);

        let gpamark = 0;
        if (grade >= 90) {
            gpamark = 4;
        } else if (grade >= 85) {
            gpamark = 3.9;
        } else if (grade >= 80) {
            gpamark = 3.7;
        } else if (grade >= 77) {
            gpamark = 3.3;
        } else if (grade >= 73) {
            gpamark = 3;
        } else if (grade >= 70) {
            gpamark = 2.7;
        } else if (grade >= 67) {
            gpamark = 2.3;
        } else if (grade >= 63) {
            gpamark = 2;
        } else if (grade >= 60) {
            gpamark = 1.7;
        } else if (grade >= 57) {
            gpamark = 1.3;
        } else if (grade >= 53) {
            gpamark = 1;
        } else if (grade >= 50) {
            gpamark = 0.7;
        } else {
            gpamark = 0;
        }

        totalGPA += gpamark * weight;
        totalWeight += weight;
    }

    let cGPA = totalGPA / totalWeight;
    alert(`Your GPA is: ${cGPA.toFixed(2)}`);
});
