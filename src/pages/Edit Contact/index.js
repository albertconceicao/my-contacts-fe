import { ContactForm } from '../../components/ContactForm';
import { PageHeader } from '../../components/PageHeader';

export function EditContact() {
    return (
      <>
        <PageHeader title="Editar Albert Conceição" />
        <ContactForm buttonLabel="Salvar alterações" />
      </>
    );
}
