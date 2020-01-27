import React, { Component } from 'react';
import Chart from 'chart.js';


// donut has to be reuseable component, 
/* 
  Need to add this.props.data, this.props.type
*/
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

    

      new Chart(myChartRef, {
        type: 'doughnut',
        data: {
          labels: this.props.datasets.labels,
          datasets: [{
              backgroundColor: this.props.color,
              borderWidth: 0,
            data: this.props.datasets.data,
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
              // need to fix this when data is undefined
              text: this.props.datasets.count,
              color: '#36A2EB', //Default black
              fontStyle: 'Montserrat', //Default Arial
              sidePadding: 50 //Default 20 (as a percentage)
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