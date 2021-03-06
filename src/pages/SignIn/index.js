import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';

import { signInRequest } from '~/store/modules/auth/actions';
import logo from '~/assets/logo.svg';

const schema = Yup.object().shape({
  email: Yup.string()
    .email('Insira um e-mail válido')
    .required('O e-mail é obrigatório'),
  password: Yup.string().required('A senha é obrigatória'),
});

export default function SignIn() {
  const dispatch = useDispatch();

  const loading = useSelector(state => state.auth.loading);

  function handleSubmit({ email, password }) {
    dispatch(signInRequest(email, password));
  }

  return (
    <>
      <div className="logo">
        <img src={logo} alt="Gympoint" />
        <strong>gympoint</strong>
      </div>
      <Form schema={schema} onSubmit={handleSubmit}>
        <strong>Seu e-mail</strong>
        <Input name="email" type="text" placeholder="Seu e-mail" />
        <strong htmlFor="password">Sua senha</strong>
        <Input name="password" type="password" placeholder="Sua senha" />

        <button className="button" type="submit">
          {loading ? 'Carregando ...' : 'Entrar no sistema'}
        </button>
      </Form>
    </>
  );
}
