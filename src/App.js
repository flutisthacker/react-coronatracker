import React, { Component } from "react";
import "./styles.css";
// import Counter from "./Counter.js";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      covidCases: null,
      IndiaConfirm: null,
      IndiaRecover: null,
      IndiaActive: null,
      IndiaDeath: null,
      IndiaDailyConfirm: null,
      IndiaDailyRecover: null,
      IndiaDailyDeath: null
    };
  }
  componentDidMount() {
    fetch("https://api.covid19india.org/data.json")
      .then((res) => res.json())
      .then((data) => {
        this.setState({ covidCases: data, loading: false });
        console.log(data);
        this.state.covidCases.statewise.map((covid) =>
          covid.statecode === "TT"
            ? this.setState({
                IndiaConfirm: covid.confirmed,
                IndiaRecover: covid.recovered,
                IndiaActive: covid.active,
                IndiaDeath: covid.deaths,
                IndiaDailyConfirm: covid.deltaconfirmed,
                IndiaDailyRecover: covid.deltarecovered,
                IndiaDailyDeath: covid.deltadeaths
              })
            : null
        );
      })
      .catch(console.log);
  }
  render() {
    return (
      <div className="container pt-5">
        <h1 className="text-center mb-3 text-white">
          Coronavirus Live Tracker
        </h1>
        <div className="d-flex justify-content-center flex-wrap">
          <div className="col-6 m-1">
            <div className="card-body h-100 text-center Confirmed">
              <p className="mb-0 text-white">
                <strong>{this.state.IndiaConfirm}</strong>(
                {this.state.IndiaDailyConfirm}
                {" New cases today"})<br /> Confirmed{" "}
              </p>
            </div>
          </div>
          <div className="col-6 m-1">
            <div className="card-body h-100 text-center Active">
              <p className="text-white mb-0">
                <strong>{this.state.IndiaActive}</strong> Active{""}
              </p>
            </div>
          </div>

          <div className="col-6 m-1">
            <div className="card-body h-100 text-center Recovered">
              <p className="text-white mb-0">
                <strong>{this.state.IndiaRecover}</strong> (Active
                {this.state.IndiaDailyRecover}
                {" New Caes today"}) <br /> Recovered{" "}
              </p>
            </div>
          </div>

          <div className="col-6 m-1">
            <div className="card-body h-100 text-center Deceased">
              <p className="text-white mb-0">
                <strong>{this.state.IndiaDeath}</strong>
                (Deceased
                {this.state.IndiaDailyDeath}
                {" New Caes today"}) <br />
                Deceased{""}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
//
export default App;
