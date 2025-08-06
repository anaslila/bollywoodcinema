<?xml version="1.0" encoding="UTF-8"?>
<MovieProductionSimulator>
  <GameInfo>
    <Title>Movie Production Simulator</Title>
    <Version>1.0</Version>
    <Currency>₹</Currency>
    <CurrencyFormat>#,##,##,##,##,###</CurrencyFormat>
    <Logo>https://www.flaticon.com/free-icon/clapperboard_1038100</Logo>
  </GameInfo>

  <!-- UI Configuration with Beautiful Color Schemes -->
  <UIConfiguration>
    <Theme name="cinematic_gold">
      <PrimaryColor>#1a1a1a</PrimaryColor>
      <SecondaryColor>#ffd700</SecondaryColor>
      <AccentColor>#ff6b35</AccentColor>
      <BackgroundColor>#0f0f0f</BackgroundColor>
      <TextColor>#ffffff</TextColor>
      <ButtonHover>#ffed4e</ButtonHover>
      <TabActive>#ffd700</TabActive>
      <TabInactive>#666666</TabInactive>
    </Theme>
    
    <Tabs>
      <Tab id="studio" name="Studio" icon="https://www.flaticon.com/free-icon/studio_3652191" />
      <Tab id="scripts" name="Scripts" icon="https://www.flaticon.com/free-icon/script_2991120" />
      <Tab id="casting" name="Casting" icon="https://www.flaticon.com/free-icon/casting_3652174" />
      <Tab id="production" name="Production" icon="https://www.flaticon.com/free-icon/film_3652186" />
      <Tab id="marketing" name="Marketing" icon="https://www.flaticon.com/free-icon/marketing_3652201" />
      <Tab id="boxoffice" name="Box Office" icon="https://www.flaticon.com/free-icon/ticket_3652224" />
      <Tab id="finances" name="Finances" icon="https://www.flaticon.com/free-icon/money_3652207" />
      <Tab id="profile" name="Profile" icon="https://www.flaticon.com/free-icon/user_3652233" />
    </Tabs>
  </UIConfiguration>

  <!-- Character Creation -->
  <CharacterCreation>
    <PlayerFaceIcons>
      <Icon id="face1" src="https://www.flaticon.com/free-icon/man_3135715" />
      <Icon id="face2" src="https://www.flaticon.com/free-icon/woman_3135823" />
      <Icon id="face3" src="https://www.flaticon.com/free-icon/businessman_3135768" />
      <Icon id="face4" src="https://www.flaticon.com/free-icon/businesswoman_3135844" />
    </PlayerFaceIcons>
    
    <StudioNameSuggestions>
      <Name>Bollywood Dreams Productions</Name>
      <Name>Mumbai Masala Studios</Name>
      <Name>Golden Gate Entertainment</Name>
      <Name>Royal Cinema Works</Name>
      <Name>Starlight Productions</Name>
      <Name>Desi Film Factory</Name>
      <Name>Cinematic Vision Studios</Name>
      <Name>Rainbow Entertainment</Name>
      <Name>Silver Screen Productions</Name>
      <Name>Mega Movie Makers</Name>
    </StudioNameSuggestions>
  </CharacterCreation>

<!-- Game Logic System (Continued) -->
<GameLogic>
  <StartingResources>
    <Money>₹50,00,000</Money>
    <Reputation>10</Reputation>
    <StudioLevel>1</StudioLevel>
    <MaxProjects>1</MaxProjects>
  </StartingResources>

  <MoneySystem>
    <Income>
      <BoxOfficeShare>0.75</BoxOfficeShare>
      <OTTDeals>0.15</OTTDeals>
      <MerchandisingRights>0.10</MerchandisingRights>
    </Income>
    <Expenses>
      <StudioRent>₹2,00,000</StudioRent>
      <StaffSalaries>₹5,00,000</StaffSalaries>
      <Utilities>₹50,000</Utilities>
      <Marketing>varies</Marketing>
    </Expenses>
  </MoneySystem>

  <ReputationSystem>
    <Factors>
      <BoxOfficeSuccess weight="40" />
      <CriticalAcclaim weight="25" />
      <AwardWins weight="20" />
      <PublicImage weight="15" />
    </Factors>
  </ReputationSystem>
</GameLogic>

<!-- Enhanced Indian Celebrities Database -->
<CelebrityDatabase>
  <Actors>
    <Actor id="1">
      <Name>Shah Rukh Khan</Name>
      <Popularity>95</Popularity>
      <Acting>92</Acting>
      <Bankability>98</Bankability>
      <Fee>₹25,00,00,000</Fee>
      <Genre>Romance, Drama, Action</Genre>
      <Age>58</Age>
      <CareerPhase>Veteran</CareerPhase>
    </Actor>
    <Actor id="2">
      <Name>Aamir Khan</Name>
      <Popularity>90</Popularity>
      <Acting>95</Acting>
      <Bankability>85</Bankability>
      <Fee>₹20,00,00,000</Fee>
      <Genre>Drama, Social, Thriller</Genre>
      <Age>59</Age>
      <CareerPhase>Veteran</CareerPhase>
    </Actor>
    <Actor id="3">
      <Name>Salman Khan</Name>
      <Popularity>88</Popularity>
      <Acting>75</Acting>
      <Bankability>95</Bankability>
      <Fee>₹15,00,00,000</Fee>
      <Genre>Action, Comedy, Drama</Genre>
      <Age>58</Age>
      <CareerPhase>Veteran</CareerPhase>
    </Actor>
    <Actor id="4">
      <Name>Ranbir Kapoor</Name>
      <Popularity>82</Popularity>
      <Acting>88</Acting>
      <Bankability>75</Bankability>
      <Fee>₹12,00,00,000</Fee>
      <Genre>Romance, Drama, Comedy</Genre>
      <Age>41</Age>
      <CareerPhase>Prime</CareerPhase>
    </Actor>
    <Actor id="5">
      <Name>Ranveer Singh</Name>
      <Popularity>85</Popularity>
      <Acting>82</Acting>
      <Bankability>80</Bankability>
      <Fee>₹10,00,00,000</Fee>
      <Genre>Drama, Comedy, Historical</Genre>
      <Age>38</Age>
      <CareerPhase>Prime</CareerPhase>
    </Actor>
    <Actor id="6">
      <Name>Deepika Padukone</Name>
      <Popularity>85</Popularity>
      <Acting>88</Acting>
      <Bankability>80</Bankability>
      <Fee>₹10,00,00,000</Fee>
      <Genre>Romance, Drama, Historical</Genre>
      <Age>38</Age>
      <CareerPhase>Prime</CareerPhase>
    </Actor>
    <Actor id="7">
      <Name>Alia Bhatt</Name>
      <Popularity>88</Popularity>
      <Acting>90</Acting>
      <Bankability>85</Bankability>
      <Fee>₹8,00,00,000</Fee>
      <Genre>Drama, Romance, Thriller</Genre>
      <Age>31</Age>
      <CareerPhase>Rising Star</CareerPhase>
    </Actor>
    <Actor id="8">
      <Name>Katrina Kaif</Name>
      <Popularity>78</Popularity>
      <Acting>70</Acting>
      <Bankability>75</Bankability>
      <Fee>₹6,00,00,000</Fee>
      <Genre>Action, Romance, Comedy</Genre>
      <Age>40</Age>
      <CareerPhase>Established</CareerPhase>
    </Actor>
  </Actors>

  <Directors>
    <Director id="1">
      <Name>Rajkumar Hirani</Name>
      <Skill>95</Skill>
      <Specialty>Comedy-Drama</Specialty>
      <Fee>₹5,00,00,000</Fee>
      <SuccessRate>90</SuccessRate>
      <Awards>Multiple Filmfare, National Awards</Awards>
    </Director>
    <Director id="2">
      <Name>Sanjay Leela Bhansali</Name>
      <Skill>92</Skill>
      <Specialty>Historical Drama</Specialty>
      <Fee>₹4,50,00,000</Fee>
      <SuccessRate>85</SuccessRate>
      <Awards>Padma Shri, National Awards</Awards>
    </Director>
    <Director id="3">
      <Name>Zoya Akhtar</Name>
      <Skill>88</Skill>
      <Specialty>Contemporary Drama</Specialty>
      <Fee>₹3,00,00,000</Fee>
      <SuccessRate>80</SuccessRate>
      <Awards>Filmfare Awards</Awards>
    </Director>
    <Director id="4">
      <Name>Rohit Shetty</Name>
      <Skill>75</Skill>
      <Specialty>Action Comedy</Specialty>
      <Fee>₹2,50,00,000</Fee>
      <SuccessRate>75</SuccessRate>
      <Awards>Commercial Success Expert</Awards>
    </Director>
    <Director id="5">
      <Name>Shoojit Sircar</Name>
      <Skill>90</Skill>
      <Specialty>Social Drama</Specialty>
      <Fee>₹2,00,00,000</Fee>
      <SuccessRate>85</SuccessRate>
      <Awards>National Film Awards</Awards>
    </Director>
  </Directors>

  <Writers>
    <Writer id="1">
      <Name>Abhijat Joshi</Name>
      <Skill>90</Skill>
      <Specialty>Comedy-Drama</Specialty>
      <Fee>₹50,00,000</Fee>
      <Awards>Filmfare Best Screenplay</Awards>
    </Writer>
    <Writer id="2">
      <Name>Juhi Chaturvedi</Name>
      <Skill>88</Skill>
      <Specialty>Social Drama</Specialty>
      <Fee>₹40,00,000</Fee>
      <Awards>National Film Awards</Awards>
    </Writer>
    <Writer id="3">
      <Name>Vijay Krishna Acharya</Name>
      <Skill>75</Skill>
      <Specialty>Action Thriller</Specialty>
      <Fee>₹30,00,000</Fee>
      <Awards>Commercial Writer</Awards>
    </Writer>
    <Writer id="4">
      <Name>Himanshu Sharma</Name>
      <Skill>85</Skill>
      <Specialty>Drama, Comedy</Specialty>
      <Fee>₹35,00,000</Fee>
      <Awards>Filmfare Nominations</Awards>
    </Writer>
  </Writers>

  <MusicDirectors>
    <MusicDirector id="1">
      <Name>A.R. Rahman</Name>
      <Skill>98</Skill>
      <Fee>₹2,00,00,000</Fee>
      <Specialty>All Genres</Specialty>
      <Awards>2 Oscars, Grammy, Padma Bhushan</Awards>
    </MusicDirector>
    <MusicDirector id="2">
      <Name>Shankar-Ehsaan-Loy</Name>
      <Skill>85</Skill>
      <Fee>₹1,00,00,000</Fee>
      <Specialty>Contemporary</Specialty>
      <Awards>Multiple Filmfare Awards</Awards>
    </MusicDirector>
    <MusicDirector id="3">
      <Name>Vishal-Shekhar</Name>
      <Skill>82</Skill>
      <Fee>₹80,00,000</Fee>
      <Specialty>Pop, Dance</Specialty>
      <Awards>Filmfare Awards</Awards>
    </MusicDirector>
    <MusicDirector id="4">
      <Name>Ilaiyaraaja</Name>
      <Skill>95</Skill>
      <Fee>₹1,50,00,000</Fee>
      <Specialty>Classical Fusion</Specialty>
      <Awards>Padma Bhushan, National Awards</Awards>
    </MusicDirector>
    <MusicDirector id="5">
      <Name>Amit Trivedi</Name>
      <Skill>88</Skill>
      <Fee>₹75,00,000</Fee>
      <Specialty>Indie, Contemporary</Specialty>
      <Awards>National Film Awards</Awards>
    </MusicDirector>
  </MusicDirectors>

  <Singers>
    <Singer id="1">
      <Name>Arijit Singh</Name>
      <Popularity>95</Popularity>
      <Fee>₹15,00,000</Fee>
      <Specialty>Romantic, Sad</Specialty>
      <Voice>Male</Voice>
    </Singer>
    <Singer id="2">
      <Name>Shreya Ghoshal</Name>
      <Popularity>92</Popularity>
      <Fee>₹12,00,000</Fee>
      <Specialty>Classical, Romantic</Specialty>
      <Voice>Female</Voice>
    </Singer>
    <Singer id="3">
      <Name>Rahat Fateh Ali Khan</Name>
      <Popularity>88</Popularity>
      <Fee>₹20,00,000</Fee>
      <Specialty>Sufi, Classical</Specialty>
      <Voice>Male</Voice>
    </Singer>
    <Singer id="4">
      <Name>Sunidhi Chauhan</Name>
      <Popularity>85</Popularity>
      <Fee>₹10,00,000</Fee>
      <Specialty>Dance, Pop</Specialty>
      <Voice>Female</Voice>
    </Singer>
    <Singer id="5">
      <Name>Armaan Malik</Name>
      <Popularity>80</Popularity>
      <Fee>₹8,00,000</Fee>
      <Specialty>Pop, Romantic</Specialty>
      <Voice>Male</Voice>
    </Singer>
  </Singers>
</CelebrityDatabase>

<!-- Movie Production Pipeline -->
<ProductionPipeline>
  <ScriptDevelopment>
    <Genres>
      <Genre id="romance" marketAppeal="85" budget="medium">
        <Name>Romance</Name>
        <Icon>https://www.flaticon.com/free-icon/love_1077035</Icon>
        <SuccessFactors>Star Cast, Music, Chemistry</SuccessFactors>
      </Genre>
      <Genre id="action" marketAppeal="90" budget="high">
        <Name>Action</Name>
        <Icon>https://www.flaticon.com/free-icon/explosion_1055014</Icon>
        <SuccessFactors>Stunts, VFX, Hero Appeal</SuccessFactors>
      </Genre>
      <Genre id="comedy" marketAppeal="80" budget="low">
        <Name>Comedy</Name>
        <Icon>https://www.flaticon.com/free-icon/laugh_1077090</Icon>
        <SuccessFactors>Timing, Script, Cast Chemistry</SuccessFactors>
      </Genre>
      <Genre id="drama" marketAppeal="75" budget="medium">
        <Name>Drama</Name>
        <Icon>https://www.flaticon.com/free-icon/drama_1077051</Icon>
        <SuccessFactors>Story, Performance, Direction</SuccessFactors>
      </Genre>
      <Genre id="thriller" marketAppeal="78" budget="medium">
        <Name>Thriller</Name>
        <Icon>https://www.flaticon.com/free-icon/mystery_1077087</Icon>
        <SuccessFactors>Plot Twists, Suspense, Pacing</SuccessFactors>
      </Genre>
      <Genre id="horror" marketAppeal="65" budget="low">
        <Name>Horror</Name>
        <Icon>https://www.flaticon.com/free-icon/ghost_1077052</Icon>
        <SuccessFactors>Scares, Atmosphere, Sound</SuccessFactors>
      </Genre>
      <Genre id="historical" marketAppeal="70" budget="very_high">
        <Name>Historical</Name>
        <Icon>https://www.flaticon.com/free-icon/castle_1077039</Icon>
        <SuccessFactors>Authenticity, Grandeur, Star Power</SuccessFactors>
      </Genre>
    </Genres>

    <ScriptQuality>
      <Poor>1-30</Poor>
      <Average>31-60</Average>
      <Good>61-80</Good>
      <Excellent>81-95</Excellent>
      <Masterpiece>96-100</Masterpiece>
    </ScriptQuality>

    <DevelopmentTime>
      <Rush>30 days</Rush>
      <Normal>60 days</Normal>
      <Polish>90 days</Polish>
      <Perfect>120 days</Perfect>
    </DevelopmentTime>
  </ScriptDevelopment>

  <PreProduction>
    <Tasks>
      <LocationScouting duration="14" cost="₹5,00,000" />
      <SetDesign duration="21" cost="₹15,00,000" />
      <CostumeDesign duration="14" cost="₹8,00,000" />
      <StoryBoard duration="10" cost="₹3,00,000" />
      <Rehearsals duration="7" cost="₹2,00,000" />
    </Tasks>
  </PreProduction>

  <Production>
    <ShootingSchedule>
      <IndoorDays>40-60</IndoorDays>
      <OutdoorDays>30-50</OutdoorDays>
      <SongSequences>10-15</SongSequences>
      <ActionSequences>5-20</ActionSequences>
    </ShootingSchedule>

    <DailyExpenses>
      <CrewCost>₹2,00,000</CrewCost>
      <EquipmentRental>₹1,50,000</EquipmentRental>
      <LocationCost>₹1,00,000</LocationCost>
      <FoodAndLodging>₹50,000</FoodAndLodging>
      <Miscellaneous>₹50,000</Miscellaneous>
    </DailyExpenses>
  </Production>

  <PostProduction>
    <Tasks>
      <Editing duration="30" cost="₹10,00,000" />
      <ColorGrading duration="10" cost="₹5,00,000" />
      <SoundMixing duration="15" cost="₹8,00,000" />
      <VFX duration="45" cost="₹2,00,00,000" />
      <MusicRecording duration="20" cost="₹15,00,000" />
      <DubbingADR duration="10" cost="₹3,00,000" />
    </Tasks>
  </PostProduction>
</ProductionPipeline>

<!-- Marketing & Distribution System -->
<MarketingSystem>
  <Strategies>
    <Strategy id="minimal" cost="₹5,00,00,000" reach="30" effectiveness="40">
      <Name>Minimal Marketing</Name>
      <Icon>https://www.flaticon.com/free-icon/low-battery_1077072</Icon>
      <Components>Basic TV Ads, Social Media</Components>
    </Strategy>
    <Strategy id="standard" cost="₹15,00,00,000" reach="60" effectiveness="70">
      <Name>Standard Marketing</Name>
      <Icon>https://www.flaticon.com/free-icon/marketing_1077074</Icon>
      <Components>TV, Radio, Print, Digital, Events</Components>
    </Strategy>
    <Strategy id="aggressive" cost="₹30,00,00,000" reach="85" effectiveness="90">
      <Name>Aggressive Marketing</Name>
      <Icon>https://www.flaticon.com/free-icon/megaphone_1077076</Icon>
      <Components>360° Campaign, Celebrity Appearances, International</Components>
    </Strategy>
    <Strategy id="premium" cost="₹50,00,00,000" reach="95" effectiveness="95">
      <Name>Premium Marketing</Name>
      <Icon>https://www.flaticon.com/free-icon/crown_1077045</Icon>
      <Components>Global Campaign, Premium Events, Influencer Network</Components>
    </Strategy>
  </Strategies>

  <ReleaseTypes>
    <Release id="limited" screens="500-800" cost="₹2,00,00,000">
      <Name>Limited Release</Name>
      <MarketPenetration>25</MarketPenetration>
    </Release>
    <Release id="wide" screens="1500-2500" cost="₹5,00,00,000">
      <Name>Wide Release</Name>
      <MarketPenetration>60</MarketPenetration>
    </Release>
    <Release id="mega" screens="3000-4000" cost="₹10,00,00,000">
      <Name>Mega Release</Name>
      <MarketPenetration>85</MarketPenetration>
    </Release>
    <Release id="global" screens="4500+" cost="₹15,00,00,000">
      <Name>Global Release</Name>
      <MarketPenetration>95</MarketPenetration>
    </Release>
  </ReleaseTypes>
</MarketingSystem>

<!-- Box Office Calculation System -->
<BoxOfficeSystem>
  <Factors>
    <StarPower weight="25" />
    <ScriptQuality weight="20" />
    <DirectorReputation weight="15" />
    <MarketingReach weight="15" />
    <GenreAppeal weight="10" />
    <MusicQuality weight="8" />
    <SeasonalTiming weight="4" />
    <Competition weight="3" />
  </Factors>

  <WeeklyCollection>
    <Week1 percentage="40-50" />
    <Week2 percentage="25-30" />
    <Week3 percentage="15-20" />
    <Week4+ percentage="5-10" />
  </WeeklyCollection>

  <TheatreDistribution>
    <Exhibitor share="50" />
    <Distributor share="25" />
    <Producer share="25" />
  </TheatreDistribution>

  <OTTDeals>
    <Timing>
      <TheatricalWindow>45-90 days</TheatricalWindow>
      <Premium>₹20,00,00,000 - ₹1,00,00,00,000</Premium>
    </Timing>
  </OTTDeals>
</BoxOfficeSystem>

<!-- Advanced UI Components -->
<UIComponents>
  <Dashboard>
    <Widgets>
      <Widget id="cashflow" type="financial">
        <Title>Cash Flow</Title>
        <Icon>https://www.flaticon.com/free-icon/money-flow_1077078</Icon>
        <DisplayType>Real-time Graph</DisplayType>
      </Widget>
      <Widget id="projects" type="production">
        <Title>Active Projects</Title>
        <Icon>https://www.flaticon.com/free-icon/film-reel_1077055</Icon>
        <DisplayType>Progress Bars</DisplayType>
      </Widget>
      <Widget id="reputation" type="status">
        <Title>Studio Reputation</Title>
        <Icon>https://www.flaticon.com/free-icon/star_1077092</Icon>
        <DisplayType>Rating Stars</DisplayType>
      </Widget>
      <Widget id="boxoffice" type="performance">
        <Title>Box Office Tracker</Title>
        <Icon>https://www.flaticon.com/free-icon/analytics_1077032</Icon>
        <DisplayType>Live Counter</DisplayType>
      </Widget>
    </Widgets>
  </Dashboard>

  <AnimationEffects>
    <CountUp enabled="true" duration="2000ms" />
    <FadeIn enabled="true" duration="500ms" />
    <SlideTransitions enabled="true" duration="300ms" />
    <HoverEffects enabled="true" />
    <ParallaxScrolling enabled="true" />
    <ParticleEffects enabled="true" theme="golden_sparkles" />
  </AnimationEffects>

  <SoundEffects>
    <UIClick>cash_register.wav</UIClick>
    <Success>applause.wav</Success>
    <Failure>dramatic_fail.wav</Failure>
    <BoxOfficeHit>celebration.wav</BoxOfficeHit>
    <BackgroundMusic>bollywood_instrumental.mp3</BackgroundMusic>
  </SoundEffects>
</UIComponents>

<!-- Random Events System -->
<RandomEvents>
  <Event id="controversy" probability="15" impact="negative">
    <Title>Celebrity Controversy</Title>
    <Description>Your lead actor is involved in a public scandal</Description>
    <Effects>
      <BoxOfficeImpact>-20%</BoxOfficeImpact>
      <ReputationImpact>-15</ReputationImpact>
      <MarketingCostIncrease>+30%</MarketingCostIncrease>
    </Effects>
  </Event>
  
  <Event id="award_win" probability="8" impact="positive">
    <Title>Unexpected Award Win</Title>
    <Description>Your movie wins a prestigious award</Description>
    <Effects>
      <BoxOfficeBoost>+25%</BoxOfficeBoost>
      <ReputationIncrease>+20</ReputationIncrease>
      <NextProjectInterest>+40%</NextProjectInterest>
    </Effects>
  </Event>

  <Event id="piracy" probability="20" impact="negative">
    <Title>Movie Leaked Online</Title>
    <Description>Your movie gets leaked before release</Description>
    <Effects>
      <BoxOfficeImpact>-15%</BoxOfficeImpact>
      <OTTDealImpact>-10%</OTTDealImpact>
    </Effects>
  </Event>

  <Event id="hit_song" probability="12" impact="positive">
    <Title>Viral Song Hit</Title>
    <Description>One of your movie songs becomes a viral sensation</Description>
    <Effects>
      <MarketingBoost>+50%</MarketingBoost>
      <AudienceInterest>+30%</AudienceInterest>
    </Effects>
  </Event>
</RandomEvents>

<!-- Studio Upgrade System -->
<StudioUpgrades>
  <Upgrade id="better_facilities" cost="₹2,00,00,000" level="2">
    <Name>Enhanced Studio Facilities</Name>
    <Icon>https://www.flaticon.com/free-icon/studio_1077094</Icon>
    <Benefits>
      <ProductionSpeedIncrease>15%</ProductionSpeedIncrease>
      <QualityBonus>+5</QualityBonus>
    </Benefits>
  </Upgrade>

  <Upgrade id="star_contracts" cost="₹5,00,00,000" level="3">
    <Name>Exclusive Star Contracts</Name>
    <Icon>https://www.flaticon.com/free-icon/contract_1077043</Icon>
    <Benefits>
      <StarDiscounts>20%</StarDiscounts>
      <PriorityBooking>true</PriorityBooking>
    </Benefits>
  </Upgrade>

  <Upgrade id="distribution_network" cost="₹10,00,00,000" level="4">
    <Name>Own Distribution Network</Name>
    <Icon>https://www.flaticon.com/free-icon/network_1077080</Icon>
    <Benefits>
      <DistributionSavings>25%</DistributionSavings>
      <BoxOfficeShare>+10%</BoxOfficeShare>
    </Benefits>
  </Upgrade>

  <Upgrade id="vfx_studio" cost="₹15,00,00,000" level="5">
    <Name>In-House VFX Studio</Name>
    <Icon>https://www.flaticon.com/free-icon/special-effects_1077091</Icon>
    <Benefits>
      <VFXCostReduction>40%</VFXCostReduction>
      <QualityBonus>+10</QualityBonus>
    </Benefits>
  </Upgrade>
</StudioUpgrades>

<!-- Tutorial System -->
<Tutorial>
  <Step id="1">
    <Title>Welcome to Movie Production Simulator!</Title>
    <Description>Create your character and name your production house</Description>
    <Highlight>profile_tab</Highlight>
    <Action>character_creation</Action>
  </Step>
  
  <Step id="2">
    <Title>Your First Script</Title>
    <Description>Every great movie starts with a great script. Let's create one!</Description>
    <Highlight>scripts_tab</Highlight>
    <Action>script_creation</Action>
  </Step>
  
  <Step id="3">
    <Title>Casting Your Stars</Title>
    <Description>Time to hire actors, directors, and crew for your movie</Description>
    <Highlight>casting_tab</Highlight>
    <Action>cast_selection</Action>
  </Step>
  
  <Step id="4">
    <Title>Lights, Camera, Action!</Title>
    <Description>Monitor your movie production and handle any issues that arise</Description>
    <Highlight>production_tab</Highlight>
    <Action>production_monitoring</Action>
  </Step>
  
  <Step id="5">
    <Title>Marketing Magic</Title>
    <Description>Create buzz for your movie with the right marketing strategy</Description>
    <Highlight>marketing_tab</Highlight>
    <Action>marketing_setup</Action>
  </Step>
  
  <Step id="6">
    <Title>Box Office Glory</Title>
    <Description>Watch your movie's performance and collect your earnings</Description>
    <Highlight>boxoffice_tab</Highlight>
    <Action>results_viewing</Action>
  </Step>
</Tutorial>

<!-- Achievement System -->
<Achievements>
  <Achievement id="first_hit">
    <Name>First Blockbuster</Name>
    <Description>Create your first movie that earns ₹100 crores+</Description>
    <Icon>https://www.flaticon.com/free-icon/trophy_1077095</Icon>
    <Reward>₹50,00,000 bonus</Reward>
  </Achievement>
  
  <Achievement id="star_maker">
    <Name>Star Maker</Name>
    <Description>Launch a newcomer who becomes a superstar</Description>
    <Icon>https://www.flaticon.com/free-icon/shooting-star_1077089</Icon>
    <Reward>Permanent casting discount</Reward>
  </Achievement>
  
  <Achievement id="multi_genre">
    <Name>Genre Master</Name>
    <Description>Create successful movies in 5 different genres</Description>
    <Icon>https://www.flaticon.com/free-icon/diversity_1077047</Icon>
    <Reward>Script quality bonus</Reward>
  </Achievement>
  
  <Achievement id="franchise_king">
    <Name>Franchise King</Name>
    <Description>Create a successful movie franchise (3+ movies)</Description>
    <Icon>https://www.flaticon.com/free-icon/chain_1077038</Icon>
    <Reward>Sequel production discount</Reward>
  </Achievement>
</Achievements>

</MovieProductionSimulator>
        document.getElementById('week2').textContent = this.formatCurrency(Math.round(collection * 0.25));
        document.getElementById('week3').textContent = this.formatCurrency(Math.round(collection * 0.20));
        document.getElementById('week4').textContent = this.formatCurrency(Math.round(collection * 0.10));
        
        let status = 'Average';
        if (collection > 1000000000) status = 'Blockbuster';
        else if (collection > 500000000) status = 'Hit';
        else if (collection > 200000000) status = 'Above Average';
        else if (collection < 100000000) status = 'Flop';
        
        document.getElementById('collection-status').innerHTML = `<span class="status-text">${status}</span>`;
    }

    // Update Finances Tab - Enhanced
    updateFinancesTab() {
        const balanceEl = document.getElementById('current-balance');
        if (balanceEl) balanceEl.textContent = this.formatCurrency(this.gameData.player.money);
        
        const monthlyIncome = this.calculateMonthlyIncome();
        const monthlyExpenses = this.calculateMonthlyExpenses();
        const netProfit = monthlyIncome - monthlyExpenses;
        
        const monthlyIncomeEl = document.getElementById('monthly-income');
        const monthlyExpensesEl = document.getElementById('monthly-expenses');
        const netProfitEl = document.getElementById('net-monthly-profit');
        
        if (monthlyIncomeEl) monthlyIncomeEl.textContent = this.formatCurrency(monthlyIncome);
        if (monthlyExpensesEl) monthlyExpensesEl.textContent = this.formatCurrency(monthlyExpenses);
        if (netProfitEl) netProfitEl.textContent = this.formatCurrency(netProfit);
        
        const totalDebt = this.gameData.player.loans.reduce((sum, loan) => sum + loan.remainingAmount, 0);
        const totalDebtEl = document.getElementById('total-debt');
        if (totalDebtEl) totalDebtEl.textContent = this.formatCurrency(totalDebt);
    }

    // Calculate Monthly Income
    calculateMonthlyIncome() {
        let income = 0;
        
        // Income from completed movies (OTT deals, satellite rights)
        this.gameData.completedProjects.forEach(project => {
            if (project.ottDeal) {
                income += project.ottDeal / 12; // Monthly income from OTT
            }
            if (project.satelliteRights) {
                income += project.satelliteRights / 24; // Spread over 2 years
            }
        });
        
        return income;
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
            },
            'FRANCHISE': () => {
                // Unlock all franchises
                Object.keys(this.franchises).forEach(franchiseKey => {
                    this.franchises[franchiseKey].unlocked = true;
                });
                this.showNotification('🏆 All Franchises Unlocked!', 'success');
            },
            'MAXCREW': () => {
                // Max out all staff instantly
                this.gameData.staff.admin.productionManager = 3;
                this.gameData.staff.admin.accountant = 2;
                this.gameData.staff.admin.prManager = 2;
                this.gameData.staff.tech.cameraOperator = 5;
                this.gameData.staff.tech.soundEngineer = 3;
                this.gameData.staff.tech.videoEditor = 4;
                this.showNotification('👥 Maximum Staff Hired!', 'success');
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

    // Trigger Random Event
    triggerRandomEvent() {
        if (this.gameData.projects.length === 0) return;
        
        const randomIndex = Math.floor(Math.random() * this.randomEvents.length);
        const event = this.randomEvents[randomIndex];
        
        if (Math.random() * 100 < event.probability) {
            this.showNotification(event.title + ': ' + event.description, 'warning');
            this.applyEventEffects(event);
        }
    }

    // Apply Event Effects
    applyEventEffects(event) {
        const activeProject = this.gameData.projects.find(p => p.status === 'production' || p.status === 'post_production');
        
        if (event.impact.boxOffice && activeProject) {
            const multiplier = 1 + (event.impact.boxOffice / 100);
            activeProject.eventMultiplier = (activeProject.eventMultiplier || 1) * multiplier;
        }
        
        if (event.impact.reputation) {
            this.gameData.player.reputation = Math.max(0, Math.min(100, this.gameData.player.reputation + event.impact.reputation));
        }
        
        if (event.impact.productionCost && activeProject) {
            const additionalCost = activeProject.totalBudget * (event.impact.productionCost / 100);
            activeProject.totalBudget += additionalCost;
            this.gameData.player.money -= additionalCost;
        }
    }

    // Update UI - Enhanced
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
        if (this.gameData.projects.length > 0) {
            this.showActiveScripts();
        }
        
        // Update movie selector
        this.updateMovieSelector();
    }

    // Show Notification - Enhanced
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

    // Save Game - Enhanced
    saveGame() {
        try {
            localStorage.setItem('bollywoodSimulatorSave', JSON.stringify(this.gameData));
        } catch (error) {
            console.error('Failed to save game:', error);
            this.showNotification('Failed to save game!', 'error');
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

    // Calculate Box Office Collection
    calculateBoxOfficeCollection(project) {
        let baseCollection = 100000000; // Base ₹10 crores
        
        // Genre multiplier
        const genreMultiplier = this.genres[project.genre].marketAppeal / 100;
        baseCollection *= genreMultiplier;
        
        // Cast popularity boost
        let castBoost = 1;
        project.cast.lead.forEach(actor => {
            if (actor) castBoost += (actor.popularity / 100) * 0.3;
        });
        project.cast.supporting.forEach(actor => {
            if (actor) castBoost += (actor.popularity / 100) * 0.1;
        });
        
        if (project.cast.director) {
            castBoost += (project.cast.director.skill / 100) * 0.2;
        }
        
        baseCollection *= castBoost;
        
        // Franchise bonus
        if (project.isFranchise && project.franchise) {
            const franchise = this.franchises[project.franchise];
            baseCollection *= (1 + franchise.successBonus / 100);
        }
        
        // Format premium
        const formatMultipliers = {
            '2d': 1,
            '3d': 1.15,
            'imax': 1.3,
            '4dx': 1.45,
            '5d': 1.6
        };
        baseCollection *= formatMultipliers[project.format] || 1;
        
        // Script quality impact
        baseCollection *= (project.scriptQuality / 100);
        
        // Random factor
        baseCollection *= (0.7 + Math.random() * 0.6); // 70% to 130%
        
        // Event multiplier
        if (project.eventMultiplier) {
            baseCollection *= project.eventMultiplier;
        }
        
        return Math.round(baseCollection);
    }

    // Release Movie
    releaseMovie(projectId) {
        const project = this.gameData.projects.find(p => p.id === projectId);
        if (!project || project.status !== 'marketing_ready') return;
        
        project.status = 'released';
        project.boxOfficeCollection = this.calculateBoxOfficeCollection(project);
        project.releaseDate = { ...this.gameData.player.currentDate };
        
        // Add to completed projects
        this.gameData.completedProjects.push(project);
        this.gameData.projects = this.gameData.projects.filter(p => p.id !== projectId);
        
        // Calculate profit/loss
        const profit = project.boxOfficeCollection - project.totalBudget;
        this.gameData.player.money += project.boxOfficeCollection * 0.5; // Producer's share
        this.gameData.player.totalIncome += project.boxOfficeCollection * 0.5;
        
        // Update reputation
        if (profit > 0) {
            this.gameData.player.reputation = Math.min(100, this.gameData.player.reputation + 5);
        } else {
            this.gameData.player.reputation = Math.max(0, this.gameData.player.reputation - 3);
        }
        
        const status = project.boxOfficeCollection > 1000000000 ? 'BLOCKBUSTER' :
                      project.boxOfficeCollection > 500000000 ? 'HIT' :
                      project.boxOfficeCollection > 200000000 ? 'AVERAGE' : 'FLOP';
        
        this.showNotification(`"${project.title}" released! Box Office: ${this.formatCurrency(project.boxOfficeCollection)} - ${status}`, 'success');
        this.switchTab('boxoffice');
    }
}

// Initialize the game when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('🎬 Starting Bollywood Simulator...');
    
    // Initialize the game
    window.bollywoodSimulator = new BollywoodSimulator();
    
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
            window.bollywoodSimulator.saveGame();
            window.bollywoodSimulator.showNotification('Game saved manually!', 'success', 2000);
        }
        
        if (e.key === 'Escape') {
            document.querySelectorAll('.modal-overlay').forEach(modal => {
                modal.style.display = 'none';
            });
        }
    });
    
    console.log('🎮 Bollywood Simulator loaded successfully!');
    console.log('💡 Pro Tips:');
    console.log('- Use Ctrl+S to save game manually');
    console.log('- Try promo codes: SANDBOX, RICHMODE, GODMODE, SUPERSTAR, FREELOAN, TIMETRAVEL, FRANCHISE, MAXCREW');
    console.log('- Click on money to access financial management');
    console.log('- Game auto-saves every minute');
});

// Export for potential module use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = BollywoodSimulator;
}
