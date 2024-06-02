document.getElementById('theme-toggle').addEventListener('click', () => {
    document.body.classList.toggle('light-mode');
    document.body.classList.toggle('dark-mode');
});

window.addEventListener('DOMContentLoaded', (event) => {
    const email = localStorage.getItem('userEmail');
    fetch(`http://localhost:3000/users/profile?email=${email}`)
        .then(response => response.json())
        .then(user => {
            document.getElementById('name').value = user.name;
            document.getElementById('email').value = user.email;
            document.getElementById('cep').value = user.cep;
            document.getElementById('address').value = user.address;
            document.getElementById('neighborhood').value = user.neighborhood;
            document.getElementById('state').value = user.state;
            document.getElementById('complement').value = user.complement;
            document.getElementById('number').value = user.number;
        })
        .catch(error => console.error('Erro ao carregar perfil:', error));
});

document.getElementById('profile-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Evita o envio padrão do formulário

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;
    const cep = document.getElementById('cep').value;
    const address = document.getElementById('address').value;
    const neighborhood = document.getElementById('neighborhood').value;
    const state = document.getElementById('state').value;
    const complement = document.getElementById('complement').value;
    const number = document.getElementById('number').value;
    const passwordError = document.getElementById('password-error');

    if (password !== confirmPassword) {
        passwordError.textContent = "As senhas não coincidem. Por favor, verifique e tente novamente.";
        passwordError.style.display = 'block';
        return;
    } else {
        passwordError.style.display = 'none';
    }

    const data = { name, email, password, cep, address, neighborhood, state, complement, number };

    fetch('http://localhost:3000/users/profile', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.text())
    .then(message => {
        alert(message);
    })
    .catch(error => console.error('Erro ao atualizar perfil:', error));
});
