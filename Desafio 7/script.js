/**
 * FAQ - DESAFIO 7
 * Funcionalidades básicas:
 * 1. Acordeão para mostrar/esconder respostas
 * 2. Busca por perguntas
 * 3. Botão de modo noturno
 */

document.addEventListener('DOMContentLoaded', function() {
    // 1. Sistema de acordeão
    const perguntas = document.querySelectorAll('.pergunta');
    
    perguntas.forEach(pergunta => {
        const titulo = pergunta.querySelector('h3');
        const resposta = pergunta.querySelector('p');
        
        // Esconde todas as respostas inicialmente
        resposta.style.display = 'none';
        
        // Adiciona evento de clique
        titulo.addEventListener('click', () => {
            resposta.style.display = resposta.style.display === 'none' ? 'block' : 'none';
        });
    });

    // 2. Barra de busca
    const searchBar = document.createElement('input');
    searchBar.type = 'text';
    searchBar.placeholder = 'Buscar perguntas...';
    searchBar.style.cssText = `
        display: block;
        width: 80%;
        max-width: 500px;
        margin: 20px auto;
        padding: 10px;
        border-radius: 5px;
        border: 1px solid #4caf50;
    `;
    
    header.after(searchBar);
    
    searchBar.addEventListener('input', () => {
        const termo = searchBar.value.toLowerCase();
        
        perguntas.forEach(pergunta => {
            const texto = pergunta.textContent.toLowerCase();
            pergunta.style.display = texto.includes(termo) ? 'block' : 'none';
        });
    });

    // 3. Botão de modo noturno
    const nightModeBtn = document.createElement('button');
    nightModeBtn.textContent = '🌙 Modo Noturno';
    nightModeBtn.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        padding: 10px;
        background-color: #4caf50;
        color: white;
        border: none;
        border-radius: 5px;
        cursor: pointer;
    `;
    
    document.body.appendChild(nightModeBtn);
    
    nightModeBtn.addEventListener('click', () => {
        document.body.classList.toggle('night-mode');
        nightModeBtn.textContent = document.body.classList.contains('night-mode') 
            ? '☀️ Modo Claro' 
            : '🌙 Modo Noturno';
    });

    // Estilos dinâmicos para o modo noturno
    const style = document.createElement('style');
    style.textContent = `
        .night-mode {
            background-color: #121212;
            color: #e0e0e0;
        }
        .night-mode header {
            background-color: #1a237e;
        }
        .night-mode .pergunta {
            background-color: #1e1e1e;
            border-left-color: #4caf50;
        }
    `;
    document.head.appendChild(style);
});