import { renderWithIntl } from '@folio/stripes-erm-testing';
import ActionItem from './ActionItem';

describe('ActionItem', () => {
  test('renders expected ActionItem', () => {
    // const { getByText } = renderWithIntl(

    const r = null;
    const onClose = () => {};

    renderWithIntl(<ActionItem onClose={onClose} resource={r} />);

    // @sam - please help me fill this out
    expect(1).toBe(1);
  });
});
