/**
 * contato.js - Script para o formulário de contato (Desafio 2)
 * 
 * Funcionalidades:
 * 1. Validação de campos obrigatórios
 * 2. Máscaras para CEP e telefone
 * 3. Validação de formato de e-mail
 * 4. Feedback visual para o usuário
 * 5. Prevenção de envio duplicado
 * 6. Animação durante o envio
 * 7. Limpeza do formulário após envio
 */

document.addEventListener('DOMContentLoaded', function() {
    // Seleção dos elementos do formulário
    const form = document.querySelector('form');
    const nomeInput = document.getElementById('nome');
    const emailInput = document.getElementById('email');
    const cepInput = document.getElementById('cep');
    const telefoneInput = document.getElementById('telefone');
    const mensagemInput = document.getElementById('mensagem');
    const submitBtn = form.querySelector('[type="submit"]');
    
    // Elemento para feedback (será criado dinamicamente)
    let feedbackElement;
    
    // Configuração inicial
    initForm();
    
    /**
     * Inicializa o formulário com os event listeners necessários
     */
    function initForm() {
        // Cria o elemento de feedback
        createFeedbackElement();
        
        // Aplica máscaras aos campos
        setupMasks();
        
        // Configura validação em tempo real
        setupRealTimeValidation();
        
        // Configura o evento de submit
        form.addEventListener('submit', handleFormSubmit);
    }
    
    /**
     * Cria o elemento para exibir feedback ao usuário
     */
    function createFeedbackElement() {
        feedbackElement = document.createElement('div');
        feedbackElement.id = 'form-feedback';
        feedbackElement.style.marginTop = '15px';
        feedbackElement.style.padding = '10px';
        feedbackElement.style.borderRadius = '4px';
        feedbackElement.style.textAlign = 'center';
        feedbackElement.style.display = 'none';
        form.appendChild(feedbackElement);
    }
    
    /**
     * Configura máscaras para CEP e telefone
     */
    function setupMasks() {
        // Máscara para CEP (XXXXX-XXX)
        cepInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length > 5) {
                value = value.substring(0, 5) + '-' + value.substring(5, 8);
            }
            e.target.value = value;
        });
        
        // Máscara para telefone ((XX) XXXX-XXXX ou (XX) XXXXX-XXXX)
        telefoneInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length > 0) {
                value = '(' + value.substring(0, 2) + ') ' + value.substring(2);
            }
            if (value.length > 10) {
                value = value.substring(0, 10) + '-' + value.substring(10, 15);
            }
            e.target.value = value;
        });
    }
    
    /**
     * Configura validação em tempo real para os campos
     */
    function setupRealTimeValidation() {
        const fields = [nomeInput, emailInput, mensagemInput];
        
        fields.forEach(field => {
            field.addEventListener('blur', validateField);
            field.addEventListener('input', function() {
                if (this.classList.contains('invalid')) {
                    clearError(this);
                }
            });
        });
    }
    
    /**
     * Valida um campo individual
     */
    function validateField(e) {
        const field = e.target;
        
        // Verifica campos obrigatórios
        if (field.required && !field.value.trim()) {
            showError(field, 'Este campo é obrigatório');
            return false;
        }
        
        // Validação específica para e-mail
        if (field.type === 'email' && !isValidEmail(field.value)) {
            showError(field, 'Por favor, insira um e-mail válido');
            return false;
        }
        
        return true;
    }
    
    /**
     * Mostra mensagem de erro para um campo
     */
    function showError(field, message) {
        clearError(field);
        
        field.classList.add('invalid');
        field.style.borderColor = '#ff4444';
        
        const errorElement = document.createElement('span');
        errorElement.className = 'error-message';
        errorElement.textContent = message;
        errorElement.style.display = 'block';
        errorElement.style.color = '#ff4444';
        errorElement.style.fontSize = '0.8em';
        errorElement.style.marginTop = '-15px';
        errorElement.style.marginBottom = '15px';
        
        field.parentNode.insertBefore(errorElement, field.nextSibling);
    }
    
    /**
     * Limpa o erro de um campo
     */
    function clearError(field) {
        field.classList.remove('invalid');
        field.style.borderColor = '#90E0EF';
        
        const errorElement = field.parentNode.querySelector('.error-message');
        if (errorElement) {
            errorElement.remove();
        }
    }
    
    /**
     * Valida o formato do e-mail
     */
    function isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }
    
    /**
     * Manipula o envio do formulário
     */
    function handleFormSubmit(e) {
        e.preventDefault();
        
        // Valida todos os campos obrigatórios
        const isValid = validateAllFields();
        
        if (!isValid) {
            showFeedback('Por favor, corrija os erros no formulário', 'error');
            return;
        }
        
        // Prepara para envio
        prepareForSubmission();
        
        // Simula envio (substituir por AJAX/fetch em produção)
        simulateSubmission();
    }
    
    /**
     * Valida todos os campos do formulário
     */
    function validateAllFields() {
        let isValid = true;
        
        // Campos obrigatórios
        const requiredFields = [nomeInput, emailInput, mensagemInput];
        
        requiredFields.forEach(field => {
            const event = { target: field };
            if (!validateField(event)) {
                isValid = false;
            }
        });
        
        return isValid;
    }
    
    /**
     * Prepara o formulário para envio
     */
    function prepareForSubmission() {
        // Desabilita o botão de envio
        submitBtn.disabled = true;
        submitBtn.value = 'Enviando...';
        submitBtn.style.opacity = '0.7';
        
        // Mostra feedback de carregamento
        showFeedback('Enviando sua mensagem...', 'loading');
    }
    
    /**
     * Simula o envio do formulário
     */
    function simulateSubmission() {
        // Simula tempo de processamento (1.5 segundos)
        setTimeout(() => {
            // Feedback de sucesso
            showFeedback('Mensagem enviada com sucesso!', 'success');
            
            // Restaura o botão
            setTimeout(() => {
                submitBtn.disabled = false;
                submitBtn.value = 'Enviar';
                submitBtn.style.opacity = '1';
                
                // Limpa o formulário
                form.reset();
                
                // Esconde o feedback após 3 segundos
                setTimeout(() => {
                    feedbackElement.style.display = 'none';
                }, 3000);
            }, 1500);
        }, 1500);
    }
    
    /**
     * Mostra feedback para o usuário
     */
    function showFeedback(message, type) {
        feedbackElement.textContent = message;
        feedbackElement.style.display = 'block';
        
        // Estilo baseado no tipo
        switch(type) {
            case 'error':
                feedbackElement.style.backgroundColor = '#ffebee';
                feedbackElement.style.color = '#ff4444';
                break;
            case 'success':
                feedbackElement.style.backgroundColor = '#e8f5e9';
                feedbackElement.style.color = '#00C851';
                break;
            case 'loading':
                feedbackElement.style.backgroundColor = '#e3f2fd';
                feedbackElement.style.color = '#33b5e5';
                break;
        }
    }
});