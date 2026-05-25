// MENU MOBILE
function toggleMenu(){
    const menu = document.getElementById("mobileMenu");
    menu.classList.toggle("hidden");
}


// ======================
// REVEAL SIMPLES E ESTÁVEL
// ======================

document.addEventListener("DOMContentLoaded", function(){

    const elements = document.querySelectorAll(".reveal");

    function revealOnScroll(){

        const windowHeight = window.innerHeight;

        elements.forEach(element => {

            const elementTop =
            element.getBoundingClientRect().top;

            if(elementTop < windowHeight - 100){
                element.classList.add("show");
            }

        });

    }

    window.addEventListener("scroll", revealOnScroll);

    // ativa ao carregar também
    revealOnScroll();

});


// HEADER
window.addEventListener("scroll", () => {

const header = document.querySelector("header");

if(window.scrollY > 50){
header.classList.add("header-scroll");
}else{
header.classList.remove("header-scroll");
}

});


// AVALIAÇÕES


// FORMULÁRIO DE CONTATO

const FORM_ENDPOINT = 'enviar-formulario.php';

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contactForm');
  const status = document.getElementById('formStatus');
  const phoneInput = document.getElementById('phone');
  const emailInput = document.getElementById('email');

  if (!form) return;

  // 📱 MÁSCARA DE TELEFONE
  phoneInput.addEventListener('input', (e) => {
    let value = e.target.value.replace(/\D/g, '');

    if (value.length > 11) value = value.slice(0, 11);

    if (value.length > 0) {
      value = value.replace(/^(\d{2})(\d)/g, '($1) $2');
    }

    if (value.length > 10) {
      value = value.replace(/(\d{5})(\d{4})$/, '$1-$2');
    } else {
      value = value.replace(/(\d{4})(\d{4})$/, '$1-$2');
    }

    e.target.value = value;
  });

  // 🚨 VALIDAÇÃO DE E-MAIL
  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  // 🚨 SUBMIT COM VALIDAÇÕES
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = form.name.value.trim();
    const email = emailInput.value.trim();
    const phone = phoneInput.value.replace(/\D/g, '');
    const orcamento = form.orcamento.value.trim();
    const message = form.message.value.trim();

    // Campos obrigatórios
    if (!name || !email || !phone || !orcamento || !message) {
      status.textContent = 'Preencha todos os campos obrigatórios.';
      status.style.color = 'red';
      return;
    }

    // Validação email
    if (!isValidEmail(email)) {
      status.textContent = 'Digite um e-mail válido.';
      status.style.color = 'red';
      emailInput.focus();
      return;
    }

    // Validação telefone (celular BR com 9)
    if (!/^(\d{2})9\d{8}$/.test(phone)) {
      status.textContent = 'Digite um celular válido com DDD. Ex: (21) 9XXXX-XXXX';
      status.style.color = 'red';
      phoneInput.focus();
      return;
    }

    status.textContent = 'Enviando...';
    status.style.color = 'blue';

    try {
      const formData = new FormData(form);

      const res = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        body: formData
      });

      if (res.ok) {
        status.textContent = 'Mensagem enviada com sucesso!';
        status.style.color = 'green';
        form.reset();
      } else {
        status.textContent = 'Erro ao enviar. Tente novamente.';
        status.style.color = 'red';
      }

    } catch (err) {
      status.textContent = 'Erro de conexão.';
      status.style.color = 'red';
    }
  });
});