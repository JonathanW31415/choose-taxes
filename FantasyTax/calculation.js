const pop = 31200000;
const percentilePop = 312000;
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
    166000];


function main() {
    m = math()
    results(m.tR)

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
    let IncomeAfter = [];
    let NITRate = document.getElementById("NITRate").value;
    let NITUpTo = document.getElementById("NITUpTo").value;
    let T1Rate = document.getElementById("T1Rate").value;
    let T1UpTo = document.getElementById("T1UpTo").value;
    let T2Rate = document.getElementById("T2Rate").value;
    let T2UpTo = document.getElementById("T2UpTo").value;
    let T3Rate = document.getElementById("T3Rate").value;
    let taxRaised = 0;
    let i;
    for (i = 0; i < allIncome.length; i++) {
        let income = allIncome[i];
        let taxedT3 = 0;
        let taxedT2 = 0;
        let taxedT1 = 0;
        let taxedNIT = 0;
        if (income > T2UpTo)
        {
            taxedT3 = (income - T2UpTo) * percToDec(T3Rate);
            taxedT2 = (T2UpTo - T1UpTo) * percToDec(T2Rate);
            taxedT1 = (T1UpTo - NITUpTo) * percToDec(T1Rate);
        }
        else if (income > T1UpTo && income <T2UpTo)
        {
            taxedT2 = (income - T1UpTo) * percToDec(T2Rate);
            taxedT1 = (T1UpTo - NITUpTo) * percToDec(T1Rate);
        }
        else if (income > NITUpTo && income < T1UpTo)
        {
            taxedT1 = (income - NITUpTo) * percToDec(T1Rate);
        }
        else if (income <= NITUpTo)
        {
            taxedNIT = (NITUpTo - income) * percToDec(NITRate);
        }
        taxRaised += (taxedT1 * percentilePop) + (taxedT2 * percentilePop) + (taxedT3 * percentilePop);
        taxRaised -= taxedNIT * percentilePop;
        IncomeAfter[i] = income - (taxedT1 + taxedT2 + taxedT3) + taxedNIT;

        console.log(IncomeAfter)
    }
    return {"tR":taxRaised};
}
