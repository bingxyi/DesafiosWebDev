/**
 * CURRÍCULO INTERATIVO - DESAFIO 5
 * 
 * Funcionalidades:
 * 1. Modo claro/escuro com persistência
 * 2. Animação de scroll suave
 * 3. Controle de impressão
 * 4. Filtro de experiências
 * 5. Efeitos de hover aprimorados
 * 6. Progresso de habilidades
 * 7. Download do currículo em PDF
 */

document.addEventListener('DOMContentLoaded', function() {
    // Elementos principais
    const body = document.body;
    const header = document.querySelector('.header');
    const contactInfo = document.querySelector('.contact-info');
    const experienceSection = document.querySelector('.experience');
    const educationSection = document.querySelector('.education');
    const footer = document.querySelector('footer');
    
    // Configuração inicial
    setupThemeToggle();
    setupSmoothScrolling();
    setupPrintButton();
    setupExperienceFilter();
    setupSkillBars();
    setupDownloadButton();
    setupHoverEffects();
    
    /**
     * Configura o botão de alternância de tema
     */
    function setupThemeToggle() {
        const themeToggle = document.createElement('button');
        themeToggle.id = 'theme-toggle';
        themeToggle.innerHTML = '🌙 Modo Escuro';
        themeToggle.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 8px 15px;
            border-radius: 5px;
            border: none;
            background-color: #8b7355;
            color: white;
            cursor: pointer;
            z-index: 1000;
            transition: all 0.3s ease;
        `;
        
        themeToggle.addEventListener('click', toggleTheme);
        document.body.appendChild(themeToggle);
        
        // Verifica o tema salvo
        const savedTheme = localStorage.getItem('resume-theme');
        if (savedTheme === 'dark') {
            enableDarkMode();
            themeToggle.innerHTML = '☀️ Modo Claro';
        }
    }
    
    /**
     * Alterna entre temas claro/escuro
     */
    function toggleTheme() {
        if (body.classList.contains('dark-theme')) {
            disableDarkMode();
            localStorage.setItem('resume-theme', 'light');
            document.getElementById('theme-toggle').innerHTML = '🌙 Modo Escuro';
        } else {
            enableDarkMode();
            localStorage.setItem('resume-theme', 'dark');
            document.getElementById('theme-toggle').innerHTML = '☀️ Modo Claro';
        }
    }
    
    /**
     * Ativa o modo escuro
     */
    function enableDarkMode() {
        body.classList.add('dark-theme');
        document.getElementById('theme-toggle').style.backgroundColor = '#5d4037';
    }
    
    /**
     * Desativa o modo escuro
     */
    function disableDarkMode() {
        body.classList.remove('dark-theme');
        document.getElementById('theme-toggle').style.backgroundColor = '#8b7355';
    }
    
    /**
     * Configura scroll suave para âncoras
     */
    function setupSmoothScrolling() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;
                
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }
    
    /**
     * Adiciona botão de impressão
     */
    function setupPrintButton() {
        const printBtn = document.createElement('button');
        printBtn.id = 'print-btn';
        printBtn.innerHTML = '🖨️ Imprimir Currículo';
        printBtn.style.cssText = `
            position: fixed;
            top: 60px;
            right: 20px;
            padding: 8px 15px;
            border-radius: 5px;
            border: none;
            background-color: #8b7355;
            color: white;
            cursor: pointer;
            z-index: 1000;
            transition: all 0.3s ease;
        `;
        
        printBtn.addEventListener('click', function() {
            window.print();
        });
        
        document.body.appendChild(printBtn);
    }
    
    /**
     * Configura filtro de experiências
     */
    function setupExperienceFilter() {
        const filterDiv = document.createElement('div');
        filterDiv.className = 'experience-filter';
        filterDiv.style.cssText = `
            margin: 20px 0;
            padding: 15px;
            background-color: #f5f5dc;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        `;
        
        filterDiv.innerHTML = `
            <h3>Filtrar Experiências:</h3>
            <div style="display: flex; gap: 10px; flex-wrap: wrap;">
                <button class="filter-btn" data-filter="all">Todas</button>
                <button class="filter-btn" data-filter="senior">Sênior</button>
                <button class="filter-btn" data-filter="pleno">Pleno</button>
                <button class="filter-btn" data-filter="estagio">Estágio</button>
            </div>
        `;
        
        experienceSection.insertBefore(filterDiv, experienceSection.querySelector('ul'));
        
        // Configura eventos dos botões de filtro
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const filter = this.dataset.filter;
                filterExperiences(filter);
                
                // Atualiza estado ativo dos botões
                document.querySelectorAll('.filter-btn').forEach(b => {
                    b.style.backgroundColor = '#8b7355';
                });
                this.style.backgroundColor = '#5d4037';
            });
        });
    }
    
    /**
     * Filtra experiências profissionais
     */
    function filterExperiences(filter) {
        const experiences = experienceSection.querySelectorAll('li');
        
        experiences.forEach(exp => {
            const title = exp.querySelector('h3').textContent.toLowerCase();
            
            switch(filter) {
                case 'all':
                    exp.style.display = 'block';
                    break;
                case 'senior':
                    exp.style.display = title.includes('sênior') ? 'block' : 'none';
                    break;
                case 'pleno':
                    exp.style.display = title.includes('pleno') ? 'block' : 'none';
                    break;
                case 'estagio':
                    exp.style.display = title.includes('estagiário') ? 'block' : 'none';
                    break;
                default:
                    exp.style.display = 'block';
            }
            
            // Animação
            if (exp.style.display === 'block') {
                exp.style.animation = 'fadeIn 0.5s ease';
            }
        });
    }
    
    /**
     * Adiciona barras de progresso para habilidades
     */
    function setupSkillBars() {
        const skills = [
            { name: 'JavaScript', level: 90 },
            { name: 'Python', level: 85 },
            { name: 'Node.js', level: 80 },
            { name: 'React', level: 75 },
            { name: 'Banco de Dados', level: 70 }
        ];
        
        const skillsSection = document.createElement('div');
        skillsSection.className = 'skills';
        skillsSection.style.cssText = `
            margin-bottom: 40px;
            padding: 20px;
            background-color: #fff;
            border-radius: 10px;
            box-shadow: 0 4px 8px rgba(0,0,0,0.1);
        `;
        
        skillsSection.innerHTML = `
            <h2>Habilidades Técnicas</h2>
            <div class="skills-container" style="margin-top: 20px;"></div>
        `;
        
        experienceSection.parentNode.insertBefore(skillsSection, experienceSection);
        
        const container = skillsSection.querySelector('.skills-container');
        
        skills.forEach(skill => {
            const skillDiv = document.createElement('div');
            skillDiv.style.marginBottom = '15px';
            
            skillDiv.innerHTML = `
                <div style="display: flex; justify-content: space-between; margin-bottom: 5px;">
                    <span>${skill.name}</span>
                    <span>${skill.level}%</span>
                </div>
                <div class="skill-bar" style="height: 10px; background-color: #f5f5dc; border-radius: 5px;">
                    <div class="skill-progress" 
                         style="height: 100%; width: 0; background-color: #8b7355; border-radius: 5px; transition: width 1s ease;"></div>
                </div>
            `;
            
            container.appendChild(skillDiv);
            
            // Anima a barra de progresso
            setTimeout(() => {
                skillDiv.querySelector('.skill-progress').style.width = `${skill.level}%`;
            }, 100);
        });
    }
    
    /**
     * Adiciona botão de download do currículo
     */
    function setupDownloadButton() {
        const downloadBtn = document.createElement('button');
        downloadBtn.id = 'download-btn';
        downloadBtn.innerHTML = '⬇️ Baixar Currículo (PDF)';
        downloadBtn.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            padding: 8px 15px;
            border-radius: 5px;
            border: none;
            background-color: #8b7355;
            color: white;
            cursor: pointer;
            z-index: 1000;
            transition: all 0.3s ease;
        `;
        
        downloadBtn.addEventListener('click', function() {
            // Simula download (em produção, substituir por geração real de PDF)
            alert('Funcionalidade de download de PDF seria implementada aqui!\nUsando bibliotecas como jsPDF ou html2pdf.js');
            
            // Exemplo de como seria implementado:
            // html2pdf().from(document.body).save('curriculo-joao-silva.pdf');
        });
        
        document.body.appendChild(downloadBtn);
    }
    
    /**
     * Configura efeitos de hover aprimorados
     */
    function setupHoverEffects() {
        // Efeito nos itens da lista
        const listItems = document.querySelectorAll('.contact-info li, .experience li, .education li');
        
        listItems.forEach(item => {
            item.addEventListener('mouseenter', function() {
                this.style.transform = 'translateX(5px)';
                this.style.boxShadow = '2px 2px 5px rgba(0,0,0,0.1)';
            });
            
            item.addEventListener('mouseleave', function() {
                this.style.transform = 'translateX(0)';
                this.style.boxShadow = 'none';
            });
        });
        
        // Efeito nos links
        const links = document.querySelectorAll('a');
        
        links.forEach(link => {
            link.addEventListener('mouseenter', function() {
                this.style.color = '#5d4037';
                this.style.textDecoration = 'underline';
            });
            
            link.addEventListener('mouseleave', function() {
                this.style.color = '#8b7355';
                this.style.textDecoration = 'none';
            });
        });
    }
    
    // Adiciona estilos dinâmicos
    const dynamicStyles = document.createElement('style');
    dynamicStyles.textContent = `
        /* Estilos para o tema escuro */
        .dark-theme {
            background-color: #2a2118;
            color: #e0d5c8;
        }
        
        .dark-theme .header,
        .dark-theme footer {
            background-color: #5d4037;
            border-color: #3e2723;
        }
        
        .dark-theme .contact-info,
        .dark-theme .experience,
        .dark-theme .education,
        .dark-theme .skills {
            background-color: #3e2723 !important;
            color: #efebe9;
            box-shadow: 0 4px 8px rgba(0,0,0,0.3) !important;
        }
        
        .dark-theme .contact-info li,
        .dark-theme .experience li,
        .dark-theme .education li {
            background-color: #4e342e !important;
            border-left-color: #8d6e63 !important;
            color: #efebe9;
        }
        
        .dark-theme h1,
        .dark-theme h2,
        .dark-theme h3 {
            color: #d7ccc8 !important;
        }
        
        .dark-theme a {
            color: #bcaaa4 !important;
        }
        
        .dark-theme a:hover {
            color: #d7ccc8 !important;
        }
        
        .dark-theme .skill-bar {
            background-color: #4e342e !important;
        }
        
        .dark-theme .skill-progress {
            background-color: #8d6e63 !important;
        }
        
        /* Animação de fadeIn */
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
        }
        
        /* Responsividade */
        @media (max-width: 768px) {
            #theme-toggle,
            #print-btn,
            #download-btn {
                position: static;
                display: block;
                width: 100%;
                margin: 5px 0;
                border-radius: 0;
            }
            
            .experience-filter div {
                flex-direction: column;
            }
            
            .experience-filter button {
                width: 100%;
                margin: 5px 0;
            }
        }
        
        /* Estilos para impressão */
        @media print {
            #theme-toggle,
            #print-btn,
            #download-btn,
            .experience-filter {
                display: none !important;
            }
            
            body {
                background-color: white !important;
                color: black !important;
                font-size: 12pt;
            }
            
            .header,
            footer {
                background-color: #f5f5f5 !important;
                color: black !important;
            }
            
            .contact-info,
            .experience,
            .education,
            .skills {
                background-color: white !important;
                box-shadow: none !important;
                border: 1px solid #ddd !important;
            }
            
            a {
                color: #333 !important;
                text-decoration: underline !important;
            }
        }
    `;
    document.head.appendChild(dynamicStyles);
});