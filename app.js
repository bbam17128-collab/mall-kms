const STORAGE_KEY = "mall-kms-articles-v1";
const SESSION_KEY = "mall-kms-session-v1";
const USAGE_KEY = "mall-kms-usage-v1";
const MAX_ATTACHMENT_BYTES = 1.5 * 1024 * 1024;
const MAX_ATTACHMENTS_PER_ARTICLE = 5;
const OTP_RECIPIENT_EMAIL = "antonio.kimarvee@gmail.com";
const ALLOWED_ATTACHMENT_EXTENSIONS = [".pdf", ".jpg", ".jpeg", ".doc", ".docx", ".ppt", ".pptx", ".xls", ".xlsx"];
const ALLOWED_ATTACHMENT_TYPES = [
  "application/pdf",
  "image/jpeg",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/vnd.ms-powerpoint",
  "application/vnd.openxmlformats-officedocument.presentationml.presentation",
  "application/vnd.ms-excel",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
];
const accounts = [
  {
    username: "mall.admin",
    password: "Mall@2026",
    role: "admin",
    label: "Administrator",
  },
  {
    username: "mall.user",
    password: "User@2026",
    role: "user",
    label: "User",
  },
];

const seedArticles = [
  {
    id: "kb-1001",
    title: "Fire Alarm Evacuation Procedure",
    category: "Emergency Response",
    status: "Published",
    priority: "Critical",
    audience: "Security, Facilities, Tenant Managers",
    owner: "Head of Safety",
    tags: ["evacuation", "fire alarm", "assembly points"],
    summary: "Standard evacuation sequence for all public zones, back-of-house corridors, and tenant units.",
    body:
      "Confirm alarm panel zone, notify command post, dispatch floor marshals, pause vertical transport, and guide customers to the nearest marked exits. Tenant managers confirm staff counts at designated assembly points before all-clear.",
    updatedAt: "2026-06-28",
  },
  {
    id: "kb-1002",
    title: "Tenant Fit-Out Permit Checklist",
    category: "Tenant Operations",
    status: "Review",
    priority: "High",
    audience: "Leasing, Tenant Coordination, Contractors",
    owner: "Tenant Coordination Office",
    tags: ["permits", "fit-out", "contractor access"],
    summary: "Required documents and approvals before tenant contractors begin fit-out work.",
    body:
      "Collect approved drawings, insurance certificates, contractor IDs, waste handling plan, and work schedule. Facilities must confirm utility isolation windows before hot work or ceiling access is permitted.",
    updatedAt: "2026-06-24",
  },
  {
    id: "kb-1003",
    title: "Lost Child Response Protocol",
    category: "Customer Experience",
    status: "Published",
    priority: "Critical",
    audience: "Guest Services, Security, Control Room",
    owner: "Guest Services Manager",
    tags: ["guest care", "security", "announcement"],
    summary: "Coordinated response for reports of a missing child or separated guardian.",
    body:
      "Escort the reporting guardian to Guest Services, capture identifiers discreetly, alert control room, and monitor exits. Public announcements must avoid sensitive personal data unless authorized by security lead.",
    updatedAt: "2026-06-30",
  },
  {
    id: "kb-1004",
    title: "HVAC Comfort Complaint Workflow",
    category: "Facilities",
    status: "Draft",
    priority: "Standard",
    audience: "Facilities, Customer Care",
    owner: "Facilities Helpdesk",
    tags: ["hvac", "comfort", "work orders"],
    summary: "Intake and triage steps for hot or cold zone complaints from tenants and guests.",
    body:
      "Log the exact zone, tenant unit, time, occupancy level, and observed condition. Facilities checks BMS readings first, then dispatches a technician if readings or repeat complaints indicate a local issue.",
    updatedAt: "2026-06-18",
  },
  {
    id: "kb-1005",
    title: "After-Hours Delivery Access",
    category: "Security",
    status: "Published",
    priority: "Standard",
    audience: "Security, Loading Dock, Tenants",
    owner: "Security Operations",
    tags: ["deliveries", "loading dock", "access"],
    summary: "Gate access and escort requirements for deliveries outside regular trading hours.",
    body:
      "Verify the delivery booking, vehicle plate, driver ID, and tenant approval. Security escorts delivery teams through service corridors and records departure time before closing the loading dock bay.",
    updatedAt: "2026-06-20",
  },
  {
    id: "kb-1006",
    title: "Campaign Display Approval Route",
    category: "Retail Marketing",
    status: "Published",
    priority: "Low",
    audience: "Marketing, Leasing, Tenants",
    owner: "Retail Marketing Lead",
    tags: ["campaign", "display", "approval"],
    summary: "Review path for tenant promotional displays in common areas.",
    body:
      "Check brand guidelines, fire egress clearances, insurance coverage, installation method, and campaign dates. Approved displays receive a location code and daily visual inspection note.",
    updatedAt: "2026-06-12",
  },
];

const els = {
  authView: document.querySelector("#authView"),
  dashboardView: document.querySelector("#dashboardView"),
  loginForm: document.querySelector("#loginForm"),
  otpForm: document.querySelector("#otpForm"),
  usernameInput: document.querySelector("#usernameInput"),
  passwordInput: document.querySelector("#passwordInput"),
  otpInput: document.querySelector("#otpInput"),
  loginError: document.querySelector("#loginError"),
  otpError: document.querySelector("#otpError"),
  otpDeliveryMessage: document.querySelector("#otpDeliveryMessage"),
  backToLoginButton: document.querySelector("#backToLoginButton"),
  signedInAs: document.querySelector("#signedInAs"),
  logoutButton: document.querySelector("#logoutButton"),
  totalMetric: document.querySelector("#totalMetric"),
  publishedMetric: document.querySelector("#publishedMetric"),
  reviewMetric: document.querySelector("#reviewMetric"),
  criticalMetric: document.querySelector("#criticalMetric"),
  adminReportPanel: document.querySelector("#adminReportPanel"),
  dailyUsageMetric: document.querySelector("#dailyUsageMetric"),
  weeklyUsageMetric: document.querySelector("#weeklyUsageMetric"),
  monthlyUsageMetric: document.querySelector("#monthlyUsageMetric"),
  searchUsageMetric: document.querySelector("#searchUsageMetric"),
  topSearchedArticle: document.querySelector("#topSearchedArticle"),
  topViewedArticle: document.querySelector("#topViewedArticle"),
  topSearchTerms: document.querySelector("#topSearchTerms"),
  usageBreakdown: document.querySelector("#usageBreakdown"),
  clearUsageButton: document.querySelector("#clearUsageButton"),
  searchInput: document.querySelector("#searchInput"),
  categoryFilter: document.querySelector("#categoryFilter"),
  statusFilter: document.querySelector("#statusFilter"),
  newArticleButton: document.querySelector("#newArticleButton"),
  resultCount: document.querySelector("#resultCount"),
  articleTableBody: document.querySelector("#articleTableBody"),
  detailPanel: document.querySelector("#detailPanel"),
  assistantMessages: document.querySelector("#assistantMessages"),
  assistantForm: document.querySelector("#assistantForm"),
  assistantInput: document.querySelector("#assistantInput"),
  clearAssistantHistoryButton: document.querySelector("#clearAssistantHistoryButton"),
  articleDialog: document.querySelector("#articleDialog"),
  articleForm: document.querySelector("#articleForm"),
  dialogTitle: document.querySelector("#dialogTitle"),
  closeDialogButton: document.querySelector("#closeDialogButton"),
  cancelDialogButton: document.querySelector("#cancelDialogButton"),
  deleteFromDialogButton: document.querySelector("#deleteFromDialogButton"),
  deleteDialog: document.querySelector("#deleteDialog"),
  deleteDialogText: document.querySelector("#deleteDialogText"),
  closeDeleteDialogButton: document.querySelector("#closeDeleteDialogButton"),
  cancelDeleteButton: document.querySelector("#cancelDeleteButton"),
  confirmDeleteButton: document.querySelector("#confirmDeleteButton"),
  attachmentDialog: document.querySelector("#attachmentDialog"),
  attachmentForm: document.querySelector("#attachmentForm"),
  attachmentDialogTitle: document.querySelector("#attachmentDialogTitle"),
  attachmentCount: document.querySelector("#attachmentCount"),
  attachmentList: document.querySelector("#attachmentList"),
  attachmentIdInput: document.querySelector("#attachmentIdInput"),
  attachmentNameInput: document.querySelector("#attachmentNameInput"),
  attachmentFileInput: document.querySelector("#attachmentFileInput"),
  attachmentError: document.querySelector("#attachmentError"),
  closeAttachmentDialogButton: document.querySelector("#closeAttachmentDialogButton"),
  resetAttachmentFormButton: document.querySelector("#resetAttachmentFormButton"),
  emailDialog: document.querySelector("#emailDialog"),
  emailForm: document.querySelector("#emailForm"),
  emailDialogTitle: document.querySelector("#emailDialogTitle"),
  emailRecipientInput: document.querySelector("#emailRecipientInput"),
  emailSubjectInput: document.querySelector("#emailSubjectInput"),
  emailNoteInput: document.querySelector("#emailNoteInput"),
  emailPreview: document.querySelector("#emailPreview"),
  closeEmailDialogButton: document.querySelector("#closeEmailDialogButton"),
  cancelEmailButton: document.querySelector("#cancelEmailButton"),
  articleIdInput: document.querySelector("#articleIdInput"),
  titleInput: document.querySelector("#titleInput"),
  articleCategoryInput: document.querySelector("#articleCategoryInput"),
  articleStatusInput: document.querySelector("#articleStatusInput"),
  priorityInput: document.querySelector("#priorityInput"),
  audienceInput: document.querySelector("#audienceInput"),
  ownerInput: document.querySelector("#ownerInput"),
  tagsInput: document.querySelector("#tagsInput"),
  summaryInput: document.querySelector("#summaryInput"),
  bodyInput: document.querySelector("#bodyInput"),
  toast: document.querySelector("#toast"),
};

let articles = loadArticles();
let selectedArticleId = articles[0]?.id ?? null;
let currentOtp = "";
let pendingAccount = null;
let currentAccount = null;
let pendingDeleteId = "";
let attachmentArticleId = "";
let emailArticleId = "";
let searchUsageTimer = 0;
const assistantHistory = [];

function loadArticles() {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    const normalizedSeed = seedArticles.map(normalizeArticle);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(normalizedSeed));
    return normalizedSeed;
  }

  try {
    const parsed = JSON.parse(stored);
    return Array.isArray(parsed) ? parsed.map(normalizeArticle) : seedArticles.map(normalizeArticle);
  } catch {
    return seedArticles.map(normalizeArticle);
  }
}

function normalizeArticle(article) {
  return {
    ...article,
    tags: Array.isArray(article.tags) ? article.tags : [],
    attachments: Array.isArray(article.attachments) ? article.attachments.map(normalizeAttachment).filter(Boolean) : [],
  };
}

function normalizeAttachment(attachment) {
  if (!attachment?.id || !attachment?.name) return null;
  return {
    id: attachment.id,
    name: attachment.name,
    originalName: attachment.originalName || attachment.name,
    type: attachment.type || "application/octet-stream",
    size: Number(attachment.size) || 0,
    dataUrl: attachment.dataUrl || "",
    uploadedAt: attachment.uploadedAt || new Date().toISOString(),
  };
}

function saveArticles() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(articles));
    return true;
  } catch {
    showToast("Storage limit reached. Remove files or use smaller attachments.");
    return false;
  }
}

function loadUsageEvents() {
  try {
    const parsed = JSON.parse(localStorage.getItem(USAGE_KEY));
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function saveUsageEvents(events) {
  localStorage.setItem(USAGE_KEY, JSON.stringify(events.slice(-2500)));
}

function trackUsage(type, data = {}) {
  const event = {
    type,
    at: new Date().toISOString(),
    username: currentAccount?.username || "anonymous",
    role: currentAccount?.role || "unknown",
    ...data,
  };
  const events = loadUsageEvents();
  events.push(event);
  saveUsageEvents(events);
  renderAdminDashboard();
}

function scheduleSearchUsage() {
  window.clearTimeout(searchUsageTimer);
  searchUsageTimer = window.setTimeout(() => {
    const query = els.searchInput.value.trim();
    if (query.length < 3) return;
    const topMatch = getFilteredArticles()[0];
    trackUsage("search", {
      query,
      articleId: topMatch?.id || "",
      articleTitle: topMatch?.title || "No match",
    });
  }, 700);
}

function renderAdminDashboard() {
  if (!els.adminReportPanel) return;
  els.adminReportPanel.classList.toggle("hidden", !isAdmin());
  if (!isAdmin()) return;

  const events = loadUsageEvents();
  const now = new Date();
  const todayStart = startOfDay(now);
  const weekStart = startOfWeek(now);
  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
  const monthlyEvents = events.filter((event) => new Date(event.at) >= monthStart);

  els.dailyUsageMetric.textContent = countSince(events, todayStart);
  els.weeklyUsageMetric.textContent = countSince(events, weekStart);
  els.monthlyUsageMetric.textContent = monthlyEvents.length;
  els.searchUsageMetric.textContent = monthlyEvents.filter((event) => event.type === "search").length;
  els.topSearchedArticle.textContent = topLabel(monthlyEvents, "search", "articleTitle", "No search data yet.");
  els.topViewedArticle.textContent = topViewedArticleLabel(monthlyEvents);
  renderUsageList(els.topSearchTerms, topEntries(monthlyEvents, "search", "query", 4), "No search terms yet.");
  renderUsageList(els.usageBreakdown, breakdownEntries(monthlyEvents), "No usage data yet.");
}

function countSince(events, startDate) {
  return events.filter((event) => new Date(event.at) >= startDate).length;
}

function startOfDay(date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

function startOfWeek(date) {
  const start = startOfDay(date);
  const day = start.getDay();
  const mondayOffset = day === 0 ? -6 : 1 - day;
  start.setDate(start.getDate() + mondayOffset);
  return start;
}

function topEntries(events, type, field, limit = 5) {
  const counts = events
    .filter((event) => event.type === type && event[field])
    .reduce((map, event) => {
      const key = String(event[field]).trim();
      map.set(key, (map.get(key) || 0) + 1);
      return map;
    }, new Map());

  return [...counts.entries()]
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .slice(0, limit)
    .map(([label, count]) => ({ label, count }));
}

function topLabel(events, type, field, emptyText) {
  const [top] = topEntries(events, type, field, 1);
  return top ? `${top.label} (${top.count})` : emptyText;
}

function topViewedArticleLabel(events) {
  const [top] = topEntries(events, "article_view", "articleId", 1);
  if (!top) return "No view data yet.";
  const article = articles.find((item) => item.id === top.label);
  return `${article?.title || top.label} (${top.count})`;
}

function breakdownEntries(events) {
  const labels = {
    login: "Logins",
    search: "Searches",
    article_view: "Article views",
    assistant_query: "Assistant questions",
    article_create: "Articles created",
    article_update: "Articles updated",
    article_delete: "Articles deleted",
    attachment_add: "Attachments added",
    attachment_update: "Attachments updated",
    attachment_delete: "Attachments deleted",
    email_draft: "Email drafts",
  };
  const counts = events.reduce((map, event) => {
    map.set(event.type, (map.get(event.type) || 0) + 1);
    return map;
  }, new Map());

  return [...counts.entries()]
    .sort((a, b) => b[1] - a[1])
    .map(([type, count]) => ({ label: labels[type] || type, count }));
}

function renderUsageList(element, entries, emptyText) {
  element.innerHTML = "";
  if (!entries.length) {
    const item = document.createElement("li");
    item.textContent = emptyText;
    element.append(item);
    return;
  }

  for (const entry of entries) {
    const item = document.createElement("li");
    item.textContent = `${entry.label} (${entry.count})`;
    element.append(item);
  }
}

function setSession(account) {
  sessionStorage.setItem(
    SESSION_KEY,
    JSON.stringify({
      username: account.username,
      role: account.role,
      label: account.label,
      verifiedAt: new Date().toISOString(),
    }),
  );
}

function getSession() {
  try {
    return JSON.parse(sessionStorage.getItem(SESSION_KEY));
  } catch {
    return null;
  }
}

function clearSession() {
  sessionStorage.removeItem(SESSION_KEY);
}

function findAccount(username, password) {
  return accounts.find((account) => account.username === username && account.password === password) || null;
}

function accountFromSession(session) {
  if (!session?.username) return null;
  const account = accounts.find((item) => item.username === session.username);
  if (account) return account;
  return {
    username: session.username,
    role: session.role || "admin",
    label: session.label || "Administrator",
  };
}

function isAdmin() {
  return currentAccount?.role === "admin";
}

function showToast(message) {
  els.toast.textContent = message;
  els.toast.classList.add("show");
  window.clearTimeout(showToast.timer);
  showToast.timer = window.setTimeout(() => els.toast.classList.remove("show"), 2400);
}

function generateOtp() {
  currentOtp = String(Math.floor(100000 + Math.random() * 900000));
  els.otpDeliveryMessage.textContent = `Sent to ${maskEmail(OTP_RECIPIENT_EMAIL)}`;
  sendOtpEmailDraft();
}

function sendOtpEmailDraft() {
  const subject = "Mall KMS One-Time Password";
  const body = [
    "Dear authorized user,",
    "",
    "Your one-time password for Mall Knowledge Management System access is:",
    "",
    currentOtp,
    "",
    "This code is valid for this sign-in session only. If you did not request this code, please ignore this message.",
    "",
    "Regards,",
    "Mall Operations Knowledge Management",
  ].join("\n");
  const href = `mailto:${OTP_RECIPIENT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

  window.location.href = href;
}

function maskEmail(email) {
  const [name, domain] = email.split("@");
  if (!name || !domain) return "configured email";
  const visible = name.length <= 2 ? name[0] : `${name.slice(0, 2)}***`;
  return `${visible}@${domain}`;
}

function showDashboard(account) {
  currentAccount = account;
  els.authView.classList.add("hidden");
  els.dashboardView.classList.remove("hidden");
  els.signedInAs.textContent = `${account.username} · ${account.label}`;
  els.newArticleButton.classList.toggle("hidden", !isAdmin());
  renderCategories();
  render();
  initializeAssistant();
}

function showLogin() {
  currentAccount = null;
  pendingAccount = null;
  assistantHistory.length = 0;
  els.dashboardView.classList.add("hidden");
  els.authView.classList.remove("hidden");
  els.otpForm.classList.add("hidden");
  els.loginForm.classList.remove("hidden");
  els.passwordInput.value = "";
  els.otpInput.value = "";
}

function renderCategories() {
  const current = els.categoryFilter.value || "All";
  const categories = [...new Set(articles.map((article) => article.category))].sort();
  els.categoryFilter.innerHTML = '<option value="All">All categories</option>';
  for (const category of categories) {
    const option = document.createElement("option");
    option.value = category;
    option.textContent = category;
    els.categoryFilter.append(option);
  }
  els.categoryFilter.value = categories.includes(current) ? current : "All";
}

function getFilteredArticles() {
  const query = els.searchInput.value.trim().toLowerCase();
  const category = els.categoryFilter.value;
  const status = els.statusFilter.value;

  return articles.filter((article) => {
    const searchable = [
      article.title,
      article.category,
      article.status,
      article.priority,
      article.audience,
      article.owner,
      article.summary,
      article.body,
      ...article.tags,
      ...article.attachments.map((attachment) => attachment.name),
      ...article.attachments.map((attachment) => attachment.originalName),
    ]
      .join(" ")
      .toLowerCase();

    return (
      (!query || searchable.includes(query)) &&
      (category === "All" || article.category === category) &&
      (status === "All" || article.status === status)
    );
  });
}

function render() {
  const filtered = getFilteredArticles();
  const selectedStillVisible = filtered.some((article) => article.id === selectedArticleId);
  if (!selectedStillVisible) {
    selectedArticleId = filtered[0]?.id ?? null;
  }

  renderMetrics();
  renderTable(filtered);
  renderDetail();
  renderAdminDashboard();
}

function renderMetrics() {
  els.totalMetric.textContent = articles.length;
  els.publishedMetric.textContent = articles.filter((article) => article.status === "Published").length;
  els.reviewMetric.textContent = articles.filter((article) => article.status === "Review").length;
  els.criticalMetric.textContent = articles.filter((article) => article.priority === "Critical").length;
}

function renderTable(filtered) {
  els.resultCount.textContent = `${filtered.length} ${filtered.length === 1 ? "record" : "records"}`;
  els.articleTableBody.innerHTML = "";

  if (!filtered.length) {
    const row = document.createElement("tr");
    row.innerHTML = `<td colspan="7">No articles match the current filters.</td>`;
    els.articleTableBody.append(row);
    return;
  }

  for (const article of filtered) {
    const row = document.createElement("tr");
    row.dataset.selected = article.id === selectedArticleId ? "true" : "false";
    row.innerHTML = `
      <td>
        <button class="row-button title-cell" type="button" data-action="select" data-id="${article.id}">
          <strong>${escapeHtml(article.title)}</strong>
          <span>${escapeHtml(article.summary)}</span>
        </button>
      </td>
      <td>${escapeHtml(article.category)}</td>
      <td><span class="pill ${article.status === "Published" ? "dark" : "light"}">${escapeHtml(article.status)}</span></td>
      <td><span class="pill light">${article.attachments.length}</span></td>
      <td>${escapeHtml(article.owner)}</td>
      <td>${formatDate(article.updatedAt)}</td>
      <td>
        ${renderTableActions(article)}
      </td>
    `;
    els.articleTableBody.append(row);
  }
}

function renderTableActions(article) {
  if (!isAdmin()) {
    return `<span class="pill light">View only</span>`;
  }

  return `
    <div class="action-set">
      <button class="icon-button" type="button" data-action="edit" data-id="${article.id}" title="Edit article" aria-label="Edit article">
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m5 16.3-.8 3.5 3.5-.8L18.9 7.8l-2.7-2.7L5 16.3ZM20.3 6.4l-2.7-2.7.8-.8a1.9 1.9 0 0 1 2.7 2.7l-.8.8Z"/></svg>
      </button>
      <button class="icon-button" type="button" data-action="delete" data-id="${article.id}" title="Delete article" aria-label="Delete article">
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 3h6l1 2h4v2H4V5h4l1-2Zm-2 6h10l-.7 12H7.7L7 9Zm3 2v8h2v-8h-2Zm4 0v8h2v-8h-2Z"/></svg>
      </button>
    </div>
  `;
}

function renderDetail() {
  const article = articles.find((item) => item.id === selectedArticleId);
  if (!article) {
    els.detailPanel.innerHTML = `
      <div class="empty-state">
        <span class="empty-icon" aria-hidden="true">
          <svg viewBox="0 0 24 24"><path d="M5 3h10l4 4v14H5V3Zm9 1.5V8h3.5L14 4.5ZM7 10v2h10v-2H7Zm0 4v2h10v-2H7Zm0 4h6v-2H7v2Z"/></svg>
        </span>
        <h2>Select an article</h2>
        <p>Article details will appear here.</p>
      </div>
    `;
    return;
  }

  els.detailPanel.innerHTML = `
    <div class="detail-content">
      <div class="detail-header">
        <div class="detail-meta">
          <span class="pill ${article.status === "Published" ? "dark" : "light"}">${escapeHtml(article.status)}</span>
          <span class="pill">${escapeHtml(article.priority)}</span>
        </div>
        <h2>${escapeHtml(article.title)}</h2>
        <div class="detail-meta">
          <span>${escapeHtml(article.category)}</span>
          <span>${escapeHtml(article.owner)}</span>
          <span>${formatDate(article.updatedAt)}</span>
        </div>
      </div>
      <div class="detail-section">
        <h3>Audience</h3>
        <p>${escapeHtml(article.audience)}</p>
      </div>
      <div class="detail-section">
        <h3>Summary</h3>
        <p>${escapeHtml(article.summary)}</p>
      </div>
      <div class="detail-section">
        <h3>Procedure</h3>
        <p>${escapeHtml(article.body)}</p>
      </div>
      <div class="detail-section">
        <h3>Tags</h3>
        <div class="tag-list">
          ${article.tags.map((tag) => `<span class="pill light">${escapeHtml(tag)}</span>`).join("")}
        </div>
      </div>
      <div class="detail-section">
        <h3>Attachments</h3>
        <div class="attachment-summary">
          ${renderAttachmentSummary(article)}
        </div>
      </div>
      ${renderDetailActions(article)}
    </div>
  `;
}

function renderDetailActions(article) {
  if (!isAdmin()) {
    return `<div class="button-row"><span class="pill light">Read-only access</span></div>`;
  }

  return `
    <div class="button-row">
      <button class="primary-button compact" type="button" data-detail-action="edit" data-id="${article.id}">
        <span class="icon" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="m5 16.3-.8 3.5 3.5-.8L18.9 7.8l-2.7-2.7L5 16.3ZM20.3 6.4l-2.7-2.7.8-.8a1.9 1.9 0 0 1 2.7 2.7l-.8.8Z"/></svg></span>
        Edit
      </button>
      <button class="secondary-button compact" type="button" data-detail-action="attachments" data-id="${article.id}">
        <span class="icon" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6Zm0 2.8L17.2 8H14V4.8ZM7 12h10v2H7v-2Zm0 4h7v2H7v-2Z"/></svg></span>
        Attachments
      </button>
      <button class="secondary-button compact" type="button" data-detail-action="email" data-id="${article.id}">
        <span class="icon" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M3 5h18v14H3V5Zm2 3.2V17h14V8.2l-7 4.7-7-4.7ZM6.3 7l5.7 3.8L17.7 7H6.3Z"/></svg></span>
        Email
      </button>
      <button class="secondary-button compact" type="button" data-detail-action="delete" data-id="${article.id}">
        <span class="icon" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M9 3h6l1 2h4v2H4V5h4l1-2Zm-2 6h10l-.7 12H7.7L7 9Zm3 2v8h2v-8h-2Zm4 0v8h2v-8h-2Z"/></svg></span>
        Delete
      </button>
    </div>
  `;
}

function renderAttachmentSummary(article) {
  if (!article.attachments.length) {
    return `<p>No attachments added.</p>`;
  }

  return article.attachments
    .map(
      (attachment) => `
        <div class="attachment-row">
          <div class="attachment-info">
            <strong>${escapeHtml(attachment.name)}</strong>
            <span>${escapeHtml(fileKindLabel(attachment))} · ${formatBytes(attachment.size)} · ${formatDateTime(attachment.uploadedAt)}</span>
          </div>
          <button class="icon-button" type="button" data-attachment-action="view" data-id="${attachment.id}" title="View attachment" aria-label="View attachment">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 5c5 0 8.6 4.5 9.8 6.5C20.6 13.5 17 18 12 18s-8.6-4.5-9.8-6.5C3.4 9.5 7 5 12 5Zm0 2c-3.3 0-5.9 2.6-7.4 4.5C6.1 13.4 8.7 16 12 16s5.9-2.6 7.4-4.5C17.9 9.6 15.3 7 12 7Zm0 2a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5Z"/></svg>
          </button>
        </div>
      `,
    )
    .join("");
}

function openArticleDialog(articleId = null) {
  if (!isAdmin()) return;
  const article = articles.find((item) => item.id === articleId);
  els.dialogTitle.textContent = article ? "Edit Article" : "New Article";
  els.deleteFromDialogButton.classList.toggle("hidden", !article);
  els.articleIdInput.value = article?.id ?? "";
  els.titleInput.value = article?.title ?? "";
  els.articleCategoryInput.value = article?.category ?? "Emergency Response";
  els.articleStatusInput.value = article?.status ?? "Draft";
  els.priorityInput.value = article?.priority ?? "Standard";
  els.audienceInput.value = article?.audience ?? "";
  els.ownerInput.value = article?.owner ?? "";
  els.tagsInput.value = article?.tags?.join(", ") ?? "";
  els.summaryInput.value = article?.summary ?? "";
  els.bodyInput.value = article?.body ?? "";
  els.articleDialog.showModal();
  els.titleInput.focus();
}

function closeArticleDialog() {
  els.articleDialog.close();
}

function saveArticleFromForm() {
  if (!isAdmin()) return;
  const id = els.articleIdInput.value || `kb-${Date.now()}`;
  const existingIndex = articles.findIndex((article) => article.id === id);
  const existingAttachments = existingIndex >= 0 ? articles[existingIndex].attachments : [];
  const article = {
    id,
    title: els.titleInput.value.trim(),
    category: els.articleCategoryInput.value,
    status: els.articleStatusInput.value,
    priority: els.priorityInput.value,
    audience: els.audienceInput.value.trim(),
    owner: els.ownerInput.value.trim(),
    tags: els.tagsInput.value
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean),
    summary: els.summaryInput.value.trim(),
    body: els.bodyInput.value.trim(),
    updatedAt: new Date().toISOString().slice(0, 10),
    attachments: existingAttachments,
  };

  if (existingIndex >= 0) {
    articles[existingIndex] = article;
    trackUsage("article_update", { articleId: article.id, articleTitle: article.title });
    showToast("Article updated");
  } else {
    articles.unshift(article);
    trackUsage("article_create", { articleId: article.id, articleTitle: article.title });
    showToast("Article created");
  }

  selectedArticleId = article.id;
  saveArticles();
  renderCategories();
  render();
  closeArticleDialog();
}

function deleteArticle(articleId) {
  if (!isAdmin()) return;
  const article = articles.find((item) => item.id === articleId);
  if (!article) return;

  pendingDeleteId = articleId;
  els.deleteDialogText.textContent = `Delete "${article.title}"? This cannot be undone.`;
  if (els.articleDialog.open) closeArticleDialog();
  els.deleteDialog.showModal();
}

function closeDeleteDialog() {
  pendingDeleteId = "";
  els.deleteDialog.close();
}

function confirmDeleteArticle() {
  if (!isAdmin()) return;
  if (!pendingDeleteId) return;
  const article = articles.find((item) => item.id === pendingDeleteId);
  articles = articles.filter((item) => item.id !== pendingDeleteId);
  selectedArticleId = articles[0]?.id ?? null;
  saveArticles();
  if (article) trackUsage("article_delete", { articleId: article.id, articleTitle: article.title });
  renderCategories();
  render();
  closeDeleteDialog();
  showToast("Article deleted");
}

function openAttachmentDialog(articleId) {
  if (!isAdmin()) return;
  const article = articles.find((item) => item.id === articleId);
  if (!article) return;

  attachmentArticleId = articleId;
  els.attachmentDialogTitle.textContent = article.title;
  resetAttachmentForm();
  renderAttachmentManager();
  els.attachmentDialog.showModal();
}

function closeAttachmentDialog() {
  attachmentArticleId = "";
  resetAttachmentForm();
  els.attachmentDialog.close();
}

function renderAttachmentManager() {
  const article = articles.find((item) => item.id === attachmentArticleId);
  if (!article) return;

  els.attachmentCount.textContent = `${article.attachments.length} ${article.attachments.length === 1 ? "file" : "files"}`;
  els.attachmentList.innerHTML = "";

  if (!article.attachments.length) {
    els.attachmentList.innerHTML = `<p class="file-note">No files are attached to this article.</p>`;
    return;
  }

  for (const attachment of article.attachments) {
    const row = document.createElement("div");
    row.className = "attachment-row";
    row.innerHTML = `
      <div class="attachment-info">
        <strong>${escapeHtml(attachment.name)}</strong>
        <span>${escapeHtml(fileKindLabel(attachment))} · ${formatBytes(attachment.size)} · ${formatDateTime(attachment.uploadedAt)}</span>
      </div>
      <div class="attachment-actions">
        <button class="icon-button" type="button" data-attachment-manager-action="view" data-id="${attachment.id}" title="View file" aria-label="View file">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 5c5 0 8.6 4.5 9.8 6.5C20.6 13.5 17 18 12 18s-8.6-4.5-9.8-6.5C3.4 9.5 7 5 12 5Zm0 2c-3.3 0-5.9 2.6-7.4 4.5C6.1 13.4 8.7 16 12 16s5.9-2.6 7.4-4.5C17.9 9.6 15.3 7 12 7Zm0 2a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5Z"/></svg>
        </button>
        <button class="icon-button" type="button" data-attachment-manager-action="edit" data-id="${attachment.id}" title="Edit file" aria-label="Edit file">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m5 16.3-.8 3.5 3.5-.8L18.9 7.8l-2.7-2.7L5 16.3ZM20.3 6.4l-2.7-2.7.8-.8a1.9 1.9 0 0 1 2.7 2.7l-.8.8Z"/></svg>
        </button>
        <button class="icon-button" type="button" data-attachment-manager-action="delete" data-id="${attachment.id}" title="Delete file" aria-label="Delete file">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 3h6l1 2h4v2H4V5h4l1-2Zm-2 6h10l-.7 12H7.7L7 9Zm3 2v8h2v-8h-2Zm4 0v8h2v-8h-2Z"/></svg>
        </button>
      </div>
    `;
    els.attachmentList.append(row);
  }
}

function resetAttachmentForm() {
  els.attachmentIdInput.value = "";
  els.attachmentNameInput.value = "";
  els.attachmentFileInput.value = "";
  els.attachmentError.textContent = "";
}

async function saveAttachmentFromForm() {
  if (!isAdmin()) return;
  const article = articles.find((item) => item.id === attachmentArticleId);
  if (!article) return;

  const attachmentId = els.attachmentIdInput.value;
  const existingIndex = article.attachments.findIndex((attachment) => attachment.id === attachmentId);
  const file = els.attachmentFileInput.files[0];
  const name = els.attachmentNameInput.value.trim();

  els.attachmentError.textContent = "";

  if (existingIndex === -1 && article.attachments.length >= MAX_ATTACHMENTS_PER_ARTICLE) {
    els.attachmentError.textContent = `Each article can have up to ${MAX_ATTACHMENTS_PER_ARTICLE} files.`;
    return;
  }

  if (existingIndex === -1 && !file) {
    els.attachmentError.textContent = "Choose a file to attach.";
    return;
  }

  if (file) {
    const fileError = validateAttachmentFile(file);
    if (fileError) {
      els.attachmentError.textContent = fileError;
      return;
    }
  }

  let attachment;
  if (file) {
    attachment = {
      id: attachmentId || `att-${Date.now()}`,
      name: name || stripExtension(file.name),
      originalName: file.name,
      type: file.type || inferMimeType(file.name),
      size: file.size,
      dataUrl: await readFileAsDataUrl(file),
      uploadedAt: new Date().toISOString(),
    };
  } else {
    attachment = {
      ...article.attachments[existingIndex],
      name,
      uploadedAt: new Date().toISOString(),
    };
  }

  if (!attachment.name) {
    els.attachmentError.textContent = "Add a display name for this file.";
    return;
  }

  if (existingIndex >= 0) {
    article.attachments[existingIndex] = attachment;
    trackUsage("attachment_update", { articleId: article.id, articleTitle: article.title });
    showToast("Attachment updated");
  } else {
    article.attachments.unshift(attachment);
    trackUsage("attachment_add", { articleId: article.id, articleTitle: article.title });
    showToast("Attachment added");
  }

  article.updatedAt = new Date().toISOString().slice(0, 10);
  saveArticles();
  resetAttachmentForm();
  render();
  renderAttachmentManager();
}

function editAttachment(attachmentId) {
  if (!isAdmin()) return;
  const article = articles.find((item) => item.id === attachmentArticleId);
  const attachment = article?.attachments.find((item) => item.id === attachmentId);
  if (!attachment) return;

  els.attachmentIdInput.value = attachment.id;
  els.attachmentNameInput.value = attachment.name;
  els.attachmentFileInput.value = "";
  els.attachmentNameInput.focus();
}

function deleteAttachment(attachmentId) {
  if (!isAdmin()) return;
  const article = articles.find((item) => item.id === attachmentArticleId);
  if (!article) return;

  article.attachments = article.attachments.filter((attachment) => attachment.id !== attachmentId);
  article.updatedAt = new Date().toISOString().slice(0, 10);
  saveArticles();
  trackUsage("attachment_delete", { articleId: article.id, articleTitle: article.title });
  resetAttachmentForm();
  render();
  renderAttachmentManager();
  showToast("Attachment deleted");
}

function viewAttachment(articleId, attachmentId) {
  const article = articles.find((item) => item.id === articleId);
  const attachment = article?.attachments.find((item) => item.id === attachmentId);
  if (!attachment?.dataUrl) {
    showToast("Attachment data is not available");
    return;
  }

  const view = window.open();
  if (!view) {
    showToast("Allow pop-ups to view this file");
    return;
  }

  view.document.write(`
    <title>${escapeHtml(attachment.name)}</title>
    <style>
      body { margin: 0; font-family: Arial, sans-serif; background: #f3f3f3; color: #181818; }
      header { padding: 14px 18px; background: #fff; border-bottom: 1px solid #d8d8d8; display: flex; justify-content: space-between; gap: 12px; align-items: center; }
      a { color: #181818; font-weight: 700; }
      iframe, img { width: 100%; height: calc(100vh - 58px); border: 0; object-fit: contain; display: block; }
      .download { padding: 24px; }
    </style>
    <header>
      <strong>${escapeHtml(attachment.name)}</strong>
      <a download="${escapeHtml(attachment.originalName)}" href="${attachment.dataUrl}">Download</a>
    </header>
    ${attachment.type === "application/pdf" ? `<iframe src="${attachment.dataUrl}"></iframe>` : ""}
    ${attachment.type === "image/jpeg" ? `<img src="${attachment.dataUrl}" alt="${escapeHtml(attachment.name)}" />` : ""}
    ${attachment.type !== "application/pdf" && attachment.type !== "image/jpeg" ? `<div class="download">This file type is best opened in its native app. Use Download to view it.</div>` : ""}
  `);
  view.document.close();
}

function validateAttachmentFile(file) {
  const lowerName = file.name.toLowerCase();
  const hasAllowedExtension = ALLOWED_ATTACHMENT_EXTENSIONS.some((extension) => lowerName.endsWith(extension));
  const hasAllowedType = !file.type || ALLOWED_ATTACHMENT_TYPES.includes(file.type);

  if (!hasAllowedExtension || !hasAllowedType) {
    return "Unsupported file type. Use PDF, JPG/JPEG, Word, PowerPoint, or Excel.";
  }

  if (file.size > MAX_ATTACHMENT_BYTES) {
    return `File is too large. Maximum size is ${formatBytes(MAX_ATTACHMENT_BYTES)}.`;
  }

  return "";
}

function readFileAsDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
}

function stripExtension(fileName) {
  return fileName.replace(/\.[^/.]+$/, "");
}

function inferMimeType(fileName) {
  const lowerName = fileName.toLowerCase();
  if (lowerName.endsWith(".pdf")) return "application/pdf";
  if (lowerName.endsWith(".jpg") || lowerName.endsWith(".jpeg")) return "image/jpeg";
  if (lowerName.endsWith(".doc")) return "application/msword";
  if (lowerName.endsWith(".docx")) return "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
  if (lowerName.endsWith(".ppt")) return "application/vnd.ms-powerpoint";
  if (lowerName.endsWith(".pptx")) return "application/vnd.openxmlformats-officedocument.presentationml.presentation";
  if (lowerName.endsWith(".xls")) return "application/vnd.ms-excel";
  if (lowerName.endsWith(".xlsx")) return "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
  return "application/octet-stream";
}

function fileKindLabel(attachment) {
  const name = attachment.originalName || attachment.name;
  const extension = name.includes(".") ? name.split(".").pop().toUpperCase() : "FILE";
  return extension;
}

function formatBytes(bytes) {
  if (!bytes) return "0 KB";
  if (bytes < 1024 * 1024) return `${Math.max(1, Math.round(bytes / 1024))} KB`;
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
}

function formatDateTime(value) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return new Intl.DateTimeFormat("en", { month: "short", day: "numeric", year: "numeric" }).format(date);
}

function formatDate(value) {
  const date = new Date(`${value}T00:00:00`);
  return new Intl.DateTimeFormat("en", { month: "short", day: "numeric", year: "numeric" }).format(date);
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function openEmailDialog(articleId) {
  if (!isAdmin()) return;
  const article = articles.find((item) => item.id === articleId);
  if (!article) return;

  emailArticleId = articleId;
  els.emailDialogTitle.textContent = `Send: ${article.title}`;
  els.emailRecipientInput.value = "";
  els.emailSubjectInput.value = `Mall Knowledge Article: ${article.title}`;
  els.emailNoteInput.value = "";
  updateEmailPreview();
  els.emailDialog.showModal();
  els.emailRecipientInput.focus();
}

function closeEmailDialog() {
  emailArticleId = "";
  els.emailDialog.close();
}

function updateEmailPreview() {
  const article = articles.find((item) => item.id === emailArticleId);
  if (!article) return;

  els.emailPreview.textContent = buildEmailBody(article, els.emailNoteInput.value.trim());
}

function sendArticleEmail() {
  if (!isAdmin()) return;
  const article = articles.find((item) => item.id === emailArticleId);
  if (!article) return;

  const recipient = els.emailRecipientInput.value.trim();
  const subject = els.emailSubjectInput.value.trim() || `Mall Knowledge Article: ${article.title}`;
  const body = buildEmailBody(article, els.emailNoteInput.value.trim());
  const href = `mailto:${encodeURIComponent(recipient)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

  window.location.href = href;
  trackUsage("email_draft", { articleId: article.id, articleTitle: article.title });
  closeEmailDialog();
  showToast("Email draft opened");
}

function buildEmailBody(article, note = "") {
  const attachmentLines = article.attachments.length
    ? article.attachments
        .map((attachment, index) => `${index + 1}. ${attachment.name} (${fileKindLabel(attachment)}, ${formatBytes(attachment.size)})`)
        .join("\n")
    : "No attachments listed.";

  const tagLine = article.tags.length ? article.tags.join(", ") : "No tags";
  const optionalNote = note ? `\nMessage from sender:\n${note}\n` : "";

  return [
    "Dear Team,",
    "",
    "Please find below the requested mall knowledge article for your reference.",
    optionalNote,
    "ARTICLE DETAILS",
    "---------------",
    `Title: ${article.title}`,
    `Category: ${article.category}`,
    `Status: ${article.status}`,
    `Priority: ${article.priority}`,
    `Owner: ${article.owner}`,
    `Audience: ${article.audience}`,
    `Last Updated: ${formatDate(article.updatedAt)}`,
    `Tags: ${tagLine}`,
    "",
    "SUMMARY",
    "-------",
    article.summary,
    "",
    "PROCEDURE",
    "---------",
    article.body,
    "",
    "ATTACHMENTS",
    "-----------",
    attachmentLines,
    "",
    "Regards,",
    "Mall Operations Knowledge Management",
  ]
    .filter((line) => line !== undefined)
    .join("\n");
}

function initializeAssistant() {
  if (assistantHistory.length) return;
  resetAssistantHistory();
}

function resetAssistantHistory() {
  assistantHistory.length = 0;
  assistantHistory.push({
    role: "assistant",
    content: "Ask me about mall procedures, owners, categories, status, or article attachments.",
  });
  renderAssistantMessages();
}

function renderAssistantMessages() {
  els.assistantMessages.innerHTML = assistantHistory
    .map(
      (message) => `
        <div class="assistant-message ${message.role === "user" ? "user" : "assistant"}">
          <strong>${message.role === "user" ? "You" : "Assistant"}</strong>
          <p>${escapeHtml(message.content)}</p>
          ${message.matches?.length ? `<ul>${message.matches.map((match) => `<li>${escapeHtml(match)}</li>`).join("")}</ul>` : ""}
        </div>
      `,
    )
    .join("");
  els.assistantMessages.scrollTop = els.assistantMessages.scrollHeight;
}

function answerAssistantQuestion(question) {
  const terms = tokenize(question);

  if (!terms.length) {
    return {
      content: "Enter a procedure, category, department, owner, or attachment name and I will search the knowledge library.",
    };
  }

  const scored = articles
    .map((article) => {
      const attachmentText = article.attachments.map((attachment) => `${attachment.name} ${attachment.originalName}`).join(" ");
      const haystack = [
        article.title,
        article.category,
        article.status,
        article.priority,
        article.audience,
        article.owner,
        article.summary,
        article.body,
        article.tags.join(" "),
        attachmentText,
      ]
        .join(" ")
        .toLowerCase();
      const score = terms.reduce((total, term) => total + (haystack.includes(term) ? 1 : 0), 0);
      return { article, score };
    })
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score || new Date(b.article.updatedAt) - new Date(a.article.updatedAt));

  if (!scored.length) {
    return {
      content: "I could not find a close article match. Try a department, procedure name, incident type, tenant topic, or attachment name.",
    };
  }

  const top = scored[0].article;
  selectedArticleId = top.id;
  render();

  const attachmentLine = top.attachments.length
    ? ` It has ${top.attachments.length} attachment${top.attachments.length === 1 ? "" : "s"}: ${top.attachments.map((attachment) => attachment.name).join(", ")}.`
    : " It has no attachments yet.";

  return {
    content: `${top.title}: ${top.summary} Procedure: ${top.body}${attachmentLine}`,
    matches: scored.slice(0, 3).map(({ article }) => `${article.title} · ${article.category} · ${article.owner}`),
  };
}

function tokenize(value) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter((term) => term.length > 2 && !["the", "and", "for", "with", "about", "what", "how"].includes(term));
}

els.loginForm.addEventListener("submit", (event) => {
  event.preventDefault();
  els.loginError.textContent = "";
  const username = els.usernameInput.value.trim();
  const password = els.passwordInput.value;
  const account = findAccount(username, password);

  if (!account) {
    els.loginError.textContent = "Invalid username or password.";
    return;
  }

  pendingAccount = account;
  generateOtp();
  els.loginForm.classList.add("hidden");
  els.otpForm.classList.remove("hidden");
  els.otpInput.focus();
  showToast("OTP email draft opened");
});

els.otpForm.addEventListener("submit", (event) => {
  event.preventDefault();
  els.otpError.textContent = "";

  if (els.otpInput.value.trim() !== currentOtp) {
    els.otpError.textContent = "Incorrect OTP code.";
    return;
  }

  if (!pendingAccount) {
    els.otpError.textContent = "Session expired. Please sign in again.";
    showLogin();
    return;
  }

  setSession(pendingAccount);
  showDashboard(pendingAccount);
  trackUsage("login");
  showToast("Access verified");
});

els.backToLoginButton.addEventListener("click", showLogin);
els.logoutButton.addEventListener("click", () => {
  clearSession();
  showLogin();
  showToast("Signed out");
});

els.searchInput.addEventListener("input", () => {
  render();
  scheduleSearchUsage();
});
els.categoryFilter.addEventListener("change", render);
els.statusFilter.addEventListener("change", render);
els.newArticleButton.addEventListener("click", () => openArticleDialog());

els.articleTableBody.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-action]");
  if (!button) return;
  const { action, id } = button.dataset;
  if (action === "select") {
    selectedArticleId = id;
    trackUsage("article_view", { articleId: id, articleTitle: articles.find((article) => article.id === id)?.title || "" });
    render();
  }
  if (action === "edit") openArticleDialog(id);
  if (action === "delete") deleteArticle(id);
});

els.detailPanel.addEventListener("click", (event) => {
  const attachmentButton = event.target.closest("button[data-attachment-action]");
  if (attachmentButton) {
    viewAttachment(selectedArticleId, attachmentButton.dataset.id);
    return;
  }

  const button = event.target.closest("button[data-detail-action]");
  if (!button) return;
  const { detailAction, id } = button.dataset;
  if (detailAction === "edit") openArticleDialog(id);
  if (detailAction === "attachments") openAttachmentDialog(id);
  if (detailAction === "email") openEmailDialog(id);
  if (detailAction === "delete") deleteArticle(id);
});

els.articleForm.addEventListener("submit", (event) => {
  event.preventDefault();
  saveArticleFromForm();
});

els.assistantForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const question = els.assistantInput.value.trim();
  if (!question) return;

  assistantHistory.push({ role: "user", content: question });
  assistantHistory.push({ role: "assistant", ...answerAssistantQuestion(question) });
  trackUsage("assistant_query", { query: question });
  els.assistantInput.value = "";
  renderAssistantMessages();
});

els.clearAssistantHistoryButton.addEventListener("click", () => {
  resetAssistantHistory();
  els.assistantInput.value = "";
  showToast("Assistant history cleared");
});

els.clearUsageButton.addEventListener("click", () => {
  if (!isAdmin()) return;
  localStorage.removeItem(USAGE_KEY);
  renderAdminDashboard();
  showToast("Usage report cleared");
});

els.emailForm.addEventListener("submit", (event) => {
  event.preventDefault();
  sendArticleEmail();
});
els.emailNoteInput.addEventListener("input", updateEmailPreview);
els.emailSubjectInput.addEventListener("input", updateEmailPreview);
els.closeEmailDialogButton.addEventListener("click", closeEmailDialog);
els.cancelEmailButton.addEventListener("click", closeEmailDialog);

els.closeDialogButton.addEventListener("click", closeArticleDialog);
els.cancelDialogButton.addEventListener("click", closeArticleDialog);
els.deleteFromDialogButton.addEventListener("click", () => deleteArticle(els.articleIdInput.value));
els.closeDeleteDialogButton.addEventListener("click", closeDeleteDialog);
els.cancelDeleteButton.addEventListener("click", closeDeleteDialog);
els.confirmDeleteButton.addEventListener("click", confirmDeleteArticle);
els.closeAttachmentDialogButton.addEventListener("click", closeAttachmentDialog);
els.resetAttachmentFormButton.addEventListener("click", resetAttachmentForm);
els.attachmentForm.addEventListener("submit", (event) => {
  event.preventDefault();
  saveAttachmentFromForm();
});
els.attachmentList.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-attachment-manager-action]");
  if (!button) return;
  const { attachmentManagerAction, id } = button.dataset;
  if (attachmentManagerAction === "view") viewAttachment(attachmentArticleId, id);
  if (attachmentManagerAction === "edit") editAttachment(id);
  if (attachmentManagerAction === "delete") deleteAttachment(id);
});

const session = getSession();
const sessionAccount = accountFromSession(session);
if (sessionAccount) {
  showDashboard(sessionAccount);
} else {
  showLogin();
}
