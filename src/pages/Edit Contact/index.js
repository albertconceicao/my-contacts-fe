import { useEffect, useRef, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { ContactForm } from '../../components/ContactForm';
import { Loader } from '../../components/Loader';
import { PageHeader } from '../../components/PageHeader';
import { useSafeAsyncAction } from '../../hooks/useSafeAsyncAction';
import ContactsService from '../../services/ContactsService';
import { toast } from '../../utils/toast';

export function EditContact() {
    const [isLoading, setIsLoading] = useState(true);
    const [contactName, setContactName] = useState('');
    const contactFormRef = useRef(null);

    const { id } = useParams();
    const history = useHistory();
    const safeAsyncAction = useSafeAsyncAction();
    useEffect(() => {
        async function loadContact() {
            try {
                const contact = await ContactsService.getContactById(
                    id,
                );

                safeAsyncAction(() => {
                    contactFormRef.current.setFieldsValues(contact);
                    setIsLoading(false);
                    setContactName(contact.name);
                });
            } catch {
                safeAsyncAction(() => {
                    history.push('/');
                    toast({
                        type: 'danger',
                        text: 'Contact not found',
                    });
                });
            }
        }
        loadContact();
    }, [id, history, safeAsyncAction]);
    async function handleSubmit(formData) {
        try {
            const contact = {
                name: formData.name,
                email: formData.email,
                phone: formData.phone,
                category_id: formData.categoryId,
            };

            const response = await ContactsService.updateContact(id, contact);

            setContactName(response.name);
            toast({ type: 'success', text: 'Contact updated successfully', duration: 3000 });
        } catch (error) {
            toast({ type: 'danger', text: 'Ops, we found an error while updating this contact' });
        }
    }
    return (
      <>
        <Loader isLoading={isLoading} />
        <PageHeader title={isLoading ? 'Loading...' : `Edit ${contactName}`} />
        <ContactForm
          ref={contactFormRef}
          buttonLabel="Save changes"
          onSubmit={handleSubmit}
        />
      </>
    );
}
