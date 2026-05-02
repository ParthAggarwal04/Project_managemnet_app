const API = '/api';
let token = localStorage.getItem('token');
let projectsCache = [];

const headers = () => ({ 'Content-Type': 'application/json', Authorization: `Bearer ${token}` });
const toast = msg => { const t = document.getElementById('toast'); t.textContent = msg; t.style.display = 'block'; setTimeout(() => t.style.display = 'none', 3000); };

async function request(url, options = {}) {
  const res = await fetch(url, options);
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.message || 'Request failed');
  return data;
}

async function signup() {
  try {
    const body = {
      name: signupName.value,
      email: signupEmail.value,
      password: signupPassword.value
    };
    const data = await request(`${API}/auth/signup`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
    token = data.token; localStorage.setItem('token', token); await init();
  } catch (e) { toast(e.message); }
}

async function login() {
  try {
    const body = { email: loginEmail.value, password: loginPassword.value };
    const data = await request(`${API}/auth/login`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
    token = data.token; localStorage.setItem('token', token); await init();
  } catch (e) { toast(e.message); }
}

logoutBtn.onclick = () => { localStorage.removeItem('token'); token = null; location.reload(); };

async function init() {
  if (!token) return;
  authSection.classList.add('hidden');
  appSection.classList.remove('hidden');
  logoutBtn.classList.remove('hidden');
  await loadProjects();
  await loadDashboard();
}

async function createProject() {
  try {
    await request(`${API}/projects`, { method: 'POST', headers: headers(), body: JSON.stringify({ name: projectName.value, description: projectDescription.value }) });
    projectName.value = ''; projectDescription.value = '';
    await init(); toast('Project created');
  } catch (e) { toast(e.message); }
}

async function loadProjects() {
  projectsCache = await request(`${API}/projects`, { headers: headers() });
  projectsList.innerHTML = projectsCache.map(p => `
    <div class="item">
      <strong>${p.name}</strong><br />
      <span>${p.description || 'No description'}</span><br />
      <span class="badge">Members: ${p.members.length}</span>
      ${p.members.map(m => `<span class="badge">${m.user.name} - ${m.role}</span>`).join('')}
    </div>`).join('') || '<p>No projects yet.</p>';
  const opts = projectsCache.map(p => `<option value="${p._id}">${p.name}</option>`).join('');
  memberProject.innerHTML = opts; taskProject.innerHTML = opts;
  await loadProjectMembers();
}

async function loadProjectMembers() {
  const projectId = taskProject.value;
  if (!projectId) return taskAssignee.innerHTML = '';
  const data = await request(`${API}/projects/${projectId}`, { headers: headers() });
  taskAssignee.innerHTML = data.project.members.map(m => `<option value="${m.user._id}">${m.user.name} (${m.role})</option>`).join('');
}

async function addMember() {
  try {
    await request(`${API}/projects/${memberProject.value}/members`, { method: 'POST', headers: headers(), body: JSON.stringify({ email: memberEmail.value, role: memberRole.value }) });
    memberEmail.value = ''; await loadProjects(); toast('Member added');
  } catch (e) { toast(e.message); }
}

async function createTask() {
  try {
    await request(`${API}/tasks`, { method: 'POST', headers: headers(), body: JSON.stringify({
      project: taskProject.value,
      title: taskTitle.value,
      description: taskDescription.value,
      assignedTo: taskAssignee.value,
      priority: taskPriority.value,
      dueDate: taskDueDate.value
    }) });
    taskTitle.value = ''; taskDescription.value = ''; taskDueDate.value = '';
    await loadDashboard(); toast('Task created');
  } catch (e) { toast(e.message); }
}

async function updateStatus(taskId, status) {
  try {
    await request(`${API}/tasks/${taskId}/status`, { method: 'PATCH', headers: headers(), body: JSON.stringify({ status }) });
    await loadDashboard(); toast('Status updated');
  } catch (e) { toast(e.message); }
}

async function loadDashboard() {
  const data = await request(`${API}/dashboard`, { headers: headers() });
  dashboardCards.innerHTML = Object.entries(data.stats).map(([k, v]) => `<div class="metric"><strong>${v}</strong><span>${k}</span></div>`).join('');
  tasksList.innerHTML = data.tasks.map(t => {
    const overdue = t.status !== 'Completed' && new Date(t.dueDate) < new Date();
    return `<div class="item">
      <strong>${t.title}</strong> <span class="badge ${t.status === 'Completed' ? 'completed' : ''}">${t.status}</span> ${overdue ? '<span class="badge overdue">Overdue</span>' : ''}<br />
      <span>${t.project.name} • Assigned to ${t.assignedTo.name} • Due ${new Date(t.dueDate).toLocaleDateString()}</span><br />
      <select onchange="updateStatus('${t._id}', this.value)">
        ${['Todo','In Progress','Completed'].map(s => `<option ${s === t.status ? 'selected' : ''}>${s}</option>`).join('')}
      </select>
    </div>`;
  }).join('') || '<p>No tasks yet.</p>';
}

init().catch(() => localStorage.removeItem('token'));
