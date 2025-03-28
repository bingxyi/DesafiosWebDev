/**
 * BLOG INTERATIVO COM COMENTÁRIOS - DESAFIO 4
 * 
 * Funcionalidades:
 * 1. Sistema de comentários completo
 * 2. Validação de formulário
 * 3. Filtro e ordenação de comentários
 * 4. Resposta a comentários
 * 5. Sistema de curtidas
 * 6. Contador de caracteres
 * 7. Modo noturno
 * 8. Animação de interações
 */

document.addEventListener('DOMContentLoaded', function() {
    // Elementos principais
    const formComentario = document.getElementById('form-comentario');
    const listaComentarios = document.getElementById('comentarios-enviados');
    const body = document.body;
    
    // Configuração inicial
    setupThemeToggle();
    setupFormValidation();
    setupCommentCounter();
    loadSampleComments();
    
    /**
     * Configura o botão de alternância de tema
     */
    function setupThemeToggle() {
        const themeToggle = document.createElement('button');
        themeToggle.id = 'theme-toggle';
        themeToggle.innerHTML = '🌙 Modo Noturno';
        themeToggle.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 8px 15px;
            border-radius: 5px;
            border: none;
            background-color: #ff8c42;
            color: white;
            cursor: pointer;
            z-index: 1000;
            transition: all 0.3s ease;
        `;
        
        themeToggle.addEventListener('click', toggleTheme);
        document.body.appendChild(themeToggle);
    }
    
    /**
     * Alterna entre tema claro e escuro
     */
    function toggleTheme() {
        body.classList.toggle('dark-theme');
        const themeToggle = document.getElementById('theme-toggle');
        
        if (body.classList.contains('dark-theme')) {
            themeToggle.innerHTML = '☀️ Modo Claro';
            themeToggle.style.backgroundColor = '#e67e22';
            localStorage.setItem('blog-theme', 'dark');
        } else {
            themeToggle.innerHTML = '🌙 Modo Noturno';
            themeToggle.style.backgroundColor = '#ff8c42';
            localStorage.setItem('blog-theme', 'light');
        }
    }
    
    /**
     * Configura a validação do formulário
     */
    function setupFormValidation() {
        formComentario.addEventListener('submit', function(event) {
            event.preventDefault();
            
            const nome = document.getElementById('nome').value.trim();
            const email = document.getElementById('email').value.trim();
            const comentario = document.getElementById('comentario').value.trim();
            
            // Validação dos campos
            if (!nome || !email || !comentario) {
                showAlert('Por favor, preencha todos os campos.', 'error');
                return;
            }
            
            if (!validateEmail(email)) {
                showAlert('Por favor, insira um e-mail válido.', 'error');
                return;
            }
            
            if (comentario.length < 10) {
                showAlert('O comentário deve ter pelo menos 10 caracteres.', 'error');
                return;
            }
            
            // Adiciona o comentário
            addComment(nome, email, comentario);
            
            // Limpa o formulário
            formComentario.reset();
            
            // Atualiza o contador
            updateCommentCounter();
            
            // Feedback ao usuário
            showAlert('Comentário enviado com sucesso!', 'success');
        });
    }
    
    /**
     * Valida formato de e-mail
     */
    function validateEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }
    
    /**
     * Adiciona um novo comentário à lista
     */
    function addComment(nome, email, comentario, isReply = false, parentId = null) {
        const commentId = Date.now();
        const commentElement = document.createElement('div');
        commentElement.className = 'comentario';
        commentElement.dataset.id = commentId;
        
        if (isReply) {
            commentElement.classList.add('resposta');
            commentElement.style.marginLeft = '30px';
            commentElement.style.borderLeft = '3px solid #ff8c42';
            commentElement.style.paddingLeft = '10px';
        }
        
        commentElement.innerHTML = `
            <div class="comentario-cabecalho">
                <strong>${nome}</strong> 
                <span class="comment-email">(${email})</span>
                <span class="comment-date">${new Date().toLocaleString()}</span>
            </div>
            <div class="comentario-texto">${comentario}</div>
            <div class="comentario-acoes">
                <button class="btn-like" data-id="${commentId}">
                    <span class="like-count">0</span> 👍
                </button>
                <button class="btn-reply">Responder</button>
                <button class="btn-delete">Excluir</button>
            </div>
            <div class="respostas" data-parent="${commentId}"></div>
        `;
        
        if (parentId) {
            document.querySelector(`.respostas[data-parent="${parentId}"]`).appendChild(commentElement);
        } else {
            listaComentarios.appendChild(commentElement);
        }
        
        // Configura eventos para os botões
        setupCommentButtons(commentElement);
        
        // Animação de entrada
        animateComment(commentElement);
    }
    
    /**
     * Configura eventos para os botões do comentário
     */
    function setupCommentButtons(commentElement) {
        // Botão de curtir
        const likeBtn = commentElement.querySelector('.btn-like');
        likeBtn.addEventListener('click', function() {
            const likeCount = this.querySelector('.like-count');
            let count = parseInt(likeCount.textContent);
            likeCount.textContent = count + 1;
            
            // Animação de curtida
            this.style.transform = 'scale(1.2)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 200);
        });
        
        // Botão de responder
        const replyBtn = commentElement.querySelector('.btn-reply');
        replyBtn.addEventListener('click', function() {
            const commentId = commentElement.dataset.id;
            showReplyForm(commentId);
        });
        
        // Botão de excluir
        const deleteBtn = commentElement.querySelector('.btn-delete');
        deleteBtn.addEventListener('click', function() {
            if (confirm('Tem certeza que deseja excluir este comentário?')) {
                commentElement.style.transform = 'translateX(-100%)';
                commentElement.style.opacity = '0';
                commentElement.style.transition = 'all 0.3s ease';
                
                setTimeout(() => {
                    commentElement.remove();
                    updateCommentCounter();
                }, 300);
            }
        });
    }
    
    /**
     * Mostra formulário de resposta
     */
    function showReplyForm(parentId) {
        // Remove qualquer formulário de resposta existente
        const existingForms = document.querySelectorAll('.reply-form');
        existingForms.forEach(form => form.remove());
        
        const parentComment = document.querySelector(`.comentario[data-id="${parentId}"]`);
        const replyContainer = parentComment.querySelector('.respostas');
        
        const replyForm = document.createElement('form');
        replyForm.className = 'reply-form';
        replyForm.style.marginTop = '10px';
        replyForm.innerHTML = `
            <div>
                <input type="text" placeholder="Seu nome" class="reply-name" required>
            </div>
            <div>
                <input type="email" placeholder="Seu e-mail" class="reply-email" required>
            </div>
            <div>
                <textarea placeholder="Sua resposta..." class="reply-text" required></textarea>
                <div class="char-counter">0/500</div>
            </div>
            <div>
                <button type="submit">Enviar Resposta</button>
                <button type="button" class="cancel-reply">Cancelar</button>
            </div>
        `;
        
        replyForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const nome = this.querySelector('.reply-name').value.trim();
            const email = this.querySelector('.reply-email').value.trim();
            const comentario = this.querySelector('.reply-text').value.trim();
            
            if (!nome || !email || !comentario) {
                showAlert('Por favor, preencha todos os campos.', 'error');
                return;
            }
            
            addComment(nome, email, comentario, true, parentId);
            this.remove();
            updateCommentCounter();
        });
        
        this.querySelector('.cancel-reply').addEventListener('click', function() {
            replyForm.remove();
        });
        
        // Contador de caracteres para resposta
        const replyText = replyForm.querySelector('.reply-text');
        const charCounter = replyForm.querySelector('.char-counter');
        
        replyText.addEventListener('input', function() {
            const remaining = 500 - this.value.length;
            charCounter.textContent = `${this.value.length}/500`;
            
            if (remaining < 50) {
                charCounter.style.color = '#ff4444';
            } else {
                charCounter.style.color = '#666';
            }
        });
        
        replyContainer.appendChild(replyForm);
        replyForm.querySelector('.reply-name').focus();
    }
    
    /**
     * Configura o contador de caracteres para o comentário principal
     */
    function setupCommentCounter() {
        const comentarioTextarea = document.getElementById('comentario');
        const charCounter = document.createElement('div');
        charCounter.className = 'char-counter';
        charCounter.textContent = '0/500';
        charCounter.style.textAlign = 'right';
        charCounter.style.fontSize = '0.8em';
        charCounter.style.color = '#666';
        charCounter.style.marginTop = '-15px';
        charCounter.style.marginBottom = '15px';
        
        comentarioTextarea.parentNode.insertBefore(charCounter, comentarioTextarea.nextSibling);
        
        comentarioTextarea.addEventListener('input', function() {
            const remaining = 500 - this.value.length;
            charCounter.textContent = `${this.value.length}/500`;
            
            if (remaining < 50) {
                charCounter.style.color = '#ff4444';
            } else {
                charCounter.style.color = '#666';
            }
        });
    }
    
    /**
     * Atualiza o contador de comentários
     */
    function updateCommentCounter() {
        const commentCount = document.querySelectorAll('.comentario').length;
        const commentTitle = document.querySelector('#lista-comentarios h2');
        
        if (commentTitle) {
            commentTitle.textContent = `Comentários (${commentCount})`;
        }
    }
    
    /**
     * Mostra mensagem de alerta
     */
    function showAlert(message, type) {
        const alertDiv = document.createElement('div');
        alertDiv.className = `alert ${type}`;
        alertDiv.textContent = message;
        alertDiv.style.cssText = `
            padding: 10px;
            margin: 10px 0;
            border-radius: 4px;
            color: white;
            background-color: ${type === 'error' ? '#ff4444' : '#00C851'};
            position: fixed;
            top: 20px;
            left: 50%;
            transform: translateX(-50%);
            z-index: 1000;
            animation: fadeInOut 3s forwards;
        `;
        
        document.body.appendChild(alertDiv);
        
        setTimeout(() => {
            alertDiv.remove();
        }, 3000);
    }
    
    /**
     * Animação para novos comentários
     */
    function animateComment(commentElement) {
        commentElement.style.opacity = '0';
        commentElement.style.transform = 'translateY(20px)';
        commentElement.style.transition = 'all 0.3s ease';
        
        setTimeout(() => {
            commentElement.style.opacity = '1';
            commentElement.style.transform = 'translateY(0)';
        }, 10);
    }
    
    /**
     * Carrega comentários de exemplo
     */
    function loadSampleComments() {
        // Comentários iniciais para demonstração
        const sampleComments = [
            {
                nome: 'Ana Silva',
                email: 'ana@example.com',
                comentario: 'Excelente artigo! O 5G já está mudando a forma como trabalho remotamente.'
            },
            {
                nome: 'Carlos Oliveira',
                email: 'carlos@example.com',
                comentario: 'Fiquei impressionado com as possibilidades do 6G. Quando estimam que estará disponível comercialmente?'
            }
        ];
        
        sampleComments.forEach(comment => {
            addComment(comment.nome, comment.email, comment.comentario);
        });
        
        updateCommentCounter();
    }
    
    // Verifica o tema salvo
    const savedTheme = localStorage.getItem('blog-theme');
    if (savedTheme === 'dark') {
        body.classList.add('dark-theme');
        document.getElementById('theme-toggle').innerHTML = '☀️ Modo Claro';
        document.getElementById('theme-toggle').style.backgroundColor = '#e67e22';
    }
    
    // Adiciona estilos dinâmicos
    const dynamicStyles = document.createElement('style');
    dynamicStyles.textContent = `
        /* Estilos para o tema escuro */
        .dark-theme {
            background-color: #121212;
            color: #e0e0e0;
        }
        
        .dark-theme header,
        .dark-theme footer {
            background-color: #d35400;
        }
        
        .dark-theme section {
            background-color: #1e1e1e !important;
            color: #e0e0e0 !important;
            box-shadow: 0 0 10px rgba(255, 255, 255, 0.1) !important;
        }
        
        .dark-theme input,
        .dark-theme textarea {
            background-color: #333 !important;
            color: #fff !important;
            border-color: #555 !important;
        }
        
        .dark-theme .comentario {
            border-bottom-color: #444 !important;
        }
        
        .dark-theme .btn-like,
        .dark-theme .btn-reply,
        .dark-theme .btn-delete {
            background-color: #444 !important;
            color: #fff !important;
        }
        
        /* Estilos para comentários */
        .comentario-cabecalho {
            display: flex;
            align-items: center;
            gap: 10px;
            margin-bottom: 5px;
        }
        
        .comment-email {
            color: #666;
            font-size: 0.9em;
        }
        
        .dark-theme .comment-email {
            color: #aaa;
        }
        
        .comment-date {
            color: #999;
            font-size: 0.8em;
            margin-left: auto;
        }
        
        .comentario-acoes {
            display: flex;
            gap: 10px;
            margin-top: 10px;
        }
        
        .comentario-acoes button {
            padding: 5px 10px;
            border: none;
            border-radius: 3px;
            cursor: pointer;
            font-size: 0.8em;
            transition: all 0.2s;
        }
        
        .btn-like {
            background-color: #f0f0f0;
        }
        
        .btn-reply {
            background-color: #f0f0f0;
        }
        
        .btn-delete {
            background-color: #ffebee;
            color: #ff4444;
        }
        
        .btn-like:hover,
        .btn-reply:hover {
            background-color: #e0e0e0;
        }
        
        .btn-delete:hover {
            background-color: #ffcdd2;
        }
        
        /* Animação de alerta */
        @keyframes fadeInOut {
            0% { opacity: 0; top: 0; }
            10% { opacity: 1; top: 20px; }
            90% { opacity: 1; top: 20px; }
            100% { opacity: 0; top: 0; }
        }
        
        /* Responsividade */
        @media (max-width: 768px) {
            .comentario-cabecalho {
                flex-direction: column;
                align-items: flex-start;
                gap: 2px;
            }
            
            .comment-date {
                margin-left: 0;
            }
            
            #theme-toggle {
                top: 10px;
                right: 10px;
                padding: 5px 10px;
                font-size: 14px;
            }
        }
    `;
    document.head.appendChild(dynamicStyles);
});