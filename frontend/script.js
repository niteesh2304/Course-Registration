// ===============================
// COURSE REGISTRATION SYSTEM
// ===============================

// DOM ELEMENTS

const registerForm =
document.getElementById("registerForm");

const studentTableBody =
document.getElementById("studentTableBody");

const courseDropdown =
document.getElementById("courseName");

const toast =
document.getElementById("toast");


// ===============================
// SMOOTH SCROLL
// ===============================

function scrollToCourses() {

    document
        .getElementById("courses")
        .scrollIntoView({
            behavior: "smooth"
        });
}


// ===============================
// AUTO SELECT COURSE
// ===============================

function selectCourse(courseName) {

    document
        .getElementById("register")
        .scrollIntoView({
            behavior: "smooth"
        });

    courseDropdown.value = courseName;

    showToast(
        `${courseName} selected`
    );
}


// ===============================
// TOAST MESSAGE
// ===============================

function showToast(
    message,
    success = true
) {

    toast.innerText = message;

    toast.style.display = "block";

    toast.style.background =
        success
            ? "#22c55e"
            : "#ef4444";

    setTimeout(() => {

        toast.style.display = "none";

    }, 3000);
}


// ===============================
// LOCAL STORAGE
// ===============================

function getStudents() {

    return JSON.parse(
        localStorage.getItem(
            "students"
        )
    ) || [];
}

function saveStudents(
    students
) {

    localStorage.setItem(
        "students",
        JSON.stringify(
            students
        )
    );
}


// ===============================
// LOAD STUDENTS
// ===============================

function loadStudents() {

    const students =
        getStudents();

    studentTableBody.innerHTML = "";

    if (
        students.length === 0
    ) {

        studentTableBody.innerHTML =
            `
            <tr>
                <td colspan="5">
                    No Students Registered Yet
                </td>
            </tr>
        `;

        return;
    }

    students.forEach(
        (
            student,
            index
        ) => {

            studentTableBody.innerHTML +=
                `
            <tr>

                <td>
                    ${student.name}
                </td>

                <td>
                    ${student.email}
                </td>

                <td>
                    ${student.phone}
                </td>

                <td>
                    ${student.course}
                </td>

                <td>

                    <button
                    class="delete-btn"
                    onclick="deleteStudent(${index})">

                    Delete

                    </button>

                </td>

            </tr>
            `;
        }
    );
}


// ===============================
// DELETE STUDENT
// ===============================

function deleteStudent(
    index
) {

    let students =
        getStudents();

    students.splice(
        index,
        1
    );

    saveStudents(
        students
    );

    loadStudents();

    showToast(
        "Student Removed"
    );
}


// ===============================
// REGISTER STUDENT
// ===============================

registerForm.addEventListener(
    "submit",
    function (e) {

        e.preventDefault();

        const name =
            document
            .getElementById(
                "studentName"
            )
            .value
            .trim();

        const email =
            document
            .getElementById(
                "email"
            )
            .value
            .trim();

        const phone =
            document
            .getElementById(
                "phone"
            )
            .value
            .trim();

        const course =
            document
            .getElementById(
                "courseName"
            )
            .value;

        // Validation

        if (
            name === "" ||
            email === "" ||
            phone === "" ||
            course === ""
        ) {

            showToast(
                "Fill all fields",
                false
            );

            return;
        }

        // Email Validation

        const emailPattern =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (
            !emailPattern.test(
                email
            )
        ) {

            showToast(
                "Invalid Email",
                false
            );

            return;
        }

        // Phone Validation

        if (
            phone.length !== 10 ||
            isNaN(phone)
        ) {

            showToast(
                "Enter valid 10 digit phone number",
                false
            );

            return;
        }

        // Duplicate Check

        const students =
            getStudents();

        const alreadyExists =
            students.some(
                student =>
                    student.email ===
                    email
            );

        if (
            alreadyExists
        ) {

            showToast(
                "Email already registered",
                false
            );

            return;
        }

        // Student Object

        const student = {

            name: name,

            email: email,

            phone: phone,

            course: course,

            registrationDate:
                new Date()
                .toLocaleDateString()
        };

        students.push(
            student
        );

        saveStudents(
            students
        );

        loadStudents();

        registerForm.reset();

        showToast(
            "Registration Successful 🎉"
        );
    }
);


// ===============================
// SEARCH STUDENTS
// ===============================

function searchStudents() {

    const keyword =
        document
        .getElementById(
            "searchInput"
        )
        ?.value
        .toLowerCase();

    const students =
        getStudents();

    const filtered =
        students.filter(
            student =>

                student.name
                    .toLowerCase()
                    .includes(
                        keyword
                    ) ||

                student.email
                    .toLowerCase()
                    .includes(
                        keyword
                    ) ||

                student.course
                    .toLowerCase()
                    .includes(
                        keyword
                    )
        );

    renderFilteredStudents(
        filtered
    );
}


function renderFilteredStudents(
    students
) {

    studentTableBody.innerHTML = "";

    students.forEach(
        (
            student,
            index
        ) => {

            studentTableBody.innerHTML +=
                `
            <tr>

                <td>
                    ${student.name}
                </td>

                <td>
                    ${student.email}
                </td>

                <td>
                    ${student.phone}
                </td>

                <td>
                    ${student.course}
                </td>

                <td>

                    <button
                    class="delete-btn"
                    onclick="deleteStudent(${index})">

                    Delete

                    </button>

                </td>

            </tr>
        `;
        }
    );
}


// ===============================
// PAGE LOAD
// ===============================

window.onload =
function () {

    loadStudents();

    showToast(
        "Welcome to CourseHub"
    );
};