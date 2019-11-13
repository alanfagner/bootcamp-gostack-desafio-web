import styled from 'styled-components';
import { colors } from '~/styles';

export const Table = styled.table`
  background: #fff;
  border-radius: 5px;
  padding: 15px;

  width: 100%;

  th {
    text-align: left;
  }

  td {
    padding: 5px 0px;
    color: ${colors.active};
  }

  .actions {
    width: 20%;
    align-items: center;
  }

  .center {
    text-align: center;
  }
`;
