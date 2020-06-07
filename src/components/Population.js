import React from 'react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';
import 'scss/Population.scss';

class Population extends React.Component {

    render() {
        let plots = [];
        let lines = [];

        for (var i = 0; i < this.props.populations.length; i++) {
            let populations = this.props.populations[i].data;
            let prefCode = this.props.populations[i].prefCode;
            let prefName = this.props.populations[i].prefName;

            lines.push(
                <Line key={prefCode} name={prefName} type="monotone" dataKey={prefCode} stroke="#8884d8" />
            )

            for (var j = 0; j < populations.length; j++) {

                if (i === 0) {
                    let plot = {};
                    plot.year = populations[j].year;
                    plot[prefCode] = populations[j].value;
                    plots.push(plot);
                    continue;
                }

                plots[j][prefCode] = populations[j].value;
            }
        }

        return (
            <div className="population-area">
                <LineChart width={700} height={500} margin={{ top: 5, right: 30, left: 30, bottom: 5 }} data={plots}>
                    <XAxis dataKey="year"/>
                    <YAxis/>
                    <Tooltip />
                    <CartesianGrid stroke="#eee" strokeDasharray="5 5"/>
                    {lines}
                </LineChart>
            </div>
        )
    }
}
export default Population;
