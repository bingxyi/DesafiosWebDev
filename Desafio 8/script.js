/**
 * GALERIA DE IMAGENS INTERATIVA - DESAFIO 8
 * Funcionalidades:
 * 1. Lightbox para visualização ampliada das imagens
 * 2. Filtro por data das imagens
 * 3. Destaque na tabela ao passar o mouse na imagem
 * 4. Modo noturno/claro
 */

document.addEventListener('DOMContentLoaded', function() {
    // Elementos
    const images = document.querySelectorAll('.imagem img');
    const tableRows = document.querySelectorAll('tbody tr');
    const body = document.body;

    // 1. Lightbox para imagens
    images.forEach(img => {
        img.addEventListener('click', function() {
            createLightbox(this.src, this.alt);
        });
    });

    // 2. Destaque na tabela ao passar mouse na imagem
    images.forEach((img, index) => {
        img.addEventListener('mouseenter', () => {
            tableRows[index].style.backgroundColor = '#2a4a6f';
        });
        
        img.addEventListener('mouseleave', () => {
            tableRows[index].style.backgroundColor = '';
        });
    });

    // 3. Botão de modo noturno/claro
    const themeBtn = document.createElement('button');
    themeBtn.textContent = '☀️ Modo Claro';
    themeBtn.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        padding: 10px;
        background-color: #4a90e2;
        color: white;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        z-index: 100;
    `;
    document.body.appendChild(themeBtn);

    themeBtn.addEventListener('click', () => {
        body.classList.toggle('light-mode');
        themeBtn.textContent = body.classList.contains('light-mode') 
            ? '🌙 Modo Noturno' 
            : '☀️ Modo Claro';
    });

    // 4. Filtro por data (simplificado)
    const filterDiv = document.createElement('div');
    filterDiv.innerHTML = `
        <select id="date-filter" style="padding: 8px; border-radius: 5px; background-color: #1f3a5f; color: white; border: 1px solid #4a90e2;">
            <option value="all">Todas as datas</option>
            <option value="2023-03">Março 2023</option>
            <option value="2023-07">Julho 2023</option>
            <option value="2023-09">Setembro 2023</option>
        </select>
    `;
    header.insertAdjacentElement('afterend', filterDiv);

    document.getElementById('date-filter').addEventListener('change', function() {
        const filterValue = this.value;
        
        tableRows.forEach(row => {
            const dateCell = row.cells[2].textContent;
            const matchesFilter = filterValue === 'all' || dateCell.includes(filterValue.substring(5));
            
            row.style.display = matchesFilter ? '' : 'none';
        });
    });

    // Função para criar lightbox
    function createLightbox(src, alt) {
        const lightbox = document.createElement('div');
        lightbox.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0,0,0,0.9);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 1000;
        `;
        
        lightbox.innerHTML = `
            <div style="position: relative; max-width: 90%; max-height: 90%;">
                <img src="${src}" alt="${alt}" style="max-height: 80vh; max-width: 100%; border-radius: 10px;">
                <button id="close-lightbox" style="position: absolute; top: -40px; right: 0; background: none; border: none; color: white; font-size: 30px; cursor: pointer;">×</button>
            </div>
        `;
        
        document.body.appendChild(lightbox);
        
        document.getElementById('close-lightbox').addEventListener('click', () => {
            lightbox.remove();
        });
        
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                lightbox.remove();
            }
        });
    }

    // Estilos para modo claro
    const style = document.createElement('style');
    style.textContent = `
        .light-mode {
            background-color: #f0f2f5;
            color: #333;
        }
        .light-mode header {
            background-color: #4a90e2;
            border-color: #1f3a5f;
        }
        .light-mode .imagem,
        .light-mode .tabela-info {
            background-color: #e1e5eb;
            color: #333;
        }
        .light-mode th {
            background-color: #4a90e2;
        }
        .light-mode tr:hover {
            background-color: #d1d9e6;
        }
    `;
    document.head.appendChild(style);
});