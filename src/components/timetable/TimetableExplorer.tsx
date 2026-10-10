import React, { useState, useEffect } from 'react';
import { Clock, Printer, Calendar, BookOpen, GraduationCap, MapPin, Sparkles, Filter } from 'lucide-react';
import { bellSchedule, timetableData, type ClassTimetable, type BellPeriod } from '../../data/timetables';

export const TimetableExplorer: React.FC = () => {
  const [selectedClassId, setSelectedClassId] = useState<string>('grade-10-a');
  const [selectedDay, setSelectedDay] = useState<string>('Monday');
  const [viewMode, setViewMode] = useState<'single-day' | 'full-week'>('single-day');
  const [isSinhala, setIsSinhala] = useState<boolean>(false);
  const [currentStatus, setCurrentStatus] = useState<{
    inSession: boolean;
    labelEn: string;
    labelSi: string;
    periodIndex?: number;
    currentTimeStr: string;
  }>({
    inSession: false,
    labelEn: 'Calculating schedule...',
    labelSi: 'කාලසටහන ගණනය වෙමින් පවතී...',
    currentTimeStr: '',
  });

  // Track active language
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

  // Set default day to today if weekday
  useEffect(() => {
    try {
      const now = new Date();
      const colomboDay = new Intl.DateTimeFormat('en-US', {
        timeZone: 'Asia/Colombo',
        weekday: 'long',
      }).format(now);

      const weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
      if (weekdays.includes(colomboDay)) {
        setSelectedDay(colomboDay);
      }
    } catch (e) {}
  }, []);

  // Live Bell Status calculation (Asia/Colombo)
  useEffect(() => {
    const checkBellStatus = () => {
      try {
        const now = new Date();
        const formatter = new Intl.DateTimeFormat('en-US', {
          timeZone: 'Asia/Colombo',
          hour: 'numeric',
          minute: 'numeric',
          hour12: false,
          weekday: 'long',
        });
        const parts = formatter.formatToParts(now);
        const weekday = parts.find((p) => p.type === 'weekday')?.value || '';
        const hour = parseInt(parts.find((p) => p.type === 'hour')?.value || '0', 10);
        const minute = parseInt(parts.find((p) => p.type === 'minute')?.value || '0', 10);
        const currentMins = hour * 60 + minute;

        const timeString = new Intl.DateTimeFormat('en-US', {
          timeZone: 'Asia/Colombo',
          hour: 'numeric',
          minute: 'numeric',
          hour12: true,
        }).format(now) + ' (Sri Lanka Time)';

        if (weekday === 'Saturday' || weekday === 'Sunday') {
          setCurrentStatus({
            inSession: false,
            labelEn: 'Weekend — Academic sessions resume Monday at 07:50 AM',
            labelSi: 'සති අන්තය — අධ්‍යයන කටයුතු සඳුදා පෙරවරු 07:50 ට ආරම්භ වේ',
            currentTimeStr: timeString,
          });
          return;
        }

        // Before school (before 07:50)
        if (currentMins < 7 * 60 + 50) {
          setCurrentStatus({
            inSession: false,
            labelEn: 'Pre-Session — Morning Buddha Vandana begins at 07:50 AM',
            labelSi: 'පාසල් ආරම්භයට පෙර — උදෑසන බුද්ධ වන්දනාව 07:50 ට ආරම්භ වේ',
            currentTimeStr: timeString,
          });
          return;
        }

        // Morning assembly (07:50 - 08:10)
        if (currentMins >= 7 * 60 + 50 && currentMins < 8 * 60 + 10) {
          setCurrentStatus({
            inSession: true,
            labelEn: 'In Session: Buddha Vandana & Morning Assembly (07:50 – 08:10)',
            labelSi: 'දැනට පැවැත්වේ: බුද්ධ වන්දනාව සහ උදෑසන රැස්වීම (07:50 – 08:10)',
            periodIndex: -1,
            currentTimeStr: timeString,
          });
          return;
        }

        // Interval (10:50 - 11:10)
        if (currentMins >= 10 * 60 + 50 && currentMins < 11 * 60 + 10) {
          setCurrentStatus({
            inSession: true,
            labelEn: 'Interval & Refreshments Break (10:50 – 11:10)',
            labelSi: 'විවේක කාලය (10:50 – 11:10)',
            periodIndex: -2,
            currentTimeStr: timeString,
          });
          return;
        }

        // Check periods 1 through 8
        const periodSlots = [
          { p: 1, start: 8 * 60 + 10, end: 8 * 60 + 50 },
          { p: 2, start: 8 * 60 + 50, end: 9 * 60 + 30 },
          { p: 3, start: 9 * 60 + 30, end: 10 * 60 + 10 },
          { p: 4, start: 10 * 60 + 10, end: 10 * 60 + 50 },
          { p: 5, start: 11 * 60 + 10, end: 11 * 60 + 45 },
          { p: 6, start: 11 * 60 + 45, end: 12 * 60 + 20 },
          { p: 7, start: 12 * 60 + 20, end: 12 * 60 + 55 },
          { p: 8, start: 12 * 60 + 55, end: 13 * 60 + 30 },
        ];

        for (const slot of periodSlots) {
          if (currentMins >= slot.start && currentMins < slot.end) {
            const bell = bellSchedule.find((b) => b.period === slot.p);
            setCurrentStatus({
              inSession: true,
              labelEn: `Active Now: Period ${slot.p} (${bell?.startTime} – ${bell?.endTime})`,
              labelSi: `දැනට පැවැත්වේ: ${slot.p} වන කාලච්ඡේදය (${bell?.startTime} – ${bell?.endTime})`,
              periodIndex: slot.p,
              currentTimeStr: timeString,
            });
            return;
          }
        }

        // After school (after 13:30)
        setCurrentStatus({
          inSession: false,
          labelEn: 'School Day Concluded — Co-curricular clubs & sports in session',
          labelSi: 'පාසල් වේලාව අවසන් — සමගාමී ක්‍රියාකාරකම් සහ ක්‍රීඩා පුහුණුවීම් පැවැත්වේ',
          currentTimeStr: timeString,
        });
      } catch (e) {
        setCurrentStatus({
          inSession: false,
          labelEn: 'Standard Bell Schedule: 07:50 AM – 01:30 PM',
          labelSi: 'දෛනික කාලසටහන: පෙ.ව. 07:50 – ප.ව. 01:30',
          currentTimeStr: '',
        });
      }
    };

    checkBellStatus();
    const intervalId = setInterval(checkBellStatus, 30000);
    return () => clearInterval(intervalId);
  }, []);

  const activeClass = timetableData.find((c) => c.id === selectedClassId) || timetableData[0];
  const weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

  const getDayLabel = (day: string) => {
    if (!isSinhala) return day;
    const map: Record<string, string> = {
      Monday: 'සඳුදා',
      Tuesday: 'අඟහරුවාදා',
      Wednesday: 'බදාදා',
      Thursday: 'බ්‍රහස්පතින්දා',
      Friday: 'සිකුරාදා',
    };
    return map[day] || day;
  };

  const getTagBadge = (tag: string) => {
    switch (tag) {
      case 'teal':
        return 'bg-teal-50 text-teal-800 border-teal-200';
      case 'orange':
        return 'bg-amber-50 text-amber-900 border-amber-200';
      case 'maroon':
        return 'bg-rose-50 text-[#581838] border-rose-200';
      default:
        return 'bg-stone-50 text-stone-700 border-stone-200';
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      {/* Live Campus Bell Status Banner */}
      <div className="rounded-2xl border border-stone-200 bg-white p-4 sm:p-5 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className={`w-3 h-3 rounded-full shrink-0 ${currentStatus.inSession ? 'bg-emerald-500 animate-pulse' : 'bg-amber-400'}`} />
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-stone-500">
                {isSinhala ? 'සජීවී සීනු සංඥාව සහ තත්ත්වය' : 'Live Bell Schedule Pulse'}
              </span>
              {currentStatus.currentTimeStr && (
                <span className="text-xs text-stone-400 font-mono hidden sm:inline">
                  • {currentStatus.currentTimeStr}
                </span>
              )}
            </div>
            <p className="text-sm sm:text-base font-semibold text-stone-900 mt-0.5">
              {isSinhala ? currentStatus.labelSi : currentStatus.labelEn}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0 no-print">
          <button
            onClick={() => window.print()}
            className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 transition-colors cursor-pointer"
            title="Print Desk Timetable"
          >
            <Printer size={15} />
            <span>{isSinhala ? 'කාලසටහන මුද්‍රණය කරන්න' : 'Print Desk Copy'}</span>
          </button>
        </div>
      </div>

      {/* Class & Stream Selector Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 p-4 rounded-2xl bg-stone-100/70 border border-stone-200/80 no-print">
        <div className="flex items-center gap-2.5 overflow-x-auto pb-1 sm:pb-0">
          <GraduationCap size={18} className="text-stone-500 shrink-0" />
          <span className="text-xs font-bold uppercase tracking-wider text-stone-600 shrink-0">
            {isSinhala ? 'පන්තිය තෝරන්න:' : 'Select Division:'}
          </span>
          <div className="flex gap-1.5 shrink-0">
            {timetableData.map((cls) => (
              <button
                key={cls.id}
                onClick={() => setSelectedClassId(cls.id)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  selectedClassId === cls.id
                    ? 'bg-stone-900 text-white shadow-xs'
                    : 'bg-white text-stone-700 hover:bg-stone-200/60 border border-stone-200'
                }`}
              >
                {cls.grade} ({cls.stream.includes('Bio') ? 'Bio' : cls.stream.includes('Comm') ? 'Commerce' : cls.id.includes('10') ? '10-A' : '8-A'})
              </button>
            ))}
          </div>
        </div>

        {/* View Mode Toggle */}
        <div className="flex items-center gap-1 bg-stone-200/70 p-1 rounded-xl self-end sm:self-auto shrink-0">
          <button
            onClick={() => setViewMode('single-day')}
            className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
              viewMode === 'single-day' ? 'bg-white text-stone-900 shadow-xs' : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            {isSinhala ? 'දෛනික දැක්ම' : 'Day View'}
          </button>
          <button
            onClick={() => setViewMode('full-week')}
            className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
              viewMode === 'full-week' ? 'bg-white text-stone-900 shadow-xs' : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            {isSinhala ? 'සම්පූර්ණ සතිය' : 'Full Week Grid'}
          </button>
        </div>
      </div>

      {/* Day Selector (for Single-Day View) */}
      {viewMode === 'single-day' && (
        <div className="flex items-center gap-2 overflow-x-auto pb-1 no-print">
          {weekdays.map((day) => {
            const isSelected = selectedDay === day;
            return (
              <button
                key={day}
                onClick={() => setSelectedDay(day)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer whitespace-nowrap ${
                  isSelected
                    ? 'bg-[#581838] text-white shadow-sm'
                    : 'bg-white text-stone-600 hover:bg-stone-50 border border-stone-200'
                }`}
              >
                {getDayLabel(day)}
              </button>
            );
          })}
        </div>
      )}

      {/* Class Meta Banner */}
      <div className="border-b border-stone-200 pb-3 flex items-center justify-between">
        <div>
          <h2 className="text-xl sm:text-2xl font-serif font-bold text-stone-900">
            {activeClass.sectionName}
          </h2>
          <p className="text-xs sm:text-sm text-stone-500 mt-0.5">
            {activeClass.stream} • {activeClass.medium} Medium • Sri Chandananda Buddhist College
          </p>
        </div>
        <div className="text-right text-xs text-stone-400 hidden sm:block">
          <span>Official Academic Schedule 2026</span>
        </div>
      </div>

      {/* Single Day View Table */}
      {viewMode === 'single-day' && (
        <div className="overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-xs">
          <div className="divide-y divide-stone-100">
            {/* Morning Assembly Banner */}
            <div className="bg-amber-50/60 px-4 sm:px-6 py-3 flex items-center justify-between text-xs sm:text-sm">
              <div className="flex items-center gap-2 text-amber-900 font-semibold">
                <Sparkles size={16} className="text-amber-600" />
                <span>
                  {isSinhala ? 'පෙ.ව. 07:50 – 08:10: බුද්ධ වන්දනාව සහ උදෑසන රැස්වීම' : '07:50 – 08:10 AM: Morning Buddha Vandana & Assembly'}
                </span>
              </div>
              <span className="text-xs text-amber-700 uppercase font-bold tracking-wider">
                {isSinhala ? 'සමස්ත පාසල' : 'All School'}
              </span>
            </div>

            {/* Periods 1 to 4 */}
            {(activeClass.schedule[selectedDay] || []).slice(0, 4).map((slot, idx) => {
              const pNum = idx + 1;
              const bell = bellSchedule.find((b) => b.period === pNum);
              const isCurrentlyActive = currentStatus.periodIndex === pNum;

              return (
                <div
                  key={idx}
                  className={`p-4 sm:px-6 sm:py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition-colors ${
                    isCurrentlyActive ? 'bg-amber-50/80 ring-2 ring-inset ring-amber-400' : 'hover:bg-stone-50/50'
                  }`}
                >
                  <div className="flex items-start sm:items-center gap-4">
                    <div className="w-8 h-8 rounded-full bg-stone-100 flex items-center justify-center font-bold text-xs text-stone-700 shrink-0">
                      {pNum}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-base sm:text-lg font-serif font-bold text-stone-900">
                          {isSinhala ? slot.subjectSi : slot.subjectEn}
                        </span>
                        {isCurrentlyActive && (
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-200 text-amber-900 uppercase">
                            {isSinhala ? 'දැනට පැවැත්වේ' : 'Active'}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-3 text-xs text-stone-500 mt-1">
                        <span className="flex items-center gap-1">
                          <Clock size={13} /> {bell?.startTime} – {bell?.endTime}
                        </span>
                        {slot.room && (
                          <span className="flex items-center gap-1">
                            <MapPin size={13} /> {slot.room}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-start sm:self-auto">
                    <span className={`px-2.5 py-1 rounded-md text-xs font-semibold border ${getTagBadge(slot.tagColor)}`}>
                      {slot.code}
                    </span>
                  </div>
                </div>
              );
            })}

            {/* Interval Break Banner */}
            <div className="bg-stone-100/80 px-4 sm:px-6 py-3 flex items-center justify-between text-xs sm:text-sm border-y border-stone-200">
              <div className="flex items-center gap-2 text-stone-700 font-semibold">
                <Clock size={16} className="text-stone-500" />
                <span>
                  {isSinhala ? 'පෙ.ව. 10:50 – 11:10: විවේක කාලය (Interval)' : '10:50 – 11:10 AM: Morning Refreshment & Interval'}
                </span>
              </div>
              <span className="text-xs text-stone-500 uppercase font-semibold">20 Minutes</span>
            </div>

            {/* Periods 5 to 8 */}
            {(activeClass.schedule[selectedDay] || []).slice(4, 8).map((slot, idx) => {
              const pNum = idx + 5;
              const bell = bellSchedule.find((b) => b.period === pNum);
              const isCurrentlyActive = currentStatus.periodIndex === pNum;

              return (
                <div
                  key={idx + 4}
                  className={`p-4 sm:px-6 sm:py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition-colors ${
                    isCurrentlyActive ? 'bg-amber-50/80 ring-2 ring-inset ring-amber-400' : 'hover:bg-stone-50/50'
                  }`}
                >
                  <div className="flex items-start sm:items-center gap-4">
                    <div className="w-8 h-8 rounded-full bg-stone-100 flex items-center justify-center font-bold text-xs text-stone-700 shrink-0">
                      {pNum}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-base sm:text-lg font-serif font-bold text-stone-900">
                          {isSinhala ? slot.subjectSi : slot.subjectEn}
                        </span>
                        {isCurrentlyActive && (
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-200 text-amber-900 uppercase">
                            {isSinhala ? 'දැනට පැවැත්වේ' : 'Active'}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-3 text-xs text-stone-500 mt-1">
                        <span className="flex items-center gap-1">
                          <Clock size={13} /> {bell?.startTime} – {bell?.endTime}
                        </span>
                        {slot.room && (
                          <span className="flex items-center gap-1">
                            <MapPin size={13} /> {slot.room}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-start sm:self-auto">
                    <span className={`px-2.5 py-1 rounded-md text-xs font-semibold border ${getTagBadge(slot.tagColor)}`}>
                      {slot.code}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Full Week Grid View */}
      {viewMode === 'full-week' && (
        <div className="overflow-x-auto rounded-2xl border border-stone-200 bg-white shadow-xs">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-stone-100 border-b border-stone-200 text-stone-700">
                <th className="p-3 font-bold border-r border-stone-200 w-24">Period / Time</th>
                {weekdays.map((day) => (
                  <th key={day} className="p-3 font-bold border-r border-stone-200 last:border-r-0">
                    {getDayLabel(day)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-200">
              {/* Assembly */}
              <tr className="bg-amber-50/60 font-semibold text-amber-900">
                <td className="p-2.5 border-r border-stone-200 font-mono text-[11px]">07:50–08:10</td>
                <td colSpan={5} className="p-2.5 text-center">
                  {isSinhala ? 'බුද්ධ වන්දනාව සහ උදෑසන රැස්වීම (Buddha Vandana & Assembly)' : 'Buddha Vandana & Morning Assembly'}
                </td>
              </tr>

              {/* Periods 1 to 4 */}
              {[0, 1, 2, 3].map((pIdx) => {
                const bell = bellSchedule.find((b) => b.period === pIdx + 1);
                return (
                  <tr key={pIdx} className="hover:bg-stone-50/60">
                    <td className="p-3 border-r border-stone-200 font-medium bg-stone-50/50">
                      <div className="font-bold text-stone-900">Period {pIdx + 1}</div>
                      <div className="font-mono text-[10px] text-stone-500">{bell?.startTime}–{bell?.endTime}</div>
                    </td>
                    {weekdays.map((day) => {
                      const slot = activeClass.schedule[day]?.[pIdx];
                      return (
                        <td key={day} className="p-3 border-r border-stone-200 last:border-r-0 align-top">
                          {slot ? (
                            <div>
                              <div className="font-bold text-stone-900">
                                {isSinhala ? slot.subjectSi : slot.subjectEn}
                              </div>
                              <div className="text-[10px] text-stone-400 mt-0.5">{slot.room}</div>
                            </div>
                          ) : (
                            <span className="text-stone-300">—</span>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}

              {/* Interval */}
              <tr className="bg-stone-100 font-semibold text-stone-600">
                <td className="p-2.5 border-r border-stone-200 font-mono text-[11px]">10:50–11:10</td>
                <td colSpan={5} className="p-2.5 text-center tracking-wider uppercase text-[11px]">
                  {isSinhala ? 'විවේක කාලය (Interval & Refreshments Break)' : 'Interval & Refreshments Break'}
                </td>
              </tr>

              {/* Periods 5 to 8 */}
              {[4, 5, 6, 7].map((pIdx) => {
                const bell = bellSchedule.find((b) => b.period === pIdx + 1);
                return (
                  <tr key={pIdx} className="hover:bg-stone-50/60">
                    <td className="p-3 border-r border-stone-200 font-medium bg-stone-50/50">
                      <div className="font-bold text-stone-900">Period {pIdx + 1}</div>
                      <div className="font-mono text-[10px] text-stone-500">{bell?.startTime}–{bell?.endTime}</div>
                    </td>
                    {weekdays.map((day) => {
                      const slot = activeClass.schedule[day]?.[pIdx];
                      return (
                        <td key={day} className="p-3 border-r border-stone-200 last:border-r-0 align-top">
                          {slot ? (
                            <div>
                              <div className="font-bold text-stone-900">
                                {isSinhala ? slot.subjectSi : slot.subjectEn}
                              </div>
                              <div className="text-[10px] text-stone-400 mt-0.5">{slot.room}</div>
                            </div>
                          ) : (
                            <span className="text-stone-300">—</span>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
