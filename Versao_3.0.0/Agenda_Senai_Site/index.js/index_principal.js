const menu_humbuguer = window.document.getElementById('menu_humbuguer');
const div_icones = window.document.getElementById('div_icones');
const img_p = window.document.querySelectorAll('.img_p');

let status_hambuguer = false;

menu_humbuguer.addEventListener('click', (event) => {
    if (status_hambuguer) {
        div_icones.style.backgroundColor = 'white';
        img_p.forEach(p => {
            p.style.display = 'none'; // Esconder os p
        });
    } else {
        div_icones.style.backgroundColor = 'whitesmoke';
        img_p.forEach(p => {
            p.style.display = 'block'; // Mostrar os p
        });
    }

    status_hambuguer = !status_hambuguer; // Inverte o estado

    event.stopPropagation(); // Impede que o clique se propague para o document
});

document.addEventListener('click', () => {
    div_icones.style.backgroundColor = 'white';
    img_p.forEach(p => {
        p.style.display = 'none'; // Esconder os p ao clicar fora
    });
    status_hambuguer = false;
});
