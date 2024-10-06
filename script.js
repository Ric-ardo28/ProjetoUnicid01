const formulario = document.getElementById("cadastroForm");
const Inome = document.getElementById("nome");
const Isobrenome = document.getElementById("sobrenome");
const Itelefone = document.getElementById("telefone");
const Iemail = document.getElementById("email");
const Isenha = document.getElementById("senha");
const Iconfirmarsenha = document.getElementById("confirmarSenha");



function cadastrar(){
    fetch("http://localhost:8080/usuario",
        {
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method:"POST",
            body:JSON.stringify({ 
                nome: Inome.value,
                sobrenome: Isobrenome.value,
                telefone: Itelefone.value,
                email: Iemail.value,
                senha: Isenha.value,
                
                })
    })
    .then(function (res) {console.log(res)})
    .catch(function (res) {console.log(res)});
    
};

function limpar(){
    Inome.value = "";
    Isobrenome.value = "";
    Itelefone.value = "";
    Iemail.value = "";
    Isenha.value = "";
    Iconfirmarsenha.value = "";
        
    };

function loginCadastro(){
    window.location.href = "login.html";
}    
function compararSenhas() {
        const senha = document.getElementById('senha').value;
        const confirmarSenha = document.getElementById('confirmarSenha').value;
      
        if (senha !== confirmarSenha) {
            alert('As senhas não coincidem.');
            return false;
        } else {
            alert('Cadastro realizado com sucesso')
            return true;
        }
    }
    

formulario.addEventListener('submit', function (event){
    event.preventDefault();
    if (compararSenhas()) {
        cadastrar();
        limpar();
        loginCadastro();
    }
});
