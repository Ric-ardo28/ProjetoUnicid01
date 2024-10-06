function login() {
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;

    fetch("http://localhost:8080/usuario/login", {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: email, senha: senha })
    })
    .then(response => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error('Falha no login');
        }
    })
    .then(data => {
        console.log('Usuário logado com sucesso:', data);
        // Redirecionar para a página desejada
        window.location.href = "cursos.html";
        exibirNomeUsuario(data.nome);
    })
    .catch(error => {
        console.error('Erro:', error);
        alert('Falha no login');
    });
}

function exibirNomeUsuario(nome) {
    document.getElementById('usuarioLogado').innerText = `Bem-vindo, ${nome}!`;
}

const loginForm = document.getElementById('loginForm');

loginForm.addEventListener('submit', function (event) {
    event.preventDefault();  // Prevenir o comportamento padrão de submissão do formulário
    login();  // Chamar a função de login ao submeter o formulário
});
