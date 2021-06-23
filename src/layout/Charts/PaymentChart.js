import React, { Component } from "react";
import ReactApexChart from "react-apexcharts";


class PaymentChart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      series: this.props.series,
      options: {
        labels: this.props.labels,
        colors:this.props.colors,
        chart: {
          type: 'donut',
          height: 400
        },
      },


    };
  }



  render() {
    return (


      <div id="PaymentChart">
        {this.state.series ? 
        <ReactApexChart options={this.state.options} series={this.state.series} type="donut" height="150"/>
        : <p style={{textAlign: 'center'}} className="p-5">No data available</p> }
      </div>
    );
  }
}

// const domContainer = document.querySelector('#app');
// ReactDOM.render(React.createElement(ApexChart), domContainer);
export default PaymentChart;
