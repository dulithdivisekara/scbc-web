import React, { useState, useMemo, useEffect } from 'react';
import { Search, Download, FileText, Filter, BookOpen, Sparkles, CheckCircle2, RotateCcw, FileCheck, Layers } from 'lucide-react';
import { vaultResources, type AcademicResource } from '../../data/academicVault';

export const AcademicVaultExplorer: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedMedium, setSelectedMedium] = useState<string>('all');
  const [selectedSubject, setSelectedSubject] = useState<string>('all');
  const [isSinhala, setIsSinhala] = useState<boolean>(false);
  const [downloadNotice, setDownloadNotice] = useState<string | null>(null);

  // Sync active language with document element
  useEffect(() => {
    const updateLang = () => {
      const lang = document.documentElement.lang || localStorage.getItem('scbc_lang') || 'en';
      setIsSinhala(lang === 'si');
    };
    updateLang();

    const observer = new MutationObserver((mutations) => {
      for (const m of mutations) {
        if (m.type === 'attributes' && m.attributeName === 'lang') {
          updateLang();
        }
      }
    });
    observer.observe(document.documentElement, { attributes: true });
    return () => observer.disconnect();
  }, []);

  // Unique subjects for filter dropdown
  const uniqueSubjects = useMemo(() => {
    const subjects = new Set<string>();
    vaultResources.forEach((r) => subjects.add(r.subject));
    return Array.from(subjects).sort();
  }, []);

  // Filtered resources
  const filteredResources = useMemo(() => {
    return vaultResources.filter((res) => {
      // Search term
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase().trim();
        const matchesTitle = res.title.toLowerCase().includes(query) || res.titleSi.includes(query);
        const matchesSubject = res.subject.toLowerCase().includes(query) || res.subjectSi.includes(query);
        const matchesGrade = res.grade.toLowerCase().includes(query);
        const matchesYear = res.year.toString().includes(query);
        if (!matchesTitle && !matchesSubject && !matchesGrade && !matchesYear) {
          return false;
        }
      }

      // Category
      if (selectedCategory !== 'all' && res.category !== selectedCategory) {
        return false;
      }

      // Type
      if (selectedType !== 'all' && res.type !== selectedType) {
        return false;
      }

      // Medium
      if (selectedMedium !== 'all' && res.medium !== selectedMedium) {
        return false;
      }

      // Subject
      if (selectedSubject !== 'all' && res.subject !== selectedSubject) {
        return false;
      }

      return true;
    });
  }, [searchQuery, selectedCategory, selectedType, selectedMedium, selectedSubject]);

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setSelectedType('all');
    setSelectedMedium('all');
    setSelectedSubject('all');
  };

  const handleDownload = (resource: AcademicResource) => {
    const title = isSinhala ? resource.titleSi : resource.title;
    setDownloadNotice(isSinhala ? `ලේඛනය බාගත වෙමින් පවතී: ${title}` : `Downloading repository document: ${title}`);
    setTimeout(() => {
      setDownloadNotice(null);
    }, 4000);
  };

  const getTypeBadgeColor = (type: string) => {
    switch (type) {
      case 'Past Paper':
        return 'bg-rose-50 text-[#581838] border-rose-200';
      case 'Model Paper':
        return 'bg-amber-50 text-amber-900 border-amber-200';
      case 'Revision Notes':
        return 'bg-teal-50 text-teal-800 border-teal-200';
      case 'Syllabus':
        return 'bg-blue-50 text-blue-900 border-blue-200';
      default:
        return 'bg-stone-50 text-stone-700 border-stone-200';
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      {/* Toast Notification */}
      {downloadNotice && (
        <div className="fixed bottom-6 right-6 z-50 bg-stone-900 text-white px-5 py-3 rounded-2xl shadow-xl flex items-center gap-3 text-sm animate-bounce">
          <CheckCircle2 size={18} className="text-emerald-400 shrink-0" />
          <span>{downloadNotice}</span>
        </div>
      )}

      {/* Search & Top Action Bar */}
      <div className="rounded-2xl border border-stone-200 bg-white p-4 sm:p-5 shadow-xs space-y-4">
        <div className="relative">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={
              isSinhala
                ? 'විෂය, ශ්‍රේණිය, පසුගිය ප්‍රශ්න පත්‍රය හෝ වර්ෂය අනුව සොයන්න...'
                : 'Search past papers, subjects, grade (e.g. O/L Science, Grade 12 Bio)...'
            }
            className="w-full pl-11 pr-4 py-3 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#581838]/20 focus:border-[#581838] transition-all bg-stone-50/50"
          />
        </div>

        {/* Level / Category Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 pt-1 border-t border-stone-100">
          <span className="text-xs font-bold uppercase tracking-wider text-stone-500 mr-2 flex items-center gap-1.5">
            <Layers size={14} />
            {isSinhala ? 'අංශය:' : 'Section:'}
          </span>
          {[
            { id: 'all', en: 'All Grades', si: 'සියලු ශ්‍රේණි' },
            { id: 'ol', en: 'G.C.E. O/L (Grades 10-11)', si: 'සාමාන්‍ය පෙළ (10-11)' },
            { id: 'al', en: 'G.C.E. A/L (Grades 12-13)', si: 'උසස් පෙළ (12-13)' },
            { id: 'junior', en: 'Junior Secondary (6-9)', si: 'කනිෂ්ඨ ද්විතීයික (6-9)' },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-[#581838] text-white shadow-xs'
                  : 'bg-stone-100 text-stone-700 hover:bg-stone-200/70 border border-stone-200/60'
              }`}
            >
              {isSinhala ? cat.si : cat.en}
            </button>
          ))}
        </div>

        {/* Secondary Facet Filters */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
          {/* Resource Type */}
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-500 mb-1">
              {isSinhala ? 'ලේඛන වර්ගය' : 'Resource Type'}
            </label>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="w-full text-xs font-medium p-2.5 rounded-lg border border-stone-200 bg-white text-stone-800 focus:outline-none focus:ring-1 focus:ring-stone-400"
            >
              <option value="all">{isSinhala ? 'සියලු ලේඛන වර්ග' : 'All Document Types'}</option>
              <option value="Past Paper">{isSinhala ? 'පසුගිය ප්‍රශ්න පත්‍ර' : 'Past Papers'}</option>
              <option value="Model Paper">{isSinhala ? 'ආදර්ශ ප්‍රශ්න පත්‍ර' : 'Model Question Papers'}</option>
              <option value="Revision Notes">{isSinhala ? 'කෙටි සටහන් සහ විවරණ' : 'Revision Notes & Summaries'}</option>
              <option value="Syllabus">{isSinhala ? 'විෂය නිර්දේශ' : 'Official Syllabi'}</option>
            </select>
          </div>

          {/* Medium */}
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-500 mb-1">
              {isSinhala ? 'මාධ්‍යය' : 'Instruction Medium'}
            </label>
            <select
              value={selectedMedium}
              onChange={(e) => setSelectedMedium(e.target.value)}
              className="w-full text-xs font-medium p-2.5 rounded-lg border border-stone-200 bg-white text-stone-800 focus:outline-none focus:ring-1 focus:ring-stone-400"
            >
              <option value="all">{isSinhala ? 'සියලු මාධ්‍යයන්' : 'All Media'}</option>
              <option value="Sinhala">{isSinhala ? 'සිංහල මාධ්‍යය' : 'Sinhala Medium'}</option>
              <option value="English">{isSinhala ? 'ඉංග්‍රීසි මාධ්‍යය' : 'English Medium'}</option>
              <option value="Bilingual">{isSinhala ? 'ද්විභාෂා / ද්විත්ව' : 'Bilingual'}</option>
            </select>
          </div>

          {/* Subject Filter */}
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-500 mb-1">
              {isSinhala ? 'විෂය' : 'Subject Specialization'}
            </label>
            <select
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              className="w-full text-xs font-medium p-2.5 rounded-lg border border-stone-200 bg-white text-stone-800 focus:outline-none focus:ring-1 focus:ring-stone-400"
            >
              <option value="all">{isSinhala ? 'සියලු විෂයන්' : 'All Subjects'}</option>
              {uniqueSubjects.map((sub) => (
                <option key={sub} value={sub}>
                  {sub}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Results Meta & Active Filters */}
      <div className="flex items-center justify-between text-xs text-stone-500 px-1">
        <div>
          <span>
            {isSinhala
              ? `ලේඛන ${filteredResources.length} ක් හමුවිය`
              : `Showing ${filteredResources.length} archived ${filteredResources.length === 1 ? 'resource' : 'resources'}`}
          </span>
        </div>

        {(searchQuery || selectedCategory !== 'all' || selectedType !== 'all' || selectedMedium !== 'all' || selectedSubject !== 'all') && (
          <button
            onClick={resetFilters}
            className="inline-flex items-center gap-1.5 text-stone-700 hover:text-stone-900 font-semibold cursor-pointer underline"
          >
            <RotateCcw size={12} />
            <span>{isSinhala ? 'සියලු පෙරහන් ඉවත් කරන්න' : 'Reset all filters'}</span>
          </button>
        )}
      </div>

      {/* Zero State */}
      {filteredResources.length === 0 && (
        <div className="rounded-2xl border border-stone-200 bg-white p-12 text-center space-y-4">
          <div className="w-14 h-14 mx-auto rounded-full bg-stone-100 flex items-center justify-center text-stone-400">
            <BookOpen size={28} />
          </div>
          <div>
            <h3 className="text-lg font-serif font-bold text-stone-900">
              {isSinhala ? 'ගැලපෙන අධ්‍යයන ලේඛන හමු නොවීය' : 'No Academic Resources Match Your Criteria'}
            </h3>
            <p className="text-xs sm:text-sm text-stone-500 mt-1 max-w-md mx-auto">
              {isSinhala
                ? 'ඔබ සෙවූ නිර්ණායකයන්ට අදාළ ලේඛන නොමැත. කරුණාකර වෙනත් වචන භාවිතා කර බලන්න හෝ සියලු පෙරහන් ඉවත් කරන්න.'
                : 'Try adjusting your search terms, changing the selected grade stream, or clearing active facet filters.'}
            </p>
          </div>
          <button
            onClick={resetFilters}
            className="px-4 py-2 rounded-xl bg-stone-900 text-white text-xs font-semibold hover:bg-stone-800 transition-colors cursor-pointer"
          >
            {isSinhala ? 'පෙරහන් ඉවත් කරන්න' : 'Clear All Filters'}
          </button>
        </div>
      )}

      {/* Resource Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredResources.map((res) => (
          <div
            key={res.id}
            className="rounded-2xl border border-stone-200/90 bg-white p-5 shadow-xs hover:shadow-md hover:border-stone-300 transition-all flex flex-col justify-between group"
          >
            <div>
              {/* Header tags */}
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className={`px-2.5 py-0.5 rounded-md text-[11px] font-bold border ${getTypeBadgeColor(res.type)}`}>
                  {isSinhala ? res.typeSi : res.type}
                </span>

                <div className="flex items-center gap-1.5 text-[11px] text-stone-400 font-mono">
                  <span>{res.grade}</span>
                  <span>•</span>
                  <span>{res.year}</span>
                </div>
              </div>

              {/* Title */}
              <h3 className="text-base font-serif font-bold text-stone-900 group-hover:text-[#581838] transition-colors leading-snug mb-2">
                {isSinhala ? res.titleSi : res.title}
              </h3>

              {/* Meta details */}
              <div className="flex flex-wrap items-center gap-y-1 gap-x-3 text-xs text-stone-500 mb-4">
                <span className="font-semibold text-stone-700">
                  {isSinhala ? res.subjectSi : res.subject}
                </span>
                <span>•</span>
                <span>{isSinhala ? res.termSi : res.term}</span>
                <span>•</span>
                <span>{res.medium} Medium</span>
                <span>•</span>
                <span className="font-mono text-[11px]">{res.fileSize}</span>
              </div>
            </div>

            {/* Action buttons */}
            <div className="pt-3 border-t border-stone-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
              <span className="text-[11px] text-stone-400 font-medium">
                Official SCBC Faculty Archive
              </span>

              <button
                onClick={() => handleDownload(res)}
                className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 sm:py-1.5 rounded-lg text-xs font-semibold bg-stone-900 hover:bg-[#581838] text-white transition-colors cursor-pointer shrink-0 w-full sm:w-auto min-h-[36px]"
              >
                <Download size={13} />
                <span>{isSinhala ? 'බාගත කරන්න (PDF)' : 'Download PDF'}</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
