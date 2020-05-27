import React from 'react';
import 'scss/Prefecture.scss';
class Prefecture extends React.Component {

  render() {
    const prefectures = [];
    for (var i = 0; i < this.props.prefectures.length; i++) {
      prefectures.push(
        <label className="prefecture-label"key={this.props.prefectures[i].prefCode}>
          <input 
            type="checkbox" 
            className="prefecture-checkbox" 
            id={this.props.prefectures[i].prefCode}
            value={this.props.prefectures[i].prefName}
            onChange={(e) => this.props.onChange(e)}
          />
        {this.props.prefectures[i].prefName}
        </label>
      );
    }

    return (
      <div className="prefecture-area">
      {prefectures}
      </div>
    );
  }
}

export default Prefecture;