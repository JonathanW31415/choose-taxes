let chartIncomeAfter;
let chartOneTo99;
let chartAllIncome;
let IncomeAfter = [];
let myChart1;
let myChart2;
const pop = 31200000;
let percentilePop = 312000;
const allIncome = [11200,
    11500,
    11700,
    11900,
    12200,
    12400,
    12600,
    12800,
    13100,
    13300,
    13500,
    13700,
    13900,
    14200,
    14400,
    14600,
    14900,
    15100,
    15300,
    15500,
    15800,
    16000,
    16200,
    16400,
    16700,
    16900,
    17100,
    17400,
    17600,
    17800,
    18100,
    18300,
    18600,
    18800,
    19100,
    19300,
    19600,
    19900,
    20200,
    20500,
    20800,
    21100,
    21400,
    21700,
    22000,
    22300,
    22600,
    22900,
    23300,
    23600,
    23900,
    24300,
    24700,
    25000,
    25400,
    25900,
    26300,
    26700,
    27100,
    27500,
    27900,
    28400,
    28800,
    29300,
    29800,
    30300,
    30900,
    31500,
    32000,
    32600,
    33200,
    33900,
    34500,
    35200,
    36000,
    36700,
    37500,
    38300,
    39200,
    40000,
    41000,
    42000,
    42900,
    43700,
    44900,
    46200,
    47800,
    49600,
    51400,
    53600,
    56300,
    59500,
    63500,
    68600,
    75300,
    83700,
    96400,
    116000,
    166000,
    990000];

const oneTo999 = [1 ,
    2 ,
    3 ,
    4 ,
    5 ,
    6 ,
    7 ,
    8 ,
    9 ,
    10 ,
    11 ,
    12 ,
    13 ,
    14 ,
    15 ,
    16 ,
    17 ,
    18 ,
    19 ,
    20 ,
    21 ,
    22 ,
    23 ,
    24 ,
    25 ,
    26 ,
    27 ,
    28 ,
    29 ,
    30 ,
    31 ,
    32 ,
    33 ,
    34 ,
    35 ,
    36 ,
    37 ,
    38 ,
    39 ,
    40 ,
    41 ,
    42 ,
    43 ,
    44 ,
    45 ,
    46 ,
    47 ,
    48 ,
    49 ,
    50 ,
    51 ,
    52 ,
    53 ,
    54 ,
    55 ,
    56 ,
    57 ,
    58 ,
    59 ,
    60 ,
    61 ,
    62 ,
    63 ,
    64 ,
    65 ,
    66 ,
    67 ,
    68 ,
    69 ,
    70 ,
    71 ,
    72 ,
    73 ,
    74 ,
    75 ,
    76 ,
    77 ,
    78 ,
    79 ,
    80 ,
    81 ,
    82 ,
    83 ,
    84 ,
    85 ,
    86 ,
    87 ,
    88 ,
    89 ,
    90 ,
    91 ,
    92 ,
    93 ,
    94 ,
    95 ,
    96 ,
    97 ,
    98 ,
    99 ,
    99.9
    ]

chart()
pie()
function main() {
    m = math()
    results(m.tR)
    chartData999()
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
    let NITRate = document.getElementById("NITRate").value;
    let NITUpTo = document.getElementById("NITUpTo").value;
    let T1Rate = document.getElementById("T1Rate").value;
    let T1UpTo = document.getElementById("T1UpTo").value;
    let T2Rate = document.getElementById("T2Rate").value;
    let T2UpTo = document.getElementById("T2UpTo").value;
    let T3Rate = document.getElementById("T3Rate").value;
    let UBI = parseFloat(document.getElementById("UBI").value);
    console.log(typeof(UBI));
    let taxRaised = 0;
    let i;
    for (i = 0; i < allIncome.length; i++) {
        let income = allIncome[i];
        let taxedT3 = 0;
        let taxedT2 = 0;
        let taxedT1 = 0;
        let taxedNIT = 0;
        if (income == 166000)
        {
            percentilePop = 280800;
        } 
        else if (income == 990000)
        {
            percentilePop = 31200;
        }
        if (income > T2UpTo)
        {
            taxedT3 = (income - T2UpTo) * percToDec(T3Rate);
            taxedT2 = (T2UpTo - T1UpTo) * percToDec(T2Rate);
            taxedT1 = (T1UpTo - NITUpTo) * percToDec(T1Rate);
        }
        else if (income > T1UpTo && income <=T2UpTo)
        {
            taxedT2 = (income - T1UpTo) * percToDec(T2Rate);
            taxedT1 = (T1UpTo - NITUpTo) * percToDec(T1Rate);
        }
        else if (income > NITUpTo && income <= T1UpTo)
        {
            taxedT1 = (income - NITUpTo) * percToDec(T1Rate);
        }
        else if (income <= NITUpTo)
        {
            taxedNIT = (NITUpTo - income) * percToDec(NITRate);
        }
        taxRaised += (taxedT1 * percentilePop) + (taxedT2 * percentilePop) + (taxedT3 * percentilePop);
        taxRaised -= taxedNIT * percentilePop;
        console.log("UBI: " + UBI + " NIT: " + taxedNIT);
        IncomeAfter[i] = income - (taxedT1 + taxedT2 + taxedT3) + taxedNIT + UBI;
        percentilePop = 312000;
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
    for (j=0; j < allIncome.length; j++) {
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
            if (j == 99)
            {
                top1 += (allIncome[j] - IncomeAfter[j]) * 280800;
            }
            else if (j == 100)
            {
                top1 += (allIncome[j] - IncomeAfter[j]) * 31200;
            }
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

function checkbox999() {
    chartData999()
    updateData999()
}

function chartData999() {
    checkbox = document.getElementById("999");
    if (checkbox.checked)
    {
        chartOneTo99 = oneTo999;
        chartAllIncome = allIncome;
        chartIncomeAfter = IncomeAfter;
    }
    else
    {
        chartOneTo99 = oneTo999.slice(0,99);
        chartAllIncome = allIncome.slice(0, 99);
        chartIncomeAfter = IncomeAfter.slice(0,99);
    }
}

function chart() {
    console.log(IncomeAfter)
    let ctx1 = document.getElementById('myChart1').getContext('2d');
    Chart.defaults.global.defaultFontFamily = 'Roboto';
    Chart.defaults.global.defaultFontSize = 18;
    myChart1 = new Chart(ctx1, {
        type: 'line',
        data: {
            labels:oneTo999.slice(0,99),
            datasets:[{
                label: "Income After Tax (£)",
                data: allIncome.slice(0, 99),
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
                data: allIncome.slice(0, 99),
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

function updateData(updatedData) {
    myChart1.data.datasets[0].data = updatedData;
    myChart1.update();
    tp = taxPaid()
    myChart2.data.datasets[0].data = [tp.b80, tp.p8090, tp.p9098, tp.t1];
    myChart2.update();
}

function updateData999() {
    myChart1.data.labels = chartOneTo99;
    myChart1.data.datasets[0].data = chartIncomeAfter;
    myChart1.data.datasets[1].data = chartAllIncome;
    myChart1.update();
}