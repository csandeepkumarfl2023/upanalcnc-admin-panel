import React, { Component } from "react";
import ReactApexChart from "react-apexcharts";


class ServiceChart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      series: this.props.series,
      options: {
        labels: this.props.labels,
        legend: {
          show: false
        },
        chart: {
          type: 'donut'
        },
        colors:this.props.colors,
      },


    };
  }



  render() {
    return (


      <div id="ServiceChart">
        {this.state.series ? 
        <ReactApexChart options={this.state.options} series={this.state.series} type="donut"/>
        : <p style={{textAlign: 'center'}} className="p-5">No data available</p> }
      </div>
    );
  }
}

// const domContainer = document.querySelector('#app');
// ReactDOM.render(React.createElement(ApexChart), domContainer);
export default ServiceChart;
