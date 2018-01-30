import React, { Component } from 'react';
import Icon from '../components/Icon';
import logo from '../assets/logo.svg';
import styled from 'styled-components';

const Wrapper = styled.div`
  text-align: center;
`;

const Header = styled.header`
  background-color: #222;
  height: 150px;
  padding: 20px;
  color: white;
`;

const Logo = styled.img`
  animation: App-logo-spin infinite 20s linear;
  height: 80px;
`;

const Title = styled.h1`
  font-size: 1.5em;
`;

const Intro = styled.p`
  font-size: large;
`;




class App extends Component {
  render() {
    return (
      <Wrapper>
        <Header>
          <Logo src={logo} className="App-logo" alt="logo" />
          <Title className="App-title">Welcome to React</Title>
        </Header>
        <Intro className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </Intro>
        <Icon />
        <Icon />
        <Icon />
        <Icon />
        <Icon />
        <Icon />
        <Icon />
      </Wrapper>
    );
  }
}

export default App;
