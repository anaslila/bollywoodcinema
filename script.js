// ====================================
// BOLLYWOOD CINEMA v2.5 - COMPLETE GAME LOGIC
// ====================================

// Game State Management
const GameState = {
    version: "2.5",
    currentSection: 'dashboard',
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
        flopMovies: 0,
        totalRevenue: 0,
        totalAwards: 0,
        achievementsUnlocked: ['first-steps']
    },
    currentProject: null,
    activeProjects: [],
    portfolio: [],
    competitors: [],
    franchises: [],
    awards: [],
    industryNews: [],
    nextCompetitorWeek: 6,
    settings: {
        darkMode: false,
        soundEnabled: true,
        autosave: true
    }
};

// Industry Database
const IndustryData = {
    writers: [
        { id: 'w1', name: 'Aarav Mehta', fee: 3, skill: 88, speed: 92, specialty: 'romance', reputation: 85 },
        { id: 'w2', name: 'Kavita Joshi', fee: 4, skill: 92, speed: 85, specialty: 'drama', reputation: 90 },
        { id: 'w3', name: 'Sameer Khan', fee: 2, skill: 78, speed: 95, specialty: 'action', reputation: 75 },
        { id: 'w4', name: 'Priya Iyer', fee: 3.5, skill: 85, speed: 88, specialty: 'comedy', reputation: 80 },
        { id: 'w5', name: 'Rohit Chawla', fee: 5, skill: 95, speed: 80, specialty: 'thriller', reputation: 92 }
    ],
    directors: [
        { id: 'd1', name: 'Rajan Kapoor', fee: 12, reputation: 95, specialty: 'romance', hitRate: 0.88 },
        { id: 'd2', name: 'Neha Deshmukh', fee: 8, reputation: 82, specialty: 'drama', hitRate: 0.75 },
        { id: 'd3', name: 'Arjun Bhatia', fee: 15, reputation: 92, specialty: 'action', hitRate: 0.85 },
        { id: 'd4', name: 'Meera Verma', fee: 10, reputation: 88, specialty: 'comedy', hitRate: 0.80 },
        { id: 'd5', name: 'Kabir Saxena', fee: 18, reputation: 98, specialty: 'thriller', hitRate: 0.92 }
    ],
    maleActors: [
        { id: 'ma1', name: 'Aamir Khanna', fee: 45, popularity: 95, specialty: 'drama', marketValue: 98 },
        { id: 'ma2', name: 'Raj Malhotra', fee: 40, popularity: 88, specialty: 'romance', marketValue: 92 },
        { id: 'ma3', name: 'Dev Kapoor', fee: 50, popularity: 92, specialty: 'action', marketValue: 95 },
        { id: 'ma4', name: 'Vikram Rathore', fee: 35, popularity: 85, specialty: 'action', marketValue: 88 },
        { id: 'ma5', name: 'Aryan Singh', fee: 25, popularity: 78, specialty: 'comedy', marketValue: 82 }
    ],
    femaleActors: [
        { id: 'fa1', name: 'Priya Sharma', fee: 25, popularity: 92, specialty: 'romance', marketValue: 95 },
        { id: 'fa2', name: 'Anjali Nair', fee: 20, popularity: 85, specialty: 'drama', marketValue: 88 },
        { id: 'fa3', name: 'Meera Kapoor', fee: 30, popularity: 90, specialty: 'action', marketValue: 92 },
        { id: 'fa4', name: 'Radhika Sen', fee: 18, popularity: 82, specialty: 'comedy', marketValue: 85 },
        { id: 'fa5', name: 'Sonia Chawla', fee: 15, popularity: 78, specialty: 'family', marketValue: 80 }
    ],
    supportingActors: [
        { id: 'sa1', name: 'Ramesh Yadav', fee: 2, skill: 85, specialty: 'comedy' },
        { id: 'sa2', name: 'Kiran Joshi', fee: 3, skill: 88, specialty: 'drama' },
        { id: 'sa3', name: 'Pooja Sharma', fee: 2.5, skill: 82, specialty: 'family' },
        { id: 'sa4', name: 'Akash Verma', fee: 3.5, skill: 90, specialty: 'action' }
    ],
    musicProducers: [
        { id: 'mp1', name: 'Aditya Bose', fee: 8, reputation: 92, specialty: 'romantic', hitRate: 0.85 },
        { id: 'mp2', name: 'Rehan Ali', fee: 10, reputation: 95, specialty: 'classical', hitRate: 0.90 },
        { id: 'mp3', name: 'Sunil Sharma', fee: 6, reputation: 82, specialty: 'commercial', hitRate: 0.75 }
    ],
    playbackSingers: [
        { id: 'ps1', name: 'Alisha Verma', fee: 3, popularity: 88, specialty: 'romantic' },
        { id: 'ps2', name: 'Rohan Das', fee: 2.5, popularity: 85, specialty: 'classical' },
        { id: 'ps3', name: 'Sneha Patel', fee: 4, popularity: 92, specialty: 'dance' }
    ],
    lyricists: [
        { id: 'l1', name: 'Manish Sinha', fee: 1.5, skill: 88, specialty: 'romantic' },
        { id: 'l2', name: 'Kavya Rao', fee: 2, skill: 92, specialty: 'poetic' },
        { id: 'l3', name: 'Deepak Nair', fee: 1.2, skill: 82, specialty: 'commercial' }
    ],
    distributors: [
        { 
            id: 'dist1', name: 'StarMax Studios', fee: 22, reach: 95, reliability: 92,
            description: 'Premium distributor with nationwide reach and excellent marketing.'
        },
        { 
            id: 'dist2', name: 'CineWorld India', fee: 18, reach: 88, reliability: 85,
            description: 'Strong presence in urban markets with modern digital distribution.'
        },
        { 
            id: 'dist3', name: 'Bharat Films', fee: 15, reach: 82, reliability: 88,
            description: 'Traditional distributor with deep rural market penetration.'
        }
    ]
};

// Festival Calendar
const FestivalWeeks = [
    { week: 4, name: 'Republic Day', multiplier: 1.25, competition: 'high' },
    { week: 12, name: 'Holi Festival', multiplier: 1.15, competition: 'medium' },
    { week: 20, name: 'Eid Celebration', multiplier: 1.20, competition: 'medium' },
    { week: 32, name: 'Independence Day', multiplier: 1.30, competition: 'high' },
    { week: 45, name: 'Diwali', multiplier: 1.35, competition: 'very-high' },
    { week: 52, name: 'New Year', multiplier: 1.12, competition: 'medium' }
];

// DOM Elements Cache
let Elements = {};

// ====================================
// INITIALIZATION
// ====================================

document.addEventListener('DOMContentLoaded', function() {
    console.log('🎬 Bollywood Cinema v2.5 Loading...');
    
    initializeElements();
    setupEventListeners();
    loadSavedGame();
    initializeGame();
    
    console.log('🎭 Game Ready!');
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
        totalAwards: document.getElementById('totalAwards'),
        successRate: document.getElementById('successRate'),
        newsTicker: document.getElementById('newsTicker'),
        
        // Navigation
        navTabs: document.querySelectorAll('.nav-tab'),
        
        // Modals
        tutorialModal: document.getElementById('tutorialModal'),
        eventModal: document.getElementById('eventModal')
    };
}

function setupEventListeners() {
    // Navigation
    Elements.navTabs.forEach(tab => {
        tab.addEventListener('click', (e) => {
            const section = tab.getAttribute('data-section');
            switchSection(section);
        });
    });
    
    // Header buttons
    document.getElementById('nextWeekBtn').addEventListener('click', advanceWeek);
    document.getElementById('darkModeToggle').addEventListener('click', toggleDarkMode);
    
    // Dashboard buttons
    document.getElementById('newProjectBtn').addEventListener('click', () => switchSection('script-stage'));
    document.getElementById('tutorialBtn').addEventListener('click', showTutorial);
    document.getElementById('saveGameBtn').addEventListener('click', saveGame);
    
    // Script stage
    document.getElementById('startScriptBtn').addEventListener('click', startScriptDevelopment);
    document.getElementById('cancelProjectBtn').addEventListener('click', cancelProject);
    
    // Crew stage
    document.getElementById('finalizeCrewBtn').addEventListener('click', finalizeCrewHiring);
    document.getElementById('backToScriptBtn').addEventListener('click', () => switchSection('script-stage'));
    
    // Production stage
    document.getElementById('skipProductionBtn').addEventListener('click', skipProduction);
    
    // Marketing stage
    document.getElementById('launchMarketingBtn').addEventListener('click', launchMarketing);
    document.getElementById('marketingBudgetSlider').addEventListener('input', updateMarketingPreview);
    
    // Distribution stage
    document.getElementById('finalizeDistributionBtn').addEventListener('click', finalizeDistribution);
    
    // Release stage
    document.getElementById('confirmReleaseBtn').addEventListener('click', confirmRelease);
    
    // Results stage
    document.getElementById('startNewProjectFromResults').addEventListener('click', () => switchSection('script-stage'));
    document.getElementById('createSequelBtn').addEventListener('click', createSequel);
    
    // Modal events
    document.getElementById('closeTutorial').addEventListener('click', hideTutorial);
    document.getElementById('closeEventModal').addEventListener('click', closeEventModal);
    
    // Setup dropdown population
    populateDropdowns();
    
    // Setup marketing checkboxes
    document.querySelectorAll('.marketing-checkbox').forEach(checkbox => {
        checkbox.addEventListener('change', updateMarketingPreview);
    });
    
    document.querySelectorAll('.region-checkbox').forEach(checkbox => {
        checkbox.addEventListener('change', updateMarketingPreview);
    });
    
    // Keyboard shortcuts
    document.addEventListener('keydown', handleKeyboardShortcuts);
}

function initializeGame() {
    updateUI();
    generateInitialNews();
    generateInitialCompetitors();
    
    // Start with tutorial for new games
    if (GameState.gameTime.totalWeeks === 1) {
        setTimeout(() => showTutorial(), 1000);
    }
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
    updateActiveProjects();
    
    // Generate competitors periodically
    if (GameState.gameTime.totalWeeks >= GameState.nextCompetitorWeek) {
        generateCompetitor();
        GameState.nextCompetitorWeek = GameState.gameTime.totalWeeks + Math.floor(Math.random() * 3) + 4; // 4-6 weeks
    }
    
    // Generate industry news
    if (Math.random() < 0.3) {
        generateNewsItem();
    }
    
    // Check for festival weeks
    checkFestivalWeek();
    
    // Update UI
    updateUI();
    
    // Autosave
    if (GameState.settings.autosave && GameState.gameTime.totalWeeks % 5 === 0) {
        saveGame();
    }
}

function updateActiveProjects() {
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
            title: `${festival.name}! 🎉`,
            description: `This is a great time for releases! Box office boost of ${Math.round((festival.multiplier - 1) * 100)}% expected.`,
            type: 'positive',
            icon: '🎊'
        });
        
        generateNewsItem(`🎉 ${festival.name} celebrations boost box office expectations across the industry!`);
    }
}

// ====================================
// NAVIGATION SYSTEM
// ====================================

function switchSection(sectionName) {
    // Hide all sections
    document.querySelectorAll('.section-content').forEach(section => {
        section.classList.add('hidden');
    });
    
    // Remove active from all tabs
    Elements.navTabs.forEach(tab => {
        tab.classList.remove('active');
    });
    
    // Show target section
    const targetSection = document.getElementById(sectionName);
    if (targetSection) {
        targetSection.classList.remove('hidden');
    }
    
    // Add active to current tab
    const activeTab = document.querySelector(`[data-section="${sectionName}"]`);
    if (activeTab) {
        activeTab.classList.add('active');
    }
    
    GameState.currentSection = sectionName;
    
    // Initialize section-specific content
    switch(sectionName) {
        case 'crew-stage':
            initializeCrewStage();
            break;
        case 'marketing-stage':
            updateMarketingPreview();
            break;
        case 'distribution-stage':
            populateDistributors();
            break;
        case 'release-stage':
            generateReleaseCalendar();
            break;
        case 'portfolio-panel':
            loadPortfolio();
            break;
        case 'competitors-panel':
            loadCompetitors();
            break;
    }
}

function updateUI() {
    // Update header
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
    
    // Update active projects display
    updateActiveProjectsDisplay();
}

function updateActiveProjectsDisplay() {
    const container = document.getElementById('activeProjectsList');
    const activeProjectsSection = document.getElementById('activeProjects');
    
    if (!container || !activeProjectsSection) return;
    
    if (GameState.activeProjects.length === 0) {
        activeProjectsSection.classList.add('hidden');
        return;
    }
    
    activeProjectsSection.classList.remove('hidden');
    container.innerHTML = '';
    
    GameState.activeProjects.forEach(project => {
        const card = document.createElement('div');
        card.className = 'bg-white/10 rounded-lg p-4 border border-white/20';
        
        const progress = calculateProjectProgress(project);
        
        card.innerHTML = `
            <div class="flex items-center justify-between mb-2">
                <h4 class="font-bold text-gold">"${project.title}"</h4>
                <span class="text-xs bg-blue-600 px-2 py-1 rounded-full">${project.stage}</span>
            </div>
            <div class="text-sm text-gray-300 mb-3">${project.type} • ${project.genre}</div>
            <div class="progress-bar mb-3">
                <div class="progress-fill" style="width: ${progress}%"></div>
            </div>
            <div class="flex justify-between text-xs">
                <span class="text-gray-400">Progress: ${progress}%</span>
                ${project.stage === 'script' && project.scriptWeeksRemaining ? 
                    `<span class="text-gold">${project.scriptWeeksRemaining} weeks left</span>` :
                project.stage === 'production' && project.productionWeeksRemaining ?
                    `<span class="text-gold">${project.productionWeeksRemaining} weeks left</span>` : ''}
            </div>
        `;
        
        container.appendChild(card);
    });
}

function calculateProjectProgress(project) {
    const stages = ['script', 'crew', 'production', 'marketing', 'distribution', 'release'];
    const currentIndex = stages.indexOf(project.stage);
    
    if (project.stage === 'script' && project.scriptWeeksRemaining) {
        const scriptProgress = ((project.scriptWeeksTotal - project.scriptWeeksRemaining) / project.scriptWeeksTotal) * (100 / stages.length);
        return Math.round(scriptProgress);
    } else if (project.stage === 'production' && project.productionWeeksRemaining) {
        const baseProgress = (1 / stages.length) * 100; // Script complete
        baseProgress += (1 / stages.length) * 100; // Crew complete
        const productionProgress = ((project.productionWeeksTotal - project.productionWeeksRemaining) / project.productionWeeksTotal) * (100 / stages.length);
        return Math.round(baseProgress + productionProgress);
    }
    
    return Math.round((currentIndex / stages.length) * 100);
}

// ====================================
// SCRIPT DEVELOPMENT
// ====================================

function populateDropdowns() {
    // Populate writer dropdown
    const writerSelect = document.getElementById('writerSearch');
    if (writerSelect) {
        IndustryData.writers.forEach(writer => {
            const option = document.createElement('option');
            option.value = writer.id;
            option.textContent = `${writer.name} (₹${writer.fee}Cr, ${writer.skill}% skill, ${writer.specialty})`;
            writerSelect.appendChild(option);
        });
    }
    
    // Populate director dropdown
    const directorSelect = document.getElementById('directorSearch');
    if (directorSelect) {
        IndustryData.directors.forEach(director => {
            const option = document.createElement('option');
            option.value = director.id;
            option.textContent = `${director.name} (₹${director.fee}Cr, ${director.reputation}% reputation, ${director.specialty})`;
            directorSelect.appendChild(option);
        });
    }
    
    // Populate male actors
    const maleLeadSelect = document.getElementById('maleLeadSearch');
    if (maleLeadSelect) {
        IndustryData.maleActors.forEach(actor => {
            const option = document.createElement('option');
            option.value = actor.id;
            option.textContent = `${actor.name} (₹${actor.fee}Cr, ${actor.popularity}% popularity, ${actor.specialty})`;
            maleLeadSelect.appendChild(option);
        });
    }
    
    // Populate female actors
    const femaleLeadSelect = document.getElementById('femaleLeadSearch');
    if (femaleLeadSelect) {
        IndustryData.femaleActors.forEach(actress => {
            const option = document.createElement('option');
            option.value = actress.id;
            option.textContent = `${actress.name} (₹${actress.fee}Cr, ${actress.popularity}% popularity, ${actress.specialty})`;
            femaleLeadSelect.appendChild(option);
        });
    }
    
    // Populate music producers
    const musicProducerSelect = document.getElementById('musicProducerSearch');
    if (musicProducerSelect) {
        IndustryData.musicProducers.forEach(producer => {
            const option = document.createElement('option');
            option.value = producer.id;
            option.textContent = `${producer.name} (₹${producer.fee}Cr, ${producer.reputation}% reputation, ${producer.specialty})`;
            musicProducerSelect.appendChild(option);
        });
    }
}

function startScriptDevelopment() {
    if (!validateScriptForm()) return;
    
    const writerId = document.getElementById('writerSearch').value;
    const writer = IndustryData.writers.find(w => w.id === writerId);
    
    if (!writer) {
        showError('Please select a writer');
        return;
    }
    
    const complexity = document.getElementById('scriptLength').value;
    const scriptCost = calculateScriptCost(writer, complexity);
    
    if (GameState.player.money < scriptCost) {
        showError(`Insufficient funds! You need ₹${scriptCost} Cr but have ₹${GameState.player.money} Cr`);
        return;
    }
    
    // Create new project
    const project = {
        id: generateId(),
        title: document.getElementById('projectTitle').value,
        type: document.getElementById('projectType').value,
        genre: document.getElementById('projectGenre').value,
        complexity: complexity,
        stage: 'script',
        writer: writer,
        crew: {},
        budget: {
            script: scriptCost,
            crew: 0,
            production: 0,
            marketing: 0,
            distribution: 0,
            total: scriptCost
        },
        quality: {
            script: 0,
            production: 0,
            music: 0,
            marketing: 0
        },
        events: [],
        scriptWeeksTotal: calculateScriptWeeks(complexity, writer.speed),
        scriptWeeksRemaining: 0
    };
    
    // Set script development time
    project.scriptWeeksRemaining = project.scriptWeeksTotal;
    
    // Deduct money
    GameState.player.money -= scriptCost;
    GameState.player.totalProjects++;
    
    // Add to active projects
    GameState.activeProjects.push(project);
    GameState.currentProject = project;
    
    showEvent({
        title: 'Script Development Started! 📝',
        description: `"${project.title}" script development will take ${project.scriptWeeksTotal} weeks. Your writer is hard at work!`,
        type: 'positive',
        icon: '✍️'
    });
    
    updateUI();
    switchSection('dashboard');
}

function validateScriptForm() {
    const title = document.getElementById('projectTitle').value.trim();
    const type = document.getElementById('projectType').value;
    const genre = document.getElementById('projectGenre').value;
    const complexity = document.getElementById('scriptLength').value;
    const writerId = document.getElementById('writerSearch').value;
    
    if (!title) {
        showError('Please enter a project title');
        return false;
    }
    
    if (!type || !genre || !complexity) {
        showError('Please fill in all project details');
        return false;
    }
    
    if (!writerId) {
        showError('Please select a writer');
        return false;
    }
    
    return true;
}

function calculateScriptCost(writer, complexity) {
    const complexityMultiplier = {
        simple: 1.0,
        standard: 1.5,
        complex: 2.2
    };
    
    return Math.round(writer.fee * complexityMultiplier[complexity]);
}

function calculateScriptWeeks(complexity, writerSpeed) {
    const baseWeeks = {
        simple: 4,
        standard: 6,
        complex: 8
    };
    
    const speedFactor = writerSpeed / 100;
    const weeks = baseWeeks[complexity] / speedFactor;
    
    return Math.max(3, Math.round(weeks));
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
        type: 'positive',
        icon: '✅'
    });
    
    generateNewsItem(`📝 "${project.title}" script development completed at ${GameState.player.studioName}!`);
}

function cancelProject() {
    if (GameState.currentProject) {
        // Remove from active projects
        GameState.activeProjects = GameState.activeProjects.filter(p => p.id !== GameState.currentProject.id);
        GameState.currentProject = null;
        GameState.player.totalProjects--;
    }
    
    switchSection('dashboard');
}

// ====================================
// CREW HIRING
// ====================================

function initializeCrewStage() {
    if (!GameState.currentProject) {
        switchSection('dashboard');
        return;
    }
    
    setupCrewEventListeners();
    updateCrewBudget();
}

function setupCrewEventListeners() {
    // Director selection
    const directorSelect = document.getElementById('directorSearch');
    if (directorSelect) {
        directorSelect.addEventListener('change', () => selectCrewMember('director', directorSelect.value));
    }
    
    // Male lead selection
    const maleLeadSelect = document.getElementById('maleLeadSearch');
    if (maleLeadSelect) {
        maleLeadSelect.addEventListener('change', () => selectCrewMember('maleLead', maleLeadSelect.value));
    }
    
    // Female lead selection
    const femaleLeadSelect = document.getElementById('femaleLeadSearch');
    if (femaleLeadSelect) {
        femaleLeadSelect.addEventListener('change', () => selectCrewMember('femaleLead', femaleLeadSelect.value));
    }
    
    // Music producer selection
    const musicProducerSelect = document.getElementById('musicProducerSearch');
    if (musicProducerSelect) {
        musicProducerSelect.addEventListener('change', () => selectCrewMember('musicProducer', musicProducerSelect.value));
    }
}

function selectCrewMember(role, memberId) {
    if (!GameState.currentProject || !memberId) return;
    
    const member = findCrewMember(role, memberId);
    if (!member) return;
    
    GameState.currentProject.crew[role] = member;
    
    // Show selection
    showSelectedCrewMember(role, member);
    
    // Update budget
    updateCrewBudget();
    
    // Check if crew is complete
    checkCrewCompletion();
}

function findCrewMember(role, memberId) {
    switch(role) {
        case 'director':
            return IndustryData.directors.find(d => d.id === memberId);
        case 'maleLead':
            return IndustryData.maleActors.find(a => a.id === memberId);
        case 'femaleLead':
            return IndustryData.femaleActors.find(a => a.id === memberId);
        case 'musicProducer':
            return IndustryData.musicProducers.find(m => m.id === memberId);
        default:
            return null;
    }
}

function showSelectedCrewMember(role, member) {
    const containers = {
        director: 'selectedDirector',
        maleLead: 'selectedMaleLead',
        femaleLead: 'selectedFemaleLead',
        musicProducer: 'selectedMusicProducer'
    };
    
    const containerId = containers[role];
    const container = document.getElementById(containerId);
    
    if (container) {
        container.classList.remove('hidden');
        container.innerHTML = `
            <h4 class="text-green-400 font-bold mb-2">Selected: ${member.name}</h4>
            <div class="text-sm text-gray-300">
                <div>Fee: ₹${member.fee} Cr</div>
                <div>Specialty: ${member.specialty}</div>
                ${member.reputation ? `<div>Reputation: ${member.reputation}%</div>` : ''}
                ${member.popularity ? `<div>Popularity: ${member.popularity}%</div>` : ''}
            </div>
        `;
    }
}

function updateCrewBudget() {
    if (!GameState.currentProject) return;
    
    let total = 0;
    const breakdown = [];
    
    Object.entries(GameState.currentProject.crew).forEach(([role, member]) => {
        if (member && member.fee) {
            total += member.fee;
            breakdown.push({
                role: formatRoleName(role),
                name: member.name,
                fee: member.fee
            });
        }
    });
    
    const breakdownContainer = document.getElementById('crewBudgetBreakdown');
    if (breakdownContainer) {
        breakdownContainer.innerHTML = breakdown.map(item => `
            <div class="budget-item">
                <span class="budget-category">${item.role}: ${item.name}</span>
                <span class="budget-amount">₹${item.fee} Cr</span>
            </div>
        `).join('');
    }
    
    const totalElement = document.getElementById('totalCrewCost');
    if (totalElement) {
        totalElement.textContent = `₹${total} Cr`;
    }
    
    GameState.currentProject.budget.crew = total;
}

function formatRoleName(role) {
    const names = {
        director: 'Director',
        maleLead: 'Male Lead',
        femaleLead: 'Female Lead',
        musicProducer: 'Music Producer'
    };
    return names[role] || role;
}

function checkCrewCompletion() {
    if (!GameState.currentProject) return;
    
    const crew = GameState.currentProject.crew;
    const isComplete = crew.director && crew.maleLead && crew.femaleLead;
    
    const finalizeBtn = document.getElementById('finalizeCrewBtn');
    if (finalizeBtn) {
        finalizeBtn.disabled = !isComplete;
        if (isComplete) {
            finalizeBtn.classList.remove('opacity-50');
        } else {
            finalizeBtn.classList.add('opacity-50');
        }
    }
}

function finalizeCrewHiring() {
    if (!GameState.currentProject) return;
    
    const totalCost = GameState.currentProject.budget.crew;
    
    if (GameState.player.money < totalCost) {
        showError(`Insufficient funds! You need ₹${totalCost} Cr but have ₹${GameState.player.money} Cr`);
        return;
    }
    
    // Deduct money
    GameState.player.money -= totalCost;
    
    // Move to production
    GameState.currentProject.stage = 'production';
    GameState.currentProject.productionWeeksTotal = calculateProductionWeeks(GameState.currentProject.type);
    GameState.currentProject.productionWeeksRemaining = GameState.currentProject.productionWeeksTotal;
    
    showEvent({
        title: 'Crew Finalized! 🎬',
        description: `Your dream team is assembled! Production will take ${GameState.currentProject.productionWeeksTotal} weeks.`,
        type: 'positive',
        icon: '🎯'
    });
    
    generateNewsItem(`🎬 ${GameState.currentProject.crew.maleLead.name} and ${GameState.currentProject.crew.femaleLead.name} start shooting for "${GameState.currentProject.title}"!`);
    
    updateUI();
    switchSection('dashboard');
}

function calculateProductionWeeks(projectType) {
    const baseWeeks = {
        movie: 14,
        webseries: 10,
        tvserial: 6
    };
    
    return baseWeeks[projectType] + Math.floor(Math.random() * 3); // Add 0-2 random weeks
}

// ====================================
// PRODUCTION STAGE
// ====================================

function triggerProductionEvent(project) {
    const events = [
        {
            title: 'Outstanding Performance! 🌟',
            description: `${project.crew.maleLead.name} delivered an exceptional scene! Early buzz is very positive.`,
            type: 'positive',
            icon: '⭐',
            effect: { quality: 0.1, reputation: 2 }
        },
        {
            title: 'Weather Delays ⛈️',
            description: 'Heavy rains delayed outdoor shooting. Extra costs incurred for extended schedule.',
            type: 'negative',
            icon: '🌧️',
            effect: { weeks: 1, money: -3 }
        },
        {
            title: 'Viral Song Recording! 📱',
            description: 'Music recording session went viral on social media! Massive pre-release buzz generated.',
            type: 'positive',
            icon: '🎵',
            effect: { quality: 0.15, marketing: 0.2 }
        },
        {
            title: 'Equipment Malfunction 🔧',
            description: 'Camera equipment breakdown caused shooting delays and additional rental costs.',
            type: 'negative',
            icon: '⚠️',
            effect: { weeks: 1, money: -2 }
        },
        {
            title: 'Perfect Chemistry! 💕',
            description: `${project.crew.maleLead.name} and ${project.crew.femaleLead.name} have amazing on-screen chemistry!`,
            type: 'positive',
            icon: '✨',
            effect: { quality: 0.12 }
        },
        {
            title: 'Injury on Set 🚑',
            description: 'Minor injury to supporting actor caused production delays. Safety protocols reviewed.',
            type: 'negative',
            icon: '🏥',
            effect: { weeks: 2, money: -1 }
        }
    ];
    
    const event = events[Math.floor(Math.random() * events.length)];
    
    // Apply effects
    if (event.effect.quality) {
        project.quality.production += event.effect.quality;
    }
    if (event.effect.marketing) {
        project.quality.marketing += event.effect.marketing;
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
    
    showEvent(event);
    generateNewsItem(`🎬 "${project.title}" production update: ${event.description}`);
}

function completeProductionStage(project) {
    project.stage = 'marketing';
    
    // Calculate production quality
    calculateProductionQuality(project);
    
    showEvent({
        title: 'Production Complete! 🎉',
        description: `"${project.title}" filming wrapped! Quality: ${Math.round(project.quality.production * 100)}%. Time for marketing!`,
        type: 'positive',
        icon: '🏁'
    });
    
    generateNewsItem(`🎬 "${project.title}" completes production! ${project.crew.director.name} praises the entire cast and crew.`);
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
    const maleLead = project.crew.maleLead;
    const femaleLead = project.crew.femaleLead;
    if (maleLead && femaleLead) {
        const actorQuality = (maleLead.popularity + femaleLead.popularity) / 200;
        quality += (actorQuality * 0.25);
        
        // Chemistry bonus
        if (maleLead.specialty === project.genre && femaleLead.specialty === project.genre) {
            quality += 0.1;
        }
    }
    
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
    
    GameState.currentProject.productionWeeksRemaining = 0;
    completeProductionStage(GameState.currentProject);
    updateUI();
}

// ====================================
// MARKETING STAGE
// ====================================

function updateMarketingPreview() {
    const selectedChannels = [];
    const selectedRegions = [];
    
    // Get selected channels
    document.querySelectorAll('.marketing-checkbox:checked').forEach(checkbox => {
        selectedChannels.push(checkbox.getAttribute('data-channel'));
    });
    
    // Get selected regions
    document.querySelectorAll('.region-checkbox:checked').forEach(checkbox => {
        selectedRegions.push(checkbox.getAttribute('data-region'));
    });
    
    // Get budget
    const budgetSlider = document.getElementById('marketingBudgetSlider');
    const budget = budgetSlider ? parseInt(budgetSlider.value) : 20;
    
    // Update display
    const budgetValue = document.getElementById('marketingBudgetValue');
    if (budgetValue) budgetValue.textContent = budget;
    
    const selectedChannelsDisplay = document.getElementById('selectedChannels');
    if (selectedChannelsDisplay) {
        selectedChannelsDisplay.textContent = selectedChannels.length > 0 ? 
            selectedChannels.map(formatChannelName).join(', ') : 'None';
    }
    
    const totalCostDisplay = document.getElementById('totalMarketingCost');
    if (totalCostDisplay) totalCostDisplay.textContent = `₹${budget} Cr`;
    
    // Calculate reach and awareness
    const reach = calculateMarketingReach(selectedChannels, selectedRegions, budget);
    const awarenessLevel = document.getElementById('awarenessLevel');
    if (awarenessLevel) awarenessLevel.textContent = `${reach}%`;
}

function formatChannelName(channel) {
    const names = {
        'tv-ads': 'TV Ads',
        'print-ads': 'Print & Billboards',
        'radio': 'Radio',
        'social-media': 'Social Media',
        'youtube': 'YouTube',
        'influencer': 'Influencers',
        'premiere': 'Premiere Events',
        'city-tour': 'City Tours'
    };
    return names[channel] || channel;
}

function calculateMarketingReach(channels, regions, budget) {
    const channelMultiplier = Math.min(channels.length * 0.15 + 0.3, 1.0);
    const regionMultiplier = Math.min(regions.length * 0.2 + 0.4, 1.0);
    const budgetMultiplier = Math.min(budget / 50, 1.0);
    
    const totalReach = channelMultiplier * regionMultiplier * budgetMultiplier * 100;
    return Math.round(totalReach);
}

function launchMarketing() {
    if (!GameState.currentProject) return;
    
    const selectedChannels = [];
    document.querySelectorAll('.marketing-checkbox:checked').forEach(checkbox => {
        selectedChannels.push(checkbox.getAttribute('data-channel'));
    });
    
    const selectedRegions = [];
    document.querySelectorAll('.region-checkbox:checked').forEach(checkbox => {
        selectedRegions.push(checkbox.getAttribute('data-region'));
    });
    
    const budget = parseInt(document.getElementById('marketingBudgetSlider').value);
    
    if (selectedChannels.length === 0) {
        showError('Please select at least one marketing channel');
        return;
    }
    
    if (selectedRegions.length === 0) {
        showError('Please select at least one release region');
        return;
    }
    
    if (GameState.player.money < budget) {
        showError(`Insufficient funds! You need ₹${budget} Cr but have ₹${GameState.player.money} Cr`);
        return;
    }
    
    // Deduct budget
    GameState.player.money -= budget;
    
    // Store marketing data
    GameState.currentProject.marketing = {
        channels: selectedChannels,
        regions: selectedRegions,
        budget: budget
    };
    
    GameState.currentProject.budget.marketing = budget;
    
    // Calculate marketing quality
    const reach = calculateMarketingReach(selectedChannels, selectedRegions, budget);
    GameState.currentProject.quality.marketing = reach / 100;
    
    // Move to distribution
    GameState.currentProject.stage = 'distribution';
    
    showEvent({
        title: 'Marketing Campaign Launched! 📢',
        description: `₹${budget} Cr campaign is creating buzz! Expected reach: ${reach}%`,
        type: 'positive',
        icon: '🚀'
    });
    
    generateNewsItem(`📢 "${GameState.currentProject.title}" marketing campaign creates massive buzz across ${selectedRegions.join(' and ')} markets!`);
    
    updateUI();
    switchSection('distribution-stage');
}

// ====================================
// DISTRIBUTION STAGE
// ====================================

function populateDistributors() {
    const container = document.getElementById('distributorList');
    if (!container) return;
    
    container.innerHTML = '';
    
    IndustryData.distributors.forEach(distributor => {
        const card = document.createElement('div');
        card.className = 'distributor-item';
        card.setAttribute('data-distributor-id', distributor.id);
        
        card.innerHTML = `
            <div class="distributor-name">${distributor.name}</div>
            <div class="distributor-details">${distributor.description}</div>
            <div class="distributor-stats">
                <span class="distributor-fee">${distributor.fee}% Fee</span>
                <span class="distributor-reach">${distributor.reach}% Reach</span>
            </div>
        `;
        
        card.addEventListener('click', () => selectDistributor(distributor, card));
        container.appendChild(card);
    });
}

function selectDistributor(distributor, element) {
    // Clear previous selections
    document.querySelectorAll('.distributor-item').forEach(item => {
        item.classList.remove('selected');
    });
    
    // Select current
    element.classList.add('selected');
    
    if (GameState.currentProject) {
        GameState.currentProject.distributor = distributor;
        updateDistributionCosts();
    }
}

function updateDistributionCosts() {
    if (!GameState.currentProject || !GameState.currentProject.distributor) return;
    
    const distributor = GameState.currentProject.distributor;
    const releaseScale = document.querySelector('input[name="releaseScale"]:checked')?.value || 'wide';
    
    const costs = calculateDistributionCosts(distributor, releaseScale);
    
    const costsContainer = document.getElementById('distributionCosts');
    if (costsContainer) {
        costsContainer.innerHTML = `
            <div class="flex justify-between">
                <span>Distributor Fee (${distributor.fee}%):</span>
                <span>₹${costs.distributorFee} Cr</span>
            </div>
            <div class="flex justify-between">
                <span>Print & Advertising:</span>
                <span>₹${costs.printCost} Cr</span>
            </div>
            <div class="flex justify-between">
                <span>Theater Rentals:</span>
                <span>₹${costs.theaterRentals} Cr</span>
            </div>
            <div class="flex justify-between border-t border-gray-600 pt-2 font-bold">
                <span>Total Distribution Cost:</span>
                <span class="text-gold">₹${costs.total} Cr</span>
            </div>
        `;
    }
    
    GameState.currentProject.distributionCosts = costs;
}

function calculateDistributionCosts(distributor, scale) {
    const scaleCosts = {
        limited: { print: 5, theater: 3, screens: '500-1000' },
        wide: { print: 12, theater: 8, screens: '2000-3500' },
        mega: { print: 20, theater: 15, screens: '4000+' }
    };
    
    const costs = scaleCosts[scale];
    const distributorFee = Math.round((GameState.currentProject.budget.total * distributor.fee) / 100);
    const total = distributorFee + costs.print + costs.theater;
    
    return {
        distributorFee,
        printCost: costs.print,
        theaterRentals: costs.theater,
        total,
        screens: costs.screens
    };
}

function finalizeDistribution() {
    if (!GameState.currentProject || !GameState.currentProject.distributor) {
        showError('Please select a distributor');
        return;
    }
    
    const releaseScale = document.querySelector('input[name="releaseScale"]:checked')?.value;
    const ottStrategy = document.querySelector('input[name="ottStrategy"]:checked')?.value;
    
    if (!releaseScale || !ottStrategy) {
        showError('Please select release and OTT strategies');
        return;
    }
    
    const costs = GameState.currentProject.distributionCosts;
    if (GameState.player.money < costs.total) {
        showError(`Insufficient funds! You need ₹${costs.total} Cr but have ₹${GameState.player.money} Cr`);
        return;
    }
    
    // Deduct costs
    GameState.player.money -= costs.total;
    
    // Store distribution data
    GameState.currentProject.distribution = {
        partner: GameState.currentProject.distributor,
        releaseScale: releaseScale,
        ottStrategy: ottStrategy,
        costs: costs
    };
    
    GameState.currentProject.budget.distribution = costs.total;
    GameState.currentProject.stage = 'release';
    
    showEvent({
        title: 'Distribution Deal Finalized! 🤝',
        description: `Partnership with ${GameState.currentProject.distributor.name} confirmed. Ready for release!`,
        type: 'positive',
        icon: '✅'
    });
    
    updateUI();
    switchSection('release-stage');
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
        
        const weekDiv = document.createElement('div');
        weekDiv.className = 'calendar-day';
        weekDiv.textContent = `Week ${displayWeek}`;
        weekDiv.dataset.week = week;
        weekDiv.dataset.year = year;
        
        // Check for festivals
        const festival = FestivalWeeks.find(f => f.week === (displayWeek));
        if (festival) {
            weekDiv.classList.add('festival');
            weekDiv.title = `${festival.name} - ${Math.round((festival.multiplier - 1) * 100)}% boost`;
        }
        
        // Check for competition
        const competition = GameState.competitors.filter(c => c.releaseWeek === week);
        if (competition.length > 0) {
            weekDiv.classList.add('competition');
            weekDiv.title = `${competition.length} competing releases`;
        }
        
        // Mark as optimal if no festival and no competition
        if (!festival && competition.length === 0) {
            weekDiv.classList.add('optimal');
            weekDiv.title = 'Optimal release window';
        }
        
        weekDiv.addEventListener('click', () => selectReleaseWeek(week, weekDiv));
        calendar.appendChild(weekDiv);
    }
}

function selectReleaseWeek(week, element) {
    // Clear previous selection
    document.querySelectorAll('.calendar-day').forEach(day => {
        day.classList.remove('selected');
    });
    
    // Select current
    element.classList.add('selected');
    
    if (GameState.currentProject) {
        GameState.currentProject.releaseWeek = week;
        showReleaseWeekDetails(week);
        
        // Enable confirm button
        const confirmBtn = document.getElementById('confirmReleaseBtn');
        if (confirmBtn) {
            confirmBtn.disabled = false;
            confirmBtn.classList.remove('opacity-50');
        }
    }
}

function showReleaseWeekDetails(week) {
    const infoContainer = document.getElementById('selectedDateInfo');
    const detailsContainer = document.getElementById('dateDetails');
    const competitionContainer = document.getElementById('competitionAnalysis');
    
    if (!infoContainer || !detailsContainer || !competitionContainer) return;
    
    infoContainer.classList.remove('hidden');
    
    const displayWeek = week > 52 ? week - 52 : week;
    const festival = FestivalWeeks.find(f => f.week === displayWeek);
    const competition = GameState.competitors.filter(c => c.releaseWeek === week);
    
    let competitionLevel = 'Low';
    if (festival) {
        competitionLevel = festival.competition === 'very-high' ? 'Very High' : 
                          festival.competition === 'high' ? 'High' : 'Medium';
    } else if (competition.length > 2) {
        competitionLevel = 'High';
    } else if (competition.length > 0) {
        competitionLevel = 'Medium';
    }
    
    detailsContainer.innerHTML = `
        <div>Selected: Week ${displayWeek}</div>
        <div>Competition Level: <span class="competition-${competitionLevel.toLowerCase().replace(' ', '-')}">${competitionLevel}</span></div>
        ${festival ? `<div class="text-green-400">🎉 ${festival.name} - ${Math.round((festival.multiplier - 1) * 100)}% boost expected!</div>` : ''}
    `;
    
    if (competition.length > 0) {
        competitionContainer.innerHTML = `
            <div class="font-bold text-red-400 mb-2">Competing Releases:</div>
            ${competition.map(c => `
                <div class="bg-red-900/20 p-2 rounded border border-red-500/30 mb-2">
                    <div class="font-bold">"${c.title}"</div>
                    <div class="text-xs text-gray-400">${c.genre} • ${c.studio}</div>
                </div>
            `).join('')}
        `;
    } else {
        competitionContainer.innerHTML = `
            <div class="text-green-400">✅ Clear release window - No major competition!</div>
        `;
    }
}

function confirmRelease() {
    if (!GameState.currentProject || !GameState.currentProject.releaseWeek) {
        showError('Please select a release week');
        return;
    }
    
    GameState.currentProject.stage = 'results';
    
    showEvent({
        title: 'Release Confirmed! 🚀',
        description: `"${GameState.currentProject.title}" is set to release in Week ${GameState.currentProject.releaseWeek}. The countdown begins!`,
        type: 'positive',
        icon: '🎬'
    });
    
    // Calculate results after a short delay
    setTimeout(() => {
        calculateBoxOfficeResults();
        switchSection('results-stage');
    }, 2000);
}

// ====================================
// BOX OFFICE RESULTS
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
    const starPower = (project.crew.maleLead.popularity + project.crew.femaleLead.popularity) / 2;
    baseScore += (starPower / 100 * 20);
    
    // Marketing (15%)
    baseScore += (project.quality.marketing * 15);
    
    // Genre matching (10%)
    let genreBonus = 0;
    if (project.crew.director.specialty === project.genre) genreBonus += 5;
    if (project.crew.maleLead.specialty === project.genre) genreBonus += 3;
    if (project.crew.femaleLead.specialty === project.genre) genreBonus += 3;
    baseScore += genreBonus;
    
    // Release timing (10%)
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
    
    // Update project with results
    project.boxOffice = {
        ...financials,
        verdict: verdict,
        baseScore: Math.round(baseScore),
        audienceRating: Math.round((baseScore / 10) * 10) / 10,
        criticsScore: Math.round(project.quality.script * 80 + Math.random() * 20),
        musicSuccess: project.crew.musicProducer ? 
            (project.crew.musicProducer.hitRate > 0.8 ? 'Superhit' : 'Hit') : 'Average',
        weeksInTop10: Math.max(1, Math.round(baseScore / 15))
    };
    
    // Update player stats
    updatePlayerStatsFromResults(project, verdict);
    
    // Move to portfolio
    moveProjectToPortfolio(project);
    
    // Display results
    displayResults(project);
    
    // Check for franchise opportunity
    checkFranchiseOpportunity(project, verdict);
    
    // Generate industry news
    generateResultNews(project, verdict);
}

function calculateReleaseBonus(releaseWeek) {
    let bonus = 0;
    
    // Check for festivals
    const displayWeek = releaseWeek > 52 ? releaseWeek - 52 : releaseWeek;
    const festival = FestivalWeeks.find(f => f.week === displayWeek);
    if (festival) {
        bonus += ((festival.multiplier - 1) * 50); // Convert to points
        
        // Competition penalty during festivals
        const competition = GameState.competitors.filter(c => c.releaseWeek === releaseWeek);
        bonus -= (competition.length * 5);
    }
    
    // Regular competition penalty
    const competition = GameState.competitors.filter(c => c.releaseWeek === releaseWeek);
    bonus -= (competition.length * 3);
    
    return bonus;
}

function calculateFinancials(project, baseScore) {
    const totalBudget = project.budget.total || 
        (project.budget.script + project.budget.crew + project.budget.marketing + project.budget.distribution);
    
    const scoreMultiplier = baseScore / 100;
    
    // Opening weekend
    const marketingImpact = project.quality.marketing;
    const starPower = (project.crew.maleLead.popularity + project.crew.femaleLead.popularity) / 200;
    const openingMultiplier = (marketingImpact + starPower) / 2;
    const openingWeekend = Math.round(totalBudget * 0.3 * openingMultiplier);
    
    // First week
    const firstWeek = Math.round(openingWeekend * 1.8);
    
    // Domestic total
    const sustainabilityFactor = scoreMultiplier;
    const domesticMultiplier = 1 + (sustainabilityFactor * 3);
    const domesticTotal = Math.round(totalBudget * domesticMultiplier);
    
    // Overseas (if selected in marketing)
    let overseasTotal = 0;
    if (project.marketing.regions.includes('overseas')) {
        overseasTotal = Math.round(domesticTotal * 0.25 * starPower);
    }
    
    // OTT rights
    const ottMultiplier = project.distribution.ottStrategy === 'simultaneous' ? 0.4 : 0.25;
    const ottRevenue = Math.round(totalBudget * ottMultiplier);
    
    // Total revenue and profit
    const totalRevenue = domesticTotal + overseasTotal + ottRevenue;
    const profit = totalRevenue - totalBudget;
    
    return {
        totalBudget,
        openingWeekend,
        firstWeek,
        domesticTotal,
        overseasTotal,
        ottRevenue,
        totalRevenue,
        profit
    };
}

function determineVerdict(profit, budget) {
    const profitRatio = profit / budget;
    
    if (profitRatio >= 2.0) return 'blockbuster';
    if (profitRatio >= 1.0) return 'superhit';
    if (profitRatio >= 0.5) return 'hit';
    if (profitRatio >= 0.0) return 'average';
    return 'flop';
}

function updatePlayerStatsFromResults(project, verdict) {
    GameState.player.completedProjects++;
    
    if (['blockbuster', 'superhit', 'hit'].includes(verdict)) {
        GameState.player.hitMovies++;
    } else {
        GameState.player.flopMovies++;
    }
    
    GameState.player.totalRevenue += project.boxOffice.totalRevenue;
    GameState.player.money += project.boxOffice.profit;
    
    // Reputation changes
    const reputationChange = {
        'blockbuster': 15,
        'superhit': 10,
        'hit': 5,
        'average': 0,
        'flop': -8
    };
    
    GameState.player.reputation = Math.max(0, Math.min(100, 
        GameState.player.reputation + reputationChange[verdict]));
    
    // Awards for exceptional performance
    if (verdict === 'blockbuster' && project.boxOffice.criticsScore >= 85) {
        GameState.player.totalAwards++;
        GameState.awards.push({
            name: 'Best Film Award',
            project: project.title,
            year: GameState.gameTime.year
        });
    }
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
    const titleElement = document.getElementById('movieTitle');
    const verdictElement = document.getElementById('movieVerdict');
    
    if (titleElement) titleElement.textContent = `"${project.title}"`;
    
    if (verdictElement) {
        const verdictText = {
            'blockbuster': 'BLOCKBUSTER HIT! 🏆',
            'superhit': 'SUPERHIT! ⭐',
            'hit': 'HIT! 👏',
            'average': 'AVERAGE 😐',
            'flop': 'FLOP 💥'
        };
        
        verdictElement.textContent = verdictText[boxOffice.verdict];
        verdictElement.className = `text-xl font-bold px-6 py-2 rounded-full inline-block verdict-${boxOffice.verdict}`;
    }
    
    // Update financial display
    updateFinancialDisplay(boxOffice);
    
    // Update performance metrics
    updatePerformanceDisplay(boxOffice);
    
    // Show franchise opportunity for hits
    const franchiseDiv = document.getElementById('franchiseOpportunity');
    if (franchiseDiv && ['blockbuster', 'superhit', 'hit'].includes(boxOffice.verdict)) {
        franchiseDiv.classList.remove('hidden');
    }
}

function updateFinancialDisplay(boxOffice) {
    const elements = [
        'totalInvestment', 'openingWeekend', 'firstWeek', 
        'domesticTotal', 'overseasTotal', 'ottRights', 'netProfit'
    ];
    
    elements.forEach(id => {
        const element = document.getElementById(id);
        if (element) {
            switch(id) {
                case 'totalInvestment':
                    element.textContent = `₹${boxOffice.totalBudget} Cr`;
                    break;
                case 'netProfit':
                    element.textContent = `₹${Math.abs(boxOffice.profit)} Cr`;
                    element.className = boxOffice.profit >= 0 ? 'text-gold' : 'text-red-400';
                    break;
                case 'ottRights':
                    element.textContent = `₹${boxOffice.ottRevenue} Cr`;
                    break;
                default:
                    element.textContent = `₹${boxOffice[id] || 0} Cr`;
            }
        }
    });
}

function updatePerformanceDisplay(boxOffice) {
    const audienceElement = document.getElementById('audienceRating');
    const criticsElement = document.getElementById('criticsScore');
    const weeksElement = document.getElementById('weeksInTop10');
    const musicElement = document.getElementById('musicSuccess');
    
    if (audienceElement) audienceElement.textContent = `${boxOffice.audienceRating}/10`;
    if (criticsElement) criticsElement.textContent = `${boxOffice.criticsScore}%`;
    if (weeksElement) weeksElement.textContent = `${boxOffice.weeksInTop10} weeks`;
    if (musicElement) musicElement.textContent = boxOffice.musicSuccess;
    
    // Update progress bars
    const audienceBar = document.getElementById('audienceRatingBar');
    const criticsBar = document.getElementById('criticsScoreBar');
    
    if (audienceBar) audienceBar.style.width = `${boxOffice.audienceRating * 10}%`;
    if (criticsBar) criticsBar.style.width = `${boxOffice.criticsScore}%`;
}

function checkFranchiseOpportunity(project, verdict) {
    if (['blockbuster', 'superhit', 'hit'].includes(verdict) && Math.random() < 0.6) {
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
    }
}

function generateResultNews(project, verdict) {
    const templates = {
        'blockbuster': [
            `🔥 "${project.title}" creates box office history with ₹${project.boxOffice.totalRevenue} Cr collection!`,
            `⭐ ${project.crew.maleLead.name} and ${project.crew.femaleLead.name} deliver career-best performances!`
        ],
        'hit': [
            `✅ "${project.title}" proves to be a profitable venture with ₹${project.boxOffice.profit} Cr profit!`,
            `👏 "${project.title}" receives positive response from audiences and critics alike!`
        ],
        'flop': [
            `📉 "${project.title}" disappoints at box office despite star cast!`,
            `💸 "${project.title}" becomes a major box office disappointment!`
        ]
    };
    
    const newsTemplates = templates[verdict] || [`📰 "${project.title}" completes its theatrical run.`];
    const news = newsTemplates[Math.floor(Math.random() * newsTemplates.length)];
    
    generateNewsItem(news);
}

function createSequel() {
    if (!GameState.currentProject) return;
    
    const originalProject = GameState.currentProject;
    const sequelNumber = GameState.franchises.find(f => f.originalTitle === originalProject.title)?.movies.length + 1 || 2;
    
    switchSection('script-stage');
    
    setTimeout(() => {
        document.getElementById('projectTitle').value = `${originalProject.title} ${sequelNumber}`;
        document.getElementById('projectType').value = originalProject.type;
        document.getElementById('projectGenre').value = originalProject.genre;
        
        showEvent({
            title: 'Sequel Planning! 🎬',
            description: `Planning sequel for "${originalProject.title}". Fans are excited!`,
            type: 'positive',
            icon: '🎭'
        });
    }, 500);
}

// ====================================
// COMPETITOR SYSTEM
// ====================================

function generateInitialCompetitors() {
    const titles = [
        'Dil Se Dil Tak', 'Action Hero Returns', 'Love Story', 'Family Values',
        'Thriller Night', 'Comedy Express', 'Drama Queen', 'Historical Epic'
    ];
    
    const studios = [
        'StarMax Productions', 'CineWorld Studios', 'Golden Pictures', 'Silver Screen Entertainment'
    ];
    
    const genres = ['romance', 'action', 'comedy', 'drama', 'thriller', 'family'];
    
    // Generate 6-8 initial competitors
    for (let i = 0; i < 7; i++) {
        generateCompetitor();
    }
}

function generateCompetitor() {
    const titles = [
        'Blockbuster Dreams', 'Love Revolution', 'Action Thunder', 'Comedy Nights',
        'Family Reunion', 'Thriller Zone', 'Drama Story', 'Musical Magic'
    ];
    
    const studios = [
        'Rival Studios', 'Competition Films', 'Box Office Productions', 'Star Entertainment'
    ];
    
    const genres = ['romance', 'action', 'comedy', 'drama', 'thriller', 'family'];
    
    const competitor = {
        id: generateId(),
        title: titles[Math.floor(Math.random() * titles.length)],
        genre: genres[Math.floor(Math.random() * genres.length)],
        studio: studios[Math.floor(Math.random() * studios.length)],
        budget: Math.floor(Math.random() * 60) + 20,
        releaseWeek: GameState.gameTime.totalWeeks + Math.floor(Math.random() * 12) + 2,
        status: 'upcoming'
    };
    
    GameState.competitors.push(competitor);
    
    // Keep only recent competitors
    GameState.competitors = GameState.competitors
        .filter(c => c.releaseWeek >= GameState.gameTime.totalWeeks - 10)
        .slice(0, 15);
    
    generateNewsItem(`🎬 ${competitor.studio} announces "${competitor.title}", a ${competitor.genre} film with ₹${competitor.budget} Cr budget!`);
}

// ====================================
// INDUSTRY NEWS SYSTEM
// ====================================

function generateInitialNews() {
    const newsItems = [
        '🎬 Welcome to Bollywood Cinema v2.5! Create your cinematic empire!',
        '🌟 OTT platforms increasing content acquisition budgets significantly',
        '💰 Box office revenues show promising growth trends this quarter',
        '🎭 Regional cinema gaining mainstream recognition and support',
        '📱 Social media marketing becomes crucial for movie success',
        '🎵 Music streaming revenues boosting film soundtrack earnings'
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
        '📈 Industry box office collections show strong performance this quarter',
        '🎬 New production houses entering market with innovative content',
        '⭐ Rising talent commanding higher fees amid growing demand',
        '💻 Technology advances transforming movie production workflows',
        '🌍 International collaborations increasing in Indian cinema',
        '📺 Streaming platforms competing for exclusive content rights',
        '🎪 Film festivals promoting independent cinema across regions',
        '💡 Innovation in marketing strategies driving audience engagement',
        '🎭 Theater chains expanding operations in tier-2 cities',
        '📊 Digital analytics revolutionizing movie distribution strategies'
    ];
    
    const newsText = customText || templates[Math.floor(Math.random() * templates.length)];
    
    GameState.industryNews.unshift({
        id: generateId(),
        text: newsText,
        week: GameState.gameTime.totalWeeks,
        type: customText ? 'project' : 'industry'
    });
    
    // Keep only recent news (last 15 items)
    GameState.industryNews = GameState.industryNews.slice(0, 15);
}

function updateNewsTicker() {
    if (!Elements.newsTicker || GameState.industryNews.length === 0) return;
    
    const recentNews = GameState.industryNews.slice(0, 5);
    const newsText = recentNews.map(news => news.text).join(' • ');
    
    Elements.newsTicker.innerHTML = `<span class="ticker-item">${newsText}</span>`;
}

// ====================================
// PORTFOLIO & PANELS
// ====================================

function loadPortfolio() {
    const portfolioGrid = document.getElementById('portfolioGrid');
    if (!portfolioGrid) return;
    
    portfolioGrid.innerHTML = '';
    
    if (GameState.portfolio.length === 0) {
        portfolioGrid.innerHTML = `
            <div class="portfolio-placeholder bg-gray-800/50 border-2 border-dashed border-gray-600 rounded-lg p-8 text-center col-span-full">
                <div class="text-4xl mb-4">🎬</div>
                <div class="text-gray-400 mb-4">Your projects will appear here</div>
                <button class="btn-primary" onclick="switchSection('script-stage')">Create First Project</button>
            </div>
        `;
        return;
    }
    
    // Update portfolio stats
    updatePortfolioStats();
    
    // Display projects
    GameState.portfolio.forEach(project => {
        const card = createPortfolioCard(project);
        portfolioGrid.appendChild(card);
    });
}

function updatePortfolioStats() {
    const hits = GameState.portfolio.filter(p => 
        ['blockbuster', 'superhit', 'hit'].includes(p.boxOffice?.verdict)).length;
    const flops = GameState.portfolio.filter(p => 
        ['flop', 'average'].includes(p.boxOffice?.verdict)).length;
    const totalRevenue = GameState.portfolio.reduce((sum, p) => 
        sum + (p.boxOffice?.totalRevenue || 0), 0);
    
    const elements = {
        portfolioHits: document.getElementById('portfolioHits'),
        portfolioFlops: document.getElementById('portfolioFlops'),
        portfolioRevenue: document.getElementById('portfolioRevenue'),
        portfolioAwards: document.getElementById('portfolioAwards')
    };
    
    if (elements.portfolioHits) elements.portfolioHits.textContent = hits;
    if (elements.portfolioFlops) elements.portfolioFlops.textContent = flops;
    if (elements.portfolioRevenue) elements.portfolioRevenue.textContent = `₹${totalRevenue}`;
    if (elements.portfolioAwards) elements.portfolioAwards.textContent = GameState.player.totalAwards;
}

function createPortfolioCard(project) {
    const card = document.createElement('div');
    const verdict = project.boxOffice?.verdict || 'unknown';
    card.className = `portfolio-item ${verdict}`;
    
    const profit = project.boxOffice?.profit || 0;
    const profitClass = profit >= 0 ? 'text-green-400' : 'text-red-400';
    
    card.innerHTML = `
        <div class="mb-4">
            <h3 class="text-lg font-bold text-white mb-1">"${project.title}"</h3>
            <div class="text-sm text-gray-400">${project.type} • ${project.genre}</div>
        </div>
        
        <div class="space-y-2 text-sm mb-4">
            <div class="flex justify-between">
                <span>Budget:</span>
                <span class="text-gold">₹${project.budget.total || 0} Cr</span>
            </div>
            <div class="flex justify-between">
                <span>Revenue:</span>
                <span class="text-blue-400">₹${project.boxOffice?.totalRevenue || 0} Cr</span>
            </div>
            <div class="flex justify-between">
                <span>Profit:</span>
                <span class="${profitClass}">₹${Math.abs(profit)} Cr</span>
            </div>
        </div>
        
        <div class="flex justify-between items-center">
            <div class="text-sm">
                <div>Rating: ${project.boxOffice?.audienceRating || 'N/A'}/10</div>
                <div>Critics: ${project.boxOffice?.criticsScore || 'N/A'}%</div>
            </div>
            <div class="text-right">
                <div class="verdict-badge verdict-${verdict}">${verdict.toUpperCase()}</div>
            </div>
        </div>
    `;
    
    return card;
}

function loadCompetitors() {
    const competitorsList = document.getElementById('competitorsList');
    if (!competitorsList) return;
    
    competitorsList.innerHTML = '';
    
    if (GameState.competitors.length === 0) {
        competitorsList.innerHTML = `
            <div class="text-center text-gray-400 py-8">
                No competitor data available yet
            </div>
        `;
        return;
    }
    
    // Sort by release week
    const sortedCompetitors = [...GameState.competitors]
        .sort((a, b) => a.releaseWeek - b.releaseWeek)
        .slice(0, 10); // Show only next 10
    
    sortedCompetitors.forEach(competitor => {
        const card = document.createElement('div');
        card.className = 'competitor-item';
        
        const weekDiff = competitor.releaseWeek - GameState.gameTime.totalWeeks;
        const timeText = weekDiff > 0 ? `Releases in ${weekDiff} weeks` : 
                        weekDiff === 0 ? 'Releasing this week' : 
                        `Released ${Math.abs(weekDiff)} weeks ago`;
        
        card.innerHTML = `
            <div class="competitor-info">
                <h4>"${competitor.title}"</h4>
                <p>${competitor.genre} • ${competitor.studio}</p>
                <p class="text-xs text-gray-500">${timeText}</p>
            </div>
            <div class="competitor-stats">
                <span class="competitor-budget">₹${competitor.budget} Cr</span>
                <span class="competitor-status ${competitor.status}">${competitor.status.toUpperCase()}</span>
            </div>
        `;
        
        competitorsList.appendChild(card);
    });
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
        localStorage.setItem('bollywoodCinema_v2.5_save', JSON.stringify(saveData));
        console.log('Game saved successfully');
        
        // Show confirmation
        const saveBtn = document.getElementById('saveGameBtn');
        if (saveBtn) {
            const originalText = saveBtn.innerHTML;
            saveBtn.innerHTML = '<i class="fas fa-check"></i> Saved!';
            
            setTimeout(() => {
                saveBtn.innerHTML = originalText;
            }, 2000);
        }
        
    } catch (error) {
        console.error('Save failed:', error);
        showError('Failed to save game. Please try again.');
    }
}

function loadSavedGame() {
    try {
        const savedData = localStorage.getItem('bollywoodCinema_v2.5_save');
        if (!savedData) return false;
        
        const data = JSON.parse(savedData);
        
        if (data.version !== GameState.version) {
            console.warn('Save version mismatch, starting fresh');
            return false;
        }
        
        // Load game state
        Object.assign(GameState, data.gameState);
        
        console.log('Game loaded successfully');
        return true;
        
    } catch (error) {
        console.error('Load failed:', error);
        return false;
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

function showError(message) {
    showEvent({
        title: 'Error',
        description: message,
        type: 'error',
        icon: '⚠️'
    });
}

function showSuccess(message) {
    showEvent({
        title: 'Success',
        description: message,
        type: 'success',
        icon: '✅'
    });
}

function toggleDarkMode() {
    GameState.settings.darkMode = !GameState.settings.darkMode;
    document.documentElement.classList.toggle('dark', GameState.settings.darkMode);
    
    const icon = document.querySelector('#darkModeToggle i');
    if (icon) {
        icon.className = GameState.settings.darkMode ? 'fas fa-sun' : 'fas fa-moon';
    }
    
    saveGame();
}

function showTutorial() {
    const modal = Elements.tutorialModal;
    if (modal) {
        modal.classList.remove('hidden');
        modal.classList.add('flex');
    }
}

function hideTutorial() {
    const modal = Elements.tutorialModal;
    if (modal) {
        modal.classList.add('hidden');
        modal.classList.remove('flex');
    }
    
    // Start tutorial project
    const startBtn = document.getElementById('startTutorialProject');
    if (startBtn) {
        startBtn.addEventListener('click', () => {
            hideTutorial();
            switchSection('script-stage');
            
            setTimeout(() => {
                document.getElementById('projectTitle').value = 'My First Bollywood Film';
                document.getElementById('projectType').value = 'movie';
                document.getElementById('projectGenre').value = 'romance';
                document.getElementById('scriptLength').value = 'simple';
                
                showEvent({
                    title: 'Tutorial Started! 🎓',
                    description: 'Create your first successful Bollywood movie! Fill in the details and select a writer.',
                    type: 'tutorial',
                    icon: '📚'
                });
            }, 500);
        });
    }
}

function handleKeyboardShortcuts(event) {
    // Don't interfere with form inputs
    if (event.target.tagName === 'INPUT' || event.target.tagName === 'SELECT' || event.target.tagName === 'TEXTAREA') {
        return;
    }
    
    const key = event.key.toLowerCase();
    const ctrl = event.ctrlKey || event.metaKey;
    
    if (ctrl) {
        switch(key) {
            case 's':
                event.preventDefault();
                saveGame();
                break;
            case 'n':
                event.preventDefault();
                switchSection('script-stage');
                break;
        }
    } else {
        switch(key) {
            case ' ':
            case 'spacebar':
                event.preventDefault();
                advanceWeek();
                break;
            case '1':
                switchSection('dashboard');
                break;
            case '2':
                switchSection('script-stage');
                break;
            case '3':
                switchSection('crew-stage');
                break;
            case '4':
                switchSection('production-stage');
                break;
            case '5':
                switchSection('marketing-stage');
                break;
            case '6':
                switchSection('distribution-stage');
                break;
            case '7':
                switchSection('release-stage');
                break;
            case '8':
                switchSection('results-stage');
                break;
            case 'p':
                switchSection('portfolio-panel');
                break;
            case 'c':
                switchSection('competitors-panel');
                break;
            case 'escape':
                closeEventModal();
                hideTutorial();
                break;
        }
    }
}

// ====================================
// ADDITIONAL GAME MECHANICS
// ====================================

function calculateTotalBudget(project) {
    return (project.budget.script || 0) + 
           (project.budget.crew || 0) + 
           (project.budget.marketing || 0) + 
           (project.budget.distribution || 0);
}

function getRandomProductionEvent() {
    const events = [
        {
            title: 'Perfect Weather! ☀️',
            description: 'Beautiful weather conditions speed up outdoor shooting!',
            type: 'positive',
            effect: { weeks: -1 }
        },
        {
            title: 'Crew Appreciation! 👏',
            description: 'The entire crew is working with exceptional dedication!',
            type: 'positive',
            effect: { quality: 0.05 }
        },
        {
            title: 'Budget Overrun! 💸',
            description: 'Unexpected expenses increase production costs.',
            type: 'negative',
            effect: { money: -5 }
        },
        {
            title: 'Technical Innovation! 🔬',
            description: 'New filming technique creates stunning visual sequences!',
            type: 'positive',
            effect: { quality: 0.1 }
        }
    ];
    
    return events[Math.floor(Math.random() * events.length)];
}

function updateReputationBasedOnHistory() {
    const recentProjects = GameState.portfolio.slice(-5);
    if (recentProjects.length === 0) return;
    
    const successCount = recentProjects.filter(p => 
        ['blockbuster', 'superhit', 'hit'].includes(p.boxOffice?.verdict)).length;
    
    const successRate = successCount / recentProjects.length;
    
    // Gradual reputation adjustment based on recent performance
    if (successRate > 0.8) {
        GameState.player.reputation = Math.min(100, GameState.player.reputation + 1);
    } else if (successRate < 0.2) {
        GameState.player.reputation = Math.max(0, GameState.player.reputation - 1);
    }
}

function checkAchievements() {
    const achievements = [
        {
            id: 'first-hit',
            name: 'First Hit',
            description: 'Create your first hit movie',
            condition: () => GameState.player.hitMovies >= 1
        },
        {
            id: '100-crore-club',
            name: '100 Crore Club',
            description: 'Create a movie that earns ₹100+ Cr',
            condition: () => GameState.portfolio.some(p => (p.boxOffice?.totalRevenue || 0) >= 100)
        },
        {
            id: 'reputation-master',
            name: 'Reputation Master',
            description: 'Reach 90% reputation',
            condition: () => GameState.player.reputation >= 90
        },
        {
            id: 'franchise-builder',
            name: 'Franchise Builder',
            description: 'Create your first franchise',
            condition: () => GameState.franchises.length >= 1
        }
    ];
    
    achievements.forEach(achievement => {
        if (!GameState.player.achievementsUnlocked.includes(achievement.id) && 
            achievement.condition()) {
            
            GameState.player.achievementsUnlocked.push(achievement.id);
            
            showEvent({
                title: `Achievement Unlocked! 🏅`,
                description: `${achievement.name}: ${achievement.description}`,
                type: 'achievement',
                icon: '🏆'
            });
        }
    });
}

// ====================================
// RANDOM EVENT TRIGGERS
// ====================================

function triggerRandomIndustryEvent() {
    const events = [
        {
            title: 'Tax Benefits Announced! 💰',
            description: 'Government announces new tax incentives for film production.',
            type: 'positive',
            icon: '🏛️'
        },
        {
            title: 'New Streaming Platform! 📺',
            description: 'Major tech company launches new streaming service, increasing OTT competition.',
            type: 'positive',
            icon: '💻'
        },
        {
            title: 'Celebrity Endorsements Rise! ⭐',
            description: 'Brand endorsement rates for movie stars increase significantly.',
            type: 'neutral',
            icon: '📈'
        },
        {
            title: 'International Recognition! 🌍',
            description: 'Bollywood films gain recognition at major international film festivals.',
            type: 'positive',
            icon: '🎬'
        }
    ];
    
    const event = events[Math.floor(Math.random() * events.length)];
    
    showEvent(event);
    generateNewsItem(event.description);
}

// ====================================
// FINAL INITIALIZATION AND EXPORTS
// ====================================

// Weekly update checker
setInterval(() => {
    if (GameState.gameTime.totalWeeks > 1) {
        updateReputationBasedOnHistory();
        checkAchievements();
        
        // Random industry events
        if (Math.random() < 0.05) {
            triggerRandomIndustryEvent();
        }
    }
}, 30000); // Check every 30 seconds

// Export functions for global access
window.switchSection = switchSection;

console.log('🎭 Bollywood Cinema v2.5 - Complete Game Logic Loaded!');
console.log('🎬 Features: Time System ✓ | Script Development ✓ | Crew Hiring ✓');
console.log('🎯 Production Events ✓ | Marketing ✓ | Distribution ✓ | Box Office ✓');
console.log('📊 Competitors ✓ | News System ✓ | Franchises ✓ | Save/Load ✓');
console.log('🚀 Ready to create Bollywood magic!');
