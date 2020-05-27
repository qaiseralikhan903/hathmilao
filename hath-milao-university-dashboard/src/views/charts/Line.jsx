import React from "react";
import Chart from "react-apexcharts";

// Services
import { LineStatistics } from "../../services/reporting.service";
import { Row, FormGroup, Label, Input, Form, Col } from "reactstrap";
import { Spin } from "antd";

export default class GradientLine extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      year: new Date().getFullYear(),
      allYears: null,
      Loading: false,
      eventData: null,
      series: [
        {
          name: "Added Events",
          data: [
            null,
            null,
            2,
            4,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null
          ]
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
          curve: "straight"
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
          text: "Added Events",
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
            gradientToColors: ["#92dff3"],
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
          max: 10,
          title: {
            text: "Number of Events",
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

    LineStatistics().then(reponse => {
      let years = Array.from(
        new Set(reponse.data.events.map(event => event._id.year))
      );
      this.setState({
        allYears: years,
        eventData: reponse.data.events,
        Loading: true
      });
    });
  }

  componentDidMount() {
    LineStatistics().then(response => {
      let years = Array.from(
        new Set(response.data.events.map(event => event._id.year))
      );
      let mydata = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      let new_data = response.data.events.filter(event => {
        return event._id.year == new Date().getFullYear();
      });

      new_data.map(event => {
        mydata[event._id.month] = event.count;
      });

      const newSeries = [
        {
          name: this.state.series[0].name,
          data: mydata
        }
      ];

      this.setState({
        series: newSeries
      });
      this.setState({
        allYears: years,
        eventData: response.data.events,
        Loading: true
      });
    });
  }

  // To Handle Form Input
  handleInputChange = event => {
    const { value } = event.target;
    let { eventData } = this.state;
    let mydata = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    let new_data = eventData.filter(event => {
      return event._id.year == value;
    });

    new_data.map(event => {
      mydata[event._id.month] = event.count;
    });

    const newSeries = [
      {
        name: this.state.series[0].name,
        data: mydata
      }
    ];

    this.setState({
      series: newSeries
    });
  };

  render() {
    return (
      <React.Fragment>
        {this.state.Loading ? (
          <React.Fragment>
            {this.state.allYears.length > 0 ? (
              <Form>
                <Row>
                  <Col md="4">
                    <FormGroup>
                      <Label>
                        <h3>Select Year:</h3>
                      </Label>
                      <Input
                        type="select"
                        name="year"
                        onChange={this.handleInputChange}
                      >
                        {this.state.allYears.map((year, index) => (
                          <option value={year} key={index}>
                            {year}
                          </option>
                        ))}
                      </Input>
                    </FormGroup>
                  </Col>
                </Row>
              </Form>
            ) : null}

            <Chart
              options={this.state.options}
              series={this.state.series}
              type="line"
              height={400}
              ref={e => (this.chart = e)}
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
              <Spin tip="Loading Line Chart..." size="large" />
            </div>
          </React.Fragment>
        )}
      </React.Fragment>
    );
  }
}
