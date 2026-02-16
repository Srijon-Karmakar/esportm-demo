


import React, { useState } from 'react';
import { Settings, TrendingUp, TrendingDown, Info } from 'lucide-react';
// import { useNavigate } from 'react-router-dom';



// const navigate = useNavigate();
const SportBitStatistics = () => {
  const [activeNav, setActiveNav] = useState('Statistics');

  // Generate random data for charts
  const generateBarData = () => Array.from({length: 7}, () => Math.random() * 100);
  const generateLineData = () => Array.from({length: 7}, () => Math.random() * 100);

  const BarChart = ({ data, color = "#4ECDC4" }) => (
    <svg width="100%" height="80" style={{ marginTop: '10px' }}>
      {data.map((value, index) => (
        <rect
          key={index}
          x={index * 25 + 10}
          y={80 - value * 0.6}
          width="20"
          height={value * 0.6}
          fill={color}
          rx="2"
        />
      ))}
      <g style={{ fontSize: '10px', fill: '#666' }}>
        {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, index) => (
          <text key={day} x={index * 25 + 20} y={95} textAnchor="middle">{day}</text>
        ))}
      </g>
    </svg>
  );

  const LineChart = ({ data, color = "#4ECDC4" }) => {
    const points = data.map((value, index) => `${index * 25 + 20},${80 - value * 0.6}`).join(' ');
    return (
      <svg width="100%" height="80" style={{ marginTop: '10px' }}>
        <polyline
          points={points}
          fill="none"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {data.map((value, index) => (
          <circle
            key={index}
            cx={index * 25 + 20}
            cy={80 - value * 0.6}
            r="3"
            fill={color}
          />
        ))}
        <g style={{ fontSize: '10px', fill: '#666' }}>
          {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, index) => (
            <text key={day} x={index * 25 + 20} y={95} textAnchor="middle">{day}</text>
          ))}
        </g>
      </svg>
    );
  };

  const CircularProgress = ({ percentage, size = 80 }) => {
    const radius = size / 2 - 5;
    const circumference = 2 * Math.PI * radius;
    const strokeDasharray = circumference;
    const strokeDashoffset = circumference - (percentage / 100) * circumference;

    return (
      <div style={{ width: size, height: size, position: 'relative' }}>
        <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="#E0E0E0"
            strokeWidth="8"
            fill="none"
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="#4ECDC4"
            strokeWidth="8"
            fill="none"
            strokeDasharray={strokeDasharray}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
          />
        </svg>
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          fontSize: '20px',
          fontWeight: 'bold',
          color: '#333'
        }}>
          {percentage}%
        </div>
      </div>
    );
  };

  const HorizontalBarChart = ({ data }) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '16px' }}>
      {data.map((item, index) => (
        <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{ fontSize: '12px', color: '#666', minWidth: '60px' }}>{item.label}</span>
          <span style={{ fontSize: '12px', color: '#333', minWidth: '20px' }}>{item.value}</span>
          <div style={{ flex: 1, height: '8px', backgroundColor: '#E0E0E0', borderRadius: '4px' }}>
            <div
              style={{
                height: '100%',
                width: `${item.percentage}%`,
                backgroundColor: '#4ECDC4',
                borderRadius: '4px'
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div style={styles.container}>
      {/* Sidebar */}
      <div style={styles.sidebar}>
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
              onClick={() => { setActiveNav(item);
                if (item === 'My Profile') navigate('/playerProfile');
                else if (item === 'Dashboard') navigate('/dashboard');
                else if (item === 'Statistics') navigate('/statistics');

              }}
            >
              {item}
            </div>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div style={styles.mainContent}>
        <div style={styles.header}>
          <h1 style={styles.pageTitle}>Player Statistics</h1>
        </div>

        <div style={styles.statsGrid}>
          {/* CTools Fan Page */}
          <div style={styles.statCard}>
            <div style={styles.cardHeader}>
              <Info size={16} style={styles.infoIcon} />
              <span style={styles.cardTitle}>CTOOLS FAN PAGE</span>
            </div>
            <div style={styles.mainStat}>
              <span style={styles.mainNumber}>33,123</span>
              <span style={styles.statLabel}>FANS</span>
            </div>
            <div style={styles.changeIndicator}>
              <TrendingUp size={12} style={styles.trendIcon} />
              <span style={styles.changeValue}>3%</span>
            </div>
          </div>

          {/* Comments on CTools Post */}
          <div style={styles.statCard}>
            <div style={styles.cardHeader}>
              <Info size={16} style={styles.infoIcon} />
              <span style={styles.cardTitle}>COMMENTS ON CTOOLS POST</span>
            </div>
            <BarChart data={generateBarData()} />
            <div style={styles.changeIndicator}>
              <TrendingDown size={12} style={{...styles.trendIcon, color: '#ff6b6b'}} />
              <span style={{...styles.changeValue, color: '#ff6b6b'}}>4%</span>
            </div>
          </div>

          {/* Likes for CTools Training Post */}
          <div style={styles.statCard}>
            <div style={styles.cardHeader}>
              <Info size={16} style={styles.infoIcon} />
              <span style={styles.cardTitle}>LIKES FOR CTOOLS TRAINING POST</span>
            </div>
            <LineChart data={generateLineData()} />
            <div style={styles.changeIndicator}>
              <TrendingUp size={12} style={styles.trendIcon} />
              <span style={styles.changeValue}>13%</span>
            </div>
          </div>

          {/* Visits vs Comments */}
          <div style={styles.statCard}>
            <div style={styles.cardHeader}>
              <Info size={16} style={styles.infoIcon} />
              <span style={styles.cardTitle}>VISITS VS COMMENTS</span>
            </div>
            <div style={styles.legendContainer}>
              <div style={styles.legendItem}>
                <div style={{...styles.legendDot, backgroundColor: '#4ECDC4'}}></div>
                <span style={styles.legendText}>VISITS</span>
              </div>
              <div style={styles.legendItem}>
                <div style={{...styles.legendDot, backgroundColor: '#2E7D32'}}></div>
                <span style={styles.legendText}>COMMENTS</span>
              </div>
            </div>
            <LineChart data={generateLineData()} />
          </div>

          {/* Visits vs Comments (bottom) */}
          <div style={styles.statCard}>
            <div style={styles.cardHeader}>
              <Info size={16} style={styles.infoIcon} />
              <span style={styles.cardTitle}>VISITS VS COMMENTS</span>
            </div>
            <div style={styles.legendContainer}>
              <div style={styles.legendItem}>
                <div style={{...styles.legendDot, backgroundColor: '#4ECDC4'}}></div>
                <span style={styles.legendText}>VISITS</span>
              </div>
              <div style={styles.legendItem}>
                <div style={{...styles.legendDot, backgroundColor: '#2E7D32'}}></div>
                <span style={styles.legendText}>COMMENTS</span>
              </div>
            </div>
            <LineChart data={generateLineData()} />
          </div>

          {/* Total Followers */}
          <div style={styles.statCard}>
            <div style={styles.cardHeader}>
              <Info size={16} style={styles.infoIcon} />
              <span style={styles.cardTitle}>TOTAL FOLLOWERS</span>
            </div>
            <div style={styles.mainStat}>
              <span style={styles.mainNumber}>1,987</span>
              <span style={styles.statLabel}>FOLLOWERS</span>
            </div>
            <div style={styles.changeIndicator}>
              <TrendingUp size={12} style={styles.trendIcon} />
              <span style={styles.changeValue}>3%</span>
            </div>
          </div>

          {/* % of Views for #CTools Tweet */}
          <div style={styles.statCard}>
            <div style={styles.cardHeader}>
              <Info size={16} style={styles.infoIcon} />
              <span style={styles.cardTitle}>% OF VIEWS FOR #CTOOLS TWEET</span>
            </div>
            <div style={styles.circularContainer}>
              <CircularProgress percentage={71} />
            </div>
            <div style={styles.changeIndicator}>
              <TrendingDown size={12} style={{...styles.trendIcon, color: '#ff6b6b'}} />
              <span style={{...styles.changeValue, color: '#ff6b6b'}}>2%</span>
            </div>
          </div>

          {/* Total Posts */}
          <div style={styles.statCard}>
            <div style={styles.cardHeader}>
              <Info size={16} style={styles.infoIcon} />
              <span style={styles.cardTitle}>TOTAL POSTS</span>
            </div>
            <div style={styles.mainStat}>
              <span style={styles.mainNumber}>1,987</span>
              <span style={styles.statLabel}>POSTS</span>
            </div>
            <div style={styles.changeIndicator}>
              <TrendingUp size={12} style={styles.trendIcon} />
              <span style={styles.changeValue}>4%</span>
            </div>
          </div>

          {/* Total Posts (bottom) */}
          <div style={styles.statCard}>
            <div style={styles.cardHeader}>
              <Info size={16} style={styles.infoIcon} />
              <span style={styles.cardTitle}>TOTAL POSTS</span>
            </div>
            <div style={styles.mainStat}>
              <span style={styles.mainNumber}>1,987</span>
              <span style={styles.statLabel}>POSTS</span>
            </div>
            <div style={styles.changeIndicator}>
              <TrendingUp size={12} style={styles.trendIcon} />
              <span style={styles.changeValue}>4%</span>
            </div>
          </div>

          {/* CTools Training Posts */}
          <div style={styles.statCard}>
            <div style={styles.cardHeader}>
              <Info size={16} style={styles.infoIcon} />
              <span style={styles.cardTitle}>CTOOLS TRAINING POSTS</span>
            </div>
            <div style={styles.circularContainer}>
              <CircularProgress percentage={43} />
            </div>
            <div style={styles.changeIndicator}>
              <TrendingUp size={12} style={styles.trendIcon} />
              <span style={styles.changeValue}>1%</span>
            </div>
          </div>

          {/* Top 5 Articles on CTools Label */}
          <div style={styles.statCard}>
            <div style={styles.cardHeader}>
              <Info size={16} style={styles.infoIcon} />
              <span style={styles.cardTitle}>TOP 5 ARTICLES ON CTOOLS LABEL</span>
            </div>
            <HorizontalBarChart data={[
              { label: 'CDA', value: '13', percentage: 85 },
              { label: 'CDF', value: '7', percentage: 55 },
              { label: 'CDV', value: '5', percentage: 40 },
              { label: 'TRAINING', value: '3', percentage: 25 },
              { label: 'CG5', value: '2', percentage: 15 }
            ]} />
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    minHeight: '100vh',
    backgroundColor: '#f0f8f0',
    fontFamily: 'Arial, sans-serif',
    overflow: 'hidden',
  },
  mainContent: {
    flex: 1,
    padding: '20px',
    overflow: 'auto', // Enable vertical scrolling
    maxHeight: '100vh', // Prevent content from exceeding viewport height
  },


  sidebar: {
    width: '240px',
    background: 'linear-gradient(180deg,rgb(29, 159, 34) 0%,rgb(9, 76, 13) 100%)',
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
    marginBottom: '30px',
  },
  pageTitle: {
    fontSize: '32px',
    fontWeight: 'bold',
    color: '#2E7D32',
    margin: 0,
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '20px',
    gridAutoRows: 'minmax(250px, auto)',
  },
  statCard: {
    backgroundColor: 'white',
    borderRadius: '12px',
    padding: '20px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    display: 'flex',
    flexDirection: 'column',
  },
  cardHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    marginBottom: '16px',
  },
  infoIcon: {
    color: '#666',
    backgroundColor: '#f5f5f5',
    padding: '4px',
    borderRadius: '4px',
  },
  cardTitle: {
    fontSize: '11px',
    fontWeight: 'bold',
    color: '#666',
    textTransform: 'uppercase',
  },
  mainStat: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  mainNumber: {
    fontSize: '36px',
    fontWeight: 'bold',
    color: '#333',
    lineHeight: 1,
  },
  statLabel: {
    fontSize: '12px',
    color: '#666',
    marginTop: '4px',
  },
  changeIndicator: {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    marginTop: 'auto',
  },
  trendIcon: {
    color: '#4CAF50',
  },
  changeValue: {
    fontSize: '12px',
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  legendContainer: {
    display: 'flex',
    gap: '16px',
    marginBottom: '8px',
  },
  legendItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
  },
  legendDot: {
    width: '8px',
    height: '8px',
    borderRadius: '50%',
  },
  legendText: {
    fontSize: '10px',
    color: '#666',
    textTransform: 'uppercase',
  },
  circularContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
};

export default SportBitStatistics;