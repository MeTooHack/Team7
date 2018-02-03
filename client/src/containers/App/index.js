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
      mediaRecorder: null,
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
  }
  stop() {
    this.recorder.stop();
  }
  onRecordingReady(e) {
    console.log('data', e.data);
    // new Blob([new Uint8Array(someArrayBuffer)])

    const send = (data) => {
       Promise.all([
       createProfile(),
       fetch('/enrollment-mpj.wav').then(r => r.blob())
       ]).then(([ profileId, wav ]) => createEnrollment(profileId, wav)
         .then(() => identify([profileId], new Blob([new Uint8Array(data)])))
         .then((result) => {
           const isMe = result.identifiedProfileId === profileId;
           console.log(result);
         }))
    }



    (new Promise((resolve) => {
      let fileReader = new FileReader();
      fileReader.onloadend = () => {
        resolve(fileReader.result);
      }

      fileReader.readAsArrayBuffer(e.data);
    })).then(arrayBuffer =>
      audioCtx.decodeAudioData(arrayBuffer))
      .then(x => console.log('iam audiobuffer?', send(toWav(x))))


    // const headers = {
    //   "Content-Type": 'video/webm',
    // };
    //
    // fetch('http://localhost:3002', { method: 'POST', body: e.data, headers })
    //   .then((response) => {
    //     console.log(response);
    //   });
  }
  render() {
    return (
      <Wrapper>
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
