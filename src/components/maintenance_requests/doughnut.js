// https://www.chartjs.org/docs/latest/charts/doughnut.html

import React, { Component } from 'react'
import Chart from 'chart.js'

import { MAINTENANCE_REQUEST_CATEGORY_MAP } from './../../constants'

class Doughnut extends Component {
  constructor(props) {
    super(props)
    this.chartRef = React.createRef()
  }

  componentDidMount() {
    const myChartRef = this.chartRef.current.getContext('2d')
    
    // this is a chart plugin, will move this in the future
    Chart.pluginService.register({
      beforeDraw: function (chart) {
        if (chart.config.options.elements.center) {
          // Get ctx from string
          let ctx = chart.chart.ctx

          // Get options from the center object in options
          let centerConfig = chart.config.options.elements.center
          let fontStyle = centerConfig.fontStyle || 'Arial'
          let txt = centerConfig.text
          let color = centerConfig.color || '#000'
          let sidePadding = centerConfig.sidePadding || 20
          let sidePaddingCalculated = (sidePadding / 100) * (chart.innerRadius * 2)
          // Start with a base font of 30px
          ctx.font = '30px ' + fontStyle

          // Get the width of the string and also the width of the element minus 10 to give it 5px side padding
          let stringWidth = ctx.measureText(txt).width
          let elementWidth = (chart.innerRadius * 2) - sidePaddingCalculated

          // Find out how much the font can grow in width.
          let widthRatio = elementWidth / stringWidth
          let newFontSize = Math.floor(30 * widthRatio)
          let elementHeight = (chart.innerRadius * 2)

          // Pick a new font size so it will not be larger than the height of label.
          let fontSizeToUse = Math.min(newFontSize, elementHeight)

          // Set font settings to draw it correctly.
          ctx.textAlign = 'center'
          ctx.textBaseline = 'middle'
          let centerX = ((chart.chartArea.left + chart.chartArea.right) / 2)
          let centerY = ((chart.chartArea.top + chart.chartArea.bottom) / 2)
          ctx.font = fontSizeToUse + 'px ' + fontStyle
          ctx.fillStyle = color

          // Draw text in center
          ctx.fillText(txt, centerX, centerY)
        }
      }
    })

    // below performs data filtering and logic
    const filteredTickets = this.props.datasets.filter(dataset => dataset.status === this.props.filter)
    
    let ticketCategories = new Map()
    
    filteredTickets.map(ticket => {
      ticketCategories.set(ticket.category, {
        frequency: (ticketCategories.has(ticket.category) ? ticketCategories.get(ticket.category).frequency : 0) + 1, 
        label: MAINTENANCE_REQUEST_CATEGORY_MAP.get(ticket.category).name,
        color: MAINTENANCE_REQUEST_CATEGORY_MAP.get(ticket.category).color
      })
    })

    let categoryFrequencies = [], categoryLabels = [], categoryColors = []
    
    for (let value of ticketCategories.values()) {
      categoryFrequencies.push(value.frequency)
      categoryLabels.push(value.label)
      categoryColors.push(value.color)
    }

    new Chart(myChartRef, {
      type: 'doughnut',
      data: {
        labels: categoryLabels,
        datasets: [{
          backgroundColor: categoryColors,
          borderWidth: 0,
          data: categoryFrequencies,
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
            text: filteredTickets.length,
            color: '#36A2EB', // Default black
            sidePadding: 40 // Default 20 (as a percentage)
          }
        }
      }
    })
  }

  render() {
    return <canvas ref={this.chartRef} />
  }
}

export default Doughnut
