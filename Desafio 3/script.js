/**
 * PORTFÓLIO INTERATIVO - DESAFIO 3
 * 
 * Funcionalidades:
 * 1. Navegação entre seções (Projetos, Sobre, Contato)
 * 2. Visualização detalhada de projetos em modal
 * 3. Sistema de temas claro/escuro
 * 4. Animação de elementos
 * 5. Formulário de contato funcional
 * 6. Carregamento dinâmico de conteúdo
 */

document.addEventListener('DOMContentLoaded', function() {
    // Elementos principais
    const navLinks = document.querySelectorAll('nav a');
    const projects = document.querySelectorAll('.project');
    const body = document.body;
    const mainContent = document.querySelector('section#projetos');
    const themeToggle = createThemeToggle();
    const aboutSection = createAboutSection();
    const contactSection = createContactSection();
    
    // Configuração inicial
    setupNavigation();
    setupProjectInteractions();
    setupThemeSystem();
    loadInitialContent();
    
    /**
     * Cria e configura o botão de alternância de tema
     */
    function createThemeToggle() {
        const toggle = document.createElement('button');
        toggle.id = 'theme-toggle';
        toggle.innerHTML = '🌙 Tema Escuro';
        toggle.style.position = 'fixed';
        toggle.style.top = '20px';
        toggle.style.right = '20px';
        toggle.style.padding = '8px 15px';
        toggle.style.borderRadius = '5px';
        toggle.style.border = 'none';
        toggle.style.backgroundColor = '#8a2be2';
        toggle.style.color = 'white';
        toggle.style.cursor = 'pointer';
        toggle.style.zIndex = '1000';
        toggle.style.transition = 'all 0.3s ease';
        
        document.body.appendChild(toggle);
        return toggle;
    }
    
    /**
     * Cria a seção "Sobre" dinamicamente
     */
    function createAboutSection() {
        const section = document.createElement('section');
        section.id = 'sobre';
        section.style.padding = '20px';
        section.style.maxWidth = '800px';
        section.style.margin = '0 auto';
        section.style.display = 'none'; // Inicialmente oculta
        
        section.innerHTML = `
            <h2>Sobre Mim</h2>
            <div class="about-content">
                <img src="profile.jpg" alt="Foto de perfil" style="width:150px; height:150px; border-radius:50%; float:left; margin-right:20px;">
                <div>
                    <p>Olá! Meu nome é João Silva e sou um desenvolvedor full-stack com mais de 5 anos de experiência.</p>
                    <p>Especializado em JavaScript, React e Node.js, já trabalhei em diversos projetos para clientes de diferentes setores.</p>
                    <h3>Habilidades Técnicas:</h3>
                    <ul>
                        <li>Desenvolvimento Front-end (HTML, CSS, JavaScript, React)</li>
                        <li>Desenvolvimento Back-end (Node.js, Express, MongoDB)</li>
                        <li>Design UI/UX</li>
                        <li>Gestão de Projetos</li>
                    </ul>
                </div>
            </div>
        `;
        
        document.body.insertBefore(section, document.querySelector('footer'));
        return section;
    }
    
    /**
     * Cria a seção "Contato" dinamicamente
     */
    function createContactSection() {
        const section = document.createElement('section');
        section.id = 'contato';
        section.style.padding = '20px';
        section.style.maxWidth = '600px';
        section.style.margin = '0 auto';
        section.style.display = 'none'; // Inicialmente oculta
        
        section.innerHTML = `
            <h2>Entre em Contato</h2>
            <form id="contact-form">
                <div class="form-group">
                    <label for="name">Nome:</label>
                    <input type="text" id="name" name="name" required>
                </div>
                <div class="form-group">
                    <label for="email">E-mail:</label>
                    <input type="email" id="email" name="email" required>
                </div>
                <div class="form-group">
                    <label for="message">Mensagem:</label>
                    <textarea id="message" name="message" rows="5" required></textarea>
                </div>
                <button type="submit">Enviar Mensagem</button>
                <div id="form-feedback" style="margin-top:15px;"></div>
            </form>
        `;
        
        document.body.insertBefore(section, document.querySelector('footer'));
        return section;
    }
    
    /**
     * Configura o sistema de navegação
     */
    function setupNavigation() {
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const target = this.getAttribute('href').substring(1);
                
                // Oculta todas as seções
                mainContent.style.display = 'none';
                aboutSection.style.display = 'none';
                contactSection.style.display = 'none';
                
                // Mostra a seção alvo
                switch(target) {
                    case 'projetos':
                        mainContent.style.display = 'block';
                        break;
                    case 'sobre':
                        aboutSection.style.display = 'block';
                        break;
                    case 'contato':
                        contactSection.style.display = 'block';
                        break;
                }
                
                // Atualiza navegação ativa
                navLinks.forEach(navLink => navLink.classList.remove('active'));
                this.classList.add('active');
                
                // Scroll suave para a seção
                document.getElementById(target).scrollIntoView({
                    behavior: 'smooth'
                });
            });
        });
    }
    
    /**
     * Configura interações com os projetos
     */
    function setupProjectInteractions() {
        projects.forEach(project => {
            // Adiciona botão de detalhes
            const detailsBtn = document.createElement('button');
            detailsBtn.className = 'details-btn';
            detailsBtn.textContent = 'Ver Detalhes';
            detailsBtn.style.cssText = `
                margin-top: 15px;
                padding: 8px 15px;
                background-color: #8a2be2;
                color: white;
                border: none;
                border-radius: 5px;
                cursor: pointer;
                transition: background-color 0.3s;
            `;
            
            detailsBtn.addEventListener('mouseenter', () => {
                detailsBtn.style.backgroundColor = '#7b1fa2';
            });
            
            detailsBtn.addEventListener('mouseleave', () => {
                detailsBtn.style.backgroundColor = '#8a2be2';
            });
            
            detailsBtn.addEventListener('click', () => {
                showProjectModal(project);
            });
            
            project.appendChild(detailsBtn);
            
            // Animação de hover
            project.addEventListener('mouseenter', () => {
                project.style.transform = 'scale(1.02)';
            });
            
            project.addEventListener('mouseleave', () => {
                project.style.transform = 'scale(1)';
            });
        });
    }
    
    /**
     * Mostra o modal com detalhes do projeto
     */
    function showProjectModal(project) {
        const modal = document.createElement('div');
        modal.className = 'project-modal';
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.8);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 2000;
        `;
        
        const modalContent = document.createElement('div');
        modalContent.className = 'modal-content';
        modalContent.style.cssText = `
            background-color: ${body.classList.contains('dark-theme') ? '#333' : '#fff'};
            padding: 30px;
            border-radius: 10px;
            max-width: 600px;
            width: 80%;
            box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
            position: relative;
        `;
        
        const closeBtn = document.createElement('button');
        closeBtn.innerHTML = '&times;';
        closeBtn.style.cssText = `
            position: absolute;
            top: 10px;
            right: 10px;
            background: none;
            border: none;
            font-size: 24px;
            cursor: pointer;
            color: ${body.classList.contains('dark-theme') ? '#fff' : '#333'};
        `;
        
        // Conteúdo do modal
        const projectTitle = project.querySelector('h3').cloneNode(true);
        const projectImg = project.querySelector('img').cloneNode();
        const projectDesc = project.querySelector('p').cloneNode(true);
        
        projectTitle.style.color = '#8a2be2';
        projectTitle.style.marginBottom = '15px';
        projectImg.style.width = '100%';
        projectImg.style.borderRadius = '8px';
        projectImg.style.marginBottom = '15px';
        projectDesc.style.lineHeight = '1.6';
        
        // Botões de navegação entre projetos
        const projectNav = document.createElement('div');
        projectNav.style.display = 'flex';
        projectNav.style.justifyContent = 'space-between';
        projectNav.style.marginTop = '20px';
        
        const prevBtn = document.createElement('button');
        prevBtn.textContent = '← Projeto Anterior';
        prevBtn.className = 'modal-nav-btn';
        
        const nextBtn = document.createElement('button');
        nextBtn.textContent = 'Próximo Projeto →';
        nextBtn.className = 'modal-nav-btn';
        
        // Configura navegação entre projetos
        const projectArray = Array.from(projects);
        const currentIndex = projectArray.indexOf(project);
        
        if (currentIndex > 0) {
            prevBtn.addEventListener('click', () => {
                document.body.removeChild(modal);
                showProjectModal(projectArray[currentIndex - 1]);
            });
        } else {
            prevBtn.disabled = true;
            prevBtn.style.opacity = '0.5';
        }
        
        if (currentIndex < projectArray.length - 1) {
            nextBtn.addEventListener('click', () => {
                document.body.removeChild(modal);
                showProjectModal(projectArray[currentIndex + 1]);
            });
        } else {
            nextBtn.disabled = true;
            nextBtn.style.opacity = '0.5';
        }
        
        // Estilo dos botões de navegação
        const navBtnStyle = `
            padding: 8px 15px;
            background-color: #8a2be2;
            color: white;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            transition: background-color 0.3s;
        `;
        
        prevBtn.style.cssText = navBtnStyle;
        nextBtn.style.cssText = navBtnStyle;
        
        prevBtn.addEventListener('mouseenter', () => {
            if (!prevBtn.disabled) prevBtn.style.backgroundColor = '#7b1fa2';
        });
        
        prevBtn.addEventListener('mouseleave', () => {
            if (!prevBtn.disabled) prevBtn.style.backgroundColor = '#8a2be2';
        });
        
        nextBtn.addEventListener('mouseenter', () => {
            if (!nextBtn.disabled) nextBtn.style.backgroundColor = '#7b1fa2';
        });
        
        nextBtn.addEventListener('mouseleave', () => {
            if (!nextBtn.disabled) nextBtn.style.backgroundColor = '#8a2be2';
        });
        
        projectNav.appendChild(prevBtn);
        projectNav.appendChild(nextBtn);
        
        // Monta o modal
        modalContent.appendChild(closeBtn);
        modalContent.appendChild(projectTitle);
        modalContent.appendChild(projectImg);
        modalContent.appendChild(projectDesc);
        modalContent.appendChild(projectNav);
        modal.appendChild(modalContent);
        document.body.appendChild(modal);
        
        // Fecha o modal
        closeBtn.addEventListener('click', () => {
            document.body.removeChild(modal);
        });
        
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                document.body.removeChild(modal);
            }
        });
    }
    
    /**
     * Configura o sistema de temas
     */
    function setupThemeSystem() {
        themeToggle.addEventListener('click', () => {
            body.classList.toggle('dark-theme');
            
            if (body.classList.contains('dark-theme')) {
                themeToggle.innerHTML = '☀️ Tema Claro';
                themeToggle.style.backgroundColor = '#9370db';
                localStorage.setItem('theme', 'dark');
            } else {
                themeToggle.innerHTML = '🌙 Tema Escuro';
                themeToggle.style.backgroundColor = '#8a2be2';
                localStorage.setItem('theme', 'light');
            }
            
            // Atualiza modais abertos
            updateModalThemes();
        });
        
        // Verifica preferência salva
        const savedTheme = localStorage.getItem('theme') || 'light';
        if (savedTheme === 'dark') {
            body.classList.add('dark-theme');
            themeToggle.innerHTML = '☀️ Tema Claro';
            themeToggle.style.backgroundColor = '#9370db';
        }
    }
    
    /**
     * Atualiza temas dos modais abertos
     */
    function updateModalThemes() {
        const modals = document.querySelectorAll('.modal-content');
        modals.forEach(modal => {
            modal.style.backgroundColor = body.classList.contains('dark-theme') ? '#333' : '#fff';
            
            const closeBtns = modal.querySelectorAll('button[style*="absolute"]');
            closeBtns.forEach(btn => {
                btn.style.color = body.classList.contains('dark-theme') ? '#fff' : '#333';
            });
        });
    }
    
    /**
     * Configura o formulário de contato
     */
    function setupContactForm() {
        const contactForm = document.getElementById('contact-form');
        const feedbackElement = document.getElementById('form-feedback');
        
        if (contactForm) {
            contactForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                const name = document.getElementById('name').value.trim();
                const email = document.getElementById('email').value.trim();
                const message = document.getElementById('message').value.trim();
                
                // Validação simples
                if (!name || !email || !message) {
                    showFeedback('Por favor, preencha todos os campos.', 'error');
                    return;
                }
                
                if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                    showFeedback('Por favor, insira um e-mail válido.', 'error');
                    return;
                }
                
                // Simula envio (substituir por AJAX em produção)
                showFeedback('Enviando mensagem...', 'loading');
                
                setTimeout(() => {
                    showFeedback('Mensagem enviada com sucesso!', 'success');
                    contactForm.reset();
                    
                    setTimeout(() => {
                        feedbackElement.textContent = '';
                        feedbackElement.style.display = 'none';
                    }, 3000);
                }, 1500);
            });
        }
        
        function showFeedback(message, type) {
            feedbackElement.textContent = message;
            feedbackElement.style.display = 'block';
            
            switch(type) {
                case 'error':
                    feedbackElement.style.color = '#ff4444';
                    break;
                case 'success':
                    feedbackElement.style.color = '#00C851';
                    break;
                case 'loading':
                    feedbackElement.style.color = '#33b5e5';
                    break;
            }
        }
    }
    
    /**
     * Carrega conteúdo inicial
     */
    function loadInitialContent() {
        // Mostra projetos por padrão
        mainContent.style.display = 'block';
        document.querySelector('nav a[href="#projetos"]').classList.add('active');
        
        // Configura formulário de contato
        setupContactForm();
        
        // Animação de entrada dos projetos
        animateProjects();
    }
    
    /**
     * Animação dos projetos
     */
    function animateProjects() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, { threshold: 0.1 });
        
        projects.forEach((project, index) => {
            project.style.opacity = '0';
            project.style.transform = 'translateY(20px)';
            project.style.transition = `opacity 0.5s ease ${index * 0.2}s, transform 0.5s ease ${index * 0.2}s`;
            
            observer.observe(project);
        });
    }
});

// Adiciona estilos dinâmicos
const dynamicStyles = document.createElement('style');
dynamicStyles.textContent = `
    /* Estilos para o tema escuro */
    .dark-theme {
        background-color: #121212;
        color: #f0f0f0;
    }
    
    .dark-theme header,
    .dark-theme footer {
        background-color: #4b0082;
    }
    
    .dark-theme nav {
        background-color: #663399;
    }
    
    .dark-theme .project {
        background-color: #1e1e1e;
        color: #f0f0f0;
        box-shadow: 0 0 10px rgba(255, 255, 255, 0.1);
    }
    
    .dark-theme .project p {
        color: #ccc;
    }
    
    .dark-theme nav a {
        color: #e6e6fa;
    }
    
    .dark-theme nav a:hover {
        color: #ffffff;
    }
    
    .active {
        font-weight: bold;
        text-decoration: underline !important;
        color: #e6e6fa !important;
    }
    
    /* Estilos para os modais */
    .modal-nav-btn:disabled {
        cursor: not-allowed;
    }
    
    /* Estilos para o formulário de contato */
    #contact-form .form-group {
        margin-bottom: 15px;
    }
    
    #contact-form label {
        display: block;
        margin-bottom: 5px;
    }
    
    #contact-form input,
    #contact-form textarea {
        width: 100%;
        padding: 8px;
        border: 1px solid #ddd;
        border-radius: 4px;
    }
    
    #contact-form button[type="submit"] {
        background-color: #8a2be2;
        color: white;
        padding: 10px 15px;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        transition: background-color 0.3s;
    }
    
    #contact-form button[type="submit"]:hover {
        background-color: #7b1fa2;
    }
    
    .dark-theme #contact-form input,
    .dark-theme #contact-form textarea {
        background-color: #333;
        color: #fff;
        border-color: #555;
    }
    
    /* Responsividade */
    @media (max-width: 768px) {
        #theme-toggle {
            top: 10px;
            right: 10px;
            padding: 5px 10px;
            font-size: 14px;
        }
        
        nav {
            flex-direction: column;
            padding: 10px 0;
        }
        
        nav a {
            margin: 5px 0;
        }
        
        .project {
            margin: 15px 0;
            padding: 15px;
        }
        
        .modal-content {
            width: 90% !important;
            padding: 15px !important;
        }
    }
`;
document.head.appendChild(dynamicStyles);