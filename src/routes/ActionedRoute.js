import React from 'react';
import { FormattedMessage } from 'react-intl';

import {
  AppIcon
} from '@folio/stripes/core';

import SASQRoute from '@k-int/stripes-kint-components/src/lib/SASQRoute/SASQRoute';
import ActionItem from '../components/ActionItem';

import resultColumns from '../constants/actionItemsResultColumns';

const ActionedRoute = ({ path }) => {

  const fetchParameters = {
    endpoint: "remote-sync/feedback/done",
    SASQ_MAP: {
      searchKey: 'description',
      filterKeys: {
      }
    }
  };

  return (
    <SASQRoute
      fetchParameters={fetchParameters}
      id="actioned"
      mainPaneProps={{
        appIcon: <AppIcon app="remote-sync" iconKey="app" size="small" />,
        paneTitle: <FormattedMessage id="ui-remote-sync.recordList.actioned.title" />
      }}
      resultColumns={resultColumns}
      path={path}
      ViewComponent={ActionItem}
    />
  );
};

export default ActionedRoute;
