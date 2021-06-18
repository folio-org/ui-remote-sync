import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useOkapiKy } from '@folio/stripes/core';
import { useQuery, useMutation } from 'react-query';

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


  return (
    <div>
      {data} 
    </div>
  );
}

SimpleLookupSASQ.propTypes = propTypes;
