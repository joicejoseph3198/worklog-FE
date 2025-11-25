import React, { useState, useRef } from 'react';
import { Reveal } from '../util/Reveal';

export const BragFormSection = ({ selectedMonth, onMonthChange, onSave, bragData, onQuestionChange }) => {
  const [isSaving, setIsSaving] = useState(false);
  const [activeSection, setActiveSection] = useState('goals');
  const sectionRefs = useRef({});

  const handleSave = async () => {
    if (isSaving) return;
    setIsSaving(true);
    try {
      await onSave();
    } finally {
      setIsSaving(false);
    }
  };

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const goToPreviousMonth = () => {
    const newDate = new Date(selectedMonth.getFullYear(), selectedMonth.getMonth() - 1, 1);
    onMonthChange(newDate);
  };

  const goToNextMonth = () => {
    const newDate = new Date(selectedMonth.getFullYear(), selectedMonth.getMonth() + 1, 1);
    onMonthChange(newDate);
  };

  // Brag document sections
  const bragSections = [
    {
      id: 'goals',
      title: 'goals',
      label: 'Goals',
      placeholder: '1. One day, I want to write a book about UX\n2. As a part of my professional development, I need to learn Webflow\n3. Our team need to improve activation of users by 10% in Q3\n4. [write a goal here]'
    },
    {
      id: 'projects',
      title: 'projects',
      label: 'Projects & Contributions',
      placeholder: 'Project background: We were tasked with coming up with a new brand for the Guild of Working Designers\n\nWhat you did: I gathered the internal requirements, did some user interviews, and ran some first-click tests\n\nThe impact it had: Surveyed the audience for both our main brand and the innovation project and achieved a +22% improvement on the new innovation branding'
    },
    {
      id: 'collaboration',
      title: 'collaboration',
      label: 'Collaboration & Mentorship',
      placeholder: '• Organized a workshop that brought in $3,000 in new clients (new business)\n• Started a "namestorming" group to improve UX writing and information architecture (optimization)\n• Instituted "user testing day" to test ideas with users once a month (continuous user research)\n• [write an initiative here]'
    },
    {
      id: 'design',
      title: 'design',
      label: 'Design & Documentation',
      placeholder: '• Design doc for new user onboarding flow\n• API documentation that reduced support tickets by 40%\n• Style guide that improved design consistency across teams'
    },
    {
      id: 'company',
      title: 'company',
      label: 'Company Building',
      placeholder: '• Led 15+ technical interviews and helped hire 3 new engineers\n• Created onboarding documentation that reduced new hire ramp-up time by 2 weeks\n• Started weekly tech talks that improved team knowledge sharing'
    },
    {
      id: 'learning',
      title: 'learning',
      label: 'What You Learned',
      placeholder: '• Completed 10 workshops on Continuous UX Research from the Fountain Institute (course)\n• Learned React performance optimization techniques\n• Improved public speaking through conference presentations'
    },
    {
      id: 'outside',
      title: 'outside work',
      label: 'Outside of Work',
      placeholder: '• Published 3 technical blog posts with 10k+ total views\n• Contributed to open source project with 500+ stars\n• Spoke at 2 conferences about design systems'
    },
    {
      id: 'prompts',
      title: 'prompts',
      label: 'Prompts to Get Unstuck',
      placeholder: 'Use this space for reflection and getting unstuck...\n\nWhat would you tell a friend to convince them to join your team?\n\nWhat are you most proud of this quarter?\n\nWhat invisible work did you do that made a difference?'
    }
  ];

  // Scroll to section when navigation is clicked
  const scrollToSection = (sectionId) => {
    setActiveSection(sectionId);
    sectionRefs.current[sectionId]?.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
  };

  // Calculate textarea height based on content
  const calculateRows = (text, minRows = 8) => {
    if (!text) return minRows;
    const lineCount = text.split('\n').length;
    return Math.max(minRows, lineCount + 2);
  };

  return (
    <div 
      className="flex h-full w-full"
      style={{
        backgroundImage: `radial-gradient(circle, rgba(153, 153, 153, 0.4) 1px, transparent 1px)`,
        backgroundSize: `20px 20px`,
        backgroundPosition: `center`,
      }}
    >
      {/* Left Navigation - 1/4 */}
      <div className="w-1/4 flex-shrink-0 p-8 pl-16 flex flex-col h-full">
        {/* Month Display */}
        <div className="mb-6">
          <h2 className="text-[var(--worklog-text-white)] text-lg font-bold">
            <Reveal>
              {monthNames[selectedMonth.getMonth()]} {selectedMonth.getFullYear()}
            </Reveal>
          </h2>
        </div>

        {/* Navigation Links - Scrollable */}
        <nav className="flex-1 space-y-1 mb-6 overflow-y-auto min-h-0">
          {bragSections.map((section) => (
            <button
              key={section.id}
              onClick={() => scrollToSection(section.id)}
              className={`block w-full text-left text-base transition-colors ${
                activeSection === section.id
                  ? 'text-[var(--worklog-brand-green)]'
                  : 'text-[var(--worklog-text-medium)] hover:text-[var(--worklog-text-light)]'
              }`}
            >
              {section.title}
            </button>
          ))}
        </nav>

        {/* Bottom Section - Fixed */}
        <div className="flex-shrink-0">
          {/* Month Navigation */}
          <div className="flex items-center gap-4 mb-4 text-[var(--worklog-text-medium)] text-sm">
            <button
              onClick={goToPreviousMonth}
              className="hover:text-[var(--worklog-brand-green)] transition-colors"
            >
              ← prev
            </button>
            <button
              onClick={goToNextMonth}
              className="hover:text-[var(--worklog-brand-green)] transition-colors"
            >
              next →
            </button>
          </div>

          {/* Save Button */}
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="font-bold px-6 py-2 bg-[var(--worklog-brand-green)] text-black rounded-md text-sm
              hover:bg-[var(--worklog-card-hover)] hover:text-[var(--worklog-brand-green)] 
              disabled:opacity-50 disabled:cursor-not-allowed transition-all max-w-fit"
          >
            {isSaving ? 'Saving...' : 'Save'}
          </button>
        </div>
      </div>

      {/* Main Content Area - 3/4 Left Aligned */}
      <div className="w-3/4 overflow-y-auto px-12 py-8" style={{ scrollBehavior: 'smooth' }}>
        {bragSections.map((section) => (
          <div 
            key={section.id} 
            ref={(el) => (sectionRefs.current[section.id] = el)}
            className="mb-12 scroll-mt-8"
          >
            {/* Section Title */}
            <h3 className="text-xl font-bold text-[var(--worklog-text-white)] mb-6">
              # {section.label}
            </h3>

            {/* Textarea */}
            <textarea
              value={bragData[section.id] || ''}
              onChange={(e) => onQuestionChange(section.id, e.target.value)}
              placeholder={section.placeholder}
              spellCheck={false}
              className="w-full text-[18px] resize-none outline-none text-[var(--worklog-text-light)] bg-transparent border-0 p-0 placeholder:text-[var(--worklog-text-light)]"
              style={{
                minHeight: '200px',
                lineHeight: '1.6'
              }}
              rows={calculateRows(bragData[section.id], 8)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
