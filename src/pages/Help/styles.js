import styled from 'styled-components';
import { colors } from '~/styles';

export const Modal = styled.div`
  align-items: center;
  justify-content: center;
  display: flex;
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.5);

  div {
    min-width: 500px;
    min-height: 400px;
    background: white;
    padding: 20px;
    border-radius: 5px;

    p {
      margin-bottom: 20px;
      color: ${colors.active};
    }

    .close {
      float: right;
      display: flex;
      &:hover {
        color: #fff;
      }
    }

    form {
      display: flex;
      flex-direction: column;

      .button {
        width: 100%;
        text-align: center;
        margin-top: 20px;
      }
    }
  }
`;
