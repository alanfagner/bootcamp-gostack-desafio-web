import React, { useState, useEffect } from 'react';
import { Input, Select } from '@rocketseat/unform';
import { addMonths, parseISO } from 'date-fns';

import * as Yup from 'yup';
import PropTypes from 'prop-types';

import api from '~/services/api';
import { currencyFormat, dateFormat } from '~/util';

import { Form } from '~/components/Form';
import { Container } from '~/components/Container';
import DatePicker from '~/components/Datepicker';

import history from '~/services/history';

const schema = Yup.object().shape({
  student: Yup.string().required('O nome do aluno é obrigatório'),
  plan: Yup.number()
    .transform((cv, ov) => {
      return ov === '' ? undefined : cv;
    })
    .required('O plano é obrigatória'),
  dtInit: Yup.date()
    .transform((cv, ov) => {
      return ov === '' ? undefined : cv;
    })
    .required('Data de inicío é obrigatório'),
});

export default function Enrollment({ action, enrollmentEdit }) {
  const [enrollment, setEnrollment] = useState({
    student: enrollmentEdit ? enrollmentEdit.student_id : '',
    plan: enrollmentEdit ? enrollmentEdit.plan_id : '',
    dtInit: enrollmentEdit ? parseISO(enrollmentEdit.start_date) : '',
    dtEnd: enrollmentEdit ? dateFormat(parseISO(enrollmentEdit.end_date)) : '',
    total: enrollmentEdit ? currencyFormat(enrollmentEdit.price) : '',
  });

  const [datas, setDatas] = useState();

  function handleBack() {
    history.goBack();
  }

  async function handleSave(data, { resetForm }) {
    action(data, resetForm);
  }

  async function calc(auxEnrollment) {
    const { plan: planId, dtInit } = auxEnrollment;

    if (planId && dtInit) {
      const plan = datas.plans.find(({ id }) => id === parseInt(planId, 10));
      const dtEnd = addMonths(dtInit, plan.duration);
      const total = plan.duration * plan.price;
      setEnrollment({
        ...auxEnrollment,
        dtEnd: dateFormat(dtEnd),
        total: currencyFormat(total),
      });
      return;
    }

    setEnrollment(auxEnrollment);
  }

  useEffect(() => {
    async function loadDatas() {
      const resPlans = await api.get('/plans');
      const resStudants = await api.get('/students');

      setDatas({
        students: resStudants.data.map(student => ({
          ...student,
          title: student.name,
        })),
        plans: resPlans.data,
      });
    }

    loadDatas();
  }, []);

  return datas ? (
    <Container>
      <header>
        <strong> {enrollmentEdit ? 'Edição' : 'Cadastro'} de matrículas</strong>
        <div>
          <button
            onClick={handleBack}
            className="button light-color"
            type="button"
          >
            Voltar
          </button>
          <button form="formEnrollment" className="button" type="submit">
            Salvar
          </button>
        </div>
      </header>

      <Form
        initialData={enrollment}
        schema={schema}
        id="formEnrollment"
        onSubmit={handleSave}
      >
        <Select
          onChange={e => calc({ ...enrollment, student: e.target.value })}
          name="student"
          label="ALUNO"
          placeholder="Buscar aluno"
          options={datas.students}
        />

        <div className="content">
          <div className="input">
            <Select
              onChange={e => calc({ ...enrollment, plan: e.target.value })}
              name="plan"
              label="PLANO"
              placeholder="Selecione o plano"
              options={datas.plans}
            />
          </div>
          <div className="input">
            <DatePicker
              onChange={e => calc({ ...enrollment, dtInit: e })}
              name="dtInit"
              label="DATA DE INÍCIO"
            />
          </div>
          <div className="input">
            <Input
              value={enrollment.dtEnd}
              disabled
              name="end"
              type=""
              label="DATA DE TÉRMINIO"
            />
          </div>
          <div className="input">
            <Input
              value={enrollment.total}
              disabled
              name="calTotal"
              type=""
              label="VALOR FINAL"
            />
          </div>
        </div>
      </Form>
    </Container>
  ) : null;
}

Enrollment.propTypes = {
  action: PropTypes.func.isRequired,
  enrollmentEdit: PropTypes.shape({
    start_date: PropTypes.string,
    end_date: PropTypes.string,
    price: PropTypes.string,
    student_id: PropTypes.number,
    plan_id: PropTypes.number,
  }),
};

Enrollment.defaultProps = {
  enrollmentEdit: PropTypes.shape({
    start_date: PropTypes.string,
    end_date: PropTypes.string,
    price: PropTypes.string,
    student_id: PropTypes.number,
    plan_id: PropTypes.number,
  }),
};
