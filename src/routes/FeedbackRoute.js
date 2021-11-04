import React from 'react';

import SASQRoute from '@k-int/stripes-kint-components/src/lib/SASQRoute/SASQRoute';
import FeedbackItem from '../components/FeedbackItem';

const FeedbackRoute = ({ path }) => {

  const fetchParameters = {
    endpoint: "remote-sync/feedback/done",
    SASQ_MAP: {
      searchKey: 'description',
      filterKeys: {
      }
    }
  }


  return (
    <SASQRoute
      fetchParameters={fetchParameters}
      id="feedback-provided"
      path={path}
      ViewComponent={FeedbackItem}
    />
  );
};

export default FeedbackRoute;
