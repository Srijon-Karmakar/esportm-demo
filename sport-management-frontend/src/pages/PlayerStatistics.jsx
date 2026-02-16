import React, { useState, useEffect, useContext } from 'react';
import { Settings, ChevronDown } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

const PlayerStats = () => {
  const navigate = useNavigate();
  const { username, setUsername} = useContext(UserContext); // Declare username state
  const [controls, setControls] = useState({
    Lorem: { active: true, value: 320 },
    Ipsum: { active: false, value: 0 },
    Dolor: { active: true, value: 120 },
    Lobortis: { active: false, value: 0 },
    Suscipit: { active: true, value: 412 }
  });
  const [showLogoutPopup, setShowLogoutPopup] = useState(false);

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    console.log('Stored Username:', storedUsername); // Debugging
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  const toggleControl = (name) => {
    setControls(prev => ({
      ...prev,
      [name]: { ...prev[name], active: !prev[name].active }
    }));
  };

  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove token
    localStorage.removeItem('username'); // Remove username
    setShowLogoutPopup(true); // Show logout popup
    setTimeout(() => {
      setShowLogoutPopup(false);
    });
    navigate('/'); // Redirect to login page
  };

  const monthlyData = [
    { month: 'JAN', value: 60 },
    { month: 'FEB', value: 80 },
    { month: 'MAR', value: 45 },
    { month: 'APR', value: 70 },
    { month: 'MAY', value: 55 },
    { month: 'JUN', value: 85 },
    { month: 'JUL', value: 90 },
    { month: 'AUG', value: 65 },
    { month: 'SEP', value: 75 },
    { month: 'OCT', value: 40 },
    { month: 'NOV', value: 50 },
    { month: 'DEC', value: 80 }
  ];

  return (
    <div style={styles.container}>
      <style>
        {`
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
          
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
          }
        `}
      </style>
      
      {/* Sidebar */}
      <div style={styles.sidebar}>
        <div style={styles.sidebarContent}>
          <div style={styles.logo}>
            <div style={styles.logoDot}></div>
            <h1 style={styles.logoText}>SportBit</h1>
            {/* <Chat chatRoomId={chatRoomId} userId={userId} />  */}
            {/* Updated 8/6/25 >> the above line */}
          </div>
          <div style={styles.subTitle}>Players</div>
          
          <nav style={styles.nav}>
            <div style={styles.navItemActive}>Dashboard</div>
            <div style={styles.navItem}>Statistics</div>
            <div style={styles.navItem}>Club Offers</div>
            <div style={styles.navItem}>Applications</div>
            <div onClick={() => navigate('/playerProfile')} style={styles.navItem}> Profile </div>
            <div onClick={() => navigate('/')} style={styles.navItem}>Home</div>
            <div onClick={handleLogout} style={styles.navItemLogout}>Logout</div>
            
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div style={styles.mainContent}>
        <div style={styles.mainPadding}>
          <h2 style={styles.pageTitle}>Welcome, {username} </h2>


        {/* Logout Popup */}
        {showLogoutPopup && (
            <div style={styles.logoutPopup}>
              <p style={styles.logoutPopupText}>You have successfully logged out. Redirecting...</p>
            </div>
          )}


          
          <div style={styles.gridContainer}>
            {/* User Profile Card */}
            <div style={styles.profileCard}>
              <div style={styles.profileHeader}>
                <div style={styles.profileInfo}>
                  <div style={styles.avatar}>
                    <div style={styles.avatarInner}></div>
                  </div>
                  <div>
                    <h3 style={styles.username}>{username}</h3>
                  </div>
                </div>
                <Settings size={20} color="#9CA3AF" />
              </div>
              
              <div style={styles.statsGrid}>
                <div style={styles.statItem}>
                  <div style={styles.statLabel}>LOREM</div>
                  <div style={styles.statValue}>381K</div>
                </div>
                <div style={styles.statItem}>
                  <div style={styles.statLabel}>IPSUM</div>
                  <div style={styles.statValueGreen}>↑13K</div>
                </div>
                <div style={styles.statItem}>
                  <div style={styles.statLabel}>DOLOR</div>
                  <div style={styles.statValue}>134K</div>
                </div>
              </div>

              <div style={styles.controlsSection}>
                <h4 style={styles.controlsTitle}>CONTROLS</h4>
                <div style={styles.controlsList}>
                  {Object.entries(controls).map(([name, data]) => (
                    <div key={name} style={styles.controlItem}>
                      <div style={styles.controlLeft}>
                        <div 
                          style={{
                            ...styles.toggle,
                            backgroundColor: data.active ? '#8B5CF6' : '#D1D5DB'
                          }}
                          onClick={() => toggleControl(name)}
                        >
                          <div style={{
                            ...styles.toggleBall,
                            transform: data.active ? 'translateX(24px)' : 'translateX(2px)'
                          }}></div>
                        </div>
                        <span style={styles.controlName}>{name}</span>
                      </div>
                      <span style={styles.controlValue}>{data.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              <button style={styles.loginButton}>
                LOGOUT
              </button>
            </div>

            {/* Stats Cards */}
            <div style={styles.statsCards}>
              {/* Actions Card */}
              <div style={styles.statCard}>
                <div style={styles.statCardLabel}>ACTIONS</div>
                <div style={styles.statCardValue}>3,52</div>
                <div style={styles.statCardChange}>+8%</div>
                <div style={styles.chartContainer}>
                  <svg width="100%" height="64" viewBox="0 0 200 60">
                    <path 
                      d="M0,40 Q50,20 100,30 T200,25" 
                      stroke="#3B82F6" 
                      strokeWidth="2" 
                      fill="none"
                    />
                    <circle cx="180" cy="27" r="3" fill="#3B82F6" />
                  </svg>
                </div>
              </div>

              {/* Performance Card */}
              <div style={styles.statCard}>
                <div style={styles.statCardLabel}>PERFORMANCE</div>
                <div style={styles.statCardValue}>12,0</div>
                <div style={styles.statCardChange}>+21%</div>
                <div style={styles.chartContainer}>
                  <svg width="100%" height="64" viewBox="0 0 200 60">
                    <path 
                      d="M0,45 Q50,35 100,40 T200,30" 
                      stroke="#10B981" 
                      strokeWidth="2" 
                      fill="none"
                    />
                    <circle cx="180" cy="32" r="3" fill="#10B981" />
                  </svg>
                </div>
              </div>

              {/* Interactions Card */}
              <div style={styles.statCardRed}>
                <div style={styles.statCardLabel}>INTERACTIONS</div>
                <div style={styles.statCardValue}>0,03</div>
                <div style={styles.statCardChangeRed}>-12%</div>
                <div style={styles.chartContainer}>
                  <svg width="100%" height="64" viewBox="0 0 200 60">
                    <path 
                      d="M0,30 Q50,35 100,40 T200,45" 
                      stroke="#EF4444" 
                      strokeWidth="2" 
                      fill="none"
                    />
                    <circle cx="180" cy="43" r="3" fill="#EF4444" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Year Analysis Chart */}
            <div style={styles.chartCard}>
              <div style={styles.chartHeader}>
                <h3 style={styles.chartTitle}>YEAR ANALYSIS</h3>
                <div style={styles.dropdown}>
                  <span style={styles.dropdownText}>2019</span>
                  <ChevronDown size={16} color="#2563EB" />
                </div>
              </div>
              
              <div style={styles.chartArea}>
                <div style={styles.barChart}>
                  {monthlyData.map((data, index) => (
                    <div key={data.month} style={styles.barContainer}>
                      <div 
                        style={{
                          ...styles.bar,
                          height: `${data.value * 2}px`,
                          position: 'relative'
                        }}
                      >
                        {index === 2 && (
                          <div style={styles.barLabel}>50%</div>
                        )}
                      </div>
                      <span style={styles.barMonth}>{data.month}</span>
                    </div>
                  ))}
                </div>
                <div style={styles.chartLine}></div>
              </div>
            </div>

            {/* Comments Section */}
            <div style={styles.commentsCard}>
              <div style={styles.commentsHeader}>
                <h3 style={styles.commentsTitle}>COMMENTS</h3>
                <div style={styles.dropdown}>
                  <span style={styles.dropdownText}>RECENT</span>
                  <ChevronDown size={16} color="#2563EB" />
                </div>
              </div>
              
              <div style={styles.commentsList}>
                <div style={styles.comment}>
                  <div style={styles.commentAvatar}></div>
                  <div style={styles.commentContent}>
                    <p style={styles.commentText}>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                  </div>
                </div>
                
                <div style={styles.commentHighlight}>
                  <div style={styles.commentHighlightHeader}>
                    <div style={styles.commentAvatarSmall}></div>
                    <span style={styles.commentHighlightText}>INCIDUNT!!!</span>
                  </div>
                </div>
                
                <div style={styles.comment}>
                  <div style={styles.commentAvatar}></div>
                  <div style={styles.commentContent}>
                    <p style={styles.commentText}>Ut wisi enim ad minim veniam quis nostrud</p>
                    <p style={styles.commentSubtext}>exerci tation ullamcorper</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Next Match */}
            <div style={styles.matchCard}>
              <h3 style={styles.matchTitle}>Next Match</h3>
              
              <div style={styles.matchContent}>
                <div style={styles.matchTeams}>
                  <div style={styles.teamContainer}>
                    <div style={styles.teamLogo}>
                      <div style={styles.teamLogoEB}>EB</div>
                    </div>
                    <span style={styles.vsText}>VS</span>
                    <div style={styles.teamLogo}>
                      <div style={styles.teamLogoMB}>MB</div>
                    </div>
                  </div>
                </div>
                
                <div style={styles.matchDetails}>
                  <h4 style={styles.matchName}>East bengal vs MohunBagan</h4>
                  <p style={styles.matchInfo}>Venue: Yuvabharati kriyangan, Kolkata</p>
                  <p style={styles.matchInfo}>Time: 7:30 pm IST</p>
                  <p style={styles.matchInfo}>Tournament: Indian Super league</p>
                </div>
              </div>
            </div>

            {/* News Section */}
            <div style={styles.newsSection}>
              <h3 style={styles.newsTitle}>News</h3>
              <div style={styles.newsList}>
                <div style={styles.newsItem}>
                  <div style={styles.newsImageRed}></div>
                  <div style={styles.newsContent}>
                    <h4 style={styles.newsText}>Bayern Munich celebrates Meisterschale after one-year hiatus</h4>
                  </div>
                </div>
                
                <div style={styles.newsItem}>
                  <div style={styles.newsImageGreen}></div>
                  <div style={styles.newsContent}>
                    <h4 style={styles.newsText}>Bayern Munich celebrates Meisterschale after one-year hiatus</h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    margin: 0,
    padding: 0, 
    overflow: 'hidden',
    display: 'flex',
    height: '100vh', width: '100vw',
    backgroundColor: 'white',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", sans-serif'
  },
  sidebar: {
    width: '256px',
    background: 'linear-gradient(to bottom,rgb(147, 147, 147),rgb(93, 93, 93))',
    color: 'white'
  },
  sidebarContent: {
    padding: '24px'
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    marginBottom: '32px'
  },
  logoDot: {
    width: '12px',
    height: '12px',
    backgroundColor: '#FCD34D',
    borderRadius: '50%'
  },
  logoText: {
    fontSize: '24px',
    fontWeight: 'bold',
    margin: 0
  },
  subTitle: {
    fontSize: '14px',
    opacity: 0.75,
    marginBottom: '32px'
  },
  nav: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px'
  },
  navItemActive: {
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    padding: '12px 16px',
    borderRadius: '40px',
    color: 'yellow'
  },
  navItem: {
    padding: '12px 16px',
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
    ':hover': {
      backgroundColor: 'rgba(255, 255, 255, 0.1)'
    }
  },

  navItemLogout: {
    padding: '12px 16px',
    borderRadius: '4px',
    cursor: 'pointer',
    backgroundColor: 'rgba(205, 11, 11, 0)',
    color: 'white',
    textAlign: 'left',
    marginTop: '8px', // Adjust spacing to match other items
    transition: 'background-color 0.2s',
    ':hover': {
      backgroundColor: '#B91C1C'
    }
  },




  mainContent: {
    flex: 1,
    overflow: 'auto'
  },
  mainPadding: {
    padding: '32px'
  },
  pageTitle: {
    fontSize: '32px',
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: '32px'
  },
  gridContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(12, 1fr)',
    gap: '24px'
  },
  profileCard: {
    gridColumn: 'span 4',
    backgroundColor: 'white',
    borderRadius: '8px',
    padding: '24px',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
  },
  profileHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '24px'
  },
  profileInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px'
  },
  avatar: {
    width: '64px',
    height: '64px',
    backgroundColor: '#14B8A6',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  avatarInner: {
    width: '48px',
    height: '48px',
    backgroundColor: '#0D9488',
    borderRadius: '50%'
  },
  username: {
    fontWeight: '600',
    color: '#1F2937',
    margin: 0
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '16px',
    marginBottom: '24px'
  },
  statItem: {
    textAlign: 'center'
  },
  statLabel: {
    fontSize: '12px',
    color: '#6B7280',
    marginBottom: '4px'
  },
  statValue: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#1F2937'
  },
  statValueGreen: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#10B981'
  },
  controlsSection: {
    borderTop: '1px solid #E5E7EB',
    paddingTop: '24px'
  },
  controlsTitle: {
    fontWeight: '600',
    color: '#374151',
    marginBottom: '16px'
  },
  controlsList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px'
  },
  controlItem: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  controlLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px'
  },
  toggle: {
    width: '48px',
    height: '24px',
    borderRadius: '12px',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
    position: 'relative'
  },
  toggleBall: {
    width: '20px',
    height: '20px',
    backgroundColor: 'white',
    borderRadius: '50%',
    transition: 'transform 0.2s',
    position: 'absolute',
    top: '2px'
  },
  controlName: {
    color: '#374151'
  },
  controlValue: {
    fontWeight: '600'
  },
  loginButton: {
    width: '100%',
    marginTop: '24px',
    padding: '12px 24px',
    border: '2px solid #8B5CF6',
    backgroundColor: 'transparent',
    color: '#8B5CF6',
    borderRadius: '24px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
    ':hover': {
      backgroundColor: '#F3E8FF'
    }
  },
  statsCards: {
    gridColumn: 'span 8',
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '24px'
  },
  statCard: {
    background: 'linear-gradient(135deg, #DBEAFE, #BFDBFE)',
    borderRadius: '8px',
    padding: '24px'
  },
  statCardRed: {
    background: 'linear-gradient(135deg, #FEE2E2, #FECACA)',
    borderRadius: '8px',
    padding: '24px'
  },
  statCardLabel: {
    fontSize: '12px',
    color: '#6B7280',
    marginBottom: '8px'
  },
  statCardValue: {
    fontSize: '32px',
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: '8px'
  },
  statCardChange: {
    fontSize: '14px',
    color: '#10B981'
  },
  statCardChangeRed: {
    fontSize: '14px',
    color: '#EF4444'
  },
  chartContainer: {
    marginTop: '16px'
  },
  chartCard: {
    gridColumn: 'span 8',
    backgroundColor: 'white',
    borderRadius: '8px',
    padding: '24px',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
  },
  chartHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '24px'
  },
  chartTitle: {
    fontWeight: '600',
    color: '#374151',
    margin: 0
  },
  dropdown: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    backgroundColor: '#DBEAFE',
    padding: '4px 12px',
    borderRadius: '4px'
  },
  dropdownText: {
    fontSize: '14px',
    color: '#2563EB'
  },
  chartArea: {
    position: 'relative'
  },
  barChart: {
    display: 'flex',
    alignItems: 'end',
    justifyContent: 'space-between',
    height: '256px',
    padding: '0 16px'
  },
  barContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  bar: {
    width: '32px',
    backgroundColor: '#3B82F6',
    borderRadius: '4px 4px 0 0',
    marginBottom: '8px'
  },
  barLabel: {
    position: 'absolute',
    top: '-24px',
    left: '-12px',
    backgroundColor: '#3B82F6',
    color: 'white',
    fontSize: '12px',
    padding: '4px 8px',
    borderRadius: '4px'
  },
  barMonth: {
    fontSize: '12px',
    color: '#6B7280'
  },
  chartLine: {
    position: 'absolute',
    top: '128px',
    left: 0,
    right: 0,
    borderTop: '1px dashed #D1D5DB'
  },
  commentsCard: {
    gridColumn: 'span 4',
    backgroundColor: 'white',
    borderRadius: '8px',
    padding: '24px',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
  },
  commentsHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '24px'
  },
  commentsTitle: {
    fontWeight: '600',
    color: '#374151',
    margin: 0
  },
  commentsList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px'
  },
  comment: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '12px'
  },
  commentAvatar: {
    width: '32px',
    height: '32px',
    backgroundColor: '#14B8A6',
    borderRadius: '50%',
    flexShrink: 0
  },
  commentAvatarSmall: {
    width: '24px',
    height: '24px',
    backgroundColor: '#14B8A6',
    borderRadius: '50%'
  },
  commentContent: {
    flex: 1
  },
  commentText: {
    fontSize: '14px',
    color: '#6B7280',
    margin: 0
  },
  commentSubtext: {
    fontSize: '12px',
    color: '#9CA3AF',
    marginTop: '4px',
    margin: 0
  },
  commentHighlight: {
    backgroundColor: '#DBEAFE',
    padding: '12px',
    borderRadius: '8px'
  },
  commentHighlightHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  },
  commentHighlightText: {
    fontSize: '14px',
    fontWeight: '600',
    color: '#374151'
  },
  matchCard: {
    gridColumn: 'span 8',
    background: 'linear-gradient(to right,rgb(9, 151, 31),rgb(5, 116, 9))',
    borderRadius: '8px',
    padding: '24px',
    color: 'white'
  },
  matchTitle: {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '16px'
  },
  matchContent: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  matchTeams: {
    display: 'flex',
    alignItems: 'center',
    gap: '24px'
  },
  teamContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px'
  },
  teamLogo: {
    width: '64px',
    height: '64px',
    backgroundColor: 'white',
    borderRadius: '50%',
    padding: '8px'
  },
  teamLogoEB: {
    width: '100%',
    height: '100%',
    backgroundColor: '#DC2626',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    fontWeight: 'bold',
    fontSize: '12px'
  },
  teamLogoMB: {
    width: '100%',
    height: '100%',
    backgroundColor: '#065F46',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    fontWeight: 'bold',
    fontSize: '12px'
  },
  vsText: {
    fontSize: '24px',
    fontWeight: 'bold'
  },
  matchDetails: {
    textAlign: 'right'
  },
  matchName: {
    fontSize: '20px',
    fontWeight: 'bold',
    marginBottom: '8px'
  },
  matchInfo: {
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: '4px',
    margin: 0
  },
  newsSection: {
    gridColumn: 'span 4'
  },
  newsTitle: {
    fontSize: '32px',
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: '24px'
  },
  newsList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px'
  },
  newsItem: {
    backgroundColor: 'white',
    borderRadius: '8px',
    padding: '16px',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
    display: 'flex',
    gap: '16px'
  },
  newsImageRed: {
    width: '80px',
    height: '60px',
    backgroundColor: '#EF4444',
    borderRadius: '4px'
  },
  newsImageGreen: {
    width: '80px',
    height: '60px',
    backgroundColor: '#10B981',
    borderRadius: '4px'
  },
  newsContent: {
    flex: 1
  },
  newsText: {
    fontWeight: '600',
    color: '#1F2937',
    margin: 0,
    fontSize: '14px'
  }
};


export default PlayerStats ;