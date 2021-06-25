import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useOkapiKy } from '@folio/stripes/core';
import { useQuery, useMutation } from 'react-query';
import {
  MultiColumnList,
  Pane,
  Paneset
} from '@folio/stripes/components';
import { FormattedMessage } from 'react-intl';




/**
 * context: fetcher memo key
 * target: path to okapi module / resource within module eg /mod-remote-sync/feedback
 * result_columns: define the possible result colums for tabular display in SASQ - labels, access paths, etc
 * details_factory: the function which given an object in the result list can return a component
 *                  used to render a details pain - might just be a simple factory that only returns one component
 */ 
const propTypes = {
  context: PropTypes.array,
  target: PropTypes.string,
  result_columns: PropTypes.array,
  details_factory: PropTypes.func,
};

export default function SimpleLookupSASQ({context, target, result_columns, details_factory} : props) {


  const ky = useOkapiKy();

  let buildQueryParams = () => {
    return {
      stats: true
    }
  }

  // const { data: { 0: summary } = [], isLoading: summaryLoading, refetch: refetchSummary } = useQuery(

  const { data, isLoading, refetch } = useQuery(
    context,
    async () => {
      // Actually wait for the data to come back.
      const simple_lookup_response = await ky(target, {searchParams: buildQueryParams()} ).json();
      return simple_lookup_response;
    }
  );

  const rowClickHandler = (event,item) => {
    console.log("select row %o",item);
  }

  const table_data= data ? data.results : []
  const total_records = data ? data.totalRecords : 0;

  const show_details = false;

  return (
    <Paneset>
      <Pane 
        defaultWidth="fill"
        noOverflow
        padContent={false}
        >
        <MultiColumnList
          autosize
          columnMapping={{
            selected: ' ',
            id: <FormattedMessage id="ui-remote-sync.prop.feedback.id" />,
            correlationId: <FormattedMessage id="ui-remote-sync.prop.feedback.correlationId" />,
            caseIndicator: <FormattedMessage id="ui-remote-sync.prop.feedback.caseIndicator" />,
            status: <FormattedMessage id="ui-remote-sync.prop.feedback.status" />,
            description: <FormattedMessage id="ui-remote-sync.prop.feedback.description" />
          }}
          contentData={table_data}
          totalCount={total_records}
          visibleColumns={['id', 'correlationId', 'caseIndicator', 'status', 'description']}
          onRowClick={rowClickHandler}
        />
      </Pane>
    </Paneset>
  );
}

SimpleLookupSASQ.propTypes = propTypes;