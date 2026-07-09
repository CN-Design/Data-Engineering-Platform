import React, { useState, useEffect } from 'react';
import { Database, Code, Zap, Layers, Network, Terminal, Cloud, Radio, Workflow, Warehouse, Container, ShieldCheck, Siren, ChevronRight, ArrowLeft, Lock } from 'lucide-react';
import type { Category, Domain, Topic } from '../../../core/types/types';
import { FRONTEND_TECHS } from '../../frontend/loader';
import { BACKEND_TECHS, loadBackendManifest, manifestToTopics as backendManifestToTopics } from '../../backend-engineering/loader';
import { AI_AGENT_TECHS } from '../../ai-agents/loader';
import { allTopics } from '../data';
import { LearnJourneyPanel } from './LearnJourneyPanel';
import { Diagnostic } from './Diagnostic';
import { EngagementBar } from './EngagementBar';

interface PathSelectionProps {
  onSelectTech: (tech: Category, topicId?: string) => void;
  onBack: () => void;
  domain?: Domain;
}

type TechOption = { id: Category; title: string; description: string; icon: any; color: string; bg: string; available: boolean; topicCount: number };

// Completed topics from localStorage, used to show per-tech progress.
const getCompleted = (): Record<string, boolean> => {
  try { return JSON.parse(localStorage.getItem('de_completed_topics') || '{}'); } catch { return {}; }
};

const hexToBg = (hex: string) => {
  const h = hex.replace('#', '');
  const r = parseInt(h.substring(0, 2), 16);
  const g = parseInt(h.substring(2, 4), 16);
  const b = parseInt(h.substring(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, 0.1)`;
};

export const PathSelection: React.FC<PathSelectionProps> = ({ onSelectTech, onBack, domain = 'data-engineering' }) => {
  const [showDiagnostic, setShowDiagnostic] = useState(false);
  const countFor = (id: Category) => allTopics.filter(t => t.category === id).length;
  // Ordered as the recommended zero-to-job learning path (Phase 1.1 roadmap).
  const dataOptions: TechOption[] = [
    { id: 'foundations', title: 'Foundations (Start Here)', description: 'Command line, Linux, Git & version control, environment setup, and how to run jobs — the ground floor every Data Engineer stands on.', icon: Terminal, color: '#64748b', bg: 'rgba(100, 116, 139, 0.12)', available: true, topicCount: countFor('foundations') },
    { id: 'python', title: 'Python for DE', description: 'Python from scratch for data work: data structures, files, pandas/NumPy, APIs, DB connectivity, logging, packaging, and testing pipelines.', icon: Code, color: '#f59e0b', bg: 'rgba(245, 158, 11, 0.1)', available: true, topicCount: countFor('python') },
    { id: 'sql', title: 'Advanced SQL', description: 'Deep dive into complex queries, window functions, query optimization, and performance tuning.', icon: Database, color: '#10b981', bg: 'rgba(16, 185, 129, 0.1)', available: true, topicCount: countFor('sql') },
    { id: 'data-engineering', title: 'Data Engineering Core', description: 'Master core concepts, data modeling, ETL pipelines, and data warehouse architecture.', icon: Network, color: '#3b82f6', bg: 'rgba(59, 130, 246, 0.1)', available: true, topicCount: countFor('data-engineering') },
    { id: 'warehousing', title: 'Cloud Data Warehouses', description: 'Snowflake, BigQuery & Redshift: columnar/MPP architecture, partitioning & clustering, query optimization, cost & workload management, data sharing, and governance.', icon: Warehouse, color: '#0891b2', bg: 'rgba(8, 145, 178, 0.12)', available: true, topicCount: countFor('warehousing') },
    { id: 'orchestration', title: 'dbt & Orchestration', description: 'Modern ELT with dbt (models, tests, snapshots, macros) and workflow orchestration with Airflow, Dagster & Prefect — schedule, backfill, and run pipelines reliably.', icon: Workflow, color: '#f97316', bg: 'rgba(249, 115, 22, 0.12)', available: true, topicCount: countFor('orchestration') },
    { id: 'pyspark', title: 'Apache PySpark', description: 'Scale your data processing with distributed computing, RDDs, DataFrames, and Spark SQL.', icon: Zap, color: '#ef4444', bg: 'rgba(239, 68, 68, 0.1)', available: true, topicCount: countFor('pyspark') },
    { id: 'streaming', title: 'Kafka & Streaming', description: 'Real-time data with Apache Kafka: topics, partitions, consumer groups, delivery semantics, schema registry, Kafka Connect, Debezium/CDC, and stream processing.', icon: Radio, color: '#14b8a6', bg: 'rgba(20, 184, 166, 0.12)', available: true, topicCount: countFor('streaming') },
    { id: 'cloud', title: 'Cloud & Storage', description: 'Object storage, compute, IAM & security, managed data services, cost/FinOps, and cloud data-platform architecture across AWS, GCP & Azure.', icon: Cloud, color: '#0ea5e9', bg: 'rgba(14, 165, 233, 0.12)', available: true, topicCount: countFor('cloud') },
    { id: 'devops', title: 'DevOps & Deployment', description: 'Containers (Docker), Kubernetes, Terraform/IaC, and CI/CD for data pipelines — package, deploy, test, and operate DE workloads reliably.', icon: Container, color: '#6366f1', bg: 'rgba(99, 102, 241, 0.12)', available: true, topicCount: countFor('devops') },
    { id: 'dataquality', title: 'Data Quality & Observability', description: 'Trustworthy data: validation (Great Expectations/Soda), the five observability pillars, freshness/volume/schema monitoring, data contracts, SLAs/SLOs, and lineage-driven root-cause analysis.', icon: ShieldCheck, color: '#22c55e', bg: 'rgba(34, 197, 94, 0.12)', available: true, topicCount: countFor('dataquality') },
    { id: 'sre', title: 'Reliability & On-Call (SRE)', description: 'Operate data in production: SLIs/SLOs & error budgets, incident response & blameless postmortems, on-call runbooks, idempotency & backfills, retries/DLQs, safe deploys & rollback, disaster recovery (RPO/RTO), cost/FinOps, and debugging pipeline failures at scale.', icon: Siren, color: '#f43f5e', bg: 'rgba(244, 63, 94, 0.12)', available: true, topicCount: countFor('sre') },
    { id: 'databricks', title: 'Databricks', description: 'Build modern data lakehouses, manage Delta Lake, and orchestrate workflows efficiently.', icon: Layers, color: '#a855f7', bg: 'rgba(168, 85, 247, 0.1)', available: true, topicCount: countFor('databricks') },
  ];

  const frontendOptions: TechOption[] = FRONTEND_TECHS.map(t => ({
    id: t.id, title: t.title, description: t.description, icon: Code, color: t.color, bg: hexToBg(t.color), available: t.available, topicCount: t.topicCount || 0,
  }));

  const backendOptions: TechOption[] = BACKEND_TECHS.map(t => ({
    id: t.id, title: t.title, description: t.description, icon: Code, color: t.color, bg: hexToBg(t.color), available: t.available, topicCount: t.topicCount || 0,
  }));

  const aiAgentOptions: TechOption[] = AI_AGENT_TECHS.map(t => ({
    id: t.id, title: t.title, description: t.description, icon: Code, color: t.color, bg: hexToBg(t.color), available: t.available, topicCount: t.topicCount || 0,
  }));

  const isFrontend = domain === 'frontend';
  const isBackend = domain === 'backend-engineering';
  const isAiAgents = domain === 'ai-agents';
  const techOptions: TechOption[] = isFrontend ? frontendOptions : isBackend ? backendOptions : isAiAgents ? aiAgentOptions : dataOptions;
  const heading = isFrontend ? 'Frontend Engineering' : isBackend ? 'Backend Engineering' : isAiAgents ? 'AI Agents' : 'Data Engineering Stack';

  // Backend: load all available-tech topics so the engagement bar + "For You"
  // panel can surface resume/due/mastery (mirrors the DE journey layer).
  const [backendJourneyTopics, setBackendJourneyTopics] = useState<Topic[]>([]);
  useEffect(() => {
    if (!isBackend) return;
    let cancelled = false;
    (async () => {
      const all: Topic[] = [];
      for (const t of BACKEND_TECHS.filter(t => t.available)) {
        const m = await loadBackendManifest(t.id);
        if (m) all.push(...backendManifestToTopics(m));
      }
      if (!cancelled) setBackendJourneyTopics(all);
    })();
    return () => { cancelled = true; };
  }, [isBackend]);

  const completed = getCompleted();
  const completedFor = (id: Category) => Object.keys(completed).filter(tid => completed[tid] && tid.startsWith(id + '-')).length;

  // Guided roadmap (Data Engineering domain only): the techs above are ordered
  // as the recommended learning path; the first not-yet-finished step is the
  // "recommended next" stop.
  const isData = !isFrontend && !isBackend && !isAiAgents;
  const stepIndex = (id: Category) => techOptions.findIndex(t => t.id === id);
  const nextStepId: Category | null = isData
    ? (dataOptions.find(t => t.available && completedFor(t.id) < t.topicCount)?.id ?? null)
    : null;

  return (
    <div className="dashboard-container animate-fade-in" style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '40px 20px',
      background: 'var(--bg-primary)',
      overflowX: 'hidden',
      width: '100%',
      boxSizing: 'border-box',
      position: 'relative'
    }}>
      {/* Back Button */}
      <button
        onClick={onBack}
        className="glass-panel"
        style={{
          alignSelf: 'flex-start',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          padding: '10px 16px',
          borderRadius: '12px',
          border: '1px solid var(--border-glass)',
          background: 'var(--bg-glass)',
          color: 'var(--text-primary)',
          cursor: 'pointer',
          fontWeight: 600,
          transition: 'all 0.2s ease',
          marginBottom: '20px',
          zIndex: 10
        }}
        onMouseEnter={(e) => e.currentTarget.style.background = 'var(--bg-inner)'}
        onMouseLeave={(e) => e.currentTarget.style.background = 'var(--bg-glass)'}
      >
        <ArrowLeft size={18} />
        Back to Dashboard
      </button>

      <div style={{ textAlign: 'center', marginBottom: '60px', width: '100%', maxWidth: '800px', marginTop: '20px' }}>
        <h1 style={{
          fontSize: 'clamp(32px, 6vw, 48px)',
          fontWeight: 800,
          marginBottom: '16px',
          background: 'linear-gradient(135deg, #3b82f6 0%, #a855f7 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          letterSpacing: '-1px'
        }}>
          {heading}
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: 'clamp(15px, 4vw, 18px)', margin: '0 auto', lineHeight: 1.6 }}>
          Select a technology or domain to dive into tailored courses, interview prep, and coding challenges.
        </p>
      </div>

      {/* Engagement (Data Engineering only) */}
      {isData && <EngagementBar topics={allTopics} />}

      {/* Personalized journey helpers (Data Engineering only) */}
      {isData && (
        <LearnJourneyPanel
          topics={allTopics}
          onSelectTech={onSelectTech}
          onStartDiagnostic={() => setShowDiagnostic(true)}
        />
      )}

      {isData && showDiagnostic && (
        <Diagnostic
          onPick={(track) => { setShowDiagnostic(false); onSelectTech(track as Category); }}
          onClose={() => setShowDiagnostic(false)}
        />
      )}

      {/* Backend engagement + personalized journey (reuses the DE engine) */}
      {isBackend && backendJourneyTopics.length > 0 && (
        <>
          <EngagementBar topics={backendJourneyTopics} domainLabel="Backend Engineering" />
          <LearnJourneyPanel
            topics={backendJourneyTopics}
            onSelectTech={onSelectTech}
            onStartDiagnostic={() => { /* placement is DE-only */ }}
            showPlacement={false}
          />
        </>
      )}

      {/* Removed the old horizontal learning path as requested */}

      <div style={{ width: '100%', maxWidth: '1100px', marginBottom: '24px' }}>
        <h2 style={{
          fontSize: '24px',
          fontWeight: 800,
          color: 'var(--text-primary)',
          display: 'flex',
          alignItems: 'center',
          gap: '12px'
        }}>
          Explore Modules
          <div style={{ height: '2px', flex: 1, background: 'linear-gradient(90deg, var(--border-glass), transparent)' }} />
        </h2>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(min(320px, 100%), 1fr))',
        gap: '24px',
        width: '100%',
        maxWidth: '1100px',
        boxSizing: 'border-box'
      }}>
        {techOptions.map((tech) => (
          <div
            key={tech.id}
            onClick={() => { if (tech.available) onSelectTech(tech.id); }}
            className="domain-card glass-panel group"
            style={{
              padding: '28px',
              borderRadius: '20px',
              border: '1px solid var(--border-glass)',
              background: 'var(--bg-glass)',
              cursor: tech.available ? 'pointer' : 'not-allowed',
              opacity: tech.available ? 1 : 0.6,
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              position: 'relative',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column'
            }}
            onMouseEnter={(e) => {
              if (!tech.available) return;
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.boxShadow = `0 12px 24px -10px ${tech.bg.replace('0.1', '0.5')}`;
              e.currentTarget.style.borderColor = tech.color;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'var(--shadow-glass)';
              e.currentTarget.style.borderColor = 'var(--border-glass)';
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{
                  width: '52px', height: '52px', borderRadius: '14px',
                  background: tech.bg, display: 'flex', alignItems: 'center', justifyContent: 'center',
                  transition: 'transform 0.3s ease'
                }} className="icon-container">
                  <tech.icon size={26} color={tech.color} />
                </div>
                {isData && stepIndex(tech.id) >= 0 && (
                  <span style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.5px', color: tech.id === nextStepId ? tech.color : 'var(--text-muted)', background: 'var(--bg-inner)', border: `1px solid ${tech.id === nextStepId ? tech.color : 'var(--border-glass)'}`, padding: '3px 9px', borderRadius: '999px', whiteSpace: 'nowrap' }}>Step {stepIndex(tech.id) + 1}</span>
                )}
              </div>
              {tech.available
                ? <ChevronRight size={22} color="var(--text-muted)" className="card-arrow" style={{ transition: 'transform 0.3s ease' }} />
                : <div style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'var(--bg-inner)', padding: '4px 10px', borderRadius: '20px' }}><Lock size={12} color="var(--text-muted)" /><span style={{ fontSize: '11px', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Soon</span></div>}
            </div>

            <h2 style={{ fontSize: '22px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '10px' }}>
              {tech.title}
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '15px', lineHeight: 1.5, flex: 1, margin: 0 }}>
              {tech.description}
            </p>

            {tech.available && tech.topicCount > 0 && (() => {
              const done = completedFor(tech.id);
              const pct = Math.round((done / tech.topicCount) * 100);
              return (
                <div style={{ marginTop: '18px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px', fontSize: '12.5px' }}>
                    <span style={{ color: 'var(--text-muted)', fontWeight: 600 }}>{tech.topicCount} topics</span>
                    <span style={{ color: done > 0 ? tech.color : 'var(--text-muted)', fontWeight: 600 }}>{done > 0 ? `${done} done · ${pct}%` : 'Not started'}</span>
                  </div>
                  <div style={{ height: '6px', borderRadius: '999px', background: 'var(--bg-inner)', overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: `${pct}%`, background: tech.color, borderRadius: '999px', transition: 'width 0.3s ease' }} />
                  </div>
                </div>
              );
            })()}
          </div>
        ))}
      </div>
    </div>
  );
};
