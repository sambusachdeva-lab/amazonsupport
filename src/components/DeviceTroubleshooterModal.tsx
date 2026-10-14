import React, { useState } from 'react';
import { X, Cpu, Wifi, RotateCcw, Volume2, CheckCircle2, AlertCircle, ArrowRight, Sparkles } from 'lucide-react';
import { OrderItem } from '../types';

interface DeviceTroubleshooterModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedOrder?: OrderItem | null;
  onOpenContact: () => void;
}

export const DeviceTroubleshooterModal: React.FC<DeviceTroubleshooterModalProps> = ({
  isOpen,
  onClose,
  selectedOrder,
  onOpenContact
}) => {
  const [selectedDevice, setSelectedDevice] = useState(
    selectedOrder?.title.includes('Echo') ? 'Echo Dot (5th Gen)' : 'Kindle Paperwhite (16 GB)'
  );
  const [symptom, setSymptom] = useState('Wi-Fi connection failed or dropped');
  const [diagnosticStep, setDiagnosticStep] = useState<1 | 2 | 3>(1);
  const [isDiagnosing, setIsDiagnosing] = useState(false);
  const [diagnosisResult, setDiagnosisResult] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleRunDiagnostics = () => {
    setIsDiagnosing(true);
    setTimeout(() => {
      setIsDiagnosing(false);
      setDiagnosisResult('Diagnostics completed. Detected 5GHz channel interference on local Wi-Fi router. Suggested fix: Switch to 2.4GHz network or restart router.');
      setDiagnosticStep(3);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-xl overflow-hidden border border-slate-300 my-6">
        {/* Header */}
        <div className="bg-[#131921] text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Cpu className="w-5 h-5 text-[#febd69]" />
            <h2 className="text-sm font-bold text-white">Amazon Device Support & Diagnostics</h2>
          </div>
          <button onClick={onClose} className="p-1 rounded hover:bg-slate-700 text-slate-300">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-5">
          {/* Step 1: Select Device & Problem */}
          {diagnosticStep === 1 && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Select your Amazon device:
                </label>
                <select
                  value={selectedDevice}
                  onChange={(e) => setSelectedDevice(e.target.value)}
                  className="w-full text-xs p-2.5 bg-slate-50 border border-slate-300 rounded focus:ring-1 focus:ring-[#f08804]"
                >
                  <option>Echo Dot (5th Gen) - Serial G091A8092841</option>
                  <option>Kindle Paperwhite (16 GB) - Serial B08KTZ8249</option>
                  <option>Fire TV Stick 4K Max</option>
                  <option>Echo Show 8 (3rd Gen)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  What symptom is occurring?
                </label>
                <div className="space-y-2">
                  {[
                    'Wi-Fi connection failed or dropped',
                    'Orange or red light ring glowing on Echo',
                    'Screen frozen or unresponsive',
                    'Bluetooth audio distortion or pairing failure',
                    'Battery draining faster than expected'
                  ].map((sym) => (
                    <label 
                      key={sym}
                      className={`flex items-center gap-2.5 p-2.5 rounded border text-xs cursor-pointer ${
                        symptom === sym ? 'border-[#f08804] bg-amber-50/60 font-semibold' : 'border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      <input
                        type="radio"
                        name="symptom"
                        checked={symptom === sym}
                        onChange={() => setSymptom(sym)}
                        className="text-[#f08804]"
                      />
                      <span>{sym}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  onClick={() => setDiagnosticStep(2)}
                  className="px-5 py-2 text-xs amazon-btn-primary flex items-center gap-1.5"
                >
                  <span>Start Step-by-Step Fix</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}

          {/* Step 2: Guided resolution + automated test */}
          {diagnosticStep === 2 && (
            <div className="space-y-4">
              <div className="border border-slate-200 rounded-lg p-4 bg-slate-50 space-y-3">
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wide">
                  Recommended Quick Resolution Steps:
                </h3>
                <ol className="list-decimal pl-4 text-xs text-slate-700 space-y-2 leading-relaxed">
                  <li><strong>Restart {selectedDevice}:</strong> Unplug power cable for 30 seconds, then reconnect.</li>
                  <li><strong>Check Router Signal:</strong> Ensure device is within 30 feet of your router.</li>
                  <li><strong>Test Cloud Sync:</strong> Run our remote diagnostic test below to check device telemetry and DNS latency.</li>
                </ol>
              </div>

              <div className="text-center py-3">
                <button
                  onClick={handleRunDiagnostics}
                  disabled={isDiagnosing}
                  className="px-6 py-2.5 text-xs amazon-btn-primary font-bold inline-flex items-center gap-2 disabled:opacity-50"
                >
                  {isDiagnosing ? (
                    <>
                      <RotateCcw className="w-4 h-4 animate-spin" />
                      <span>Testing Device Ping & Firmware...</span>
                    </>
                  ) : (
                    <>
                      <Wifi className="w-4 h-4" />
                      <span>Run Remote Network Test</span>
                    </>
                  )}
                </button>
              </div>

              <div className="flex justify-between pt-2">
                <button
                  onClick={() => setDiagnosticStep(1)}
                  className="px-4 py-1.5 text-xs amazon-btn-secondary"
                >
                  Back
                </button>
                <button
                  onClick={() => {
                    onClose();
                    onOpenContact();
                  }}
                  className="text-xs amazon-link font-medium"
                >
                  Skip to live device agent
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Result */}
          {diagnosticStep === 3 && (
            <div className="space-y-4 text-center">
              <div className="w-12 h-12 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <h3 className="text-sm font-bold text-slate-900">Diagnostic Analysis Complete</h3>
              <div className="p-3 bg-slate-100 rounded text-xs text-slate-700 leading-relaxed text-left border border-slate-200">
                {diagnosisResult}
              </div>

              <div className="flex justify-center gap-3 pt-3">
                <button
                  onClick={onClose}
                  className="px-5 py-2 text-xs amazon-btn-primary"
                >
                  Fixed My Issue
                </button>
                <button
                  onClick={() => {
                    onClose();
                    onOpenContact();
                  }}
                  className="px-5 py-2 text-xs amazon-btn-secondary"
                >
                  Still Need Help
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
