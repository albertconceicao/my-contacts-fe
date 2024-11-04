import PropTypes from 'prop-types';
import {
    forwardRef, useEffect,
    useImperativeHandle,
    useState,
} from 'react';

import { useErrors } from '../../hooks/useErrors';
import CategoriesService from '../../services/CategoriesService';
import isEmailValid from '../../utils/isEmailValid';

import { ButtonContainer, Form } from './styles';

import { useSafeAsyncState } from '../../hooks/useSafeAsyncState';
import formatPhone from '../../utils/formatPhone';
import Button from '../Button';
import { FormGroup } from '../FormGroup';
import Input from '../Input';
import Select from '../Select';

// eslint-disable-next-line react/prop-types
    export const ContactForm = forwardRef(({ buttonLabel, onSubmit }, ref) => {
        const [name, setName] = useState('');
        const [email, setEmail] = useState('');
        const [phone, setPhone] = useState('');
        const [categoryId, setCategoryId] = useState('');
        const [categories, setCategories] = useSafeAsyncState([]);
        const [isLoadingCategories, setIsLoadingCategories] = useSafeAsyncState(true);
        const [isSubmitting, setIsSubmitting] = useState(false);

        const {
            errors,
            setError,
            removeError,
            getErrorMessageByFieldName,
        } = useErrors();

        const isFormValid = (name && errors.length === 0);

        useImperativeHandle(ref, () => ({
                setFieldsValues: (contact) => {
                    setName(contact.name ?? '');
                    setEmail(contact.email ?? '');
                    setPhone(formatPhone(contact.phone) ?? '');
                    setCategoryId(contact.category_id ?? '');
                },
                resetFields: () => {
                    setName('');
                    setEmail('');
                    setPhone('');
                    setCategoryId('');
                },
            }), []);

        useEffect(() => {
            let isMounted = true;
            async function loadCategories() {
                try {
                    const categoriesList = await CategoriesService.listCategories();

                    if (isMounted) {
                        setCategories(categoriesList);
                    }
                } catch (error) {
                    console.log(error);
                } finally {
                   if (isMounted) {
                        setIsLoadingCategories(false);
                    }
                }
            }
            loadCategories();

            return () => {
                isMounted = false;
            };
        }, [setCategories, setIsLoadingCategories]);

        function handleNameChange(event) {
        setName(event.target.value);

        if (!event.target.value) {
            setError({ field: 'name', message: 'Name is required' });
        } else {
            removeError('name');
        }
        }

        function handleEmailChange(event) {
        setEmail(event.target.value);

        if (event.target.value && !isEmailValid(event.target.value)) {
            setError({ field: 'email', message: 'Invalid email format' });
        } else {
            removeError('email');
        }
        }

        async function handleSubmit(event) {
            event.preventDefault();

            setIsSubmitting(true);
            await onSubmit({
                name,
                email,
                phone: phone.replace(/\D/g, ''),
                categoryId,

            });

            setIsSubmitting(false);
        }

        function handlePhoneChange(event) {
        setPhone(formatPhone(event.target.value));
        }

        return (
          <Form onSubmit={handleSubmit} noValidate>

            <FormGroup error={getErrorMessageByFieldName('name')}>
              <Input
                placeholder="Name *"
                type="text"
                value={name}
                onChange={handleNameChange}
                error={getErrorMessageByFieldName('name')}
                disabled={isSubmitting}
              />
            </FormGroup>
            <FormGroup error={getErrorMessageByFieldName('email')}>
              <Input
                placeholder="Email"
                type="email"
                value={email}
                onChange={handleEmailChange}
                error={getErrorMessageByFieldName('email')}
                disabled={isSubmitting}
              />
            </FormGroup>
            <FormGroup>
              <Input
                placeholder="Phone"
                type="tel"
                value={phone}
                onChange={handlePhoneChange}
                maxLength="15"
                disabled={isSubmitting}
              />
            </FormGroup>

            <FormGroup isLoading={isLoadingCategories}>
              <Select
                value={categoryId}
                onChange={(event) => setCategoryId(event.target.value)}
                disabled={isLoadingCategories || isSubmitting}
              >
                <option value="">No category</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
            ))}
              </Select>
            </FormGroup>

            <ButtonContainer>
              <Button
                type="submit"
                disabled={!isFormValid}
                isLoading={isSubmitting}
              >
                {buttonLabel}
              </Button>
            </ButtonContainer>
          </Form>
        );
    });

ContactForm.propTypes = {
    buttonLabel: PropTypes.string.isRequired,
    onSubmit: PropTypes.func.isRequired,
};
