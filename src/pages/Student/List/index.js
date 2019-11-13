import React, { useEffect, useState } from 'react';
import { Input } from '@rocketseat/unform';
import { toast } from 'react-toastify';

import history from '~/services/history';
import api from '~/services/api';
import { Table } from '~/components/Table';
import { Container } from '~/components/Container';

export default function List() {
  const [students, setStudents] = useState([]);

  const [delayQuery, setDelayQuery] = useState(null);

  async function loadStutends(text) {
    const res = await api.get('/students', {
      params: { q: text },
    });

    setStudents(res.data);
  }

  async function handleDelete(id) {
    try {
      await api.delete(`/students/${id}`);
      toast.success('Aluno foi excluido');
      loadStutends();
    } catch (error) {
      toast.error('Error ao deletar o aluno');
    }
  }

  async function handleRegister() {
    history.push(`/student/register`);
  }

  async function handleEdit(id) {
    history.push(`/student/${id}/edit`);
  }

  async function handleChange(text) {
    if (delayQuery) {
      clearTimeout(delayQuery);
    }

    setDelayQuery(
      setTimeout(() => {
        loadStutends(text);
      }, 2000)
    );
  }

  useEffect(() => {
    loadStutends();
  }, []);

  return (
    <Container>
      <header>
        <strong>Gerenciano de aluno</strong>
        <div>
          <button onClick={handleRegister} className="button" type="button">
            CADASTRAR
          </button>
          <Input
            onChange={e => handleChange(e.target.value)}
            name="search"
            type="text"
            placeholder="Buscar aluno"
          />
        </div>
      </header>

      <Table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>E-MAIL</th>
            <th className="center">IDADE</th>
            <th className="actions"> </th>
          </tr>
        </thead>
        <tbody>
          {students.map(student => (
            <tr key={student.id}>
              <td>{student.name}</td>
              <td>{student.email}</td>
              <td className="center">{student.idade}</td>
              <td className="actions">
                <button
                  className="link editar"
                  type="button"
                  onClick={() => handleEdit(student.id)}
                >
                  editar
                </button>
                <button
                  onClick={() => handleDelete(student.id)}
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
