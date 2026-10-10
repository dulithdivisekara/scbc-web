import sharp from 'sharp';
import fs from 'node:fs';
import path from 'node:path';

async function generateOgImage() {
  const rootDir = process.cwd();
  const campusImgPath = path.join(rootDir, 'public/assets/campus/campus-main-building.jpg');
  const crestImgPath = path.join(rootDir, 'public/assets/branding/school-crest-official.png');
  const outputJpgPath = path.join(rootDir, 'public/assets/og-image.jpg');
  const outputWebpPath = path.join(rootDir, 'public/assets/og-image.webp');

  console.log('Generating 1200x630 OG Marketing Image...');

  // 1. Process base campus photo: crop to 1200x630
  const baseCampus = await sharp(campusImgPath)
    .resize(1200, 630, { fit: 'cover', position: 'center' })
    .toBuffer();

  // 2. Process crest to crisp 140x140
  const crestBuffer = await sharp(crestImgPath)
    .resize(140, 140, { fit: 'contain' })
    .toBuffer();

  // 3. Compose rich SVG overlay with branding, marketing CTA, and core values
  const svgOverlay = `
  <svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <!-- Deep institutional vignette gradient -->
      <linearGradient id="bgGradient" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#12030B" stop-opacity="0.96" />
        <stop offset="45%" stop-color="#1A0A14" stop-opacity="0.90" />
        <stop offset="75%" stop-color="#1E1424" stop-opacity="0.75" />
        <stop offset="100%" stop-color="#0F172A" stop-opacity="0.55" />
      </linearGradient>

      <linearGradient id="cardGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#FFFFFF" stop-opacity="0.08" />
        <stop offset="100%" stop-color="#FFFFFF" stop-opacity="0.02" />
      </linearGradient>

      <filter id="shadow" x="-10%" y="-10%" width="120%" height="120%">
        <feDropShadow dx="0" dy="4" stdDeviation="8" flood-color="#000000" flood-opacity="0.6"/>
      </filter>
    </defs>

    <!-- Dark gradient backdrop -->
    <rect width="1200" height="630" fill="url(#bgGradient)" />

    <!-- Top Tri-color Brand Rule -->
    <rect x="0" y="0" width="400" height="7" fill="#007A87" />
    <rect x="400" y="0" width="400" height="7" fill="#F58220" />
    <rect x="800" y="0" width="400" height="7" fill="#581838" />

    <!-- School Crest Backdrop Circle -->
    <circle cx="130" cy="130" r="76" fill="#1A0612" stroke="#F58220" stroke-width="2" opacity="0.9" />

    <!-- Eyebrow Tag -->
    <g transform="translate(240, 85)">
      <rect x="0" y="0" width="440" height="26" rx="4" fill="#F58220" fill-opacity="0.2" stroke="#F58220" stroke-width="1" />
      <text x="14" y="17" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="11" font-weight="700" fill="#FBBF24" letter-spacing="2">
        ASGIRIYA, KANDY • EST. 2006 • NATIONAL BUDDHIST COLLEGE
      </text>
    </g>

    <!-- Main Title -->
    <text x="240" y="152" font-family="Georgia, 'Times New Roman', serif" font-size="36" font-weight="bold" fill="#FFFFFF" filter="url(#shadow)">
      Sri Chandananda Buddhist College
    </text>

    <!-- Sinhala Subtitle -->
    <text x="240" y="190" font-family="-apple-system, 'Noto Serif Sinhala', 'Segoe UI', sans-serif" font-size="20" font-weight="600" fill="#E2E8F0">
      ශ්‍රී චන්දානන්ද බෞද්ධ විද්‍යාලය • මහනුවර
    </text>

    <!-- Core Values Section (Large Card) -->
    <g transform="translate(60, 230)">
      <!-- Card Container -->
      <rect width="1080" height="235" rx="16" fill="url(#cardGrad)" stroke="#FFFFFF" stroke-opacity="0.15" stroke-width="1" />

      <!-- Section Header -->
      <text x="32" y="40" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" font-size="11" font-weight="700" fill="#F58220" letter-spacing="2">
        OUR CORE INSTITUTIONAL VALUES • මූලික විද්‍යාලයීය වටිනාකම්
      </text>
      <line x1="32" y1="55" x2="1048" y2="55" stroke="#FFFFFF" stroke-opacity="0.1" stroke-width="1" />

      <!-- Value 1: Wisdom -->
      <g transform="translate(32, 75)">
        <text x="0" y="16" font-family="monospace" font-size="13" font-weight="bold" fill="#FBBF24">01</text>
        <text x="28" y="16" font-family="Georgia, serif" font-size="18" font-weight="bold" fill="#FFFFFF">WISDOM</text>
        <text x="0" y="38" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" font-size="13" font-weight="600" fill="#FBBF24">ප්‍රඥාව • Paññā</text>
        <text x="0" y="60" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" font-size="12" fill="#E2E8F0">
          Intellectual wisdom, bilingual
        </text>
        <text x="0" y="78" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" font-size="12" fill="#E2E8F0">
          rigour &amp; academic inquiry.
        </text>
      </g>

      <!-- Value 2: Discipline -->
      <g transform="translate(290, 75)">
        <text x="0" y="16" font-family="monospace" font-size="13" font-weight="bold" fill="#FBBF24">02</text>
        <text x="28" y="16" font-family="Georgia, serif" font-size="18" font-weight="bold" fill="#FFFFFF">DISCIPLINE</text>
        <text x="0" y="38" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" font-size="13" font-weight="600" fill="#FBBF24">විනය • Sīla</text>
        <text x="0" y="60" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" font-size="12" fill="#E2E8F0">
          Moral self-restraint, Theravada
        </text>
        <text x="0" y="78" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" font-size="12" fill="#E2E8F0">
          ethics &amp; mindful leadership.
        </text>
      </g>

      <!-- Value 3: Cultural Heritage -->
      <g transform="translate(555, 75)">
        <text x="0" y="16" font-family="monospace" font-size="13" font-weight="bold" fill="#FBBF24">03</text>
        <text x="28" y="16" font-family="Georgia, serif" font-size="18" font-weight="bold" fill="#FFFFFF">HERITAGE</text>
        <text x="0" y="38" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" font-size="13" font-weight="600" fill="#FBBF24">සංස්කෘතිය • Cāritta</text>
        <text x="0" y="60" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" font-size="12" fill="#E2E8F0">
          Ves dance, pirith ceremonies
        </text>
        <text x="0" y="78" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" font-size="12" fill="#E2E8F0">
          &amp; sacred Asgiriya heritage.
        </text>
      </g>

      <!-- Value 4: Excellence -->
      <g transform="translate(820, 75)">
        <text x="0" y="16" font-family="monospace" font-size="13" font-weight="bold" fill="#FBBF24">04</text>
        <text x="28" y="16" font-family="Georgia, serif" font-size="18" font-weight="bold" fill="#FFFFFF">EXCELLENCE</text>
        <text x="0" y="38" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" font-size="13" font-weight="600" fill="#FBBF24">විශිෂ්ටත්වය • Viriya</text>
        <text x="0" y="60" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" font-size="12" fill="#E2E8F0">
          Track &amp; field athletic mastery,
        </text>
        <text x="0" y="78" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" font-size="12" fill="#E2E8F0">
          sports meets &amp; camaraderie.
        </text>
      </g>
    </g>

    <!-- Bottom Marketing & Admissions Banner -->
    <g transform="translate(60, 495)">
      <!-- Admissions Pill -->
      <rect x="0" y="0" width="550" height="52" rx="26" fill="#F58220" />
      <circle cx="26" cy="26" r="14" fill="#FFFFFF" fill-opacity="0.2" />
      <text x="50" y="32" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" font-size="13" font-weight="800" fill="#FFFFFF" letter-spacing="1">
        ADMISSIONS OPEN 2026 • GRADES 1–13 • DUAL MEDIUM
      </text>

      <!-- Official Portal Verification Pill -->
      <rect x="760" y="4" width="320" height="44" rx="22" fill="#000000" fill-opacity="0.4" stroke="#FFFFFF" stroke-opacity="0.25" stroke-width="1" />
      <text x="790" y="31" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" font-size="13" font-weight="700" fill="#E2E8F0">
        OFFICIAL PORTAL: <tspan fill="#FBBF24" font-weight="bold">scbck.lk</tspan>
      </text>
    </g>

    <!-- Subdued Bottom Border -->
    <rect x="0" y="626" width="1200" height="4" fill="#581838" />
  </svg>
  `;

  const svgBuffer = Buffer.from(svgOverlay);

  // 4. Composite together
  const finalImage = await sharp(baseCampus)
    .composite([
      { input: svgBuffer, top: 0, left: 0 },
      { input: crestBuffer, top: 60, left: 60 }
    ]);

  // Output JPG
  await finalImage
    .jpeg({ quality: 92, progressive: true })
    .toFile(outputJpgPath);
  console.log('Saved JPEG OG image to:', outputJpgPath);

  // Output WebP
  await sharp(outputJpgPath)
    .webp({ quality: 92 })
    .toFile(outputWebpPath);
  console.log('Saved WebP OG image to:', outputWebpPath);

  const stats = fs.statSync(outputJpgPath);
  console.log(`OG Image Size: ${(stats.size / 1024).toFixed(1)} KB`);
}

generateOgImage().catch(console.error);
