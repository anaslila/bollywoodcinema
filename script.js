// Game State
let gameState = {
    mode: null, // 'story' or 'free'
    player: {
        money: 0,
        reputation: 50,
        filmsReleased: 0,
        hits: 0,
        flops: 0,
        awards: 0
    },
    currentMovie: null,
    portfolio: [],
    franchises: [],
    gameEvents: [],
    isGameActive: false
};

// Bollywood Database
const bollywoodData = {
    actors: [
        { name: "Rajesh Khanna", popularity: 85, fee: 8, specialty: "romance" },
        { name: "Amitabh Bachchan", popularity: 95, fee: 15, specialty: "action" },
        { name: "Shah Rukh Khan", popularity: 90, fee: 12, specialty: "romance" },
        { name: "Salman Khan", popularity: 88, fee: 10, specialty: "action" },
        { name: "Aamir Khan", popularity: 92, fee: 14, specialty: "drama" },
        { name: "Hrithik Roshan", popularity: 85, fee: 9, specialty: "action" },
        { name: "Ranbir Kapoor", popularity: 78, fee: 7, specialty: "romance" },
        { name: "Ranveer Singh", popularity: 82, fee: 8, specialty: "comedy" },
        { name: "Varun Dhawan", popularity: 75, fee: 6, specialty: "comedy" },
        { name: "Tiger Shroff", popularity: 70, fee: 5, specialty: "action" }
    ],
    actresses: [
        { name: "Madhuri Dixit", popularity: 90, fee: 6, specialty: "romance" },
        { name: "Sridevi", popularity: 88, fee: 7, specialty: "drama" },
        { name: "Deepika Padukone", popularity: 85, fee: 8, specialty: "romance" },
        { name: "Priyanka Chopra", popularity: 80, fee: 7, specialty: "action" },
        { name: "Katrina Kaif", popularity: 82, fee: 6, specialty: "action" },
        { name: "Alia Bhatt", popularity: 83, fee: 7, specialty: "drama" },
        { name: "Kareena Kapoor", popularity: 78, fee: 6, specialty: "romance" },
        { name: "Anushka Sharma", popularity: 76, fee: 5, specialty: "comedy" },
        { name: "Shraddha Kapoor", popularity: 72, fee: 4, specialty: "romance" },
        { name: "Jacqueline Fernandez", popularity: 70, fee: 4, specialty: "action" }
    ],
    directors: [
        { name: "Yash Chopra", reputation: 95, fee: 5, specialty: "romance", hitRate: 0.8 },
        { name: "Karan Johar", reputation: 88, fee: 4, specialty: "romance", hitRate: 0.7 },
        { name: "Rohit Shetty", reputation: 85, fee: 4, specialty: "action", hitRate: 0.75 },
        { name: "Sanjay Leela Bhansali", reputation: 92, fee: 6, specialty: "drama", hitRate: 0.85 },
        { name: "Rajkumar Hirani", reputation: 90, fee: 5, specialty: "comedy", hitRate: 0.9 },
        { name: "Anurag Kashyap", reputation: 78, fee: 3, specialty: "thriller", hitRate: 0.6 },
        { name: "Imtiaz Ali", reputation: 82, fee: 3, specialty: "romance", hitRate: 0.65 },
        { name: "Zoya Akhtar", reputation: 80, fee: 3, specialty: "drama", hitRate: 0.7 },
        { name: "David Dhawan", reputation: 75, fee: 2, specialty: "comedy", hitRate: 0.6 },
        { name: "Abbas-Mustan", reputation: 73, fee: 2, specialty: "thriller", hitRate: 0.55 }
    ]
};

// Budget configurations
const budgetConfig = {
    low: { amount: 5, multiplier: 1.0 },
    medium: { amount: 25, multiplier: 1.2 },
    high: { amount: 50, multiplier: 1.5 },
    blockbuster: { amount: 100, multiplier: 2.0 }
};

// Random Events
const randomEvents = [
    {
        type: "positive",
        title: "Viral Song Hit!",
        description: "Your movie's song has gone viral on social media! Box office boost expected.",
        effect: { reputation: 5, boxOfficeMultiplier: 1.2 }
    },
    {
        type: "negative",
        title: "Censor Board Cuts",
        description: "The censor board has demanded multiple cuts, affecting the movie's impact.",
        effect: { reputation: -3, boxOfficeMultiplier: 0.9 }
    },
    {
        type: "neutral",
        title: "Celebrity Controversy",
        description: "Your lead actor is in the news for controversial statements.",
        effect: { reputation: -2, boxOfficeMultiplier: 1.1 }
    },
    {
        type: "positive",
        title: "Award Season Buzz",
        description: "Critics are praising your movie for award season consideration!",
        effect: { reputation: 8, boxOfficeMultiplier: 1.15 }
    },
    {
        type: "negative",
        title: "Competition Release",
        description: "A major blockbuster is releasing on the same day as your movie!",
        effect: { reputation: 0, boxOfficeMultiplier: 0.7 }
    },
    {
        type: "positive",
        title: "OTT Deal Bonus",
        description: "A streaming platform has offered an excellent deal for your movie!",
        effect: { reputation: 3, moneyBonus: 15 }
    }
];

// DOM Elements
const elements = {
    menu: document.getElementById('menu'),
    instructionsPanel: document.getElementById('instructionsPanel'),
    gameArea: document.getElementById('gameArea'),
    eventBox: document.getElementById('eventBox'),
    productionPanel: document.getElementById('productionPanel'),
    resultsPanel: document.getElementById('resultsPanel'),
    
    // Stats
    playerMoney: document.getElementById('playerMoney'),
    playerReputation: document.getElementById('playerReputation'),
    filmsReleased: document.getElementById('filmsReleased'),
    hitFlopRatio: document.getElementById('hitFlopRatio'),
    
    // Form elements
    movieTitle: document.getElementById('movieTitle'),
    movieGenre: document.getElementById('movieGenre'),
    movieBudget: document.getElementById('movieBudget'),
    leadActor: document.getElementById('leadActor'),
    leadActress: document.getElementById('leadActress'),
    movieDirector: document.getElementById('movieDirector'),
    releaseDate: document.getElementById('releaseDate'),
    
    // Results
    resultsContent: document.getElementById('resultsContent'),
    eventText: document.getElementById('eventText')
};

// Initialize Game
document.addEventListener('DOMContentLoaded', function() {
    initializeGame();
    attachEventListeners();
    populateDropdowns();
});

function initializeGame() {
    showSection('menu');
    updateStats();
}

function attachEventListeners() {
    // Menu buttons
    document.getElementById('startGame').addEventListener('click', () => startGame('story'));
    document.getElementById('storyMode').addEventListener('click', () => startGame('story'));
    document.getElementById('freeMode').addEventListener('click', () => startGame('free'));
    document.getElementById('instructions').addEventListener('click', showInstructions);
    document.getElementById('backToMenu').addEventListener('click', () => showSection('menu'));
    
    // Game buttons
    document.getElementById('produceMovie').addEventListener('click', showProductionPanel);
    document.getElementById('viewPortfolio').addEventListener('click', showPortfolio);
    document.getElementById('checkAwards').addEventListener('click', showAwards);
    document.getElementById('manageFranchise').addEventListener('click', showFranchises);
    document.getElementById('industryNews').addEventListener('click', showIndustryNews);
    
    // Production buttons
    document.getElementById('startProduction').addEventListener('click', startMovieProduction);
    document.getElementById('cancelProduction').addEventListener('click', hideProductionPanel);
    
    // Result buttons
    document.getElementById('continueGame').addEventListener('click', continueAfterResults);
    document.getElementById('acknowledgeEvent').addEventListener('click', hideEvent);
}

function populateDropdowns() {
    // Populate actors
    const actorSelect = elements.leadActor;
    bollywoodData.actors.forEach(actor => {
        const option = document.createElement('option');
        option.value = actor.name;
        option.textContent = `${actor.name} (₹${actor.fee}Cr, ${actor.popularity}% popularity)`;
        actorSelect.appendChild(option);
    });
    
    // Populate actresses
    const actressSelect = elements.leadActress;
    bollywoodData.actresses.forEach(actress => {
        const option = document.createElement('option');
        option.value = actress.name;
        option.textContent = `${actress.name} (₹${actress.fee}Cr, ${actress.popularity}% popularity)`;
        actressSelect.appendChild(option);
    });
    
    // Populate directors
    const directorSelect = elements.movieDirector;
    bollywoodData.directors.forEach(director => {
        const option = document.createElement('option');
        option.value = director.name;
        option.textContent = `${director.name} (₹${director.fee}Cr, ${director.reputation}% reputation)`;
        directorSelect.appendChild(option);
    });
}

function startGame(mode) {
    gameState.mode = mode;
    gameState.isGameActive = true;
    
    if (mode === 'story') {
        gameState.player.money = 50; // Starting with 50 crores
        gameState.player.reputation = 30;
    } else {
        gameState.player.money = 500; // Unlimited mode with high starting money
        gameState.player.reputation = 50;
    }
    
    gameState.player.filmsReleased = 0;
    gameState.player.hits = 0;
    gameState.player.flops = 0;
    gameState.portfolio = [];
    
    updateStats();
    showSection('gameArea');
    
    // Show welcome event
    setTimeout(() => {
        showEvent({
            title: `Welcome to ${mode === 'story' ? 'Story' : 'Free'} Mode!`,
            description: mode === 'story' ? 
                "Start your journey from a small producer to Bollywood mogul!" :
                "Unlimited resources! Experiment and create your dream movies!",
            type: "positive"
        });
    }, 1000);
}

function showSection(sectionName) {
    // Hide all sections
    elements.menu.classList.add('hidden');
    elements.instructionsPanel.classList.add('hidden');
    elements.gameArea.classList.add('hidden');
    
    // Show requested section
    switch(sectionName) {
        case 'menu':
            elements.menu.classList.remove('hidden');
            break;
        case 'instructions':
            elements.instructionsPanel.classList.remove('hidden');
            break;
        case 'gameArea':
            elements.gameArea.classList.remove('hidden');
            break;
    }
}

function showInstructions() {
    showSection('instructions');
}

function updateStats() {
    elements.playerMoney.textContent = `₹${gameState.player.money} Cr`;
    elements.playerReputation.textContent = `${gameState.player.reputation}%`;
    elements.filmsReleased.textContent = gameState.player.filmsReleased;
    elements.hitFlopRatio.textContent = `${gameState.player.hits}/${gameState.player.flops}`;
}

function showProductionPanel() {
    elements.productionPanel.classList.remove('hidden');
    clearProductionForm();
}

function hideProductionPanel() {
    elements.productionPanel.classList.add('hidden');
}

function clearProductionForm() {
    elements.movieTitle.value = '';
    elements.movieGenre.value = '';
    elements.movieBudget.value = '';
    elements.leadActor.value = '';
    elements.leadActress.value = '';
    elements.movieDirector.value = '';
    elements.releaseDate.value = '';
}

function startMovieProduction() {
    // Validate form
    if (!elements.movieTitle.value || !elements.movieGenre.value || 
        !elements.movieBudget.value || !elements.leadActor.value || 
        !elements.leadActress.value || !elements.movieDirector.value || 
        !elements.releaseDate.value) {
        alert('Please fill in all fields!');
        return;
    }
    
    // Calculate total cost
    const budget = budgetConfig[elements.movieBudget.value];
    const actor = bollywoodData.actors.find(a => a.name === elements.leadActor.value);
    const actress = bollywoodData.actresses.find(a => a.name === elements.leadActress.value);
    const director = bollywoodData.directors.find(d => d.name === elements.movieDirector.value);
    
    const totalCost = budget.amount + actor.fee + actress.fee + director.fee;
    
    if (gameState.player.money < totalCost && gameState.mode === 'story') {
        alert(`Insufficient funds! You need ₹${totalCost} Cr but only have ₹${gameState.player.money} Cr`);
        return;
    }
    
    // Create movie object
    gameState.currentMovie = {
        title: elements.movieTitle.value,
        genre: elements.movieGenre.value,
        budget: elements.movieBudget.value,
        actor: actor,
        actress: actress,
        director: director,
        releaseSeason: elements.releaseDate.value,
        cost: totalCost,
        boxOfficeMultiplier: 1.0
    };
    
    // Deduct money (only in story mode)
    if (gameState.mode === 'story') {
        gameState.player.money -= totalCost;
    }
    
    hideProductionPanel();
    
    // Simulate production time with random event chance
    setTimeout(() => {
        if (Math.random() < 0.3) { // 30% chance of random event
            triggerRandomEvent();
        }
        simulateBoxOffice();
    }, 2000);
    
    showEvent({
        title: "Production Started!",
        description: `"${gameState.currentMovie.title}" is now in production. The industry is watching...`,
        type: "neutral"
    });
    
    updateStats();
}

function triggerRandomEvent() {
    const event = randomEvents[Math.floor(Math.random() * randomEvents.length)];
    
    // Apply event effects to current movie
    if (event.effect.boxOfficeMultiplier) {
        gameState.currentMovie.boxOfficeMultiplier *= event.effect.boxOfficeMultiplier;
    }
    
    if (event.effect.reputation) {
        gameState.player.reputation = Math.max(0, Math.min(100, 
            gameState.player.reputation + event.effect.reputation));
    }
    
    if (event.effect.moneyBonus) {
        gameState.player.money += event.effect.moneyBonus;
    }
    
    showEvent(event);
    updateStats();
}

function simulateBoxOffice() {
    const movie = gameState.currentMovie;
    
    // Calculate base score
    let baseScore = 0;
    
    // Genre matching bonus
    if (movie.actor.specialty === movie.genre) baseScore += 15;
    if (movie.actress.specialty === movie.genre) baseScore += 15;
    if (movie.director.specialty === movie.genre) baseScore += 20;
    
    // Popularity and reputation factors
    baseScore += (movie.actor.popularity + movie.actress.popularity) / 2;
    baseScore += movie.director.reputation;
    baseScore += gameState.player.reputation / 2;
    
    // Budget factor
    baseScore += budgetConfig[movie.budget].multiplier * 10;
    
    // Release season factor
    const seasonMultipliers = {
        summer: 0.8,    // High competition
        monsoon: 1.0,   // Medium competition
        winter: 1.2,    // Low competition
        festival: 0.7   // Very high competition but potential for huge success
    };
    baseScore *= seasonMultipliers[movie.releaseSeason];
    
    // Apply random event multiplier
    baseScore *= movie.boxOfficeMultiplier;
    
    // Add randomness
    baseScore += Math.random() * 30 - 15; // ±15 random factor
    
    // Calculate earnings
    const productionCost = movie.cost;
    let domesticEarnings = Math.max(0, baseScore * productionCost * 0.02);
    let overseasEarnings = domesticEarnings * 0.3;
    let ottEarnings = productionCost * 0.2;
    
    const totalEarnings = domesticEarnings + overseasEarnings + ottEarnings;
    const profit = totalEarnings - productionCost;
    
    // Determine success
    const isHit = profit > productionCost * 0.5;
    const isBlockbuster = profit > productionCost * 2;
    const isFlop = profit < 0;
    
    // Update player stats
    gameState.player.filmsReleased++;
    if (isHit) {
        gameState.player.hits++;
        gameState.player.reputation = Math.min(100, gameState.player.reputation + (isBlockbuster ? 15 : 8));
    } else if (isFlop) {
        gameState.player.flops++;
        gameState.player.reputation = Math.max(0, gameState.player.reputation - 5);
    } else {
        gameState.player.reputation = Math.max(0, gameState.player.reputation - 2);
    }
    
    gameState.player.money += totalEarnings;
    
    // Add to portfolio
    const movieResult = {
        ...movie,
        domesticEarnings: Math.round(domesticEarnings),
        overseasEarnings: Math.round(overseasEarnings),
        ottEarnings: Math.round(ottEarnings),
        totalEarnings: Math.round(totalEarnings),
        profit: Math.round(profit),
        status: isBlockbuster ? 'Blockbuster' : isHit ? 'Hit' : isFlop ? 'Flop' : 'Average'
    };
    
    gameState.portfolio.push(movieResult);
    
    // Check for franchise opportunity
    if (isHit && Math.random() < 0.6) {
        gameState.franchises.push({
            name: movie.title,
            sequels: 0,
            potential: isBlockbuster ? 'High' : 'Medium'
        });
    }
    
    showResults(movieResult);
    updateStats();
}

function showResults(movieResult) {
    const resultsHTML = `
        <div class="movie-result">
            <h4>"${movieResult.title}" - ${movieResult.status}</h4>
            <div class="earnings-breakdown">
                <p><strong>Production Cost:</strong> ₹${movieResult.cost} Cr</p>
                <p><strong>Domestic Box Office:</strong> ₹${movieResult.domesticEarnings} Cr</p>
                <p><strong>Overseas Box Office:</strong> ₹${movieResult.overseasEarnings} Cr</p>
                <p><strong>OTT Rights:</strong> ₹${movieResult.ottEarnings} Cr</p>
                <p><strong>Total Earnings:</strong> ₹${movieResult.totalEarnings} Cr</p>
                <p class="${movieResult.profit >= 0 ? 'profit' : 'loss'}">
                    <strong>${movieResult.profit >= 0 ? 'Profit' : 'Loss'}:</strong> 
                    ₹${Math.abs(movieResult.profit)} Cr
                </p>
            </div>
            <div class="cast-performance">
                <p><strong>Cast:</strong> ${movieResult.actor.name} & ${movieResult.actress.name}</p>
                <p><strong>Director:</strong> ${movieResult.director.name}</p>
                <p><strong>Genre:</strong> ${movieResult.genre.charAt(0).toUpperCase() + movieResult.genre.slice(1)}</p>
            </div>
        </div>
    `;
    
    elements.resultsContent.innerHTML = resultsHTML;
    elements.resultsPanel.classList.remove('hidden');
}

function continueAfterResults() {
    elements.resultsPanel.classList.add('hidden');
    gameState.currentMovie = null;
}

function showEvent(event) {
    elements.eventText.textContent = event.description;
    elements.eventText.previousElementSibling.textContent = event.title;
    elements.eventBox.classList.remove('hidden');
}

function hideEvent() {
    elements.eventBox.classList.add('hidden');
}

function showPortfolio() {
    if (gameState.portfolio.length === 0) {
        alert('No movies produced yet! Start creating your Bollywood empire.');
        return;
    }
    
    let portfolioHTML = '<h3>Your Movie Portfolio</h3><div class="portfolio-list">';
    
    gameState.portfolio.forEach((movie, index) => {
        portfolioHTML += `
            <div class="portfolio-item ${movie.status.toLowerCase()}">
                <h4>${movie.title} (${movie.status})</h4>
                <p>Genre: ${movie.genre} | Budget: ${movie.budget}</p>
                <p>Profit: ₹${movie.profit} Cr</p>
            </div>
        `;
    });
    
    portfolioHTML += '</div>';
    
    // Create modal or use results panel
    elements.resultsContent.innerHTML = portfolioHTML;
    elements.resultsPanel.classList.remove('hidden');
}

function showAwards() {
    const awards = calculateAwards();
    let awardsHTML = '<h3>Awards & Recognition</h3>';
    
    if (awards.length === 0) {
        awardsHTML += '<p>No awards yet. Keep making great movies!</p>';
    } else {
        awardsHTML += '<div class="awards-list">';
        awards.forEach(award => {
            awardsHTML += `<div class="award-item">${award}</div>`;
        });
        awardsHTML += '</div>';
    }
    
    elements.resultsContent.innerHTML = awardsHTML;
    elements.resultsPanel.classList.remove('hidden');
}

function calculateAwards() {
    const awards = [];
    const blockbusters = gameState.portfolio.filter(m => m.status === 'Blockbuster').length;
    const hits = gameState.portfolio.filter(m => m.status === 'Hit').length;
    
    if (blockbusters >= 3) awards.push('🏆 Blockbuster Producer Award');
    if (hits >= 5) awards.push('🎬 Consistent Hit Maker Award');
    if (gameState.player.reputation >= 80) awards.push('⭐ Industry Reputation Award');
    if (gameState.player.filmsReleased >= 10) awards.push('🎭 Prolific Producer Award');
    
    return awards;
}

function showFranchises() {
    if (gameState.franchises.length === 0) {
        alert('No franchises available. Create hit movies to unlock franchise opportunities!');
        return;
    }
    
    let franchiseHTML = '<h3>Franchise Management</h3><div class="franchise-list">';
    
    gameState.franchises.forEach((franchise, index) => {
        franchiseHTML += `
            <div class="franchise-item">
                <h4>${franchise.name} Franchise</h4>
                <p>Sequels Made: ${franchise.sequels}</p>
                <p>Potential: ${franchise.potential}</p>
                <button onclick="createSequel(${index})" class="sequel-btn">Create Sequel</button>
            </div>
        `;
    });
    
    franchiseHTML += '</div>';
    
    elements.resultsContent.innerHTML = franchiseHTML;
    elements.resultsPanel.classList.remove('hidden');
}

function createSequel(franchiseIndex) {
    const franchise = gameState.franchises[franchiseIndex];
    // Pre-fill production form with sequel
    elements.movieTitle.value = `${franchise.name} ${franchise.sequels + 2}`;
    franchise.sequels++;
    hideProductionPanel();
    showProductionPanel();
    elements.resultsPanel.classList.add('hidden');
}

function showIndustryNews() {
    const news = [
        "🎬 New talent scouts are looking for fresh faces in Bollywood",
        "📺 OTT platforms are increasing their movie acquisition budgets",
        "🎵 Music directors are experimenting with fusion genres",
        "🌟 International co-productions are trending this season",
        "🎭 Regional cinema is gaining more mainstream recognition"
    ];
    
    const randomNews = news[Math.floor(Math.random() * news.length)];
    
    showEvent({
        title: "Industry Update",
        description: randomNews,
        type: "neutral"
    });
}

// PWA Service Worker Registration
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => console.log('SW registered'))
            .catch(error => console.log('SW registration failed'));
    });
}
