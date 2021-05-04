import React, { useState } from 'react';

import {
  Dropdown,
  DropdownMenu
} from '@folio/stripes/components';

import { FormattedMessage } from 'react-intl';

import css from '../Header.css';

const ActionButton = () => {
  const [dropdownOpen, setDropDownOpen] = useState(false);
  const toggleDropdown = () => {
    setDropDownOpen(!dropdownOpen);
  };

  return (
    <div className={css.actionButtonContainer}>
      <Dropdown
        buttonProps={{
          'marginBottom0': true,
        }}
        label={<FormattedMessage id="ui-remote-sync.remoteSyncView.paneHeader.searchBar.actions" />}
        onToggle={toggleDropdown}
        open={dropdownOpen}
      >
        <DropdownMenu role="menu">
          <span>This is our dropdown</span>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
};

export default ActionButton;
