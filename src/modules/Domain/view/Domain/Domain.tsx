import * as React from 'react';
import { block } from 'shared/helpers/bem';

import { Todos } from 'features/manageTodos';
import { Layout } from 'shared/view';

const b = block('domain');

class Domain extends React.PureComponent {
  public render() {
    const { } = this.props;
    return (
      <Layout>
        <div className={b()}><Todos /></div>
      </Layout>
    );
  }
}

export default Domain;
