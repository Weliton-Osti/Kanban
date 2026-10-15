// Seleciona de forma reativa os elementos necessários
const cards = document.querySelectorAll('.card');
const dropzones = document.querySelectorAll('.kanban-cards');

// 1. Eventos dos Cartões (Origem do Arraste)
cards.forEach(card => {
  card.addEventListener('dragstart', () => {
    card.classList.add('is-dragging');
  });

  card.addEventListener('dragend', () => {
    card.classList.remove('is-dragging');
  });
});

// 2. Eventos das Colunas (Destino do Arraste)
dropzones.forEach(zone => {
  zone.addEventListener('dragover', (e) => {
    e.preventDefault(); // Necessário para permitir o drop
    
    const draggingCard = document.querySelector('.is-dragging');
    
    // Descobre se há um cartão logo abaixo do cursor do mouse
    const nextCard = getTargetCard(zone, e.clientY);
    
    if (nextCard) {
      // Se houver um cartão abaixo, insere o elemento arrastado antes dele
      zone.insertBefore(draggingCard, nextCard);
    } else {
      // Se o mouse estiver abaixo de tudo ou a coluna estiver vazia, joga pro final
      zone.appendChild(draggingCard);
    }
  });
});

// 3. Função que calcula o posicionamento exato do mouse na lista
function getTargetCard(zone, mouseY) {
  // Pega apenas os cartões estáticos desta coluna específica
  const localCards = zone.querySelectorAll('.card:not(.is-dragging)');
  let closestCard = null;
  let closestOffset = Number.NEGATIVE_INFINITY;

  localCards.forEach(card => {
    const box = card.getBoundingClientRect();
    const cardCenter = box.top + box.height / 2;
    const offset = mouseY - cardCenter;

    // Procura pelo cartão que está imediatamente abaixo do cursor (offset negativo mais próximo de 0)
    if (offset < 0 && offset > closestOffset) {
      closestOffset = offset;
      closestCard = card;
    }
  });

  return closestCard;
}
