import React, { useState, useMemo, useCallback } from "react";
import {
 ShieldCheck,
 HardDrive,
 Server,
 Cpu,
 Search,
 Filter,
 RefreshCw,
 Lock,
 CheckCircle2,
 Activity,
 Database,
 Layers,
 ArrowUpRight,
 ArrowDownRight,
 Menu,
 X,
 CreditCard,
 Settings as SettingsIcon,
 Leaf,
 Wallet,
 RotateCcw,
} from "lucide-react";


const INITIAL_CHUNKS = [
 {
   id: "CHK-9921",
   name: "financial_audit_2026.enc",
   size: "2.4 GB",
   type: "DOCUMENT",
   status: "مُزامن",
   hash: "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
 },
 {
   id: "CHK-9922",
   name: "user_vault_backup_v4.db",
   size: "14.8 GB",
   type: "DATABASE",
   status: "مُزامن",
   hash: "8f434346648f6b96df89dda901c5176b10a6d83961dd3c1ac88b59b2dc327aa4",
 },
 {
   id: "CHK-9923",
   name: "sec_keys_cluster_alpha.pem",
   size: "128 KB",
   type: "KEY",
   status: "قيد النسخ",
   hash: "a591a6d40bf420404a011733cfb7b190d62c65bf0bcda32b57b277d9ad9f146e",
 },
 {
   id: "CHK-9924",
   name: "telemetry_logs_q3.log",
   size: "850 MB",
   type: "LOG",
   status: "مُزامن",
   hash: "1b89b715e69282808c96d426563a9c9944d57d39600a1bb712828737609a87d0",
 },
 {
   id: "CHK-9925",
   name: "green_energy_report.pdf",
   size: "5.1 MB",
   type: "DOCUMENT",
   status: "مُزامن",
   hash: "c234a9b1823ef0021c4391a2938102a39281a18290281b29381c01b23901b239",
 },
 {
   id: "CHK-9926",
   name: "banana_fiber_nodes_map.json",
   size: "42 KB",
   type: "KEY",
   status: "قيد النسخ",
   hash: "d918230192830192830192830192830192830192830192830192830192830192",
 },
];


export default function CYCDashboard() {
 const [activeTab, setActiveTab] = useState("overview");
 const [searchQuery, setSearchQuery] = useState("");
 const [filterType, setFilterType] = useState("ALL");
 const [sidebarOpen, setSidebarOpen] = useState(false);
 const [selectedPlan, setSelectedPlan] = useState("pro");
 const [selectedPayment, setSelectedPayment] = useState("card");
 const [isSyncing, setIsSyncing] = useState(false);
 const [carbonSaved, setCarbonSaved] = useState(1420);
 const [settings, setSettings] = useState({
   notifications: true,
   bananaFiberEcoMode: true,
   autoBackup: true,
 });


 const filteredChunks = useMemo(() => {
   const query = searchQuery.trim().toLowerCase();
   return INITIAL_CHUNKS.filter((chunk) => {
     const matchesSearch =
       !query ||
       chunk.name.toLowerCase().includes(query) ||
       chunk.id.toLowerCase().includes(query) ||
       chunk.hash.toLowerCase().includes(query);
     const matchesType = filterType === "ALL" || chunk.type === filterType;
     return matchesSearch && matchesType;
   });
 }, [searchQuery, filterType]);


 const handleSync = useCallback(() => {
   setIsSyncing(true);
   setTimeout(() => {
     setIsSyncing(false);
     setCarbonSaved((prev) => prev + 24);
   }, 1500);
 }, []);


 const resetFilters = useCallback(() => {
   setSearchQuery("");
   setFilterType("ALL");
 }, []);


 return (
   <div
     dir="rtl"
     className="min-h-screen bg-[#05080e] text-[#ffffff] flex flex-col font-sans antialiased selection:bg-[#16a34a] selection:text-white"
   >
     <header className="h-16 border-b border-[#16a34a]/20 bg-[#090d16]/95 backdrop-blur sticky top-0 z-40 px-4 md:px-6 flex items-center justify-between">
       <div className="flex items-center gap-4">
         <button
           onClick={() => setSidebarOpen((prev) => !prev)}
           className="md:hidden p-2 text-slate-400 hover:text-white focus:outline-none"
         >
           {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
         </button>
         <div className="flex items-center gap-3">
           <div className="p-2 bg-gradient-to-br from-[#16a34a] to-[#0284c7] rounded-xl shadow-lg shadow-[#16a34a]/10">
             <Database className="w-5 h-5 text-white stroke-[2.5]" />
           </div>
           <div>
             <span className="font-bold text-lg tracking-wider bg-gradient-to-r from-white via-slate-200 to-[#84cc16] bg-clip-text text-transparent">
               CYC
             </span>
             <span className="text-[10px] text-[#84cc16] font-mono mr-2 px-1.5 py-0.5 bg-[#16a34a]/10 border border-[#16a34a]/30 rounded">
               ألياف سحابية خضراء
             </span>
           </div>
         </div>
       </div>


       <div className="flex items-center gap-3">
         <div className="hidden md:flex items-center gap-2 px-3.5 py-1.5 bg-[#16a34a]/10 border border-[#16a34a]/30 rounded-full text-xs font-mono text-[#84cc16]">
           <Leaf size={14} className="text-[#16a34a] animate-pulse" />
           <span>
             عداد الكربون الرقمي:{" "}
             <strong className="text-white" dir="ltr">
               {carbonSaved.toLocaleString()} كجم CO₂
             </strong>{" "}
             موفرة
           </span>
         </div>
         <button
           onClick={handleSync}
           disabled={isSyncing}
           className="flex items-center gap-2 px-3.5 py-1.5 text-xs font-bold bg-[#16a34a] hover:bg-[#15803d] disabled:opacity-50 text-white rounded-lg transition-all shadow-md shadow-[#16a34a]/20 cursor-pointer"
         >
           <RefreshCw size={14} className={isSyncing ? "animate-spin" : ""} />
           {isSyncing ? "جاري المزامنة..." : "مزامنة العقد"}
         </button>
       </div>
     </header>


     <div className="flex-1 flex relative">
       <aside
         className={`
         fixed md:static inset-y-0 right-0 z-30 w-64 bg-[#090d16]/95 border-l border-[#16a34a]/20 p-4 transition-transform duration-200 ease-in-out
         ${sidebarOpen ? "translate-x-0" : "translate-x-full md:translate-x-0"}
       `}
       >
         <nav className="space-y-1.5 mt-2">
           <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider px-3 mb-2 font-mono">
             قائمة التحكم المؤسسية
           </div>
           {[
             {
               id: "overview",
               label: "الرئيسية وتحليلات الطاقة",
               icon: Activity,
             },
             { id: "vault", label: "مستكشف الخزنة والملفات", icon: Layers },
             {
               id: "billing",
               label: "الاشتراكات والمدفوعات",
               icon: CreditCard,
             },
             {
               id: "settings",
               label: "الإعدادات المبسطة",
               icon: SettingsIcon,
             },
           ].map((item) => {
             const Icon = item.icon;
             const isActive = activeTab === item.id;
             return (
               <button
                 key={item.id}
                 onClick={() => {
                   setActiveTab(item.id);
                   setSidebarOpen(false);
                 }}
                 className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-xl text-sm font-medium transition-all cursor-pointer ${
                   isActive
                     ? "bg-gradient-to-l from-[#16a34a]/20 to-[#0284c7]/20 text-[#84cc16] border border-[#16a34a]/40 shadow-sm font-bold"
                     : "text-slate-300 hover:bg-slate-800/40 hover:text-white"
                 }`}
               >
                 <Icon
                   size={18}
                   className={isActive ? "text-[#16a34a]" : "text-slate-400"}
                 />
                 {item.label}
               </button>
             );
           })}
         </nav>
       </aside>


       <main className="flex-1 p-4 md:p-8 space-y-6 overflow-x-hidden bg-[#05080e]">
         {activeTab === "overview" && (
           <div className="space-y-6">
             <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
               {[
                 {
                   label: "إجمالي السعة المخزنة",
                   value: "48.2 TB",
                   change: "+12.5%",
                   trend: "up",
                   icon: HardDrive,
                 },
                 {
                   label: "العقد السحابية النشطة",
                   value: "1,024 / 1,024",
                   change: "100% متصل",
                   trend: "up",
                   icon: Server,
                 },
                 {
                   label: "مستوى التشفير الآمن",
                   value: "AES-256-GCM",
                   change: "محمي تماماً",
                   trend: "up",
                   icon: ShieldCheck,
                 },
                 {
                   label: "سرعة نقل الألياف",
                   value: "3.4 Gbps",
                   change: "-2.1%",
                   trend: "down",
                   icon: Cpu,
                 },
               ].map((stat, idx) => {
                 const Icon = stat.icon;
                 return (
                   <div
                     key={idx}
                     className="bg-[#0b121e] border border-[#16a34a]/20 p-4 rounded-xl space-y-2 hover:border-[#16a34a]/40 transition-colors shadow-sm"
                   >
                     <div className="flex items-center justify-between text-slate-400">
                       <span className="text-xs font-medium">
                         {stat.label}
                       </span>
                       <Icon size={18} className="text-[#0284c7]" />
                     </div>
                     <div
                       className="text-2xl font-bold font-mono text-white"
                       dir="ltr"
                     >
                       {stat.value}
                     </div>
                     <div className="flex items-center gap-1 text-xs font-mono">
                       {stat.trend === "up" ? (
                         <span className="text-[#16a34a] flex items-center gap-1">
                           <ArrowUpRight size={14} />{" "}
                           <span dir="ltr">{stat.change}</span>
                         </span>
                       ) : (
                         <span className="text-rose-400 flex items-center gap-1">
                           <ArrowDownRight size={14} />{" "}
                           <span dir="ltr">{stat.change}</span>
                         </span>
                       )}
                       <span className="text-slate-500 mr-auto">
                         مقارنة بالفترة السابقة
                       </span>
                     </div>
                   </div>
                 );
               })}
             </section>


             <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
               <div className="lg:col-span-2 bg-[#0b121e] border border-[#16a34a]/20 rounded-xl p-5 space-y-4">
                 <div className="flex items-center justify-between">
                   <div>
                     <h3 className="font-semibold text-white">
                       أداء السحابة البيئية (ألياف الموز)
                     </h3>
                     <p className="text-xs text-slate-400">
                       معدل نقل الكتل المشفرة وتوفير الطاقة الخضراء
                     </p>
                   </div>
                   <span className="text-xs font-mono text-[#84cc16] bg-[#16a34a]/10 px-2.5 py-1 border border-[#16a34a]/30 rounded">
                     متصل مباشر
                   </span>
                 </div>


                 <div className="h-48 w-full bg-[#05080e] border border-[#16a34a]/20 rounded-lg flex items-end justify-between p-4 gap-2">
                   {[45, 60, 55, 80, 92, 70, 96, 65, 85, 90, 75, 95].map(
                     (height, i) => (
                       <div
                         key={i}
                         className="w-full bg-[#16a34a]/30 rounded-t hover:bg-[#16a34a] transition-all group relative flex flex-col justify-end"
                         style={{ height: `${height}%` }}
                       >
                         <div className="opacity-0 group-hover:opacity-100 absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-900 text-[10px] font-mono px-1.5 py-0.5 rounded border border-[#16a34a]/40 text-[#84cc16] pointer-events-none transition-opacity">
                           {height}%
                         </div>
                       </div>
                     )
                   )}
                 </div>
               </div>


               <div className="bg-[#0b121e] border border-[#16a34a]/20 rounded-xl p-5 space-y-4">
                 <h3 className="font-semibold text-white">
                   صحة وتكامل النظام والأمان
                 </h3>
                 <div className="space-y-3 text-xs font-mono">
                   <div className="p-3 bg-[#05080e] rounded-lg border border-[#16a34a]/20 flex items-center justify-between">
                     <div className="flex items-center gap-2">
                       <CheckCircle2 size={16} className="text-[#16a34a]" />
                       <span>براهين المعرفة الصفرية</span>
                     </div>
                     <span className="text-[#16a34a]">مُحقق</span>
                   </div>
                   <div className="p-3 bg-[#05080e] rounded-lg border border-[#16a34a]/20 flex items-center justify-between">
                     <div className="flex items-center gap-2">
                       <CheckCircle2 size={16} className="text-[#16a34a]" />
                       <span>النسخ المتعدد (ألياف موز)</span>
                     </div>
                     <span className="text-[#16a34a]">3x مُكرر</span>
                   </div>
                   <div className="p-3 bg-[#05080e] rounded-lg border border-[#16a34a]/20 flex items-center justify-between">
                     <div className="flex items-center gap-2">
                       <Lock size={16} className="text-[#0284c7]" />
                       <span>تشفير مقاوم للكم</span>
                     </div>
                     <span className="text-[#38bdf8]">نشط</span>
                   </div>
                 </div>
               </div>
             </div>
           </div>
         )}


         {activeTab === "vault" && (
           <div className="bg-[#0b121e] border border-[#16a34a]/20 rounded-xl p-5 space-y-4">
             <div className="flex flex-col sm:flex-row gap-3 justify-between items-start sm:items-center">
               <div className="relative w-full sm:w-80">
                 <Search
                   size={16}
                   className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500"
                 />
                 <input
                   type="text"
                   placeholder="البحث باسم الملف أو الكود أو بصمة الـ Hash..."
                   value={searchQuery}
                   onChange={(e) => setSearchQuery(e.target.value)}
                   className="w-full bg-[#05080e] border border-[#16a34a]/30 rounded-lg pr-9 pl-4 py-2 text-xs text-slate-200 focus:outline-none focus:border-[#16a34a] transition-colors font-mono"
                 />
               </div>
               <div className="flex items-center gap-2 w-full sm:w-auto">
                 <Filter size={16} className="text-slate-500" />
                 <select
                   value={filterType}
                   onChange={(e) => setFilterType(e.target.value)}
                   className="bg-[#05080e] border border-[#16a34a]/30 rounded-lg px-3 py-2 text-xs text-slate-300 focus:outline-none focus:border-[#16a34a] font-mono cursor-pointer"
                 >
                   <option value="ALL">جميع الأنواع</option>
                   <option value="DOCUMENT">مستندات</option>
                   <option value="DATABASE">قواعد بيانات</option>
                   <option value="KEY">مفاتيح آمنة</option>
                   <option value="LOG">سجلات النظام</option>
                 </select>
               </div>
             </div>


             <div className="overflow-x-auto rounded-lg border border-[#16a34a]/20">
               <table className="w-full text-right border-collapse">
                 <thead>
                   <tr className="bg-[#05080e] text-[11px] font-mono uppercase text-slate-400 border-b border-[#16a34a]/20">
                     <th className="p-3">معرف الكتلة</th>
                     <th className="p-3">اسم الكائن</th>
                     <th className="p-3">النوع</th>
                     <th className="p-3">الحجم</th>
                     <th className="p-3">بصمة التشفير (Hash)</th>
                     <th className="p-3">الحالة</th>
                   </tr>
                 </thead>
                 <tbody className="divide-y divide-[#16a34a]/10 text-xs font-mono">
                   {filteredChunks.length > 0 ? (
                     filteredChunks.map((chunk) => (
                       <tr
                         key={chunk.id}
                         className="hover:bg-[#16a34a]/5 transition-colors"
                       >
                         <td
                           className="p-3 text-[#84cc16] font-bold"
                           dir="ltr"
                         >
                           {chunk.id}
                         </td>
                         <td
                           className="p-3 text-slate-100 font-sans font-medium"
                           dir="ltr"
                         >
                           {chunk.name}
                         </td>
                         <td className="p-3">
                           <span
                             className="px-2 py-0.5 rounded text-[10px] bg-slate-800 text-slate-300 border border-slate-700"
                             dir="ltr"
                           >
                             {chunk.type}
                           </span>
                         </td>
                         <td className="p-3 text-slate-400" dir="ltr">
                           {chunk.size}
                         </td>
                         <td
                           className="p-3 text-slate-500 text-[10px] truncate max-w-[150px]"
                           dir="ltr"
                         >
                           {chunk.hash}
                         </td>
                         <td className="p-3">
                           <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#16a34a]/20 text-[#84cc16] border border-[#16a34a]/40">
                             {chunk.status}
                           </span>
                         </td>
                       </tr>
                     ))
                   ) : (
                     <tr>
                       <td
                         colSpan={6}
                         className="p-8 text-center text-slate-400 font-sans"
                       >
                         <div className="flex flex-col items-center justify-center gap-2">
                           <p>
                             لا توجد كتل أو ملفات مطابقة لعملية البحث الحالية.
                           </p>
                           <button
                             onClick={resetFilters}
                             className="flex items-center gap-1.5 text-xs text-[#84cc16] hover:underline font-mono mt-1 cursor-pointer"
                           >
                             <RotateCcw size={12} /> إعادة ضبط الفلاتر
                           </button>
                         </div>
                       </td>
                     </tr>
                   )}
                 </tbody>
               </table>
             </div>
           </div>
         )}


         {activeTab === "billing" && (
           <div className="bg-[#0b121e] border border-[#16a34a]/20 rounded-xl p-6 space-y-6">
             <div className="flex flex-col gap-1">
               <h3 className="text-lg font-bold text-white flex items-center gap-2">
                 <CreditCard className="text-[#16a34a]" /> إدارة الاشتراكات
                 وبوابات الدفع الشاملة
               </h3>
               <p className="text-xs text-slate-400">
                 اختر خطة التخزين المدعومة بالطاقة النظيفة واستخدم وسيلة الدفع
                 المناسبة لك محلياً أو عالمياً.
               </p>
             </div>


             <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
               {[
                 {
                   id: "starter",
                   name: "الباقة المبتدئة",
                   price: "$15 / شهرياً",
                   storage: "500 GB سحابة خضراء",
                 },
                 {
                   id: "pro",
                   name: "الباقة الاحترافية",
                   price: "$49 / شهرياً",
                   storage: "2 TB ألياف سحابية",
                 },
                 {
                   id: "enterprise",
                   name: "باقة الشركات",
                   price: "$199 / شهرياً",
                   storage: "غير محدود (غير منقوص)",
                 },
               ].map((plan) => (
                 <div
                   key={plan.id}
                   onClick={() => setSelectedPlan(plan.id)}
                   className={`p-5 rounded-xl border cursor-pointer transition-all ${
                     selectedPlan === plan.id
                       ? "bg-[#16a34a]/10 border-[#16a34a] shadow-md shadow-[#16a34a]/10"
                       : "bg-[#05080e] border-[#16a34a]/20 hover:border-slate-700"
                   }`}
                 >
                   <div className="flex justify-between items-center mb-2">
                     <h4 className="font-bold text-white">{plan.name}</h4>
                     {selectedPlan === plan.id && (
                       <span className="text-[10px] bg-[#16a34a] text-white font-bold px-2 py-0.5 rounded">
                         المُختارة
                       </span>
                     )}
                   </div>
                   <div
                     className="text-2xl font-bold font-mono text-[#84cc16] mb-2"
                     dir="ltr"
                   >
                     {plan.price}
                   </div>
                   <p className="text-xs text-slate-400">{plan.storage}</p>
                 </div>
               ))}
             </div>


             <div className="border-t border-[#16a34a]/20 pt-6 space-y-4">
               <h4 className="text-sm font-bold text-slate-200 flex items-center gap-2">
                 <Wallet className="text-[#0284c7]" /> وسائل الدفع المؤهلة
                 (عالمية، إقليمية ومحلية)
               </h4>
               <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
                 {[
                   { id: "card", label: "Visa / Mastercard" },
                   { id: "apple", label: "Apple / Google Pay" },
                   { id: "mada", label: "مدى (Mada) / فوري" },
                   { id: "wallet", label: "PayPal / STC Pay" },
                 ].map((method) => (
                   <button
                     key={method.id}
                     onClick={() => setSelectedPayment(method.id)}
                     className={`p-3 border rounded-lg text-center transition-all cursor-pointer ${
                       selectedPayment === method.id
                         ? "bg-[#16a34a]/20 border-[#16a34a] text-[#84cc16] font-bold"
                         : "bg-[#05080e] border-[#16a34a]/20 text-slate-300 hover:border-slate-700"
                     }`}
                   >
                     {method.label}
                   </button>
                 ))}
               </div>
               <button className="w-full sm:w-auto px-6 py-3 bg-gradient-to-l from-[#16a34a] to-[#0284c7] text-white font-bold text-xs rounded-xl shadow-lg hover:opacity-95 transition-all cursor-pointer">
                 تأكيد وإتمام الاشتراك الآمن
               </button>
             </div>
           </div>
         )}


         {activeTab === "settings" && (
           <div className="bg-[#0b121e] border border-[#16a34a]/20 rounded-xl p-6 space-y-6 max-w-2xl">
             <div>
               <h3 className="text-lg font-bold text-white flex items-center gap-2">
                 <SettingsIcon className="text-[#16a34a]" /> الإعدادات المبسطة
               </h3>
               <p className="text-xs text-slate-400">
                 إدارة إعدادات السحابة والتنبيهات وحالة الحساب بكل سهولة.
               </p>
             </div>


             <div className="space-y-4 text-xs">
               <div className="flex items-center justify-between p-3.5 bg-[#05080e] border border-[#16a34a]/20 rounded-xl">
                 <div>
                   <div className="font-bold text-white text-sm">
                     التنبيهات الفورية للتشفير
                   </div>
                   <div className="text-slate-400">
                     إرسال إشعار عند اكتشاف أي مزامنة جديدة أو وصول غير مصرح
                   </div>
                 </div>
                 <input
                   type="checkbox"
                   checked={settings.notifications}
                   onChange={(e) =>
                     setSettings({
                       ...settings,
                       notifications: e.target.checked,
                     })
                   }
                   className="w-4 h-4 accent-[#16a34a] rounded cursor-pointer"
                 />
               </div>


               <div className="flex items-center justify-between p-3.5 bg-[#05080e] border border-[#16a34a]/20 rounded-xl">
                 <div>
                   <div className="font-bold text-white text-sm">
                     وضع ألياف الموز (توفير طاقة الخوادم)
                   </div>
                   <div className="text-slate-400">
                     تحسين كفاءة استهلاك طاقة العقد بنسبة تصل لـ 40%
                   </div>
                 </div>
                 <input
                   type="checkbox"
                   checked={settings.bananaFiberEcoMode}
                   onChange={(e) =>
                     setSettings({
                       ...settings,
                       bananaFiberEcoMode: e.target.checked,
                     })
                   }
                   className="w-4 h-4 accent-[#16a34a] rounded cursor-pointer"
                 />
               </div>


               <div className="flex items-center justify-between p-3.5 bg-[#05080e] border border-[#16a34a]/20 rounded-xl">
                 <div>
                   <div className="font-bold text-white text-sm">
                     لغة الواجهة المؤسسية
                   </div>
                   <div className="text-slate-400">
                     اللغة العربية (متوافقة مع الاتجاه من اليمين لليسار RTL)
                   </div>
                 </div>
                 <span className="text-[#84cc16] font-mono font-bold">
                   العربية (الافتراضية)
                 </span>
               </div>


               <button
                 onClick={() => alert("تم حفظ الإعدادات بنجاح!")}
                 className="px-5 py-2.5 bg-[#16a34a] hover:bg-[#15803d] text-white font-bold rounded-xl transition-all shadow cursor-pointer"
               >
                 حفظ التعديلات
               </button>
             </div>
           </div>
         )}
       </main>
     </div>
   </div>
 );
}




