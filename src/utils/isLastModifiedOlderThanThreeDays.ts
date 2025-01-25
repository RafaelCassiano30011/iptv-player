const isLastModifiedOlderThanThreeDays = (date: string) => {
  if (!date) return true;

  const lastModifiedDate = new Date(date) as any;
  const now = new Date() as any;

  // Calcula a diferença em milissegundos e converte para dias
  const differenceInDays = (now - lastModifiedDate) / (1000 * 60 * 60 * 24);

  return differenceInDays > 3; // Retorna `true` se for mais que 3 dias
};

export { isLastModifiedOlderThanThreeDays };
