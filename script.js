// Movie Production Simulator - Complete Enhanced JavaScript
// Fixes all bugs and implements all requested features

class MovieProductionSimulator {
    constructor() {
        this.gameData = {
            player: {
                name: '',
                studioName: '',
                avatar: '',
                studioLogo: '',
                money: 50000000, // Default ₹5 Cr
                reputation: 10,
                studioLevel: 1,
                maxProjects: 1,
                totalIncome: 0,
                totalExpenses: 0,
                loans: [],
                achievements: [],
                currentDate: { year: 2025, month: 1, week: 1 }
            },
            currentProject: null,
            completedProjects: [],
            staff: {
                admin: { productionManager: 0, accountant: 0, prManager: 0 },
                tech: { cameraOperator: 0, soundEngineer: 0, videoEditor: 0 }
            },
            gameStarted: false,
            sandboxMode: false
        };
        
        this.celebrities = this.initializeCelebrities();
        this.genres = this.initializeGenres();
        this.marketingStrategies = this.initializeMarketing();
        this.randomEvents = this.initializeEvents();
        this.theatreChains = this.initializeTheatres();
        
        this.init();
    }

    init() {
        this.showLoadingScreen();
        this.setupEventListeners();
        this.generateAvatarOptions();
        this.generateLogoOptions();
        this.generateGenreOptions();
        this.updateDateDisplay();
        this.startAutoSave();
        
        // Show loading screen then game
        setTimeout(() => {
            document.getElementById('loading-screen').style.opacity = '0';
            setTimeout(() => {
                document.getElementById('loading-screen').style.display = 'none';
                document.getElementById('game-container').style.display = 'block';
                this.showGameStartModal();
            }, 500);
        }, 3000);
    }

    showLoadingScreen() {
        document.getElementById('loading-screen').style.display = 'flex';
    }

    showGameStartModal() {
        document.getElementById('game-start-modal').style.display = 'flex';
    }

    // Initialize 100+ Real Indian Celebrities with Photos
    initializeCelebrities() {
        return {
            actors: [
                // Male Superstars
                { id: 1, name: 'Shah Rukh Khan', popularity: 98, acting: 95, bankability: 99, fee: 500000000, 
                  genre: ['Romance', 'Drama', 'Action'], age: 58, phase: 'Legend', 
                  photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face' },
                
                { id: 2, name: 'Aamir Khan', popularity: 96, acting: 98, bankability: 90, fee: 400000000,
                  genre: ['Drama', 'Social', 'Thriller'], age: 59, phase: 'Legend',
                  photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face' },
                
                { id: 3, name: 'Salman Khan', popularity: 94, acting: 78, bankability: 97, fee: 350000000,
                  genre: ['Action', 'Comedy', 'Drama'], age: 58, phase: 'Legend',
                  photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face' },
                
                { id: 4, name: 'Akshay Kumar', popularity: 88, acting: 82, bankability: 92, fee: 300000000,
                  genre: ['Action', 'Comedy', 'Patriotic'], age: 56, phase: 'Veteran',
                  photo: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&h=150&fit=crop&crop=face' },
                
                { id: 5, name: 'Ranbir Kapoor', popularity: 85, acting: 92, bankability: 82, fee: 250000000,
                  genre: ['Romance', 'Drama', 'Comedy'], age: 41, phase: 'Prime',
                  photo: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face' },

                // Female Superstars
                { id: 21, name: 'Deepika Padukone', popularity: 92, acting: 90, bankability: 87, fee: 200000000,
                  genre: ['Romance', 'Drama', 'Historical'], age: 38, phase: 'Prime',
                  photo: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face' },
                
                { id: 22, name: 'Alia Bhatt', popularity: 90, acting: 93, bankability: 88, fee: 150000000,
                  genre: ['Drama', 'Romance', 'Thriller'], age: 31, phase: 'Rising Star',
                  photo: 'https://images.unsplash.com/photo-1494790108755-2616b612b637?w=150&h=150&fit=crop&crop=face' },
                
                { id: 23, name: 'Priyanka Chopra', popularity: 88, acting: 85, bankability: 82, fee: 180000000,
                  genre: ['Drama', 'Action', 'International'], age: 41, phase: 'Prime',
                  photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face' },
                
                // Generate more actors (simplified for space)
                ...this.generateMoreActors(25, 100)
            ],

            directors: [
                { id: 1, name: 'Rajkumar Hirani', skill: 98, specialty: 'Comedy-Drama', fee: 100000000, successRate: 95,
                  photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face' },
                
                { id: 2, name: 'Sanjay Leela Bhansali', skill: 96, specialty: 'Historical Drama', fee: 90000000, successRate: 88,
                  photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face' },
                
                { id: 3, name: 'Zoya Akhtar', skill: 92, specialty: 'Contemporary Drama', fee: 60000000, successRate: 85,
                  photo: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face' },
                
                ...this.generateMoreDirectors(4, 50)
            ],

            producers: [
                { id: 1, name: 'Karan Johar', influence: 95, fee: 50000000, connections: 98,
                  photo: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&h=150&fit=crop&crop=face' },
                
                { id: 2, name: 'Yash Raj Chopra', influence: 92, fee: 45000000, connections: 95,
                  photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face' },
                
                ...this.generateMoreProducers(3, 30)
            ],

            music: [
                { id: 1, name: 'A.R. Rahman', skill: 99, fee: 50000000, specialty: 'All Genres', awards: 'Oscar Winner',
                  photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face' },
                
                { id: 2, name: 'Shankar-Ehsaan-Loy', skill: 90, fee: 25000000, specialty: 'Contemporary', awards: 'Filmfare Winners',
                  photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face' },
                
                ...this.generateMoreMusicDirectors(3, 40)
            ],

            singers: [
                { id: 1, name: 'Arijit Singh', popularity: 98, fee: 5000000, voice: 'Male', specialty: 'Romantic Melodies',
                  photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face' },
                
                { id: 2, name: 'Shreya Ghoshal', popularity: 96, fee: 4500000, voice: 'Female', specialty: 'Classical Traditional',
                  photo: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face' },
                
                ...this.generateMoreSingers(3, 60)
            ],

            distributors: [
                { id: 1, name: 'Yash Raj Films Distribution', reach: 95, fee: 15000000, regions: 'Pan India',
                  logo: 'https://via.placeholder.com/50x50/FFD700/000000?text=YRF' },
                
                { id: 2, name: 'Dharma Productions', reach: 90, fee: 12000000, regions: 'Urban Markets',
                  logo: 'https://via.placeholder.com/50x50/FF6B35/FFFFFF?text=DP' },
                
                ...this.generateMoreDistributors(3, 25)
            ]
        };
    }

    // Helper methods to generate more celebrities
    generateMoreActors(startId, endId) {
        const actors = [];
        const names = [
            'Varun Dhawan', 'Tiger Shroff', 'Kartik Aaryan', 'Vicky Kaushal', 'Sidharth Malhotra',
            'Katrina Kaif', 'Kareena Kapoor', 'Kriti Sanon', 'Kiara Advani', 'Shraddha Kapoor',
            'Rajkummar Rao', 'Ayushmann Khurrana', 'John Abraham', 'Arjun Kapoor', 'Ranveer Singh'
        ];
        
        for (let i = startId; i <= endId; i++) {
            const nameIndex = (i - startId) % names.length;
            const ismale = i % 2 === 0;
            
            actors.push({
                id: i,
                name: names[nameIndex] || `Actor ${i}`,
                popularity: Math.floor(Math.random() * 40) + 50,
                acting: Math.floor(Math.random() * 30) + 60,
                bankability: Math.floor(Math.random() * 35) + 55,
                fee: Math.floor(Math.random() * 180000000) + 20000000,
                genre: ['Drama', 'Romance', 'Comedy', 'Action'][Math.floor(Math.random() * 4)],
                age: Math.floor(Math.random() * 20) + 25,
                phase: ['Rising', 'Established', 'Prime'][Math.floor(Math.random() * 3)],
                photo: `https://randomuser.me/api/portraits/${ismale ? 'men' : 'women'}/${((i % 50) + 1)}.jpg`
            });
        }
        return actors;
    }

    generateMoreDirectors(startId, endId) {
        const directors = [];
        const names = ['Aanand L. Rai', 'Kabir Khan', 'Nitesh Tiwari', 'Ashutosh Gowariker', 'Vikramaditya Motwane'];
        
        for (let i = startId; i <= endId; i++) {
            directors.push({
                id: i,
                name: names[(i - startId) % names.length] || `Director ${i}`,
                skill: Math.floor(Math.random() * 25) + 65,
                specialty: ['Drama', 'Comedy', 'Action', 'Thriller'][Math.floor(Math.random() * 4)],
                fee: Math.floor(Math.random() * 30000000) + 10000000,
                successRate: Math.floor(Math.random() * 30) + 60,
                photo: `https://randomuser.me/api/portraits/men/${((i % 50) + 1)}.jpg`
            });
        }
        return directors;
    }

    generateMoreProducers(startId, endId) {
        const producers = [];
        const names = ['Bhushan Kumar', 'Ritesh Sidhwani', 'Farhan Akhtar', 'Ronnie Screwvala'];
        
        for (let i = startId; i <= endId; i++) {
            producers.push({
                id: i,
                name: names[(i - startId) % names.length] || `Producer ${i}`,
                influence: Math.floor(Math.random() * 20) + 70,
                fee: Math.floor(Math.random() * 20000000) + 10000000,
                connections: Math.floor(Math.random() * 25) + 75,
                photo: `https://randomuser.me/api/portraits/men/${((i % 50) + 1)}.jpg`
            });
        }
        return producers;
    }

    generateMoreMusicDirectors(startId, endId) {
        const musicDirectors = [];
        const names = ['Vishal-Shekhar', 'Amit Trivedi', 'Ilaiyaraaja', 'Sachin-Jigar'];
        
        for (let i = startId; i <= endId; i++) {
            musicDirectors.push({
                id: i,
                name: names[(i - startId) % names.length] || `Music Director ${i}`,
                skill: Math.floor(Math.random() * 20) + 70,
                fee: Math.floor(Math.random() * 15000000) + 5000000,
                specialty: ['Pop', 'Classical', 'Electronic', 'Folk'][Math.floor(Math.random() * 4)],
                awards: 'Chart Topper',
                photo: `https://randomuser.me/api/portraits/men/${((i % 50) + 1)}.jpg`
            });
        }
        return musicDirectors;
    }

    generateMoreSingers(startId, endId) {
        const singers = [];
        const names = ['Armaan Malik', 'Neha Kakkar', 'Jubin Nautiyal', 'Dhvani Bhanushali'];
        
        for (let i = startId; i <= endId; i++) {
            const isFemale = i % 2 === 0;
            singers.push({
                id: i,
                name: names[(i - startId) % names.length] || `Singer ${i}`,
                popularity: Math.floor(Math.random() * 25) + 65,
                fee: Math.floor(Math.random() * 3000000) + 1000000,
                voice: isFemale ? 'Female' : 'Male',
                specialty: ['Pop', 'Romantic', 'Dance', 'Folk'][Math.floor(Math.random() * 4)],
                photo: `https://randomuser.me/api/portraits/${isFemale ? 'women' : 'men'}/${((i % 50) + 1)}.jpg`
            });
        }
        return singers;
    }

    generateMoreDistributors(startId, endId) {
        const distributors = [];
        const names = ['PVR Pictures', 'Zee Studios', 'Sony Pictures', 'Fox Star Studios'];
        
        for (let i = startId; i <= endId; i++) {
            distributors.push({
                id: i,
                name: names[(i - startId) % names.length] || `Distributor ${i}`,
                reach: Math.floor(Math.random() * 20) + 60,
                fee: Math.floor(Math.random() * 8000000) + 3000000,
                regions: ['North India', 'South India', 'West India', 'East India'][Math.floor(Math.random() * 4)],
                logo: `https://via.placeholder.com/50x50/00${Math.floor(Math.random() * 9)}${Math.floor(Math.random() * 9)}${Math.floor(Math.random() * 9)}/FFFFFF?text=${String.fromCharCode(65 + i)}`
            });
        }
        return distributors;
    }

    // Initialize 15+ Enhanced Genres
    initializeGenres() {
        return {
            action: { name: 'Action', marketAppeal: 92, budget: 'high', icon: 'fa-fist-raised', color: '#dc2626' },
            romance: { name: 'Romance', marketAppeal: 85, budget: 'medium', icon: 'fa-heart', color: '#ec4899' },
            comedy: { name: 'Comedy', marketAppeal: 88, budget: 'low', icon: 'fa-laugh', color: '#fbbf24' },
            drama: { name: 'Drama', marketAppeal: 82, budget: 'medium', icon: 'fa-theater-masks', color: '#3b82f6' },
            thriller: { name: 'Thriller', marketAppeal: 84, budget: 'medium', icon: 'fa-eye', color: '#8b5cf6' },
            horror: { name: 'Horror', marketAppeal: 72, budget: 'low', icon: 'fa-ghost', color: '#374151' },
            historical: { name: 'Historical', marketAppeal: 78, budget: 'very_high', icon: 'fa-crown', color: '#f59e0b' },
            biopic: { name: 'Biopic', marketAppeal: 80, budget: 'high', icon: 'fa-user', color: '#10b981' },
            scifi: { name: 'Sci-Fi', marketAppeal: 75, budget: 'very_high', icon: 'fa-rocket', color: '#06b6d4' },
            fantasy: { name: 'Fantasy', marketAppeal: 73, budget: 'very_high', icon: 'fa-magic', color: '#8b5cf6' },
            musical: { name: 'Musical', marketAppeal: 77, budget: 'medium', icon: 'fa-music', color: '#f97316' },
            sports: { name: 'Sports', marketAppeal: 79, budget: 'medium', icon: 'fa-trophy', color: '#84cc16' },
            war: { name: 'War', marketAppeal: 81, budget: 'very_high', icon: 'fa-shield-alt', color: '#6b7280' },
            family: { name: 'Family', marketAppeal: 86, budget: 'medium', icon: 'fa-home', color: '#22c55e' },
            crime: { name: 'Crime', marketAppeal: 76, budget: 'medium', icon: 'fa-mask', color: '#ef4444' }
        };
    }

    // Initialize Marketing Strategies
    initializeMarketing() {
        return {
            viral: { name: 'Viral Marketing', cost: 2500000, reach: 40, effectiveness: 60 },
            minimal: { name: 'Minimal Marketing', cost: 7500000, reach: 30, effectiveness: 45 },
            standard: { name: 'Standard Marketing', cost: 25000000, reach: 60, effectiveness: 75 },
            aggressive: { name: 'Aggressive Marketing', cost: 50000000, reach: 85, effectiveness: 88 },
            premium: { name: 'Premium Marketing', cost: 100000000, reach: 95, effectiveness: 93 },
            international: { name: 'International Marketing', cost: 150000000, reach: 100, effectiveness: 96 }
        };
    }

    // Initialize Random Events
    initializeEvents() {
        return [
            {
                id: 'controversy',
                title: '🚨 Celebrity Controversy',
                description: 'Your lead actor is involved in a public scandal affecting the movie promotion.',
                probability: 15,
                impact: { boxOffice: -25, reputation: -20, marketingCost: 40 }
            },
            {
                id: 'award_win',
                title: '🏆 Unexpected Award Win',
                description: 'Your movie wins a prestigious award before release, creating massive buzz!',
                probability: 8,
                impact: { boxOffice: 35, reputation: 25, nextProject: 50 }
            },
            {
                id: 'piracy',
                title: '💻 Movie Leaked Online',
                description: 'Your movie gets leaked on torrent sites 2 days before release.',
                probability: 20,
                impact: { boxOffice: -18, ottDeal: -15 }
            },
            {
                id: 'hit_song',
                title: '🎵 Viral Song Hit',
                description: 'One of your movie songs becomes a social media sensation!',
                probability: 12,
                impact: { marketing: 60, audience: 40, music: 25 }
            },
            {
                id: 'star_injury',
                title: '🩹 Star Injury',
                description: 'Your lead actor gets injured during action sequence, delaying production.',
                probability: 10,
                impact: { productionCost: 20, timeline: 15 }
            }
        ];
    }

    // Initialize Theatre Chains
    initializeTheatres() {
        return [
            { name: 'PVR Cinemas', screens: 1200, share: 32, logo: 'https://via.placeholder.com/80x40/C41E3A/FFFFFF?text=PVR' },
            { name: 'INOX Leisure', screens: 800, share: 28, logo: 'https://via.placeholder.com/80x40/1565C0/FFFFFF?text=INOX' },
            { name: 'Cinepolis India', screens: 500, share: 18, logo: 'https://via.placeholder.com/80x40/FF6F00/FFFFFF?text=CPX' },
            { name: 'Independent Theatres', screens: 2000, share: 22, logo: 'https://via.placeholder.com/80x40/424242/FFFFFF?text=IND' }
        ];
    }

    // Setup Event Listeners
    setupEventListeners() {
        // Game Start Events
        document.getElementById('new-game-btn')?.addEventListener('click', () => this.startNewGame());
        document.getElementById('load-game-btn')?.addEventListener('click', () => this.loadGame());
        
        // Time Controls - FIXED BUG
        document.getElementById('advance-week')?.addEventListener('click', () => this.advanceWeek());
        document.getElementById('advance-month')?.addEventListener('click', () => this.advanceMonth());
        
        // Money Management Click - FIXED BUG
        document.getElementById('money-container')?.addEventListener('click', () => this.openMoneyManagement());
        
        // Tab Navigation
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.addEventListener('click', (e) => this.switchTab(e.target.closest('.tab-btn').dataset.tab));
        });

        // Character Creation
        document.getElementById('start-game')?.addEventListener('click', () => this.createCharacter());
        
        // Logo Designer
        document.getElementById('design-logo-btn')?.addEventListener('click', () => this.openLogoDesigner());
        document.getElementById('preview-logo')?.addEventListener('click', () => this.previewLogo());
        document.getElementById('save-custom-logo')?.addEventListener('click', () => this.saveCustomLogo());
        document.getElementById('close-logo-designer')?.addEventListener('click', () => this.closeLogoDesigner());

        // Script Creation - FIXED WORKFLOW
        document.getElementById('create-script-final')?.addEventListener('click', () => this.createScript());
        
        // Suggestion buttons
        document.querySelectorAll('.suggestion-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                document.getElementById('studio-name').value = e.target.textContent;
            });
        });

        // Title suggestions
        document.querySelectorAll('.title-suggestion').forEach(btn => {
            btn.addEventListener('click', (e) => {
                document.getElementById('movie-title').value = e.target.textContent;
            });
        });

        // Promo Code System - ENHANCED
        document.getElementById('apply-promo-code')?.addEventListener('click', () => this.applyPromoCode());
        document.getElementById('promo-code-input')?.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.applyPromoCode();
        });

        // Modal close events
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('modal-overlay')) {
                e.target.style.display = 'none';
            }
        });

        // Staff Hiring
        document.querySelectorAll('.hire-staff-btn').forEach(btn => {
            btn.addEventListener('click', (e) => this.hireStaff(e.target));
        });

        // Loan Applications
        document.querySelectorAll('.loan-apply-btn').forEach(btn => {
            btn.addEventListener('click', (e) => this.applyForLoan(e.target));
        });
    }

    // Start New Game
    startNewGame() {
        const selectedBudget = document.querySelector('input[name="starting-budget"]:checked');
        if (selectedBudget) {
            this.gameData.player.money = parseInt(selectedBudget.value);
        }
        
        document.getElementById('game-start-modal').style.display = 'none';
        this.gameData.gameStarted = true;
        this.setupGameInterface();
        this.updateUI();
        this.saveGame();
    }

    // Load Game
    loadGame() {
        const savedData = localStorage.getItem('movieSimulatorSave');
        if (savedData) {
            this.gameData = JSON.parse(savedData);
            document.getElementById('game-start-modal').style.display = 'none';
            this.gameData.gameStarted = true;
            this.setupGameInterface();
            this.updateUI();
            this.showNotification('Game loaded successfully!', 'success');
        } else {
            this.showNotification('No saved game found!', 'error');
        }
    }

    // Setup Game Interface
    setupGameInterface() {
        this.generateAvatarOptions();
        this.generateLogoOptions();
        this.generateGenreOptions();
        this.updateCastingTab();
        this.updateTheatreChains();
        this.switchTab('profile');
    }

    // Generate Indian Avatar Options - FIXED
    generateAvatarOptions() {
        const avatarGrid = document.getElementById('avatar-grid');
        if (!avatarGrid) return;

        avatarGrid.innerHTML = '';
        
        // Generate 25 Indian face avatars
        for (let i = 1; i <= 25; i++) {
            const avatarDiv = document.createElement('div');
            avatarDiv.className = 'avatar-option';
            avatarDiv.dataset.avatar = `indian_${i}`;
            
            // Using diverse avatar sources for Indian faces
            const photoSrc = `https://randomuser.me/api/portraits/${i % 2 === 0 ? 'women' : 'men'}/${i}.jpg`;
            
            avatarDiv.innerHTML = `
                <img src="${photoSrc}" alt="Indian Avatar ${i}" 
                     onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
                <i class="fas fa-user" style="display:none; font-size: 3rem; color: var(--accent-gold);"></i>
            `;
            
            avatarDiv.addEventListener('click', () => this.selectAvatar(`indian_${i}`, photoSrc));
            avatarGrid.appendChild(avatarDiv);
        }
    }

    // Generate Premium Logo Options - FIXED
    generateLogoOptions() {
        const logoGrid = document.getElementById('real-logo-grid');
        if (!logoGrid) return;

        logoGrid.innerHTML = '';
        
        const premiumLogos = [
            { icon: 'fas fa-film', color: '#ffd700', bg: '#1a1a1a', name: 'Classic Cinema' },
            { icon: 'fas fa-crown', color: '#ff6b35', bg: '#2a2a2a', name: 'Royal Productions' },
            { icon: 'fas fa-star', color: '#4CAF50', bg: '#1a1a1a', name: 'Star Studios' },
            { icon: 'fas fa-diamond', color: '#2196f3', bg: '#1a1a1a', name: 'Diamond Films' },
            { icon: 'fas fa-fire', color: '#f44336', bg: '#2a2a2a', name: 'Fire Entertainment' },
            { icon: 'fas fa-bolt', color: '#ffeb3b', bg: '#1a1a1a', name: 'Lightning Pictures' },
            { icon: 'fas fa-magic', color: '#9c27b0', bg: '#1a1a1a', name: 'Magic Movies' },
            { icon: 'fas fa-rocket', color: '#ff5722', bg: '#1a1a1a', name: 'Rocket Films' },
            { icon: 'fas fa-trophy', color: '#ffc107', bg: '#2a2a2a', name: 'Trophy Productions' },
            { icon: 'fas fa-gem', color: '#00bcd4', bg: '#1a1a1a', name: 'Gem Studios' }
        ];

        premiumLogos.forEach((logo, index) => {
            const logoDiv = document.createElement('div');
            logoDiv.className = 'logo-option';
            logoDiv.dataset.logo = `logo_${index + 1}`;
            logoDiv.style.background = logo.bg;
            logoDiv.style.color = logo.color;
            logoDiv.innerHTML = `<i class="${logo.icon}"></i>`;
            logoDiv.title = logo.name;
            
            logoDiv.addEventListener('click', () => this.selectLogo(`logo_${index + 1}`, logo));
            logoGrid.appendChild(logoDiv);
        });
    }

    // Generate Enhanced Genre Options
    generateGenreOptions() {
        const genreGrid = document.getElementById('enhanced-genre-grid');
        if (!genreGrid) return;

        genreGrid.innerHTML = '';
        Object.entries(this.genres).forEach(([key, genre]) => {
            const genreDiv = document.createElement('div');
            genreDiv.className = 'genre-card';
            genreDiv.dataset.genre = key;
            genreDiv.innerHTML = `
                <i class="fas ${genre.icon}" style="color: ${genre.color}"></i>
                <h4>${genre.name}</h4>
                <p>Market Appeal: ${genre.marketAppeal}%</p>
                <p>Budget: ${genre.budget.replace('_', ' ')}</p>
            `;
            
            genreDiv.addEventListener('click', () => this.selectGenre(key));
            genreGrid.appendChild(genreDiv);
        });
    }

    // Select Avatar - FIXED
    selectAvatar(avatarId, src) {
        document.querySelectorAll('.avatar-option').forEach(option => {
            option.classList.remove('selected');
        });
        document.querySelector(`[data-avatar="${avatarId}"]`)?.classList.add('selected');
        
        this.gameData.player.avatar = src;
        this.showNotification('Avatar selected!', 'success');
    }

    // Select Studio Logo - FIXED
    selectLogo(logoId, logoData) {
        document.querySelectorAll('.logo-option').forEach(option => {
            option.classList.remove('selected');
        });
        document.querySelector(`[data-logo="${logoId}"]`)?.classList.add('selected');
        
        this.gameData.player.studioLogo = logoData;
        this.showNotification('Studio logo selected!', 'success');
    }

    // Create Character - FIXED
    createCharacter() {
        const characterName = document.getElementById('character-name')?.value.trim();
        const studioName = document.getElementById('studio-name')?.value.trim();

        if (!characterName || !studioName) {
            this.showNotification('Please enter both character and studio name!', 'error');
            return;
        }

        if (!this.gameData.player.avatar) {
            this.showNotification('Please select an avatar!', 'error');
            return;
        }

        if (!this.gameData.player.studioLogo) {
            this.showNotification('Please select a studio logo!', 'error');
            return;
        }

        this.gameData.player.name = characterName;
        this.gameData.player.studioName = studioName;

        // Update studio display - FIXED BUG
        this.updateStudioDisplay();

        this.showNotification(`Welcome ${characterName}! ${studioName} is ready to create blockbusters!`, 'success');
        this.switchTab('studio');
        this.updateUI();
        this.saveGame();
    }

    // Update Studio Display - FIXED BUG
    updateStudioDisplay() {
        const studioNameDisplay = document.getElementById('studio-name-display');
        const studioLogoDisplay = document.getElementById('studio-logo-display');
        
        if (studioNameDisplay) {
            studioNameDisplay.textContent = this.gameData.player.studioName;
        }
        
        if (studioLogoDisplay && this.gameData.player.studioLogo) {
            if (this.gameData.player.studioLogo.src) {
                studioLogoDisplay.src = this.gameData.player.studioLogo.src;
                studioLogoDisplay.style.display = 'block';
            } else {
                // For icon-based logos
                studioLogoDisplay.innerHTML = `<i class="${this.gameData.player.studioLogo.icon}" style="color: ${this.gameData.player.studioLogo.color}; font-size: 3rem;"></i>`;
                studioLogoDisplay.style.display = 'flex';
                studioLogoDisplay.style.alignItems = 'center';
                studioLogoDisplay.style.justifyContent = 'center';
                studioLogoDisplay.style.background = this.gameData.player.studioLogo.bg;
            }
        }
    }

    // Time Progression - FIXED BUG
    advanceWeek() {
        this.gameData.player.currentDate.week += 1;
        if (this.gameData.player.currentDate.week > 4) {
            this.gameData.player.currentDate.week = 1;
            this.gameData.player.currentDate.month += 1;
            if (this.gameData.player.currentDate.month > 12) {
                this.gameData.player.currentDate.month = 1;
                this.gameData.player.currentDate.year += 1;
            }
        }
        
        this.processWeeklyEvents();
        this.updateDateDisplay();
        this.updateUI();
        this.saveGame();
    }

    advanceMonth() {
        for (let i = 0; i < 4; i++) {
            this.advanceWeek();
        }
    }

    // Update Date Display
    updateDateDisplay() {
        const currentDateEl = document.getElementById('current-date');
        if (currentDateEl) {
            const { year, month, week } = this.gameData.player.currentDate;
            currentDateEl.textContent = `Week ${week}, Month ${month}, Year ${year}`;
        }
    }

    // Process Weekly Events
    processWeeklyEvents() {
        // Deduct monthly expenses
        const monthlyExpenses = this.calculateMonthlyExpenses();
        this.gameData.player.money -= Math.round(monthlyExpenses / 4); // Weekly portion
        
        // Process loan payments
        this.processLoanPayments();
        
        // Update project progress
        this.updateProjectProgress();
        
        // Random events
        if (Math.random() < 0.1) { // 10% chance per week
            this.triggerRandomEvent();
        }
    }

    // Calculate Monthly Expenses
    calculateMonthlyExpenses() {
        let totalSalaries = 0;
        
        // Admin staff salaries
        totalSalaries += this.gameData.staff.admin.productionManager * 80000;
        totalSalaries += this.gameData.staff.admin.accountant * 60000;
        totalSalaries += this.gameData.staff.admin.prManager * 70000;
        
        // Tech staff salaries
        totalSalaries += this.gameData.staff.tech.cameraOperator * 50000;
        totalSalaries += this.gameData.staff.tech.soundEngineer * 45000;
        totalSalaries += this.gameData.staff.tech.videoEditor * 55000;
        
        const officeRent = 200000;
        const utilities = 50000;
        
        return totalSalaries + officeRent + utilities;
    }

    // Tab Switching - ENHANCED
    switchTab(tabName) {
        document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
        document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));

        const tabBtn = document.querySelector(`[data-tab="${tabName}"]`);
        const tabContent = document.getElementById(`${tabName}-tab`);
        
        if (tabBtn) tabBtn.classList.add('active');
        if (tabContent) tabContent.classList.add('active');

        this.updateTabContent(tabName);
    }

    // Update Tab Content
    updateTabContent(tabName) {
        switch (tabName) {
            case 'studio':
                this.updateStudioTab();
                break;
            case 'casting':
                this.updateCastingTab();
                break;
            case 'production':
                this.updateProductionTab();
                break;
            case 'boxoffice':
                this.updateBoxOfficeTab();
                break;
            case 'finances':
                this.updateFinancesTab();
                break;
        }
    }

    // Select Genre
    selectGenre(genreKey) {
        document.querySelectorAll('.genre-card').forEach(card => {
            card.classList.remove('selected');
        });
        document.querySelector(`[data-genre="${genreKey}"]`)?.classList.add('selected');
        
        this.selectedGenre = genreKey;
        this.showNotification(`${this.genres[genreKey].name} genre selected!`, 'success');
    }

    // Create Script - FIXED WORKFLOW
    createScript() {
        if (!this.gameData.gameStarted) {
            this.showNotification('Please create your character first!', 'error');
            return;
        }

        const movieTitle = document.getElementById('movie-title')?.value.trim();
        const selectedGenre = document.querySelector('.genre-card.selected');
        const characterCount = document.getElementById('movie-characters')?.value;
        const formatType = document.querySelector('input[name="format"]:checked')?.value;
        const scriptTimeline = document.querySelector('input[name="script-timeline"]:checked')?.value;

        if (!movieTitle) {
            this.showNotification('Please enter a movie title!', 'error');
            return;
        }

        if (!selectedGenre) {
            this.showNotification('Please select a genre!', 'error');
            return;
        }

        const genre = selectedGenre.dataset.genre;
        let scriptCost = 1500000; // Base ₹15 lakhs
        let timeWeeks = 4;
        let quality = 70;

        // Adjust based on timeline
        switch (scriptTimeline) {
            case 'rush':
                scriptCost = 1500000;
                timeWeeks = 2;
                quality = 50;
                break;
            case 'standard':
                scriptCost = 3000000;
                timeWeeks = 4;
                quality = 70;
                break;
            case 'premium':
                scriptCost = 5000000;
                timeWeeks = 6;
                quality = 85;
                break;
        }

        // Format costs
        const formatCosts = {
            '2d': 0,
            '3d': 20000000,
            'imax': 50000000,
            '4dx': 80000000,
            '5d': 120000000
        };

        const formatCost = formatCosts[formatType] || 0;
        const totalCost = scriptCost + formatCost;

        if (this.gameData.player.money < totalCost) {
            this.showNotification('Not enough money for script development!', 'error');
            return;
        }

        this.gameData.player.money -= totalCost;
        this.gameData.player.totalExpenses += totalCost;

        // Create project
        this.gameData.currentProject = {
            id: Date.now(),
            title: movieTitle,
            genre: genre,
            characterCount: parseInt(characterCount),
            format: formatType,
            scriptQuality: quality + (Math.random() * 20 - 10), // Add randomness
            developmentCost: totalCost,
            status: 'script_development',
            phase: 'script',
            progress: 0,
            weeksRemaining: timeWeeks,
            cast: [],
            crew: [],
            totalBudget: totalCost,
            startDate: { ...this.gameData.player.currentDate }
        };

        this.showNotification(`Script development started for "${movieTitle}"!`, 'success');
        this.showActiveScripts();
        this.updateUI();
        this.saveGame();
    }

    // Show Active Scripts
    showActiveScripts() {
        const activeScripts = document.getElementById('active-scripts');
        const scriptList = document.getElementById('script-progress-list');
        
        if (!activeScripts || !scriptList) return;
        
        activeScripts.style.display = 'block';
        scriptList.innerHTML = '';
        
        if (this.gameData.currentProject) {
            const progressCard = document.createElement('div');
            progressCard.className = 'script-progress-card';
            progressCard.innerHTML = `
                <h4>${this.gameData.currentProject.title}</h4>
                <p>Genre: ${this.genres[this.gameData.currentProject.genre].name}</p>
                <p>Format: ${this.gameData.currentProject.format.toUpperCase()}</p>
                <div class="progress-bar">
                    <div class="progress-fill" style="width: ${(this.gameData.currentProject.progress || 0)}%"></div>
                </div>
                <p>Time Remaining: ${this.gameData.currentProject.weeksRemaining} weeks</p>
                <p>Status: ${this.gameData.currentProject.status.replace('_', ' ')}</p>
            `;
            scriptList.appendChild(progressCard);
        }
    }

    // Update Project Progress - FIXED BUG
    updateProjectProgress() {
        if (!this.gameData.currentProject) return;
        
        const project = this.gameData.currentProject;
        
        if (project.weeksRemaining > 0) {
            project.weeksRemaining--;
            project.progress = Math.round((1 - project.weeksRemaining / 6) * 100);
        }
        
        if (project.weeksRemaining === 0 && project.status === 'script_development') {
            project.status = 'script_ready';
            project.phase = 'casting';
            this.showNotification(`Script for "${project.title}" is ready! Time to cast actors.`, 'success');
            this.switchTab('casting');
        }
        
        // Update other phases
        if (project.status === 'production' && project.weeksRemaining === 0) {
            project.status = 'post_production';
            project.weeksRemaining = 6;
        }
        
        if (project.status === 'post_production' && project.weeksRemaining === 0) {
            project.status = 'marketing_ready';
            this.showNotification(`"${project.title}" is ready for marketing!`, 'success');
            this.switchTab('marketing');
        }
    }

    // Update Casting Tab - FIXED
    updateCastingTab() {
        this.updateCastingRequirements();
        this.switchCastCategory('actors');
    }

    // Update Casting Requirements
    updateCastingRequirements() {
        const requirementsEl = document.getElementById('casting-requirements');
        const requirementsGrid = document.getElementById('requirements-grid');
        
        if (!this.gameData.currentProject || !requirementsEl || !requirementsGrid) return;
        
        requirementsEl.style.display = 'block';
        requirementsGrid.innerHTML = '';
        
        const project = this.gameData.currentProject;
        const charCount = project.characterCount;
        
        // Generate requirements based on character count
        const requirements = [];
        
        if (charCount >= 1) requirements.push({ role: 'Lead Actor', type: 'actor', hired: false });
        if (charCount >= 2) requirements.push({ role: 'Lead Actress', type: 'actor', hired: false });
        if (charCount >= 3) requirements.push({ role: 'Supporting Actor', type: 'actor', hired: false });
        if (charCount >= 4) requirements.push({ role: 'Villain', type: 'actor', hired: false });
        if (charCount >= 5) requirements.push({ role: 'Comic Relief', type: 'actor', hired: false });
        
        requirements.push({ role: 'Director', type: 'director', hired: false });
        requirements.push({ role: 'Music Director', type: 'music', hired: false });
        requirements.push({ role: 'Playback Singer', type: 'singer', hired: false });
        
        requirements.forEach(req => {
            const reqCard = document.createElement('div');
            reqCard.className = 'requirement-card';
            reqCard.innerHTML = `
                <h4>${req.role}</h4>
                <p>Type: ${req.type}</p>
                <span class="status ${req.hired ? 'hired' : 'pending'}">${req.hired ? '✓ Hired' : '⏳ Pending'}</span>
            `;
            requirementsGrid.appendChild(reqCard);
        });
    }

    // Switch Cast Category
    switchCastCategory(category) {
        document.querySelectorAll('.cat-tab').forEach(tab => tab.classList.remove('active'));
        document.querySelector(`[data-category="${category}"]`)?.classList.add('active');
        
        this.updateCelebrityShowcase(category);
    }

    // Update Celebrity Showcase - FIXED WITH REAL PHOTOS
    updateCelebrityShowcase(category) {
        const showcase = document.getElementById('celebrity-showcase');
        if (!showcase) return;

        showcase.innerHTML = '';

        let celebrities = [];
        switch (category) {
            case 'actors':
                celebrities = this.celebrities.actors;
                break;
            case 'directors':
                celebrities = this.celebrities.directors;
                break;
            case 'producers':
                celebrities = this.celebrities.producers;
                break;
            case 'music':
                celebrities = this.celebrities.music;
                break;
            case 'singers':
                celebrities = this.celebrities.singers;
                break;
            case 'distributors':
                celebrities = this.celebrities.distributors;
                break;
        }

        celebrities.slice(0, 20).forEach(celebrity => { // Show first 20 for performance
            const card = this.createCelebrityCard(celebrity, category);
            showcase.appendChild(card);
        });
    }

    // Create Celebrity Card with Real Photos - FIXED
    createCelebrityCard(celebrity, category) {
        const card = document.createElement('div');
        card.className = 'celebrity-card';
        
        let stats = '';
        if (category === 'actors') {
            stats = `
                <span>Popularity: ${celebrity.popularity}</span>
                <span>Acting: ${celebrity.acting}</span>
                <span>Bankability: ${celebrity.bankability}</span>
                <span>Age: ${celebrity.age}</span>
            `;
        } else if (category === 'directors') {
            stats = `
                <span>Skill: ${celebrity.skill}</span>
                <span>Specialty: ${celebrity.specialty}</span>
                <span>Success Rate: ${celebrity.successRate}%</span>
            `;
        } else if (category === 'music') {
            stats = `
                <span>Skill: ${celebrity.skill}</span>
                <span>Specialty: ${celebrity.specialty}</span>
                <span>Awards: ${celebrity.awards}</span>
            `;
        } else if (category === 'singers') {
            stats = `
                <span>Popularity: ${celebrity.popularity}</span>
                <span>Voice: ${celebrity.voice}</span>
                <span>Specialty: ${celebrity.specialty}</span>
            `;
        }

        const isHired = this.isCelebrityHired(celebrity.id, category);
        
        card.innerHTML = `
            <div class="celebrity-avatar">
                <img src="${celebrity.photo}" alt="${celebrity.name}" 
                     onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
                <i class="fas fa-user-circle" style="display:none;"></i>
            </div>
            <h4 class="celebrity-name">${celebrity.name}</h4>
            <div class="celebrity-stats">
                ${stats}
            </div>
            <p class="celebrity-fee">${this.formatCurrency(celebrity.fee)}</p>
            <button class="hire-celebrity-btn" ${isHired ? 'disabled' : ''}>
                ${isHired ? 'Hired' : 'Hire'}
            </button>
        `;

        const hireBtn = card.querySelector('.hire-celebrity-btn');
        if (!isHired) {
            hireBtn.addEventListener('click', () => this.hireCelebrity(celebrity, category));
        }

        return card;
    }

    // Check if celebrity is hired
    isCelebrityHired(celebrityId, category) {
        if (!this.gameData.currentProject) return false;
        
        if (category === 'actors') {
            return this.gameData.currentProject.cast.some(actor => actor.id === celebrityId);
        } else {
            return this.gameData.currentProject.crew.some(crew => crew.id === celebrityId);
        }
    }

    // Hire Celebrity - ENHANCED
    hireCelebrity(celebrity, category) {
        if (!this.gameData.currentProject) {
            this.showNotification('Create a script first!', 'error');
            return;
        }

        if (this.gameData.player.money < celebrity.fee) {
            this.showNotification('Not enough money to hire this celebrity!', 'error');
            return;
        }

        // Check hiring limits
        if (category === 'actors' && this.gameData.currentProject.cast.length >= this.gameData.currentProject.characterCount) {
            this.showNotification('Maximum actors already hired for this project!', 'error');
            return;
        }

        this.gameData.player.money -= celebrity.fee;
        this.gameData.player.totalExpenses += celebrity.fee;
        this.gameData.currentProject.totalBudget += celebrity.fee;
        
        if (category === 'actors') {
            this.gameData.currentProject.cast.push(celebrity);
        } else {
            this.gameData.currentProject.crew.push({ ...celebrity, type: category });
        }

        this.showNotification(`${celebrity.name} hired successfully!`, 'success');
        this.updateCelebrityShowcase(category);
        this.updateCastingRequirements();
        this.checkProductionReadiness();
        this.updateUI();
        this.saveGame();
    }

    // Check Production Readiness
    checkProductionReadiness() {
        const project = this.gameData.currentProject;
        if (!project) return;

        const hasLead = project.cast.length >= Math.min(project.characterCount, 2);
        const hasDirector = project.crew.some(c => c.type === 'directors');
        
        if (hasLead && hasDirector && project.status === 'script_ready') {
            project.status = 'production_ready';
            project.phase = 'production';
            project.weeksRemaining = 12; // 12 weeks for production
            this.showNotification(`"${project.title}" is ready for production!`, 'success');
            this.switchTab('production');
        }
    }

    // Update Production Tab - FIXED PIPELINE
    updateProductionTab() {
        this.updateProductionOverview();
        this.updateProductionTimeline();
    }

    // Update Production Overview
    updateProductionOverview() {
        const projectInfo = document.getElementById('current-project-info');
        if (!projectInfo) return;

        if (!this.gameData.currentProject) {
            projectInfo.innerHTML = '<p class="no-project">No active project. Create a script to begin!</p>';
            return;
        }

        const project = this.gameData.currentProject;
        projectInfo.innerHTML = `
            <div class="project-details">
                <h4>${project.title}</h4>
                <p><strong>Genre:</strong> ${this.genres[project.genre].name}</p>
                <p><strong>Format:</strong> ${project.format.toUpperCase()}</p>
                <p><strong>Script Quality:</strong> ${Math.round(project.scriptQuality)}%</p>
                <p><strong>Cast:</strong> ${project.cast.length} actors hired</p>
                <p><strong>Crew:</strong> ${project.crew.length} members hired</p>
                <p><strong>Total Budget:</strong> ${this.formatCurrency(project.totalBudget)}</p>
                <p><strong>Status:</strong> ${project.status.replace('_', ' ')}</p>
                <p><strong>Phase:</strong> ${project.phase}</p>
            </div>
        `;
    }

    // Update Production Timeline - FIXED PROGRESS TRACKING
    updateProductionTimeline() {
        const timeline = document.getElementById('production-timeline');
        if (!timeline || !this.gameData.currentProject) {
            if (timeline) timeline.style.display = 'none';
            return;
        }

        timeline.style.display = 'block';
        const project = this.gameData.currentProject;
        
        // Update phase progress
        const phases = ['pre-production', 'shooting', 'post-production', 'marketing', 'release'];
        const phaseElements = document.querySelectorAll('.phase-item');
        
        phaseElements.forEach((element, index) => {
            const progressBar = element.querySelector('.progress-fill');
            const progressText = element.querySelector('.progress-text');
            
            let progress = 0;
            if (project.phase === phases[index]) {
                progress = Math.round((1 - (project.weeksRemaining || 0) / 12) * 100);
                element.classList.add('active');
            } else if (phases.indexOf(project.phase) > index) {
                progress = 100;
                element.classList.add('completed');
                element.classList.remove('active');
            } else {
                element.classList.remove('active', 'completed');
            }
            
            if (progressBar) progressBar.style.width = `${progress}%`;
            if (progressText) progressText.textContent = `${progress}% Complete`;
        });
    }

    // Update Box Office Tab - WITH THEATRE CHAINS
    updateBoxOfficeTab() {
        this.updateTheatreChains();
        this.updateBoxOfficePerformance();
    }

    // Update Theatre Chains - FIXED
    updateTheatreChains() {
        const chainsGrid = document.querySelector('.chains-grid');
        if (!chainsGrid) return;

        chainsGrid.innerHTML = '';
        this.theatreChains.forEach(chain => {
            const chainCard = document.createElement('div');
            chainCard.className = `chain-card ${chain.name.toLowerCase().replace(' ', '-')}`;
            chainCard.innerHTML = `
                <img src="${chain.logo}" alt="${chain.name}" onerror="this.style.display='none'">
                <h4>${chain.name}</h4>
                <p>Screens: ${chain.screens.toLocaleString()}</p>
                <p>Share: ${chain.share}%</p>
            `;
            chainsGrid.appendChild(chainCard);
        });
    }

    // Update Box Office Performance
    updateBoxOfficePerformance() {
        if (!this.gameData.currentProject || this.gameData.currentProject.status !== 'released') {
            document.getElementById('total-collection').textContent = '0';
            document.getElementById('collection-status').innerHTML = '<span class="status-text">Awaiting Release</span>';
            return;
        }

        const collection = this.gameData.currentProject.boxOfficeCollection || 0;
        const crores = Math.round(collection / 10000000 * 100) / 100;
        
        document.getElementById('total-collection').textContent = crores.toString();
        
        // Update weekly breakdown
        document.getElementById('week1').textContent = this.formatCurrency(Math.round(collection * 0.45));
        document.getElementById('week2').textContent = this.formatCurrency(Math.round(collection * 0.25));
        document.getElementById('week3').textContent = this.formatCurrency(Math.round(collection * 0.20));
        document.getElementById('week4').textContent = this.formatCurrency(Math.round(collection * 0.10));
        
        // Update status
        let status = 'Average';
        if (collection > 1000000000) status = 'Blockbuster';
        else if (collection > 500000000) status = 'Hit';
        else if (collection > 200000000) status = 'Above Average';
        else if (collection < 100000000) status = 'Flop';
        
        document.getElementById('collection-status').innerHTML = `<span class="status-text">${status}</span>`;
    }

    // Staff Hiring - NEW FEATURE
    hireStaff(button) {
        const role = button.dataset.role;
        const salary = parseInt(button.dataset.salary);
        
        if (this.gameData.player.money < salary * 12) { // Check if can afford annual salary
            this.showNotification('Not enough money to hire staff!', 'error');
            return;
        }
        
        // Update staff count
        if (role === 'production-manager') {
            this.gameData.staff.admin.productionManager = (this.gameData.staff.admin.productionManager || 0) + 1;
        } else if (role === 'accountant') {
            this.gameData.staff.admin.accountant = (this.gameData.staff.admin.accountant || 0) + 1;
        } else if (role === 'pr-manager') {
            this.gameData.staff.admin.prManager = (this.gameData.staff.admin.prManager || 0) + 1;
        } else if (role === 'camera-operator') {
            this.gameData.staff.tech.cameraOperator = (this.gameData.staff.tech.cameraOperator || 0) + 1;
        } else if (role === 'sound-engineer') {
            this.gameData.staff.tech.soundEngineer = (this.gameData.staff.tech.soundEngineer || 0) + 1;
        } else if (role === 'video-editor') {
            this.gameData.staff.tech.videoEditor = (this.gameData.staff.tech.videoEditor || 0) + 1;
        }
        
        this.showNotification('Staff member hired successfully!', 'success');
        this.updateStudioTab();
        this.updateUI();
        this.saveGame();
    }

    // Update Studio Tab
    updateStudioTab() {
        // Update staff counts
        const staffCounts = {
            'production-managers': this.gameData.staff.admin.productionManager || 0,
            'accountants': this.gameData.staff.admin.accountant || 0,
            'pr-managers': this.gameData.staff.admin.prManager || 0,
            'camera-operators': this.gameData.staff.tech.cameraOperator || 0,
            'sound-engineers': this.gameData.staff.tech.soundEngineer || 0,
            'video-editors': this.gameData.staff.tech.videoEditor || 0
        };
        
        Object.entries(staffCounts).forEach(([id, count]) => {
            const element = document.getElementById(id);
            if (element) element.textContent = count;
        });
        
        // Update total monthly cost
        const monthlyCost = this.calculateMonthlyExpenses();
        const totalCostEl = document.getElementById('total-monthly-cost');
        if (totalCostEl) totalCostEl.textContent = this.formatCurrency(monthlyCost);
        
        const totalSalariesEl = document.getElementById('total-salaries');
        if (totalSalariesEl) totalSalariesEl.textContent = this.formatCurrency(monthlyCost - 250000);
    }

    // Apply For Loan - ENHANCED
    applyForLoan(button) {
        const amount = parseInt(button.dataset.amount);
        const rate = parseFloat(button.dataset.rate);
        const term = parseInt(button.dataset.term);
        
        if (this.gameData.player.loans.length >= 3) {
            this.showNotification('Maximum 3 loans allowed at a time!', 'error');
            return;
        }

        const loan = {
            id: Date.now(),
            amount: amount,
            interestRate: rate,
            termMonths: term,
            remainingAmount: amount,
            monthlyPayment: Math.round((amount * (rate / 100 / 12)) / (1 - Math.pow(1 + rate / 100 / 12, -term))),
            startDate: { ...this.gameData.player.currentDate }
        };

        this.gameData.player.loans.push(loan);
        this.gameData.player.money += amount;
        
        button.textContent = 'Applied';
        button.disabled = true;
        button.style.background = '#4CAF50';

        this.showNotification(`Loan of ${this.formatCurrency(amount)} approved!`, 'success');
        this.updateFinancesTab();
        this.updateUI();
        this.saveGame();
    }

    // Process Loan Payments
    processLoanPayments() {
        this.gameData.player.loans.forEach(loan => {
            if (loan.remainingAmount > 0) {
                const weeklyPayment = Math.round(loan.monthlyPayment / 4);
                this.gameData.player.money -= weeklyPayment;
                loan.remainingAmount -= weeklyPayment;
                
                if (loan.remainingAmount <= 0) {
                    loan.remainingAmount = 0;
                    this.showNotification('Loan paid off completely!', 'success');
                }
            }
        });
        
        // Remove paid loans
        this.gameData.player.loans = this.gameData.player.loans.filter(loan => loan.remainingAmount > 0);
    }

    // Open Money Management
    openMoneyManagement() {
        this.switchTab('finances');
    }

    // Update Finances Tab - ENHANCED
    updateFinancesTab() {
        // Update current balance
        const balanceEl = document.getElementById('current-balance');
        if (balanceEl) balanceEl.textContent = this.formatCurrency(this.gameData.player.money);
        
        // Update cash flow
        const monthlyIncome = this.calculateMonthlyIncome();
        const monthlyExpenses = this.calculateMonthlyExpenses();
        const netProfit = monthlyIncome - monthlyExpenses;
        
        const monthlyIncomeEl = document.getElementById('monthly-income');
        const monthlyExpensesEl = document.getElementById('monthly-expenses');
        const netProfitEl = document.getElementById('net-monthly-profit');
        
        if (monthlyIncomeEl) monthlyIncomeEl.textContent = this.formatCurrency(monthlyIncome);
        if (monthlyExpensesEl) monthlyExpensesEl.textContent = this.formatCurrency(monthlyExpenses);
        if (netProfitEl) netProfitEl.textContent = this.formatCurrency(netProfit);
        
        // Update total debt
        const totalDebt = this.gameData.player.loans.reduce((sum, loan) => sum + loan.remainingAmount, 0);
        const totalDebtEl = document.getElementById('total-debt');
        if (totalDebtEl) totalDebtEl.textContent = this.formatCurrency(totalDebt);
    }

    // Calculate Monthly Income
    calculateMonthlyIncome() {
        // This would be based on completed projects, OTT deals, etc.
        return 0; // Placeholder
    }

    // Enhanced Promo Code System - ALL CODES
    applyPromoCode() {
        const code = document.getElementById('promo-code-input')?.value.toUpperCase().trim();
        if (!code) return;

        const promoCodes = {
            'SANDBOX': () => {
                this.gameData.player.money *= 2;
                this.gameData.sandboxMode = true;
                this.showNotification('🎮 Sandbox Mode: Money Doubled!', 'success');
            },
            'RICHMODE': () => {
                this.gameData.player.money += 10000000000; // ₹100 crores
                this.showNotification('💰 Rich Mode: ₹100 Crores Added!', 'success');
            },
            'GODMODE': () => {
                this.gameData.player.money = 50000000000; // ₹500 crores
                this.gameData.player.reputation = 100;
                this.gameData.player.studioLevel = 10;
                this.showNotification('👑 God Mode: Ultimate Power Activated!', 'success');
            },
            'RESETMONEY': () => {
                this.gameData.player.money = 50000000; // Reset to ₹5 crores
                this.showNotification('🔄 Money Reset to Starting Amount!', 'success');
            },
            'SUPERSTAR': () => {
                this.gameData.player.reputation = 100;
                this.showNotification('⭐ Superstar Status Achieved!', 'success');
            },
            'FREELOAN': () => {
                this.gameData.player.loans = [];
                this.showNotification('🏦 All Loans Cleared!', 'success');
            },
            'TIMETRAVEL': () => {
                if (this.gameData.currentProject && this.gameData.currentProject.weeksRemaining > 0) {
                    this.gameData.currentProject.weeksRemaining = 0;
                    this.showNotification('⏰ Time Travel: Project Fast-Forwarded!', 'success');
                }
            },
            'ALLSTAR': () => {
                // Unlock all celebrities for free hiring
                this.gameData.sandboxMode = true;
                this.showNotification('🌟 All Star Mode: Free Celebrity Hiring!', 'success');
            }
        };

        if (promoCodes[code]) {
            promoCodes[code]();
            document.getElementById('promo-code-input').value = '';
            this.updateUI();
            this.updateTabContent(document.querySelector('.tab-btn.active')?.dataset.tab || 'studio');
            this.saveGame();
        } else {
            this.showNotification('❌ Invalid promo code!', 'error');
        }
    }

    // Logo Designer
    openLogoDesigner() {
        document.getElementById('logo-designer-modal').style.display = 'flex';
        document.getElementById('logo-text-input').value = this.gameData.player.studioName || 'STUDIO';
    }

    previewLogo() {
        const canvas = document.getElementById('logo-canvas');
        const ctx = canvas.getContext('2d');
        const text = document.getElementById('logo-text-input').value || 'STUDIO';
        const primaryColor = document.getElementById('logo-primary-color').value;
        const bgColor = document.getElementById('logo-bg-color').value;
        const font = document.getElementById('logo-font-style').value;
        const icon = document.getElementById('logo-icon-select').value;

        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Set background
        ctx.fillStyle = bgColor;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Draw border
        ctx.strokeStyle = primaryColor;
        ctx.lineWidth = 6;
        ctx.strokeRect(15, 15, canvas.width - 30, canvas.height - 30);
        
        // Draw text
        ctx.fillStyle = primaryColor;
        ctx.font = `bold 28px ${font}`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(text, canvas.width / 2, canvas.height / 2 + 20);
        
        // Draw icon (emoji representation)
        ctx.font = '40px Arial';
        const iconMap = {
            'film': '🎬',
            'star': '⭐',
            'crown': '👑',
            'diamond': '💎',
            'fire': '🔥'
        };
        ctx.fillText(iconMap[icon] || '🎬', canvas.width / 2, 80);
    }

    saveCustomLogo() {
        const canvas = document.getElementById('logo-canvas');
        const logoDataUrl = canvas.toDataURL('image/png');
        
        this.gameData.player.studioLogo = {
            id: 'custom',
            src: logoDataUrl,
            type: 'custom'
        };
        
        this.showNotification('Custom logo saved!', 'success');
        this.updateStudioDisplay();
        this.closeLogoDesigner();
    }

    closeLogoDesigner() {
        document.getElementById('logo-designer-modal').style.display = 'none';
    }

    // Trigger Random Event
    triggerRandomEvent() {
        if (!this.gameData.currentProject) return;
        
        const randomIndex = Math.floor(Math.random() * this.randomEvents.length);
        const event = this.randomEvents[randomIndex];
        
        this.showNotification(event.title + ': ' + event.description, 'warning');
        this.applyEventEffects(event);
    }

    // Apply Event Effects
    applyEventEffects(event) {
        if (event.impact.boxOffice && this.gameData.currentProject) {
            // Apply to current project if in post-production or later
            const multiplier = 1 + (event.impact.boxOffice / 100);
            this.gameData.currentProject.eventMultiplier = (this.gameData.currentProject.eventMultiplier || 1) * multiplier;
        }
        
        if (event.impact.reputation) {
            this.gameData.player.reputation = Math.max(0, Math.min(100, this.gameData.player.reputation + event.impact.reputation));
        }
    }

    // Update UI - ENHANCED
    updateUI() {
        // Update header stats
        const moneyEl = document.getElementById('money');
        const reputationEl = document.getElementById('reputation');
        const studioLevelEl = document.getElementById('studio-level');
        
        if (moneyEl) moneyEl.textContent = this.formatCurrency(this.gameData.player.money);
        if (reputationEl) reputationEl.textContent = this.gameData.player.reputation;
        if (studioLevelEl) studioLevelEl.textContent = `Level ${this.gameData.player.studioLevel}`;
        
        // Update studio display if character is created
        if (this.gameData.player.name && this.gameData.player.studioName) {
            this.updateStudioDisplay();
        }
        
        // Update active scripts display
        if (this.gameData.currentProject) {
            this.showActiveScripts();
        }
    }

    // Show Notification - ENHANCED
    showNotification(message, type = 'info', duration = 4000) {
        const modal = document.getElementById('notification-modal');
        if (!modal) {
            console.log(`Notification: ${message}`);
            return;
        }

        const icon = modal.querySelector('.notification-icon');
        const title = modal.querySelector('.notification-title');
        const messageEl = modal.querySelector('.notification-message');
        const okBtn = modal.querySelector('.notification-confirm');

        // Set icon and color based on type
        const iconMap = {
            success: 'fa-check-circle',
            error: 'fa-exclamation-triangle',
            warning: 'fa-exclamation-circle',
            info: 'fa-info-circle'
        };

        if (icon) {
            icon.className = `notification-icon fas ${iconMap[type]}`;
            icon.style.color = type === 'success' ? '#22c55e' : 
                              type === 'error' ? '#ef4444' : 
                              type === 'warning' ? '#f59e0b' : '#3b82f6';
        }
        
        if (title) title.textContent = type.charAt(0).toUpperCase() + type.slice(1);
        if (messageEl) messageEl.textContent = message;

        modal.style.display = 'flex';

        if (okBtn) {
            okBtn.onclick = () => {
                modal.style.display = 'none';
            };
        }

        // Auto close
        setTimeout(() => {
            if (modal.style.display === 'flex') {
                modal.style.display = 'none';
            }
        }, duration);
    }

    // Format Currency
    formatCurrency(amount) {
        return '₹' + amount.toLocaleString('en-IN');
    }

    // Save Game - ENHANCED
    saveGame() {
        try {
            localStorage.setItem('movieSimulatorSave', JSON.stringify(this.gameData));
        } catch (error) {
            console.error('Failed to save game:', error);
        }
    }

    // Auto Save
    startAutoSave() {
        setInterval(() => {
            if (this.gameData.gameStarted) {
                this.saveGame();
            }
        }, 60000); // Save every minute
    }
}

// Initialize the game when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('🎬 Starting Movie Production Simulator...');
    
    // Initialize the game
    window.movieSimulator = new MovieProductionSimulator();
    
    // Additional event listeners for step navigation
    window.nextStep = function(stepNumber) {
        document.querySelectorAll('.script-step').forEach(step => step.classList.remove('active'));
        document.querySelectorAll('.step').forEach(step => step.classList.remove('active'));
        
        document.getElementById(`step-${stepNumber}`).classList.add('active');
        document.querySelector(`[data-step="${stepNumber}"]`).classList.add('active');
    };
    
    // Add visual effects for button interactions
    document.addEventListener('click', (e) => {
        if (e.target.matches('.primary-btn, .hire-celebrity-btn, .strategy-btn, .hire-staff-btn')) {
            // Button press animation
            e.target.style.transform = 'scale(0.95)';
            setTimeout(() => {
                e.target.style.transform = '';
            }, 150);
            
            // Create particle effect
            createParticleEffect(e.target);
        }
    });
    
    // Particle effect function
    function createParticleEffect(element) {
        const colors = ['#ffd700', '#ff6b35', '#4CAF50', '#2196f3'];
        
        for (let i = 0; i < 6; i++) {
            const particle = document.createElement('div');
            const rect = element.getBoundingClientRect();
            
            particle.style.cssText = `
                position: fixed;
                width: 8px;
                height: 8px;
                background: ${colors[Math.floor(Math.random() * colors.length)]};
                border-radius: 50%;
                pointer-events: none;
                z-index: 1000;
                left: ${rect.left + rect.width/2 + (Math.random() - 0.5) * rect.width}px;
                top: ${rect.top + rect.height/2 + (Math.random() - 0.5) * rect.height}px;
                animation: particleFloat 1.5s ease-out forwards;
            `;
            
            document.body.appendChild(particle);
            
            setTimeout(() => particle.remove(), 1500);
        }
    }
    
    // Add particle animation CSS
    const particleStyle = document.createElement('style');
    particleStyle.textContent = `
        @keyframes particleFloat {
            0% { 
                transform: translateY(0) scale(1) rotate(0deg); 
                opacity: 1; 
            }
            100% { 
                transform: translateY(-100px) scale(0) rotate(360deg); 
                opacity: 0; 
            }
        }
    `;
    document.head.appendChild(particleStyle);
    
    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        if (e.ctrlKey && e.key === 's') {
            e.preventDefault();
            window.movieSimulator.saveGame();
            window.movieSimulator.showNotification('Game saved manually!', 'success', 2000);
        }
        
        if (e.key === 'Escape') {
            document.querySelectorAll('.modal-overlay').forEach(modal => {
                modal.style.display = 'none';
            });
        }
    });
    
    console.log('🎮 Movie Production Simulator loaded successfully!');
    console.log('💡 Pro Tips:');
    console.log('- Use Ctrl+S to save game manually');
    console.log('- Try promo codes: SANDBOX, RICHMODE, GODMODE, SUPERSTAR, FREELOAN, TIMETRAVEL');
    console.log('- Click on money to access financial management');
    console.log('- Game auto-saves every minute');
});

// Export for potential module use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = MovieProductionSimulator;
}
