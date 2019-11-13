import { format } from 'date-fns';
import pt from 'date-fns/locale/pt-BR';

const { format: currency } = new Intl.NumberFormat('pt', {
  style: 'currency',
  currency: 'BRL',
});

export function currencyFormat(value) {
  return currency(value);
}

export function dateFormat(value, fomartString = 'dd/MM/yyyy') {
  return format(value, fomartString, { locale: pt });
}
