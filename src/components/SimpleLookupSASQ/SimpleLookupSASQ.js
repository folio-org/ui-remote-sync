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
  details: PropTypes.func,
};

export default function SimpleLookupSASQ({context, target, result_columns, details, defaultSort, paneTitle } : props) {


  const ky = useOkapiKy();

  let buildQueryParams = () => {
    return {
      max:100,
      offset:0,
      stats: true,
      sort: defaultSort
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

  const [showDetails, setShowDetails] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState({});

  // Build the map of column definitions
  const cm = Object.fromEntries(
    result_columns.map(e => [e.propertyPath, e.label])
  )

  // Build the list of visible columns
  const vc = result_columns.map(e => e.propertyPath);

  const rowClickHandler = (event,item) => {
    console.log("select row %o",item);
    setSelectedRecord(item)
    setShowDetails(true)
  }

  const closeDetailsHandler = () => {
    console.log("Close details...");
    setShowDetails(false)
  }

  const table_data= data ? data.results : []
  const total_records = data ? data.totalRecords : 0;

  const DetailsComponent = details;

  const details_pane = ( ( showDetails==true ) && 
                         ( DetailsComponent != null ) &&
                         ( selectedRecord != null ) ) ? <DetailsComponent resource={selectedRecord} closeDetailsHandler={closeDetailsHandler} /> : null;

  return (
    <Paneset>
      <Pane 
        defaultWidth="fill"
        noOverflow
        padContent={false}
        paneTitle={paneTitle}
        >
        <MultiColumnList
          autosize
          columnMapping={cm}
          contentData={table_data}
          totalCount={total_records}
          visibleColumns={vc}
          onRowClick={rowClickHandler}
        />
      </Pane>

      {details_pane}
    </Paneset>
  );
}

SimpleLookupSASQ.propTypes = propTypes;
