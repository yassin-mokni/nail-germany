# Nail Germany // Expat Bureaucratic Self-Defense Protocol

A purely static, client-side web application designed to help expats navigate German bureaucracy so they don't get exploited by landlords, predatory employers, or administrative traps.

---

## 1. Executive Summary

| Attribute | Specification |
| :--- | :--- |
| **Project Name** | Nail Germany |
| **Directory** | `projects/nail-germany` |
| **Framework** | Next.js 16 (App Router) configured for purely static export (`output: 'export'`) |
| **Styling** | Tailwind CSS v4 (Utilitarian, Brutalist, High-Contrast Gov.uk / Terminal style) |
| **State Management** | Zustand with `localStorage` persistence (`nail_germany_profile_v1`) |
| **Type Safety** | Strict TypeScript interfaces for profiles, conditions, tasks, and urgencies |
| **Deployment Mode** | Purely static HTML/JS/CSS output in `./out` (zero Node.js backend required) |

---

## 2. Design System & Aesthetic Rules

The UI strictly adheres to a **utilitarian, brutally functional, terminal / gov.uk** design language with zero "AI-slop":

- **Strictly Banned**:
  - Zero gradients
  - Absolutely no glassmorphism or backdrop-blur
  - No glowing or soft drop shadows
  - No `rounded-3xl` or pill corners
  - No purple / blue startup color palettes
- **Harsh Borders & Geometry**:
  - Heavy black borders (`border-2 border-black`, `border-4 border-black`)
  - Sharp corners (`rounded-none` everywhere)
  - Stark white background (`#ffffff`) and deep black text (`#000000`)
- **Raw Flat Utility Alert Colors**:
  - **Critical Priority**: `bg-red-600 text-white`
  - **Recommended**: `bg-yellow-400 text-black`
  - **Optional / Informational**: `bg-gray-200 text-black`
- **Typography & Details**:
  - Clean, highly legible sans-serif system fonts
  - Monospaced tags for statutory law citations (e.g., `§ 17 BMG`, `§ 551 Abs. 2 BGB`)
  - Custom brutalist checkboxes with tactile instant toggling

---

## 3. Architecture & File Structure

```
/Users/yassin.mokni/projects/nail-germany/
├── next.config.ts                      # Static export configuration (output: 'export')
├── package.json                        # Dependencies: next, react, zustand, lucide-react, tailwindcss
├── data/
│   └── tasks.json                      # Bureaucracy dataset with legal refs, traps & conditions
├── src/
│   ├── app/
│   │   ├── layout.tsx                  # Root HTML metadata & font setup
│   │   ├── page.tsx                    # Top-level switcher (Onboarding vs Dashboard)
│   │   └── globals.css                 # Brutalist CSS tokens, selection, print styling
│   ├── components/
│   │   ├── Header.tsx                  # Gov/Terminal masthead & quick action buttons
│   │   ├── OnboardingForm.tsx          # 5-question brutalist intake questionnaire
│   │   ├── Dashboard.tsx               # Interactive checklist, progress tracker & filters
│   │   ├── TaskCard.tsx                # Task card with law references & "How They Screw You" traps
│   │   ├── ProfileSummary.tsx          # Active expat dossier display
│   │   └── UrgencyBadge.tsx            # Flat red / yellow / gray badges
│   ├── hooks/
│   │   └── useFilteredTasks.ts         # Filtering engine matching tasks strictly against profile (imports @data/tasks.json)
│   ├── store/
│   │   └── useProfileStore.ts          # Zustand store with localStorage persistence
│   └── types/
│       └── index.ts                    # TypeScript types for Profile, Task, Urgency, Conditions
```

---

## 4. State Management (Zustand + `localStorage`)

File: `src/store/useProfileStore.ts`

The state store persists the following profile parameters to `localStorage` under the key `"nail_germany_profile_v1"`:
- `origin`: `"eu"` | `"non-eu"` | `null`
- `employment`: `"employed"` | `"freelance"` | `"student"` | `null`
- `housing`: `"own_apartment"` | `"wg"` | `null`
- `marital_status`: `"single"` | `"married"` | `null`
- `has_children`: `boolean` | `null`
- `state`: `"bayern"` | `"berlin"` | `"nordrhein-westfalen"` | `"baden-wuerttemberg"` | `"hessen"` | `"hamburg"` | `"sachsen"` | `"niedersachsen"` | `"other"` | `null`
- `completed_tasks`: `string[]` (IDs of checked tasks)
- `is_configured`: `boolean` (tracks whether intake was completed)
- `hasHydrated`: `boolean` (prevents SSR/client hydration mismatch)

### Actions:
- `setProfile(profile)`: Updates multiple fields and recalculates `is_configured`.
- `updateField(field, value)`: Updates a single profile field.
- `toggleCompletedTask(taskId)`: Toggles task completion state.
- `markTaskCompleted(taskId, boolean)`: Explicitly sets task completion state.
- `resetProfile()`: Resets all profile data and completed checkmarks back to defaults.

---

## 5. The Condition Filtering Engine

File: `src/hooks/useFilteredTasks.ts`

Evaluates each task from `data/tasks.json` against the active user profile:
1. If a task has no `conditions` object (or empty `{}`), it applies universally to all expats.
2. If conditions are specified, all defined conditions must strictly match:
   - `origin`: Checks equality or array inclusion (e.g. `["non-eu"]`).
   - `employment`: Matches `"employed"`, `"freelance"`, or `"student"`.
   - `housing`: Matches `"own_apartment"` or `"wg"`.
   - `marital_status`: Matches `"single"` or `"married"`.
   - `has_children`: Matches boolean equality.
   - `state`: Matches federal state jurisdiction (e.g. `"bayern"` or `["berlin", "hamburg"]`).
3. Automatically computes live statistics:
   - `totalCount`: Number of strictly applicable tasks.
   - `completedCount`: Number of completed tasks.
   - `criticalPendingCount`: Number of critical tasks not yet secured.
   - `progressPercentage`: Integer percentage `(completedCount / totalCount) * 100`.
   - `categories`: Sorted unique list of applicable task categories.

---

## 6. The Bureaucracy Trap Database (`data/tasks.json`)

The database includes realistic, high-impact bureaucratic obligations and the legal self-defense protocols needed:

| Task ID | Title | Urgency | Conditions | Legal Reference | The Bureaucracy Trap |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `kindergeld-application` | Kindergeld Application (Child Benefit) | Recommended | `has_children: true`<br>`marital_status: "married"` | § 32 EStG / BKGG | Expats forfeit €250+/month per child assuming it's automatic. Back-pay is legally limited to 6 months retroactive. |
| `rundfunkbeitrag-registration` | Rundfunkbeitrag (Radio Fee Registration) | Critical | `housing: ["own_apartment", "wg"]` | § 2 RBStV | Fee is per residence, not per person. Moving into a WG without registering flatmate's number causes duplicate bills and debt collection (Inkasso). |
| `rechtsschutzversicherung-contract` | Rechtsschutzversicherung (Legal Insurance) | Recommended | Universal (`{}`) | § 1 ff. VVG / ARB | 95% of policies require a 3-month waiting period (*Wartezeit*). If a dispute starts before 3 months, no lawyer will touch it without high upfront fees. |
| `mieterverein-membership` | Mieterverein (Tenants' Union Registration) | Recommended | `housing: ["own_apartment", "wg"]` | § 556d BGB / § 556 BGB | Over 70% of *Nebenkosten* utility bills have illegal charges. Joining gives you free lawyer letter drafting to recover €500–€2,000. |
| `anmeldung-residence-registration` | Anmeldung (Residence Registration) | Critical | Universal (`{}`) | § 17 BMG | Must register within 14 days. Without it, you cannot get a Steuer-ID, bank account, or health insurance; risk fines up to €1,000. |
| `aufenthaltstitel-work-permit` | Aufenthaltstitel & Work Permit | Critical | `origin: "non-eu"` | § 18b / § 81 AufenthG | If entry visa expires without a *Fiktionsbescheinigung*, right to work lapses and employers must suspend pay immediately. |
| `mietkaution-three-installments` | Mietkaution: Enforce 3-Installment Right | Critical | `housing: ["own_apartment", "wg"]` | § 551 Abs. 2 BGB | Landlords bully expats into paying all 3 months upfront. Under federal law, paying in 3 equal monthly installments is an unconditional right. |
| `freelance-tax-registration` | Fragebogen zur steuerlichen Erfassung | Critical | `employment: "freelance"` | § 138 AO | Cannot legally invoice with VAT or a Steuernummer until ELSTER questionnaire is processed. |
| `sperrkonto-blocked-account-unfreeze` | Sperrkonto (Blocked Account) Activation | Critical | `origin: "non-eu"`<br>`employment: "student"` | § 16b AufenthG | Providers lock the €11k+ funds until an official Meldebestätigung and German IBAN are submitted. |
| `steuerklasse-optimization` | Steuerklasse Optimization for Married Couples | Recommended | `employment: "employed"`<br>`marital_status: "married"` | § 38b EStG | Default is Class IV/IV. If income is unequal, switching to III/V saves hundreds of euros monthly from wage withholding. |
| `probezeit-kuendigungsschutz` | Probezeit & Dismissal Protection Protocol | Optional | `employment: "employed"` | § 622 BGB / § 1 KSchG | In 6-month probation, termination requires only 2 weeks' notice without cause. After 6 months, statutory dismissal protection activates. |
| `health-insurance-transition` | Statutory Health Insurance Transition & Expat Insurance Trap | Critical | Universal (`{}`) | § 5 SGB V / § 193 VVG | Cheap inbound expat policies (Mawista, Care Concept) are invalid for permanent visas and block subsequent public health insurance entry. |
| `kita-gutschein-application` | Kita-Gutschein Application (Daycare Legal Entitlement) | Recommended | `has_children: true` | § 24 Abs. 2 SGB VIII | Spots have legal entitlement from age 1, but waitlists exceed a year if not requested 6–9 months ahead; parents can sue Jugendamt for damages. |
| `steuer-id-retrieval-class-vi` | Steuer-ID Retrieval & Tax Class VI Penalty Prevention | Critical | `employment: "employed"` | § 139b AO / § 39c EStG | If 11-digit ID is not given to HR before first payroll cutoff, employers are legally mandated to deduct ~45-50% under Tax Class VI. |
| `schufa-free-art15-datenkopie` | Schufa Credit Record & Free GDPR Data Copy (Art. 15 DSGVO) | Recommended | Universal (`{}`) | Art. 15 DSGVO / § 34 BDSG | Schufa charges €29.95 commercially while legally required to give a 100% free data copy under GDPR; new arrivals have vulnerable blank scores. |
| `elterngeld-parental-allowance` | Elterngeld Application (State Parental Allowance) | Recommended | `has_children: true` | § 1 / § 5 BEEG | Replaces 65-67% of net pay (up to €1,800/mo), but retroactive claims strictly expire after 3 months; certain permit types are excluded. |
| `kirchensteuer-declaration-optout` | Kirchensteuer (Church Tax) Declaration & Formal Opt-Out | Recommended | `employment: "employed"` | Art. 140 GG / KiStG | Checking a religion on Anmeldung causes 8-9% extra tax withheld automatically; stopping it requires formal civil Kirchenaustritt. |
| `wg-joint-liability-protection` | WG Joint Liability Defense (Gesamtschuldnerische Haftung) | Critical | `housing: "wg"` | § 421 / § 540 BGB | Main tenants in shared flats are 100% jointly liable if a roommate flees or defaults, and cannot unilaterally terminate their share. |
| `consumer-contract-monthly-cancellation` | Fair Consumer Contracts: Enforce 1-Month Termination Right | Optional | Universal (`{}`) | § 309 Nr. 9 BGB | Subscriptions signed after March 2022 cannot lock in for another full year upon auto-renewal; termination notice is strictly 1 month. |
| `bayerisches-familiengeld-transition` | Bayerisches Familiengeld: Grandfathering Claim | Recommended | `has_children: true`<br>`state: "bayern"` | BayFamG | Children born before Jan 1, 2025 are still entitled to €250/mo; benefit was abolished only for children born 2025 onwards. Must apply before 3rd birthday. |
| `bayern-kita-beitragszuschuss` | Bavarian Kita Subsidy: Enforce €100/Month Fee Reduction | Recommended | `has_children: true`<br>`state: "bayern"` | Art. 23 BayKiBiG | Bavarian daycare costs €250–€800+/mo, but state pays an unconditional €100/mo fee contribution from September 1st of child's 3rd year. |

---

## 7. Interactive Features & User Flow

1. **Intake Flow (`OnboardingForm.tsx`)**:
   - 6 high-contrast question blocks.
   - Instant visual feedback: `[REQUIRED]` switches to `[RESOLVED]`.
   - **Quick-Load Presets** for one-click testing:
     - Preset A: Married Non-EU Worker in Bayern (tests Bavarian Familiengeld grandfathering)
     - Preset B: Single Student in Berlin WG (tests Sperrkonto + WG Joint Liability)
     - Preset C: EU Freelancer in NRW (tests Freelance Steuernummer + 9% Kirchensteuer)
2. **Executive Dashboard (`Dashboard.tsx`)**:
   - Active dossier summary with `[RECONFIGURE PROFILE]` button.
   - Critical Administrative Threat banner if critical tasks remain uncompleted.
   - Real-time progress bar.
   - Filter tabs: `ALL`, `CRITICAL`, `RECOMMENDED`, `OPTIONAL`.
   - Category filtering and live text search across titles, descriptions, laws, and traps.
   - `HIDE COMPLETED` toggle and `[TOGGLE ALL VISIBLE]` batch action.
   - Printable dossier view via `[⎙ PRINT PROTOCOL]`.

---

## 8. Verification & Test Results

- **Static Production Build**:
  - Command: `npm run build`
  - Result: Generated static pages in `./out/` with zero TypeScript or build errors.
- **Interactive Browser QA Testing**:
  - Tested on `http://localhost:3000`.
  - Loaded Preset A: Verified that Kindergeld, Rundfunkbeitrag, Rechtsschutzversicherung, and Mieterverein appeared with correct flat urgency colors.
  - Toggled tasks: Verified that progress bar increased and completion status updated.
  - Switched to Preset B: Verified that Kindergeld disappeared and Sperrkonto appeared.
  - Reloaded page: Confirmed that Zustand persisted state cleanly from `localStorage`.

---

## 9. How to Run Locally

```bash
# Navigate to project directory
cd /Users/yassin.mokni/projects/nail-germany

# Start development server
npm run dev

# Build pure static export
npm run build
# The static files will be generated in /Users/yassin.mokni/projects/nail-germany/out
```
