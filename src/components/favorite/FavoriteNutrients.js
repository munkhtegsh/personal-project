import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'underscore';

class FavoriteNutrients extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nutrients: {},
      nutreintList: []
    }
  }

  componentDidMount() {
    let { id } = this.props.match.params;
    this.setState({
      nutrients: this.props.favoriteFoodList[id].total_nutrients
    }, () => {
      this.template();
    })

   
    console.log(this.state.nutrients)
  }

  template = () => {
    let nutreintList = [];
    let obj = Object.assign({}, this.state.nutrients);
    console.log(obj)
    let nutrientNames = ['PROCNT', 'SUGAR', 'SUGAR.added', 'CA', 'CHOCDF', 'CHOLE', 'ENERC_KCAL', 'FAT',
    'FE', 'FIBTG', 'TOCPHA', 'VITA_RAE', 'VITB6A', 'VITB12', 'VITC', 'VITD', 'VITK1'];

      nutrientNames.forEach(item => {
        for(let key in obj) {
        if(item === key) {
          console.log(item)
          let tpl = _.template("<%= label %> <%= quantity %> <%= unit %> ")
          nutreintList.push(tpl({label: obj[key].label, quantity: obj[key].quantity.toFixed(2), unit: obj[key].unit}));
        }
      }
    })

    this.setState({ nutreintList })
  }

  render() {
    console.log(this.state.nutreintList)
    let list = this.state.nutreintList.map((item, i) => {
      return (
        <div key={i}>
          { item }
        </div>
      )
    })

    return (
      <div>
        <div className="nutrients">
        <button onClick={() => this.props.history.goBack()}>x</button>
          <div className="nutrients__p">
            { list }
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    favoriteFoodList: state.favoriteFoodList
  }
}

export default connect(mapStateToProps)(FavoriteNutrients);