import React, { useState } from 'react';
import { Input } from '@rocketseat/unform';

import * as Yup from 'yup';
import PropTypes from 'prop-types';

import { currencyFormat } from '~/util';
import { Form } from '~/components/Form';
import { Container } from '~/components/Container';

import history from '~/services/history';

const schema = Yup.object().shape({
  title: Yup.string().required('O título é obrigatório'),
  duration: Yup.number()
    .transform((cv, ov) => {
      return ov === '' ? undefined : cv;
    })
    .required('Duração é obrigatória'),
  price: Yup.number()
    .transform((cv, ov) => {
      return ov === '' ? undefined : cv;
    })
    .required('Preço é obrigatório'),
});

export default function Plan({ action, plan }) {
  const [auxPrice, setPrice] = useState(plan && plan.price);
  const [auxDuration, setDuration] = useState(plan && plan.duration);
  const [total, setTotal] = useState(
    plan ? currencyFormat(plan.price * plan.duration) : 0
  );

  function handleBack() {
    history.goBack();
  }

  async function handleSave(data, { resetForm }) {
    action(data, resetForm);
  }

  async function calcTotal(price, duration) {
    if (price && duration) {
      setTotal(currencyFormat(price * duration));
    } else {
      setTotal(0);
    }
  }

  return (
    <Container>
      <header>
        <strong> {plan ? 'Editar' : 'Cadastro de'} plano</strong>
        <div>
          <button
            onClick={handleBack}
            className="button light-color"
            type="button"
          >
            Voltar
          </button>
          <button form="cadastrar" className="button" type="submit">
            Salvar
          </button>
        </div>
      </header>

      <Form
        initialData={plan}
        schema={schema}
        id="cadastrar"
        onSubmit={handleSave}
      >
        <Input name="title" label="TÍTULO DO PLANO" />
        <div className="content">
          <div className="input">
            <Input
              onChange={e => {
                setDuration(e.target.value);
                calcTotal(auxPrice, e.target.value);
              }}
              type="number"
              name="duration"
              label="DURAÇÃO (em meses)"
            />
          </div>
          <div className="input">
            <Input
              onChange={e => {
                setPrice(e.target.value);
                calcTotal(e.target.value, auxDuration);
              }}
              name="price"
              type="number"
              label="PREÇO MENSAL"
            />
          </div>
          <div className="input">
            <Input
              value={total}
              disabled
              name="total"
              type=""
              label="PREÇO TOTAL"
            />
          </div>
        </div>
      </Form>
    </Container>
  );
}

Plan.propTypes = {
  action: PropTypes.func.isRequired,
  plan: PropTypes.shape({
    price: PropTypes.string,
    duration: PropTypes.number,
  }),
};

Plan.defaultProps = {
  plan: PropTypes.shape({
    price: PropTypes.string,
    duration: PropTypes.number,
  }),
};
