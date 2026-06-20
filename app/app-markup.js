export const APP_MARKUP = `

<!-- THEME TOGGLE -->
<button id="theme-toggle" aria-label="Toggle dark mode" title="Toggle dark mode">
  <i data-lucide="sun" style="width:18px;height:18px"></i>
</button>

<!-- SLACK BANNER -->
<div id="slack-banner" role="banner">
  <img src="https://cdn.simpleicons.org/slack/ffffff" width="18" height="18" alt="Slack">
  <span>Join our PM community on Slack →</span>
  <a href="#" onclick="return false;" style="margin-left:4px;">Join free</a>
  <button class="close-banner" aria-label="Dismiss banner" onclick="document.getElementById('slack-banner').remove()">×</button>
</div>

<!-- TOAST -->
<div id="toast-container" aria-live="polite"></div>

<!-- MODAL: Add Goal -->
<div class="modal-overlay" id="add-goal-modal" role="dialog" aria-modal="true" aria-label="Add skill goal">
  <div class="modal">
    <div class="modal-header">
      <span class="modal-title">Add skill goal</span>
      <button class="modal-close" id="close-modal-btn" aria-label="Close">
        <i data-lucide="x" style="width:18px;height:18px"></i>
      </button>
    </div>
    <div class="form-group">
      <label class="form-label" for="goal-area">Skill area</label>
      <select class="form-select" id="goal-area">
        <option value="discovery">Discovery</option>
        <option value="strategy">Strategy</option>
        <option value="execution">Execution</option>
        <option value="stakeholders">Stakeholders</option>
        <option value="data">Data</option>
        <option value="leadership">Leadership</option>
      </select>
    </div>
    <div class="form-group">
      <label class="form-label" for="goal-title">Goal title</label>
      <input class="form-input" id="goal-title" type="text" placeholder="e.g. Run 5 user interviews">
    </div>
    <div class="form-group">
      <label class="form-label" for="goal-desc">Description</label>
      <textarea class="form-textarea" id="goal-desc" placeholder="What does success look like?"></textarea>
    </div>
    <button class="btn-primary" id="save-goal-btn" style="width:100%">Add to Backlog</button>
  </div>
</div>

<!-- DETAIL PANEL -->
<div class="detail-panel" id="detail-panel" role="complementary" aria-label="Card details">
  <div class="detail-panel-header">
    <button class="detail-panel-close" id="close-detail-btn" aria-label="Close panel">
      <i data-lucide="x" style="width:18px;height:18px"></i>
    </button>
    <span id="detail-tag" class="card-tag" style="font-size:12px"></span>
    <span id="detail-status" class="status-badge backlog" style="margin-left:auto"></span>
  </div>
  <div class="detail-panel-body">
    <div>
      <h3 id="detail-title" style="font-size:18px;margin-bottom:8px"></h3>
      <p id="detail-desc" style="font-size:14px;color:var(--text-2);line-height:1.6"></p>
    </div>
    <div>
      <div class="form-label" style="margin-bottom:8px">Notes</div>
      <textarea class="form-textarea" id="detail-notes" placeholder="Add notes, links, reflections..." style="min-height:120px"></textarea>
    </div>
    <div>
      <div class="form-label" style="margin-bottom:10px">Resources</div>
      <div id="detail-resources" style="display:flex;flex-direction:column;gap:8px;font-size:14px;color:var(--teal)"></div>
    </div>
    <div>
      <div class="form-label" style="margin-bottom:10px">Move to</div>
      <div style="display:flex;gap:8px;flex-wrap:wrap" id="detail-move-btns"></div>
    </div>
  </div>
</div>

<!-- ═══ SCREENS ═══ -->

<!-- S1: Landing -->
<div class="screen" id="screen-landing">
  <div class="landing-left">
    <div class="logo-mark">
      <svg class="logo-svg" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Iterate logo">
        <rect x="4" y="4" width="11" height="11" rx="2" fill="var(--teal)"/>
        <rect x="17" y="4" width="11" height="11" rx="2" fill="var(--teal)" opacity="0.5"/>
        <rect x="4" y="17" width="11" height="11" rx="2" fill="var(--teal)" opacity="0.3"/>
        <rect x="17" y="17" width="11" height="11" rx="2" fill="var(--teal)" opacity="0.7"/>
      </svg>
      <span class="logo-name">Iterate</span>
    </div>
    <p class="landing-eyebrow">PM Growth Platform</p>
    <h1 class="landing-heading display">Grow as a PM.<br>Get unstuck faster.</h1>
    <p class="landing-sub">AI coaching, structured skill tracking, and a community of product managers — built for the day-to-day reality of the job.</p>
    <div class="landing-features">
      <div class="landing-feature"><span class="landing-feature-dot"></span><span>AI coach that knows your context and growth gaps</span></div>
      <div class="landing-feature"><span class="landing-feature-dot"></span><span>Visual PM Brain map of your strengths and blind spots</span></div>
      <div class="landing-feature"><span class="landing-feature-dot"></span><span>Kanban-style skill tracker with real PM frameworks</span></div>
    </div>
  </div>
  <div class="landing-right">
    <div class="auth-card">
      <h2 class="auth-card-heading" style="font-family:'Instrument Serif',serif">Get started free</h2>
      <p class="auth-card-sub">No credit card required.</p>
      <button class="auth-btn" data-provider="Google">
        <img src="https://cdn.simpleicons.org/google" alt="Google" width="20" height="20">
        Continue with Google
      </button>
      <button class="auth-btn" data-provider="LinkedIn">
        <img src="https://cdn.simpleicons.org/linkedin/0077B5" alt="LinkedIn" width="20" height="20">
        Continue with LinkedIn
      </button>
      <button class="auth-btn" data-provider="X">
        <img src="https://cdn.simpleicons.org/x/000000" alt="X" width="20" height="20">
        Continue with X
      </button>
      <div class="auth-divider">or</div>
      <button class="auth-btn" style="justify-content:center;background:var(--teal);border-color:var(--teal);color:#fff;" onclick="doAuth('Email')">
        Continue with email
      </button>
      <p class="auth-terms">By continuing, you agree to our <a href="#">Terms</a> and <a href="#">Privacy Policy</a>.</p>
    </div>
  </div>
</div>

<!-- S2: Onboarding -->
<div class="screen" id="screen-onboarding">
  <div class="onboarding-inner">
    <div class="onboarding-logo">
      <svg width="28" height="28" viewBox="0 0 32 32" fill="none"><rect x="4" y="4" width="11" height="11" rx="2" fill="var(--teal)"/><rect x="17" y="4" width="11" height="11" rx="2" fill="var(--teal)" opacity="0.5"/><rect x="4" y="17" width="11" height="11" rx="2" fill="var(--teal)" opacity="0.3"/><rect x="17" y="17" width="11" height="11" rx="2" fill="var(--teal)" opacity="0.7"/></svg>
      <span class="logo-name">Iterate</span>
    </div>
    <div class="progress-dots" id="ob-dots">
      <div class="progress-dot active"></div>
      <div class="progress-dot"></div>
      <div class="progress-dot"></div>
      <div class="progress-dot"></div>
    </div>
    <div id="ob-questions">
      <!-- Q1 -->
      <div class="question-card current" data-q="0">
        <p class="q-label">Question 1 of 4</p>
        <h2 class="q-heading">What's your biggest challenge as a PM right now?</h2>
        <textarea class="q-textarea" id="ob-q1" placeholder="e.g. Aligning stakeholders, prioritizing the roadmap, getting engineering buy-in..."></textarea>
        <button class="q-next-btn" onclick="obNext()">Next <i data-lucide="arrow-right" style="width:16px;height:16px"></i></button>
      </div>
      <!-- Q2 -->
      <div class="question-card" data-q="1">
        <p class="q-label">Question 2 of 4</p>
        <h2 class="q-heading">Which area do you most want to grow in?</h2>
        <div class="chips-group" id="ob-areas">
          <button class="chip" data-val="Discovery">Discovery</button>
          <button class="chip" data-val="Strategy">Strategy</button>
          <button class="chip" data-val="Execution">Execution</button>
          <button class="chip" data-val="Stakeholders">Stakeholders</button>
          <button class="chip" data-val="Data">Data</button>
          <button class="chip" data-val="Leadership">Leadership</button>
        </div>
        <button class="q-next-btn" onclick="obNext()">Next <i data-lucide="arrow-right" style="width:16px;height:16px"></i></button>
      </div>
      <!-- Q3 -->
      <div class="question-card" data-q="2">
        <p class="q-label">Question 3 of 4</p>
        <h2 class="q-heading">How experienced are you?</h2>
        <div class="chips-group" id="ob-exp">
          <button class="chip" data-val="0-2 yrs">0–2 yrs</button>
          <button class="chip" data-val="2-5 yrs">2–5 yrs</button>
          <button class="chip" data-val="5-10 yrs">5–10 yrs</button>
          <button class="chip" data-val="10+ yrs">10+ yrs</button>
        </div>
        <button class="q-next-btn" onclick="obNext()">Next <i data-lucide="arrow-right" style="width:16px;height:16px"></i></button>
      </div>
      <!-- Q4 -->
      <div class="question-card" data-q="3">
        <p class="q-label">Question 4 of 4</p>
        <h2 class="q-heading">What does your typical week look like?</h2>
        <textarea class="q-textarea" id="ob-q4" placeholder="e.g. Lots of syncs, deep work for discovery, writing specs, talking to customers..."></textarea>
        <button class="q-next-btn" onclick="obNext()">Finish <i data-lucide="check" style="width:16px;height:16px"></i></button>
      </div>
      <!-- Building -->
      <div class="question-card brain-building" id="brain-building-screen" style="display:none">
        <div class="building-heading display">Building your PM Brain...</div>
        <div class="building-dots">
          <div class="building-dot"></div>
          <div class="building-dot"></div>
          <div class="building-dot"></div>
        </div>
        <p style="font-size:14px;color:var(--text-3)">Analyzing your answers to map your skills</p>
      </div>
    </div>
  </div>
</div>

<!-- S3: Org -->
<div class="screen" id="screen-org">
  <div class="org-inner">
    <div style="margin-bottom:8px;display:flex;align-items:center;gap:10px">
      <svg width="24" height="24" viewBox="0 0 32 32" fill="none"><rect x="4" y="4" width="11" height="11" rx="2" fill="var(--teal)"/><rect x="17" y="4" width="11" height="11" rx="2" fill="var(--teal)" opacity="0.5"/><rect x="4" y="17" width="11" height="11" rx="2" fill="var(--teal)" opacity="0.3"/><rect x="17" y="17" width="11" height="11" rx="2" fill="var(--teal)" opacity="0.7"/></svg>
      <span class="logo-name">Iterate</span>
    </div>
    <h2 class="org-heading display">Set up your workspace</h2>
    <p class="org-sub">Work solo or with your PM team.</p>
    <div class="org-cards">
      <!-- Create -->
      <div class="org-card primary">
        <div class="org-card-icon">✦</div>
        <div class="org-card-title">Create your organization</div>
        <div class="org-card-sub">Start fresh and invite your team. You'll be the admin.</div>
        <button class="org-btn" id="create-org-btn">Create org →</button>
        <div class="org-form" id="create-form">
          <input class="org-input" type="text" id="org-name-input" placeholder="Organization name">
          <input class="org-input" type="email" id="org-domain-input" placeholder="Work email domain (e.g. acme.com)">
          <button class="org-btn" onclick="goTo('org-onboarding')">Continue →</button>
        </div>
      </div>
      <!-- Join -->
      <div class="org-card">
        <div class="org-card-icon" style="color:var(--teal)">◈</div>
        <div class="org-card-title">Join existing org</div>
        <div class="org-card-sub">Your company may already be here. We'll detect it from your email.</div>
        <button class="org-btn" id="join-org-btn">Find my org →</button>
        <div class="org-mock-card" id="join-mock">
          <div class="org-mock-name">Acme Corp</div>
          <div class="org-mock-meta">12 PMs · Enterprise · San Francisco</div>
          <button class="org-btn" style="margin-top:12px;background:var(--teal);color:#fff;padding:8px 16px;font-size:13px" onclick="goTo('org-onboarding')">Request to Join</button>
        </div>
      </div>
    </div>
    <div style="margin-top:24px">
      <button class="btn-ghost" onclick="goTo('org-onboarding')">Skip for now →</button>
    </div>
  </div>
</div>

<!-- S4: Org Onboarding -->
<div class="screen" id="screen-org-onboarding">
  <div class="oo-inner">
    <div style="margin-bottom:32px;display:flex;align-items:center;gap:10px">
      <svg width="24" height="24" viewBox="0 0 32 32" fill="none"><rect x="4" y="4" width="11" height="11" rx="2" fill="var(--teal)"/><rect x="17" y="4" width="11" height="11" rx="2" fill="var(--teal)" opacity="0.5"/><rect x="4" y="17" width="11" height="11" rx="2" fill="var(--teal)" opacity="0.3"/><rect x="17" y="17" width="11" height="11" rx="2" fill="var(--teal)" opacity="0.7"/></svg>
      <span class="logo-name">Iterate</span>
    </div>
    <div class="stepper" id="oo-stepper">
      <div class="stepper-step active" data-step="0">
        <div class="stepper-num">1</div>
        <span>Company</span>
      </div>
      <div class="stepper-line"></div>
      <div class="stepper-step" data-step="1">
        <div class="stepper-num">2</div>
        <span>Team</span>
      </div>
      <div class="stepper-line"></div>
      <div class="stepper-step" data-step="2">
        <div class="stepper-num">3</div>
        <span>Goals</span>
      </div>
    </div>
    <!-- Step 1 -->
    <div class="oo-step active" data-step="0">
      <h3>Tell us about your company</h3>
      <div class="form-group">
        <label class="form-label" for="co-name">Company name</label>
        <input class="form-input" id="co-name" type="text" value="Acme Corp" placeholder="Your company">
      </div>
      <div class="form-group">
        <label class="form-label" for="co-industry">Industry</label>
        <select class="form-select" id="co-industry">
          <option>Tech</option><option>Finance</option><option>Health</option><option>E-commerce</option><option>Other</option>
        </select>
      </div>
      <div class="form-group">
        <label class="form-label" for="co-size">Company size</label>
        <select class="form-select" id="co-size">
          <option>1–10</option><option>11–50</option><option>51–200</option><option selected>201–1000</option><option>1000+</option>
        </select>
      </div>
      <div class="form-group">
        <label class="form-label">Product stage</label>
        <div class="chips-group" id="oo-stage">
          <button class="chip" data-val="0→1">0→1</button>
          <button class="chip selected" data-val="Scaling">Scaling</button>
          <button class="chip" data-val="Mature">Mature</button>
          <button class="chip" data-val="Enterprise">Enterprise</button>
        </div>
      </div>
      <div class="oo-actions">
        <button class="btn-primary" onclick="ooNext()">Next →</button>
      </div>
    </div>
    <!-- Step 2 -->
    <div class="oo-step" data-step="1">
      <h3>Your PM team</h3>
      <div class="form-group">
        <label class="form-label" for="pm-size">PM team size</label>
        <input class="form-input" id="pm-size" type="number" value="5" min="1">
      </div>
      <div class="form-group">
        <label class="form-label">Methodologies used</label>
        <div class="chips-group" id="oo-methods">
          <button class="chip selected" data-val="OKRs">OKRs</button>
          <button class="chip" data-val="Shape Up">Shape Up</button>
          <button class="chip selected" data-val="Scrum">Scrum</button>
          <button class="chip" data-val="Kanban">Kanban</button>
          <button class="chip" data-val="Custom">Custom</button>
        </div>
      </div>
      <div class="oo-actions">
        <button class="btn-ghost" onclick="ooPrev()">← Back</button>
        <button class="btn-primary" onclick="ooNext()">Next →</button>
      </div>
    </div>
    <!-- Step 3 -->
    <div class="oo-step" data-step="2">
      <h3>Team goals</h3>
      <div class="form-group">
        <label class="form-label" for="pm-success">What does PM success look like at your company?</label>
        <textarea class="form-textarea" id="pm-success" placeholder="e.g. Shipping features on time, hitting retention KPIs, driving revenue growth..."></textarea>
      </div>
      <div class="form-group">
        <label class="form-label" for="pm-bottleneck">What's your team's biggest bottleneck?</label>
        <textarea class="form-textarea" id="pm-bottleneck" placeholder="e.g. Cross-team alignment, discovery bandwidth, unclear strategy..."></textarea>
      </div>
      <div class="oo-actions">
        <button class="btn-ghost" onclick="ooPrev()">← Back</button>
        <button class="btn-primary" onclick="ooFinish()">Complete setup →</button>
      </div>
    </div>
  </div>
</div>

<!-- S5: Map -->
<div class="screen" id="screen-map">
  <div class="map-top-left">
    <svg width="24" height="24" viewBox="0 0 32 32" fill="none"><rect x="4" y="4" width="11" height="11" rx="2" fill="var(--teal)"/><rect x="17" y="4" width="11" height="11" rx="2" fill="var(--teal)" opacity="0.5"/><rect x="4" y="17" width="11" height="11" rx="2" fill="var(--teal)" opacity="0.3"/><rect x="17" y="17" width="11" height="11" rx="2" fill="var(--teal)" opacity="0.7"/></svg>
    <span class="logo-name">PM Brain Map</span>
  </div>
  <button class="map-overlay-btn" onclick="goTo('dashboard')">
    Open Dashboard <i data-lucide="arrow-right" style="width:16px;height:16px"></i>
  </button>
  <div class="map-legend">
    <div class="legend-item"><div class="legend-dot" style="background:var(--teal)"></div>Strong</div>
    <div class="legend-item"><div class="legend-dot" style="background:var(--amber)"></div>Developing</div>
    <div class="legend-item"><div class="legend-dot" style="background:var(--text-3)"></div>Unexplored</div>
  </div>
  <canvas id="map-canvas"></canvas>
</div>

<!-- S6: Dashboard -->
<div class="screen" id="screen-dashboard">
  <div class="app-shell">
    <!-- Sidebar -->
    <nav class="sidebar" aria-label="Main navigation">
      <div class="sidebar-logo">
        <svg width="24" height="24" viewBox="0 0 32 32" fill="none"><rect x="4" y="4" width="11" height="11" rx="2" fill="var(--teal)"/><rect x="17" y="4" width="11" height="11" rx="2" fill="var(--teal)" opacity="0.5"/><rect x="4" y="17" width="11" height="11" rx="2" fill="var(--teal)" opacity="0.3"/><rect x="17" y="17" width="11" height="11" rx="2" fill="var(--teal)" opacity="0.7"/></svg>
        <span class="sidebar-logo-name">Iterate</span>
      </div>
      <div class="sidebar-nav">
        <button class="sidebar-nav-item active" onclick="goTo('dashboard')">
          <i data-lucide="layout-dashboard" style="width:18px;height:18px;flex-shrink:0"></i>
          <span>Dashboard</span>
        </button>
        <button class="sidebar-nav-item" onclick="goTo('map')">
          <i data-lucide="brain" style="width:18px;height:18px;flex-shrink:0"></i>
          <span>PM Brain</span>
        </button>
        <button class="sidebar-nav-item" onclick="goTo('track')">
          <i data-lucide="kanban" style="width:18px;height:18px;flex-shrink:0"></i>
          <span>Track</span>
        </button>
        <button class="sidebar-nav-item" onclick="showToast('Community is coming soon!')">
          <i data-lucide="users" style="width:18px;height:18px;flex-shrink:0"></i>
          <span>Community</span>
        </button>
        <button class="sidebar-nav-item" onclick="showToast('Settings coming soon!')">
          <i data-lucide="settings" style="width:18px;height:18px;flex-shrink:0"></i>
          <span>Settings</span>
        </button>
      </div>
      <div class="sidebar-bottom">
        <div class="user-row">
          <div class="avatar" id="dash-avatar">AC</div>
          <div>
            <div class="user-name" id="dash-name">Alex Chen</div>
            <div class="user-role">Product Manager</div>
          </div>
        </div>
      </div>
    </nav>
    <!-- Main -->
    <div class="main-content">
      <div class="content-header">
        <div>
          <h1 class="display" style="font-size:clamp(1.5rem,3vw,2rem);font-weight:400" id="dash-greeting">Good morning, Alex.</h1>
          <p style="color:var(--text-3);font-size:14px;margin-top:4px">Here's what your AI coach noticed.</p>
        </div>
      </div>
      <div class="content-body">
        <!-- KPIs -->
        <div class="kpi-grid">
          <div class="kpi-card">
            <div class="kpi-trend"><i data-lucide="trending-up" style="width:12px;height:12px"></i> +2</div>
            <div class="kpi-num">3</div>
            <div class="kpi-label">Skills in progress</div>
          </div>
          <div class="kpi-card">
            <div class="kpi-trend"><i data-lucide="trending-up" style="width:12px;height:12px"></i> +5</div>
            <div class="kpi-num">7</div>
            <div class="kpi-label">Challenges resolved</div>
          </div>
          <div class="kpi-card">
            <div class="kpi-trend" style="color:var(--amber)"><i data-lucide="flame" style="width:12px;height:12px"></i></div>
            <div class="kpi-num">5</div>
            <div class="kpi-label">Streak (days)</div>
          </div>
        </div>
        <!-- Focus card -->
        <div class="focus-card">
          <div class="focus-card-label">
            <i data-lucide="sparkles" style="width:13px;height:13px"></i>
            This week's focus
          </div>
          <div class="focus-card-title" id="focus-title">Sharpen your discovery muscle</div>
          <div class="focus-card-body" id="focus-body">Based on your answers, you're strongest in execution but want to grow in discovery. This week: schedule 2 user interviews, map a JTBD for your current feature, and review your north star metric.</div>
        </div>
        <!-- Activity -->
        <div class="section-heading">Recent activity</div>
        <div class="activity-feed" id="activity-feed"></div>
        <!-- Frameworks -->
        <div class="section-heading" style="margin-top:28px">PM Frameworks</div>
        <div class="frameworks-scroll" id="frameworks-list"></div>
      </div>
    </div>
    <!-- Right panel: AI Coach -->
    <div class="right-panel">
      <div class="right-panel-header">
        <i data-lucide="bot" style="width:16px;height:16px;color:var(--teal)"></i>
        Ask your AI Coach
      </div>
      <div class="chat-messages" id="chat-messages"></div>
      <div class="chat-input-row">
        <input class="chat-input" id="chat-input" type="text" placeholder="Ask anything PM..." aria-label="Chat input">
        <button class="chat-send" id="chat-send-btn" aria-label="Send message">
          <i data-lucide="send" style="width:15px;height:15px"></i>
        </button>
      </div>
    </div>
  </div>
</div>

<!-- S7: Track -->
<div class="screen" id="screen-track">
  <div class="app-shell">
    <!-- Sidebar (same as dashboard) -->
    <nav class="sidebar" aria-label="Main navigation">
      <div class="sidebar-logo">
        <svg width="24" height="24" viewBox="0 0 32 32" fill="none"><rect x="4" y="4" width="11" height="11" rx="2" fill="var(--teal)"/><rect x="17" y="4" width="11" height="11" rx="2" fill="var(--teal)" opacity="0.5"/><rect x="4" y="17" width="11" height="11" rx="2" fill="var(--teal)" opacity="0.3"/><rect x="17" y="17" width="11" height="11" rx="2" fill="var(--teal)" opacity="0.7"/></svg>
        <span class="sidebar-logo-name">Iterate</span>
      </div>
      <div class="sidebar-nav">
        <button class="sidebar-nav-item" onclick="goTo('dashboard')">
          <i data-lucide="layout-dashboard" style="width:18px;height:18px;flex-shrink:0"></i>
          <span>Dashboard</span>
        </button>
        <button class="sidebar-nav-item" onclick="goTo('map')">
          <i data-lucide="brain" style="width:18px;height:18px;flex-shrink:0"></i>
          <span>PM Brain</span>
        </button>
        <button class="sidebar-nav-item active" onclick="goTo('track')">
          <i data-lucide="kanban" style="width:18px;height:18px;flex-shrink:0"></i>
          <span>Track</span>
        </button>
        <button class="sidebar-nav-item" onclick="showToast('Community is coming soon!')">
          <i data-lucide="users" style="width:18px;height:18px;flex-shrink:0"></i>
          <span>Community</span>
        </button>
        <button class="sidebar-nav-item" onclick="showToast('Settings coming soon!')">
          <i data-lucide="settings" style="width:18px;height:18px;flex-shrink:0"></i>
          <span>Settings</span>
        </button>
      </div>
      <div class="sidebar-bottom">
        <div class="user-row">
          <div class="avatar">AC</div>
          <div>
            <div class="user-name">Alex Chen</div>
            <div class="user-role">Product Manager</div>
          </div>
        </div>
      </div>
    </nav>
    <!-- Track content -->
    <div class="main-content" style="overflow:hidden">
      <div class="track-header">
        <h2>Growth Tracker</h2>
        <button class="btn-primary" id="open-add-goal-btn" style="font-size:13px;padding:9px 18px">
          <i data-lucide="plus" style="width:15px;height:15px"></i>
          Add skill goal
        </button>
      </div>
      <div class="kanban-board" id="kanban-board"></div>
    </div>
  </div>
</div>

`;
