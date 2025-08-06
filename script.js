// Bollywood Simulator - COMPLETE FIXED VERSION
// All issues resolved: Script selection, Franchise input, Movie dropdown, Budget options

class BollywoodSimulator {
    constructor() {
        this.gameData = {
            player: {
                name: '',
                studioName: '',
                avatar: '',
                studioLogo: '',
                money: 50000000,
                reputation: 10,
                studioLevel: 1,
                maxProjects: 3,
                totalIncome: 0,
                totalExpenses: 0,
                loans: [],
                achievements: [],
                currentDate: { year: 2025, month: 1, week: 1 }
            },
            projects: [],
            completedProjects: [],
            hiredCast: [],
            userFranchises: [], // Store user-created franchises
            staff: {
                admin: { productionManager: 0, accountant: 0, prManager: 0 },
                tech: { cameraOperator: 0, soundEngineer: 0, videoEditor: 0 }
            },
            gameStarted: false,
            sandboxMode: false,
            selectedMovie: null,
            selectedRoleType: 'lead',
            selectedRoleNumber: 1
        };
        
        this.celebrities = this.initializeCelebrities();
        this.genres = this.initializeGenres();
        this.marketingStrategies = this.initializeMarketing();
        this.randomEvents = this.initializeEvents();
        this.theatreChains = this.initializeTheatres();
        this.predefinedFranchises = this.initializeFranchises();
        
        this.deferredPrompt = null;
        this.init();
    }

    init() {
        this.showLoadingScreen();
        this.setupEventListeners();
        this.setupPWA();
        this.generateAvatarOptions();
        this.generateLogoOptions();
        this.generateGenreOptions();
        this.updateDateDisplay();
        this.startAutoSave();
        
        setTimeout(() => {
            document.getElementById('loading-screen').style.opacity = '0';
            setTimeout(() => {
                document.getElementById('loading-screen').style.display = 'none';
                document.getElementById('game-container').style.display = 'block';
                this.showGameStartModal();
            }, 500);
        }, 3000);
    }

    // FIXED: Setup Event Listeners with all new functionality
    setupEventListeners() {
        // Game Start Events
        document.getElementById('new-game-btn')?.addEventListener('click', () => this.startNewGame());
        document.getElementById('load-game-btn')?.addEventListener('click', () => this.loadGame());
        
        // PWA Install Events
        document.getElementById('install-app')?.addEventListener('click', () => this.installPWA());
        document.getElementById('dismiss-install')?.addEventListener('click', () => this.hideInstallPrompt());
        
        // Time Controls
        document.getElementById('advance-week')?.addEventListener('click', () => this.advanceWeek());
        document.getElementById('advance-month')?.addEventListener('click', () => this.advanceMonth());
        
        // Money Management Click
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

        // FIXED: Script Creation Events
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

        // Title suggestions
        document.querySelectorAll('.title-suggestion').forEach(btn => {
            btn.addEventListener('click', (e) => {
                document.getElementById('movie-title').value = e.target.textContent;
            });
        });

        // Promo Code System
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

        window.addEventListener('appinstalled', () => {
            console.log('PWA installed');
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

    async installPWA() {
        if (this.deferredPrompt) {
            this.deferredPrompt.prompt();
            const { outcome } = await this.deferredPrompt.userChoice;
            if (outcome === 'accepted') {
                this.hideInstallPrompt();
            }
            this.deferredPrompt = null;
        }
    }

    // FIXED: Franchise Input Handling
    toggleFranchiseOptions(isChecked) {
        const franchiseOptions = document.getElementById('franchise-options');
        if (franchiseOptions) {
            franchiseOptions.style.display = isChecked ? 'block' : 'none';
        }
    }

    handleFranchiseInput(value) {
        const dropdown = document.getElementById('franchise-dropdown');
        if (!dropdown) return;

        if (value.length === 0) {
            this.hideFranchiseDropdown();
            return;
        }

        const allFranchises = [...Object.keys(this.predefinedFranchises), ...this.gameData.userFranchises.map(f => f.name)];
        const matches = allFranchises.filter(name => name.toLowerCase().includes(value.toLowerCase()));
        
        dropdown.innerHTML = '';
        
        // Show matching franchises
        matches.forEach(franchiseName => {
            const item = document.createElement('div');
            item.className = 'franchise-dropdown-item';
            item.textContent = franchiseName;
            item.addEventListener('click', () => this.selectFranchise(franchiseName));
            dropdown.appendChild(item);
        });
        
        // Always show "Create New" option
        if (!matches.includes(value)) {
            const createNew = document.createElement('div');
            createNew.className = 'franchise-dropdown-item create-new';
            createNew.textContent = `Create "${value}" as new franchise`;
            createNew.addEventListener('click', () => this.createNewFranchise(value));
            dropdown.appendChild(createNew);
        }
        
        this.showFranchiseDropdown();
    }

    showFranchiseDropdown() {
        const dropdown = document.getElementById('franchise-dropdown');
        if (dropdown) dropdown.style.display = 'block';
    }

    hideFranchiseDropdown() {
        const dropdown = document.getElementById('franchise-dropdown');
        if (dropdown) dropdown.style.display = 'none';
    }

    selectFranchise(franchiseName) {
        document.getElementById('franchise-name-input').value = franchiseName;
        this.hideFranchiseDropdown();
        this.showFranchiseInfo(franchiseName);
    }

    createNewFranchise(franchiseName) {
        const newFranchise = {
            name: franchiseName,
            rating: 75,
            parts: [franchiseName],
            regularCast: [],
            successBonus: 10,
            createdBy: 'user'
        };
        
        this.gameData.userFranchises.push(newFranchise);
        document.getElementById('franchise-name-input').value = franchiseName;
        this.hideFranchiseDropdown();
        
        this.showNotification(`New franchise "${franchiseName}" created!`, 'success');
    }

    showFranchiseInfo(franchiseName) {
        const franchiseInfo = document.getElementById('franchise-info');
        const franchiseCastDisplay = document.getElementById('franchise-cast-display');
        
        let franchise = this.predefinedFranchises[franchiseName.toLowerCase()];
        if (!franchise) {
            franchise = this.gameData.userFranchises.find(f => f.name === franchiseName);
        }
        
        if (!franchise) {
            if (franchiseInfo) franchiseInfo.style.display = 'none';
            return;
        }
        
        if (franchiseInfo) franchiseInfo.style.display = 'block';
        if (franchiseCastDisplay) {
            franchiseCastDisplay.innerHTML = '';
            
            franchise.regularCast.forEach(castMember => {
                const actor = this.celebrities.actors.find(a => a.id === castMember.id);
                if (actor) {
                    const actorDiv = document.createElement('div');
                    actorDiv.className = 'franchise-actor';
                    actorDiv.innerHTML = `
                        <img src="${actor.photo}" alt="${actor.name}" onerror="this.style.display='none'">
                        <h6>${actor.name}</h6>
                        <small>${castMember.roles.join(', ')}</small>
                    `;
                    franchiseCastDisplay.appendChild(actorDiv);
                }
            });
        }
    }

    // FIXED: Timeline Selection
    selectTimeline(selectedCard) {
        document.querySelectorAll('.timeline-card').forEach(card => {
            card.classList.remove('selected');
            const radio = card.querySelector('input[type="radio"]');
            if (radio) radio.checked = false;
        });
        
        selectedCard.classList.add('selected');
        const radio = selectedCard.querySelector('input[type="radio"]');
        if (radio) radio.checked = true;
    }

    // FIXED: Create Script with all options working
    createScript() {
        if (!this.gameData.gameStarted) {
            this.showNotification('Please create your character first!', 'error');
            return;
        }

        const movieTitle = document.getElementById('movie-title')?.value.trim();
        const selectedGenre = document.querySelector('.genre-card.selected');
        const leadRolesCount = parseInt(document.getElementById('lead-roles-count')?.value || 1);
        const supportingRolesCount = parseInt(document.getElementById('supporting-roles-count')?.value || 1);
        const formatType = document.querySelector('input[name="format"]:checked')?.value;
        
        // FIXED: Get selected timeline properly
        const selectedTimeline = document.querySelector('.timeline-card.selected');
        const scriptTimeline = selectedTimeline ? selectedTimeline.dataset.timeline : 'standard';
        
        const isFranchise = document.getElementById('is-franchise')?.checked;
        const franchiseName = document.getElementById('franchise-name-input')?.value.trim();

        if (!movieTitle) {
            this.showNotification('Please enter a movie title!', 'error');
            return;
        }

        if (!selectedGenre) {
            this.showNotification('Please select a genre!', 'error');
            return;
        }

        const genre = selectedGenre.dataset.genre;
        let scriptCost = 1500000;
        let timeWeeks = 4;
        let quality = 70;

        // FIXED: Apply timeline settings properly
        switch (scriptTimeline) {
            case 'rush':
                scriptCost = 1500000;
                timeWeeks = 2;
                quality = 50 + (Math.random() * 20);
                break;
            case 'standard':
                scriptCost = 3000000;
                timeWeeks = 4;
                quality = 70 + (Math.random() * 20);
                break;
            case 'premium':
                scriptCost = 5000000;
                timeWeeks = 6;
                quality = 85 + (Math.random() * 15);
                break;
        }

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

        // FIXED: Create project with proper franchise handling
        const newProject = {
            id: Date.now(),
            title: movieTitle,
            genre: genre,
            leadRolesCount: leadRolesCount,
            supportingRolesCount: supportingRolesCount,
            totalCharacters: leadRolesCount + supportingRolesCount,
            format: formatType,
            isFranchise: isFranchise,
            franchise: franchiseName || null,
            scriptTimeline: scriptTimeline,
            scriptQuality: Math.round(quality),
            developmentCost: totalCost,
            status: 'script_development',
            phase: 'script',
            progress: 0,
            weeksRemaining: timeWeeks,
            cast: {
                lead: Array(leadRolesCount).fill(null),
                supporting: Array(supportingRolesCount).fill(null),
                director: null,
                musicDirector: null,
                singers: []
            },
            totalBudget: totalCost,
            startDate: { ...this.gameData.player.currentDate }
        };

        this.gameData.projects.push(newProject);

        this.showNotification(`Script development started for "${movieTitle}"!`, 'success');
        this.showActiveScripts();
        this.updateMovieSelector();
        this.updateUI();
        this.saveGame();
    }

    // FIXED: Update Movie Selector to show ALL projects
    updateMovieSelector() {
        const movieSelector = document.getElementById('movie-selector');
        if (!movieSelector) return;

        movieSelector.innerHTML = '<option value="">-- Select a movie to cast --</option>';
        
        // FIXED: Show projects that are ready for casting
        this.gameData.projects.forEach(project => {
            const option = document.createElement('option');
            option.value = project.id;
            
            let statusText = project.status.replace('_', ' ');
            statusText = statusText.charAt(0).toUpperCase() + statusText.slice(1);
            
            option.textContent = `${project.title} (${this.genres[project.genre].name}) - ${statusText}`;
            
            if (project.status === 'script_development') {
                option.disabled = true;
                option.textContent += ' - Still in development';
            }
            
            movieSelector.appendChild(option);
        });

        // Show message if no movies available
        if (this.gameData.projects.length === 0) {
            const option = document.createElement('option');
            option.value = '';
            option.textContent = 'Create a script first';
            option.disabled = true;
            movieSelector.appendChild(option);
        }
    }

    // FIXED: Update Cast Assignment
    updateCastAssignment() {
        const movieId = document.getElementById('movie-selector')?.value;
        const roleType = document.getElementById('role-type-selector')?.value;
        const roleNumber = document.getElementById('role-number-selector')?.value;
        const assignmentStatus = document.getElementById('assignment-status');
        
        if (!movieId) {
            if (assignmentStatus) {
                assignmentStatus.innerHTML = '<p>Select a movie and role type to start casting</p>';
            }
            return;
        }

        const project = this.gameData.projects.find(p => p.id == movieId);
        if (!project) return;

        if (project.status === 'script_development') {
            if (assignmentStatus) {
                assignmentStatus.innerHTML = '<p style="color: #f59e0b;">⏳ Script still in development. Please wait for completion.</p>';
            }
            return;
        }

        this.gameData.selectedMovie = movieId;
        this.gameData.selectedRoleType = roleType;
        this.gameData.selectedRoleNumber = parseInt(roleNumber);

        // Update role number dropdown based on role type
        const roleNumberSelector = document.getElementById('role-number-selector');
        if (roleNumberSelector) {
            roleNumberSelector.innerHTML = '';
            
            let maxRoles = 1;
            if (roleType === 'lead') {
                maxRoles = project.leadRolesCount;
            } else if (roleType === 'supporting') {
                maxRoles = project.supportingRolesCount;
            }
            
            for (let i = 1; i <= maxRoles; i++) {
                const option = document.createElement('option');
                option.value = i;
                option.textContent = `Role ${i}`;
                roleNumberSelector.appendChild(option);
            }
        }

        // Update assignment status
        if (assignmentStatus) {
            assignmentStatus.innerHTML = `
                <p><strong>Ready to cast:</strong> ${project.title}</p>
                <p><strong>Role:</strong> ${roleType.charAt(0).toUpperCase() + roleType.slice(1)} Role ${roleNumber}</p>
                <p><strong>Status:</strong> Select an actor/actress from below</p>
            `;
        }

        this.updateFranchiseShowcase(project);
        this.updateCastingRequirements(project);
    }

    // Update Franchise Showcase
    updateFranchiseShowcase(project) {
        const franchiseShowcase = document.getElementById('franchise-showcase');
        const franchiseCastGrid = document.getElementById('franchise-cast-grid');
        
        if (!project.isFranchise || !project.franchise) {
            if (franchiseShowcase) franchiseShowcase.style.display = 'none';
            return;
        }
        
        let franchise = this.predefinedFranchises[project.franchise.toLowerCase()];
        if (!franchise) {
            franchise = this.gameData.userFranchises.find(f => f.name === project.franchise);
        }
        
        if (!franchise) {
            if (franchiseShowcase) franchiseShowcase.style.display = 'none';
            return;
        }
        
        if (franchiseShowcase) {
            franchiseShowcase.style.display = 'block';
            franchiseShowcase.querySelector('p').textContent = 
                `Actors who have appeared in the ${franchise.name} franchise before:`;
        }
        
        if (franchiseCastGrid && franchise.regularCast) {
            franchiseCastGrid.innerHTML = '';
            
            franchise.regularCast.forEach(castMember => {
                const actor = this.celebrities.actors.find(a => a.id === castMember.id);
                if (actor) {
                    const actorCard = document.createElement('div');
                    actorCard.className = 'franchise-actor';
                    actorCard.innerHTML = `
                        <img src="${actor.photo}" alt="${actor.name}" onerror="this.style.display='none'">
                        <h6>${actor.name}</h6>
                        <small>${castMember.roles.join(', ')}</small>
                        <div class="franchise-bonus">+${franchise.successBonus}% Success</div>
                    `;
                    franchiseCastGrid.appendChild(actorCard);
                }
            });
        }
    }

    // Update Casting Requirements
    updateCastingRequirements(project) {
        const requirementsEl = document.getElementById('casting-requirements');
        const requirementsGrid = document.getElementById('requirements-grid');
        
        if (!project || !requirementsEl || !requirementsGrid) return;
        
        requirementsEl.style.display = 'block';
        requirementsGrid.innerHTML = '';
        
        // Lead roles
        for (let i = 0; i < project.leadRolesCount; i++) {
            const isHired = project.cast.lead[i] !== null;
            const reqCard = document.createElement('div');
            reqCard.className = 'requirement-card';
            reqCard.innerHTML = `
                <h4>Lead Role ${i + 1}</h4>
                <p>Type: Main Character</p>
                <span class="status ${isHired ? 'hired' : 'pending'}">${isHired ? '✓ Hired' : '⏳ Pending'}</span>
            `;
            requirementsGrid.appendChild(reqCard);
        }
        
        // Supporting roles
        for (let i = 0; i < project.supportingRolesCount; i++) {
            const isHired = project.cast.supporting[i] !== null;
            const reqCard = document.createElement('div');
            reqCard.className = 'requirement-card';
            reqCard.innerHTML = `
                <h4>Supporting Role ${i + 1}</h4>
                <p>Type: Supporting Character</p>
                <span class="status ${isHired ? 'hired' : 'pending'}">${isHired ? '✓ Hired' : '⏳ Pending'}</span>
            `;
            requirementsGrid.appendChild(reqCard);
        }
        
        // Other roles
        const otherRoles = [
            { key: 'director', name: 'Director', type: 'director' },
            { key: 'musicDirector', name: 'Music Director', type: 'music' },
            { key: 'singers', name: 'Playback Singer', type: 'singer' }
        ];
        
        otherRoles.forEach(role => {
            const isHired = role.key === 'singers' ? 
                project.cast.singers.length > 0 : 
                project.cast[role.key] !== null;
            
            const reqCard = document.createElement('div');
            reqCard.className = 'requirement-card';
            reqCard.innerHTML = `
                <h4>${role.name}</h4>
                <p>Type: ${role.type}</p>
                <span class="status ${isHired ? 'hired' : 'pending'}">${isHired ? '✓ Hired' : '⏳ Pending'}</span>
            `;
            requirementsGrid.appendChild(reqCard);
        });
    }

    // FIXED: Update Project Progress
    updateProjectProgress() {
        this.gameData.projects.forEach(project => {
            if (project.weeksRemaining > 0) {
                project.weeksRemaining--;
                const totalWeeks = project.scriptTimeline === 'rush' ? 2 : 
                                 project.scriptTimeline === 'standard' ? 4 : 6;
                project.progress = Math.round((1 - project.weeksRemaining / totalWeeks) * 100);
            }
            
            if (project.weeksRemaining === 0 && project.status === 'script_development') {
                project.status = 'script_ready';
                project.phase = 'casting';
                this.showNotification(`Script for "${project.title}" is ready! Time to cast actors.`, 'success');
                this.updateMovieSelector(); // Update dropdown when status changes
                this.switchTab('casting');
            }
            
            if (project.status === 'production' && project.weeksRemaining === 0) {
                project.status = 'post_production';
                project.weeksRemaining = 6;
            }
            
            if (project.status === 'post_production' && project.weeksRemaining === 0) {
                project.status = 'marketing_ready';
                this.showNotification(`"${project.title}" is ready for marketing!`, 'success');
                this.switchTab('marketing');
            }
        });
    }

    // Show Active Scripts
    showActiveScripts() {
        const activeScripts = document.getElementById('active-scripts');
        const scriptList = document.getElementById('script-progress-list');
        
        if (!activeScripts || !scriptList) return;
        
        if (this.gameData.projects.length > 0) {
            activeScripts.style.display = 'block';
            scriptList.innerHTML = '';
            
            this.gameData.projects.forEach(project => {
                const progressCard = document.createElement('div');
                progressCard.className = 'script-progress-card';
                progressCard.innerHTML = `
                    <h4>${project.title}</h4>
                    <p>Genre: ${this.genres[project.genre].name}</p>
                    <p>Format: ${project.format.toUpperCase()}</p>
                    <p>Lead Roles: ${project.leadRolesCount}, Supporting: ${project.supportingRolesCount}</p>
                    <p>Script Quality: ${project.scriptQuality}%</p>
                    ${project.isFranchise && project.franchise ? `<p>Franchise: ${project.franchise}</p>` : ''}
                    <div class="progress-bar">
                        <div class="progress-fill" style="width: ${project.progress || 0}%"></div>
                    </div>
                    <p>Time Remaining: ${project.weeksRemaining} weeks</p>
                    <p>Status: ${project.status.replace('_', ' ')}</p>
                `;
                scriptList.appendChild(progressCard);
            });
        } else {
            activeScripts.style.display = 'none';
        }
    }

    // Initialize Celebrities
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
                  photo: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face' },

                { id: 11, name: 'Deepika Padukone', popularity: 92, acting: 90, bankability: 87, fee: 200000000,
                  genre: ['Romance', 'Drama', 'Historical'], age: 38, phase: 'Prime',
                  photo: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face' },
                
                { id: 12, name: 'Priyanka Chopra', popularity: 88, acting: 85, bankability: 82, fee: 180000000,
                  genre: ['Drama', 'Action', 'International'], age: 41, phase: 'Prime',
                  photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face' },
                
                { id: 13, name: 'Alia Bhatt', popularity: 90, acting: 93, bankability: 88, fee: 150000000,
                  genre: ['Drama', 'Romance', 'Thriller'], age: 31, phase: 'Rising Star',
                  photo: 'https://images.unsplash.com/photo-1494790108755-2616b612b637?w=150&h=150&fit=crop&crop=face' },
                
                ...this.generateMoreActors(14, 50)
            ],
            directors: [
                { id: 1, name: 'Rajkumar Hirani', skill: 98, specialty: 'Comedy-Drama', fee: 100000000, successRate: 95,
                  photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face' },
                
                { id: 2, name: 'Sanjay Leela Bhansali', skill: 96, specialty: 'Historical Drama', fee: 90000000, successRate: 88,
                  photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face' },
                
                { id: 3, name: 'Zoya Akhtar', skill: 92, specialty: 'Contemporary Drama', fee: 60000000, successRate: 85,
                  photo: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face' },
                
                ...this.generateMoreDirectors(4, 30)
            ],
            music: [
                { id: 1, name: 'A.R. Rahman', skill: 99, fee: 50000000, specialty: 'All Genres', awards: 'Oscar Winner',
                  photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face' },
                
                { id: 2, name: 'Shankar-Ehsaan-Loy', skill: 90, fee: 25000000, specialty: 'Contemporary', awards: 'Filmfare Winners',
                  photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face' },
                
                ...this.generateMoreMusicDirectors(3, 25)
            ],
            singers: [
                { id: 1, name: 'Arijit Singh', popularity: 98, fee: 5000000, voice: 'Male', specialty: 'Romantic Melodies',
                  photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face' },
                
                { id: 2, name: 'Shreya Ghoshal', popularity: 96, fee: 4500000, voice: 'Female', specialty: 'Classical Traditional',
                  photo: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face' },
                
                ...this.generateMoreSingers(3, 40)
            ]
        };
    }

    generateMoreActors(startId, endId) {
        const actors = [];
        const names = ['Katrina Kaif', 'Kareena Kapoor', 'Kriti Sanon', 'Kiara Advani', 'Shraddha Kapoor', 
                      'Varun Dhawan', 'Tiger Shroff', 'Kartik Aaryan', 'Vicky Kaushal', 'Sidharth Malhotra'];
        
        for (let i = startId; i <= endId; i++) {
            const nameIndex = (i - startId) % names.length;
            const isMale = i % 2 === 0;
            
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
                photo: `https://randomuser.me/api/portraits/${isMale ? 'men' : 'women'}/${((i % 50) + 1)}.jpg`
            });
        }
        return actors;
    }

    generateMoreDirectors(startId, endId) {
        const directors = [];
        const names = ['Rohit Shetty', 'Karan Johar', 'Aanand L. Rai', 'Kabir Khan', 'Nitesh Tiwari'];
        
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

    generateMoreMusicDirectors(startId, endId) {
        const musicDirectors = [];
        const names = ['Amit Trivedi', 'Vishal-Shekhar', 'Sachin-Jigar', 'Ilaiyaraaja'];
        
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

    // Initialize other components
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

    initializeFranchises() {
        return {
            housefull: {
                name: 'Housefull',
                rating: 85,
                parts: ['Housefull', 'Housefull 2', 'Housefull 3', 'Housefull 4', 'Housefull 5'],
                regularCast: [
                    { id: 4, name: 'Akshay Kumar', roles: ['Lead Actor'] },
                    { id: 14, name: 'Katrina Kaif', roles: ['Lead Actress'] }
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
            golmaal: {
                name: 'Golmaal',
                rating: 75,
                parts: ['Golmaal', 'Golmaal Returns', 'Golmaal 3', 'Golmaal Again'],
                regularCast: [
                    { id: 16, name: 'Ajay Devgan', roles: ['Lead Actor'] }
                ],
                successBonus: 15
            }
        };
    }

    initializeMarketing() {
        return {
            viral: { name: 'Viral Marketing', cost: 2500000, reach: 40, effectiveness: 60 },
            minimal: { name: 'Minimal Marketing', cost: 7500000, reach: 30, effectiveness: 45 },
            standard: { name: 'Standard Marketing', cost: 25000000, reach: 60, effectiveness: 75 },
            aggressive: { name: 'Aggressive Marketing', cost: 50000000, reach: 85, effectiveness: 88 },
            premium: { name: 'Premium Marketing', cost: 100000000, reach: 95, effectiveness: 93 }
        };
    }

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
            }
        ];
    }

    initializeTheatres() {
        return [
            { name: 'PVR Cinemas', screens: 1200, share: 32, logo: 'https://via.placeholder.com/80x40/C41E3A/FFFFFF?text=PVR' },
            { name: 'INOX Leisure', screens: 800, share: 28, logo: 'https://via.placeholder.com/80x40/1565C0/FFFFFF?text=INOX' },
            { name: 'Cinepolis India', screens: 500, share: 18, logo: 'https://via.placeholder.com/80x40/FF6F00/FFFFFF?text=CPX' },
            { name: 'Independent Theatres', screens: 2000, share: 22, logo: 'https://via.placeholder.com/80x40/424242/FFFFFF?text=OTHER' }
        ];
    }

    // Game Management Functions
    showLoadingScreen() {
        document.getElementById('loading-screen').style.display = 'flex';
    }

    showGameStartModal() {
        document.getElementById('game-start-modal').style.display = 'flex';
    }

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

    loadGame() {
        const savedData = localStorage.getItem('bollywoodSimulatorSave');
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

    setupGameInterface() {
        this.generateAvatarOptions();
        this.generateLogoOptions();
        this.generateGenreOptions();
        this.updateCastingTab();
        this.switchTab('profile');
    }

    // Generate Avatar Options
    generateAvatarOptions() {
        const avatarGrid = document.getElementById('avatar-grid');
        if (!avatarGrid) return;

        avatarGrid.innerHTML = '';
        
        for (let i = 1; i <= 25; i++) {
            const avatarDiv = document.createElement('div');
            avatarDiv.className = 'avatar-option';
            avatarDiv.dataset.avatar = `indian_${i}`;
            
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

    // Generate Logo Options
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

    // Generate Genre Options
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

    // Selection Methods
    selectAvatar(avatarId, src) {
        document.querySelectorAll('.avatar-option').forEach(option => {
            option.classList.remove('selected');
        });
        document.querySelector(`[data-avatar="${avatarId}"]`)?.classList.add('selected');
        
        this.gameData.player.avatar = src;
        this.showNotification('Avatar selected!', 'success');
    }

    selectLogo(logoId, logoData) {
        document.querySelectorAll('.logo-option').forEach(option => {
            option.classList.remove('selected');
        });
        document.querySelector(`[data-logo="${logoId}"]`)?.classList.add('selected');
        
        this.gameData.player.studioLogo = logoData;
        this.showNotification('Studio logo selected!', 'success');
    }

    selectGenre(genreKey) {
        document.querySelectorAll('.genre-card').forEach(card => {
            card.classList.remove('selected');
        });
        document.querySelector(`[data-genre="${genreKey}"]`)?.classList.add('selected');
        
        this.selectedGenre = genreKey;
        this.showNotification(`${this.genres[genreKey].name} genre selected!`, 'success');
    }

    // Create Character
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

        this.updateStudioDisplay();

        this.showNotification(`Welcome ${characterName}! ${studioName} is ready to create blockbusters!`, 'success');
        this.switchTab('studio');
        this.updateUI();
        this.saveGame();
    }

    // Update Studio Display
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
                studioLogoDisplay.innerHTML = `<i class="${this.gameData.player.studioLogo.icon}" style="color: ${this.gameData.player.studioLogo.color}; font-size: 3rem;"></i>`;
                studioLogoDisplay.style.display = 'flex';
                studioLogoDisplay.style.alignItems = 'center';
                studioLogoDisplay.style.justifyContent = 'center';
                studioLogoDisplay.style.background = this.gameData.player.studioLogo.bg;
            }
        }
    }

    // Time Management
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

    updateDateDisplay() {
        const currentDateEl = document.getElementById('current-date');
        if (currentDateEl) {
            const { year, month, week } = this.gameData.player.currentDate;
            currentDateEl.textContent = `Week ${week}, Month ${month}, Year ${year}`;
        }
    }

    processWeeklyEvents() {
        const monthlyExpenses = this.calculateMonthlyExpenses();
        this.gameData.player.money -= Math.round(monthlyExpenses / 4);
        
        this.processLoanPayments();
        this.updateProjectProgress();
        
        if (Math.random() < 0.1) {
            this.triggerRandomEvent();
        }
    }

    calculateMonthlyExpenses() {
        let totalSalaries = 0;
        
        totalSalaries += this.gameData.staff.admin.productionManager * 80000;
        totalSalaries += this.gameData.staff.admin.accountant * 60000;
        totalSalaries += this.gameData.staff.admin.prManager * 70000;
        
        totalSalaries += this.gameData.staff.tech.cameraOperator * 50000;
        totalSalaries += this.gameData.staff.tech.soundEngineer * 45000;
        totalSalaries += this.gameData.staff.tech.videoEditor * 55000;
        
        const officeRent = 200000;
        const utilities = 50000;
        
        return totalSalaries + officeRent + utilities;
    }

    processLoanPayments() {
        // Process loan payments logic
    }

    triggerRandomEvent() {
        // Random event logic
    }

    // Tab Management
    switchTab(tabName) {
        document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
        document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));

        const tabBtn = document.querySelector(`[data-tab="${tabName}"]`);
        const tabContent = document.getElementById(`${tabName}-tab`);
        
        if (tabBtn) tabBtn.classList.add('active');
        if (tabContent) tabContent.classList.add('active');

        this.updateTabContent(tabName);
    }

    updateTabContent(tabName) {
        switch (tabName) {
            case 'casting':
                this.updateCastingTab();
                break;
            case 'scripts':
                this.showActiveScripts();
                break;
        }
    }

    // Casting Tab Management
    updateCastingTab() {
        this.updateMovieSelector();
        this.updateCastAssignment();
        this.switchCastCategory('actors');
        this.updateHiredCastTable();
    }

    switchCastCategory(category) {
        document.querySelectorAll('.cat-tab').forEach(tab => tab.classList.remove('active'));
        document.querySelector(`[data-category="${category}"]`)?.classList.add('active');
        
        this.updateCelebrityShowcase(category);
    }

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
            case 'music':
                celebrities = this.celebrities.music;
                break;
            case 'singers':
                celebrities = this.celebrities.singers;
                break;
        }

        celebrities.slice(0, 20).forEach(celebrity => {
            const card = this.createCelebrityCard(celebrity, category);
            showcase.appendChild(card);
        });
    }

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

    isCelebrityHired(celebrityId, category) {
        return this.gameData.hiredCast.some(hire => 
            hire.celebrityId === celebrityId && hire.category === category
        );
    }

    hireCelebrity(celebrity, category) {
        const selectedMovieId = this.gameData.selectedMovie;
        const selectedRoleType = this.gameData.selectedRoleType;
        const selectedRoleNumber = this.gameData.selectedRoleNumber;

        if (!selectedMovieId) {
            this.showNotification('Please select a movie first!', 'error');
            return;
        }

        const project = this.gameData.projects.find(p => p.id == selectedMovieId);
        if (!project) {
            this.showNotification('Selected movie not found!', 'error');
            return;
        }

        if (project.status === 'script_development') {
            this.showNotification('Wait for script development to complete!', 'error');
            return;
        }

        if (this.gameData.player.money < celebrity.fee) {
            this.showNotification('Not enough money to hire this celebrity!', 'error');
            return;
        }

        // Check if role is already filled
        let roleKey = '';
        let roleIndex = -1;
        
        if (category === 'actors') {
            if (selectedRoleType === 'lead') {
                roleKey = 'lead';
                roleIndex = selectedRoleNumber - 1;
                if (project.cast.lead[roleIndex] !== null) {
                    this.showNotification('This lead role is already filled!', 'error');
                    return;
                }
            } else if (selectedRoleType === 'supporting') {
                roleKey = 'supporting';
                roleIndex = selectedRoleNumber - 1;
                if (project.cast.supporting[roleIndex] !== null) {
                    this.showNotification('This supporting role is already filled!', 'error');
                    return;
                }
            }
        } else if (category === 'directors') {
            if (project.cast.director !== null) {
                this.showNotification('Director already hired for this movie!', 'error');
                return;
            }
            roleKey = 'director';
        } else if (category === 'music') {
            if (project.cast.musicDirector !== null) {
                this.showNotification('Music director already hired for this movie!', 'error');
                return;
            }
            roleKey = 'musicDirector';
        } else if (category === 'singers') {
            if (project.cast.singers.length >= 3) {
                this.showNotification('Maximum singers already hired for this movie!', 'error');
                return;
            }
            roleKey = 'singers';
        }

        // Deduct money
        this.gameData.player.money -= celebrity.fee;
        this.gameData.player.totalExpenses += celebrity.fee;
        project.totalBudget += celebrity.fee;
        
        // Assign to project
        if (roleKey === 'singers') {
            project.cast.singers.push({...celebrity, assignedRole: `Singer ${project.cast.singers.length + 1}`});
        } else if (roleIndex >= 0) {
            project.cast[roleKey][roleIndex] = {...celebrity, assignedRole: `${selectedRoleType.charAt(0).toUpperCase() + selectedRoleType.slice(1)} Role ${selectedRoleNumber}`};
        } else {
            project.cast[roleKey] = {...celebrity, assignedRole: roleKey.charAt(0).toUpperCase() + roleKey.slice(1)};
        }

        // Add to global hired cast
        this.gameData.hiredCast.push({
            celebrityId: celebrity.id,
            category: category,
            movieId: selectedMovieId,
            movieTitle: project.title,
            roleType: selectedRoleType,
            roleNumber: selectedRoleNumber,
            fee: celebrity.fee,
            hiredDate: {...this.gameData.player.currentDate}
        });

        // Check for franchise bonus
        let franchiseBonus = '';
        if (project.isFranchise && project.franchise) {
            let franchise = this.predefinedFranchises[project.franchise.toLowerCase()];
            if (!franchise) {
                franchise = this.gameData.userFranchises.find(f => f.name === project.franchise);
            }
            if (franchise) {
                const isFranchiseActor = franchise.regularCast && franchise.regularCast.some(fc => fc.id === celebrity.id);
                if (isFranchiseActor) {
                    franchiseBonus = ` Franchise bonus: +${franchise.successBonus}% success rate!`;
                }
            }
        }

        this.showNotification(`${celebrity.name} hired successfully!${franchiseBonus}`, 'success');
        this.updateCelebrityShowcase(this.getActiveCategoryTab());
        this.updateCastingRequirements(project);
        this.updateHiredCastTable();
        this.checkProductionReadiness(project);
        this.updateUI();
        this.saveGame();
    }

    getActiveCategoryTab() {
        const activeTab = document.querySelector('.cat-tab.active');
        return activeTab ? activeTab.dataset.category : 'actors';
    }

    updateHiredCastTable() {
        const tableBody = document.getElementById('hired-cast-table-body');
        if (!tableBody) return;

        tableBody.innerHTML = '';

        this.gameData.hiredCast.forEach((hire, index) => {
            const celebrity = this.findCelebrityById(hire.celebrityId, hire.category);
            if (!celebrity) return;

            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${hire.movieTitle}</td>
                <td>
                    <span class="role-badge">${hire.roleType}</span>
                </td>
                <td>Role ${hire.roleNumber || 1}</td>
                <td>
                    <div class="cast-member-info">
                        <img src="${celebrity.photo}" alt="${celebrity.name}" class="cast-member-avatar" 
                             onerror="this.style.display='none'">
                        <span class="cast-member-name">${celebrity.name}</span>
                    </div>
                </td>
                <td>${this.formatCurrency(hire.fee)}</td>
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
    }

    findCelebrityById(id, category) {
        let categoryData = [];
        switch (category) {
            case 'actors':
                categoryData = this.celebrities.actors;
                break;
            case 'directors':
                categoryData = this.celebrities.directors;
                break;
            case 'music':
                categoryData = this.celebrities.music;
                break;
            case 'singers':
                categoryData = this.celebrities.singers;
                break;
        }
        return categoryData.find(c => c.id === id);
    }

    removeCastMember(index) {
        const hire = this.gameData.hiredCast[index];
        if (!hire) return;

        // Find project and remove from cast
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
                project.cast.singers = project.cast.singers.filter((_, i) => i !== (hire.roleNumber - 1));
            }
        }

        // Remove from hired cast
        this.gameData.hiredCast.splice(index, 1);

        this.showNotification('Cast member removed successfully!', 'success');
        this.updateHiredCastTable();
        this.updateCelebrityShowcase(this.getActiveCategoryTab());
        this.saveGame();
    }

    checkProductionReadiness(project) {
        const hasLeadActors = project.cast.lead.every(role => role !== null);
        const hasSupportingActors = project.cast.supporting.every(role => role !== null);
        const hasDirector = project.cast.director !== null;
        
        if (hasLeadActors && hasSupportingActors && hasDirector && project.status === 'script_ready') {
            project.status = 'production_ready';
            project.phase = 'production';
            project.weeksRemaining = 12;
            this.showNotification(`"${project.title}" is ready for production!`, 'success');
            this.switchTab('production');
        }
    }

    // Staff Management
    hireStaff(button) {
        const role = button.dataset.role;
        const salary = parseInt(button.dataset.salary);
        
        if (this.gameData.player.money < salary * 12) {
            this.showNotification('Not enough money to hire staff!', 'error');
            return;
        }
        
        const roleKey = role.replace('-', '');
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
        this.updateUI();
        this.saveGame();
    }

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
        this.updateUI();
        this.saveGame();
    }

    openMoneyManagement() {
        this.switchTab('finances');
    }

    // Promo Code System
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
            'SUPERSTAR': () => {
                this.gameData.player.reputation = 100;
                this.showNotification('⭐ Superstar Status Achieved!', 'success');
            },
            'FREELOAN': () => {
                this.gameData.player.loans = [];
                this.showNotification('🏦 All Loans Cleared!', 'success');
            },
            'TIMETRAVEL': () => {
                this.gameData.projects.forEach(project => {
                    if (project.weeksRemaining > 0) {
                        project.weeksRemaining = 0;
                    }
                });
                this.showNotification('⏰ Time Travel: All Projects Fast-Forwarded!', 'success');
            },
            'ALLSTAR': () => {
                this.gameData.sandboxMode = true;
                this.showNotification('🌟 All Star Mode: Free Celebrity Hiring!', 'success');
            }
        };

        if (promoCodes[code]) {
            promoCodes[code]();
            document.getElementById('promo-code-input').value = '';
            this.updateUI();
            this.saveGame();
        } else {
            this.showNotification('❌ Invalid promo code!', 'error');
        }
    }

    // Logo Designer Methods
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

    // Utility Functions
    updateUI() {
        const moneyEl = document.getElementById('money');
        const reputationEl = document.getElementById('reputation');
        const studioLevelEl = document.getElementById('studio-level');
        
        if (moneyEl) moneyEl.textContent = this.formatCurrency(this.gameData.player.money);
        if (reputationEl) reputationEl.textContent = this.gameData.player.reputation;
        if (studioLevelEl) studioLevelEl.textContent = `Level ${this.gameData.player.studioLevel}`;
        
        if (this.gameData.player.name && this.gameData.player.studioName) {
            this.updateStudioDisplay();
        }
        
        if (this.gameData.projects.length > 0) {
            this.showActiveScripts();
        }
        
        this.updateMovieSelector();
    }

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

        setTimeout(() => {
            if (modal.style.display === 'flex') {
                modal.style.display = 'none';
            }
        }, duration);
    }

    formatCurrency(amount) {
        return '₹' + amount.toLocaleString('en-IN');
    }

    saveGame() {
        try {
            localStorage.setItem('bollywoodSimulatorSave', JSON.stringify(this.gameData));
        } catch (error) {
            console.error('Failed to save game:', error);
            this.showNotification('Failed to save game!', 'error');
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
    console.log('🎬 Starting Bollywood Simulator...');
    window.bollywoodSimulator = new BollywoodSimulator();
    
    // Step navigation function
    window.nextStep = function(stepNumber) {
        document.querySelectorAll('.script-step').forEach(step => step.classList.remove('active'));
        document.querySelectorAll('.step').forEach(step => step.classList.remove('active'));
        
        document.getElementById(`step-${stepNumber}`).classList.add('active');
        document.querySelector(`[data-step="${stepNumber}"]`).classList.add('active');
    };
    
    console.log('🎮 Bollywood Simulator loaded successfully!');
    console.log('💡 Available Promo Codes: SANDBOX, RICHMODE, GODMODE, SUPERSTAR, FREELOAN, TIMETRAVEL, ALLSTAR');
});

// Export for potential module use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = BollywoodSimulator;
}
