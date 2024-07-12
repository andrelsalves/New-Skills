document.addEventListener('DOMContentLoaded', (event) => {
    const container = document.getElementById("container");
    const registerBtn = document.getElementById("register");
    const loginBtn = document.getElementById("login");

    registerBtn.addEventListener("click", () => {
        container.classList.add("active");
    });

    loginBtn.addEventListener("click", () => {
        container.classList.remove("active");
    });
});

function validate(event) {
    event.preventDefault(); // Prevent default form submission
    submit(); // Call the submit function for authentication
}

function submit() {
    // Retrieve user input
    var UserEmail = document.getElementById('user-email').value;
    var UserPassword = document.getElementById('passw').value;

    // Perform client-side validation
    if (!UserEmail || !UserPassword) {
        alert("Please enter both email and password");
        return;
    }

    // Create an XMLHttpRequest object
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "/login", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    // Define the response handler
    xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                if (xhr.responseText === "admin") {
                    window.location.href = '/admin';
                } else if (xhr.responseText === "user") {
                    window.location.href = '/user';
                } else {
                    alert("Incorrect email or password");
                }
            } else {
                alert("An error occurred");
            }
        }
    };

    // Send the request with the user credentials
    xhr.send(`username=${UserEmail}&password=${UserPassword}`);
}


