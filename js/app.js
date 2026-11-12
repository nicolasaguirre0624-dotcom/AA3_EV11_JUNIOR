const authScreen = document.getElementById('auth-screen');
const appScreen = document.getElementById('app-screen');
const loginForm = document.getElementById('login-form');
const registerForm = document.getElementById('register-form');
const authMessage = document.getElementById('auth-message');
const tabButtons = document.querySelectorAll('.tab-btn');
const logoutBtn = document.getElementById('logout-btn');

function showMessage(text, isError = true) {
    authMessage.innerHTML = isError
        ? `<span class="message-icon">!</span><span>${text}</span>`
        : `<span>${text}</span>`;
}

function setActiveTab(tabName) {
    const loginVisible = tabName === 'login';
    document.getElementById('login-form').classList.toggle('hidden', !loginVisible);
    document.getElementById('register-form').classList.toggle('hidden', loginVisible);
    tabButtons.forEach((button) => {
        const active = button.dataset.tab === tabName;
        button.classList.toggle('active', active);
    });
    authMessage.innerHTML = '';
}

tabButtons.forEach((button) => {
    button.addEventListener('click', () => setActiveTab(button.dataset.tab));
});

loginForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const email = document.getElementById('login-email').value.trim();
    const password = document.getElementById('login-password').value;

    if (password.length < 6) {
        showMessage(`Alarga el texto a 6 o más caracteres (actualmente, usas ${password.length} caracteres).`);
        return;
    }

    const safeName = (email.split('@')[0] || 'Ney')
        .replace(/[._-]+/g, ' ')
        .replace(/\b\w/g, (char) => char.toUpperCase());

    document.getElementById('app-user-name').textContent = safeName;
    document.getElementById('sidebar-name').textContent = safeName;
    document.getElementById('sidebar-email').textContent = email;
    document.getElementById('sidebar-avatar').textContent = safeName.charAt(0).toUpperCase();

    authScreen.classList.add('hidden');
    appScreen.classList.remove('hidden');
});

registerForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const email = document.getElementById('register-email').value.trim();
    const password = document.getElementById('register-password').value;
    const confirm = document.getElementById('register-confirm-password').value;

    if (password.length < 6) {
        showMessage('La contraseña debe tener al menos 6 caracteres.');
        return;
    }

    if (password !== confirm) {
        showMessage('Las contraseñas no coinciden.');
        return;
    }

    document.getElementById('login-email').value = email;
    document.getElementById('login-password').value = password;
    setActiveTab('login');
    showMessage('Cuenta creada correctamente. Puedes iniciar sesión.', false);
});

logoutBtn.addEventListener('click', () => {
    appScreen.classList.add('hidden');
    authScreen.classList.remove('hidden');
    setActiveTab('login');
    loginForm.reset();
    registerForm.reset();
});

setActiveTab('login');
