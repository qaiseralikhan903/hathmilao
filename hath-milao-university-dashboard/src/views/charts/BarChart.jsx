import React from "react";
import Chart from "react-apexcharts";

import { BoxStatistics } from "../../services/reporting.service";
import { Spin } from "antd";

export default class BarChart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      Loading: false,
      series: [
        {
          name: "Count",
          data: [21, 22, 10, 28]
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
          text: "Over All Statictics",
          align: "left",
          style: {
            fontSize: "16px",
            color: "black",
            fontWeight: "900",
            fontFamily: "inherit"
          }
        },
        colors: ["#546E7A", "#FEB019", "#FF4560", "#26a69a"],
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
          categories: ["On-Job", "Jobless", "Total Events", "Job Fair"],
          labels: {
            style: {
              colors: ["#546E7A", "#FEB019", "#FF4560", "#26a69a"],
              fontSize: "12px"
            }
          }
        }
      }
    };
  }

  componentDidMount() {
    BoxStatistics().then(response => {
      const {
        TotalJobless,
        TotalOnJob,
        TotalEvents,
        TotalJobFair
      } = response.data;
      let mydata = [TotalOnJob, TotalJobless, TotalEvents, TotalJobFair];

      const newSeries = [
        {
          name: this.state.series[0].name,
          data: mydata
        }
      ];

      this.setState({
        series: newSeries,
        Loading: true
      });
    });
  }
  render() {
    return (
      <React.Fragment>
        {this.state.Loading ? (
          <React.Fragment>
            <Chart
              options={this.state.options}
              series={this.state.series}
              type="bar"
              height={450}
              id="barchart1"
            />
          </React.Fragment>
        ) : (
          <React.Fragment>
            <div
              style={{
                textAlign: "center",
                paddingTop: "20px",
                paddingBottom: "20px"
              }}
            >
              <Spin tip="Loading Bar Chart..." size="large" />
            </div>
          </React.Fragment>
        )}
      </React.Fragment>
    );
  }
}
