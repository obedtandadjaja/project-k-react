export let closedTicket = [4, 5, 9]

export let closedTicketLabel = ['ac','pwr','water']

export let openTicket =  [4, 5, 10, 2, 5, 8]

export let openTicketLabel = ['ac','pwr','water','door','lights', 'window']



var dynamicColors = function() {
    var r = Math.floor(Math.random() * 255);
    var g = Math.floor(Math.random() * 255);
    var b = Math.floor(Math.random() * 255);
    return "rgb(" + r + "," + g + "," + b + ")";
}

export let bgColor = dynamicColors
