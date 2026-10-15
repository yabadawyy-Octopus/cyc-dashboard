import React, { useState, useMemo, useCallback } from 'react';
import { 
  ShieldCheck, HardDrive, Server, Cpu, Search, Filter, 
  RefreshCw, Lock, CheckCircle2, 
  Activity, Database, Layers, ArrowUpRight, ArrowDownRight, Menu, X,
  CreditCard, Settings as SettingsIcon, Leaf, Wallet, RotateCcw 
} from 'lucide-react';

const INITIAL_CHUNKS = [
  { id: 'CHK-9921', name: 'financial_audit_2026.enc', size: '2.4 GB', type: 'DOCUMENT', status: 'مُزامن', hash: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855' },
  { id: 'CHK-9922', name: 'user_vault_backup_v4.db', size: '14.8 GB', type: 'DATABASE', status: 'مُزامن', hash: '8f434346648f6b96df89dda901c5176b10a6d83961dd3c1ac88b59b2dc327aa4' },
  { id: 'CHK-9923', name: 'sec_keys_cluster_alpha.pem', size: '128 KB', type: 'KEY', status: 'قيد النسخ', hash: 'a591a6d40bf420404a011733cfb7b190d62c65bf0bcda32b57b277d9ad9f146e' },
  { id: 'CHK-9924', name: 'telemetry_logs_q3.log', size: '850 MB', type: 'LOG', status: 'مُزامن', hash: '1b89b715e69282808c96d426563a9c9944d57d39600a1bb712828737609a87d0' },
  { id: 'CHK-9925', name: 'green_energy_report.pdf', size: '5.1 MB', type: 'DOCUMENT', status: 'مُزامن', hash: 'c234a9b1823ef0021c4391a2938102a39281a18290281b29381c01b23901b239' },
  { id: 'CHK-9926', name: 'banana_fiber_nodes_map.json', size: '42 KB', type: 'KEY', status: 'قيد النسخ', hash: 'd918230192830192830192830192830192830192830192830192830192830192' }
];

export default function CYCDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('ALL');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState('pro');
  const [selectedPayment, setSelectedPayment] = useState('card');
  const [isSyncing, setIsSyncing] = useState(false);
  const [carbonSaved, setCarbonSaved] = useState(1420);
  const [settings, setSettings] = useState({
    notifications: true,
    bananaFiberEcoMode: true,
    autoBackup: true
  });

  const filteredChunks = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    return INITIAL_CHUNKS.filter(chunk => {
      const matchesSearch = !query || 
        chunk.name.toLowerCase().includes(query) || 
        chunk.id.toLowerCase().includes(query) ||
        chunk.hash.toLowerCase().includes(query);
      const matchesType = filterType === 'ALL' || chunk.type === filterType;
      return matchesSearch && matchesType;
    });
  }, [searchQuery, filterType]);

  const handleSync = useCallback(() => {
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
      setCarbonSaved(prev => prev + 24);
    }, 1500);
  }, []);

  const resetFilters = useCallback(() => {
    setSearchQuery('');
    setFilterType('ALL');
  }, []);

  return (
    <div dir="rtl" className="min-h-screen bg-[#05080e] text-[#ffffff] flex flex-col font-sans antialiased selection:bg-[#16a34a] selection:text-white">
      <header className="h-16 border-b border-[#16a34a]/20 bg-[#090d16]/95 backdrop-blur sticky top-0 z-40 px-4 md:px-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setSidebarOpen(prev => !prev)}
            className="md:hidden p-2 text-slate-400 hover:text-white focus:outline-none"
          >
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-br from-[#16a34a] to-[#0284c7] rounded-xl shadow-lg shadow-[#16a34a]/10">
              <Database className="w-5 h-5 text-white stroke-[2.5]" />
            </div>
            <div>
              <span className="font-bold text-lg tracking-wider bg-gradient-to-r from-white via-slate-200 to-[#84cc16] bg-clip-text text-transparent">CYC</span>
              <span className="text-[10px] text-[#84cc16] font-mono mr-2 px-1.5 py-0.5 bg-[#16a34a]/10 border border-[#16a34a]/30 rounded">
