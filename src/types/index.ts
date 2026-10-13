export type DocumentType = 'invoice' | 'receipt' | 'contract' | 'bank_statement' | 'purchase_order';

export interface BoundingBox {
  x: number;      // percentage from left (0 to 100)
  y: number;      // percentage from top (0 to 100)
  width: number;  // percentage width (0 to 100)
  height: number; // percentage height (0 to 100)
}

export interface FieldEvidence {
  page: number;
  text: string;
  bbox: BoundingBox;
  tokenConfidence?: number;
}

export interface ExtractedField {
  key: string;
  label: string;
  category: 'Header' | 'Parties' | 'Amounts' | 'Line Items' | 'Dates & Terms';
  rawValue: string;
  normalizedValue: string | number | null;
  dataType: 'string' | 'date' | 'currency' | 'number' | 'identifier';
  confidence: number; // 0 to 100
  status: 'verified' | 'needs_review' | 'corrected' | 'flagged';
  evidence: FieldEvidence[];
  warnings?: string[];
  isEdited?: boolean;
  originalMachineValue?: string;
}

export interface DocumentItem {
  id: string;
  name: string;
  type: DocumentType;
  size: string;
  pageCount: number;
  status: 'uploaded' | 'ocr_running' | 'extracting' | 'awaiting_review' | 'approved' | 'discrepancy_detected';
  uploadDate: string;
  hash: string;
  overallConfidence: number;
  reviewer?: string;
  fields: ExtractedField[];
  discrepancyCount: number;
  isDuplicate?: boolean;
}

export interface DiscrepancyItem {
  id: string;
  documentId: string;
  documentName: string;
  ruleName: string;
  severity: 'Critical' | 'Medium' | 'Low';
  explanation: string;
  affectedFields: string[];
  resolved: boolean;
  suggestedFix?: string;
  detectedAt: string;
}

export interface DuplicateCandidate {
  id: string;
  documentAId: string;
  documentAName: string;
  documentBId: string;
  documentBName: string;
  similarityScore: number;
  matchReason: string;
  status: 'pending' | 'confirmed' | 'dismissed';
  detectedAt: string;
  matchingFields: string[];
}

export interface ExtractionSchema {
  id: string;
  name: string;
  documentType: DocumentType;
  version: string;
  fieldCount: number;
  fields: {
    key: string;
    label: string;
    type: string;
    required: boolean;
    confidenceThreshold: number;
  }[];
}

export interface AuditLogItem {
  id: string;
  actor: string;
  action: string;
  documentId: string;
  documentName: string;
  previousValue?: string;
  newValue?: string;
  reason?: string;
  timestamp: string;
  correlationId: string;
}

export interface ProcessingJob {
  id: string;
  documentId: string;
  documentName: string;
  stage: 'validating' | 'native_parse' | 'tesseract_ocr' | 'schema_extract' | 'validation' | 'complete';
  stageName: string;
  progressPercent: number;
  startedAt: string;
  engine: 'Native PDF' | 'OCRmyPDF v15.4' | 'Tesseract 5.3' | 'Gemini 2.5 Vision';
}
