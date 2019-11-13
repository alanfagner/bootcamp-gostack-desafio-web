import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { MdClose } from 'react-icons/md';
import { Input, Form } from '@rocketseat/unform';
import * as Yup from 'yup';

import { Modal } from './styles';
import { Container } from '~/components/Container';
import { Table } from '~/components/Table';

import api from '~/services/api';

const schema = Yup.object().shape({
  answer: Yup.string().required('A resposta é obrigatória'),
});

export default function Help() {
  const [helps, setHelps] = useState([]);
  const [help, setHelp] = useState();

  useEffect(() => {
    async function loadHelps() {
      const res = await api.get('/students/help-orders');

      setHelps(res.data);
    }

    loadHelps();
  }, []);

  async function handleSave({ answer }, { resetForm }) {
    try {
      await api.put(`help-orders/${help.student_id}/answer`, { answer });
      toast.success('Resposta criado com com sucesso');
      setHelp(null);
      resetForm();
    } catch (error) {
      toast.error('Erro ao cadastrar a resposta, verifique os dados');
    }
  }

  return (
    <Container>
      <header>
        <strong>Pedidos de auxílio</strong>
      </header>

      <Table>
        <thead>
          <tr>
            <th>ALUNO</th>
            <th className="actions"> </th>
          </tr>
        </thead>
        <tbody>
          {helps.map(auxHelp => (
            <tr key={auxHelp.id}>
              <td>{auxHelp.student.name}</td>
              <td className="actions">
                <button
                  onClick={() => setHelp(auxHelp)}
                  className="link editar"
                  type="button"
                >
                  responder
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {help && (
        <Modal className="modal">
          <div>
            <strong>PERGUNTA DO ALUNO</strong>
            <button
              onClick={() => setHelp(null)}
              className="close"
              type="button"
            >
              <MdClose size="20" />
            </button>

            <p> {help.question}</p>

            <strong>SUA RESPOSTA</strong>
            <Form schema={schema} onSubmit={handleSave}>
              <Input
                multiline
                name="answer"
                rows="15"
                type="text"
                placeholder="Responda"
              />

              <button className="button" type="submit">
                Responder aluno
              </button>
            </Form>
          </div>
        </Modal>
      )}
    </Container>
  );
}
