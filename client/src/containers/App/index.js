import React, { Component } from 'react';
import {connect} from 'react-redux';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import toWav from 'audiobuffer-to-wav';
import { createEnrollment, createProfile, identify } from './speech';

var audioCtx = new AudioContext();

const Wrapper = styled.div`
  text-align: center;
`;

class App extends Component {
  constructor(props) {
    super(props);
    this.start = this.start.bind(this);
    this.stop = this.stop.bind(this);
    this.onRecordingReady = this.onRecordingReady.bind(this);

    this.state = {
      isRecording: false,
      mattias: false,
    };

    // get audio stream from user's mic
    navigator.mediaDevices.getUserMedia({
      audio: true
    }).then((stream) => {
      this.recorder = new MediaRecorder(stream);
      this.recorder.addEventListener('dataavailable', this.onRecordingReady);
    });
  }
  start() {
    this.recorder.start();
    this.setState({isRecording: true})
  }
  stop() {
    this.recorder.stop();
    this.setState({isRecording: false})
  }
  onRecordingReady(e) {
    const send = (data) => {
      this.setState({
        isLoading: true,
        mattias: false
      })
       Promise.all([
       createProfile(),
       fetch('/enrollment-mpj.wav').then(r => r.blob())
       ]).then(([ profileId, wav ]) => createEnrollment(profileId, wav)
         .then(() => identify([profileId], new Blob([new Uint8Array(data)])))
         .then((result) => {
           this.setState({
             isLoading: false
           })
           const isMe = result.identifiedProfileId === profileId;
           if (isMe) this.setState({mattias: true});
           if (!isMe) this.setState({mattias: false});

           console.log(result);
         }))
    };



    (new Promise((resolve) => {
      let fileReader = new FileReader();
      fileReader.onloadend = () => {
        resolve(fileReader.result);
      };

      fileReader.readAsArrayBuffer(e.data);
    })).then(arrayBuffer =>
      audioCtx.decodeAudioData(arrayBuffer))
      .then(x => console.log('iam audiobuffer?', send(toWav(x))))
  }
  render() {
    return (
      <Wrapper>
        <div style={{height: '200px', width: '200px', margin: '0 auto', backgroundColor: this.state.isRecording ? 'red' : 'white', borderRadius: '50%' }} />
        {this.state.isLoading && <h1>PROCESSING....</h1>}
        {this.state.mattias === true && <h1>hello mattias</h1>  }
        <button onClick={this.start}>start</button>
        <button onClick={this.stop}>stop</button>
      </Wrapper>
    );
  }
}

App.propTypes = {
  dog: PropTypes.bool.isRequired,
  cat: PropTypes.bool.isRequired,
};

const mapStateToProps = ({containers: { appReducer: state }}) => ({
  dog: state.dog,
  cat: state.cat,
});

export default connect(mapStateToProps, () => ({}))(App);
