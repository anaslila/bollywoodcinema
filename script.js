// Movie Production Simulator - Game Logic
class MovieProductionSimulator {
    constructor() {
        this.gameData = {
            player: {
                name: '',
                studioName: '',
                avatar: '',
                money: 5000000, // ₹50,00,000
                reputation: 10,
                studioLevel: 1,
                maxProjects: 1
            },
            currentProject: null,
            completedMovies: [],
            staff: [],
            achievements: []
        };
        
        this.celebrities = this.initializeCelebrities();
        this.genres = this.initializeGenres();
        this.marketingStrategies = this.initializeMarketing();
        this.randomEvents = this.initializeEvents();
        
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.updateUI();
        this.showNotification('Welcome to Movie Production Simulator!', 'success');
    }

    // Initialize Celebrity Database
    initializeCelebrities() {
        return {
            actors: [
                {
                    id: 1,
                    name: 'Shah Rukh Khan',
                    popularity: 95,
                    acting: 92,
                    bankability: 98,
                    fee: 250000000,
                    genre: ['Romance', 'Drama', 'Action'],
                    age: 58,
                    phase: 'Veteran'
                },
                {
                    id: 2,
                    name: 'Aamir Khan',
                    popularity: 90,
                    acting: 95,
                    bankability: 85,
                    fee: 200000000,
                    genre: ['Drama', 'Social', 'Thriller'],
                    age: 59,
                    phase: 'Veteran'
                },
                {
                    id: 3,
                    name: 'Salman Khan',
                    popularity: 88,
                    acting: 75,
                    bankability: 95,
                    fee: 150000000,
                    genre: ['Action', 'Comedy', 'Drama'],
                    age: 58,
                    phase: 'Veteran'
                },
                {
                    id: 4,
                    name: 'Ranbir Kapoor',
                    popularity: 82,
                    acting: 88,
                    bankability: 75,
                    fee: 120000000,
                    genre: ['Romance', 'Drama', 'Comedy'],
                    age: 41,
                    phase: 'Prime'
                },
                {
                    id: 5,
                    name: 'Ranveer Singh',
                    popularity: 85,
                    acting: 82,
                    bankability: 80,
                    fee: 100000000,
                    genre: ['Drama', 'Comedy', 'Historical'],
                    age: 38,
                    phase: 'Prime'
                },
                {
                    id: 6,
                    name: 'Deepika Padukone',
                    popularity: 85,
                    acting: 88,
                    bankability: 80,
                    fee: 100000000,
                    genre: ['Romance', 'Drama', 'Historical'],
                    age: 38,
                    phase: 'Prime'
                },
                {
                    id: 7,
                    name: 'Alia Bhatt',
                    popularity: 88,
                    acting: 90,
                    bankability: 85,
                    fee: 80000000,
                    genre: ['Drama', 'Romance', 'Thriller'],
                    age: 31,
                    phase: 'Rising Star'
                },
                {
                    id: 8,
                    name: 'Katrina Kaif',
                    popularity: 78,
                    acting: 70,
                    bankability: 75,
                    fee: 60000000,
                    genre: ['Action', 'Romance', 'Comedy'],
                    age: 40,
                    phase: 'Established'
                }
            ],
            directors: [
                {
                    id: 1,
                    name: 'Rajkumar Hirani',
                    skill: 95,
                    specialty: 'Comedy-Drama',
                    fee: 50000000,
                    successRate: 90
                },
                {
                    id: 2,
                    name: 'Sanjay Leela Bhansali',
                    skill: 92,
                    specialty: 'Historical Drama',
                    fee: 45000000,
                    successRate: 85
                },
                {
                    id: 3,
                    name: 'Zoya Akhtar',
                    skill: 88,
                    specialty: 'Contemporary Drama',
                    fee: 30000000,
                    successRate: 80
                },
                {
                    id: 4,
                    name: 'Rohit Shetty',
                    skill: 75,
                    specialty: 'Action Comedy',
                    fee: 25000000,
                    successRate: 75
                }
            ],
            writers: [
                {
                    id: 1,
                    name: 'Abhijat Joshi',
                    skill: 90,
                    specialty: 'Comedy-Drama',
                    fee: 5000000
                },
                {
                    id: 2,
                    name: 'Juhi Chaturvedi',
                    skill: 88,
                    specialty: 'Social Drama',
                    fee: 4000000
                },
                {
                    id: 3,
                    name: 'Vijay Krishna Acharya',
                    skill: 75,
                    specialty: 'Action Thriller',
                    fee: 3000000
                }
            ],
            musicDirectors: [
                {
                    id: 1,
                    name: 'A.R. Rahman',
                    skill: 98,
                    fee: 20000000,
                    specialty: 'All Genres'
                },
                {
                    id: 2,
                    name: 'Shankar-Ehsaan-Loy',
                    skill: 85,
                    fee: 10000000,
                    specialty: 'Contemporary'
                },
                {
                    id: 3,
                    name: 'Vishal-Shekhar',
                    skill: 82,
                    fee: 8000000,
                    specialty: 'Pop, Dance'
                }
            ]
        };
    }

    // Initialize Genres
    initializeGenres() {
        return {
            romance: { name: 'Romance', marketAppeal: 85, budget: 'medium', icon: 'fa-heart' },
            action: { name: 'Action', marketAppeal: 90, budget: 'high', icon: 'fa-fist-raised' },
            comedy: { name: 'Comedy', marketAppeal: 80, budget: 'low', icon: 'fa-laugh' },
            drama: { name: 'Drama', marketAppeal: 75, budget: 'medium', icon: 'fa-theater-masks' },
            thriller: { name: 'Thriller', marketAppeal: 78, budget: 'medium', icon: 'fa-eye' },
            horror: { name: 'Horror', marketAppeal: 65, budget: 'low', icon: 'fa-ghost' },
            historical: { name: 'Historical', marketAppeal: 70, budget: 'very_high', icon: 'fa-crown' }
        };
    }

    // Initialize Marketing Strategies
    initializeMarketing() {
        return {
            minimal: { name: 'Minimal Marketing', cost: 50000000, reach: 30, effectiveness: 40 },
            standard: { name: 'Standard Marketing', cost: 150000000, reach: 60, effectiveness: 70 },
            aggressive: { name: 'Aggressive Marketing', cost: 300000000, reach: 85, effectiveness: 90 },
            premium: { name: 'Premium Marketing', cost: 500000000, reach: 95, effectiveness: 95 }
        };
    }

    // Initialize Random Events
    initializeEvents() {
        return [
            {
                id: 'controversy',
                title: 'Celebrity Controversy',
                description: 'Your lead actor is involved in a public scandal',
                probability: 15,
                impact: { boxOffice: -20, reputation: -15, marketingCost: 30 }
            },
            {
                id: 'award_win',
                title: 'Unexpected Award Win',
                description: 'Your movie wins a prestigious award',
                probability: 8,
                impact: { boxOffice: 25, reputation: 20, nextProject: 40 }
            },
            {
                id: 'piracy',
                title: 'Movie Leaked Online',
                description: 'Your movie gets leaked before release',
                probability: 20,
                impact: { boxOffice: -15, ottDeal: -10 }
            },
            {
                id: 'hit_song',
                title: 'Viral Song Hit',
                description: 'One of your movie songs becomes a viral sensation',
                probability: 12,
                impact: { marketing: 50, audience: 30 }
            }
        ];
    }

    // Setup Event Listeners
    setupEventListeners() {
        // Tab Navigation
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.addEventListener('click', (e) => this.switchTab(e.target.dataset.tab));
        });

        // Character Creation
        document.querySelectorAll('.avatar-option').forEach(option => {
            option.addEventListener('click', (e) => this.selectAvatar(e.target.dataset.avatar));
        });

        document.querySelectorAll('.suggestion-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                document.getElementById('studio-name').value = e.target.textContent;
            });
        });

        document.getElementById('start-game')?.addEventListener('click', () => this.startGame());

        // Genre Selection
        document.querySelectorAll('.genre-card').forEach(card => {
            card.addEventListener('click', (e) => this.selectGenre(e.currentTarget.dataset.genre));
        });

        // Script Creation
        document.getElementById('create-script')?.addEventListener('click', () => this.createScript());

        // Cast Hiring
        document.querySelectorAll('.hire-btn').forEach(btn => {
            btn.addEventListener('click', (e) => this.hireCelebrity(e.target));
        });

        // Category Tabs in Casting
        document.querySelectorAll('.cat-tab').forEach(tab => {
            tab.addEventListener('click', (e) => this.switchCastCategory(e.target.dataset.category));
        });

        // Marketing Strategy Selection
        document.querySelectorAll('.strategy-btn').forEach(btn => {
            btn.addEventListener('click', (e) => this.selectMarketingStrategy(e.target));
        });

        // Upgrade Buttons
        document.querySelectorAll('.upgrade-btn').forEach(btn => {
            btn.addEventListener('click', (e) => this.purchaseUpgrade(e.target));
        });

        // Modal Close
        document.getElementById('event-ok')?.addEventListener('click', () => this.closeModal());
    }

    // Tab Switching
    switchTab(tabName) {
        // Remove active class from all tabs and content
        document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
        document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));

        // Add active class to selected tab and content
        document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');
        document.getElementById(`${tabName}-tab`).classList.add('active');

        // Update content based on tab
        this.updateTabContent(tabName);
    }

    // Update Tab Content
    updateTabContent(tabName) {
        switch (tabName) {
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

    // Avatar Selection
    selectAvatar(avatarId) {
        document.querySelectorAll('.avatar-option').forEach(option => {
            option.classList.remove('selected');
        });
        document.querySelector(`[data-avatar="${avatarId}"]`).classList.add('selected');
        this.gameData.player.avatar = avatarId;
    }

    // Start Game
    startGame() {
        const characterName = document.getElementById('character-name').value;
        const studioName = document.getElementById('studio-name').value;

        if (!characterName || !studioName) {
            this.showNotification('Please enter both character and studio name!', 'error');
            return;
        }

        this.gameData.player.name = characterName;
        this.gameData.player.studioName = studioName;

        this.showNotification(`Welcome ${characterName}! ${studioName} is ready to make blockbusters!`, 'success');
        this.switchTab('studio');
        this.updateUI();
    }

    // Genre Selection
    selectGenre(genreId) {
        document.querySelectorAll('.genre-card').forEach(card => {
            card.classList.remove('selected');
        });
        document.querySelector(`[data-genre="${genreId}"]`).classList.add('selected');
        
        if (!this.currentProject) {
            this.currentProject = {};
        }
        this.currentProject.genre = genreId;
    }

    // Create Script
    createScript() {
        const selectedGenre = document.querySelector('.genre-card.selected');
        const developmentTime = document.querySelector('input[name="dev-time"]:checked');

        if (!selectedGenre) {
            this.showNotification('Please select a genre first!', 'error');
            return;
        }

        if (!developmentTime) {
            this.showNotification('Please select development time!', 'error');
            return;
        }

        const genre = selectedGenre.dataset.genre;
        const devTime = parseInt(developmentTime.value);
        
        // Calculate script quality based on time investment
        let quality = 50 + (devTime - 30) * 0.8;
        quality = Math.min(100, Math.max(20, quality + Math.random() * 20 - 10));

        this.currentProject = {
            genre: genre,
            developmentTime: devTime,
            scriptQuality: Math.round(quality),
            status: 'script_ready',
            budget: 0,
            cast: [],
            crew: []
        };

        this.showNotification(`Script created! Quality: ${Math.round(quality)}%`, 'success');
        this.switchTab('casting');
    }

    // Hire Celebrity
    hireCelebrity(button) {
        const castCard = button.closest('.cast-card');
        const name = castCard.querySelector('h4').textContent;
        
        // Find celebrity data
        let celebrity = null;
        let type = '';
        
        for (const [categoryName, category] of Object.entries(this.celebrities)) {
            celebrity = category.find(c => c.name === name);
            if (celebrity) {
                type = categoryName.slice(0, -1); // Remove 's' from end
                break;
            }
        }

        if (!celebrity) return;

        // Check if player can afford
        if (this.gameData.player.money < celebrity.fee) {
            this.showNotification('Not enough money to hire this celebrity!', 'error');
            return;
        }

        // Deduct money and hire
        this.gameData.player.money -= celebrity.fee;
        
        if (!this.currentProject) {
            this.currentProject = { cast: [], crew: [] };
        }

        if (type === 'actor') {
            this.currentProject.cast.push(celebrity);
        } else {
            this.currentProject.crew.push({ ...celebrity, type });
        }

        button.textContent = 'Hired';
        button.disabled = true;
        button.style.background = '#4CAF50';

        this.showNotification(`${name} hired successfully!`, 'success');
        this.updateUI();
    }

    // Switch Cast Category
    switchCastCategory(category) {
        document.querySelectorAll('.cat-tab').forEach(tab => tab.classList.remove('active'));
        document.querySelector(`[data-category="${category}"]`).classList.add('active');
        
        this.updateCastGrid(category);
    }

    // Update Cast Grid
    updateCastGrid(category) {
        const grid = document.getElementById('actors-grid');
        grid.innerHTML = '';

        let celebrities = [];
        switch (category) {
            case 'actors':
                celebrities = this.celebrities.actors;
                break;
            case 'directors':
                celebrities = this.celebrities.directors;
                break;
            case 'writers':
                celebrities = this.celebrities.writers;
                break;
            case 'music':
                celebrities = this.celebrities.musicDirectors;
                break;
        }

        celebrities.forEach(celebrity => {
            const card = this.createCastCard(celebrity, category);
            grid.appendChild(card);
        });
    }

    // Create Cast Card
    createCastCard(celebrity, category) {
        const card = document.createElement('div');
        card.className = 'cast-card';
        
        let stats = '';
        if (category === 'actors') {
            stats = `
                <span>Popularity: ${celebrity.popularity}</span>
                <span>Acting: ${celebrity.acting}</span>
                <span>Bankability: ${celebrity.bankability}</span>
            `;
        } else {
            stats = `
                <span>Skill: ${celebrity.skill}</span>
                <span>Specialty: ${celebrity.specialty}</span>
            `;
        }

        card.innerHTML = `
            <div class="cast-avatar">
                <i class="fas fa-user-circle"></i>
            </div>
            <h4>${celebrity.name}</h4>
            <div class="stats">
                ${stats}
            </div>
            <p class="fee">${this.formatCurrency(celebrity.fee)}</p>
            <button class="hire-btn">Hire</button>
        `;

        card.querySelector('.hire-btn').addEventListener('click', (e) => this.hireCelebrity(e.target));
        return card;
    }

    // Select Marketing Strategy
    selectMarketingStrategy(button) {
        const strategyCard = button.closest('.strategy-card');
        const strategyName = strategyCard.querySelector('h4').textContent.toLowerCase().replace(' ', '_').replace('_marketing', '');
        
        const strategy = this.marketingStrategies[strategyName];
        if (!strategy) return;

        if (this.gameData.player.money < strategy.cost) {
            this.showNotification('Not enough money for this marketing strategy!', 'error');
            return;
        }

        if (!this.currentProject) {
            this.showNotification('Create a movie project first!', 'error');
            return;
        }

        this.currentProject.marketingStrategy = strategyName;
        this.currentProject.marketingCost = strategy.cost;
        this.gameData.player.money -= strategy.cost;

        this.showNotification(`${strategy.name} selected! Movie ready for release.`, 'success');
        this.releaseMovie();
        this.updateUI();
    }

    // Release Movie
    releaseMovie() {
        if (!this.currentProject || !this.currentProject.cast.length) {
            this.showNotification('Complete casting before release!', 'error');
            return;
        }

        // Calculate box office performance
        const performance = this.calculateBoxOfficePerformance();
        
        this.currentProject.boxOfficeCollection = performance.totalCollection;
        this.currentProject.profit = performance.totalCollection - (this.currentProject.marketingCost || 0) - this.calculateProductionCost();
        this.currentProject.status = 'released';

        // Update player money
        this.gameData.player.money += Math.round(performance.totalCollection * 0.75); // Producer's share

        // Update reputation
        if (performance.totalCollection > 1000000000) { // ₹100 crores
            this.gameData.player.reputation += 20;
            this.showNotification('BLOCKBUSTER HIT! ₹100+ Crores!', 'success');
        } else if (performance.totalCollection > 500000000) { // ₹50 crores
            this.gameData.player.reputation += 10;
            this.showNotification('HIT! Movie is successful!', 'success');
        } else {
            this.gameData.player.reputation -= 5;
            this.showNotification('Movie underperformed at box office.', 'error');
        }

        // Add to completed movies
        this.gameData.completedMovies.push({ ...this.currentProject });
        this.currentProject = null;

        // Trigger random events
        this.triggerRandomEvent();
        
        this.switchTab('boxoffice');
        this.updateUI();
    }

    // Calculate Box Office Performance
    calculateBoxOfficePerformance() {
        if (!this.currentProject) return { totalCollection: 0 };

        let baseCollection = 100000000; // Base ₹10 crores
        
        // Factor in cast star power
        let starPower = 0;
        this.currentProject.cast.forEach(actor => {
            starPower += actor.popularity * actor.bankability / 100;
        });

        // Factor in director skill
        let directorSkill = 0;
        this.currentProject.crew.forEach(crew => {
            if (crew.type === 'director') {
                directorSkill = crew.skill;
            }
        });

        // Factor in script quality
        const scriptBonus = (this.currentProject.scriptQuality || 50) / 100;
        
        // Factor in genre appeal
        const genreAppeal = this.genres[this.currentProject.genre]?.marketAppeal || 70;
        
        // Factor in marketing
        const marketingBonus = this.currentProject.marketingStrategy ? 
            this.marketingStrategies[this.currentProject.marketingStrategy].effectiveness / 100 : 0.5;

        // Calculate final collection
        const multiplier = (starPower / 50) * (directorSkill / 100) * scriptBonus * (genreAppeal / 100) * marketingBonus;
        const finalCollection = baseCollection * multiplier * (0.8 + Math.random() * 0.4); // Add randomness

        return {
            totalCollection: Math.round(finalCollection),
            week1: Math.round(finalCollection * 0.45),
            week2: Math.round(finalCollection * 0.25),
            week3: Math.round(finalCollection * 0.20),
            week4: Math.round(finalCollection * 0.10)
        };
    }

    // Calculate Production Cost
    calculateProductionCost() {
        if (!this.currentProject) return 0;

        let cost = 50000000; // Base production cost ₹5 crores
        
        // Add cast fees
        this.currentProject.cast.forEach(actor => {
            cost += actor.fee;
        });

        // Add crew fees
        this.currentProject.crew.forEach(crew => {
            cost += crew.fee;
        });

        // Add genre-specific costs
        const genre = this.genres[this.currentProject.genre];
        if (genre) {
            switch (genre.budget) {
                case 'low': cost *= 1; break;
                case 'medium': cost *= 1.5; break;
                case 'high': cost *= 2; break;
                case 'very_high': cost *= 3; break;
            }
        }

        return Math.round(cost);
    }

    // Trigger Random Event
    triggerRandomEvent() {
        const randomValue = Math.random() * 100;
        let cumulativeProbability = 0;

        for (const event of this.randomEvents) {
            cumulativeProbability += event.probability;
            if (randomValue <= cumulativeProbability) {
                this.showEventModal(event);
                this.applyEventEffects(event);
                break;
            }
        }
    }

    // Show Event Modal
    showEventModal(event) {
        document.getElementById('event-title').textContent = event.title;
        document.getElementById('event-description').textContent = event.description;
        document.getElementById('event-modal').style.display = 'block';
    }

    // Close Modal
    closeModal() {
        document.getElementById('event-modal').style.display = 'none';
    }

    // Apply Event Effects
    applyEventEffects(event) {
        if (event.impact.reputation) {
            this.gameData.player.reputation += event.impact.reputation;
        }
        if (event.impact.boxOffice && this.gameData.completedMovies.length > 0) {
            const lastMovie = this.gameData.completedMovies[this.gameData.completedMovies.length - 1];
            const adjustment = lastMovie.boxOfficeCollection * (event.impact.boxOffice / 100);
            lastMovie.boxOfficeCollection += adjustment;
            this.gameData.player.money += Math.round(adjustment * 0.75);
        }
    }

    // Purchase Upgrade
    purchaseUpgrade(button) {
        const upgradeCard = button.closest('.upgrade-card');
        const upgradeName = upgradeCard.querySelector('h4').textContent;
        const costText = upgradeCard.querySelector('p').textContent;
        const cost = parseInt(costText.replace(/[^\d]/g, ''));

        if (this.gameData.player.money < cost) {
            this.showNotification('Not enough money for this upgrade!', 'error');
            return;
        }

        this.gameData.player.money -= cost;
        this.gameData.player.studioLevel += 1;

        button.textContent = 'Purchased';
        button.disabled = true;
        button.style.background = '#4CAF50';

        this.showNotification(`${upgradeName} purchased successfully!`, 'success');
        this.updateUI();
    }

    // Update UI Elements
    updateUI() {
        // Update header stats
        document.getElementById('money').textContent = this.formatCurrency(this.gameData.player.money);
        document.getElementById('reputation').textContent = this.gameData.player.reputation;
        document.getElementById('studio-level').textContent = `Level ${this.gameData.player.studioLevel}`;

        // Update studio tab
        document.getElementById('current-level').textContent = this.gameData.player.studioLevel;
        document.getElementById('staff-count').textContent = this.gameData.staff.length;
        document.getElementById('awards-count').textContent = this.gameData.achievements.length;
    }

    // Update Box Office Tab
    updateBoxOfficeTab() {
        if (this.gameData.completedMovies.length === 0) {
            document.getElementById('total-collection').textContent = '₹0';
            return;
        }

        const lastMovie = this.gameData.completedMovies[this.gameData.completedMovies.length - 1];
        const performance = this.calculateBoxOfficePerformance();
        
        document.getElementById('total-collection').textContent = this.formatCurrency(lastMovie.boxOfficeCollection || 0);
        
        // Animate the counter
        this.animateCounter(document.getElementById('total-collection'), 0, lastMovie.boxOfficeCollection || 0);
    }

    // Update Production Tab
    updateProductionTab() {
        if (!this.currentProject) return;

        let progress = 0;
        let phaseText = 'Planning';

        switch (this.currentProject.status) {
            case 'script_ready': progress = 25; phaseText = 'Pre-Production'; break;
            case 'cast_ready': progress = 50; phaseText = 'Shooting'; break;
            case 'post_production': progress = 75; phaseText = 'Post-Production'; break;
            case 'ready_release': progress = 90; phaseText = 'Ready for Release'; break;
            case 'released': progress = 100; phaseText = 'Released'; break;
        }

        document.querySelector('.progress-fill').style.width = progress + '%';
        document.querySelector('.progress-text').textContent = `${phaseText}: ${progress}% Complete`;
    }

    // Update Finances Tab
    updateFinancesTab() {
        const totalIncome = this.gameData.completedMovies.reduce((sum, movie) => sum + (movie.boxOfficeCollection || 0), 0) * 0.75;
        const totalExpenses = this.gameData.completedMovies.reduce((sum, movie) => sum + (movie.marketingCost || 0), 0);
        const netProfit = totalIncome - totalExpenses;

        const financeCards = document.querySelectorAll('.finance-card p');
        if (financeCards.length >= 3) {
            financeCards[0].textContent = this.formatCurrency(totalIncome);
            financeCards[1].textContent = this.formatCurrency(totalExpenses);
            financeCards[2].textContent = this.formatCurrency(netProfit);
        }
    }

    // Update Casting Tab
    updateCastingTab() {
        // Default to actors category
        this.updateCastGrid('actors');
    }

    // Format Currency
    formatCurrency(amount) {
        return '₹' + amount.toLocaleString('en-IN');
    }

    // Show Notification
    showNotification(message, type = 'info') {
        const container = document.getElementById('notifications');
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        
        container.appendChild(notification);
        
        // Remove notification after 3 seconds
        setTimeout(() => {
            notification.remove();
        }, 3000);
    }

    // Animate Counter
    animateCounter(element, start, end, duration = 2000) {
        const range = end - start;
        const startTime = performance.now();
        
        const animate = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const current = start + (range * progress);
            
            element.textContent = this.formatCurrency(Math.round(current));
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };
        
        requestAnimationFrame(animate);
    }

    // Auto-save functionality
    saveGame() {
        localStorage.setItem('movieSimulatorSave', JSON.stringify(this.gameData));
    }

    loadGame() {
        const savedData = localStorage.getItem('movieSimulatorSave');
        if (savedData) {
            this.gameData = JSON.parse(savedData);
            this.updateUI();
            return true;
        }
        return false;
    }
}

// Initialize the game when page loads
document.addEventListener('DOMContentLoaded', () => {
    window.movieSimulator = new MovieProductionSimulator();
    
    // Auto-save every 30 seconds
    setInterval(() => {
        window.movieSimulator.saveGame();
    }, 30000);

    // Add some visual effects
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('primary-btn') || e.target.classList.contains('hire-btn')) {
            e.target.style.transform = 'scale(0.95)';
            setTimeout(() => {
                e.target.style.transform = '';
            }, 150);
        }
    });

    // Add particle effect for money transactions
    const addParticleEffect = (element, color = '#ffd700') => {
        for (let i = 0; i < 5; i++) {
            const particle = document.createElement('div');
            particle.style.cssText = `
                position: fixed;
                width: 6px;
                height: 6px;
                background: ${color};
                border-radius: 50%;
                pointer-events: none;
                z-index: 1000;
                left: ${element.getBoundingClientRect().left + Math.random() * element.offsetWidth}px;
                top: ${element.getBoundingClientRect().top + Math.random() * element.offsetHeight}px;
                animation: particle-float 1s ease-out forwards;
            `;
            
            document.body.appendChild(particle);
            
            setTimeout(() => particle.remove(), 1000);
        }
    };

    // Add particle animation CSS
    const style = document.createElement('style');
    style.textContent = `
        @keyframes particle-float {
            0% { transform: translateY(0) scale(1); opacity: 1; }
            100% { transform: translateY(-50px) scale(0); opacity: 0; }
        }
    `;
    document.head.appendChild(style);
});

// Additional utility functions
const utils = {
    // Generate random movie titles
    generateMovieTitle: (genre) => {
        const titles = {
            romance: ['Love Story', 'Heart Beats', 'Romantic Nights', 'True Love'],
            action: ['Action Hero', 'Fight Night', 'Warrior', 'Battle Cry'],
            comedy: ['Laugh Out Loud', 'Comedy Kings', 'Fun Time', 'Hilarious'],
            drama: ['Life Story', 'Emotional Journey', 'Deep Thoughts', 'Real Life'],
            thriller: ['Mystery Man', 'Dark Secrets', 'Suspense', 'Hidden Truth'],
            horror: ['Scary Night', 'Haunted House', 'Fear Factor', 'Dark Shadows'],
            historical: ['Ancient Times', 'Royal Story', 'Historical Epic', 'King\'s Tale']
        };
        
        const genreTitles = titles[genre] || titles.drama;
        return genreTitles[Math.floor(Math.random() * genreTitles.length)];
    },

    // Calculate optimal release timing
    calculateOptimalTiming: () => {
        const seasons = {
            'Diwali': { multiplier: 1.5, competition: 'high' },
            'Eid': { multiplier: 1.4, competition: 'high' },
            'Christmas': { multiplier: 1.3, competition: 'medium' },
            'Summer': { multiplier: 1.2, competition: 'medium' },
            'Regular': { multiplier: 1.0, competition: 'low' }
        };
        
        return seasons;
    },

    // Generate realistic Indian box office numbers
    generateRealisticCollection: (budget, starPower, genre) => {
        const baseMultipliers = {
            low: [1.5, 5],      // Small budget films
            medium: [2, 8],     // Mid budget films  
            high: [1.5, 12],    // Big budget films
            very_high: [1, 15]  // Mega budget films
        };
        
        return baseMultipliers;
    }
};
