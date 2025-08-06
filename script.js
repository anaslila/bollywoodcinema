// Movie Production Simulator - Enhanced Version with 100+ Celebrities
class MovieProductionSimulator {
    constructor() {
        this.gameData = {
            player: {
                name: '',
                studioName: '',
                avatar: '',
                studioLogo: '',
                money: 5000000, // Default starting amount
                reputation: 10,
                studioLevel: 1,
                maxProjects: 1,
                totalIncome: 0,
                totalExpenses: 0,
                loans: [],
                achievements: []
            },
            currentProject: null,
            completedMovies: [],
            staff: [],
            gameStarted: false
        };
        
        this.celebrities = this.initializeCelebrities();
        this.genres = this.initializeGenres();
        this.marketingStrategies = this.initializeMarketing();
        this.randomEvents = this.initializeEvents();
        this.avatarOptions = this.generateAvatars();
        this.logoOptions = this.generateLogos();
        
        this.init();
    }

    init() {
        this.showLoadingScreen();
        this.setupEventListeners();
        this.showGameStartModal();
    }

    // Show Loading Screen
    showLoadingScreen() {
        const loadingScreen = document.getElementById('loading-screen');
        const gameContainer = document.getElementById('game-container');
        
        setTimeout(() => {
            loadingScreen.style.opacity = '0';
            setTimeout(() => {
                loadingScreen.style.display = 'none';
                gameContainer.style.display = 'block';
            }, 500);
        }, 3000);
    }

    // Show Game Start Modal
    showGameStartModal() {
        document.getElementById('game-start-modal').style.display = 'flex';
    }

    // Generate Avatar Options (25 diverse avatars)
    generateAvatars() {
        const avatars = [];
        const avatarTypes = [
            { type: 'male', count: 12 },
            { type: 'female', count: 13 }
        ];

        let avatarId = 1;
        avatarTypes.forEach(({ type, count }) => {
            for (let i = 1; i <= count; i++) {
                avatars.push({
                    id: `${type}_${i}`,
                    src: `https://randomuser.me/api/portraits/${type === 'male' ? 'men' : 'women'}/${i}.jpg`,
                    alt: `${type.charAt(0).toUpperCase() + type.slice(1)} Avatar ${i}`
                });
                avatarId++;
            }
        });

        return avatars;
    }

    // Generate Logo Options (20 studio logos)
    generateLogos() {
        const logoStyles = [
            { icon: 'fas fa-film', color: '#ffd700', bg: '#1a1a1a' },
            { icon: 'fas fa-video', color: '#ff6b35', bg: '#2a2a2a' },
            { icon: 'fas fa-camera', color: '#4CAF50', bg: '#1a1a1a' },
            { icon: 'fas fa-star', color: '#ffd700', bg: '#000000' },
            { icon: 'fas fa-crown', color: '#ff6b35', bg: '#1a1a1a' },
            { icon: 'fas fa-theater-masks', color: '#9c27b0', bg: '#1a1a1a' },
            { icon: 'fas fa-rocket', color: '#2196f3', bg: '#1a1a1a' },
            { icon: 'fas fa-diamond', color: '#ffd700', bg: '#2a2a2a' },
            { icon: 'fas fa-bolt', color: '#ffeb3b', bg: '#1a1a1a' },
            { icon: 'fas fa-fire', color: '#f44336', bg: '#1a1a1a' },
            { icon: 'fas fa-magic', color: '#e91e63', bg: '#1a1a1a' },
            { icon: 'fas fa-gem', color: '#00bcd4', bg: '#1a1a1a' },
            { icon: 'fas fa-trophy', color: '#ffc107', bg: '#2a2a2a' },
            { icon: 'fas fa-medal', color: '#ff9800', bg: '#1a1a1a' },
            { icon: 'fas fa-shield', color: '#3f51b5', bg: '#1a1a1a' },
            { icon: 'fas fa-sun', color: '#ffeb3b', bg: '#1a1a1a' },
            { icon: 'fas fa-moon', color: '#607d8b', bg: '#1a1a1a' },
            { icon: 'fas fa-eye', color: '#795548', bg: '#1a1a1a' },
            { icon: 'fas fa-heart', color: '#e91e63', bg: '#1a1a1a' },
            { icon: 'fas fa-infinity', color: '#673ab7', bg: '#1a1a1a' }
        ];

        return logoStyles.map((style, index) => ({
            id: `logo_${index + 1}`,
            ...style
        }));
    }

    // Initialize 100+ Celebrities Database with Real Names and Photos
    initializeCelebrities() {
        return {
            actors: [
                // Male Superstars
                { id: 1, name: 'Shah Rukh Khan', popularity: 98, acting: 95, bankability: 99, fee: 500000000, genre: ['Romance', 'Drama', 'Action'], age: 58, phase: 'Legend', photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face' },
                { id: 2, name: 'Aamir Khan', popularity: 96, acting: 98, bankability: 90, fee: 400000000, genre: ['Drama', 'Social', 'Thriller'], age: 59, phase: 'Legend', photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face' },
                { id: 3, name: 'Salman Khan', popularity: 94, acting: 78, bankability: 97, fee: 350000000, genre: ['Action', 'Comedy', 'Drama'], age: 58, phase: 'Legend', photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face' },
                { id: 4, name: 'Akshay Kumar', popularity: 88, acting: 82, bankability: 92, fee: 300000000, genre: ['Action', 'Comedy', 'Patriotic'], age: 56, phase: 'Veteran', photo: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&h=150&fit=crop&crop=face' },
                { id: 5, name: 'Ranbir Kapoor', popularity: 85, acting: 92, bankability: 82, fee: 250000000, genre: ['Romance', 'Drama', 'Comedy'], age: 41, phase: 'Prime', photo: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face' },
                { id: 6, name: 'Ranveer Singh', popularity: 89, acting: 87, bankability: 85, fee: 200000000, genre: ['Drama', 'Comedy', 'Historical'], age: 38, phase: 'Prime', photo: 'https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=150&h=150&fit=crop&crop=face' },
                { id: 7, name: 'Hrithik Roshan', popularity: 83, acting: 88, bankability: 80, fee: 180000000, genre: ['Action', 'Romance', 'Thriller'], age: 50, phase: 'Veteran', photo: 'https://images.unsplash.com/photo-1522075469751-3847ae2c5e9b?w=150&h=150&fit=crop&crop=face' },
                { id: 8, name: 'Varun Dhawan', popularity: 76, acting: 75, bankability: 78, fee: 150000000, genre: ['Comedy', 'Romance', 'Action'], age: 37, phase: 'Rising', photo: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop&crop=face' },
                { id: 9, name: 'Tiger Shroff', popularity: 72, acting: 68, bankability: 75, fee: 120000000, genre: ['Action', 'Dance', 'Romance'], age: 34, phase: 'Rising', photo: 'https://images.unsplash.com/photo-1552058544-f2b08422138a?w=150&h=150&fit=crop&crop=face' },
                { id: 10, name: 'Kartik Aaryan', popularity: 74, acting: 70, bankability: 76, fee: 100000000, genre: ['Comedy', 'Romance', 'Horror'], age: 33, phase: 'Rising', photo: 'https://images.unsplash.com/photo-1494790108755-2616b612b637?w=150&h=150&fit=crop&crop=face' },

                // Female Superstars  
                { id: 11, name: 'Deepika Padukone', popularity: 92, acting: 90, bankability: 87, fee: 200000000, genre: ['Romance', 'Drama', 'Historical'], age: 38, phase: 'Prime', photo: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face' },
                { id: 12, name: 'Priyanka Chopra', popularity: 88, acting: 85, bankability: 82, fee: 180000000, genre: ['Drama', 'Action', 'International'], age: 41, phase: 'Prime', photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face' },
                { id: 13, name: 'Alia Bhatt', popularity: 90, acting: 93, bankability: 88, fee: 150000000, genre: ['Drama', 'Romance', 'Thriller'], age: 31, phase: 'Rising Star', photo: 'https://images.unsplash.com/photo-1494790108755-2616b612b637?w=150&h=150&fit=crop&crop=face' },
                { id: 14, name: 'Katrina Kaif', popularity: 80, acting: 72, bankability: 78, fee: 120000000, genre: ['Action', 'Romance', 'Comedy'], age: 40, phase: 'Established', photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face' },
                { id: 15, name: 'Kareena Kapoor', popularity: 82, acting: 84, bankability: 79, fee: 100000000, genre: ['Romance', 'Drama', 'Comedy'], age: 43, phase: 'Veteran', photo: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=150&h=150&fit=crop&crop=face' },

                // More actors (continuing to 100+)...
                { id: 16, name: 'Ajay Devgan', popularity: 78, acting: 82, bankability: 80, fee: 120000000, genre: ['Action', 'Drama', 'Comedy'], age: 55, phase: 'Veteran', photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face' },
                { id: 17, name: 'John Abraham', popularity: 74, acting: 70, bankability: 76, fee: 100000000, genre: ['Action', 'Thriller', 'Patriotic'], age: 51, phase: 'Established', photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face' },
                { id: 18, name: 'Shahid Kapoor', popularity: 76, acting: 85, bankability: 72, fee: 80000000, genre: ['Romance', 'Drama', 'Action'], age: 43, phase: 'Established', photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face' },
                { id: 19, name: 'Ayushmann Khurrana', popularity: 79, acting: 88, bankability: 75, fee: 70000000, genre: ['Comedy', 'Social', 'Drama'], age: 39, phase: 'Prime', photo: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&h=150&fit=crop&crop=face' },
                { id: 20, name: 'Rajkummar Rao', popularity: 72, acting: 90, bankability: 68, fee: 50000000, genre: ['Drama', 'Horror', 'Comedy'], age: 39, phase: 'Content King', photo: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face' },
                
                // Continue adding more actors up to 100+
                ...this.generateMoreActors(21, 100) // Generate remaining actors
            ],

            directors: [
                { id: 1, name: 'Rajkumar Hirani', skill: 98, specialty: 'Comedy-Drama', fee: 100000000, successRate: 95, photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face' },
                { id: 2, name: 'Sanjay Leela Bhansali', skill: 96, specialty: 'Historical Drama', fee: 90000000, successRate: 88, photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face' },
                { id: 3, name: 'Zoya Akhtar', skill: 92, specialty: 'Contemporary Drama', fee: 60000000, successRate: 85, photo: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face' },
                { id: 4, name: 'Rohit Shetty', skill: 82, specialty: 'Action Comedy', fee: 75000000, successRate: 80, photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face' },
                { id: 5, name: 'Karan Johar', skill: 85, specialty: 'Family Drama', fee: 80000000, successRate: 78, photo: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&h=150&fit=crop&crop=face' },
                { id: 6, name: 'Shoojit Sircar', skill: 94, specialty: 'Social Drama', fee: 40000000, successRate: 90, photo: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face' },
                { id: 7, name: 'Anurag Kashyap', skill: 90, specialty: 'Thriller', fee: 35000000, successRate: 75, photo: 'https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=150&h=150&fit=crop&crop=face' },
                { id: 8, name: 'Imtiaz Ali', skill: 88, specialty: 'Romance', fee: 45000000, successRate: 72, photo: 'https://images.unsplash.com/photo-1522075469751-3847ae2c5e9b?w=150&h=150&fit=crop&crop=face' },
                { id: 9, name: 'Farah Khan', skill: 83, specialty: 'Comedy', fee: 50000000, successRate: 70, photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face' },
                { id: 10, name: 'Abhishek Chaubey', skill: 89, specialty: 'Dark Comedy', fee: 30000000, successRate: 82, photo: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop&crop=face' },
                ...this.generateMoreDirectors(11, 50) // Generate remaining directors
            ],

            producers: [
                { id: 1, name: 'Karan Johar', influence: 95, fee: 50000000, connections: 98, photo: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&h=150&fit=crop&crop=face' },
                { id: 2, name: 'Yash Raj Chopra', influence: 92, fee: 45000000, connections: 95, photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face' },
                { id: 3, name: 'Ekta Kapoor', influence: 88, fee: 40000000, connections: 90, photo: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face' },
                { id: 4, name: 'Sajid Nadiadwala', influence: 85, fee: 35000000, connections: 87, photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face' },
                { id: 5, name: 'Dinesh Vijan', influence: 82, fee: 30000000, connections: 85, photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face' },
                ...this.generateMoreProducers(6, 30) // Generate remaining producers
            ],

            music: [
                { id: 1, name: 'A.R. Rahman', skill: 99, fee: 50000000, specialty: 'All Genres', awards: 'Oscar Winner', photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face' },
                { id: 2, name: 'Shankar-Ehsaan-Loy', skill: 90, fee: 25000000, specialty: 'Contemporary', awards: 'Filmfare Winners', photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face' },
                { id: 3, name: 'Vishal-Shekhar', skill: 87, fee: 20000000, specialty: 'Pop Dance', awards: 'Hit Makers', photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face' },
                { id: 4, name: 'Amit Trivedi', skill: 92, fee: 18000000, specialty: 'Indie Contemporary', awards: 'National Award Winner', photo: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&h=150&fit=crop&crop=face' },
                { id: 5, name: 'Ilaiyaraaja', skill: 96, fee: 30000000, specialty: 'Classical Fusion', awards: 'Padma Bhushan', photo: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face' },
                { id: 6, name: 'Sachin-Jigar', skill: 85, fee: 15000000, specialty: 'Commercial', awards: 'Chart Toppers', photo: 'https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=150&h=150&fit=crop&crop=face' },
                { id: 7, name: 'Anu Malik', skill: 82, fee: 12000000, specialty: '90s Nostalgia', awards: 'Veteran Composer', photo: 'https://images.unsplash.com/photo-1522075469751-3847ae2c5e9b?w=150&h=150&fit=crop&crop=face' },
                { id: 8, name: 'Pritam', skill: 88, fee: 22000000, specialty: 'Youth Music', awards: 'Blockbuster Albums', photo: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop&crop=face' },
                { id: 9, name: 'Tanishk Bagchi', skill: 78, fee: 10000000, specialty: 'Remixes', awards: 'Chart Buster', photo: 'https://images.unsplash.com/photo-1552058544-f2b08422138a?w=150&h=150&fit=crop&crop=face' },
                { id: 10, name: 'Badshah', skill: 75, fee: 8000000, specialty: 'Rap Hip-Hop', awards: 'YouTube King', photo: 'https://images.unsplash.com/photo-1494790108755-2616b612b637?w=150&h=150&fit=crop&crop=face' },
                ...this.generateMoreMusicDirectors(11, 40) // Generate remaining music directors
            ],

            singers: [
                { id: 1, name: 'Arijit Singh', popularity: 98, fee: 5000000, voice: 'Male', specialty: 'Romantic Melodies', photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face' },
                { id: 2, name: 'Shreya Ghoshal', popularity: 96, fee: 4500000, voice: 'Female', specialty: 'Classical Traditional', photo: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face' },
                { id: 3, name: 'Rahat Fateh Ali Khan', popularity: 92, fee: 6000000, voice: 'Male', specialty: 'Sufi Qawwali', photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face' },
                { id: 4, name: 'Sunidhi Chauhan', popularity: 89, fee: 3500000, voice: 'Female', specialty: 'Dance Pop', photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face' },
                { id: 5, name: 'Armaan Malik', popularity: 85, fee: 3000000, voice: 'Male', specialty: 'Contemporary Pop', photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face' },
                { id: 6, name: 'Neha Kakkar', popularity: 87, fee: 3200000, voice: 'Female', specialty: 'Party Songs', photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face' },
                { id: 7, name: 'Udit Narayan', popularity: 83, fee: 2500000, voice: 'Male', specialty: '90s Romance', photo: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&h=150&fit=crop&crop=face' },
                { id: 8, name: 'Alka Yagnik', popularity: 81, fee: 2200000, voice: 'Female', specialty: 'Bollywood Classic', photo: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=150&h=150&fit=crop&crop=face' },
                { id: 9, name: 'Sonu Nigam', popularity: 84, fee: 2800000, voice: 'Male', specialty: 'Versatile Singer', photo: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face' },
                { id: 10, name: 'Asees Kaur', popularity: 78, fee: 2000000, voice: 'Female', specialty: 'Punjabi Contemporary', photo: 'https://images.unsplash.com/photo-1494790108755-2616b612b637?w=150&h=150&fit=crop&crop=face' },
                ...this.generateMoreSingers(11, 60) // Generate remaining singers
            ],

            distributors: [
                { id: 1, name: 'Yash Raj Films Distribution', reach: 95, fee: 15000000, regions: 'Pan India', logo: 'https://via.placeholder.com/50x50/FFD700/000000?text=YRF' },
                { id: 2, name: 'Dharma Productions', reach: 90, fee: 12000000, regions: 'Urban Markets', logo: 'https://via.placeholder.com/50x50/FF6B35/FFFFFF?text=DP' },
                { id: 3, name: 'T-Series Distribution', reach: 88, fee: 10000000, regions: 'Mass Markets', logo: 'https://via.placeholder.com/50x50/4CAF50/FFFFFF?text=TS' },
                { id: 4, name: 'Eros International', reach: 85, fee: 8000000, regions: 'Multiplex Chain', logo: 'https://via.placeholder.com/50x50/2196F3/FFFFFF?text=EI' },
                { id: 5, name: 'Reliance Entertainment', reach: 82, fee: 7000000, regions: 'Tier 1 Cities', logo: 'https://via.placeholder.com/50x50/9C27B0/FFFFFF?text=RE' },
                ...this.generateMoreDistributors(6, 25) // Generate remaining distributors
            ]
        };
    }

    // Generate additional actors (helper method)
    generateMoreActors(startId, endId) {
        const additionalActors = [];
        const maleNames = ['Vicky Kaushal', 'Sidharth Malhotra', 'Arjun Kapoor', 'Aditya Roy Kapur', 'Sushant Singh Rajput', 'Ishaan Khatter', 'Janhvi Kapoor', 'Sara Ali Khan', 'Ananya Panday', 'Tara Sutaria', 'Kriti Sanon', 'Kiara Advani', 'Disha Patani', 'Shraddha Kapoor', 'Jacqueline Fernandez', 'Sonakshi Sinha', 'Parineeti Chopra', 'Bhumi Pednekar', 'Yami Gautam', 'Taapsee Pannu'];
        
        for (let i = startId; i <= endId; i++) {
            const isMale = i % 2 === 0;
            const nameIndex = (i - startId) % maleNames.length;
            const photoGender = isMale ? 'men' : 'women';
            const photoNum = (i % 50) + 1;
            
            additionalActors.push({
                id: i,
                name: maleNames[nameIndex] || `Actor ${i}`,
                popularity: Math.floor(Math.random() * 40) + 50, // 50-90
                acting: Math.floor(Math.random() * 30) + 60, // 60-90
                bankability: Math.floor(Math.random() * 35) + 55, // 55-90
                fee: Math.floor(Math.random() * 80000000) + 20000000, // 2-10 crores
                genre: ['Drama', 'Romance', 'Comedy', 'Action'][Math.floor(Math.random() * 4)],
                age: Math.floor(Math.random() * 20) + 25, // 25-45
                phase: ['Rising', 'Established', 'Prime'][Math.floor(Math.random() * 3)],
                photo: `https://randomuser.me/api/portraits/${photoGender}/${photoNum}.jpg`
            });
        }
        return additionalActors;
    }

    // Generate additional directors, producers, etc. (similar pattern)
    generateMoreDirectors(startId, endId) {
        const directorNames = ['Aanand L. Rai', 'Kabir Khan', 'Nitesh Tiwari', 'Ashutosh Gowariker', 'Vikramaditya Motwane'];
        return Array.from({length: endId - startId + 1}, (_, i) => ({
            id: startId + i,
            name: directorNames[i % directorNames.length] || `Director ${startId + i}`,
            skill: Math.floor(Math.random() * 25) + 65,
            specialty: ['Drama', 'Comedy', 'Action', 'Thriller'][Math.floor(Math.random() * 4)],
            fee: Math.floor(Math.random() * 30000000) + 10000000,
            successRate: Math.floor(Math.random() * 30) + 60,
            photo: `https://randomuser.me/api/portraits/men/${((startId + i) % 50) + 1}.jpg`
        }));
    }

    generateMoreProducers(startId, endId) {
        const producerNames = ['Bhushan Kumar', 'Ritesh Sidhwani', 'Farhan Akhtar', 'Ronnie Screwvala'];
        return Array.from({length: endId - startId + 1}, (_, i) => ({
            id: startId + i,
            name: producerNames[i % producerNames.length] || `Producer ${startId + i}`,
            influence: Math.floor(Math.random() * 20) + 70,
            fee: Math.floor(Math.random() * 20000000) + 10000000,
            connections: Math.floor(Math.random() * 25) + 75,
            photo: `https://randomuser.me/api/portraits/men/${((startId + i) % 50) + 1}.jpg`
        }));
    }

    generateMoreMusicDirectors(startId, endId) {
        const musicNames = ['Divine', 'Nucleya', 'Ritviz', 'Prateek Kuhad', 'Armaan Malik'];
        return Array.from({length: endId - startId + 1}, (_, i) => ({
            id: startId + i,
            name: musicNames[i % musicNames.length] || `Music Director ${startId + i}`,
            skill: Math.floor(Math.random() * 20) + 70,
            fee: Math.floor(Math.random() * 10000000) + 5000000,
            specialty: ['Pop', 'Rock', 'Electronic', 'Folk'][Math.floor(Math.random() * 4)],
            awards: 'Rising Star',
            photo: `https://randomuser.me/api/portraits/men/${((startId + i) % 50) + 1}.jpg`
        }));
    }

    generateMoreSingers(startId, endId) {
        const singerNames = ['Jubin Nautiyal', 'Dhvani Bhanushali', 'Guru Randhawa', 'Yo Yo Honey Singh'];
        return Array.from({length: endId - startId + 1}, (_, i) => ({
            id: startId + i,
            name: singerNames[i % singerNames.length] || `Singer ${startId + i}`,
            popularity: Math.floor(Math.random() * 25) + 65,
            fee: Math.floor(Math.random() * 2000000) + 1000000,
            voice: i % 2 === 0 ? 'Male' : 'Female',
            specialty: ['Pop', 'Romantic', 'Dance', 'Folk'][Math.floor(Math.random() * 4)],
            photo: `https://randomuser.me/api/portraits/${i % 2 === 0 ? 'men' : 'women'}/${((startId + i) % 50) + 1}.jpg`
        }));
    }

    generateMoreDistributors(startId, endId) {
        const distributorNames = ['PVR Pictures', 'Zee Studios', 'Sony Pictures', 'Fox Star Studios'];
        return Array.from({length: endId - startId + 1}, (_, i) => ({
            id: startId + i,
            name: distributorNames[i % distributorNames.length] || `Distributor ${startId + i}`,
            reach: Math.floor(Math.random() * 20) + 60,
            fee: Math.floor(Math.random() * 5000000) + 3000000,
            regions: ['North India', 'South India', 'West India', 'East India'][Math.floor(Math.random() * 4)],
            logo: `https://via.placeholder.com/50x50/00${Math.floor(Math.random() * 9)}${Math.floor(Math.random() * 9)}${Math.floor(Math.random() * 9)}/FFFFFF?text=${String.fromCharCode(65 + i)}`
        }));
    }

    // Initialize Enhanced Genres (15+ genres)
    initializeGenres() {
        return {
            romance: { name: 'Romance', marketAppeal: 85, budget: 'medium', icon: 'fa-heart', color: '#e91e63' },
            action: { name: 'Action', marketAppeal: 92, budget: 'high', icon: 'fa-fist-raised', color: '#f44336' },
            comedy: { name: 'Comedy', marketAppeal: 88, budget: 'low', icon: 'fa-laugh', color: '#ffeb3b' },
            drama: { name: 'Drama', marketAppeal: 82, budget: 'medium', icon: 'fa-theater-masks', color: '#2196f3' },
            thriller: { name: 'Thriller', marketAppeal: 84, budget: 'medium', icon: 'fa-eye', color: '#9c27b0' },
            horror: { name: 'Horror', marketAppeal: 72, budget: 'low', icon: 'fa-ghost', color: '#424242' },
            historical: { name: 'Historical', marketAppeal: 78, budget: 'very_high', icon: 'fa-crown', color: '#ff9800' },
            biopic: { name: 'Biopic', marketAppeal: 80, budget: 'high', icon: 'fa-user', color: '#4caf50' },
            scifi: { name: 'Sci-Fi', marketAppeal: 75, budget: 'very_high', icon: 'fa-rocket', color: '#00bcd4' },
            fantasy: { name: 'Fantasy', marketAppeal: 73, budget: 'very_high', icon: 'fa-magic', color: '#673ab7' },
            musical: { name: 'Musical', marketAppeal: 77, budget: 'medium', icon: 'fa-music', color: '#ff5722' },
            sports: { name: 'Sports', marketAppeal: 79, budget: 'medium', icon: 'fa-trophy', color: '#795548' },
            war: { name: 'War', marketAppeal: 81, budget: 'very_high', icon: 'fa-shield-alt', color: '#607d8b' },
            family: { name: 'Family', marketAppeal: 86, budget: 'medium', icon: 'fa-home', color: '#8bc34a' },
            crime: { name: 'Crime', marketAppeal: 76, budget: 'medium', icon: 'fa-mask', color: '#3f51b5' },
            adventure: { name: 'Adventure', marketAppeal: 74, budget: 'high', icon: 'fa-mountain', color: '#009688' }
        };
    }

    // Initialize Enhanced Marketing Strategies
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
            },
            {
                id: 'festival_selection',
                title: '🎬 Film Festival Selection',
                description: 'Your movie gets selected for Cannes Film Festival!',
                probability: 5,
                impact: { reputation: 30, international: 45, awards: 20 }
            }
        ];
    }

    // Setup Event Listeners
    setupEventListeners() {
        // Game Start Events
        document.getElementById('new-game-btn')?.addEventListener('click', () => this.startNewGame());
        document.getElementById('load-game-btn')?.addEventListener('click', () => this.loadGame());
        
        // Money Management
        document.getElementById('money-container')?.addEventListener('click', () => this.openMoneyManagement());
        
        // Tab Navigation
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.addEventListener('click', (e) => this.switchTab(e.target.closest('.tab-btn').dataset.tab));
        });

        // Profile Creation
        document.getElementById('start-game')?.addEventListener('click', () => this.createCharacter());
        document.getElementById('design-logo-btn')?.addEventListener('click', () => this.openLogoDesigner());
        
        // Logo Designer
        document.getElementById('generate-logo')?.addEventListener('click', () => this.generateCustomLogo());
        document.getElementById('save-logo')?.addEventListener('click', () => this.saveCustomLogo());
        document.getElementById('close-designer')?.addEventListener('click', () => this.closeLogoDesigner());

        // Script Creation
        document.getElementById('create-script')?.addEventListener('click', () => this.createScript());

        // Cast Search and Filter
        document.getElementById('search-cast')?.addEventListener('input', (e) => this.searchCast(e.target.value));
        document.getElementById('filter-budget')?.addEventListener('change', (e) => this.filterCastByBudget(e.target.value));
        document.getElementById('filter-genre')?.addEventListener('change', (e) => this.filterCastByGenre(e.target.value));

        // Category Switching
        document.querySelectorAll('.cat-tab').forEach(tab => {
            tab.addEventListener('click', (e) => this.switchCastCategory(e.target.dataset.category));
        });

        // Production Actions
        document.getElementById('speed-up-production')?.addEventListener('click', () => this.speedUpProduction());
        document.getElementById('halt-production')?.addEventListener('click', () => this.haltProduction());

        // Loan Applications
        document.querySelectorAll('.loan-btn').forEach(btn => {
            btn.addEventListener('click', (e) => this.applyForLoan(e.target));
        });

        // Promo Code System
        document.getElementById('apply-promo')?.addEventListener('click', () => this.applyPromoCode());

        // Suggestion buttons
        document.querySelectorAll('.suggestion-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                document.getElementById('studio-name').value = e.target.textContent;
            });
        });

        // Modal close events
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('modal-overlay')) {
                e.target.style.display = 'none';
            }
        });
    }

    // Start New Game
    startNewGame() {
        const selectedBudget = document.querySelector('input[name="starting-budget"]:checked');
        if (selectedBudget) {
            this.gameData.player.money = parseInt(selectedBudget.value);
        }
        
        document.getElementById('game-start-modal').style.display = 'none';
        this.setupGameInterface();
    }

    // Load Existing Game
    loadGame() {
        const savedData = localStorage.getItem('movieSimulatorSave');
        if (savedData) {
            this.gameData = JSON.parse(savedData);
            document.getElementById('game-start-modal').style.display = 'none';
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
        this.updateUI();
    }

    // Generate Avatar Options in UI
    generateAvatarOptions() {
        const avatarGrid = document.getElementById('avatar-grid');
        if (!avatarGrid) return;

        avatarGrid.innerHTML = '';
        this.avatarOptions.forEach(avatar => {
            const avatarDiv = document.createElement('div');
            avatarDiv.className = 'avatar-option';
            avatarDiv.dataset.avatar = avatar.id;
            avatarDiv.innerHTML = `<img src="${avatar.src}" alt="${avatar.alt}" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
                                   <i class="fas fa-user" style="display:none;"></i>`;
            
            avatarDiv.addEventListener('click', () => this.selectAvatar(avatar.id, avatar.src));
            avatarGrid.appendChild(avatarDiv);
        });
    }

    // Generate Logo Options in UI
    generateLogoOptions() {
        const logoGrid = document.getElementById('logo-grid');
        if (!logoGrid) return;

        logoGrid.innerHTML = '';
        this.logoOptions.forEach(logo => {
            const logoDiv = document.createElement('div');
            logoDiv.className = 'logo-option';
            logoDiv.dataset.logo = logo.id;
            logoDiv.style.background = logo.bg;
            logoDiv.style.color = logo.color;
            logoDiv.innerHTML = `<i class="${logo.icon}"></i>`;
            
            logoDiv.addEventListener('click', () => this.selectLogo(logo.id, logo));
            logoGrid.appendChild(logoDiv);
        });
    }

    // Generate Genre Options in UI
    generateGenreOptions() {
        const genreGrid = document.getElementById('genre-grid');
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
                <p>Budget: ${genre.budget}</p>
            `;
            
            genreDiv.addEventListener('click', () => this.selectGenre(key));
            genreGrid.appendChild(genreDiv);
        });
    }

    // Select Avatar
    selectAvatar(avatarId, src) {
        document.querySelectorAll('.avatar-option').forEach(option => {
            option.classList.remove('selected');
        });
        document.querySelector(`[data-avatar="${avatarId}"]`).classList.add('selected');
        
        this.gameData.player.avatar = src;
        this.showNotification('Avatar selected!', 'success');
    }

    // Select Studio Logo
    selectLogo(logoId, logoData) {
        document.querySelectorAll('.logo-option').forEach(option => {
            option.classList.remove('selected');
        });
        document.querySelector(`[data-logo="${logoId}"]`).classList.add('selected');
        
        this.gameData.player.studioLogo = logoData;
        this.showNotification('Studio logo selected!', 'success');
    }

    // Create Character
    createCharacter() {
        const characterName = document.getElementById('character-name').value.trim();
        const studioName = document.getElementById('studio-name').value.trim();

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
        this.gameData.gameStarted = true;

        // Update studio display
        const studioLogoDisplay = document.getElementById('studio-logo-display');
        const studioNameDisplay = document.getElementById('studio-name-display');
        
        if (studioLogoDisplay && studioNameDisplay) {
            if (this.gameData.player.studioLogo.src) {
                studioLogoDisplay.src = this.gameData.player.studioLogo.src;
            } else {
                studioLogoDisplay.innerHTML = `<i class="${this.gameData.player.studioLogo.icon}" style="color: ${this.gameData.player.studioLogo.color}; font-size: 3rem;"></i>`;
                studioLogoDisplay.style.display = 'flex';
                studioLogoDisplay.style.alignItems = 'center';
                studioLogoDisplay.style.justifyContent = 'center';
                studioLogoDisplay.style.background = this.gameData.player.studioLogo.bg;
            }
            studioNameDisplay.textContent = studioName;
        }

        this.showNotification(`Welcome ${characterName}! ${studioName} is ready to create blockbusters!`, 'success');
        this.switchTab('studio');
        this.updateUI();
        this.saveGame();
    }

    // Open Logo Designer
    openLogoDesigner() {
        document.getElementById('logo-designer-modal').style.display = 'flex';
        document.getElementById('logo-text').value = this.gameData.player.studioName || 'STUDIO';
    }

    // Generate Custom Logo
    generateCustomLogo() {
        const canvas = document.getElementById('logo-canvas');
        const ctx = canvas.getContext('2d');
        const text = document.getElementById('logo-text').value || 'STUDIO';
        const color = document.getElementById('logo-color').value;
        const font = document.getElementById('logo-font').value;

        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Set background
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Draw border
        ctx.strokeStyle = color;
        ctx.lineWidth = 4;
        ctx.strokeRect(10, 10, canvas.width - 20, canvas.height - 20);
        
        // Draw text
        ctx.fillStyle = color;
        ctx.font = `bold 24px ${font}`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(text, canvas.width / 2, canvas.height / 2);
        
        // Add decorative elements
        ctx.beginPath();
        ctx.arc(50, 50, 15, 0, 2 * Math.PI);
        ctx.fillStyle = color;
        ctx.fill();
        
        ctx.beginPath();
        ctx.arc(150, 150, 15, 0, 2 * Math.PI);
        ctx.fillStyle = color;
        ctx.fill();
    }

    // Save Custom Logo
    saveCustomLogo() {
        const canvas = document.getElementById('logo-canvas');
        const logoDataUrl = canvas.toDataURL('image/png');
        
        this.gameData.player.studioLogo = {
            id: 'custom',
            src: logoDataUrl,
            type: 'custom'
        };
        
        this.showNotification('Custom logo saved!', 'success');
        this.closeLogoDesigner();
    }

    // Close Logo Designer
    closeLogoDesigner() {
        document.getElementById('logo-designer-modal').style.display = 'none';
    }

    // Tab Switching
    switchTab(tabName) {
        document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
        document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));

        document.querySelector(`[data-tab="${tabName}"]`)?.classList.add('active');
        document.getElementById(`${tabName}-tab`)?.classList.add('active');

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

    // Open Money Management
    openMoneyManagement() {
        this.switchTab('finances');
    }

    // Select Genre
    selectGenre(genreKey) {
        document.querySelectorAll('.genre-card').forEach(card => {
            card.classList.remove('selected');
        });
        document.querySelector(`[data-genre="${genreKey}"]`)?.classList.add('selected');
        
        if (!this.currentProject) {
            this.currentProject = {};
        }
        this.currentProject.genre = genreKey;
        this.showNotification(`${this.genres[genreKey].name} genre selected!`, 'success');
    }

    // Create Script
    createScript() {
        if (!this.gameData.gameStarted) {
            this.showNotification('Please create your character first!', 'error');
            return;
        }

        const selectedGenre = document.querySelector('.genre-card.selected');
        const developmentTime = document.querySelector('input[name="dev-time"]:checked');
        const budgetRange = document.querySelector('input[name="budget-range"]:checked');

        if (!selectedGenre) {
            this.showNotification('Please select a genre first!', 'error');
            return;
        }

        const genre = selectedGenre.dataset.genre;
        const devTime = parseInt(developmentTime?.value || 60);
        const budget = budgetRange?.value || 'medium';
        
        // Calculate script quality based on time investment
        let quality = 50 + (devTime - 30) * 0.8;
        quality = Math.min(100, Math.max(20, quality + Math.random() * 20 - 10));

        // Calculate development cost
        const developmentCost = devTime * 100000; // ₹1 lakh per day
        
        if (this.gameData.player.money < developmentCost) {
            this.showNotification('Not enough money for script development!', 'error');
            return;
        }

        this.gameData.player.money -= developmentCost;
        this.gameData.player.totalExpenses += developmentCost;

        this.currentProject = {
            id: Date.now(),
            genre: genre,
            budgetRange: budget,
            developmentTime: devTime,
            scriptQuality: Math.round(quality),
            developmentCost: developmentCost,
            status: 'script_ready',
            phase: 'planning',
            progress: 15,
            cast: [],
            crew: [],
            totalCost: developmentCost,
            title: this.generateMovieTitle(genre)
        };

        this.showNotification(`Script "${this.currentProject.title}" created! Quality: ${Math.round(quality)}%`, 'success');
        this.switchTab('casting');
        this.updateUI();
        this.saveGame();
    }

    // Generate Movie Title
    generateMovieTitle(genre) {
        const titles = {
            romance: ['Love Story', 'Heart Connection', 'Romantic Nights', 'True Love', 'Love Forever', 'Heart Beats'],
            action: ['Action Hero', 'Fight Night', 'Warrior', 'Battle Cry', 'Combat Zone', 'Strike Force'],
            comedy: ['Laugh Out Loud', 'Comedy Kings', 'Fun Time', 'Hilarious', 'Joke Master', 'Funny Business'],
            drama: ['Life Story', 'Emotional Journey', 'Deep Thoughts', 'Real Life', 'Human Drama', 'Life Lessons'],
            thriller: ['Mystery Man', 'Dark Secrets', 'Suspense', 'Hidden Truth', 'Dangerous Game', 'Night Thriller'],
            horror: ['Scary Night', 'Haunted House', 'Fear Factor', 'Dark Shadows', 'Ghost Story', 'Terror Night'],
            historical: ['Ancient Times', 'Royal Story', 'Historical Epic', 'Kings Tale', 'Empire Rising', 'Legend Born'],
            biopic: ['Life Story', 'True Hero', 'Real Legend', 'Inspiring Journey', 'Champion Story', 'Hero Born'],
            scifi: ['Future World', 'Space Mission', 'Sci-Fi Adventure', 'Galaxy Wars', 'Time Travel', 'Robot Revolution'],
            fantasy: ['Magic World', 'Fantasy Land', 'Mystic Journey', 'Magical Powers', 'Dragon Quest', 'Fairy Tale'],
            musical: ['Song Story', 'Music Magic', 'Dancing Dreams', 'Melody Masters', 'Rhythm Nation', 'Beat Street'],
            sports: ['Champion Game', 'Victory Story', 'Sports Hero', 'Winning Spirit', 'Game Changer', 'Gold Medal'],
            war: ['Battle Field', 'War Hero', 'Combat Story', 'Victory March', 'Brave Soldiers', 'War Chronicles'],
            family: ['Family Bonds', 'Home Sweet Home', 'Family Values', 'Together Forever', 'Family First', 'Happy Family'],
            crime: ['Crime Master', 'Dark City', 'Law Breaker', 'Criminal Mind', 'Justice Served', 'Crime Story'],
            adventure: ['Adventure Quest', 'Journey Begins', 'Explorer', 'Wild Adventure', 'Treasure Hunt', 'Epic Journey']
        };
        
        const genreTitles = titles[genre] || titles.drama;
        return genreTitles[Math.floor(Math.random() * genreTitles.length)] + ` ${Math.floor(Math.random() * 100) + 1}`;
    }

    // Update Casting Tab
    updateCastingTab() {
        this.switchCastCategory('actors');
    }

    // Switch Cast Category
    switchCastCategory(category) {
        document.querySelectorAll('.cat-tab').forEach(tab => tab.classList.remove('active'));
        document.querySelector(`[data-category="${category}"]`)?.classList.add('active');
        
        this.updateCastGrid(category);
    }

    // Update Cast Grid
    updateCastGrid(category) {
        const grid = document.getElementById('cast-grid');
        if (!grid) return;

        grid.innerHTML = '';

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

        celebrities.forEach(celebrity => {
            const card = this.createCastCard(celebrity, category);
            grid.appendChild(card);
        });
    }

    // Create Cast Card with Real Photos
    createCastCard(celebrity, category) {
        const card = document.createElement('div');
        card.className = 'cast-card';
        
        let stats = '';
        let fee = this.formatCurrency(celebrity.fee);
        
        if (category === 'actors') {
            stats = `
                <div class="cast-stats">
                    <span>Popularity: ${celebrity.popularity}</span>
                    <span>Acting: ${celebrity.acting}</span>
                    <span>Bankability: ${celebrity.bankability}</span>
                    <span>Age: ${celebrity.age}</span>
                    <span>Phase: ${celebrity.phase}</span>
                </div>
            `;
        } else if (category === 'directors') {
            stats = `
                <div class="cast-stats">
                    <span>Skill: ${celebrity.skill}</span>
                    <span>Specialty: ${celebrity.specialty}</span>
                    <span>Success Rate: ${celebrity.successRate}%</span>
                </div>
            `;
        } else if (category === 'producers') {
            stats = `
                <div class="cast-stats">
                    <span>Influence: ${celebrity.influence}</span>
                    <span>Connections: ${celebrity.connections}</span>
                </div>
            `;
        } else if (category === 'music') {
            stats = `
                <div class="cast-stats">
                    <span>Skill: ${celebrity.skill}</span>
                    <span>Specialty: ${celebrity.specialty}</span>
                    <span>Awards: ${celebrity.awards}</span>
                </div>
            `;
        } else if (category === 'singers') {
            stats = `
                <div class="cast-stats">
                    <span>Popularity: ${celebrity.popularity}</span>
                    <span>Voice: ${celebrity.voice}</span>
                    <span>Specialty: ${celebrity.specialty}</span>
                </div>
            `;
        } else if (category === 'distributors') {
            stats = `
                <div class="cast-stats">
                    <span>Reach: ${celebrity.reach}%</span>
                    <span>Regions: ${celebrity.regions}</span>
                </div>
            `;
            fee = this.formatCurrency(celebrity.fee) + ' (Commission)';
        }

        const photoSrc = celebrity.photo || celebrity.logo || 'https://via.placeholder.com/80x80/ffd700/000000?text=' + celebrity.name.charAt(0);
        
        card.innerHTML = `
            <div class="cast-avatar">
                <img src="${photoSrc}" alt="${celebrity.name}" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
                <i class="fas fa-user-circle" style="display:none; font-size: 3.5rem; color: var(--secondary-color);"></i>
            </div>
            <h4>${celebrity.name}</h4>
            ${stats}
            <p class="cast-fee">${fee}</p>
            <button class="hire-btn" ${this.isHired(celebrity.id, category) ? 'disabled' : ''}>
                ${this.isHired(celebrity.id, category) ? 'Hired' : 'Hire'}
            </button>
        `;

        const hireBtn = card.querySelector('.hire-btn');
        if (!hireBtn.disabled) {
            hireBtn.addEventListener('click', () => this.hireCelebrity(celebrity, category));
        }

        return card;
    }

    // Check if celebrity is already hired
    isHired(celebrityId, category) {
        if (!this.currentProject) return false;
        
        if (category === 'actors') {
            return this.currentProject.cast.some(actor => actor.id === celebrityId);
        } else {
            return this.currentProject.crew.some(crew => crew.id === celebrityId && crew.type === category);
        }
    }

    // Hire Celebrity
    hireCelebrity(celebrity, category) {
        if (!this.currentProject) {
            this.showNotification('Create a script first!', 'error');
            return;
        }

        if (this.gameData.player.money < celebrity.fee) {
            this.showNotification('Not enough money to hire this celebrity!', 'error');
            return;
        }

        // Check hiring limits
        if (category === 'actors' && this.currentProject.cast.length >= 5) {
            this.showNotification('Maximum 5 actors allowed per movie!', 'error');
            return;
        }

        // Deduct money and hire
        this.gameData.player.money -= celebrity.fee;
        this.gameData.player.totalExpenses += celebrity.fee;
        this.currentProject.totalCost += celebrity.fee;
        
        if (category === 'actors') {
            this.currentProject.cast.push(celebrity);
        } else {
            this.currentProject.crew.push({ ...celebrity, type: category });
        }

        this.showNotification(`${celebrity.name} hired successfully!`, 'success');
        this.updateCastGrid(category); // Refresh grid to show hired status
        this.updateUI();
        this.saveGame();
    }

    // Search Cast
    searchCast(query) {
        const cards = document.querySelectorAll('.cast-card');
        cards.forEach(card => {
            const name = card.querySelector('h4').textContent.toLowerCase();
            if (name.includes(query.toLowerCase())) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    }

    // Filter Cast by Budget
    filterCastByBudget(budgetRange) {
        const cards = document.querySelectorAll('.cast-card');
        cards.forEach(card => {
            const feeText = card.querySelector('.cast-fee').textContent;
            const fee = parseInt(feeText.replace(/[^\d]/g, ''));
            
            let showCard = true;
            if (budgetRange === 'low' && fee > 50000000) showCard = false;
            if (budgetRange === 'medium' && (fee < 50000000 || fee > 200000000)) showCard = false;
            if (budgetRange === 'high' && fee < 200000000) showCard = false;
            
            card.style.display = showCard ? 'block' : 'none';
        });
    }

    // Filter Cast by Genre
    filterCastByGenre(genre) {
        // Implementation for genre-based filtering
        // This would filter celebrities based on their specialty/genre preferences
    }

    // Apply for Loan
    applyForLoan(button) {
        const amount = parseInt(button.dataset.amount);
        const interest = parseInt(button.dataset.interest);
        
        if (this.gameData.player.loans.length >= 3) {
            this.showNotification('Maximum 3 loans allowed at a time!', 'error');
            return;
        }

        const loan = {
            id: Date.now(),
            amount: amount,
            interest: interest,
            monthlyPayment: Math.round((amount * (interest / 100)) / 12),
            remainingAmount: amount,
            term: button.textContent.includes('2 years') ? 24 : button.textContent.includes('3 years') ? 36 : 60
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

    // Apply Promo Code (Sandbox Cheat System)
    applyPromoCode() {
        const code = document.getElementById('promo-code').value.toUpperCase().trim();
        
        const promoCodes = {
            'SANDBOX': () => {
                this.gameData.player.money *= 2;
                this.showNotification('🎮 Sandbox Mode: Money Doubled!', 'success');
            },
            'RICHMODE': () => {
                this.gameData.player.money += 1000000000; // ₹100 crores
                this.showNotification('💰 Rich Mode: ₹100 Crores Added!', 'success');
            },
            'GODMODE': () => {
                this.gameData.player.money = 5000000000; // ₹500 crores
                this.gameData.player.reputation = 100;
                this.gameData.player.studioLevel = 10;
                this.showNotification('👑 God Mode: Ultimate Power!', 'success');
            },
            'RESETMONEY': () => {
                this.gameData.player.money = 5000000; // Reset to starting amount
                this.showNotification('🔄 Money Reset to Starting Amount!', 'success');
            },
            'SUPERSTAR': () => {
                this.gameData.player.reputation = 100;
                this.showNotification('⭐ Superstar Status Achieved!', 'success');
            },
            'FREELOAN': () => {
                this.gameData.player.loans = [];
                this.showNotification('🏦 All Loans Cleared!', 'success');
            }
        };

        if (promoCodes[code]) {
            promoCodes[code]();
            document.getElementById('promo-code').value = '';
            this.updateUI();
            this.saveGame();
        } else {
            this.showNotification('Invalid promo code!', 'error');
        }
    }

    // Speed Up Production
    speedUpProduction() {
        if (!this.currentProject) {
            this.showNotification('No active project to speed up!', 'error');
            return;
        }

        const cost = 5000000; // ₹50 lakhs
        if (this.gameData.player.money < cost) {
            this.showNotification('Not enough money to speed up production!', 'error');
            return;
        }

        this.gameData.player.money -= cost;
        this.currentProject.progress = Math.min(100, this.currentProject.progress + 25);
        this.currentProject.totalCost += cost;

        this.showNotification('Production sped up by 25%!', 'success');
        this.updateProductionTab();
        this.updateUI();
        this.saveGame();
    }

    // Halt Production
    haltProduction() {
        if (!this.currentProject) {
            this.showNotification('No active project to halt!', 'error');
            return;
        }

        this.showNotification('Production halted. You can resume anytime.', 'warning');
        this.currentProject.status = 'halted';
        this.saveGame();
    }

    // Update Production Tab
    updateProductionTab() {
        if (!this.currentProject) {
            document.getElementById('movie-details').innerHTML = '<p>No active project. Create a script to start!</p>';
            return;
        }

        const movieDetails = document.getElementById('movie-details');
        movieDetails.innerHTML = `
            <div class="current-movie-card">
                <h4>${this.currentProject.title}</h4>
                <p><strong>Genre:</strong> ${this.genres[this.currentProject.genre]?.name}</p>
                <p><strong>Script Quality:</strong> ${this.currentProject.scriptQuality}%</p>
                <p><strong>Cast:</strong> ${this.currentProject.cast.length} actors hired</p>
                <p><strong>Crew:</strong> ${this.currentProject.crew.length} members hired</p>
                <p><strong>Total Cost:</strong> ${this.formatCurrency(this.currentProject.totalCost)}</p>
                <p><strong>Status:</strong> ${this.currentProject.status}</p>
            </div>
        `;

        // Update phase tracker
        const phases = document.querySelectorAll('.phase');
        phases.forEach((phase, index) => {
            const progress = Math.min(100, Math.max(0, (this.currentProject.progress - (index * 20))));
            phase.querySelector('.phase-progress').textContent = `${Math.round(progress)}%`;
            
            if (progress > 0) {
                phase.classList.add('active');
            }
            if (progress >= 100) {
                phase.classList.add('completed');
                phase.classList.remove('active');
            }
        });
    }

    // Update Box Office Tab
    updateBoxOfficeTab() {
        if (this.gameData.completedMovies.length === 0) {
            document.getElementById('total-collection').textContent = '0';
            document.getElementById('week1-collection').textContent = '₹0';
            document.getElementById('week2-collection').textContent = '₹0';
            document.getElementById('week3-collection').textContent = '₹0';
            document.getElementById('week4-collection').textContent = '₹0';
            return;
        }

        const lastMovie = this.gameData.completedMovies[this.gameData.completedMovies.length - 1];
        const collection = lastMovie.boxOfficeCollection || 0;
        
        // Display in crores
        const crores = Math.round(collection / 10000000 * 100) / 100;
        document.getElementById('total-collection').textContent = crores.toString();
        
        // Weekly breakdown
        document.getElementById('week1-collection').textContent = this.formatCurrency(Math.round(collection * 0.45));
        document.getElementById('week2-collection').textContent = this.formatCurrency(Math.round(collection * 0.25));
        document.getElementById('week3-collection').textContent = this.formatCurrency(Math.round(collection * 0.20));
        document.getElementById('week4-collection').textContent = this.formatCurrency(Math.round(collection * 0.10));

        // Revenue sources
        document.getElementById('theatrical-collection').textContent = this.formatCurrency(Math.round(collection * 0.70));
        document.getElementById('ott-collection').textContent = this.formatCurrency(Math.round(collection * 0.15));
        document.getElementById('music-collection').textContent = this.formatCurrency(Math.round(collection * 0.10));
        document.getElementById('satellite-collection').textContent = this.formatCurrency(Math.round(collection * 0.05));
    }

    // Update Finances Tab
    updateFinancesTab() {
        const totalIncome = this.gameData.player.totalIncome;
        const totalExpenses = this.gameData.player.totalExpenses;
        const netProfit = totalIncome - totalExpenses;
        const totalDebt = this.gameData.player.loans.reduce((sum, loan) => sum + loan.remainingAmount, 0);

        document.getElementById('current-balance').textContent = this.formatCurrency(this.gameData.player.money);
        document.getElementById('total-income').textContent = this.formatCurrency(totalIncome);
        document.getElementById('total-expenses').textContent = this.formatCurrency(totalExpenses);
        document.getElementById('net-profit').textContent = this.formatCurrency(netProfit);
        document.getElementById('total-debt').textContent = this.formatCurrency(totalDebt);
    }

    // Update UI
    updateUI() {
        // Update header stats
        document.getElementById('money').textContent = this.formatCurrency(this.gameData.player.money);
        document.getElementById('reputation').textContent = this.gameData.player.reputation;
        document.getElementById('studio-level').textContent = `Level ${this.gameData.player.studioLevel}`;
        document.getElementById('awards').textContent = this.gameData.achievements.length;

        // Update studio stats
        document.getElementById('current-level').textContent = this.gameData.player.studioLevel;
        document.getElementById('staff-count').textContent = this.gameData.staff.length;
        document.getElementById('awards-count').textContent = this.gameData.achievements.length;
        document.getElementById('movies-count').textContent = this.gameData.completedMovies.length;
    }

    // Show Notification
    showNotification(message, type = 'info', duration = 3000) {
        const modal = document.getElementById('notification-modal');
        const icon = modal.querySelector('.notification-icon');
        const title = modal.querySelector('.notification-title');
        const messageEl = modal.querySelector('.notification-message');
        const okBtn = modal.querySelector('.notification-ok');

        // Set icon based on type
        const icons = {
            success: 'fas fa-check-circle',
            error: 'fas fa-exclamation-triangle',
            warning: 'fas fa-exclamation-circle',
            info: 'fas fa-info-circle'
        };

        const colors = {
            success: '#4CAF50',
            error: '#f44336',
            warning: '#ff9800',
            info: '#2196f3'
        };

        icon.className = `notification-icon ${icons[type]}`;
        icon.style.color = colors[type];
        title.textContent = type.charAt(0).toUpperCase() + type.slice(1);
        messageEl.textContent = message;

        modal.style.display = 'flex';

        okBtn.onclick = () => {
            modal.style.display = 'none';
        };

        // Auto close after duration
        setTimeout(() => {
            modal.style.display = 'none';
        }, duration);
    }

    // Format Currency
    formatCurrency(amount) {
        return '₹' + amount.toLocaleString('en-IN');
    }

    // Save Game
    saveGame() {
        localStorage.setItem('movieSimulatorSave', JSON.stringify(this.gameData));
    }

    // Calculate Box Office Performance
    calculateBoxOfficePerformance() {
        if (!this.currentProject) return { totalCollection: 0 };

        let baseCollection = 50000000; // Base ₹5 crores
        
        // Factor in cast star power
        let starPower = 0;
        this.currentProject.cast.forEach(actor => {
            starPower += (actor.popularity * actor.bankability) / 100;
        });

        // Factor in director skill
        let directorSkill = 60; // Default
        this.currentProject.crew.forEach(crew => {
            if (crew.type === 'directors' || crew.type === 'director') {
                directorSkill = crew.skill || crew.skillLevel || 60;
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
        const multiplier = Math.max(0.5, (starPower / 100) * (directorSkill / 100) * scriptBonus * (genreAppeal / 100) * marketingBonus);
        const randomFactor = 0.7 + (Math.random() * 0.6); // 0.7 to 1.3 randomness
        const finalCollection = Math.round(baseCollection * multiplier * randomFactor);

        return {
            totalCollection: finalCollection,
            week1: Math.round(finalCollection * 0.45),
            week2: Math.round(finalCollection * 0.25),
            week3: Math.round(finalCollection * 0.20),
            week4: Math.round(finalCollection * 0.10)
        };
    }

    // Auto-save every 30 seconds
    startAutoSave() {
        setInterval(() => {
            if (this.gameData.gameStarted) {
                this.saveGame();
            }
        }, 30000);
    }
}

// Initialize the game when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.movieSimulator = new MovieProductionSimulator();
    
    // Start auto-save
    window.movieSimulator.startAutoSave();

    // Add visual effects for interactions
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('primary-btn') || 
            e.target.classList.contains('hire-btn') ||
            e.target.classList.contains('strategy-btn')) {
            
            // Button press animation
            e.target.style.transform = 'scale(0.95)';
            setTimeout(() => {
                e.target.style.transform = '';
            }, 150);

            // Particle effect
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
                animation: particleFloat 1.2s ease-out forwards;
            `;
            
            document.body.appendChild(particle);
            
            setTimeout(() => particle.remove(), 1200);
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
                transform: translateY(-80px) scale(0) rotate(360deg); 
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
            window.movieSimulator.showNotification('Game saved manually!', 'success', 1000);
        }
        
        if (e.key === 'Escape') {
            // Close any open modals
            document.querySelectorAll('.modal-overlay').forEach(modal => {
                modal.style.display = 'none';
            });
        }
    });

    // Add smooth scrolling for better UX
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add loading states for async operations
    const originalFetch = window.fetch;
    window.fetch = function(...args) {
        // Show loading indicator
        document.body.style.cursor = 'wait';
        
        return originalFetch.apply(this, args).finally(() => {
            // Hide loading indicator
            document.body.style.cursor = 'default';
        });
    };

    console.log('🎬 Movie Production Simulator Loaded Successfully!');
    console.log('💡 Pro Tips:');
    console.log('- Use Ctrl+S to save game manually');
    console.log('- Try promo codes: SANDBOX, RICHMODE, GODMODE');
    console.log('- Click on money to access loans and cheats');
    console.log('- Game auto-saves every 30 seconds');
});

// Additional utility functions for enhanced gameplay
const GameUtils = {
    // Calculate optimal release timing
    getOptimalReleaseWindow: () => {
        const seasons = {
            'Diwali': { multiplier: 1.8, competition: 'Very High', description: 'Festival season - maximum footfall' },
            'Eid': { multiplier: 1.6, competition: 'High', description: 'Religious festival - family audience' },
            'Christmas': { multiplier: 1.4, competition: 'Medium', description: 'Holiday season - urban markets' },
            'Summer': { multiplier: 1.3, competition: 'Medium', description: 'School holidays - youth audience' },
            'Regular': { multiplier: 1.0, competition: 'Low', description: 'Normal weekdays - steady business' }
        };
        return seasons;
    },

    // Generate realistic Indian names
    generateIndianName: (gender = 'random') => {
        const maleNames = ['Arjun', 'Vikram', 'Rohit', 'Amit', 'Suresh', 'Raj', 'Karan', 'Vinay', 'Ankit', 'Rahul'];
        const femaleNames = ['Priya', 'Anjali', 'Neha', 'Pooja', 'Kavya', 'Shreya', 'Riya', 'Meera', 'Sita', 'Radha'];
        const surnames = ['Sharma', 'Patel', 'Singh', 'Kumar', 'Gupta', 'Agarwal', 'Jain', 'Malhotra', 'Kapoor', 'Chopra'];
        
        let firstNames = gender === 'male' ? maleNames : gender === 'female' ? femaleNames : [...maleNames, ...femaleNames];
        let firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
        let surname = surnames[Math.floor(Math.random() * surnames.length)];
        
        return `${firstName} ${surname}`;
    },

    // Calculate movie success factors
    calculateSuccessFactors: (movie) => {
        const factors = {
            script: movie.scriptQuality * 0.25,
            cast: movie.cast.reduce((sum, actor) => sum + actor.popularity, 0) / movie.cast.length * 0.30,
            director: movie.crew.find(c => c.type === 'director')?.skill || 60 * 0.20,
            marketing: movie.marketingReach * 0.15,
            timing: 1.0 * 0.10 // Release timing factor
        };
        
        return factors;
    }
};

// Export for potential external use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { MovieProductionSimulator, GameUtils };
}
