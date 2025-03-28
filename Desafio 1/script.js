// JavaScript para a página de perfil (Desafio 1)

// 1. Efeito de digitação na biografia
function typeWriterEffect() {
    const bioText = "João Silva é o Presidente da empresa TELECOM INC, com mais de 20 anos de experiência no mercado de tecnologia. Ele é conhecido por sua visão estratégica e liderança inspiradora, que têm guiado a empresa a novos patamares de sucesso.";
    const bioElement = document.querySelector('.bio p');
    let i = 0;
    
    bioElement.textContent = ''; // Limpa o texto inicial
    
    function type() {
        if (i < bioText.length) {
            bioElement.textContent += bioText.charAt(i);
            i++;
            setTimeout(type, Math.random() * 50 + 30); // Velocidade aleatória para efeito mais natural
        }
    }
    
    type();
}

// 2. Animação nos hobbies
function animateHobbies() {
    const hobbiesItems = document.querySelectorAll('.hobbies li');
    
    hobbiesItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-20px)';
        item.style.transition = `all 0.5s ease ${index * 0.2}s`;
        
        // Usando setTimeout para garantir que as transições sejam aplicadas antes de animar
        setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'translateX(0)';
        }, 100);
    });
}

// 3. Contador de visitas (simulado)
function updateVisitCounter() {
    const visitCounter = document.createElement('div');
    visitCounter.className = 'visit-counter';
    visitCounter.style.position = 'fixed';
    visitCounter.style.bottom = '20px';
    visitCounter.style.right = '20px';
    visitCounter.style.backgroundColor = 'var(--primary-color)';
    visitCounter.style.color = 'var(--container-bg)';
    visitCounter.style.padding = '10px 15px';
    visitCounter.style.borderRadius = '5px';
    visitCounter.style.fontSize = '0.9em';
    
    // Simulando um contador - na prática, isso viria de um servidor ou localStorage
    let visits = localStorage.getItem('profileVisits') || 0;
    visits = parseInt(visits) + 1;
    localStorage.setItem('profileVisits', visits);
    
    visitCounter.textContent = `Visitas: ${visits}`;
    document.body.appendChild(visitCounter);
}

// 4. Efeito de zoom na imagem de perfil ao passar o mouse
function setupProfileImageZoom() {
    const profileImg = document.querySelector('.profile-img');
    
    profileImg.addEventListener('mouseenter', () => {
        profileImg.style.transform = 'scale(1.05)';
        profileImg.style.transition = 'transform 0.3s ease';
    });
    
    profileImg.addEventListener('mouseleave', () => {
        profileImg.style.transform = 'scale(1)';
    });
}

// 5. Mensagem de confirmação ao clicar nos links sociais
function setupSocialLinksConfirmation() {
    const socialLinks = document.querySelectorAll('.social-links a');
    
    socialLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const socialNetwork = link.querySelector('img').alt;
            if (!confirm(`Você está sendo redirecionado para o ${socialNetwork}. Deseja continuar?`)) {
                e.preventDefault();
            }
        });
    });
}

// 6. Mudança de cor do título ao passar o mouse
function setupTitleHoverEffect() {
    const title = document.querySelector('h1');
    
    title.addEventListener('mouseenter', () => {
        title.style.color = '#ff5722'; // Cor laranja
        title.style.transition = 'color 0.3s ease';
    });
    
    title.addEventListener('mouseleave', () => {
        title.style.color = 'var(--primary-color)';
    });
}

// Inicializa todas as funções quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', () => {
    typeWriterEffect();
    animateHobbies();
    updateVisitCounter();
    setupProfileImageZoom();
    setupSocialLinksConfirmation();
    setupTitleHoverEffect();
    
    // Adiciona um ouvinte para o tema escuro/claro para ajustar dinamicamente os estilos
    const htmlElement = document.documentElement;
    const observer = new MutationObserver(() => {
        // Reaplica estilos quando o tema muda
        animateHobbies();
    });
    
    observer.observe(htmlElement, { attributes: true, attributeFilter: ['data-theme'] });
});