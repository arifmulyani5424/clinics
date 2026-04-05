const fs = require('fs');

let content = fs.readFileSync('src/App.jsx', 'utf8');

// Update pageTitles
content = content.replace(
  /settings:\s*'Master Data',([\r\n\s]*)\};/g,
  "settings: 'Master Data',\n    ipd: 'Inpatient Department (IPD)',\n    lab: 'Lab Management',\n    pharmacy: 'Pharmacy Module',\n  };"
);

// Update sidebar items
content = content.replace(
  /(<IconCalendarEvent \/>.*?Appointments<\/span>[\r\n\s]*<\/div>)/,
  `$1\n\n          {['Admin', 'Doctor', 'Receptionist'].includes(currentUser.role) && (\n            <>\n              <div className={\`nav-item \${activeTab === 'ipd' ? 'active' : ''}\`} onClick={() => { setActiveTab('ipd'); setIsMobileSidebarOpen(false); }} title={isSidebarCollapsed ? "IPD/Wards" : ""}>\n                <IconBed /> <span className="nav-text">IPD / Wards</span>\n              </div>\n              <div className={\`nav-item \${activeTab === 'lab' ? 'active' : ''}\`} onClick={() => { setActiveTab('lab'); setIsMobileSidebarOpen(false); }} title={isSidebarCollapsed ? "Laboratory" : ""}>\n                <IconFlask /> <span className="nav-text">Laboratory</span>\n              </div>\n              <div className={\`nav-item \${activeTab === 'pharmacy' ? 'active' : ''}\`} onClick={() => { setActiveTab('pharmacy'); setIsMobileSidebarOpen(false); }} title={isSidebarCollapsed ? "Pharmacy" : ""}>\n                <IconPill /> <span className="nav-text">Pharmacy</span>\n              </div>\n            </>\n          )}`
);

// Update render tab logic
content = content.replace(
  /(\{activeTab === 'doctors' && \([\s\r\n]*<DoctorManagement)/g,
  `{activeTab === 'ipd' && (\n            <IPDModule\n              getWards={getWards}\n              getBeds={getBeds}\n              saveBed={saveBed}\n              getAdmissions={getAdmissions}\n              admitPatient={admitPatient}\n              dischargePatient={dischargePatient}\n              getDoctors={getDoctors}\n              getPatients={getPatients}\n              getAdmissionById={getAdmissionById}\n              getIPDRatePresets={getIPDRatePresets}\n              getAdmissionBillingItems={getAdmissionBillingItems}\n              addBillingItem={addBillingItem}\n              removeBillingItem={removeBillingItem}\n              getIPDPayments={getIPDPayments}\n              recordIPDPayment={recordIPDPayment}\n              updatePatientStatus={updatePatientStatus}\n              updateAdmissionNotes={updateAdmissionNotes}\n            />\n          )}\n\n          {activeTab === 'lab' && (\n            <LabModule\n              getLabCatalog={getLabCatalog}\n              saveLabCatalogItem={saveLabCatalogItem}\n              getLabResults={getLabResults}\n              saveLabResult={saveLabResult}\n              updateLabResult={updateLabResult}\n              getPatients={getPatients}\n              getDoctors={getDoctors}\n              currentUser={currentUser}\n            />\n          )}\n\n          {activeTab === 'pharmacy' && (\n            <PharmacyModule\n              getPharmacyInventory={getPharmacyInventory}\n              saveInventoryItem={saveInventoryItem}\n              updateInventoryItem={updateInventoryItem}\n              deleteInventoryItem={deleteInventoryItem}\n              recordPharmacySale={recordPharmacySale}\n              getPharmacySales={getPharmacySales}\n            />\n          )}\n\n          $1`
);

// Remove duplicates icons at bottom
const bottomIconsRegex = /\/\/ Dashboard Icons[\s\S]*?(?=\/\/ Dashboard Component — E-Educate style)/g;
content = content.replace(bottomIconsRegex, '');

fs.writeFileSync('src/App.jsx', content, 'utf8');
console.log('Patched App.jsx successfully!');
