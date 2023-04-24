export const typeColor = (value) => {
  if (value === 'Demande d\'amélioration') return 'text-[black] bg-[#e1e6fe] text-[#362a9f] rounded-full w-fit';
  if (value === 'Idée d\'amélioration') return 'text-[black] bg-[#d7f9e6] text-[#225e47] rounded-full w-fit';
  if (value === 'Problème technique') return 'text-[white] bg-[#fd696d] rounded-full w-fit';
  return '';
};

export const statusColor = (value) => {
  if (value === 'Ouvert') return 'text-[black] bg-[#fdf4ca] text-[#8b4616] rounded-full w-fit';
  if (value === 'En attente') return 'text-[white] bg-[#fd696d] rounded-full w-fit';
  if (value === 'Fermé') return 'text-[black] bg-[#f3f4f6] rounded-full w-fit';
  return '';
};

export const priorityColor = (value) => {
  if (value === 'Faible') return 'text-[black] bg-[#f3f4f6] rounded-full w-fit';
  if (value === 'Moyenne') return 'text-[black] bg-[#fdf4ca] text-[#8b4616] rounded-full w-fit';
  if (value === 'Haute') return 'text-[white] bg-[#fd696d] rounded-full w-fit';
  return '';
};

export const logWording = (word) => {
  if (word === 'create') return ' a créé le ticket';
  if (word === 'type') return ' a changé le type en ';
  if (word === 'priority') return ' a changé la priorité en ';
  if (word === 'comment') return ' a écrit : ';
  return '';
};
