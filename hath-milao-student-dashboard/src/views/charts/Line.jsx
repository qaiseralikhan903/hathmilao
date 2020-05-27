import React from "react";
import Chart from "react-apexcharts";

export default class GradientLine extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      series: [
        {
          name: "Applied Jobs",
          data: [4, 3, 10, 9, 29, 19, 22, 9, 12, 7, 19, 5]
        }
      ],
      options: {
        chart: {
          height: 350,
          type: "line",
          zoom: {
            enabled: true
          },
          shadow: {
            enabled: false,
            color: "#bbb",
            top: 3,
            left: 2,
            blur: 3,
            opacity: 1
          }
        },
        stroke: {
          width: 7,
          curve: "smooth"
        },
        xaxis: {
          type: "string",
          categories: [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec"
          ],
          title: {
            text: "Month of 2020",
            style: {
              fontSize: "13px",
              color: "black",
              fontWeight: "900",
              fontFamily: "inherit"
            }
          }
        },
        title: {
          text: "Applied Jobs and Internhsips",
          align: "left",
          style: {
            fontSize: "16px",
            color: "black",
            fontWeight: "900",
            fontFamily: "inherit"
          }
        },
        fill: {
          type: "gradient",
          gradient: {
            shade: "dark",
            gradientToColors: ["#F9CE1D"],
            shadeIntensity: 1,
            type: "horizontal",
            opacityFrom: 1,
            opacityTo: 1,
            stops: [0, 100, 100, 100]
          }
        },
        markers: {
          size: 4,
          opacity: 0.9,
          colors: ["#FFA41B"],
          strokeColor: "#fff",
          strokeWidth: 2,
          hover: {
            size: 7
          }
        },
        theme: {
          mode: "light",
          palette: "palette5"
        },
        yaxis: {
          min: 0,
          max: 30,
          title: {
            text: "Total Jobs and Internships",
            style: {
              fontSize: "13px",
              color: "black",
              fontWeight: "900",

              fontFamily: "inherit"
            }
          }
        }
      }
    };
  }

  render() {
    return (
      <React.Fragment>
        <Chart
          options={this.state.options}
          series={this.state.series}
          type="line"
          height={400}
        />
      </React.Fragment>
    );
  }
}
