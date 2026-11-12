document.addEventListener('DOMContentLoaded', async () => {
    // Verificar sesión activa
    const { data: { session }, error } = await supabaseClient.auth.getSession();

    if (!session) {
        // Si no hay sesión, redirigir al index
        window.location.href = 'index.html';
        return;
    }

    const user = session.user;
    const email = user.email;
    const name = user.user_metadata?.full_name || email.split('@')[0];

    // Actualizar elementos de la interfaz con los datos del usuario
    document.querySelectorAll('[data-user-name]').forEach(el => {
        el.textContent = name;
    });

    document.querySelectorAll('[data-user-email]').forEach(el => {
        el.textContent = email;
    });

    const avatarEl = document.getElementById('user-avatar');
    if (avatarEl) {
        avatarEl.textContent = name.charAt(0).toUpperCase();
    }

    const userIdEl = document.getElementById('user-id');
    if (userIdEl) {
        userIdEl.textContent = user.id;
    }

    // Botón de Cerrar Sesión
    const btnLogout = document.getElementById('btn-logout');
    if (btnLogout) {
        btnLogout.addEventListener('click', async () => {
            await supabaseClient.auth.signOut();
            window.location.href = 'index.html';
        });
    }
});