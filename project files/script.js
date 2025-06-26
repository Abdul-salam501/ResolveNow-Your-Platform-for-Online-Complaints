// DOM Elements
const registerForm = document.getElementById('registerForm');
const loginForm = document.getElementById('loginForm');
const complaintForm = document.getElementById('complaintForm');
const logoutBtn = document.getElementById('logoutBtn');

// API Base URL
const API_BASE_URL = 'http://localhost:5000/api';

// Register User
if (registerForm) {
  registerForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    
    try {
      const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email, password })
      });
      
      const data = await response.json();
      
      if (response.ok) {
        // Save token to localStorage and redirect
        localStorage.setItem('token', data.token);
        window.location.href = 'dashboard.html';
      } else {
        alert(data.msg || 'Registration failed');
      }
    } catch (err) {
      console.error('Error:', err);
      alert('An error occurred during registration');
    }
  });
}

// Login User
if (loginForm) {
  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });
      
      const data = await response.json();
      
      if (response.ok) {
        // Save token to localStorage and redirect
        localStorage.setItem('token', data.token);
        
        // Check if user is admin
        const user = await getUserProfile();
        if (user.role === 'admin') {
          window.location.href = 'admin.html';
        } else {
          window.location.href = 'dashboard.html';
        }
      } else {
        alert(data.msg || 'Login failed');
      }
    } catch (err) {
      console.error('Error:', err);
      alert('An error occurred during login');
    }
  });
}

// Submit Complaint
if (complaintForm) {
  complaintForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const title = document.getElementById('title').value;
    const category = document.getElementById('category').value;
    const description = document.getElementById('description').value;
    const attachments = document.getElementById('attachments').files;
    
    const formData = new FormData();
    formData.append('title', title);
    formData.append('category', category);
    formData.append('description', description);
    
    for (let i = 0; i < attachments.length; i++) {
      formData.append('attachments', attachments[i]);
    }
    
    try {
      const token = localStorage.getItem('token');
      
      const response = await fetch(`${API_BASE_URL}/complaints`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      });
      
      const data = await response.json();
      
      if (response.ok) {
        alert('Complaint submitted successfully');
        window.location.href = 'dashboard.html';
      } else {
        alert(data.msg || 'Failed to submit complaint');
      }
    } catch (err) {
      console.error('Error:', err);
      alert('An error occurred while submitting complaint');
    }
  });
}

// Logout User
if (logoutBtn) {
  logoutBtn.addEventListener('click', (e) => {
    e.preventDefault();
    localStorage.removeItem('token');
    window.location.href = 'index.html';
  });
}

// Get User Profile
async function getUserProfile() {
  try {
    const token = localStorage.getItem('token');
    
    const response = await fetch(`${API_BASE_URL}/auth/me`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    
    const data = await response.json();
    
    if (response.ok) {
      return data;
    } else {
      console.error(data.msg);
      return null;
    }
  } catch (err) {
    console.error('Error:', err);
    return null;
  }
}

// Load User Complaints
async function loadUserComplaints() {
  try {
    const token = localStorage.getItem('token');
    
    const response = await fetch(`${API_BASE_URL}/complaints`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    
    const data = await response.json();
    
    if (response.ok) {
      const complaintsTable = document.getElementById('complaintsTable');
      complaintsTable.innerHTML = '';
      
      data.forEach(complaint => {
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${complaint._id.substring(0, 6)}</td>
          <td>${complaint.title}</td>
          <td>${complaint.category}</td>
          <td><span class="badge bg-${getStatusClass(complaint.status)}">${complaint.status}</span></td>
          <td>${new Date(complaint.createdAt).toLocaleDateString()}</td>
          <td>
            <button class="btn btn-sm btn-primary view-complaint" data-id="${complaint._id}">View</button>
          </td>
        `;
        complaintsTable.appendChild(row);
      });
      
      // Add event listeners to view buttons
      document.querySelectorAll('.view-complaint').forEach(button => {
        button.addEventListener('click', (e) => {
          const complaintId = e.target.getAttribute('data-id');
          viewComplaintDetails(complaintId);
        });
      });
    } else {
      console.error(data.msg);
    }
  } catch (err) {
    console.error('Error:', err);
  }
}

// Load All Complaints (Admin)
async function loadAllComplaints(status = 'all') {
  try {
    const token = localStorage.getItem('token');
    
    const url = status === 'all' 
      ? `${API_BASE_URL}/admin/complaints` 
      : `${API_BASE_URL}/admin/complaints?status=${status}`;
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    
    const data = await response.json();
    
    if (response.ok) {
      const allComplaintsTable = document.getElementById('allComplaintsTable');
      allComplaintsTable.innerHTML = '';
      
      // Update counters
      document.getElementById('totalComplaints').textContent = data.length;
      document.getElementById('pendingComplaints').textContent = 
        data.filter(c => c.status === 'Pending').length;
      document.getElementById('rejectedComplaints').textContent = 
        data.filter(c => c.status === 'Rejected').length;
      
      data.forEach(complaint => {
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${complaint._id.substring(0, 6)}</td>
          <td>${complaint.title}</td>
          <td>${complaint.user.name}</td>
          <td>${complaint.category}</td>
          <td><span class="badge bg-${getStatusClass(complaint.status)}">${complaint.status}</span></td>
          <td>${complaint.assignedTo ? complaint.assignedTo.name : 'Not assigned'}</td>
          <td>${new Date(complaint.createdAt).toLocaleDateString()}</td>
          <td>
            <button class="btn btn-sm btn-primary view-complaint" data-id="${complaint._id}">View</button>
            <button class="btn btn-sm btn-success edit-complaint" data-id="${complaint._id}">Edit</button>
          </td>
        `;
        allComplaintsTable.appendChild(row);
      });
      
      // Add event listeners to view buttons
      document.querySelectorAll('.view-complaint').forEach(button => {
        button.addEventListener('click', (e) => {
          const complaintId = e.target.getAttribute('data-id');
          viewComplaintDetails(complaintId);
        });
      });
      
      // Add event listeners to edit buttons
      document.querySelectorAll('.edit-complaint').forEach(button => {
        button.addEventListener('click', (e) => {
          const complaintId = e.target.getAttribute('data-id');
          editComplaint(complaintId);
        });
      });
    } else {
      console.error(data.msg);
    }
  } catch (err) {
    console.error('Error:', err);
  }
}

// View Complaint Details
async function viewComplaintDetails(complaintId) {
  try {
    const token = localStorage.getItem('token');
    
    const response = await fetch(`${API_BASE_URL}/complaints/${complaintId}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    
    const data = await response.json();
    
    if (response.ok) {
      const modalContent = document.getElementById('complaintDetailsContent');
      modalContent.innerHTML = `
        <h4>${data.title}</h4>
        <p><strong>Category:</strong> ${data.category}</p>
        <p><strong>Status:</strong> <span class="badge bg-${getStatusClass(data.status)}">${data.status}</span></p>
        <p><strong>Submitted on:</strong> ${new Date(data.createdAt).toLocaleString()}</p>
        ${data.updatedAt ? `<p><strong>Last updated:</strong> ${new Date(data.updatedAt).toLocaleString()}</p>` : ''}
        ${data.assignedTo ? `<p><strong>Assigned to:</strong> ${data.assignedTo.name}</p>` : ''}
        ${data.resolution ? `<p><strong>Resolution:</strong> ${data.resolution}</p>` : ''}
        
        <h5 class="mt-4">Description</h5>
        <p>${data.description}</p>
        
        ${data.attachments && data.attachments.length > 0 ? `
          <h5 class="mt-4">Attachments</h5>
          <div class="row">
            ${data.attachments.map(attachment => `
              <div class="col-md-3 mb-3">
                <img src="${attachment}" alt="Attachment" class="img-thumbnail">
              </div>
            `).join('')}
          </div>
        ` : ''}
      `;
      
      // Show modal
      const modal = new bootstrap.Modal(document.getElementById('complaintDetailsModal'));
      modal.show();
    } else {
      console.error(data.msg);
    }
  } catch (err) {
    console.error('Error:', err);
  }
}

// Edit Complaint (Admin)
async function editComplaint(complaintId) {
  try {
    const token = localStorage.getItem('token');
    
    // First get the complaint details
    const response = await fetch(`${API_BASE_URL}/complaints/${complaintId}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    
    const data = await response.json();
    
    if (response.ok) {
      // Create edit form in modal
      const modalContent = document.getElementById('complaintDetailsContent');
      modalContent.innerHTML = `
        <form id="editComplaintForm">
          <input type="hidden" id="editComplaintId" value="${data._id}">
          
          <div class="mb-3">
            <label class="form-label">Title</label>
            <input type="text" class="form-control" value="${data.title}" disabled>
          </div>
          
          <div class="mb-3">
            <label class="form-label">Status</label>
            <select class="form-select" id="editStatus">
              <option value="Pending" ${data.status === 'Pending' ? 'selected' : ''}>Pending</option>
              <option value="In Progress" ${data.status === 'In Progress' ? 'selected' : ''}>In Progress</option>
              <option value="Resolved" ${data.status === 'Resolved' ? 'selected' : ''}>Resolved</option>
              <option value="Rejected" ${data.status === 'Rejected' ? 'selected' : ''}>Rejected</option>
            </select>
          </div>
          
          <div class="mb-3">
            <label class="form-label">Assigned To</label>
            <select class="form-select" id="editAssignedTo">
              <option value="">Not assigned</option>
              <!-- Agents will be loaded here -->
            </select>
          </div>
          
          <div class="mb-3">
            <label class="form-label">Resolution</label>
            <textarea class="form-control" id="editResolution" rows="3">${data.resolution || ''}</textarea>
          </div>
          
          <button type="submit" class="btn btn-primary">Save Changes</button>
        </form>
      `;
      
      // Load agents for assignment
      await loadAgentsForAssignment();
      
      // Set currently assigned agent if any
      if (data.assignedTo) {
        document.getElementById('editAssignedTo').value = data.assignedTo._id;
      }
      
      // Add form submit handler
      document.getElementById('editComplaintForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const status = document.getElementById('editStatus').value;
        const assignedTo = document.getElementById('editAssignedTo').value;
        const resolution = document.getElementById('editResolution').value;
        
        try {
          const updateResponse = await fetch(`${API_BASE_URL}/admin/complaints/${data._id}`, {
            method: 'PUT',
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ status, assignedTo, resolution })
          });
          
          const updateData = await updateResponse.json();
          
          if (updateResponse.ok) {
            alert('Complaint updated successfully');
            loadAllComplaints();
            bootstrap.Modal.getInstance(document.getElementById('complaintDetailsModal')).hide();
          } else {
            alert(updateData.msg || 'Failed to update complaint');
          }
        } catch (err) {
          console.error('Error:', err);
          alert('An error occurred while updating complaint');
        }
      });
      
      // Show modal
      const modal = new bootstrap.Modal(document.getElementById('complaintDetailsModal'));
      modal.show();
    } else {
      console.error(data.msg);
    }
  } catch (err) {
    console.error('Error:', err);
  }
}

// Load Agents for Assignment
async function loadAgentsForAssignment() {
  try {
    const token = localStorage.getItem('token');
    
    const response = await fetch(`${API_BASE_URL}/admin/agents`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    
    const data = await response.json();
    
    if (response.ok) {
      const select = document.getElementById('editAssignedTo');
      
      data.forEach(agent => {
        const option = document.createElement('option');
        option.value = agent._id;
        option.textContent = agent.name;
        select.appendChild(option);
      });
    } else {
      console.error(data.msg);
    }
  } catch (err) {
    console.error('Error:', err);
  }
}

// Get Status Class for Styling
function getStatusClass(status) {
  switch (status) {
    case 'Pending':
      return 'warning';
    case 'In Progress':
      return 'info';
    case 'Resolved':
      return 'success';
    case 'Rejected':
      return 'danger';
    default:
      return 'secondary';
  }
}

// Initialize Dashboard
async function initDashboard() {
  const token = localStorage.getItem('token');
  
  if (!token) {
    window.location.href = 'login.html';
    return;
  }
  
  try {
    const user = await getUserProfile();
    
    if (user) {
      // Set user name in dashboard
      if (document.getElementById('userName')) {
        document.getElementById('userName').textContent = user.name;
      }
      
      if (document.getElementById('adminName')) {
        document.getElementById('adminName').textContent = user.name;
      }
      
      // Load appropriate content based on role
      if (window.location.pathname.includes('dashboard.html')) {
        loadUserComplaints();
      } else if (window.location.pathname.includes('admin.html')) {
        loadAllComplaints();
        
        // Add filter event listeners
        document.querySelectorAll('[data-status]').forEach(item => {
          item.addEventListener('click', (e) => {
            e.preventDefault();
            const status = e.target.getAttribute('data-status');
            loadAllComplaints(status);
          });
        });
      }
    } else {
      window.location.href = 'login.html';
    }
  } catch (err) {
    console.error('Error:', err);
    window.location.href = 'login.html';
  }
}

// Check authentication on page load
if (window.location.pathname.includes('dashboard.html') || 
    window.location.pathname.includes('complaint.html') || 
    window.location.pathname.includes('admin.html')) {
  document.addEventListener('DOMContentLoaded', initDashboard);
}