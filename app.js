// Add Listener to Submit
document.getElementById('loan-form').addEventListener('submit', function (e) {
    // Display Loader
    document.getElementById('loading').style.display = 'block';

    // Hide Results
    document.getElementById('results').style.display = 'none';

    // Set Timeout for loader
    setTimeout(calculateLoan, 2000);

    e.preventDefault();
});

function calculateLoan() {
    // Get Entered Amounts
    const amount = document.getElementById('amount');
    const interest = document.getElementById('interest');
    const years = document.getElementById('years');
    const monthlyPayment = document.getElementById('monthly-payment');
    const totalPayment = document.getElementById('total-payment');
    const totalInterest = document.getElementById('total-interest');

    // Compute Results
    const principle = parseFloat(amount.value);
    const calculatedInterest = parseFloat(interest.value) / 100 / 12;
    const calculatedPayments = parseFloat(years.value) * 12;

    const x = Math.pow(1 + calculatedInterest , calculatedPayments);
    const monthly = (principle*x*calculatedInterest)/(x-1);

    if(isFinite(monthly)) {
        // Calculating Results and displaying them into UI
        monthlyPayment.value = monthly.toFixed(2);
        totalPayment.value = (monthly*calculatedPayments).toFixed(2);
        totalInterest.value = ((monthly*calculatedPayments) - principle).toFixed(2);

        // Hide Loader
        document.getElementById('loading').style.display = 'none'

        // Displat Results
        document.getElementById('results').style.display = 'block'

    } else {
        showError('Please Enter Valid Amounts');

         // Hide Loader
         document.getElementById('loading').style.display = 'none'

         // Hide Results
         document.getElementById('results').style.display = 'none'
    }

}

function showError(error) {
    // Create a div
    const errorDiv = document.createElement('div');

    // Add classes to div
    errorDiv.className = 'alert alert-danger';

    // Get Elements
    const card = document.querySelector('.card');
    const heading = document.querySelector('.heading');

    // Pass the message to the div
    errorDiv.appendChild(document.createTextNode(error));

    // Insert the error message into the DOM
    card.insertBefore(errorDiv, heading);

    // Clear Error after 3 seconds
    setTimeout(function (){
        document.querySelector('.alert').remove();
    }, 3000);
}