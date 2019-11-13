import React, { useState, useEffect } from 'react';
import { parseISO } from 'date-fns';
import { toast } from 'react-toastify';
import api from '~/services/api';
import { dateFormat, currencyFormat } from '~/util';

import { Container } from '~/components/Container';
import { Table } from '~/components/Table';
import history from '~/services/history';

export default function Enrollments() {
  const [enrollments, setEnrollments] = useState([]);

  function handleEdit(id) {
    history.push(`/enrollment/${id}/edit`);
  }

  function handleAdd() {
    history.push('/enrollment/register');
  }

  async function loadEnrollments() {
    const res = await api.get('/enrollments');
    setEnrollments(
      res.data.map(enrollment => ({
        ...enrollment,
        start: dateFormat(
          parseISO(enrollment.start_date),
          "dd 'de' MMMM 'de' yyyy "
        ),
        end: dateFormat(
          parseISO(enrollment.end_date),
          "dd 'de' MMMM 'de' yyyy "
        ),
        formatPrice: currencyFormat(enrollment.price),
      }))
    );
  }

  async function handleDelete(id) {
    try {
      await api.delete(`/enrollments/${id}`);
      toast.success('Matricula foi deletado');
      loadEnrollments();
    } catch (error) {
      toast.error('Erro ao deletar o matricula.');
    }
  }

  useEffect(() => {
    loadEnrollments();
  }, []);

  return (
    <Container>
      <header>
        <strong>Gerenciano matrículas</strong>
        <div>
          <button onClick={handleAdd} className="button" type="button">
            CADASTRAR
          </button>
        </div>
      </header>

      <Table>
        <thead>
          <tr>
            <th>ALUNO</th>
            <th className="center">PLANO</th>
            <th className="center">INÍCIO</th>
            <th className="center">TÉMINIO</th>
            <th className="center">ATIVA</th>
            <th className="actions"> </th>
          </tr>
        </thead>
        <tbody>
          {enrollments.map(({ id, start, end, formatPrice, student, plan }) => (
            <tr key={id}>
              <td>{student && student.name}</td>
              <td>{plan && plan.title}</td>
              <td className="center">{start}</td>
              <td className="center">{end}</td>
              <td className="center">{formatPrice}</td>
              <td className="actions">
                <button
                  className="link editar"
                  type="button"
                  onClick={() => handleEdit(id)}
                >
                  editar
                </button>
                <button
                  onClick={() => handleDelete(id)}
                  className="link apagar"
                  type="button"
                >
                  apagar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}
