/* eslint-disable */
const fs = require("fs");
const path = require("path");

const tasksFilePath = path.join(__dirname, "../data/tasks.json");
const tasks = JSON.parse(fs.readFileSync(tasksFilePath, "utf-8"));

const seoData = {
  "kindergeld-application": {
    estimated_time: "45 minutes (Form) + 4 to 8 weeks (Processing)",
    costs_fines: "Free to apply. Retroactive payments legally capped at 6 months.",
    official_links: [
      { title: "Familienkasse Official Portal", url: "https://www.arbeitsagentur.de/familie-und-kinder" }
    ],
    keywords: ["Kindergeld application Germany", "German child benefit expat", "Kindergeld backpay limit", "Familienkasse KG1 form"],
    faq: [
      {
        question: "Can expats receive Kindergeld in Germany?",
        answer: "Yes. Parents residing in Germany with a valid residence permit that includes employment authorization (or EU citizenship) are legally entitled to 250 EUR per month per child under § 32 EStG and BKGG."
      },
      {
        question: "How far back does the Familienkasse pay child benefit?",
        answer: "Under § 66 Abs. 3 EStG, retroactive payments are strictly capped at 6 months prior to the month of receipt. Delaying your application beyond 6 months forfeits prior benefits permanently."
      }
    ]
  },
  "rundfunkbeitrag-registration": {
    estimated_time: "10 minutes online",
    costs_fines: "18.36 EUR monthly fee. Mandatory late penalties (Säumniszuschlag) and bank garnishment for non-payment.",
    official_links: [
      { title: "ARD ZDF Deutschlandradio Beitragsservice", url: "https://www.rundfunkbeitrag.de" }
    ],
    keywords: ["Rundfunkbeitrag WG flatshare", "German TV tax exemption", "Beitragsnummer registration", "ARD ZDF fee expat"],
    faq: [
      {
        question: "Does every roommate in a flatshare (WG) have to pay Rundfunkbeitrag?",
        answer: "No. Under § 2 Abs. 1 RBStV, the license fee is assessed once per residence regardless of resident count. If one tenant pays, all other flatmates are legally exempt by registering the existing 9-digit Beitragsnummer."
      },
      {
        question: "What happens if I ignore the Rundfunkbeitrag letters?",
        answer: "The authority opens an automatic registration, assesses back-pay with late penalties, and forwards claims to municipal debt enforcement (Vollstreckung), which can freeze your German bank account."
      }
    ]
  },
  "rechtsschutzversicherung-contract": {
    estimated_time: "20 minutes (Policy review)",
    costs_fines: "15 to 30 EUR per month. Out-of-pocket tenancy lawyer representation routinely exceeds 1,500 EUR.",
    official_links: [
      { title: "German Insurance Association (GDV) Tenancy Law", url: "https://www.gdv.de" }
    ],
    keywords: ["Rechtsschutzversicherung expat Germany", "German legal insurance waiting period", "Mietrecht tenant legal defense"],
    faq: [
      {
        question: "Why should legal insurance be secured before signing a lease?",
        answer: "Standard policies enforce a mandatory 3-month waiting period (Wartezeit) for rental and workplace disputes. Any dispute with origins before or during this period is strictly excluded from coverage."
      },
      {
        question: "Does Rechtsschutzversicherung cover lawyer consultation costs?",
        answer: "Yes, covered policies pay attorney fees, court costs, and expert witness expenses up to policy limits after meeting your chosen deductible (Selbstbeteiligung)."
      }
    ]
  },
  "mieterverein-membership": {
    estimated_time: "15 minutes registration",
    costs_fines: "80 to 110 EUR annual membership (tax deductible under § 9 EStG).",
    official_links: [
      { title: "Deutscher Mieterbund (Federal Tenants Association)", url: "https://www.mieterbund.de" }
    ],
    keywords: ["Mieterverein Germany", "German tenants association", "Nebenkosten utility check", "Mietpreisbremse legal challenge"],
    faq: [
      {
        question: "What legal services does a German tenants union (Mieterverein) provide?",
        answer: "Tenants unions provide consultation with specialized housing lawyers, audit annual utility statements (Nebenkostenabrechnung) for unlawful charges, and draft formal legal letters to landlords."
      },
      {
        question: "Can landlords prohibit tenants from joining a Mieterverein?",
        answer: "No. Joining a tenants association is an inviolable civil right in Germany, and landlords cannot penalize or terminate leases for obtaining union representation."
      }
    ]
  },
  "anmeldung-residence-registration": {
    estimated_time: "20 minutes appointment + 1 to 4 weeks appointment lead time",
    costs_fines: "Free in most municipalities. Administrative fines up to 1,000 EUR under § 54 BMG for willful non-compliance.",
    official_links: [
      { title: "Federal Act on Registration (BMG § 17)", url: "https://www.gesetze-im-internet.de/bmg/__17.html" }
    ],
    keywords: ["Anmeldung Germany 14 days", "Bürgeramt appointment", "Wohnungsgeberbestätigung landlord", "German address registration expat"],
    faq: [
      {
        question: "What is the 14-day statutory rule for Anmeldung in Germany?",
        answer: "Under § 17 Bundesmeldegesetz (BMG), residents must register their new address at the Bürgeramt within 14 calendar days of move-in date."
      },
      {
        question: "Can I complete Anmeldung without a landlord certificate?",
        answer: "No. Under § 19 BMG, the Bürgeramt requires a completed Wohnungsgeberbestätigung signed by the landlord or main tenant. A tenancy agreement alone is legally insufficient."
      }
    ]
  },
  "aufenthaltstitel-work-permit": {
    estimated_time: "60 minutes preparation + 6 to 12 weeks processing",
    costs_fines: "100 EUR permit issuance fee. Immediate loss of work authorization if expired without Fiktionswirkung.",
    official_links: [
      { title: "Federal Office for Migration and Refugees (BAMF)", url: "https://www.bamf.de" }
    ],
    keywords: ["Aufenthaltstitel work permit", "Blue Card Germany conversion", "Fiktionsbescheinigung Section 81", "German immigration appointment delay"],
    faq: [
      {
        question: "What protects my legal right to work if my visa expires before my Ausländerbehörde appointment?",
        answer: "If your renewal or conversion application is submitted before your entry visa expires, your legal residence and work authorization continue automatically under § 81 Abs. 4 AufenthG (Fiktionswirkung)."
      },
      {
        question: "How do I substantiate ongoing work rights to an employer during processing delays?",
        answer: "Request an official interim certificate (Fiktionsbescheinigung) or provide the verified timestamp confirmation issued by the municipal immigration portal upon request submission."
      }
    ]
  },
  "mietkaution-three-installments": {
    estimated_time: "5 minutes bank transfer setup",
    costs_fines: "Zero fees. Security deposit legally capped at 3 months net cold rent (Nettokaltmiete).",
    official_links: [
      { title: "German Civil Code § 551 BGB (Rental Deposit)", url: "https://www.gesetze-im-internet.de/bgb/__551.html" }
    ],
    keywords: ["Mietkaution 3 installments law", "Section 551 BGB deposit rights", "German landlord demanding full deposit", "Mietkautionskonto escrow account"],
    faq: [
      {
        question: "Can a landlord legally demand full rental deposit before handing over apartment keys?",
        answer: "No. Under § 551 Abs. 2 BGB, tenants have an unconditional federal right to pay the deposit in three equal monthly installments. Any lease clause requiring full upfront payment is legally invalid."
      },
      {
        question: "How must the landlord hold rental deposit funds under German law?",
        answer: "Under § 551 Abs. 3 BGB, landlords are legally required to deposit rental bond funds into a dedicated escrow account (Mietkautionskonto) separate from personal assets to protect against landlord insolvency."
      }
    ]
  },
  "freelance-tax-registration": {
    estimated_time: "45 minutes via ELSTER + 3 to 6 weeks processing",
    costs_fines: "Free registration. Inability to issue compliant VAT invoices until Steuernummer is assigned.",
    official_links: [
      { title: "ELSTER Federal Online Tax Administration", url: "https://www.elster.de" }
    ],
    keywords: ["Fragebogen zur steuerlichen Erfassung", "ELSTER freelance registration Germany", "Freiberufler tax number", "Kleinunternehmerregelung Section 19"],
    faq: [
      {
        question: "Can I invoice clients with only my 11-digit personal Steuer-ID?",
        answer: "No. Freelancers must obtain a dedicated business Steuernummer from the local Finanzamt via the online questionnaire (Fragebogen zur steuerlichen Erfassung) before issuing commercial invoices."
      },
      {
        question: "What is the small business regulation (Kleinunternehmerregelung)?",
        answer: "Under § 19 UStG, freelancers with first-year turnover under 22,000 EUR can opt out of charging and remitting 19% VAT, simplifying tax filing."
      }
    ]
  },
  "sperrkonto-blocked-account-unfreeze": {
    estimated_time: "15 minutes online activation + 2 to 3 days transfer",
    costs_fines: "Free unfreeze. Total monthly allowance locked until Anmeldung certificate is submitted.",
    official_links: [
      { title: "Federal Foreign Office Living Costs Proof", url: "https://www.auswaertiges-amt.de" }
    ],
    keywords: ["Sperrkonto unfreeze Germany", "blocked account monthly payout", "Expatrio Coracle Fintiba activation", "German student visa bank account"],
    faq: [
      {
        question: "Why cannot blocked account providers disburse monthly allowances before Anmeldung?",
        answer: "Under § 16b AufenthG compliance protocols, providers require a verified German address registration certificate (Meldebestätigung) and a local SEPA checking account (Girokonto) to activate payouts."
      },
      {
        question: "What happens if my address registration appointment is delayed for weeks?",
        answer: "Monthly disbursements remain frozen until registration proof is uploaded, meaning you must maintain access to emergency personal funds during your arrival window."
      }
    ]
  },
  "steuerklasse-optimization": {
    estimated_time: "15 minutes via ELSTER or paper form",
    costs_fines: "Free tax class modification. Saves 200 to 600 EUR monthly in initial payroll withholdings.",
    official_links: [
      { title: "Federal Ministry of Finance Wage Tax Calculator", url: "https://www.bmf-steuerrechner.de" }
    ],
    keywords: ["Steuerklasse switch Germany", "Tax class 3 and 5 married couples", "ELSTER tax class change", "German wage tax optimization"],
    faq: [
      {
        question: "Which tax classes are assigned to married expats by default?",
        answer: "German authorities automatically assign Class IV / IV to both spouses upon registration. If incomes differ significantly (e.g. 60/40 ratio), switching to Class III / V increases immediate monthly take-home pay."
      },
      {
        question: "Does switching tax classes lower total annual income tax?",
        answer: "No. Annual tax liability is identical; Class III / V optimizes monthly net cash flow and creates a mandatory requirement to submit an annual tax return (Einkommensteuererklärung)."
      }
    ]
  },
  "probezeit-kuendigungsschutz": {
    estimated_time: "5 minutes contract review",
    costs_fines: "Loss of wrongful termination claim if not filed within 3 weeks of dismissal notice.",
    official_links: [
      { title: "Dismissal Protection Act (KSchG § 1)", url: "https://www.gesetze-im-internet.de/kschg/__1.html" }
    ],
    keywords: ["Probezeit Germany rights", "probation period termination notice", "Kündigungsschutzklage 3 weeks", "Section 622 BGB employment notice"],
    faq: [
      {
        question: "What is the statutory notice period during probation in Germany?",
        answer: "Under § 622 Abs. 3 BGB, employment may be terminated by either party with two weeks notice during an agreed probation period of up to 6 months, without requiring statutory justification."
      },
      {
        question: "When does general statutory dismissal protection activate in Germany?",
        answer: "Under § 1 Abs. 1 KSchG, protection against socially unjustified dismissal activates after 6 uninterrupted months of employment in enterprises employing more than 10 regular employees."
      }
    ]
  },
  "health-insurance-transition": {
    estimated_time: "30 minutes application",
    costs_fines: "Standard statutory rate (roughly 14.6% + supplementary rate, split 50/50 with employer). Massive back-payment debts if uninsured.",
    official_links: [
      { title: "National Association of Statutory Health Insurance Funds (GKV)", url: "https://www.gkv-spitzenverband.de" }
    ],
    keywords: ["German health insurance expat", "Mawista Care Concept trap", "Techniker Krankenkasse TK expat", "public health insurance voluntary entry"],
    faq: [
      {
        question: "Why are temporary expat travel policies rejected by German authorities?",
        answer: "Inbound travel insurance plans do not meet mandatory statutory health insurance criteria under § 193 Abs. 3 VVG. Immigration offices reject them for residence permits, and public funds may refuse subsequent entry."
      },
      {
        question: "How is German public health insurance funded for employees?",
        answer: "Under § 249 SGB V, health insurance contributions (averaging roughly 16.3% including nursing care) are split equally between the employee and employer and deducted directly from gross salary."
      }
    ]
  },
  "kita-gutschein-application": {
    estimated_time: "30 minutes application + 3 to 6 months daycare placement",
    costs_fines: "Voucher is free of charge. Saves 400 to 1,200 EUR monthly compared to private daycare rates.",
    official_links: [
      { title: "Berlin Senate Childcare Voucher Guide", url: "https://www.berlin.de/sen/jugend/familie-und-kinder/kindertagesbetreuung/" }
    ],
    keywords: ["Kita Gutschein Berlin Hamburg", "daycare voucher Germany", "Section 24 SGB VIII childcare entitlement", "Jugendamt daycare spot claim"],
    faq: [
      {
        question: "When does a child have a federal legal entitlement to daycare in Germany?",
        answer: "Under § 24 Abs. 2 SGB VIII, every child has a statutory entitlement (Rechtsanspruch) to an early childhood education spot upon completing their first year of life."
      },
      {
        question: "How does the Kita-Gutschein system operate in Berlin and Hamburg?",
        answer: "Parents apply through the municipal Jugendamt for a voucher defining daily subsidized care hours, and submit the voucher to an approved daycare provider which bills the city directly."
      }
    ]
  },
  "steuer-id-retrieval-class-vi": {
    estimated_time: "20 minutes in-person visit at local Finanzamt",
    costs_fines: "Free immediate printout. Up to 50% payroll withholding if tax ID is omitted from first payroll run.",
    official_links: [
      { title: "Federal Central Tax Office (BZSt) Tax ID Portal", url: "https://www.bzst.de" }
    ],
    keywords: ["Steuer-ID letter delay", "Tax class 6 penalty Germany", "Finanzamt emergency tax ID printout", "Section 139b AO tax identification"],
    faq: [
      {
        question: "Why does missing a Steuer-ID trigger punitive Tax Class 6 withholdings?",
        answer: "Under § 39c Abs. 1 EStG, employers lacking an employee's tax identifier must apply Tax Class 6 rates without tax-free allowances, withholding up to 50% of gross wages until updated."
      },
      {
        question: "How can I obtain my Steuer-ID immediately without waiting for postal delivery?",
        answer: "Visit the service center of your local Finanzamt in person with your passport and Meldebestätigung. Clerks can issue an official counter printout of your 11-digit Steuer-ID on demand."
      }
    ]
  },
  "schufa-free-art15-datenkopie": {
    estimated_time: "10 minutes online request + 3 to 7 days delivery",
    costs_fines: "Free under Article 15 GDPR. Avoids the 29.95 EUR commercial certificate fee.",
    official_links: [
      { title: "meineSCHUFA GDPR Article 15 Portal", url: "https://www.meineschufa.de" }
    ],
    keywords: ["Free Schufa report GDPR", "Datenkopie nach Art 15 DSGVO", "German credit score expat", "Schufa bonitätsauskunft free"],
    faq: [
      {
        question: "How do I request my official credit report from SCHUFA for free?",
        answer: "Under Article 15 of the EU GDPR, SCHUFA must furnish a free copy of all stored personal credit data. On meineschufa.de, select 'Datenkopie nach Art. 15 DSGVO' and upload identity verification."
      },
      {
        question: "Why do landlords require SCHUFA credit verification from expats?",
        answer: "SCHUFA records identify financial defaults, unpaid loans, or court enforcement orders, confirming financial reliability before signing residential leases."
      }
    ]
  },
  "elterngeld-parental-allowance": {
    estimated_time: "60 minutes form completion + 6 to 10 weeks processing",
    costs_fines: "Free application. Irreversible loss of benefits if submitted beyond 3 months post-birth.",
    official_links: [
      { title: "Federal Ministry for Family Affairs (BMFSFJ) Parental Benefit", url: "https://familienportal.de" }
    ],
    keywords: ["Elterngeld application Germany", "parental leave allowance expat", "Section 5 BEEG retroactive limit", "Basiselterngeld vs ElterngeldPlus"],
    faq: [
      {
        question: "How much monthly support does German parental allowance (Elterngeld) provide?",
        answer: "Basic Elterngeld replaces roughly 65% to 67% of prior average net income, ranging from a minimum of 300 EUR to a maximum of 1,800 EUR monthly for up to 14 months shared between parents."
      },
      {
        question: "What is the critical statutory deadline for Elterngeld applications?",
        answer: "Under § 5 Abs. 1 BEEG, payments are only issued retroactively for up to 3 calendar months preceding the application date. Late filings result in permanent forfeiture of prior months."
      }
    ]
  },
  "kirchensteuer-declaration-optout": {
    estimated_time: "15 minutes civil court or registry appointment",
    costs_fines: "30 to 50 EUR one-time administrative fee. Saves 8% to 9% of income tax each month.",
    official_links: [
      { title: "State Judicial Portals on Church Exit (Kirchenaustritt)", url: "https://www.justiz.de" }
    ],
    keywords: ["Church tax Germany opt out", "Kirchensteuer deduction payslip", "Kirchenaustritt appointment", "German church tax expat Bürgeramt"],
    faq: [
      {
        question: "How is church tax calculated and collected in Germany?",
        answer: "Church tax is an additional 8% surcharge on assessed income tax in Bavaria and Baden-Württemberg (9% in other federal states), automatically withheld from employee payroll by tax authorities."
      },
      {
        question: "Can I terminate church tax deductions simply by notifying HR?",
        answer: "No. German law requires an official civil declaration of exit (Kirchenaustritt) at the local district court (Amtsgericht) or registry office (Standesamt), yielding an official certificate for payroll."
      }
    ]
  },
  "wg-joint-liability-protection": {
    estimated_time: "20 minutes contract inspection",
    costs_fines: "Zero fees to prevent. Severe financial liability for flatmates' unpaid rent or renovation costs.",
    official_links: [
      { title: "Civil Code § 421 BGB (Joint and Several Liability)", url: "https://www.gesetze-im-internet.de/bgb/__421.html" }
    ],
    keywords: ["WG joint liability Germany", "Hauptmieter vs Untermieter flatshare", "Section 421 BGB Gesamtschuldner", "roommate left without paying rent Germany"],
    faq: [
      {
        question: "What legal risk arises from signing a joint lease as Hauptmieter in a WG?",
        answer: "Under § 421 BGB, joint tenants are jointly and severally liable. If one roommate defaults or abandons the flat, the landlord can legally demand the entire apartment rent and repair costs from any remaining tenant."
      },
      {
        question: "What is the safest legal tenancy arrangement in a German flatshare?",
        answer: "Executing an individual sublease agreement (Untermietvertrag) for your specific room, ensuring legal liability is strictly confined to your personal room and agreed rent."
      }
    ]
  },
  "consumer-contract-monthly-cancellation": {
    estimated_time: "5 minutes online cancellation",
    costs_fines: "Zero cost. Prevents unwanted 12-month contract lock-ins.",
    official_links: [
      { title: "Federal Consumer Advice Centers (Verbraucherzentrale)", url: "https://www.verbraucherzentrale.de" }
    ],
    keywords: ["Cancel German gym contract monthly", "Section 309 BGB consumer protection", "German auto renewal law 2022", "Kündigungsbutton mandatory law"],
    faq: [
      {
        question: "Can German gym or internet contracts automatically renew for a full year?",
        answer: "No. Under § 309 Nr. 9 BGB, consumer contracts executed on or after March 1, 2022 may only renew indefinitely on a month-to-month basis with a maximum 1-month notice period once initial terms expire."
      },
      {
        question: "What is the mandatory online cancellation button in Germany?",
        answer: "Under § 312k BGB, commercial service providers must provide a clearly visible cancellation button ('Verträge hier kündigen') on their website allowing quick online termination."
      }
    ]
  },
  "bayerisches-familiengeld-transition": {
    estimated_time: "20 minutes online via ZBFS portal",
    costs_fines: "Free to claim. Up to 6,000 EUR in total state grant assistance.",
    official_links: [
      { title: "Zentrum Bayern Familie und Soziales (ZBFS)", url: "https://www.zbfs.bayern.de" }
    ],
    keywords: ["Bayerisches Familiengeld 2025 rule", "Bavaria family money expat", "ZBFS portal claim", "BayFamG grandfathered children"],
    faq: [
      {
        question: "Who remains eligible for Bavarian Family Money (Familiengeld)?",
        answer: "Parents in Bavaria with children born on or before December 31, 2024 remain eligible for 250 EUR per month per child during the child's second and third year of life (up to 6,000 EUR total)."
      },
      {
        question: "Is Familiengeld available for children born in 2025 or later?",
        answer: "No. The state of Bavaria discontinued Familiengeld for children born on or after January 1, 2025, but pre-2025 children remain fully grandfathered."
      }
    ]
  },
  "bayern-kita-beitragszuschuss": {
    estimated_time: "10 minutes invoice verification",
    costs_fines: "Automatic 100 EUR monthly discount per qualifying child.",
    official_links: [
      { title: "Bavarian Ministry for Family, Labour and Social Affairs", url: "https://www.stmas.bayern.de/kinderbetreuung/" }
    ],
    keywords: ["Bayern 100 EUR Kita subsidy", "BayKiBiG Beitragszuschuss", "Bavarian kindergarten fee discount", "Munich daycare cost reduction"],
    faq: [
      {
        question: "How does the 100 EUR monthly kindergarten subsidy function in Bavaria?",
        answer: "Under Art. 23 BayKiBiG, the state of Bavaria pays a 100 EUR monthly subsidy directly to registered daycare providers, which must be credited directly on the parent's monthly invoice starting September 1 of the year the child turns 3."
      },
      {
        question: "What should parents do if the 100 EUR discount is omitted from a kindergarten bill?",
        answer: "Submit a written request to the kindergarten administration citing Art. 23 BayKiBiG and requesting retroactive credit for missed subsidy amounts."
      }
    ]
  }
};

const updatedTasks = tasks.map((task) => {
  const seo = seoData[task.id];
  if (!seo) {
    console.warn("Missing SEO data for task:", task.id);
    return task;
  }
  return {
    ...task,
    estimated_time: seo.estimated_time,
    costs_fines: seo.costs_fines,
    official_links: seo.official_links,
    keywords: seo.keywords,
    faq: seo.faq
  };
});

fs.writeFileSync(tasksFilePath, JSON.stringify(updatedTasks, null, 2), "utf-8");
console.log("Successfully enriched " + updatedTasks.length + " tasks with SEO metadata.");
