import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Button } from 'semantic-ui-react'
import PidSubmitForm from './PidSubmitForm'
import LightboxViewer from './LightboxViewer'
import { openLightbox } from '../actions/index'
import '../css/App.css'

// Main App that is rendered on the browser
class App extends Component {
  render() {
    return (
      <div className="App">
        <PidSubmitForm />
        {this.props.error && 
          <div className="errorDiv">{this.props.error}</div>}
        {this.props.toggled && < LightboxViewer />}
        {this.props.visited && 
          <Button onClick={this.props.openLightbox}
           className="lightboxButton">Reopen Lightbox</Button>}
      </div>
    )
  }
}

// Validating types of props
App.propTypes = {
  toggled: PropTypes.bool,
  visited: PropTypes.bool
}

// Get apps state and pass it as props to UserList
function mapStateToProps(state) {
    return {
        toggled: state.stateInfo.toggled,
        visited: state.stateInfo.visited,
        error: state.stateInfo.error
    };
}

// Get actions and pass them as props to to UserList
function matchDispatchToProps(dispatch){
    return bindActionCreators({
      openLightbox: openLightbox
    }, dispatch);
}

// Connecting the store and the App component, and exporting it
export default connect(mapStateToProps, matchDispatchToProps)(App)
