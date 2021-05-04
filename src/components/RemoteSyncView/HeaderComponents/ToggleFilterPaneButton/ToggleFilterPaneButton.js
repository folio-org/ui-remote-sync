import React from 'react';

import {
  PaneMenu
} from '@folio/stripes/components';

import {
  ExpandFilterPaneButton,
} from '@folio/stripes/smart-components';

import css from '../Header.css';

const ToggleFilterPaneButton = ({ showFilter, toggleFilterPane }) => {
  return (
    !showFilter &&
      <div className={css.filterPaneButton}>
        <PaneMenu>
          <ExpandFilterPaneButton
            key="toggleFilterPane"
            onClick={toggleFilterPane}
          />
        </PaneMenu>
      </div>
  );
};

export default ToggleFilterPaneButton;
