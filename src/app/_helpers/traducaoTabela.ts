import { MatPaginatorIntl } from '@angular/material';

const portuguesRangeLabel = (page: number, pageSize: number, length: number) => {
  if (length === 0 || pageSize === 0) { return `0 de ${length}`; }

  length = Math.max(length, 0);

  const startIndex = page * pageSize;

  const endIndex = startIndex < length ?
      Math.min(startIndex + pageSize, length) :
      startIndex + pageSize;

  return `${startIndex + 1} - ${endIndex} de ${length}`;
};


export function getPortuguesPaginatorIntl() {
  const paginatorIntl = new MatPaginatorIntl();

  paginatorIntl.itemsPerPageLabel = 'Items por página:';
  paginatorIntl.nextPageLabel = 'Próxima Página';
  paginatorIntl.previousPageLabel = 'Página Anterior';
  paginatorIntl.lastPageLabel = 'Ultima Página';
  paginatorIntl.firstPageLabel = 'Primeira Página';
  paginatorIntl.getRangeLabel = portuguesRangeLabel;

  return paginatorIntl;
}
