import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

import api from '~/services/api';
import { currencyFormat } from '~/util';

import { Container } from '~/components/Container';
import { Table } from '~/components/Table';
import history from '~/services/history';

export default function Plans() {
  const [plans, setPlans] = useState([]);

  function handleEdit(id) {
    history.push(`/plan/${id}/edit`);
  }

  function handleAdd() {
    history.push('/plan/register');
  }

  async function loadPlans() {
    const res = await api.get('/plans');

    setPlans(
      res.data.map(plan => ({
        ...plan,
        priceFormat: currencyFormat(plan.price),
      }))
    );
  }

  async function handleDelete(id) {
    try {
      await api.delete(`/plans/${id}`);
      toast.success('Plano foi deletado');
      loadPlans();
    } catch (error) {
      toast.error('Erro ao deletar o plano.');
    }
  }

  useEffect(() => {
    loadPlans();
  }, []);

  return (
    <Container>
      <header>
        <strong>Gerenciano planos</strong>
        <div>
          <button onClick={handleAdd} className="button" type="button">
            CADASTRAR
          </button>
        </div>
      </header>

      <Table>
        <thead>
          <tr>
            <th>TÍTULO</th>
            <th className="center">DURAÇÃO</th>
            <th className="center">VALOR p/ MÊS</th>
            <th className="actions"> </th>
          </tr>
        </thead>
        <tbody>
          {plans.map(({ id, title, duration, priceFormat }) => (
            <tr key={id}>
              <td>{title}</td>
              <td className="center">{`${duration} mês`}</td>
              <td className="center">{priceFormat}</td>
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
