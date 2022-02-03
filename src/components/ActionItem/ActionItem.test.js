import React from 'react';
import '@folio/stripes-erm-components/test/jest/__mock__';
import { renderWithIntl } from '@folio/stripes-erm-components/test/jest/helpers';
import ActionItem from './ActionItem';

describe('ActionItem', () => {
  test('renders expected ActionItem', () => {
    // const { getByText } = renderWithIntl(

    const r = null;

    renderWithIntl(
      <ActionItem resource={r}/>
    );

    // @sam - please help me fill this out
    expect(1).toBe(1);
  });
});
