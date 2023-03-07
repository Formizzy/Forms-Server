import Form, { FormModel } from '../model/Form';

async function createForm(
  form: Form,
): Promise<{ form: Form }> {

  const now = new Date();

  form.createdAt = form.updatedAt = now;

  const createdForm = await FormModel.create(form);

  return {
    form: { ...createdForm.toObject() }
  };
}

export default {
  createForm,
};
