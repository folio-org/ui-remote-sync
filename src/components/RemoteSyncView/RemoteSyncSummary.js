import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Grid, Row, Col } from '@folio/stripes/components';
import Xarrow from "react-xarrows";
import { useOkapiKy } from '@folio/stripes/core';
import { useQuery, useMutation } from 'react-query';
import { Button } from '@folio/stripes/components';

const propTypes = {
};


const boxStyle = {
    border: "grey solid 2px",
    borderRadius: "10px",
    padding: "10px",
    margin: "25px"
};

const animationStyle = {
  animation: 1
}

// See https://github.com/folio-org/ui-dashboard/blob/master/src/routes/DashboardRoute.js#L26-L34

export default function RemoteSyncSummary({}) {

  const ky = useOkapiKy();

  // const { data: { 0: summary } = [], isLoading: summaryLoading, refetch: refetchSummary } = useQuery(
  const { data, isLoading, refetch } = useQuery(
    ['ui-remote-sync', 'summary'],
    async () => {
      // Actually wait for the data to come back.
      const sync_status_report = await ky("remote-sync/extendedStatusReport").json();
      console.log("Got status report %o",sync_status_report);
      return sync_status_report;
    }
  );

  const triggerSync = (fullHarvest, reprocess) => {
    console.log("triggerSync");
    let trigger_worker_get = async () => {
      const json = await ky.get('remote-sync/settings/worker',
                                {
                                  searchParams:{
                                    'fullHarvest':fullHarvest ? 'Y' : 'N',
                                    'reprocess':reprocess ? 'Y' : 'N'
                                  }
                                }).json();
      return json
    }

    trigger_worker_get().then(console.log)
  }

  let grid_rows = []
  let arrows =[]

  
  if ( ( data != null ) && ( data.processes != null ) ) {
    grid_rows = data.processes.map( datarow => {

      // Pull out the extractors
      let extractors = null;
      if ( datarow.extractors != null ) {
        extractors = datarow.extractors.map ( extractor => {
          return (
            <div id={extractor.id} style={boxStyle} key={extractor.id}>
              <h3>{extractor.name} ( {extractor.status} )</h3>
              Next Due: {extractor.nextDueString}<br/>
              Remaining: {extractor.timeRemaining}ms<br/>
            </div>
          ) 
        })
      }

      let processes = null;
      if ( datarow.processes != null ) {
        processes = datarow.processes.map ( process => {
          return (
            <div id={process.id} style={boxStyle} key={process.id}>
              <h3>{process.name}</h3>
              <ul>
              {
                process.recordCounts.map ( rc => (
                    <li key={rc[0]}>{rc[0]} : {rc[1]}</li>
                  )
                )
              }
              </ul>
            </div>
          )
        })
      }

      return (<Row key={'dr:'+datarow.id} between="xs">
          <Col>
            <div id={datarow.id} style={boxStyle}>
              <h3>{datarow.sourceName} ({datarow.status})</h3>
              enabled: {datarow.enabled ? 'true' : 'false' } <br/>
              Record Count: {datarow.recordCount} <br/>
              Next Due: {datarow.nextDueString} <br/>
              Remaining: {datarow.timeRemaining}ms <br/>
            </div>
          </Col>
          <Col>{extractors}</Col>
          <Col>{processes}</Col>
          <Col></Col>
        </Row>)
    })

    // Collect arrows
    data.processes.forEach ( ds => {
      ds.extractors.forEach ( ext => {
        arrows.push( <Xarrow key={ds.id+':'+ext.id} start={ds.id} end={ext.id} color="green" headSize={3} dashness={animationStyle} /> )
        arrows.push( <Xarrow key={ext.id+':'+ext.target} start={ext.id} end={ext.target} color="green" headSize={3} dashness={animationStyle} /> )
      } )
    })

    
  }
  else {
    console.log("No data...");
  }

  return (
    <div>
      <Button onClick={() => triggerSync(false, false)}>Trigger Sync</Button> &nbsp;
      <Button onClick={() => triggerSync(false, true)}>Trigger Sync (Full Reprocess)</Button> <br/>
      <Grid fluid>
        {grid_rows}
        {arrows}
      </Grid>
    </div>
  );
}

RemoteSyncSummary.propTypes = propTypes;
