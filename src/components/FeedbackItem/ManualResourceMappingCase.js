import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useOkapiKy } from '@folio/stripes/core';
import Registry from '../../Registry';
import {
  Button
} from '@folio/stripes/components';


const propTypes = {
  resource: PropTypes.object,
  question: PropTypes.object,
  answer: PropTypes.object
};


export default function ManualResourceMappingCase({resource, question, answer}:props) {

  const [answerData, setAnswerData] = useState(JSON.parse(resource.response));
 
  const ky = useOkapiKy();

  const selectAnswerType = (answerType) => {
    // answerData.answerType=answerType;
    console.log("select answer type answerData is now",answerData);
    setAnswerData(prevState => ({...prevState, answerType: answerType }));
  }

  const setMappedResource = (mappedResource) => {
    setAnswerData(prevState => ({...prevState, mappedResource: mappedResource }));
  }

  console.log("Answer: %o",answerData);

  const saveFeedback = (event) => {
    console.log("Save feedback %o",answerData);
    event.preventDefault()

    let feedback_response = {
      id: resource.id,
      status: 1,
      response: JSON.stringify(answerData)
    }

    console.log("post to /remote-sync/feedback values %o",feedback_response);

    // We need to post to /remote-sync/feedback/{id}
    // JSON: { id:{id},
    //         response: stringified-answer }
    let post_feedback_request = async (data_to_send) => {
      console.log("Post %o",data_to_send);
      const json = await ky.put('remote-sync/feedback/'+resource.id, {json: data_to_send}).json();
      return json
    }
    post_feedback_request(feedback_response).then(console.log)
  }

  const onResourceSelected = (r) => {
    console.log("resource selected: %o",r);
    // Man this is fugly. We stash the whole resource because the link license plugin needs the whole representation
    
    setMappedResource(r);
  }

  const registry_entry = Registry.getResource('license');
  const LookupComponent = registry_entry ? registry_entry.getLookupComponent() : null;

  console.log("Registry entry: %o, lookup_component: %o",registry_entry,LookupComponent);

  return (
    <div>
      <h2>Map a remote resource</h2>
      <p>{question.prompt}</p>
      <form>
        <table width="100%" style={{border: "1px solid black"}}>
          <thead>
            <tr>
              <td align="center">Map Existing<br/> <input type="radio" 
                                                          name="answer" 
                                                          value="map"    
                                                          onClick={() => selectAnswerType('map')} 
                                                          checked={answerData.answerType === "map"}/>
              </td>
              <td align="center">Create<br/>       <input type="radio" 
                                                          name="answer" 
                                                          value="create" 
                                                          onClick={() => selectAnswerType('create')}
                                                          checked={answerData.answerType === "create"}/>
              </td>
              <td align="center">Ignore<br/>       <input type="radio" 
                                                          name="answer" 
                                                          value="ignore" 
                                                          onClick={() => selectAnswerType('ignore')}
                                                          checked={answerData.answerType === "ignore"}/>
              </td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan="3">
                { answerData.answerType=='map' && (
                  <div>
                      <LookupComponent input={{name:'ResourceLookup', value:answerData.mappedResource}} onResourceSelected={onResourceSelected} resource={answerData.mappedResource} />
                  </div> 
                ) }
                { answerData.answerType=='create' && <p>A new FOLIO resource will be created for this item</p> }
                { answerData.answerType=='ignore' && <p>This item will be ignored indefinitely</p> }
              </td>
            </tr>
          </tbody>
        </table>
        <br/>
        <Button type="submit" onClick={saveFeedback} >Save Feedback</Button>
      </form>
    </div>
  );
}

ManualResourceMappingCase.propTypes = propTypes;
