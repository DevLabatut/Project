document.getElementById('theme-toggle').addEventListener('click', () => {
    document.body.classList.toggle('light-mode');
    document.body.classList.toggle('dark-mode');
});

document.getElementById('cep').addEventListener('blur', function() {
    const cep = this.value.replace(/\D/g, '');
    if (cep) {
        const url = `https://viacep.com.br/ws/${cep}/json/`;
        fetch(url)
            .then(response => response.json())
            .then(data => {
                if (!("erro" in data)) {
                    document.getElementById('address').value = data.logradouro;
                    document.getElementById('neighborhood').value = data.bairro;
                    document.getElementById('state').value = data.uf;
                } else {
                    alert("CEP não encontrado.");
                }
            })
            .catch(error => console.error('Erro ao buscar CEP:', error));
    }
});

const profileOptions = document.querySelectorAll('input[name="profile-type"]');
profileOptions.forEach(option => {
    option.addEventListener('change', function() {
        const descriptions = document.querySelectorAll('#profile-description p');
        descriptions.forEach(desc => desc.classList.remove('active'));
        const selectedProfile = this.value;
        document.getElementById(`${selectedProfile}-description`).classList.add('active');
    });
});

document.getElementById('create-account-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Evita o envio padrão do formulário

    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;
    const passwordError = document.getElementById('password-error');

    if (password !== confirmPassword) {
        document.getElementById('confirm-password').classList.add('error');
        passwordError.textContent = "As senhas não coincidem. Por favor, verifique e tente novamente.";
        passwordError.style.display = 'block';
    } else {
        passwordError.style.display = 'none';
        document.getElementById('confirm-password').classList.remove('error');

        const formData = new FormData(document.getElementById('create-account-form'));
        const data = Object.fromEntries(formData.entries());

        // Adiciona um log para verificar o valor do profile-type
        console.log('Profile Type:', data['profile-type']); 

        fetch('http://localhost:3000/users/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => response.text())
        .then(message => {
            alert(message);
        })
        .catch(error => console.error('Erro ao criar conta:', error));
    }
});
