import React from 'react';
import { Grid, Row, Col, Button } from '@folio/stripes/components';
import Xarrow from 'react-xarrows';
import { useOkapiKy } from '@folio/stripes/core';
import { useQuery } from 'react-query';

const propTypes = {};

const boxStyle = {
  border: 'grey solid 2px',
  borderRadius: '10px',
  padding: '10px',
  margin: '25px',
};

const animationStyle = {
  animation: 1,
};

// See https://github.com/folio-org/ui-dashboard/blob/master/src/routes/DashboardRoute.js#L26-L34

export default function RemoteSyncSummary() {
  const ky = useOkapiKy();

  // const { data: { 0: summary } = [], isLoading: summaryLoading, refetch: refetchSummary } = useQuery(
  // const { data, isLoading, refetch } = useQuery(
  const { data } = useQuery(
    ['ui-remote-sync', 'summary'],
    async () => {
      // Actually wait for the data to come back.
      const syncStatusReport = await ky(
        'remote-sync/extendedStatusReport'
      ).json();
      return syncStatusReport;
    }
  );

  const triggerSync = (fullHarvest, reprocess) => {
    const triggerWorkerGet = async () => {
      const json = await ky
        .get('remote-sync/settings/worker', {
          searchParams: {
            fullHarvest: fullHarvest ? 'Y' : 'N',
            reprocess: reprocess ? 'Y' : 'N',
          },
        })
        .json();
      return json;
    };

    // triggerWorkerGet().then(console.log);
    triggerWorkerGet();
  };

  let gridRows = [];
  const arrows = [];

  if (data != null && data.processes != null) {
    gridRows = data.processes.map((datarow) => {
      // Pull out the extractors
      let extractors = null;
      if (datarow.extractors != null) {
        extractors = datarow.extractors.map((extractor) => {
          return (
            <div key={extractor.id} id={extractor.id} style={boxStyle}>
              <h3>
                {extractor.name} ( {extractor.status} )
              </h3>
              Next Due: {extractor.nextDueString}
              <br />
            </div>
          );
        });
      }

      let processes = null;
      if (datarow.processes != null) {
        processes = datarow.processes.map((process) => {
          return (
            <div key={process.id} id={process.id} style={boxStyle}>
              <h3>{process.name}</h3>
              <ul>
                {process.recordCounts.map((rc) => (
                  <li key={rc[0]}>
                    {rc[0]} : {rc[1]}
                  </li>
                ))}
              </ul>
            </div>
          );
        });
      }

      return (
        <Row key={'dr:' + datarow.id} between="xs">
          <Col>
            <div id={datarow.id} style={boxStyle}>
              <h3>
                {datarow.sourceName} ({datarow.status})
              </h3>
              enabled: {datarow.enabled ? 'true' : 'false'} <br />
              Record Count: {datarow.recordCount} <br />
              Next Due: {datarow.nextDueString} <br />
            </div>
          </Col>
          <Col>{extractors}</Col>
          <Col>{processes}</Col>
          <Col />
        </Row>
      );
    });

    // Collect arrows
    data.processes.forEach((ds) => {
      ds.extractors.forEach((ext) => {
        arrows.push(
          <Xarrow
            key={ds.id + ':' + ext.id}
            color="green"
            dashness={animationStyle}
            end={ext.id}
            headSize={3}
            start={ds.id}
          />
        );
        arrows.push(
          <Xarrow
            key={ext.id + ':' + ext.target}
            color="green"
            dashness={animationStyle}
            end={ext.target}
            headSize={3}
            start={ext.id}
          />
        );
      });
    });
  } else {
    // console.log('No data...');
  }

  return (
    <div>
      <Button onClick={() => triggerSync(false, false)}>Trigger Sync</Button>{' '}
      &nbsp;
      <Button onClick={() => triggerSync(false, true)}>
        Trigger Sync (Full Reprocess)
      </Button>{' '}
      <br />
      <Grid fluid>
        {gridRows}
        {arrows}
      </Grid>
    </div>
  );
}

RemoteSyncSummary.propTypes = propTypes;
