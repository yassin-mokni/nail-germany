# Contributing to Nail Germany

Thank you for helping make German bureaucracy less painful for expats, immigrants, students, and workers moving to Germany.

Nail Germany is a 100% free, community-driven, open-source project. We do not run ads, harvest personal data, or promote affiliate schemes. All advice is grounded directly in official German statutory law (§ BGB, § BMG, § EStG, § AufenthG, § SGB, etc.).

---

## How You Can Contribute

1. **Update Statutory Rules & Deadlines**: German laws and administrative processes change (e.g., citizenship reforms, digital registration portals, changing processing fees).
2. **Add Missing Bureaucratic Procedures**: If there is an essential process expats face that we don't cover yet, propose a new task.
3. **Fix Broken Authority Links**: Ensure official links point directly to official `.bund.de`, `.de`, municipal portals (e.g. `berlin.de`, `muenchen.de`), or registered public bodies.
4. **Improve Clarity**: Make instructions clearer, more practical, and easier to follow for newcomers who don't speak German yet.

---

## Updating Tasks Database (`data/tasks.json`)

All administrative guides are stored in [data/tasks.json](./data/tasks.json).

Each task conforms to the following schema:

```json
{
  "id": "anmeldung-residence-registration",
  "category": "Housing & Rent",
  "title": "Anmeldung (City Address Registration)",
  "description": "Register your residential address at the local Bürgeramt within 14 days of moving into an apartment or long-term room.",
  "legal_ref": "§ 17 BMG (Bundesmeldegesetz)",
  "deadline": "Within 14 days of moving in",
  "critical": true,
  "conditions": {},
  "action_steps": [
    "Secure the signed Wohnungsgeberbestätigung (landlord confirmation form).",
    "Book an appointment (Termin) at any Bürgeramt in your municipality.",
    "Attend the appointment with your passport and documents."
  ],
  "documents_needed": [
    "Passport or National ID card",
    "Signed Wohnungsgeberbestätigung",
    "Completed registration form (Anmeldeformular)"
  ],
  "bureaucracy_trap": "Never sign a lease that forbids Anmeldung. Subletting without landlord permission is illegal and prevents you from getting your Steuer-ID.",
  "estimated_time": "1 to 2 hours at Bürgeramt",
  "costs_fines": "Registration is free. Fines up to €1,000 for failing to register.",
  "official_links": [
    {
      "label": "BMG Statutory Text",
      "url": "https://www.gesetze-im-internet.de/bmg/__17.html",
      "authority": "Federal Ministry of Justice"
    }
  ],
  "keywords": [
    "Anmeldung Germany",
    "Bürgeramt registration",
    "Wohnungsgeberbestätigung"
  ],
  "faq": [
    {
      "question": "Can I register with an Airbnb or temporary hotel?",
      "answer": "Only if the host issues an official signed Wohnungsgeberbestätigung form. Most tourist rentals refuse to do this."
    }
  ]
}
```

### Condition Filtering Rules

The `conditions` object controls which user profiles see the task in their personalized checklist:

- `"citizenship": ["non_eu"]` (or `["eu"]`)
- `"has_job": true`
- `"is_student": true`
- `"is_freelancer": true`
- `"has_family": true`
- `"has_pets": true`
- `"church_member": true`
- If a condition is omitted or empty (`{}`), the task is universally required for all expats.

---

## Editorial Guidelines

To maintain the quality, trust, and tone of the project, all contributions must adhere to these rules:

1. **Official Sources Only**: Links must point to official government portals (`.bund.de`, `.de`), public sickness funds (`gkv-spitzenverband.de`), or registered tenant associations (`mieterbund.de`). No commercial affiliate links.
2. **Zero Em-Dashes and Zero En-Dashes**:
   - We strictly avoid em-dashes (`—`) and en-dashes (`–`).
   - Use standard hyphens (`-`), colons (`:`), parentheticals, or clean commas instead.
3. **No AI Clichés or Robotic Jargon**:
   - Keep advice grounded, plainspoken, and human.
   - Avoid filler words like *"delve"*, *"cornerstone"*, *"beacon"*, *"testament"*, or *"vital tapestry"*.
4. **Utilitarian & Brutalist Design Aesthetic**:
   - The user interface strictly follows a brutalist black-and-white visual identity with subtle yellow `#FACC15` accents and sharp borders.
   - Do not add pastel gradients, rounded-3xl cards, or cute animations.

---

## Development & Testing Workflow

```bash
# 1. Install dependencies
npm install

# 2. Run the development server
npm run dev

# 3. Verify linting (must pass with 0 warnings/errors)
npm run lint

# 4. Verify static export build
npm run build
```

Once all checks pass, open a Pull Request with a clear description of what changed and any official statutory sources referenced.
