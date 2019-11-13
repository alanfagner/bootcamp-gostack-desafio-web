import React from 'react';
import { toast } from 'react-toastify';

import Form from '../Form';

import api from '~/services/api';

export default function Add() {
  async function handlAdd(data, resetForm) {
    const { student: student_id, plan: plan_id, dtInit: start_date } = data;

    try {
      await api.post('/enrollments', { start_date, student_id, plan_id });
      toast.success('Matricula salva com sucesso.');
      resetForm();
    } catch (error) {
      toast.error('Erro ao salvar a matricula');
    }
  }

  return <Form action={handlAdd} enrollmentEdit={null} />;
}
