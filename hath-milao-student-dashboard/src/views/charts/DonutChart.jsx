import React from "react";
import Chart from "react-apexcharts";

import { FieldBarStatistics } from "../../services/reporting.service.js";

const shuffle = array => {
  return array.sort(() => Math.random() - 0.5);
};

export default class DonutChart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      series: [44, 55, 41, 17, 15],
      options: {
        chart: {
          type: "donut",
          dropShadow: {
            enabled: true,
            color: "#111",
            top: -1,
            left: 3,
            blur: 3,
            opacity: 0.2
          }
        },
        stroke: {
          width: 0
        },
        plotOptions: {
          pie: {
            donut: {
              labels: {
                show: true,
                total: {
                  showAlways: true,
                  show: true
                }
              }
            }
          }
        },
        labels: [],
        dataLabels: {
          dropShadow: {
            blur: 3,
            opacity: 0.8
          }
        },
        fill: {
          type: "pattern",
          opacity: 1,
          pattern: {
            enabled: true,
            style: [
              "verticalLines",
              "squares",
              "horizontalLines",
              "circles",
              "slantedLines"
            ]
          }
        },
        states: {
          hover: {
            enabled: false
          }
        },
        theme: {
          palette: "palette1"
        }
      }
    };
  }

  componentDidMount() {
    FieldBarStatistics().then(response => {
      let labels = [];
      let mydata = [];
      const fields = shuffle(response.data.fields);
      fields.map(f => {
        labels.push(f.field);
        mydata.push(parseInt(f.count));
      });

      const newOptions = {
        ...this.state.options,
        labels: labels
      };

      this.setState({
        series: mydata,
        options: newOptions
      });
    });
  }

  render() {
    return (
      <Chart
        options={this.state.options}
        series={this.state.series}
        type="donut"
      />
    );
  }
}
