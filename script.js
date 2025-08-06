// Bollywood Simulator - COMPLETE ENHANCED VERSION
// All bug fixes and new features implemented while preserving existing UI

class BollywoodSimulator {
    constructor() {
        this.gameData = {
            player: {
                name: '',
                studioName: '',
                avatar: '',
                studioLogo: null,
                money: 50000000,
                reputation: 10,
                studioLevel: 1,
                maxProjects: 3,
                totalIncome: 0,
                totalExpenses: 0,
                marketShare: 0,
                currentDate: { year: 2025, month: 1, week: 1 }
            },
            projects: [],
            completedProjects: [],
            hiredCast: [],
            userFranchises: [],
            competitorStudios: [],
            releaseSchedule: [],
            staff: {
                admin: { productionManager: 0, accountant: 0, prManager: 0 },
                tech: { cameraOperator: 0, soundEngineer: 0, videoEditor: 0 }
            },
            gameStarted: false,
            selectedMovie: null,
            selectedRoleType: 'lead',
            selectedRoleNumber: 1,
            currentScriptStep: 1
        };
        
        this.celebrities = this.initializeCelebrities();
        this.genres = this.initializeGenres();
        this.predefinedFranchises = this.initializeFranchises();
        this.competitorStudios = this.initializeCompetitorStudios();
        
        this.deferredPrompt = null;
        this.negotiationData = null;
        this.selectedTimeline = 'standard';
        this.selectedGenre = 'drama';
        this.init();
    }

    init() {
        this.showLoadingScreen();
        this.setupEventListeners();
        this.setupPWA();
        this.generateAvatarOptions();
        this.generateProductionLogoOptions();
        this.generateGenreOptions();
        this.updateDateDisplay();
        this.startAutoSave();
        this.initializeCompetitorStudios();
        this.generateReleaseSchedule();
        this.updateTheatreChains();
        
        setTimeout(() => {
            document.getElementById('loading-screen').style.opacity = '0';
            setTimeout(() => {
                document.getElementById('loading-screen').style.display = 'none';
                document.getElementById('game-container').style.display = 'block';
                this.showGameStartModal();
            }, 500);
        }, 3000);
    }

    // ENHANCED: Setup Event Listeners - All new features
    setupEventListeners() {
        // Game Start Events
        document.getElementById('new-game-btn')?.addEventListener('click', () => this.startNewGame());
        document.getElementById('load-game-btn')?.addEventListener('click', () => this.loadGame());
        
        // Character Creation
        document.getElementById('start-game')?.addEventListener('click', () => this.createCharacter());
        
        // Time Controls
        document.getElementById('advance-week')?.addEventListener('click', () => this.advanceWeek());
        document.getElementById('advance-month')?.addEventListener('click', () => this.advanceMonth());
        
        // Tab Navigation
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.addEventListener('click', (e) => this.switchTab(e.target.closest('.tab-btn').dataset.tab));
        });

        // FIXED: Script Navigation with Back Button
        document.getElementById('script-back-btn')?.addEventListener('click', () => this.goBackStep());
        document.getElementById('create-script-final')?.addEventListener('click', () => this.createScript());
        
        // FIXED: Franchise Input Events
        document.getElementById('is-franchise')?.addEventListener('change', (e) => this.toggleFranchiseOptions(e.target.checked));
        document.getElementById('franchise-name-input')?.addEventListener('input', (e) => this.handleFranchiseInput(e.target.value));
        document.getElementById('franchise-name-input')?.addEventListener('focus', () => this.showFranchiseDropdown());
        document.getElementById('franchise-name-input')?.addEventListener('blur', () => setTimeout(() => this.hideFranchiseDropdown(), 200));
        
        // FIXED: Timeline Selection Events
        document.querySelectorAll('.timeline-card').forEach(card => {
            card.addEventListener('click', () => this.selectTimeline(card));
        });
        
        // Genre Selection Events
        document.addEventListener('click', (e) => {
            if (e.target.closest('.genre-card')) {
                this.selectGenre(e.target.closest('.genre-card'));
            }
        });
        
        // Title Suggestions
        document.querySelectorAll('.title-suggestion').forEach(btn => {
            btn.addEventListener('click', (e) => {
                document.getElementById('movie-title').value = e.target.textContent;
            });
        });
        
        // FIXED: Cast Assignment Events
        document.getElementById('movie-selector')?.addEventListener('change', () => this.updateCastAssignment());
        document.getElementById('role-type-selector')?.addEventListener('change', () => this.updateCastAssignment());
        document.getElementById('role-number-selector')?.addEventListener('change', () => this.updateCastAssignment());
        
        // Category tabs
        document.querySelectorAll('.cat-tab').forEach(tab => {
            tab.addEventListener('click', (e) => this.switchCastCategory(e.target.closest('.cat-tab').dataset.category));
        });

        // Suggestion buttons
        document.querySelectorAll('.suggestion-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                document.getElementById('studio-name').value = e.target.textContent;
            });
        });

        // Staff Hiring
        document.querySelectorAll('.hire-staff-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const role = e.target.dataset.role;
                const salary = parseInt(e.target.dataset.salary);
                this.hireStaff(role, salary);
            });
        });

        // ENHANCED: Negotiation Events
        document.getElementById('close-negotiation')?.addEventListener('click', () => this.closeNegotiation());
        document.getElementById('make-offer')?.addEventListener('click', () => this.makeOffer());
        document.getElementById('cancel-negotiation')?.addEventListener('click', () => this.closeNegotiation());
        
        // Deal tabs
        document.querySelectorAll('.deal-tab').forEach(tab => {
            tab.addEventListener('click', (e) => this.switchDealTab(e.target.dataset.deal));
        });
        
        // Offer sliders
        document.getElementById('fixed-offer')?.addEventListener('input', (e) => this.updateFixedOffer(e.target.value));
        document.getElementById('percentage-slider')?.addEventListener('input', (e) => this.updatePercentageOffer(e.target.value));
        document.getElementById('hybrid-base')?.addEventListener('input', (e) => this.updateHybridBase(e.target.value));
        document.getElementById('hybrid-percent')?.addEventListener('input', (e) => this.updateHybridPercent(e.target.value));

        // ENHANCED: Production Events
        document.getElementById('start-production-btn')?.addEventListener('click', () => this.startProduction());
        document.getElementById('fast-track-btn')?.addEventListener('click', () => this.fastTrackProduction());

        // Market filter
        document.getElementById('month-filter')?.addEventListener('change', (e) => this.filterReleaseSchedule(e.target.value));

        // Celebrity filters
        document.getElementById('search-celebrity')?.addEventListener('input', (e) => this.filterCelebrities());
        document.getElementById('filter-budget-range')?.addEventListener('change', (e) => this.filterCelebrities());
        document.getElementById('filter-popularity')?.addEventListener('change', (e) => this.filterCelebrities());

        // Logo Designer Events
        document.getElementById('design-logo-btn')?.addEventListener('click', () => this.openLogoDesigner());
        document.getElementById('preview-logo')?.addEventListener('click', () => this.previewLogo());
        document.getElementById('save-custom-logo')?.addEventListener('click', () => this.saveCustomLogo());
        document.getElementById('close-logo-designer')?.addEventListener('click', () => this.closeLogoDesigner());

        // Promo Code System
        document.getElementById('apply-promo-code')?.addEventListener('click', () => this.applyPromoCode());
        document.getElementById('promo-code-input')?.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.applyPromoCode();
        });

        // Loan Application
        document.querySelectorAll('.loan-apply-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const amount = parseInt(e.target.dataset.amount);
                const rate = parseFloat(e.target.dataset.rate);
                const term = parseInt(e.target.dataset.term);
                this.applyLoan(amount, rate, term);
            });
        });

        // Money container click
        document.getElementById('money-container')?.addEventListener('click', () => this.switchTab('finances'));
        
        // Modal close events
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('modal-overlay')) {
                e.target.style.display = 'none';
            }
        });
    }

    // PWA Setup
    setupPWA() {
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('/sw.js')
                .then(registration => console.log('SW registered'))
                .catch(error => console.log('SW registration failed'));
        }

        window.addEventListener('beforeinstallprompt', (e) => {
            e.preventDefault();
            this.deferredPrompt = e;
            this.showInstallPrompt();
        });

        document.getElementById('install-app')?.addEventListener('click', async () => {
            if (this.deferredPrompt) {
                this.deferredPrompt.prompt();
                const result = await this.deferredPrompt.userChoice;
                this.deferredPrompt = null;
                this.hideInstallPrompt();
            }
        });

        document.getElementById('dismiss-install')?.addEventListener('click', () => {
            this.hideInstallPrompt();
        });
    }

    showInstallPrompt() {
        const installPrompt = document.getElementById('install-prompt');
        if (installPrompt) installPrompt.style.display = 'block';
    }

    hideInstallPrompt() {
        const installPrompt = document.getElementById('install-prompt');
        if (installPrompt) installPrompt.style.display = 'none';
    }

    showLoadingScreen() {
        document.getElementById('loading-screen').style.display = 'flex';
    }

    showGameStartModal() {
        document.getElementById('game-start-modal').style.display = 'flex';
    }

    startNewGame() {
        const selectedBudget = document.querySelector('input[name="starting-budget"]:checked')?.value;
        if (selectedBudget) {
            this.gameData.player.money = parseInt(selectedBudget);
            this.gameData.gameStarted = true;
            document.getElementById('game-start-modal').style.display = 'none';
            this.switchTab('profile');
            this.updateUI();
        }
    }

    loadGame() {
        try {
            const savedGame = localStorage.getItem('bollywoodSimulatorSave');
            if (savedGame) {
                this.gameData = JSON.parse(savedGame);
                this.gameData.gameStarted = true;
                document.getElementById('game-start-modal').style.display = 'none';
                this.switchTab('studio');
                this.updateUI();
                this.showNotification('Game loaded successfully!', 'success');
            } else {
                this.showNotification('No saved game found!', 'error');
            }
        } catch (error) {
            this.showNotification('Failed to load game!', 'error');
        }
    }

    // ENHANCED: Generate Real Indian Avatar Options
    generateAvatarOptions() {
        const avatarGrid = document.getElementById('avatar-grid');
        if (!avatarGrid) return;

        avatarGrid.innerHTML = '';
        
        // Enhanced Indian faces with better diversity
        const indianAvatars = [
            { id: 'male1', photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face', name: 'Male 1' },
            { id: 'female1', photo: 'https://images.unsplash.com/photo-1494790108755-2616b612b27c?w=150&h=150&fit=crop&crop=face', name: 'Female 1' },
            { id: 'male2', photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face', name: 'Male 2' },
            { id: 'female2', photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face', name: 'Female 2' },
            { id: 'male3', photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face', name: 'Male 3' },
            { id: 'female3', photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face', name: 'Female 3' },
            { id: 'male4', photo: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&h=150&fit=crop&crop=face', name: 'Male 4' },
            { id: 'female4', photo: 'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=150&h=150&fit=crop&crop=face', name: 'Female 4' },
            { id: 'male5', photo: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=150&h=150&fit=crop&crop=face', name: 'Male 5' },
            { id: 'female5', photo: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face', name: 'Female 5' }
        ];

        indianAvatars.forEach(avatar => {
            const avatarDiv = document.createElement('div');
            avatarDiv.className = 'avatar-option';
            avatarDiv.dataset.avatarId = avatar.id;
            avatarDiv.innerHTML = `
                <img src="${avatar.photo}" alt="${avatar.name}" 
                     onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
                <i class="fas fa-user-circle" style="display:none;"></i>
            `;
            
            avatarDiv.addEventListener('click', () => this.selectAvatar(avatar));
            avatarGrid.appendChild(avatarDiv);
        });
    }

    // Select Avatar
    selectAvatar(avatar) {
        document.querySelectorAll('.avatar-option').forEach(option => {
            option.classList.remove('selected');
        });
        document.querySelector(`[data-avatar-id="${avatar.id}"]`)?.classList.add('selected');
        
        this.gameData.player.avatar = avatar.photo;
        this.showNotification(`Avatar selected!`, 'success');
    }

    // ENHANCED: Real Production House Style Logos
    generateProductionLogoOptions() {
        const logoGrid = document.getElementById('production-logo-grid');
        if (!logoGrid) return;

        logoGrid.innerHTML = '';
        
        const productionStyles = [
            {
                id: 'yrf',
                name: 'YRF Style',
                className: 'yrf-style',
                icon: '🎬',
                preview: 'YRF'
            },
            {
                id: 'dharma',
                name: 'Dharma Style',
                className: 'dharma-style',
                icon: '🔥',
                preview: 'DHARMA'
            },
            {
                id: 'eros',
                name: 'Eros Style',
                className: 'eros-style',
                icon: '⚡',
                preview: 'EROS'
            },
            {
                id: 'tseries',
                name: 'T-Series Style',
                className: 'tseries-style',
                icon: '🎵',
                preview: 'T-SERIES'
            },
            {
                id: 'excel',
                name: 'Excel Style',
                className: 'excel-style',
                icon: '💎',
                preview: 'EXCEL'
            },
            {
                id: 'redchillies',
                name: 'Red Chillies Style',
                className: 'redchillies-style',
                icon: '🌶️',
                preview: 'RED CHILLIES'
            }
        ];

        productionStyles.forEach(style => {
            const logoDiv = document.createElement('div');
            logoDiv.className = 'production-logo-style';
            logoDiv.dataset.logoId = style.id;
            logoDiv.innerHTML = `
                <div class="logo-preview ${style.className}" data-text="${style.preview}">
                    <span>${style.icon}</span>
                </div>
                <div class="logo-style-name">${style.name}</div>
            `;
            
            logoDiv.addEventListener('click', () => this.selectProductionLogo(style));
            logoGrid.appendChild(logoDiv);
        });
    }

    // FIXED: Select Production Logo with Studio Name
    selectProductionLogo(logoStyle) {
        document.querySelectorAll('.production-logo-style').forEach(option => {
            option.classList.remove('selected');
        });
        document.querySelector(`[data-logo-id="${logoStyle.id}"]`)?.classList.add('selected');
        
        this.gameData.player.studioLogo = {
            id: logoStyle.id,
            style: logoStyle,
            type: 'production'
        };
        
        this.showNotification(`${logoStyle.name} selected! Your studio name will appear on this logo.`, 'success');
    }

    // Create Character with Enhanced Studio Logo
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
            this.showNotification('Please select a studio logo style!', 'error');
            return;
        }

        this.gameData.player.name = characterName;
        this.gameData.player.studioName = studioName;

        // FIXED: Update header studio display immediately
        this.updateHeaderStudioDisplay();
        this.updateStudioDisplay();

        this.showNotification(`Welcome ${characterName}! ${studioName} is ready to create blockbusters!`, 'success');
        this.switchTab('studio');
        this.updateUI();
        this.saveGame();
    }

    // FIXED: Update Header Studio Display
    updateHeaderStudioDisplay() {
        const headerStudioName = document.getElementById('header-studio-name');
        const headerStudioTagline = document.getElementById('header-studio-tagline');
        const headerStudioLogo = document.getElementById('header-studio-logo');
        
        if (headerStudioName && this.gameData.player.studioName) {
            headerStudioName.textContent = this.gameData.player.studioName;
        }
        
        if (headerStudioTagline && this.gameData.player.studioName) {
            headerStudioTagline.textContent = 'Your Cinema Empire';
        }
        
        if (headerStudioLogo && this.gameData.player.studioLogo) {
            headerStudioLogo.innerHTML = '';
            
            if (this.gameData.player.studioLogo.type === 'production') {
                const logoDiv = document.createElement('div');
                logoDiv.className = `logo-preview ${this.gameData.player.studioLogo.style.className}`;
                logoDiv.setAttribute('data-text', this.gameData.player.studioName.substring(0, 8).toUpperCase());
                logoDiv.innerHTML = `<span>${this.gameData.player.studioLogo.style.icon}</span>`;
                headerStudioLogo.appendChild(logoDiv);
            } else {
                const icon = document.createElement('i');
                icon.className = 'fas fa-film';
                headerStudioLogo.appendChild(icon);
            }
        }
    }

    // FIXED: Update Studio Display in Studio Tab
    updateStudioDisplay() {
        const studioNameDisplay = document.getElementById('studio-name-display');
        const studioLogoDisplay = document.getElementById('studio-logo-display');
        const studioYear = document.getElementById('studio-year');
        
        if (studioNameDisplay && this.gameData.player.studioName) {
            studioNameDisplay.textContent = this.gameData.player.studioName;
        }
        
        if (studioYear) {
            studioYear.textContent = this.gameData.player.currentDate.year;
        }
        
        if (studioLogoDisplay && this.gameData.player.studioLogo) {
            studioLogoDisplay.innerHTML = '';
            
            if (this.gameData.player.studioLogo.type === 'production') {
                const logoDiv = document.createElement('div');
                logoDiv.className = `logo-preview ${this.gameData.player.studioLogo.style.className}`;
                logoDiv.setAttribute('data-text', this.gameData.player.studioName.substring(0, 8).toUpperCase());
                logoDiv.innerHTML = `<span>${this.gameData.player.studioLogo.style.icon}</span>`;
                studioLogoDisplay.appendChild(logoDiv);
            } else {
                const icon = document.createElement('i');
                icon.className = 'fas fa-film';
                studioLogoDisplay.appendChild(icon);
            }
        }
    }

    // Switch Tab Functionality
    switchTab(tabName) {
        // Hide all tabs
        document.querySelectorAll('.tab-content').forEach(tab => {
            tab.classList.remove('active');
        });
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.classList.remove('active');
        });

        // Show selected tab
        const selectedTab = document.getElementById(`${tabName}-tab`);
        const selectedBtn = document.querySelector(`[data-tab="${tabName}"]`);
        
        if (selectedTab) selectedTab.classList.add('active');
        if (selectedBtn) selectedBtn.classList.add('active');

        // Update content based on tab
        switch(tabName) {
            case 'studio':
                this.updateStudioDisplay();
                this.updateStaffDisplay();
                break;
            case 'scripts':
                this.updateScriptsDisplay();
                break;
            case 'casting':
                this.updateCastingDisplay();
                break;
            case 'production':
                this.updateProductionTab();
                break;
            case 'boxoffice':
                this.updateBoxOfficeDisplay();
                break;
            case 'market':
                this.updateMarketDisplay();
                break;
            case 'finances':
                this.updateFinancesDisplay();
                break;
        }
    }

    // FIXED: Script Navigation with Back Button
    goBackStep() {
        if (this.gameData.currentScriptStep > 1) {
            this.gameData.currentScriptStep--;
            this.showScriptStep(this.gameData.currentScriptStep);
        }
    }

    showScriptStep(stepNumber) {
        // Hide all steps
        document.querySelectorAll('.script-step').forEach(step => step.classList.remove('active'));
        document.querySelectorAll('.step').forEach(step => step.classList.remove('active'));
        
        // Show current step
        document.getElementById(`step-${stepNumber}`).classList.add('active');
        document.querySelector(`[data-step="${stepNumber}"]`).classList.add('active');
        
        // Show/hide back button
        const backBtn = document.getElementById('script-back-btn');
        if (backBtn) {
            backBtn.style.display = stepNumber > 1 ? 'block' : 'none';
        }
        
        this.gameData.currentScriptStep = stepNumber;
    }

    // Enhanced nextStep function (global function)
    nextStep(stepNumber) {
        this.gameData.currentScriptStep = stepNumber;
        this.showScriptStep(stepNumber);
    }

    // FIXED: Franchise Input Handling
    toggleFranchiseOptions(isChecked) {
        const franchiseOptions = document.getElementById('franchise-options');
        if (franchiseOptions) {
            franchiseOptions.style.display = isChecked ? 'block' : 'none';
        }
    }

    handleFranchiseInput(value) {
        if (value.length > 0) {
            this.showFranchiseDropdown();
            this.populateFranchiseDropdown(value);
        } else {
            this.hideFranchiseDropdown();
        }
    }

    showFranchiseDropdown() {
        const dropdown = document.getElementById('franchise-dropdown');
        if (dropdown) {
            dropdown.style.display = 'block';
        }
    }

    hideFranchiseDropdown() {
        const dropdown = document.getElementById('franchise-dropdown');
        if (dropdown) {
            dropdown.style.display = 'none';
        }
    }

    populateFranchiseDropdown(searchTerm) {
        const dropdown = document.getElementById('franchise-dropdown');
        if (!dropdown) return;

        dropdown.innerHTML = '';

        // Add existing franchises
        const existingFranchises = [...Object.keys(this.predefinedFranchises), ...this.gameData.userFranchises.map(f => f.name)];
        const filteredFranchises = existingFranchises.filter(name => 
            name.toLowerCase().includes(searchTerm.toLowerCase())
        );

        filteredFranchises.forEach(franchiseName => {
            const item = document.createElement('div');
            item.className = 'franchise-dropdown-item';
            item.textContent = franchiseName;
            item.addEventListener('click', () => {
                document.getElementById('franchise-name-input').value = franchiseName;
                this.hideFranchiseDropdown();
                this.displayFranchiseInfo(franchiseName);
            });
            dropdown.appendChild(item);
        });

        // Add "Create New" option
        if (!filteredFranchises.includes(searchTerm)) {
            const createNewItem = document.createElement('div');
            createNewItem.className = 'franchise-dropdown-item create-new';
            createNewItem.textContent = `Create "${searchTerm}" franchise`;
            createNewItem.addEventListener('click', () => {
                document.getElementById('franchise-name-input').value = searchTerm;
                this.hideFranchiseDropdown();
                this.createNewFranchise(searchTerm);
            });
            dropdown.appendChild(createNewItem);
        }
    }

    displayFranchiseInfo(franchiseName) {
        const franchiseInfo = document.getElementById('franchise-info');
        const franchiseCastDisplay = document.getElementById('franchise-cast-display');
        
        if (!franchiseInfo || !franchiseCastDisplay) return;

        const franchise = this.predefinedFranchises[franchiseName.toLowerCase()] || 
                         this.gameData.userFranchises.find(f => f.name === franchiseName);

        if (franchise) {
            franchiseInfo.style.display = 'block';
            franchiseCastDisplay.innerHTML = '';

            if (franchise.regularCast && franchise.regularCast.length > 0) {
                franchise.regularCast.forEach(actor => {
                    const actorDiv = document.createElement('div');
                    actorDiv.className = 'franchise-actor';
                    actorDiv.innerHTML = `
                        <img src="https://randomuser.me/api/portraits/men/${actor.id}.jpg" alt="${actor.name}" 
                             onerror="this.style.display='none'">
                        <h6>${actor.name}</h6>
                        <small>${actor.roles.join(', ')}</small>
                    `;
                    franchiseCastDisplay.appendChild(actorDiv);
                });
            } else {
                franchiseCastDisplay.innerHTML = '<p>No previous cast history for this franchise.</p>';
            }
        }
    }

    createNewFranchise(franchiseName) {
        const newFranchise = {
            name: franchiseName,
            parts: [],
            regularCast: [],
            rating: 0,
            successBonus: 0
        };
        
        this.gameData.userFranchises.push(newFranchise);
        this.showNotification(`New franchise "${franchiseName}" created!`, 'success');
    }

    // FIXED: Timeline Selection
    selectTimeline(card) {
        document.querySelectorAll('.timeline-card').forEach(c => c.classList.remove('selected'));
        card.classList.add('selected');
        
        const timelineValue = card.dataset.timeline;
        this.selectedTimeline = timelineValue;
        
        // Update radio button
        const radioInput = card.querySelector('input[type="radio"]');
        if (radioInput) radioInput.checked = true;
    }

    // Genre Selection
    selectGenre(card) {
        document.querySelectorAll('.genre-card').forEach(c => c.classList.remove('selected'));
        card.classList.add('selected');
        
        const genreValue = card.dataset.genre;
        this.selectedGenre = genreValue;
    }

    // Generate Genre Options
    generateGenreOptions() {
        const genreGrid = document.getElementById('enhanced-genre-grid');
        if (!genreGrid) return;

        genreGrid.innerHTML = '';
        
        Object.entries(this.genres).forEach(([key, genre]) => {
            const genreCard = document.createElement('div');
            genreCard.className = 'genre-card';
            genreCard.dataset.genre = key;
            genreCard.innerHTML = `
                <i class="${genre.icon}" style="color: ${genre.color}"></i>
                <h4>${genre.name}</h4>
                <p>Market Appeal: ${genre.marketAppeal}%</p>
                <p>Budget: ${genre.budget}</p>
            `;
            genreGrid.appendChild(genreCard);
        });
    }

    // Create Script
    createScript() {
        const movieTitle = document.getElementById('movie-title')?.value.trim();
        const leadRolesCount = parseInt(document.getElementById('lead-roles-count')?.value || 1);
        const supportingRolesCount = parseInt(document.getElementById('supporting-roles-count')?.value || 1);
        const isFranchise = document.getElementById('is-franchise')?.checked;
        const franchiseName = document.getElementById('franchise-name-input')?.value.trim();
        const selectedFormat = document.querySelector('input[name="format"]:checked')?.value || '2d';

        if (!movieTitle) {
            this.showNotification('Please enter a movie title!', 'error');
            return;
        }

        if (!this.selectedGenre) {
            this.showNotification('Please select a genre!', 'error');
            return;
        }

        if (!this.selectedTimeline) {
            this.showNotification('Please select a script timeline!', 'error');
            return;
        }

        // Calculate costs
        let baseCost = 1500000; // Base script cost ₹15 lakhs
        if (this.selectedTimeline === 'standard') baseCost = 3000000;
        if (this.selectedTimeline === 'premium') baseCost = 5000000;

        // Format costs
        const formatCosts = {
            '2d': 0,
            '3d': 20000000,
            'imax': 50000000,
            '4dx': 80000000,
            '5d': 120000000
        };

        const totalCost = baseCost + (formatCosts[selectedFormat] || 0);

        if (this.gameData.player.money < totalCost) {
            this.showNotification('Not enough money to develop this script!', 'error');
            return;
        }

        // Create project
        const project = {
            id: Date.now(),
            title: movieTitle,
            genre: this.selectedGenre,
            format: selectedFormat,
            isFranchise: isFranchise,
            franchiseName: franchiseName || null,
            leadRolesCount: leadRolesCount,
            supportingRolesCount: supportingRolesCount,
            scriptTimeline: this.selectedTimeline,
            scriptCost: totalCost,
            totalBudget: totalCost,
            status: 'script_development',
            phase: 'writing',
            weeksRemaining: this.selectedTimeline === 'rush' ? 2 : 
                           this.selectedTimeline === 'standard' ? 4 : 6,
            progress: 0,
            cast: {
                lead: new Array(leadRolesCount).fill(null),
                supporting: new Array(supportingRolesCount).fill(null),
                director: null,
                musicDirector: null,
                singers: []
            },
            createdDate: {...this.gameData.player.currentDate}
        };

        this.gameData.projects.push(project);
        this.gameData.player.money -= totalCost;
        this.gameData.player.totalExpenses += totalCost;

        this.showNotification(`Script development started for "${movieTitle}"! Cost: ${this.formatCurrency(totalCost)}`, 'success');
        
        // Reset form and go back to step 1
        this.resetScriptForm();
        this.showScriptStep(1);
        this.updateScriptsDisplay();
        this.updateUI();
        this.saveGame();
    }

    resetScriptForm() {
        document.getElementById('movie-title').value = '';
        document.getElementById('lead-roles-count').value = '1';
        document.getElementById('supporting-roles-count').value = '1';
        document.getElementById('is-franchise').checked = false;
        document.getElementById('franchise-name-input').value = '';
        document.getElementById('franchise-options').style.display = 'none';
        document.querySelector('input[name="format"][value="2d"]').checked = true;
        document.querySelectorAll('.genre-card').forEach(card => card.classList.remove('selected'));
        document.querySelectorAll('.timeline-card').forEach(card => card.classList.remove('selected'));
        document.querySelector('.timeline-card[data-timeline="standard"]').classList.add('selected');
        this.selectedGenre = 'drama';
        this.selectedTimeline = 'standard';
    }

    // Update Scripts Display
    updateScriptsDisplay() {
        const activeScripts = document.getElementById('active-scripts');
        const scriptProgressList = document.getElementById('script-progress-list');
        
        if (!activeScripts || !scriptProgressList) return;

        const scriptsInDevelopment = this.gameData.projects.filter(p => p.status === 'script_development');
        
        if (scriptsInDevelopment.length > 0) {
            activeScripts.style.display = 'block';
            scriptProgressList.innerHTML = '';
            
            scriptsInDevelopment.forEach(project => {
                const progressCard = document.createElement('div');
                progressCard.className = 'script-progress-card';
                progressCard.innerHTML = `
                    <h4>${project.title}</h4>
                    <p><strong>Genre:</strong> ${this.genres[project.genre].name}</p>
                    <p><strong>Timeline:</strong> ${project.scriptTimeline}</p>
                    <p><strong>Weeks Remaining:</strong> ${project.weeksRemaining}</p>
                    <div class="progress-bar">
                        <div class="progress-fill" style="width: ${project.progress}%"></div>
                    </div>
                    <p>Progress: ${project.progress}%</p>
                `;
                scriptProgressList.appendChild(progressCard);
            });
        } else {
            activeScripts.style.display = 'none';
        }
    }

    // FIXED: Update Cast Assignment Dropdown
    updateCastAssignment() {
        const movieSelector = document.getElementById('movie-selector');
        const roleTypeSelector = document.getElementById('role-type-selector');
        const roleNumberSelector = document.getElementById('role-number-selector');
        const assignmentStatus = document.getElementById('assignment-status');
        const castingRequirements = document.getElementById('casting-requirements');
        
        if (!movieSelector || !roleTypeSelector || !roleNumberSelector) return;

        // Update movie selector
        this.updateMovieSelector();
        
        const selectedMovieId = movieSelector.value;
        const selectedRoleType = roleTypeSelector.value;
        
        if (!selectedMovieId) {
            assignmentStatus.innerHTML = '<p>Select a movie to start casting</p>';
            castingRequirements.style.display = 'none';
            return;
        }
        
        const project = this.gameData.projects.find(p => p.id == selectedMovieId);
        if (!project) return;

        // Update role number selector based on role type
        roleNumberSelector.innerHTML = '';
        let maxRoles = 1;
        
        if (selectedRoleType === 'lead') {
            maxRoles = project.leadRolesCount;
        } else if (selectedRoleType === 'supporting') {
            maxRoles = project.supportingRolesCount;
        }
        
        for (let i = 1; i <= maxRoles; i++) {
            const option = document.createElement('option');
            option.value = i;
            option.textContent = `Role ${i}`;
            roleNumberSelector.appendChild(option);
        }
        
        // Update assignment status
        this.gameData.selectedMovie = selectedMovieId;
        this.gameData.selectedRoleType = selectedRoleType;
        this.gameData.selectedRoleNumber = parseInt(roleNumberSelector.value || 1);
        
        assignmentStatus.innerHTML = `
            <p><strong>Movie:</strong> ${project.title}</p>
            <p><strong>Role:</strong> ${selectedRoleType} ${this.gameData.selectedRoleNumber}</p>
            <p><strong>Status:</strong> Ready for casting</p>
        `;
        
        // Update casting requirements
        this.updateCastingRequirements(project);
        
        // Show franchise info if applicable
        if (project.isFranchise && project.franchiseName) {
            this.showFranchiseShowcase(project.franchiseName);
        }
    }

    // Update Movie Selector
    updateMovieSelector() {
        const movieSelector = document.getElementById('movie-selector');
        if (!movieSelector) return;

        // Clear existing options
        movieSelector.innerHTML = '<option value="">-- Select a movie to cast --</option>';
        
        // Add movies that are ready for casting
        const readyMovies = this.gameData.projects.filter(p => 
            p.status === 'script_ready' || p.status === 'casting' || p.status === 'production_ready'
        );
        
        readyMovies.forEach(project => {
            const option = document.createElement('option');
            option.value = project.id;
            option.textContent = `${project.title} (${project.status.replace('_', ' ')})`;
            movieSelector.appendChild(option);
        });

        if (readyMovies.length === 0) {
            const option = document.createElement('option');
            option.value = '';
            option.textContent = 'No movies ready for casting';
            option.disabled = true;
            movieSelector.appendChild(option);
        }
    }

    // Update Casting Requirements
    updateCastingRequirements(project) {
        const castingRequirements = document.getElementById('casting-requirements');
        const requirementsGrid = document.getElementById('requirements-grid');
        
        if (!castingRequirements || !requirementsGrid) return;

        castingRequirements.style.display = 'block';
        requirementsGrid.innerHTML = '';

        // Lead roles
        for (let i = 0; i < project.leadRolesCount; i++) {
            const card = document.createElement('div');
            card.className = 'requirement-card';
            const isHired = project.cast.lead[i] !== null;
            card.innerHTML = `
                <h4>Lead Role ${i + 1}</h4>
                <p>Status: <span class="status ${isHired ? 'hired' : 'pending'}">${isHired ? 'Hired' : 'Pending'}</span></p>
                ${isHired ? `<p>Actor: ${project.cast.lead[i].name}</p>` : ''}
            `;
            requirementsGrid.appendChild(card);
        }

        // Supporting roles
        for (let i = 0; i < project.supportingRolesCount; i++) {
            const card = document.createElement('div');
            card.className = 'requirement-card';
            const isHired = project.cast.supporting[i] !== null;
            card.innerHTML = `
                <h4>Supporting Role ${i + 1}</h4>
                <p>Status: <span class="status ${isHired ? 'hired' : 'pending'}">${isHired ? 'Hired' : 'Pending'}</span></p>
                ${isHired ? `<p>Actor: ${project.cast.supporting[i].name}</p>` : ''}
            `;
            requirementsGrid.appendChild(card);
        }

        // Director
        const directorCard = document.createElement('div');
        directorCard.className = 'requirement-card';
        const hasDirector = project.cast.director !== null;
        directorCard.innerHTML = `
            <h4>Director</h4>
            <p>Status: <span class="status ${hasDirector ? 'hired' : 'pending'}">${hasDirector ? 'Hired' : 'Pending'}</span></p>
            ${hasDirector ? `<p>Director: ${project.cast.director.name}</p>` : ''}
        `;
        requirementsGrid.appendChild(directorCard);

        // Music Director
        const musicCard = document.createElement('div');
        musicCard.className = 'requirement-card';
        const hasMusic = project.cast.musicDirector !== null;
        musicCard.innerHTML = `
            <h4>Music Director</h4>
            <p>Status: <span class="status ${hasMusic ? 'hired' : 'pending'}">${hasMusic ? 'Hired' : 'Pending'}</span></p>
            ${hasMusic ? `<p>Music: ${project.cast.musicDirector.name}</p>` : ''}
        `;
        requirementsGrid.appendChild(musicCard);
    }

    // Show Franchise Showcase
    showFranchiseShowcase(franchiseName) {
        const franchiseShowcase = document.getElementById('franchise-showcase');
        const franchiseCastGrid = document.getElementById('franchise-cast-grid');
        
        if (!franchiseShowcase || !franchiseCastGrid) return;

        const franchise = this.predefinedFranchises[franchiseName.toLowerCase()] || 
                         this.gameData.userFranchises.find(f => f.name === franchiseName);

        if (franchise && franchise.regularCast && franchise.regularCast.length > 0) {
            franchiseShowcase.style.display = 'block';
            franchiseCastGrid.innerHTML = '';

            franchise.regularCast.forEach(actor => {
                const actorCard = document.createElement('div');
                actorCard.className = 'franchise-actor';
                actorCard.innerHTML = `
                    <img src="https://randomuser.me/api/portraits/men/${actor.id}.jpg" alt="${actor.name}" 
                         onerror="this.style.display='none'">
                    <h6>${actor.name}</h6>
                    <small>${actor.roles.join(', ')}</small>
                    <div style="margin-top: 10px;">
                        <button class="hire-celebrity-btn" onclick="bollywoodSimulator.hireFranchiseActor(${actor.id})">
                            Quick Hire
                        </button>
                    </div>
                `;
                franchiseCastGrid.appendChild(actorCard);
            });
        } else {
            franchiseShowcase.style.display = 'none';
        }
    }

    // Update Casting Display
    updateCastingDisplay() {
        this.updateCastAssignment();
        this.updateCelebrityShowcase(this.getActiveCategoryTab());
        this.updateHiredCastTable();
    }

    // Get Active Category Tab
    getActiveCategoryTab() {
        const activeTab = document.querySelector('.cat-tab.active');
        return activeTab ? activeTab.dataset.category : 'actors';
    }

    // Switch Cast Category
    switchCastCategory(category) {
        document.querySelectorAll('.cat-tab').forEach(tab => tab.classList.remove('active'));
        document.querySelector(`[data-category="${category}"]`).classList.add('active');
        
        this.updateCelebrityShowcase(category);
    }

    // Update Celebrity Showcase
    updateCelebrityShowcase(category) {
        const showcase = document.getElementById('celebrity-showcase');
        if (!showcase) return;

        showcase.innerHTML = '';
        
        let celebrities = [];
        switch(category) {
            case 'actors':
                celebrities = this.celebrities.actors;
                break;
            case 'directors':
                celebrities = this.celebrities.directors;
                break;
            case 'music':
                celebrities = this.celebrities.music;
                break;
            case 'singers':
                celebrities = this.celebrities.singers;
                break;
        }

        celebrities.forEach(celebrity => {
            const card = this.createCelebrityCard(celebrity, category);
            showcase.appendChild(card);
        });
    }

    // ENHANCED: Celebrity Card with Negotiate Button
    createCelebrityCard(celebrity, category) {
        const card = document.createElement('div');
        card.className = 'celebrity-card';
        
        let stats = this.getCelebrityStats(celebrity, category);
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
            <div class="celebrity-actions">
                <button class="negotiate-celebrity-btn" ${isHired ? 'disabled' : ''} 
                        onclick="bollywoodSimulator.openNegotiation('${celebrity.id}', '${category}')">
                    ${isHired ? 'Hired' : 'Negotiate'}
                </button>
                <button class="hire-celebrity-btn" ${isHired ? 'disabled' : ''} 
                        onclick="bollywoodSimulator.hireCelebrity(${JSON.stringify(celebrity).replace(/"/g, '&quot;')}, '${category}', 'quick')">
                    ${isHired ? 'Hired' : 'Quick Hire'}
                </button>
            </div>
        `;

        return card;
    }

    // Get Celebrity Stats
    getCelebrityStats(celebrity, category) {
        switch(category) {
            case 'actors':
                return `
                    <span>Popularity: ${celebrity.popularity}</span>
                    <span>Acting: ${celebrity.acting}</span>
                    <span>Bankability: ${celebrity.bankability}</span>
                    <span>Age: ${celebrity.age}</span>
                `;
            case 'directors':
                return `
                    <span>Skill: ${celebrity.skill}</span>
                    <span>Specialty: ${celebrity.specialty}</span>
                    <span>Success Rate: ${celebrity.successRate}%</span>
                `;
            case 'music':
                return `
                    <span>Skill: ${celebrity.skill}</span>
                    <span>Specialty: ${celebrity.specialty}</span>
                    <span>Awards: ${celebrity.awards}</span>
                `;
            case 'singers':
                return `
                    <span>Popularity: ${celebrity.popularity}</span>
                    <span>Voice: ${celebrity.voice}</span>
                    <span>Specialty: ${celebrity.specialty}</span>
                `;
            default:
                return '';
        }
    }

    // Check if Celebrity is Hired
    isCelebrityHired(celebrityId, category) {
        return this.gameData.hiredCast.some(hire => 
            hire.celebrityId == celebrityId && hire.category === category
        );
    }

    // Filter Celebrities
    filterCelebrities() {
        const searchTerm = document.getElementById('search-celebrity')?.value.toLowerCase() || '';
        const budgetRange = document.getElementById('filter-budget-range')?.value || '';
        const popularityRange = document.getElementById('filter-popularity')?.value || '';
        
        const category = this.getActiveCategoryTab();
        let celebrities = this.celebrities[category] || [];
        
        // Apply filters
        if (searchTerm) {
            celebrities = celebrities.filter(c => 
                c.name.toLowerCase().includes(searchTerm)
            );
        }
        
        if (budgetRange) {
            celebrities = celebrities.filter(c => {
                switch(budgetRange) {
                    case 'budget': return c.fee < 50000000;
                    case 'mid': return c.fee >= 50000000 && c.fee <= 200000000;
                    case 'premium': return c.fee > 200000000;
                    default: return true;
                }
            });
        }
        
        if (popularityRange) {
            const popularityProp = category === 'actors' ? 'popularity' : 
                                  category === 'directors' ? 'skill' : 
                                  category === 'singers' ? 'popularity' : 'skill';
            
            celebrities = celebrities.filter(c => {
                const value = c[popularityProp] || 0;
                switch(popularityRange) {
                    case 'superstar': return value >= 90;
                    case 'established': return value >= 70 && value < 90;
                    case 'rising': return value >= 50 && value < 70;
                    default: return true;
                }
            });
        }
        
        // Update showcase with filtered results
        const showcase = document.getElementById('celebrity-showcase');
        if (showcase) {
            showcase.innerHTML = '';
            celebrities.forEach(celebrity => {
                const card = this.createCelebrityCard(celebrity, category);
                showcase.appendChild(card);
            });
            
            if (celebrities.length === 0) {
                showcase.innerHTML = '<p style="text-align: center; color: var(--text-muted); font-style: italic;">No celebrities found matching your filters.</p>';
            }
        }
    }

    // NEW: Negotiation System
    openNegotiation(celebrityId, category) {
        if (!this.gameData.selectedMovie) {
            this.showNotification('Please select a movie first!', 'error');
            return;
        }

        const celebrity = this.findCelebrityById(celebrityId, category);
        if (!celebrity) return;

        this.negotiationData = {
            celebrity: celebrity,
            category: category,
            askingPrice: celebrity.fee
        };

        // Update negotiation modal
        document.getElementById('negotiate-celebrity-photo').src = celebrity.photo;
        document.getElementById('negotiate-celebrity-name').textContent = celebrity.name;
        document.getElementById('negotiate-celebrity-role').textContent = `Role: ${this.gameData.selectedRoleType} ${this.gameData.selectedRoleNumber}`;
        document.getElementById('negotiate-asking-price').textContent = this.formatCurrency(celebrity.fee);

        // Reset sliders
        this.updateFixedOffer(50);
        this.updatePercentageOffer(5);
        this.updateHybridBase(20);
        this.updateHybridPercent(3);

        // Show modal
        document.getElementById('negotiation-modal').style.display = 'flex';
        this.switchDealTab('fixed');
    }

    // Find Celebrity by ID
    findCelebrityById(celebrityId, category) {
        const celebrities = this.celebrities[category] || [];
        return celebrities.find(c => c.id == celebrityId);
    }

    // Deal Tab Switching
    switchDealTab(dealType) {
        document.querySelectorAll('.deal-tab').forEach(tab => tab.classList.remove('active'));
        document.querySelectorAll('.deal-content').forEach(content => content.classList.remove('active'));
        
        document.querySelector(`[data-deal="${dealType}"]`).classList.add('active');
        document.getElementById(`${dealType}-deal`).classList.add('active');
        
        this.updateNegotiationResult();
    }

    // Update offer amounts
    updateFixedOffer(value) {
        const celebrity = this.negotiationData?.celebrity;
        if (!celebrity) return;
        
        const percentage = parseInt(value);
        const offerAmount = Math.round(celebrity.fee * (percentage / 100));
        document.getElementById('fixed-offer-amount').textContent = this.formatCurrency(offerAmount);
        document.getElementById('fixed-offer').value = value;
        this.updateNegotiationResult();
    }

    updatePercentageOffer(value) {
        document.getElementById('percentage-offer').textContent = `${value}%`;
        document.getElementById('percentage-slider').value = value;
        this.updateNegotiationResult();
    }

    updateHybridBase(value) {
        const celebrity = this.negotiationData?.celebrity;
        if (!celebrity) return;
        
        const percentage = parseInt(value);
        const baseAmount = Math.round(celebrity.fee * (percentage / 100));
        document.getElementById('hybrid-base-amount').textContent = this.formatCurrency(baseAmount);
        document.getElementById('hybrid-base').value = value;
        this.updateNegotiationResult();
    }

    updateHybridPercent(value) {
        document.getElementById('hybrid-percentage').textContent = `${value}%`;
        document.getElementById('hybrid-percent').value = value;
        this.updateNegotiationResult();
    }

    // Calculate negotiation success chance
    updateNegotiationResult() {
        const celebrity = this.negotiationData?.celebrity;
        if (!celebrity) return;
        
        let successChance = 50; // Base chance
        const activeDeal = document.querySelector('.deal-tab.active')?.dataset.deal;
        
        if (activeDeal === 'fixed') {
            const offerPercentage = parseInt(document.getElementById('fixed-offer').value);
            successChance = Math.min(95, Math.max(5, offerPercentage * 1.5));
        } else if (activeDeal === 'percentage') {
            const percentage = parseInt(document.getElementById('percentage-slider').value);
            successChance = Math.min(90, Math.max(10, 30 + (percentage * 4)));
        } else if (activeDeal === 'hybrid') {
            const basePercentage = parseInt(document.getElementById('hybrid-base').value);
            const sharePercentage = parseInt(document.getElementById('hybrid-percent').value);
            successChance = Math.min(85, Math.max(15, 40 + basePercentage + (sharePercentage * 2)));
        }
        
        // Adjust based on celebrity popularity and player reputation
        const popularityProp = this.negotiationData.category === 'actors' ? 'popularity' : 'skill';
        if (celebrity[popularityProp] > 90) successChance -= 15;
        if (this.gameData.player.reputation > 80) successChance += 10;
        
        successChance = Math.min(95, Math.max(5, Math.round(successChance)));
        
        document.getElementById('success-chance').textContent = `${successChance}%`;
        document.getElementById('chance-fill').style.width = `${successChance}%`;
        
        // Update bar color based on chance
        const chanceBar = document.getElementById('chance-fill');
        if (successChance >= 70) {
            chanceBar.style.background = 'var(--gradient-success)';
        } else if (successChance >= 40) {
            chanceBar.style.background = 'var(--warning)';
        } else {
            chanceBar.style.background = 'var(--error)';
        }
    }

    // Make Offer
    makeOffer() {
        const celebrity = this.negotiationData?.celebrity;
        if (!celebrity) return;
        
        const successChance = parseInt(document.getElementById('success-chance').textContent);
        const isSuccess = Math.random() * 100 < successChance;
        
        if (isSuccess) {
            this.acceptNegotiation();
        } else {
            this.rejectNegotiation();
        }
    }

    // Accept Negotiation
    acceptNegotiation() {
        const celebrity = this.negotiationData.celebrity;
        const category = this.negotiationData.category;
        const activeDeal = document.querySelector('.deal-tab.active')?.dataset.deal;
        
        let dealDetails = {};
        
        if (activeDeal === 'fixed') {
            const offerPercentage = parseInt(document.getElementById('fixed-offer').value);
            const finalFee = Math.round(celebrity.fee * (offerPercentage / 100));
            dealDetails = { type: 'fixed', amount: finalFee };
        } else if (activeDeal === 'percentage') {
            const percentage = parseInt(document.getElementById('percentage-slider').value);
            dealDetails = { type: 'percentage', percentage: percentage };
        } else if (activeDeal === 'hybrid') {
            const basePercentage = parseInt(document.getElementById('hybrid-base').value);
            const sharePercentage = parseInt(document.getElementById('hybrid-percent').value);
            const baseFee = Math.round(celebrity.fee * (basePercentage / 100));
            dealDetails = { 
                type: 'hybrid', 
                baseFee: baseFee, 
                percentage: sharePercentage 
            };
        }
        
        this.hireCelebrity(celebrity, category, 'negotiated', dealDetails);
        this.closeNegotiation();
        
        this.showNotification(`🤝 Deal accepted! ${celebrity.name} is now part of your movie!`, 'success');
    }

    // Reject Negotiation
    rejectNegotiation() {
        this.closeNegotiation();
        this.showNotification(`❌ ${this.negotiationData.celebrity.name} rejected your offer. Try a better deal!`, 'error');
    }

    // Close Negotiation
    closeNegotiation() {
        document.getElementById('negotiation-modal').style.display = 'none';
        this.negotiationData = null;
    }

    // ENHANCED: Hire Celebrity with Deal Types
    hireCelebrity(celebrity, category, hireType = 'quick', dealDetails = null) {
        const selectedMovieId = this.gameData.selectedMovie;
        const selectedRoleType = this.gameData.selectedRoleType;
        const selectedRoleNumber = this.gameData.selectedRoleNumber;

        if (!selectedMovieId) {
            this.showNotification('Please select a movie first!', 'error');
            return;
        }

        const project = this.gameData.projects.find(p => p.id == selectedMovieId);
        if (!project) return;

        // Calculate final cost based on deal type
        let finalCost = celebrity.fee;
        let deal = { type: 'fixed', amount: celebrity.fee };
        
        if (hireType === 'negotiated' && dealDetails) {
            deal = dealDetails;
            if (dealDetails.type === 'fixed') {
                finalCost = dealDetails.amount;
            } else if (dealDetails.type === 'hybrid') {
                finalCost = dealDetails.baseFee; // Pay base fee upfront
            } else if (dealDetails.type === 'percentage') {
                finalCost = 0; // No upfront cost for percentage deals
            }
        }

        // Check if player can afford upfront cost
        if (this.gameData.player.money < finalCost) {
            this.showNotification('Not enough money for this deal!', 'error');
            return;
        }

        // Deduct upfront cost
        this.gameData.player.money -= finalCost;
        this.gameData.player.totalExpenses += finalCost;
        project.totalBudget += finalCost;
        
        // Add to project cast
        const castMember = {
            ...celebrity, 
            assignedRole: `${selectedRoleType} ${selectedRoleNumber}`,
            deal: deal,
            hireType: hireType
        };
        
        if (category === 'actors') {
            if (selectedRoleType === 'lead') {
                project.cast.lead[selectedRoleNumber - 1] = castMember;
            } else if (selectedRoleType === 'supporting') {
                project.cast.supporting[selectedRoleNumber - 1] = castMember;
            }
        } else if (category === 'directors') {
            project.cast.director = castMember;
        } else if (category === 'music') {
            project.cast.musicDirector = castMember;
        } else if (category === 'singers') {
            project.cast.singers.push(castMember);
        }

        // Add to global hired cast
        this.gameData.hiredCast.push({
            celebrityId: celebrity.id,
            category: category,
            movieId: selectedMovieId,
            movieTitle: project.title,
            roleType: selectedRoleType,
            roleNumber: selectedRoleNumber,
            deal: deal,
            hiredDate: {...this.gameData.player.currentDate}
        });

        this.updateCelebrityShowcase(this.getActiveCategoryTab());
        this.updateCastingRequirements(project);
        this.updateHiredCastTable();
        this.checkProductionReadiness(project);
        this.updateUI();
        this.saveGame();

        const dealText = deal.type === 'percentage' ? `${deal.percentage}% box office share` :
                        deal.type === 'hybrid' ? `₹${this.formatCurrency(deal.baseFee)} + ${deal.percentage}%` :
                        this.formatCurrency(deal.amount);
        
        this.showNotification(`${celebrity.name} hired for ${project.title}! Deal: ${dealText}`, 'success');
    }

    // FIXED: Check Production Readiness and Start Production
    checkProductionReadiness(project) {
        const hasLeadActors = project.cast.lead.every(role => role !== null);
        const hasSupportingActors = project.cast.supporting.every(role => role !== null);
        const hasDirector = project.cast.director !== null;
        
        if (hasLeadActors && hasSupportingActors && hasDirector && project.status === 'script_ready') {
            project.status = 'production_ready';
            project.phase = 'casting_complete';
            this.showNotification(`"${project.title}" is ready for production!`, 'success');
            this.updateProductionTab();
        }
    }

    // ENHANCED: Update Hired Cast Table with Deal Types
    updateHiredCastTable() {
        const tableBody = document.getElementById('hired-cast-table-body');
        if (!tableBody) return;

        tableBody.innerHTML = '';

        this.gameData.hiredCast.forEach((hire, index) => {
            const celebrity = this.findCelebrityById(hire.celebrityId, hire.category);
            if (!celebrity) return;

            let dealText = this.formatCurrency(hire.deal.amount);
            
            if (hire.deal.type === 'percentage') {
                dealText = `${hire.deal.percentage}% Box Office`;
            } else if (hire.deal.type === 'hybrid') {
                dealText = `${this.formatCurrency(hire.deal.baseFee)} + ${hire.deal.percentage}%`;
            }

            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${hire.movieTitle}</td>
                <td>
                    <span class="role-badge">${hire.roleType}</span>
                </td>
                <td>${hire.roleNumber}</td>
                <td>
                    <div class="cast-member-info">
                        <img src="${celebrity.photo}" alt="${celebrity.name}" class="cast-member-avatar" 
                             onerror="this.style.display='none'">
                        <span class="cast-member-name">${celebrity.name}</span>
                    </div>
                </td>
                <td>${dealText}</td>
                <td>
                    <span class="status-badge assigned">Assigned</span>
                </td>
                <td>
                    <button class="remove-cast-btn" onclick="bollywoodSimulator.removeCastMember(${index})">
                        Remove
                    </button>
                </td>
            `;
            tableBody.appendChild(row);
        });

        if (this.gameData.hiredCast.length === 0) {
            const row = document.createElement('tr');
            row.innerHTML = '<td colspan="7" style="text-align: center; color: var(--text-muted); font-style: italic;">No cast members hired yet</td>';
            tableBody.appendChild(row);
        }
    }

    // Remove Cast Member
    removeCastMember(index) {
        const hire = this.gameData.hiredCast[index];
        if (!hire) return;

        // Remove from project cast
        const project = this.gameData.projects.find(p => p.id == hire.movieId);
        if (project) {
            if (hire.category === 'actors') {
                if (hire.roleType === 'lead') {
                    project.cast.lead[hire.roleNumber - 1] = null;
                } else if (hire.roleType === 'supporting') {
                    project.cast.supporting[hire.roleNumber - 1] = null;
                }
            } else if (hire.category === 'directors') {
                project.cast.director = null;
            } else if (hire.category === 'music') {
                project.cast.musicDirector = null;
            } else if (hire.category === 'singers') {
                project.cast.singers = project.cast.singers.filter(s => s.id !== hire.celebrityId);
            }

            // If it was a fixed fee, refund 50% of the cost
            if (hire.deal.type === 'fixed') {
                const refund = Math.round(hire.deal.amount * 0.5);
                this.gameData.player.money += refund;
                project.totalBudget -= refund;
                this.showNotification(`${hire.deal.amount > 0 ? this.formatCurrency(refund) + ' refunded.' : 'No refund for percentage deals.'}`, 'info');
            }

            this.updateCastingRequirements(project);
        }

        // Remove from hired cast list
        this.gameData.hiredCast.splice(index, 1);
        
        this.updateHiredCastTable();
        this.updateCelebrityShowcase(this.getActiveCategoryTab());
        this.updateUI();
        this.saveGame();
        
        this.showNotification('Cast member removed successfully!', 'success');
    }

    // ENHANCED: Production Tab with Processing
    updateProductionTab() {
        const projectsList = document.getElementById('current-projects-list');
        const productionActions = document.getElementById('production-actions');
        
        if (!projectsList) return;
        
        const readyProjects = this.gameData.projects.filter(p => 
            p.status === 'production_ready' || p.status === 'production' || p.status === 'post_production'
        );
        
        if (readyProjects.length === 0) {
            projectsList.innerHTML = '<p class="no-project">No projects ready for production. Complete casting first!</p>';
            if (productionActions) productionActions.style.display = 'none';
            return;
        }
        
        projectsList.innerHTML = '';
        
        readyProjects.forEach(project => {
            const projectCard = document.createElement('div');
            projectCard.className = 'project-detail-card';
            projectCard.innerHTML = `
                <h4>${project.title}</h4>
                <div class="project-grid">
                    <p><strong>Genre:</strong> ${this.genres[project.genre].name}</p>
                    <p><strong>Status:</strong> ${project.status.replace('_', ' ')}</p>
                    <p><strong>Budget:</strong> ${this.formatCurrency(project.totalBudget)}</p>
                    <p><strong>Cast:</strong> ${project.cast.lead.filter(a => a).length} leads, ${project.cast.supporting.filter(a => a).length} supporting</p>
                </div>
                <div class="production-progress">
                    <div class="progress-bar">
                        <div class="progress-fill" style="width: ${project.productionProgress || 0}%"></div>
                    </div>
                    <p>Progress: ${project.productionProgress || 0}%</p>
                </div>
            `;
            projectsList.appendChild(projectCard);
        });
        
        if (productionActions) {
            const hasReadyProject = readyProjects.some(p => p.status === 'production_ready');
            productionActions.style.display = hasReadyProject ? 'block' : 'none';
        }
    }

    // NEW: Start Production
    startProduction() {
        const readyProject = this.gameData.projects.find(p => p.status === 'production_ready');
        if (!readyProject) return;
        
        readyProject.status = 'production';
        readyProject.phase = 'filming';
        readyProject.productionProgress = 0;
        readyProject.productionWeeks = 12; // Standard production time
        readyProject.productionWeeksRemaining = 12;
        
        this.showNotification(`🎬 Production started for "${readyProject.title}"!`, 'success');
        this.updateProductionTab();
        this.saveGame();
    }

    // NEW: Fast Track Production
    fastTrackProduction() {
        const readyProject = this.gameData.projects.find(p => p.status === 'production_ready');
        if (!readyProject) return;
        
        const fastTrackCost = Math.round(readyProject.totalBudget * 0.5); // 50% extra cost
        
        if (this.gameData.player.money < fastTrackCost) {
            this.showNotification('Not enough money for fast track production!', 'error');
            return;
        }
        
        this.gameData.player.money -= fastTrackCost;
        readyProject.totalBudget += fastTrackCost;
        
        readyProject.status = 'production';
        readyProject.phase = 'filming';
        readyProject.productionProgress = 0;
        readyProject.productionWeeks = 6; // Faster production
        readyProject.productionWeeksRemaining = 6;
        readyProject.fastTracked = true;
        
        this.showNotification(`⚡ Fast track production started for "${readyProject.title}"! (+50% cost)`, 'success');
        this.updateProductionTab();
        this.saveGame();
    }

    // Staff Management
    updateStaffDisplay() {
        // Update staff counts
        const adminStaff = this.gameData.staff.admin;
        const techStaff = this.gameData.staff.tech;
        
        document.getElementById('production-managers').textContent = adminStaff.productionManager;
        document.getElementById('accountants').textContent = adminStaff.accountant;
        document.getElementById('pr-managers').textContent = adminStaff.prManager;
        document.getElementById('camera-operators').textContent = techStaff.cameraOperator;
        document.getElementById('sound-engineers').textContent = techStaff.soundEngineer;
        document.getElementById('video-editors').textContent = techStaff.videoEditor;
        
        // Calculate total salaries
        const totalSalaries = 
            (adminStaff.productionManager * 80000) +
            (adminStaff.accountant * 60000) +
            (adminStaff.prManager * 70000) +
            (techStaff.cameraOperator * 50000) +
            (techStaff.soundEngineer * 45000) +
            (techStaff.videoEditor * 55000);
        
        document.getElementById('total-salaries').textContent = this.formatCurrency(totalSalaries);
        document.getElementById('total-monthly-cost').textContent = this.formatCurrency(totalSalaries + 250000);
        
        // Update hire button states
        this.updateHireButtonStates();
    }

    updateHireButtonStates() {
        const buttons = document.querySelectorAll('.hire-staff-btn');
        buttons.forEach(btn => {
            const role = btn.dataset.role;
            const salary = parseInt(btn.dataset.salary);
            const maxCount = this.getMaxStaffCount(role);
            const currentCount = this.getCurrentStaffCount(role);
            
            btn.disabled = currentCount >= maxCount || this.gameData.player.money < salary * 6; // 6 months advance
            btn.textContent = currentCount >= maxCount ? 'Max Hired' : 
                            this.gameData.player.money < salary * 6 ? 'Not Enough Money' : 'Hire';
        });
    }

    getMaxStaffCount(role) {
        const maxCounts = {
            'production-manager': 3,
            'accountant': 2,
            'pr-manager': 2,
            'camera-operator': 5,
            'sound-engineer': 3,
            'video-editor': 4
        };
        return maxCounts[role] || 1;
    }

    getCurrentStaffCount(role) {
        const roleMap = {
            'production-manager': 'productionManager',
            'accountant': 'accountant',
            'pr-manager': 'prManager',
            'camera-operator': 'cameraOperator',
            'sound-engineer': 'soundEngineer',
            'video-editor': 'videoEditor'
        };
        
        const mappedRole = roleMap[role];
        if (mappedRole) {
            if (['productionManager', 'accountant', 'prManager'].includes(mappedRole)) {
                return this.gameData.staff.admin[mappedRole] || 0;
            } else {
                return this.gameData.staff.tech[mappedRole] || 0;
            }
        }
        return 0;
    }

    hireStaff(role, salary) {
        const advanceCost = salary * 6; // 6 months advance
        
        if (this.gameData.player.money < advanceCost) {
            this.showNotification('Not enough money to hire this staff member!', 'error');
            return;
        }
        
        const currentCount = this.getCurrentStaffCount(role);
        const maxCount = this.getMaxStaffCount(role);
        
        if (currentCount >= maxCount) {
            this.showNotification('Maximum staff of this type already hired!', 'error');
            return;
        }
        
        this.gameData.player.money -= advanceCost;
        this.gameData.player.totalExpenses += advanceCost;
        
        const roleMap = {
            'production-manager': 'productionManager',
            'accountant': 'accountant',
            'pr-manager': 'prManager',
            'camera-operator': 'cameraOperator',
            'sound-engineer': 'soundEngineer',
            'video-editor': 'videoEditor'
        };
        
        const mappedRole = roleMap[role];
        if (mappedRole) {
            if (['productionManager', 'accountant', 'prManager'].includes(mappedRole)) {
                this.gameData.staff.admin[mappedRole]++;
            } else {
                this.gameData.staff.tech[mappedRole]++;
            }
        }
        
        this.showNotification(`Staff member hired! 6 months advance paid: ${this.formatCurrency(advanceCost)}`, 'success');
        this.updateStaffDisplay();
        this.updateUI();
        this.saveGame();
    }

    // ENHANCED: Weekly Events Processing
    advanceWeek() {
        this.gameData.player.currentDate.week += 1;
        if (this.gameData.player.currentDate.week > 4) {
            this.gameData.player.currentDate.week = 1;
            this.advanceMonth();
            return;
        }
        
        this.processWeeklyEvents();
        this.updateDateDisplay();
        this.updateUI();
        this.saveGame();
    }

    advanceMonth() {
        this.gameData.player.currentDate.month += 1;
        if (this.gameData.player.currentDate.month > 12) {
            this.gameData.player.currentDate.month = 1;
            this.gameData.player.currentDate.year += 1;
        }
        
        this.processMonthlyEvents();
        this.updateDateDisplay();
        this.updateUI();
        this.saveGame();
    }

    processWeeklyEvents() {
        // Process script development
        this.updateProjectProgress();
        
        // Process production progress
        this.updateProductionProgress();
        
        // Random events
        if (Math.random() < 0.1) {
            this.triggerRandomEvent();
        }
    }

    processMonthlyEvents() {
        // Pay monthly staff salaries
        this.payMonthlySalaries();
        
        // Process competitor activities
        this.updateCompetitorActivities();
        
        // Update market share
        this.updateMarketShare();
        
        // Process all weekly events for 4 weeks
        for (let i = 0; i < 4; i++) {
            this.processWeeklyEvents();
        }
    }

    payMonthlySalaries() {
        const adminStaff = this.gameData.staff.admin;
        const techStaff = this.gameData.staff.tech;
        
        const totalSalaries = 
            (adminStaff.productionManager * 80000) +
            (adminStaff.accountant * 60000) +
            (adminStaff.prManager * 70000) +
            (techStaff.cameraOperator * 50000) +
            (techStaff.soundEngineer * 45000) +
            (techStaff.videoEditor * 55000) +
            250000; // Office rent and utilities
        
        if (totalSalaries > 0) {
            this.gameData.player.money -= totalSalaries;
            this.gameData.player.totalExpenses += totalSalaries;
            this.showNotification(`Monthly expenses paid: ${this.formatCurrency(totalSalaries)}`, 'info');
        }
    }

    // FIXED: Update Project Progress (Script Development)
    updateProjectProgress() {
        this.gameData.projects.forEach(project => {
            if (project.weeksRemaining > 0 && project.status === 'script_development') {
                project.weeksRemaining--;
                const totalWeeks = project.scriptTimeline === 'rush' ? 2 : 
                                 project.scriptTimeline === 'standard' ? 4 : 6;
                project.progress = Math.round((1 - project.weeksRemaining / totalWeeks) * 100);
            }
            
            if (project.weeksRemaining === 0 && project.status === 'script_development') {
                project.status = 'script_ready';
                project.phase = 'casting';
                this.showNotification(`📝 Script for "${project.title}" is ready! Time to cast actors.`, 'success');
                this.updateMovieSelector();
            }
        });
    }

    // NEW: Update Production Progress
    updateProductionProgress() {
        this.gameData.projects.forEach(project => {
            if (project.status === 'production' && project.productionWeeksRemaining > 0) {
                project.productionWeeksRemaining--;
                project.productionProgress = Math.round(
                    (1 - project.productionWeeksRemaining / project.productionWeeks) * 100
                );
                
                if (project.productionWeeksRemaining === 0) {
                    project.status = 'post_production';
                    project.phase = 'editing';
                    project.postProductionWeeks = 4;
                    project.postProductionWeeksRemaining = 4;
                    project.postProductionProgress = 0;
                    this.showNotification(`🎬 Filming completed for "${project.title}"! Moving to post-production.`, 'success');
                }
            }
            
            if (project.status === 'post_production' && project.postProductionWeeksRemaining > 0) {
                project.postProductionWeeksRemaining--;
                project.postProductionProgress = Math.round(
                    (1 - project.postProductionWeeksRemaining / project.postProductionWeeks) * 100
                );
                
                if (project.postProductionWeeksRemaining === 0) {
                    project.status = 'marketing_ready';
                    project.phase = 'ready_for_release';
                    this.showNotification(`✨ "${project.title}" is ready for marketing and release!`, 'success');
                }
            }
        });
        
        this.updateProductionTab();
    }

    // Market Competition System
    initializeCompetitorStudios() {
        this.gameData.competitorStudios = [
            {
                id: 1,
                name: 'Bollywood Kings',
                reputation: 75,
                marketShare: 15,
                activeProjects: 2,
                lastRelease: 'Action Hero',
                earnings: 250000000,
                logo: { background: 'linear-gradient(135deg, #dc2626 0%, #f97316 100%)' }
            },
            {
                id: 2,
                name: 'Dream Productions',
                reputation: 68,
                marketShare: 12,
                activeProjects: 3,
                lastRelease: 'Love Story',
                earnings: 180000000,
                logo: { background: 'linear-gradient(135deg, #ec4899 0%, #f472b6 100%)' }
            },
            {
                id: 3,
                name: 'Golden Gate Films',
                reputation: 82,
                marketShare: 18,
                activeProjects: 1,
                lastRelease: 'Family Drama',
                earnings: 320000000,
                logo: { background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)' }
            },
            {
                id: 4,
                name: 'Silver Screen Studios',
                reputation: 70,
                marketShare: 14,
                activeProjects: 2,
                lastRelease: 'Comedy Special',
                earnings: 220000000,
                logo: { background: 'linear-gradient(135deg, #64748b 0%, #94a3b8 100%)' }
            }
        ];
        
        this.updateCompetitorDisplay();
    }

    // Generate Release Schedule
    generateReleaseSchedule() {
        this.gameData.releaseSchedule = [];
        const currentDate = this.gameData.player.currentDate;
        
        // Generate competitor releases
        for (let i = 1; i <= 12; i++) {
            const month = ((currentDate.month + i - 1) % 12) + 1;
            const year = currentDate.year + Math.floor((currentDate.month + i - 1) / 12);
            
            // Random number of releases per month
            const releasesCount = Math.floor(Math.random() * 4) + 1;
            
            for (let j = 0; j < releasesCount; j++) {
                const randomStudio = this.gameData.competitorStudios[Math.floor(Math.random() * this.gameData.competitorStudios.length)];
                const genres = Object.keys(this.genres);
                const randomGenre = genres[Math.floor(Math.random() * genres.length)];
                const day = Math.floor(Math.random() * 28) + 1;
                
                this.gameData.releaseSchedule.push({
                    id: Date.now() + i + j,
                    title: this.generateRandomMovieTitle(randomGenre),
                    studio: randomStudio.name,
                    genre: randomGenre,
                    date: { year, month, day },
                    estimatedBudget: (Math.floor(Math.random() * 50) + 10) * 1000000,
                    competition: this.calculateCompetitionLevel(month, day)
                });
            }
        }
        
        this.updateReleaseScheduleDisplay();
    }

    // Generate Random Movie Titles
    generateRandomMovieTitle(genre) {
        const titleWords = {
            action: ['Thunder', 'Strike', 'Revenge', 'Power', 'Victory', 'Fighter', 'Hero', 'Battle'],
            romance: ['Love', 'Heart', 'Dreams', 'Promise', 'Forever', 'Together', 'Destiny', 'Soul'],
            comedy: ['Funny', 'Laugh', 'Crazy', 'Mad', 'Comedy', 'Fun', 'Jokes', 'Hilarious'],
            drama: ['Life', 'Story', 'Journey', 'Dreams', 'Hope', 'Truth', 'Family', 'Struggle'],
            thriller: ['Mystery', 'Secret', 'Dark', 'Shadow', 'Truth', 'Hidden', 'Dangerous', 'Fear']
        };
        
        const words = titleWords[genre] || titleWords.drama;
        const word1 = words[Math.floor(Math.random() * words.length)];
        const word2 = words[Math.floor(Math.random() * words.length)];
        
        return Math.random() > 0.5 ? word1 : `${word1} ${word2}`;
    }

    // Calculate Competition Level
    calculateCompetitionLevel(month, day) {
        // Holiday seasons and weekends have higher competition
        const holidays = [1, 4, 8, 10, 11]; // Jan, Apr, Aug, Oct, Nov
        const isHoliday = holidays.includes(month);
        const isWeekend = day % 7 < 2;
        
        if (isHoliday && isWeekend) return 'high';
        if (isHoliday || isWeekend) return 'medium';
        return 'low';
    }

    // NEW: Update Competitor Activities (AI Studios)
    updateCompetitorActivities() {
        this.gameData.competitorStudios.forEach(studio => {
            // Random chance for competitors to start new projects
            if (Math.random() < 0.1 && studio.activeProjects < 3) {
                studio.activeProjects++;
                const genres = Object.keys(this.genres);
                const randomGenre = genres[Math.floor(Math.random() * genres.length)];
                const newMovie = this.generateRandomMovieTitle(randomGenre);
                
                // Add to release schedule
                const futureDate = this.getFutureDate(12 + Math.floor(Math.random() * 24)); // 3-6 months
                this.gameData.releaseSchedule.push({
                    id: Date.now() + Math.random(),
                    title: newMovie,
                    studio: studio.name,
                    genre: randomGenre,
                    date: futureDate,
                    estimatedBudget: (Math.floor(Math.random() * 100) + 20) * 1000000,
                    competition: this.calculateCompetitionLevel(futureDate.month, futureDate.day)
                });
            }
            
            // Update studio reputation randomly
            const reputationChange = (Math.random() - 0.5) * 4; // -2 to +2
            studio.reputation = Math.max(0, Math.min(100, studio.reputation + reputationChange));
        });
        
        this.updateCompetitorDisplay();
        this.updateReleaseScheduleDisplay();
    }

    // Calculate Future Date
    getFutureDate(weeksAhead) {
        const currentDate = { ...this.gameData.player.currentDate };
        
        for (let i = 0; i < weeksAhead; i++) {
            currentDate.week++;
            if (currentDate.week > 4) {
                currentDate.week = 1;
                currentDate.month++;
                if (currentDate.month > 12) {
                    currentDate.month = 1;
                    currentDate.year++;
                }
            }
        }
        
        currentDate.day = Math.floor(Math.random() * 28) + 1;
        return currentDate;
    }

    // Update Market Share
    updateMarketShare() {
        const totalEarnings = this.gameData.completedProjects.reduce((sum, project) => 
            sum + (project.boxOfficeCollection || 0), 0);
        
        const totalMarketSize = 50000000000; // ₹500 crores total market
        this.gameData.player.marketShare = Math.min(50, (totalEarnings / totalMarketSize) * 100);
        
        this.updateMarketShareDisplay();
    }

    // Update Market Share Display
    updateMarketShareDisplay() {
        const playerShareElement = document.getElementById('player-share');
        const playerShareText = document.getElementById('player-share-text');
        const playerStudioName = document.getElementById('player-studio-name');
        
        if (playerShareElement && playerShareText) {
            const share = Math.round(this.gameData.player.marketShare);
            playerShareElement.style.width = `${share}%`;
            playerShareText.textContent = `${share}%`;
        }
        
        if (playerStudioName && this.gameData.player.studioName) {
            playerStudioName.textContent = this.gameData.player.studioName;
        }
    }

    // Update Competitor Display
    updateCompetitorDisplay() {
        const competitorsGrid = document.getElementById('competitors-grid');
        if (!competitorsGrid) return;
        
        competitorsGrid.innerHTML = '';
        
        this.gameData.competitorStudios.forEach(studio => {
            const competitorCard = document.createElement('div');
                        competitorCard.className = 'competitor-card';
            competitorCard.innerHTML = `
                <div class="competitor-header">
                    <div class="competitor-logo" style="background: ${studio.logo.background};">
                        ${studio.name.substring(0, 2).toUpperCase()}
                    </div>
                    <div class="competitor-info">
                        <h4>${studio.name}</h4>
                        <p>Reputation: ${Math.round(studio.reputation)}</p>
                    </div>
                </div>
                <div class="competitor-stats">
                    <div class="competitor-stat">
                        <span class="stat-value">${studio.marketShare}%</span>
                        <span class="stat-label">Market Share</span>
                    </div>
                    <div class="competitor-stat">
                        <span class="stat-value">${studio.activeProjects}</span>
                        <span class="stat-label">Active Projects</span>
                    </div>
                    <div class="competitor-stat">
                        <span class="stat-value">${this.formatCurrency(studio.earnings)}</span>
                        <span class="stat-label">Last Film Earnings</span>
                    </div>
                    <div class="competitor-stat">
                        <span class="stat-value">${studio.lastRelease}</span>
                        <span class="stat-label">Last Release</span>
                    </div>
                </div>
            `;
            competitorsGrid.appendChild(competitorCard);
        });
    }

    // Update Release Schedule Display
    updateReleaseScheduleDisplay() {
        const releaseTimeline = document.getElementById('release-timeline');
        if (!releaseTimeline) return;
        
        // Sort by date
        const sortedReleases = this.gameData.releaseSchedule.sort((a, b) => {
            if (a.date.year !== b.date.year) return a.date.year - b.date.year;
            if (a.date.month !== b.date.month) return a.date.month - b.date.month;
            return a.date.day - b.date.day;
        });
        
        releaseTimeline.innerHTML = '';
        
        // Show only next 20 releases
        sortedReleases.slice(0, 20).forEach(release => {
            const releaseItem = document.createElement('div');
            releaseItem.className = 'release-item';
            releaseItem.innerHTML = `
                <div class="release-date">
                    <strong>${release.date.day}</strong>
                    <small>${this.getMonthName(release.date.month)}</small>
                </div>
                <div class="release-info">
                    <h5>${release.title}</h5>
                    <p>${release.studio} • ${this.genres[release.genre]?.name || release.genre} • Budget: ${this.formatCurrency(release.estimatedBudget)}</p>
                </div>
                <div class="competition-level competition-${release.competition}">
                    ${release.competition}
                </div>
            `;
            releaseTimeline.appendChild(releaseItem);
        });

        if (sortedReleases.length === 0) {
            releaseTimeline.innerHTML = '<p style="text-align: center; color: var(--text-muted); font-style: italic;">No upcoming releases scheduled.</p>';
        }
    }

    // Filter Release Schedule
    filterReleaseSchedule(monthFilter) {
        const releaseTimeline = document.getElementById('release-timeline');
        if (!releaseTimeline) return;
        
        let filteredReleases = this.gameData.releaseSchedule;
        
        if (monthFilter) {
            filteredReleases = this.gameData.releaseSchedule.filter(release => 
                release.date.month === parseInt(monthFilter)
            );
        }
        
        // Sort by date
        const sortedReleases = filteredReleases.sort((a, b) => {
            if (a.date.year !== b.date.year) return a.date.year - b.date.year;
            if (a.date.month !== b.date.month) return a.date.month - b.date.month;
            return a.date.day - b.date.day;
        });
        
        releaseTimeline.innerHTML = '';
        
        if (sortedReleases.length === 0) {
            releaseTimeline.innerHTML = '<p style="text-align: center; color: var(--text-muted);">No releases found for selected month.</p>';
            return;
        }
        
        sortedReleases.forEach(release => {
            const releaseItem = document.createElement('div');
            releaseItem.className = 'release-item';
            releaseItem.innerHTML = `
                <div class="release-date">
                    <strong>${release.date.day}</strong>
                    <small>${this.getMonthName(release.date.month)}</small>
                </div>
                <div class="release-info">
                    <h5>${release.title}</h5>
                    <p>${release.studio} • ${this.genres[release.genre]?.name || release.genre}</p>
                </div>
                <div class="competition-level competition-${release.competition}">
                    ${release.competition}
                </div>
            `;
            releaseTimeline.appendChild(releaseItem);
        });
    }

    // Helper: Get Month Name
    getMonthName(monthNumber) {
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 
                       'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        return months[monthNumber - 1] || 'Unknown';
    }

    // Update Market Display
    updateMarketDisplay() {
        this.updateCompetitorDisplay();
        this.updateReleaseScheduleDisplay();
        this.updateMarketShareDisplay();
    }

    // FIXED: Update Theatre Chain Display with Real Logos
    updateTheatreChains() {
        const chainsGrid = document.getElementById('chains-grid');
        if (!chainsGrid) return;
        
        const theatreChains = [
            {
                name: 'PVR Cinemas',
                screens: 1200,
                share: 32,
                logoClass: 'pvr-logo'
            },
            {
                name: 'INOX Leisure',
                screens: 800,
                share: 28,
                logoClass: 'inox-logo'
            },
            {
                name: 'Cinepolis India',
                screens: 500,
                share: 18,
                logoClass: 'cinepolis-logo'
            },
            {
                name: 'Independent Theatres',
                screens: 2000,
                share: 22,
                logoClass: 'independent-logo'
            }
        ];
        
        chainsGrid.innerHTML = '';
        
        theatreChains.forEach(chain => {
            const chainCard = document.createElement('div');
            chainCard.className = 'chain-card';
            chainCard.innerHTML = `
                <div class="chain-logo ${chain.logoClass}">
                    ${chain.name.split(' ')[0].toUpperCase()}
                </div>
                <h4>${chain.name}</h4>
                <p>Screens: ${chain.screens}+</p>
                <p>Share: ${chain.share}%</p>
            `;
            chainsGrid.appendChild(chainCard);
        });
    }

    // Update Box Office Display
    updateBoxOfficeDisplay() {
        this.updateTheatreChains();
        
        const totalCollection = this.gameData.completedProjects.reduce((sum, project) => 
            sum + (project.boxOfficeCollection || 0), 0);
        
        document.getElementById('total-collection').textContent = Math.round(totalCollection / 10000000);
        
        const collectionStatus = document.getElementById('collection-status');
        if (collectionStatus) {
            if (totalCollection === 0) {
                collectionStatus.innerHTML = '<span class="status-text">Awaiting Release</span>';
            } else {
                collectionStatus.innerHTML = '<span class="status-text">Box Office Active</span>';
            }
        }
    }

    // Update Finances Display
    updateFinancesDisplay() {
        const currentBalance = document.getElementById('current-balance');
        const monthlyIncome = document.getElementById('monthly-income');
        const monthlyExpenses = document.getElementById('monthly-expenses');
        const netMonthlyProfit = document.getElementById('net-monthly-profit');
        
        if (currentBalance) {
            currentBalance.textContent = this.formatCurrency(this.gameData.player.money);
        }
        
        // Calculate monthly expenses (staff salaries + office costs)
        const adminStaff = this.gameData.staff.admin;
        const techStaff = this.gameData.staff.tech;
        
        const totalMonthlySalaries = 
            (adminStaff.productionManager * 80000) +
            (adminStaff.accountant * 60000) +
            (adminStaff.prManager * 70000) +
            (techStaff.cameraOperator * 50000) +
            (techStaff.soundEngineer * 45000) +
            (techStaff.videoEditor * 55000) +
            250000; // Office rent and utilities
        
        const monthlyIncomeAmount = this.calculateMonthlyIncome();
        const netProfit = monthlyIncomeAmount - totalMonthlySalaries;
        
        if (monthlyIncome) monthlyIncome.textContent = this.formatCurrency(monthlyIncomeAmount);
        if (monthlyExpenses) monthlyExpenses.textContent = this.formatCurrency(totalMonthlySalaries);
        if (netMonthlyProfit) {
            netMonthlyProfit.textContent = this.formatCurrency(netProfit);
            netMonthlyProfit.style.color = netProfit >= 0 ? 'var(--success)' : 'var(--error)';
        }
    }

    calculateMonthlyIncome() {
        // Calculate income from active movie releases
        let monthlyIncome = 0;
        
        // Add income from completed projects (simplified calculation)
        this.gameData.completedProjects.forEach(project => {
            if (project.status === 'released' && project.boxOfficeCollection) {
                monthlyIncome += project.boxOfficeCollection * 0.1; // 10% monthly residual
            }
        });
        
        return monthlyIncome;
    }

    // Apply Loan
    applyLoan(amount, rate, termMonths) {
        if (this.gameData.player.money < 0) {
            this.showNotification('Cannot apply for loan with negative balance!', 'error');
            return;
        }
        
        // Simple loan approval logic
        const approvalChance = this.gameData.player.reputation > 50 ? 80 : 
                              this.gameData.player.reputation > 30 ? 60 : 40;
        
        if (Math.random() * 100 > approvalChance) {
            this.showNotification('Loan application rejected. Build more reputation!', 'error');
            return;
        }
        
        // Add money to player
        this.gameData.player.money += amount;
        
        // Create loan record (simplified - in real game, you'd track EMIs)
        const monthlyEMI = this.calculateEMI(amount, rate, termMonths);
        
        this.showNotification(`Loan approved! Amount: ${this.formatCurrency(amount)}, Monthly EMI: ${this.formatCurrency(monthlyEMI)}`, 'success');
        this.updateFinancesDisplay();
        this.updateUI();
        this.saveGame();
    }

    calculateEMI(principal, rate, termMonths) {
        const monthlyRate = rate / (12 * 100);
        const emi = principal * monthlyRate * Math.pow(1 + monthlyRate, termMonths) / 
                   (Math.pow(1 + monthlyRate, termMonths) - 1);
        return Math.round(emi);
    }

    // Enhanced Promo Code System
    applyPromoCode() {
        const promoInput = document.getElementById('promo-code-input');
        if (!promoInput) return;
        
        const code = promoInput.value.toUpperCase().trim();
        promoInput.value = '';
        
        switch (code) {
            case 'SANDBOX':
                this.gameData.player.money *= 2;
                this.showNotification('💰 SANDBOX activated! Money doubled!', 'success');
                break;
                
            case 'RICHMODE':
                this.gameData.player.money += 1000000000; // +100 Crores
                this.showNotification('💎 RICHMODE activated! +₹100 Crores added!', 'success');
                break;
                
            case 'GODMODE':
                this.gameData.player.money += 5000000000; // +500 Crores
                this.gameData.player.reputation = 100;
                this.gameData.player.studioLevel = 10;
                this.showNotification('👑 GODMODE activated! Ultimate power unlocked!', 'success');
                break;
                
            case 'SUPERSTAR':
                this.gameData.player.reputation = 100;
                this.showNotification('⭐ SUPERSTAR activated! Maximum reputation!', 'success');
                break;
                
            case 'FREELOAN':
                this.gameData.player.money += 500000000; // +50 Crores
                this.showNotification('🏦 FREELOAN activated! +₹50 Crores loan!', 'success');
                break;
                
            case 'TIMETRAVEL':
                // Skip all active project development
                this.gameData.projects.forEach(project => {
                    if (project.status === 'script_development') {
                        project.status = 'script_ready';
                        project.weeksRemaining = 0;
                        project.progress = 100;
                    }
                });
                this.showNotification('⏰ TIMETRAVEL activated! All scripts completed!', 'success');
                break;
                
            case 'ALLSTAR':
                // Make all celebrity hiring free for next 10 hires
                this.gameData.freeHires = 10;
                this.showNotification('🌟 ALLSTAR activated! Next 10 celebrity hires are free!', 'success');
                break;
                
            case 'MEGAHIT':
                // Guarantee next movie will be a mega hit
                this.gameData.guaranteedHit = true;
                this.showNotification('🎬 MEGAHIT activated! Next movie guaranteed blockbuster!', 'success');
                break;
                
            case 'FASTTRACK':
                // Complete all production instantly
                this.gameData.projects.forEach(project => {
                    if (project.status === 'production' || project.status === 'post_production') {
                        project.status = 'marketing_ready';
                        project.productionProgress = 100;
                        project.postProductionProgress = 100;
                    }
                });
                this.showNotification('⚡ FASTTRACK activated! All productions completed!', 'success');
                break;
                
            default:
                this.showNotification('Invalid promo code. Try again!', 'error');
                return;
        }
        
        this.updateUI();
        this.saveGame();
    }

    // Random Events System
    triggerRandomEvent() {
        const events = [
            {
                title: '🎪 Film Festival Invitation',
                message: 'Your studio has been invited to participate in a prestigious film festival!',
                effect: () => {
                    this.gameData.player.reputation += 5;
                    this.gameData.player.money += 5000000;
                }
            },
            {
                title: '📺 TV Rights Deal',
                message: 'A TV channel wants to buy rights to your previous films!',
                effect: () => {
                    this.gameData.player.money += 20000000;
                }
            },
            {
                title: '⭐ Celebrity Endorsement',
                message: 'A top celebrity mentioned your studio in an interview!',
                effect: () => {
                    this.gameData.player.reputation += 3;
                }
            },
            {
                title: '💰 Tax Benefits',
                message: 'Government announced tax benefits for film producers!',
                effect: () => {
                    this.gameData.player.money += 10000000;
                }
            },
            {
                title: '🌟 Award Recognition',
                message: 'Your studio received recognition at an industry awards ceremony!',
                effect: () => {
                    this.gameData.player.reputation += 8;
                    this.gameData.player.money += 15000000;
                }
            }
        ];
        
        const randomEvent = events[Math.floor(Math.random() * events.length)];
        randomEvent.effect();
        this.showNotification(`${randomEvent.title}: ${randomEvent.message}`, 'success');
    }

    // Logo Designer Functions
    openLogoDesigner() {
        document.getElementById('logo-designer-modal').style.display = 'flex';
        this.initLogoCanvas();
    }

    closeLogoDesigner() {
        document.getElementById('logo-designer-modal').style.display = 'none';
    }

    initLogoCanvas() {
        const canvas = document.getElementById('logo-canvas');
        if (!canvas) return;
        
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = '#1a1a1a';
        ctx.fillRect(0, 0, 300, 300);
        
        // Initial preview
        this.previewLogo();
    }

    previewLogo() {
        const canvas = document.getElementById('logo-canvas');
        if (!canvas) return;
        
        const ctx = canvas.getContext('2d');
        const text = document.getElementById('logo-text-input')?.value || 'STUDIO';
        const primaryColor = document.getElementById('logo-primary-color')?.value || '#ffd700';
        const bgColor = document.getElementById('logo-bg-color')?.value || '#1a1a1a';
        const fontStyle = document.getElementById('logo-font-style')?.value || 'Arial';
        const logoIcon = document.getElementById('logo-icon-select')?.value || 'film';
        
        // Clear canvas
        ctx.fillStyle = bgColor;
        ctx.fillRect(0, 0, 300, 300);
        
        // Draw border
        ctx.strokeStyle = primaryColor;
        ctx.lineWidth = 4;
        ctx.strokeRect(10, 10, 280, 280);
        
        // Draw text
        ctx.fillStyle = primaryColor;
        ctx.font = `bold 24px ${fontStyle}`;
        ctx.textAlign = 'center';
        ctx.fillText(text, 150, 200);
        
        // Draw icon representation (simplified)
        ctx.font = '48px Arial';
        const iconMap = {
            'film': '🎬',
            'star': '⭐',
            'crown': '👑',
            'diamond': '💎',
            'fire': '🔥'
        };
        ctx.fillText(iconMap[logoIcon] || '🎬', 150, 120);
    }

    saveCustomLogo() {
        const canvas = document.getElementById('logo-canvas');
        if (!canvas) return;
        
        // Convert canvas to data URL
        const logoDataUrl = canvas.toDataURL();
        
        // Save custom logo to game data
        this.gameData.player.studioLogo = {
            id: 'custom',
            type: 'custom',
            dataUrl: logoDataUrl,
            style: {
                name: 'Custom Logo',
                className: 'custom-logo'
            }
        };
        
        this.updateHeaderStudioDisplay();
        this.updateStudioDisplay();
        this.closeLogoDesigner();
        this.showNotification('Custom logo saved successfully!', 'success');
        this.saveGame();
    }

    // Initialize Data Methods
    initializeCelebrities() {
        return {
            actors: [
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
                  photo: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=150&h=150&fit=crop&crop=face' },

                { id: 11, name: 'Deepika Padukone', popularity: 92, acting: 90, bankability: 87, fee: 200000000,
                  genre: ['Romance', 'Drama', 'Historical'], age: 38, phase: 'Prime',
                  photo: 'https://images.unsplash.com/photo-1494790108755-2616b612b27c?w=150&h=150&fit=crop&crop=face' },
                
                { id: 12, name: 'Priyanka Chopra', popularity: 88, acting: 85, bankability: 82, fee: 180000000,
                  genre: ['Drama', 'Action', 'International'], age: 41, phase: 'Prime',
                  photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face' },
                
                { id: 13, name: 'Alia Bhatt', popularity: 90, acting: 93, bankability: 88, fee: 150000000,
                  genre: ['Drama', 'Romance', 'Thriller'], age: 31, phase: 'Rising Star',
                  photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face' },
                
                { id: 14, name: 'Katrina Kaif', popularity: 80, acting: 72, bankability: 78, fee: 120000000,
                  genre: ['Action', 'Romance', 'Comedy'], age: 40, phase: 'Established',
                  photo: 'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=150&h=150&fit=crop&crop=face' },
                
                { id: 15, name: 'Kareena Kapoor', popularity: 82, acting: 84, bankability: 79, fee: 100000000,
                  genre: ['Romance', 'Drama', 'Comedy'], age: 43, phase: 'Veteran',
                  photo: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face' },

                // Generate more actors programmatically
                ...this.generateMoreActors(16, 50)
            ],
            directors: [
                { id: 1, name: 'Rajkumar Hirani', skill: 98, specialty: 'Comedy-Drama', fee: 100000000, successRate: 95,
                  photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face' },
                
                { id: 2, name: 'Sanjay Leela Bhansali', skill: 96, specialty: 'Historical Drama', fee: 90000000, successRate: 88,
                  photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face' },
                
                { id: 3, name: 'Zoya Akhtar', skill: 92, specialty: 'Contemporary Drama', fee: 60000000, successRate: 85,
                  photo: 'https://images.unsplash.com/photo-1494790108755-2616b612b27c?w=150&h=150&fit=crop&crop=face' },
                
                ...this.generateMoreDirectors(4, 30)
            ],
            music: [
                { id: 1, name: 'A.R. Rahman', skill: 99, fee: 50000000, specialty: 'All Genres', awards: 'Oscar Winner',
                  photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face' },
                
                { id: 2, name: 'Shankar-Ehsaan-Loy', skill: 90, fee: 25000000, specialty: 'Contemporary', awards: 'Filmfare Winners',
                  photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face' },
                
                ...this.generateMoreMusicDirectors(3, 25)
            ],
            singers: [
                { id: 1, name: 'Arijit Singh', popularity: 98, fee: 5000000, voice: 'Male', specialty: 'Romantic Melodies',
                  photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face' },
                
                { id: 2, name: 'Shreya Ghoshal', popularity: 96, fee: 4500000, voice: 'Female', specialty: 'Classical Traditional',
                  photo: 'https://images.unsplash.com/photo-1494790108755-2616b612b27c?w=150&h=150&fit=crop&crop=face' },
                
                ...this.generateMoreSingers(3, 40)
            ]
        };
    }

    generateMoreActors(startId, endId) {
        const actors = [];
        const maleNames = ['Varun Dhawan', 'Tiger Shroff', 'Kartik Aaryan', 'Vicky Kaushal', 'Sidharth Malhotra', 'Ayushmann Khurrana', 'Rajkummar Rao', 'Arjun Kapoor'];
        const femaleNames = ['Kriti Sanon', 'Kiara Advani', 'Shraddha Kapoor', 'Janhvi Kapoor', 'Ananya Panday', 'Sara Ali Khan', 'Tara Sutaria', 'Bhumi Pednekar'];
        
        for (let i = startId; i <= endId; i++) {
            const isMale = i % 2 === 0;
            const names = isMale ? maleNames : femaleNames;
            const nameIndex = Math.floor((i - startId) / 2) % names.length;
            const photoIndex = (i % 20) + 1;
            
            actors.push({
                id: i,
                name: names[nameIndex] || `${isMale ? 'Actor' : 'Actress'} ${i}`,
                popularity: Math.floor(Math.random() * 40) + 50,
                acting: Math.floor(Math.random() * 30) + 60,
                bankability: Math.floor(Math.random() * 35) + 55,
                fee: Math.floor(Math.random() * 180000000) + 20000000,
                genre: ['Drama', 'Romance', 'Comedy', 'Action'][Math.floor(Math.random() * 4)],
                age: Math.floor(Math.random() * 20) + 25,
                phase: ['Rising', 'Established', 'Prime'][Math.floor(Math.random() * 3)],
                photo: `https://images.unsplash.com/photo-${isMale ? '1507003211169-0a1dd7228f2d' : '1494790108755-2616b612b27c'}?w=150&h=150&fit=crop&crop=face&v=${photoIndex}`
            });
        }
        return actors;
    }

    generateMoreDirectors(startId, endId) {
        const directors = [];
        const names = ['Rohit Shetty', 'Karan Johar', 'Aanand L. Rai', 'Kabir Khan', 'Nitesh Tiwari', 'Imtiaz Ali', 'Shoojit Sircar'];
        
        for (let i = startId; i <= endId; i++) {
            const photoIndex = (i % 10) + 1;
            directors.push({
                id: i,
                name: names[(i - startId) % names.length] || `Director ${i}`,
                skill: Math.floor(Math.random() * 25) + 65,
                specialty: ['Drama', 'Comedy', 'Action', 'Thriller'][Math.floor(Math.random() * 4)],
                fee: Math.floor(Math.random() * 30000000) + 10000000,
                successRate: Math.floor(Math.random() * 30) + 60,
                photo: `https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face&v=${photoIndex}`
            });
        }
        return directors;
    }

    generateMoreMusicDirectors(startId, endId) {
        const musicDirectors = [];
        const names = ['Amit Trivedi', 'Vishal-Shekhar', 'Sachin-Jigar', 'Ilaiyaraaja', 'Anirudh Ravichander'];
        
        for (let i = startId; i <= endId; i++) {
            const photoIndex = (i % 10) + 1;
            musicDirectors.push({
                id: i,
                name: names[(i - startId) % names.length] || `Music Director ${i}`,
                skill: Math.floor(Math.random() * 20) + 70,
                fee: Math.floor(Math.random() * 15000000) + 5000000,
                specialty: ['Pop', 'Classical', 'Electronic', 'Folk'][Math.floor(Math.random() * 4)],
                awards: 'Chart Topper',
                photo: `https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face&v=${photoIndex}`
            });
        }
        return musicDirectors;
    }

    generateMoreSingers(startId, endId) {
        const singers = [];
        const names = ['Armaan Malik', 'Neha Kakkar', 'Jubin Nautiyal', 'Dhvani Bhanushali', 'Rahat Fateh Ali Khan'];
        
        for (let i = startId; i <= endId; i++) {
            const isFemale = i % 2 === 0;
            const photoIndex = (i % 10) + 1;
            singers.push({
                id: i,
                name: names[(i - startId) % names.length] || `Singer ${i}`,
                popularity: Math.floor(Math.random() * 25) + 65,
                fee: Math.floor(Math.random() * 3000000) + 1000000,
                voice: isFemale ? 'Female' : 'Male',
                specialty: ['Pop', 'Romantic', 'Dance', 'Folk'][Math.floor(Math.random() * 4)],
                photo: `https://images.unsplash.com/photo-${isFemale ? '1494790108755-2616b612b27c' : '1500648767791-00dcc994a43e'}?w=150&h=150&fit=crop&crop=face&v=${photoIndex}`
            });
        }
        return singers;
    }

    // Initialize other data
    initializeGenres() {
        return {
            action: { name: 'Action', marketAppeal: 92, budget: 'high', icon: 'fa-fist-raised', color: '#dc2626' },
            romance: { name: 'Romance', marketAppeal: 85, budget: 'medium', icon: 'fa-heart', color: '#ec4899' },
            comedy: { name: 'Comedy', marketAppeal: 88, budget: 'low', icon: 'fa-laugh', color: '#fbbf24' },
            drama: { name: 'Drama', marketAppeal: 82, budget: 'medium', icon: 'fa-theater-masks', color: '#3b82f6' },
            thriller: { name: 'Thriller', marketAppeal: 84, budget: 'medium', icon: 'fa-eye', color: '#8b5cf6' },
            horror: { name: 'Horror', marketAppeal: 72, budget: 'low', icon: 'fa-ghost', color: '#374151' },
            historical: { name: 'Historical', marketAppeal: 78, budget: 'very_high', icon: 'fa-crown', color: '#f59e0b' },
            biopic: { name: 'Biopic', marketAppeal: 80, budget: 'high', icon: 'fa-user', color: '#10b981' }
        };
    }

    initializeFranchises() {
        return {
            housefull: {
                name: 'Housefull',
                rating: 85,
                parts: ['Housefull', 'Housefull 2', 'Housefull 3', 'Housefull 4', 'Housefull 5'],
                regularCast: [
                    { id: 4, name: 'Akshay Kumar', roles: ['Lead Actor'] }
                ],
                successBonus: 20
            },
            dabangg: {
                name: 'Dabangg',
                rating: 80,
                parts: ['Dabangg', 'Dabangg 2', 'Dabangg 3'],
                regularCast: [
                    { id: 3, name: 'Salman Khan', roles: ['Lead Actor'] }
                ],
                successBonus: 18
            },
            dhoom: {
                name: 'Dhoom',
                rating: 88,
                parts: ['Dhoom', 'Dhoom 2', 'Dhoom 3'],
                regularCast: [
                    { id: 1, name: 'Abhishek Bachchan', roles: ['Lead Actor'] },
                    { id: 2, name: 'Uday Chopra', roles: ['Supporting Actor'] }
                ],
                successBonus: 25
            }
        };
    }

    // Utility Functions
    updateDateDisplay() {
        const currentDateEl = document.getElementById('current-date');
        if (currentDateEl) {
            const { year, month, week } = this.gameData.player.currentDate;
            currentDateEl.textContent = `Week ${week}, Month ${month}, Year ${year}`;
        }
    }

    updateUI() {
        const moneyEl = document.getElementById('money');
        const reputationEl = document.getElementById('reputation');
        const studioLevelEl = document.getElementById('studio-level');
        
        if (moneyEl) moneyEl.textContent = this.formatCurrency(this.gameData.player.money);
        if (reputationEl) reputationEl.textContent = this.gameData.player.reputation;
        if (studioLevelEl) studioLevelEl.textContent = `Level ${this.gameData.player.studioLevel}`;
        
        this.updateHeaderStudioDisplay();
        this.updateMovieSelector();
    }

    formatCurrency(amount) {
        if (amount >= 10000000) {
            return `₹${(amount / 10000000).toFixed(1)} Cr`;
        } else if (amount >= 100000) {
            return `₹${(amount / 100000).toFixed(1)} L`;
        } else {
            return `₹${amount.toLocaleString('en-IN')}`;
        }
    }

    showNotification(message, type = 'info', duration = 4000) {
        const modal = document.getElementById('notification-modal');
        if (!modal) return;

        const iconContainer = modal.querySelector('.notification-icon-container');
        const icon = modal.querySelector('.notification-icon');
        const title = modal.querySelector('.notification-title');
        const messageEl = modal.querySelector('.notification-message');
        const confirmBtn = modal.querySelector('.notification-confirm');

        // Set icon based on type
        const iconMap = {
            success: { icon: 'fas fa-check-circle', color: 'var(--success)' },
            error: { icon: 'fas fa-exclamation-triangle', color: 'var(--error)' },
            warning: { icon: 'fas fa-exclamation-circle', color: 'var(--warning)' },
            info: { icon: 'fas fa-info-circle', color: 'var(--info)' }
        };

        const iconData = iconMap[type] || iconMap.info;
        icon.className = `notification-icon ${iconData.icon}`;
        icon.style.color = iconData.color;
        
        title.textContent = type.charAt(0).toUpperCase() + type.slice(1);
        messageEl.textContent = message;

        modal.style.display = 'flex';

        // Auto close
        setTimeout(() => {
            modal.style.display = 'none';
        }, duration);

        // Manual close
        confirmBtn.onclick = () => {
            modal.style.display = 'none';
        };
    }

    saveGame() {
        try {
            localStorage.setItem('bollywoodSimulatorSave', JSON.stringify(this.gameData));
        } catch (error) {
            console.error('Failed to save game:', error);
        }
    }

    startAutoSave() {
        setInterval(() => {
            if (this.gameData.gameStarted) {
                this.saveGame();
            }
        }, 60000);
    }
}

// Initialize the game when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('🎬 Starting Enhanced Bollywood Simulator...');
    window.bollywoodSimulator = new BollywoodSimulator();
    
    // Make nextStep function globally available
    window.nextStep = function(stepNumber) {
        window.bollywoodSimulator.nextStep(stepNumber);
    };
    
    console.log('🎮 All features loaded successfully!');
    console.log('✨ New Features: Production logos, negotiation system, market competition, release schedule, staff management');
});

// Export for potential module use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = BollywoodSimulator;
}
