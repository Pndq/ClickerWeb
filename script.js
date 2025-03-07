let counter = 0;
let incrementAmount = 1;
let perSecond = 0;
let purchaseCount = 0;
let purchaseCount2 = 0;
let purchaseCount3 = 0;
let baseMultiplier = 1.5;
let baseMultiplier2 = 1.3;
let currentCost = 25;
let currentCost2 = 125;
let currentCost3 = 200;
let firstUpgradeIncrement = 0;  // Start at 0 since we haven't purchased any upgrades
let secondUpgradeIncrement = 0; // Start at 0 since we haven't purchased any upgrades

const countDisplay = document.getElementById('count');
const incrementButton = document.getElementById('increment-btn');
const shopButton = document.querySelector('.rectangle');
const dropdown = document.querySelector('.dropdown');
const dropdown2 = document.querySelector('.dropdown2');
const perClickButton = document.getElementById('perClickButton');
const perSecondButton = document.getElementById('perSecondButton')
const specialButton = document.getElementById('special-btn');
const specialButton2 = document.querySelector('.dropdown button:nth-child(2)');
const specialButton3 = document.getElementById('special-btn-3');
const notification = document.getElementById('notification');
const purchaseCountDisplay = specialButton.querySelector('.purchase-count');
const costDisplay = specialButton.querySelector('.cost');
const incrementDisplay = specialButton.querySelector('.info span:first-child');
const testButton = document.querySelector('.test-button');

const purchaseCountDisplay2 = specialButton2.querySelector('.purchase-count');
const costDisplay2 = specialButton2.querySelector('.cost');
const incrementDisplay2 = specialButton2.querySelector('.info span:first-child');

const purchaseCountDisplay3 = specialButton3.querySelector('.purchase-count')
const costDisplay3 = specialButton3.querySelector('.cost');
const incrementDisplay3 = specialButton3.querySelector('.info span:first-child');

const perClickDisplay = perClickButton.querySelector('.cost');
const perClickTitle = perClickButton.querySelector('.info span:first-child')
const perSecondDisplay = perSecondButton.querySelector('.cost');
const perSecondTitle = perSecondButton.querySelector('.info span:first-child')

setInterval(() => {
    if (perSecond > 0) {
        counter += perSecond;
        countDisplay.textContent = counter;
    }
}, 1000);

function calculateCost() {
    return currentCost;
}

function calculateCost2() {
    return currentCost2;
}

function calculateCost3() {
    return currentCost3;
}

function updateCost() {
    // Start at 1.5, decrease by 0.1 every other purchase
    const decreaseAmount = Math.floor((purchaseCount) / 2) * 0.1;
    const currentMultiplier = Math.max(1.1, 1.5 - decreaseAmount);  // Don't go below 1.3
    currentCost = Math.floor(currentCost * currentMultiplier);
}

function updateCost2() {
    const decreaseAmount2 = Math.floor((purchaseCount2) / 2) * 0.1;
    const currentMultiplier2 = Math.max(1.1, 1.5 - decreaseAmount2);
    currentCost2 = Math.floor(currentCost2 * currentMultiplier2);
}

function updateCost3() {
    const decreaseAmount3 = Math.floor((purchaseCount3) / 2) * 0.1;
    const currentMultiplier3 = Math.max(1.1, 1.5 - decreaseAmount3);
    currentCost3 = Math.floor(currentCost3 * currentMultiplier3);
}

function calculateIncrementBonus() {
    if (purchaseCount === 0) return 0;
    // First 5 purchases: +1
    // Next 5 purchases: +2
    // Next 5 purchases: +3
    return Math.floor((purchaseCount - 1) / 5) + 1;
}

function calculateIncrementBonus2() {
    // Start at 5, increase by 2 every 5 purchases
    if (purchaseCount2 === 0) return 5;
    return 5 + (Math.floor((purchaseCount2 - 1) / 5) * 2);
}

function calculateIncrementBonus3() {
    // Start at 5, increase by 2 every 5 purchases
    if (purchaseCount3 === 0) return 1;
    return 1 + (Math.floor((purchaseCount3 - 1) / 5) * 2);
}

function getNextIncrementBonus() {
    return Math.floor(purchaseCount / 5) + 1;
}

function getNextIncrementBonus2() {
    return (Math.floor(purchaseCount2 / 5) * 2) + 5;
}

function getNextIncrementBonus3() {
    return Math.floor(purchaseCount3 / 5) + 1;
}

function updateButtonText() {
    const cost = calculateCost();
    const nextBonus = getNextIncrementBonus();
    costDisplay.textContent = `Cost: ${cost}`;
    incrementDisplay.textContent = `+${nextBonus} per click`;

    const cost2 = calculateCost2();
    const bonus2 = getNextIncrementBonus2();
    costDisplay2.textContent = `Cost: ${cost2}`;
    incrementDisplay2.textContent = `+${bonus2} per click`;

    const cost3 = calculateCost3();
    const bonus3 = getNextIncrementBonus3();
    costDisplay3.textContent = `Cost: ${cost3}`;
    incrementDisplay3.textContent = `+${bonus3} per second`;

    perClickDisplay.textContent = `${incrementAmount}`;
    perClickTitle.textContent = 'Amount per click: ';
    perSecondDisplay.textContent = `${perSecond}`;
    perSecondTitle.textContent = 'Amount per second: ';
}

function showNotification(message) {
    notification.textContent = message;
    notification.classList.add('show');
    setTimeout(() => {
        notification.classList.remove('show');
    }, 4000);
}

function updateSpecialButtonState() {
    const cost = calculateCost();
    const cost2 = calculateCost2();
    const cost3 = calculateCost3();

    if (counter < cost) {
        specialButton.disabled = true;
        specialButton.title = `Need at least ${cost} points`;
    } else {
        specialButton.disabled = false;
        specialButton.title = `Click to trade ${cost} points for increased increment`;
    }

    if (counter < cost2) {
        specialButton2.disabled = true;
        specialButton2.title = `Need at least ${cost2} points`;
    } else {
        specialButton2.disabled = false;
        specialButton2.title = `Click to trade ${cost2} points for increased increment`;
    }

    if (counter < cost3) { 
        specialButton3.disabled = true;
        specialButton3.title = `Need at least ${cost3} points`;
    } else {
        specialButton3.disabled = false;
        specialButton3.title = `Click to trade ${cost3} points for increased increment`;
    }

    updateButtonText();
}

incrementButton.addEventListener('click', () => {
    counter += incrementAmount;
    countDisplay.textContent = counter;
    updateSpecialButtonState();
});

shopButton.addEventListener('click', () => {
    dropdown.classList.toggle('show');
});

specialButton.addEventListener('click', () => {
    const cost = calculateCost();
    if (counter >= cost) {
        counter -= cost;
        purchaseCount += 1;
        updateCost();
        const bonus = calculateIncrementBonus();
        incrementAmount += bonus;  // Add to the increment instead of setting it
        countDisplay.textContent = counter;
        purchaseCountDisplay.textContent = purchaseCount;
        showNotification(`Purchased! Now clicking gives +${incrementAmount}!`);
        updateSpecialButtonState();
    }
});

specialButton2.addEventListener('click', () => {
    const cost = calculateCost2();
    if (counter >= cost) {
        counter -= cost;
        purchaseCount2 += 1;
        updateCost2();
        const bonus = calculateIncrementBonus2();
        incrementAmount += bonus;  // Add to the increment instead of setting it
        countDisplay.textContent = counter;
        purchaseCountDisplay2.textContent = purchaseCount2;
        showNotification(`Purchased! Now clicking gives +${incrementAmount}!`);
        updateSpecialButtonState();
    }
});

let perSecondInterval; // To store the setInterval reference

specialButton3.addEventListener('click', () => {
    console.log('test')
    const cost = calculateCost3();
    if (counter >= cost) {
        counter -= cost;
        purchaseCount3 += 1;
        updateCost3();
        const bonus = calculateIncrementBonus3();
        perSecond += bonus;  // Add to the perSecond increment
        countDisplay.textContent = counter;
        purchaseCountDisplay3.textContent = purchaseCount3;
        showNotification(`Purchased! Earning ${perSecond} per second!`);

        // Enable per-second increment if not already active
        if (!perSecondInterval) {
            perSecondInterval = setInterval(() => {
                counter += perSecond;
                countDisplay.textContent = counter;
                updateSpecialButtonState();
            }, 1000);  // Update every second
        }

        updateSpecialButtonState();
    }
});

testButton.addEventListener('click', () => {
    dropdown2.classList.toggle('show');
});

// Initial state
updateSpecialButtonState(); 