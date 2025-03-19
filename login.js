let isLogin = false; 

function toggleForm() {
    isLogin = !isLogin;

    document.getElementById("form-title").innerText = isLogin ? "Вход" : "Регистрация";
    document.getElementById("main-btn").innerText = isLogin ? "Войти" : "Зарегистрироваться";
    document.getElementById("toggle-btn").innerText = isLogin ? "Нет аккаунта?" : "Уже есть аккаунт?";
    
    document.getElementById("phone-group").style.display = isLogin ? "none" : "block";
}

function togglePassword() {
    let passwordInput = document.getElementById("password");
    let toggleBtn = document.getElementById("toggle-password");
    
    if (passwordInput.type === "password") {
        passwordInput.type = "text";
        toggleBtn.innerText = "Скрыть пароль";
    } else {
        passwordInput.type = "password";
        toggleBtn.innerText = "Показать пароль";
    }
}

function validateEmail(email) {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|ru|net|org|gov)$/;
    return emailRegex.test(email);
}

function validatePhone(phone) {
    const cleanedPhone = phone.replace(/\s+/g, "");
    const phoneRegex = /^\+7\d{10}$/;
    return phoneRegex.test(cleanedPhone);
}

function validatePassword(password) {
    return password.length >= 6;
}

function submitForm() {
    let email = document.getElementById("email").value.trim();
    let phone = document.getElementById("phone").value.trim();
    let password = document.getElementById("password").value.trim();

    let emailError = document.getElementById("email-error");
    let phoneError = document.getElementById("phone-error");
    let passwordError = document.getElementById("password-error");

    emailError.textContent = "";
    phoneError.textContent = "";
    passwordError.textContent = "";

    let isValid = true;

    if (!validateEmail(email)) {
        emailError.textContent = "Неправильно введён email.";
        isValid = false;
    }

    if (!isLogin && !validatePhone(phone)) {
        phoneError.textContent = "Введите корректный номер телефона.";
        isValid = false;
    }

    if (!validatePassword(password)) {
        passwordError.textContent = "Пароль должен содержать минимум 6 символов.";
        isValid = false;
    }

    if (isValid) {
        alert(isLogin ? "Вы успешно вошли!" : "Регистрация прошла успешно!");
    }
}
