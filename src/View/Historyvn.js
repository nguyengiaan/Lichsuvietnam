import React from 'react';
import axios from 'axios';
import ShowHistory from '../Component/ShowHistory';
import '../Style/History.scss';
import { animateScroll as scroll } from 'react-scroll';
class Historyvn extends React.Component {
  state = {
    listCato: [],
    iditem:3,
  };
  async componentDidMount() {
    try {
      let res = await axios.get('https://localhost:44337/api/Catogery');
      this.setState({
        listCato: res && res.data ? res.data : [],
      });
    } catch (error) {
    }
  }
  handleClick = (id) => {
    this.setState(
      {
        iditem:id
      }
   
    )
    scroll.scrollToTop();

  }
  redenhistory=(id)=>{
    this.setState({
      iditem:id
    })
  }
  render() {
    const { listCato } = this.state;
    const uniqueCategories = [...new Set(listCato.map(item => item.namE_CATOGERY))];

    return (
      <div className='main' style={{backgroundColor:"#e9eef6"}}>
        <div className='navRight' >
          {uniqueCategories.map((category, index) => (
            <div key={index} className='tiTle'>
              <p>{category}</p>
              <div className='child'>
                {listCato
                  .filter(item => item.namE_CATOGERY === category)
                  .map((item, subIndex) => (
                  
                  <div className='title1' onClick={()=>{this.handleClick(item.iD_HISTORY)}}>
                      
                     <p key={subIndex}>&#11039; {item.title}</p> 
                
                  </div>
                  ))}
              </div>
            </div>
          ))}
        </div>
          <ShowHistory itemid={this.state.iditem} redenhistor={this.redenhistory}/>
      </div>
    );
  }
}

export default Historyvn;
