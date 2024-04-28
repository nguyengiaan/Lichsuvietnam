import React from 'react';
import '../Style/Next.scss';
import axios from 'axios';

class Next extends React.Component {
  state = {
    listhistory: [],
    history: {},
    indexnext: 1,
    indexprev: 0,
    length: null
  }

  componentDidUpdate(prevProps) {
    if (prevProps.listhistory !== this.props.listhistory) {
      this.setState({
        listhistory: this.props.listhistory,
        length: this.props.listhistory.length
      });
    }

    if (prevProps.history !== this.props.history) {
      this.setState({
        history: this.props.history
      });
    }
  }

  componentDidMount() {
    if (this.props.listhistory) {
      this.setState({
        listhistory: this.props.listhistory,
        history: this.props.history,
        length: this.props.listhistory.length
      });
    }
  }

  nexthis = () => {
    if (this.state.indexnext < this.state.length - 1) {
      let vt = this.state.listhistory[this.state.indexnext + 1];
      this.props.nextbuton(vt.iD_HISTORY);

      this.setState(prevState => ({
          indexnext: prevState.indexnext + 1,
          indexprev: prevState.indexnext + 1
      }));
    }
  }

  prevhis = () => {
    if (this.state.indexprev > 0) {
      let vt = this.state.listhistory[this.state.indexprev - 1];
      this.props.nextbuton(vt.iD_HISTORY);

      this.setState(prevState => ({
          indexprev: prevState.indexprev - 1,
          indexnext: prevState.indexprev - 1
      }));
    }
  }

  check = () => {
    let indexl = this.state.listhistory.map(x => x.title).indexOf(this.props.title)

    if (indexl === 0 && this.state.indexprev === 0) {
      return true
    }
    else {
      return false
    }
  }

  render() {
    return (
      <div className='mainnext'>
        {this.check() ? (
          <>
            <button><span></span></button>
            <h1>{this.props.title}</h1>
            <button onClick={this.nexthis}> <span>Bài sau &rArr;</span></button>
          </>
        ) : (
          <>
            <button onClick={this.prevhis}><span>&lArr; Bài trước </span></button>
            <h1>{this.props.title}</h1>
            <button onClick={this.nexthis}><span>Bài sau &rArr;</span></button>
          </>
        )}
      </div>
    );
  }
}

export default Next;
