const BASE_URL = "http://localhost:8080";

const modal = document.getElementById("modal");
const toast = document.getElementById("toast");

function scrollToCourses() {

    document
        .getElementById("courses")
        .scrollIntoView({
            behavior: "smooth"
        });
}

function openForm(course) {

    modal.style.display = "flex";

    document
        .getElementById("courseInput")
        .value = course;
}

function closeForm() {

    modal.style.display = "none";
}

window.onclick = function (event) {

    if (event.target === modal) {

        closeForm();
    }
};

function showToast(message, success = true) {

    toast.innerText = message;

    toast.style.background =
        success ? "#22c55e" : "#ef4444";

    toast.style.display = "block";

    setTimeout(() => {

        toast.style.display = "none";

    }, 3000);
}

document
    .getElementById("registerForm")
    .addEventListener(
        "submit",
        async function (e) {

            e.preventDefault();

            const studentName =
                document.getElementById("studentName").value;

            const email =
                document.getElementById("email").value;

            const courseName =
                document.getElementById("courseInput").value;

            const data = {
                studentName,
                email,
                courseName
            };

            try {

                const response =
                    await fetch(
                        `${BASE_URL}/courses/register`,
                        {
                            method: "POST",

                            headers: {
                                "Content-Type":
                                    "application/json"
                            },

                            body:
                                JSON.stringify(data)
                        }
                    );

                if (response.ok) {

                    showToast(
                        "Registration Successful 🎉"
                    );

                    this.reset();

                    closeForm();

                    loadStudents();

                } else {

                    showToast(
                        "Registration Failed",
                        false
                    );
                }

            } catch (error) {

                console.error(error);

                showToast(
                    "Server Not Running",
                    false
                );
            }
        }
    );

async function loadStudents() {

    try {

        const response =
            await fetch(
                `${BASE_URL}/courses/enrolled`
            );

        const students =
            await response.json();

        const tbody =
            document.getElementById(
                "studentTableBody"
            );

        tbody.innerHTML = "";

        students.forEach(student => {

            tbody.innerHTML += `
            <tr>
                <td>${student.studentName}</td>
                <td>${student.email}</td>
                <td>${student.courseName}</td>
            </tr>
            `;
        });

    } catch (error) {

        console.log(error);
    }
}

window.onload = () => {

    loadStudents();
};