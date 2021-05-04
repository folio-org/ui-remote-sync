import React from 'react';
import PropTypes from 'prop-types';

import {
  PaneHeader,
} from '@folio/stripes/components';
import ActionButton from './ActionButton';
import Divider from './Divider';
import SearchBar from './SearchBar';
import ToggleFilterPaneButton from './ToggleFilterPaneButton';

import css from './Header.css';

const propTypes = {
  searchTerm: PropTypes.string,
  setSearchTerm: PropTypes.func.isRequired,
  showFilter: PropTypes.bool.isRequired,
  toggleFilterPane: PropTypes.func.isRequired
};

const Header = ({
  searchTerm,
  setSearchTerm,
  showFilter,
  toggleFilterPane
}) => (
  <PaneHeader
    header={
      <div className={css.paneHeaderContainer}>
        <ToggleFilterPaneButton
          showFilter={showFilter}
          toggleFilterPane={toggleFilterPane}
        />
        <SearchBar
          onSearch={() => null}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />
        <div className={css.divider}>
          <Divider />
        </div>
        <ActionButton />
      </div>
    }
  />
);

Header.propTypes = propTypes;

export default Header;
