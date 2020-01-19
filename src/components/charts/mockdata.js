export let closedTicket = [4, 5, 9]

export let closedTicketLabel = ['ac','pwr','water']

export let openTicket =  [4, 5, 10, 2, 5, 8]

export let openTicketLabel = ['ac','pwr','water','door','lights', 'window']

export const data = [
  {
    'id': 11,
    'dateOpened': '2/1/2019',
    'location': '101 (Property A)',
    'category': null,
    'description': null,
    'submittedBy': null,
  },
  {
    'id': 12,
    'dateOpened': '3/1/2019',
    'location': 'TOWER (Property A)',
    'category': null,
    'description': null,
    'submittedBy': null,
  }
]
  




var dynamicColors = function() {
    var r = Math.floor(Math.random() * 255);
    var g = Math.floor(Math.random() * 255);
    var b = Math.floor(Math.random() * 255);
    return "rgb(" + r + "," + g + "," + b + ")";
}

export let bgColor = dynamicColors
