import React, { useState } from 'react';
import { FileDown, Download, Plus, Minus, Eye, Edit3, Users, Calendar, Target, Shield, Zap, BookOpen, AlertTriangle, CheckCircle } from 'lucide-react';

const TestPlanGenerator = () => {
  const [testPlan, setTestPlan] = useState({
    projectName: '',
    version: '1.0',
    preparedBy: '',
    reviewedBy: '',
    approvedBy: '',
    date: new Date().toISOString().split('T')[0],
    introduction: '',
    testObjectives: [''],
    scope: {
      inScope: [''],
      outOfScope: ['']
    },
    testStrategy: '',
    testEnvironment: '',
    testData: '',
    entryExitCriteria: {
      entry: [''],
      exit: ['']
    },
    testDeliverables: [''],
    riskAssessment: [
      { risk: '', probability: 'Medium', impact: 'Medium', mitigation: '' }
    ],
    testTypes: {
      functional: false,
      integration: false,
      system: false,
      performance: false,
      security: false,
      usability: false,
      regression: false,
      acceptance: false
    },
    automationStrategy: '',
    schedule: [
      { phase: 'Test Planning', startDate: '', endDate: '', responsible: '', status: 'Planned' },
      { phase: 'Test Design', startDate: '', endDate: '', responsible: '', status: 'Planned' },
      { phase: 'Test Execution', startDate: '', endDate: '', responsible: '', status: 'Planned' },
      { phase: 'Test Closure', startDate: '', endDate: '', responsible: '', status: 'Planned' }
    ],
    resources: {
      testManager: '',
      testLead: '',
      testEngineers: [''],
      tools: [''],
      budget: '',
      hardware: [''],
      software: ['']
    },
    assumptions: [''],
    dependencies: [''],
    approvalSignoffs: [
      { role: 'Test Manager', name: '', date: '', signature: 'Pending' },
      { role: 'Project Manager', name: '', date: '', signature: 'Pending' },
      { role: 'QA Lead', name: '', date: '', signature: 'Pending' }
    ]
  });

  const [activeSection, setActiveSection] = useState('basic');
  const [previewMode, setPreviewMode] = useState(false);

  const handleInputChange = (field, value) => {
    setTestPlan(prev => ({ ...prev, [field]: value }));
  };

  const handleArrayChange = (field, index, value) => {
    setTestPlan(prev => ({
      ...prev,
      [field]: prev[field].map((item, i) => i === index ? value : item)
    }));
  };

  const handleObjectArrayChange = (field, index, key, value) => {
    setTestPlan(prev => ({
      ...prev,
      [field]: prev[field].map((item, i) => 
        i === index ? { ...item, [key]: value } : item
      )
    }));
  };

  const handleNestedArrayChange = (parentField, childField, index, value) => {
    setTestPlan(prev => ({
      ...prev,
      [parentField]: {
        ...prev[parentField],
        [childField]: prev[parentField][childField].map((item, i) => i === index ? value : item)
      }
    }));
  };

  const handleNestedObjectChange = (parentField, childField, value) => {
    setTestPlan(prev => ({
      ...prev,
      [parentField]: {
        ...prev[parentField],
        [childField]: value
      }
    }));
  };

  const addArrayItem = (field) => {
    setTestPlan(prev => ({
      ...prev,
      [field]: [...prev[field], '']
    }));
  };

  const addObjectArrayItem = (field, template) => {
    setTestPlan(prev => ({
      ...prev,
      [field]: [...prev[field], template]
    }));
  };

  const removeArrayItem = (field, index) => {
    setTestPlan(prev => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index)
    }));
  };

  const addNestedArrayItem = (parentField, childField) => {
    setTestPlan(prev => ({
      ...prev,
      [parentField]: {
        ...prev[parentField],
        [childField]: [...prev[parentField][childField], '']
      }
    }));
  };

  const removeNestedArrayItem = (parentField, childField, index) => {
    setTestPlan(prev => ({
      ...prev,
      [parentField]: {
        ...prev[parentField],
        [childField]: prev[parentField][childField].filter((_, i) => i !== index)
      }
    }));
  };

  const generatePDF = () => {
    const printContent = document.getElementById('test-plan-preview').innerHTML;
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
      <html>
        <head>
          <title>Test Plan - ${testPlan.projectName}</title>
          <style>
            body { 
              font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; 
              margin: 20px; 
              line-height: 1.6; 
              color: #333;
            }
            .header { text-align: center; margin-bottom: 40px; }
            h1 { 
              color: #1e40af; 
              border-bottom: 3px solid #3b82f6; 
              padding-bottom: 15px; 
              font-size: 28px;
              text-transform: uppercase;
              letter-spacing: 1px;
            }
            h2 { 
              color: #1e40af; 
              margin-top: 35px; 
              font-size: 20px;
              border-left: 4px solid #3b82f6;
              padding-left: 15px;
            }
            h3 { 
              color: #1e3a8a; 
              font-size: 16px;
              margin-top: 25px;
            }
            table { 
              width: 100%; 
              border-collapse: collapse; 
              margin: 20px 0; 
              box-shadow: 0 2px 8px rgba(0,0,0,0.1);
            }
            th, td { 
              border: 1px solid #e5e7eb; 
              padding: 12px; 
              text-align: left; 
            }
            th { 
              background: linear-gradient(135deg, #3b82f6, #1e40af);
              color: white;
              font-weight: 600;
            }
            tr:nth-child(even) { background-color: #f8fafc; }
            ul { margin: 10px 0; padding-left: 25px; }
            li { margin: 5px 0; }
            .header-info { 
              display: grid; 
              grid-template-columns: 1fr 1fr; 
              gap: 30px; 
              margin: 30px 0; 
              padding: 25px;
              background: linear-gradient(135deg, #f8fafc, #e2e8f0);
              border-radius: 10px;
              border: 1px solid #cbd5e1;
            }
            .section { 
              margin: 40px 0; 
              page-break-inside: avoid;
            }
            .risk-table th { background: #dc2626; }
            .schedule-table th { background: #059669; }
            .resource-table th { background: #7c3aed; }
            .status-planned { color: #f59e0b; font-weight: bold; }
            .status-progress { color: #3b82f6; font-weight: bold; }
            .status-completed { color: #10b981; font-weight: bold; }
            .priority-high { color: #dc2626; font-weight: bold; }
            .priority-medium { color: #f59e0b; font-weight: bold; }
            .priority-low { color: #10b981; font-weight: bold; }
          </style>
        </head>
        <body>${printContent}</body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
  };

  const generateWordDoc = () => {
    const content = document.getElementById('test-plan-preview').innerHTML;
    const blob = new Blob([`
      <!DOCTYPE html>
      <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
        <head>
          <meta charset="utf-8">
          <title>Test Plan - ${testPlan.projectName}</title>
          <!--[if gte mso 9]>
          <xml>
            <w:WordDocument>
              <w:View>Print</w:View>
              <w:Zoom>90</w:Zoom>
              <w:DoNotPromptForConvert/>
              <w:DoNotShowBalloonComments/>
            </w:WordDocument>
          </xml>
          <![endif]-->
          <style>
            body { font-family: 'Calibri', sans-serif; font-size: 11pt; line-height: 1.4; }
            h1 { color: #1e40af; font-size: 18pt; }
            h2 { color: #1e40af; font-size: 14pt; }
            table { border-collapse: collapse; width: 100%; }
            th, td { border: 1px solid #000; padding: 6pt; }
          </style>
        </head>
        <body>${content}</body>
      </html>
    `], { type: 'application/msword' });
    
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Test_Plan_${testPlan.projectName.replace(/\s+/g, '_')}_v${testPlan.version}.doc`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const renderArrayInput = (field, items, placeholder, onAdd, onRemove, onChange) => (
    <div className="space-y-3">
      {items.map((item, index) => (
        <div key={index} className="flex gap-3 items-center p-3 bg-gray-50 rounded-lg border border-gray-200 hover:border-blue-300 transition-colors">
          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
          <input
            type="text"
            value={item}
            onChange={(e) => onChange(index, e.target.value)}
            placeholder={placeholder}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
          />
          {items.length > 1 && (
            <button
              onClick={() => onRemove(index)}
              className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
              <Minus size={18} />
            </button>
          )}
        </div>
      ))}
      <button
        onClick={onAdd}
        className="flex items-center gap-2 px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors border-2 border-dashed border-blue-300 hover:border-blue-400 w-full justify-center"
      >
        <Plus size={18} /> Add {placeholder.split(' ')[1] || 'Item'}
      </button>
    </div>
  );

  const renderBasicInfo = () => (
    <div className="space-y-8">
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-200">
        <div className="flex items-center gap-3 mb-4">
          <BookOpen className="text-blue-600" size={24} />
          <h3 className="text-lg font-semibold text-blue-800">Project Information</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Project Name *</label>
            <input
              type="text"
              value={testPlan.projectName}
              onChange={(e) => handleInputChange('projectName', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
              placeholder="Enter your project name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Version</label>
            <input
              type="text"
              value={testPlan.version}
              onChange={(e) => handleInputChange('version', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Prepared By</label>
            <input
              type="text"
              value={testPlan.preparedBy}
              onChange={(e) => handleInputChange('preparedBy', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
              placeholder="Test Manager name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
            <input
              type="date"
              value={testPlan.date}
              onChange={(e) => handleInputChange('date', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
            />
          </div>
        </div>
      </div>
      
      <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <Edit3 className="text-green-600" size={24} />
          <h3 className="text-lg font-semibold text-gray-800">Introduction & Overview</h3>
        </div>
        <textarea
          value={testPlan.introduction}
          onChange={(e) => handleInputChange('introduction', e.target.value)}
          rows={5}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
          placeholder="Provide a comprehensive overview of the testing approach, purpose, and project context. Include background information, testing goals, and overall strategy summary..."
        />
      </div>
      
      <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <Target className="text-purple-600" size={24} />
          <h3 className="text-lg font-semibold text-gray-800">Test Objectives</h3>
        </div>
        {renderArrayInput(
          'testObjectives',
          testPlan.testObjectives,
          'Enter specific test objective',
          () => addArrayItem('testObjectives'),
          (index) => removeArrayItem('testObjectives', index),
          (index, value) => handleArrayChange('testObjectives', index, value)
        )}
      </div>

      <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <CheckCircle className="text-indigo-600" size={24} />
          <h3 className="text-lg font-semibold text-gray-800">Test Types</h3>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {Object.entries(testPlan.testTypes).map(([type, checked]) => (
            <label key={type} className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
              <input
                type="checkbox"
                checked={checked}
                onChange={(e) => handleNestedObjectChange('testTypes', type, e.target.checked)}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <span className="text-sm font-medium text-gray-700 capitalize">{type}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );

  const renderScope = () => (
    <div className="space-y-8">
      <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-xl border border-green-200">
        <div className="flex items-center gap-3 mb-6">
          <Target className="text-green-600" size={24} />
          <h3 className="text-lg font-semibold text-green-800">Testing Scope Definition</h3>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-lg border border-green-200">
            <h4 className="font-medium text-green-700 mb-4 flex items-center gap-2">
              <CheckCircle size={18} />
              In Scope
            </h4>
            {renderArrayInput(
              'inScope',
              testPlan.scope.inScope,
              'What will be tested',
              () => addNestedArrayItem('scope', 'inScope'),
              (index) => removeNestedArrayItem('scope', 'inScope', index),
              (index, value) => handleNestedArrayChange('scope', 'inScope', index, value)
            )}
          </div>
          
          <div className="bg-white p-6 rounded-lg border border-red-200">
            <h4 className="font-medium text-red-700 mb-4 flex items-center gap-2">
              <Minus size={18} />
              Out of Scope
            </h4>
            {renderArrayInput(
              'outScope',
              testPlan.scope.outOfScope,
              'What will not be tested',
              () => addNestedArrayItem('scope', 'outOfScope'),
              (index) => removeNestedArrayItem('scope', 'outOfScope', index),
              (index, value) => handleNestedArrayChange('scope', 'outOfScope', index, value)
            )}
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <BookOpen className="text-blue-600" size={24} />
          <h3 className="text-lg font-semibold text-gray-800">Assumptions</h3>
        </div>
        {renderArrayInput(
          'assumptions',
          testPlan.assumptions,
          'Enter project assumption',
          () => addArrayItem('assumptions'),
          (index) => removeArrayItem('assumptions', index),
          (index, value) => handleArrayChange('assumptions', index, value)
        )}
      </div>

      <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <AlertTriangle className="text-orange-600" size={24} />
          <h3 className="text-lg font-semibold text-gray-800">Dependencies</h3>
        </div>
        {renderArrayInput(
          'dependencies',
          testPlan.dependencies,
          'Enter project dependency',
          () => addArrayItem('dependencies'),
          (index) => removeArrayItem('dependencies', index),
          (index, value) => handleArrayChange('dependencies', index, value)
        )}
      </div>
    </div>
  );

  const renderStrategy = () => (
    <div className="space-y-8">
      <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-xl border border-purple-200">
        <div className="flex items-center gap-3 mb-4">
          <Shield className="text-purple-600" size={24} />
          <h3 className="text-lg font-semibold text-purple-800">Test Strategy</h3>
        </div>
        <textarea
          value={testPlan.testStrategy}
          onChange={(e) => handleInputChange('testStrategy', e.target.value)}
          rows={6}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 bg-white"
          placeholder="Describe the overall testing approach, methodologies, test levels, and techniques to be used. Include testing phases, types of testing, and overall strategy..."
        />
      </div>
      
      <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <Zap className="text-yellow-600" size={24} />
          <h3 className="text-lg font-semibold text-gray-800">Automation Strategy</h3>
        </div>
        <textarea
          value={testPlan.automationStrategy}
          onChange={(e) => handleInputChange('automationStrategy', e.target.value)}
          rows={4}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
          placeholder="Define automation approach, tools, frameworks, and scope of automation. Include automation objectives and maintenance strategy..."
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <Settings className="text-gray-600" size={24} />
            <h3 className="text-lg font-semibold text-gray-800">Test Environment</h3>
          </div>
          <textarea
            value={testPlan.testEnvironment}
            onChange={(e) => handleInputChange('testEnvironment', e.target.value)}
            rows={5}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
            placeholder="Describe hardware, software, network configurations, browsers, operating systems, databases..."
          />
        </div>
        
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <Database className="text-green-600" size={24} />
            <h3 className="text-lg font-semibold text-gray-800">Test Data</h3>
          </div>
          <textarea
            value={testPlan.testData}
            onChange={(e) => handleInputChange('testData', e.target.value)}
            rows={5}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
            placeholder="Describe test data requirements, sources, data preparation methods, data privacy considerations..."
          />
        </div>
      </div>
    </div>
  );

  const renderCriteria = () => (
    <div className="space-y-8">
      <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-6 rounded-xl border border-blue-200">
        <div className="flex items-center gap-3 mb-6">
          <CheckCircle className="text-blue-600" size={24} />
          <h3 className="text-lg font-semibold text-blue-800">Entry & Exit Criteria</h3>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-lg border border-green-200">
            <h4 className="font-medium text-green-700 mb-4 flex items-center gap-2">
              <Plus size={18} />
              Entry Criteria
            </h4>
            {renderArrayInput(
              'entryCriteria',
              testPlan.entryExitCriteria.entry,
              'Condition to start testing',
              () => addNestedArrayItem('entryExitCriteria', 'entry'),
              (index) => removeNestedArrayItem('entryExitCriteria', 'entry', index),
              (index, value) => handleNestedArrayChange('entryExitCriteria', 'entry', index, value)
            )}
          </div>
          
          <div className="bg-white p-6 rounded-lg border border-red-200">
            <h4 className="font-medium text-red-700 mb-4 flex items-center gap-2">
              <CheckCircle size={18} />
              Exit Criteria
            </h4>
            {renderArrayInput(
              'exitCriteria',
              testPlan.entryExitCriteria.exit,
              'Condition to complete testing',
              () => addNestedArrayItem('entryExitCriteria', 'exit'),
              (index) => removeNestedArrayItem('entryExitCriteria', 'exit', index),
              (index, value) => handleNestedArrayChange('entryExitCriteria', 'exit', index, value)
            )}
          </div>
        </div>
      </div>
      
      <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <Download className="text-indigo-600" size={24} />
          <h3 className="text-lg font-semibold text-gray-800">Test Deliverables</h3>
        </div>
        {renderArrayInput(
          'testDeliverables',
          testPlan.testDeliverables,
          'Documents or artifacts to be delivered',
          () => addArrayItem('testDeliverables'),
          (index) => removeArrayItem('testDeliverables', index),
          (index, value) => handleArrayChange('testDeliverables', index, value)
        )}
      </div>
    </div>
  );

  const renderRiskSchedule = () => (
    <div className="space-y-8">
      <div className="bg-gradient-to-r from-red-50 to-pink-50 p-6 rounded-xl border border-red-200">
        <div className="flex items-center gap-3 mb-6">
          <AlertTriangle className="text-red-600" size={24} />
          <h3 className="text-lg font-semibold text-red-800">Risk Assessment</h3>
        </div>
        
        <div className="space-y-4">
          {testPlan.riskAssessment.map((risk, index) => (
            <div key={index} className="bg-white p-4 rounded-lg border border-red-200">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Risk Description</label>
                  <input
                    type="text"
                    value={risk.risk}
                    onChange={(e) => handleObjectArrayChange('riskAssessment', index, 'risk', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    placeholder="Describe the risk"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Probability</label>
                  <select
                    value={risk.probability}
                    onChange={(e) => handleObjectArrayChange('riskAssessment', index, 'probability', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Impact</label>
                  <select
                    value={risk.impact}
                    onChange={(e) => handleObjectArrayChange('riskAssessment', index, 'impact', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                  </select>
                </div>
                <div className="flex items-end">
                  {testPlan.riskAssessment.length > 1 && (
                    <button
                      onClick={() => removeArrayItem('riskAssessment', index)}
                      className="px-3 py-2 text-red-600 hover:bg-red-50 rounded-md"
                    >
                      <Minus size={16} />
                    </button>
                  )}
                </div>
              </div>
                              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Mitigation Strategy</label>
                <input
                  type="text"
                  value={risk.mitigation}
                  onChange={(e) => handleObjectArrayChange('riskAssessment', index, 'mitigation', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  placeholder="How to mitigate this risk"
                />
              </div>
            </div>
          ))}
          
          <button
            onClick={() => addObjectArrayItem('riskAssessment', { risk: '', probability: 'Medium', impact: 'Medium', mitigation: '' })}
            className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors border-2 border-dashed border-red-300 hover:border-red-400 w-full justify-center"
          >
            <Plus size={18} /> Add Risk
          </button>
        </div>
      </div>

      <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-xl border border-green-200">
        <div className="flex items-center gap-3 mb-6">
          <Calendar className="text-green-600" size={24} />
          <h3 className="text-lg font-semibold text-green-800">Test Schedule</h3>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full bg-white rounded-lg overflow-hidden shadow-sm">
            <thead className="bg-green-600 text-white">
              <tr>
                <th className="px-4 py-3 text-left font-medium">Phase</th>
                <th className="px-4 py-3 text-left font-medium">Start Date</th>
                <th className="px-4 py-3 text-left font-medium">End Date</th>
                <th className="px-4 py-3 text-left font-medium">Responsible</th>
                <th className="px-4 py-3 text-left font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {testPlan.schedule.map((phase, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium text-gray-900">{phase.phase}</td>
                  <td className="px-4 py-3">
                    <input
                      type="date"
                      value={phase.startDate}
                      onChange={(e) => handleObjectArrayChange('schedule', index, 'startDate', e.target.value)}
                      className="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    />
                  </td>
                  <td className="px-4 py-3">
                    <input
                      type="date"
                      value={phase.endDate}
                      onChange={(e) => handleObjectArrayChange('schedule', index, 'endDate', e.target.value)}
                      className="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    />
                  </td>
                  <td className="px-4 py-3">
                    <input
                      type="text"
                      value={phase.responsible}
                      onChange={(e) => handleObjectArrayChange('schedule', index, 'responsible', e.target.value)}
                      className="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      placeholder="Responsible person"
                    />
                  </td>
                  <td className="px-4 py-3">
                    <select
                      value={phase.status}
                      onChange={(e) => handleObjectArrayChange('schedule', index, 'status', e.target.value)}
                      className="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    >
                      <option value="Planned">Planned</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Completed">Completed</option>
                      <option value="On Hold">On Hold</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderResources = () => (
    <div className="space-y-8">
      <div className="bg-gradient-to-r from-purple-50 to-indigo-50 p-6 rounded-xl border border-purple-200">
        <div className="flex items-center gap-3 mb-6">
          <Users className="text-purple-600" size={24} />
          <h3 className="text-lg font-semibold text-purple-800">Human Resources</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-4 rounded-lg border border-purple-200">
            <label className="block text-sm font-medium text-gray-700 mb-2">Test Manager</label>
            <input
              type="text"
              value={testPlan.resources.testManager}
              onChange={(e) => handleNestedObjectChange('resources', 'testManager', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              placeholder="Test Manager name"
            />
          </div>
          
          <div className="bg-white p-4 rounded-lg border border-purple-200">
            <label className="block text-sm font-medium text-gray-700 mb-2">Test Lead</label>
            <input
              type="text"
              value={testPlan.resources.testLead}
              onChange={(e) => handleNestedObjectChange('resources', 'testLead', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              placeholder="Test Lead name"
            />
          </div>
          
          <div className="bg-white p-4 rounded-lg border border-purple-200">
            <label className="block text-sm font-medium text-gray-700 mb-2">Budget</label>
            <input
              type="text"
              value={testPlan.resources.budget}
              onChange={(e) => handleNestedObjectChange('resources', 'budget', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              placeholder="Testing budget"
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <Users className="text-blue-600" size={20} />
            <h4 className="font-semibold text-gray-800">Test Engineers</h4>
          </div>
          {renderArrayInput(
            'testEngineers',
            testPlan.resources.testEngineers,
            'Test engineer name',
            () => addNestedArrayItem('resources', 'testEngineers'),
            (index) => removeNestedArrayItem('resources', 'testEngineers', index),
            (index, value) => handleNestedArrayChange('resources', 'testEngineers', index, value)
          )}
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <Zap className="text-gray-600" size={20} />
            <h4 className="font-semibold text-gray-800">Tools & Software</h4>
          </div>
          {renderArrayInput(
            'tools',
            testPlan.resources.tools,
            'Tool or software name',
            () => addNestedArrayItem('resources', 'tools'),
            (index) => removeNestedArrayItem('resources', 'tools', index),
            (index, value) => handleNestedArrayChange('resources', 'tools', index, value)
          )}
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <Database className="text-green-600" size={20} />
            <h4 className="font-semibold text-gray-800">Hardware</h4>
          </div>
          {renderArrayInput(
            'hardware',
            testPlan.resources.hardware,
            'Hardware requirement',
            () => addNestedArrayItem('resources', 'hardware'),
            (index) => removeNestedArrayItem('resources', 'hardware', index),
            (index, value) => handleNestedArrayChange('resources', 'hardware', index, value)
          )}
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
        <div className="flex items-center gap-3 mb-6">
          <CheckCircle className="text-green-600" size={24} />
          <h3 className="text-lg font-semibold text-gray-800">Approval Signoffs</h3>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full bg-white rounded-lg overflow-hidden shadow-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-3 text-left font-medium text-gray-700">Role</th>
                <th className="px-4 py-3 text-left font-medium text-gray-700">Name</th>
                <th className="px-4 py-3 text-left font-medium text-gray-700">Date</th>
                <th className="px-4 py-3 text-left font-medium text-gray-700">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {testPlan.approvalSignoffs.map((signoff, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium text-gray-900">{signoff.role}</td>
                  <td className="px-4 py-3">
                    <input
                      type="text"
                      value={signoff.name}
                      onChange={(e) => handleObjectArrayChange('approvalSignoffs', index, 'name', e.target.value)}
                      className="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Person name"
                    />
                  </td>
                  <td className="px-4 py-3">
                    <input
                      type="date"
                      value={signoff.date}
                      onChange={(e) => handleObjectArrayChange('approvalSignoffs', index, 'date', e.target.value)}
                      className="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </td>
                  <td className="px-4 py-3">
                    <select
                      value={signoff.signature}
                      onChange={(e) => handleObjectArrayChange('approvalSignoffs', index, 'signature', e.target.value)}
                      className="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="Pending">Pending</option>
                      <option value="Approved">Approved</option>
                      <option value="Rejected">Rejected</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const TestPlanPreview = () => (
    <div id="test-plan-preview" className="max-w-5xl mx-auto p-8 bg-white">
      <div className="header text-center mb-10">
        <h1 className="text-4xl font-bold text-blue-800 mb-4 border-b-4 border-blue-600 pb-4">TEST PLAN</h1>
        <h2 className="text-2xl text-gray-700 mb-2">{testPlan.projectName || 'Project Name'}</h2>
        <p className="text-lg text-gray-600">Version {testPlan.version}</p>
      </div>

      <div className="header-info grid grid-cols-2 gap-10 mb-10 p-8 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200">
        <div className="space-y-2">
          <p><strong className="text-blue-800">Prepared By:</strong> <span className="text-gray-700">{testPlan.preparedBy || 'TBD'}</span></p>
          <p><strong className="text-blue-800">Reviewed By:</strong> <span className="text-gray-700">{testPlan.reviewedBy || 'TBD'}</span></p>
          <p><strong className="text-blue-800">Approved By:</strong> <span className="text-gray-700">{testPlan.approvedBy || 'TBD'}</span></p>
        </div>
        <div className="space-y-2">
          <p><strong className="text-blue-800">Date:</strong> <span className="text-gray-700">{testPlan.date}</span></p>
          <p><strong className="text-blue-800">Version:</strong> <span className="text-gray-700">{testPlan.version}</span></p>
          <p><strong className="text-blue-800">Status:</strong> <span className="text-green-600 font-medium">Draft</span></p>
        </div>
      </div>

      <div className="section mb-10">
        <h2 className="text-2xl font-bold text-blue-700 mb-6 border-l-4 border-blue-500 pl-4">1. Introduction</h2>
        <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
          <p className="text-gray-700 leading-relaxed">{testPlan.introduction || 'No introduction provided.'}</p>
        </div>
      </div>

      <div className="section mb-10">
        <h2 className="text-2xl font-bold text-blue-700 mb-6 border-l-4 border-blue-500 pl-4">2. Test Objectives</h2>
        <div className="bg-purple-50 p-6 rounded-lg border border-purple-200">
          <ul className="list-none space-y-3">
            {testPlan.testObjectives.filter(obj => obj.trim()).map((objective, index) => (
              <li key={index} className="flex items-start gap-3">
                <span className="inline-block w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></span>
                <span className="text-gray-700">{objective}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="section mb-10">
        <h2 className="text-2xl font-bold text-blue-700 mb-6 border-l-4 border-blue-500 pl-4">3. Test Types</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {Object.entries(testPlan.testTypes).filter(([_, checked]) => checked).map(([type, _]) => (
            <div key={type} className="bg-green-50 border border-green-200 rounded-lg p-3 text-center">
              <span className="text-green-700 font-medium capitalize">{type}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="section mb-10">
        <h2 className="text-2xl font-bold text-blue-700 mb-6 border-l-4 border-blue-500 pl-4">4. Scope</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-green-50 p-6 rounded-lg border border-green-200">
            <h3 className="text-xl font-semibold text-green-700 mb-4 flex items-center gap-2">
              <CheckCircle size={20} />
              In Scope
            </h3>
            <ul className="list-none space-y-2">
              {testPlan.scope.inScope.filter(item => item.trim()).map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="inline-block w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></span>
                  <span className="text-gray-700">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-red-50 p-6 rounded-lg border border-red-200">
            <h3 className="text-xl font-semibold text-red-700 mb-4 flex items-center gap-2">
              <Minus size={20} />
              Out of Scope
            </h3>
            <ul className="list-none space-y-2">
              {testPlan.scope.outOfScope.filter(item => item.trim()).map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="inline-block w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></span>
                  <span className="text-gray-700">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="section mb-10">
        <h2 className="text-2xl font-bold text-blue-700 mb-6 border-l-4 border-blue-500 pl-4">5. Test Strategy</h2>
        <div className="bg-purple-50 p-6 rounded-lg border border-purple-200">
          <p className="text-gray-700 leading-relaxed">{testPlan.testStrategy || 'No test strategy provided.'}</p>
        </div>
      </div>

      {testPlan.automationStrategy && (
        <div className="section mb-10">
          <h2 className="text-2xl font-bold text-blue-700 mb-6 border-l-4 border-blue-500 pl-4">6. Automation Strategy</h2>
          <div className="bg-yellow-50 p-6 rounded-lg border border-yellow-200">
            <p className="text-gray-700 leading-relaxed">{testPlan.automationStrategy}</p>
          </div>
        </div>
      )}

      <div className="section mb-10">
        <h2 className="text-2xl font-bold text-blue-700 mb-6 border-l-4 border-blue-500 pl-4">7. Test Environment</h2>
        <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
          <p className="text-gray-700 leading-relaxed">{testPlan.testEnvironment || 'No test environment details provided.'}</p>
        </div>
      </div>

      <div className="section mb-10">
        <h2 className="text-2xl font-bold text-blue-700 mb-6 border-l-4 border-blue-500 pl-4">8. Entry & Exit Criteria</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
            <h3 className="text-xl font-semibold text-blue-700 mb-4">Entry Criteria</h3>
            <ul className="list-none space-y-2">
              {testPlan.entryExitCriteria.entry.filter(item => item.trim()).map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="inline-block w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></span>
                  <span className="text-gray-700">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-green-50 p-6 rounded-lg border border-green-200">
            <h3 className="text-xl font-semibold text-green-700 mb-4">Exit Criteria</h3>
            <ul className="list-none space-y-2">
              {testPlan.entryExitCriteria.exit.filter(item => item.trim()).map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="inline-block w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></span>
                  <span className="text-gray-700">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="section mb-10">
        <h2 className="text-2xl font-bold text-blue-700 mb-6 border-l-4 border-blue-500 pl-4">9. Test Deliverables</h2>
        <div className="bg-indigo-50 p-6 rounded-lg border border-indigo-200">
          <ul className="list-none space-y-3">
            {testPlan.testDeliverables.filter(item => item.trim()).map((deliverable, index) => (
              <li key={index} className="flex items-start gap-3">
                <span className="inline-block w-2 h-2 bg-indigo-500 rounded-full mt-2 flex-shrink-0"></span>
                <span className="text-gray-700">{deliverable}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="section mb-10">
        <h2 className="text-2xl font-bold text-blue-700 mb-6 border-l-4 border-blue-500 pl-4">10. Risk Assessment</h2>
        <div className="overflow-x-auto">
          <table className="risk-table w-full bg-white rounded-lg overflow-hidden shadow-lg">
            <thead>
              <tr className="bg-red-600 text-white">
                <th className="px-6 py-4 text-left font-semibold">Risk Description</th>
                <th className="px-6 py-4 text-left font-semibold">Probability</th>
                <th className="px-6 py-4 text-left font-semibold">Impact</th>
                <th className="px-6 py-4 text-left font-semibold">Mitigation Strategy</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {testPlan.riskAssessment.filter(risk => risk.risk.trim()).map((risk, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-gray-700">{risk.risk}</td>
                  <td className={`px-6 py-4 font-medium priority-${risk.probability.toLowerCase()}`}>{risk.probability}</td>
                  <td className={`px-6 py-4 font-medium priority-${risk.impact.toLowerCase()}`}>{risk.impact}</td>
                  <td className="px-6 py-4 text-gray-700">{risk.mitigation}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="section mb-10">
        <h2 className="text-2xl font-bold text-blue-700 mb-6 border-l-4 border-blue-500 pl-4">11. Test Schedule</h2>
        <div className="overflow-x-auto">
          <table className="schedule-table w-full bg-white rounded-lg overflow-hidden shadow-lg">
            <thead>
              <tr className="bg-green-600 text-white">
                <th className="px-6 py-4 text-left font-semibold">Phase</th>
                <th className="px-6 py-4 text-left font-semibold">Start Date</th>
                <th className="px-6 py-4 text-left font-semibold">End Date</th>
                <th className="px-6 py-4 text-left font-semibold">Responsible</th>
                <th className="px-6 py-4 text-left font-semibold">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {testPlan.schedule.map((phase, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium text-gray-900">{phase.phase}</td>
                  <td className="px-6 py-4 text-gray-700">{phase.startDate || 'TBD'}</td>
                  <td className="px-6 py-4 text-gray-700">{phase.endDate || 'TBD'}</td>
                  <td className="px-6 py-4 text-gray-700">{phase.responsible || 'TBD'}</td>
                  <td className={`px-6 py-4 font-medium status-${phase.status.toLowerCase().replace(' ', '')}`}>{phase.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="section mb-10">
        <h2 className="text-2xl font-bold text-blue-700 mb-6 border-l-4 border-blue-500 pl-4">12. Resources</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-purple-50 p-6 rounded-lg border border-purple-200">
            <h3 className="text-xl font-semibold text-purple-700 mb-4">Human Resources</h3>
            <div className="space-y-3">
              <p><strong>Test Manager:</strong> <span className="text-gray-700">{testPlan.resources.testManager || 'TBD'}</span></p>
              <p><strong>Test Lead:</strong> <span className="text-gray-700">{testPlan.resources.testLead || 'TBD'}</span></p>
              <p><strong>Budget:</strong> <span className="text-gray-700">{testPlan.resources.budget || 'TBD'}</span></p>
              <div>
                <strong>Test Engineers:</strong>
                <ul className="list-none mt-2 space-y-1">
                  {testPlan.resources.testEngineers.filter(eng => eng.trim()).map((engineer, index) => (
                    <li key={index} className="flex items-center gap-2 ml-4">
                      <span className="w-1.5 h-1.5 bg-purple-500 rounded-full"></span>
                      <span className="text-gray-700">{engineer}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
            <h3 className="text-xl font-semibold text-gray-700 mb-4">Tools & Equipment</h3>
            <div className="space-y-4">
              <div>
                <strong>Tools & Software:</strong>
                <ul className="list-none mt-2 space-y-1">
                  {testPlan.resources.tools.filter(tool => tool.trim()).map((tool, index) => (
                    <li key={index} className="flex items-center gap-2 ml-4">
                      <span className="w-1.5 h-1.5 bg-gray-500 rounded-full"></span>
                      <span className="text-gray-700">{tool}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
                              <div>
                <strong>Hardware:</strong>
                <ul className="list-none mt-2 space-y-1">
                  {testPlan.resources.hardware.filter(hw => hw.trim()).map((hardware, index) => (
                    <li key={index} className="flex items-center gap-2 ml-4">
                      <span className="w-1.5 h-1.5 bg-gray-500 rounded-full"></span>
                      <span className="text-gray-700">{hardware}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {testPlan.assumptions.filter(item => item.trim()).length > 0 && (
        <div className="section mb-10">
          <h2 className="text-2xl font-bold text-blue-700 mb-6 border-l-4 border-blue-500 pl-4">13. Assumptions</h2>
          <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
            <ul className="list-none space-y-2">
              {testPlan.assumptions.filter(item => item.trim()).map((assumption, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="inline-block w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></span>
                  <span className="text-gray-700">{assumption}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {testPlan.dependencies.filter(item => item.trim()).length > 0 && (
        <div className="section mb-10">
          <h2 className="text-2xl font-bold text-blue-700 mb-6 border-l-4 border-blue-500 pl-4">14. Dependencies</h2>
          <div className="bg-orange-50 p-6 rounded-lg border border-orange-200">
            <ul className="list-none space-y-2">
              {testPlan.dependencies.filter(item => item.trim()).map((dependency, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="inline-block w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></span>
                  <span className="text-gray-700">{dependency}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      <div className="section mb-10">
        <h2 className="text-2xl font-bold text-blue-700 mb-6 border-l-4 border-blue-500 pl-4">15. Approval Signoffs</h2>
        <div className="overflow-x-auto">
          <table className="w-full bg-white rounded-lg overflow-hidden shadow-lg">
            <thead>
              <tr className="bg-gray-600 text-white">
                <th className="px-6 py-4 text-left font-semibold">Role</th>
                <th className="px-6 py-4 text-left font-semibold">Name</th>
                <th className="px-6 py-4 text-left font-semibold">Date</th>
                <th className="px-6 py-4 text-left font-semibold">Signature</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {testPlan.approvalSignoffs.map((signoff, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium text-gray-900">{signoff.role}</td>
                  <td className="px-6 py-4 text-gray-700">{signoff.name || 'TBD'}</td>
                  <td className="px-6 py-4 text-gray-700">{signoff.date || 'TBD'}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      signoff.signature === 'Approved' ? 'bg-green-100 text-green-800' :
                      signoff.signature === 'Rejected' ? 'bg-red-100 text-red-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {signoff.signature}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="text-center mt-12 pt-8 border-t border-gray-300">
        <p className="text-gray-500 text-sm">
          This document was generated on {new Date().toLocaleDateString()} using Test Plan Generator v2.0
        </p>
      </div>
    </div>
  );

  if (previewMode) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="bg-white shadow-lg border-b px-6 py-4 sticky top-0 z-10">
          <div className="max-w-6xl mx-auto flex justify-between items-center">
            <div className="flex items-center gap-4">
              <h1 className="text-2xl font-bold text-gray-900">Test Plan Preview</h1>
              <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                {testPlan.projectName || 'Untitled Project'}
              </span>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setPreviewMode(false)}
                className="flex items-center gap-2 px-6 py-2 text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors font-medium"
              >
                <Edit3 size={20} />
                Edit
              </button>
              <button
                onClick={generatePDF}
                className="flex items-center gap-2 px-6 py-2 bg-red-600 text-white hover:bg-red-700 rounded-lg transition-colors font-medium shadow-sm"
              >
                <FileDown size={20} />
                Export PDF
              </button>
              <button
                onClick={generateWordDoc}
                className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded-lg transition-colors font-medium shadow-sm"
              >
                <Download size={20} />
                Export Word
              </button>
            </div>
          </div>
        </div>
        <div className="py-8">
          <TestPlanPreview />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="bg-white shadow-lg border-b px-6 py-4 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <BookOpen className="text-white" size={24} />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Test Plan Generator</h1>
              <p className="text-sm text-gray-600">Professional SQA Documentation Tool</p>
            </div>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => setPreviewMode(true)}
              className="flex items-center gap-2 px-6 py-2 text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors font-medium"
            >
              <Eye size={20} />
              Preview
            </button>
            <button
              onClick={generatePDF}
              className="flex items-center gap-2 px-6 py-2 bg-red-600 text-white hover:bg-red-700 rounded-lg transition-colors font-medium shadow-sm"
            >
              <FileDown size={20} />
              Export PDF
            </button>
            <button
              onClick={generateWordDoc}
              className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded-lg transition-colors font-medium shadow-sm"
            >
              <Download size={20} />
              Export Word
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-6">
        <div className="bg-white rounded-xl shadow-xl overflow-hidden">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-0">
              {[
                { key: 'basic', label: 'Basic Info', icon: BookOpen, color: 'blue' },
                { key: 'scope', label: 'Scope & Planning', icon: Target, color: 'green' },
                { key: 'strategy', label: 'Strategy & Approach', icon: Shield, color: 'purple' },
                { key: 'criteria', label: 'Criteria & Deliverables', icon: CheckCircle, color: 'indigo' },
                { key: 'riskschedule', label: 'Risk & Schedule', icon: AlertTriangle, color: 'red' },
                { key: 'resources', label: 'Resources & Approval', icon: Users, color: 'orange' }
              ].map((tab, index) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.key}
                    onClick={() => setActiveSection(tab.key)}
                    className={`flex-1 flex items-center justify-center gap-2 py-4 px-6 font-medium text-sm transition-all duration-200 border-b-2 ${
                      activeSection === tab.key
                        ? `border-${tab.color}-500 text-${tab.color}-600 bg-${tab.color}-50`
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <Icon size={18} />
                    <span className="hidden md:block">{tab.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>

          <div className="p-8">
            {activeSection === 'basic' && renderBasicInfo()}
            {activeSection === 'scope' && renderScope()}
            {activeSection === 'strategy' && renderStrategy()}
            {activeSection === 'criteria' && renderCriteria()}
            {activeSection === 'riskschedule' && renderRiskSchedule()}
            {activeSection === 'resources' && renderResources()}
          </div>
        </div>
      </div>

      <div className="bg-white border-t border-gray-200 mt-12 py-8">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <BookOpen className="text-blue-600" size={24} />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Professional Templates</h3>
              <p className="text-gray-600 text-sm">Industry-standard test plan structure following IEEE 829 guidelines</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <FileDown className="text-green-600" size={24} />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Multiple Export Formats</h3>
              <p className="text-gray-600 text-sm">Export to PDF for presentations or Word for further customization</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Users className="text-purple-600" size={24} />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Team Collaboration</h3>
              <p className="text-gray-600 text-sm">Comprehensive sections for roles, responsibilities, and approvals</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestPlanGenerator;