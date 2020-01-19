import React, { Component } from 'react';


class Ripple extends Component {
  initializeState = () => {
    return {
      spanStyles: {},
      count: 0
    }
  }
  state = this.initializeState();


  // render ripple in span on mouse down
  renderRippleSpan = () => {
    const { showRipple = false, spanStyles = {} } = this.state;
    const spanArray = Object.keys(spanStyles);
    if (spanArray && spanArray.length > 0) {
      return (
        spanArray.map((key, index) => {
          return <span key={'spanCount_' + index} className="" style={{ ...spanStyles[key] }}></span>
        })
      )
    } else {
      return null;
    }
  }

  showRipple = (e) => {
    const rippleContainer = e.currentTarget;
    const size = rippleContainer.offsetWidth;
    const pos = rippleContainer.getBoundingClientRect();
    const x = e.pageX - (pos.x + window.pageXOffset) - (size / 2);
    const y = e.pageY - (pos.y + window.pageYOffset) - (size / 2);

    const spanStyles = { top: y + 'px', left: x + 'px', height: size + 'px', width: size + 'px' };
    const count = this.state.count + 1;
    this.setState({
      spanStyles: { ...this.state.spanStyles, [count]: spanStyles },
      count: count
    });
  }

  // clean ripple in span
  callCleanUp = (cleanup, delay) => {
    return function () {
      setTimeout(() => {
        cleanup();
      }, delay);
    }
  }

  cleanUp = () => {
    const initialState = this.initializeState();
    this.setState({ ...initialState });
  }

  render() {
    const { children = null, classes = "", onClickHandler = null } = this.props;
    return (
      <div ref="targetElement" className={'ripple ' + classes} onClick={onClickHandler}>
        {children}
        <div className="rippleContainer" onMouseDown={this.showRipple} onMouseUp={this.callCleanUp(this.cleanUp, 1000)}>
          {this.renderRippleSpan()}
        </div>
      </div>
    );
  }
}


export default Ripple;
