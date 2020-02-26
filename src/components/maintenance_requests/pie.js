// https://www.chartjs.org/docs/latest/charts/doughnut.html

import React, { Component } from 'react'
import Chart from 'chart.js'

import { MAINTENANCE_REQUEST_CATEGORY_MAP } from './../../constants'

class Pie extends Component {
  constructor(props) {
    super(props)
    this.chartRef = React.createRef()
  }

  componentDidMount() {
    const myChartRef = this.chartRef.current.getContext('2d')

    // below performs data insertion to pie chart
    let ticketCategories = new Map()
    
    this.props.datasets.map(ticket => {
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
      type: 'pie',
      data: {
        labels: categoryLabels,
        datasets: [{
          backgroundColor: categoryColors,
          borderWidth: 1,
          data: categoryFrequencies,
        }]
      },
      options: { 
        legend: {
          display: false,
          position: 'bottom',
        },
        aspectRatio: 1,
        maintainAspectRatio: true,
        responsive: false,
      }
    })
  }

  render() {
    return <canvas ref={this.chartRef} />
  }
}

export default Pie
