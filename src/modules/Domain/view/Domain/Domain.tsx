import * as React from 'react';
import { block } from 'shared/helpers/bem';

import { DomainConfiguration } from 'features/createDomain';
import { Layout } from 'shared/view';

const b = block('domain');

class Domain extends React.PureComponent {
  public render() {
    const { } = this.props;
    return (
      <Layout>
        <div className={b()}><DomainConfiguration /></div>
      </Layout>
    );
  }
}

export default Domain;
