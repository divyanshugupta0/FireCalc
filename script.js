let history = [];

function appendValue(value) {
    document.getElementById('display').value += value;
}

function clearDisplay() {
    document.getElementById('display').value = '';
}

function deleteLast() {
    let display = document.getElementById('display').value;
    document.getElementById('display').value = display.slice(0, -1);
}

function calculate() {
    let display = document.getElementById('display').value;
    try {
        let result = eval(display);
        document.getElementById('display').value = result;
        addToHistory(display + ' = ' + result);
    } catch (e) {
        document.getElementById('display').value = 'Error';
    }
}

function addToHistory(entry) {
    history.push(entry);
    updateHistoryDisplay();
}

function updateHistoryDisplay() {
    const historyList = document.getElementById('historyList');
    historyList.innerHTML = '';
    history.forEach((item) => {
        let li = document.createElement('li');
        li.textContent = item;
        historyList.appendChild(li);
    });
}

function toggleHistory() {
    const modal = document.getElementById('historyModal');
    modal.style.display = (modal.style.display === 'block') ? 'none' : 'block';
}

// Close the modal when the user clicks outside of it
window.onclick = function(event) {
    const modal = document.getElementById('historyModal');
    if (event.target == modal) {
        modal.style.display = 'none';
    }
}

// Keyboard input support
document.addEventListener('keydown', (event) => {
    const key = event.key;
    if (key >= '0' && key <= '9' || key === '.' || key === '/' || key === '*' || key === '-' || key === '+') {
        appendValue(key);
    } else if (key === 'Enter') {
        calculate();
    } else if (key === 'Backspace') {
        deleteLast();
    } else if (key === 'Escape') {
        clearDisplay();
    }
});

function shareCalculator() {
    if (navigator.share) {
        navigator.share({
            title: 'Fire Calculator',
            text: 'Check out this awesome calculator!',
            url: window.location.href
        }).then(() => console.log('Successful share'))
          .catch((error) => console.log('Error sharing:', error));
    } else {
        alert('Sharing not supported on this browser.');
    }
}
