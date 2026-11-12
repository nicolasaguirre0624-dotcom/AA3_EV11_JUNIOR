document.addEventListener('DOMContentLoaded', () => {
    const tabLogin = document.getElementById('tab-login');
    const tabRegister = document.getElementById('tab-register');
    const formLogin = document.getElementById('form-login');
    const formRegister = document.getElementById('form-register');
    const msgDiv = document.getElementById('auth-message');

    // Alternar pestañas
    tabLogin.addEventListener('click', () => {
        tabLogin.classList.add('active');
        tabRegister.classList.remove('active');
        formLogin.style.display = 'block';
        formRegister.style.display = 'none';
        msgDiv.textContent = '';
    });

    tabRegister.addEventListener('click', () => {
        tabRegister.classList.add('active');
        tabLogin.classList.remove('active');
        formRegister.style.display = 'block';
        formLogin.style.display = 'none';
        msgDiv.textContent = '';
    });

    // Manejar Login
    formLogin.addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;

        msgDiv.style.color = '#2563eb';
        msgDiv.textContent = 'Iniciando sesión...';

        const { data, error } = await supabaseClient.auth.signInWithPassword({
            email,
            password
        });

        if (error) {
            msgDiv.style.color = '#ef4444';
            msgDiv.textContent = 'Error: ' + error.message;
        } else {
            msgDiv.style.color = '#10b981';
            msgDiv.textContent = '¡Inicio de sesión exitoso! Redirigiendo...';
            setTimeout(() => {
                window.location.href = 'dashboard.html';
            }, 1000);
        }
    });

    // Manejar Registro
    formRegister.addEventListener('submit', async (e) => {
        e.preventDefault();
        const name = document.getElementById('register-name').value;
        const email = document.getElementById('register-email').value;
        const password = document.getElementById('register-password').value;
        const confirmPassword = document.getElementById('register-confirm-password').value;

        if (password !== confirmPassword) {
            msgDiv.style.color = '#ef4444';
            msgDiv.textContent = 'Las contraseñas no coinciden.';
            return;
        }

        msgDiv.style.color = '#2563eb';
        msgDiv.textContent = 'Registrando cuenta...';

        const { data, error } = await supabaseClient.auth.signUp({
            email,
            password,
            options: {
                data: { full_name: name || 'Nicolás Aguirre' }
            }
        });

        if (error) {
            msgDiv.style.color = '#ef4444';
            msgDiv.textContent = 'Error: ' + error.message;
        } else {
            msgDiv.style.color = '#10b981';
            msgDiv.textContent = '¡Registro exitoso! Ya puedes iniciar sesión.';
        }
    });
});