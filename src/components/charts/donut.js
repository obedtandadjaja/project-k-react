// TODO(@kenaszogara): Add props.data, props.type to make class a reusable component

import React, { Component } from 'react';
import Chart from 'chart.js';

import { MAINTENANCE_REQUEST_CATEGORY_MAP } from './../../constants'

class Donut extends Component {
  constructor(props) {
    super(props);
    this.chartRef = React.createRef();
  }

  componentDidMount() {
    const myChartRef = this.chartRef.current.getContext("2d");
    
    // this is a chart plugin, will move this in the future
    Chart.pluginService.register({
      beforeDraw: function (chart) {
        if (chart.config.options.elements.center) {
          //Get ctx from string
          var ctx = chart.chart.ctx;

          //Get options from the center object in options
          var centerConfig = chart.config.options.elements.center;
          var fontStyle = centerConfig.fontStyle || 'Arial';
          var txt = centerConfig.text;
          var color = centerConfig.color || '#000';
          var sidePadding = centerConfig.sidePadding || 20;
          var sidePaddingCalculated = (sidePadding / 100) * (chart.innerRadius * 2)
          //Start with a base font of 30px
          ctx.font = "30px " + fontStyle;

          //Get the width of the string and also the width of the element minus 10 to give it 5px side padding
          var stringWidth = ctx.measureText(txt).width;
          var elementWidth = (chart.innerRadius * 2) - sidePaddingCalculated;

          // Find out how much the font can grow in width.
          var widthRatio = elementWidth / stringWidth;
          var newFontSize = Math.floor(30 * widthRatio);
          var elementHeight = (chart.innerRadius * 2);

          // Pick a new font size so it will not be larger than the height of label.
          var fontSizeToUse = Math.min(newFontSize, elementHeight);

          //Set font settings to draw it correctly.
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          var centerX = ((chart.chartArea.left + chart.chartArea.right) / 2);
          var centerY = ((chart.chartArea.top + chart.chartArea.bottom) / 2);
          ctx.font = fontSizeToUse + "px " + fontStyle;
          ctx.fillStyle = color;

          //Draw text in center
          ctx.fillText(txt, centerX, centerY);
        }
      }
    });

    const ticket = this.props.datasets.filter(it => it.status.includes(this.props.filter))
    
    const ticketFrequency = ticket.reduce((req, it) => {
      req[it.title] = req[it.title] + 1 || 1;
      return req;
    }, {});

    const colors = [] 
    const labels = []

    Object.keys(ticketFrequency).map( label => {
      colors.push(MAINTENANCE_REQUEST_CATEGORY_MAP.get(label).color)
      labels.push(MAINTENANCE_REQUEST_CATEGORY_MAP.get(label).name)
    })
    
    new Chart(myChartRef, {
      type: 'doughnut',
      data: {
        labels: labels,
        datasets: [{
          backgroundColor: colors,
          borderWidth: 0,
          data: Object.values(ticketFrequency),
        }]
      },
      options: { 
        legend: {
          display: false,
        },
        cutoutPercentage: 80,
        aspectRatio: 1,
        maintainAspectRatio: true,
        responsive: false,
        elements: { 
          center: { 
            text: Object.keys(ticketFrequency).length,
            color: '#36A2EB', //Default black
            fontStyle: 'Montserrat', //Default Arial
            sidePadding: 20 //Default 20 (as a percentage)
          }
        }
      }
    });
  }

  render() {
    return <canvas ref={this.chartRef} />;
  }
}

export default Donut;
