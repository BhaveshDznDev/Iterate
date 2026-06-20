// ═══════════════════════════════════════
// STATE
// ═══════════════════════════════════════
let currentUser = null;
let userProfile = { challenge: '', growthArea: [], experience: '', week: '' };
let orgData = {};
let kanbanCards = [];
let obStep = 0;
let ooStep = 0;
let dragCard = null;
let openCardId = null;

const SCREENS = ['landing','onboarding','org','org-onboarding','map','dashboard','track'];

// ═══════════════════════════════════════
// ROUTER
// ═══════════════════════════════════════
function goTo(screen) {
  const all = document.querySelectorAll('.screen');
  all.forEach(s => {
    s.classList.remove('active','visible');
    s.style.display = '';
  });
  const el = document.getElementById('screen-' + screen);
  if (!el) return;
  el.classList.add('active');
  requestAnimationFrame(() => {
    requestAnimationFrame(() => el.classList.add('visible'));
  });
  history.pushState({screen}, '', '#' + screen);
  onScreenEnter(screen);
}

function onScreenEnter(screen) {
  lucide.createIcons();
  if (screen === 'dashboard') renderDashboard();
  if (screen === 'map') initMap();
  if (screen === 'track') renderKanban();
}

window.addEventListener('popstate', (e) => {
  const hash = location.hash.replace('#','') || 'landing';
  goTo(hash);
});

// ═══════════════════════════════════════
// INIT
// ═══════════════════════════════════════
(function initApp() {
  lucide.createIcons();
  initTheme();
  initKanbanData();
  initChat();
  initFrameworks();
  initActivityFeed();

  const hash = location.hash.replace('#','') || 'landing';
  goTo(hash);

  // Auth buttons
  document.querySelectorAll('.auth-btn[data-provider]').forEach(btn => {
    btn.addEventListener('click', () => doAuth(btn.dataset.provider));
  });

  // Chip toggles
  setupChips('#ob-areas', true);
  setupChips('#ob-exp', false);
  setupChips('#oo-stage', false);
  setupChips('#oo-methods', true);

  // Org flow
  document.getElementById('create-org-btn').addEventListener('click', () => {
    document.getElementById('create-form').classList.add('visible');
    document.getElementById('create-org-btn').style.display = 'none';
  });
  document.getElementById('join-org-btn').addEventListener('click', () => {
    const btn = document.getElementById('join-org-btn');
    btn.textContent = 'Searching...';
    setTimeout(() => {
      btn.style.display = 'none';
      document.getElementById('join-mock').classList.add('visible');
    }, 1200);
  });

  // Track modal
  document.getElementById('open-add-goal-btn').addEventListener('click', openAddGoalModal);
  document.getElementById('close-modal-btn').addEventListener('click', closeAddGoalModal);
  document.getElementById('save-goal-btn').addEventListener('click', saveGoal);
  document.getElementById('add-goal-modal').addEventListener('click', (e) => {
    if (e.target === e.currentTarget) closeAddGoalModal();
  });

  // Detail panel
  document.getElementById('close-detail-btn').addEventListener('click', closeDetailPanel);

  // Chat
  document.getElementById('chat-send-btn').addEventListener('click', sendChat);
  document.getElementById('chat-input').addEventListener('keydown', (e) => {
    if (e.key === 'Enter') sendChat();
  });

  // Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeAddGoalModal();
      closeDetailPanel();
    }
  });
})();

// ═══════════════════════════════════════
// THEME
// ═══════════════════════════════════════
function initTheme() {
  const saved = localStorage.getItem('iterate-theme') || 'light';
  setTheme(saved);
  document.getElementById('theme-toggle').addEventListener('click', () => {
    const next = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
  });
}
function setTheme(t) {
  document.documentElement.dataset.theme = t;
  localStorage.setItem('iterate-theme', t);
  const icon = document.querySelector('#theme-toggle [data-lucide]');
  if (icon) {
    icon.setAttribute('data-lucide', t === 'dark' ? 'sun' : 'moon');
    lucide.createIcons();
  }
}

// ═══════════════════════════════════════
// TOAST
// ═══════════════════════════════════════
function showToast(msg) {
  const c = document.getElementById('toast-container');
  const t = document.createElement('div');
  t.className = 'toast';
  t.textContent = msg;
  c.appendChild(t);
  setTimeout(() => t.remove(), 3200);
}

// ═══════════════════════════════════════
// AUTH
// ═══════════════════════════════════════
function doAuth(provider) {
  currentUser = { name: 'Alex Chen', email: 'alex@example.com', avatar: 'AC', provider };
  document.getElementById('slack-banner').classList.add('show');
  goTo('onboarding');
}

// ═══════════════════════════════════════
// ONBOARDING
// ═══════════════════════════════════════
function setupChips(selector, multi) {
  document.querySelectorAll(selector + ' .chip').forEach(chip => {
    chip.addEventListener('click', () => {
      if (!multi) {
        document.querySelectorAll(selector + ' .chip').forEach(c => c.classList.remove('selected'));
      }
      chip.classList.toggle('selected');
    });
  });
}

function obNext() {
  const cards = document.querySelectorAll('#ob-questions .question-card');
  // save
  if (obStep === 0) userProfile.challenge = document.getElementById('ob-q1').value;
  if (obStep === 1) userProfile.growthArea = [...document.querySelectorAll('#ob-areas .chip.selected')].map(c => c.dataset.val);
  if (obStep === 2) userProfile.experience = document.querySelector('#ob-exp .chip.selected')?.dataset.val || '2-5 yrs';
  if (obStep === 3) {
    userProfile.week = document.getElementById('ob-q4').value;
    // Show building screen
    cards[obStep].classList.remove('current');
    cards[obStep].classList.add('leaving');
    const building = document.getElementById('brain-building-screen');
    building.style.display = 'flex';
    building.classList.add('current');
    setTimeout(() => { building.classList.remove('current'); goTo('org'); }, 2200);
    return;
  }
  // Transition
  const current = cards[obStep];
  const next = cards[obStep + 1];
  current.classList.add('leaving');
  setTimeout(() => {
    current.classList.remove('current','leaving');
    next.classList.add('current');
  }, 350);
  obStep++;
  // Update dots
  document.querySelectorAll('.progress-dot').forEach((d, i) => {
    d.classList.toggle('active', i === obStep);
    d.classList.toggle('done', i < obStep);
  });
}

// ═══════════════════════════════════════
// ORG ONBOARDING
// ═══════════════════════════════════════
function ooNext() {
  const steps = document.querySelectorAll('.oo-step');
  const stepperItems = document.querySelectorAll('.stepper-step');
  steps[ooStep].classList.remove('active');
  stepperItems[ooStep].classList.remove('active');
  stepperItems[ooStep].classList.add('done');
  ooStep++;
  steps[ooStep].classList.add('active');
  stepperItems[ooStep].classList.add('active');
}
function ooPrev() {
  const steps = document.querySelectorAll('.oo-step');
  const stepperItems = document.querySelectorAll('.stepper-step');
  steps[ooStep].classList.remove('active');
  stepperItems[ooStep].classList.remove('active','done');
  ooStep--;
  steps[ooStep].classList.add('active');
  stepperItems[ooStep].classList.add('active');
  stepperItems[ooStep].classList.remove('done');
}
function ooFinish() { goTo('map'); }

// ═══════════════════════════════════════
// MAP (Canvas)
// ═══════════════════════════════════════
let mapNodes = [];
let mapDragging = null;
let mapOffset = {x:0,y:0};
let mapExpanded = null;
let mapSubNodes = [];
let mapAnimFrame = null;
let mapTick = 0;

const SKILL_AREAS = ['Discovery','Strategy','Execution','Stakeholders','Data','Leadership','Communication','Analytics'];
const SUB_SKILLS = {
  Discovery: ['User Interviews','JTBD','Problem Framing','Assumption Mapping'],
  Strategy: ['Vision Setting','Opportunity Sizing','Competitive Analysis','Roadmapping'],
  Execution: ['Sprint Planning','PRD Writing','Metrics Definition','Launch Planning'],
  Stakeholders: ['Stakeholder Mapping','Influence Matrix','Executive Comms','Alignment'],
  Data: ['SQL Basics','A/B Testing','Funnel Analysis','Dashboards'],
  Leadership: ['1:1s','Team Rituals','Hiring','Career Ladders'],
  Communication: ['Written Comms','Storytelling','Slide Decks','FAQs'],
  Analytics: ['North Star','OKR Tracking','KPI Trees','Retention Analysis']
};
const MASTERY = ['strong','developing','unexplored'];

function initMap() {
  const canvas = document.getElementById('map-canvas');
  const ctx = canvas.getContext('2d');
  resizeCanvas();
  buildMapNodes();
  if (mapAnimFrame) cancelAnimationFrame(mapAnimFrame);
  animateMap();

  canvas.addEventListener('mousedown', onMapMouseDown);
  canvas.addEventListener('mousemove', onMapMouseMove);
  canvas.addEventListener('mouseup', onMapMouseUp);
  canvas.addEventListener('click', onMapClick);
  canvas.addEventListener('touchstart', onMapTouchStart, {passive:true});
  canvas.addEventListener('touchmove', onMapTouchMove, {passive:true});
  canvas.addEventListener('touchend', onMapTouchEnd, {passive:true});
  window.addEventListener('resize', () => { resizeCanvas(); buildMapNodes(); });
}

function resizeCanvas() {
  const canvas = document.getElementById('map-canvas');
  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;
}

function buildMapNodes() {
  const canvas = document.getElementById('map-canvas');
  const cx = canvas.width / 2;
  const cy = canvas.height / 2;
  const areas = userProfile.growthArea.length ? [...new Set([...userProfile.growthArea, ...SKILL_AREAS.slice(0,6)])] : SKILL_AREAS;
  const nodeAreas = areas.slice(0,7);
  const r = Math.min(canvas.width, canvas.height) * 0.3;

  mapNodes = [
    { id: 'center', label: 'PM Brain', sublabel: currentUser?.name || 'Alex', x: cx, y: cy, radius: 52, mastery: 'center' }
  ];

  nodeAreas.forEach((area, i) => {
    const angle = (i / nodeAreas.length) * Math.PI * 2 - Math.PI/2;
    const mx = MASTERY[i % 3];
    mapNodes.push({
      id: area.toLowerCase(),
      label: area,
      x: cx + Math.cos(angle) * r,
      y: cy + Math.sin(angle) * r,
      radius: 40,
      mastery: mx,
      angle
    });
  });
  mapSubNodes = [];
  mapExpanded = null;
}

function nodeColor(mastery, isDark) {
  const d = isDark || document.documentElement.dataset.theme === 'dark';
  if (mastery === 'center') return d ? '#f5f5f7' : '#1d1d1f';
  if (mastery === 'strong') return d ? '#f5f5f7' : '#1d1d1f';
  if (mastery === 'developing') return d ? '#a1a1a6' : '#6e6e73';
  return d ? '#48484a' : '#c7c7cc';
}

function animateMap() {
  const canvas = document.getElementById('map-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  mapTick++;
  drawMap(ctx, canvas);
  mapAnimFrame = requestAnimationFrame(animateMap);
}

function drawMap(ctx, canvas) {
  const dark = document.documentElement.dataset.theme === 'dark';
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Background
  ctx.fillStyle = dark ? '#000000' : '#f5f5f7';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Draw connections center → nodes
  mapNodes.forEach(node => {
    if (node.id === 'center') return;
    const center = mapNodes[0];
    drawAnimatedLine(ctx, center.x, center.y, node.x, node.y, dark);
  });

  // Sub-node connections
  mapSubNodes.forEach(sub => {
    const parent = mapNodes.find(n => n.id === sub.parentId);
    if (parent) drawAnimatedLine(ctx, parent.x, parent.y, sub.x, sub.y, dark, true);
  });

  // Draw sub-nodes
  mapSubNodes.forEach(sub => drawNode(ctx, sub, dark, true));

  // Draw main nodes
  mapNodes.forEach(node => drawNode(ctx, node, dark, false));
}

function drawAnimatedLine(ctx, x1, y1, x2, y2, dark, thin=false) {
  ctx.save();
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.setLineDash([6, 8]);
  ctx.lineDashOffset = -(mapTick * 0.4);
  ctx.strokeStyle = dark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)';
  ctx.lineWidth = thin ? 1 : 1.5;
  ctx.stroke();
  ctx.restore();
}

function drawNode(ctx, node, dark, small) {
  const color = nodeColor(node.mastery, dark);
  const textColor = dark ? '#f5f5f7' : '#1d1d1f';
  const bgColor = dark ? '#1d1d1f' : '#ffffff';

  ctx.save();
  // Shadow
  ctx.shadowColor = 'rgba(0,0,0,0.15)';
  ctx.shadowBlur = 16;
  ctx.shadowOffsetY = 4;

  // Circle
  ctx.beginPath();
  ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
  ctx.fillStyle = bgColor;
  ctx.fill();
  ctx.strokeStyle = color;
  ctx.lineWidth = node.id === 'center' ? 3 : 2;
  ctx.stroke();
  ctx.shadowBlur = 0;

  // Color ring accent
  if (node.id !== 'center') {
    ctx.beginPath();
    ctx.arc(node.x, node.y, node.radius - 5, -Math.PI/2, -Math.PI/2 + Math.PI * 1.2);
    ctx.strokeStyle = color;
    ctx.lineWidth = 3;
    ctx.stroke();
  } else {
    ctx.beginPath();
    ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
    ctx.strokeStyle = color;
    ctx.lineWidth = 3;
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(node.x, node.y, node.radius - 7, 0, Math.PI * 2);
    ctx.fillStyle = color;
    ctx.fill();
  }

  // Label
  const onCenter = dark ? '#1d1d1f' : '#ffffff';
  ctx.fillStyle = node.id === 'center' ? onCenter : textColor;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  const fontStack = '-apple-system, BlinkMacSystemFont, system-ui';
  if (node.id === 'center') {
    ctx.font = `600 11px ${fontStack}`;
    ctx.fillText(node.label, node.x, node.y - 7);
    ctx.font = `10px ${fontStack}`;
    ctx.fillStyle = dark ? 'rgba(29,29,31,0.7)' : 'rgba(255,255,255,0.8)';
    ctx.fillText(node.sublabel, node.x, node.y + 7);
  } else {
    ctx.font = `${small ? '10' : '11'}px ${fontStack}`;
    ctx.fillStyle = textColor;
    ctx.fillText(node.label, node.x, node.y);
  }
  ctx.restore();
}

function onMapMouseDown(e) {
  const {x,y} = canvasPos(e);
  const hit = hitNode(x,y);
  if (hit && hit.id !== 'center') {
    mapDragging = hit;
    mapOffset = {x: hit.x - x, y: hit.y - y};
    e.preventDefault();
  }
}
function onMapMouseMove(e) {
  if (!mapDragging) return;
  const {x,y} = canvasPos(e);
  mapDragging.x = x + mapOffset.x;
  mapDragging.y = y + mapOffset.y;
}
function onMapMouseUp() { mapDragging = null; }

function onMapClick(e) {
  const {x,y} = canvasPos(e);
  const hit = hitNode(x,y, [...mapNodes, ...mapSubNodes]);
  if (!hit || hit.id === 'center') return;
  if (hit.isSubNode) return;

  if (mapExpanded === hit.id) {
    mapExpanded = null;
    mapSubNodes = [];
    return;
  }
  mapExpanded = hit.id;
  const subs = SUB_SKILLS[hit.label] || [];
  mapSubNodes = subs.map((s, i) => {
    const angle = hit.angle + (i - (subs.length-1)/2) * 0.4;
    const d = hit.radius + 80;
    return {
      id: hit.id + '-' + i,
      label: s,
      x: hit.x + Math.cos(angle) * d,
      y: hit.y + Math.sin(angle) * d,
      radius: 28,
      mastery: MASTERY[i % 3],
      parentId: hit.id,
      isSubNode: true,
      angle
    };
  });
}

let mapTouchStartX = 0, mapTouchStartY = 0;
function onMapTouchStart(e) {
  const t = e.touches[0];
  mapTouchStartX = t.clientX; mapTouchStartY = t.clientY;
  const {x,y} = canvasPosTouches(t);
  const hit = hitNode(x,y);
  if (hit && hit.id !== 'center') {
    mapDragging = hit;
    mapOffset = {x: hit.x - x, y: hit.y - y};
  }
}
function onMapTouchMove(e) {
  if (!mapDragging) return;
  const {x,y} = canvasPosTouches(e.touches[0]);
  mapDragging.x = x + mapOffset.x;
  mapDragging.y = y + mapOffset.y;
}
function onMapTouchEnd(e) {
  if (!mapDragging) {
    const t = e.changedTouches[0];
    const dx = Math.abs(t.clientX - mapTouchStartX);
    const dy = Math.abs(t.clientY - mapTouchStartY);
    if (dx < 5 && dy < 5) {
      const {x,y} = canvasPosTouches(t);
      onMapClick({clientX: t.clientX, clientY: t.clientY, _xy:{x,y}});
    }
  }
  mapDragging = null;
}

function canvasPos(e) {
  const r = document.getElementById('map-canvas').getBoundingClientRect();
  return {x: e.clientX - r.left, y: e.clientY - r.top};
}
function canvasPosTouches(t) {
  const r = document.getElementById('map-canvas').getBoundingClientRect();
  return {x: t.clientX - r.left, y: t.clientY - r.top};
}
function hitNode(x, y, nodes) {
  const ns = nodes || mapNodes;
  return ns.find(n => Math.hypot(n.x - x, n.y - y) < n.radius + 6) || null;
}

// ═══════════════════════════════════════
// DASHBOARD
// ═══════════════════════════════════════
function renderDashboard() {
  const hour = new Date().getHours();
  const greet = hour < 12 ? 'morning' : hour < 17 ? 'afternoon' : 'evening';
  const name = currentUser?.name?.split(' ')[0] || 'Alex';
  const el = document.getElementById('dash-greeting');
  if (el) el.textContent = `Good ${greet}, ${name}.`;
  const av = document.getElementById('dash-avatar');
  if (av) av.textContent = currentUser?.avatar || 'AC';
  const dn = document.getElementById('dash-name');
  if (dn) dn.textContent = currentUser?.name || 'Alex Chen';

  // Focus card
  const area = userProfile.growthArea[0] || 'Discovery';
  const focusMap = {
    Discovery: ['Sharpen your discovery muscle', 'Schedule 2 user interviews this week, map a JTBD for your current feature, and synthesize findings into clear opportunity statements.'],
    Strategy: ['Level up your strategic thinking', 'Run a quick competitive audit, draft a problem hypothesis, and validate with 3 stakeholders before committing to a roadmap item.'],
    Execution: ['Tighten execution discipline', 'Review your sprint backlog, write a crisp acceptance criteria template, and block 2 hours for async documentation.'],
    Stakeholders: ['Strengthen stakeholder alignment', 'Create a stakeholder influence matrix, send a weekly comms digest, and identify your top 2 skeptics to win over.'],
    Data: ['Get data-driven this week', 'Define one success metric per active feature, set up a funnel analysis, and review your north star metric weekly cadence.'],
    Leadership: ['Invest in team leadership', 'Run 1:1s with structured career conversation, draft growth plans for 2 team members, and document team rituals.'],
  };
  const [ft, fb] = focusMap[area] || focusMap.Discovery;
  const ftEl = document.getElementById('focus-title');
  const fbEl = document.getElementById('focus-body');
  if (ftEl) ftEl.textContent = ft;
  if (fbEl) fbEl.textContent = fb;
}

// Activity feed data
function initActivityFeed() {
  const items = [
    { text: 'Completed: Discovery framework review', time: '2h ago' },
    { text: 'Added goal: Map stakeholder influence', time: 'Yesterday' },
    { text: 'AI Coach: Suggested JTBD exercise', time: '2d ago' },
    { text: 'Joined organization: Acme Corp', time: '3d ago' },
    { text: 'Completed onboarding profile', time: '3d ago' },
  ];
  const feed = document.getElementById('activity-feed');
  if (!feed) return;
  feed.innerHTML = items.map(i => `
    <div class="activity-item">
      <div class="activity-dot"></div>
      <div class="activity-text">${i.text}</div>
      <div class="activity-time">${i.time}</div>
    </div>
  `).join('');
}

function initFrameworks() {
  const fws = [
    { name: 'Jobs-to-be-Done', desc: 'Understand what customers are really hiring your product for.', link: '#' },
    { name: 'PRD Writing', desc: 'Structure your product requirements clearly and concisely.', link: '#' },
    { name: 'North Star Metric', desc: 'Define the single metric that best captures your product value.', link: '#' },
    { name: 'OKR Setting', desc: 'Align team objectives with measurable key results.', link: '#' },
    { name: 'Opp. Solution Tree', desc: 'Continuously discover and test solutions to user problems.', link: '#' },
  ];
  const list = document.getElementById('frameworks-list');
  if (!list) return;
  list.innerHTML = fws.map(f => `
    <div class="framework-card" tabindex="0" role="button" onclick="showToast('Opening ${f.name}...')">
      <div class="framework-card-name">${f.name}</div>
      <div class="framework-card-desc">${f.desc}</div>
      <span class="framework-card-link">Explore →</span>
    </div>
  `).join('');
}

// ═══════════════════════════════════════
// CHAT
// ═══════════════════════════════════════
const COACH_RESPONSES = {
  roadmap: "Roadmap prioritization starts with your bets: what's the biggest risk to your product right now? Frame each item as a hypothesis — 'We believe that [feature] will [outcome] for [user].' Then score by impact × confidence ÷ effort.",
  stakeholder: "For stakeholder alignment, the RACI matrix is your friend, but the real unlock is pre-alignment. Before any meeting, have 1:1s with your top skeptics. People rarely say no publicly when they've already said yes privately.",
  discovery: "Discovery tip: switch from 'what do you want?' to 'tell me about the last time you struggled with X.' Behavior beats opinion. JTBD framing — what's the job they're hiring the product to do? — unlocks real user motivations.",
  metric: "For metrics, start with your North Star: one number that captures the value your product delivers to users. Layer two types beneath it: leading indicators (fast, predictive) and lagging indicators (slow, confirmatory).",
  prioritization: "Try the RICE framework: Reach × Impact × Confidence ÷ Effort. The confidence score forces you to be honest about assumptions. Don't over-engineer it — a rough ranking beats paralysis.",
  default: "Great question. Let's think through it step by step. What's your biggest constraint right now — time, data, team alignment, or something else? That'll shape the right approach."
};

function initChat() {
  const msgs = document.getElementById('chat-messages');
  if (!msgs) return;
  const welcome = userProfile.growthArea[0] || 'Discovery';
  msgs.innerHTML = `
    <div>
      <div class="chat-msg-label">AI Coach</div>
      <div class="chat-msg coach">Hey Alex 👋 I've reviewed your profile. You're focused on growing in ${welcome} — smart choice. What's on your mind today?</div>
    </div>
    <div>
      <div class="chat-msg-label">AI Coach</div>
      <div class="chat-msg coach">Quick tip based on your challenge: the fastest way to get unstuck is to write down your top assumption and find the cheapest way to test it. Want me to help you structure that?</div>
    </div>
  `;
}

function sendChat() {
  const input = document.getElementById('chat-input');
  const msgs = document.getElementById('chat-messages');
  const text = input.value.trim();
  if (!text) return;
  input.value = '';

  // User msg
  msgs.innerHTML += `<div style="display:flex;justify-content:flex-end"><div class="chat-msg user">${text}</div></div>`;

  // Typing indicator
  const typingId = 'typing-' + Date.now();
  msgs.innerHTML += `<div id="${typingId}" class="typing-indicator"><div class="typing-dot"></div><div class="typing-dot"></div><div class="typing-dot"></div></div>`;
  msgs.scrollTop = msgs.scrollHeight;

  const lower = text.toLowerCase();
  let response = COACH_RESPONSES.default;
  if (lower.includes('roadmap')) response = COACH_RESPONSES.roadmap;
  else if (lower.includes('stakeholder')) response = COACH_RESPONSES.stakeholder;
  else if (lower.includes('discover') || lower.includes('user') || lower.includes('research')) response = COACH_RESPONSES.discovery;
  else if (lower.includes('metric') || lower.includes('kpi') || lower.includes('north star')) response = COACH_RESPONSES.metric;
  else if (lower.includes('priorit')) response = COACH_RESPONSES.prioritization;

  setTimeout(() => {
    const typing = document.getElementById(typingId);
    if (typing) typing.remove();
    msgs.innerHTML += `
      <div>
        <div class="chat-msg-label">AI Coach</div>
        <div class="chat-msg coach">${response}</div>
      </div>
    `;
    msgs.scrollTop = msgs.scrollHeight;
  }, 1400);
}

// ═══════════════════════════════════════
// KANBAN
// ═══════════════════════════════════════
const COLS = ['Backlog','In Progress','Review','Done'];
const COL_IDS = ['backlog','in-progress','review','done'];

function initKanbanData() {
  kanbanCards = [
    { id: 'c1', title: 'Run 5 user interviews', area: 'Discovery', col: 'in-progress', progress: 40, desc: 'Conduct 5 structured user interviews focused on the onboarding experience. Capture pain points and JTBD insights.', resources: ['User Interview Script Template', 'JTBD Framework Guide', 'Synthesis Miro Board'] },
    { id: 'c2', title: 'Write PRD for current project', area: 'Execution', col: 'backlog', progress: 0, desc: 'Draft a full PRD including context, goals, non-goals, user stories, and success metrics.', resources: ['PRD Template', 'Example PRD: Notion Docs'] },
    { id: 'c3', title: 'Map stakeholder influence', area: 'Stakeholders', col: 'backlog', progress: 0, desc: 'Create an influence/interest matrix for all stakeholders on the Q3 roadmap initiative.', resources: ['Stakeholder Matrix Template'] },
    { id: 'c4', title: 'Define North Star Metric', area: 'Strategy', col: 'review', progress: 80, desc: 'Align with leadership on one North Star metric. Document the supporting input metrics and rationale.', resources: ['North Star Playbook', 'Amplitude Guide to NSM'] },
  ];
}

function renderKanban() {
  const board = document.getElementById('kanban-board');
  if (!board) return;
  board.innerHTML = '';
  COL_IDS.forEach((colId, i) => {
    const cards = kanbanCards.filter(c => c.col === colId);
    const col = document.createElement('div');
    col.className = 'kanban-col';
    col.dataset.col = colId;

    const emptyState = cards.length === 0 ? `
      <div class="kanban-empty">
        <i data-lucide="inbox" class="kanban-empty-icon" style="width:28px;height:28px"></i>
        <div>Nothing here yet.</div>
        <div style="color:var(--text-3);font-size:12px">Drag a card here or add a goal above.</div>
      </div>
    ` : '';

    col.innerHTML = `
      <div class="kanban-col-header">
        <span class="kanban-col-title">${COLS[i]}</span>
        <span class="kanban-count">${cards.length}</span>
      </div>
      <div class="kanban-cards" id="col-${colId}" data-col="${colId}">
        ${emptyState}
        ${cards.map(card => renderCardHTML(card)).join('')}
      </div>
    `;
    board.appendChild(col);
  });

  lucide.createIcons();
  setupDragDrop();
  document.querySelectorAll('.kanban-card').forEach(el => {
    el.addEventListener('click', () => openDetailPanel(el.dataset.id));
  });
}

function renderCardHTML(card) {
  const tagClass = 'tag-' + card.area.toLowerCase();
  const progressPct = card.progress;
  return `
    <div class="kanban-card" draggable="true" data-id="${card.id}" data-col="${card.col}" tabindex="0" role="button" aria-label="Open ${card.title}">
      <span class="card-tag ${tagClass}">${card.area}</span>
      <div class="card-title">${card.title}</div>
      <div class="card-progress"><div class="card-progress-fill" style="width:${progressPct}%"></div></div>
    </div>
  `;
}

function setupDragDrop() {
  document.querySelectorAll('.kanban-card').forEach(card => {
    card.addEventListener('dragstart', (e) => {
      dragCard = card.dataset.id;
      card.classList.add('dragging');
      e.dataTransfer.effectAllowed = 'move';
    });
    card.addEventListener('dragend', () => {
      card.classList.remove('dragging');
      document.querySelectorAll('.kanban-cards').forEach(c => c.classList.remove('drag-over'));
    });
  });
  document.querySelectorAll('.kanban-cards').forEach(zone => {
    zone.addEventListener('dragover', (e) => {
      e.preventDefault();
      e.dataTransfer.dropEffect = 'move';
      zone.classList.add('drag-over');
    });
    zone.addEventListener('dragleave', () => zone.classList.remove('drag-over'));
    zone.addEventListener('drop', (e) => {
      e.preventDefault();
      zone.classList.remove('drag-over');
      if (!dragCard) return;
      const newCol = zone.dataset.col;
      const card = kanbanCards.find(c => c.id === dragCard);
      if (card) { card.col = newCol; renderKanban(); showToast('Moved to ' + COLS[COL_IDS.indexOf(newCol)]); }
      dragCard = null;
    });
  });
}

// ═══════════════════════════════════════
// ADD GOAL MODAL
// ═══════════════════════════════════════
function openAddGoalModal() {
  document.getElementById('add-goal-modal').classList.add('open');
  document.getElementById('goal-title').focus();
}
function closeAddGoalModal() {
  document.getElementById('add-goal-modal').classList.remove('open');
  document.getElementById('goal-title').value = '';
  document.getElementById('goal-desc').value = '';
}
function saveGoal() {
  const title = document.getElementById('goal-title').value.trim();
  if (!title) { showToast('Please enter a goal title.'); return; }
  const area = document.getElementById('goal-area').value;
  const desc = document.getElementById('goal-desc').value;
  const newCard = {
    id: 'c' + Date.now(),
    title,
    area: area.charAt(0).toUpperCase() + area.slice(1),
    col: 'backlog',
    progress: 0,
    desc: desc || 'Work toward mastering this skill area.',
    resources: []
  };
  kanbanCards.push(newCard);
  closeAddGoalModal();
  renderKanban();
  showToast('Goal added to Backlog!');
}

// ═══════════════════════════════════════
// DETAIL PANEL
// ═══════════════════════════════════════
function openDetailPanel(cardId) {
  const card = kanbanCards.find(c => c.id === cardId);
  if (!card) return;
  openCardId = cardId;

  const tagEl = document.getElementById('detail-tag');
  tagEl.textContent = card.area;
  tagEl.className = 'card-tag tag-' + card.area.toLowerCase();

  const statusEl = document.getElementById('detail-status');
  statusEl.textContent = COLS[COL_IDS.indexOf(card.col)] || card.col;
  statusEl.className = 'status-badge ' + card.col;

  document.getElementById('detail-title').textContent = card.title;
  document.getElementById('detail-desc').textContent = card.desc;
  document.getElementById('detail-notes').value = card.notes || '';

  const res = document.getElementById('detail-resources');
  res.innerHTML = card.resources.length ? card.resources.map(r => `<a href="#" onclick="return false;showToast('Opening resource...')" style="color:var(--teal);font-size:14px">→ ${r}</a>`).join('') : '<span style="color:var(--text-3);font-size:13px">No resources linked yet.</span>';

  const moveBtns = document.getElementById('detail-move-btns');
  moveBtns.innerHTML = COL_IDS.filter(c => c !== card.col).map(c => `
    <button class="btn-ghost" style="font-size:12px;padding:6px 12px" onclick="moveCardTo('${cardId}','${c}')">${COLS[COL_IDS.indexOf(c)]}</button>
  `).join('');

  document.getElementById('detail-panel').classList.add('open');
}

function moveCardTo(cardId, colId) {
  const card = kanbanCards.find(c => c.id === cardId);
  if (card) {
    card.col = colId;
    renderKanban();
    openDetailPanel(cardId);
    showToast('Moved to ' + COLS[COL_IDS.indexOf(colId)]);
  }
}

function closeDetailPanel() {
  document.getElementById('detail-panel').classList.remove('open');
  openCardId = null;
}
