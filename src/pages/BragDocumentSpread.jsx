import React, { useCallback, useEffect, useMemo } from 'react';
import { Header } from '../components/Header';
import { Reveal } from '../util/Reveal';
import { Outlet, useNavigate, useLocation, useParams } from 'react-router';
import { useAxios } from '../util/useAxios';
import { useBragDocStore } from '../store/useBragDocStore';

export const BragDocumentSpread = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const axios = useAxios();
  const { year, month } = useParams();
  const selectedMonth = useBragDocStore((state) => state.selectedMonth);
  const bragData = useBragDocStore((state) => state.bragData);
  const setMonth = useBragDocStore((state) => state.setMonth);
  const setAnswer = useBragDocStore((state) => state.setAnswer);
  const saveDocument = useBragDocStore((state) => state.saveDocument);
  const fetchDocument = useBragDocStore((state) => state.fetchDocument);

  const handleMonthChange = useCallback((newMonth) => {
    setMonth(newMonth);
    const y = newMonth.getFullYear();
    const m = newMonth.getMonth() + 1;
    navigate(`/brag-document/form/${y}/${m}`);
  }, [setMonth, navigate]);

  const handleQuestionChange = useCallback((questionId, value) => {
    setAnswer(questionId, value);
  }, [setAnswer]);

  const handleSave = useCallback(async () => {
    await saveDocument(axios);
  }, [saveDocument, axios]);

  const outletContext = useMemo(() => ({
    selectedMonth,
    onMonthChange: handleMonthChange,
    bragData,
    onQuestionChange: handleQuestionChange,
    onSave: handleSave,
  }), [selectedMonth, bragData, handleMonthChange, handleQuestionChange, handleSave]);

  useEffect(() => {
    fetchDocument(axios, selectedMonth);
  }, [fetchDocument, axios, selectedMonth]);

  // Sync selectedMonth from URL params when present
  useEffect(() => {
    if (year && month) {
      const y = parseInt(year, 10);
      const m = parseInt(month, 10);
      if (!Number.isNaN(y) && !Number.isNaN(m) && m >= 1 && m <= 12) {
        const urlDate = new Date(y, m - 1, 1);
        // Only update if different to avoid unnecessary loops
        if (
          selectedMonth.getFullYear() !== urlDate.getFullYear() ||
          selectedMonth.getMonth() !== urlDate.getMonth()
        ) {
          setMonth(urlDate);
        }
      }
    }
  }, [year, month, selectedMonth, setMonth]);

  const navigationItems = [
    {
      id: 'form',
      label: 'Brag Document',
      path: '/brag-document/form',
      description: 'Create your brag document'
    },
    {
      id: 'guidelines',
      label: 'Guidelines',
      path: '/brag-document/guidelines',
      description: 'Learn about brag documents'
    },
    // {
    //   id: 'summary',
    //   label: 'Summary',
    //   path: '/brag-document/summary',
    //   description: 'View monthly summaries'
    // },

  ];

  

  const isActiveTab = (path) => {
    if (path === '/brag-document/form') {
      return location.pathname === '/brag-document' || location.pathname.startsWith('/brag-document/form');
    }
    return location.pathname === path;
  };

  const handleTabClick = (path) => {
    if (path === '/brag-document/form') {
      const y = selectedMonth.getFullYear();
      const m = selectedMonth.getMonth() + 1;
      navigate(`/brag-document/form/${y}/${m}`);
      return;
    }
    navigate(path);
  };

  useEffect(() => {
    if (location.pathname === '/brag-document') {
      const y = selectedMonth.getFullYear();
      const m = selectedMonth.getMonth() + 1;
      navigate(`/brag-document/form/${y}/${m}`, { replace: true });
    }
  }, [location.pathname, navigate, selectedMonth]);

  // If user lands on /brag-document/form (or missing params), default to current month/year
  useEffect(() => {
    const isFormBase = location.pathname === '/brag-document/form';
    const isFormMissingParams = location.pathname.startsWith('/brag-document/form') && (!year || !month);
    if (isFormBase || isFormMissingParams) {
      const y = selectedMonth.getFullYear();
      const m = selectedMonth.getMonth() + 1;
      navigate(`/brag-document/form/${y}/${m}`, { replace: true });
    }
  }, [location.pathname, navigate, selectedMonth, year, month]);

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
                <Outlet context={outletContext} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
