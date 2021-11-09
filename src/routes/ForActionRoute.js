import React from 'react';
import { FormattedMessage } from 'react-intl';

import {
  AppIcon
} from '@folio/stripes/core';

import { SASQRoute } from '@k-int/stripes-kint-components';
import ActionItem from '../components/ActionItem';

import resultColumns from '../constants/actionItemsResultColumns';

const ForActionRoute = ({ path }) => {

  const fetchParameters = {
    endpoint: "remote-sync/feedback/todo",
    itemEndpoint: "remote-sync/feedback",
    SASQ_MAP: {
      searchKey: 'description',
      filterKeys: {
      }
    }
  };

  return (
    <SASQRoute
      fetchParameters={fetchParameters}
      id="for-action"
      mainPaneProps={{
        appIcon: <AppIcon app="remote-sync" iconKey="app" size="small" />,
        paneTitle: <FormattedMessage id="ui-remote-sync.recordList.forAction.title" />
      }}
      resultColumns={resultColumns}
      path={path}
      ViewComponent={ActionItem}
    />
  );
};

export default ForActionRoute;
