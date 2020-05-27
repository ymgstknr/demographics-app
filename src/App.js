import React from 'react';
import Prefecture from 'components/Prefecture';
import Population from 'components/Population';
import 'App.css';
import { API_URL } from 'components/Constants';

const X_API_KEY = process.env.REACT_APP_X_API_KEY;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      prefectures: {},
      populations: []
    }
  }

  render() {
    return (
      <div className="app-area">
        <h1 className="title">人口統計</h1>
        <Prefecture
          prefectures={this.state.prefectures}
          onChange={(e) => this.handleChange(e)}
        />
        <Population 
          populations={this.state.populations}
        />
      </div>
    );
  }

  componentDidMount() {

    const url = API_URL + "prefectures"

    fetch(url, {
        method: "GET",
        headers: {
          "X-API-KEY": X_API_KEY
        }
      })
      .then(res => res.json())
      .then((result) => {
          this.setState({
            prefectures: result.result
          });
        },
        (error) => {
          this.setState({
            error
          });
        }
      )
  }

  handleChange(event) {

    const prefCode = event.target.id;
    const prefName = event.target.value;
    
    if (!event.target.checked) {
      const populations = this.state.populations.filter(population => population['prefCode'] !== prefCode);
      this.setState({
        populations: populations
      });
      return
    }

    const populations = this.state.populations.slice(0);

    const url = API_URL + "population/composition/perYear?cityCode=-&prefCode=" + prefCode;

    fetch(url, {
        method: "GET",
        headers: {
          "X-API-KEY": X_API_KEY
        }
      })
      .then(res => res.json())
      .then((result) => {

          let population = {}

          population.prefCode = prefCode;
          population.prefName = prefName;
          population.data = result.result.data[0].data;

          populations.push(population);

          this.setState({
            populations: populations
          });

        },
        (error) => {
          this.setState({
            error
          });
        }
      );
  }
}
export default App;
