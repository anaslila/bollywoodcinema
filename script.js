// ====================================
// BOLLYWOOD CINEMA v3.0 - PREMIUM SIMULATION
// ====================================

// Game State Management
const GameState = {
    version: "3.0",
    currentScreen: 'dashboard',
    gameTime: {
        week: 1,
        year: 1985,
        totalWeeks: 1
    },
    player: {
        studioName: "Your Studio",
        money: 10000,
        reputation: 0,
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

// Enhanced Industry Database with 50+ options each
const IndustryData = {
    writers: [
        { id: 'w1', name: 'Aarav Mehta', fee: 3, skill: 88, speed: 92, specialty: 'romance', avatar: '✍️' },
        { id: 'w2', name: 'Kavita Joshi', fee: 4, skill: 92, speed: 85, specialty: 'drama', avatar: '✍️' },
        { id: 'w3', name: 'Sameer Khan', fee: 2, skill: 78, speed: 95, specialty: 'action', avatar: '✍️' },
        { id: 'w4', name: 'Priya Iyer', fee: 3.5, skill: 85, speed: 88, specialty: 'comedy', avatar: '✍️' },
        { id: 'w5', name: 'Rohit Chawla', fee: 5, skill: 95, speed: 80, specialty: 'thriller', avatar: '✍️' },
        { id: 'w6', name: 'Meera Singh', fee: 2.5, skill: 82, speed: 90, specialty: 'family', avatar: '✍️' },
        { id: 'w7', name: 'Arjun Gupta', fee: 4.5, skill: 90, speed: 82, specialty: 'historical', avatar: '✍️' },
        { id: 'w8', name: 'Deepika Sharma', fee: 3.8, skill: 87, speed: 89, specialty: 'romance', avatar: '✍️' },
        { id: 'w9', name: 'Vikram Patel', fee: 3.2, skill: 83, speed: 91, specialty: 'action', avatar: '✍️' },
        { id: 'w10', name: 'Ananya Reddy', fee: 4.2, skill: 89, speed: 84, specialty: 'drama', avatar: '✍️' },
        { id: 'w11', name: 'Karan Malhotra', fee: 2.8, skill: 81, speed: 93, specialty: 'comedy', avatar: '✍️' },
        { id: 'w12', name: 'Shreya Nair', fee: 3.6, skill: 86, speed: 87, specialty: 'thriller', avatar: '✍️' },
        { id: 'w13', name: 'Rajesh Kumar', fee: 2.3, skill: 79, speed: 94, specialty: 'family', avatar: '✍️' },
        { id: 'w14', name: 'Pooja Agarwal', fee: 4.8, skill: 93, speed: 81, specialty: 'historical', avatar: '✍️' },
        { id: 'w15', name: 'Amit Verma', fee: 3.4, skill: 84, speed: 88, specialty: 'horror', avatar: '✍️' },
        { id: 'w16', name: 'Ritu Bansal', fee: 3.9, skill: 88, speed: 86, specialty: 'romance', avatar: '✍️' },
        { id: 'w17', name: 'Suresh Yadav', fee: 2.7, skill: 80, speed: 92, specialty: 'action', avatar: '✍️' },
        { id: 'w18', name: 'Neha Kapoor', fee: 4.1, skill: 90, speed: 83, specialty: 'drama', avatar: '✍️' },
        { id: 'w19', name: 'Manish Tiwari', fee: 3.1, skill: 82, speed: 90, specialty: 'comedy', avatar: '✍️' },
        { id: 'w20', name: 'Sonal Chopra', fee: 3.7, skill: 87, speed: 85, specialty: 'thriller', avatar: '✍️' },
        { id: 'w21', name: 'Rahul Saxena', fee: 2.9, skill: 81, speed: 91, specialty: 'family', avatar: '✍️' },
        { id: 'w22', name: 'Divya Bhatia', fee: 4.3, skill: 91, speed: 82, specialty: 'historical', avatar: '✍️' },
        { id: 'w23', name: 'Varun Singhal', fee: 2.6, skill: 78, speed: 95, specialty: 'horror', avatar: '✍️' },
        { id: 'w24', name: 'Priyanka Das', fee: 3.5, skill: 85, speed: 89, specialty: 'romance', avatar: '✍️' },
        { id: 'w25', name: 'Nikhil Jain', fee: 4.0, skill: 89, speed: 84, specialty: 'action', avatar: '✍️' },
        { id: 'w26', name: 'Kavya Mittal', fee: 3.3, skill: 83, speed: 88, specialty: 'drama', avatar: '✍️' },
        { id: 'w27', name: 'Siddharth Gupta', fee: 2.4, skill: 77, speed: 96, specialty: 'comedy', avatar: '✍️' },
        { id: 'w28', name: 'Tanvi Shah', fee: 3.8, skill: 86, speed: 87, specialty: 'thriller', avatar: '✍️' },
        { id: 'w29', name: 'Ashish Pandey', fee: 2.8, skill: 80, speed: 93, specialty: 'family', avatar: '✍️' },
        { id: 'w30', name: 'Ritika Sood', fee: 4.4, skill: 92, speed: 80, specialty: 'historical', avatar: '✍️' },
        { id: 'w31', name: 'Gaurav Singh', fee: 2.5, skill: 79, speed: 94, specialty: 'horror', avatar: '✍️' },
        { id: 'w32', name: 'Simran Kaul', fee: 3.6, skill: 85, speed: 88, specialty: 'romance', avatar: '✍️' },
        { id: 'w33', name: 'Abhishek Roy', fee: 3.9, skill: 87, speed: 86, specialty: 'action', avatar: '✍️' },
        { id: 'w34', name: 'Megha Sinha', fee: 3.2, skill: 84, speed: 89, specialty: 'drama', avatar: '✍️' },
        { id: 'w35', name: 'Rohan Khanna', fee: 2.6, skill: 78, speed: 95, specialty: 'comedy', avatar: '✍️' },
        { id: 'w36', name: 'Ishita Ahluwalia', fee: 4.1, skill: 90, speed: 83, specialty: 'thriller', avatar: '✍️' },
        { id: 'w37', name: 'Aditya Bhalla', fee: 2.9, skill: 81, speed: 92, specialty: 'family', avatar: '✍️' },
        { id: 'w38', name: 'Sneha Rawat', fee: 4.6, skill: 93, speed: 81, specialty: 'historical', avatar: '✍️' },
        { id: 'w39', name: 'Vishal Goyal', fee: 2.7, skill: 80, speed: 93, specialty: 'horror', avatar: '✍️' },
        { id: 'w40', name: 'Aditi Kohli', fee: 3.4, skill: 84, speed: 88, specialty: 'romance', avatar: '✍️' },
        { id: 'w41', name: 'Harsh Jindal', fee: 3.7, skill: 86, speed: 87, specialty: 'action', avatar: '✍️' },
        { id: 'w42', name: 'Pallavi Desai', fee: 3.0, skill: 82, speed: 90, specialty: 'drama', avatar: '✍️' },
        { id: 'w43', name: 'Yash Oberoi', fee: 2.8, skill: 79, speed: 94, specialty: 'comedy', avatar: '✍️' },
        { id: 'w44', name: 'Kriti Bajaj', fee: 4.2, skill: 91, speed: 82, specialty: 'thriller', avatar: '✍️' },
        { id: 'w45', name: 'Sahil Madan', fee: 2.4, skill: 77, speed: 96, specialty: 'family', avatar: '✍️' },
        { id: 'w46', name: 'Nandini Sethi', fee: 4.7, skill: 94, speed: 80, specialty: 'historical', avatar: '✍️' },
        { id: 'w47', name: 'Karthik Menon', fee: 2.9, skill: 81, speed: 91, specialty: 'horror', avatar: '✍️' },
        { id: 'w48', name: 'Rhea Mallik', fee: 3.5, skill: 85, speed: 88, specialty: 'romance', avatar: '✍️' },
        { id: 'w49', name: 'Arpit Goel', fee: 4.0, skill: 88, speed: 85, specialty: 'action', avatar: '✍️' },
        { id: 'w50', name: 'Namrata Chandra', fee: 3.3, skill: 83, speed: 89, specialty: 'drama', avatar: '✍️' }
    ],

    directors: [
        { id: 'd1', name: 'Rajan Kapoor', fee: 12, reputation: 95, specialty: 'romance', hitRate: 0.88, avatar: '🎯' },
        { id: 'd2', name: 'Neha Deshmukh', fee: 8, reputation: 82, specialty: 'drama', hitRate: 0.75, avatar: '🎯' },
        { id: 'd3', name: 'Arjun Bhatia', fee: 15, reputation: 92, specialty: 'action', hitRate: 0.85, avatar: '🎯' },
        { id: 'd4', name: 'Meera Verma', fee: 10, reputation: 88, specialty: 'comedy', hitRate: 0.80, avatar: '🎯' },
        { id: 'd5', name: 'Kabir Saxena', fee: 18, reputation: 98, specialty: 'thriller', hitRate: 0.92, avatar: '🎯' },
        { id: 'd6', name: 'Anita Sharma', fee: 7, reputation: 78, specialty: 'family', hitRate: 0.70, avatar: '🎯' },
        { id: 'd7', name: 'Vikram Joshi', fee: 20, reputation: 96, specialty: 'historical', hitRate: 0.90, avatar: '🎯' },
        { id: 'd8', name: 'Priya Malhotra', fee: 13, reputation: 87, specialty: 'romance', hitRate: 0.82, avatar: '🎯' },
        { id: 'd9', name: 'Rohit Agarwal', fee: 9, reputation: 83, specialty: 'action', hitRate: 0.77, avatar: '🎯' },
        { id: 'd10', name: 'Kavita Reddy', fee: 11, reputation: 85, specialty: 'drama', hitRate: 0.79, avatar: '🎯' },
        { id: 'd11', name: 'Sameer Gupta', fee: 14, reputation: 89, specialty: 'thriller', hitRate: 0.84, avatar: '🎯' },
        { id: 'd12', name: 'Deepika Nair', fee: 6, reputation: 76, specialty: 'family', hitRate: 0.68, avatar: '🎯' },
        { id: 'd13', name: 'Ajay Kumar', fee: 16, reputation: 93, specialty: 'action', hitRate: 0.87, avatar: '🎯' },
        { id: 'd14', name: 'Shreya Bansal', fee: 8.5, reputation: 81, specialty: 'comedy', hitRate: 0.74, avatar: '🎯' },
        { id: 'd15', name: 'Varun Chopra', fee: 19, reputation: 97, specialty: 'historical', hitRate: 0.91, avatar: '🎯' },
        { id: 'd16', name: 'Pooja Yadav', fee: 12.5, reputation: 86, specialty: 'romance', hitRate: 0.81, avatar: '🎯' },
        { id: 'd17', name: 'Nikhil Singh', fee: 7.5, reputation: 79, specialty: 'horror', hitRate: 0.72, avatar: '🎯' },
        { id: 'd18', name: 'Tanvi Patel', fee: 10.5, reputation: 84, specialty: 'drama', hitRate: 0.78, avatar: '🎯' },
        { id: 'd19', name: 'Rajesh Tiwari', fee: 13.5, reputation: 88, specialty: 'thriller', hitRate: 0.83, avatar: '🎯' },
        { id: 'd20', name: 'Simran Khanna', fee: 9.5, reputation: 82, specialty: 'comedy', hitRate: 0.76, avatar: '🎯' },
        { id: 'd21', name: 'Abhishek Jain', fee: 11.5, reputation: 85, specialty: 'action', hitRate: 0.80, avatar: '🎯' },
        { id: 'd22', name: 'Ritu Sharma', fee: 6.5, reputation: 77, specialty: 'family', hitRate: 0.69, avatar: '🎯' },
        { id: 'd23', name: 'Karan Mittal', fee: 17, reputation: 94, specialty: 'historical', hitRate: 0.88, avatar: '🎯' },
        { id: 'd24', name: 'Aditi Shah', fee: 8, reputation: 80, specialty: 'romance', hitRate: 0.73, avatar: '🎯' },
        { id: 'd25', name: 'Vishal Pandey', fee: 14.5, reputation: 90, specialty: 'thriller', hitRate: 0.85, avatar: '🎯' },
        { id: 'd26', name: 'Megha Sood', fee: 7, reputation: 78, specialty: 'horror', hitRate: 0.71, avatar: '🎯' },
        { id: 'd27', name: 'Siddharth Roy', fee: 12, reputation: 86, specialty: 'drama', hitRate: 0.81, avatar: '🎯' },
        { id: 'd28', name: 'Ishita Kaul', fee: 9, reputation: 83, specialty: 'comedy', hitRate: 0.77, avatar: '🎯' },
        { id: 'd29', name: 'Rahul Sinha', fee: 15.5, reputation: 91, specialty: 'action', hitRate: 0.86, avatar: '🎯' },
        { id: 'd30', name: 'Priyanka Bhalla', fee: 10, reputation: 84, specialty: 'family', hitRate: 0.78, avatar: '🎯' },
        { id: 'd31', name: 'Arpit Rawat', fee: 18.5, reputation: 96, specialty: 'historical', hitRate: 0.89, avatar: '🎯' },
        { id: 'd32', name: 'Sneha Goyal', fee: 8.5, reputation: 81, specialty: 'romance', hitRate: 0.75, avatar: '🎯' },
        { id: 'd33', name: 'Gaurav Kohli', fee: 13, reputation: 87, specialty: 'thriller', hitRate: 0.82, avatar: '🎯' },
        { id: 'd34', name: 'Namrata Jindal', fee: 7.5, reputation: 79, specialty: 'horror', hitRate: 0.72, avatar: '🎯' },
        { id: 'd35', name: 'Yash Desai', fee: 11, reputation: 85, specialty: 'drama', hitRate: 0.80, avatar: '🎯' },
        { id: 'd36', name: 'Kriti Oberoi', fee: 9.5, reputation: 82, specialty: 'comedy', hitRate: 0.76, avatar: '🎯' },
        { id: 'd37', name: 'Sahil Bajaj', fee: 16.5, reputation: 92, specialty: 'action', hitRate: 0.87, avatar: '🎯' },
        { id: 'd38', name: 'Nandini Madan', fee: 6, reputation: 76, specialty: 'family', hitRate: 0.68, avatar: '🎯' },
        { id: 'd39', name: 'Karthik Sethi', fee: 19.5, reputation: 97, specialty: 'historical', hitRate: 0.90, avatar: '🎯' },
        { id: 'd40', name: 'Rhea Menon', fee: 12.5, reputation: 86, specialty: 'romance', hitRate: 0.81, avatar: '🎯' },
        { id: 'd41', name: 'Harsh Mallik', fee: 8, reputation: 80, specialty: 'horror', hitRate: 0.73, avatar: '🎯' },
        { id: 'd42', name: 'Pallavi Goel', fee: 10.5, reputation: 84, specialty: 'drama', hitRate: 0.78, avatar: '🎯' },
        { id: 'd43', name: 'Rohan Chandra', fee: 14, reputation: 89, specialty: 'thriller', hitRate: 0.84, avatar: '🎯' },
        { id: 'd44', name: 'Aditi Mehta', fee: 9, reputation: 83, specialty: 'comedy', hitRate: 0.77, avatar: '🎯' },
        { id: 'd45', name: 'Vikram Das', fee: 17.5, reputation: 94, specialty: 'action', hitRate: 0.88, avatar: '🎯' },
        { id: 'd46', name: 'Sonal Iyer', fee: 7, reputation: 78, specialty: 'family', hitRate: 0.70, avatar: '🎯' },
        { id: 'd47', name: 'Manish Saxena', fee: 20.5, reputation: 98, specialty: 'historical', hitRate: 0.92, avatar: '🎯' },
        { id: 'd48', name: 'Divya Verma', fee: 11.5, reputation: 85, specialty: 'romance', hitRate: 0.80, avatar: '🎯' },
        { id: 'd49', name: 'Aditya Kapoor', fee: 15, reputation: 90, specialty: 'thriller', hitRate: 0.85, avatar: '🎯' },
        { id: 'd50', name: 'Ritika Bhatia', fee: 8.5, reputation: 81, specialty: 'horror', hitRate: 0.74, avatar: '🎯' }
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
        { id: 'a10', name: 'Sonia Chawla', fee: 15, popularity: 78, specialty: 'family', type: 'female', avatar: '👩' },
        { id: 'a11', name: 'Rohit Agarwal', fee: 42, popularity: 89, specialty: 'thriller', type: 'male', avatar: '👨' },
        { id: 'a12', name: 'Kavita Reddy', fee: 28, popularity: 86, specialty: 'drama', type: 'female', avatar: '👩' },
        { id: 'a13', name: 'Sameer Gupta', fee: 38, popularity: 87, specialty: 'action', type: 'male', avatar: '👨' },
        { id: 'a14', name: 'Deepika Nair', fee: 22, popularity: 84, specialty: 'romance', type: 'female', avatar: '👩' },
        { id: 'a15', name: 'Ajay Kumar', fee: 48, popularity: 91, specialty: 'historical', type: 'male', avatar: '👨' },
        { id: 'a16', name: 'Shreya Bansal', fee: 26, popularity: 83, specialty: 'comedy', type: 'female', avatar: '👩' },
        { id: 'a17', name: 'Varun Chopra', fee: 32, popularity: 80, specialty: 'thriller', type: 'male', avatar: '👨' },
        { id: 'a18', name: 'Pooja Yadav', fee: 19, popularity: 81, specialty: 'family', type: 'female', avatar: '👩' },
        { id: 'a19', name: 'Nikhil Singh', fee: 36, popularity: 84, specialty: 'horror', type: 'male', avatar: '👨' },
        { id: 'a20', name: 'Tanvi Patel', fee: 24, popularity: 85, specialty: 'drama', type: 'female', avatar: '👩' },
        { id: 'a21', name: 'Rajesh Tiwari', fee: 29, popularity: 79, specialty: 'action', type: 'male', avatar: '👨' },
        { id: 'a22', name: 'Simran Khanna', fee: 21, popularity: 82, specialty: 'romance', type: 'female', avatar: '👩' },
        { id: 'a23', name: 'Abhishek Jain', fee: 44, popularity: 88, specialty: 'thriller', type: 'male', avatar: '👨' },
        { id: 'a24', name: 'Ritu Sharma', fee: 17, popularity: 79, specialty: 'family', type: 'female', avatar: '👩' },
        { id: 'a25', name: 'Karan Mittal', fee: 46, popularity: 90, specialty: 'historical', type: 'male', avatar: '👨' },
        { id: 'a26', name: 'Aditi Shah', fee: 23, popularity: 83, specialty: 'comedy', type: 'female', avatar: '👩' },
        { id: 'a27', name: 'Vishal Pandey', fee: 33, popularity: 81, specialty: 'action', type: 'male', avatar: '👨' },
        { id: 'a28', name: 'Megha Sood', fee: 20, popularity: 80, specialty: 'horror', type: 'female', avatar: '👩' },
        { id: 'a29', name: 'Siddharth Roy', fee: 39, popularity: 86, specialty: 'drama', type: 'male', avatar: '👨' },
        { id: 'a30', name: 'Ishita Kaul', fee: 25, popularity: 84, specialty: 'romance', type: 'female', avatar: '👩' },
        { id: 'a31', name: 'Rahul Sinha', fee: 41, popularity: 87, specialty: 'thriller', type: 'male', avatar: '👨' },
        { id: 'a32', name: 'Priyanka Bhalla', fee: 18, popularity: 78, specialty: 'family', type: 'female', avatar: '👩' },
        { id: 'a33', name: 'Arpit Rawat', fee: 47, popularity: 89, specialty: 'historical', type: 'male', avatar: '👨' },
        { id: 'a34', name: 'Sneha Goyal', fee: 24, popularity: 82, specialty: 'comedy', type: 'female', avatar: '👩' },
        { id: 'a35', name: 'Gaurav Kohli', fee: 31, popularity: 79, specialty: 'action', type: 'male', avatar: '👨' },
        { id: 'a36', name: 'Namrata Jindal', fee: 22, popularity: 81, specialty: 'horror', type: 'female', avatar: '👩' },
        { id: 'a37', name: 'Yash Desai', fee: 37, popularity: 85, specialty: 'drama', type: 'male', avatar: '👨' },
        { id: 'a38', name: 'Kriti Oberoi', fee: 26, popularity: 83, specialty: 'romance', type: 'female', avatar: '👩' },
        { id: 'a39', name: 'Sahil Bajaj', fee: 34, popularity: 80, specialty: 'thriller', type: 'male', avatar: '👨' },
        { id: 'a40', name: 'Nandini Madan', fee: 16, popularity: 77, specialty: 'family', type: 'female', avatar: '👩' },
        { id: 'a41', name: 'Karthik Sethi', fee: 49, popularity: 91, specialty: 'historical', type: 'male', avatar: '👨' },
        { id: 'a42', name: 'Rhea Menon', fee: 27, popularity: 84, specialty: 'comedy', type: 'female', avatar: '👩' },
        { id: 'a43', name: 'Harsh Mallik', fee: 35, popularity: 82, specialty: 'action', type: 'male', avatar: '👨' },
        { id: 'a44', name: 'Pallavi Goel', fee: 21, popularity: 80, specialty: 'horror', type: 'female', avatar: '👩' },
        { id: 'a45', name: 'Rohan Chandra', fee: 43, popularity: 88, specialty: 'drama', type: 'male', avatar: '👨' },
        { id: 'a46', name: 'Aditi Mehta', fee: 25, popularity: 83, specialty: 'romance', type: 'female', avatar: '👩' },
        { id: 'a47', name: 'Vikram Das', fee: 30, popularity: 79, specialty: 'thriller', type: 'male', avatar: '👨' },
        { id: 'a48', name: 'Sonal Iyer', fee: 19, popularity: 78, specialty: 'family', type: 'female', avatar: '👩' },
        { id: 'a49', name: 'Manish Saxena', fee: 45, popularity: 90, specialty: 'historical', type: 'male', avatar: '👨' },
        { id: 'a50', name: 'Divya Verma', fee: 28, popularity: 85, specialty: 'comedy', type: 'female', avatar: '👩' }
    ],

    supportingActors: [
        { id: 'sa1', name: 'Ramesh Yadav', fee: 2, skill: 85, specialty: 'comedy', avatar: '🎭' },
        { id: 'sa2', name: 'Kiran Joshi', fee: 3, skill: 88, specialty: 'drama', avatar: '🎭' },
        { id: 'sa3', name: 'Pooja Sharma', fee: 2.5, skill: 82, specialty: 'family', avatar: '🎭' },
        { id: 'sa4', name: 'Akash Verma', fee: 3.5, skill: 90, specialty: 'action', avatar: '🎭' },
        { id: 'sa5', name: 'Simran Kaur', fee: 2, skill: 80, specialty: 'romance', avatar: '🎭' },
        { id: 'sa6', name: 'Manoj Kumar', fee: 4, skill: 92, specialty: 'thriller', avatar: '🎭' },
        { id: 'sa7', name: 'Deepika Roy', fee: 2.8, skill: 86, specialty: 'historical', avatar: '🎭' },
        { id: 'sa8', name: 'Ravi Singh', fee: 1.8, skill: 78, specialty: 'horror', avatar: '🎭' },
        { id: 'sa9', name: 'Sunita Devi', fee: 2.2, skill: 83, specialty: 'drama', avatar: '🎭' },
        { id: 'sa10', name: 'Rajesh Mishra', fee: 3.2, skill: 87, specialty: 'comedy', avatar: '🎭' },
        { id: 'sa11', name: 'Neetu Kapoor', fee: 2.6, skill: 84, specialty: 'family', avatar: '🎭' },
        { id: 'sa12', name: 'Suresh Oberoi', fee: 3.8, skill: 89, specialty: 'action', avatar: '🎭' },
        { id: 'sa13', name: 'Kavita Sinha', fee: 2.3, skill: 81, specialty: 'romance', avatar: '🎭' },
        { id: 'sa14', name: 'Ashok Pandit', fee: 3.6, skill: 88, specialty: 'thriller', avatar: '🎭' },
        { id: 'sa15', name: 'Bharti Achrekar', fee: 2.9, skill: 85, specialty: 'historical', avatar: '🎭' },
        { id: 'sa16', name: 'Vinod Khanna', fee: 4.2, skill: 91, specialty: 'drama', avatar: '🎭' },
        { id: 'sa17', name: 'Seema Biswas', fee: 3.1, skill: 86, specialty: 'horror', avatar: '🎭' },
        { id: 'sa18', name: 'Satish Shah', fee: 3.9, skill: 90, specialty: 'comedy', avatar: '🎭' },
        { id: 'sa19', name: 'Reema Lagoo', fee: 2.7, skill: 83, specialty: 'family', avatar: '🎭' },
        { id: 'sa20', name: 'Anupam Kher', fee: 4.5, skill: 93, specialty: 'drama', avatar: '🎭' },
        { id: 'sa21', name: 'Farida Jalal', fee: 3.0, skill: 87, specialty: 'family', avatar: '🎭' },
        { id: 'sa22', name: 'Paresh Rawal', fee: 4.8, skill: 94, specialty: 'comedy', avatar: '🎭' },
        { id: 'sa23', name: 'Ratna Pathak', fee: 3.4, skill: 88, specialty: 'drama', avatar: '🎭' },
        { id: 'sa24', name: 'Boman Irani', fee: 4.1, skill: 91, specialty: 'comedy', avatar: '🎭' },
        { id: 'sa25', name: 'Shefali Shah', fee: 3.7, skill: 89, specialty: 'thriller', avatar: '🎭' },
        { id: 'sa26', name: 'Rajpal Yadav', fee: 2.4, skill: 82, specialty: 'comedy', avatar: '🎭' },
        { id: 'sa27', name: 'Divya Dutta', fee: 3.3, skill: 86, specialty: 'drama', avatar: '🎭' },
        { id: 'sa28', name: 'Saurabh Shukla', fee: 3.8, skill: 90, specialty: 'drama', avatar: '🎭' },
        { id: 'sa29', name: 'Tisca Chopra', fee: 3.2, skill: 87, specialty: 'thriller', avatar: '🎭' },
        { id: 'sa30', name: 'Adil Hussain', fee: 3.6, skill: 88, specialty: 'drama', avatar: '🎭' },
        { id: 'sa31', name: 'Seema Pahwa', fee: 2.8, skill: 84, specialty: 'family', avatar: '🎭' },
        { id: 'sa32', name: 'Rajesh Tailang', fee: 3.1, skill: 85, specialty: 'thriller', avatar: '🎭' },
        { id: 'sa33', name: 'Geetanjali Kulkarni', fee: 2.9, skill: 86, specialty: 'drama', avatar: '🎭' },
        { id: 'sa34', name: 'Kumud Mishra', fee: 3.5, skill: 87, specialty: 'drama', avatar: '🎭' },
        { id: 'sa35', name: 'Tillotama Shome', fee: 3.0, skill: 88, specialty: 'indie', avatar: '🎭' },
        { id: 'sa36', name: 'Vijay Raaz', fee: 3.4, skill: 89, specialty: 'comedy', avatar: '🎭' },
        { id: 'sa37', name: 'Konkona Sen', fee: 4.2, skill: 92, specialty: 'drama', avatar: '🎭' },
        { id: 'sa38', name: 'Naseeruddin Shah', fee: 5.0, skill: 95, specialty: 'drama', avatar: '🎭' },
        { id: 'sa39', name: 'Ratna Pathak Shah', fee: 3.6, skill: 88, specialty: 'family', avatar: '🎭' },
        { id: 'sa40', name: 'Vinay Pathak', fee: 3.3, skill: 86, specialty: 'comedy', avatar: '🎭' },
        { id: 'sa41', name: 'Manav Kaul', fee: 3.7, skill: 89, specialty: 'drama', avatar: '🎭' },
        { id: 'sa42', name: 'Rasika Dugal', fee: 3.2, skill: 87, specialty: 'drama', avatar: '🎭' },
        { id: 'sa43', name: 'Pankaj Tripathi', fee: 4.6, skill: 93, specialty: 'drama', avatar: '🎭' },
        { id: 'sa44', name: 'Swara Bhasker', fee: 3.5, skill: 88, specialty: 'drama', avatar: '🎭' },
        { id: 'sa45', name: 'Jaideep Ahlawat', fee: 3.9, skill: 91, specialty: 'thriller', avatar: '🎭' },
        { id: 'sa46', name: 'Shweta Tripathi', fee: 3.1, skill: 86, specialty: 'drama', avatar: '🎭' },
        { id: 'sa47', name: 'Abhishek Banerjee', fee: 2.8, skill: 84, specialty: 'comedy', avatar: '🎭' },
        { id: 'sa48', name: 'Sayani Gupta', fee: 3.0, skill: 85, specialty: 'drama', avatar: '🎭' },
        { id: 'sa49', name: 'Jitendra Kumar', fee: 3.3, skill: 87, specialty: 'comedy', avatar: '🎭' },
        { id: 'sa50', name: 'Mithila Palkar', fee: 2.9, skill: 83, specialty: 'romance', avatar: '🎭' }
    ],

    musicProducers: [
        { id: 'mp1', name: 'Aditya Bose', fee: 8, reputation: 92, specialty: 'romantic', hitRate: 0.85, avatar: '🎵' },
        { id: 'mp2', name: 'Rehan Ali', fee: 10, reputation: 95, specialty: 'classical', hitRate: 0.90, avatar: '🎵' },
        { id: 'mp3', name: 'Sunil Sharma', fee: 6, reputation: 82, specialty: 'commercial', hitRate: 0.75, avatar: '🎵' },
        { id: 'mp4', name: 'Ananya Das', fee: 7, reputation: 88, specialty: 'fusion', hitRate: 0.80, avatar: '🎵' },
        { id: 'mp5', name: 'Vishal Khanna', fee: 12, reputation: 96, specialty: 'epic', hitRate: 0.88, avatar: '🎵' },
        { id: 'mp6', name: 'Priya Malhotra', fee: 9, reputation: 89, specialty: 'romantic', hitRate: 0.83, avatar: '🎵' },
        { id: 'mp7', name: 'Rohit Agarwal', fee: 5.5, reputation: 79, specialty: 'pop', hitRate: 0.72, avatar: '🎵' },
        { id: 'mp8', name: 'Kavita Reddy', fee: 8.5, reputation: 86, specialty: 'classical', hitRate: 0.81, avatar: '🎵' },
        { id: 'mp9', name: 'Sameer Gupta', fee: 11, reputation: 93, specialty: 'background', hitRate: 0.87, avatar: '🎵' },
        { id: 'mp10', name: 'Deepika Nair', fee: 6.5, reputation: 84, specialty: 'folk', hitRate: 0.78, avatar: '🎵' },
        { id: 'mp11', name: 'Ajay Kumar', fee: 13, reputation: 97, specialty: 'orchestral', hitRate: 0.91, avatar: '🎵' },
        { id: 'mp12', name: 'Shreya Bansal', fee: 7.5, reputation: 85, specialty: 'contemporary', hitRate: 0.79, avatar: '🎵' },
        { id: 'mp13', name: 'Varun Chopra', fee: 9.5, reputation: 90, specialty: 'electronic', hitRate: 0.84, avatar: '🎵' },
        { id: 'mp14', name: 'Pooja Yadav', fee: 6, reputation: 83, specialty: 'devotional', hitRate: 0.77, avatar: '🎵' },
        { id: 'mp15', name: 'Nikhil Singh', fee: 8, reputation: 87, specialty: 'rock', hitRate: 0.82, avatar: '🎵' },
        { id: 'mp16', name: 'Tanvi Patel', fee: 7, reputation: 84, specialty: 'sufi', hitRate: 0.78, avatar: '🎵' },
        { id: 'mp17', name: 'Rajesh Tiwari', fee: 10.5, reputation: 91, specialty: 'epic', hitRate: 0.86, avatar: '🎵' },
        { id: 'mp18', name: 'Simran Khanna', fee: 5, reputation: 81, specialty: 'dance', hitRate: 0.74, avatar: '🎵' },
        { id: 'mp19', name: 'Abhishek Jain', fee: 12.5, reputation: 94, specialty: 'background', hitRate: 0.89, avatar: '🎵' },
        { id: 'mp20', name: 'Ritu Sharma', fee: 6.8, reputation: 85, specialty: 'romantic', hitRate: 0.80, avatar: '🎵' },
        { id: 'mp21', name: 'Karan Mittal', fee: 11.5, reputation: 92, specialty: 'classical', hitRate: 0.87, avatar: '🎵' },
        { id: 'mp22', name: 'Aditi Shah', fee: 7.2, reputation: 86, specialty: 'fusion', hitRate: 0.81, avatar: '🎵' },
        { id: 'mp23', name: 'Vishal Pandey', fee: 8.8, reputation: 88, specialty: 'commercial', hitRate: 0.83, avatar: '🎵' },
        { id: 'mp24', name: 'Megha Sood', fee: 5.8, reputation: 82, specialty: 'folk', hitRate: 0.76, avatar: '🎵' },
        { id: 'mp25', name: 'Siddharth Roy', fee: 9.2, reputation: 89, specialty: 'electronic', hitRate: 0.84, avatar: '🎵' },
        { id: 'mp26', name: 'Ishita Kaul', fee: 6.3, reputation: 83, specialty: 'devotional', hitRate: 0.77, avatar: '🎵' },
        { id: 'mp27', name: 'Rahul Sinha', fee: 10.8, reputation: 91, specialty: 'orchestral', hitRate: 0.86, avatar: '🎵' },
        { id: 'mp28', name: 'Priyanka Bhalla', fee: 7.8, reputation: 87, specialty: 'contemporary', hitRate: 0.82, avatar: '🎵' },
        { id: 'mp29', name: 'Arpit Rawat', fee: 13.2, reputation: 95, specialty: 'epic', hitRate: 0.90, avatar: '🎵' },
        { id: 'mp30', name: 'Sneha Goyal', fee: 6.6, reputation: 84, specialty: 'sufi', hitRate: 0.78, avatar: '🎵' },
        { id: 'mp31', name: 'Gaurav Kohli', fee: 8.3, reputation: 88, specialty: 'rock', hitRate: 0.83, avatar: '🎵' },
        { id: 'mp32', name: 'Namrata Jindal', fee: 5.5, reputation: 80, specialty: 'dance', hitRate: 0.73, avatar: '🎵' },
        { id: 'mp33', name: 'Yash Desai', fee: 9.7, reputation: 90, specialty: 'background', hitRate: 0.85, avatar: '🎵' },
        { id: 'mp34', name: 'Kriti Oberoi', fee: 7.1, reputation: 85, specialty: 'romantic', hitRate: 0.79, avatar: '🎵' },
        { id: 'mp35', name: 'Sahil Bajaj', fee: 11.8, reputation: 93, specialty: 'classical', hitRate: 0.88, avatar: '🎵' },
        { id: 'mp36', name: 'Nandini Madan', fee: 6.4, reputation: 82, specialty: 'folk', hitRate: 0.76, avatar: '🎵' },
        { id: 'mp37', name: 'Karthik Sethi', fee: 12.8, reputation: 96, specialty: 'orchestral', hitRate: 0.91, avatar: '🎵' },
        { id: 'mp38', name: 'Rhea Menon', fee: 8.1, reputation: 87, specialty: 'fusion', hitRate: 0.82, avatar: '🎵' },
        { id: 'mp39', name: 'Harsh Mallik', fee: 9.4, reputation: 89, specialty: 'commercial', hitRate: 0.84, avatar: '🎵' },
        { id: 'mp40', name: 'Pallavi Goel', fee: 6.9, reputation: 84, specialty: 'devotional', hitRate: 0.78, avatar: '🎵' },
        { id: 'mp41', name: 'Rohan Chandra', fee: 10.3, reputation: 91, specialty: 'electronic', hitRate: 0.86, avatar: '🎵' },
        { id: 'mp42', name: 'Aditi Mehta', fee: 7.4, reputation: 86, specialty: 'contemporary', hitRate: 0.81, avatar: '🎵' },
        { id: 'mp43', name: 'Vikram Das', fee: 8.7, reputation: 88, specialty: 'sufi', hitRate: 0.83, avatar: '🎵' },
        { id: 'mp44', name: 'Sonal Iyer', fee: 5.9, reputation: 81, specialty: 'dance', hitRate: 0.75, avatar: '🎵' },
        { id: 'mp45', name: 'Manish Saxena', fee: 13.5, reputation: 97, specialty: 'epic', hitRate: 0.92, avatar: '🎵' },
        { id: 'mp46', name: 'Divya Verma', fee: 7.6, reputation: 85, specialty: 'romantic', hitRate: 0.80, avatar: '🎵' },
        { id: 'mp47', name: 'Aditya Kapoor', fee: 11.2, reputation: 92, specialty: 'background', hitRate: 0.87, avatar: '🎵' },
        { id: 'mp48', name: 'Ritika Bhatia', fee: 6.7, reputation: 83, specialty: 'folk', hitRate: 0.77, avatar: '🎵' },
        { id: 'mp49', name: 'Akash Joshi', fee: 9.9, reputation: 90, specialty: 'rock', hitRate: 0.85, avatar: '🎵' },
        { id: 'mp50', name: 'Sanya Malhotra', fee: 8.4, reputation: 87, specialty: 'classical', hitRate: 0.82, avatar: '🎵' }
    ],

    playbackSingers: [
        { id: 'ps1', name: 'Alisha Verma', fee: 3, popularity: 88, specialty: 'romantic', avatar: '🎤' },
        { id: 'ps2', name: 'Rohan Das', fee: 2.5, popularity: 85, specialty: 'classical', avatar: '🎤' },
        { id: 'ps3', name: 'Sneha Patel', fee: 4, popularity: 92, specialty: 'dance', avatar: '🎤' },
        { id: 'ps4', name: 'Arjun Mehta', fee: 3.5, popularity: 89, specialty: 'sufi', avatar: '🎤' },
        { id: 'ps5', name: 'Kavita Sharma', fee: 2, popularity: 82, specialty: 'folk', avatar: '🎤' },
        { id: 'ps6', name: 'Amit Kumar', fee: 5, popularity: 95, specialty: 'versatile', avatar: '🎤' },
        { id: 'ps7', name: 'Priya Reddy', fee: 3.2, popularity: 86, specialty: 'contemporary', avatar: '🎤' },
        { id: 'ps8', name: 'Rohit Nair', fee: 2.8, popularity: 83, specialty: 'devotional', avatar: '🎤' },
        { id: 'ps9', name: 'Kavya Gupta', fee: 3.8, popularity: 90, specialty: 'romantic', avatar: '🎤' },
        { id: 'ps10', name: 'Deepak Bansal', fee: 2.3, popularity: 81, specialty: 'folk', avatar: '🎤' },
        { id: 'ps11', name: 'Shreya Chopra', fee: 4.2, popularity: 91, specialty: 'classical', avatar: '🎤' },
        { id: 'ps12', name: 'Varun Yadav', fee: 2.7, popularity: 84, specialty: 'rock', avatar: '🎤' },
        { id: 'ps13', name: 'Pooja Singh', fee: 3.4, popularity: 87, specialty: 'dance', avatar: '🎤' },
        { id: 'ps14', name: 'Nikhil Patel', fee: 3.1, popularity: 85, specialty: 'sufi', avatar: '🎤' },
        { id: 'ps15', name: 'Tanvi Tiwari', fee: 2.9, popularity: 84, specialty: 'contemporary', avatar: '🎤' },
        { id: 'ps16', name: 'Rajesh Khanna', fee: 4.5, popularity: 93, specialty: 'versatile', avatar: '🎤' },
        { id: 'ps17', name: 'Simran Jain', fee: 3.3, popularity: 86, specialty: 'romantic', avatar: '🎤' },
        { id: 'ps18', name: 'Abhishek Shah', fee: 2.6, popularity: 82, specialty: 'devotional', avatar: '🎤' },
        { id: 'ps19', name: 'Ritu Mittal', fee: 3.7, popularity: 89, specialty: 'folk', avatar: '🎤' },
        { id: 'ps20', name: 'Karan Pandey', fee: 2.4, popularity: 80, specialty: 'rock', avatar: '🎤' },
        { id: 'ps21', name: 'Aditi Sood', fee: 3.9, popularity: 90, specialty: 'classical', avatar: '🎤' },
        { id: 'ps22', name: 'Vishal Roy', fee: 2.8, popularity: 83, specialty: 'dance', avatar: '🎤' },
        { id: 'ps23', name: 'Megha Kaul', fee: 3.6, popularity: 88, specialty: 'sufi', avatar: '🎤' },
        { id: 'ps24', name: 'Siddharth Sinha', fee: 3.0, popularity: 85, specialty: 'contemporary', avatar: '🎤' },
        { id: 'ps25', name: 'Ishita Bhalla', fee: 4.1, popularity: 91, specialty: 'romantic', avatar: '🎤' },
        { id: 'ps26', name: 'Rahul Rawat', fee: 2.5, popularity: 81, specialty: 'devotional', avatar: '🎤' },
        { id: 'ps27', name: 'Priyanka Goyal', fee: 3.8, popularity: 89, specialty: 'versatile', avatar: '🎤' },
        { id: 'ps28', name: 'Arpit Kohli', fee: 2.9, popularity: 84, specialty: 'folk', avatar: '🎤' },
        { id: 'ps29', name: 'Sneha Jindal', fee: 4.3, popularity: 92, specialty: 'classical', avatar: '🎤' },
        { id: 'ps30', name: 'Gaurav Desai', fee: 2.7, popularity: 82, specialty: 'rock', avatar: '🎤' },
        { id: 'ps31', name: 'Namrata Oberoi', fee: 3.5, popularity: 87, specialty: 'dance', avatar: '🎤' },
        { id: 'ps32', name: 'Yash Bajaj', fee: 3.2, popularity: 86, specialty: 'sufi', avatar: '🎤' },
        { id: 'ps33', name: 'Kriti Madan', fee: 2.1, popularity: 79, specialty: 'contemporary', avatar: '🎤' },
        { id: 'ps34', name: 'Sahil Sethi', fee: 4.4, popularity: 93, specialty: 'versatile', avatar: '🎤' },
        { id: 'ps35', name: 'Nandini Menon', fee: 3.4, popularity: 87, specialty: 'romantic', avatar: '🎤' },
        { id: 'ps36', name: 'Karthik Mallik', fee: 2.8, popularity: 83, specialty: 'devotional', avatar: '🎤' },
        { id: 'ps37', name: 'Rhea Goel', fee: 3.7, popularity: 88, specialty: 'folk', avatar: '🎤' },
        { id: 'ps38', name: 'Harsh Chandra', fee: 2.6, popularity: 81, specialty: 'rock', avatar: '🎤' },
        { id: 'ps39', name: 'Pallavi Mehta', fee: 4.0, popularity: 90, specialty: 'classical', avatar: '🎤' },
        { id: 'ps40', name: 'Rohan Das', fee: 3.1, popularity: 85, specialty: 'dance', avatar: '🎤' },
        { id: 'ps41', name: 'Aditi Iyer', fee: 3.6, popularity: 88, specialty: 'sufi', avatar: '🎤' },
        { id: 'ps42', name: 'Vikram Saxena', fee: 2.9, popularity: 84, specialty: 'contemporary', avatar: '🎤' },
        { id: 'ps43', name: 'Sonal Verma', fee: 4.2, popularity: 91, specialty: 'romantic', avatar: '🎤' },
        { id: 'ps44', name: 'Manish Kapoor', fee: 2.4, popularity: 80, specialty: 'devotional', avatar: '🎤' },
        { id: 'ps45', name: 'Divya Bhatia', fee: 3.9, popularity: 89, specialty: 'versatile', avatar: '🎤' },
        { id: 'ps46', name: 'Aditya Joshi', fee: 2.7, popularity: 82, specialty: 'folk', avatar: '🎤' },
        { id: 'ps47', name: 'Ritika Agarwal', fee: 4.1, popularity: 90, specialty: 'classical', avatar: '🎤' },
        { id: 'ps48', name: 'Akash Gupta', fee: 3.0, popularity: 85, specialty: 'rock', avatar: '🎤' },
        { id: 'ps49', name: 'Sanya Sharma', fee: 3.8, popularity: 89, specialty: 'dance', avatar: '🎤' },
        { id: 'ps50', name: 'Rahul Nair', fee: 3.3, popularity: 86, specialty: 'sufi', avatar: '🎤' }
    ],

    lyricists: [
        { id: 'l1', name: 'Manish Sinha', fee: 1.5, skill: 88, specialty: 'romantic', avatar: '📝' },
        { id: 'l2', name: 'Kavya Rao', fee: 2, skill: 92, specialty: 'poetic', avatar: '📝' },
        { id: 'l3', name: 'Deepak Nair', fee: 1.2, skill: 82, specialty: 'commercial', avatar: '📝' },
        { id: 'l4', name: 'Ritu Singh', fee: 1.8, skill: 85, specialty: 'contemporary', avatar: '📝' },
        { id: 'l5', name: 'Ashok Gupta', fee: 2.5, skill: 90, specialty: 'classical', avatar: '📝' },
        { id: 'l6', name: 'Priya Malhotra', fee: 1.6, skill: 84, specialty: 'devotional', avatar: '📝' },
        { id: 'l7', name: 'Rohit Agarwal', fee: 1.4, skill: 83, specialty: 'folk', avatar: '📝' },
        { id: 'l8', name: 'Kavita Reddy', fee: 2.2, skill: 89, specialty: 'sufi', avatar: '📝' },
        { id: 'l9', name: 'Sameer Gupta', fee: 1.3, skill: 81, specialty: 'dance', avatar: '📝' },
        { id: 'l10', name: 'Deepika Nair', fee: 1.9, skill: 86, specialty: 'romantic', avatar: '📝' },
        { id: 'l11', name: 'Ajay Kumar', fee: 2.3, skill: 91, specialty: 'philosophical', avatar: '📝' },
        { id: 'l12', name: 'Shreya Bansal', fee: 1.7, skill: 85, specialty: 'contemporary', avatar: '📝' },
        { id: 'l13', name: 'Varun Chopra', fee: 1.1, skill: 80, specialty: 'commercial', avatar: '📝' },
        { id: 'l14', name: 'Pooja Yadav', fee: 2.1, skill: 88, specialty: 'devotional', avatar: '📝' },
        { id: 'l15', name: 'Nikhil Singh', fee: 1.5, skill: 83, specialty: 'folk', avatar: '📝' },
        { id: 'l16', name: 'Tanvi Patel', fee: 1.8, skill: 86, specialty: 'sufi', avatar: '📝' },
        { id: 'l17', name: 'Rajesh Tiwari', fee: 2.4, skill: 90, specialty: 'classical', avatar: '📝' },
        { id: 'l18', name: 'Simran Khanna', fee: 1.6, skill: 84, specialty: 'dance', avatar: '📝' },
        { id: 'l19', name: 'Abhishek Jain', fee: 1.3, skill: 82, specialty: 'commercial', avatar: '📝' },
        { id: 'l20', name: 'Ritu Sharma', fee: 2.0, skill: 87, specialty: 'romantic', avatar: '📝' },
        { id: 'l21', name: 'Karan Mittal', fee: 2.6, skill: 93, specialty: 'philosophical', avatar: '📝' },
        { id: 'l22', name: 'Aditi Shah', fee: 1.4, skill: 83, specialty: 'contemporary', avatar: '📝' },
        { id: 'l23', name: 'Vishal Pandey', fee: 1.7, skill: 85, specialty: 'folk', avatar: '📝' },
        { id: 'l24', name: 'Megha Sood', fee: 1.9, skill: 86, specialty: 'devotional', avatar: '📝' },
        { id: 'l25', name: 'Siddharth Roy', fee: 1.2, skill: 81, specialty: 'commercial', avatar: '📝' },
        { id: 'l26', name: 'Ishita Kaul', fee: 2.2, skill: 89, specialty: 'sufi', avatar: '📝' },
        { id: 'l27', name: 'Rahul Sinha', fee: 1.8, skill: 86, specialty: 'romantic', avatar: '📝' },
        { id: 'l28', name: 'Priyanka Bhalla', fee: 1.5, skill: 84, specialty: 'dance', avatar: '📝' },
        { id: 'l29', name: 'Arpit Rawat', fee: 2.7, skill: 94, specialty: 'classical', avatar: '📝' },
        { id: 'l30', name: 'Sneha Goyal', fee: 1.6, skill: 84, specialty: 'contemporary', avatar: '📝' },
        { id: 'l31', name: 'Gaurav Kohli', fee: 1.3, skill: 82, specialty: 'folk', avatar: '📝' },
        { id: 'l32', name: 'Namrata Jindal', fee: 2.1, skill: 88, specialty: 'devotional', avatar: '📝' },
        { id: 'l33', name: 'Yash Desai', fee: 1.4, skill: 83, specialty: 'commercial', avatar: '📝' },
        { id: 'l34', name: 'Kriti Oberoi', fee: 1.9, skill: 87, specialty: 'sufi', avatar: '📝' },
        { id: 'l35', name: 'Sahil Bajaj', fee: 2.5, skill: 91, specialty: 'philosophical', avatar: '📝' },
        { id: 'l36', name: 'Nandini Madan', fee: 1.7, skill: 85, specialty: 'romantic', avatar: '📝' },
        { id: 'l37', name: 'Karthik Sethi', fee: 1.1, skill: 80, specialty: 'dance', avatar: '📝' },
        { id: 'l38', name: 'Rhea Menon', fee: 2.0, skill: 88, specialty: 'contemporary', avatar: '📝' },
        { id: 'l39', name: 'Harsh Mallik', fee: 1.8, skill: 86, specialty: 'folk', avatar: '📝' },
        { id: 'l40', name: 'Pallavi Goel', fee: 1.5, skill: 84, specialty: 'devotional', avatar: '📝' },
        { id: 'l41', name: 'Rohan Chandra', fee: 2.3, skill: 90, specialty: 'classical', avatar: '📝' },
        { id: 'l42', name: 'Aditi Mehta', fee: 1.6, skill: 84, specialty: 'sufi', avatar: '📝' },
        { id: 'l43', name: 'Vikram Das', fee: 1.2, skill: 81, specialty: 'commercial', avatar: '📝' },
        { id: 'l44', name: 'Sonal Iyer', fee: 2.1, skill: 89, specialty: 'romantic', avatar: '📝' },
        { id: 'l45', name: 'Manish Saxena', fee: 2.8, skill: 95, specialty: 'philosophical', avatar: '📝' },
        { id: 'l46', name: 'Divya Verma', fee: 1.4, skill: 83, specialty: 'dance', avatar: '📝' },
        { id: 'l47', name: 'Aditya Kapoor', fee: 1.9, skill: 87, specialty: 'contemporary', avatar: '📝' },
        { id: 'l48', name: 'Ritika Bhatia', fee: 1.7, skill: 85, specialty: 'folk', avatar: '📝' },
        { id: 'l49', name: 'Akash Joshi', fee: 2.4, skill: 91, specialty: 'classical', avatar: '📝' },
        { id: 'l50', name: 'Sanya Malhotra', fee: 1.8, skill: 86, specialty: 'devotional', avatar: '📝' }
    ],

    distributors: [
        { id: 'dist1', name: 'StarMax Studios', fee: 22, reach: 95, reliability: 92, description: 'Premium distributor with nationwide reach and excellent marketing support.', specialties: ['romance', 'family', 'drama'] },
        { id: 'dist2', name: 'CineWorld India', fee: 18, reach: 88, reliability: 85, description: 'Strong presence in urban markets with modern digital distribution.', specialties: ['action', 'thriller', 'comedy'] },
        { id: 'dist3', name: 'Bharat Films', fee: 15, reach: 82, reliability: 88, description: 'Traditional distributor with deep rural market penetration.', specialties: ['family', 'historical', 'drama'] },
        { id: 'dist4', name: 'SilverScreen Distributors', fee: 25, reach: 92, reliability: 95, description: 'Premium distribution with international reach and high-end marketing.', specialties: ['all'] },
        { id: 'dist5', name: 'Metro Pictures', fee: 20, reach: 90, reliability: 87, description: 'Strong multiplex network with focus on urban audiences.', specialties: ['thriller', 'action', 'romance'] },
        { id: 'dist6', name: 'Golden Eagle Films', fee: 16, reach: 85, reliability: 89, description: 'Balanced approach with good single screen penetration.', specialties: ['family', 'comedy', 'drama'] },
        { id: 'dist7', name: 'Panorama Entertainment', fee: 19, reach: 87, reliability: 86, description: 'Digital-first distributor with strong OTT partnerships.', specialties: ['contemporary', 'thriller', 'drama'] },
        { id: 'dist8', name: 'Classic Cinemas', fee: 14, reach: 79, reliability: 90, description: 'Heritage distributor with loyal exhibitor relationships.', specialties: ['historical', 'family', 'romance'] },
        { id: 'dist9', name: 'Vanguard Pictures', fee: 23, reach: 93, reliability: 91, description: 'Premium boutique distributor for high-budget films.', specialties: ['action', 'historical', 'thriller'] },
        { id: 'dist10', name: 'People\'s Choice Films', fee: 12, reach: 76, reliability: 84, description: 'Budget-friendly option with focus on mass market.', specialties: ['comedy', 'family', 'drama'] }
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
            e.preventDefault();
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
    
    // Studio Name Edit
    document.getElementById('saveStudioNameBtn').addEventListener('click', saveStudioName);
    document.getElementById('cancelStudioNameBtn').addEventListener('click', closeStudioNameModal);

    // Global Actions
    document.querySelectorAll('[data-screen]').forEach(element => {
        if (!element.classList.contains('nav-item') && 
            !element.classList.contains('btn-back') && 
            !element.classList.contains('action-card')) {
            element.addEventListener('click', (e) => {
                const screen = element.getAttribute('data-screen');
                if (screen) switchScreen(screen);
            });
        }
    });
}

// ====================================
// STUDIO NAME EDITING
// ====================================

function editStudioName() {
    const modal = document.getElementById('studioNameModal');
    const input = document.getElementById('studioNameInput');
    input.value = GameState.player.studioName;
    modal.classList.remove('hidden');
    input.focus();
}

function saveStudioName() {
    const input = document.getElementById('studioNameInput');
    const newName = input.value.trim();
    
    if (newName && newName.length >= 3) {
        GameState.player.studioName = newName;
        updateUI();
        saveGame();
        closeStudioNameModal();
        showEvent({
            title: 'Studio Renamed! 🎬',
            description: `Your studio is now known as "${newName}". Time to make your mark!`,
            icon: '🌟'
        });
    } else {
        alert('Studio name must be at least 3 characters long.');
    }
}

function closeStudioNameModal() {
    document.getElementById('studioNameModal').classList.add('hidden');
}

// ====================================
// SELECT BUTTONS SETUP  
// ====================================

function setupSelectButtons() {
    // Project Type Selection
    document.querySelectorAll('#projectTypeButtons .select-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('#projectTypeButtons .select-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
        });
    });

    // Genre Selection
    document.querySelectorAll('#genreButtons .select-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('#genreButtons .select-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
        });
    });
}

// ====================================
// DROPDOWN INITIALIZATION
// ====================================

function initializeDropdowns() {
    populateDropdownOptions();
    setupDropdownBehavior();
}

function populateDropdownOptions() {
    // Writers dropdown
    populateDropdown('writer', IndustryData.writers);
    
    // Directors dropdown
    populateDropdown('director', IndustryData.directors);
    
    // Lead Actors dropdown
    populateDropdown('leadActor', IndustryData.actors);
    
    // Supporting Actors dropdown
    populateDropdown('supportingActor', IndustryData.supportingActors);
    
    // Music Producers dropdown
    populateDropdown('musicProducer', IndustryData.musicProducers);
    
    // Singers dropdown
    populateDropdown('singer', IndustryData.playbackSingers);
    
    // Lyricists dropdown
    populateDropdown('lyricist', IndustryData.lyricists);
}

function populateDropdown(type, data) {
    const optionsContainer = document.getElementById(`${type}Options`);
    if (!optionsContainer) return;

    optionsContainer.innerHTML = '';
    
    data.forEach(item => {
        const option = document.createElement('div');
        option.className = 'dropdown-option';
        option.dataset.id = item.id;
        
        let details = '';
        if (item.fee !== undefined) details += `₹${item.fee}Cr • `;
        if (item.skill !== undefined) details += `Skill: ${item.skill} • `;
        if (item.reputation !== undefined) details += `Rep: ${item.reputation} • `;
        if (item.popularity !== undefined) details += `Pop: ${item.popularity} • `;
        if (item.specialty) details += item.specialty;
        
        option.innerHTML = `
            <div class="option-avatar">${item.avatar}</div>
            <div class="option-content">
                <div class="option-name">${item.name}</div>
                <div class="option-details">${details}</div>
            </div>
        `;
        
        option.addEventListener('click', () => {
            if (type === 'leadActor' || type === 'supportingActor' || type === 'singer' || type === 'lyricist') {
                handleMultiSelect(type, item);
            } else {
                handleSingleSelect(type, item);
            }
            closeDropdown(type);
        });
        
        optionsContainer.appendChild(option);
    });
}

function setupDropdownBehavior() {
    // Setup dropdown triggers
    const dropdownTypes = ['writer', 'director', 'leadActor', 'supportingActor', 'musicProducer', 'singer', 'lyricist'];
    
    dropdownTypes.forEach(type => {
        const trigger = document.getElementById(`${type}DropdownTrigger`);
        const dropdown = document.getElementById(`${type}Dropdown`);
        const search = document.getElementById(`${type}Search`);
        
        if (trigger && dropdown) {
            trigger.addEventListener('click', (e) => {
                e.stopPropagation();
                closeAllDropdowns();
                dropdown.classList.add('active');
            });
            
            if (search) {
                search.addEventListener('input', (e) => {
                    filterDropdownOptions(type, e.target.value);
                });
            }
        }
    });
    
    // Close dropdowns when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.dropdown-container')) {
            closeAllDropdowns();
        }
    });
}

function filterDropdownOptions(type, searchTerm) {
    const options = document.querySelectorAll(`#${type}Options .dropdown-option`);
    
    options.forEach(option => {
        const name = option.querySelector('.option-name').textContent.toLowerCase();
        const details = option.querySelector('.option-details').textContent.toLowerCase();
        
        if (name.includes(searchTerm.toLowerCase()) || details.includes(searchTerm.toLowerCase())) {
            option.style.display = 'flex';
        } else {
            option.style.display = 'none';
        }
    });
}

function handleSingleSelect(type, item) {
    const selectedContainer = document.getElementById(`selected${type.charAt(0).toUpperCase() + type.slice(1)}`);
    if (!selectedContainer) return;

    selectedContainer.innerHTML = `
        <div class="selected-header">
            <div class="avatar">${item.avatar}</div>
            <div class="selected-details">
                <div class="selected-name">${item.name}</div>
                <div class="selected-info">
                    <span class="info-tag">₹${item.fee} Cr</span>
                    <span class="info-tag">${item.specialty}</span>
                </div>
            </div>
        </div>
    `;
    
    selectedContainer.classList.remove('hidden');
    
    // Store selection
    if (!GameState.currentProject) GameState.currentProject = {};
    GameState.currentProject[type] = item;
    
    updateBudgetSummary();
}

function handleMultiSelect(type, item) {
    const selectedContainer = document.getElementById(`selected${type.charAt(0).toUpperCase() + type.slice(1)}s`);
    if (!selectedContainer) return;

    // Initialize if needed
    if (!GameState.currentProject) GameState.currentProject = {};
    if (!GameState.currentProject[`${type}s`]) GameState.currentProject[`${type}s`] = [];
    
    // Check if already selected
    if (GameState.currentProject[`${type}s`].find(selected => selected.id === item.id)) {
        return;
    }
    
    // Add to selection
    GameState.currentProject[`${type}s`].push(item);
    
    // Update UI
    updateMultiSelectTags(type);
    updateBudgetSummary();
}

function updateMultiSelectTags(type) {
    const selectedContainer = document.getElementById(`selected${type.charAt(0).toUpperCase() + type.slice(1)}s`);
    if (!selectedContainer || !GameState.currentProject[`${type}s`]) return;

    selectedContainer.innerHTML = '';
    
    GameState.currentProject[`${type}s`].forEach(item => {
        const tag = document.createElement('div');
        tag.className = 'selected-tag';
        tag.innerHTML = `
            <span class="tag-name">${item.name}</span>
            <span class="tag-fee">₹${item.fee}Cr</span>
            <button class="tag-remove" onclick="removeFromMultiSelect('${type}', '${item.id}')">×</button>
        `;
        selectedContainer.appendChild(tag);
    });
}

function removeFromMultiSelect(type, itemId) {
    if (GameState.currentProject && GameState.currentProject[`${type}s`]) {
        GameState.currentProject[`${type}s`] = GameState.currentProject[`${type}s`].filter(item => item.id !== itemId);
        updateMultiSelectTags(type);
        updateBudgetSummary();
    }
}

function closeDropdown(type) {
    const dropdown = document.getElementById(`${type}Dropdown`);
    if (dropdown) dropdown.classList.remove('active');
}

function closeAllDropdowns() {
    document.querySelectorAll('.dropdown-menu').forEach(dropdown => {
        dropdown.classList.remove('active');
    });
}

// ====================================
// BUDGET CALCULATION
// ====================================

function updateBudgetSummary() {
    if (!GameState.currentProject) return;

    const project = GameState.currentProject;
    
    // Calculate costs
    const scriptCost = project.writer ? project.writer.fee : 0;
    const directorCost = project.director ? project.director.fee : 0;
    
    const leadCastCost = project.leadActors ? 
        project.leadActors.reduce((sum, actor) => sum + actor.fee, 0) : 0;
    
    const supportingCastCost = project.supportingActors ? 
        project.supportingActors.reduce((sum, actor) => sum + actor.fee, 0) : 0;
    
    let musicTeamCost = project.musicProducer ? project.musicProducer.fee : 0;
    if (project.singers) {
        musicTeamCost += project.singers.reduce((sum, singer) => sum + singer.fee, 0);
    }
    if (project.lyricists) {
        musicTeamCost += project.lyricists.reduce((sum, lyricist) => sum + lyricist.fee, 0);
    }
    
    const totalCrewCost = scriptCost + directorCost + leadCastCost + supportingCastCost + musicTeamCost;
    
    // Update UI
    document.getElementById('scriptCost').textContent = `₹${scriptCost} Cr`;
    document.getElementById('directorCost').textContent = `₹${directorCost} Cr`;
    document.getElementById('leadCastCost').textContent = `₹${leadCastCost} Cr`;
    document.getElementById('supportingCastCost').textContent = `₹${supportingCastCost} Cr`;
    document.getElementById('musicTeamCost').textContent = `₹${musicTeamCost} Cr`;
    document.getElementById('totalCrewCost').textContent = `₹${totalCrewCost} Cr`;
    
    // Store in project
    project.budget = {
        script: scriptCost,
        director: directorCost,
        leadCast: leadCastCost,
        supportingCast: supportingCastCost,
        musicTeam: musicTeamCost,
        total: totalCrewCost
    };
}

// ====================================
// SCRIPT DEVELOPMENT - FIXED
// ====================================

function startScriptDevelopment() {
    console.log('Starting script development...');
    
    // Validate all required fields
    const title = document.getElementById('projectTitle').value.trim();
    const selectedType = document.querySelector('#projectTypeButtons .select-btn.active')?.getAttribute('data-type');
    const selectedGenre = document.querySelector('#genreButtons .select-btn.active')?.getAttribute('data-genre');
    const writer = GameState.currentProject?.writer;
    const leadActors = GameState.currentProject?.leadActors;
    
    // Check validation
    if (!title) {
        alert('Please enter a project title.');
        return;
    }
    
    if (!selectedType) {
        alert('Please select a project type.');
        return;
    }
    
    if (!selectedGenre) {
        alert('Please select a genre.');
        return;
    }
    
    if (!writer) {
        alert('Please select a writer.');
        return;
    }
    
    if (!leadActors || leadActors.length === 0) {
        alert('Please select at least one lead actor.');
        return;
    }
    
    // All validation passed - proceed with script development
    showLoadingOverlay('Creating your masterpiece...');
    
    setTimeout(() => {
        // Initialize project if needed
        if (!GameState.currentProject) {
            GameState.currentProject = {};
        }
        
        // Save project details
        GameState.currentProject.title = title;
        GameState.currentProject.type = selectedType;
        GameState.currentProject.genre = selectedGenre;
        GameState.currentProject.stage = 'crew';
        GameState.currentProject.startWeek = GameState.gameTime.totalWeeks;
        
        // Calculate base budget
        const projectConfig = ProjectConfig[selectedType];
        GameState.currentProject.baseBudget = projectConfig.baseBudget;
        GameState.currentProject.productionWeeks = projectConfig.productionWeeks;
        
        hideLoadingOverlay();
        
        showEvent({
            title: 'Script Development Started! ✍️',
            description: `Great choice! "${title}" sounds like it could be the next big hit in ${selectedGenre}. Your team is ready to move to crew selection.`,
            icon: '🎬'
        });
        
        switchScreen('crew');
        
    }, 2000);
}

// ====================================
// CREW HIRING
// ====================================

function finalizeCrewHiring() {
    if (!GameState.currentProject) {
        alert('No active project found.');
        return;
    }
    
    // Validate required crew
    if (!GameState.currentProject.director) {
        alert('Please select a director.');
        return;
    }
    
    if (!GameState.currentProject.musicProducer) {
        alert('Please select a music producer.');
        return;
    }
    
    // Check budget
    const totalBudget = GameState.currentProject.budget.total + GameState.currentProject.baseBudget;
    
    if (totalBudget > GameState.player.money) {
        alert(`Insufficient funds! You need ₹${totalBudget} Cr but only have ₹${GameState.player.money} Cr.`);
        return;
    }
    
    // Deduct money and proceed
    GameState.player.money -= totalBudget;
    GameState.currentProject.stage = 'production';
    GameState.currentProject.productionStartWeek = GameState.gameTime.totalWeeks;
    GameState.activeProjects.push({ ...GameState.currentProject });
    
    updateUI();
    saveGame();
    
    showEvent({
        title: 'Crew Finalized! 🎯',
        description: `Excellent team assembled! Production begins next week. Total investment: ₹${totalBudget} Cr`,
        icon: '🎬'
    });
    
    switchScreen('production');
    startProduction();
}

// ====================================
// PRODUCTION MANAGEMENT
// ====================================

function startProduction() {
    if (!GameState.currentProject) return;
    
    GameState.currentProject.production = {
        currentWeek: 1,
        totalWeeks: GameState.currentProject.productionWeeks,
        progress: 0,
        quality: 75,
        scenesFilmed: 0,
        totalScenes: 120,
        budgetUsed: GameState.currentProject.budget.total,
        events: []
    };
    
    updateProductionDisplay();
}

function updateProductionDisplay() {
    if (!GameState.currentProject || !GameState.currentProject.production) return;
    
    const prod = GameState.currentProject.production;
    const progress = Math.round((prod.currentWeek / prod.totalWeeks) * 100);
    
    document.getElementById('productionProgress').textContent = `${progress}%`;
    document.getElementById('productionProgressBar').style.width = `${progress}%`;
    document.getElementById('productionWeekInfo').textContent = `Week ${prod.currentWeek} of ${prod.totalWeeks}`;
    document.getElementById('productionQuality').textContent = `Quality: ${getQualityText(prod.quality)}`;
    document.getElementById('scenesFilmed').textContent = prod.scenesFilmed;
    document.getElementById('budgetUsed').textContent = `₹${prod.budgetUsed} Cr`;
    document.getElementById('crewMorale').textContent = getMoraleText(prod.quality);
}

function getQualityText(quality) {
    if (quality >= 90) return 'Exceptional';
    if (quality >= 80) return 'Excellent';
    if (quality >= 70) return 'Good';
    if (quality >= 60) return 'Average';
    return 'Poor';
}

function getMoraleText(quality) {
    if (quality >= 85) return 'Excellent';
    if (quality >= 70) return 'Good';
    if (quality >= 55) return 'Average';
    return 'Low';
}

function skipProduction() {
    if (!GameState.currentProject) return;
    
    showLoadingOverlay('Fast-forwarding production...');
    
    setTimeout(() => {
        // Complete production
        GameState.currentProject.stage = 'marketing';
        GameState.currentProject.production.progress = 100;
        GameState.currentProject.production.scenesFilmed = 120;
        GameState.currentProject.production.quality = Math.random() * 30 + 70; // 70-100
        
        hideLoadingOverlay();
        
        showEvent({
            title: 'Production Complete! 🎬',
            description: `Fantastic work! "${GameState.currentProject.title}" has wrapped production. Time to create buzz with marketing!`,
            icon: '🎉'
        });
        
        switchScreen('marketing');
        
    }, 3000);
}

// ====================================
// MARKETING SYSTEM
// ====================================

function setupMarketingSliders() {
    const sliders = ['billboard', 'tv', 'social', 'international'];
    
    sliders.forEach(type => {
        const slider = document.getElementById(`${type}Slider`);
        const value = document.getElementById(`${type}Value`);
        
        if (slider && value) {
            slider.addEventListener('input', () => {
                value.textContent = `₹${slider.value} Cr`;
                updateMarketingPreview();
            });
        }
    });
}

function updateMarketingPreview() {
    const billboard = parseInt(document.getElementById('billboardSlider').value);
    const tv = parseInt(document.getElementById('tvSlider').value);
    const social = parseInt(document.getElementById('socialSlider').value);
    const international = parseInt(document.getElementById('internationalSlider').value);
    
    const totalBudget = billboard + tv + social + international;
    
    // Calculate hype and reach
    let hype = Math.min(Math.round(totalBudget * 2), 100);
    let reach = 'Local';
    
    if (totalBudget >= 40) reach = 'International';
    else if (totalBudget >= 25) reach = 'National';
    else if (totalBudget >= 15) reach = 'Regional';
    
    // Update UI
    document.getElementById('totalMarketingBudget').textContent = `₹${totalBudget} Cr`;
    document.getElementById('expectedHype').textContent = `${hype}%`;
    document.getElementById('audienceReach').textContent = reach;
    document.getElementById('hypeFill').style.width = `${hype}%`;
    
    // Store in project
    if (GameState.currentProject) {
        GameState.currentProject.marketing = {
            billboard,
            tv,
            social,
            international,
            total: totalBudget,
            hype,
            reach
        };
    }
}

function launchMarketing() {
    if (!GameState.currentProject || !GameState.currentProject.marketing) {
        alert('Please set your marketing budget first.');
        return;
    }
    
    const marketing = GameState.currentProject.marketing;
    
    if (marketing.total > GameState.player.money) {
        alert(`Insufficient funds! You need ₹${marketing.total} Cr but only have ₹${GameState.player.money} Cr.`);
        return;
    }
    
    GameState.player.money -= marketing.total;
    GameState.currentProject.stage = 'distribution';
    
    updateUI();
    saveGame();
    
    showEvent({
        title: 'Marketing Campaign Launched! 📢',
        description: `Great strategy! Your campaign is generating ${marketing.hype}% hype with ${marketing.reach.toLowerCase()} reach.`,
        icon: '🚀'
    });
    
    switchScreen('distribution');
    populateDistributors();
}

// ====================================
// DISTRIBUTION SYSTEM
// ====================================

function populateDistributors() {
    const container = document.getElementById('distributorsGrid');
    if (!container) return;
    
    container.innerHTML = '';
    
    IndustryData.distributors.forEach(distributor => {
        const card = document.createElement('div');
        card.className = 'distributor-card';
        card.dataset.id = distributor.id;
        
        const genreMatch = GameState.currentProject && 
            (distributor.specialties.includes('all') || 
             distributor.specialties.includes(GameState.currentProject.genre));
        
        card.innerHTML = `
            <div class="distributor-header">
                <div class="distributor-name">${distributor.name}</div>
                <div class="distributor-stats">
                    <span class="stat-badge ${genreMatch ? 'success' : ''}">${distributor.reach}% Reach</span>
                    <span class="stat-badge">${distributor.reliability}% Reliable</span>
                </div>
            </div>
            <div class="distributor-description">${distributor.description}</div>
            <div class="distributor-specialties">Specialties: ${distributor.specialties.join(', ')}</div>
        `;
        
        card.addEventListener('click', () => selectDistributor(distributor));
        container.appendChild(card);
    });
}

function selectDistributor(distributor) {
    // Remove previous selection
    document.querySelectorAll('.distributor-card').forEach(card => {
        card.classList.remove('selected');
    });
    
    // Select new distributor
    document.querySelector(`[data-id="${distributor.id}"]`).classList.add('selected');
    
    // Update costs
    document.getElementById('distributorFee').textContent = `₹${distributor.fee} Cr`;
    document.getElementById('totalDistributionCost').textContent = `₹${distributor.fee + 8} Cr`;
    
    // Store selection
    if (GameState.currentProject) {
        GameState.currentProject.distributor = distributor;
    }
}

function finalizeDistribution() {
    if (!GameState.currentProject || !GameState.currentProject.distributor) {
        alert('Please select a distributor.');
        return;
    }
    
    const totalCost = GameState.currentProject.distributor.fee + 8;
    
    if (totalCost > GameState.player.money) {
        alert(`Insufficient funds! You need ₹${totalCost} Cr but only have ₹${GameState.player.money} Cr.`);
        return;
    }
    
    GameState.player.money -= totalCost;
    GameState.currentProject.stage = 'release';
    
    updateUI();
    saveGame();
    
    showEvent({
        title: 'Distribution Locked! 🤝',
        description: `Perfect choice! ${GameState.currentProject.distributor.name} will ensure maximum reach for your film.`,
        icon: '✓'
    });
    
    switchScreen('release');
    generateReleaseCalendar();
}

// ====================================
// RELEASE PLANNING
// ====================================

function generateReleaseCalendar() {
    const container = document.getElementById('releaseCalendar');
    if (!container) return;
    
    container.innerHTML = '';
    
    const currentWeek = GameState.gameTime.totalWeeks;
    
    for (let i = 0; i < 12; i++) {
        const weekNum = currentWeek + i + 2;
        const yearNum = GameState.gameTime.year + Math.floor((GameState.gameTime.week + i + 2) / 52);
        
        const festival = FestivalWeeks.find(f => (weekNum % 52) === f.week);
        const hasCompetition = Math.random() < 0.3;
        
        const weekCard = document.createElement('div');
        weekCard.className = 'calendar-week';
        weekCard.dataset.week = weekNum;
        
        if (festival) weekCard.classList.add('festival');
        if (hasCompetition) weekCard.classList.add('competition');
        if (!festival && !hasCompetition) weekCard.classList.add('optimal');
        
        weekCard.innerHTML = `
            <div class="week-header">
                <div class="week-number">Week ${(weekNum % 52) || 52}</div>
                <div class="week-year">${yearNum}</div>
            </div>
            <div class="week-status">
                ${festival ? `<span class="festival-badge">${festival.name}</span>` : ''}
                ${hasCompetition ? `<span class="competition-badge">High Competition</span>` : ''}
                ${!festival && !hasCompetition ? `<span class="optimal-badge">Optimal</span>` : ''}
            </div>
        `;
        
        weekCard.addEventListener('click', () => selectReleaseWeek(weekNum, festival, hasCompetition));
        container.appendChild(weekCard);
    }
}

function selectReleaseWeek(week, festival, hasCompetition) {
    // Remove previous selection
    document.querySelectorAll('.calendar-week').forEach(card => {
        card.classList.remove('selected');
    });
    
    // Select new week
    document.querySelector(`[data-week="${week}"]`).classList.add('selected');
    
    // Store selection
    if (GameState.currentProject) {
        GameState.currentProject.releaseWeek = week;
        GameState.currentProject.festival = festival;
        GameState.currentProject.hasCompetition = hasCompetition;
    }
}

function confirmRelease() {
    if (!GameState.currentProject || !GameState.currentProject.releaseWeek) {
        alert('Please select a release week.');
        return;
    }
    
    showLoadingOverlay('Preparing for box office...');
    
    setTimeout(() => {
        GameState.currentProject.stage = 'released';
        calculateBoxOfficeResults();
        hideLoadingOverlay();
        switchScreen('results');
    }, 3000);
}

// ====================================
// BOX OFFICE RESULTS CALCULATION
// ====================================

function calculateBoxOfficeResults() {
    if (!GameState.currentProject) return;
    
    const project = GameState.currentProject;
    
    // Base factors
    let multiplier = 1.0;
    
    // Genre popularity
    const genreBonus = {
        'action': 1.2, 'romance': 1.1, 'comedy': 1.15, 'drama': 1.0,
        'thriller': 1.1, 'family': 1.25, 'historical': 0.95, 'horror': 0.9
    };
    multiplier *= genreBonus[project.genre] || 1.0;
    
    // Cast popularity
    if (project.leadActors) {
        const avgPopularity = project.leadActors.reduce((sum, actor) => sum + actor.popularity, 0) / project.leadActors.length;
        multiplier *= (avgPopularity / 85);
    }
    
    // Director reputation
    if (project.director) {
        multiplier *= (project.director.reputation / 85);
    }
    
    // Production quality
    if (project.production) {
        multiplier *= (project.production.quality / 75);
    }
    
    // Marketing impact
    if (project.marketing) {
        multiplier *= (1 + project.marketing.hype / 200);
    }
    
    // Distributor impact
    if (project.distributor) {
        multiplier *= (project.distributor.reach / 85);
    }
    
    // Festival bonus/penalty
    if (project.festival) {
        multiplier *= project.festival.multiplier;
    }
    
    // Competition penalty
    if (project.hasCompetition) {
        multiplier *= 0.8;
    }
    
    // Calculate revenues
    const baseBudget = project.baseBudget + project.budget.total + 
                      (project.marketing ? project.marketing.total : 0) +
                      (project.distributor ? project.distributor.fee + 8 : 8);
    
    const openingWeekend = Math.round(baseBudget * multiplier * (0.3 + Math.random() * 0.4));
    const domesticTotal = Math.round(openingWeekend * (2.5 + Math.random() * 2));
    const international = Math.round(domesticTotal * (0.2 + Math.random() * 0.5));
    const ottRights = Math.round(baseBudget * (0.4 + Math.random() * 0.3));
    
    const totalRevenue = domesticTotal + international + ottRights;
    const netProfit = totalRevenue - baseBudget;
    
    // Determine verdict
    let verdict = '';
    let verdictClass = '';
    
    if (netProfit >= baseBudget * 3) {
        verdict = 'BLOCKBUSTER HIT! 🏆';
        verdictClass = 'blockbuster';
    } else if (netProfit >= baseBudget * 2) {
        verdict = 'SUPERHIT! 🌟';
        verdictClass = 'superhit';
    } else if (netProfit >= baseBudget * 0.5) {
        verdict = 'HIT! 👏';
        verdictClass = 'hit';
    } else if (netProfit >= 0) {
        verdict = 'AVERAGE 📊';
        verdictClass = 'average';
    } else {
        verdict = 'FLOP 😞';
        verdictClass = 'flop';
    }
    
    // Store results
    project.results = {
        totalInvestment: baseBudget,
        openingWeekend,
        domesticTotal,
        international,
        ottRights,
        totalRevenue,
        netProfit,
        verdict,
        verdictClass,
        multiplier
    };
    
    // Update player stats
    GameState.player.money += totalRevenue;
    GameState.player.totalRevenue += totalRevenue;
    GameState.player.totalProjects++;
    GameState.player.completedProjects++;
    
    if (netProfit > 0) {
        GameState.player.hitMovies++;
        GameState.player.reputation = Math.min(100, GameState.player.reputation + 5);
    } else {
        GameState.player.reputation = Math.max(0, GameState.player.reputation - 3);
    }
    
    // Add to portfolio
    GameState.portfolio.push({ ...project });
    
    // Remove from active projects
    GameState.activeProjects = GameState.activeProjects.filter(p => p.title !== project.title);
    
    // Generate awards
    generateAwards(project);
    
    updateResultsDisplay();
    updateUI();
    saveGame();
}

function updateResultsDisplay() {
    if (!GameState.currentProject || !GameState.currentProject.results) return;
    
    const results = GameState.currentProject.results;
    
    document.getElementById('resultsMovieTitle').textContent = `"${GameState.currentProject.title}"`;
    document.getElementById('resultsVerdict').textContent = results.verdict;
    document.getElementById('resultsVerdict').className = `verdict-badge ${results.verdictClass}`;
    
    document.getElementById('totalInvestment').textContent = `₹${results.totalInvestment} Cr`;
    document.getElementById('openingWeekend').textContent = `₹${results.openingWeekend} Cr`;
    document.getElementById('domesticTotal').textContent = `₹${results.domesticTotal} Cr`;
    document.getElementById('internationalTotal').textContent = `₹${results.international} Cr`;
    document.getElementById('ottRights').textContent = `₹${results.ottRights} Cr`;
    document.getElementById('netProfit').textContent = `₹${results.netProfit} Cr`;
    document.getElementById('netProfit').className = `result-value ${results.netProfit >= 0 ? 'profit' : 'loss'}`;
}

// ====================================
// AWARDS SYSTEM
// ====================================

function generateAwards(project) {
    if (!project.results || project.results.netProfit <= 0) return;
    
    const awards = [];
    const multiplier = project.results.multiplier;
    
    // Higher chance for better movies
    if (multiplier >= 1.8 && Math.random() < 0.7) {
        awards.push({
            name: 'Best Film',
            category: 'National Film Awards',
            year: GameState.gameTime.year,
            project: project.title
        });
    }
    
    if (multiplier >= 1.5 && Math.random() < 0.6) {
        awards.push({
            name: 'Best Director',
            category: 'Filmfare Awards',
            year: GameState.gameTime.year,
            project: project.title
        });
    }
    
    if (project.leadActors && Math.random() < 0.5) {
        awards.push({
            name: 'Best Actor',
            category: 'Filmfare Awards',
            year: GameState.gameTime.year,
            project: project.title
        });
    }
    
    // Add to game state
    GameState.awards.push(...awards);
    GameState.player.totalAwards += awards.length;
}

// ====================================
// UI MANAGEMENT
// ====================================

function initializeGame() {
    updateUI();
    generateInitialNews();
    generateInitialCompetitors();
    
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
    
    // Update active projects display
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
                <div class="project-title">${project.title}</div>
                <div class="project-stage">${project.stage}</div>
            </div>
            <div class="project-details">
                <span>${project.type} • ${project.genre}</span>
            </div>
            <div class="project-progress">
                <div class="progress-bar">
                    <div class="progress-fill" style="width: ${progress}%"></div>
                </div>
                <div class="progress-text">${statusText}</div>
            </div>
        `;
        
        container.appendChild(card);
    });
}

function calculateProjectProgress(project) {
    switch(project.stage) {
        case 'script': return 10;
        case 'crew': return 25;
        case 'production': 
            if (project.production) {
                return 25 + (project.production.progress * 0.5);
            }
            return 25;
        case 'marketing': return 80;
        case 'distribution': return 90;
        case 'release': return 95;
        default: return 0;
    }
}

function getProjectStatusText(project) {
    switch(project.stage) {
        case 'script': return 'Script development in progress...';
        case 'crew': return 'Assembling crew...';
        case 'production': return `Production Week ${project.production?.currentWeek || 1}`;
        case 'marketing': return 'Marketing campaign active';
        case 'distribution': return 'Distribution planning';
        case 'release': return 'Ready for release';
        default: return 'In development';
    }
}

// ====================================
// ADDITIONAL UTILITY FUNCTIONS
// ====================================

function initializeScriptStage() {
    // Reset current project
    GameState.currentProject = null;
    
    // Clear form
    document.getElementById('projectTitle').value = '';
    document.querySelectorAll('#projectTypeButtons .select-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('#genreButtons .select-btn').forEach(btn => btn.classList.remove('active'));
    
    // Clear selections
    document.getElementById('selectedWriter').classList.add('hidden');
    document.getElementById('selectedLeadActors').innerHTML = '';
    document.getElementById('selectedSupportingActors').innerHTML = '';
}

function initializeCrewStage() {
    // Clear previous selections
    document.getElementById('selectedDirector').classList.add('hidden');
    document.getElementById('selectedMusicProducer').classList.add('hidden');
    document.getElementById('selectedSingers').innerHTML = '';
    document.getElementById('selectedLyricists').innerHTML = '';
    
    updateBudgetSummary();
}

function advanceWeek() {
    GameState.gameTime.week++;
    GameState.gameTime.totalWeeks++;
    
    // Handle year rollover
    if (GameState.gameTime.week > 52) {
        GameState.gameTime.week = 1;
        GameState.gameTime.year++;
    }
    
    // Update active projects
    updateActiveProjects();
    
    // Generate random events
    if (Math.random() < 0.3) {
        generateRandomEvent();
    }
    
    // Generate competitors
    if (GameState.gameTime.totalWeeks >= GameState.nextCompetitorWeek) {
        generateCompetitorMovie();
        GameState.nextCompetitorWeek = GameState.gameTime.totalWeeks + (4 + Math.floor(Math.random() * 4));
    }
    
    // Update industry news
    generateWeeklyNews();
    
    // Auto-save
    if (GameState.settings.autoSave) {
        saveGame();
    }
    
    updateUI();
    
    showEvent({
        title: `Week ${GameState.gameTime.week}, ${GameState.gameTime.year} 📅`,
        description: 'A new week begins in Bollywood. What will you create?',
        icon: '🎬'
    });
}

function updateActiveProjects() {
    GameState.activeProjects.forEach(project => {
        if (project.stage === 'production' && project.production) {
            project.production.currentWeek++;
            project.production.progress = Math.round((project.production.currentWeek / project.production.totalWeeks) * 100);
            project.production.scenesFilmed = Math.round((project.production.progress / 100) * project.production.totalScenes);
            
            // Random production events
            if (Math.random() < 0.2) {
                generateProductionEvent(project);
            }
            
            // Auto-complete production
            if (project.production.currentWeek >= project.production.totalWeeks) {
                project.stage = 'marketing';
                showEvent({
                    title: 'Production Complete! 🎬',
                    description: `"${project.title}" has finished filming. Ready for marketing!`,
                    icon: '✅'
                });
            }
        }
    });
}

function generateRandomEvent() {
    const events = [
        {
            title: 'Industry Strike! ⚡',
            description: 'Film workers are on strike. Production costs increased by 15% for this week.',
            icon: '⚡',
            effect: () => {
                // Increase production costs temporarily
            }
        },
        {
            title: 'Festival Season Boost! 🎉',
            description: 'Audience mood is high! All releases this week get a 20% revenue boost.',
            icon: '🎉'
        },
        {
            title: 'New OTT Platform! 📺',
            description: 'A major streaming service is offering premium rates for exclusive content.',
            icon: '📺'
        },
        {
            title: 'Celebrity Scandal! 📰',
            description: 'A major star is in controversy. Movies with similar genres might be affected.',
            icon: '📰'
        },
        {
            title: 'Box Office Record! 📈',
            description: 'The industry is booming! Investor confidence is high.',
            icon: '📈'
        }
    ];
    
    const event = events[Math.floor(Math.random() * events.length)];
    GameState.events.unshift({
        ...event,
        week: GameState.gameTime.totalWeeks
    });
    
    // Keep only last 10 events
    if (GameState.events.length > 10) {
        GameState.events = GameState.events.slice(0, 10);
    }
}

function generateProductionEvent(project) {
    const events = [
        {
            title: 'Perfect Shot! 📸',
            description: 'The director captured an amazing scene in one take!',
            effect: () => project.production.quality += 5
        },
        {
            title: 'Weather Delay ⛈️',
            description: 'Bad weather has delayed outdoor shooting.',
            effect: () => project.production.currentWeek += 0.5
        },
        {
            title: 'Actor Injury 🏥',
            description: 'A minor injury to the lead actor caused delays.',
            effect: () => {
                project.production.quality -= 3;
                project.production.budgetUsed += 2;
            }
        },
        {
            title: 'Viral BTS Video! 🔥',
            description: 'Behind-the-scenes content went viral, building hype!',
            effect: () => {
                if (project.marketing) project.marketing.hype += 10;
            }
        }
    ];
    
    const event = events[Math.floor(Math.random() * events.length)];
    event.effect();
    
    if (!project.production.events) project.production.events = [];
    project.production.events.unshift({
        title: event.title,
        description: event.description,
        week: project.production.currentWeek
    });
}

function generateWeeklyNews() {
    const newsItems = [
        `📈 Box office collections reach new high of ₹${50 + Math.floor(Math.random() * 100)} crores this week!`,
        `🎭 ${getRandomActorName()} announces retirement from films after successful career.`,
        `🎬 New film city announced in ${getRandomCity()} with ₹${500 + Math.floor(Math.random() * 1000)} crore investment.`,
        `📺 OTT viewership increases by ${10 + Math.floor(Math.random() * 30)}% compared to last month.`,
        `🏆 Film festival in ${getRandomCity()} receives record ${100 + Math.floor(Math.random() * 200)} submissions.`,
        `💰 Production costs rise by ${5 + Math.floor(Math.random() * 15)}% due to inflation and demand.`,
        `🌟 International co-production deals worth ₹${200 + Math.floor(Math.random() * 800)} crores signed.`,
        `🎵 Music industry reports ${20 + Math.floor(Math.random() * 40)}% growth in digital streaming.`
    ];
    
    const newsItem = newsItems[Math.floor(Math.random() * newsItems.length)];
    GameState.industryNews.unshift({
        text: newsItem,
        week: GameState.gameTime.totalWeeks
    });
    
    // Keep only last 20 news items
    if (GameState.industryNews.length > 20) {
        GameState.industryNews = GameState.industryNews.slice(0, 20);
    }
}

function getRandomActorName() {
    const names = ['Arjun Sharma', 'Priya Malhotra', 'Rohit Kapoor', 'Kavya Singh', 'Vikram Agarwal', 'Neha Reddy'];
    return names[Math.floor(Math.random() * names.length)];
}

function getRandomCity() {
    const cities = ['Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Chennai', 'Kolkata', 'Pune', 'Jaipur'];
    return cities[Math.floor(Math.random() * cities.length)];
}

function updateNewsTicker() {
    if (GameState.industryNews.length === 0) return;
    
    let tickerText = '';
    GameState.industryNews.slice(0, 5).forEach(news => {
        tickerText += news.text + ' • ';
    });
    
    Elements.newsTicker.textContent = tickerText;
}

// ====================================
// COMPETITOR SYSTEM
// ====================================

function generateInitialCompetitors() {
    // Generate initial competitors
    for (let i = 0; i < 3; i++) {
        generateCompetitorMovie();
    }
}

function generateCompetitorMovie() {
    const studioNames = [
        'Dream Works Studios', 'Golden Pictures', 'Star Entertainment', 
        'Mega Productions', 'Royal Films', 'Prime Studios',
        'Infinity Productions', 'Diamond Pictures', 'Elite Entertainment',
        'Majestic Films'
    ];
    
    const movieTitles = [
        'Dil Ki Baat', 'Action Hero', 'Pyar Ka Rang', 'Zindagi Express',
        'Khoon Ka Badla', 'Sapno Ka Raja', 'Mohabbat Ki Rani', 'Jung Ka Baadshah',
        'Aansu Aur Hansi', 'Rishtey Ki Deewar', 'Ishq Ka Junoon', 'Ghar Ki Izzat'
    ];
    
    const genres = ['action', 'romance', 'comedy', 'drama', 'thriller', 'family'];
    
    const competitor = {
        id: 'comp_' + Date.now() + Math.random(),
        title: movieTitles[Math.floor(Math.random() * movieTitles.length)],
        studio: studioNames[Math.floor(Math.random() * studioNames.length)],
        genre: genres[Math.floor(Math.random() * genres.length)],
        budget: 20 + Math.floor(Math.random() * 80),
        releaseWeek: GameState.gameTime.totalWeeks + Math.floor(Math.random() * 12) + 2,
        hype: Math.floor(Math.random() * 100),
        quality: 60 + Math.floor(Math.random() * 40)
    };
    
    GameState.competitors.push(competitor);
    
    // Keep only upcoming competitors
    GameState.competitors = GameState.competitors.filter(comp => 
        comp.releaseWeek >= GameState.gameTime.totalWeeks
    );
}

function generateInitialNews() {
    const initialNews = [
        '🎬 Film industry expects bumper year with record investments!',
        '📈 Digital streaming platforms show 45% growth in regional content.',
        '🌟 International film festival invites increase for Indian cinema.',
        '💰 Government announces new tax incentives for film production.',
        '🎭 Classical dance forms gain popularity in mainstream cinema.'
    ];
    
    initialNews.forEach((news, index) => {
        GameState.industryNews.push({
            text: news,
            week: GameState.gameTime.totalWeeks - index
        });
    });
}

// ====================================
// SAVE/LOAD SYSTEM
// ====================================

function saveGame() {
    try {
        const saveData = {
            ...GameState,
            timestamp: Date.now()
        };
        localStorage.setItem('bollywoodCinema_save', JSON.stringify(saveData));
        console.log('Game saved successfully');
    } catch (error) {
        console.error('Failed to save game:', error);
    }
}

function loadSavedGame() {
    try {
        const saveData = localStorage.getItem('bollywoodCinema_save');
        if (saveData) {
            const parsed = JSON.parse(saveData);
            // Merge saved data with current GameState
            Object.assign(GameState, parsed);
            console.log('Game loaded successfully');
            return true;
        }
    } catch (error) {
        console.error('Failed to load game:', error);
    }
    return false;
}

function exportSave() {
    const saveData = JSON.stringify(GameState, null, 2);
    const blob = new Blob([saveData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = `bollywood_cinema_save_${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    
    URL.revokeObjectURL(url);
}

// ====================================
// PORTFOLIO MANAGEMENT
// ====================================

function loadPortfolio() {
    const container = document.getElementById('portfolioContent');
    if (!container) return;
    
    if (GameState.portfolio.length === 0) {
        container.innerHTML = `
            <div class="empty-portfolio">
                <div class="empty-icon">🎬</div>
                <h3 class="empty-title">No Movies Yet</h3>
                <p class="empty-subtitle">Start creating your first blockbuster!</p>
                <button class="btn-primary" data-screen="script">
                    <span class="btn-icon">✍️</span>
                    Create New Project
                </button>
            </div>
        `;
        return;
    }
    
    container.className = 'portfolio-grid';
    container.innerHTML = '';
    
    GameState.portfolio.forEach(movie => {
        const card = document.createElement('div');
        card.className = `portfolio-movie-card ${movie.results?.verdictClass || ''}`;
        
        const castList = movie.leadActors ? 
            movie.leadActors.slice(0, 2).map(actor => actor.name).join(', ') : 
            'Unknown Cast';
        
        card.innerHTML = `
            <div class="movie-poster">
                <div class="movie-genre">${movie.genre}</div>
                <div class="movie-type">${movie.type}</div>
            </div>
            <div class="movie-info">
                <div class="movie-title">${movie.title}</div>
                <div class="movie-cast">Starring: ${castList}</div>
                <div class="movie-financials">
                    <div class="financial-item">
                        <span class="label">Budget:</span>
                        <span class="value">₹${movie.results?.totalInvestment || 'N/A'} Cr</span>
                    </div>
                    <div class="financial-item">
                        <span class="label">Revenue:</span>
                        <span class="value ${movie.results?.netProfit >= 0 ? 'positive' : 'negative'}">
                            ₹${movie.results?.totalRevenue || 'N/A'} Cr
                        </span>
                    </div>
                    <div class="financial-item">
                        <span class="label">Profit:</span>
                        <span class="value ${movie.results?.netProfit >= 0 ? 'positive' : 'negative'}">
                            ₹${movie.results?.netProfit || 'N/A'} Cr
                        </span>
                    </div>
                </div>
                <div class="movie-verdict">${movie.results?.verdict || 'In Production'}</div>
            </div>
        `;
        
        container.appendChild(card);
    });
    
    // Update portfolio stats
    updatePortfolioStats();
}

function updatePortfolioStats() {
    const totalMovies = GameState.portfolio.length;
    const totalRevenue = GameState.portfolio.reduce((sum, movie) => 
        sum + (movie.results?.totalRevenue || 0), 0);
    const hitMovies = GameState.portfolio.filter(movie => 
        movie.results?.netProfit > 0).length;
    const totalAwards = GameState.awards.length;
    
    document.getElementById('portfolioTotalMovies').textContent = totalMovies;
    document.getElementById('portfolioTotalRevenue').textContent = `₹${totalRevenue}`;
    document.getElementById('portfolioHitMovies').textContent = hitMovies;
    document.getElementById('portfolioAwards').textContent = totalAwards;
}

// ====================================
// COMPETITORS DISPLAY
// ====================================

function loadCompetitors() {
    const competitorsList = document.getElementById('competitorsList');
    const leaderboard = document.getElementById('industryLeaderboard');
    
    if (competitorsList) {
        competitorsList.innerHTML = '';
        
        GameState.competitors.slice(0, 8).forEach(competitor => {
            const card = document.createElement('div');
            card.className = 'competitor-card';
            
            const weeksUntilRelease = competitor.releaseWeek - GameState.gameTime.totalWeeks;
            
            card.innerHTML = `
                <div class="competitor-header">
                    <div class="competitor-title">${competitor.title}</div>
                    <div class="competitor-badges">
                        <span class="genre-badge">${competitor.genre}</span>
                        <span class="budget-badge">₹${competitor.budget}Cr</span>
                    </div>
                </div>
                <div class="competitor-details">
                    <div class="competitor-studio">Studio: ${competitor.studio}</div>
                    <div>Releases in ${weeksUntilRelease} weeks</div>
                    <div>Hype: ${competitor.hype}%</div>
                </div>
            `;
            
            competitorsList.appendChild(card);
        });
    }
    
    // Generate leaderboard
    if (leaderboard) {
        generateLeaderboard(leaderboard);
    }
}

function generateLeaderboard(container) {
    const leaders = [
        { name: 'Yash Raj Films', revenue: 850, hitRate: 78, rank: 1, isPlayer: false },
        { name: 'Dharma Productions', revenue: 720, hitRate: 72, rank: 2, isPlayer: false },
        { name: GameState.player.studioName, revenue: GameState.player.totalRevenue, hitRate: calculateSuccessRate(), rank: 3, isPlayer: true },
        { name: 'Red Chillies Entertainment', revenue: 680, hitRate: 69, rank: 4, isPlayer: false },
        { name: 'Excel Entertainment', revenue: 590, hitRate: 74, rank: 5, isPlayer: false }
    ].sort((a, b) => b.revenue - a.revenue);
    
    // Update ranks
    leaders.forEach((leader, index) => {
        leader.rank = index + 1;
    });
    
    container.innerHTML = '';
    
    leaders.forEach(leader => {
        const item = document.createElement('div');
        item.className = `leaderboard-item ${leader.isPlayer ? 'player' : ''}`;
        
        item.innerHTML = `
            <div class="leader-rank">${leader.rank}</div>
            <div class="leader-info">
                <div class="leader-name">${leader.name}</div>
                <div class="leader-stats">${leader.hitRate}% success rate</div>
            </div>
            <div class="leader-revenue">₹${leader.revenue}Cr</div>
        `;
        
        container.appendChild(item);
    });
}

function calculateSuccessRate() {
    return GameState.player.completedProjects > 0 ? 
        Math.round((GameState.player.hitMovies / GameState.player.completedProjects) * 100) : 0;
}

// ====================================
// FRANCHISES SYSTEM
// ====================================

function loadFranchises() {
    const container = document.getElementById('franchisesContent');
    if (!container) return;
    
    if (GameState.franchises.length === 0) {
        container.innerHTML = `
            <div class="empty-franchises">
                <div class="empty-icon">🎭</div>
                <h3 class="empty-title">No Franchises Yet</h3>
                <p class="empty-subtitle">Create hit movies to unlock franchise opportunities!</p>
            </div>
        `;
        return;
    }
    
    container.className = 'franchises-grid';
    container.innerHTML = '';
    
    GameState.franchises.forEach(franchise => {
        const card = document.createElement('div');
        card.className = 'franchise-card';
        
        card.innerHTML = `
            <div class="franchise-header">
                <div class="franchise-title">${franchise.name}</div>
                <div class="franchise-potential">High Potential</div>
            </div>
            <div class="franchise-stats">
                <div class="franchise-stat">
                    <div class="stat-value">${franchise.movies.length}</div>
                    <div class="stat-label">Movies</div>
                </div>
                <div class="franchise-stat">
                    <div class="stat-value">₹${franchise.totalRevenue}Cr</div>
                    <div class="stat-label">Total Revenue</div>
                </div>
                <div class="franchise-stat">
                    <div class="stat-value">${franchise.avgRating}/10</div>
                    <div class="stat-label">Avg Rating</div>
                </div>
            </div>
            <div class="franchise-timeline">
                ${franchise.movies.map(movie => 
                    `<span class="timeline-movie ${movie.verdict}">${movie.title}</span>`
                ).join('')}
            </div>
            <div class="franchise-actions">
                <button class="btn-primary" onclick="createSequel('${franchise.id}')">
                    <span class="btn-icon">🎬</span>
                    Create Sequel
                </button>
            </div>
        `;
        
        container.appendChild(card);
    });
}

function createSequel(franchiseId) {
    // Implementation for creating sequels
    showEvent({
        title: 'Sequel in Development! 🎬',
        description: 'Your franchise is expanding! Start developing the next chapter.',
        icon: '🎭'
    });
    
    switchScreen('script');
}

// ====================================
// AWARDS SYSTEM
// ====================================

function loadAwards() {
    const timeline = document.getElementById('awardsTimeline');
    if (!timeline) return;
    
    if (GameState.awards.length === 0) {
        timeline.innerHTML = `
            <div class="empty-awards">
                <div class="empty-icon">🏆</div>
                <h3 class="empty-title">No Awards Yet</h3>
                <p class="empty-subtitle">Create exceptional movies to win prestigious awards!</p>
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
    
    timeline.innerHTML = '';
    
    Object.keys(awardsByYear)
        .sort((a, b) => b - a)
        .forEach(year => {
            const yearSection = document.createElement('div');
            yearSection.className = 'awards-year-section';
            
            yearSection.innerHTML = `
                <div class="awards-year-header">
                    <div class="awards-year">${year}</div>
                    <div class="awards-count">${awardsByYear[year].length} Awards</div>
                </div>
                <div class="awards-year-grid">
                    ${awardsByYear[year].map(award => `
                        <div class="award-timeline-item">
                            <div class="award-timeline-icon">🏆</div>
                            <div class="award-timeline-content">
                                <div class="award-timeline-name">${award.name}</div>
                                <div class="award-timeline-category">${award.category}</div>
                                <div class="award-timeline-project">for "${award.project}"</div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            `;
            
            timeline.appendChild(yearSection);
        });
    
    // Update awards stats
    updateAwardsStats();
}

function updateAwardsStats() {
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
// THEME MANAGEMENT
// ====================================

function toggleTheme() {
    GameState.settings.darkMode = !GameState.settings.darkMode;
    
    if (GameState.settings.darkMode) {
        document.body.classList.add('dark-theme');
        document.getElementById('themeToggle').textContent = '☀️';
    } else {
        document.body.classList.remove('dark-theme');
        document.getElementById('themeToggle').textContent = '🌙';
    }
    
    saveGame();
}

// ====================================
// EVENT MODAL SYSTEM
// ====================================

function showEvent(event) {
    const modal = Elements.eventModal;
    const icon = document.getElementById('eventModalIcon');
    const title = document.getElementById('eventModalTitle');
    const description = document.getElementById('eventModalDescription');
    
    icon.textContent = event.icon;
    title.textContent = event.title;
    description.textContent = event.description;
    
    modal.classList.remove('hidden');
}

function closeEventModal() {
    Elements.eventModal.classList.add('hidden');
}

// ====================================
// LOADING OVERLAY
// ====================================

function showLoadingOverlay(text = 'Loading...') {
    document.getElementById('loadingText').textContent = text;
    Elements.loadingOverlay.classList.remove('hidden');
}

function hideLoadingOverlay() {
    Elements.loadingOverlay.classList.add('hidden');
}

// ====================================
// UTILITY FUNCTIONS
// ====================================

function formatCurrency(amount) {
    return `₹${amount} Cr`;
}

function getRandomElement(array) {
    return array[Math.floor(Math.random() * array.length)];
}

function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
}

// ====================================
// KEYBOARD SHORTCUTS
// ====================================

document.addEventListener('keydown', (e) => {
    // Only handle shortcuts if not typing in input
    if (e.target.tagName === 'INPUT') return;
    
    switch(e.key) {
        case '1':
            switchScreen('dashboard');
            break;
        case '2':
            switchScreen('portfolio');
            break;
        case '3':
            switchScreen('script');
            break;
        case '4':
            switchScreen('competitors');
            break;
        case '5':
            switchScreen('awards');
            break;
        case 'n':
        case 'N':
            if (e.ctrlKey || e.metaKey) {
                e.preventDefault();
                switchScreen('script');
            }
            break;
        case 's':
        case 'S':
            if (e.ctrlKey || e.metaKey) {
                e.preventDefault();
                saveGame();
                showEvent({
                    title: 'Game Saved! 💾',
                    description: 'Your progress has been saved successfully.',
                    icon: '✅'
                });
            }
            break;
    }
});

// ====================================
// PERFORMANCE OPTIMIZATION
// ====================================

// Debounce function for expensive operations
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Optimized UI updates
const debouncedUIUpdate = debounce(updateUI, 100);

// ====================================
// GAME COMPLETE NOTIFICATION
// ====================================

console.log('🎬✨ Bollywood Cinema v3.0 - Complete Game Engine Loaded! ✨🎭');
console.log('🚀 All systems ready! Start your cinematic journey!');

// Export functions for global access
window.GameState = GameState;
window.switchScreen = switchScreen;
window.saveGame = saveGame;
window.toggleTheme = toggleTheme;

