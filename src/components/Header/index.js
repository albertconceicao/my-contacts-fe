import { Container } from './styles';

import logo from '../../assets/images/contacts-logo.svg';

export function Header() {
  return (
    <Container>
      <img src={logo} alt="MyContacts" width={201} />

    </Container>
  );
}
