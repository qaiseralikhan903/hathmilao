import React from "react";
import Chart from "react-apexcharts";

import { FieldBarStatistics } from "../../services/reporting.service.js";

const shuffle = array => {
  return array.sort(() => Math.random() - 0.5);
};

export default class FieldColumn extends React.Component {
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
          text: "Top Demanding Fields in Job and Interships",
          align: "left",
          style: {
            fontSize: "16px",
            color: "black",
            fontWeight: "900",
            fontFamily: "inherit"
          }
        },
        colors: [
          "#546E7A",
          "#FEB019",
          "#FF4560",
          "#26a69a",
          "#D19CE8",
          "#008FFB",
          "#F9D423",
          "#00E396",
          "#775DD0"
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
                "#546E7A",
                "#FEB019",
                "#FF4560",
                "#26a69a",
                "#D19CE8",
                "#008FFB",
                "#F9D423",
                "#00E396",
                "#775DD0"
              ],
              fontSize: "12px"
            }
          }
        }
      }
    };
  }

  componentDidMount() {
    FieldBarStatistics().then(response => {
      let categories = [];
      let mydata = [];
      const fields = shuffle(response.data.fields);
      fields.map(f => {
        categories.push(f.field);
        mydata.push(parseInt(f.count));
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
