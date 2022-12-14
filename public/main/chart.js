

const chartCreate = async () => {
  let baseUrl = "/api/v1";
  const response = await fetch(`${baseUrl}/posts`);
  const finalOutput = await response.json();


  let xValues = [];
  let yValues = [];
  let barColors = [
    "#2B3252",
    "#EF5455",
    "#FAD744",
    "#e8c3b9",
    "#1e7145",
  ];

  for (let i = 0; i < finalOutput.data.length; i++) {
    for (let prop in finalOutput.data[i]) {
      if (prop === "expenseOrIncome") {
        xValues.push(finalOutput.data[i][prop])
        
      }
      if (prop === "amount" && finalOutput.data[i][prop] > 0) {
        xValues.splice(xValues.indexOf(finalOutput.data[i][prop]), 1);
      }
    }
   

  }
  console.log(xValues);


  let totalExpense = 0;
  let percentage = 0;
  for (let i = 0; i < finalOutput.data.length; i++) {
    for (let totalValue in finalOutput.data[i]) {
      if (totalValue === "amount" && finalOutput.data[i][totalValue] < 0) {
        totalExpense += Math.abs(finalOutput.data[i][totalValue]);
      }
    }
  }
  for (let i = 0; i < finalOutput.data.length; i++) {

    for (let value in finalOutput.data[i]) {

      if (value === "amount" && finalOutput.data[i][value] < 0) {
        percentage = (Math.abs(finalOutput.data[i][value]) / totalExpense * 100).toFixed(0);
        yValues.push(percentage);
        percentage = 0;
      }
    }
  }



  console.log(yValues);


  new Chart("myChart", {
    type: "pie",
    data: {
      labels: xValues,
      datasets: [{
        backgroundColor: barColors,
        data: yValues
      }]
    },
    options: {
      title: {
        display: true,
        text: "Expenses of the current month"
      }
    }
  });

}

chartCreate();



