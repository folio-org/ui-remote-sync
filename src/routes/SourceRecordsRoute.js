import React from 'react';
import { FormattedMessage } from 'react-intl';

import {
  AppIcon
} from '@folio/stripes/core';

import { SASQRoute } from '@k-int/stripes-kint-components';
import TransformationProcessRecord from '../components/TransformationProcessRecord';

const SourceRecordsRoute = ({ path }) => {

  const fetchParameters = {
    endpoint: "remote-sync/records",
    SASQ_MAP: {
      searchKey: 'label',
      filterKeys: {
      }
    }
  };

  const resultColumns = [
    {
      propertyPath:"selected",
      label: ' '
    },
    {
      propertyPath:"id",
      label: <FormattedMessage id="ui-remote-sync.prop.sourceRecord.id" />
    },
    {
      propertyPath:"label",
      label: <FormattedMessage id="ui-remote-sync.prop.sourceRecord.label" />
    },
    {
      propertyPath:"sourceRecordId",
      label: <FormattedMessage id="ui-remote-sync.prop.sourceRecord.sourceRecordId" />
    },
    {
      propertyPath:"transformationStatus",
      label: <FormattedMessage id="ui-remote-sync.prop.sourceRecord.transformationStatus" />
    },
    {
      propertyPath:"processControlStatus",
      label: <FormattedMessage id="ui-remote-sync.prop.sourceRecord.processControlStatus" />
    },
  ];

  return (
    <SASQRoute
      fetchParameters={fetchParameters}
      id="source-records"
      mainPaneProps={{
        appIcon: <AppIcon app="remote-sync" iconKey="app" size="small" />,
        paneTitle: <FormattedMessage id="ui-remote-sync.recordList.sourceRecords.title" />
      }}
      resultColumns={resultColumns}
      path={path}
      ViewComponent={TransformationProcessRecord}
    />
  );
};

export default SourceRecordsRoute;
