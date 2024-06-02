document.getElementById('theme-toggle').addEventListener('click', () => {
    document.body.classList.toggle('light-mode');
    document.body.classList.toggle('dark-mode');
});

document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Evita o envio padrão do formulário

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const loginError = document.getElementById('login-error');

    const data = { email, password };

    fetch('http://localhost:3000/users/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        if (response.status === 200) {
            return response.json();
        } else {
            throw new Error('Email ou senha incorretos');
        }
    })
    .then(user => {
        // Armazenar informações do usuário no localStorage
        localStorage.setItem('userName', user.name);
        localStorage.setItem('userEmail', user.email);

        // Redirecionar para a página de perfil
        window.location.href = 'profile.html';
    })
    .catch(error => {
        loginError.textContent = error.message;
        loginError.style.display = 'block';
    });
});
