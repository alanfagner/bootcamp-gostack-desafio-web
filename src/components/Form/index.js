import styled from 'styled-components';
import { Form as unForm } from '@rocketseat/unform';

export const Form = styled(unForm)`
  background: #fff;
  padding: 30px;
  border-radius: 4px;
  display: flex;
  flex-direction: column;

  div.content {
    display: flex;
    div.input {
      display: flex;
      flex-direction: column;
      width: 100%;
      input,
      label,
      select {
        width: 100%;
      }

      & + div {
        margin-left: 10px;
      }
    }
  }
`;
