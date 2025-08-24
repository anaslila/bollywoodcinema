// ====================================
// BOLLYWOOD CINEMA v3.0 - PREMIUM SIMULATION
// ====================================

// Game State Management
const GameState = {
    version: "3.0",
    currentScreen: 'dashboard',
    gameTime: {
        week: 1,
        year: 2025,
        totalWeeks: 1
    },
    player: {
        studioName: "Your Studio",
        money: 100,
        reputation: 50,
        totalProjects: 0,
        completedProjects: 0,
        hitMovies: 0,
        totalRevenue: 0,
        totalAwards: 0,
        canBorrow: true,
        debt: 0
    },
    currentProject: null,
    activeProjects: [],
    portfolio: [],
    competitors: [],
    franchises: [],
    awards: [],
    industryNews: [],
    events: [],
    nextCompetitorWeek: 6,
    settings: {
        darkMode: false,
        autoSave: true,
        soundEnabled: true
    }
};

// Industry Database
const IndustryData = {
    writers: [
        { id: 'w1', name: 'Aarav Mehta', fee: 3, skill: 88, speed: 92, specialty: 'romance', avatar: '✍️' },
        { id: 'w2', name: 'Kavita Joshi', fee: 4, skill: 92, speed: 85, specialty: 'drama', avatar: '✍️' },
        { id: 'w3', name: 'Sameer Khan', fee: 2, skill: 78, speed: 95, specialty: 'action', avatar: '✍️' },
        { id: 'w4', name: 'Priya Iyer', fee: 3.5, skill: 85, speed: 88, specialty: 'comedy', avatar: '✍️' },
        { id: 'w5', name: 'Rohit Chawla', fee: 5, skill: 95, speed: 80, specialty: 'thriller', avatar: '✍️' },
        { id: 'w6', name: 'Meera Singh', fee: 2.5, skill: 82, speed: 90, specialty: 'family', avatar: '✍️' },
        { id: 'w7', name: 'Arjun Gupta', fee: 4.5, skill: 90, speed: 82, specialty: 'historical', avatar: '✍️' }
    ],
    
    directors: [
        { id: 'd1', name: 'Rajan Kapoor', fee: 12, reputation: 95, specialty: 'romance', hitRate: 0.88, avatar: '🎯' },
        { id: 'd2', name: 'Neha Deshmukh', fee: 8, reputation: 82, specialty: 'drama', hitRate: 0.75, avatar: '🎯' },
        { id: 'd3', name: 'Arjun Bhatia', fee: 15, reputation: 92, specialty: 'action', hitRate: 0.85, avatar: '🎯' },
        { id: 'd4', name: 'Meera Verma', fee: 10, reputation: 88, specialty: 'comedy', hitRate: 0.80, avatar: '🎯' },
        { id: 'd5', name: 'Kabir Saxena', fee: 18, reputation: 98, specialty: 'thriller', hitRate: 0.92, avatar: '🎯' },
        { id: 'd6', name: 'Anita Sharma', fee: 7, reputation: 78, specialty: 'family', hitRate: 0.70, avatar: '🎯' },
        { id: 'd7', name: 'Vikram Joshi', fee: 20, reputation: 96, specialty: 'historical', hitRate: 0.90, avatar: '🎯' }
    ],
    
    actors: [
        { id: 'a1', name: 'Aamir Khanna', fee: 45, popularity: 95, specialty: 'drama', type: 'male', avatar: '👨' },
        { id: 'a2', name: 'Priya Sharma', fee: 25, popularity: 92, specialty: 'romance', type: 'female', avatar: '👩' },
        { id: 'a3', name: 'Raj Malhotra', fee: 40, popularity: 88, specialty: 'romance', type: 'male', avatar: '👨' },
        { id: 'a4', name: 'Anjali Nair', fee: 20, popularity: 85, specialty: 'drama', type: 'female', avatar: '👩' },
        { id: 'a5', name: 'Dev Kapoor', fee: 50, popularity: 92, specialty: 'action', type: 'male', avatar: '👨' },
        { id: 'a6', name: 'Meera Kapoor', fee: 30, popularity: 90, specialty: 'action', type: 'female', avatar: '👩' },
        { id: 'a7', name: 'Vikram Rathore', fee: 35, popularity: 85, specialty: 'action', type: 'male', avatar: '👨' },
        { id: 'a8', name: 'Radhika Sen', fee: 18, popularity: 82, specialty: 'comedy', type: 'female', avatar: '👩' },
        { id: 'a9', name: 'Aryan Singh', fee: 25, popularity: 78, specialty: 'comedy', type: 'male', avatar: '👨' },
        { id: 'a10', name: 'Sonia Chawla', fee: 15, popularity: 78, specialty: 'family', type: 'female', avatar: '👩' }
    ],
    
    supportingActors: [
        { id: 'sa1', name: 'Ramesh Yadav', fee: 2, skill: 85, specialty: 'comedy', avatar: '🎭' },
        { id: 'sa2', name: 'Kiran Joshi', fee: 3, skill: 88, specialty: 'drama', avatar: '🎭' },
        { id: 'sa3', name: 'Pooja Sharma', fee: 2.5, skill: 82, specialty: 'family', avatar: '🎭' },
        { id: 'sa4', name: 'Akash Verma', fee: 3.5, skill: 90, specialty: 'action', avatar: '🎭' },
        { id: 'sa5', name: 'Simran Kaur', fee: 2, skill: 80, specialty: 'romance', avatar: '🎭' },
        { id: 'sa6', name: 'Manoj Kumar', fee: 4, skill: 92, specialty: 'thriller', avatar: '🎭' },
        { id: 'sa7', name: 'Deepika Roy', fee: 2.8, skill: 86, specialty: 'historical', avatar: '🎭' },
        { id: 'sa8', name: 'Ravi Singh', fee: 1.8, skill: 78, specialty: 'horror', avatar: '🎭' }
    ],
    
    musicProducers: [
        { id: 'mp1', name: 'Aditya Bose', fee: 8, reputation: 92, specialty: 'romantic', hitRate: 0.85, avatar: '🎵' },
        { id: 'mp2', name: 'Rehan Ali', fee: 10, reputation: 95, specialty: 'classical', hitRate: 0.90, avatar: '🎵' },
        { id: 'mp3', name: 'Sunil Sharma', fee: 6, reputation: 82, specialty: 'commercial', hitRate: 0.75, avatar: '🎵' },
        { id: 'mp4', name: 'Ananya Das', fee: 7, reputation: 88, specialty: 'fusion', hitRate: 0.80, avatar: '🎵' },
        { id: 'mp5', name: 'Vishal Khanna', fee: 12, reputation: 96, specialty: 'epic', hitRate: 0.88, avatar: '🎵' }
    ],
    
    playbackSingers: [
        { id: 'ps1', name: 'Alisha Verma', fee: 3, popularity: 88, specialty: 'romantic', avatar: '🎤' },
        { id: 'ps2', name: 'Rohan Das', fee: 2.5, popularity: 85, specialty: 'classical', avatar: '🎤' },
        { id: 'ps3', name: 'Sneha Patel', fee: 4, popularity: 92, specialty: 'dance', avatar: '🎤' },
        { id: 'ps4', name: 'Arjun Mehta', fee: 3.5, popularity: 89, specialty: 'sufi', avatar: '🎤' },
        { id: 'ps5', name: 'Kavita Sharma', fee: 2, popularity: 82, specialty: 'folk', avatar: '🎤' },
        { id: 'ps6', name: 'Amit Kumar', fee: 5, popularity: 95, specialty: 'versatile', avatar: '🎤' }
    ],
    
    lyricists: [
        { id: 'l1', name: 'Manish Sinha', fee: 1.5, skill: 88, specialty: 'romantic', avatar: '📝' },
        { id: 'l2', name: 'Kavya Rao', fee: 2, skill: 92, specialty: 'poetic', avatar: '📝' },
        { id: 'l3', name: 'Deepak Nair', fee: 1.2, skill: 82, specialty: 'commercial', avatar: '📝' },
        { id: 'l4', name: 'Ritu Singh', fee: 1.8, skill: 85, specialty: 'contemporary', avatar: '📝' },
        { id: 'l5', name: 'Ashok Gupta', fee: 2.5, skill: 90, specialty: 'classical', avatar: '📝' }
    ],
    
    distributors: [
        { 
            id: 'dist1', name: 'StarMax Studios', fee: 22, reach: 95, reliability: 92,
            description: 'Premium distributor with nationwide reach and excellent marketing support.',
            specialties: ['romance', 'family', 'drama']
        },
        { 
            id: 'dist2', name: 'CineWorld India', fee: 18, reach: 88, reliability: 85,
            description: 'Strong presence in urban markets with modern digital distribution.',
            specialties: ['action', 'thriller', 'comedy']
        },
        { 
            id: 'dist3', name: 'Bharat Films', fee: 15, reach: 82, reliability: 88,
            description: 'Traditional distributor with deep rural market penetration.',
            specialties: ['family', 'historical', 'drama']
        },
        { 
            id: 'dist4', name: 'SilverScreen Distributors', fee: 25, reach: 92, reliability: 95,
            description: 'Premium distribution with international reach and high-end marketing.',
            specialties: ['all']
        }
    ]
};

// Festival Calendar & Competition Data
const FestivalWeeks = [
    { week: 4, name: 'Republic Day', multiplier: 1.25, competition: 'high', icon: '🇮🇳' },
    { week: 12, name: 'Holi Festival', multiplier: 1.15, competition: 'medium', icon: '🎨' },
    { week: 20, name: 'Eid Celebration', multiplier: 1.20, competition: 'medium', icon: '🌙' },
    { week: 32, name: 'Independence Day', multiplier: 1.30, competition: 'high', icon: '🇮🇳' },
    { week: 40, name: 'Dussehra', multiplier: 1.18, competition: 'medium', icon: '🏹' },
    { week: 45, name: 'Diwali', multiplier: 1.35, competition: 'very-high', icon: '🪔' },
    { week: 52, name: 'New Year', multiplier: 1.12, competition: 'medium', icon: '🎉' }
];

// Project Configuration
const ProjectConfig = {
    movie: { name: 'Feature Film', baseBudget: 30, productionWeeks: 14, revenueMultiplier: 1.0 },
    webseries: { name: 'Web Series', baseBudget: 18, productionWeeks: 10, revenueMultiplier: 0.8 },
    tvserial: { name: 'TV Serial', baseBudget: 8, productionWeeks: 6, revenueMultiplier: 0.6 }
};

// DOM Elements Cache
let Elements = {};

// ====================================
// INITIALIZATION
// ====================================

document.addEventListener('DOMContentLoaded', function() {
    console.log('🎬 Bollywood Cinema v3.0 Loading...');
    
    initializeElements();
    setupEventListeners();
    initializeDropdowns();
    loadSavedGame();
    initializeGame();
    
    console.log('🎭 Premium Game Ready!');
});

function initializeElements() {
    Elements = {
        // Header
        studioName: document.getElementById('studioName'),
        currentWeek: document.getElementById('currentWeek'),
        currentYear: document.getElementById('currentYear'),
        playerMoney: document.getElementById('playerMoney'),
        playerReputation: document.getElementById('playerReputation'),
        
        // Dashboard
        totalProjects: document.getElementById('totalProjects'),
        hitMovies: document.getElementById('hitMovies'),
        successRate: document.getElementById('successRate'),
        totalAwards: document.getElementById('totalAwards'),
        newsTicker: document.getElementById('newsTicker'),
        
        // Navigation
        bottomNavItems: document.querySelectorAll('.nav-item'),
        backButtons: document.querySelectorAll('.btn-back'),
        
        // Modals
        eventModal: document.getElementById('eventModal'),
        loadingOverlay: document.getElementById('loadingOverlay')
    };
}

function setupEventListeners() {
    // Bottom Navigation
    Elements.bottomNavItems.forEach(item => {
        item.addEventListener('click', (e) => {
            const screen = item.getAttribute('data-screen');
            switchScreen(screen);
        });
    });
    
    // Back Buttons
    Elements.backButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const screen = button.getAttribute('data-screen');
            switchScreen(screen);
        });
    });
    
    // Header Actions
    document.getElementById('nextWeekBtn').addEventListener('click', advanceWeek);
    document.getElementById('themeToggle').addEventListener('click', toggleTheme);
    
    // Quick Actions
    document.querySelectorAll('.action-card').forEach(card => {
        card.addEventListener('click', (e) => {
            const screen = card.getAttribute('data-screen');
            switchScreen(screen);
        });
    });
    
    // Script Stage
    setupSelectButtons();
    document.getElementById('startScriptBtn').addEventListener('click', startScriptDevelopment);
    
    // Crew Stage
    document.getElementById('finalizeCrewBtn').addEventListener('click', finalizeCrewHiring);
    
    // Production Stage
    document.getElementById('skipProductionBtn').addEventListener('click', skipProduction);
    
    // Marketing Stage
    setupMarketingSliders();
    document.getElementById('launchMarketingBtn').addEventListener('click', launchMarketing);
    
    // Distribution Stage
    document.getElementById('finalizeDistributionBtn').addEventListener('click', finalizeDistribution);
    
    // Release Stage
    document.getElementById('confirmReleaseBtn').addEventListener('click', confirmRelease);
    
    // Results Stage
    document.getElementById('createSequelBtn')?.addEventListener('click', createSequel);
    
    // Modal Events
    document.getElementById('eventCloseBtn').addEventListener('click', closeEventModal);
    
    // Global Actions
    document.querySelectorAll('[data-screen]').forEach(element => {
        if (!element.classList.contains('nav-item') && !element.classList.contains('btn-back') && !element.classList.contains('action-card')) {
            element.addEventListener('click', (e) => {
                const screen = element.getAttribute('data-screen');
                if (screen) switchScreen(screen);
            });
        }
    });
}

function initializeGame() {
    updateUI();
    generateInitialNews();
    generateInitialCompetitors();
    populateDropdownOptions();
    
    // Show welcome message for new games
    if (GameState.gameTime.totalWeeks === 1) {
        setTimeout(() => {
            showEvent({
                title: 'Welcome to Bollywood! 🎬',
                description: 'Build your cinema empire from script to box office success. Start by creating your first project!',
                icon: '🌟'
            });
        }, 1000);
    }
}

// ====================================
// SCREEN MANAGEMENT
// ====================================

function switchScreen(screenName) {
    // Hide all screens
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });
    
    // Show target screen
    const targetScreen = document.getElementById(screenName);
    if (targetScreen) {
        targetScreen.classList.add('active');
    }
    
    // Update navigation
    Elements.bottomNavItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('data-screen') === screenName) {
            item.classList.add('active');
        }
    });
    
    GameState.currentScreen = screenName;
    
    // Screen-specific initialization
    switch(screenName) {
        case 'dashboard':
            updateDashboard();
            break;
        case 'script':
            initializeScriptStage();
            break;
        case 'crew':
            initializeCrewStage();
            break;
        case 'production':
            updateProductionDisplay();
            break;
        case 'marketing':
            updateMarketingPreview();
            break;
        case 'distribution':
            populateDistributors();
            break;
        case 'release':
            generateReleaseCalendar();
            break;
        case 'portfolio':
            loadPortfolio();
            break;
        case 'competitors':
            loadCompetitors();
            break;
        case 'franchises':
            loadFranchises();
            break;
        case 'awards':
            loadAwards();
            break;
    }
    
    // Add screen transition animation
    targetScreen.style.opacity = '0';
    setTimeout(() => {
        targetScreen.style.opacity = '1';
    }, 50);
}

function updateUI() {
    // Update header stats
    Elements.studioName.textContent = GameState.player.studioName;
    Elements.currentWeek.textContent = `Week ${GameState.gameTime.week}`;
    Elements.currentYear.textContent = GameState.gameTime.year;
    Elements.playerMoney.textContent = `₹${GameState.player.money} Cr`;
    Elements.playerReputation.textContent = `${GameState.player.reputation}%`;
    
    // Update dashboard stats
    Elements.totalProjects.textContent = GameState.player.totalProjects;
    Elements.hitMovies.textContent = GameState.player.hitMovies;
    Elements.totalAwards.textContent = GameState.player.totalAwards;
    
    const successRate = GameState.player.completedProjects > 0 ? 
        Math.round((GameState.player.hitMovies / GameState.player.completedProjects) * 100) : 0;
    Elements.successRate.textContent = `${successRate}%`;
    
    // Update news ticker
    updateNewsTicker();
    
    // Update active projects
    updateActiveProjectsDisplay();
}

function updateDashboard() {
    // Show/hide active projects section
    const activeContainer = document.getElementById('activeProjectsContainer');
    if (GameState.activeProjects.length > 0) {
        activeContainer.classList.remove('hidden');
    } else {
        activeContainer.classList.add('hidden');
    }
}

function updateActiveProjectsDisplay() {
    const container = document.getElementById('activeProjectsList');
    if (!container) return;
    
    container.innerHTML = '';
    
    GameState.activeProjects.forEach(project => {
        const card = document.createElement('div');
        card.className = 'project-card';
        
        const progress = calculateProjectProgress(project);
        const statusText = getProjectStatusText(project);
        
        card.innerHTML = `
            <div class="project-header">
                <h4 class="project-title">"${project.title}"</h4>
                <span class="project-stage">${project.stage}</span>
            </div>
            <div class="project-details">
                <span>${ProjectConfig[project.type].name}</span>
                <span>${project.genre}</span>
            </div>
            <div class="project-progress">
                <div class="progress-bar">
                    <div class="progress-fill" style="width: ${progress}%"></div>
                </div>
                <span class="progress-text">${progress}% • ${statusText}</span>
            </div>
        `;
        
        card.addEventListener('click', () => {
            GameState.currentProject = project;
            switchScreen(getProjectStageScreen(project.stage));
        });
        
        container.appendChild(card);
    });
}

function calculateProjectProgress(project) {
    const stages = ['script', 'crew', 'production', 'marketing', 'distribution', 'release'];
    const currentIndex = stages.indexOf(project.stage);
    const baseProgress = (currentIndex / stages.length) * 100;
    
    // Add sub-progress for current stage
    if (project.stage === 'script' && project.scriptWeeksRemaining) {
        const scriptProgress = ((project.scriptWeeksTotal - project.scriptWeeksRemaining) / project.scriptWeeksTotal) * (100 / stages.length);
        return Math.round(baseProgress + scriptProgress);
    } else if (project.stage === 'production' && project.productionWeeksRemaining) {
        const prodProgress = ((project.productionWeeksTotal - project.productionWeeksRemaining) / project.productionWeeksTotal) * (100 / stages.length);
        return Math.round(baseProgress + prodProgress);
    }
    
    return Math.round(baseProgress);
}

function getProjectStatusText(project) {
    if (project.stage === 'script' && project.scriptWeeksRemaining) {
        return `${project.scriptWeeksRemaining} weeks left`;
    } else if (project.stage === 'production' && project.productionWeeksRemaining) {
        return `${project.productionWeeksRemaining} weeks left`;
    }
    return 'Ready for next stage';
}

function getProjectStageScreen(stage) {
    const stageMap = {
        'script': 'script',
        'crew': 'crew',
        'production': 'production',
        'marketing': 'marketing',
        'distribution': 'distribution',
        'release': 'release'
    };
    return stageMap[stage] || 'dashboard';
}

// ====================================
// TIME SYSTEM
// ====================================

function advanceWeek() {
    GameState.gameTime.week++;
    GameState.gameTime.totalWeeks++;
    
    // Handle year progression
    if (GameState.gameTime.week > 52) {
        GameState.gameTime.week = 1;
        GameState.gameTime.year++;
    }
    
    // Process active projects
    processActiveProjects();
    
    // Generate competitors periodically
    if (GameState.gameTime.totalWeeks >= GameState.nextCompetitorWeek) {
        generateCompetitor();
        GameState.nextCompetitorWeek = GameState.gameTime.totalWeeks + Math.floor(Math.random() * 3) + 4;
    }
    
    // Generate industry news
    if (Math.random() < 0.3) {
        generateNewsItem();
    }
    
    // Check for festival weeks
    checkFestivalWeek();
    
    // Random industry events
    if (Math.random() < 0.1) {
        triggerRandomEvent();
    }
    
    // Update UI
    updateUI();
    
    // Auto-save
    if (GameState.settings.autoSave && GameState.gameTime.totalWeeks % 5 === 0) {
        saveGame();
    }
    
    // Show loading animation
    showLoading('Advancing to next week...', 1000);
}

function processActiveProjects() {
    GameState.activeProjects.forEach(project => {
        if (project.stage === 'script' && project.scriptWeeksRemaining > 0) {
            project.scriptWeeksRemaining--;
            if (project.scriptWeeksRemaining <= 0) {
                completeScriptStage(project);
            }
        } else if (project.stage === 'production' && project.productionWeeksRemaining > 0) {
            project.productionWeeksRemaining--;
            
            // Random production events
            if (Math.random() < 0.15) {
                triggerProductionEvent(project);
            }
            
            if (project.productionWeeksRemaining <= 0) {
                completeProductionStage(project);
            }
        }
    });
}

function checkFestivalWeek() {
    const currentWeekInYear = GameState.gameTime.week;
    const festival = FestivalWeeks.find(f => f.week === currentWeekInYear);
    
    if (festival) {
        showEvent({
            title: `${festival.name}! ${festival.icon}`,
            description: `Perfect timing for releases! Expected box office boost of ${Math.round((festival.multiplier - 1) * 100)}%.`,
            icon: festival.icon
        });
        
        generateNewsItem(`${festival.icon} ${festival.name} celebrations create favorable conditions for movie releases across India!`);
    }
}

// ====================================
// DROPDOWN SYSTEM (PURE JS)
// ====================================

function initializeDropdowns() {
    const dropdowns = document.querySelectorAll('.dropdown-container');
    
    dropdowns.forEach(container => {
        const trigger = container.querySelector('.dropdown-trigger');
        const menu = container.querySelector('.dropdown-menu');
        const searchInput = menu.querySelector('.search-input');
        const isMultiSelect = menu.classList.contains('multi-select');
        
        // Toggle dropdown
        trigger.addEventListener('click', (e) => {
            e.stopPropagation();
            closeAllDropdowns();
            menu.classList.toggle('active');
            if (menu.classList.contains('active')) {
                searchInput.focus();
            }
        });
        
        // Search functionality
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                const searchTerm = e.target.value.toLowerCase();
                const options = menu.querySelectorAll('.dropdown-option');
                
                options.forEach(option => {
                    const text = option.textContent.toLowerCase();
                    if (text.includes(searchTerm)) {
                        option.style.display = 'flex';
                    } else {
                        option.style.display = 'none';
                    }
                });
            });
        }
        
        // Option selection
        menu.addEventListener('click', (e) => {
            const option = e.target.closest('.dropdown-option');
            if (!option) return;
            
            e.preventDefault();
            
            if (isMultiSelect) {
                handleMultiSelectOption(container, option);
            } else {
                handleSingleSelectOption(container, option);
                menu.classList.remove('active');
            }
        });
    });
    
    // Close dropdowns when clicking outside
    document.addEventListener('click', closeAllDropdowns);
}

function closeAllDropdowns() {
    document.querySelectorAll('.dropdown-menu.active').forEach(menu => {
        menu.classList.remove('active');
    });
}

function handleSingleSelectOption(container, option) {
    const trigger = container.querySelector('.dropdown-trigger .dropdown-text');
    const hiddenInput = container.parentElement.querySelector('input[type="hidden"]');
    const value = option.getAttribute('data-value');
    const text = option.querySelector('.option-name').textContent;
    
    trigger.textContent = text;
    if (hiddenInput) hiddenInput.value = value;
    
    // Trigger change event
    const event = new CustomEvent('dropdownChange', {
        detail: { value, text, container }
    });
    container.dispatchEvent(event);
}

function handleMultiSelectOption(container, option) {
    const value = option.getAttribute('data-value');
    const isSelected = option.classList.contains('selected');
    
    if (isSelected) {
        option.classList.remove('selected');
        removeSelectedTag(container, value);
    } else {
        option.classList.add('selected');
        addSelectedTag(container, option);
    }
    
    updateMultiSelectTrigger(container);
    
    // Trigger change event
    const event = new CustomEvent('dropdownChange', {
        detail: { value, selected: !isSelected, container }
    });
    container.dispatchEvent(event);
}

function addSelectedTag(container, option) {
    const tagsContainer = container.parentElement.querySelector('.selected-tags');
    if (!tagsContainer) return;
    
    const value = option.getAttribute('data-value');
    const name = option.querySelector('.option-name').textContent;
    const fee = option.getAttribute('data-fee');
    
    const tag = document.createElement('div');
    tag.className = 'selected-tag';
    tag.setAttribute('data-value', value);
    tag.innerHTML = `
        <span class="tag-name">${name}</span>
        <span class="tag-fee">₹${fee} Cr</span>
        <button class="tag-remove" onclick="removeTag(this, '${value}')">×</button>
    `;
    
    tagsContainer.appendChild(tag);
}

function removeSelectedTag(container, value) {
    const tagsContainer = container.parentElement.querySelector('.selected-tags');
    if (!tagsContainer) return;
    
    const tag = tagsContainer.querySelector(`[data-value="${value}"]`);
    if (tag) tag.remove();
}

function updateMultiSelectTrigger(container) {
    const trigger = container.querySelector('.dropdown-trigger .dropdown-text');
    const selectedOptions = container.querySelectorAll('.dropdown-option.selected');
    
    if (selectedOptions.length === 0) {
        trigger.textContent = trigger.getAttribute('data-placeholder') || 'Select options...';
    } else {
        trigger.textContent = `${selectedOptions.length} selected`;
    }
}

function removeTag(button, value) {
    const tag = button.closest('.selected-tag');
    const container = tag.closest('.form-group').querySelector('.dropdown-container');
    const option = container.querySelector(`[data-value="${value}"]`);
    
    tag.remove();
    if (option) option.classList.remove('selected');
    updateMultiSelectTrigger(container);
    
    // Trigger change event
    const event = new CustomEvent('dropdownChange', {
        detail: { value, selected: false, container }
    });
    container.dispatchEvent(event);
}

function populateDropdownOptions() {
    // Populate writers
    populateDropdown('writerOptions', IndustryData.writers, (writer) => ({
        value: writer.id,
        name: writer.name,
        details: `${writer.specialty} • ₹${writer.fee} Cr • ${writer.skill}% skill`,
        fee: writer.fee,
        avatar: writer.avatar
    }));
    
    // Populate directors
    populateDropdown('directorOptions', IndustryData.directors, (director) => ({
        value: director.id,
        name: director.name,
        details: `${director.specialty} • ₹${director.fee} Cr • ${director.reputation}% reputation`,
        fee: director.fee,
        avatar: director.avatar
    }));
    
    // Populate actors (combined for lead roles)
    populateDropdown('leadActorsOptions', IndustryData.actors, (actor) => ({
        value: actor.id,
        name: actor.name,
        details: `${actor.specialty} • ₹${actor.fee} Cr • ${actor.popularity}% popularity`,
        fee: actor.fee,
        avatar: actor.avatar
    }));
    
    // Populate supporting actors
    populateDropdown('supportingCastOptions', IndustryData.supportingActors, (actor) => ({
        value: actor.id,
        name: actor.name,
        details: `${actor.specialty} • ₹${actor.fee} Cr • ${actor.skill}% skill`,
        fee: actor.fee,
        avatar: actor.avatar
    }));
    
    // Populate music producers
    populateDropdown('musicProducerOptions', IndustryData.musicProducers, (producer) => ({
        value: producer.id,
        name: producer.name,
        details: `${producer.specialty} • ₹${producer.fee} Cr • ${producer.reputation}% reputation`,
        fee: producer.fee,
        avatar: producer.avatar
    }));
    
    // Populate singers
    populateDropdown('singersOptions', IndustryData.playbackSingers, (singer) => ({
        value: singer.id,
        name: singer.name,
        details: `${singer.specialty} • ₹${singer.fee} Cr • ${singer.popularity}% popularity`,
        fee: singer.fee,
        avatar: singer.avatar
    }));
    
    // Populate lyricists
    populateDropdown('lyricistOptions', IndustryData.lyricists, (lyricist) => ({
        value: lyricist.id,
        name: lyricist.name,
        details: `${lyricist.specialty} • ₹${lyricist.fee} Cr • ${lyricist.skill}% skill`,
        fee: lyricist.fee,
        avatar: lyricist.avatar
    }));
}

function populateDropdown(containerId, data, mapFunction) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    container.innerHTML = '';
    
    data.forEach(item => {
        const mapped = mapFunction(item);
        const option = document.createElement('div');
        option.className = 'dropdown-option';
        option.setAttribute('data-value', mapped.value);
        option.setAttribute('data-fee', mapped.fee);
        
        option.innerHTML = `
            <div class="option-avatar">${mapped.avatar}</div>
            <div class="option-content">
                <div class="option-name">${mapped.name}</div>
                <div class="option-details">${mapped.details}</div>
            </div>
        `;
        
        container.appendChild(option);
    });
}

// ====================================
// SELECT BUTTONS SYSTEM
// ====================================

function setupSelectButtons() {
    document.querySelectorAll('.select-buttons').forEach(container => {
        const buttons = container.querySelectorAll('.select-btn');
        const hiddenInput = container.parentElement.querySelector('input[type="hidden"]');
        
        buttons.forEach(button => {
            button.addEventListener('click', () => {
                // Remove active class from all buttons in this group
                buttons.forEach(btn => btn.classList.remove('active'));
                
                // Add active class to clicked button
                button.classList.add('active');
                
                // Update hidden input if exists
                const value = button.getAttribute('data-value');
                if (hiddenInput) {
                    hiddenInput.value = value;
                }
                
                // Trigger change event
                const event = new CustomEvent('selectionChange', {
                    detail: { value, button, container }
                });
                container.dispatchEvent(event);
            });
        });
    });
}

// ====================================
// SCRIPT DEVELOPMENT
// ====================================

function initializeScriptStage() {
    // Reset form if no current project
    if (!GameState.currentProject) {
        resetScriptForm();
    } else {
        // Show current project progress
        updateScriptProgress();
    }
    
    // Setup dropdown change handlers
    setupScriptDropdownHandlers();
    
    // Validate form on input changes
    validateScriptForm();
}

function resetScriptForm() {
    // Clear all selections
    document.querySelectorAll('.select-btn.active').forEach(btn => {
        btn.classList.remove('active');
    });
    
    document.querySelectorAll('input[type="hidden"]').forEach(input => {
        input.value = '';
    });
    
    document.getElementById('projectTitle').value = '';
    
    // Hide progress card
    document.getElementById('scriptProgressCard').classList.add('hidden');
    
    // Disable start button
    const startBtn = document.getElementById('startScriptBtn');
    startBtn.classList.add('disabled');
    startBtn.disabled = true;
}

function setupScriptDropdownHandlers() {
    // Writer selection
    const writerContainer = document.getElementById('writerDropdown').closest('.dropdown-container');
    writerContainer.addEventListener('dropdownChange', (e) => {
        const { value } = e.detail;
        const writer = IndustryData.writers.find(w => w.id === value);
        
        if (writer) {
            showSelectedWriter(writer);
            validateScriptForm();
        }
    });
    
    // Lead actors selection
    const leadActorsContainer = document.getElementById('leadActorsDropdown').closest('.dropdown-container');
    leadActorsContainer.addEventListener('dropdownChange', (e) => {
        updateBudgetPreview();
        validateScriptForm();
    });
    
    // Supporting cast selection
    const supportingContainer = document.getElementById('supportingCastDropdown').closest('.dropdown-container');
    supportingContainer.addEventListener('dropdownChange', (e) => {
        updateBudgetPreview();
        validateScriptForm();
    });
    
    // Project type and genre selection
    document.querySelectorAll('.select-buttons').forEach(container => {
        container.addEventListener('selectionChange', () => {
            validateScriptForm();
        });
    });
}

function showSelectedWriter(writer) {
    const card = document.getElementById('selectedWriterCard');
    const nameEl = document.getElementById('selectedWriterName');
    const feeEl = document.getElementById('selectedWriterFee');
    const skillEl = document.getElementById('selectedWriterSkill');
    
    nameEl.textContent = writer.name;
    feeEl.textContent = writer.fee;
    skillEl.textContent = writer.skill;
    
    card.classList.remove('hidden');
}

function updateBudgetPreview() {
    // This will be implemented when we calculate total costs
    console.log('Budget preview updated');
}

function validateScriptForm() {
    const title = document.getElementById('projectTitle').value.trim();
    const type = document.getElementById('projectType').value;
    const genre = document.getElementById('projectGenre').value;
    const writerId = document.getElementById('writerDropdown').closest('.dropdown-container').querySelector('input[type="hidden"]')?.value;
    
    const leadActors = document.querySelectorAll('#selectedLeadActors .selected-tag').length;
    const supportingActors = document.querySelectorAll('#selectedSupportingCast .selected-tag').length;
    
    const isValid = title && type && genre && writerId && leadActors >= 2 && supportingActors >= 2;
    
    const startBtn = document.getElementById('startScriptBtn');
    if (isValid) {
        startBtn.classList.remove('disabled');
        startBtn.disabled = false;
    } else {
        startBtn.classList.add('disabled');
        startBtn.disabled = true;
    }
    
    return isValid;
}

function startScriptDevelopment() {
    if (!validateScriptForm()) {
        showEvent({
            title: 'Form Incomplete',
            description: 'Please fill in all required fields before starting script development.',
            icon: '⚠️'
        });
        return;
    }
    
    const title = document.getElementById('projectTitle').value.trim();
    const type = document.getElementById('projectType').value;
    const genre = document.getElementById('projectGenre').value;
    const writerId = document.getElementById('writerDropdown').closest('.dropdown-container').querySelector('input[type="hidden"]').value;
    
    const writer = IndustryData.writers.find(w => w.id === writerId);
    if (!writer) return;
    
    // Calculate costs
    const scriptCost = calculateScriptCost(writer, type);
    const leadActorsCost = calculateSelectedActorsCost('#selectedLeadActors .selected-tag');
    const supportingCost = calculateSelectedActorsCost('#selectedSupportingCast .selected-tag');
    const totalPreproductionCost = scriptCost + leadActorsCost + supportingCost;
    
    if (GameState.player.money < totalPreproductionCost) {
        showEvent({
            title: 'Insufficient Budget',
            description: `You need ₹${totalPreproductionCost} Cr for script and cast, but only have ₹${GameState.player.money} Cr. Consider borrowing funds or choosing cheaper options.`,
            icon: '💸'
        });
        return;
    }
    
    // Create new project
    const project = {
        id: generateId(),
        title: title,
        type: type,
        genre: genre,
        stage: 'script',
        writer: writer,
        leadActors: getSelectedActors('#selectedLeadActors .selected-tag'),
        supportingCast: getSelectedActors('#selectedSupportingCast .selected-tag'),
        crew: {},
        budget: {
            script: scriptCost,
            cast: leadActorsCost + supportingCost,
            crew: 0,
            production: 0,
            marketing: 0,
            distribution: 0,
            total: totalPreproductionCost
        },
        quality: {
            script: 0,
            production: 0,
            music: 0,
            marketing: 0
        },
        events: [],
        scriptWeeksTotal: calculateScriptWeeks(writer, type),
        scriptWeeksRemaining: 0
    };
    
    // Set script development time
    project.scriptWeeksRemaining = project.scriptWeeksTotal;
    
    // Deduct money
    GameState.player.money -= totalPreproductionCost;
    GameState.player.totalProjects++;
    
    // Add to active projects
    GameState.activeProjects.push(project);
    GameState.currentProject = project;
    
    // Show progress card
    updateScriptProgress();
    
    showEvent({
        title: 'Script Development Started! 📝',
        description: `"${project.title}" script development will take ${project.scriptWeeksTotal} weeks. Your writer is working hard!`,
        icon: '✍️'
    });
    
    generateNewsItem(`📝 ${GameState.player.studioName} announces "${title}", a ${type} project starring ${project.leadActors.map(a => a.name).join(' and ')}!`);
    
    updateUI();
}

function calculateScriptCost(writer, projectType) {
    const typeMultiplier = {
        movie: 1.5,
        webseries: 1.2,
        tvserial: 1.0
    };
    
    return Math.round(writer.fee * typeMultiplier[projectType]);
}

function calculateSelectedActorsCost(selector) {
    const tags = document.querySelectorAll(selector);
    let total = 0;
    
    tags.forEach(tag => {
        const fee = parseFloat(tag.querySelector('.tag-fee').textContent.replace('₹', '').replace(' Cr', ''));
        total += fee;
    });
    
    return total;
}

function getSelectedActors(selector) {
    const tags = document.querySelectorAll(selector);
    const actors = [];
    
    tags.forEach(tag => {
        const value = tag.getAttribute('data-value');
        const actor = [...IndustryData.actors, ...IndustryData.supportingActors].find(a => a.id === value);
        if (actor) actors.push(actor);
    });
    
    return actors;
}

function calculateScriptWeeks(writer, projectType) {
    const baseWeeks = {
        movie: 5,
        webseries: 4,
        tvserial: 3
    };
    
    const speedFactor = writer.speed / 100;
    const weeks = baseWeeks[projectType] / speedFactor;
    
    return Math.max(3, Math.round(weeks));
}

function updateScriptProgress() {
    if (!GameState.currentProject || GameState.currentProject.stage !== 'script') return;
    
    const project = GameState.currentProject;
    const progressCard = document.getElementById('scriptProgressCard');
    const progressBar = document.getElementById('scriptProgressBar');
    const progressText = document.getElementById('scriptProgressText');
    const currentWeekEl = document.getElementById('scriptCurrentWeek');
    const totalWeeksEl = document.getElementById('scriptTotalWeeks');
    const qualityEl = document.getElementById('scriptQuality');
    
    if (project.scriptWeeksRemaining > 0) {
        const completed = project.scriptWeeksTotal - project.scriptWeeksRemaining;
        const progress = Math.round((completed / project.scriptWeeksTotal) * 100);
        
        progressBar.style.width = `${progress}%`;
        progressText.textContent = `${progress}%`;
        currentWeekEl.textContent = completed + 1;
        totalWeeksEl.textContent = project.scriptWeeksTotal;
        qualityEl.textContent = 'In Progress...';
        
        progressCard.classList.remove('hidden');
    } else if (project.quality.script > 0) {
        progressBar.style.width = '100%';
        progressText.textContent = '100%';
        currentWeekEl.textContent = project.scriptWeeksTotal;
        totalWeeksEl.textContent = project.scriptWeeksTotal;
        qualityEl.textContent = `${Math.round(project.quality.script * 100)}%`;
        
        progressCard.classList.remove('hidden');
    }
}

function completeScriptStage(project) {
    project.stage = 'crew';
    
    // Calculate script quality
    const writer = project.writer;
    let quality = writer.skill / 100;
    
    // Genre matching bonus
    if (writer.specialty === project.genre) {
        quality *= 1.25;
    }
    
    // Add randomness
    quality *= (0.8 + Math.random() * 0.4);
    project.quality.script = Math.min(1, quality);
    
    showEvent({
        title: 'Script Complete! 📋',
        description: `"${project.title}" script is ready! Quality: ${Math.round(project.quality.script * 100)}%. Time to hire your crew!`,
        icon: '✅'
    });
    
    generateNewsItem(`📝 "${project.title}" script development completed by ${writer.name}. Production crew hiring begins!`);
}

// ====================================
// CREW HIRING
// ====================================

function initializeCrewStage() {
    if (!GameState.currentProject) {
        switchScreen('dashboard');
        return;
    }
    
    setupCrewDropdownHandlers();
    updateCrewBudgetDisplay();
    validateCrewSelection();
}

function setupCrewDropdownHandlers() {
    // Director selection
    const directorContainer = document.getElementById('directorDropdown').closest('.dropdown-container');
    directorContainer.addEventListener('dropdownChange', (e) => {
        const { value } = e.detail;
        const director = IndustryData.directors.find(d => d.id === value);
        
        if (director) {
            GameState.currentProject.crew.director = director;
            showSelectedCrewMember('director', director, 'selectedDirectorCard');
            updateCrewBudgetDisplay();
            validateCrewSelection();
        }
    });
    
    // Music Producer selection
    const musicContainer = document.getElementById('musicProducerDropdown').closest('.dropdown-container');
    musicContainer.addEventListener('dropdownChange', (e) => {
        const { value } = e.detail;
        const producer = IndustryData.musicProducers.find(p => p.id === value);
        
        if (producer) {
            GameState.currentProject.crew.musicProducer = producer;
            showSelectedCrewMember('musicProducer', producer, 'selectedMusicProducerCard');
            updateCrewBudgetDisplay();
            validateCrewSelection();
        }
    });
    
    // Singers selection (multi-select)
    const singersContainer = document.getElementById('singersDropdown').closest('.dropdown-container');
    singersContainer.addEventListener('dropdownChange', (e) => {
        updateSelectedSingers();
        updateCrewBudgetDisplay();
        validateCrewSelection();
    });
    
    // Lyricist selection
    const lyricistContainer = document.getElementById('lyricistDropdown').closest('.dropdown-container');
    lyricistContainer.addEventListener('dropdownChange', (e) => {
        const { value } = e.detail;
        const lyricist = IndustryData.lyricists.find(l => l.id === value);
        
        if (lyricist) {
            GameState.currentProject.crew.lyricist = lyricist;
            showSelectedCrewMember('lyricist', lyricist, 'selectedLyricistCard');
            updateCrewBudgetDisplay();
            validateCrewSelection();
        }
    });
}

function showSelectedCrewMember(role, member, cardId) {
    const card = document.getElementById(cardId);
    if (!card) return;
    
    card.innerHTML = `
        <div class="selected-header">
            <div class="avatar">${member.avatar}</div>
            <div class="selected-details">
                <div class="selected-name">${member.name}</div>
                <div class="selected-info">
                    <span class="info-tag">Fee: ₹${member.fee} Cr</span>
                    <span class="info-tag">${member.specialty}</span>
                    ${member.reputation ? `<span class="info-tag">${member.reputation}% reputation</span>` : ''}
                    ${member.skill ? `<span class="info-tag">${member.skill}% skill</span>` : ''}
                </div>
            </div>
        </div>
    `;
    
    card.classList.remove('hidden');
}

function updateSelectedSingers() {
    if (!GameState.currentProject) return;
    
    const selectedTags = document.querySelectorAll('#selectedSingers .selected-tag');
    const singers = [];
    
    selectedTags.forEach(tag => {
        const value = tag.getAttribute('data-value');
        const singer = IndustryData.playbackSingers.find(s => s.id === value);
        if (singer) singers.push(singer);
    });
    
    GameState.currentProject.crew.singers = singers;
}

function updateCrewBudgetDisplay() {
    if (!GameState.currentProject) return;
    
    const project = GameState.currentProject;
    
    // Update individual cost displays
    document.getElementById('scriptCost').textContent = project.budget.script || 0;
    document.getElementById('leadCastCost').textContent = Math.round(project.budget.cast || 0);
    
    // Calculate crew costs
    let directorCost = project.crew.director ? project.crew.director.fee : 0;
    document.getElementById('directorCost').textContent = directorCost;
    
    let musicTeamCost = 0;
    if (project.crew.musicProducer) musicTeamCost += project.crew.musicProducer.fee;
    if (project.crew.singers) {
        musicTeamCost += project.crew.singers.reduce((sum, singer) => sum + singer.fee, 0);
    }
    if (project.crew.lyricist) musicTeamCost += project.crew.lyricist.fee;
    document.getElementById('musicTeamCost').textContent = Math.round(musicTeamCost * 10) / 10;
    
    // Update supporting cast cost (already calculated)
    const supportingCost = project.supportingCast.reduce((sum, actor) => sum + actor.fee, 0);
    document.getElementById('supportingCastCost').textContent = Math.round(supportingCost * 10) / 10;
    
    // Calculate total crew cost
    const totalCrewCost = directorCost + musicTeamCost;
    document.getElementById('totalCrewCost').textContent = Math.round(totalCrewCost * 10) / 10;
    
    // Store in project
    project.budget.crew = totalCrewCost;
    project.budget.total = project.budget.script + project.budget.cast + project.budget.crew;
}

function validateCrewSelection() {
    if (!GameState.currentProject) return false;
    
    const project = GameState.currentProject;
    const hasDirector = !!project.crew.director;
    const hasMusicProducer = !!project.crew.musicProducer;
    
    const isValid = hasDirector && hasMusicProducer;
    
    const finalizeBtn = document.getElementById('finalizeCrewBtn');
    if (isValid) {
        finalizeBtn.classList.remove('disabled');
        finalizeBtn.disabled = false;
    } else {
        finalizeBtn.classList.add('disabled');
        finalizeBtn.disabled = true;
    }
    
    return isValid;
}

function finalizeCrewHiring() {
    if (!validateCrewSelection()) {
        showEvent({
            title: 'Crew Incomplete',
            description: 'Please select at least a director and music producer before proceeding.',
            icon: '⚠️'
        });
        return;
    }
    
    const project = GameState.currentProject;
    const crewCost = project.budget.crew;
    
    if (GameState.player.money < crewCost) {
        showEvent({
            title: 'Insufficient Budget',
            description: `You need ₹${crewCost} Cr for crew hiring but only have ₹${GameState.player.money} Cr.`,
            icon: '💸'
        });
        return;
    }
    
    // Deduct money
    GameState.player.money -= crewCost;
    
    // Move to production
    project.stage = 'production';
    project.productionWeeksTotal = calculateProductionWeeks(project.type);
    project.productionWeeksRemaining = project.productionWeeksTotal;
    
    showEvent({
        title: 'Crew Assembled! 🎬',
        description: `Your dream team is ready! Production will take ${project.productionWeeksTotal} weeks.`,
        icon: '🎯'
    });
    
    generateNewsItem(`🎬 "${project.title}" begins production with director ${project.crew.director.name} and music by ${project.crew.musicProducer.name}!`);
    
    updateUI();
    switchScreen('production');
}

function calculateProductionWeeks(projectType) {
    const baseWeeks = ProjectConfig[projectType].productionWeeks;
    return baseWeeks + Math.floor(Math.random() * 3); // Add 0-2 random weeks
}

// ====================================
// PRODUCTION STAGE
// ====================================

function updateProductionDisplay() {
    if (!GameState.currentProject || GameState.currentProject.stage !== 'production') return;
    
    const project = GameState.currentProject;
    
    if (project.productionWeeksRemaining > 0) {
        const completed = project.productionWeeksTotal - project.productionWeeksRemaining;
        const progress = Math.round((completed / project.productionWeeksTotal) * 100);
        
        // Update progress
        document.getElementById('productionProgressBar').style.width = `${progress}%`;
        document.getElementById('productionProgressText').textContent = `${progress}%`;
        document.getElementById('productionCurrentWeek').textContent = completed + 1;
        document.getElementById('productionTotalWeeks').textContent = project.productionWeeksTotal;
        
        // Update stats
        const totalScenes = 120;
        const scenesCompleted = Math.round((progress / 100) * totalScenes);
        document.getElementById('scenesCompleted').textContent = `${scenesCompleted}/${totalScenes}`;
        
        const budgetUsed = Math.round(project.budget.total * (progress / 100));
        document.getElementById('productionBudgetUsed').textContent = `₹${budgetUsed} Cr`;
        
        document.getElementById('productionQuality').textContent = 'Building...';
    } else {
        // Production complete
        document.getElementById('productionProgressBar').style.width = '100%';
        document.getElementById('productionProgressText').textContent = '100%';
        document.getElementById('productionCurrentWeek').textContent = project.productionWeeksTotal;
        document.getElementById('productionTotalWeeks').textContent = project.productionWeeksTotal;
        document.getElementById('productionQuality').textContent = `${Math.round(project.quality.production * 100)}%`;
    }
}

function triggerProductionEvent(project) {
    const events = [
        {
            title: 'Outstanding Performance! 🌟',
            description: `${project.leadActors[0].name} delivered an exceptional scene! Critics are already talking.`,
            icon: '⭐',
            type: 'positive',
            effect: { quality: 0.1, reputation: 2 }
        },
        {
            title: 'Weather Delays ⛈️',
            description: 'Heavy rains delayed outdoor shooting. Extra costs incurred for extended schedule.',
            icon: '🌧️',
            type: 'negative',
            effect: { weeks: 1, money: -3 }
        },
        {
            title: 'Viral Behind-Scenes! 📱',
            description: 'Behind-the-scenes content went viral on social media! Massive pre-release buzz.',
            icon: '📸',
            type: 'positive',
            effect: { marketing: 0.2, reputation: 3 }
        },
        {
            title: 'Equipment Malfunction 🔧',
            description: 'Camera equipment breakdown caused delays and additional rental costs.',
            icon: '⚠️',
            type: 'negative',
            effect: { weeks: 1, money: -2 }
        },
        {
            title: 'Perfect Chemistry! 💕',
            description: `Amazing on-screen chemistry between ${project.leadActors[0].name} and ${project.leadActors[1]?.name || 'co-star'}!`,
            icon: '✨',
            type: 'positive',
            effect: { quality: 0.12 }
        },
        {
            title: 'Injury on Set 🚑',
            description: 'Minor injury to supporting actor caused production delays and safety reviews.',
            icon: '🏥',
            type: 'negative',
            effect: { weeks: 2, money: -1 }
        },
        {
            title: 'Music Magic! 🎵',
            description: `${project.crew.musicProducer.name} created an absolutely mesmerizing soundtrack!`,
            icon: '🎼',
            type: 'positive',
            effect: { music: 0.15, quality: 0.08 }
        }
    ];
    
    const event = events[Math.floor(Math.random() * events.length)];
    
    // Apply effects
    if (event.effect.quality) {
        project.quality.production = Math.min(1, project.quality.production + event.effect.quality);
    }
    if (event.effect.marketing) {
        project.quality.marketing = Math.min(1, project.quality.marketing + event.effect.marketing);
    }
    if (event.effect.music) {
        project.quality.music = Math.min(1, project.quality.music + event.effect.music);
    }
    if (event.effect.reputation) {
        GameState.player.reputation = Math.max(0, Math.min(100, GameState.player.reputation + event.effect.reputation));
    }
    if (event.effect.money) {
        GameState.player.money = Math.max(0, GameState.player.money + event.effect.money);
    }
    if (event.effect.weeks) {
        project.productionWeeksRemaining += event.effect.weeks;
    }
    
    // Store event
    project.events.push(event);
    
    // Add to production events list
    addProductionEvent(event);
    
    showEvent(event);
    generateNewsItem(`🎬 "${project.title}" production update: ${event.description}`);
}

function addProductionEvent(event) {
    const container = document.getElementById('productionEventsList');
    if (!container) return;
    
    const eventEl = document.createElement('div');
    eventEl.className = `event-item ${event.type}`;
    eventEl.innerHTML = `
        <div class="event-icon">${event.icon}</div>
        <div class="event-content">
            <div class="event-title">${event.title}</div>
            <div class="event-description">${event.description}</div>
            <div class="event-time">Week ${GameState.gameTime.week}</div>
        </div>
    `;
    
    // Add to top of list
    container.insertBefore(eventEl, container.firstChild);
    
    // Keep only last 5 events
    const events = container.querySelectorAll('.event-item');
    if (events.length > 5) {
        events[events.length - 1].remove();
    }
}

function completeProductionStage(project) {
    project.stage = 'marketing';
    
    // Calculate production quality
    calculateProductionQuality(project);
    
    showEvent({
        title: 'Production Complete! 🎉',
        description: `"${project.title}" filming wrapped! Quality: ${Math.round(project.quality.production * 100)}%. Time for marketing!`,
        icon: '🏁'
    });
    
    generateNewsItem(`🎬 "${project.title}" completes production! Director ${project.crew.director.name} praises exceptional performances.`);
}

function calculateProductionQuality(project) {
    let quality = project.quality.script;
    
    // Director impact
    const director = project.crew.director;
    if (director) {
        const directorBonus = director.reputation / 100;
        const genreMatch = director.specialty === project.genre ? 1.2 : 1.0;
        quality += (directorBonus * genreMatch * 0.3);
    }
    
    // Lead actors impact
    const avgPopularity = project.leadActors.reduce((sum, actor) => sum + actor.popularity, 0) / project.leadActors.length;
    quality += (avgPopularity / 100 * 0.25);
    
    // Genre matching for actors
    const genreMatchingActors = project.leadActors.filter(actor => actor.specialty === project.genre).length;
    quality += (genreMatchingActors * 0.05);
    
    // Music impact
    if (project.crew.musicProducer) {
        const musicQuality = project.crew.musicProducer.reputation / 100;
        quality += (musicQuality * 0.15);
    }
    
    // Random factor
    quality += (Math.random() * 0.2 - 0.1);
    
    project.quality.production = Math.max(0, Math.min(1, quality));
}

function skipProduction() {
    if (!GameState.currentProject) return;
    
    const project = GameState.currentProject;
    project.productionWeeksRemaining = 0;
    completeProductionStage(project);
    updateUI();
    switchScreen('marketing');
}

// ====================================
// MARKETING STAGE
// ====================================

function setupMarketingSliders() {
    const sliders = [
        'billboardsSlider',
        'tvAdsSlider', 
        'socialMediaSlider',
        'internationalAdsSlider'
    ];
    
    sliders.forEach(sliderId => {
        const slider = document.getElementById(sliderId);
        if (slider) {
            slider.addEventListener('input', updateMarketingPreview);
        }
    });
}

function updateMarketingPreview() {
    // Get slider values
    const billboards = parseInt(document.getElementById('billboardsSlider').value);
    const tvAds = parseInt(document.getElementById('tvAdsSlider').value);
    const socialMedia = parseInt(document.getElementById('socialMediaSlider').value);
    const internationalAds = parseInt(document.getElementById('internationalAdsSlider').value);
    
    // Update value displays
    document.getElementById('billboardsValue').textContent = billboards;
    document.getElementById('tvAdsValue').textContent = tvAds;
    document.getElementById('socialMediaValue').textContent = socialMedia;
    document.getElementById('internationalAdsValue').textContent = internationalAds;
    
    // Calculate total budget
    const totalBudget = billboards + tvAds + socialMedia + internationalAds;
    document.getElementById('totalMarketingBudget').textContent = `₹${totalBudget} Cr`;
    
    // Calculate hype level
    const hypeLevel = Math.min(100, (totalBudget / 80) * 100); // Max hype at 80 Cr
    document.getElementById('expectedHype').textContent = `${Math.round(hypeLevel)}%`;
    
    // Update hype bar
    const hypeBar = document.getElementById('hypeBar');
    if (hypeBar) {
        hypeBar.style.width = `${hypeLevel}%`;
    }
    
    // Calculate audience reach
    let reach = 'Local';
    if (totalBudget >= 60) reach = 'Global';
    else if (totalBudget >= 40) reach = 'National';
    else if (totalBudget >= 20) reach = 'Regional';
    
    document.getElementById('audienceReach').textContent = reach;
    
    // Enable/disable launch button
    const launchBtn = document.getElementById('launchMarketingBtn');
    if (totalBudget > 0) {
        launchBtn.classList.remove('disabled');
        launchBtn.disabled = false;
    } else {
        launchBtn.classList.add('disabled');
        launchBtn.disabled = true;
    }
    
    // Store marketing data if current project exists
    if (GameState.currentProject) {
        GameState.currentProject.marketing = {
            billboards,
            tvAds,
            socialMedia,
            internationalAds,
            totalBudget,
            hypeLevel: hypeLevel / 100,
            reach
        };
    }
}

function launchMarketing() {
    if (!GameState.currentProject) return;
    
    const project = GameState.currentProject;
    const marketing = project.marketing;
    
    if (!marketing || marketing.totalBudget === 0) {
        showEvent({
            title: 'No Marketing Budget',
            description: 'Please allocate budget to at least one marketing channel.',
            icon: '⚠️'
        });
        return;
    }
    
    if (GameState.player.money < marketing.totalBudget) {
        showEvent({
            title: 'Insufficient Budget',
            description: `You need ₹${marketing.totalBudget} Cr for marketing but only have ₹${GameState.player.money} Cr.`,
            icon: '💸'
        });
        return;
    }
    
    // Deduct budget
    GameState.player.money -= marketing.totalBudget;
    
    // Store marketing data in project
    project.budget.marketing = marketing.totalBudget;
    project.budget.total += marketing.totalBudget;
    project.quality.marketing = marketing.hypeLevel;
    
    // Move to distribution
    project.stage = 'distribution';
    
    showEvent({
        title: 'Marketing Campaign Launched! 📢',
        description: `₹${marketing.totalBudget} Cr campaign is creating massive buzz! Expected hype: ${Math.round(marketing.hypeLevel * 100)}%`,
        icon: '🚀'
    });
    
    generateNewsItem(`📢 "${project.title}" marketing campaign creates ${marketing.reach.toLowerCase()} buzz with innovative ${getTopMarketingChannel(marketing)} strategy!`);
    
    updateUI();
    switchScreen('distribution');
}

function getTopMarketingChannel(marketing) {
    const channels = [
        { name: 'billboard', value: marketing.billboards },
        { name: 'TV', value: marketing.tvAds },
        { name: 'social media', value: marketing.socialMedia },
        { name: 'international', value: marketing.internationalAds }
    ];
    
    const topChannel = channels.reduce((max, channel) => 
        channel.value > max.value ? channel : max
    );
    
    return topChannel.name;
}

// ====================================
// DISTRIBUTION STAGE
// ====================================

function populateDistributors() {
    const container = document.getElementById('distributorsGrid');
    if (!container) return;
    
    container.innerHTML = '';
    
    IndustryData.distributors.forEach(distributor => {
        const card = document.createElement('div');
        card.className = 'distributor-card';
        card.setAttribute('data-distributor-id', distributor.id);
        
        card.innerHTML = `
            <div class="distributor-header">
                <h4 class="distributor-name">${distributor.name}</h4>
                <div class="distributor-stats">
                    <span class="stat-badge">${distributor.fee}% Fee</span>
                    <span class="stat-badge success">${distributor.reach}% Reach</span>
                </div>
            </div>
            <p class="distributor-description">${distributor.description}</p>
            <div class="distributor-specialties">
                <strong>Specialties:</strong> ${distributor.specialties.join(', ')}
            </div>
        `;
        
        card.addEventListener('click', () => selectDistributor(distributor, card));
        container.appendChild(card);
    });
}

function selectDistributor(distributor, element) {
    // Clear previous selection
    document.querySelectorAll('.distributor-card').forEach(card => {
        card.classList.remove('selected');
    });
    
    // Select current
    element.classList.add('selected');
    
    if (GameState.currentProject) {
        GameState.currentProject.distributor = distributor;
        updateDistributionCosts();
        
        // Enable finalize button
        const finalizeBtn = document.getElementById('finalizeDistributionBtn');
        finalizeBtn.classList.remove('disabled');
        finalizeBtn.disabled = false;
    }
}

function updateDistributionCosts() {
    if (!GameState.currentProject || !GameState.currentProject.distributor) return;
    
    const project = GameState.currentProject;
    const distributor = project.distributor;
    
    // Calculate costs
    const expectedRevenue = estimateRevenue(project);
    const partnerFee = Math.round((expectedRevenue * distributor.fee) / 100);
    const printCost = 8; // Fixed print & publicity cost
    const totalCost = partnerFee + printCost;
    
    // Update display
    document.getElementById('partnerFee').textContent = partnerFee;
    document.getElementById('printCost').textContent = printCost;
    document.getElementById('totalDistributionCost').textContent = totalCost;
    
    // Store in project
    project.distributionCosts = {
        partnerFee,
        printCost,
        totalCost
    };
}

function estimateRevenue(project) {
    // Rough estimate based on budget and quality
    const baseBudget = project.budget.total;
    const qualityMultiplier = (project.quality.script + project.quality.production + project.quality.marketing) / 3;
    return Math.round(baseBudget * (1 + qualityMultiplier * 2));
}

function finalizeDistribution() {
    if (!GameState.currentProject || !GameState.currentProject.distributor) {
        showEvent({
            title: 'No Distributor Selected',
            description: 'Please select a distribution partner before proceeding.',
            icon: '⚠️'
        });
        return;
    }
    
    const project = GameState.currentProject;
    const costs = project.distributionCosts;
    
    if (GameState.player.money < costs.totalCost) {
        showEvent({
            title: 'Insufficient Budget',
            description: `You need ₹${costs.totalCost} Cr for distribution but only have ₹${GameState.player.money} Cr.`,
            icon: '💸'
        });
        return;
    }
    
    // Deduct costs
    GameState.player.money -= costs.totalCost;
    
    // Store distribution data
    project.budget.distribution = costs.totalCost;
    project.budget.total += costs.totalCost;
    project.stage = 'release';
    
    showEvent({
        title: 'Distribution Deal Finalized! 🤝',
        description: `Partnership with ${project.distributor.name} confirmed. Time to choose the perfect release date!`,
        icon: '✅'
    });
    
    updateUI();
    switchScreen('release');
}

// ====================================
// RELEASE STAGE
// ====================================

function generateReleaseCalendar() {
    const calendar = document.getElementById('releaseCalendar');
    if (!calendar) return;
    
    calendar.innerHTML = '';
    
    // Generate next 8 weeks
    for (let i = 1; i <= 8; i++) {
        const week = GameState.gameTime.week + i;
        const displayWeek = week > 52 ? week - 52 : week;
        const year = week > 52 ? GameState.gameTime.year + 1 : GameState.gameTime.year;
        
        const weekCard = document.createElement('div');
        weekCard.className = 'calendar-week';
        weekCard.setAttribute('data-week', week);
        
        // Check for festivals
        const festival = FestivalWeeks.find(f => f.week === displayWeek);
        if (festival) {
            weekCard.classList.add('festival');
        }
        
        // Check for competition
        const competition = GameState.competitors.filter(c => c.releaseWeek === week);
        if (competition.length > 0) {
            weekCard.classList.add('competition');
        }
        
        // Mark as optimal if no festival and no/low competition
        if (!festival && competition.length === 0) {
            weekCard.classList.add('optimal');
        }
        
        weekCard.innerHTML = `
            <div class="week-header">
                <div class="week-number">Week ${displayWeek}</div>
                <div class="week-year">${year}</div>
            </div>
            <div class="week-status">
                ${festival ? `<span class="festival-badge">${festival.icon} ${festival.name}</span>` : ''}
                ${competition.length > 0 ? `<span class="competition-badge">${competition.length} rivals</span>` : ''}
                ${!festival && competition.length === 0 ? '<span class="optimal-badge">✅ Optimal</span>' : ''}
            </div>
        `;
        
        weekCard.addEventListener('click', () => selectReleaseWeek(week, weekCard));
        calendar.appendChild(weekCard);
    }
}

function selectReleaseWeek(week, element) {
    // Clear previous selection
    document.querySelectorAll('.calendar-week').forEach(w => {
        w.classList.remove('selected');
    });
    
    // Select current
    element.classList.add('selected');
    
    if (GameState.currentProject) {
        GameState.currentProject.releaseWeek = week;
        showWeekAnalysis(week);
        
        // Enable confirm button
        const confirmBtn = document.getElementById('confirmReleaseBtn');
        confirmBtn.classList.remove('disabled');
        confirmBtn.disabled = false;
        
        // Store OTT strategy
        const ottStrategy = document.getElementById('ottStrategy').value;
        if (ottStrategy) {
            GameState.currentProject.ottStrategy = ottStrategy;
        }
    }
}

function showWeekAnalysis(week) {
    const analysisCard = document.getElementById('weekAnalysis');
    const detailsContainer = document.getElementById('weekDetails');
    
    if (!analysisCard || !detailsContainer) return;
    
    const displayWeek = week > 52 ? week - 52 : week;
    const festival = FestivalWeeks.find(f => f.week === displayWeek);
    const competition = GameState.competitors.filter(c => c.releaseWeek === week);
    
    let analysisHTML = `
        <div class="week-analysis-header">
            <h4>Week ${displayWeek} Analysis</h4>
        </div>
        <div class="analysis-metrics">
    `;
    
    if (festival) {
        analysisHTML += `
            <div class="metric positive">
                <span class="metric-label">${festival.icon} ${festival.name}</span>
                <span class="metric-value">+${Math.round((festival.multiplier - 1) * 100)}% boost</span>
            </div>
        `;
    }
    
    if (competition.length > 0) {
        const penalty = competition.length * 15;
        analysisHTML += `
            <div class="metric negative">
                <span class="metric-label">Competition Impact</span>
                <span class="metric-value">-${penalty}% revenue</span>
            </div>
        `;
        
        analysisHTML += '<div class="competition-list"><strong>Competing Films:</strong>';
        competition.forEach(comp => {
            analysisHTML += `<div class="competitor-item">"${comp.title}" (${comp.genre})</div>`;
        });
        analysisHTML += '</div>';
    } else {
        analysisHTML += `
            <div class="metric positive">
                <span class="metric-label">Competition Impact</span>
                <span class="metric-value">Clear window!</span>
            </div>
        `;
    }
    
    analysisHTML += '</div>';
    detailsContainer.innerHTML = analysisHTML;
    analysisCard.classList.remove('hidden');
}

function confirmRelease() {
    if (!GameState.currentProject || !GameState.currentProject.releaseWeek) {
        showEvent({
            title: 'No Release Date Selected',
            description: 'Please select a release week from the calendar.',
            icon: '⚠️'
        });
        return;
    }
    
    const ottStrategy = document.getElementById('ottStrategy').value;
    if (!ottStrategy) {
        showEvent({
            title: 'OTT Strategy Required',
            description: 'Please select an OTT rights strategy before confirming release.',
            icon: '⚠️'
        });
        return;
    }
    
    GameState.currentProject.ottStrategy = ottStrategy;
    GameState.currentProject.stage = 'results';
    
    showLoading('Calculating box office results...', 3000);
    
    setTimeout(() => {
        calculateBoxOfficeResults();
        switchScreen('results');
    }, 3000);
}

// ====================================
// BOX OFFICE CALCULATION & RESULTS
// ====================================

function calculateBoxOfficeResults() {
    const project = GameState.currentProject;
    if (!project) return;
    
    let baseScore = 50; // Starting baseline
    
    // Script quality (20%)
    baseScore += (project.quality.script * 20);
    
    // Production quality (25%)
    baseScore += (project.quality.production * 25);
    
    // Star power (20%)
    const avgPopularity = project.leadActors.reduce((sum, actor) => sum + actor.popularity, 0) / project.leadActors.length;
    baseScore += (avgPopularity / 100 * 20);
    
    // Marketing impact (15%)
    baseScore += (project.quality.marketing * 15);
    
    // Genre matching bonuses (10%)
    let genreBonus = 0;
    if (project.crew.director && project.crew.director.specialty === project.genre) genreBonus += 5;
    
    const genreMatchingActors = project.leadActors.filter(actor => actor.specialty === project.genre).length;
    genreBonus += (genreMatchingActors * 2);
    
    if (project.crew.musicProducer && project.crew.musicProducer.specialty === project.genre) genreBonus += 3;
    
    baseScore += genreBonus;
    
    // Release timing impact (10%)
    const releaseBonus = calculateReleaseBonus(project.releaseWeek);
    baseScore += releaseBonus;
    
    // Random factor (±10)
    baseScore += (Math.random() * 20 - 10);
    
    // Ensure within bounds
    baseScore = Math.max(0, Math.min(100, baseScore));
    
    // Calculate financial results
    const financials = calculateFinancials(project, baseScore);
    
    // Determine verdict
    const verdict = determineVerdict(financials.profit, project.budget.total);
    
    // Calculate performance metrics
    const metrics = calculatePerformanceMetrics(baseScore, project);
    
    // Store results
    project.boxOffice = {
        ...financials,
        verdict: verdict,
        baseScore: Math.round(baseScore),
        ...metrics
    };
    
    // Update player stats
    updatePlayerStatsFromResults(project, verdict);
    
    // Move to portfolio
    moveProjectToPortfolio(project);
    
    // Display results
    displayResults(project);
    
    // Check for franchise opportunity
    checkFranchiseOpportunity(project, verdict);
    
    // Generate awards
    generateAwards(project, verdict);
    
    // Generate result news
    generateResultNews(project, verdict);
}

function calculateReleaseBonus(releaseWeek) {
    let bonus = 0;
    
    // Check for festivals
    const displayWeek = releaseWeek > 52 ? releaseWeek - 52 : releaseWeek;
    const festival = FestivalWeeks.find(f => f.week === displayWeek);
    if (festival) {
        bonus += ((festival.multiplier - 1) * 50);
    }
    
    // Competition penalty
    const competition = GameState.competitors.filter(c => c.releaseWeek === releaseWeek);
    bonus -= (competition.length * 5);
    
    return bonus;
}

function calculateFinancials(project, baseScore) {
    const totalBudget = project.budget.total;
    const scoreMultiplier = baseScore / 100;
    const projectMultiplier = ProjectConfig[project.type].revenueMultiplier;
    
    // Opening weekend
    const marketingImpact = project.quality.marketing;
    const starPower = project.leadActors.reduce((sum, actor) => sum + actor.popularity, 0) / project.leadActors.length / 100;
    const openingMultiplier = (marketingImpact + starPower) / 2;
    const openingWeekend = Math.round(totalBudget * 0.35 * openingMultiplier * projectMultiplier);
    
    // Domestic total
    const sustainabilityFactor = scoreMultiplier;
    const domesticMultiplier = 1 + (sustainabilityFactor * 2.5);
    const domesticTotal = Math.round(totalBudget * domesticMultiplier * projectMultiplier);
    
    // International (if international marketing was used)
    let internationalTotal = 0;
    if (project.marketing && project.marketing.internationalAds > 0) {
        const intlFactor = project.marketing.internationalAds / 40; // Max 40 Cr international ads
        internationalTotal = Math.round(domesticTotal * 0.3 * intlFactor);
    }
    
    // OTT rights
    const ottMultipliers = {
        immediate: 0.4,
        delayed: 0.25,
        exclusive: 0.6
    };
    const ottMultiplier = ottMultipliers[project.ottStrategy] || 0.25;
    const ottRights = Math.round(totalBudget * ottMultiplier);
    
    // Total revenue and profit
    const totalRevenue = domesticTotal + internationalTotal + ottRights;
    const profit = totalRevenue - totalBudget;
    
    return {
        totalBudget,
        openingWeekend,
        domesticTotal,
        internationalTotal,
        ottRights,
        totalRevenue,
        profit
    };
}

function determineVerdict(profit, budget) {
    const profitRatio = profit / budget;
    
    if (profitRatio >= 2.5) return 'blockbuster';
    if (profitRatio >= 1.5) return 'superhit';
    if (profitRatio >= 0.5) return 'hit';
    if (profitRatio >= 0.0) return 'average';
    return 'flop';
}

function calculatePerformanceMetrics(baseScore, project) {
    // Audience rating (1-10)
    const audienceRating = Math.round((baseScore / 10) * 10) / 10;
    
    // Critics score (0-100%)
    const criticsScore = Math.round(project.quality.script * 70 + project.quality.production * 30);
    
    // Music success
    let musicSuccess = 'Average';
    if (project.crew.musicProducer) {
        const musicScore = project.crew.musicProducer.reputation;
        if (musicScore >= 95) musicSuccess = 'Superhit';
        else if (musicScore >= 85) musicSuccess = 'Hit';
        else if (musicScore >= 75) musicSuccess = 'Good';
    }
    
    // Social buzz
    let socialBuzz = 'Low';
    if (project.marketing && project.marketing.socialMedia > 0) {
        if (baseScore >= 85) socialBuzz = 'Viral';
        else if (baseScore >= 70) socialBuzz = 'High';
        else if (baseScore >= 50) socialBuzz = 'Medium';
    }
    
    return {
        audienceRating,
        criticsScore,
        musicSuccess,
        socialBuzz
    };
}

function updatePlayerStatsFromResults(project, verdict) {
    GameState.player.completedProjects++;
    
    if (['blockbuster', 'superhit', 'hit'].includes(verdict)) {
        GameState.player.hitMovies++;
    }
    
    GameState.player.totalRevenue += project.boxOffice.totalRevenue;
    GameState.player.money += project.boxOffice.profit;
    
    // Reputation changes
    const reputationChanges = {
        'blockbuster': 15,
        'superhit': 10,
        'hit': 5,
        'average': 0,
        'flop': -8
    };
    
    GameState.player.reputation = Math.max(0, Math.min(100, 
        GameState.player.reputation + reputationChanges[verdict]));
}

function moveProjectToPortfolio(project) {
    // Remove from active projects
    GameState.activeProjects = GameState.activeProjects.filter(p => p.id !== project.id);
    
    // Add to portfolio
    GameState.portfolio.push(project);
    
    // Clear current project
    GameState.currentProject = null;
}

function displayResults(project) {
    const boxOffice = project.boxOffice;
    
    // Update title and verdict
    document.getElementById('movieTitle').textContent = `"${project.title}"`;
    
    const verdictElement = document.getElementById('movieVerdict');
    const verdictText = {
        'blockbuster': 'BLOCKBUSTER HIT! 🏆',
        'superhit': 'SUPERHIT! ⭐',
        'hit': 'HIT! 👏',
        'average': 'AVERAGE 😐',
        'flop': 'FLOP 💥'
    };
    
    verdictElement.textContent = verdictText[boxOffice.verdict];
    verdictElement.className = `verdict-badge ${boxOffice.verdict}`;
    
    // Update financial results
    document.getElementById('totalInvestment').textContent = `₹${boxOffice.totalBudget} Cr`;
    document.getElementById('openingWeekend').textContent = `₹${boxOffice.openingWeekend} Cr`;
    document.getElementById('domesticTotal').textContent = `₹${boxOffice.domesticTotal} Cr`;
    document.getElementById('internationalTotal').textContent = `₹${boxOffice.internationalTotal} Cr`;
    document.getElementById('ottRights').textContent = `₹${boxOffice.ottRights} Cr`;
    
    const netProfitEl = document.getElementById('netProfit');
    netProfitEl.textContent = `₹${Math.abs(boxOffice.profit)} Cr`;
    netProfitEl.className = `result-value ${boxOffice.profit >= 0 ? 'profit' : 'loss'}`;
    
    // Update performance metrics
    document.getElementById('audienceRating').textContent = `${boxOffice.audienceRating}/10`;
    document.getElementById('criticsScore').textContent = `${boxOffice.criticsScore}%`;
    document.getElementById('musicSuccess').textContent = boxOffice.musicSuccess;
    document.getElementById('socialBuzz').textContent = boxOffice.socialBuzz;
    
    // Update progress bars
    document.getElementById('audienceBar').style.width = `${boxOffice.audienceRating * 10}%`;
    document.getElementById('criticsBar').style.width = `${boxOffice.criticsScore}%`;
}

function checkFranchiseOpportunity(project, verdict) {
    const franchiseDiv = document.getElementById('franchiseOpportunity');
    if (!franchiseDiv) return;
    
    if (['blockbuster', 'superhit', 'hit'].includes(verdict) && Math.random() < 0.7) {
        franchiseDiv.classList.remove('hidden');
        
        // Add to franchises
        const existingFranchise = GameState.franchises.find(f => f.originalTitle === project.title);
        if (!existingFranchise) {
            GameState.franchises.push({
                id: generateId(),
                originalTitle: project.title,
                genre: project.genre,
                movies: [project],
                potential: verdict === 'blockbuster' ? 'Very High' : 'High'
            });
        }
    } else {
        franchiseDiv.classList.add('hidden');
    }
}

function generateAwards(project, verdict) {
    const container = document.getElementById('awardsGrid');
    if (!container) return;
    
    container.innerHTML = '';
    
    const awards = [];
    
    if (verdict === 'blockbuster') {
        awards.push({ name: 'Best Film Award', category: 'National Film Awards', icon: '🏆' });
        
        if (project.boxOffice.criticsScore >= 85) {
            awards.push({ name: 'Critics Choice Award', category: 'Film Critics Guild', icon: '🎭' });
        }
    }
    
    if (['blockbuster', 'superhit'].includes(verdict)) {
        awards.push({ name: 'Popular Film Award', category: 'Filmfare Awards', icon: '⭐' });
    }
    
    if (project.boxOffice.audienceRating >= 9.0) {
        awards.push({ name: 'Audience Choice Award', category: 'IIFA Awards', icon: '❤️' });
    }
    
    if (project.crew.director && project.crew.director.reputation >= 90 && verdict !== 'flop') {
        awards.push({ name: 'Best Director', category: 'Filmfare Awards', icon: '🎬' });
    }
    
    if (project.boxOffice.musicSuccess === 'Superhit') {
        awards.push({ name: 'Best Music Director', category: 'Music Awards', icon: '🎵' });
    }
    
    if (awards.length > 0) {
        GameState.player.totalAwards += awards.length;
        
        awards.forEach(award => {
            const awardEl = document.createElement('div');
            awardEl.className = 'award-card';
            awardEl.innerHTML = `
                <div class="award-icon">${award.icon}</div>
                <div class="award-content">
                    <div class="award-name">${award.name}</div>
                    <div class="award-category">${award.category}</div>
                </div>
            `;
            container.appendChild(awardEl);
            
            // Add to player's awards
            GameState.awards.push({
                ...award,
                project: project.title,
                year: GameState.gameTime.year
            });
        });
    } else {
        container.innerHTML = '<div class="no-awards">No awards this time. Keep creating great content!</div>';
    }
}

function generateResultNews(project, verdict) {
    const templates = {
        'blockbuster': [
            `🔥 "${project.title}" creates box office history with ₹${project.boxOffice.totalRevenue} Cr collection!`,
            `⭐ ${project.leadActors[0].name} delivers career-defining performance in "${project.title}"!`
        ],
        'hit': [
            `✅ "${project.title}" proves profitable with ₹${project.boxOffice.profit} Cr profit!`,
            `👏 "${project.title}" receives positive response from audiences nationwide!`
        ],
        'flop': [
            `📉 "${project.title}" disappoints at box office despite star cast!`,
            `💸 "${project.title}" fails to recover ₹${project.boxOffice.totalBudget} Cr investment!`
        ]
    };
    
    const newsTemplates = templates[verdict] || [`📰 "${project.title}" completes theatrical run.`];
    const news = newsTemplates[Math.floor(Math.random() * newsTemplates.length)];
    
    generateNewsItem(news);
}

function createSequel() {
    const originalProject = GameState.currentProject;
    if (!originalProject) return;
    
    switchScreen('script');
    
    setTimeout(() => {
        const franchise = GameState.franchises.find(f => f.originalTitle === originalProject.title);
        const sequelNumber = franchise ? franchise.movies.length + 1 : 2;
        
        document.getElementById('projectTitle').value = `${originalProject.title} ${sequelNumber}`;
        
        // Auto-select same type and genre
        const typeBtn = document.querySelector(`[data-value="${originalProject.type}"]`);
        const genreBtn = document.querySelector(`[data-value="${originalProject.genre}"]`);
        
        if (typeBtn) typeBtn.click();
        if (genreBtn) genreBtn.click();
        
        showEvent({
            title: 'Sequel Planning! 🎬',
            description: `Planning sequel for "${originalProject.title}". Fan excitement is through the roof!`,
            icon: '🎭'
        });
    }, 500);
}

// ====================================
// COMPETITOR SYSTEM
// ====================================

function generateInitialCompetitors() {
    const titles = [
        'Dil Ki Baat', 'Action Hero Returns', 'Love Story 2.0', 'Family Drama',
        'Thriller Nights', 'Comedy Express', 'Drama Queen', 'Historical Epic',
        'Romantic Melody', 'Action Thunder', 'Laugh Riot', 'Emotional Journey'
    ];
    
    const studios = [
        'StarMax Productions', 'CineWorld Studios', 'Golden Pictures', 
        'Silver Screen Entertainment', 'Bollywood Dreams', 'Mega Movies'
    ];
    
    const genres = ['romance', 'action', 'comedy', 'drama', 'thriller', 'family', 'historical'];
    
    // Generate 8-10 initial competitors
    for (let i = 0; i < 9; i++) {
        generateCompetitor();
    }
}

function generateCompetitor() {
    const titles = [
        'Blockbuster Dreams', 'Love Revolution', 'Action Thunder', 'Comedy Nights',
        'Family Reunion', 'Thriller Zone', 'Drama Story', 'Musical Magic',
        'Romance Reloaded', 'Action Packed', 'Funny Business', 'Heart Touching'
    ];
    
    const studios = [
        'Rival Studios', 'Competition Films', 'Box Office Productions', 
        'Star Entertainment', 'Cinema Masters', 'Movie Makers'
    ];
    
    const genres = ['romance', 'action', 'comedy', 'drama', 'thriller', 'family'];
    
    const competitor = {
        id: generateId(),
        title: titles[Math.floor(Math.random() * titles.length)],
        genre: genres[Math.floor(Math.random() * genres.length)],
        studio: studios[Math.floor(Math.random() * studios.length)],
        budget: Math.floor(Math.random() * 80) + 30,
        releaseWeek: GameState.gameTime.totalWeeks + Math.floor(Math.random() * 15) + 3,
        status: 'upcoming',
        hype: Math.floor(Math.random() * 60) + 20
    };
    
    GameState.competitors.push(competitor);
    
    // Keep only recent competitors
    GameState.competitors = GameState.competitors
        .filter(c => c.releaseWeek >= GameState.gameTime.totalWeeks - 5)
        .slice(0, 20);
    
    generateNewsItem(`🎬 ${competitor.studio} announces "${competitor.title}", a ${competitor.genre} film with ₹${competitor.budget} Cr budget!`);
}

function loadCompetitors() {
    const container = document.getElementById('competitorsList');
    if (!container) return;
    
    container.innerHTML = '';
    
    if (GameState.competitors.length === 0) {
        container.innerHTML = '<div class="empty-competitors">No competitor data available yet.</div>';
        return;
    }
    
    // Sort by release week
    const sortedCompetitors = [...GameState.competitors]
        .sort((a, b) => a.releaseWeek - b.releaseWeek)
        .slice(0, 10);
    
    sortedCompetitors.forEach(competitor => {
        const card = document.createElement('div');
        card.className = 'competitor-card';
        
        const weekDiff = competitor.releaseWeek - GameState.gameTime.totalWeeks;
        const timeText = weekDiff > 0 ? `Releases in ${weekDiff} weeks` : 
                        weekDiff === 0 ? 'Releasing this week' : 
                        `Released ${Math.abs(weekDiff)} weeks ago`;
        
card.innerHTML = `
            <div class="competitor-header">
                <h4 class="competitor-title">"${competitor.title}"</h4>
                <div class="competitor-badges">
                    <span class="genre-badge">${competitor.genre}</span>
                    <span class="budget-badge">₹${competitor.budget} Cr</span>
                </div>
            </div>
            <div class="competitor-details">
                <div class="competitor-studio">${competitor.studio}</div>
                <div class="competitor-timing">${timeText}</div>
                <div class="competitor-hype">Hype: ${competitor.hype}%</div>
            </div>
        `;
        
        container.appendChild(card);
    });
    
    // Update industry leaderboard
    updateIndustryLeaderboard();
}

function updateIndustryLeaderboard() {
    const container = document.getElementById('industryLeaderboard');
    if (!container) return;
    
    // Create mock leaderboard
    const leaders = [
        { rank: 1, name: GameState.player.studioName, revenue: GameState.player.totalRevenue, projects: GameState.player.completedProjects },
        { rank: 2, name: 'StarMax Productions', revenue: 2500, projects: 12 },
        { rank: 3, name: 'Golden Pictures', revenue: 1800, projects: 8 },
        { rank: 4, name: 'CineWorld Studios', revenue: 1200, projects: 6 },
        { rank: 5, name: 'Silver Screen Entertainment', revenue: 900, projects: 5 }
    ].sort((a, b) => b.revenue - a.revenue);
    
    // Re-assign ranks after sorting
    leaders.forEach((leader, index) => {
        leader.rank = index + 1;
    });
    
    container.innerHTML = '';
    
    leaders.slice(0, 5).forEach(leader => {
        const leaderCard = document.createElement('div');
        leaderCard.className = `leaderboard-item ${leader.name === GameState.player.studioName ? 'player' : ''}`;
        
        leaderCard.innerHTML = `
            <div class="leader-rank">${leader.rank}</div>
            <div class="leader-info">
                <div class="leader-name">${leader.name}</div>
                <div class="leader-stats">${leader.projects} projects</div>
            </div>
            <div class="leader-revenue">₹${leader.revenue} Cr</div>
        `;
        
        container.appendChild(leaderCard);
    });
}

// ====================================
// PORTFOLIO & PANELS
// ====================================

function loadPortfolio() {
    const grid = document.getElementById('portfolioGrid');
    if (!grid) return;
    
    grid.innerHTML = '';
    
    if (GameState.portfolio.length === 0) {
        grid.innerHTML = `
            <div class="empty-portfolio">
                <div class="empty-icon">🎬</div>
                <div class="empty-title">No Movies Yet</div>
                <div class="empty-subtitle">Start creating your first blockbuster!</div>
                <button class="btn-primary" data-screen="script">
                    <span class="btn-icon">➕</span>
                    Create First Movie
                </button>
            </div>
        `;
        return;
    }
    
    // Update portfolio stats
    updatePortfolioStats();
    
    // Display movies
    GameState.portfolio.forEach(project => {
        const card = createPortfolioMovieCard(project);
        grid.appendChild(card);
    });
}

function updatePortfolioStats() {
    const hits = GameState.portfolio.filter(p => 
        ['blockbuster', 'superhit', 'hit'].includes(p.boxOffice?.verdict)).length;
    const totalRevenue = GameState.portfolio.reduce((sum, p) => 
        sum + (p.boxOffice?.totalRevenue || 0), 0);
    
    document.getElementById('portfolioMovies').textContent = GameState.portfolio.length;
    document.getElementById('portfolioRevenue').textContent = `₹${totalRevenue}`;
    document.getElementById('portfolioHits').textContent = hits;
    document.getElementById('portfolioAwards').textContent = GameState.player.totalAwards;
}

function createPortfolioMovieCard(project) {
    const card = document.createElement('div');
    const verdict = project.boxOffice?.verdict || 'unknown';
    card.className = `portfolio-movie-card ${verdict}`;
    
    const profit = project.boxOffice?.profit || 0;
    const profitClass = profit >= 0 ? 'positive' : 'negative';
    
    card.innerHTML = `
        <div class="movie-poster">
            <div class="movie-genre">${project.genre}</div>
            <div class="movie-type">${ProjectConfig[project.type].name}</div>
        </div>
        <div class="movie-info">
            <h4 class="movie-title">"${project.title}"</h4>
            <div class="movie-cast">${project.leadActors.map(a => a.name).slice(0, 2).join(', ')}</div>
            <div class="movie-financials">
                <div class="financial-item">
                    <span class="label">Budget:</span>
                    <span class="value">₹${project.budget.total} Cr</span>
                </div>
                <div class="financial-item">
                    <span class="label">Revenue:</span>
                    <span class="value">₹${project.boxOffice?.totalRevenue || 0} Cr</span>
                </div>
                <div class="financial-item">
                    <span class="label">Profit:</span>
                    <span class="value ${profitClass}">₹${Math.abs(profit)} Cr</span>
                </div>
            </div>
            <div class="movie-verdict">${verdict.toUpperCase()}</div>
        </div>
    `;
    
    return card;
}

function loadFranchises() {
    const grid = document.getElementById('franchisesGrid');
    if (!grid) return;
    
    grid.innerHTML = '';
    
    if (GameState.franchises.length === 0) {
        grid.innerHTML = `
            <div class="empty-franchises">
                <div class="empty-icon">🎭</div>
                <div class="empty-title">No Franchises Yet</div>
                <div class="empty-subtitle">Create hit movies to unlock franchise opportunities!</div>
            </div>
        `;
        return;
    }
    
    GameState.franchises.forEach(franchise => {
        const card = createFranchiseCard(franchise);
        grid.appendChild(card);
    });
}

function createFranchiseCard(franchise) {
    const card = document.createElement('div');
    card.className = 'franchise-card';
    
    const totalRevenue = franchise.movies.reduce((sum, movie) => 
        sum + (movie.boxOffice?.totalRevenue || 0), 0);
    const avgRating = franchise.movies.reduce((sum, movie) => 
        sum + (movie.boxOffice?.audienceRating || 0), 0) / franchise.movies.length;
    
    card.innerHTML = `
        <div class="franchise-header">
            <h3 class="franchise-title">${franchise.originalTitle} Franchise</h3>
            <span class="franchise-potential">${franchise.potential} Potential</span>
        </div>
        <div class="franchise-stats">
            <div class="franchise-stat">
                <div class="stat-value">${franchise.movies.length}</div>
                <div class="stat-label">Movies</div>
            </div>
            <div class="franchise-stat">
                <div class="stat-value">₹${totalRevenue}</div>
                <div class="stat-label">Total Revenue</div>
            </div>
            <div class="franchise-stat">
                <div class="stat-value">${avgRating.toFixed(1)}/10</div>
                <div class="stat-label">Avg Rating</div>
            </div>
        </div>
        <div class="franchise-timeline">
            ${franchise.movies.map((movie, index) => `
                <div class="timeline-movie ${movie.boxOffice?.verdict || 'unknown'}">
                    ${index === 0 ? franchise.originalTitle : `${franchise.originalTitle} ${index + 1}`}
                </div>
            `).join('')}
        </div>
        <div class="franchise-actions">
            <button class="btn-secondary small" onclick="planFranchiseSequel('${franchise.id}')">
                Plan Next Movie
            </button>
        </div>
    `;
    
    return card;
}

function planFranchiseSequel(franchiseId) {
    const franchise = GameState.franchises.find(f => f.id === franchiseId);
    if (!franchise) return;
    
    switchScreen('script');
    
    setTimeout(() => {
        const sequelNumber = franchise.movies.length + 1;
        document.getElementById('projectTitle').value = `${franchise.originalTitle} ${sequelNumber}`;
        
        // Auto-select genre
        const genreBtn = document.querySelector(`[data-value="${franchise.genre}"]`);
        if (genreBtn) genreBtn.click();
        
        showEvent({
            title: 'Franchise Sequel! 🎭',
            description: `Planning the next installment of ${franchise.originalTitle} franchise. Fans are eagerly waiting!`,
            icon: '🎬'
        });
    }, 500);
}

function loadAwards() {
    const timeline = document.getElementById('awardsTimeline');
    if (!timeline) return;
    
    // Update award counts
    updateAwardCounts();
    
    timeline.innerHTML = '';
    
    if (GameState.awards.length === 0) {
        timeline.innerHTML = `
            <div class="empty-awards">
                <div class="empty-icon">🏆</div>
                <div class="empty-title">No Awards Yet</div>
                <div class="empty-subtitle">Create exceptional movies to win prestigious awards!</div>
            </div>
        `;
        return;
    }
    
    // Group awards by year
    const awardsByYear = {};
    GameState.awards.forEach(award => {
        if (!awardsByYear[award.year]) {
            awardsByYear[award.year] = [];
        }
        awardsByYear[award.year].push(award);
    });
    
    // Display by year
    Object.keys(awardsByYear).sort((a, b) => b - a).forEach(year => {
        const yearSection = document.createElement('div');
        yearSection.className = 'awards-year-section';
        
        yearSection.innerHTML = `
            <div class="awards-year-header">
                <h4 class="awards-year">${year}</h4>
                <span class="awards-count">${awardsByYear[year].length} awards</span>
            </div>
            <div class="awards-year-grid">
                ${awardsByYear[year].map(award => `
                    <div class="award-timeline-item">
                        <div class="award-timeline-icon">${award.icon}</div>
                        <div class="award-timeline-content">
                            <div class="award-timeline-name">${award.name}</div>
                            <div class="award-timeline-category">${award.category}</div>
                            <div class="award-timeline-project">For "${award.project}"</div>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
        
        timeline.appendChild(yearSection);
    });
}

function updateAwardCounts() {
    const nationalAwards = GameState.awards.filter(a => a.category.includes('National')).length;
    const filmfareAwards = GameState.awards.filter(a => a.category.includes('Filmfare')).length;
    const criticsAwards = GameState.awards.filter(a => a.category.includes('Critics')).length;
    const totalAwards = GameState.awards.length;
    
    document.getElementById('nationalAwards').textContent = nationalAwards;
    document.getElementById('filmfareAwards').textContent = filmfareAwards;
    document.getElementById('criticsAwards').textContent = criticsAwards;
    document.getElementById('totalAwardsCount').textContent = totalAwards;
}

// ====================================
// NEWS & EVENTS SYSTEM
// ====================================

function generateInitialNews() {
    const newsItems = [
        '🎬 Welcome to Bollywood Cinema v3.0! The most advanced production simulator ever created',
        '🌟 OTT platforms are investing record amounts in original Indian content',
        '💰 Box office revenues show strong recovery and promising growth trends',
        '🎭 Regional cinema continues to gain mainstream recognition nationwide',
        '📱 Social media marketing becomes crucial factor in movie success',
        '🎵 Music streaming platforms boosting film soundtrack revenues significantly'
    ];
    
    GameState.industryNews = newsItems.map((news, index) => ({
        id: generateId(),
        text: news,
        week: GameState.gameTime.totalWeeks - index,
        type: 'info'
    }));
}

function generateNewsItem(customText = null) {
    const templates = [
        '📈 Industry box office collections cross new milestone this quarter',
        '🎬 New production houses entering market with fresh innovative content',
        '⭐ Rising talent commanding higher fees amid growing industry demand',
        '💻 Technology advances transforming movie production workflows significantly',
        '🌍 International collaborations increasing in Indian cinema industry',
        '📺 Streaming platforms acquire more theatrical releases at premium rates',
        '🎪 Film festivals promoting independent cinema across multiple regions',
        '💡 Innovation in marketing strategies driving enhanced audience engagement'
    ];
    
    const newsText = customText || templates[Math.floor(Math.random() * templates.length)];
    
    GameState.industryNews.unshift({
        id: generateId(),
        text: newsText,
        week: GameState.gameTime.totalWeeks,
        type: customText ? 'project' : 'industry'
    });
    
    // Keep only recent news
    GameState.industryNews = GameState.industryNews.slice(0, 15);
}

function updateNewsTicker() {
    if (!Elements.newsTicker || GameState.industryNews.length === 0) return;
    
    const recentNews = GameState.industryNews.slice(0, 5);
    const newsText = recentNews.map(news => news.text).join(' • ');
    
    Elements.newsTicker.querySelector('.ticker-content').innerHTML = 
        `<span class="ticker-item">${newsText}</span>`;
}

function triggerRandomEvent() {
    const events = [
        {
            title: 'Government Tax Benefits! 💰',
            description: 'New film production tax incentives announced. Production costs reduced by 10%!',
            icon: '🏛️',
            type: 'positive'
        },
        {
            title: 'Streaming Wars Heat Up! 📺',
            description: 'Major OTT platforms compete fiercely, increasing content acquisition budgets by 25%!',
            icon: '💻',
            type: 'positive'
        },
        {
            title: 'Celebrity Controversy! 📰',
            description: 'Major star involved in controversy. Industry reputation takes a small hit.',
            icon: '🗞️',
            type: 'negative'
        },
        {
            title: 'International Recognition! 🌍',
            description: 'Bollywood gains major recognition at international film festivals worldwide!',
            icon: '🎬',
            type: 'positive'
        }
    ];
    
    const event = events[Math.floor(Math.random() * events.length)];
    
    showEvent(event);
    generateNewsItem(event.description);
    
    // Apply global effects
    if (event.type === 'positive') {
        GameState.player.reputation = Math.min(100, GameState.player.reputation + 1);
    } else if (event.type === 'negative') {
        GameState.player.reputation = Math.max(0, GameState.player.reputation - 2);
    }
}

// ====================================
// UTILITY FUNCTIONS
// ====================================

function generateId() {
    return 'id_' + Math.random().toString(36).substr(2, 9) + '_' + Date.now().toString(36);
}

function showEvent(event) {
    const modal = Elements.eventModal;
    const icon = document.getElementById('eventIcon');
    const title = document.getElementById('eventTitle');
    const description = document.getElementById('eventDescription');
    
    if (icon) icon.textContent = event.icon || '🎬';
    if (title) title.textContent = event.title;
    if (description) description.textContent = event.description;
    
    if (modal) {
        modal.classList.remove('hidden');
        modal.classList.add('flex');
    }
    
    // Auto-close after 5 seconds
    setTimeout(() => {
        if (modal && !modal.classList.contains('hidden')) {
            closeEventModal();
        }
    }, 5000);
}

function closeEventModal() {
    const modal = Elements.eventModal;
    if (modal) {
        modal.classList.add('hidden');
        modal.classList.remove('flex');
    }
}

function showLoading(text = 'Processing...', duration = 2000) {
    const overlay = Elements.loadingOverlay;
    const loadingText = document.querySelector('.loading-text');
    
    if (loadingText) loadingText.textContent = text;
    if (overlay) overlay.classList.remove('hidden');
    
    setTimeout(() => {
        if (overlay) overlay.classList.add('hidden');
    }, duration);
}

function toggleTheme() {
    GameState.settings.darkMode = !GameState.settings.darkMode;
    document.body.classList.toggle('dark-theme', GameState.settings.darkMode);
    
    const themeIcon = document.getElementById('themeIcon');
    if (themeIcon) {
        themeIcon.textContent = GameState.settings.darkMode ? '☀️' : '🌙';
    }
    
    saveGame();
}

// ====================================
// SAVE/LOAD SYSTEM
// ====================================

function saveGame() {
    const saveData = {
        version: GameState.version,
        timestamp: Date.now(),
        gameState: GameState
    };
    
    try {
        localStorage.setItem('bollywoodCinema_v3.0_save', JSON.stringify(saveData));
        console.log('✅ Game saved successfully');
        
        // Show brief confirmation
        showEvent({
            title: 'Game Saved! 💾',
            description: 'Your progress has been saved automatically.',
            icon: '✅'
        });
        
    } catch (error) {
        console.error('❌ Save failed:', error);
        showEvent({
            title: 'Save Failed! ⚠️',
            description: 'Unable to save game progress. Please try again.',
            icon: '❌'
        });
    }
}

function loadSavedGame() {
    try {
        const savedData = localStorage.getItem('bollywoodCinema_v3.0_save');
        if (!savedData) return false;
        
        const data = JSON.parse(savedData);
        
        if (data.version !== GameState.version) {
            console.warn('⚠️ Save version mismatch, starting fresh game');
            return false;
        }
        
        // Load game state
        Object.assign(GameState, data.gameState);
        
        console.log('✅ Game loaded successfully');
        return true;
        
    } catch (error) {
        console.error('❌ Load failed:', error);
        return false;
    }
}

// ====================================
// FINAL INITIALIZATION
// ====================================

// Export functions for global access (for onclick handlers)
window.switchScreen = switchScreen;
window.removeTag = removeTag;
window.planFranchiseSequel = planFranchiseSequel;

// Auto-save interval
if (GameState.settings && GameState.settings.autoSave) {
    setInterval(() => {
        if (GameState.gameTime.totalWeeks > 1) {
            saveGame();
        }
    }, 300000); // Auto-save every 5 minutes
}

console.log('🎬✨ Bollywood Cinema v3.0 - Premium Edition Ready! ✨🎭');
console.log('🚀 Features: Advanced UI • Pure JS Dropdowns • Complete Production Pipeline');
console.log('💎 Premium Experience: Mobile App Feel • Smooth Animations • Professional Design');
console.log('🎯 Ready to create cinematic masterpieces!');
