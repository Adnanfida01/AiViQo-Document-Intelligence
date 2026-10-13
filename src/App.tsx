/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Header } from './components/landing/Header';
import { HeroSection } from './components/landing/HeroSection';
import { KPIStrip } from './components/landing/KPIStrip';
import { BentoFeatures } from './components/landing/BentoFeatures';
import { PipelineTimeline } from './components/landing/PipelineTimeline';
import { InteractiveFeatureShowcase } from './components/landing/InteractiveFeatureShowcase';
import { BuiltInFeaturesDock } from './components/landing/BuiltInFeaturesDock';
import { Footer } from './components/landing/Footer';
import { DocumentUploadModal } from './components/upload/DocumentUploadModal';
import { DiscrepancyPanel } from './components/operations/DiscrepancyPanel';
import { DuplicateManager } from './components/operations/DuplicateManager';
import { ProcessingQueueView } from './components/operations/ProcessingQueueView';
import { AuditTrailView } from './components/operations/AuditTrailView';
import {
  SAMPLE_DOCUMENTS,
  INITIAL_DISCREPANCIES,
  INITIAL_DUPLICATES,
  INITIAL_AUDIT_LOGS,
  INITIAL_JOBS
} from './data/mockData';
import { DocumentItem, DiscrepancyItem, DuplicateCandidate, AuditLogItem, ProcessingJob } from './types';

export default function App() {
  const [documents, setDocuments] = useState<DocumentItem[]>(SAMPLE_DOCUMENTS);
  const [selectedDocId, setSelectedDocId] = useState<string>(SAMPLE_DOCUMENTS[0].id);
  const [discrepancies, setDiscrepancies] = useState<DiscrepancyItem[]>(INITIAL_DISCREPANCIES);
  const [duplicates, setDuplicates] = useState<DuplicateCandidate[]>(INITIAL_DUPLICATES);
  const [auditLogs, setAuditLogs] = useState<AuditLogItem[]>(INITIAL_AUDIT_LOGS);
  const [jobs, setJobs] = useState<ProcessingJob[]>(INITIAL_JOBS);
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'canvas' | 'queue' | 'discrepancies' | 'duplicates' | 'audit'>('canvas');

  const currentDocument = documents.find((d) => d.id === selectedDocId) || documents[0];

  // Update extracted field handler (from Evidence Canvas)
  const handleUpdateField = (fieldKey: string, newValue: string, reason?: string) => {
    const prevField = currentDocument.fields.find((f) => f.key === fieldKey);
    const prevVal = prevField?.rawValue || '';

    // Update field in document
    const updatedFields = currentDocument.fields.map((f) => {
      if (f.key === fieldKey) {
        return {
          ...f,
          rawValue: newValue,
          confidence: 100, // human verified
          status: 'corrected' as const,
          isEdited: true,
          warnings: [], // resolve warning
        };
      }
      return f;
    });

    // Check if total was corrected, resolve arithmetic discrepancy if matched
    let updatedDocStatus = currentDocument.status;
    let updatedDiscrepancyCount = currentDocument.discrepancyCount;

    if (fieldKey === 'total_amount') {
      updatedDocStatus = 'awaiting_review';
      updatedDiscrepancyCount = 0;
      setDiscrepancies((prev) =>
        prev.map((d) =>
          d.documentId === currentDocument.id && d.ruleName.includes('Arithmetic')
            ? { ...d, resolved: true, explanation: `Resolved: Corrected value to ${newValue}` }
            : d
        )
      );
    }

    const updatedDoc: DocumentItem = {
      ...currentDocument,
      fields: updatedFields,
      status: updatedDocStatus,
      discrepancyCount: updatedDiscrepancyCount,
      overallConfidence: 99,
    };

    setDocuments((docs) => docs.map((d) => (d.id === currentDocument.id ? updatedDoc : d)));

    // Append to Audit Trail
    const newAudit: AuditLogItem = {
      id: `aud-${Date.now()}`,
      actor: 'Alex Rivera (Human Reviewer)',
      action: 'FIELD_CORRECTED',
      documentId: currentDocument.id,
      documentName: currentDocument.name,
      previousValue: prevVal,
      newValue: newValue,
      reason: reason || 'Reviewer correction via Evidence Canvas',
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19) + ' UTC',
      correlationId: `corr-${Date.now().toString().slice(-6)}`,
    };

    setAuditLogs((prev) => [newAudit, ...prev]);
  };

  // Approve Document Handler
  const handleApproveDocument = (docId: string) => {
    setDocuments((docs) =>
      docs.map((d) => (d.id === docId ? { ...d, status: 'approved', reviewer: 'Alex Rivera (Verified)' } : d))
    );

    const newAudit: AuditLogItem = {
      id: `aud-${Date.now()}`,
      actor: 'Alex Rivera (Lead Auditor)',
      action: 'DOCUMENT_APPROVED',
      documentId: docId,
      documentName: currentDocument.name,
      reason: 'All evidence coordinates verified and approved for ERP export',
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19) + ' UTC',
      correlationId: `corr-${Date.now().toString().slice(-6)}`,
    };

    setAuditLogs((prev) => [newAudit, ...prev]);
  };

  // Export JSON
  const handleExportJSON = (doc: DocumentItem) => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(doc, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `${doc.name.replace(/\.[^/.]+$/, '')}_verified.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  // Export CSV
  const handleExportCSV = (doc?: DocumentItem) => {
    const targetDoc = doc || currentDocument;
    const headers = ['Field Key', 'Field Label', 'Extracted Value', 'Confidence', 'Status', 'Evidence Page'];
    const rows = targetDoc.fields.map((f) => [
      f.key,
      f.label,
      `"${f.rawValue.replace(/"/g, '""')}"`,
      `${f.confidence}%`,
      f.status,
      f.evidence[0]?.page || 1,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', encodeURI(csvContent));
    downloadAnchor.setAttribute('download', `${targetDoc.name.replace(/\.[^/.]+$/, '')}_extracted.csv`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  // Ingest New Document
  const handleDocumentAdded = (newDoc: DocumentItem) => {
    setDocuments((prev) => [newDoc, ...prev]);
    setSelectedDocId(newDoc.id);
    setActiveTab('canvas');

    // Add Audit Log
    const newAudit: AuditLogItem = {
      id: `aud-${Date.now()}`,
      actor: 'Ingest & OCR Worker',
      action: 'DOCUMENT_INGESTED',
      documentId: newDoc.id,
      documentName: newDoc.name,
      reason: 'Multi-engine text extraction and schema binding complete',
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19) + ' UTC',
      correlationId: `corr-ingest-${newDoc.id}`,
    };
    setAuditLogs((prev) => [newAudit, ...prev]);
  };

  // Simulate new background job
  const handleTriggerNewJob = () => {
    const newJob: ProcessingJob = {
      id: `job-${Math.floor(Math.random() * 9000 + 1000)}`,
      documentId: `doc-${Date.now().toString().slice(-4)}`,
      documentName: `EXPENSE_BATCH_${Date.now().toString().slice(-3)}.pdf`,
      stage: 'native_parse',
      stageName: 'PDF Digital Text & Token Geometry',
      progressPercent: 35,
      startedAt: 'Just now',
      engine: 'OCRmyPDF v15.4',
    };
    setJobs((prev) => [newJob, ...prev]);
  };

  return (
    <div className="min-h-screen bg-[#06080F] text-[#F3F5FA] font-sans antialiased selection:bg-[#00D2FF]/25 selection:text-[#00D2FF]">
      
      {/* Modern Top Header */}
      <Header
        onOpenUpload={() => setIsUploadOpen(true)}
        onNavigateTab={(tab) => {
          setActiveTab(tab);
          const el = document.getElementById(tab === 'canvas' ? 'canvas-section' : 'operations-section');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
        activeTab={activeTab}
      />

      <main>
        {/* KPI Summary Strip */}
        <KPIStrip />

        {/* Hero Section with Embedded Evidence Canvas */}
        <div id="canvas-section">
          <HeroSection
            currentDocument={currentDocument}
            onOpenUpload={() => setIsUploadOpen(true)}
            onUpdateField={handleUpdateField}
            onApproveDocument={handleApproveDocument}
            onExportJSON={handleExportJSON}
            onExportCSV={handleExportCSV}
            onSelectSample={(id) => setSelectedDocId(id)}
            sampleDocuments={documents}
            onNavigateTab={(tab) => {
              setActiveTab(tab);
              const el = document.getElementById(tab === 'canvas' ? 'canvas-section' : 'operations-section');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
          />
        </div>

        {/* Dedicated Operations Workspace for Active Tab */}
        {activeTab !== 'canvas' && (
          <div id="operations-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-in fade-in duration-200">
            {activeTab === 'queue' && (
              <ProcessingQueueView jobs={jobs} onTriggerNewJob={handleTriggerNewJob} />
            )}
            {activeTab === 'discrepancies' && (
              <DiscrepancyPanel
                discrepancies={discrepancies}
                onResolve={(id) => setDiscrepancies((prev) => prev.map((d) => d.id === id ? { ...d, resolved: true } : d))}
                onSelectDocument={(id) => {
                  setSelectedDocId(id);
                  setActiveTab('canvas');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              />
            )}
            {activeTab === 'duplicates' && (
              <DuplicateManager
                candidates={duplicates}
                onDecide={(id, dec) => setDuplicates((prev) => prev.map((c) => c.id === id ? { ...c, status: dec } : c))}
              />
            )}
            {activeTab === 'audit' && (
              <AuditTrailView logs={auditLogs} onExportCSV={() => handleExportCSV()} />
            )}
          </div>
        )}

        {/* Bento Features: Multi-Engine OCR, Traceability, Discrepancies */}
        <BentoFeatures />

        {/* 6-Stage Autonomous Pipeline Timeline */}
        <PipelineTimeline />

        {/* Interactive Feature Showcase with Review Queue */}
        <InteractiveFeatureShowcase
          documents={documents}
          discrepancies={discrepancies}
          onSelectDocument={(id) => {
            setSelectedDocId(id);
            setActiveTab('canvas');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          onNavigateTab={setActiveTab}
        />

        {/* Built-In Engines Dock */}
        <BuiltInFeaturesDock onNavigateTab={setActiveTab} />
      </main>

      <Footer />

      {/* Real Ingest & Upload Modal */}
      <DocumentUploadModal
        isOpen={isUploadOpen}
        onClose={() => setIsUploadOpen(false)}
        onDocumentAdded={handleDocumentAdded}
      />

    </div>
  );
}
