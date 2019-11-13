import styled from 'styled-components';
import { colors } from '~/styles';

export const Container = styled.div`
  background: #fff;
  padding: 0 30px;
`;

export const Content = styled.div`
  height: 46px;
  max-width: 900px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;

  nav {
    display: flex;
    align-items: center;

    min-width: 600px;
    img {
      margin-right: 20px;
      padding-right: 20px;
      border-right: 1px solid #eee;
    }

    a {
      display: flex;
      font-weight: bold;
      color: ${colors.active};

      & + a {
        margin-left: 10px;
      }
    }
  }

  aside {
    display: flex;
    align-items: center;
  }
`;

export const Profile = styled.div`
  display: flex;
  margin-left: 20px;
  padding-left: 20px;
  border-left: 1px solid #eee;

  div {
    text-align: right;
    margin-right: 10px;

    strong {
      display: block;
      color: ${colors.active};
    }

    button {
      display: block;
      margin-top: 2px;
      font-size: 12px;
      color: ${colors.primary};
      background: #fff;
    }
  }

  img {
    height: 32px;
    border-radius: 50%;
  }
`;
