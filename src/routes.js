import { Route, Switch } from 'react-router-dom';

import { EditContact } from './pages/Edit Contact';
import { Home } from './pages/Home';
import { NewContact } from './pages/New Contact';

export function Routes() {
    return (
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/new" component={NewContact} />
        <Route path="/edit/:id" component={EditContact} />
      </Switch>
    );
}
