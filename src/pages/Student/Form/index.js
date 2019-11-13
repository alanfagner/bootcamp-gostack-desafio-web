import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Input } from '@rocketseat/unform';
import { toast } from 'react-toastify';
import * as Yup from 'yup';

import { Container } from '~/components/Container';
import { Form } from '~/components/Form';

import api from '~/services/api';
import history from '~/services/history';

const schema = Yup.object().shape({
  name: Yup.string().required('O nome é obrigatório'),
  email: Yup.string()
    .email('Insira um e-mail válido')
    .required('O e-mail é obrigatório'),
  age: Yup.number()
    .transform((cv, ov) => {
      return ov === '' ? undefined : cv;
    })
    .required('Idade é obrigatório'),
  peso: Yup.number()
    .transform((cv, ov) => {
      return ov === '' ? undefined : cv;
    })
    .required('Peso é obrigatório'),
  altura: Yup.number()
    .transform((cv, ov) => {
      return ov === '' ? undefined : cv;
    })
    .required('Altura é obrigatório'),
});

export default function Student() {
  const [initial, setInitial] = useState();

  const { id } = useParams();

  async function create(data, resetForm) {
    try {
      const { name, email, age, peso, altura } = data;

      await api.post('/students', {
        name,
        email,
        age,
        peso,
        altura,
      });
      toast.success('Aluno cadastrado com sucesso');
      resetForm();
    } catch (error) {
      toast.error('Erro ao cadastrar o aluno, verifique os dados');
    }
  }

  async function update(data) {
    try {
      const { name, email, age, peso, altura } = data;

      await api.put(`/students/${id}`, {
        name,
        email,
        age,
        peso,
        altura,
      });
      toast.success('Aluno atualizado com sucesso');
    } catch (error) {
      toast.error('Erro ao atualizar o aluno, verifique os dados');
    }
  }

  function handleSubmit(data, { resetForm }) {
    if (id) update(data);
    else create(data, resetForm);
  }

  async function handleGoback() {
    history.push('/student');
  }

  useEffect(() => {
    async function loadStudent() {
      const response = await api.get(`/students/${id}`);

      setInitial(response.data);
    }

    if (id && id !== 0) {
      loadStudent();
    }
  }, [id]);

  return (
    <Container>
      <header>
        <strong> {id ? 'Editar ' : 'Cadastro de'} aluno</strong>
        <div>
          <button
            onClick={handleGoback}
            type="button"
            className="button light-color"
          >
            VOLTAR
          </button>
          <button className="button" form="cadastrar" type="submit">
            SALVAR
          </button>
        </div>
      </header>

      <Form
        initialData={initial}
        schema={schema}
        id="cadastrar"
        onSubmit={handleSubmit}
      >
        <Input name="name" label="NOME COMPLETO" />
        <Input name="email" label="ENDEREÇO DE E-MAIL" />

        <div className="content">
          <div className="input">
            <Input type="number" name="age" label="IDADE" />
          </div>
          <div className="input">
            <Input type="number" name="peso" label="PESO (em kg)" />
          </div>
          <div className="input">
            <Input type="" step="0.01" name="altura" label="ALTURA" />
          </div>
        </div>
      </Form>

      <ul />
    </Container>
  );
}
