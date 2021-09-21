import React from 'react';
import PropTypes from 'prop-types';

import { useIntl } from 'react-intl';

import { useSettings } from '@k-int/stripes-kint-components';

import DefinitionsPage from './DefinitionsPage';

const RemoteSyncSettings = (props) => {
  const intl = useIntl();
  const persistentPages = [
    {
      route: 'definitions',
      label: intl.formatMessage({ id: 'ui-remote-sync.settings.settingsSection.definitions' }),
      component: () => <DefinitionsPage sectionName="Definitions" />
    }
  ];

  const { isLoading, SettingsComponent } = useSettings({
    dynamicPageExclusions: [],
    intlKey: 'ui-remote-sync',
    persistentPages,
    refdataEndpoint: 'remote-sync/refdata',
    settingEndpoint: 'remote-sync/settings/appSettings'
  });

  if (isLoading) {
    return null;
  }

  return (
    <SettingsComponent
      {...props}
    />
  );
};

RemoteSyncSettings.propTypes = {
  resources: PropTypes.shape({
    settings: PropTypes.shape({
      records: PropTypes.array
    })
  }),
  intl: PropTypes.shape({
    formatMessage: PropTypes.func.isRequired,
  }).isRequired,
  match: PropTypes.shape({
    path: PropTypes.string.isRequired,
  }).isRequired,
};

export default RemoteSyncSettings;
