// SafeScroll Web Application
// Clean, human, readable UI with simple purple, white, light blue, blue, and pink colors.

const { useState, useEffect, useRef, useMemo } = React;

// Lucide Icon Component
function Icon({ name, size = 18, className = '', ...props }) {
  const iconData = window.lucide && window.lucide[name] ? window.lucide[name] : null;

  if (!iconData || !Array.isArray(iconData)) {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={`inline-block shrink-0 ${className}`}
        {...props}
      >
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="8" x2="12" y2="12" />
        <line x1="12" y1="16" x2="12.01" y2="16" />
      </svg>
    );
  }

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`inline-block shrink-0 ${className}`}
      {...props}
    >
      {iconData.map(([tag, attrs], idx) => {
        if (tag === 'circle') return <circle key={idx} {...attrs} />;
        if (tag === 'path') return <path key={idx} {...attrs} />;
        if (tag === 'line') return <line key={idx} {...attrs} />;
        if (tag === 'rect') return <rect key={idx} {...attrs} />;
        if (tag === 'polyline') return <polyline key={idx} {...attrs} />;
        if (tag === 'polygon') return <polygon key={idx} {...attrs} />;
        return null;
      })}
    </svg>
  );
}

// Chart.js Wrapper
function CleanChart({ type, data, options, className = '' }) {
  const canvasRef = useRef(null);
  const chartInstanceRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current || !window.Chart) return;

    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }

    try {
      const ctx = canvasRef.current.getContext('2d');
      chartInstanceRef.current = new window.Chart(ctx, {
        type,
        data,
        options: {
          responsive: true,
          maintainAspectRatio: false,
          animation: { duration: 400 },
          ...options
        }
      });
    } catch (e) {
      console.error('Chart error:', e);
    }

    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
    };
  }, [data, options, type]);

  return (
    <div className={`relative w-full ${className}`}>
      <canvas ref={canvasRef}></canvas>
    </div>
  );
}

// Main Application
function SafeScrollApp() {
  // Current user state
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('safescroll_user');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { return null; }
    }
    return {
      name: 'Alex Rivera',
      email: 'demo@safescroll.com',
      role: 'Student & Educator',
      avatar: 'AR',
      country: 'FR'
    };
  });

  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [toastMessage, setToastMessage] = useState(null);

  // Authentication State
  const [authMode, setAuthMode] = useState('login'); // 'login' | 'signup'
  const [authEmail, setAuthEmail] = useState('');
  const [authPassword, setAuthPassword] = useState('');
  const [authName, setAuthName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [authError, setAuthError] = useState('');
  const [authSuccess, setAuthSuccess] = useState('');

  // Age Checker State
  const [dob, setDob] = useState('2013-05-18');
  const [selectedCountry, setSelectedCountry] = useState('FR');
  const [ageThreshold, setAgeThreshold] = useState(15);
  const [customThresholdInput, setCustomThresholdInput] = useState('15');
  const [eligibilityResult, setEligibilityResult] = useState(null);

  // Screen Time State
  const [screenSocialHours, setScreenSocialHours] = useState(4.0);
  const [screenTotalHours, setScreenTotalHours] = useState(6.5);
  const [screenSleepHours, setScreenSleepHours] = useState(7.5);
  const [userAgeInput, setUserAgeInput] = useState(14);
  const [screenActivityHours, setScreenActivityHours] = useState(1.5);
  const [platformsCount, setPlatformsCount] = useState(3);

  // Health Slider State
  const [healthScreenHours, setHealthScreenHours] = useState(4);
  const [selectedHealthCategory, setSelectedHealthCategory] = useState('all');

  // Quiz State
  const [quizIndex, setQuizIndex] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  // Checklists State
  const [checkedStrategies, setCheckedStrategies] = useState(() => {
    try {
      const saved = localStorage.getItem('safescroll_checklist');
      return saved ? JSON.parse(saved) : { p1: true, c1: true, s1: false, t1: true };
    } catch (e) {
      return {};
    }
  });

  // Global search hits
  const [filteredResults, setFilteredResults] = useState([]);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  useEffect(() => {
    localStorage.setItem('safescroll_checklist', JSON.stringify(checkedStrategies));
  }, [checkedStrategies]);

  useEffect(() => {
    handleAgeCheck(dob, ageThreshold, selectedCountry);
  }, []);

  // Login handler
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    setAuthError('');
    const emailTrim = authEmail.trim().toLowerCase();

    if (!emailTrim || !authPassword) {
      setAuthError('Please enter both your email and password.');
      return;
    }

    const isDemo = emailTrim === 'demo@safescroll.com' && authPassword === 'SafeScroll123';
    let storedUsers = [];
    try {
      storedUsers = JSON.parse(localStorage.getItem('safescroll_registered_users') || '[]');
    } catch (err) {}

    const matchedUser = storedUsers.find(u => u.email.toLowerCase() === emailTrim && u.password === authPassword);

    if (isDemo || matchedUser) {
      const userObj = matchedUser ? {
        name: matchedUser.name,
        email: matchedUser.email,
        role: 'Verified Member',
        avatar: matchedUser.name.slice(0, 2).toUpperCase(),
        country: matchedUser.country || 'FR'
      } : {
        name: 'Alex Rivera',
        email: 'demo@safescroll.com',
        role: 'Student & Educator',
        avatar: 'AR',
        country: 'FR'
      };

      if (rememberMe) {
        localStorage.setItem('safescroll_user', JSON.stringify(userObj));
      }
      setCurrentUser(userObj);
      showToast('Welcome, ' + userObj.name + '!');
    } else {
      setAuthError('Email or password incorrect. Try demo: demo@safescroll.com / SafeScroll123');
    }
  };

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    setAuthError('');

    if (!authName.trim()) {
      setAuthError('Please enter your name.');
      return;
    }
    if (!authEmail.includes('@')) {
      setAuthError('Please enter a valid email.');
      return;
    }
    if (authPassword.length < 6) {
      setAuthError('Password must be at least 6 characters.');
      return;
    }

    const newUser = {
      name: authName.trim(),
      email: authEmail.trim().toLowerCase(),
      password: authPassword,
      country: selectedCountry || 'FR'
    };

    let storedUsers = [];
    try {
      storedUsers = JSON.parse(localStorage.getItem('safescroll_registered_users') || '[]');
    } catch (err) {}

    storedUsers.push(newUser);
    localStorage.setItem('safescroll_registered_users', JSON.stringify(storedUsers));

    const userObj = {
      name: newUser.name,
      email: newUser.email,
      role: 'Member',
      avatar: newUser.name.slice(0, 2).toUpperCase(),
      country: newUser.country
    };

    localStorage.setItem('safescroll_user', JSON.stringify(userObj));
    setCurrentUser(userObj);
    showToast('Account created successfully!');
  };

  const handleDemoQuickLogin = () => {
    const demoUser = {
      name: 'Alex Rivera (Demo)',
      email: 'demo@safescroll.com',
      role: 'Student & Educator',
      avatar: 'AR',
      country: 'FR'
    };
    localStorage.setItem('safescroll_user', JSON.stringify(demoUser));
    setCurrentUser(demoUser);
    showToast('Signed in with Demo account.');
  };

  const handleLogout = () => {
    localStorage.removeItem('safescroll_user');
    setCurrentUser(null);
    showToast('Signed out.');
  };

  // Age Check
  const handleAgeCheck = (birthdateStr, threshold, countryCode) => {
    if (!birthdateStr) return;

    const birthDate = new Date(birthdateStr);
    const today = new Date();

    if (isNaN(birthDate.getTime()) || birthDate > today) {
      setEligibilityResult({ error: 'Please enter a valid past birth date.' });
      return;
    }

    let years = today.getFullYear() - birthDate.getFullYear();
    let months = today.getMonth() - birthDate.getMonth();
    let days = today.getDate() - birthDate.getDate();

    if (days < 0) {
      months -= 1;
      const prevMonth = new Date(today.getFullYear(), today.getMonth(), 0);
      days += prevMonth.getDate();
    }
    if (months < 0) {
      years -= 1;
      months += 12;
    }

    const totalMonths = years * 12 + months;
    const thresholdYears = Number(threshold);
    const thresholdMonths = thresholdYears * 12;
    const isEligible = totalMonths >= thresholdMonths;
    const countryData = window.SAFE_SCROLL_DATA.countries.find(c => c.code === countryCode) || window.SAFE_SCROLL_DATA.countries[0];

    if (isEligible && window.confetti) {
      try {
        window.confetti({ particleCount: 50, spread: 50, origin: { y: 0.6 } });
      } catch (e) {}
    }

    setEligibilityResult({
      years,
      months,
      days,
      isEligible,
      thresholdYears,
      countryData
    });
  };

  // Screen time stats
  const wellbeingStats = useMemo(() => {
    const socialDaily = Number(screenSocialHours) || 0;
    const totalDaily = Math.max(Number(screenTotalHours) || 0, socialDaily);
    const sleep = Number(screenSleepHours) || 0;
    const exercise = Number(screenActivityHours) || 0;

    const weeklySocial = socialDaily * 7;
    const monthlySocial = socialDaily * 30.4;
    const annualSocial = socialDaily * 365;
    const annualDaysLost = (annualSocial / 24).toFixed(0);

    let score = 100;
    if (socialDaily > 5) score -= 35;
    else if (socialDaily > 3.5) score -= 20;
    else if (socialDaily > 2) score -= 10;

    if (sleep < 7) score -= 25;
    else if (sleep < 8) score -= 10;

    if (exercise >= 1.0) score += 5;
    else score -= 10;

    score = Math.max(20, Math.min(98, score));

    let category = 'Healthy Routine';
    let categoryBadge = 'bg-emerald-50 text-emerald-700 border-emerald-200';
    let suggestions = [
      'Keep your phone away from the study desk during homework.',
      'Maintain 8 to 9 hours of uninterrupted sleep every night.',
      'Spend at least 1 hour outside doing sports or walking each day.'
    ];

    if (score < 50) {
      category = 'High Screen Time';
      categoryBadge = 'bg-pink-50 text-pink-700 border-pink-200';
      suggestions = [
        'Try setting an app timer of 2 hours total per day.',
        'Keep phones outside your bedroom at night to improve sleep.',
        'Replace 45 minutes of phone time with outdoor activities.',
        'Turn off social media notification banners to stop distractions.'
      ];
    } else if (score < 75) {
      category = 'Moderate Screen Time';
      categoryBadge = 'bg-purple-50 text-purple-700 border-purple-200';
      suggestions = [
        'Cut 30 minutes from scrolling apps and add it to sleep or reading.',
        'Use the 20-20-20 rule during computer and phone sessions.',
        'Avoid screens for 30 minutes right before going to bed.'
      ];
    }

    return {
      socialDaily,
      totalDaily,
      weeklySocial: weeklySocial.toFixed(1),
      monthlySocial: monthlySocial.toFixed(0),
      annualSocial: annualSocial.toFixed(0),
      annualDaysLost,
      score,
      category,
      categoryBadge,
      suggestions,
      sleep,
      exercise
    };
  }, [screenSocialHours, screenTotalHours, screenSleepHours, screenActivityHours]);

  const toggleChecklist = (id) => {
    setCheckedStrategies(prev => ({ ...prev, [id]: !prev[id] }));
    showToast('Saved to your checklist.');
  };

  const handleRestartQuiz = () => {
    setQuizIndex(0);
    setQuizAnswers({});
    setQuizSubmitted(false);
    showToast('Quiz reset. Try again!');
  };

  const handleSearch = (e) => {
    const q = e.target.value;
    setSearchQuery(q);
    if (!q.trim()) {
      setFilteredResults([]);
      return;
    }
    const lower = q.toLowerCase();
    const hits = [];

    window.SAFE_SCROLL_DATA.policyTimeline.forEach(p => {
      if (p.title.toLowerCase().includes(lower) || p.description.toLowerCase().includes(lower)) {
        hits.push({ title: p.title, section: 'policy', snippet: p.description });
      }
    });

    window.SAFE_SCROLL_DATA.references.forEach(r => {
      if (r.title.toLowerCase().includes(lower) || r.org.toLowerCase().includes(lower)) {
        hits.push({ title: r.title, section: 'resources', snippet: r.summary });
      }
    });

    setFilteredResults(hits.slice(0, 5));
  };

  const navItems = [
    { id: 'dashboard', label: 'Overview', icon: 'LayoutDashboard' },
    { id: 'policy', label: 'EU Rules Explained', icon: 'Shield' },
    { id: 'age-checker', label: 'Age Checker', icon: 'Calendar' },
    { id: 'wellbeing', label: 'Screen Time Calculator', icon: 'Clock' },
    { id: 'health-impact', label: 'Health & Wellbeing', icon: 'Heart' },
    { id: 'prevention', label: 'Action Checklist', icon: 'CheckSquare' },
    { id: 'quiz', label: '10-Question Quiz', icon: 'HelpCircle' },
    { id: 'statistics', label: 'Charts & Facts', icon: 'BarChart' },
    { id: 'resources', label: 'Official References', icon: 'BookOpen' },
    { id: 'profile', label: 'My Settings', icon: 'User' }
  ];

  // -------------------------------------------------------------
  // LOGIN SCREEN (Clean, simple white & purple styling)
  // -------------------------------------------------------------
  if (!currentUser) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col justify-center items-center p-4">
        <div className="w-full max-w-md">

          {/* Logo / Header */}
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-purple-600 text-white mb-3 shadow-sm">
              <Icon name="ShieldCheck" size={24} />
            </div>
            <h1 className="text-2xl font-bold text-slate-800">Safe Scroll</h1>
            <p className="text-sm text-slate-500 mt-1">Understanding the EU's plans for kids on social media</p>
          </div>

          {/* Form Card */}
          <div className="card-clean rounded-2xl p-6 sm:p-8">
            <div className="flex border-b border-slate-200 mb-6">
              <button
                type="button"
                onClick={() => { setAuthMode('login'); setAuthError(''); }}
                className={`flex-1 pb-3 text-sm font-semibold border-b-2 transition-colors ${
                  authMode === 'login' ? 'border-purple-600 text-purple-600' : 'border-transparent text-slate-400 hover:text-slate-600'
                }`}
              >
                Sign In
              </button>
              <button
                type="button"
                onClick={() => { setAuthMode('signup'); setAuthError(''); }}
                className={`flex-1 pb-3 text-sm font-semibold border-b-2 transition-colors ${
                  authMode === 'signup' ? 'border-purple-600 text-purple-600' : 'border-transparent text-slate-400 hover:text-slate-600'
                }`}
              >
                Create Account
              </button>
            </div>

            {authError && (
              <div className="mb-4 p-3 rounded-lg bg-pink-50 border border-pink-200 text-pink-700 text-xs">
                {authError}
              </div>
            )}
            {authSuccess && (
              <div className="mb-4 p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs">
                {authSuccess}
              </div>
            )}

            <form onSubmit={authMode === 'login' ? handleLoginSubmit : handleSignupSubmit} className="space-y-4">
              {authMode === 'signup' && (
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">Your Name</label>
                  <input
                    type="text"
                    value={authName}
                    onChange={(e) => setAuthName(e.target.value)}
                    placeholder="Alex Rivera"
                    className="w-full px-3.5 py-2 text-sm rounded-lg border border-slate-300 focus:outline-none focus:border-purple-600"
                  />
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Email</label>
                <input
                  type="email"
                  value={authEmail}
                  onChange={(e) => setAuthEmail(e.target.value)}
                  placeholder="demo@safescroll.com"
                  className="w-full px-3.5 py-2 text-sm rounded-lg border border-slate-300 focus:outline-none focus:border-purple-600"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={authPassword}
                    onChange={(e) => setAuthPassword(e.target.value)}
                    placeholder="SafeScroll123"
                    className="w-full px-3.5 py-2 text-sm rounded-lg border border-slate-300 focus:outline-none focus:border-purple-600 pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600"
                  >
                    <Icon name={showPassword ? 'EyeOff' : 'Eye'} size={16} />
                  </button>
                </div>
              </div>

              {authMode === 'login' && (
                <div className="flex items-center justify-between text-xs text-slate-500 pt-1">
                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="rounded border-slate-300 text-purple-600 focus:ring-purple-500"
                    />
                    <span>Remember me</span>
                  </label>
                  <button
                    type="button"
                    onClick={() => {
                      setAuthEmail('demo@safescroll.com');
                      setAuthPassword('SafeScroll123');
                      setAuthSuccess('Demo credentials filled!');
                    }}
                    className="text-purple-600 hover:underline"
                  >
                    Use demo password
                  </button>
                </div>
              )}

              <button
                type="submit"
                className="w-full py-2.5 px-4 rounded-lg bg-purple-600 hover:bg-purple-700 text-white font-medium text-sm transition-colors"
              >
                {authMode === 'login' ? 'Sign In' : 'Sign Up'}
              </button>
            </form>

            <div className="mt-5 pt-4 border-t border-slate-100 text-center">
              <button
                type="button"
                onClick={handleDemoQuickLogin}
                className="w-full py-2 px-3 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-colors flex items-center justify-center gap-2"
              >
                <Icon name="Sparkles" size={14} className="text-purple-600" />
                <span>Instant Demo Login (demo@safescroll.com)</span>
              </button>
            </div>
          </div>

          <div className="text-center text-xs text-slate-400 mt-4">
            Safe Scroll • Educational EU Youth Safety Guide
          </div>
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // MAIN DASHBOARD (Clean, Neutral, Simple Purple & Blue theme)
  // -------------------------------------------------------------
  return (
    <div className="min-h-screen bg-slate-50 flex text-slate-800">

      {/* Toast Notice */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 bg-slate-800 text-white text-xs py-2.5 px-4 rounded-xl shadow-lg flex items-center gap-2">
          <Icon name="CheckCircle" size={16} className="text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-slate-900/30 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Clean Sidebar */}
      <aside className={`fixed lg:static top-0 bottom-0 left-0 z-50 w-64 bg-white border-r border-slate-200 flex flex-col transition-transform duration-200 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      }`}>
        {/* Brand */}
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-purple-600 text-white flex items-center justify-center">
              <Icon name="Shield" size={18} />
            </div>
            <div>
              <div className="font-bold text-sm text-slate-800">Safe Scroll</div>
              <div className="text-[11px] text-slate-400">EU Online Safety</div>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-slate-400 hover:text-slate-600"
          >
            <Icon name="X" size={18} />
          </button>
        </div>

        {/* Navigation list */}
        <div className="flex-1 overflow-y-auto p-3 space-y-1">
          <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider px-2 py-1">Menu</div>
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  setActiveTab(item.id);
                  setSidebarOpen(false);
                }}
                className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                  isActive
                    ? 'bg-purple-50 text-purple-700 font-semibold'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <Icon
                  name={item.icon}
                  size={16}
                  className={isActive ? 'text-purple-600' : 'text-slate-400'}
                />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>

        {/* Sidebar User Card */}
        <div className="p-3 border-t border-slate-100 bg-slate-50 flex items-center justify-between">
          <div className="flex items-center gap-2 overflow-hidden">
            <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 font-bold text-xs flex items-center justify-center shrink-0">
              {currentUser.avatar}
            </div>
            <div className="overflow-hidden">
              <div className="text-xs font-semibold text-slate-700 truncate">{currentUser.name}</div>
              <div className="text-[10px] text-slate-400 truncate">{currentUser.email}</div>
            </div>
          </div>
          <button
            type="button"
            onClick={handleLogout}
            title="Sign Out"
            className="p-1.5 text-slate-400 hover:text-pink-600 rounded-lg hover:bg-pink-50"
          >
            <Icon name="LogOut" size={16} />
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">

        {/* Top Navbar */}
        <header className="sticky top-0 z-30 bg-white border-b border-slate-200 px-5 py-3 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-1.5 text-slate-600 hover:bg-slate-100 rounded-lg"
            >
              <Icon name="Menu" size={20} />
            </button>
            <h2 className="text-sm font-bold text-slate-800">
              {navItems.find(i => i.id === activeTab)?.label}
            </h2>
          </div>

          {/* Search bar */}
          <div className="relative w-64 hidden sm:block">
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearch}
              placeholder="Search topics, laws, quiz..."
              className="w-full pl-8 pr-3 py-1.5 text-xs rounded-lg border border-slate-200 bg-slate-50 focus:outline-none focus:bg-white focus:border-purple-600"
            />
            <div className="absolute left-2.5 top-2 text-slate-400 pointer-events-none">
              <Icon name="Search" size={14} />
            </div>

            {/* Quick search results */}
            {filteredResults.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-slate-200 rounded-lg shadow-lg p-2 z-50">
                <div className="text-[10px] font-bold text-slate-400 px-2 py-1 uppercase">Matches</div>
                {filteredResults.map((r, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => {
                      setActiveTab(r.section);
                      setFilteredResults([]);
                      setSearchQuery('');
                    }}
                    className="w-full text-left p-2 rounded hover:bg-slate-50 text-xs"
                  >
                    <div className="font-semibold text-purple-600">{r.title}</div>
                    <div className="text-[11px] text-slate-500 truncate">{r.snippet}</div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </header>

        {/* Main Body */}
        <main className="p-4 sm:p-6 lg:p-8 max-w-6xl mx-auto w-full space-y-6">

          {/* -------------------------------------------------------------
              TAB 1: OVERVIEW / DASHBOARD
          ------------------------------------------------------------- */}
          {activeTab === 'dashboard' && (
            <div className="space-y-6">

              {/* Simple Clean Header Banner */}
              <div className="card-clean rounded-2xl p-6 sm:p-8 bg-white">
                <div className="max-w-2xl">
                  <span className="inline-block px-2.5 py-1 rounded-md bg-purple-50 text-purple-700 text-xs font-semibold mb-3">
                    European Union Youth Safety
                  </span>
                  <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-2">
                    How Europe is Protecting Under-15s Online
                  </h1>
                  <p className="text-sm text-slate-600 leading-relaxed mb-5">
                    Clear, reliable facts about the laws in France, discussions across the European Union, and practical ways to keep your phone usage balanced and healthy.
                  </p>
                  <div className="flex flex-wrap gap-2.5">
                    <button
                      type="button"
                      onClick={() => setActiveTab('age-checker')}
                      className="px-4 py-2 rounded-lg bg-purple-600 hover:bg-purple-700 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors"
                    >
                      <Icon name="Calendar" size={14} />
                      <span>Check Your Age</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveTab('policy')}
                      className="px-4 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold flex items-center gap-1.5 transition-colors"
                    >
                      <Icon name="BookOpen" size={14} />
                      <span>Read the Rules</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveTab('quiz')}
                      className="px-4 py-2 rounded-lg bg-pink-50 hover:bg-pink-100 text-pink-700 text-xs font-semibold flex items-center gap-1.5 transition-colors"
                    >
                      <Icon name="HelpCircle" size={14} />
                      <span>Take 10-Question Quiz</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* 4 Stats Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="card-clean rounded-xl p-4">
                  <div className="text-xs text-slate-500 font-medium">Proposed EU Age</div>
                  <div className="text-2xl font-bold text-slate-800 mt-1">15 Years</div>
                  <div className="text-[11px] text-purple-600 mt-1 font-medium">Passed into law in France</div>
                </div>

                <div className="card-clean rounded-xl p-4">
                  <div className="text-xs text-slate-500 font-medium">Average Teen Screen Time</div>
                  <div className="text-2xl font-bold text-slate-800 mt-1">5.8 hrs/day</div>
                  <div className="text-[11px] text-sky-600 mt-1 font-medium">European average across apps</div>
                </div>

                <div className="card-clean rounded-xl p-4">
                  <div className="text-xs text-slate-500 font-medium">Your Routine Score</div>
                  <div className="text-2xl font-bold text-slate-800 mt-1">{wellbeingStats.score} / 100</div>
                  <div className="text-[11px] text-emerald-600 mt-1 font-medium">{wellbeingStats.category}</div>
                </div>

                <div className="card-clean rounded-xl p-4">
                  <div className="text-xs text-slate-500 font-medium">Targeted Ads to Kids</div>
                  <div className="text-2xl font-bold text-slate-800 mt-1">Banned</div>
                  <div className="text-[11px] text-blue-600 mt-1 font-medium">Under the Digital Services Act</div>
                </div>
              </div>

              {/* Chart & Quick Age Checker */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* Left 2 Cols: Simple Screen Time Chart */}
                <div className="lg:col-span-2 card-clean rounded-2xl p-5 sm:p-6 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h3 className="text-sm font-bold text-slate-800">Screen Time vs. Recommended Limits</h3>
                        <p className="text-xs text-slate-500">Comparing your daily inputs with WHO guidelines</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => setActiveTab('wellbeing')}
                        className="text-xs text-purple-600 font-semibold hover:underline"
                      >
                        Adjust Inputs →
                      </button>
                    </div>

                    <CleanChart
                      type="bar"
                      className="h-56"
                      data={{
                        labels: ['Social Apps', 'Total Screen', 'Sleep', 'Exercise'],
                        datasets: [
                          {
                            label: 'Your Current Day (hrs)',
                            data: [screenSocialHours, screenTotalHours, screenSleepHours, screenActivityHours],
                            backgroundColor: '#8B5CF6',
                            borderRadius: 6
                          },
                          {
                            label: 'Recommended (hrs)',
                            data: [1.5, 2.5, 9.0, 1.5],
                            backgroundColor: '#38BDF8',
                            borderRadius: 6
                          }
                        ]
                      }}
                      options={{
                        scales: {
                          y: { beginAtZero: true, title: { display: true, text: 'Hours per day' } }
                        }
                      }}
                    />
                  </div>

                  <div className="mt-4 pt-4 border-t border-slate-100 grid grid-cols-3 gap-2 text-center text-xs">
                    <div>
                      <div className="text-slate-400">Weekly Social</div>
                      <div className="font-bold text-purple-700">{wellbeingStats.weeklySocial} hrs</div>
                    </div>
                    <div>
                      <div className="text-slate-400">Yearly Social</div>
                      <div className="font-bold text-sky-700">{wellbeingStats.annualSocial} hrs</div>
                    </div>
                    <div>
                      <div className="text-slate-400">Days per Year</div>
                      <div className="font-bold text-pink-700">{wellbeingStats.annualDaysLost} full days</div>
                    </div>
                  </div>
                </div>

                {/* Right 1 Col: Quick Age Check widget */}
                <div className="card-clean rounded-2xl p-5 flex flex-col justify-between">
                  <div>
                    <h3 className="text-sm font-bold text-slate-800 mb-1">Quick Age Checker</h3>
                    <p className="text-xs text-slate-500 mb-3">Check if you meet the age 15 rule.</p>

                    <div className="space-y-3">
                      <div>
                        <label className="block text-xs font-semibold text-slate-600 mb-1">Your Birthday</label>
                        <input
                          type="date"
                          value={dob}
                          onChange={(e) => {
                            setDob(e.target.value);
                            handleAgeCheck(e.target.value, ageThreshold, selectedCountry);
                          }}
                          className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-200 bg-slate-50 focus:bg-white"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-600 mb-1">Country</label>
                        <select
                          value={selectedCountry}
                          onChange={(e) => {
                            setSelectedCountry(e.target.value);
                            handleAgeCheck(dob, ageThreshold, e.target.value);
                          }}
                          className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-200 bg-slate-50 focus:bg-white"
                        >
                          {window.SAFE_SCROLL_DATA.countries.map(c => (
                            <option key={c.code} value={c.code}>{c.name}</option>
                          ))}
                        </select>
                      </div>

                      {eligibilityResult && (
                        <div className={`p-3 rounded-xl border text-xs ${
                          eligibilityResult.isEligible
                            ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
                            : 'bg-pink-50 border-pink-200 text-pink-800'
                        }`}>
                          <div className="font-bold mb-0.5">
                            {eligibilityResult.isEligible ? 'Meets Age Threshold' : 'Under Age 15'}
                          </div>
                          <div>
                            Age: <strong>{eligibilityResult.years} yrs, {eligibilityResult.months} mos</strong>.
                            {eligibilityResult.isEligible
                              ? ' You can open an account under standard rules.'
                              : ' Requires parent approval under France\'s rule and proposed EU guidelines.'}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setActiveTab('age-checker')}
                    className="w-full mt-4 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-colors"
                  >
                    Open Full Age Checker →
                  </button>
                </div>

              </div>

              {/* 3 Simple Action Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div
                  onClick={() => setActiveTab('health-impact')}
                  className="card-clean rounded-xl p-4 cursor-pointer hover:border-purple-300 transition-colors"
                >
                  <div className="flex items-center gap-2 mb-1.5">
                    <Icon name="Heart" size={16} className="text-pink-600" />
                    <h4 className="text-xs font-bold text-slate-800">Health Impact</h4>
                  </div>
                  <p className="text-xs text-slate-500">Understand sleep, posture, eye strain, and focus.</p>
                </div>

                <div
                  onClick={() => setActiveTab('prevention')}
                  className="card-clean rounded-xl p-4 cursor-pointer hover:border-purple-300 transition-colors"
                >
                  <div className="flex items-center gap-2 mb-1.5">
                    <Icon name="CheckSquare" size={16} className="text-emerald-600" />
                    <h4 className="text-xs font-bold text-slate-800">Prevention Checklist</h4>
                  </div>
                  <p className="text-xs text-slate-500">Action items for parents, kids, and schools.</p>
                </div>

                <div
                  onClick={() => setActiveTab('resources')}
                  className="card-clean rounded-xl p-4 cursor-pointer hover:border-purple-300 transition-colors"
                >
                  <div className="flex items-center gap-2 mb-1.5">
                    <Icon name="BookOpen" size={16} className="text-sky-600" />
                    <h4 className="text-xs font-bold text-slate-800">Official Sources</h4>
                  </div>
                  <p className="text-xs text-slate-500">Official European Commission and WHO publications.</p>
                </div>
              </div>

            </div>
          )}

          {/* -------------------------------------------------------------
              TAB 2: EU POLICY EXPLAINER
          ------------------------------------------------------------- */}
          {activeTab === 'policy' && (
            <div className="space-y-6">

              <div className="card-clean rounded-2xl p-6 sm:p-8">
                <span className="text-xs font-semibold text-purple-600 uppercase tracking-wider">EU Regulations</span>
                <h1 className="text-2xl font-bold text-slate-900 mt-1 mb-2">
                  What is the EU actually doing about social media under 15?
                </h1>
                <p className="text-sm text-slate-600 max-w-3xl leading-relaxed">
                  Here is the simple truth: there is no single ban across all 27 EU countries right now. France passed an under-15 parental consent law, and the European Union is currently investigating whether to make it a Europe-wide standard.
                </p>
              </div>

              {/* 3 Core Rules */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="card-clean rounded-xl p-5">
                  <div className="w-8 h-8 rounded-lg bg-purple-100 text-purple-700 flex items-center justify-center mb-3">
                    <Icon name="Lock" size={16} />
                  </div>
                  <h3 className="text-sm font-bold text-slate-800 mb-1">No Targeted Ads to Children</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Under the EU Digital Services Act (DSA), platforms cannot track children's clicks to serve personalized ads.
                  </p>
                  <span className="inline-block mt-3 text-[10px] px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 font-semibold border border-emerald-200">
                    Active Law
                  </span>
                </div>

                <div className="card-clean rounded-xl p-5">
                  <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center mb-3">
                    <Icon name="CheckCircle" size={16} />
                  </div>
                  <h3 className="text-sm font-bold text-slate-800 mb-1">Replacing Simple Checkboxes</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Instead of fake birth dates, the EU is testing secure digital ID verification so apps know you are of legal age without tracking your name.
                  </p>
                  <span className="inline-block mt-3 text-[10px] px-2 py-0.5 rounded bg-blue-50 text-blue-700 font-semibold border border-blue-200">
                    Being Tested
                  </span>
                </div>

                <div className="card-clean rounded-xl p-5">
                  <div className="w-8 h-8 rounded-lg bg-pink-100 text-pink-700 flex items-center justify-center mb-3">
                    <Icon name="Smartphone" size={16} />
                  </div>
                  <h3 className="text-sm font-bold text-slate-800 mb-1">Investigating Addictive Feeds</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    EU officials are investigating infinite scrolling and snap streaks to make sure tech companies are not exploiting young attention spans.
                  </p>
                  <span className="inline-block mt-3 text-[10px] px-2 py-0.5 rounded bg-purple-50 text-purple-700 font-semibold border border-purple-200">
                    Under Review
                  </span>
                </div>
              </div>

              {/* Timeline */}
              <div className="card-clean rounded-2xl p-6 sm:p-8">
                <h3 className="text-base font-bold text-slate-800 mb-4">Timeline of European Actions</h3>
                <div className="space-y-4">
                  {window.SAFE_SCROLL_DATA.policyTimeline.map((item, idx) => (
                    <div key={idx} className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-purple-600">{item.month} {item.year}</span>
                          <span className="text-slate-300">•</span>
                          <span className="text-xs font-semibold text-slate-800">{item.title}</span>
                        </div>
                        <span className="text-[10px] px-2 py-0.5 rounded font-semibold bg-white border border-slate-200 text-slate-600">
                          {item.badge}
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 mb-2">{item.description}</p>
                      <div className="text-[11px] text-slate-500 bg-white p-2 rounded border border-slate-100">
                        <strong>What it means:</strong> {item.impact}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* -------------------------------------------------------------
              TAB 3: AGE ELIGIBILITY CHECKER
          ------------------------------------------------------------- */}
          {activeTab === 'age-checker' && (
            <div className="space-y-6">

              <div className="card-clean rounded-2xl p-6 sm:p-8">
                <span className="text-xs font-semibold text-purple-600 uppercase tracking-wider">Interactive Tool</span>
                <h1 className="text-2xl font-bold text-slate-900 mt-1 mb-2">
                  Age Eligibility Simulator
                </h1>
                <p className="text-sm text-slate-600 max-w-3xl leading-relaxed">
                  Enter your date of birth to see how age laws in France and proposed EU rules apply to you.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

                {/* Form (5 cols) */}
                <div className="lg:col-span-5 card-clean rounded-2xl p-6 space-y-4">
                  <h3 className="text-sm font-bold text-slate-800">Your Information</h3>

                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1">Date of Birth</label>
                    <input
                      type="date"
                      value={dob}
                      max={new Date().toISOString().split('T')[0]}
                      onChange={(e) => setDob(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 bg-slate-50 focus:bg-white focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1">Country</label>
                    <select
                      value={selectedCountry}
                      onChange={(e) => setSelectedCountry(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 bg-slate-50 focus:bg-white focus:outline-none"
                    >
                      {window.SAFE_SCROLL_DATA.countries.map(c => (
                        <option key={c.code} value={c.code}>{c.name} (Current Rule: Age {c.defaultGdprAge})</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1">Threshold to Test</label>
                    <div className="grid grid-cols-2 gap-2">
                      {[13, 15, 16].map(t => (
                        <button
                          key={t}
                          type="button"
                          onClick={() => { setAgeThreshold(t); setCustomThresholdInput(t.toString()); }}
                          className={`py-2 px-3 rounded-lg text-xs font-semibold border ${
                            ageThreshold === t
                              ? 'bg-purple-600 text-white border-purple-600'
                              : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                          }`}
                        >
                          Under {t} {t === 15 ? '(Default)' : ''}
                        </button>
                      ))}
                      <button
                        type="button"
                        onClick={() => setAgeThreshold(Number(customThresholdInput) || 15)}
                        className={`py-2 px-3 rounded-lg text-xs font-semibold border ${
                          ![13, 15, 16].includes(ageThreshold)
                            ? 'bg-purple-600 text-white border-purple-600'
                            : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        Custom
                      </button>
                    </div>

                    {![13, 15, 16].includes(ageThreshold) && (
                      <div className="mt-2 flex items-center gap-2">
                        <input
                          type="number"
                          min="10"
                          max="21"
                          value={customThresholdInput}
                          onChange={(e) => {
                            setCustomThresholdInput(e.target.value);
                            setAgeThreshold(Number(e.target.value) || 15);
                          }}
                          className="w-20 px-2.5 py-1 text-xs rounded border border-slate-300"
                        />
                        <span className="text-xs text-slate-500">Years</span>
                      </div>
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={() => handleAgeCheck(dob, ageThreshold, selectedCountry)}
                    className="w-full py-2.5 rounded-lg bg-purple-600 hover:bg-purple-700 text-white text-xs font-semibold transition-colors"
                  >
                    Calculate Eligibility
                  </button>
                </div>

                {/* Results (7 cols) */}
                <div className="lg:col-span-7">
                  {eligibilityResult && (
                    <div className={`card-clean rounded-2xl p-6 border-2 ${
                      eligibilityResult.isEligible ? 'border-emerald-300 bg-emerald-50/20' : 'border-pink-300 bg-pink-50/20'
                    }`}>
                      <div className="flex items-center justify-between mb-4">
                        <span className={`px-2.5 py-1 rounded-md text-xs font-bold ${
                          eligibilityResult.isEligible ? 'bg-emerald-100 text-emerald-800' : 'bg-pink-100 text-pink-800'
                        }`}>
                          {eligibilityResult.isEligible ? 'Meets Age Requirement' : 'Below Age Requirement'}
                        </span>
                        <span className="text-xs text-slate-400">Testing against age {eligibilityResult.thresholdYears}</span>
                      </div>

                      <h2 className="text-xl font-bold text-slate-900 mb-2">
                        {eligibilityResult.isEligible
                          ? 'You have reached the selected age threshold.'
                          : 'You are currently below the selected age threshold.'}
                      </h2>

                      {/* Exact breakdown */}
                      <div className="grid grid-cols-3 gap-3 my-4 p-3 rounded-xl bg-white border border-slate-200 text-center">
                        <div>
                          <div className="text-2xl font-bold text-purple-600">{eligibilityResult.years}</div>
                          <div className="text-[11px] text-slate-400 uppercase font-semibold">Years</div>
                        </div>
                        <div>
                          <div className="text-2xl font-bold text-sky-600">{eligibilityResult.months}</div>
                          <div className="text-[11px] text-slate-400 uppercase font-semibold">Months</div>
                        </div>
                        <div>
                          <div className="text-2xl font-bold text-pink-600">{eligibilityResult.days}</div>
                          <div className="text-[11px] text-slate-400 uppercase font-semibold">Days</div>
                        </div>
                      </div>

                      <div className="text-xs text-slate-600 space-y-2 leading-relaxed">
                        <p>
                          {eligibilityResult.isEligible ? (
                            <span>At {eligibilityResult.years} years old, you meet the age threshold of {eligibilityResult.thresholdYears}. You can open accounts under standard terms.</span>
                          ) : (
                            <span>Under age 15 rules in France and proposed EU recommendations, users under {eligibilityResult.thresholdYears} need verified parental approval before creating accounts.</span>
                          )}
                        </p>
                        <div className="p-3 rounded-lg bg-white border border-slate-200 text-slate-600">
                          <strong>Country Note ({eligibilityResult.countryData.name}):</strong> {eligibilityResult.countryData.under15Status}
                        </div>
                      </div>
                    </div>
                  )}
                </div>

              </div>

            </div>
          )}

          {/* -------------------------------------------------------------
              TAB 4: SCREEN TIME CALCULATOR
          ------------------------------------------------------------- */}
          {activeTab === 'wellbeing' && (
            <div className="space-y-6">

              <div className="card-clean rounded-2xl p-6 sm:p-8">
                <span className="text-xs font-semibold text-purple-600 uppercase tracking-wider">Personalized Calculator</span>
                <h1 className="text-2xl font-bold text-slate-900 mt-1 mb-2">
                  Screen Time & Habit Calculator
                </h1>
                <p className="text-sm text-slate-600 max-w-3xl leading-relaxed">
                  Move the sliders to match your typical day. See how many hours you spend on screens every week and year, with friendly suggestions.
                </p>
              </div>

              {/* Sliders */}
              <div className="card-clean rounded-2xl p-6 space-y-5">
                <h3 className="text-sm font-bold text-slate-800">Your Daily Averages</h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">

                  {/* Social media */}
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                    <div className="flex justify-between items-center text-xs font-semibold mb-2">
                      <span className="text-slate-700">Social Apps Usage</span>
                      <span className="text-purple-600 font-bold">{screenSocialHours} hrs/day</span>
                    </div>
                    <input
                      type="range"
                      min="0.5"
                      max="10"
                      step="0.5"
                      value={screenSocialHours}
                      onChange={(e) => setScreenSocialHours(Number(e.target.value))}
                      className="w-full accent-purple-600"
                    />
                  </div>

                  {/* Total screen */}
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                    <div className="flex justify-between items-center text-xs font-semibold mb-2">
                      <span className="text-slate-700">Total Phone Time</span>
                      <span className="text-sky-600 font-bold">{screenTotalHours} hrs/day</span>
                    </div>
                    <input
                      type="range"
                      min="1"
                      max="14"
                      step="0.5"
                      value={screenTotalHours}
                      onChange={(e) => setScreenTotalHours(Number(e.target.value))}
                      className="w-full accent-sky-500"
                    />
                  </div>

                  {/* Sleep */}
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                    <div className="flex justify-between items-center text-xs font-semibold mb-2">
                      <span className="text-slate-700">Sleep Duration</span>
                      <span className="text-blue-600 font-bold">{screenSleepHours} hrs/night</span>
                    </div>
                    <input
                      type="range"
                      min="4"
                      max="11"
                      step="0.5"
                      value={screenSleepHours}
                      onChange={(e) => setScreenSleepHours(Number(e.target.value))}
                      className="w-full accent-blue-600"
                    />
                  </div>

                  {/* Activity */}
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                    <div className="flex justify-between items-center text-xs font-semibold mb-2">
                      <span className="text-slate-700">Physical Activity</span>
                      <span className="text-emerald-600 font-bold">{screenActivityHours} hrs/day</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="4"
                      step="0.5"
                      value={screenActivityHours}
                      onChange={(e) => setScreenActivityHours(Number(e.target.value))}
                      className="w-full accent-emerald-600"
                    />
                  </div>

                  {/* Platforms */}
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                    <div className="flex justify-between items-center text-xs font-semibold mb-2">
                      <span className="text-slate-700">Number of Social Apps</span>
                      <span className="text-pink-600 font-bold">{platformsCount} apps</span>
                    </div>
                    <input
                      type="range"
                      min="1"
                      max="6"
                      step="1"
                      value={platformsCount}
                      onChange={(e) => setPlatformsCount(Number(e.target.value))}
                      className="w-full accent-pink-500"
                    />
                  </div>

                  {/* Age */}
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                    <div className="flex justify-between items-center text-xs font-semibold mb-2">
                      <span className="text-slate-700">Your Age</span>
                      <span className="text-slate-800 font-bold">{userAgeInput} years</span>
                    </div>
                    <input
                      type="range"
                      min="10"
                      max="18"
                      step="1"
                      value={userAgeInput}
                      onChange={(e) => setUserAgeInput(Number(e.target.value))}
                      className="w-full accent-slate-600"
                    />
                  </div>

                </div>
              </div>

              {/* Annual calculations */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
                <div className="card-clean rounded-xl p-4">
                  <div className="text-xs text-slate-500">Every Week on Social Apps</div>
                  <div className="text-2xl font-bold text-purple-600 mt-1">{wellbeingStats.weeklySocial} hours</div>
                </div>

                <div className="card-clean rounded-xl p-4">
                  <div className="text-xs text-slate-500">Every Month on Social Apps</div>
                  <div className="text-2xl font-bold text-sky-600 mt-1">{wellbeingStats.monthlySocial} hours</div>
                </div>

                <div className="card-clean rounded-xl p-4">
                  <div className="text-xs text-slate-500">Total Days Every Year</div>
                  <div className="text-2xl font-bold text-pink-600 mt-1">{wellbeingStats.annualDaysLost} full days/year</div>
                </div>
              </div>

              {/* Suggestions */}
              <div className="card-clean rounded-2xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-bold text-slate-800">Friendly Improvement Suggestions</h3>
                  <span className={`px-2.5 py-0.5 rounded text-xs font-semibold border ${wellbeingStats.categoryBadge}`}>
                    {wellbeingStats.category}
                  </span>
                </div>

                <div className="space-y-2">
                  {wellbeingStats.suggestions.map((s, idx) => (
                    <div key={idx} className="p-3 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-700 flex items-start gap-2">
                      <Icon name="CheckCircle" size={14} className="text-emerald-600 shrink-0 mt-0.5" />
                      <span>{s}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* -------------------------------------------------------------
              TAB 5: HEALTH & WELLBEING
          ------------------------------------------------------------- */}
          {activeTab === 'health-impact' && (
            <div className="space-y-6">

              <div className="card-clean rounded-2xl p-6 sm:p-8">
                <span className="text-xs font-semibold text-purple-600 uppercase tracking-wider">Health Insights</span>
                <h1 className="text-2xl font-bold text-slate-900 mt-1 mb-2">
                  What Happens When Screens Take Over?
                </h1>
                <p className="text-sm text-slate-600 max-w-3xl leading-relaxed">
                  Medical advice from the WHO and pediatric experts on how phones affect sleep, posture, concentration, and mood.
                </p>
              </div>

              {/* Slider for Hours */}
              <div className="card-clean rounded-2xl p-5">
                <div className="flex justify-between items-center text-xs font-semibold text-slate-700 mb-2">
                  <span>Simulate Daily Screen Time</span>
                  <span className="text-purple-600 font-bold">{healthScreenHours} Hours / Day</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="8"
                  step="1"
                  value={healthScreenHours}
                  onChange={(e) => setHealthScreenHours(Number(e.target.value))}
                  className="w-full accent-purple-600"
                />
                <div className="p-3 mt-3 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-600">
                  {healthScreenHours <= 2 ? (
                    <span><strong>Healthy:</strong> Well within recommended youth guidelines. Sleep and mood are usually well protected.</span>
                  ) : healthScreenHours <= 4 ? (
                    <span><strong>Moderate:</strong> Keep an eye on bedtime. Using phones in bed can push back your natural sleep cycle.</span>
                  ) : (
                    <span><strong>High exposure:</strong> May lead to tired eyes, headaches, neck stiffness, and feeling constantly distracted.</span>
                  )}
                </div>
              </div>

              {/* Health Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="card-clean rounded-xl p-5">
                  <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center mb-3">
                    <Icon name="Moon" size={16} />
                  </div>
                  <h3 className="text-sm font-bold text-slate-800 mb-1">Sleep Quality</h3>
                  <p className="text-xs text-slate-600 leading-relaxed mb-3">
                    Blue screen light tells your brain it is daytime, delaying the sleep hormone melatonin and leaving you tired for school.
                  </p>
                  <div className="text-[11px] text-slate-500 bg-slate-50 p-2.5 rounded border border-slate-100">
                    <strong>Tip:</strong> Charge your phone across the room or outside your bedroom at night.
                  </div>
                </div>

                <div className="card-clean rounded-xl p-5">
                  <div className="w-8 h-8 rounded-lg bg-sky-100 text-sky-700 flex items-center justify-center mb-3">
                    <Icon name="Eye" size={16} />
                  </div>
                  <h3 className="text-sm font-bold text-slate-800 mb-1">Eye Comfort</h3>
                  <p className="text-xs text-slate-600 leading-relaxed mb-3">
                    When looking closely at small text, you blink half as often. This causes dry eyes and headaches.
                  </p>
                  <div className="text-[11px] text-slate-500 bg-slate-50 p-2.5 rounded border border-slate-100">
                    <strong>Tip:</strong> Follow the 20-20-20 rule: look 20 feet away every 20 minutes for 20 seconds.
                  </div>
                </div>

                <div className="card-clean rounded-xl p-5">
                  <div className="w-8 h-8 rounded-lg bg-pink-100 text-pink-700 flex items-center justify-center mb-3">
                    <Icon name="Heart" size={16} />
                  </div>
                  <h3 className="text-sm font-bold text-slate-800 mb-1">Mood & Comparison</h3>
                  <p className="text-xs text-slate-600 leading-relaxed mb-3">
                    Watching everyone's perfect highlight reels can make real life feel disappointing or stressful.
                  </p>
                  <div className="text-[11px] text-slate-500 bg-slate-50 p-2.5 rounded border border-slate-100">
                    <strong>Tip:</strong> Unfollow accounts that make you feel anxious or bad about yourself.
                  </div>
                </div>
              </div>

            </div>
          )}

          {/* -------------------------------------------------------------
              TAB 6: PREVENTION CHECKLIST
          ------------------------------------------------------------- */}
          {activeTab === 'prevention' && (
            <div className="space-y-6">

              <div className="card-clean rounded-2xl p-6 sm:p-8">
                <span className="text-xs font-semibold text-purple-600 uppercase tracking-wider">Action Plan</span>
                <h1 className="text-2xl font-bold text-slate-900 mt-1 mb-2">
                  Prevention Checklists
                </h1>
                <p className="text-sm text-slate-600 max-w-3xl leading-relaxed">
                  Simple, practical steps for families, students, schools, and tech platforms. Check off what you have already done.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {window.SAFE_SCROLL_DATA.preventionChecklists.map((category) => (
                  <div key={category.category} className="card-clean rounded-xl p-5 flex flex-col justify-between">
                    <div>
                      <h3 className="text-sm font-bold text-slate-800 mb-3">{category.title}</h3>
                      <div className="space-y-2.5">
                        {category.items.map((item) => {
                          const isDone = !!checkedStrategies[item.id];
                          return (
                            <div
                              key={item.id}
                              onClick={() => toggleChecklist(item.id)}
                              className={`p-2.5 rounded-lg border cursor-pointer text-xs flex items-start gap-2.5 transition-colors ${
                                isDone ? 'bg-emerald-50 border-emerald-200 text-emerald-800' : 'bg-slate-50 border-slate-200 hover:bg-white text-slate-700'
                              }`}
                            >
                              <div className={`mt-0.5 w-4 h-4 rounded border flex items-center justify-center shrink-0 ${
                                isDone ? 'bg-emerald-600 border-emerald-600 text-white' : 'border-slate-300 bg-white'
                              }`}>
                                {isDone && <Icon name="Check" size={12} />}
                              </div>
                              <span className={isDone ? 'line-through text-slate-400' : ''}>
                                {item.text}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
                      <span>{category.items.filter(i => checkedStrategies[i.id]).length} of {category.items.length} completed</span>
                      <button
                        type="button"
                        onClick={() => {
                          category.items.forEach(i => { checkedStrategies[i.id] = true; });
                          setCheckedStrategies({ ...checkedStrategies });
                          showToast('All marked completed!');
                        }}
                        className="text-purple-600 font-semibold hover:underline"
                      >
                        Mark all done
                      </button>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          )}

          {/* -------------------------------------------------------------
              TAB 7: 10-QUESTION QUIZ
          ------------------------------------------------------------- */}
          {activeTab === 'quiz' && (
            <div className="space-y-6">

              <div className="card-clean rounded-2xl p-6 sm:p-8">
                <span className="text-xs font-semibold text-purple-600 uppercase tracking-wider">Test Your Knowledge</span>
                <h1 className="text-2xl font-bold text-slate-900 mt-1 mb-2">
                  Digital Safety & EU Rules Quiz
                </h1>
                <p className="text-sm text-slate-600 max-w-3xl leading-relaxed">
                  10 clear questions to test what you have learned about the EU laws, privacy, and healthy habits.
                </p>
              </div>

              {!quizSubmitted ? (
                <div className="card-clean rounded-2xl p-6 max-w-2xl mx-auto space-y-5">
                  <div className="flex justify-between text-xs text-slate-400 font-medium">
                    <span>Question {quizIndex + 1} of {window.SAFE_SCROLL_DATA.quizQuestions.length}</span>
                    <span className="text-purple-600">{window.SAFE_SCROLL_DATA.quizQuestions[quizIndex].category}</span>
                  </div>

                  <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                    <div
                      className="bg-purple-600 h-full transition-all duration-200"
                      style={{ width: `${((quizIndex + 1) / window.SAFE_SCROLL_DATA.quizQuestions.length) * 100}%` }}
                    ></div>
                  </div>

                  <h3 className="text-base font-bold text-slate-900">
                    {window.SAFE_SCROLL_DATA.quizQuestions[quizIndex].question}
                  </h3>

                  <div className="space-y-2">
                    {window.SAFE_SCROLL_DATA.quizQuestions[quizIndex].options.map((opt, optIdx) => {
                      const isSelected = quizAnswers[quizIndex] === optIdx;
                      return (
                        <button
                          key={optIdx}
                          type="button"
                          onClick={() => setQuizAnswers({ ...quizAnswers, [quizIndex]: optIdx })}
                          className={`w-full p-3 rounded-lg border text-left text-xs font-medium transition-colors flex items-center justify-between ${
                            isSelected
                              ? 'bg-purple-50 border-purple-600 text-purple-700'
                              : 'bg-slate-50 border-slate-200 hover:bg-white text-slate-700'
                          }`}
                        >
                          <span>{opt}</span>
                          {isSelected && <Icon name="CheckCircle" size={16} className="text-purple-600" />}
                        </button>
                      );
                    })}
                  </div>

                  <div className="flex justify-between pt-4 border-t border-slate-100">
                    <button
                      type="button"
                      disabled={quizIndex === 0}
                      onClick={() => setQuizIndex(quizIndex - 1)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${
                        quizIndex === 0 ? 'text-slate-300' : 'text-slate-600 hover:bg-slate-100'
                      }`}
                    >
                      ← Back
                    </button>

                    {quizIndex < window.SAFE_SCROLL_DATA.quizQuestions.length - 1 ? (
                      <button
                        type="button"
                        disabled={quizAnswers[quizIndex] === undefined}
                        onClick={() => setQuizIndex(quizIndex + 1)}
                        className={`px-4 py-2 rounded-lg text-xs font-semibold ${
                          quizAnswers[quizIndex] === undefined
                            ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                            : 'bg-purple-600 hover:bg-purple-700 text-white'
                        }`}
                      >
                        Next →
                      </button>
                    ) : (
                      <button
                        type="button"
                        disabled={quizAnswers[quizIndex] === undefined}
                        onClick={() => {
                          setQuizSubmitted(true);
                          if (window.confetti) {
                            try { window.confetti({ particleCount: 60, spread: 60 }); } catch (e) {}
                          }
                        }}
                        className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold"
                      >
                        Submit Answers
                      </button>
                    )}
                  </div>
                </div>
              ) : (
                <div className="card-clean rounded-2xl p-6 sm:p-8 max-w-2xl mx-auto space-y-6">
                  {(() => {
                    let correct = 0;
                    window.SAFE_SCROLL_DATA.quizQuestions.forEach((q, i) => {
                      if (quizAnswers[i] === q.correctIndex) correct += 1;
                    });
                    const pct = Math.round((correct / window.SAFE_SCROLL_DATA.quizQuestions.length) * 100);

                    return (
                      <div>
                        <div className="text-center pb-5 border-b border-slate-100">
                          <div className="text-3xl font-extrabold text-purple-600 mb-1">{pct}%</div>
                          <h2 className="text-lg font-bold text-slate-800">
                            You got {correct} out of 10 correct
                          </h2>
                          <button
                            type="button"
                            onClick={handleRestartQuiz}
                            className="mt-3 px-4 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold"
                          >
                            Retake Quiz
                          </button>
                        </div>

                        <div className="space-y-3 pt-5">
                          {window.SAFE_SCROLL_DATA.quizQuestions.map((q, idx) => {
                            const isCorrect = quizAnswers[idx] === q.correctIndex;
                            return (
                              <div
                                key={q.id}
                                className={`p-3.5 rounded-xl border text-xs ${
                                  isCorrect ? 'bg-emerald-50/50 border-emerald-200' : 'bg-pink-50/50 border-pink-200'
                                }`}
                              >
                                <div className="font-bold text-slate-800 mb-1">
                                  {idx + 1}. {q.question}
                                </div>
                                <div className="text-slate-600">
                                  <strong>Correct answer:</strong> {q.options[q.correctIndex]}
                                </div>
                                <div className="text-slate-500 mt-1">
                                  <em>Why:</em> {q.explanation}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })()}
                </div>
              )}

            </div>
          )}

          {/* -------------------------------------------------------------
              TAB 8: CHARTS & FACTS
          ------------------------------------------------------------- */}
          {activeTab === 'statistics' && (
            <div className="space-y-6">

              <div className="card-clean rounded-2xl p-6 sm:p-8">
                <span className="text-xs font-semibold text-purple-600 uppercase tracking-wider">Data & Facts</span>
                <h1 className="text-2xl font-bold text-slate-900 mt-1 mb-2">
                  European Youth Usage Data
                </h1>
                <p className="text-sm text-slate-600 max-w-3xl leading-relaxed">
                  Interactive charts showing daily time allocation and digital age rules across European member states.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                {/* Daily allocation */}
                <div className="card-clean rounded-xl p-5">
                  <h3 className="text-sm font-bold text-slate-800 mb-1">Where Your 24 Hours Go</h3>
                  <p className="text-xs text-slate-500 mb-3">Based on your active inputs</p>
                  <CleanChart
                    type="doughnut"
                    className="h-56"
                    data={{
                      labels: ['Social Media', 'Other Screen Time', 'Sleep', 'Exercise', 'Other Activities'],
                      datasets: [{
                        data: [
                          screenSocialHours,
                          Math.max(0, screenTotalHours - screenSocialHours),
                          screenSleepHours,
                          screenActivityHours,
                          Math.max(0, 24 - (screenTotalHours + screenSleepHours + screenActivityHours))
                        ],
                        backgroundColor: ['#8B5CF6', '#38BDF8', '#3B82F6', '#10B981', '#E2E8F0'],
                        borderWidth: 0
                      }]
                    }}
                    options={{
                      plugins: { legend: { position: 'bottom', labels: { boxWidth: 10, font: { size: 10 } } } }
                    }}
                  />
                </div>

                {/* Country comparison */}
                <div className="card-clean rounded-xl p-5">
                  <h3 className="text-sm font-bold text-slate-800 mb-1">Digital Consent Ages Across Europe</h3>
                  <p className="text-xs text-slate-500 mb-3">Why a common standard is being discussed</p>
                  <CleanChart
                    type="bar"
                    className="h-56"
                    data={{
                      labels: ['France', 'Germany', 'Italy', 'Spain', 'Netherlands', 'Belgium', 'Ireland'],
                      datasets: [{
                        label: 'Age Required',
                        data: [15, 16, 14, 14, 16, 13, 16],
                        backgroundColor: '#8B5CF6',
                        borderRadius: 4
                      }]
                    }}
                    options={{
                      scales: {
                        y: { min: 10, max: 18, title: { display: true, text: 'Age (Years)' } }
                      }
                    }}
                  />
                </div>

              </div>

            </div>
          )}

          {/* -------------------------------------------------------------
              TAB 9: REFERENCES & SOURCES
          ------------------------------------------------------------- */}
          {activeTab === 'resources' && (
            <div className="space-y-6">

              <div className="card-clean rounded-2xl p-6 sm:p-8">
                <span className="text-xs font-semibold text-purple-600 uppercase tracking-wider">Verified Sources</span>
                <h1 className="text-2xl font-bold text-slate-900 mt-1 mb-2">
                  Official Research & References
                </h1>
                <p className="text-sm text-slate-600 max-w-3xl leading-relaxed">
                  Real publications from European institutions and international health organizations.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {window.SAFE_SCROLL_DATA.references.map((ref, idx) => (
                  <div key={idx} className="card-clean rounded-xl p-5 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between text-xs mb-1.5">
                        <span className="font-bold text-purple-600">{ref.org}</span>
                        <span className="text-[10px] px-2 py-0.5 rounded bg-slate-100 text-slate-600 font-semibold">{ref.badge}</span>
                      </div>
                      <h4 className="text-sm font-bold text-slate-900 mb-1.5">{ref.title}</h4>
                      <p className="text-xs text-slate-600 mb-3 leading-relaxed">{ref.summary}</p>
                    </div>

                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                      <span className="text-[11px] text-slate-400">{ref.date}</span>
                      <a
                        href={ref.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs font-semibold text-purple-600 hover:underline flex items-center gap-1"
                      >
                        <span>Official Link</span>
                        <Icon name="ExternalLink" size={12} />
                      </a>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          )}

          {/* -------------------------------------------------------------
              TAB 10: SETTINGS / PROFILE
          ------------------------------------------------------------- */}
          {activeTab === 'profile' && (
            <div className="space-y-6">

              <div className="card-clean rounded-2xl p-6 sm:p-8">
                <span className="text-xs font-semibold text-purple-600 uppercase tracking-wider">Account</span>
                <h1 className="text-2xl font-bold text-slate-900 mt-1 mb-2">
                  Profile & Preferences
                </h1>
                <p className="text-sm text-slate-600 max-w-3xl leading-relaxed">
                  Manage your demo session, reset simulation metrics, or sign out.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="card-clean rounded-xl p-5 text-center">
                  <div className="w-16 h-16 rounded-full bg-purple-100 text-purple-700 font-bold text-xl flex items-center justify-center mx-auto mb-3">
                    {currentUser.avatar}
                  </div>
                  <h3 className="text-sm font-bold text-slate-800">{currentUser.name}</h3>
                  <div className="text-xs text-slate-500 mb-4">{currentUser.email}</div>

                  <button
                    type="button"
                    onClick={handleLogout}
                    className="w-full py-2 rounded-lg bg-pink-50 hover:bg-pink-100 text-pink-700 text-xs font-semibold transition-colors"
                  >
                    Sign Out
                  </button>
                </div>

                <div className="md:col-span-2 card-clean rounded-xl p-5 space-y-4">
                  <h3 className="text-sm font-bold text-slate-800">Quick Actions</h3>

                  <div className="flex justify-between items-center p-3 rounded-lg bg-slate-50 border border-slate-200">
                    <div>
                      <div className="text-xs font-bold text-slate-800">Reset Checklists</div>
                      <div className="text-[11px] text-slate-500">Clear all checked items back to default</div>
                    </div>
                    <button
                      type="button"
                      onClick={() => { setCheckedStrategies({}); showToast('Checklist cleared.'); }}
                      className="px-3 py-1.5 rounded bg-white border border-slate-300 text-xs font-semibold text-slate-700 hover:bg-slate-50"
                    >
                      Reset
                    </button>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-lg bg-slate-50 border border-slate-200">
                    <div>
                      <div className="text-xs font-bold text-slate-800">Reset Screen Time Inputs</div>
                      <div className="text-[11px] text-slate-500">Restore default 4 hrs social / 6.5 hrs total</div>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setScreenSocialHours(4.0);
                        setScreenTotalHours(6.5);
                        setScreenSleepHours(7.5);
                        setScreenActivityHours(1.5);
                        showToast('Inputs restored to defaults.');
                      }}
                      className="px-3 py-1.5 rounded bg-white border border-slate-300 text-xs font-semibold text-slate-700 hover:bg-slate-50"
                    >
                      Restore
                    </button>
                  </div>
                </div>
              </div>

            </div>
          )}

        </main>

        {/* Clean Footer */}
        <footer className="mt-auto px-6 py-4 border-t border-slate-200 bg-white text-xs text-slate-400 flex flex-col sm:flex-row justify-between items-center gap-2">
          <div>Safe Scroll • Educational EU Youth Safety Guide</div>
          <div className="flex gap-3 text-slate-500">
            <button type="button" onClick={() => setActiveTab('policy')} className="hover:underline">Rules</button>
            <button type="button" onClick={() => setActiveTab('age-checker')} className="hover:underline">Age Checker</button>
            <button type="button" onClick={() => setActiveTab('resources')} className="hover:underline">Sources</button>
          </div>
        </footer>

      </div>
    </div>
  );
}

const rootElement = document.getElementById('root');
const root = ReactDOM.createRoot(rootElement);
root.render(<SafeScrollApp />);
