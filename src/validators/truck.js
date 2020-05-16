import * as Yup from 'yup';

const schema = Yup.object().shape({
  board: Yup.string().required('Campo obrigatório'),
  model: Yup.string().required('Campo obrigatório'),
  brand: Yup.string().required('Campo obrigatório')
});

export default schema;
