/**
 * PODCAST INTERATIVO - DESAFIO 9
 * 
 * Funcionalidades:
 * 1. Player de áudio personalizado
 * 2. Controle de volume
 * 3. Playlist interativa
 * 4. Sistema de favoritos
 * 5. Controle de velocidade de reprodução
 * 6. Modo noturno
 */

document.addEventListener('DOMContentLoaded', function() {
    // Elementos principais
    const audioPlayer = document.querySelector('audio');
    const tableRows = document.querySelectorAll('tbody tr');
    const body = document.body;
    
    // 1. Player de áudio personalizado
    const customPlayer = createCustomPlayer();
    document.querySelector('.player-audio').replaceChild(customPlayer, audioPlayer);
    
    // 2. Playlist interativa
    setupPlaylistInteraction();
    
    // 3. Botão de modo noturno
    setupDarkMode();
    
    // 4. Sistema de favoritos
    setupFavoritesSystem();
    
    // Função para criar player personalizado
    function createCustomPlayer() {
        const playerContainer = document.createElement('div');
        playerContainer.className = 'custom-player';
        playerContainer.style.cssText = `
            width: 100%;
            margin-bottom: 15px;
        `;
        
        playerContainer.innerHTML = `
            <div class="player-controls" style="display: flex; align-items: center; gap: 10px; margin-bottom: 10px;">
                <button class="play-btn" style="background: #ff69b4; border: none; border-radius: 50%; width: 40px; height: 40px; cursor: pointer;">▶</button>
                <div class="progress-container" style="flex-grow: 1; height: 5px; background: #ffe4e1; border-radius: 5px; cursor: pointer;">
                    <div class="progress-bar" style="height: 100%; width: 0%; background: #c71585; border-radius: 5px;"></div>
                </div>
                <span class="time-display" style="font-size: 14px; color: #4a2c2a;">0:00 / 0:00</span>
            </div>
            <div class="volume-control" style="display: flex; align-items: center; gap: 10px;">
                <span style="font-size: 14px; color: #4a2c2a;">🔊</span>
                <input type="range" min="0" max="1" step="0.01" value="1" class="volume-slider" style="flex-grow: 1;">
            </div>
            <div class="speed-control" style="display: flex; align-items: center; gap: 10px; margin-top: 10px;">
                <span style="font-size: 14px; color: #4a2c2a;">Velocidade:</span>
                <select class="speed-select" style="padding: 5px; border-radius: 5px; border: 1px solid #ff69b4;">
                    <option value="0.5">0.5x</option>
                    <option value="0.75">0.75x</option>
                    <option value="1" selected>1x</option>
                    <option value="1.25">1.25x</option>
                    <option value="1.5">1.5x</option>
                    <option value="2">2x</option>
                </select>
            </div>
        `;
        
        // Elementos do player
        const playBtn = playerContainer.querySelector('.play-btn');
        const progressBar = playerContainer.querySelector('.progress-bar');
        const progressContainer = playerContainer.querySelector('.progress-container');
        const timeDisplay = playerContainer.querySelector('.time-display');
        const volumeSlider = playerContainer.querySelector('.volume-slider');
        const speedSelect = playerContainer.querySelector('.speed-select');
        
        // Controles do player
        playBtn.addEventListener('click', () => {
            if (audioPlayer.paused) {
                audioPlayer.play();
                playBtn.textContent = '⏸';
            } else {
                audioPlayer.pause();
                playBtn.textContent = '▶';
            }
        });
        
        // Atualizar barra de progresso
        audioPlayer.addEventListener('timeupdate', () => {
            const progress = (audioPlayer.currentTime / audioPlayer.duration) * 100;
            progressBar.style.width = `${progress}%`;
            
            // Atualizar tempo
            const currentMinutes = Math.floor(audioPlayer.currentTime / 60);
            const currentSeconds = Math.floor(audioPlayer.currentTime % 60).toString().padStart(2, '0');
            const durationMinutes = Math.floor(audioPlayer.duration / 60);
            const durationSeconds = Math.floor(audioPlayer.duration % 60).toString().padStart(2, '0');
            
            timeDisplay.textContent = `${currentMinutes}:${currentSeconds} / ${durationMinutes}:${durationSeconds}`;
        });
        
        // Clicar na barra de progresso
        progressContainer.addEventListener('click', (e) => {
            const clickPosition = e.offsetX;
            const containerWidth = progressContainer.clientWidth;
            const seekTime = (clickPosition / containerWidth) * audioPlayer.duration;
            audioPlayer.currentTime = seekTime;
        });
        
        // Controle de volume
        volumeSlider.addEventListener('input', () => {
            audioPlayer.volume = volumeSlider.value;
        });
        
        // Controle de velocidade
        speedSelect.addEventListener('change', () => {
            audioPlayer.playbackRate = speedSelect.value;
        });
        
        return playerContainer;
    }
    
    // Configurar interação com a playlist
    function setupPlaylistInteraction() {
        tableRows.forEach(row => {
            row.style.cursor = 'pointer';
            
            row.addEventListener('click', () => {
                // Simular troca de episódio
                const title = row.cells[0].textContent;
                const date = row.cells[1].textContent;
                const duration = row.cells[2].textContent;
                
                document.querySelector('.player-audio p:nth-of-type(1)').innerHTML = `<strong>Título:</strong> ${title}`;
                document.querySelector('.player-audio p:nth-of-type(2)').innerHTML = `<strong>Data:</strong> ${date}`;
                document.querySelector('.player-audio p:nth-of-type(3)').innerHTML = `<strong>Duração:</strong> ${duration}`;
                
                // Destaque na tabela
                tableRows.forEach(r => r.style.backgroundColor = '');
                row.style.backgroundColor = '#ffe4e1';
                
                // Simular troca de arquivo de áudio
                alert(`Tocando agora: ${title}\nEm uma implementação real, o arquivo de áudio seria carregado aqui.`);
            });
        });
    }
    
    // Configurar modo noturno
    function setupDarkMode() {
        const darkModeBtn = document.createElement('button');
        darkModeBtn.textContent = '🌙 Modo Noturno';
        darkModeBtn.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            padding: 10px;
            background-color: #c71585;
            color: white;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            z-index: 100;
        `;
        document.body.appendChild(darkModeBtn);
        
        darkModeBtn.addEventListener('click', () => {
            body.classList.toggle('dark-mode');
            darkModeBtn.textContent = body.classList.contains('dark-mode') 
                ? '☀️ Modo Claro' 
                : '🌙 Modo Noturno';
        });
    }
    
    // Configurar sistema de favoritos
    function setupFavoritesSystem() {
        const favBtn = document.createElement('button');
        favBtn.textContent = '⭐ Favoritos';
        favBtn.style.cssText = `
            position: fixed;
            bottom: 20px;
            left: 20px;
            padding: 10px;
            background-color: #ff69b4;
            color: white;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            z-index: 100;
        `;
        document.body.appendChild(favBtn);
        
        // Adicionar botão de favorito em cada linha
        tableRows.forEach(row => {
            const favCell = document.createElement('td');
            favCell.innerHTML = '☆';
            favCell.style.cursor = 'pointer';
            favCell.style.textAlign = 'center';
            row.appendChild(favCell);
            
            favCell.addEventListener('click', (e) => {
                e.stopPropagation();
                favCell.textContent = favCell.textContent === '☆' ? '★' : '☆';
            });
        });
    }
    
    // Adicionar estilos para modo noturno
    const style = document.createElement('style');
    style.textContent = `
        .dark-mode {
            background-color: #1a1a1a;
            color: #e0e0e0;
        }
        .dark-mode header {
            background-color: #8b008b;
            border-color: #4b0082;
        }
        .dark-mode .player-audio,
        .dark-mode .tabela-episodios {
            background-color: #2a2a2a;
            color: #e0e0e0;
        }
        .dark-mode th {
            background-color: #8b008b;
        }
        .dark-mode tr:hover {
            background-color: #3a3a3a !important;
        }
        .dark-mode .progress-container {
            background-color: #4a4a4a !important;
        }
        .dark-mode .time-display,
        .dark-mode .player-audio p {
            color: #e0e0e0 !important;
        }
    `;
    document.head.appendChild(style);
});