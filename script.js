// Game State Management
let gameState = {
    version: "2.0",
    mode: null,
    currentStage: 'menu',
    gameTime: {
        week: 1,
        month: 1,
        year: 2025,
        monthNames: ['January', 'February', 'March', 'April', 'May', 'June', 
                     'July', 'August', 'September', 'October', 'November', 'December']
    },
    player: {
        name: "Studio Head",
        budget: 0,
        reputation: 50,
        projectsCompleted: 0,
        totalProjects: 0,
        successRate: 0,
        awards: 0,
        industry_standing: "Newcomer"
    },
    currentProject: null,
    portfolio: [],
    gameEvents: [],
    industryNews: [],
    competitorMovies: [],
    isGameActive: false,
    autosaveEnabled: true
};

// Bollywood Industry Database
const industryData = {
    writers: [
        { id: 1, name: "Javed Akhtar", fee: 2, skill: 95, speed: 80, specialty: "drama", reputation: 98, hitRate: 0.85 },
        { id: 2, name: "Gulzar Singh", fee: 3, skill: 92, speed: 70, specialty: "romance", reputation: 95, hitRate: 0.82 },
        { id: 3, name: "Rajesh Kumar", fee: 1.5, skill: 78, speed: 90, specialty: "comedy", reputation: 75, hitRate: 0.65 },
        { id: 4, name: "Priya Sharma", fee: 2.5, skill: 88, speed: 85, specialty: "action", reputation: 82, hitRate: 0.72 },
        { id: 5, name: "Amit Trivedi", fee: 1.8, skill: 82, speed: 88, specialty: "horror", reputation: 78, hitRate: 0.68 },
        { id: 6, name: "Shabana Azmi", fee: 3.5, skill: 96, speed: 65, specialty: "family", reputation: 92, hitRate: 0.88 },
        { id: 7, name: "Vishal Bhardwaj", fee: 4, skill: 94, speed: 75, specialty: "thriller", reputation: 89, hitRate: 0.80 },
        { id: 8, name: "Zoya Akhtar", fee: 3.2, skill: 90, speed: 82, specialty: "drama", reputation: 87, hitRate: 0.78 },
        { id: 9, name: "Anurag Kashyap", fee: 2.8, skill: 89, speed: 70, specialty: "thriller", reputation: 85, hitRate: 0.73 },
        { id: 10, name: "Reema Kagti", fee: 2.2, skill: 84, speed: 88, specialty: "historical", reputation: 79, hitRate: 0.69 }
    ],
    
    directors: [
        { id: 1, name: "Yash Chopra", fee: 8, reputation: 98, specialty: "romance", hitRate: 0.92, experience: 35 },
        { id: 2, name: "Karan Johar", fee: 6, reputation: 88, specialty: "romance", hitRate: 0.78, experience: 25 },
        { id: 3, name: "Rohit Shetty", fee: 7, reputation: 85, specialty: "action", hitRate: 0.82, experience: 20 },
        { id: 4, name: "Sanjay Leela Bhansali", fee: 10, reputation: 95, specialty: "drama", hitRate: 0.88, experience: 28 },
        { id: 5, name: "Rajkumar Hirani", fee: 9, reputation: 92, specialty: "comedy", hitRate: 0.95, experience: 18 },
        { id: 6, name: "Anurag Basu", fee: 4, reputation: 78, specialty: "thriller", hitRate: 0.65, experience: 15 },
        { id: 7, name: "Imtiaz Ali", fee: 5, reputation: 82, specialty: "romance", hitRate: 0.70, experience: 16 },
        { id: 8, name: "David Dhawan", fee: 3, reputation: 75, specialty: "comedy", hitRate: 0.68, experience: 30 },
        { id: 9, name: "Farah Khan", fee: 5.5, reputation: 80, specialty: "family", hitRate: 0.72, experience: 20 },
        { id: 10, name: "Zoya Akhtar", fee: 6.5, reputation: 87, specialty: "drama", hitRate: 0.79, experience: 12 }
    ],
    
    actors: [
        { id: 1, name: "Shah Rukh Khan", fee: 50, popularity: 95, specialty: "romance", age: 58, marketValue: 98 },
        { id: 2, name: "Salman Khan", fee: 45, popularity: 92, specialty: "action", age: 58, marketValue: 95 },
        { id: 3, name: "Aamir Khan", fee: 55, popularity: 94, specialty: "drama", age: 60, marketValue: 97 },
        { id: 4, name: "Hrithik Roshan", fee: 40, popularity: 88, specialty: "action", age: 51, marketValue: 90 },
        { id: 5, name: "Ranbir Kapoor", fee: 35, popularity: 85, specialty: "romance", age: 42, marketValue: 88 },
        { id: 6, name: "Ranveer Singh", fee: 38, popularity: 89, specialty: "comedy", age: 39, marketValue: 92 },
        { id: 7, name: "Varun Dhawan", fee: 25, popularity: 78, specialty: "comedy", age: 37, marketValue: 82 },
        { id: 8, name: "Tiger Shroff", fee: 20, popularity: 72, specialty: "action", age: 34, marketValue: 75 },
        { id: 9, name: "Ayushmann Khurrana", fee: 18, popularity: 80, specialty: "comedy", age: 40, marketValue: 85 },
        { id: 10, name: "Rajkummar Rao", fee: 15, popularity: 76, specialty: "drama", age: 39, marketValue: 78 }
    ],
    
    actresses: [
        { id: 1, name: "Deepika Padukone", fee: 20, popularity: 92, specialty: "romance", age: 39, marketValue: 95 },
        { id: 2, name: "Priyanka Chopra", fee: 18, popularity: 88, specialty: "action", age: 42, marketValue: 90 },
        { id: 3, name: "Katrina Kaif", fee: 16, popularity: 85, specialty: "action", age: 40, marketValue: 88 },
        { id: 4, name: "Alia Bhatt", fee: 22, popularity: 90, specialty: "drama", age: 31, marketValue: 93 },
        { id: 5, name: "Kareena Kapoor", fee: 15, popularity: 83, specialty: "romance", age: 44, marketValue: 85 },
        { id: 6, name: "Anushka Sharma", fee: 14, popularity: 81, specialty: "comedy", age: 36, marketValue: 83 },
        { id: 7, name: "Shraddha Kapoor", fee: 12, popularity: 75, specialty: "romance", age: 37, marketValue: 78 },
        { id: 8, name: "Jacqueline Fernandez", fee: 10, popularity: 70, specialty: "action", age: 38, marketValue: 72 },
        { id: 9, name: "Kriti Sanon", fee: 13, popularity: 77, specialty: "comedy", age: 34, marketValue: 80 },
        { id: 10, name: "Sara Ali Khan", fee: 8, popularity: 68, specialty: "romance", age: 29, marketValue: 70 }
    ],
    
    supportingActors: [
        { id: 1, name: "Nawazuddin Siddiqui", fee: 3, skill: 95, specialty: "drama" },
        { id: 2, name: "Pankaj Tripathi", fee: 2.5, skill: 92, specialty: "comedy" },
        { id: 3, name: "Manoj Bajpayee", fee: 3.5, skill: 94, specialty: "thriller" },
        { id: 4, name: "Kay Kay Menon", fee: 2, skill: 88, specialty: "thriller" },
        { id: 5, name: "Irrfan Khan Jr.", fee: 4, skill: 90, specialty: "drama" },
        { id: 6, name: "Rajesh Sharma", fee: 1.5, skill: 85, specialty: "comedy" },
        { id: 7, name: "Kumud Mishra", fee: 2.2, skill: 87, specialty: "drama" },
        { id: 8, name: "Divya Dutta", fee: 2.8, skill: 89, specialty: "drama" },
        { id: 9, name: "Ratna Pathak", fee: 3, skill: 91, specialty: "family" },
        { id: 10, name: "Seema Pahwa", fee: 1.8, skill: 86, specialty: "comedy" }
    ],
    
    musicDirectors: [
        { id: 1, name: "A.R. Rahman", fee: 5, reputation: 98, specialty: "all", hitRate: 0.92 },
        { id: 2, name: "Shankar-Ehsaan-Loy", fee: 4, reputation: 88, specialty: "romance", hitRate: 0.82 },
        { id: 3, name: "Vishal-Shekhar", fee: 3.5, reputation: 85, specialty: "dance", hitRate: 0.78 },
        { id: 4, name: "Amit Trivedi", fee: 3, reputation: 87, specialty: "indie", hitRate: 0.80 },
        { id: 5, name: "Ilaiyaraaja", fee: 4.5, reputation: 95, specialty: "classical", hitRate: 0.88 },
        { id: 6, name: "Sanjay Leela Bhansali", fee: 6, reputation: 92, specialty: "classical", hitRate: 0.85 },
        { id: 7, name: "Pritam", fee: 3.8, reputation: 82, specialty: "commercial", hitRate: 0.75 },
        { id: 8, name: "Harris Jayaraj", fee: 2.5, reputation: 78, specialty: "melody", hitRate: 0.72 },
        { id: 9, name: "Anirudh Ravichander", fee: 2.8, reputation: 81, specialty: "youth", hitRate: 0.74 },
        { id: 10, name: "Ajay-Atul", fee: 3.2, reputation: 84, specialty: "folk", hitRate: 0.77 }
    ],
    
    playbackSingers: [
        { id: 1, name: "Arijit Singh", fee: 2, popularity: 95, specialty: "romantic" },
        { id: 2, name: "Shreya Ghoshal", fee: 1.8, popularity: 92, specialty: "classical" },
        { id: 3, name: "Rahat Fateh Ali Khan", fee: 2.5, popularity: 88, specialty: "sufi" },
        { id: 4, name: "Sunidhi Chauhan", fee: 1.5, popularity: 85, specialty: "dance" },
        { id: 5, name: "Armaan Malik", fee: 1.2, popularity: 82, specialty: "romantic" },
        { id: 6, name: "Asees Kaur", fee: 1, popularity: 78, specialty: "folk" },
        { id: 7, name: "Jubin Nautiyal", fee: 1.3, popularity: 80, specialty: "romantic" },
        { id: 8, name: "Neha Kakkar", fee: 1.6, popularity: 87, specialty: "dance" },
        { id: 9, name: "B Praak", fee: 1.4, popularity: 83, specialty: "emotional" },
        { id: 10, name: "Dhvani Bhanushali", fee: 0.8, popularity: 75, specialty: "youth" }
    ],
    
    lyricists: [
        { id: 1, name: "Gulzar", fee: 1.5, skill: 98, specialty: "poetic" },
        { id: 2, name: "Javed Akhtar", fee: 1.8, skill: 95, specialty: "romantic" },
        { id: 3, name: "Irshad Kamil", fee: 1.2, skill: 88, specialty: "contemporary" },
        { id: 4, name: "Amitabh Bhattacharya", fee: 1.4, skill: 92, specialty: "quirky" },
        { id: 5, name: "Manoj Muntashir", fee: 1, skill: 85, specialty: "devotional" },
        { id: 6, name: "Kausar Munir", fee: 0.8, skill: 82, specialty: "emotional" },
        { id: 7, name: "Anvita Dutt", fee: 1.1, skill: 87, specialty: "modern" },
        { id: 8, name: "Varun Grover", fee: 0.9, skill: 84, specialty: "satirical" },
        { id: 9, name: "Shellee", fee: 0.7, skill: 78, specialty: "commercial" },
        { id: 10, name: "Rajshekhar", fee: 0.6, skill: 75, specialty: "folk" }
    ],
    
    distributors: [
        { 
            id: 1, name: "Yash Raj Films Distribution", 
            fee: 25, reach: 95, reliability: 92, 
            specialties: ["romance", "family"], 
            description: "Premium distributor with nationwide reach and excellent marketing." 
        },
        { 
            id: 2, name: "Dharma Productions Network", 
            fee: 22, reach: 88, reliability: 89, 
            specialties: ["romance", "drama"], 
            description: "Strong urban presence with young audience appeal." 
        },
        { 
            id: 3, name: "Excel Entertainment Distribution", 
            fee: 20, reach: 85, reliability: 87, 
            specialties: ["action", "thriller"], 
            description: "Modern approach with strong digital marketing." 
        },
        { 
            id: 4, name: "Red Chillies Distribution", 
            fee: 28, reach: 92, reliability: 90, 
            specialties: ["all"], 
            description: "Star power backing with international reach." 
        },
        { 
            id: 5, name: "Eros International", 
            fee: 18, reach: 82, reliability: 84, 
            specialties: ["commercial", "mass"], 
            description: "Budget-friendly with decent reach in tier-2 cities." 
        },
        { 
            id: 6, name: "Balaji Motion Pictures", 
            fee: 15, reach: 75, reliability: 78, 
            specialties: ["horror", "thriller"], 
            description: "Niche distributor with specialized marketing." 
        }
    ]
};

// Project Types Configuration
const projectTypes = {
    movie: {
        name: "Feature Film",
        baseBudget: 25,
        productionWeeks: 12,
        marketingMultiplier: 1.0,
        revenueMultiplier: 1.0
    },
    webseries: {
        name: "Web Series",
        baseBudget: 15,
        productionWeeks: 8,
        marketingMultiplier: 0.7,
        revenueMultiplier: 0.8
    },
    tvserial: {
        name: "TV Serial",
        baseBudget: 5,
        productionWeeks: 4,
        marketingMultiplier: 0.4,
        revenueMultiplier: 0.6
    }
};

// Calendar and Competition System
const festivalDates = {
    2025: [
        { date: "2025-01-26", name: "Republic Day", impact: 1.2 },
        { date: "2025-03-14", name: "Holi", impact: 1.15 },
        { date: "2025-08-15", name: "Independence Day", impact: 1.25 },
        { date: "2025-10-24", name: "Diwali", impact: 1.3 },
        { date: "2025-12-25", name: "Christmas", impact: 1.1 }
    ]
};

let competitionCalendar = {};

// DOM Elements Cache
const elements = {
    // Menu elements
    menu: document.getElementById('menu'),
    gameDashboard: document.getElementById('gameDashboard'),
    instructionsPanel: document.getElementById('instructionsPanel'),
    
    // Time display
    currentWeek: document.getElementById('currentWeek'),
    currentMonth: document.getElementById('currentMonth'),
    
    // Stats
    playerBudget: document.getElementById('playerBudget'),
    playerReputation: document.getElementById('playerReputation'),
    projectsCount: document.getElementById('projectsCount'),
    successRate: document.getElementById('successRate'),
    
    // Project status
    currentProjectStatus: document.getElementById('currentProjectStatus'),
    currentProjectTitle: document.getElementById('currentProjectTitle'),
    
    // All stages
    scriptStage: document.getElementById('scriptStage'),
    crewStage: document.getElementById('crewStage'),
    productionStage: document.getElementById('productionStage'),
    marketingStage: document.getElementById('marketingStage'),
    distributionStage: document.getElementById('distributionStage'),
    releaseStage: document.getElementById('releaseStage'),
    resultsStage: document.getElementById('resultsStage'),
    
    // Panels
    newsPanel: document.getElementById('newsPanel'),
    eventNotification: document.getElementById('eventNotification'),
    loadingScreen: document.getElementById('loadingScreen')
};

// Initialize Game
document.addEventListener('DOMContentLoaded', function() {
    initializeGame();
    attachEventListeners();
    loadGameData();
});

function initializeGame() {
    console.log("Initializing Bollywood Cinema v2.0...");
    showSection('menu');
    updateTimeDisplay();
    generateCompetition();
    generateIndustryNews();
    
    // Load saved game if exists
    if (localStorage.getItem('bollywoodCinema_v2_save')) {
        document.getElementById('loadGameBtn').style.display = 'block';
    }
}

function attachEventListeners() {
    // Menu buttons
    document.getElementById('newGameBtn').addEventListener('click', startNewGame);
    document.getElementById('loadGameBtn').addEventListener('click', loadGame);
    document.getElementById('instructionsBtn').addEventListener('click', () => showSection('instructions'));
    document.getElementById('backToMenuBtn').addEventListener('click', () => showSection('menu'));
    
    // Dashboard buttons
    document.getElementById('newProjectBtn').addEventListener('click', startNewProject);
    document.getElementById('portfolioBtn').addEventListener('click', showPortfolio);
    document.getElementById('industryNewsBtn').addEventListener('click', showIndustryNews);
    document.getElementById('saveGameBtn').addEventListener('click', saveGame);
    document.getElementById('continueProjectBtn').addEventListener('click', continueCurrentProject);
    
    // Script stage
    document.getElementById('startScriptBtn').addEventListener('click', startScriptDevelopment);
    document.getElementById('cancelScriptBtn').addEventListener('click', cancelProject);
    document.getElementById('writerSearch').addEventListener('input', filterWriters);
    
    // Crew stage
    document.getElementById('finalizeCrewBtn').addEventListener('click', finalizeCrewAndStartProduction);
    document.getElementById('backToScriptBtn').addEventListener('click', () => showStage('script'));
    attachCrewSearchListeners();
    
    // Production stage
    document.getElementById('skipProductionBtn').addEventListener('click', skipToPostProduction);
    
    // Marketing stage
    document.getElementById('launchMarketingBtn').addEventListener('click', launchMarketing);
    document.getElementById('marketingBudgetRange').addEventListener('input', updateMarketingBudget);
    
    // Distribution stage
    document.getElementById('finalizeDistributionBtn').addEventListener('click', finalizeDistribution);
    
    // Release stage
    document.getElementById('confirmReleaseBtn').addEventListener('click', confirmRelease);
    document.getElementById('prevMonth').addEventListener('click', () => changeCalendarMonth(-1));
    document.getElementById('nextMonth').addEventListener('click', () => changeCalendarMonth(1));
    
    // Results stage
    document.getElementById('continueToNextProjectBtn').addEventListener('click', () => showSection('dashboard'));
    document.getElementById('backToDashboardBtn').addEventListener('click', () => showSection('dashboard'));
    
    // Event handling
    document.getElementById('dismissEventBtn').addEventListener('click', dismissEvent);
    document.getElementById('handleEventBtn').addEventListener('click', handleEvent);
    
    // News panel
    document.getElementById('closeNewsBtn').addEventListener('click', () => elements.newsPanel.classList.add('hidden'));
}

// Game Flow Functions
function startNewGame() {
    gameState.player = {
        name: "Studio Head",
        budget: 100, // Starting with 100 crores
        reputation: 30,
        projectsCompleted: 0,
        totalProjects: 0,
        successRate: 0,
        awards: 0,
        industry_standing: "Newcomer"
    };
    
    gameState.currentProject = null;
    gameState.portfolio = [];
    gameState.gameEvents = [];
    gameState.isGameActive = true;
    
    updateStats();
    showSection('dashboard');
    
    setTimeout(() => {
        showEvent({
            title: "Welcome to Bollywood!",
            description: "You've started your journey as a film producer. Time to create your first masterpiece!",
            type: "welcome"
        });
    }, 1000);
}

function loadGame() {
    const savedData = localStorage.getItem('bollywoodCinema_v2_save');
    if (savedData) {
        gameState = JSON.parse(savedData);
        updateStats();
        updateTimeDisplay();
        
        if (gameState.currentProject) {
            showProjectStatus();
        }
        
        showSection('dashboard');
        showEvent({
            title: "Game Loaded",
            description: "Welcome back to your Bollywood empire!",
            type: "info"
        });
    }
}

function saveGame() {
    localStorage.setItem('bollywoodCinema_v2_save', JSON.stringify(gameState));
    showEvent({
        title: "Game Saved",
        description: "Your progress has been saved successfully!",
        type: "success"
    });
}

// Project Management
function startNewProject() {
    gameState.currentProject = {
        id: Date.now(),
        stage: 'script',
        title: '',
        type: '',
        genre: '',
        length: '',
        cast: {
            writer: null,
            director: null,
            leadActor: null,
            leadActress: null,
            supportingCast: [],
            musicDirector: null,
            singers: [],
            lyricist: null
        },
        budget: {
            script: 0,
            cast: 0,
            production: 0,
            marketing: 0,
            distribution: 0,
            total: 0
        },
        timeline: {
            scriptStart: null,
            scriptEnd: null,
            productionStart: null,
            productionEnd: null,
            releaseDate: null
        },
        marketing: {
            channels: [],
            budget: 0,
            regions: []
        },
        distribution: {
            partner: null,
            strategy: ''
        },
        events: [],
        quality: {
            script: 0,
            production: 0,
            music: 0,
            marketing: 0
        }
    };
    
    gameState.totalProjects++;
    showStage('script');
}

function showStage(stageName) {
    // Hide all stages
    hideAllStages();
    
    // Show current stage
    const stageElement = document.getElementById(stageName + 'Stage');
    if (stageElement) {
        stageElement.classList.remove('hidden');
    }
    
    // Update project status
    updateProjectProgress(stageName);
    
    // Initialize stage-specific data
    switch(stageName) {
        case 'script':
            initializeScriptStage();
            break;
        case 'crew':
            initializeCrewStage();
            break;
        case 'production':
            initializeProductionStage();
            break;
        case 'marketing':
            initializeMarketingStage();
            break;
        case 'distribution':
            initializeDistributionStage();
            break;
        case 'release':
            initializeReleaseStage();
            break;
    }
}

function hideAllStages() {
    const stages = ['script', 'crew', 'production', 'marketing', 'distribution', 'release', 'results'];
    stages.forEach(stage => {
        const element = document.getElementById(stage + 'Stage');
        if (element) {
            element.classList.add('hidden');
        }
    });
    
    elements.gameDashboard.classList.add('hidden');
    elements.menu.classList.add('hidden');
    elements.instructionsPanel.classList.add('hidden');
}

function showSection(sectionName) {
    hideAllStages();
    
    switch(sectionName) {
        case 'menu':
            elements.menu.classList.remove('hidden');
            break;
        case 'dashboard':
            elements.gameDashboard.classList.remove('hidden');
            if (gameState.currentProject) {
                showProjectStatus();
            }
            break;
        case 'instructions':
            elements.instructionsPanel.classList.remove('hidden');
            break;
    }
}

// Script Stage Implementation
function initializeScriptStage() {
    populateWriters();
    clearScriptForm();
}

function populateWriters() {
    const writerList = document.getElementById('writerList');
    writerList.innerHTML = '';
    
    industryData.writers.forEach(writer => {
        const writerItem = createTalentItem(writer, 'writer');
        writerList.appendChild(writerItem);
    });
}

function createTalentItem(talent, type) {
    const item = document.createElement('div');
    item.className = 'talent-item';
    item.dataset.id = talent.id;
    item.dataset.type = type;
    
    let specialtyText = '';
    if (type === 'writer') {
        specialtyText = `${talent.specialty} specialist | ${talent.skill}% skill | ${talent.speed}% speed`;
    } else if (type === 'director') {
        specialtyText = `${talent.specialty} specialist | ${talent.reputation}% reputation | ${Math.round(talent.hitRate * 100)}% hit rate`;
    } else if (type === 'actor' || type === 'actress') {
        specialtyText = `${talent.specialty} specialist | ${talent.popularity}% popularity | Age: ${talent.age}`;
    } else if (type === 'supporting') {
        specialtyText = `${talent.specialty} specialist | ${talent.skill}% skill rating`;
    } else if (type === 'musicDirector') {
        specialtyText = `${talent.specialty} specialist | ${talent.reputation}% reputation | ${Math.round(talent.hitRate * 100)}% hit rate`;
    } else if (type === 'singer') {
        specialtyText = `${talent.specialty} specialist | ${talent.popularity}% popularity`;
    } else if (type === 'lyricist') {
        specialtyText = `${talent.specialty} specialist | ${talent.skill}% skill rating`;
    }
    
    item.innerHTML = `
        <div class="talent-info">
            <div class="talent-name">${talent.name}</div>
            <div class="talent-details">${specialtyText}</div>
        </div>
        <div class="talent-stats">
            <span class="talent-fee">₹${talent.fee} Cr</span>
            <span class="talent-rating">${getTalentRating(talent, type)}</span>
        </div>
    `;
    
    item.addEventListener('click', () => selectTalent(talent, type, item));
    return item;
}

function getTalentRating(talent, type) {
    switch(type) {
        case 'writer': return `${talent.skill}★`;
        case 'director': return `${talent.reputation}★`;
        case 'actor':
        case 'actress': return `${talent.popularity}★`;
        case 'supporting': return `${talent.skill}★`;
        case 'musicDirector': return `${talent.reputation}★`;
        case 'singer': return `${talent.popularity}★`;
        case 'lyricist': return `${talent.skill}★`;
        default: return '★';
    }
}

function selectTalent(talent, type, itemElement) {
    // Remove previous selection
    const talentList = itemElement.parentElement;
    talentList.querySelectorAll('.talent-item').forEach(item => {
        item.classList.remove('selected');
    });
    
    // Add selection to clicked item
    itemElement.classList.add('selected');
    
    // Store selection
    if (type === 'writer') {
        gameState.currentProject.cast.writer = talent;
        showSelectedTalent('selectedWriter', talent, type);
    } else if (type === 'director') {
        gameState.currentProject.cast.director = talent;
        showSelectedTalent('selectedDirector', talent, type);
    } else if (type === 'actor') {
        gameState.currentProject.cast.leadActor = talent;
        showSelectedTalent('selectedLeadActor', talent, type);
    } else if (type === 'actress') {
        gameState.currentProject.cast.leadActress = talent;
        showSelectedTalent('selectedLeadActress', talent, type);
    } else if (type === 'musicDirector') {
        gameState.currentProject.cast.musicDirector = talent;
        showSelectedTalent('selectedMusicDirector', talent, type);
    } else if (type === 'singer') {
        addSinger(talent);
    } else if (type === 'lyricist') {
        gameState.currentProject.cast.lyricist = talent;
        showSelectedTalent('selectedLyricist', talent, type);
    }
    
    updateCrewBudget();
}

function showSelectedTalent(elementId, talent, type) {
    const element = document.getElementById(elementId);
    if (element) {
        element.classList.remove('hidden');
        element.querySelector('.talent-details').innerHTML = `
            <div class="selected-talent-info">
                <strong>${talent.name}</strong>
                <p>Fee: ₹${talent.fee} Cr | Specialty: ${talent.specialty}</p>
                <p>${getDetailedTalentInfo(talent, type)}</p>
            </div>
        `;
    }
}

function getDetailedTalentInfo(talent, type) {
    switch(type) {
        case 'writer': 
            return `Skill: ${talent.skill}% | Speed: ${talent.speed}% | Hit Rate: ${Math.round(talent.hitRate * 100)}%`;
        case 'director': 
            return `Reputation: ${talent.reputation}% | Experience: ${talent.experience} years | Hit Rate: ${Math.round(talent.hitRate * 100)}%`;
        case 'actor':
        case 'actress': 
            return `Popularity: ${talent.popularity}% | Market Value: ${talent.marketValue}% | Age: ${talent.age}`;
        case 'musicDirector': 
            return `Reputation: ${talent.reputation}% | Hit Rate: ${Math.round(talent.hitRate * 100)}%`;
        case 'singer': 
            return `Popularity: ${talent.popularity}% | Specialty: ${talent.specialty}`;
        case 'lyricist': 
            return `Skill: ${talent.skill}% | Specialty: ${talent.specialty}`;
        default: 
            return '';
    }
}

function filterWriters() {
    const searchTerm = document.getElementById('writerSearch').value.toLowerCase();
    const writerItems = document.querySelectorAll('#writerList .talent-item');
    
    writerItems.forEach(item => {
        const name = item.querySelector('.talent-name').textContent.toLowerCase();
        const details = item.querySelector('.talent-details').textContent.toLowerCase();
        
        if (name.includes(searchTerm) || details.includes(searchTerm)) {
            item.style.display = 'flex';
        } else {
            item.style.display = 'none';
        }
    });
}

function startScriptDevelopment() {
    // Validate form
    if (!validateScriptForm()) {
        return;
    }
    
    // Set project details
    gameState.currentProject.title = document.getElementById('workingTitle').value;
    gameState.currentProject.type = document.getElementById('projectType').value;
    gameState.currentProject.genre = document.getElementById('projectGenre').value;
    gameState.currentProject.length = document.getElementById('projectLength').value;
    
    // Calculate script cost
    const scriptCost = gameState.currentProject.cast.writer.fee;
    gameState.currentProject.budget.script = scriptCost;
    
    if (gameState.player.budget < scriptCost) {
        showEvent({
            title: "Insufficient Budget",
            description: `You need ₹${scriptCost} Cr for script development but only have ₹${gameState.player.budget} Cr.`,
            type: "error"
        });
        return;
    }
    
    // Deduct money
    gameState.player.budget -= scriptCost;
    
    // Start script development
    const lengthMultiplier = { short: 1, medium: 1.5, long: 2 }[gameState.currentProject.length];
    const developmentWeeks = Math.ceil(3 + lengthMultiplier + Math.random() * 2);
    
    gameState.currentProject.timeline.scriptStart = { ...gameState.gameTime };
    advanceTime(developmentWeeks);
    gameState.currentProject.timeline.scriptEnd = { ...gameState.gameTime };
    
    // Calculate script quality
    const writer = gameState.currentProject.cast.writer;
    const genreMatch = writer.specialty === gameState.currentProject.genre ? 1.2 : 1.0;
    const qualityScore = (writer.skill * genreMatch + Math.random() * 20) / 120;
    gameState.currentProject.quality.script = Math.min(1, qualityScore);
    
    updateStats();
    updateTimeDisplay();
    
    showEvent({
        title: "Script Development Complete!",
        description: `"${gameState.currentProject.title}" script is ready. Time to assemble your crew!`,
        type: "success"
    });
    
    // Move to crew stage
    gameState.currentProject.stage = 'crew';
    showStage('crew');
}

function validateScriptForm() {
    const requiredFields = ['workingTitle', 'projectType', 'projectGenre', 'projectLength', 'mainCastCount', 'supportingCastCount'];
    
    for (let field of requiredFields) {
        if (!document.getElementById(field).value) {
            showEvent({
                title: "Form Incomplete",
                description: "Please fill in all required fields.",
                type: "error"
            });
            return false;
        }
    }
    
    if (!gameState.currentProject.cast.writer) {
        showEvent({
            title: "No Writer Selected",
            description: "Please select a writer for your project.",
            type: "error"
        });
        return false;
    }
    
    return true;
}

function clearScriptForm() {
    document.getElementById('workingTitle').value = '';
    document.getElementById('projectType').value = '';
    document.getElementById('projectGenre').value = '';
    document.getElementById('projectLength').value = '';
    document.getElementById('mainCastCount').value = '2';
    document.getElementById('supportingCastCount').value = '2';
    
    // Clear writer selection
    gameState.currentProject = gameState.currentProject || { cast: {} };
    gameState.currentProject.cast.writer = null;
    
    const selectedWriter = document.getElementById('selectedWriter');
    if (selectedWriter) {
        selectedWriter.classList.add('hidden');
    }
}

// Crew Stage Implementation
function initializeCrewStage() {
    populateDirectors();
    populateActors();
    populateActresses();
    populateSupportingCast();
    populateMusicDepartment();
    updateCrewBudget();
}

function populateDirectors() {
    const directorList = document.getElementById('directorList');
    directorList.innerHTML = '';
    
    industryData.directors.forEach(director => {
        const directorItem = createTalentItem(director, 'director');
        directorList.appendChild(directorItem);
    });
}

function populateActors() {
    const actorList = document.getElementById('leadActorList');
    actorList.innerHTML = '';
    
    industryData.actors.forEach(actor => {
        const actorItem = createTalentItem(actor, 'actor');
        actorList.appendChild(actorItem);
    });
}

function populateActresses() {
    const actressList = document.getElementById('leadActressList');
    actressList.innerHTML = '';
    
    industryData.actresses.forEach(actress => {
        const actressItem = createTalentItem(actress, 'actress');
        actressList.appendChild(actressItem);
    });
}

function populateSupportingCast() {
    const container = document.getElementById('supportingCastContainer');
    const requiredCount = parseInt(document.getElementById('supportingCastCount').value) || 2;
    
    container.innerHTML = '';
    
    for (let i = 0; i < requiredCount; i++) {
        const slotDiv = document.createElement('div');
        slotDiv.className = 'cast-slot';
        slotDiv.innerHTML = `
            <h4>Supporting Actor ${i + 1}</h4>
            <div class="search-box">
                <input type="text" placeholder="Search supporting actors..." onInput="filterSupportingActors(${i})">
            </div>
            <div id="supportingActorList${i}" class="talent-list"></div>
            <div id="selectedSupportingActor${i}" class="selected-talent hidden"></div>
        `;
        container.appendChild(slotDiv);
        
        // Populate supporting actors for this slot
        const list = document.getElementById(`supportingActorList${i}`);
        industryData.supportingActors.forEach(actor => {
            const item = createTalentItem(actor, 'supporting');
            item.addEventListener('click', () => selectSupportingActor(actor, i, item));
            list.appendChild(item);
        });
    }
}

function populateMusicDepartment() {
    // Music Directors
    const musicDirectorList = document.getElementById('musicDirectorList');
    musicDirectorList.innerHTML = '';
    
    industryData.musicDirectors.forEach(director => {
        const item = createTalentItem(director, 'musicDirector');
        musicDirectorList.appendChild(item);
    });
    
    // Singers
    const singerList = document.getElementById('singerList');
    singerList.innerHTML = '';
    
    industryData.playbackSingers.forEach(singer => {
        const item = createTalentItem(singer, 'singer');
        singerList.appendChild(item);
    });
    
    // Lyricists
    const lyricistList = document.getElementById('lyricistList');
    lyricistList.innerHTML = '';
    
    industryData.lyricists.forEach(lyricist => {
        const item = createTalentItem(lyricist, 'lyricist');
        lyricistList.appendChild(item);
    });
}

function attachCrewSearchListeners() {
    // Add search functionality for all crew categories
    const searchInputs = [
        'directorSearch',
        'leadActorSearch', 
        'leadActressSearch',
        'musicDirectorSearch',
        'singerSearch',
        'lyricistSearch'
    ];
    
    searchInputs.forEach(inputId => {
        const input = document.getElementById(inputId);
        if (input) {
            input.addEventListener('input', () => filterTalent(inputId));
        }
    });
}

function filterTalent(inputId) {
    const searchTerm = document.getElementById(inputId).value.toLowerCase();
    const listId = inputId.replace('Search', 'List');
    const talentItems = document.querySelectorAll(`#${listId} .talent-item`);
    
    talentItems.forEach(item => {
        const name = item.querySelector('.talent-name').textContent.toLowerCase();
        const details = item.querySelector('.talent-details').textContent.toLowerCase();
        
        if (name.includes(searchTerm) || details.includes(searchTerm)) {
            item.style.display = 'flex';
        } else {
            item.style.display = 'none';
        }
    });
}

function selectSupportingActor(actor, slotIndex, itemElement) {
    // Clear previous selection in this slot
    const list = document.getElementById(`supportingActorList${slotIndex}`);
    list.querySelectorAll('.talent-item').forEach(item => {
        item.classList.remove('selected');
    });
    
    // Select current item
    itemElement.classList.add('selected');
    
    // Store selection
    if (!gameState.currentProject.cast.supportingCast) {
        gameState.currentProject.cast.supportingCast = [];
    }
    gameState.currentProject.cast.supportingCast[slotIndex] = actor;
    
    // Show selected talent
    showSelectedTalent(`selectedSupportingActor${slotIndex}`, actor, 'supporting');
    
    updateCrewBudget();
}

function addSinger(singer) {
    if (!gameState.currentProject.cast.singers) {
        gameState.currentProject.cast.singers = [];
    }
    
    // Check if singer already selected
    const alreadySelected = gameState.currentProject.cast.singers.find(s => s.id === singer.id);
    if (alreadySelected) {
        showEvent({
            title: "Singer Already Selected",
            description: `${singer.name} is already part of your music team.`,
            type: "warning"
        });
        return;
    }
    
    // Add singer
    gameState.currentProject.cast.singers.push(singer);
    
    // Update UI
    updateSelectedSingers();
    updateCrewBudget();
}

function updateSelectedSingers() {
    const container = document.getElementById('selectedSingers');
    container.innerHTML = '';
    
    if (gameState.currentProject.cast.singers.length > 0) {
        gameState.currentProject.cast.singers.forEach((singer, index) => {
            const tag = document.createElement('div');
            tag.className = 'singer-tag';
            tag.innerHTML = `
                ${singer.name} (₹${singer.fee} Cr)
                <button class="remove-singer" onclick="removeSinger(${index})">×</button>
            `;
            container.appendChild(tag);
        });
    }
}

function removeSinger(index) {
    gameState.currentProject.cast.singers.splice(index, 1);
    updateSelectedSingers();
    updateCrewBudget();
}

function updateCrewBudget() {
    const breakdown = document.getElementById('crewBudgetBreakdown');
    const totalElement = document.getElementById('totalCrewCost');
    
    let total = 0;
    let html = '<div class="budget-items">';
    
    const cast = gameState.currentProject.cast;
    
    if (cast.director) {
        html += `<div class="budget-item">Director: ₹${cast.director.fee} Cr</div>`;
        total += cast.director.fee;
    }
    
    if (cast.leadActor) {
        html += `<div class="budget-item">Lead Actor: ₹${cast.leadActor.fee} Cr</div>`;
        total += cast.leadActor.fee;
    }
    
    if (cast.leadActress) {
        html += `<div class="budget-item">Lead Actress: ₹${cast.leadActress.fee} Cr</div>`;
        total += cast.leadActress.fee;
    }
    
    if (cast.supportingCast && cast.supportingCast.length > 0) {
        const supportingTotal = cast.supportingCast.reduce((sum, actor) => sum + (actor ? actor.fee : 0), 0);
        if (supportingTotal > 0) {
            html += `<div class="budget-item">Supporting Cast: ₹${supportingTotal} Cr</div>`;
            total += supportingTotal;
        }
    }
    
    if (cast.musicDirector) {
        html += `<div class="budget-item">Music Director: ₹${cast.musicDirector.fee} Cr</div>`;
        total += cast.musicDirector.fee;
    }
    
    if (cast.singers && cast.singers.length > 0) {
        const singersTotal = cast.singers.reduce((sum, singer) => sum + singer.fee, 0);
        html += `<div class="budget-item">Playback Singers: ₹${singersTotal} Cr</div>`;
        total += singersTotal;
    }
    
    if (cast.lyricist) {
        html += `<div class="budget-item">Lyricist: ₹${cast.lyricist.fee} Cr</div>`;
        total += cast.lyricist.fee;
    }
    
    html += '</div>';
    breakdown.innerHTML = html;
    totalElement.textContent = total.toFixed(1);
    
    gameState.currentProject.budget.cast = total;
}

function finalizeCrewAndStartProduction() {
    // Validate crew selection
    if (!validateCrewSelection()) {
        return;
    }
    
    const totalCost = gameState.currentProject.budget.cast;
    
    if (gameState.player.budget < totalCost) {
        showEvent({
            title: "Insufficient Budget",
            description: `You need ₹${totalCost} Cr for crew but only have ₹${gameState.player.budget} Cr.`,
            type: "error"
        });
        return;
    }
    
    // Deduct money
    gameState.player.budget -= totalCost;
    
    // Move to production stage
    gameState.currentProject.stage = 'production';
    showStage('production');
    
    updateStats();
    
    showEvent({
        title: "Crew Finalized!",
        description: `Your dream team is assembled. Production begins now!`,
        type: "success"
    });
}

function validateCrewSelection() {
    const cast = gameState.currentProject.cast;
    
    if (!cast.director) {
        showEvent({
            title: "Missing Director",
            description: "Please select a director for your project.",
            type: "error"
        });
        return false;
    }
    
    if (!cast.leadActor) {
        showEvent({
            title: "Missing Lead Actor",
            description: "Please select a lead actor for your project.",
            type: "error"
        });
        return false;
    }
    
    if (!cast.leadActress) {
        showEvent({
            title: "Missing Lead Actress",
            description: "Please select a lead actress for your project.",
            type: "error"
        });
        return false;
    }
    
    return true;
}

// Production Stage Implementation
function initializeProductionStage() {
    startProductionSimulation();
}

function startProductionSimulation() {
    const projectType = projectTypes[gameState.currentProject.type];
    const productionWeeks = projectType.productionWeeks;
    
    gameState.currentProject.timeline.productionStart = { ...gameState.gameTime };
    
    // Simulate production progress
    simulateProductionProgress(productionWeeks);
}

function simulateProductionProgress(totalWeeks) {
    let currentWeek = 0;
    const progressBar = document.getElementById('productionProgressBar');
    const progressText = document.getElementById('productionProgressText');
    const weeksCompleted = document.getElementById('productionWeeksCompleted');
    
    const interval = setInterval(() => {
        currentWeek++;
        const progress = Math.min(100, (currentWeek / totalWeeks) * 100);
        
        progressBar.style.width = progress + '%';
        progressText.textContent = Math.round(progress) + '%';
        weeksCompleted.textContent = currentWeek;
        
        // Random production events
        if (Math.random() < 0.2) {
            triggerProductionEvent();
        }
        
        if (currentWeek >= totalWeeks) {
            clearInterval(interval);
            completeProduction();
        }
        
        advanceTime(1);
        updateTimeDisplay();
        
    }, 1000); // 1 second per week for demo, adjust as needed
}

function triggerProductionEvent() {
    const events = [
        {
            title: "Weather Delays",
            description: "Monsoon rains have delayed outdoor shooting by a few days.",
            impact: { budget: -2, schedule: -1, quality: 0 },
            type: "negative"
        },
        {
            title: "Outstanding Performance",
            description: "Your lead actor delivered an exceptional scene that's getting early buzz!",
            impact: { budget: 0, schedule: 0, quality: 5 },
            type: "positive"
        },
        {
            title: "Technical Issues",
            description: "Camera equipment malfunction caused some delays in shooting.",
            impact: { budget: -1, schedule: -2, quality: -1 },
            type: "negative"
        },
        {
            title: "Viral Song Recording",
            description: "The music recording session went exceptionally well. This could be a chartbuster!",
            impact: { budget: 0, schedule: 1, quality: 8 },
            type: "positive"
        },
        {
            title: "Location Permission Issues",
            description: "Had to change shooting location due to permit issues.",
            impact: { budget: -3, schedule: -2, quality: -2 },
            type: "negative"
        }
    ];
    
    const event = events[Math.floor(Math.random() * events.length)];
    gameState.currentProject.events.push(event);
    
    // Apply event effects
    if (event.impact.budget) {
        gameState.player.budget += event.impact.budget;
    }
    
    showEvent(event);
}

function completeProduction() {
    gameState.currentProject.timeline.productionEnd = { ...gameState.gameTime };
    
    // Calculate production quality
    calculateProductionQuality();
    
    // Update production health
    updateProductionHealth();
    
    showEvent({
        title: "Production Wrap!",
        description: "Filming is complete! Time to plan your marketing strategy.",
        type: "success"
    });
    
    // Move to marketing stage
    gameState.currentProject.stage = 'marketing';
}

function calculateProductionQuality() {
    const cast = gameState.currentProject.cast;
    let quality = 0;
    
    // Director influence
    const genreMatch = cast.director.specialty === gameState.currentProject.genre ? 1.2 : 1.0;
    quality += (cast.director.reputation * genreMatch) / 100;
    
    // Cast influence
    quality += (cast.leadActor.popularity * 0.3) / 100;
    quality += (cast.leadActress.popularity * 0.3) / 100;
    
    // Supporting cast
    if (cast.supportingCast) {
        const supportingAvg = cast.supportingCast.reduce((sum, actor) => sum + (actor ? actor.skill : 0), 0) / cast.supportingCast.length;
        quality += (supportingAvg * 0.2) / 100;
    }
    
    // Music quality
    if (cast.musicDirector) {
        const musicGenreMatch = cast.musicDirector.specialty === 'all' || 
                                cast.musicDirector.specialty === gameState.currentProject.genre ? 1.2 : 1.0;
        quality += (cast.musicDirector.reputation * musicGenreMatch * 0.4) / 100;
    }
    
    // Random events impact
    const eventImpact = gameState.currentProject.events.reduce((sum, event) => sum + (event.impact.quality || 0), 0);
    quality += eventImpact / 100;
    
    // Random factor
    quality += (Math.random() * 0.2) - 0.1;
    
    gameState.currentProject.quality.production = Math.max(0, Math.min(1, quality));
}

function updateProductionHealth() {
    // Update health indicators based on current status
    document.getElementById('budgetHealth').textContent = gameState.player.budget > 50 ? "On Track" : "Tight";
    document.getElementById('scheduleHealth').textContent = "On Time";
    document.getElementById('moraleHealth').textContent = "Good";
    document.getElementById('qualityScore').textContent = Math.round(gameState.currentProject.quality.production * 100) + "%";
    
    // Apply CSS classes based on health
    const budgetHealth = document.getElementById('budgetHealth');
    budgetHealth.className = 'health-value ' + (gameState.player.budget > 50 ? 'good' : 'warning');
}

function skipToPostProduction() {
    // Skip the production animation and go directly to marketing
    gameState.currentProject.stage = 'marketing';
    showStage('marketing');
}

// Marketing Stage Implementation
function initializeMarketingStage() {
    setupMarketingChannels();
    updateMarketingBudget();
}

function setupMarketingChannels() {
    // Marketing channels are already in HTML, just need to setup event listeners
    const marketingOptions = document.querySelectorAll('.marketing-option input[type="checkbox"]');
    marketingOptions.forEach(option => {
        option.addEventListener('change', updateMarketingBudget);
    });
    
    const regionOptions = document.querySelectorAll('.region-option input[type="checkbox"]');
    regionOptions.forEach(option => {
        option.addEventListener('change', updateMarketingBudget);
    });
}

function updateMarketingBudget() {
    const budgetSlider = document.getElementById('marketingBudgetRange');
    const budgetValue = document.getElementById('marketingBudgetValue');
    const awarenessLevel = document.getElementById('awarenessLevel');
    
    const budget = parseInt(budgetSlider.value);
    budgetValue.textContent = budget;
    
    // Calculate awareness level based on budget
    let awarenessText = "Low";
    if (budget >= 40) awarenessText = "Very High";
    else if (budget >= 30) awarenessText = "High";
    else if (budget >= 20) awarenessText = "Medium";
    else if (budget >= 15) awarenessText = "Fair";
    
    awarenessLevel.textContent = awarenessText;
    
    gameState.currentProject.marketing.budget = budget;
}

function launchMarketing() {
    // Collect selected marketing channels
    const selectedChannels = [];
    const marketingOptions = document.querySelectorAll('.marketing-option input[type="checkbox"]:checked');
    marketingOptions.forEach(option => {
        selectedChannels.push(option.value);
    });
    
    // Collect selected regions
    const selectedRegions = [];
    const regionOptions = document.querySelectorAll('.region-option input[type="checkbox"]:checked');
    regionOptions.forEach(option => {
        selectedRegions.push(option.value);
    });
    
    if (selectedChannels.length === 0) {
        showEvent({
            title: "No Marketing Channels Selected",
            description: "Please select at least one marketing channel.",
            type: "error"
        });
        return;
    }
    
    if (selectedRegions.length === 0) {
        showEvent({
            title: "No Regions Selected",
            description: "Please select at least one release region.",
            type: "error"
        });
        return;
    }
    
    const marketingBudget = gameState.currentProject.marketing.budget;
    
    if (gameState.player.budget < marketingBudget) {
        showEvent({
            title: "Insufficient Budget",
            description: `You need ₹${marketingBudget} Cr for marketing but only have ₹${gameState.player.budget} Cr.`,
            type: "error"
        });
        return;
    }
    
    // Deduct marketing budget
    gameState.player.budget -= marketingBudget;
    gameState.currentProject.budget.marketing = marketingBudget;
    
    // Store marketing choices
    gameState.currentProject.marketing.channels = selectedChannels;
    gameState.currentProject.marketing.regions = selectedRegions;
    
    // Calculate marketing quality
    const channelMultiplier = selectedChannels.length * 0.15 + 0.4;
    const budgetMultiplier = (marketingBudget / 50) * 0.6 + 0.4;
    gameState.currentProject.quality.marketing = Math.min(1, channelMultiplier * budgetMultiplier);
    
    updateStats();
    
    showEvent({
        title: "Marketing Campaign Launched!",
        description: "Your promotional campaign is creating buzz across the industry!",
        type: "success"
    });
    
    // Move to distribution stage
    gameState.currentProject.stage = 'distribution';
    showStage('distribution');
}

// Distribution Stage Implementation
function initializeDistributionStage() {
    populateDistributors();
    updateDistributionCosts();
}

function populateDistributors() {
    const distributorList = document.getElementById('distributorList');
    distributorList.innerHTML = '';
    
    industryData.distributors.forEach(distributor => {
        const item = document.createElement('div');
        item.className = 'distributor-item';
        item.dataset.id = distributor.id;
        
        item.innerHTML = `
            <div class="distributor-name">${distributor.name}</div>
            <div class="distributor-details">${distributor.description}</div>
            <div class="distributor-stats">
                <span class="distributor-fee">${distributor.fee}% share</span>
                <span class="distributor-reach">${distributor.reach}% reach</span>
            </div>
        `;
        
        item.addEventListener('click', () => selectDistributor(distributor, item));
        distributorList.appendChild(item);
    });
}

function selectDistributor(distributor, itemElement) {
    // Clear previous selections
    document.querySelectorAll('.distributor-item').forEach(item => {
        item.classList.remove('selected');
    });
    
    // Select current distributor
    itemElement.classList.add('selected');
    gameState.currentProject.distribution.partner = distributor;
    
    updateDistributionCosts();
}

function updateDistributionCosts() {
    const breakdown = document.getElementById('distributionCostBreakdown');
    
    if (!gameState.currentProject.distribution.partner) {
        breakdown.innerHTML = '<p>Please select a distribution partner to see cost breakdown.</p>';
        return;
    }
    
    const distributor = gameState.currentProject.distribution.partner;
    const releaseScale = document.querySelector('input[name="releaseScale"]:checked')?.value || 'wide';
    
    let baseCost = 0;
    let screenCount = 0;
    
    switch (releaseScale) {
        case 'limited':
            baseCost = 8;
            screenCount = '500-1000';
            break;
        case 'wide':
            baseCost = 15;
            screenCount = '2000-3500';
            break;
        case 'mega':
            baseCost = 25;
            screenCount = '4000+';
            break;
    }
    
    const distributorFee = Math.round(baseCost * (distributor.fee / 100));
    const totalCost = baseCost + distributorFee;
    
    breakdown.innerHTML = `
        <div class="cost-item">Base Distribution Cost: ₹${baseCost} Cr</div>
        <div class="cost-item">Distributor Fee (${distributor.fee}%): ₹${distributorFee} Cr</div>
        <div class="cost-item">Screen Count: ${screenCount} screens</div>
        <div class="cost-item total">Total Distribution Cost: ₹${totalCost} Cr</div>
    `;
    
    gameState.currentProject.budget.distribution = totalCost;
}

function finalizeDistribution() {
    if (!gameState.currentProject.distribution.partner) {
        showEvent({
            title: "No Distributor Selected",
            description: "Please select a distribution partner.",
            type: "error"
        });
        return;
    }
    
    const releaseScale = document.querySelector('input[name="releaseScale"]:checked')?.value;
    const ottTiming = document.querySelector('input[name="ottTiming"]:checked')?.value;
    
    if (!releaseScale || !ottTiming) {
        showEvent({
            title: "Release Strategy Incomplete",
            description: "Please select both theater and OTT release strategies.",
            type: "error"
        });
        return;
    }
    
    const distributionCost = gameState.currentProject.budget.distribution;
    
    if (gameState.player.budget < distributionCost) {
        showEvent({
            title: "Insufficient Budget",
            description: `You need ₹${distributionCost} Cr for distribution but only have ₹${gameState.player.budget} Cr.`,
            type: "error"
        });
        return;
    }
    
    // Deduct distribution cost
    gameState.player.budget -= distributionCost;
    
    // Store distribution choices
    gameState.currentProject.distribution.strategy = {
        releaseScale: releaseScale,
        ottTiming: ottTiming
    };
    
    updateStats();
    
    showEvent({
        title: "Distribution Deal Finalized!",
        description: "Your movie is set for release. Time to choose the perfect date!",
        type: "success"
    });
    
    // Move to release stage
    gameState.currentProject.stage = 'release';
    showStage('release');
}

// Release Stage Implementation
function initializeReleaseStage() {
    generateReleaseCalendar();
    calculatePreReleaseSummary();
}

function generateReleaseCalendar() {
    const calendarGrid = document.getElementById('calendarGrid');
    const calendarMonth = document.getElementById('calendarMonth');
    
    const currentDate = new Date(gameState.gameTime.year, gameState.gameTime.month - 1, 1);
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    
    calendarMonth.textContent = `${gameState.gameTime.monthNames[month]} ${year}`;
    
    // Clear calendar
    calendarGrid.innerHTML = '';
    
    // Get first day of month and number of days
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    
    // Add empty cells for days before month starts
    for (let i = 0; i < firstDay; i++) {
        const emptyCell = document.createElement('div');
        emptyCell.className = 'calendar-day empty';
        calendarGrid.appendChild(emptyCell);
    }
    
    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
        const dayCell = document.createElement('div');
        dayCell.className = 'calendar-day';
        dayCell.textContent = day;
        dayCell.dataset.date = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        
        // Check for festivals
        const dateStr = dayCell.dataset.date;
        const festival = festivalDates[year]?.find(f => f.date === dateStr);
        if (festival) {
            dayCell.classList.add('festival');
            dayCell.title = festival.name;
        }
        
        // Check for competition
        if (competitionCalendar[dateStr]) {
            dayCell.classList.add('competition');
        }
        
        // Check for optimal dates (low competition, non-festival)
        if (!festival && !competitionCalendar[dateStr] && day % 7 === 5) { // Fridays with no competition
            dayCell.classList.add('optimal');
        }
        
        dayCell.addEventListener('click', () => selectReleaseDate(dateStr, dayCell));
        calendarGrid.appendChild(dayCell);
    }
}

function changeCalendarMonth(direction) {
    gameState.gameTime.month += direction;
    
    if (gameState.gameTime.month > 12) {
        gameState.gameTime.month = 1;
        gameState.gameTime.year++;
    } else if (gameState.gameTime.month < 1) {
        gameState.gameTime.month = 12;
        gameState.gameTime.year--;
    }
    
    generateReleaseCalendar();
}

function selectReleaseDate(dateStr, dayCell) {
    // Clear previous selection
    document.querySelectorAll('.calendar-day').forEach(cell => {
        cell.classList.remove('selected');
    });
    
    // Select current date
    dayCell.classList.add('selected');
    gameState.currentProject.timeline.releaseDate = dateStr;
    
    // Show date details
    showDateDetails(dateStr);
}

function showDateDetails(dateStr) {
    const detailsElement = document.getElementById('selectedDateDetails');
    detailsElement.classList.remove('hidden');
    
    const date = new Date(dateStr);
    const festival = festivalDates[gameState.gameTime.year]?.find(f => f.date === dateStr);
    const competition = competitionCalendar[dateStr];
    
    let competitionLevel = "Low";
    let competitionClass = "competition-low";
    
    if (competition && competition.length > 0) {
        competitionLevel = competition.length > 2 ? "High" : "Medium";
        competitionClass = competition.length > 2 ? "competition-high" : "competition-medium";
    }
    
    if (festival) {
        competitionLevel = "Very High";
        competitionClass = "competition-high";
    }
    
    let html = `
        <h4>Release Date: ${date.toLocaleDateString('en-IN', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        })}</h4>
        <div class="date-info">
            Competition Level: <span class="${competitionClass}">${competitionLevel}</span>
        </div>
    `;
    
    if (festival) {
        html += `<div class="date-info">🎉 <strong>${festival.name}</strong> - Increased audience but high competition</div>`;
    }
    
    if (competition && competition.length > 0) {
        html += '<div class="date-info"><strong>Competing Releases:</strong></div>';
        competition.forEach(movie => {
            html += `<div class="date-info">• ${movie.title} (${movie.genre})</div>`;
        });
    }
    
    if (!festival && !competition) {
        html += '<div class="date-info">✅ Clear date with minimal competition</div>';
    }
    
    detailsElement.innerHTML = html;
}

function calculatePreReleaseSummary() {
    const project = gameState.currentProject;
    
    // Production Quality
    const productionQuality = Math.round(project.quality.production * 100);
    document.getElementById('productionQuality').textContent = `${productionQuality}%`;
    
    // Star Power Index
    const starPower = Math.round((project.cast.leadActor.popularity + project.cast.leadActress.popularity) / 2);
    document.getElementById('starPowerIndex').textContent = `${starPower}%`;
    
    // Market Buzz
    const marketBuzz = Math.round(project.quality.marketing * 100);
    document.getElementById('marketBuzz').textContent = `${marketBuzz}%`;
    
    // Total Investment
    const totalInvestment = project.budget.script + project.budget.cast + 
                          project.budget.marketing + project.budget.distribution;
    document.getElementById('totalInvestment').textContent = `₹${totalInvestment} Cr`;
    
    project.budget.total = totalInvestment;
}

function confirmRelease() {
    if (!gameState.currentProject.timeline.releaseDate) {
        showEvent({
            title: "No Release Date Selected",
            description: "Please select a release date from the calendar.",
            type: "error"
        });
        return;
    }
    
    showLoadingScreen("Calculating box office results...", "The industry awaits your movie's fate");
    
    // Simulate box office calculation
    setTimeout(() => {
        calculateBoxOfficeResults();
        hideLoadingScreen();
        showStage('results');
    }, 3000);
}

// Results Stage Implementation
function calculateBoxOfficeResults() {
    const project = gameState.currentProject;
    
    // Base score calculation
    let baseScore = 50; // Starting baseline
    
    // Script quality impact (20%)
    baseScore += project.quality.script * 20;
    
    // Production quality impact (25%)
    baseScore += project.quality.production * 25;
    
    // Cast popularity impact (20%)
    const castScore = (project.cast.leadActor.popularity + 
                      project.cast.leadActress.popularity + 
                      project.cast.director.reputation) / 3;
    baseScore += (castScore / 100) * 20;
    
    // Marketing impact (15%)
    baseScore += project.quality.marketing * 15;
    
    // Genre matching bonuses (10%)
    let genreBonus = 0;
    if (project.cast.director.specialty === project.genre) genreBonus += 3;
    if (project.cast.leadActor.specialty === project.genre) genreBonus += 2;
    if (project.cast.leadActress.specialty === project.genre) genreBonus += 2;
    if (project.cast.musicDirector && project.cast.musicDirector.specialty === project.genre) genreBonus += 3;
    baseScore += genreBonus;
    
    // Release date impact (10%)
    const releaseDate = project.timeline.releaseDate;
    const festival = festivalDates[gameState.gameTime.year]?.find(f => f.date === releaseDate);
    const competition = competitionCalendar[releaseDate];
    
    if (festival) {
        baseScore += 8; // Festival bonus
        baseScore -= (competition?.length || 0) * 3; // Competition penalty
    } else if (competition && competition.length > 0) {
        baseScore -= competition.length * 2;
    } else {
        baseScore += 5; // Clear date bonus
    }
    
    // Random events impact
    const eventImpact = project.events.reduce((sum, event) => {
        return sum + (event.impact.quality || 0);
    }, 0);
    baseScore += eventImpact;
    
    // Random factor (±10)
    baseScore += (Math.random() * 20) - 10;
    
    // Ensure score is within bounds
    baseScore = Math.max(0, Math.min(100, baseScore));
    
    // Calculate financial results
    const budget = project.budget.total;
    const projectTypeMultiplier = projectTypes[project.type].revenueMultiplier;
    
    // Opening weekend (based on marketing and star power)
    const openingMultiplier = (project.quality.marketing + (castScore / 100)) / 2;
    const openingWeekend = budget * 0.2 * openingMultiplier * projectTypeMultiplier;
    
    // Total domestic collection
    const sustainabilityFactor = baseScore / 100;
    const domesticTotal = openingWeekend * (2 + sustainabilityFactor * 8);
    
    // Overseas collection (depends on star power and marketing regions)
    let overseasTotal = 0;
    if (project.marketing.regions.includes('overseas')) {
        overseasTotal = domesticTotal * 0.3 * (castScore / 100);
    }
    if (project.marketing.regions.includes('international')) {
        overseasTotal += domesticTotal * 0.15;
    }
    
    // OTT revenue
    const ottMultiplier = project.distribution.strategy.ottTiming === 'simultaneous' ? 1.5 : 1.0;
    const ottRevenue = budget * 0.25 * ottMultiplier;
    
    // Calculate total revenue and profit
    const totalRevenue = domesticTotal + overseasTotal + ottRevenue;
    const netResult = totalRevenue - budget;
    
    // Determine verdict
    let verdict = "Flop";
    let verdictClass = "flop";
    
    if (netResult > budget * 1.5) {
        verdict = "Blockbuster";
        verdictClass = "blockbuster";
    } else if (netResult > budget * 0.5) {
        verdict = "Hit";
        verdictClass = "hit";
    } else if (netResult > 0) {
        verdict = "Average";
        verdictClass = "average";
    }
    
    // Calculate performance metrics
    const audienceRating = Math.round(baseScore / 10);
    const criticsScore = Math.round(project.quality.script * 100);
    const musicSuccess = project.cast.musicDirector ? 
        (project.cast.musicDirector.hitRate > 0.8 ? "Superhit" : 
         project.cast.musicDirector.hitRate > 0.6 ? "Hit" : "Average") : "No Music";
    const weeksInTop10 = Math.max(1, Math.round(sustainabilityFactor * 8));
    
    // Store results
    project.results = {
        verdict: verdict,
        verdictClass: verdictClass,
        openingWeekend: Math.round(openingWeekend),
        domesticTotal: Math.round(domesticTotal),
        overseasTotal: Math.round(overseasTotal),
        ottRevenue: Math.round(ottRevenue),
        totalRevenue: Math.round(totalRevenue),
        netResult: Math.round(netResult),
        audienceRating: audienceRating,
        criticsScore: criticsScore,
        musicSuccess: musicSuccess,
        weeksInTop10: weeksInTop10,
        baseScore: Math.round(baseScore)
    };
    
    // Update player stats
    gameState.player.budget += totalRevenue;
    
    if (verdict === "Blockbuster" || verdict === "Hit") {
        gameState.player.reputation = Math.min(100, gameState.player.reputation + (verdict === "Blockbuster" ? 15 : 10));
        gameState.projectsCompleted++;
        
        // Update cast reputation
        updateCastReputation(true);
    } else {
        gameState.player.reputation = Math.max(0, gameState.player.reputation - (verdict === "Flop" ? 8 : 3));
        updateCastReputation(false);
    }
    
    // Calculate success rate
    gameState.player.successRate = Math.round((gameState.projectsCompleted / gameState.totalProjects) * 100);
    
    // Add to portfolio
    gameState.portfolio.push(project);
    
    // Display results
    displayBoxOfficeResults();
    
    // Generate awards if applicable
    generateAwards();
    
    // Update industry impact
    updateIndustryImpact();
    
    updateStats();
}

function displayBoxOfficeResults() {
    const project = gameState.currentProject;
    const results = project.results;
    
    // Update title and verdict
    document.getElementById('projectResultTitle').textContent = 
        `"${project.title}" - ${results.verdict}`;
    
    const verdictElement = document.getElementById('overallVerdict');
    verdictElement.textContent = results.verdict;
    verdictElement.className = `verdict-status ${results.verdictClass}`;
    
    // Update financial breakdown
    document.getElementById('totalInvestmentResult').textContent = `₹${project.budget.total} Cr`;
    document.getElementById('openingWeekend').textContent = `₹${results.openingWeekend} Cr`;
    document.getElementById('domesticTotal').textContent = `₹${results.domesticTotal} Cr`;
    document.getElementById('overseasTotal').textContent = `₹${results.overseasTotal} Cr`;
    document.getElementById('ottRevenue').textContent = `₹${results.ottRevenue} Cr`;
    
    const netElement = document.getElementById('netProfitLoss');
    netElement.textContent = `₹${Math.abs(results.netResult)} Cr`;
    netElement.className = `financial-value ${results.netResult >= 0 ? 'profit' : 'loss'}`;
    
    // Update performance metrics
    document.getElementById('audienceRating').textContent = `${results.audienceRating}/10`;
    document.getElementById('criticsScore').textContent = `${results.criticsScore}%`;
    document.getElementById('musicSuccess').textContent = results.musicSuccess;
    document.getElementById('weeksInTop10').textContent = results.weeksInTop10;
}

function updateCastReputation(success) {
    const adjustmentFactor = success ? 2 : -1;
    
    // Update actor/actress market values based on success
    const leadActor = gameState.currentProject.cast.leadActor;
    const leadActress = gameState.currentProject.cast.leadActress;
    const director = gameState.currentProject.cast.director;
    
    // In a real implementation, you'd update the global data
    // For now, we'll just track it in the game state
}

function generateAwards() {
    const project = gameState.currentProject;
    const results = project.results;
    const awards = [];
    
    if (results.verdict === "Blockbuster") {
        awards.push("🏆 Best Film Award");
        if (results.criticsScore > 90) {
            awards.push("🎭 Critics Choice Award");
        }
    }
    
    if (results.audienceRating >= 9) {
        awards.push("❤️ Audience Favorite Award");
    }
    
    if (results.musicSuccess === "Superhit") {
        awards.push("🎵 Best Music Award");
    }
    
    if (project.cast.director.reputation > 95 && results.verdict !== "Flop") {
        awards.push("🎬 Best Director Award");
    }
    
    // Display awards
    const awardsContainer = document.getElementById('awardsResults');
    if (awards.length > 0) {
        awardsContainer.innerHTML = awards.map(award => 
            `<div class="award-item">${award}</div>`
        ).join('');
        gameState.player.awards += awards.length;
    } else {
        awardsContainer.innerHTML = '<p>No awards this time. Keep making great movies!</p>';
    }
}

function updateIndustryImpact() {
    const project = gameState.currentProject;
    const results = project.results;
    const impacts = [];
    
    if (results.verdict === "Blockbuster") {
        impacts.push("📈 Your reputation in the industry has significantly increased");
        impacts.push("🌟 Top talent is now eager to work with you");
    } else if (results.verdict === "Hit") {
        impacts.push("✅ Solid performance strengthens your market position");
        impacts.push("🤝 More production opportunities are opening up");
    } else if (results.verdict === "Average") {
        impacts.push("😐 Mixed reception, but you maintain your current standing");
        impacts.push("💼 Continue building relationships for future projects");
    } else {
        impacts.push("📉 The failure has impacted your industry reputation");
        impacts.push("⚠️ You'll need to be more careful with future projects");
    }
    
    // Display industry impact
    const impactContainer = document.getElementById('industryImpactResults');
    impactContainer.innerHTML = impacts.map(impact => 
        `<div class="impact-item">${impact}</div>`
    ).join('');
}

// Utility Functions
function updateStats() {
    elements.playerBudget.textContent = `₹${gameState.player.budget} Cr`;
    elements.playerReputation.textContent = `${gameState.player.reputation}%`;
    elements.projectsCount.textContent = gameState.totalProjects;
    elements.successRate.textContent = `${gameState.player.successRate}%`;
}

function updateTimeDisplay() {
    elements.currentWeek.textContent = `Week ${gameState.gameTime.week}`;
    elements.currentMonth.textContent = 
        `${gameState.gameTime.monthNames[gameState.gameTime.month - 1]} ${gameState.gameTime.year}`;
}

function advanceTime(weeks) {
    gameState.gameTime.week += weeks;
    
    while (gameState.gameTime.week > 4) {
        gameState.gameTime.week -= 4;
        gameState.gameTime.month++;
        
        if (gameState.gameTime.month > 12) {
            gameState.gameTime.month = 1;
            gameState.gameTime.year++;
        }
    }
    
    // Autosave periodically
    if (gameState.autosaveEnabled && Math.random() < 0.1) {
        saveGame();
    }
}

function showProjectStatus() {
    elements.currentProjectStatus.classList.remove('hidden');
    elements.currentProjectTitle.textContent = gameState.currentProject.title || "New Project";
    updateProjectProgress(gameState.currentProject.stage);
}

function updateProjectProgress(currentStage) {
    const stages = ['script', 'crew', 'production', 'marketing', 'distribution', 'release'];
    const stageElements = document.querySelectorAll('.stage');
    
    stages.forEach((stage, index) => {
        const element = document.querySelector(`.stage[data-stage="${stage}"]`);
        if (element) {
            element.classList.remove('active', 'completed');
            
            const currentIndex = stages.indexOf(currentStage);
            if (index < currentIndex) {
                element.classList.add('completed');
                element.querySelector('.stage-status').textContent = 'Completed';
            } else if (index === currentIndex) {
                element.classList.add('active');
                element.querySelector('.stage-status').textContent = 'In Progress';
            } else {
                element.querySelector('.stage-status').textContent = 'Locked';
            }
        }
    });
}

function continueCurrentProject() {
    if (gameState.currentProject) {
        showStage(gameState.currentProject.stage);
    }
}

function cancelProject() {
    gameState.currentProject = null;
    showSection('dashboard');
    elements.currentProjectStatus.classList.add('hidden');
}

// Event System
function showEvent(event) {
    elements.eventNotification.classList.remove('hidden');
    document.getElementById('eventTitle').textContent = event.title;
    document.getElementById('eventDescription').textContent = event.description;
    
    // Store current event for handling
    gameState.currentEvent = event;
}

function handleEvent() {
    // Handle specific event logic here
    dismissEvent();
}

function dismissEvent() {
    elements.eventNotification.classList.add('hidden');
    gameState.currentEvent = null;
}

function showLoadingScreen(title, subtitle) {
    elements.loadingScreen.classList.remove('hidden');
    document.getElementById('loadingText').textContent = title;
    document.getElementById('loadingSubtext').textContent = subtitle;
}

function hideLoadingScreen() {
    elements.loadingScreen.classList.add('hidden');
}

// Industry News and Competition
function generateIndustryNews() {
    const newsTemplates = [
        "📈 OTT platforms are increasing their content acquisition budgets",
        "🎬 Regional cinema is gaining more mainstream recognition", 
        "🌟 International co-productions are trending this season",
        "💰 Production costs are rising due to inflation",
        "🎵 Music streaming revenues are boosting film soundtracks",
        "📱 Social media marketing is becoming crucial for success",
        "🏆 Award season brings focus to content-driven films",
        "🎭 Theater chains are expanding in tier-2 cities",
        "🔥 Celebrity endorsements are driving marketing costs up",
        "📺 Web series format is attracting A-list talent"
    ];
    
    gameState.industryNews = newsTemplates.map((news, index) => ({
        id: index,
        headline: news,
        date: `${gameState.gameTime.monthNames[gameState.gameTime.month - 1]} ${gameState.gameTime.year}`,
        impact: Math.random() > 0.5 ? 'positive' : 'neutral'
    }));
}

function showIndustryNews() {
    const newsList = document.getElementById('newsList');
    newsList.innerHTML = '';
    
    gameState.industryNews.forEach(news => {
        const newsItem = document.createElement('div');
        newsItem.className = 'news-item';
        newsItem.innerHTML = `
            <div class="news-headline">${news.headline}</div>
            <div class="news-date">${news.date}</div>
            <div class="news-impact ${news.impact}">${news.impact.toUpperCase()}</div>
        `;
        newsList.appendChild(newsItem);
    });
    
    elements.newsPanel.classList.remove('hidden');
}

function generateCompetition() {
    const competitorTitles = [
        "Dilwale Returns", "Action Hero 3", "Romance Reloaded", "Comedy Nights",
        "Thriller Zone", "Family Drama", "Historical Epic", "Sci-Fi Adventure",
        "Musical Bonanza", "Crime Story", "Love Triangle", "Superhero Origins"
    ];
    
    const genres = ["action", "romance", "comedy", "drama", "thriller", "family"];
    
    // Generate competition for the next 12 months
    for (let month = 0; month < 12; month++) {
        const date = new Date(gameState.gameTime.year, gameState.gameTime.month - 1 + month, 
                              Math.floor(Math.random() * 28) + 1);
        const dateStr = date.toISOString().split('T')[0];
        
        if (!competitionCalendar[dateStr]) {
            competitionCalendar[dateStr] = [];
        }
        
        // 30% chance of competition on any given date
        if (Math.random() < 0.3) {
            const title = competitorTitles[Math.floor(Math.random() * competitorTitles.length)];
            const genre = genres[Math.floor(Math.random() * genres.length)];
            
            competitionCalendar[dateStr].push({
                title: title,
                genre: genre,
                studio: "Rival Studio"
            });
        }
    }
}

function showPortfolio() {
    if (gameState.portfolio.length === 0) {
        showEvent({
            title: "Empty Portfolio",
            description: "You haven't completed any projects yet. Time to start creating!",
            type: "info"
        });
        return;
    }
    
    let portfolioHTML = '<div class="portfolio-overview"><h3>Your Portfolio</h3>';
    
    gameState.portfolio.forEach(project => {
        const results = project.results;
        portfolioHTML += `
            <div class="portfolio-project ${results.verdictClass}">
                <h4>"${project.title}" (${results.verdict})</h4>
                <p><strong>Genre:</strong> ${project.genre} | <strong>Type:</strong> ${projectTypes[project.type].name}</p>
                <p><strong>Investment:</strong> ₹${project.budget.total} Cr | <strong>Returns:</strong> ₹${results.totalRevenue} Cr</p>
                <p><strong>Profit/Loss:</strong> ₹${results.netResult} Cr | <strong>Rating:</strong> ${results.audienceRating}/10</p>
                <div class="project-cast">
                    <small><strong>Cast:</strong> ${project.cast.leadActor.name}, ${project.cast.leadActress.name} | <strong>Director:</strong> ${project.cast.director.name}</small>
                </div>
            </div>
        `;
    });
    
    portfolioHTML += '</div>';
    
    elements.resultsContent = elements.resultsContent || document.getElementById('resultsContent');
    elements.resultsContent.innerHTML = portfolioHTML;
    elements.resultsPanel.classList.remove('hidden');
}

// Save/Load Functions
function loadGameData() {
    // Load any persistent game data
    const savedData = localStorage.getItem('bollywoodCinema_v2_save');
    if (savedData) {
        try {
            const data = JSON.parse(savedData);
            // Validate and merge saved data
            if (data.version === gameState.version) {
                // Show load button
                document.getElementById('loadGameBtn').style.display = 'inline-block';
            }
        } catch (e) {
            console.log("Save data corrupted, starting fresh");
            localStorage.removeItem('bollywoodCinema_v2_save');
        }
    }
}

// PWA Service Worker Registration
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}

// Initialize tooltips and help system
function initializeHelpers() {
    // Add tooltips to complex UI elements
    const tooltips = document.querySelectorAll('[data-tooltip]');
    tooltips.forEach(element => {
        element.addEventListener('mouseenter', showTooltip);
        element.addEventListener('mouseleave', hideTooltip);
    });
}

function showTooltip(e) {
    // Implement tooltip system if needed
}

function hideTooltip(e) {
    // Hide tooltips
}

// Performance monitoring
function trackPerformance() {
    // Track key metrics for game performance
    const performanceMetrics = {
        gameStartTime: Date.now(),
        projectsCompleted: gameState.projectsCompleted,
        sessionDuration: 0
    };
    
    // Save metrics periodically
    setInterval(() => {
        performanceMetrics.sessionDuration = Date.now() - performanceMetrics.gameStartTime;
        localStorage.setItem('bollywood_metrics', JSON.stringify(performanceMetrics));
    }, 60000); // Every minute
}

// Initialize performance tracking
trackPerformance();

console.log("Bollywood Cinema v2.0 initialized successfully!");
