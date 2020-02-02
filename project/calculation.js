let numBrackets = 2;

// variables set for updating chart
let chartIncomeAfter;
let chartOneTo99;
let chartAllIncome;
let chartXmax;
//
let IncomeAfter = [];
let myChart1;
let myChart2;
const pop = 52400000; //total UK adult population
let percentilePop = 524000;
let decilePercentilePop = 52400;

let allIncome = [104,
    1560,
    3045,
    4419,
    5416,
    6181,
    7028,
    7777,
    8445,
    9090,
    9750,
    10339,
    10836,
    11326,
    11794,
    12215,
    12616,
    13037,
    13431,
    13828,
    14190,
    14568,
    14939,
    15335,
    15701,
    16048,
    16420,
    16797,
    17173,
    17551,
    17936,
    18307,
    18677,
    19037,
    19392,
    19769,
    20149,
    20517,
    20889,
    21267,
    21637,
    22020,
    22403,
    22778,
    23177,
    23554,
    23926,
    24326,
    24742,
    25162,
    25584,
    26004,
    26420,
    26870,
    27340,
    27796,
    28242,
    28708,
    29191,
    29661,
    30129,
    30623,
    31129,
    31639,
    32138,
    32680,
    33231,
    33810,
    34412,
    35026,
    35687,
    36377,
    37105,
    37866,
    38648,
    39462,
    40304,
    41177,
    42095,
    43044,
    44036,
    45155,
    46367,
    47673,
    49122,
    50730,
    52428,
    54211,
    56146,
    58239,
    60550,
    63263,
    66543,
    70611,
    75832,
    82852,
    92968,
    109293,
    142335,
];

const topOne = [177666,
    188486,
    201567,
    217791,
    238611,
    266609,
    306953,
    372059,
    503839,
    1534790];

chart()
pie()
function main() {
    m = math()
    results(m.tR)
    chartData1p()
    updateData(chartIncomeAfter)
}

function results(taxRaised) {
    let outputTaxRaised = document.getElementById("collected");
    let outputDeficit = document.getElementById("deficit");
    let deficit = taxRaised - 201300000000;
    outputDeficit.innerHTML = currencyFormat(deficit);
    outputTaxRaised.innerHTML = currencyFormat(taxRaised);
}

function currencyFormat(num) {
return '£' + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}
function percToDec(percentage) {
    return percentage/100
}
function math() {
    let bands = [];
    for (let o = 0; o < (numBrackets); o++)
    {
        let upto;
        let rate;
        let new_band
        rate = document.getElementsByClassName("rate_input")[o];
        if ((rate) == undefined)
        {
            rate = "0";
        }
        console.log('the rate is  ' + rate.value);
        if (o == (numBrackets-1))
        {
            upto = allIncome[allIncome.length-1].toString();
            new_band = {'rate': rate.value, 'upto' : upto};
        }
        else
        {
            upto = document.getElementsByClassName("upto_input")[o];
            if ((upto) == undefined)
            {
                upto = "0";
            }
            new_band = {'rate': rate.value, 'upto' : upto.value};
        }
        bands.push(new_band);   
    }
    console.log(bands);
    let UBI = parseFloat(document.getElementById("UBI").value);
    let taxRaised = 0;
    for (let i = 0; i < 109; i++) {
        let income;
        if ( i < 99){
            income = allIncome[i];
        }
        else if ( i > 98 ){
            income = topOne[i-99]
        }
        for (let j = numBrackets-1; j > -1; j--) {
            let taxable;
            let taxed;
            let temp_from;
            //cycles through all provided tax band data
            let selectedRow = bands[j];
            let selectedRowMinus = bands[(j-1)];
            let temp_rate = parseFloat(selectedRow['rate']);
            let temp_upto = parseFloat(selectedRow['upto']);
            if (j == 0 && income < temp_upto)
            {
                temp_from = income;
            }
            else if ( j == 0)
            {
                temp_from = temp_upto;
            }
            else{
                temp_from = parseFloat(selectedRowMinus['upto']);
            }
            if (j == 0 && income <= temp_upto)
            {
                temp_rate = -temp_rate
            }
            if (income < temp_from)
            {
                taxed = 0
            }
            else if (income > temp_from && income <= temp_upto)
            {
                taxable = income - temp_from
                taxed = taxable * percToDec(temp_rate);
            }
            else
            {
                taxed = (temp_upto - temp_from) * percToDec(temp_rate);
            }
            if ( i < 100) {
                taxRaised += taxed * percentilePop;
            }
            else {
                taxRaised += taxed * decilePercentilePop;
            }
            income -= taxed;
        } 
        IncomeAfter[i] = income + UBI;
    }
    taxRaised -= UBI * pop;
    console.log(IncomeAfter);
    return {"tR":taxRaised};
}

function taxPaid() {
    let bottom80 = 0;
    let p80to90 = 0;
    let p90to98 = 0;
    let top1 = 0;
    let j;
    for (j=0; j < 108; j++) {
        if (j <= 80)
        {
            bottom80 += (allIncome[j] - IncomeAfter[j]) * percentilePop;
        }
        else if (j > 80 && j <= 90)
        {
            p80to90 += (allIncome[j] - IncomeAfter[j]) * percentilePop;
        }
        else if (j > 90 && j <= 98)
        {
            p90to98 += (allIncome[j] - IncomeAfter[j]) * percentilePop;
        }
        else if (j > 98)
        {
            top1 += (topOne[j-99] - IncomeAfter[j]) * decilePercentilePop;
        }
    }
    if (bottom80 < 0)
    {
        bottom80 = 0;
    }
    if ( p80to90 < 0)
    {
        p80to90 = 0;
    }
    if (p90to98 < 0)
    {
        p90to98 = 0;
    }
    if (top1 < 0)
    {
        top1 = 0;
    }
    console.log(bottom80 +' '+ p80to90 +' '+ p90to98+' ' + top1)
    return{"b80":bottom80, "p8090":p80to90, "p9098":p90to98, "t1":top1};
}

function chart() {
    console.log(IncomeAfter)
    let ctx1 = document.getElementById('myChart1').getContext('2d');
    Chart.defaults.global.defaultFontFamily = 'Roboto';
    Chart.defaults.global.defaultFontSize = 18;
    myChart1 = new Chart(ctx1, {
        type: 'line',
        data: {
            datasets:[{
                label: "Income After Tax (£)",
                data: allIncome,
                backgroundColor: [
                'rgba(5, 99, 255, 0.2)',
                'rgba(54, 162, 255, 0.2)',
                'rgba(255, 206, 255, 0.2)',
                'rgba(75, 192, 255, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 255, 0.2)',
                'rgba(255, 99, 255, 0.2)'],
                borderColor: ['blue'],
                borderWidth: 1

            }, {
                label:"Income Before Tax (£)",
                data: allIncome,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }
        ],
        },
        options:{
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                xAxes: [{
                    type: 'linear',
                    ticks: {
                        min: 1,
                        max: 99,
                        stepSize: 1
                    }
                }]
            }
        }
    });
}

function pie() {
    tp = taxPaid()
    let ctx2 = document.getElementById('myChart2').getContext('2d');
    myChart2 = new Chart(ctx2, {
        type: 'pie',
        data: {
            labels: ["bottom 80%", "80%-90%", "90%-98", "top 1%" ],
            datasets:[{
                label: "Tax paid %",
                data: [tp.b80, tp.p8090, tp.p9098, tp.t1],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        },
        options:{
            responsive: true,
            maintainAspectRatio: false,
        }
    
    });
}

function checkbox1p() {
    chartData1p()
    updateData1p()
}

function chartData1p() {
    let checkbox = document.getElementById("1p");
    if (checkbox.checked)
    {
        chartXmax = 10
        chartAllIncome = topOne;
        chartIncomeAfter = IncomeAfter.slice(99,109);
    }
    else
    {
        chartXmax = 99
        chartAllIncome = allIncome;
        chartIncomeAfter = IncomeAfter.slice(0,99);
    }
}

function updateData(updatedData) {
    myChart1.data.datasets[0].data = updatedData;
    myChart1.update();
    tp = taxPaid()
    myChart2.data.datasets[0].data = [tp.b80, tp.p8090, tp.p9098, tp.t1];
    myChart2.update();
}

function updateData1p() {
    myChart1.data.datasets[0].data = chartIncomeAfter;
    myChart1.data.datasets[1].data = chartAllIncome;
    myChart1.options.scales.xAxes.ticks.max = chartXmax;
    myChart1.update();
}

document.addEventListener("keyup", function(event) {
    // Number 13 is the "Enter" key on the keyboard
    if (event.keyCode === 13) {
      // Cancel the default action, if needed
      event.preventDefault();
      // Trigger the button element with a click
      document.getElementById("calc_btn").click();
    }
});

//numBrackets is 2 to start with
function plus() {
    console.log("Number of Brackets: " + numBrackets);
    const brackethtml = document.createElement('brackethtml');
    brackethtml.innerHTML = '<div class="band_input" id="band'+ numBrackets +'">' +
    '<h3 class="subtitle">Tax Band '+ numBrackets +'</h3>' +
    'Tax Rate (from last tax band) <input class="percentage input-box rate_input" type="number" placeholder=0>%</br>' +
    'Up To £<input class="amount input-box upto_input" type="number" placeholder=0>'+
    '</div>';
    let band;
    let node;
    if (numBrackets == 2)
    {
        let e = document.getElementById("minus_btn");
        e.style.display = "inline";
    }
    band = document.getElementById("newBands");
    band.appendChild(brackethtml);
    //under construction [
    //if (numBrackets >= 5) {
    //    let newHeight = (document.getElementById("content").style.height) + 2;
    //    document.getElementById("content").style.height = newHeight;
    //}
    // ]
    numBrackets += 1;
}

function minus() {
    if (numBrackets == 2)
    {
        let e = document.getElementById("minus_btn");
        e.style.display = "none";
    }
    else {
        numBrackets -= 1;
        let band = document.getElementById("band"+numBrackets);
        band.parentNode.removeChild(band);
    }
}

function copy() {
    /* Get the text field */
    let copyText = document.getElementById("bitcoinAddress");
  
    /* Select the text field */
    copyText.select();
    copyText.setSelectionRange(0, 99999); /*For mobile devices*/
  
    /* Copy the text inside the text field */
    document.execCommand("copy");
  
    /* Alert the copied text */
    alert("Copied the text: " + copyText.value);
}