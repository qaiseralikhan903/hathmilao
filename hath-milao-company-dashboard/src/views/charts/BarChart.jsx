import React from "react";
import Chart from "react-apexcharts";

export default class BarChart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      series: [
        {
          name: "HTML",
          data: [44, 55, 57, 56, 61, 58, 63, 60, 66]
        },
        {
          name: "CSS",
          data: [76, 85, 101, 98, 87, 105, 91, 114, 94]
        },
        {
          name: "Javascript",
          data: [35, 41, 36, 26, 45, 48, 52, 53, 41]
        }
      ],
      options: {
        chart: {
          type: "bar",
          height: 400
        },
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: "60%",
            endingShape: "rounded"
          }
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          show: true,
          width: 2,
          colors: ["transparent"]
        },
        xaxis: {
          categories: [
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct"
          ]
        },
        yaxis: {
          title: {
            text: "Count"
          }
        },
        fill: {
          opacity: 1
        },
        tooltip: {
          y: {
            formatter: function(val) {
              return val + "Count";
            }
          }
        }
      }
    };
  }

  render() {
    return (
      <Chart
        options={this.state.options}
        series={this.state.series}
        type="bar"
        height={450}
        id="barchart1"
      />
    );
  }
}
