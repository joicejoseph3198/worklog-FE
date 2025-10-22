import React from 'react';
import { Reveal } from '../util/Reveal';
import { QuestionAnswer } from './QuestionAnswer';

export const BragFormSection = ({ selectedMonth, onMonthChange, onSave, bragData, onQuestionChange }) => {
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
      title: 'Goals',
      description: 'This year: List your major goals and share them with your manager/team for alignment and support.\n\nNext year: Start drafting goals for what you want to achieve next.',
      placeholder: '1. One day, I want to write a book about UX\n2. As a part of my professional development, I need to learn Webflow\n3. Our team need to improve activation of users by 10% in Q3\n4. [write a goal here]'
    },
    {
      id: 'projects',
      title: 'Projects',
      description: 'For each project:\n\nYour role: What you designed, built, or contributed.\n\nImpact: Who benefited, measurable results (speedups, cost savings, adoption, etc.), or qualitative impact (audit readiness, customer success).\n\nFollow-up: Note results after launch.',
      placeholder: 'Project background: We were tasked with coming up with a new brand for the Guild of Working Designers\n\nWhat you did: I gathered the internal requirements, did some user interviews, and ran some first-click tests\n\nThe impact it had: Surveyed the audience for both our main brand and the innovation project and achieved a +22% improvement on the new innovation branding'
    },
    {
      id: 'collaboration',
      title: 'Collaboration & Mentorship',
      description: 'Include examples like:\n\n• Helping teammates debug or design\n• Mentoring interns/new hires\n• Writing foundational code\n• Improving reviews, on-call, or documentation\n• Giving talks, running workshops, or answering key questions',
      placeholder: '• Organized a workshop that brought in $3,000 in new clients (new business)\n• Started a "namestorming" group to improve UX writing and information architecture (optimization)\n• Instituted "user testing day" to test ideas with users once a month (continuous user research)\n• [write an initiative here]'
    },
    {
      id: 'design',
      title: 'Design & Documentation',
      description: 'List:\n\n• Design docs you wrote or reviewed\n• Documentation you created and why (e.g., reduced repetitive questions)',
      placeholder: '• Design doc for new user onboarding flow\n• API documentation that reduced support tickets by 40%\n• Style guide that improved design consistency across teams'
    },
    {
      id: 'company',
      title: 'Company Building',
      description: 'Work that improves the company overall:\n\n• Recruiting, interviewing, onboarding\n• Improving processes or culture',
      placeholder: '• Led 15+ technical interviews and helped hire 3 new engineers\n• Created onboarding documentation that reduced new hire ramp-up time by 2 weeks\n• Started weekly tech talks that improved team knowledge sharing'
    },
    {
      id: 'learning',
      title: 'What You Learned',
      description: 'Reflect on new or improved skills:\n\n• Technical (e.g., performance tuning, new tools/languages)\n• Cross-functional (e.g., PM, UX, writing design docs)\n\nIdentify skills you want to grow next.',
      placeholder: '• Completed 10 workshops on Continuous UX Research from the Fountain Institute (course)\n• Learned React performance optimization techniques\n• Improved public speaking through conference presentations'
    },
    {
      id: 'outside',
      title: 'Outside of Work',
      description: 'Include:\n\n• Blog posts, talks, OSS contributions, awards\n• Anything else you\'re proud of — personal or professional.',
      placeholder: '• Published 3 technical blog posts with 10k+ total views\n• Contributed to open source project with 500+ stars\n• Spoke at 2 conferences about design systems'
    },
    {
      id: 'prompts',
      title: 'Prompts to Get Unstuck',
      description: 'What would you tell a friend to convince them to join your team?',
      placeholder: 'Use this space for reflection and getting unstuck...\n\nWhat would you tell a friend to convince them to join your team?\n\nWhat are you most proud of this quarter?\n\nWhat invisible work did you do that made a difference?'
    }
  ];

  return (
    <section>
      <Reveal>
        <h2 className="text-2xl font-[NeueBit] text-[var(--worklog-brand-green)] mb-6">
          Monthly Brag Document
        </h2>
      </Reveal>
      
      <div className="bg-[var(--worklog-dark-bg)] rounded-xl p-8 border border-[var(--worklog-text-medium)]/20">
        {/* Form Month Navigation */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={goToPreviousMonth}
            className="text-2xl text-[var(--worklog-text-light)] hover:text-[var(--worklog-brand-green)] hover:cursor-pointer transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
              />
            </svg>
          </button>
          
          <Reveal>
            <h3 className="text-xl font-bold text-[var(--worklog-text-light)]">
              {monthNames[selectedMonth.getMonth()]} {selectedMonth.getFullYear()} Brag Document
            </h3>
          </Reveal>
          
          <button
            onClick={goToNextMonth}
            className="text-2xl text-[var(--worklog-text-light)] hover:text-[var(--worklog-brand-green)] hover:cursor-pointer transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
              />
            </svg>
          </button>
        </div>

        {/* Brag Document Sections */}
        <div className="space-y-8 mb-8">
          {bragSections.map((section) => (
            <div key={section.id} className="space-y-4">
              {/* Section Header */}
              <div>
                <h3 className="text-xl font-bold text-[var(--worklog-text-light)] mb-2">
                  {section.title}
                </h3>
                <p className="text-sm text-[var(--worklog-text-light)] opacity-80">
                  {section.description}
                </p>
              </div>

              {/* Content Area with Dotted Background */}
              <div className="relative">
                <textarea
                  value={bragData[section.id] || ''}
                  onChange={(e) => onQuestionChange(section.id, e.target.value)}
                  placeholder={section.placeholder}
                  className="w-full p-6 text-[16px] resize-none outline-none rounded-lg text-[var(--worklog-text-white)] border-0"
                  style={{
                    backgroundImage: `radial-gradient(circle, rgba(153, 153, 153, 0.4) 1px, transparent 1px)`,
                    backgroundSize: `20px 20px`,
                    backgroundPosition: `center`,
                  }}
                  rows={section.id === 'projects' ? 8 : 6}
                />
                <div className="absolute bottom-3 right-3 text-xs text-[var(--worklog-brand-green)]">
                  {(bragData[section.id] || '').length} characters
                </div>
              </div>


              {/* Status Indicator */}
              {(bragData[section.id] || '').trim() && (
                <div className="flex items-center gap-2 text-xs text-[var(--worklog-brand-green)]">
                  <svg 
                    className="w-3 h-3" 
                    fill="currentColor" 
                    viewBox="0 0 20 20"
                  >
                    <path 
                      fillRule="evenodd" 
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" 
                      clipRule="evenodd" 
                    />
                  </svg>
                  Ready to save
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Save Button */}
        <div className="flex justify-center">
          <button 
            onClick={onSave}
            className="bg-[var(--worklog-brand-green)] text-black px-8 py-3 rounded-lg font-bold hover:bg-[var(--worklog-brand-green)]/80 transition-colors"
          >
            Save Brag Document
          </button>
        </div>
      </div>
    </section>
  );
};
