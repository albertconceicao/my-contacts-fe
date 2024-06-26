import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import arrow from '../../assets/images/icons/arrow.svg';
import { Container } from './styles';

export function PageHeader({ title }) {
    return (
      <Container>
        <Link to="/">
          <img src={arrow} alt="Voltar para página inicial" />
          <span>Voltar</span>
        </Link>
        <h1>{title}</h1>
      </Container>
    );
}

PageHeader.propTypes = {
    title: PropTypes.string.isRequired,
};
