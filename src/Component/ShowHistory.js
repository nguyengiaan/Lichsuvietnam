import React from 'react';
import '../Style/ShowHistory.scss';
import Next from './Next';
import axios from 'axios';
import ReactHtmlParser from 'react-html-parser';
class ShowHistory extends React.Component {
  state = {
    history: {},
    id: 66,
    listhistory:[],
  }
  async componentDidMount() {
    try {
      this.setState({
        id:this.props.itemid,
      })
      let res = await axios.get(`https://localhost:44337/api/Historys/baivietlichsu?id=${this.props.itemid}`);
      let res1=await axios.get('https://localhost:44337/api/Historys');
      console.log("res >>",res);
      this.setState({
        history: res && res.data ? res.data : {},
        listhistory:res1 && res1.data ? res1.data :[]
      });
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }
  async fetchData() {
    try {
        let res = await axios.get(`https://localhost:44337/api/Historys/baivietlichsu?id=${this.props.itemid}`);
        let res1 = await axios.get('https://localhost:44337/api/Historys');
        this.setState({
            id: this.props.itemid,
            history: res && res.data ? res.data : {},
            listhistory: res1 && res1.data ? res1.data : []
        });
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

  async componentDidUpdate(prevProps) {

    if (prevProps.itemid !== this.props.itemid) {
      this.fetchData()
    }
  }
  nextbuton=(iditem)=>{
    this.props.redenhistor(iditem)
  }
  render() {
    const { history } = this.state;
    return (
      <div className='maincontent'>
      <Next history={this.state.history} listhistory={this.state.listhistory} nextbuton={this.nextbuton} title={history.title}/>
        <div className='content'>
          <p>{ReactHtmlParser(history.content)}</p>
        </div>
        <Next history={this.state.history} listhistory={this.state.listhistory} nextbuton={this.nextbuton} title={history.title}/>
      </div>
    );
  }
}

export default ShowHistory;
