let studentData = JSON.parse(localStorage.getItem("student"));

const form = document.getElementById("registrationForm");
const studentList = document.getElementById("studentList");
const studentInfo = document.getElementById("studentInfo");

let students = JSON.parse(localStorage.getItem("clubStudents")) || [];

if (studentData) {
    studentInfo.innerHTML = `
        Name: ${studentData.name} <br>
        ID: ${studentData.id}
    `;
}

form.addEventListener("submit", function (e) {
    e.preventDefault();

    let club = document.querySelector('input[name="club"]:checked');

    if (!club) {
        alert("Please select one club!");
        return;
    }

    let exists = students.find(s => s.id === studentData.id);

    if (exists) {
        alert("You have already joined a club!");
        return;
    }

    let newEntry = {
        id: studentData.id,
        name: studentData.name,
        club: club.value
    };

    students.push(newEntry);

    localStorage.setItem("clubStudents", JSON.stringify(students));

    displayStudents();

    alert("Successfully Registered!");
});

function displayStudents() {
    studentList.innerHTML = "";

    students.forEach(s => {
        let li = document.createElement("li");
        li.textContent = `${s.name} (${s.id}) - ${s.club}`;
        studentList.appendChild(li);
    });
}

displayStudents();