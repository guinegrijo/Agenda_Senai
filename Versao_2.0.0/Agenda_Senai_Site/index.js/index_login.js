// Faz com que as divs fiquem com a classe border_red no foco dos inputs
const div_email = window.document.getElementById('div_email')
const input_email = window.document.getElementById('input_email')
const div_senha = window.document.getElementById('div_senha')
const input_password = window.document.getElementById('input_password')

input_email.addEventListener('focus', () => {
    div_email.classList.add('border_red')
    div_email.classList.remove('border_black')
})

input_email.addEventListener('blur', () => {
    div_email.classList.remove('border_red')
    div_email.classList.add('border_black')
})

input_password.addEventListener('focus', () => {
    div_senha.classList.add('border_red')
    div_senha.classList.remove('border_black')
})

input_password.addEventListener('blur', () => {
    div_senha.classList.remove('border_red')
    div_senha.classList.add('border_black')
})

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