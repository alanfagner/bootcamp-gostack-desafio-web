import styled from 'styled-components';
import { darken } from 'polished';
import { colors } from '~/styles';

export const Wrapper = styled.div`
  height: 100%;
  background: #f5f5f5;

  input,
  select {
    border: 1px solid ${colors.secundary};
    padding: 10px;
    border-radius: 4px;

    &::placeholder {
      color: ${colors.secundary};
    }
  }

  form label {
    color: ${colors.active};
    font-weight: bold;
    line-height: 20px;
    margin-top: 10px;
  }

  button.link {
    background: transparent;
    padding: 8px;
    border-radius: 2px;
    font-weight: normal;
  }

  .editar {
    color: #4d85ee;

    &:hover {
      background: ${darken(0.1, '#4d85ee')};
      color: #fff;
    }
  }

  .apagar {
    color: ${colors.primary};
    &:hover {
      background: ${darken(0.1, colors.primary)};
      color: #fff;
    }
  }

  button.button {
    width: 112px;
    text-align: end;
    border-radius: 6px;
    padding: 10px;

    background: ${colors.primary};
    color: #fff;

    font-weight: bold;

    & + button {
      margin-left: 10px;
    }

    &.light-color {
      background: ${colors.secundary};
      color: #fff;
    }
  }
`;
