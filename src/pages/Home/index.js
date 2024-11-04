/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable no-nested-ternary */
import { Link } from 'react-router-dom';

import {
    useCallback,
    useEffect, useMemo, useState,
} from 'react';
import {
    Card,
    Container,
    EmptyListContainer,
    ErrorContainer, Header,
    InputSearchContainer,
    ListHeader,
    SearchNotFoundContainer,
} from './styles';

import arrow from '../../assets/images/icons/arrow.svg';
import edit from '../../assets/images/icons/edit.svg';
import emptyBox from '../../assets/images/icons/empty-box.svg';
import magniFierQuestion from '../../assets/images/icons/magnifier-question.svg';
import trash from '../../assets/images/icons/trash.svg';
import sad from '../../assets/images/sad.svg';

import Button from '../../components/Button';
import { Loader } from '../../components/Loader';
import { Modal } from '../../components/Modal';
import ContactsService from '../../services/ContactsService';
import { toast } from '../../utils/toast';

export function Home() {
  const [contacts, setContacts] = useState([]);
  const [orderBy, setOrderBy] = useState('desc');
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [contactBeingDeleted, setContactBeingDeleted] = useState(null);
  const [isLoadingDelete, setIsLoadingDelete] = useState(false);

  const filteredContacts = useMemo(() => contacts.filter((contact) => (
      contact.name.toLowerCase().includes(searchTerm.toLowerCase())
  )), [contacts, searchTerm]);

  const loadContacts = useCallback(async () => {
    try {
        setIsLoading(true);

        const contactsList = await ContactsService.listContacts(orderBy);

        setHasError(false);
        setContacts(contactsList);
    } catch (error) {
        setHasError(true);
    } finally {
        setIsLoading(false);
    }
  }, [orderBy]);

    useEffect(() => {
        loadContacts();
    }, [loadContacts]);

    function handleToggleOrderBy() {
        setOrderBy((prevState) => (prevState === 'asc' ? 'desc' : 'asc'));
    }

    function handleChangeSearchTerm(event) {
        setSearchTerm(event.target.value);
    }

    function handleTryAgain() {
        loadContacts();
    }
    function handleDeleteContact(contact) {
        setContactBeingDeleted(contact);
        setIsDeleteModalVisible(true);
    }
    function handleCloseDeleteModal() {
        setIsDeleteModalVisible(false);
        setContactBeingDeleted(null);
    }
    async function handleConfirmDeleteContact() {
        try {
            setIsLoadingDelete(true);
            await ContactsService.deleteContact(contactBeingDeleted.id);

            setContacts((prevState) => prevState.filter(
                (contact) => contact.id !== contactBeingDeleted.id,
            ));
            handleCloseDeleteModal();
            toast({ type: 'success', text: 'Contact deleted successfully!' });
        } catch {
            toast({ type: 'danger', text: 'Ops, we found an error while deleting this contact' });
        } finally {
            setIsLoadingDelete(false);
        }
    }
    return (
      <Container>
        <Loader isLoading={isLoading} />

        <Modal
          title={`Are you sure about removing "${contactBeingDeleted?.name}"?`}
          visible={isDeleteModalVisible}
          danger
          confirmLabel="Delete"
          onCancel={handleCloseDeleteModal}
          onConfirm={handleConfirmDeleteContact}
          isLoading={isLoadingDelete}
        >
          <p> This action cannot be undone</p>
        </Modal>
        {contacts.length > 0 && (
        <InputSearchContainer>
          <input
            value={searchTerm}
            type="text"
            placeholder="Search by name"
            onChange={handleChangeSearchTerm}
          />
        </InputSearchContainer>
        )}
        <Header justifycontent={
            hasError
            ? 'flex-end'
            : (
                contacts.length > 0
                ? 'space-between'
                : 'center'
            )
            }
        >
          {(!hasError && contacts.length > 0) && (
            <strong>
              {filteredContacts.length}
              {' '}
              {filteredContacts.length === 1 ? 'contact' : 'contacts'}

            </strong>
          )}
          <Link to="/new">New contact</Link>
        </Header>

        {hasError && (
        <ErrorContainer>
          <img src={sad} alt={sad} />

          <div className="details">
            <strong>An error occurred while loading your contacts!</strong>

            <Button type="button" onClick={handleTryAgain}>
              Try again
            </Button>
          </div>
        </ErrorContainer>
        )}
        {!hasError && (
        <>
            {(contacts.length < 1 && !isLoading) && (
            <EmptyListContainer>
              <img src={emptyBox} alt="Empty Box" />

              <p>
                You don&apos;t have any contacts registered yet!
                Click the <strong>”New contact”</strong> button above
                to register your first one!
              </p>
            </EmptyListContainer>
            )}

          {(contacts.length > 0 && filteredContacts.length < 1) && (
            <SearchNotFoundContainer>
              <img src={magniFierQuestion} alt="Magnifier Question" />

              <span>
                No results found for <strong>{searchTerm}</strong>.
              </span>
            </SearchNotFoundContainer>
          )}
          {filteredContacts.length > 0 && (
          <ListHeader orderby={orderBy}>
            <button type="button" onClick={handleToggleOrderBy}>
              <span>Name</span>
              <img src={arrow} alt="Arrow" />
            </button>

          </ListHeader>
        )}
          {filteredContacts.map((contact) => (
            <Card key={contact.id}>
              <div className="info">
                <div className="contact-name">
                  <strong>{contact.name}</strong>
                  {contact.category_name && <small>{contact.category_name}</small>}
                </div>
                <span>{contact.email}</span>
                <span>{contact.phone}</span>
              </div>

              <div className="actions">
                <Link to={`/edit/${contact.id}`}>
                  <img src={edit} alt="Edit" />
                </Link>
                <button type="button" onClick={() => handleDeleteContact(contact)}>
                  <img src={trash} alt="Remove" />
                </button>
              </div>
            </Card>
          ))}
        </>
        )}
      </Container>
    );
}
