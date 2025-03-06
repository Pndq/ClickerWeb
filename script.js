let counter = 0;
let incrementAmount = 1;
let purchaseCount = 0;
let purchaseCount2 = 0;
let baseMultiplier = 1.5;
let baseMultiplier2 = 1.3;
let currentCost = 100;
let currentCost2 = 500;
let firstUpgradeIncrement = 0;  // Start at 0 since we haven't purchased any upgrades
let secondUpgradeIncrement = 0; // Start at 0 since we haven't purchased any upgrades

const countDisplay = document.getElementById('count');
const incrementButton = document.getElementById('increment-btn');
const shopButton = document.querySelector('.rectangle');
const dropdown = document.querySelector('.dropdown');
const specialButton = document.getElementById('special-btn');
const specialButton2 = document.querySelector('.dropdown button:nth-child(2)');
const notification = document.getElementById('notification');
const purchaseCountDisplay = specialButton.querySelector('.purchase-count');
const costDisplay = specialButton.querySelector('.cost');
const incrementDisplay = specialButton.querySelector('.info span:first-child');
const testButton = document.querySelector('.test-button');

// Initialize second button structure
specialButton2.innerHTML = `
    <div class="info">
        <span>+5 per click</span>
        <span class="cost">Cost: 500</span>
    </div>
    <span class="purchase-count">0</span>
`;
const purchaseCountDisplay2 = specialButton2.querySelector('.purchase-count');
const costDisplay2 = specialButton2.querySelector('.cost');
const incrementDisplay2 = specialButton2.querySelector('.info span:first-child');

function calculateCost() {
    return currentCost;
}

function calculateCost2() {
    return currentCost2;
}

function updateCost() {
    // Start at 1.5, decrease by 0.1 every other purchase
    const decreaseAmount = Math.floor((purchaseCount - 1) / 2) * 0.1;
    const currentMultiplier = Math.max(1.1, 1.5 - decreaseAmount);  // Don't go below 1.3
    currentCost = Math.floor(currentCost * currentMultiplier);
}

function updateCost2() {
    const multiplier = baseMultiplier2 + (Math.floor(purchaseCount2 / 15) * 0.1);
    currentCost2 = Math.ceil(currentCost2 * multiplier);
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

function getNextIncrementBonus() {
    return Math.floor(purchaseCount / 5) + 1;
}

function updateButtonText() {
    const cost = calculateCost();
    const nextBonus = getNextIncrementBonus();
    costDisplay.textContent = `Cost: ${cost}`;
    incrementDisplay.textContent = `+${nextBonus} per click`;

    const cost2 = calculateCost2();
    const bonus2 = calculateIncrementBonus2();
    costDisplay2.textContent = `Cost: ${cost2}`;
    incrementDisplay2.textContent = `+${bonus2} per click`;
}

function showNotification(message) {
    notification.textContent = message;
    notification.classList.add('show');
    setTimeout(() => {
        notification.classList.remove('show');
    }, 2000);
}

function updateSpecialButtonState() {
    const cost = calculateCost();
    const cost2 = calculateCost2();

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

testButton.addEventListener('click', () => {
    counter += 100;
    countDisplay.textContent = counter;
    updateSpecialButtonState();
    showNotification('Added 100 points!');
});

// Initial state
updateSpecialButtonState(); 