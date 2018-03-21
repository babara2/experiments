import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Lightbox from 'react-image-lightbox'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { onClose, movePrev, moveNext } from '../actions/index'

// Lightbox viewer for viewing the photoset retrieved from flickr
class LightboxViewer extends Component {
  render() {
    return (
      <Lightbox
          mainSrc={`https://farm${this.props.data[this.props.index].farm}.staticflickr.com/${this.props.data[this.props.index].server}/${this.props.data[this.props.index].id}_${this.props.data[this.props.index].secret}.jpg` }
          nextSrc={`https://farm${this.props.data[(this.props.index + 1) % this.props.data.length ].farm}.staticflickr.com/${this.props.data[(this.props.index + 1) % this.props.data.length].server}/${this.props.data[(this.props.index + 1) % this.props.data.length].id}_${this.props.data[(this.props.index + 1) % this.props.data.length].secret}.jpg` }
          prevSrc={`https://farm${this.props.data[(this.props.index + this.props.data.length -1) % this.props.data.length ].farm}.staticflickr.com/${this.props.data[(this.props.index + this.props.data.length -1) % this.props.data.length ].server}/${this.props.data[(this.props.index + this.props.data.length -1) % this.props.data.length ].id}_${this.props.data[(this.props.index + this.props.data.length -1) % this.props.data.length ].secret}.jpg` }
          imageTitle = {this.props.data[this.props.index].title}
          onCloseRequest={() => this.props.onClose()}
          onMovePrevRequest={() => this.props.movePrev(this.props.index, this.props.data.length)}
          onMoveNextRequest={() => this.props.moveNext(this.props.index, this.props.data.length)}
        />      
    );
  }
}

// Validating the types of props
LightboxViewer.propTypes = {
  data: PropTypes.array.isRequired,
  index: PropTypes.number,
  onClose: PropTypes.func.isRequired,
  movePrev: PropTypes.func.isRequired,
  moveNext: PropTypes.func.isRequired
}

// Get apps state and pass it as props to LightboxViewer
function mapStateToProps(state) {
    return {
        index: state.stateInfo.index,
        data: state.stateInfo.data
    };
}

// Get actions and pass them as props
function matchDispatchToProps(dispatch){
    return bindActionCreators({
    	onClose: onClose,
    	movePrev: movePrev,
    	moveNext: moveNext
    }, dispatch);
}

// Connecting LightboxViewer to the store and actions
export default connect(mapStateToProps, matchDispatchToProps)(LightboxViewer)
