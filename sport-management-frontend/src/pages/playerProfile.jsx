import React, { useState } from 'react';
import { Settings, Camera, Edit, Trophy, Target, Calendar, MapPin, Mail, Phone, User, Star, Award, TrendingUp } from 'lucide-react';
import NmdSidebar2 from '../components/NmdSidebar2'; // Assuming you have a sidebar component

const SportBitMyProfile = () => {
  const [activeNav, setActiveNav] = useState('My Profile');
  const [activeTab, setActiveTab] = useState('overview');
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: 'Alex Johnson',
    position: 'Forward',
    team: 'City FC',
    age: '24',
    height: '6\'2"',
    weight: '175 lbs',
    nationality: 'USA',
    email: 'alex.johnson@email.com',
    phone: '+1 (555) 123-4567',
    address: 'New York, NY',
    joinDate: 'January 2023'
  });

  const achievements = [
    { icon: Trophy, title: 'League Champion', year: '2024', color: '#FFD700' },
    { icon: Target, title: 'Top Scorer', year: '2024', color: '#FF6B6B' },
    { icon: Star, title: 'Player of the Season', year: '2023', color: '#4ECDC4' },
    { icon: Award, title: 'Best Newcomer', year: '2023', color: '#9B59B6' }
  ];

  const skillsData = [
    { skill: 'Speed', level: 85 },
    { skill: 'Shooting', level: 92 },
    { skill: 'Passing', level: 78 },
    { skill: 'Dribbling', level: 88 },
    { skill: 'Defense', level: 65 },
    { skill: 'Stamina', level: 90 }
  ];

  const recentMatches = [
    { opponent: 'Rangers FC', result: 'W', score: '3-1', goals: 2, assists: 1, date: '2024-05-20' },
    { opponent: 'United FC', result: 'D', score: '2-2', goals: 1, assists: 0, date: '2024-05-15' },
    { opponent: 'Athletic Club', result: 'W', score: '4-0', goals: 1, assists: 2, date: '2024-05-10' },
    { opponent: 'City Rivals', result: 'L', score: '1-2', goals: 0, assists: 1, date: '2024-05-05' }
  ];

  const SkillBar = ({ skill, level }) => (
    <div style={styles.skillItem}>
      <div style={styles.skillHeader}>
        <span style={styles.skillName}>{skill}</span>
        <span style={styles.skillValue}>{level}%</span>
      </div>
      <div style={styles.skillBarBg}>
        <div style={{...styles.skillBarFill, width: `${level}%`}}></div>
      </div>
    </div>
  );

  const StatCard = ({ icon: Icon, title, value, change, color }) => (
    <div style={styles.statCard}>
      <div style={{...styles.statIcon, backgroundColor: color}}>
        <Icon size={20} color="white" />
      </div>
      <div style={styles.statContent}>
        <span style={styles.statTitle}>{title}</span>
        <span style={styles.statValue}>{value}</span>
        {change && (
          <span style={{...styles.statChange, color: change > 0 ? '#4CAF50' : '#FF6B6B'}}>
            {change > 0 ? '+' : ''}{change}%
          </span>
        )}
      </div>
    </div>
  );

  return (
    <div style={styles.container}>
      {/* Sidebar */}
      {/* <div style={styles.sidebar}>
        <div style={styles.logo}>
          <div style={styles.logoIcon}></div>
          <div>
            <div style={styles.logoText}>SportBit</div>
            <div style={styles.logoSubtext}>Players</div>
          </div>
        </div>
        
        <nav style={styles.nav}>
          {['Dashboard', 'Statistics', 'Club Offers', 'Applications', 'My Profile'].map((item) => (
            <div
              key={item}
              style={{
                ...styles.navItem,
                ...(activeNav === item ? styles.navItemActive : {})
              }}
              onClick={() => setActiveNav(item)}
            >
              {item}
            </div>
          ))}
        </nav>
      </div> */}
      <NmdSidebar2 />

      {/* Main Content */}
      <div style={styles.mainContent}>
        <div style={styles.header}>
          <h1 style={styles.pageTitle}>My Profile</h1>
          <button 
            style={styles.editButton}
            onClick={() => setIsEditing(!isEditing)}
          >
            <Edit size={16} />
            {isEditing ? 'Save' : 'Edit Profile'}
          </button>
        </div>

        {/* Profile Header */}
        <div style={styles.profileHeader}>
          <div style={styles.profileImageContainer}>
            <div style={styles.profileImage}>
              <User size={40} color="#4ECDC4" />
            </div>
            <button style={styles.cameraButton}>
              <Camera size={16} />
            </button>
          </div>
          <div style={styles.profileInfo}>
            <h2 style={styles.profileName}>{profileData.name}</h2>
            <p style={styles.profilePosition}>{profileData.position} • {profileData.team}</p>
            <div style={styles.profileStats}>
              <div style={styles.profileStatItem}>
                <span style={styles.profileStatValue}>127</span>
                <span style={styles.profileStatLabel}>Matches</span>
              </div>
              <div style={styles.profileStatItem}>
                <span style={styles.profileStatValue}>89</span>
                <span style={styles.profileStatLabel}>Goals</span>
              </div>
              <div style={styles.profileStatItem}>
                <span style={styles.profileStatValue}>43</span>
                <span style={styles.profileStatLabel}>Assists</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div style={styles.tabNav}>
          {['overview', 'performance', 'achievements', 'settings'].map((tab) => (
            <button
              key={tab}
              style={{
                ...styles.tabButton,
                ...(activeTab === tab ? styles.tabButtonActive : {})
              }}
              onClick={() => setActiveTab(tab)}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Tab Content  */}
        <div style={styles.tabContent}>
          {activeTab === 'overview' && (
            <div style={styles.overviewContent}>
              {/* Personal Information  */}
              <div style={styles.section}>
                <h3 style={styles.sectionTitle}>Personal Information</h3>
                <div style={styles.infoGrid}>
                  <div style={styles.infoItem}>
                    <User size={16} style={styles.infoIcon} />
                    <div>
                      <span style={styles.infoLabel}>Age</span>
                      <span style={styles.infoValue}>{profileData.age} years</span>
                    </div>
                  </div>
                  <div style={styles.infoItem}>
                    <MapPin size={16} style={styles.infoIcon} />
                    <div>
                      <span style={styles.infoLabel}>Height</span>
                      <span style={styles.infoValue}>{profileData.height}</span>
                    </div>
                  </div>
                  <div style={styles.infoItem}>
                    <Target size={16} style={styles.infoIcon} />
                    <div>
                      <span style={styles.infoLabel}>Weight</span>
                      <span style={styles.infoValue}>{profileData.weight}</span>
                    </div>
                  </div>
                  <div style={styles.infoItem}>
                    <Calendar size={16} style={styles.infoIcon} />
                    <div>
                      <span style={styles.infoLabel}>Nationality</span>
                      <span style={styles.infoValue}>{profileData.nationality}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div style={styles.section}>
                <h3 style={styles.sectionTitle}>Contact Information</h3>
                <div style={styles.infoGrid}>
                  <div style={styles.infoItem}>
                    <Mail size={16} style={styles.infoIcon} />
                    <div>
                      <span style={styles.infoLabel}>Email</span>
                      <span style={styles.infoValue}>{profileData.email}</span>
                    </div>
                  </div>
                  <div style={styles.infoItem}>
                    <Phone size={16} style={styles.infoIcon} />
                    <div>
                      <span style={styles.infoLabel}>Phone</span>
                      <span style={styles.infoValue}>{profileData.phone}</span>
                    </div>
                  </div>
                  <div style={styles.infoItem}>
                    <MapPin size={16} style={styles.infoIcon} />
                    <div>
                      <span style={styles.infoLabel}>Address</span>
                      <span style={styles.infoValue}>{profileData.address}</span>
                    </div>
                  </div>
                  <div style={styles.infoItem}>
                    <Calendar size={16} style={styles.infoIcon} />
                    <div>
                      <span style={styles.infoLabel}>Joined</span>
                      <span style={styles.infoValue}>{profileData.joinDate}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Skills */}
              <div style={styles.section}>
                <h3 style={styles.sectionTitle}>Skills Assessment</h3>
                <div style={styles.skillsGrid}>
                  {skillsData.map((skill, index) => (
                    <SkillBar key={index} skill={skill.skill} level={skill.level} />
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'performance' && (
            <div style={styles.performanceContent}>
              {/* Performance Stats */}
              <div style={styles.section}>
                <h3 style={styles.sectionTitle}>Performance Statistics</h3>
                <div style={styles.statsGrid}>
                  <StatCard 
                    icon={Target} 
                    title="Goals This Season" 
                    value="23" 
                    change={15}
                    color="#FF6B6B"
                  />
                  <StatCard 
                    icon={TrendingUp} 
                    title="Assists" 
                    value="12" 
                    change={8}
                    color="#4ECDC4"
                  />
                  <StatCard 
                    icon={Trophy} 
                    title="Matches Played" 
                    value="28" 
                    change={0}
                    color="#FFD700"
                  />
                  <StatCard 
                    icon={Star} 
                    title="Average Rating" 
                    value="8.7" 
                    change={5}
                    color="#9B59B6"
                  />
                </div>
              </div>

              {/* Recent Matches */}
              <div style={styles.section}>
                <h3 style={styles.sectionTitle}>Recent Matches</h3>
                <div style={styles.matchesTable}>
                  <div style={styles.tableHeader}>
                    <span>Opponent</span>
                    <span>Result</span>
                    <span>Score</span>
                    <span>Goals</span>
                    <span>Assists</span>
                    <span>Date</span>
                  </div>
                  {recentMatches.map((match, index) => (
                    <div key={index} style={styles.tableRow}>
                      <span style={styles.opponent}>{match.opponent}</span>
                      <span style={{
                        ...styles.result,
                        color: match.result === 'W' ? '#4CAF50' : match.result === 'L' ? '#FF6B6B' : '#FFA726'
                      }}>
                        {match.result}
                      </span>
                      <span>{match.score}</span>
                      <span>{match.goals}</span>
                      <span>{match.assists}</span>
                      <span style={styles.date}>{match.date}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'achievements' && (
            <div style={styles.achievementsContent}>
              <div style={styles.section}>
                <h3 style={styles.sectionTitle}>Achievements & Awards</h3>
                <div style={styles.achievementsGrid}>
                  {achievements.map((achievement, index) => (
                    <div key={index} style={styles.achievementCard}>
                      <div style={{...styles.achievementIcon, backgroundColor: achievement.color}}>
                        <achievement.icon size={24} color="white" />
                      </div>
                      <div style={styles.achievementContent}>
                        <h4 style={styles.achievementTitle}>{achievement.title}</h4>
                        <span style={styles.achievementYear}>{achievement.year}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div style={styles.settingsContent}>
              <div style={styles.section}>
                <h3 style={styles.sectionTitle}>Account Settings</h3>
                <div style={styles.settingsForm}>
                  <div style={styles.formRow}>
                    <label style={styles.formLabel}>Email Notifications</label>
                    <input type="checkbox" defaultChecked style={styles.checkbox} />
                  </div>
                  <div style={styles.formRow}>
                    <label style={styles.formLabel}>SMS Notifications</label>
                    <input type="checkbox" style={styles.checkbox} />
                  </div>
                  <div style={styles.formRow}>
                    <label style={styles.formLabel}>Profile Visibility</label>
                    <select style={styles.select}>
                      <option>Public</option>
                      <option>Private</option>
                      <option>Team Only</option>
                    </select>
                  </div>
                  <div style={styles.formRow}>
                    <label style={styles.formLabel}>Language</label>
                    <select style={styles.select}>
                      <option>English</option>
                      <option>Spanish</option>
                      <option>French</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    // minHeight: '100vh',
    height: '100vh',
    width: '100vw' ,
    backgroundColor: '#f0f8f0',
    fontFamily: 'Arial, sans-serif',
  },
  sidebar: {
    width: '240px',
    background: 'linear-gradient(180deg,rgb(216, 184, 55) 0%,rgb(124, 106, 31) 100%)',
    color: 'white',
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '40px',
  },
  logoIcon: {
    width: '12px',
    height: '12px',
    backgroundColor: '#FFEB3B',
    borderRadius: '50%',
    marginRight: '10px',
    marginTop: '-20px',
  },
  logoText: {
    fontSize: '24px',
    fontWeight: 'bold',
  },
  logoSubtext: {
    fontSize: '14px',
    opacity: 0.8,
  },
  nav: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  navItem: {
    padding: '12px 16px',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
    fontSize: '16px',
  },
  navItemActive: {
    backgroundColor: 'rgba(0,0,0,0.2)',
    fontWeight: 'bold',
  },
  mainContent: {
    flex: 1,
    padding: '20px',
    overflow: 'auto',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '30px',
  },
  pageTitle: {
    fontSize: '32px',
    fontWeight: 'bold',
    color: '#2E7D32',
    margin: 0,
  },
  editButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '10px 16px',
    backgroundColor: 'green',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: 'bold',
  },
  profileHeader: {
    display: 'flex',
    gap: '24px',
    backgroundColor: 'white',
    borderRadius: '12px',
    padding: '24px',
    marginBottom: '24px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
  },
  profileImageContainer: {
    position: 'relative',
  },
  profileImage: {
    width: '120px',
    height: '120px',
    borderRadius: '50%',
    backgroundColor: '#f5f5f5',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: '4px solidrgb(206, 200, 8)',
  },
  cameraButton: {
    position: 'absolute',
    bottom: '8px',
    right: '8px',
    width: '32px',
    height: '32px',
    borderRadius: '50%',
    backgroundColor: '#4ECDC4',
    color: 'white',
    border: 'none',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: '28px',
    fontWeight: 'bold',
    color: '#333',
    margin: '0 0 8px 0',
  },
  profilePosition: {
    fontSize: '16px',
    color: '#666',
    marginBottom: '16px',
  },
  profileStats: {
    display: 'flex',
    gap: '32px',
  },
  profileStatItem: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  profileStatValue: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#4ECDC4',
  },
  profileStatLabel: {
    fontSize: '12px',
    color: '#666',
    textTransform: 'uppercase',
  },
  tabNav: {
    display: 'flex',
    gap: '4px',
    marginBottom: '24px',
    backgroundColor: 'white',
    borderRadius: '12px',
    padding: '4px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
  },
  tabButton: {
    flex: 1,
    padding: '12px 16px',
    background: 'transparent',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: 'bold',
    color: 'green',
    transition: 'all 0.2s',
  },
  tabButtonActive: {
    backgroundColor: '#7bfc77',
    color: 'green',
  },
  tabContent: {
    backgroundColor: 'white',
    borderRadius: '12px',
    padding: '24px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
  },
  overviewContent: {
    display: 'flex',
    flexDirection: 'column',
    gap: '32px',
  },
  section: {
    marginBottom: '32px',
  },
  sectionTitle: {
    fontSize: '20px',
    fontWeight: 'bold',
    color: '#333',
    marginBottom: '16px',
    margin: '0 0 16px 0',
  },
  infoGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '16px',
  },
  infoItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  infoIcon: {
    color: '#4ECDC4',
  },
  infoLabel: {
    display: 'block',
    fontSize: '12px',
    color: '#666',
    textTransform: 'uppercase',
  },
  infoValue: {
    display: 'block',
    fontSize: '14px',
    color: '#333',
    fontWeight: 'bold',
  },
  skillsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '16px',
  },
  skillItem: {
    marginBottom: '16px',
  },
  skillHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '8px',
  },
  skillName: {
    fontSize: '14px',
    fontWeight: 'bold',
    color: '#333',
  },
  skillValue: {
    fontSize: '14px',
    color: '#4ECDC4',
    fontWeight: 'bold',
  },
  skillBarBg: {
    width: '100%',
    height: '8px',
    backgroundColor: '#E0E0E0',
    borderRadius: '4px',
    overflow: 'hidden',
  },
  skillBarFill: {
    height: '100%',
    backgroundColor: '#4ECDC4',
    borderRadius: '4px',
    transition: 'width 0.3s ease',
  },
  performanceContent: {
    display: 'flex',
    flexDirection: 'column',
    gap: '32px',
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '16px',
  },
  statCard: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '16px',
    backgroundColor: '#f8f9fa',
    borderRadius: '8px',
  },
  statIcon: {
    width: '40px',
    height: '40px',
    borderRadius: '8px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  statContent: {
    flex: 1,
  },
  statTitle: {
    display: 'block',
    fontSize: '12px',
    color: '#666',
    marginBottom: '4px',
  },
  statValue: {
    display: 'block',
    fontSize: '20px',
    fontWeight: 'bold',
    color: '#333',
  },
  statChange: {
    fontSize: '12px',
    fontWeight: 'bold',
    marginLeft: '8px',
  },
  matchesTable: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  tableHeader: {
    display: 'grid',
    gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr 1.5fr',
    gap: '16px',
    padding: '12px 16px',
    backgroundColor: '#f8f9fa',
    borderRadius: '8px',
    fontSize: '12px',
    fontWeight: 'bold',
    color: '#666',
    textTransform: 'uppercase',
  },
  tableRow: {
    display: 'grid',
    gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr 1.5fr',
    gap: '16px',
    padding: '12px 16px',
    borderBottom: '1px solid #E0E0E0',
    fontSize: '14px',
  },
  opponent: {
    fontWeight: 'bold',
    color: '#333',
  },
  result: {
    fontWeight: 'bold',
  },
  date: {
    color: '#666',
  },
  achievementsContent: {
    display: 'flex',
    flexDirection: 'column',
    gap: '32px',
  },
  achievementsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '16px',
  },
  achievementCard: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    padding: '20px',
    backgroundColor: '#f8f9fa',
    borderRadius: '12px',
  },
  achievementIcon: {
    width: '48px',
    height: '48px',
    borderRadius: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  achievementContent: {
    flex: 1,
  },
  achievementTitle: {
    fontSize: '16px',
    fontWeight: 'bold',
    color: '#333',
    margin: '0 0 4px 0',
  },
  achievementYear: {
    fontSize: '14px',
    color: '#666',
  },
  settingsContent: {
    display: 'flex',
    flexDirection: 'column',
    gap: '32px',
  },
  settingsForm: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  formRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '12px 0',
    borderBottom: '1px solid #E0E0E0',
  },
  formLabel: {
    fontSize: '14px',
    fontWeight: 'bold',
    color: '#333',
  },
  checkbox: {
    width: '20px',
    height: '20px',
    accentColor: '#4ECDC4',
  },
  select: {
    padding: '8px 12px',
    border: '1px solid #E0E0E0',
    borderRadius: '6px',
    fontSize: '14px',
    color: '#333',
    minWidth: '150px',
  },
};

export default SportBitMyProfile;




