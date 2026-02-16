
// import { Routes, Route } from 'react-router-dom';
import React from 'react';

// import Home from './pages/Home';

// Home 
import Home3 from './pages/Home3';
// import Home3 from './pages/Home3Mobile';


// import NmdHome from './pages/NmdHome';



// import Login2 from './pages/Login2';
import PlayerDash from './pages/PlayerDash';
// import PlayerDash2 from './pages/playerDash2';
import PlayerStats from './pages/playerStats';
import PlayerProfile from './pages/playerProfile';
import PlayerProfile2 from './pages/PlayerProfile2';
import ForgotPassword from './pages/ForgotPassword';
import Sidebar from './components/Sidebar';
import userSidebar from './components/userSidebar';
import TrainerPage from './pages/training';


import Login from './pages/Login';
import Login2 from './pages/login2';
import Login3 from './pages/login3';

// import LoginPlayer from './pages/LoginPlayer';
// import LoginClub from './pages/LoginClub';
// import LoginManager from './pages/LoginManager';
import LoginAdmin from './pages/LoginAdmin';
// import SignupPlayer from './pages/SignupPlayer';
// import SignupClub from './pages/SignupClub';
// import SignupManager from './pages/SignupManager';
import SignupAdmin from './pages/SignupAdmin';
import Services from './pages/Services';
// import About from './pages/About';
import { UserProvider } from './context/UserContext';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'; //updated 5/6/25
import StreetBallPage from './pages/trySportbit';
import ChatUi from './pages/chatUi';
import ChatPage from './pages/ChatPage';

import ClubManagementService from './pages/clubManagementService';
import FinancialManagement from './pages/financialManagement';
import AITalentScouting from './pages/aiTalentScouting';

import Pricing from './pages/pricing2';
// import About from './pages/About';
import FluidGlass from './components/fluidGlass';

// player pages 
import PlayerStatistics from './pages/PlayerStatistics';
import PlayerStatsPage from './pages/PlayerStatsPage';
import PlayerStatsPage2 from './pages/PlayerStatsPage2';
import PlayerStats2 from './pages/playerStats2';

// manager pages 
import ManagerDash from './pages/ManagerDash';
import MatchPlanning from './pages/manager/MatchPlanning';
import Contracts from './pages/manager/Contracts';
import ManagerChat from './pages/manager/ManagerChat';
import Schedule from './pages/manager/Schedule';

//club pages
import ClubDashboard from './pages/ClubDashboard'
import ManagePlayers from './pages/club/ManagePlayers'
import MatchSchedule from './pages/club/MatchSchedule'
import Stats from './pages/club/Stats'
import HealthReport from './pages/club/HealthReport'
import ManageClub from './pages/club/ManageClub'







import AdminSidebar from './components/AdminSidebar';
import AdminDashboard from './pages/AdminDashboard';
import UserMgmt from './pages/admin/UserMgmt';
import Payments from './pages/admin/Payments';
import ContentMgmt from './pages/admin/ContentMgmt';
import Analytics from './pages/admin/Analytics';




import ClubOffers from './pages/ClubOffers';



import ManageUsers from './pages/ManageUsers';
import AdminSettings from './pages/AdminSettings';
import PlayerMarketplace from './pages/PlayerMarket2';
import AiScheduleEngine from './pages/AiScheduleEngine';
import InjuryTracking from './pages/InjuryTracking';

import OrbAi from './pages/orbAi';

import HealthDashboard from './pages/HealthDashboard';
import AiGrowthPlan from './pages/AiGrowthPlan';

// home redesign update
import ScrollTransitionPage from './pages/Home2';
// home redesign update

// neumorphidm updates 
import NmdDashboard from './pages/NmdDashboard'
import NmdSidebar2 from './components/NmdSidebar2'
import NmdPlayerStats from './pages/NmdPlayerStats'
import NmdApplication from './pages/NmdApplication'
import NmdClubOffers from './pages/NmdClubOffers'
import NmdChatPage from './pages/NmdChatPage'
import NmdSettings from './pages/NmdSettings'
import NmdAiSkill from './pages/NmdAiSkill'
import NmdAbout from './pages/NmdAbout'
import NmdFinanceService from './pages/NmdFinanceService';
import NmdClubManagement from './pages/NmdClubManagement';
import NmdTraining from './pages/NmdTraining';


// import ProtectedRoute from './utils/ProtectedRoute';
import BookDemo from './pages/BookDemo';
import DietPlanner from './pages/DietPlanner';
import { PlayerContext, PlayerProvider } from './context/PlayerContext';





// physio imports 
import PhysioPage from './pages/PhysioPage';
import PhysioDashboard from './pages/PhysioDashboard';
// import SignupPhysio from './pages/SignupPhysio';
import TreatmentPlans from './pages/physio/TreatmentPlans';
import Appointments from './pages/physio/Appointments';
import PhysioChat from './pages/physio/PhysioChat';



// coach pages
// import SignupCoach from './pages/SignupCoach';
import CoachDashboard from './pages/CoachDashboard';
import Training from './pages/coach/Training';
import CoachManagePlayers from './pages/coach/ManagePlayers';
import Messages from './pages/coach/messages';
import CoachAnalytics from './pages/coach/analytics';


// Nutritionist pages
// import SignupNutri from './pages/SignupNutri';
import NutriDashboard from './pages/NutriDashboard';
import DietPlans from './pages/nutritionist/dietPlans';
import Consults from './pages/nutritionist/Consults';
import NutriAnalytics from './pages/nutritionist/NutriAnalytics';



// pitch manager pages
// import SignupPitchManager from './pages/SignupPitchManager';
import PitchManagerDash from './pages/PitchManagerDash';
import Maintanance from './pages/pitchManager/Maintanance';
import Bookings from './pages/pitchManager/Bookings';
import Reports from './pages/pitchManager/Reports';
import Ground from './pages/pitchManager/Ground';



// Agent imports 
import AgentDashboard from './pages/AgentDashboard';
// import SignupAgent from './pages/SignupAgent';
import AgentPage from './pages/AgentPage';
import AgentPlayerStats from './pages/agent/AgentPlayerStats';
import AgentContracts from './pages/agent/AgentContracts';
import AgentChat from './pages/agent/AgentChat';
import OfferTracker from './pages/agent/OfferTracker';



// service pages
import ServiceClub from './pages/ServiceClub';

// import Timeline from "./pages/Timeline";



//signup 
import SignupPlayer from "./pages/signup/player";
import SignupClub from "./pages/signup/club";
import SignupManager from "./pages/signup/manager";
import SignupAgent from "./pages/signup/agent";
import SignupPhysio from "./pages/signup/physio";
import SignupCoach from "./pages/signup/coach";
import SignupNutri from "./pages/signup/nutritionist";
import SignupPitchManager from "./pages/signup/pitchManager";

import AiAgent from "./components/AiAGent"


// about page 
import About2 from "./pages/about2"

// ai agent 
// import AgentAi from "./pages/aiAgent";
import AgentAi from "./pages/AI/sportbitAI";
import AiChat from "./pages/AI/aiChat";


import PlayerMarketRegister from "./pages/PlayerMarketRegister";

// about page 
import StorytellingAbout from "./pages/about/about";
// feed 
import Timeline from "./pages/Feed/Timeline";

import ProtectedRoute from "./routes/ProtectedRoutes";
import Chat2 from "./pages/Chat";
import UserProfile from './pages/profile/profile';
import Profile2 from './pages/profile/profile2';


// import SmoothScroll from "./lib/SmoothScroll";
// import PageTransition from "./lib/PageTransition";
// import "./styles/page-transition.css";




function App() {
  return (
    <UserProvider>
      <PlayerProvider>
        {/* <SmoothScroll> */}
        {/* <PageTransition> */}
        <Routes>
          {/* <Route path="/" element={<Home />} /> */}
          <Route path="/" element={<Home3 />} />
          {/* <Route path="/" element={<NmdHome />} /> */}


          {/* <Route path="/login" element={<Login />} /> */}
          {/* <Route path="/login/player" element={<Login     role="player" />} /> */}
          {/* <Route path="/login/club" element={<Login role="club" /    >} /> */}
          {/* <Route path="/login/manager" element={<Login     role="manager" />} /> */}
          {/* <Route path="/login/admin" element={<Login     role="admin" />} /> */}
          {/* <Route path="/forgot-password" element={<ForgotPassword />} /> */}
          <Route path="/playerDash" element={<PlayerDash />} />
          <Route path="/playerStats" element={<PlayerStats />} />
          <Route path="/playerProfile" element={<PlayerProfile />} />
          <Route path="/PlayerProfile2" element={<PlayerProfile2 />} />
          <Route path="/trySportbit" element={<StreetBallPage />} />
          <Route path="/chatUi" element={<ChatUi />} />
          <Route path="/ChatPage" element={<ChatPage />} />


          <Route path="/sidebar" element={<Sidebar />} />
          <Route path="/userSidebar" element={<userSidebar />} />
          <Route path="/training" element={<TrainerPage />} />

          {/* <Route path="/login/player" element={<LoginPlayer />} /> */}
          {/* <Route path="/login/club" element={<LoginClub />} /> */}


          <Route path="/login2" element={<Login2 />} />
          <Route path="/login3" element={<Login3 />} />








          {/* <Route path="/login/manager" element={<LoginManager />} /> */}
          <Route path="/login/admin" element={<LoginAdmin />} />
          {/* <Route path="/signup/player" element={<SignupPlayer />} /> */}
          {/* <Route path="/signup/club" element={<SignupClub />} /> */}
          {/* <Route path="/signup/manager" element={<SignupManager />} /> */}
          <Route path="/signup/admin" element={<SignupAdmin />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/services" element={<Services />} />
          {/* <Route path="/about" element={<About />} /> */}
          <Route path="/dashboard/player" element={<PlayerDash />} />
          <Route path="/playerStats2" element={<PlayerStats2 />} />
          <Route path="/ClubOffers" element={<ClubOffers />} />



          <Route path="/clubManagementService" element={<ClubManagementService />} />
          <Route path="/financialManagement" element={<FinancialManagement />} />
          <Route path="/aiTalentScouting" element={<AITalentScouting />} />
          <Route path="/PlayerMarket2" element={<PlayerMarketplace />} />
          <Route path="/AiScheduleEngine" element={<AiScheduleEngine />} />
          <Route path="/InjuryTracking" element={<InjuryTracking />} />

          <Route path="/orbAi" element={<OrbAi />} />

          <Route path="/pricing" element={<Pricing />} />
          {/* <Route path="/About" element={<About />} /> */}
          <Route path="/fluidGlass" element={<FluidGlass />} />


          <Route path="/playerStatistics" element={<PlayerStatistics />} />
          <Route path="/PlayerStatsPage" element={<PlayerStatsPage />} />
          <Route path="/PlayerStatsPage2" element={<PlayerStatsPage2 />} />


          <Route path="/ManagerDash" element={<ManagerDash />} />
          <Route path="/manager/MatchPlanning" element={<MatchPlanning />} />
          <Route path="/manager/Contracts" element={<Contracts />} />
          <Route path="/manager/ManagerChat" element={<ManagerChat />} />
          <Route path="/manager/Schedule" element={<Schedule />} />




          {/* admin pages  */}
          <Route path="/AdminDashboard" element={<AdminDashboard />} />
          <Route path="/admin/users" element={<ManageUsers />} />
          <Route path="/admin/settings" element={<AdminSettings />} />
          <Route path="/admin/UserMgmt" element={<UserMgmt />} />
          <Route path="/admin/Payments" element={<Payments />} />
          <Route path="/admin/ContentMgmt" element={<ContentMgmt />} />
          <Route path="/admin/Analytics" element={<Analytics />} />

          {/* club pages  */}
          <Route path="/ClubDashboard" element={<ClubDashboard />} />
          <Route path="/club/ManagePlayers" element={<ManagePlayers />} />
          <Route path="/club/MatchSchedule" element={<MatchSchedule />} />
          <Route path="/club/Stats" element={<Stats />} />
          <Route path="/club/HealthReport" element={<HealthReport />} />
          <Route path="/club/ManageClub" element={<ManageClub />} />





          <Route path="/HealthDashboard" element={<HealthDashboard />} />
          <Route path="/AIGrowthPlan" element={<AiGrowthPlan />} />

          {/* home redesign update */}
          <Route path="/Home2" element={<ScrollTransitionPage />} />
          {/* home redesign update */}
          {/* Neuromorph design updates  */}
          <Route path="/NmdDashboard" element={<NmdDashboard />} />
          <Route path="/components/NmdSidebar2" element={<NmdSidebar2 />} />
          <Route path="/NmdPlayerStats" element={<NmdPlayerStats />} />
          <Route path="/NmdApplication" element={<NmdApplication />} />
          <Route path="/NmdClubOffers" element={<NmdClubOffers />} />
          <Route path="/NmdChatPage" element={<NmdChatPage />} />
          <Route path="/NmdSettings" element={<NmdSettings />} />
          <Route path="/NmdAiSkill" element={<NmdAiSkill />} />
          <Route path="/NmdAbout" element={<NmdAbout />} />
          <Route path="/NmdFinanceService" element={<NmdFinanceService />} />
          <Route path="/NmdClubManagement" element={<NmdClubManagement />} />
          <Route path="/NmdTraining" element={<NmdTraining />} />
          <Route path="/BookDemo" element={<BookDemo />} />
          <Route path="/DietPlanner" element={<DietPlanner />} />


          {/* physio pages  */}
          <Route path="/PhysioPage" element={<PhysioPage />} />
          <Route path="/PhysioDashboard" element={<PhysioDashboard />} />
          {/* <Route path="/signup/physio" element={<SignupPhysio />} /> */}
          <Route path="/physio/TreatmentPlans" element={<TreatmentPlans />} />
          <Route path="/physio/Appointments" element={<Appointments />} />
          <Route path="/physio/PhysioChat" element={<PhysioChat />} />



          {/* Coach pages */}
          {/* <Route path="/signup/coach" element={<SignupCoach />} /> */}
          <Route path="/CoachDashboard" element={<CoachDashboard />} />
          <Route path="/coach/Training" element={<Training />} />
          <Route path="/coach/ManagePlayers" element={<CoachManagePlayers />} />
          <Route path="/coach/messages" element={<Messages />} />
          <Route path="/coach/analytics" element={<CoachAnalytics />} />


          {/* Nutritionist pages */}
          {/* <Route path="/signup/nutritionist" element={<SignupNutri />} /> */}
          <Route path="/NutriDashboard" element={<NutriDashboard />} />
          <Route path="/nutritionist/dietPlans" element={<DietPlans />} />
          <Route path="/nutritionist/Consults" element={<Consults />} />
          <Route path="/nutritionist/NutriAnalytics" element={<NutriAnalytics />} />



          {/* pitch manager  */}
          {/* <Route path="/signup/pitchManager" element={<SignupPitchManager />} /> */}
          <Route path="/PitchManagerDash" element={<PitchManagerDash />} />
          <Route path="/pitchManager/Maintanance" element={<Maintanance />} />
          <Route path="/pitchManager/Bookings" element={<Bookings />} />
          <Route path="/pitchManager/Reports" element={<Reports />} />
          <Route path="/pitchManager/Ground" element={<Ground />} />



          {/* agent pages */}
          <Route path="/AgentDashboard" element={<AgentDashboard />} />
          {/* <Route path="/signup/agent" element={<SignupAgent />} /> */}
          <Route path="/AgentPage" element={<AgentPage />} />
          <Route path="/agent/AgentPlayerStats" element={<AgentPlayerStats />} />
          <Route path="/agent/AgentContracts" element={<AgentContracts />} />
          <Route path="/agent/AgentChat" element={<AgentChat />} />
          <Route path="/agent/OfferTracker" element={<OfferTracker />} />




          {/* service pages */}
          <Route path="/ServiceClub" element={<ServiceClub />} />

          {/* <Route path="/Timeline" element={<Timeline />} /> */}



          {/* signup  */}
          <Route path="/signup/player" element={<SignupPlayer />} />
          <Route path="/signup/club" element={<SignupClub />} />
          <Route path="/signup/manager" element={<SignupManager />} />
          <Route path="/signup/physio" element={<SignupPhysio />} />
          <Route path="/signup/coach" element={<SignupCoach />} />
          <Route path="/signup/nutritionist" element={<SignupNutri />} />
          <Route path="/signup/pitchManager" element={<SignupPitchManager />} />
          <Route path="/signup/agent" element={<SignupAgent />} />


          <Route path="components/AiAgent" element={<AiAgent />} />

          {/* about page  */}
          <Route path="about2" element={<About2 />} />


          {/* ai agent  */}
          {/* <Route path="/aiAgent" element={<AgentAi />} /> */}
          <Route path="/sportbitAI" element={<AgentAi />} />
          <Route path="/ai/chat" element={<AiChat />} />

          <Route path="/market/register" element={<PlayerMarketRegister />} />

          {/* about page  */}
          <Route path="/about" element={<StorytellingAbout />} />
           <Route path="/chat" element={<Chat2 />} />
          
          <Route path="/user/profile" element={<UserProfile />} />
          <Route path="/user/profile2" element={<Profile2 />} />
          

          <Route
            path="/Timeline"
            element={
              <ProtectedRoute>
                <Timeline />
              </ProtectedRoute>
            }
          />

          {/* Redirects */}




          {/* Add more routes as needed */}
        </Routes>
        {/* </PageTransition> */}
        {/* </SmoothScroll> */}

      </PlayerProvider>
    </UserProvider>
  );
}

export default App;
