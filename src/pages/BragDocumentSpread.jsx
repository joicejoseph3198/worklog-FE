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
  }, [saveDocument]);

  const outletContext = useMemo(() => ({
    selectedMonth,
    onMonthChange: handleMonthChange,
    bragData,
    onQuestionChange: handleQuestionChange,
    onSave: handleSave,
  }), [selectedMonth, bragData, handleMonthChange, handleQuestionChange, handleSave]);

  useEffect(() => {
    fetchDocument(axios, selectedMonth);
  }, [fetchDocument, selectedMonth]);

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
    <div className="bg-[var(--worklog-card-bg)] flex flex-col w-screen h-screen">
      <Header />
      
      <div className="bg-[var(--worklog-dark-bg)] text-white flex-1 overflow-hidden">
        {/* Content Area */}
        <div className="h-full overflow-hidden">
          <Outlet context={outletContext} />
        </div>
      </div>
    </div>
  );
};
