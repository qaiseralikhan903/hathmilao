import React from "react";
import Chart from "react-apexcharts";

import { BarStatistics } from "../../services/reporting.service.js";
const shuffle = array => {
  return array.sort(() => Math.random() - 0.5);
};
export default class ColumnChart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      Loading: false,
      series: [
        {
          name: "Count",
          data: [21, 22, 10, 28, 16, 21, 13, 30]
        }
      ],
      options: {
        chart: {
          height: 350,
          type: "bar",
          events: {
            click: function(chart, w, e) {
              // console.log(chart, w, e)
            }
          }
        },
        title: {
          text: "Top 10 Demanding Skills in Job and Interships",
          align: "left",
          style: {
            fontSize: "16px",
            color: "black",
            fontWeight: "900",
            fontFamily: "inherit"
          }
        },
        colors: [
          "#008FFB",
          "#00E396",
          "#FEB019",
          "#FF4560",
          "#775DD0",
          "#546E7A",
          "#26a69a",
          "#D10CE8"
        ],
        plotOptions: {
          bar: {
            columnWidth: "45%",
            distributed: true
          }
        },
        dataLabels: {
          enabled: false
        },
        legend: {
          show: false
        },
        yaxis: {
          labels: {
            formatter: val => val.toFixed(0)
          },
          title: {
            text: "Count",
            style: {
              fontSize: "13px",
              color: "black",
              fontWeight: "900",
              fontFamily: "inherit"
            }
          }
        },
        xaxis: {
          categories: [
            ["John", "Doe"],
            ["Joe", "Smith"],
            ["Jake", "Williams"],
            "Amber",
            ["Peter", "Brown"],
            ["Mary", "Evans"],
            ["David", "Wilson"],
            ["Lily", "Roberts"]
          ],
          labels: {
            style: {
              colors: [
                "#008FFB",
                "#00E396",
                "#FEB019",
                "#FF4560",
                "#775DD0",
                "#546E7A",
                "#26a69a",
                "#D10CE8"
              ],
              fontSize: "12px"
            }
          }
        }
      }
    };
  }

  componentDidMount() {
    BarStatistics().then(response => {
      let categories = [];
      let mydata = [];
      const skills = shuffle(response.data.skills);
      skills.map(s => {
        categories.push(s.skill);
        mydata.push(parseInt(s.count));
      });
      const newSeries = [
        {
          name: this.state.series[0].name,
          data: mydata
        }
      ];

      const newOptions = {
        ...this.state.options,
        xaxis: {
          categories,
          labels: this.state.options.xaxis.labels
        }
      };

      this.setState({
        series: newSeries,
        options: newOptions
      });
    });
  }

  render() {
    return (
      <Chart
        options={this.state.options}
        series={this.state.series}
        type="bar"
        height={350}
      />
    );
  }
}
