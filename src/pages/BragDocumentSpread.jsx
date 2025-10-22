import React, { useState } from 'react';
import { Header } from '../components/Header';
import { Reveal } from '../util/Reveal';
import { Outlet, useNavigate, useLocation } from 'react-router';

export const BragDocumentSpread = () => {
  const [selectedMonth, setSelectedMonth] = useState(new Date());
  const [bragData, setBragData] = useState({});
  const navigate = useNavigate();
  const location = useLocation();

  const handleMonthChange = (newMonth) => {
    setSelectedMonth(newMonth);
  };

  const handleQuestionChange = (questionId, value) => {
    setBragData(prev => ({
      ...prev,
      [questionId]: value
    }));
  };

  const handleSave = () => {
    // TODO: Implement API call to save brag document
    console.log('Saving brag document for:', selectedMonth);
    console.log('Data:', bragData);
    
    // Example API call structure:
    // const saveData = {
    //   month: selectedMonth.getMonth() + 1,
    //   year: selectedMonth.getFullYear(),
    //   answers: bragData
    // };
    // await api.saveBragDocument(saveData);
  };

  const navigationItems = [
    {
      id: 'guidelines',
      label: 'Guidelines',
      path: '/brag-document/guidelines',
      description: 'Learn about brag documents'
    },
    {
      id: 'summary',
      label: 'Summary',
      path: '/brag-document/summary',
      description: 'View monthly summaries'
    },
    {
      id: 'form',
      label: 'Brag Document',
      path: '/brag-document/form',
      description: 'Create your brag document'
    }
  ];

  // No need for redirect since we have an index route

  const isActiveTab = (path) => {
    return location.pathname === path;
  };

  const handleTabClick = (path) => {
    navigate(path);
  };

  return (
    <div className="bg-[var(--worklog-card-bg)] flex flex-col w-screen">
      <Header />
      
      <div className="bg-[var(--worklog-dark-bg)] text-white h-screen rounded-xl mx-3 mb-3 overflow-x-scroll">
        <div className="overflow-x-auto">
          <div className="min-w-[1200px]">
            
            {/* Page Header */}
            <div className="max-w-6xl mx-auto pt-10">
              <div className="flex px-2 mb-6 items-center justify-between border-b-1 pb-5 border-[var(--worklog-text-medium)]/30">
                <div className="flex gap-10 items-center">
                  <Reveal>
                    <h2 className="text-xl text-[var(--worklog-brand-green)]">Brag Document</h2>
                  </Reveal>
                </div>
                <div className="flex gap-10 items-center">
                  <Reveal>
                    <p className="text-md text-[var(--worklog-text-light)]">
                     a practical way to improve your resumé or build the case for a promotion.
                    </p>
                  </Reveal>
                </div>
              </div>

              {/* Inner Navigation Tabs */}
              <div className="mb-8">
                <div className="bg-[var(--worklog-dark-bg)] rounded-xl p-2 border border-[var(--worklog-text-medium)]/20">
                  <nav className="flex space-x-1">
                    {navigationItems.map((item) => (
                      <button
                        key={item.id}
                        onClick={() => handleTabClick(item.path)}
                        className={`
                          flex-1 px-6 py-4 rounded-lg font-bold transition-all duration-200
                          ${isActiveTab(item.path)
                            ? 'bg-[var(--worklog-brand-green)] text-black'
                            : 'text-[var(--worklog-text-light)] hover:text-[var(--worklog-brand-green)] hover:bg-[var(--worklog-card-hover)]'
                          }
                        `}
                      >
                        <div className="text-center">
                          <div className="text-lg">{item.label}</div>
                          <div className={`text-xs mt-1 ${
                            isActiveTab(item.path) ? 'text-black/70' : 'text-[var(--worklog-text-medium)]'
                          }`}>
                            {item.description}
                          </div>
                        </div>
                      </button>
                    ))}
                  </nav>
                </div>
              </div>

              {/* Content Area */}
              <div className="min-h-[600px]">
                <Outlet context={{ 
                  selectedMonth, 
                  onMonthChange: handleMonthChange,
                  bragData,
                  onQuestionChange: handleQuestionChange,
                  onSave: handleSave
                }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
