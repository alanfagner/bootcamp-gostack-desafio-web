import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';

import api from '~/services/api';
import Form from '../Form';

export default function Edit() {
  const { id } = useParams();
  const [plan, setPlan] = useState();

  async function handleEdit(data, resetForm) {
    try {
      const { title, duration, price } = data;

      await api.post('/plans', { title, duration, price });

      toast.success('Plano criado com com sucesso');
      resetForm();
    } catch (error) {
      toast.error('Erro ao cadastrar o plano, verifique os dados');
    }
  }

  useEffect(() => {
    async function loadPlan() {
      const res = await api.get(`/plans/${id}`);
      setPlan(res.data);
    }
    if (id !== 0) {
      loadPlan();
    }
  }, [id]);

  return plan ? <Form action={handleEdit} plan={plan} /> : null;
}
