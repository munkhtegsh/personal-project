import React, { Component } from 'react';
import axios from 'axios';
import Nodata from '../item/Nodata';
import { connect } from 'react-redux';
import { getWeeklyItems } from '../../ducks/reducer';
import { Link } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import DeleteForever from 'material-ui/svg-icons/action/delete-forever';

class Weekly extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  deleteItem = (id) => {
    axios.delete(`/api/weekly/${id}`);
    this.props.getWeeklyItems();  // do I need to call redux or axios.post?
  }

  render() {
    let list = this.props.weeklyFoodList.map((item, i) => {
      return (
        <div>
            <div className="weekly__item">
              <Link key={i} to={`/daily/${item.day}`}>
                <img src={item.food_img}
                  className="weekly__img" 
                  alt=""
                />
              </Link>

              <div className="weekly__food-name">
                <DeleteForever onClick={() => this.deleteItem(item.id)} className="weekly__delete" />
                <Link key={i} to={`/daily/${item.day}`}> {/* why can't put 2 links? */}
                  <p className="weekly__p"> {item.day}. {item.food_name}</p>
                  <p className="weekly__calories">calories: {item.calories}</p>
                </Link>
              </div> 

            </div>
        </div>
      )
    });

    return (
      <MuiThemeProvider>
        <div className='weekly'>
          { list }
        </div>
      </MuiThemeProvider>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    weeklyFoodList: state.weeklyFoodList
  }
}

export default connect(mapStateToProps, { getWeeklyItems })(Weekly);


// { this.props.weeklyFoodList }
// ?
//   { list }
// :
//   <Nodata/>


// <p>Calories: {item.calories}</p>


// <div key={i}>
// <p className='ingredients__p'>- { item.text }   Weight: { item.weight }</p>
// </div>

