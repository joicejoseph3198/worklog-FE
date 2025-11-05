import React from 'react';
import { Reveal } from '../util/Reveal';

export const GuidelinesSection = () => {
  return (
    <section className="mb-16">
      <Reveal>
        <h2 className="text-2xl font-[NeueBit] text-[var(--worklog-brand-green)] mb-6">
          Guidelines
        </h2>
      </Reveal>
      
      <div className="bg-[var(--worklog-dark-bg)] rounded-xl p-8 border border-[var(--worklog-text-medium)]/20 text-md">
          <div className="space-y-12">
            {/* What is a Brag Document */}
            <div className="flex gap-8 items-start">
              <div className="w-1/3">
                <h3 className="text-sm font-bold text-[var(--worklog-brand-green)]">
                  What is a Brag Document?
                </h3>
              </div>
              <div className="w-2/3">
                <p className="text-[var(--worklog-text-light)] leading-relaxed">
                A personal log where you record your accomplishments, impact, and learnings — not just for self-promotion, but also for reflection, growth, and visibility.
                </p>
              </div>
            </div>
            
            {/* Why Keep a Brag Document */}
            <div className="flex gap-8 items-start">
              <div className="w-1/3">
                <h3 className="text-sm font-bold text-[var(--worklog-brand-green)]">
                  Why Keep a Brag Document?
                </h3>
              </div>
                <div className="w-2/3">
                  <ul className="text-[var(--worklog-text-light)] space-y-2">
                    <li>• Helps you track what you're proud of, what's working, and what you'd like to do more (or less) of.</li>
                    <li>• Reveals themes and patterns in your work (e.g., "I've been doing lots of mentoring or performance improvements").</li>
                    <li>• Makes performance reviews, promotions, and career reflections easier.</li>
                    <li>• Encourages self-advocacy and confidence, especially for people who tend to undersell their impact.</li>
                  </ul>
                </div>
            </div>
            
            {/* How to Use This Tool */}
            <div className="flex gap-8 items-start">
              <div className="w-1/3">
                <h3 className="text-sm font-bold text-[var(--worklog-brand-green)]">
                  How to Use This Tool
                </h3>
              </div>
              <div className="w-2/3">
                <div className="text-[var(--worklog-text-light)] space-y-4">
                  <ol className="space-y-2">
                    <li>1. <strong>Review Your Monthly Summaries:</strong> Use the AI-generated summaries to recall your activities</li>
                    <li>2. <strong>Reflect Monthly:</strong> Set aside time each month to document your achievements</li>
                  </ol>
                  
                  <div>
                    <strong>Two main approaches:</strong>
                    <ul className="mt-2 space-y-1">
                      <li>• Monthly updates: quick, ongoing notes (easy to keep up to date).</li>
                      <li>• Deep-dive sessions: once or twice a year, reflect on everything in one go.</li>
                    </ul>
                    <p className="mt-2">Experiment to see which works better for you.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Don't Skip the "Fuzzy Work" */}
            <div className="flex gap-8 items-start">
              <div className="w-1/3">
                <h3 className="text-sm font-bold text-[var(--worklog-brand-green)]">
                  Don't Skip the "Fuzzy Work"
                </h3>
              </div>
              <div className="w-2/3">
                <div className="text-[var(--worklog-text-light)] space-y-4">
                  <p>Include work that's hard to quantify but highly valuable, like:</p>
                  <ul className="space-y-1">
                    <li>• Improving team processes, on-call systems, or code quality</li>
                    <li>• Mentoring, reviewing, refactoring, or reducing technical debt</li>
                  </ul>
                  <p>For each fuzzy goal:</p>
                  <ul className="space-y-1">
                    <li>• Explain why it matters</li>
                    <li>• List what you did</li>
                    <li>• Note any effects or signals of impact</li>
                  </ul>
                  <p>This kind of invisible work often gets overlooked — make it visible.</p>
                </div>
              </div>
            </div>

            {/* Make It Collaborative */}
            <div className="flex gap-8 items-start">
              <div className="w-1/3">
                <h3 className="text-sm font-bold text-[var(--worklog-brand-green)]">
                  Make It Collaborative
                </h3>
              </div>
              <div className="w-2/3">
                <div className="text-[var(--worklog-text-light)] space-y-4">
                  <p>Normalize celebrating each other's wins:</p>
                  <ul className="space-y-1">
                    <li>• Encourage teammates to "put that in your brag doc."</li>
                    <li>• Share drafts with peers or friends — they can help you articulate impact ("you made tests 3× faster!").</li>
                    <li>• Turn it into a shared ritual, not a solo task.</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Brag Workshops & Sessions */}
            <div className="flex gap-8 items-start">
              <div className="w-1/3">
                <h3 className="text-sm font-bold text-[var(--worklog-brand-green)]">
                  Brag Workshops & Sessions
                </h3>
              </div>
              <div className="w-2/3">
                <div className="text-[var(--worklog-text-light)] space-y-4">
                  <p>Two formats people use:</p>
                  <div>
                    <p><strong>Brag Workshop (before reviews):</strong></p>
                    <ul className="mt-1 space-y-1">
                      <li>• Part 1: Write your doc (1–2 hrs)</li>
                      <li>• Part 2: Pair up and refine — help each other clarify why your work matters</li>
                    </ul>
                  </div>
                  <div>
                    <p><strong>Monthly Brag Sessions:</strong></p>
                    <ul className="mt-1 space-y-1">
                      <li>• Meet every couple of weeks (even remotely)</li>
                      <li>• Update your docs, share wins, and cheer each other on</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* The Big Idea */}
            <div className="flex gap-8 items-start">
              <div className="w-1/3">
                <h3 className="text-sm font-bold text-[var(--worklog-brand-green)]">
                  The Big Idea
                </h3>
              </div>
              <div className="w-2/3">
                <div className="text-[var(--worklog-text-light)]">
                  <p>A brag document isn't just for reviews — it's a tool for self-awareness, advocacy, and community support. Use it to see your own impact clearly, and help others see theirs too.</p>
                </div>
              </div>
            </div>
          </div>
      </div>
    </section>
  );
};
