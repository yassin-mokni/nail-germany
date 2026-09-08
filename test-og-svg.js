const fs = require('fs');

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630" style="background:#FAF9F6; font-family:system-ui, -apple-system, 'SF Pro Text', 'Helvetica Neue', Arial, sans-serif;">
  <defs>
    <pattern id="dot-grid" x="0" y="0" width="28" height="28" patternUnits="userSpaceOnUse">
      <circle cx="14" cy="14" r="1.5" fill="#D4D4D8" />
    </pattern>
  </defs>

  <!-- Background with Dot Grid -->
  <rect width="1200" height="630" fill="#FAF9F6" />
  <rect width="1200" height="630" fill="url(#dot-grid)" />

  <!-- Outer Heavy Brutalist Border -->
  <rect x="8" y="8" width="1184" height="614" fill="none" stroke="#000000" stroke-width="12" />

  <!-- Inner Top Header -->
  <g transform="translate(48, 48)">
    <!-- Document Icon Motif -->
    <g transform="translate(0, 0)">
      <!-- Black Document Sheet -->
      <path d="M0,0 L32,0 L44,12 L44,56 L0,56 Z" fill="#000000" stroke="#000000" stroke-width="2" />
      <!-- Folded Corner -->
      <path d="M32,0 L32,12 L44,12 Z" fill="#FAF9F6" stroke="#000000" stroke-width="2" />
      <!-- White Document Lines -->
      <line x1="8" y1="18" x2="26" y2="18" stroke="#FFFFFF" stroke-width="3" stroke-linecap="round" />
      <line x1="8" y1="28" x2="34" y2="28" stroke="#FFFFFF" stroke-width="3" stroke-linecap="round" />
      <line x1="8" y1="38" x2="22" y2="38" stroke="#FFFFFF" stroke-width="3" stroke-linecap="round" />
      <!-- Yellow Checkmark Badge -->
      <circle cx="44" cy="54" r="13" fill="#FACC15" stroke="#000000" stroke-width="3" />
      <path d="M38,54 L42,58 L50,49" fill="none" stroke="#000000" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round" />
    </g>

    <!-- App Title & Label -->
    <text x="70" y="16" font-size="12" font-family="ui-monospace, SFMono-Regular, Menlo, monospace" font-weight="700" fill="#71717A" letter-spacing="1.5">OFFICIAL RELOCATION PROTOCOL</text>
    <text x="70" y="44" font-size="28" font-weight="900" fill="#000000" letter-spacing="-0.5">NAIL GERMANY <tspan fill="#A1A1AA" font-family="monospace" font-weight="400">//</tspan> <tspan fill="#3F3F46" font-size="22" font-weight="700">BUREAUCRACY CHECKLIST</tspan></text>

    <!-- Top Badges -->
    <g transform="translate(750, 4)">
      <!-- 2026 Edition Yellow Badge with Shadow -->
      <rect x="0" y="4" width="168" height="38" fill="#000000" />
      <rect x="-3" y="1" width="168" height="38" fill="#FACC15" stroke="#000000" stroke-width="3" />
      <text x="81" y="25" font-size="14" font-family="ui-monospace, monospace" font-weight="900" fill="#000000" text-anchor="middle">2026 EDITION</text>

      <!-- 21 Guides Black Badge -->
      <rect x="180" y="1" width="164" height="38" fill="#000000" stroke="#000000" stroke-width="3" />
      <text x="262" y="25" font-size="13" font-family="ui-monospace, monospace" font-weight="700" fill="#FFFFFF" text-anchor="middle">21 STATUTORY GUIDES</text>
    </g>

    <!-- Header Divider Line -->
    <line x1="0" y1="74" x2="1104" y2="74" stroke="#000000" stroke-width="4" />
  </g>

  <!-- Hero Section -->
  <g transform="translate(48, 146)">
    <!-- Tagline Badge -->
    <rect x="0" y="0" width="370" height="24" fill="#000000" />
    <text x="10" y="16" font-size="11" font-family="ui-monospace, monospace" font-weight="900" fill="#FACC15" letter-spacing="1">STATUTORY SELF-DEFENSE FOR EXPATS</text>

    <!-- Giant Headline -->
    <text x="0" y="66" font-size="44" font-weight="900" fill="#000000" letter-spacing="-1">MASTER GERMAN BUREAUCRACY.</text>
    
    <!-- Highlighted Secondary Headline -->
    <g transform="translate(0, 82)">
      <rect x="0" y="0" width="670" height="52" fill="#FACC15" stroke="#000000" stroke-width="3" />
      <text x="14" y="38" font-size="38" font-weight="900" fill="#000000" letter-spacing="-0.5">ZERO FINES. KNOW YOUR RIGHTS.</text>
    </g>

    <!-- Subtitle Body as discrete clean lines -->
    <text x="0" y="166" font-size="17" font-weight="500" fill="#27272A">Step-by-step statutory protocols for expats moving to and living in Germany. Avoid costly traps</text>
    <text x="0" y="192" font-size="17" font-weight="500" fill="#27272A">with landlords, health insurance, and tax authorities. Direct official portal links with zero fluff.</text>
  </g>

  <!-- Topic Cards Grid (2x3) -->
  <g transform="translate(48, 382)">
    <!-- Card 1 -->
    <g transform="translate(0, 0)">
      <rect x="3" y="3" width="350" height="64" fill="#000000" />
      <rect x="0" y="0" width="350" height="64" fill="#FFFFFF" stroke="#000000" stroke-width="2.5" />
      <text x="14" y="20" font-size="10" font-family="ui-monospace, monospace" font-weight="700" fill="#71717A">§ BMG RESIDENCE REGISTRATION</text>
      <text x="14" y="46" font-size="16" font-weight="800" fill="#000000">Anmeldung in 14 Days</text>
    </g>

    <!-- Card 2 -->
    <g transform="translate(376, 0)">
      <rect x="3" y="3" width="350" height="64" fill="#000000" />
      <rect x="0" y="0" width="350" height="64" fill="#FFFFFF" stroke="#000000" stroke-width="2.5" />
      <text x="14" y="20" font-size="10" font-family="ui-monospace, monospace" font-weight="700" fill="#71717A">§ BGB RENTAL LAW</text>
      <text x="14" y="46" font-size="16" font-weight="800" fill="#000000">Mietkaution 3-Month Escrow</text>
    </g>

    <!-- Card 3 -->
    <g transform="translate(752, 0)">
      <rect x="3" y="3" width="350" height="64" fill="#000000" />
      <rect x="0" y="0" width="350" height="64" fill="#FFFFFF" stroke="#000000" stroke-width="2.5" />
      <text x="14" y="20" font-size="10" font-family="ui-monospace, monospace" font-weight="700" fill="#71717A">§ ESTG TAX PROTOCOL</text>
      <text x="14" y="46" font-size="16" font-weight="800" fill="#000000">Steuer-ID &amp; Tax Classes</text>
    </g>

    <!-- Card 4 -->
    <g transform="translate(0, 78)">
      <rect x="3" y="3" width="350" height="64" fill="#000000" />
      <rect x="0" y="0" width="350" height="64" fill="#FFFFFF" stroke="#000000" stroke-width="2.5" />
      <text x="14" y="20" font-size="10" font-family="ui-monospace, monospace" font-weight="700" fill="#71717A">§ AUFENTHG VISA &amp; RESIDENCE</text>
      <text x="14" y="46" font-size="16" font-weight="800" fill="#000000">Aufenthaltstitel Protocols</text>
    </g>

    <!-- Card 5 -->
    <g transform="translate(376, 78)">
      <rect x="3" y="3" width="350" height="64" fill="#000000" />
      <rect x="0" y="0" width="350" height="64" fill="#FFFFFF" stroke="#000000" stroke-width="2.5" />
      <text x="14" y="20" font-size="10" font-family="ui-monospace, monospace" font-weight="700" fill="#71717A">§ SGB HEALTH INSURANCE</text>
      <text x="14" y="46" font-size="16" font-weight="800" fill="#000000">GKV vs PKV Trap Avoidance</text>
    </g>

    <!-- Card 6 -->
    <g transform="translate(752, 78)">
      <rect x="3" y="3" width="350" height="64" fill="#000000" />
      <rect x="0" y="0" width="350" height="64" fill="#FFFFFF" stroke="#000000" stroke-width="2.5" />
      <text x="14" y="20" font-size="10" font-family="ui-monospace, monospace" font-weight="700" fill="#71717A">§ RBSTV BROADCASTING</text>
      <text x="14" y="46" font-size="16" font-weight="800" fill="#000000">Rundfunkbeitrag Exemption</text>
    </g>
  </g>

  <!-- Footer Bar -->
  <g transform="translate(48, 550)">
    <!-- Footer Divider Line -->
    <line x1="0" y1="0" x2="1104" y2="0" stroke="#000000" stroke-width="3" />

    <!-- Left Domain & Specs -->
    <g transform="translate(0, 16)">
      <rect x="0" y="0" width="195" height="26" fill="#000000" />
      <text x="12" y="17" font-size="12" font-family="ui-monospace, monospace" font-weight="700" fill="#FFFFFF">nail-germany.mokni.dev</text>
      <text x="212" y="17" font-size="12" font-family="ui-monospace, monospace" font-weight="600" fill="#52525B">• 21 Statutory Guides • Free &amp; Open Source • Pure Static</text>
    </g>

    <!-- Right Author Attribution -->
    <g transform="translate(970, 16)">
      <text x="0" y="17" font-size="13" font-weight="500" fill="#52525B">Built by</text>
      <rect x="56" y="0" width="66" height="24" fill="#000000" />
      <text x="66" y="16" font-size="13" font-weight="800" fill="#FFFFFF">Yassin</text>
    </g>
  </g>
</svg>`;

fs.writeFileSync('/tmp/clean_og.svg', svg);
