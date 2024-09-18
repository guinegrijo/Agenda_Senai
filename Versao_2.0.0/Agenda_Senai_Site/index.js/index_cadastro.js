const div_nome = window.document.getElementById('div_nome')
const input_nome = window.document.getElementById('input_nome')
const div_email = window.document.getElementById('div_email')
const input_email = window.document.getElementById('input_email')
const div_senha = window.document.getElementById('div_senha')
const input_password = window.document.getElementById('input_password')
const div_confSenha = window.document.getElementById('div_confSenha')
const input_conf_password = window.document.getElementById('input_conf_password')

//=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=

// Faz a div cadastro aparecer na tela com efeito

const hidden = [...window.document.querySelectorAll('.hidden')]

const myObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show')
        }
    })
})

hidden.forEach((el) => {
    myObserver.observe(el)
})

//=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=

//Validações de formulario

const msg_validacao = window.document.getElementById('msg_validacao')
const form = window.document.getElementById('form')
const campos = window.document.querySelectorAll('.required') //inputs
const span   = window.document.querySelectorAll('.span-required') //span
const email = /^\w+([-+.']\w+)*@docente\.senai\.br$/ //validação para email pego pronto na internet

//faz com que os campos.parentNode (pais do inputs) recebao as border corretamente
campos.forEach((campo_elemento) => {
    campo_elemento.addEventListener('focus', () => {
        if (campo_elemento.parentNode.style.borderColor !== 'red') {
            campo_elemento.parentNode.style.border = '2px solid #af2e2e'
        }
    })

    campo_elemento.addEventListener('blur', () => {
        if (campo_elemento.parentNode.style.borderColor !== 'red') {
            campo_elemento.parentNode.style.border = '1px solid black';
        }
    })
})

function animacao(){ //Mensagem de cadastro efetuado
    msg_validacao.classList.remove('anima_voltar')
    msg_validacao.classList.add('anima')
    msg_validacao.style = 'top: 25px;'
    setTimeout(()=>{
        msg_validacao.classList.remove('anima')
        msg_validacao.classList.add('anima_voltar')
        msg_validacao.style = 'top: -25px;'
        
    }, 10000)
}

form.addEventListener('submit', (event) =>{
    event.preventDefault()//toda vez que clicar em enviar para e faz um verificação
    let valid = true
    

    nomeValidacao()
    emailValidacao()
    cpfValidacao()
    mainPasswordValidacao()
    comparePassword()

    for (let i = 0; i < campos.length; i++) {
            if (campos[i].parentNode.style.borderColor === 'red') {
                valid = false
            }
    }
    
    if (valid) {
        animacao()
        for (let i = 0; i < campos.length; i++) {
            campos[i].value = ''
            campos[i].parentNode.style.border = '1px solid black'
        }
    }

    
})



function setError(index){
    campos[index].parentNode.style.border = '2px solid red'
    span[index].style.display = 'block'
}

function removeError(index){
    if(campos[index].parentNode.style.borderColor === 'red'){
        campos[index].parentNode.style.border = '2px solid #af2e2e'
    }
    span[index].style.display = 'none'
}





function nomeValidacao(){
    if(campos[0].value.length < 3){
        setError(0)
    }
    else {
        removeError(0)
    }
}

function emailValidacao(){
    if(email.test(campos[1].value)){
        removeError(1)
    }
    else{
        setError(1)
    }
}

function cpfValidacao(){
    if(campos[2].value.length < 14){
        setError(2)
    } else{
        removeError(2)
    }
}

function mainPasswordValidacao(){
    if(campos[3].value.length < 8){
        setError(3)
    }
    else{
        removeError(3)
        comparePassword()
    }
}

function comparePassword(){
    if(campos[3].value == campos[4].value && campos[3].value.length >=8){
        removeError(4)
    }
    else{
        setError(4)
    }
}


//desbugar o btn de criar conta
const btn_criarConta = window.document.querySelector('.btn_criarConta')

btn_criarConta.addEventListener('click', ()=>{
    btn_criarConta.style.backgroundColor = '#215299'
    btn_criarConta.style.color = 'white'
    btn_criarConta.style.border = '1px solid black'
})

btn_criarConta.addEventListener('mouseenter',()=>{
    btn_criarConta.style.backgroundColor = '#072755'
    btn_criarConta.style.color = 'white'
})

btn_criarConta.addEventListener('mouseleave',()=>{
    btn_criarConta.style.backgroundColor = '#215299'
    btn_criarConta.style.color = 'white'
})

//-=-=-=-=-=-=--=-=--=-=-=-=--=-=--=-=-=-=--=-=--=-=-=-=--=-=--=-=-=-=--=-=--=-=-=-=--=-=-=-=-=-=--=-=-=-=-=-=--=-=-

//Faz com que o input cpf aceite apenas números e coloque os . e - corretamente 
//O método replace em JavaScript é usado para substituir parte de uma string por outra

document.getElementById('input_cpf').addEventListener('input', (el)=>{
    let cpf = el.target.value.replace(/\D/g, '') // Remove tudo que não for dígito
    cpf = cpf.replace(/(\d{3})(\d)/, '$1.$2') // Coloca o primeiro ponto
    cpf = cpf.replace(/(\d{3})(\d)/, '$1.$2') // Coloca o segundo ponto
    cpf = cpf.replace(/(\d{3})(\d{1,2})$/, '$1-$2') // Coloca o traço no penúltimo lugar

    el.target.value = cpf
})

//-=-=-=-=-=-=--=-=--=-=-=-=--=-=--=-=-=-=--=-=--=-=-=-=--=-=--=-=-=-=--=-=--=-=-=-=--=-=-=-=-=-=--=-=-=-=-=-=--=-=-


// Faz com que mude o type do input senha para text

const olhoEscondido_senha = window.document.getElementById("olhoEscondido_senha")
const olhoAberto_senha = window.document.getElementById('olhoAberto_senha')

olhoEscondido_senha.addEventListener('click', ()=>{
    let senhaInput = window.document.getElementById('input_password')
    if (senhaInput.type === 'password'){
        senhaInput.type = 'text'
        olhoEscondido_senha.style.display = 'none'
        olhoAberto_senha.style.display = 'block'
    }
})

olhoAberto_senha.addEventListener('click', ()=>{
    let senhaInput = window.document.getElementById('input_password')
    if (senhaInput.type === 'text'){
        senhaInput.type = 'password'
        olhoEscondido_senha.style.display = 'block'
        olhoAberto_senha.style.display = 'none'
    }
})

// Faz com que mude o type do input confSenha para text

const olhoEscondido_confsenha = window.document.getElementById("olhoEscondido_confsenha")
const olhoAberto_confsenha = window.document.getElementById('olhoAberto_confsenha')

olhoEscondido_confsenha.addEventListener('click', ()=>{
    let senhaInput = window.document.getElementById('input_conf_password')
    if (senhaInput.type === 'password'){
        senhaInput.type = 'text'
        olhoEscondido_confsenha.style.display = 'none'
        olhoAberto_confsenha.style.display = 'block'
    }
})

olhoAberto_confsenha.addEventListener('click', ()=>{
    let senhaInput = window.document.getElementById('input_conf_password')
    if (senhaInput.type === 'text'){
        senhaInput.type = 'password'
        olhoEscondido_confsenha.style.display = 'block'
        olhoAberto_confsenha.style.display = 'none'
    }
})

/* Hoje é quarta-feira!! */