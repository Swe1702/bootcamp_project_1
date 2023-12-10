// Function to check if a user exists with given email and password
function isUserExists(email, password) {
  const storedData = JSON.parse(localStorage.getItem("user_data")) || [];
  return storedData.some(
    (user) => user.email === email && user.password === password
  );
}

// Function to check if an email already exists in the stored data
function isEmailExists(email) {
  const storedData = JSON.parse(localStorage.getItem("user_data")) || [];
  return storedData.some((user) => user.email === email);
}

// Function to save user data
function saveUserData(email, username, password) {
  const storedData = JSON.parse(localStorage.getItem("user_data")) || [];

  // Check if the email already exists
  const emailExists = isEmailExists(email);
  if (emailExists) {
    document.getElementById("mail-error").textContent =
      "Email id already exists";

    document.getElementById("username").value = "";
    document.getElementById("password").value = "";
    return;
  }
  document.getElementById("answer").textContent = "Sign up successful!";
  const newUser = {
    email: email,
    username: username,
    password: password, // Note: Consider hashing the password before storing
  };

  storedData.push(newUser);
  localStorage.setItem("user_data", JSON.stringify(storedData));

  document.getElementById("answer").textContent = "Sign up successful!";

  // Reset the input fields after successful sign up
  document.getElementById("email").value = "";
  document.getElementById("username").value = "";
  document.getElementById("password").value = "";
}

// Event listener for login
document.getElementById("onsubmit").addEventListener("click", function () {
  var email = document.getElementById("eml").value;
  var password = document.getElementById("pwd").value;

  if (isUserExists(email, password)) {
    const us = JSON.parse(localStorage.getItem("user_data"));

    us.forEach((element) => {
      if (element.email === email) {
        let user = element.username;
        sessionStorage.setItem("username", JSON.stringify(user));
      }
    });

    window.location.href = "./Homepage/homePage.html";
  } else {
    document.getElementById("pwd-error").textContent =
      "Invalid email or password";
  }
});

// Event listener for registration
document.getElementById("bottom").addEventListener("click", function () {
  var email = document.getElementById("email").value;
  var username = document.getElementById("username").value;
  var password = document.getElementById("password").value;

  if (email && username && password) {
    saveUserData(email, username, password);
    // Show sign up success message instead of opening a new page
  } else {
    document.getElementById("details").textContent =
      "Please complete all fields";
  }
});
