import React from 'react';
import { toast } from 'react-toastify';
import api from '~/services/api';

import Form from '../Form';

export default function Add() {
  async function handleSave(data, resetForm) {
    try {
      const { title, duration, price } = data;

      await api.post('/plans', { title, duration, price });

      toast.success('Plano criado com com sucesso');
      resetForm();
    } catch (error) {
      toast.error('Erro ao cadastrar o plano, verifique os dados');
    }
  }

  return <Form action={handleSave} plan={null} />;
}
