import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import Form from '../Form';

import api from '~/services/api';

export default function Edit() {
  const { id } = useParams();
  const [enrollment, setEnrollment] = useState();

  async function handleEdit(data) {
    const { student: student_id, plan: plan_id, date: start_date } = data;

    try {
      await api.put(`/enrollments/${id}`, { start_date, student_id, plan_id });
      toast.success('Matricula foi atualizada com sucesso.');
    } catch (error) {
      toast.error('Erro ao salvar a matricula');
    }
  }

  useEffect(() => {
    async function loadEnrollment() {
      const res = await api.get(`/enrollments/${id}`);

      setEnrollment(res.data);
    }

    loadEnrollment();
  }, [id]);

  return enrollment ? (
    <Form action={handleEdit} enrollmentEdit={enrollment} />
  ) : null;
}
