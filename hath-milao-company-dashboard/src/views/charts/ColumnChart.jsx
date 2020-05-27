import React from "react";
import Chart from "react-apexcharts";

import { BoxStatistics } from "../../services/reporting.service";
import { Spin } from "antd";

export default class ColumnChart extends React.Component {
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
        colors: ["#546E7A", "#FEB019", "#FF4560", "#26a69a", "#fb6340"],
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
            "Total Events",
            "Total Challenges",
            "Total FYPS",
            "Total Jobs",
            "Total Followers"
          ],
          labels: {
            style: {
              colors: ["#546E7A", "#FEB019", "#FF4560", "#26a69a", "#fb6340 "],
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
        TotalJobs,
        TotalEvents,
        TotalChallenges,
        Totalfyps,
        TotalFollowers
      } = response.data;
      let mydata = [
        TotalEvents,
        TotalChallenges,
        Totalfyps,
        TotalJobs,
        TotalFollowers
      ];

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
