import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Grid, Row, Col } from '@folio/stripes/components';
import Xarrow from "react-xarrows";
import { useOkapiKy } from '@folio/stripes/core';
import { useQuery, useMutation } from 'react-query';

const propTypes = {
};


const boxStyle = {
    border: "grey solid 2px",
    borderRadius: "10px",
    padding: "5px",
};

const animationStyle = {
  animation: 1
}

// See https://github.com/folio-org/ui-dashboard/blob/master/src/routes/DashboardRoute.js#L26-L34

export default function RemoteSyncSummary({}) {

  const ky = useOkapiKy();

  const { data: { 0: summary } = [], isLoading: summaryLoading, refetch: refetchSummary } = useQuery(
    ['ui-remote-sync', 'summary'],
    async () => {
      // Actually wait for the data to come back.
      const sync_status_report = await ky("remote-sync/statusReport").json();
      console.log("Got status report %o",sync_status_report);
      return sync_status_report;
    }
  );

  return (
    <Grid fluid>
      <Row between="xs">
        <Col>
          Sources
        </Col>
        <Col>
          Extract
        </Col>
        <Col>
          Transform
        </Col>
        <Col>
          Load
        </Col>
      </Row>

      <Row between="xs">
        <Col>
          <div id="test_source_one" style={boxStyle}>
            Source one
          </div>
        </Col>

        <Col>

          <div id="test_extract_one" style={boxStyle}>
            Extract one
          </div>

          <div id="test_extract_two" style={boxStyle}>
            Extract two
          </div>
        </Col>

        <Col>
        </Col>

        <Col>
        </Col>

      </Row>

      <Row between="xs">
        <Col>
          <div id="test_source_two" style={boxStyle}>
            Source Two
          </div>
        </Col>

        <Col>
          <div id="test_extract_three" style={boxStyle}>
            Extract Two
          </div>
        </Col>

        <Col>
        </Col>

        <Col>
        </Col>
      </Row>

      <Xarrow start="test_source_one" end="test_extract_one" color="green" headSize={3} dashness={animationStyle} />
      <Xarrow start="test_source_one" end="test_extract_two" color="green" headSize={3} dashness={animationStyle} />
      <Xarrow start="test_source_two" end="test_extract_three" color="green" headSize={3} dashness={animationStyle} />

    </Grid>
  );
}

RemoteSyncSummary.propTypes = propTypes;
