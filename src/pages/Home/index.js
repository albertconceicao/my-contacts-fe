import { Link } from 'react-router-dom';

import {
    Card,
    Container, Header,
    InputSearchContainer,
    ListContainer,
} from './styles';

import arrow from '../../assets/images/icons/arrow.svg';
import edit from '../../assets/images/icons/edit.svg';
import trash from '../../assets/images/icons/trash.svg';

export function Home() {
    return (
      <Container>
        <InputSearchContainer>
          <input type="text" placeholder="Pesquise pelo nome" />
        </InputSearchContainer>
        <Header>
          <strong>3 contatos</strong>
          <Link to="/new">Novo contato</Link>
        </Header>

        <ListContainer>
          <header>
            <button type="button">
              <span>Nome</span>
              <img src={arrow} alt="Arrow" />
            </button>
          </header>
          <Card>
            <div className="info">
              <div className="contact-name">
                <strong>Albert Conceição</strong>
                <small>Instagram</small>
              </div>
              <span>contato@albertconceicao.dev.br</span>
              <span>(71) 99999-8888</span>
            </div>

            <div className="actions">
              <Link to="/edit/123">
                <img src={edit} alt="Editar" />
              </Link>
              <button type="button">
                <img src={trash} alt="Excluir" />
              </button>
            </div>
          </Card>
          <Card>
            <div className="info">
              <div className="contact-name">
                <strong>Albert Conceição</strong>
                <small>Instagram</small>
              </div>
              <span>contato@albertconceicao.dev.br</span>
              <span>(71) 99999-8888</span>
            </div>

            <div className="actions">
              <Link to="/edit/123">
                <img src={edit} alt="Editar" />
              </Link>
              <button type="button">
                <img src={trash} alt="Excluir" />
              </button>
            </div>
          </Card>
          <Card>
            <div className="info">
              <div className="contact-name">
                <strong>Albert Conceição</strong>
                <small>Instagram</small>
              </div>
              <span>contato@albertconceicao.dev.br</span>
              <span>(71) 99999-8888</span>
            </div>

            <div className="actions">
              <Link to="/edit/123">
                <img src={edit} alt="Editar" />
              </Link>
              <button type="button">
                <img src={trash} alt="Excluir" />
              </button>
            </div>
          </Card>
        </ListContainer>
      </Container>
    );
}
