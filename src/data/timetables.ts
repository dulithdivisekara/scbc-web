export interface BellPeriod {
  period: number | 'assembly' | 'interval';
  nameEn: string;
  nameSi: string;
  startTime: string; // '07:50'
  endTime: string;   // '08:10'
  isBreak?: boolean;
}

export const bellSchedule: BellPeriod[] = [
  { period: 'assembly', nameEn: 'Buddha Vandana & Assembly', nameSi: 'බුද්ධ වන්දනාව සහ උදෑසන රැස්වීම', startTime: '07:50', endTime: '08:10', isBreak: true },
  { period: 1, nameEn: 'Period 1', nameSi: '1 වන කාලච්ඡේදය', startTime: '08:10', endTime: '08:50' },
  { period: 2, nameEn: 'Period 2', nameSi: '2 වන කාලච්ඡේදය', startTime: '08:50', endTime: '09:30' },
  { period: 3, nameEn: 'Period 3', nameSi: '3 වන කාලච්ඡේදය', startTime: '09:30', endTime: '10:10' },
  { period: 4, nameEn: 'Period 4', nameSi: '4 වන කාලච්ඡේදය', startTime: '10:10', endTime: '10:50' },
  { period: 'interval', nameEn: 'Interval & Refreshments', nameSi: 'විවේක කාලය', startTime: '10:50', endTime: '11:10', isBreak: true },
  { period: 5, nameEn: 'Period 5', nameSi: '5 වන කාලච්ඡේදය', startTime: '11:10', endTime: '11:45' },
  { period: 6, nameEn: 'Period 6', nameSi: '6 වන කාලච්ඡේදය', startTime: '11:45', endTime: '12:20' },
  { period: 7, nameEn: 'Period 7', nameSi: '7 වන කාලච්ඡේදය', startTime: '12:20', endTime: '12:55' },
  { period: 8, nameEn: 'Period 8', nameSi: '8 වන කාලච්ඡේදය', startTime: '12:55', endTime: '13:30' },
];

export interface SubjectSlot {
  subjectEn: string;
  subjectSi: string;
  code: string;
  teacher?: string;
  room?: string;
  tagColor: 'teal' | 'orange' | 'maroon' | 'stone';
}

export interface ClassTimetable {
  id: string;
  grade: string;
  stream: string;
  medium: 'Sinhala' | 'English' | 'Bilingual';
  sectionName: string;
  schedule: {
    [day: string]: SubjectSlot[]; // Mon, Tue, Wed, Thu, Fri (8 items for 8 periods)
  };
}

export const timetableData: ClassTimetable[] = [
  {
    id: 'grade-10-a',
    grade: 'Grade 10',
    stream: 'Ordinary Level (O/L)',
    medium: 'Bilingual',
    sectionName: 'Grade 10-A (Bilingual)',
    schedule: {
      Monday: [
        { subjectEn: 'Buddhism', subjectSi: 'බුද්ධ ධර්මය', code: 'BUD', room: 'Hall 3', tagColor: 'orange' },
        { subjectEn: 'Science', subjectSi: 'විද්‍යාව', code: 'SCI', room: 'Lab 1', tagColor: 'teal' },
        { subjectEn: 'Mathematics', subjectSi: 'ගණිතය', code: 'MAT', room: 'Room 10A', tagColor: 'maroon' },
        { subjectEn: 'Sinhala Lang', subjectSi: 'සිංහල සාහිත්‍යය', code: 'SIN', room: 'Room 10A', tagColor: 'stone' },
        { subjectEn: 'English', subjectSi: 'ඉංග්‍රීසි භාෂාව', code: 'ENG', room: 'Room 10A', tagColor: 'teal' },
        { subjectEn: 'History', subjectSi: 'ඉතිහාසය', code: 'HIS', room: 'Room 10A', tagColor: 'orange' },
        { subjectEn: 'Information Tech (ICT)', subjectSi: 'තොරතුරු තාක්ෂණය', code: 'ICT', room: 'Computer Lab 2', tagColor: 'teal' },
        { subjectEn: 'Health & Physical Ed', subjectSi: 'සෞඛ්‍ය හා ශාරීරික', code: 'HPE', room: 'Grounds', tagColor: 'maroon' },
      ],
      Tuesday: [
        { subjectEn: 'Mathematics', subjectSi: 'ගණිතය', code: 'MAT', room: 'Room 10A', tagColor: 'maroon' },
        { subjectEn: 'Science', subjectSi: 'විද්‍යාව', code: 'SCI', room: 'Lab 1', tagColor: 'teal' },
        { subjectEn: 'Buddhism', subjectSi: 'බුද්ධ ධර්මය', code: 'BUD', room: 'Hall 3', tagColor: 'orange' },
        { subjectEn: 'English Lit', subjectSi: 'ඉංග්‍රීසි සාහිත්‍යය', code: 'LIT', room: 'Room 10A', tagColor: 'teal' },
        { subjectEn: 'Commerce', subjectSi: 'ව්‍යාපාර හා ගිණුම්කරණය', code: 'COM', room: 'Room 10A', tagColor: 'orange' },
        { subjectEn: 'Sinhala Lang', subjectSi: 'සිංහල භාෂාව', code: 'SIN', room: 'Room 10A', tagColor: 'stone' },
        { subjectEn: 'History', subjectSi: 'ඉතිහාසය', code: 'HIS', room: 'Room 10A', tagColor: 'orange' },
        { subjectEn: 'Eastern Music / Art', subjectSi: 'සංගීතය / චිත්‍ර', code: 'ART', room: 'Aesthetic Hall', tagColor: 'maroon' },
      ],
      Wednesday: [
        { subjectEn: 'Science Lab', subjectSi: 'විද්‍යා ප්‍රායෝගික', code: 'SCI', room: 'Lab 1', tagColor: 'teal' },
        { subjectEn: 'Science Lab', subjectSi: 'විද්‍යා ප්‍රායෝගික', code: 'SCI', room: 'Lab 1', tagColor: 'teal' },
        { subjectEn: 'Mathematics', subjectSi: 'ගණිතය', code: 'MAT', room: 'Room 10A', tagColor: 'maroon' },
        { subjectEn: 'Buddhism', subjectSi: 'බුද්ධ ධර්මය', code: 'BUD', room: 'Hall 3', tagColor: 'orange' },
        { subjectEn: 'English', subjectSi: 'ඉංග්‍රීසි භාෂාව', code: 'ENG', room: 'Room 10A', tagColor: 'teal' },
        { subjectEn: 'History', subjectSi: 'ඉතිහාසය', code: 'HIS', room: 'Room 10A', tagColor: 'orange' },
        { subjectEn: 'Information Tech (ICT)', subjectSi: 'තොරතුරු තාක්ෂණය', code: 'ICT', room: 'Computer Lab 2', tagColor: 'teal' },
        { subjectEn: 'Library / Reading', subjectSi: 'පුස්තකාල කාලය', code: 'LIB', room: 'Main Library', tagColor: 'stone' },
      ],
      Thursday: [
        { subjectEn: 'Buddhism & Ethics', subjectSi: 'බුද්ධ ධර්මය හා චර්යාව', code: 'BUD', room: 'Shrine Room', tagColor: 'orange' },
        { subjectEn: 'Mathematics', subjectSi: 'ගණිතය', code: 'MAT', room: 'Room 10A', tagColor: 'maroon' },
        { subjectEn: 'Sinhala Lang', subjectSi: 'සිංහල භාෂාව', code: 'SIN', room: 'Room 10A', tagColor: 'stone' },
        { subjectEn: 'Science', subjectSi: 'විද්‍යාව', code: 'SCI', room: 'Lab 1', tagColor: 'teal' },
        { subjectEn: 'Commerce', subjectSi: 'ව්‍යාපාර හා ගිණුම්කරණය', code: 'COM', room: 'Room 10A', tagColor: 'orange' },
        { subjectEn: 'English', subjectSi: 'ඉංග්‍රීසි භාෂාව', code: 'ENG', room: 'Room 10A', tagColor: 'teal' },
        { subjectEn: 'Kandyan Dancing / Ves', subjectSi: 'උඩරට නැටුම්', code: 'DAN', room: 'Dance Hall', tagColor: 'maroon' },
        { subjectEn: 'Sports & Drill', subjectSi: 'ක්‍රීඩා පුහුණුව', code: 'SPT', room: 'Grounds', tagColor: 'orange' },
      ],
      Friday: [
        { subjectEn: 'Dhamma Desana / Vandana', subjectSi: 'ධර්ම දේශනා හා වන්දනා', code: 'DHM', room: 'Main Shrine', tagColor: 'orange' },
        { subjectEn: 'Mathematics', subjectSi: 'ගණිතය', code: 'MAT', room: 'Room 10A', tagColor: 'maroon' },
        { subjectEn: 'Science', subjectSi: 'විද්‍යාව', code: 'SCI', room: 'Lab 1', tagColor: 'teal' },
        { subjectEn: 'Sinhala Lang', subjectSi: 'සිංහල භාෂාව', code: 'SIN', room: 'Room 10A', tagColor: 'stone' },
        { subjectEn: 'English Speech & Drama', subjectSi: 'ඉංග්‍රීසි කථිකත්වය', code: 'ENG', room: 'Room 10A', tagColor: 'teal' },
        { subjectEn: 'History', subjectSi: 'ඉතිහාසය', code: 'HIS', room: 'Room 10A', tagColor: 'orange' },
        { subjectEn: 'Commerce', subjectSi: 'ව්‍යාපාර හා ගිණුම්කරණය', code: 'COM', room: 'Room 10A', tagColor: 'orange' },
        { subjectEn: 'Class Teacher Period', subjectSi: 'පන්ති භාර ගුරු කාලය', code: 'ADV', room: 'Room 10A', tagColor: 'stone' },
      ],
    },
  },
  {
    id: 'grade-12-bio',
    grade: 'Grade 12',
    stream: 'A/L Biological Science',
    medium: 'English',
    sectionName: 'Grade 12 Bio Science (English Medium)',
    schedule: {
      Monday: [
        { subjectEn: 'Biology Theory', subjectSi: 'ජීව විද්‍යාව න්‍යාය', code: 'BIO', room: 'Bio Lecture Hall', tagColor: 'teal' },
        { subjectEn: 'Biology Theory', subjectSi: 'ජීව විද්‍යාව න්‍යාය', code: 'BIO', room: 'Bio Lecture Hall', tagColor: 'teal' },
        { subjectEn: 'Chemistry Theory', subjectSi: 'රසායන විද්‍යාව න්‍යාය', code: 'CHE', room: 'Chem Lecture Hall', tagColor: 'maroon' },
        { subjectEn: 'Chemistry Theory', subjectSi: 'රසායන විද්‍යාව න්‍යාය', code: 'CHE', room: 'Chem Lecture Hall', tagColor: 'maroon' },
        { subjectEn: 'Physics Theory', subjectSi: 'භෞතික විද්‍යාව න්‍යාය', code: 'PHY', room: 'Physics Hall', tagColor: 'orange' },
        { subjectEn: 'Physics Theory', subjectSi: 'භෞතික විද්‍යාව න්‍යාය', code: 'PHY', room: 'Physics Hall', tagColor: 'orange' },
        { subjectEn: 'General English (A/L)', subjectSi: 'සාමාන්‍ය ඉංග්‍රීසි', code: 'GEN_ENG', room: 'Bio Lecture Hall', tagColor: 'stone' },
        { subjectEn: 'Common General Test', subjectSi: 'පොදු සාමාන්‍ය පරීක්ෂණය', code: 'GIT', room: 'Bio Lecture Hall', tagColor: 'stone' },
      ],
      Tuesday: [
        { subjectEn: 'Biology Practical Lab', subjectSi: 'ජීව විද්‍යා ප්‍රායෝගික', code: 'BIO_LAB', room: 'Advanced Bio Lab', tagColor: 'teal' },
        { subjectEn: 'Biology Practical Lab', subjectSi: 'ජීව විද්‍යා ප්‍රායෝගික', code: 'BIO_LAB', room: 'Advanced Bio Lab', tagColor: 'teal' },
        { subjectEn: 'Biology Practical Lab', subjectSi: 'ජීව විද්‍යා ප්‍රායෝගික', code: 'BIO_LAB', room: 'Advanced Bio Lab', tagColor: 'teal' },
        { subjectEn: 'Physics Tutorial', subjectSi: 'භෞතික විද්‍යාව අභ්‍යාස', code: 'PHY', room: 'Physics Hall', tagColor: 'orange' },
        { subjectEn: 'Chemistry Theory', subjectSi: 'රසායන විද්‍යාව', code: 'CHE', room: 'Chem Lecture Hall', tagColor: 'maroon' },
        { subjectEn: 'Chemistry Theory', subjectSi: 'රසායන විද්‍යාව', code: 'CHE', room: 'Chem Lecture Hall', tagColor: 'maroon' },
        { subjectEn: 'General ICT (GIT)', subjectSi: 'සාමාන්‍ය තොරතුරු තාක්ෂණය', code: 'GIT', room: 'Senior IT Lab', tagColor: 'teal' },
        { subjectEn: 'General ICT (GIT)', subjectSi: 'සාමාන්‍ය තොරතුරු තාක්ෂණය', code: 'GIT', room: 'Senior IT Lab', tagColor: 'teal' },
      ],
      Wednesday: [
        { subjectEn: 'Chemistry Practical Lab', subjectSi: 'රසායන විද්‍යා ප්‍රායෝගික', code: 'CHE_LAB', room: 'Advanced Chem Lab', tagColor: 'maroon' },
        { subjectEn: 'Chemistry Practical Lab', subjectSi: 'රසායන විද්‍යා ප්‍රායෝගික', code: 'CHE_LAB', room: 'Advanced Chem Lab', tagColor: 'maroon' },
        { subjectEn: 'Chemistry Practical Lab', subjectSi: 'රසායන විද්‍යා ප්‍රායෝගික', code: 'CHE_LAB', room: 'Advanced Chem Lab', tagColor: 'maroon' },
        { subjectEn: 'Biology Theory', subjectSi: 'ජීව විද්‍යාව න්‍යාය', code: 'BIO', room: 'Bio Lecture Hall', tagColor: 'teal' },
        { subjectEn: 'Physics Theory', subjectSi: 'භෞතික විද්‍යාව න්‍යාය', code: 'PHY', room: 'Physics Hall', tagColor: 'orange' },
        { subjectEn: 'Physics Theory', subjectSi: 'භෞතික විද්‍යාව න්‍යාය', code: 'PHY', room: 'Physics Hall', tagColor: 'orange' },
        { subjectEn: 'Library Research', subjectSi: 'පර්යේෂණ සහ පුස්තකාලය', code: 'LIB', room: 'Main Library', tagColor: 'stone' },
        { subjectEn: 'Buddhist Philosophy', subjectSi: 'බෞද්ධ දර්ශනය', code: 'BUD', room: 'Shrine Hall', tagColor: 'orange' },
      ],
      Thursday: [
        { subjectEn: 'Physics Practical Lab', subjectSi: 'භෞතික විද්‍යා ප්‍රායෝගික', code: 'PHY_LAB', room: 'Advanced Physics Lab', tagColor: 'orange' },
        { subjectEn: 'Physics Practical Lab', subjectSi: 'භෞතික විද්‍යා ප්‍රායෝගික', code: 'PHY_LAB', room: 'Advanced Physics Lab', tagColor: 'orange' },
        { subjectEn: 'Physics Practical Lab', subjectSi: 'භෞතික විද්‍යා ප්‍රායෝගික', code: 'PHY_LAB', room: 'Advanced Physics Lab', tagColor: 'orange' },
        { subjectEn: 'Chemistry Tutorial', subjectSi: 'රසායන විද්‍යාව අභ්‍යාස', code: 'CHE', room: 'Chem Lecture Hall', tagColor: 'maroon' },
        { subjectEn: 'Biology Theory', subjectSi: 'ජීව විද්‍යාව න්‍යාය', code: 'BIO', room: 'Bio Lecture Hall', tagColor: 'teal' },
        { subjectEn: 'Biology Theory', subjectSi: 'ජීව විද්‍යාව න්‍යාය', code: 'BIO', room: 'Bio Lecture Hall', tagColor: 'teal' },
        { subjectEn: 'Physical Training & Sports', subjectSi: 'ක්‍රීඩා සහ මලල ක්‍රීඩා', code: 'SPT', room: 'College Grounds', tagColor: 'maroon' },
        { subjectEn: 'Physical Training & Sports', subjectSi: 'ක්‍රීඩා සහ මලල ක්‍රීඩා', code: 'SPT', room: 'College Grounds', tagColor: 'maroon' },
      ],
      Friday: [
        { subjectEn: 'Dhamma Desana & Meditation', subjectSi: 'ධර්ම දේශනා හා භාවනා', code: 'MED', room: 'Monastic Shrine', tagColor: 'orange' },
        { subjectEn: 'Biology Review', subjectSi: 'ජීව විද්‍යාව පුනරීක්ෂණ', code: 'BIO', room: 'Bio Lecture Hall', tagColor: 'teal' },
        { subjectEn: 'Chemistry Review', subjectSi: 'රසායන විද්‍යාව පුනරීක්ෂණ', code: 'CHE', room: 'Chem Lecture Hall', tagColor: 'maroon' },
        { subjectEn: 'Physics Review', subjectSi: 'භෞතික විද්‍යාව පුනරීක්ෂණ', code: 'PHY', room: 'Physics Hall', tagColor: 'orange' },
        { subjectEn: 'Past Paper Analysis', subjectSi: 'පසුගිය ප්‍රශ්න පත්‍ර සාකච්ඡාව', code: 'REV', room: 'Bio Lecture Hall', tagColor: 'teal' },
        { subjectEn: 'Past Paper Analysis', subjectSi: 'පසුගිය ප්‍රශ්න පත්‍ර සාකච්ඡාව', code: 'REV', room: 'Bio Lecture Hall', tagColor: 'teal' },
        { subjectEn: 'General English (A/L)', subjectSi: 'සාමාන්‍ය ඉංග්‍රීසි', code: 'GEN_ENG', room: 'Bio Lecture Hall', tagColor: 'stone' },
        { subjectEn: 'Academic Mentoring', subjectSi: 'අධ්‍යයන උපදේශනය', code: 'ADV', room: 'Bio Lecture Hall', tagColor: 'stone' },
      ],
    },
  },
  {
    id: 'grade-12-commerce',
    grade: 'Grade 12',
    stream: 'A/L Commerce',
    medium: 'Sinhala',
    sectionName: 'Grade 12 Commerce (Sinhala & Bilingual)',
    schedule: {
      Monday: [
        { subjectEn: 'Accounting Theory', subjectSi: 'ගිණුම්කරණය න්‍යාය', code: 'ACC', room: 'Commerce Hall 1', tagColor: 'maroon' },
        { subjectEn: 'Accounting Theory', subjectSi: 'ගිණුම්කරණය න්‍යාය', code: 'ACC', room: 'Commerce Hall 1', tagColor: 'maroon' },
        { subjectEn: 'Business Studies', subjectSi: 'ව්‍යාපාර අධ්‍යයනය', code: 'BS', room: 'Commerce Hall 1', tagColor: 'orange' },
        { subjectEn: 'Business Studies', subjectSi: 'ව්‍යාපාර අධ්‍යයනය', code: 'BS', room: 'Commerce Hall 1', tagColor: 'orange' },
        { subjectEn: 'Economics', subjectSi: 'ආර්ථික විද්‍යාව', code: 'ECON', room: 'Commerce Hall 1', tagColor: 'teal' },
        { subjectEn: 'Economics', subjectSi: 'ආර්ථික විද්‍යාව', code: 'ECON', room: 'Commerce Hall 1', tagColor: 'teal' },
        { subjectEn: 'General English', subjectSi: 'සාමාන්‍ය ඉංග්‍රීසි', code: 'GEN_ENG', room: 'Commerce Hall 1', tagColor: 'stone' },
        { subjectEn: 'General ICT (GIT)', subjectSi: 'සාමාන්‍ය තොරතුරු තාක්ෂණය', code: 'GIT', room: 'Computer Lab 1', tagColor: 'teal' },
      ],
      Tuesday: [
        { subjectEn: 'Business Studies Tutorial', subjectSi: 'ව්‍යාපාර අධ්‍යයනය අභ්‍යාස', code: 'BS', room: 'Commerce Hall 1', tagColor: 'orange' },
        { subjectEn: 'Economics Review', subjectSi: 'ආර්ථික විද්‍යාව විග්‍රහය', code: 'ECON', room: 'Commerce Hall 1', tagColor: 'teal' },
        { subjectEn: 'Accounting Practice', subjectSi: 'ගිණුම්කරණය ප්‍රායෝගික', code: 'ACC', room: 'Commerce Hall 1', tagColor: 'maroon' },
        { subjectEn: 'Accounting Practice', subjectSi: 'ගිණුම්කරණය ප්‍රායෝගික', code: 'ACC', room: 'Commerce Hall 1', tagColor: 'maroon' },
        { subjectEn: 'Business Statistics', subjectSi: 'ව්‍යාපාර සංඛ්‍යානය', code: 'STAT', room: 'Commerce Hall 1', tagColor: 'teal' },
        { subjectEn: 'Information Tech (GIT)', subjectSi: 'තොරතුරු තාක්ෂණය', code: 'GIT', room: 'Computer Lab 1', tagColor: 'teal' },
        { subjectEn: 'Buddhist Values & Ethics', subjectSi: 'බෞද්ධ සාරධර්ම හා ව්‍යාපාර ආචාරධර්ම', code: 'BUD', room: 'Shrine Hall', tagColor: 'orange' },
        { subjectEn: 'Library Research', subjectSi: 'වාණිජ පුස්තකාලය', code: 'LIB', room: 'Main Library', tagColor: 'stone' },
      ],
      Wednesday: [
        { subjectEn: 'Accounting Special Papers', subjectSi: 'ගිණුම්කරණ ආදර්ශ ප්‍රශ්න පත්‍ර', code: 'ACC', room: 'Commerce Hall 1', tagColor: 'maroon' },
        { subjectEn: 'Accounting Special Papers', subjectSi: 'ගිණුම්කරණ ආදර්ශ ප්‍රශ්න පත්‍ර', code: 'ACC', room: 'Commerce Hall 1', tagColor: 'maroon' },
        { subjectEn: 'Business Studies Seminars', subjectSi: 'ව්‍යාපාර අධ්‍යයන සම්මන්ත්‍රණ', code: 'BS', room: 'Commerce Hall 1', tagColor: 'orange' },
        { subjectEn: 'Economics Case Studies', subjectSi: 'ආර්ථික විද්‍යා සිද්ධි අධ්‍යයන', code: 'ECON', room: 'Commerce Hall 1', tagColor: 'teal' },
        { subjectEn: 'General English', subjectSi: 'සාමාන්‍ය ඉංග්‍රීසි', code: 'GEN_ENG', room: 'Commerce Hall 1', tagColor: 'stone' },
        { subjectEn: 'Corporate Finance Intro', subjectSi: 'මූල්‍ය කළමනාකරණය', code: 'FIN', room: 'Commerce Hall 1', tagColor: 'maroon' },
        { subjectEn: 'Computer Lab Work (Excel)', subjectSi: 'පරිගණක ගිණුම්කරණය', code: 'ICT', room: 'Computer Lab 2', tagColor: 'teal' },
        { subjectEn: 'Sports & Wellness', subjectSi: 'ශාරීරික සුවතාව', code: 'SPT', room: 'Grounds', tagColor: 'orange' },
      ],
      Thursday: [
        { subjectEn: 'Economics Theory', subjectSi: 'ආර්ථික විද්‍යාව න්‍යාය', code: 'ECON', room: 'Commerce Hall 1', tagColor: 'teal' },
        { subjectEn: 'Economics Theory', subjectSi: 'ආර්ථික විද්‍යාව න්‍යාය', code: 'ECON', room: 'Commerce Hall 1', tagColor: 'teal' },
        { subjectEn: 'Accounting Analysis', subjectSi: 'ගිණුම්කරණ විශ්ලේෂණය', code: 'ACC', room: 'Commerce Hall 1', tagColor: 'maroon' },
        { subjectEn: 'Accounting Analysis', subjectSi: 'ගිණුම්කරණ විශ්ලේෂණය', code: 'ACC', room: 'Commerce Hall 1', tagColor: 'maroon' },
        { subjectEn: 'Business Studies', subjectSi: 'ව්‍යාපාර අධ්‍යයනය', code: 'BS', room: 'Commerce Hall 1', tagColor: 'orange' },
        { subjectEn: 'Business Studies', subjectSi: 'ව්‍යාපාර අධ්‍යයනය', code: 'BS', room: 'Commerce Hall 1', tagColor: 'orange' },
        { subjectEn: 'Cadetting / Debating', subjectSi: 'කැඩෙට් / විවාද පුහුණුව', code: 'ACT', room: 'Auditorium', tagColor: 'maroon' },
        { subjectEn: 'Cadetting / Debating', subjectSi: 'කැඩෙට් / විවාද පුහුණුව', code: 'ACT', room: 'Auditorium', tagColor: 'maroon' },
      ],
      Friday: [
        { subjectEn: 'Dhamma Desana & Assembly', subjectSi: 'ධර්ම දේශනා සහ රැස්වීම', code: 'DHM', room: 'Main Shrine', tagColor: 'orange' },
        { subjectEn: 'Model Paper Revision (ACC)', subjectSi: 'ගිණුම්කරණ ප්‍රශ්නෝත්තර', code: 'ACC', room: 'Commerce Hall 1', tagColor: 'maroon' },
        { subjectEn: 'Model Paper Revision (BS)', subjectSi: 'ව්‍යාපාර අධ්‍යයන ප්‍රශ්නෝත්තර', code: 'BS', room: 'Commerce Hall 1', tagColor: 'orange' },
        { subjectEn: 'Model Paper Revision (ECON)', subjectSi: 'ආර්ථික විද්‍යා ප්‍රශ්නෝත්තර', code: 'ECON', room: 'Commerce Hall 1', tagColor: 'teal' },
        { subjectEn: 'General English', subjectSi: 'සාමාන්‍ය ඉංග්‍රීසි', code: 'GEN_ENG', room: 'Commerce Hall 1', tagColor: 'stone' },
        { subjectEn: 'Common General Test', subjectSi: 'පොදු සාමාන්‍ය පරීක්ෂණය', code: 'GIT', room: 'Commerce Hall 1', tagColor: 'stone' },
        { subjectEn: 'Class Assembly & Advisory', subjectSi: 'පන්ති උපදේශනය', code: 'ADV', room: 'Commerce Hall 1', tagColor: 'stone' },
        { subjectEn: 'Temple Devotions', subjectSi: 'ආගමික වතාවත්', code: 'DEV', room: 'Shrine Room', tagColor: 'orange' },
      ],
    },
  },
  {
    id: 'grade-8-a',
    grade: 'Grade 8',
    stream: 'Junior Secondary',
    medium: 'Bilingual',
    sectionName: 'Grade 8-A (Bilingual Section)',
    schedule: {
      Monday: [
        { subjectEn: 'Buddhism', subjectSi: 'බුද්ධ ධර්මය', code: 'BUD', room: 'Room 8A', tagColor: 'orange' },
        { subjectEn: 'Mathematics', subjectSi: 'ගණිතය', code: 'MAT', room: 'Room 8A', tagColor: 'maroon' },
        { subjectEn: 'Science', subjectSi: 'විද්‍යාව', code: 'SCI', room: 'Junior Lab', tagColor: 'teal' },
        { subjectEn: 'Sinhala Lang', subjectSi: 'සිංහල භාෂාව', code: 'SIN', room: 'Room 8A', tagColor: 'stone' },
        { subjectEn: 'English', subjectSi: 'ඉංග්‍රීසි භාෂාව', code: 'ENG', room: 'Room 8A', tagColor: 'teal' },
        { subjectEn: 'History', subjectSi: 'ඉතිහාසය', code: 'HIS', room: 'Room 8A', tagColor: 'orange' },
        { subjectEn: 'Geography', subjectSi: 'භූගෝල විද්‍යාව', code: 'GEO', room: 'Room 8A', tagColor: 'stone' },
        { subjectEn: 'Practical Technical Skills (PTS)', subjectSi: 'ප්‍රායෝගික තාක්ෂණික කුසලතා', code: 'PTS', room: 'Workshop 1', tagColor: 'maroon' },
      ],
      Tuesday: [
        { subjectEn: 'Science', subjectSi: 'විද්‍යාව', code: 'SCI', room: 'Junior Lab', tagColor: 'teal' },
        { subjectEn: 'Mathematics', subjectSi: 'ගණිතය', code: 'MAT', room: 'Room 8A', tagColor: 'maroon' },
        { subjectEn: 'English', subjectSi: 'ඉංග්‍රීසි භාෂාව', code: 'ENG', room: 'Room 8A', tagColor: 'teal' },
        { subjectEn: 'Buddhism', subjectSi: 'බුද්ධ ධර්මය', code: 'BUD', room: 'Room 8A', tagColor: 'orange' },
        { subjectEn: 'Sinhala Lang', subjectSi: 'සිංහල භාෂාව', code: 'SIN', room: 'Room 8A', tagColor: 'stone' },
        { subjectEn: 'Civic Education', subjectSi: 'පුරවැසි අධ්‍යාපනය', code: 'CIV', room: 'Room 8A', tagColor: 'orange' },
        { subjectEn: 'Eastern Music / Art', subjectSi: 'සංගීතය / චිත්‍ර', code: 'ART', room: 'Aesthetic Room', tagColor: 'maroon' },
        { subjectEn: 'Eastern Music / Art', subjectSi: 'සංගීතය / චිත්‍ර', code: 'ART', room: 'Aesthetic Room', tagColor: 'maroon' },
      ],
      Wednesday: [
        { subjectEn: 'Mathematics', subjectSi: 'ගණිතය', code: 'MAT', room: 'Room 8A', tagColor: 'maroon' },
        { subjectEn: 'Science', subjectSi: 'විද්‍යාව', code: 'SCI', room: 'Junior Lab', tagColor: 'teal' },
        { subjectEn: 'Information Tech (ICT)', subjectSi: 'තොරතුරු තාක්ෂණය', code: 'ICT', room: 'Junior IT Lab', tagColor: 'teal' },
        { subjectEn: 'Information Tech (ICT)', subjectSi: 'තොරතුරු තාක්ෂණය', code: 'ICT', room: 'Junior IT Lab', tagColor: 'teal' },
        { subjectEn: 'History', subjectSi: 'ඉතිහාසය', code: 'HIS', room: 'Room 8A', tagColor: 'orange' },
        { subjectEn: 'Sinhala Lang', subjectSi: 'සිංහල භාෂාව', code: 'SIN', room: 'Room 8A', tagColor: 'stone' },
        { subjectEn: 'English Reading', subjectSi: 'ඉංග්‍රීසි කියවීම', code: 'ENG', room: 'Room 8A', tagColor: 'teal' },
        { subjectEn: 'Health & Physical Ed', subjectSi: 'සෞඛ්‍ය හා ශාරීරික', code: 'HPE', room: 'Grounds', tagColor: 'maroon' },
      ],
      Thursday: [
        { subjectEn: 'Buddhism', subjectSi: 'බුද්ධ ධර්මය', code: 'BUD', room: 'Shrine Room', tagColor: 'orange' },
        { subjectEn: 'Mathematics', subjectSi: 'ගණිතය', code: 'MAT', room: 'Room 8A', tagColor: 'maroon' },
        { subjectEn: 'Science Experiment', subjectSi: 'විද්‍යා පරීක්ෂණ', code: 'SCI', room: 'Junior Lab', tagColor: 'teal' },
        { subjectEn: 'English Speech', subjectSi: 'ඉංග්‍රීසි කථිකත්වය', code: 'ENG', room: 'Room 8A', tagColor: 'teal' },
        { subjectEn: 'Geography', subjectSi: 'භූගෝල විද්‍යාව', code: 'GEO', room: 'Room 8A', tagColor: 'stone' },
        { subjectEn: 'Sinhala Literature', subjectSi: 'සිංහල සාහිත්‍යය', code: 'SIN', room: 'Room 8A', tagColor: 'stone' },
        { subjectEn: 'Kandyan Dance / Ves', subjectSi: 'උඩරට නැටුම්', code: 'DAN', room: 'Dance Hall', tagColor: 'maroon' },
        { subjectEn: 'Traditional Drumming (Bera)', subjectSi: 'බෙර වාදනය', code: 'BERA', room: 'Dance Hall', tagColor: 'maroon' },
      ],
      Friday: [
        { subjectEn: 'Dhamma Sermon & Vandana', subjectSi: 'ධර්ම දේශනාව හා වන්දනාව', code: 'DHM', room: 'Main Shrine', tagColor: 'orange' },
        { subjectEn: 'Mathematics', subjectSi: 'ගණිතය', code: 'MAT', room: 'Room 8A', tagColor: 'maroon' },
        { subjectEn: 'Science', subjectSi: 'විද්‍යාව', code: 'SCI', room: 'Junior Lab', tagColor: 'teal' },
        { subjectEn: 'Sinhala Grammar', subjectSi: 'සිංහල ව්‍යාකරණ', code: 'SIN', room: 'Room 8A', tagColor: 'stone' },
        { subjectEn: 'English Grammar & Writing', subjectSi: 'ඉංග්‍රීසි රචනා', code: 'ENG', room: 'Room 8A', tagColor: 'teal' },
        { subjectEn: 'History', subjectSi: 'ඉතිහාසය', code: 'HIS', room: 'Room 8A', tagColor: 'orange' },
        { subjectEn: 'Scout / Cadet Orientation', subjectSi: 'බාලදක්ෂ / කැඩෙට්', code: 'SCT', room: 'Grounds', tagColor: 'maroon' },
        { subjectEn: 'Class Cleaning & Teacher Period', subjectSi: 'පන්ති භාර ගුරු කාලය', code: 'ADV', room: 'Room 8A', tagColor: 'stone' },
      ],
    },
  },
];
