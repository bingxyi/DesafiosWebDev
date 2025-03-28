// script.js para a Locadora de Filmes CineVerde

document.addEventListener('DOMContentLoaded', function() {
    // Seleciona todas as seções de classificação por estrelas
    const classificacoes = document.querySelectorAll('.classificacao');
    
    // Adiciona eventos para cada sistema de classificação
    classificacoes.forEach(classificacao => {
        const estrelas = classificacao.querySelectorAll('input[type="radio"]');
        
        // Adiciona evento de clique para cada estrela
        estrelas.forEach(estrela => {
            estrela.addEventListener('click', function() {
                const valor = parseInt(this.value);
                const nomeGrupo = this.name;
                
                // Atualiza visualmente as estrelas
                atualizarEstrelas(nomeGrupo, valor);
                
                // Aqui você pode adicionar código para salvar a avaliação
                console.log(`Filme ${nomeGrupo} avaliado com ${valor} estrelas`);
                
                // Opcional: Mostrar mensagem de agradecimento
                mostrarMensagemAgradecimento(classificacao);
            });
        });
        
        // Adiciona eventos de hover para melhorar a interação
        adicionarEfeitoHover(classificacao);
    });
    
    // Função para atualizar a aparência das estrelas baseado na seleção
    function atualizarEstrelas(nomeGrupo, valorSelecionado) {
        const labels = document.querySelectorAll(`input[name="${nomeGrupo}"] ~ label`);
        
        labels.forEach((label, index) => {
            if (index < valorSelecionado) {
                label.style.color = '#ffd700'; // Dourado para estrelas selecionadas
            } else {
                label.style.color = '#ccc'; // Cinza para estrelas não selecionadas
            }
        });
    }
    
    // Função para adicionar efeito hover nas estrelas
    function adicionarEfeitoHover(classificacao) {
        const estrelas = classificacao.querySelectorAll('input[type="radio"]');
        const labels = classificacao.querySelectorAll('label');
        
        labels.forEach(label => {
            label.addEventListener('mouseover', function() {
                const estrela = this.previousElementSibling;
                const valor = parseInt(estrela.value);
                const nomeGrupo = estrela.name;
                
                // Destaca as estrelas até o hover
                labels.forEach((l, idx) => {
                    if (idx < valor) {
                        l.style.color = '#ffd700';
                    }
                });
            });
            
            label.addEventListener('mouseout', function() {
                const estrelaSelecionada = classificacao.querySelector('input[type="radio"]:checked');
                
                // Se não houver estrela selecionada, volta ao cinza
                if (!estrelaSelecionada) {
                    labels.forEach(l => {
                        l.style.color = '#ccc';
                    });
                } else {
                    // Se houver seleção, mantém as estrelas selecionadas douradas
                    const valorSelecionado = parseInt(estrelaSelecionada.value);
                    labels.forEach((l, idx) => {
                        l.style.color = idx < valorSelecionado ? '#ffd700' : '#ccc';
                    });
                }
            });
        });
    }
    
    // Função para mostrar mensagem de agradecimento
    function mostrarMensagemAgradecimento(classificacao) {
        // Remove mensagens anteriores se existirem
        const mensagemAnterior = classificacao.querySelector('.mensagem-avaliacao');
        if (mensagemAnterior) {
            mensagemAnterior.remove();
        }
        
        // Cria nova mensagem
        const mensagem = document.createElement('div');
        mensagem.className = 'mensagem-avaliacao';
        mensagem.textContent = 'Obrigado por sua avaliação!';
        mensagem.style.marginTop = '10px';
        mensagem.style.color = '#dda15e';
        mensagem.style.fontSize = '0.9em';
        mensagem.style.fontStyle = 'italic';
        
        classificacao.appendChild(mensagem);
        
        // Remove a mensagem após 3 segundos
        setTimeout(() => {
            mensagem.remove();
        }, 3000);
    }
    
    // Adiciona evento para os vídeos para rastrear visualizações
    const videos = document.querySelectorAll('video');
    videos.forEach(video => {
        video.addEventListener('play', function() {
            const tituloFilme = this.closest('.filme').querySelector('h2').textContent;
            console.log(`Usuário começou a assistir: ${tituloFilme}`);
            
            // Aqui você poderia enviar para um sistema de analytics
            // ou incrementar um contador de visualizações
        });
    });
});