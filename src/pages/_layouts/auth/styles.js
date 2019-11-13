import styled from 'styled-components';
import { darken } from 'polished';

import { colors } from '~/styles';

export const Wrapper = styled.div`
  height: 100%;
  background: ${colors.primary};
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Content = styled.div`
  width: 100%;
  max-width: 365px;
  text-align: center;
  background: #fff;
  border-radius: 4px;
  padding: 30px;

  .logo {
    flex-direction: column;
    display: flex;

    strong {
      text-transform: uppercase;
      font-size: 29.8607px;
      color: ${colors.primary};
    }
  }

  form {
    display: flex;
    flex-direction: column;
    margin-top: 30px;

    input {
      border-color: rgba(0, 0, 0, 0.3);
      border-width: 1px;
      border-radius: 4px;
      height: 44px;
      padding: 0 15px;
      margin: 0 0 20px;

      &::placeholder {
        color: rgba(0, 0, 0, 0.3);
      }
    }

    strong {
      color: ${colors.secundary};
      text-transform: uppercase;
      text-align: left;
      margin-bottom: 4px;
    }

    span {
      color: #fb6f91;
      align-self: flex-start;
      margin: 0 0 10px;
      font-weight: bold;
    }

    button {
      margin: 5px 0 0;
      height: 44px;
      background: ${colors.primary};
      font-weight: bold;
      color: #fff;
      border: 0;
      border-radius: 4px;
      font-size: 16px;
      transition: background 0.2s;

      &:hover {
        background: ${darken(0.07, colors.primary)};
      }
    }
  }
`;
