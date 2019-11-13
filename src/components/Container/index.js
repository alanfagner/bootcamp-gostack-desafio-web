import styled from 'styled-components';
import { colors } from '~/styles';

export const Container = styled.div`
  max-width: 900px;
  min-width: 600px;

  margin: 30px auto;
  padding: 20px;

  header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 30px;

    div button {
      margin-right: 15px;
    }

    strong {
      color: ${colors.active};
      font-size: 24px;
    }
  }
`;
