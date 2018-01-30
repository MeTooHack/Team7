import React, { Component } from 'react';
import {connect} from 'react-redux';
import Icon from '../../components/Icon/index';
import logo from '../../assets/logo.svg';
import styled from 'styled-components';
import PropTypes from 'prop-types';

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
    const {
      dog,
      cat,
    } = this.props;

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
        {dog && 'dog'}
        {cat && 'cat'}
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
