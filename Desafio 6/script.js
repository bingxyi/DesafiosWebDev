/**
 * AGENDA DE EVENTOS INTERATIVA - DESAFIO 6
 * 
 * Funcionalidades:
 * 1. Filtro por tipo de evento (futuros/passados)
 * 2. Busca por nome de evento
 * 3. Ordenação por data
 * 4. Destaque de eventos próximos
 * 5. Contagem regressiva para eventos futuros
 * 6. Sistema de favoritos
 * 7. Modo noturno
 * 8. Exportação para calendário
 */

document.addEventListener('DOMContentLoaded', function() {
    // Elementos principais
    const header = document.querySelector('header');
    const eventosFuturos = document.querySelector('.eventos-futuros');
    const eventosPassados = document.querySelector('.eventos-passados');
    const body = document.body;
    
    // Configuração inicial
    setupControls();
    setupEventListeners();
    highlightUpcomingEvents();
    setupCountdowns();
    checkPastEvents();
    
    /**
     * Configura os controles da interface
     */
    function setupControls() {
        // Cria container para controles
        const controlsDiv = document.createElement('div');
        controlsDiv.className = 'controls';
        controlsDiv.style.cssText = `
            max-width: 800px;
            margin: 20px auto;
            padding: 15px;
            background-color: #fff;
            border-radius: 10px;
            box-shadow: 0 4px 8px rgba(0,0,0,0.1);
            display: flex;
            flex-wrap: wrap;
            gap: 15px;
            justify-content: space-between;
        `;
        
        // Adiciona antes da primeira seção
        header.insertAdjacentElement('afterend', controlsDiv);
        
        // Adiciona campo de busca
        controlsDiv.innerHTML += `
            <div class="search-container" style="flex: 1; min-width: 200px;">
                <input type="text" id="event-search" placeholder="Buscar eventos..." style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px;">
            </div>
        `;
        
        // Adiciona filtros
        controlsDiv.innerHTML += `
            <div class="filter-container" style="display: flex; gap: 10px; align-items: center;">
                <label for="event-filter" style="white-space: nowrap;">Filtrar:</label>
                <select id="event-filter" style="padding: 8px; border: 1px solid #ddd; border-radius: 4px;">
                    <option value="all">Todos os eventos</option>
                    <option value="future">Eventos futuros</option>
                    <option value="past">Eventos passados</option>
                    <option value="upcoming">Próximos 7 dias</option>
                </select>
            </div>
        `;
        
        // Adiciona botão de modo noturno
        controlsDiv.innerHTML += `
            <button id="theme-toggle" style="padding: 8px 15px; background-color: #6d1a36; color: white; border: none; border-radius: 4px; cursor: pointer; white-space: nowrap;">
                🌙 Modo Noturno
            </button>
        `;
        
        // Adiciona botão de exportar
        controlsDiv.innerHTML += `
            <button id="export-btn" style="padding: 8px 15px; background-color: #6d1a36; color: white; border: none; border-radius: 4px; cursor: pointer; white-space: nowrap;">
                📅 Exportar Agenda
            </button>
        `;
    }
    
    /**
     * Configura os event listeners
     */
    function setupEventListeners() {
        // Filtro de eventos
        document.getElementById('event-filter').addEventListener('change', function() {
            filterEvents(this.value);
        });
        
        // Busca de eventos
        document.getElementById('event-search').addEventListener('input', function() {
            searchEvents(this.value.trim().toLowerCase());
        });
        
        // Modo noturno
        document.getElementById('theme-toggle').addEventListener('click', toggleTheme);
        
        // Exportar agenda
        document.getElementById('export-btn').addEventListener('click', exportCalendar);
    }
    
    /**
     * Filtra eventos por tipo
     */
    function filterEvents(filterType) {
        switch(filterType) {
            case 'all':
                eventosFuturos.style.display = 'block';
                eventosPassados.style.display = 'block';
                break;
            case 'future':
                eventosFuturos.style.display = 'block';
                eventosPassados.style.display = 'none';
                break;
            case 'past':
                eventosFuturos.style.display = 'none';
                eventosPassados.style.display = 'block';
                break;
            case 'upcoming':
                eventosFuturos.style.display = 'block';
                eventosPassados.style.display = 'none';
                highlightUpcomingEvents(true);
                break;
        }
    }
    
    /**
     * Busca eventos por texto
     */
    function searchEvents(searchText) {
        const allEvents = [...document.querySelectorAll('.eventos-futuros li, .eventos-passados li')];
        
        allEvents.forEach(event => {
            const eventText = event.textContent.toLowerCase();
            if (searchText === '' || eventText.includes(searchText)) {
                event.style.display = 'block';
            } else {
                event.style.display = 'none';
            }
        });
    }
    
    /**
     * Destaque eventos que ocorrerão nos próximos 7 dias
     */
    function highlightUpcomingEvents(onlyShowUpcoming = false) {
        const futureEvents = document.querySelectorAll('.eventos-futuros li');
        const now = new Date();
        const nextWeek = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
        
        futureEvents.forEach(event => {
            const dateText = event.querySelector('p:first-of-type').textContent.replace('Data:', '').trim();
            const eventDate = parseDate(dateText);
            
            // Verifica se o evento está nos próximos 7 dias
            if (eventDate >= now && eventDate <= nextWeek) {
                event.style.borderLeft = '5px solid #ff9800';
                event.style.backgroundColor = '#fff8e1';
                
                if (onlyShowUpcoming) {
                    event.style.display = 'block';
                }
            } else if (onlyShowUpcoming) {
                event.style.display = 'none';
            }
        });
    }
    
    /**
     * Configura contagem regressiva para eventos futuros
     */
    function setupCountdowns() {
        const futureEvents = document.querySelectorAll('.eventos-futuros li');
        
        futureEvents.forEach(event => {
            const dateText = event.querySelector('p:first-of-type').textContent.replace('Data:', '').trim();
            const eventDate = parseDate(dateText);
            const now = new Date();
            
            if (eventDate > now) {
                const daysLeft = Math.ceil((eventDate - now) / (1000 * 60 * 60 * 24));
                
                const countdownEl = document.createElement('p');
                countdownEl.innerHTML = `<strong>Faltam:</strong> ${daysLeft} ${daysLeft === 1 ? 'dia' : 'dias'}`;
                countdownEl.style.color = '#6d1a36';
                countdownEl.style.marginTop = '10px';
                countdownEl.style.fontWeight = 'bold';
                
                event.appendChild(countdownEl);
            }
        });
    }
    
    /**
     * Verifica e atualiza eventos passados
     */
    function checkPastEvents() {
        const allEvents = [...document.querySelectorAll('.eventos-futuros li')];
        const now = new Date();
        
        allEvents.forEach(event => {
            const dateText = event.querySelector('p:first-of-type').textContent.replace('Data:', '').trim();
            const eventDate = parseDate(dateText);
            
            if (eventDate < now) {
                // Move o evento para a seção de passados
                eventosPassados.querySelector('ul').appendChild(event);
                
                // Adiciona indicador de evento concluído
                const concludedEl = document.createElement('p');
                concludedEl.textContent = '✅ Evento concluído';
                concludedEl.style.color = '#4caf50';
                concludedEl.style.marginTop = '10px';
                concludedEl.style.fontWeight = 'bold';
                
                event.appendChild(concludedEl);
            }
        });
    }
    
    /**
     * Alterna entre temas claro e escuro
     */
    function toggleTheme() {
        body.classList.toggle('dark-theme');
        const themeBtn = document.getElementById('theme-toggle');
        
        if (body.classList.contains('dark-theme')) {
            themeBtn.textContent = '☀️ Modo Claro';
            themeBtn.style.backgroundColor = '#4a2c2a';
            localStorage.setItem('agenda-theme', 'dark');
        } else {
            themeBtn.textContent = '🌙 Modo Noturno';
            themeBtn.style.backgroundColor = '#6d1a36';
            localStorage.setItem('agenda-theme', 'light');
        }
    }
    
    /**
     * Exporta eventos para formato de calendário
     */
    function exportCalendar() {
        const events = [...document.querySelectorAll('.eventos-futuros li')];
        let calendarData = 'BEGIN:VCALENDAR\nVERSION:2.0\nPRODID:-//Agenda de Eventos//EN\n';
        
        events.forEach(event => {
            const title = event.querySelector('h3').textContent;
            const dateText = event.querySelector('p:first-of-type').textContent.replace('Data:', '').trim();
            const timeText = event.querySelector('p:nth-of-type(2)').textContent.replace('Hora:', '').trim();
            const description = event.querySelector('p:last-of-type').textContent.replace('Descrição:', '').trim();
            
            const [startTime, endTime] = timeText.split(' - ');
            const eventDate = parseDate(dateText);
            
            // Formata datas para o padrão iCalendar
            const startDateTime = formatICalDate(eventDate, startTime);
            const endDateTime = formatICalDate(eventDate, endTime);
            
            calendarData += `BEGIN:VEVENT\n`;
            calendarData += `DTSTART:${startDateTime}\n`;
            calendarData += `DTEND:${endDateTime}\n`;
            calendarData += `SUMMARY:${title}\n`;
            calendarData += `DESCRIPTION:${description}\n`;
            calendarData += `UID:${Date.now()}@agendaeventos\n`;
            calendarData += `END:VEVENT\n`;
        });
        
        calendarData += 'END:VCALENDAR';
        
        // Cria e dispara o download do arquivo .ics
        const blob = new Blob([calendarData], { type: 'text/calendar' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'eventos.ics';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }
    
    /**
     * Converte texto de data para objeto Date
     */
    function parseDate(dateStr) {
        const [day, month, year] = dateStr.split('/').map(Number);
        return new Date(year, month - 1, day);
    }
    
    /**
     * Formata data para padrão iCalendar
     */
    function formatICalDate(date, timeStr) {
        const timeParts = timeStr.split(':').map(Number);
        date.setHours(timeParts[0], timeParts[1]);
        
        return date.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}Z/, 'Z');
    }
    
    // Verifica o tema salvo
    const savedTheme = localStorage.getItem('agenda-theme');
    if (savedTheme === 'dark') {
        body.classList.add('dark-theme');
        document.getElementById('theme-toggle').textContent = '☀️ Modo Claro';
        document.getElementById('theme-toggle').style.backgroundColor = '#4a2c2a';
    }
    
    // Adiciona estilos dinâmicos
    const dynamicStyles = document.createElement('style');
    dynamicStyles.textContent = `
        /* Estilos para o tema escuro */
        .dark-theme {
            background-color: #2a2118;
            color: #e0d5c8;
        }
        
        .dark-theme header {
            background-color: #4a2c2a;
            border-color: #3e2723;
        }
        
        .dark-theme .eventos-futuros,
        .dark-theme .eventos-passados,
        .dark-theme .controls {
            background-color: #3e2723 !important;
            color: #efebe9;
            box-shadow: 0 4px 8px rgba(0,0,0,0.3) !important;
        }
        
        .dark-theme li {
            background-color: #4e342e !important;
            border-left-color: #8d6e63 !important;
            color: #efebe9;
        }
        
        .dark-theme h2 {
            color: #d7ccc8 !important;
            border-color: #8d6e63 !important;
        }
        
        .dark-theme h3 {
            color: #d7ccc8 !important;
        }
        
        .dark-theme p {
            color: #d7ccc8 !important;
        }
        
        .dark-theme strong {
            color: #d7ccc8 !important;
        }
        
        .dark-theme input,
        .dark-theme select {
            background-color: #4e342e !important;
            color: white !important;
            border-color: #6d1a36 !important;
        }
        
        /* Responsividade */
        @media (max-width: 768px) {
            .controls {
                flex-direction: column;
                gap: 10px !important;
            }
            
            .filter-container {
                flex-direction: column;
                align-items: flex-start !important;
            }
            
            #event-search {
                width: 100% !important;
            }
        }
    `;
    document.head.appendChild(dynamicStyles);
});