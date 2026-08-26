export type Service = {
  slug: string;
  name: string;
  navName: string;
  code: string;
  icon: string;
  summary: string;
  metaTitle: string;
  metaDescription: string;
  intro: string[];
  included: { title: string; text: string }[];
  steps: { title: string; text: string }[];
  audience: string[];
  timeline: string;
  priceFrom: string;
  faqs: { q: string; a: string }[];
  related: string[];
};

export const services: Service[] = [
  {
    slug: 'federal-trademark-filing',
    name: 'Federal Trademark Filing',
    navName: 'Federal trademark filing',
    code: 'USPTO · TEAS STANDARD',
    icon: 'shield',
    summary:
      'Your application classified, drafted and filed with the USPTO, with goods and services written to survive examination.',
    metaTitle: 'Federal Trademark Filing Services',
    metaDescription:
      'Have your federal trademark application searched, classified and filed with the USPTO. Goods and services drafted properly, specimen reviewed, status updates throughout.',
    intro: [
      'A federal registration is what turns a name you happen to use into a right you can actually enforce. It gives you nationwide priority dating back to your filing date, the right to use the ® symbol, a public listing that deters copycats before they ever launch, and standing to act against infringers — including through the brand registries at Amazon, Etsy and Shopify.',
      'Most applications that fail do so for reasons that were visible before anything was filed: the wrong class, a description of goods written too broadly, a specimen that shows the mark as decoration rather than as a brand, or a conflict sitting in plain view on the register. We deal with all four before your application leaves our hands.',
    ],
    included: [
      {
        title: 'Knock-out search',
        text: 'We check the federal register for identical and closely similar marks in your class before anything is filed, so an obvious blocker turns up while you can still change course cheaply.',
      },
      {
        title: 'Class selection',
        text: 'There are 45 Nice classes and picking the wrong one is expensive, because government filing fees are never refunded. We map what you actually sell to the right class and tell you honestly when your goods genuinely span two.',
      },
      {
        title: 'Goods and services drafting',
        text: 'Wording that is too vague gets refused; wording that is too narrow leaves a gap a competitor can walk straight through. We draft your description against the USPTO Acceptable Identification of Goods and Services Manual.',
      },
      {
        title: 'Specimen review',
        text: 'For use-based applications we check that your specimen shows the mark on the goods, or in connection with the services, the way an examining attorney expects — before it becomes a refusal you have to pay to answer.',
      },
      {
        title: 'Correct filing basis',
        text: 'We confirm whether you file under Section 1(a) for a mark already in commerce or Section 1(b) intent-to-use, and explain what each path means for your dates and your later obligations.',
      },
      {
        title: 'Status updates',
        text: 'Email at every stage — filing receipt, serial number issued, examiner assigned, publication, and any office action — so you are never left guessing where your case sits.',
      },
    ],
    steps: [
      {
        title: 'Tell us about the mark',
        text: 'The name or logo, what you sell under it, and whether you are already using it in commerce. Five minutes of information is usually enough to start.',
      },
      {
        title: 'We search and classify',
        text: 'A knock-out search of the federal register, then class selection and a drafted description of goods and services sent to you for approval.',
      },
      {
        title: 'You approve, we file',
        text: 'Nothing is submitted until you have seen and signed off on the exact wording. We then file electronically and send you the USPTO filing receipt and serial number.',
      },
      {
        title: 'We track it through',
        text: 'You get an update at each milestone, and a heads-up before every deadline that carries consequences.',
      },
    ],
    audience: [
      'Founders launching a product or service under a new name',
      'Ecommerce sellers who need brand registry access',
      'Businesses that have been trading unregistered for years',
      'Agencies and consultants filing on behalf of clients',
    ],
    timeline:
      'Prepared within two to five business days. USPTO examination typically begins six to nine months after filing, with registration commonly nine to fourteen months out for a smooth application.',
    priceFrom: '$99 + USPTO fee',
    faqs: [
      {
        q: 'How much does the government charge on top of your fee?',
        a: 'The USPTO charges its own filing fee per class of goods or services. That fee goes directly to the government, is separate from what we charge, and is not refundable if the application is refused. We tell you the exact current amount for your filing before you commit.',
      },
      {
        q: 'Do I have to be using the name already?',
        a: 'No. If you are not yet selling under the mark you can file on an intent-to-use basis under Section 1(b), which reserves your priority date. You then file a Statement of Use once you are trading, which we handle as a separate step.',
      },
      {
        q: 'Can I register a logo and a name in one application?',
        a: 'They are treated as separate marks and generally need separate applications. Most brands start with the word mark, because it protects the name however it is styled, and add the design mark later if the logo itself carries value.',
      },
      {
        q: 'What happens if the application is refused?',
        a: 'You receive an office action explaining why. Many refusals are procedural and can be answered. We prepare responses as a separate service, and it is included in our Complete package for non-substantive refusals.',
      },
    ],
    related: ['comprehensive-trademark-search', 'office-action-response', 'proof-of-commerce'],
  },
  {
    slug: 'comprehensive-trademark-search',
    name: 'Comprehensive Trademark Search',
    navName: 'Comprehensive search',
    code: 'CLEARANCE · FULL',
    icon: 'search',
    summary:
      'Federal, state and common-law clearance with a written risk report, so you find the problem before you spend on packaging.',
    metaTitle: 'Comprehensive Trademark Search',
    metaDescription:
      'Full federal, state and common-law trademark clearance search with a written conflict and risk assessment report. Find blocking marks before you invest in your brand.',
    intro: [
      'A free lookup on the USPTO database tells you whether someone has registered your exact words. It does not tell you about the phonetically similar mark in a neighbouring class, the state registration nobody federalised, or the company three states over that has been using the name in commerce since 2014 and therefore has common-law rights that beat your application.',
      'A comprehensive search is the cheapest insurance in the whole process. The alternative is finding out after you have printed packaging, bought the domain, paid for a brand identity and started running ads.',
    ],
    included: [
      {
        title: 'Federal register search',
        text: 'Live and dead marks, including pending applications, checked for identical, phonetic, translated and visually similar variants across related classes.',
      },
      {
        title: 'State register search',
        text: 'All fifty state trademark registers, which never appear in a federal database lookup but can still create a genuine conflict in your market.',
      },
      {
        title: 'Common-law search',
        text: 'Business name registrations, domain records, marketplace listings and web presence, because in the United States rights come from use, not only from registration.',
      },
      {
        title: 'Written risk report',
        text: 'Every hit graded high, medium or low risk, with plain-English reasoning about why it matters and what a likelihood-of-confusion analysis would probably conclude.',
      },
      {
        title: 'Registrability assessment',
        text: 'An honest read on whether the mark itself is protectable, or whether it is descriptive, generic or geographically deceptive enough to draw a refusal on its own merits.',
      },
      {
        title: 'Recommendation',
        text: 'A clear direction: file as is, file with narrowed goods, adjust the mark, or pick a different name. We tell you when the answer is the last one.',
      },
    ],
    steps: [
      {
        title: 'Send the mark and the goods',
        text: 'We need the exact wording or logo and a real description of what you sell, because the search scope depends on both.',
      },
      {
        title: 'We run the full clearance',
        text: 'Federal, state and common-law sources, plus variants a database will not catch on its own.',
      },
      {
        title: 'You get the report',
        text: 'A written document you can keep, share with counsel, or show an investor during diligence.',
      },
      {
        title: 'We talk it through',
        text: 'By email, in plain language, so you can make the call with the facts in front of you.',
      },
    ],
    audience: [
      'Anyone about to invest in packaging, a domain or a rebrand',
      'Businesses whose knock-out search returned something borderline',
      'Companies raising capital where IP diligence is coming',
      'Brand and naming agencies clearing shortlisted names',
    ],
    timeline: 'Report delivered within three to five business days. Rush turnaround available.',
    priceFrom: '$199 standalone',
    faqs: [
      {
        q: 'Is this different from the free search?',
        a: 'Substantially. The free search checks the federal register for close matches so you can rule out the obvious. A comprehensive search adds state registers and common-law use, checks phonetic and visual variants, and comes with a written risk assessment.',
      },
      {
        q: 'Does a clean search guarantee registration?',
        a: 'No, and anyone who tells you otherwise is overselling. Examination involves judgement, and rights can exist that no search surfaces. What a clean report does is remove the foreseeable risks and give you a documented basis for going ahead.',
      },
      {
        q: 'Can you search a logo?',
        a: 'Yes. Design marks are searched on their design elements as well as any wording, which is why logo clearance is a separate exercise from word-mark clearance.',
      },
    ],
    related: ['free-trademark-search', 'federal-trademark-filing', 'brand-monitoring'],
  },
  {
    slug: 'free-trademark-search',
    name: 'Free Trademark Search',
    navName: 'Free trademark search',
    code: 'KNOCK-OUT · NO CHARGE',
    icon: 'spark',
    summary:
      'A no-cost knock-out check of the federal register, with a straight answer about whether your name is worth filing.',
    metaTitle: 'Free Trademark Search & Name Check',
    metaDescription:
      'Free knock-out trademark search of the federal register. Send us your name and what you sell and we will tell you plainly whether it looks clear enough to file.',
    intro: [
      'Before you pay anyone anything, it is worth knowing whether your name is already taken in your category. Our free search is a genuine knock-out check of the federal register, not a lead-capture form that returns a generic "you may have conflicts" screen designed to make you nervous enough to buy.',
      'You send us the mark and what you sell. We look, and we tell you what we find — including when the answer is that it looks clear and you do not need our comprehensive search.',
    ],
    included: [
      {
        title: 'Federal register check',
        text: 'Live registrations and pending applications searched for identical and closely similar marks in the classes that actually cover your goods.',
      },
      {
        title: 'Class guidance',
        text: 'A first read on which Nice class or classes your goods and services fall into, so you know what you would be filing.',
      },
      {
        title: 'A plain answer',
        text: 'Clear, borderline, or blocked — and if it is borderline, exactly what makes it so rather than a vague warning.',
      },
      {
        title: 'No obligation',
        text: 'No card, no account. If the answer is that the name is clear and you want to file it yourself, that is a perfectly good outcome.',
      },
    ],
    steps: [
      {
        title: 'Send us the name',
        text: 'Use the form on our contact page with the exact mark and a sentence about what you sell under it.',
      },
      {
        title: 'We search',
        text: 'Usually the same business day, always within one.',
      },
      {
        title: 'You get the result',
        text: 'By email, in plain language, with the specific marks we found and why they do or do not matter.',
      },
    ],
    audience: [
      'Founders still deciding between two or three names',
      'Anyone who wants a sanity check before spending money',
      'Businesses trading unregistered who want to know where they stand',
    ],
    timeline: 'Results by email within one business day.',
    priceFrom: 'Free',
    faqs: [
      {
        q: 'What is the catch?',
        a: 'There is not one. A knock-out search takes us a short time and it is how we would start any engagement anyway. Some people go on to file with us and some do not.',
      },
      {
        q: 'Is it as thorough as the paid search?',
        a: 'No. It covers the federal register only. It will not surface state registrations or unregistered common-law users, which is exactly what the comprehensive search is for.',
      },
    ],
    related: ['comprehensive-trademark-search', 'federal-trademark-filing'],
  },
  {
    slug: 'office-action-response',
    name: 'Office Action Response',
    navName: 'Office action response',
    code: 'USPTO · RESPONSE',
    icon: 'reply',
    summary:
      'A refusal is not the end of your application. We prepare the response, with the legal argument and evidence the examiner needs.',
    metaTitle: 'USPTO Office Action Response',
    metaDescription:
      'Received a trademark office action? We prepare responses to Section 2(d) likelihood of confusion refusals, Section 2(e) descriptiveness refusals, specimen refusals and identification requirements.',
    intro: [
      'An office action is a letter from the examining attorney saying your application cannot proceed as filed. It arrives with a hard deadline, and if you miss it the application goes abandoned and the government fee is gone with it.',
      'Most people read one and assume the mark has been rejected outright. Usually it has not. A large share of office actions are procedural — a disclaimer requirement, an identification that needs tightening, a specimen that needs replacing — and are answered successfully as a matter of routine. Even substantive refusals under Section 2(d) or 2(e) are frequently overcome with the right argument and evidence.',
    ],
    included: [
      {
        title: 'Reading the actual refusal',
        text: 'We identify precisely what is being required, what is being refused, which statutory ground applies, and what evidence the examiner relied on.',
      },
      {
        title: 'Strategy before drafting',
        text: 'Sometimes the right answer is to argue. Sometimes it is to amend the identification, add a disclaimer, or accept the Supplemental Register. We tell you which, and why, before we write a word.',
      },
      {
        title: 'Section 2(d) arguments',
        text: 'Likelihood of confusion refusals answered on the DuPont factors — channels of trade, sophistication of buyers, strength of the cited mark, differences in appearance, sound, meaning and commercial impression.',
      },
      {
        title: 'Section 2(e) arguments',
        text: 'Descriptiveness and geographic refusals answered with the distinction between suggestive and merely descriptive, plus acquired-distinctiveness evidence under Section 2(f) where you have the trading history.',
      },
      {
        title: 'Specimen and identification fixes',
        text: 'Replacement specimens that actually show trademark use, and amended identifications drafted to the Acceptable Identification Manual so they are accepted first time.',
      },
      {
        title: 'Deadline management',
        text: 'We diary the response deadline and any extension window, and we do not let it run down quietly.',
      },
    ],
    steps: [
      {
        title: 'Send us the office action',
        text: 'Forward the notice or give us the serial number and we will pull it from the USPTO ourselves.',
      },
      {
        title: 'We assess and quote',
        text: 'You get an honest read on the odds and a fixed price before any work starts. If we think the mark is not saveable, we say so.',
      },
      {
        title: 'We draft the response',
        text: 'Argument, amendments and evidence assembled into a response for your review.',
      },
      {
        title: 'You approve and we file',
        text: 'Filed inside the deadline, with confirmation sent to you.',
      },
    ],
    audience: [
      'Applicants who filed themselves and hit a refusal',
      'Anyone facing a Section 2(d) citation against an earlier mark',
      'Applicants whose specimen was rejected',
      'Businesses whose deadline is close and need it handled now',
    ],
    timeline:
      'Assessment within one business day of receiving the office action. Response typically prepared within five business days, faster where the deadline demands it.',
    priceFrom: '$249',
    faqs: [
      {
        q: 'How long do I have to respond?',
        a: 'The USPTO sets the deadline in the office action itself, and it is shorter than most people expect. Extensions are available for some office actions on payment of a fee. Send it to us as soon as it arrives rather than near the end of the window.',
      },
      {
        q: 'What are the chances of success?',
        a: 'It depends entirely on the ground. Procedural requirements are answered successfully the great majority of the time. Substantive refusals vary enormously with the facts. We will give you a candid read on yours rather than a marketing number.',
      },
      {
        q: 'What if my mark is refused as merely descriptive?',
        a: 'There are usually three routes: argue that it is suggestive rather than descriptive, claim acquired distinctiveness under Section 2(f) if you have five years of substantially exclusive use, or accept registration on the Supplemental Register and build towards the Principal Register later.',
      },
    ],
    related: ['federal-trademark-filing', 'comprehensive-trademark-search', 'proof-of-commerce'],
  },
  {
    slug: 'trademark-renewal',
    name: 'Trademark Renewal & Maintenance',
    navName: 'Renewal & maintenance',
    code: 'SECTIONS 8 · 9 · 15',
    icon: 'refresh',
    summary:
      'Registrations are cancelled for missed maintenance filings more often than for anything else. We docket yours and file on time.',
    metaTitle: 'Trademark Renewal & Maintenance',
    metaDescription:
      'Keep your federal trademark alive. Section 8 declarations of use, Section 15 incontestability and Section 9 renewals prepared, docketed and filed before the deadline.',
    intro: [
      'A federal registration is not permanent by default. It has to be maintained, on a schedule set by statute, with declarations proving you are still using the mark in commerce. Miss one of those windows and the registration is cancelled — not suspended, cancelled — and the only way back is a new application with a new priority date.',
      'The USPTO sends courtesy reminders to whatever email address is on file. If that address belonged to a filing service you used once in 2019, or to a founder who has since left, nobody sees them. This is the single most common way good brands lose their registration.',
    ],
    included: [
      {
        title: 'Section 8 declaration of use',
        text: 'Due between the fifth and sixth year after registration. We prepare the declaration, review your specimen and file it inside the window.',
      },
      {
        title: 'Section 15 incontestability',
        text: 'Filed alongside the Section 8 where you qualify. It substantially strengthens your registration against later challenges to its validity, and it is often skipped simply because nobody mentions it.',
      },
      {
        title: 'Section 9 renewal',
        text: 'Due every ten years, filed with a combined Section 8. We handle the pair together.',
      },
      {
        title: 'Specimen review',
        text: 'Maintenance filings are refused for bad specimens just as applications are. We check yours actually evidences current use for the goods listed.',
      },
      {
        title: 'Goods audit',
        text: 'If you have stopped selling some of the goods in your registration, they need to be deleted. Declaring use for goods you no longer sell puts the whole registration at risk.',
      },
      {
        title: 'Docketing',
        text: 'Every future deadline recorded and reminded on, so this never becomes an emergency again.',
      },
    ],
    steps: [
      {
        title: 'Send your registration number',
        text: 'We pull the full file history and every upcoming deadline from the USPTO.',
      },
      {
        title: 'We audit',
        text: 'Current use confirmed, goods reviewed, specimen checked, eligibility for Section 15 assessed.',
      },
      {
        title: 'We prepare and file',
        text: 'Declaration drafted for your signature, then filed inside the statutory window with confirmation to you.',
      },
      {
        title: 'We docket what comes next',
        text: 'Your next deadline goes on our calendar and you get reminders well in advance.',
      },
    ],
    audience: [
      'Registrants approaching their fifth or tenth anniversary',
      'Brands whose original filing agent has gone quiet',
      'Companies with a portfolio and no docketing system',
      'Anyone who has just realised a deadline is close',
    ],
    timeline:
      'Filed inside the statutory window. Grace periods exist for some filings on payment of a surcharge, but they are not something to rely on.',
    priceFrom: '$249 + USPTO fee',
    faqs: [
      {
        q: 'What happens if I miss the deadline?',
        a: 'There is a six-month grace period after the Section 8 window with an additional government surcharge. After that the registration is cancelled and cannot be revived. You would have to file a new application and lose your original priority date.',
      },
      {
        q: 'Do I need Section 15 if I already have Section 8?',
        a: 'You do not need it, but you almost always want it. Incontestable status removes several grounds on which a third party could later attack your registration, and it costs comparatively little to claim at the same time as the Section 8.',
      },
      {
        q: 'What if I have changed my logo since registering?',
        a: 'That matters. A specimen has to show the mark essentially as registered. If your current use has drifted materially from the registered form, the safer route is often a new application for the current mark alongside maintaining the old one.',
      },
    ],
    related: ['brand-monitoring', 'federal-trademark-filing', 'proof-of-commerce'],
  },
  {
    slug: 'brand-monitoring',
    name: 'Brand Monitoring & Surveillance',
    navName: 'Brand monitoring',
    code: 'WATCH · CONTINUOUS',
    icon: 'radar',
    summary:
      'Registration does not police itself. We watch the register and the marketplaces and tell you the moment something similar appears.',
    metaTitle: 'Trademark Monitoring & Brand Watch',
    metaDescription:
      'Continuous trademark watch across the USPTO register, marketplaces and domains. Get alerted to confusingly similar filings while there is still time to oppose.',
    intro: [
      'The USPTO does not defend your mark for you. It examines new applications against the register, but the judgement about whether something is too close to yours is not always the one you would make — and once a similar mark publishes, you have a narrow window to oppose it before it registers.',
      'Rights that are not enforced also weaken. Allowing a crowded field of similar marks to build up around yours reduces its scope, which is a problem you only discover at the moment you finally need to enforce.',
    ],
    included: [
      {
        title: 'Federal register watch',
        text: 'New applications screened continuously for marks confusingly similar to yours in your classes and in related ones.',
      },
      {
        title: 'Publication alerts',
        text: 'When a similar mark publishes for opposition you hear from us immediately, with the deadline stated, not after it has quietly registered.',
      },
      {
        title: 'Marketplace monitoring',
        text: 'Amazon, Etsy, eBay and Walmart listings watched for sellers trading on your name.',
      },
      {
        title: 'Domain and web watch',
        text: 'New domain registrations and web use that incorporate your mark or a close variant.',
      },
      {
        title: 'Graded alerts',
        text: 'Every alert comes with a read on how serious it actually is. A watch service that forwards everything is just noise you learn to ignore.',
      },
      {
        title: 'Response options',
        text: 'Where something matters, a clear set of options — monitor, send a cease and desist, file an extension of time to oppose, or oppose.',
      },
    ],
    steps: [
      {
        title: 'We set the watch',
        text: 'Your mark, variants, classes and the related classes where a conflict would realistically arise.',
      },
      {
        title: 'We screen continuously',
        text: 'New filings and listings reviewed against your profile as they appear.',
      },
      {
        title: 'You get graded alerts',
        text: 'Only what matters, with the reasoning and the deadline attached.',
      },
      {
        title: 'You decide, we execute',
        text: 'Cease and desist, extension of time, or takedown — handled as an add-on when you want to act.',
      },
    ],
    audience: [
      'Registered brands in crowded or fast-moving categories',
      'Ecommerce sellers who get copied',
      'Companies with brand equity worth defending',
      'Anyone who has already been knocked off once',
    ],
    timeline: 'Watch live within two business days of setup. Alerts issued as filings appear.',
    priceFrom: '$99 per year',
    faqs: [
      {
        q: 'How long do I have to oppose a published mark?',
        a: 'The opposition window opens when a mark publishes in the Official Gazette and it is short. Extensions of time to oppose are available if requested inside the window. Missing it entirely means your route becomes cancellation after registration, which is harder and more expensive.',
      },
      {
        q: 'Will you tell me about every similar filing?',
        a: 'We tell you about every filing that is genuinely worth your attention, graded by risk. Volume is not the point — an alert stream you stop opening protects nothing.',
      },
      {
        q: 'Is monitoring included in any package?',
        a: 'Yes. Twelve months is included with Professional and thirty-six months with Complete. It can also be bought on its own for a mark registered elsewhere.',
      },
    ],
    related: ['dmca-takedowns', 'trademark-renewal', 'comprehensive-trademark-search'],
  },
  {
    slug: 'copyright-registration',
    name: 'Copyright Registration',
    navName: 'Copyright registration',
    code: 'US COPYRIGHT OFFICE',
    icon: 'doc',
    summary:
      'Register the work itself — artwork, photography, written content, software, video — and unlock statutory damages.',
    metaTitle: 'US Copyright Registration Services',
    metaDescription:
      'Register original artwork, photography, written content, software and video with the US Copyright Office. Registration is what lets you sue and claim statutory damages.',
    intro: [
      'Copyright and trademark protect different things and people mix them up constantly. A trademark protects the name and logo that identify who you are. Copyright protects the creative work itself — the illustration, the photograph, the course, the codebase, the video.',
      'Copyright technically exists the moment a work is fixed in tangible form. What registration adds is teeth: you cannot bring an infringement suit in the United States without it, and if you register before the infringement (or within three months of publication) you become eligible for statutory damages and attorney fees rather than having to prove actual loss. That difference is usually what decides whether pursuing an infringer is economically worth doing at all.',
    ],
    included: [
      {
        title: 'Work classification',
        text: 'Literary, visual arts, performing arts, sound recording or single-application — filing under the wrong category causes delay and sometimes refusal.',
      },
      {
        title: 'Authorship and ownership',
        text: 'Work-made-for-hire, joint authorship, contractor-created material and assignments handled correctly, which is where most self-filed applications go wrong.',
      },
      {
        title: 'Group registrations',
        text: 'Photographs, serials and short online works registered in permitted groups rather than one at a time, which saves substantially on government fees.',
      },
      {
        title: 'Deposit preparation',
        text: 'The deposit copy prepared to Copyright Office specification, including redacted deposits for software where you need to protect trade secrets in the source.',
      },
      {
        title: 'Derivative works',
        text: 'Pre-existing material identified and excluded properly so the registration claims exactly what it should.',
      },
      {
        title: 'Certificate handling',
        text: 'We track the application and send you the certificate when it issues.',
      },
    ],
    steps: [
      {
        title: 'Tell us about the work',
        text: 'What it is, who created it, when it was made and whether it has been published.',
      },
      {
        title: 'We prepare the application',
        text: 'Classification, authorship, claim scope and deposit assembled for your review.',
      },
      {
        title: 'We file',
        text: 'Submitted electronically with the deposit, and the government fee paid.',
      },
      {
        title: 'Certificate issued',
        text: 'Copyright Office processing takes months, but your effective registration date is the date of a complete submission.',
      },
    ],
    audience: [
      'Designers, illustrators and photographers',
      'Course creators and authors',
      'Software companies protecting a codebase',
      'Agencies registering client deliverables',
    ],
    timeline:
      'Application prepared within three business days. Copyright Office processing commonly takes several months, but protection runs from your submission date.',
    priceFrom: '$129 + gov. fee',
    faqs: [
      {
        q: 'Do I need copyright if I already have a trademark?',
        a: 'They cover different things, so often yes. Your logo may be protectable both ways — as a trademark for identifying your business, and as copyright in the artwork itself. Your website copy, product photography and course material are copyright only.',
      },
      {
        q: 'Can I register work I made years ago?',
        a: 'Yes. Late registration is valid and still gives you the right to sue. What you lose is eligibility for statutory damages for infringements that happened before registration, which is why registering early matters.',
      },
      {
        q: 'Does registration protect my idea?',
        a: 'No. Copyright protects the expression, not the underlying idea, method or concept. Two people can write about the same subject; neither can copy the other’s actual words.',
      },
    ],
    related: ['dmca-takedowns', 'federal-trademark-filing', 'brand-monitoring'],
  },
  {
    slug: 'filing-an-extension',
    name: 'Filing an Extension',
    navName: 'Filing an extension',
    code: 'SECTION 1(b) · EXTENSION',
    icon: 'clock',
    summary:
      'Not trading yet but your Notice of Allowance has landed? An extension keeps your priority date alive while you get to market.',
    metaTitle: 'Trademark Extension Requests',
    metaDescription:
      'Filed intent-to-use and not selling yet? Request an extension of time to file your Statement of Use and protect your priority date with the USPTO.',
    intro: [
      'If you filed on an intent-to-use basis, the USPTO issues a Notice of Allowance once your mark clears examination and publication. From that date you have a fixed window to file a Statement of Use proving you are actually selling under the mark. If you are not selling yet, you file an extension.',
      'You can extend more than once, up to a statutory maximum, each time with a government fee and a statement of your continuing bona fide intention to use the mark. What you cannot do is let the window lapse — the application goes abandoned and the priority date you have been holding since filing is gone.',
    ],
    included: [
      {
        title: 'Deadline confirmation',
        text: 'We pull your file from the USPTO and confirm exactly which deadline you are working to and how many extensions you have already used.',
      },
      {
        title: 'Extension request prepared',
        text: 'The request drafted with the required statement of continued bona fide intent and filed inside the window.',
      },
      {
        title: 'Readiness review',
        text: 'An honest assessment of whether you are close enough to launch to file the Statement of Use now instead and stop paying extension fees.',
      },
      {
        title: 'Good-cause statements',
        text: 'Later extensions require a showing of good cause. We draft it against what the USPTO actually accepts.',
      },
      {
        title: 'Forward docketing',
        text: 'Your next deadline recorded and reminded on, so the following one does not creep up either.',
      },
    ],
    steps: [
      {
        title: 'Send your serial number',
        text: 'We retrieve the Notice of Allowance and the full deadline history.',
      },
      {
        title: 'We advise',
        text: 'Extend, or file the Statement of Use now — whichever genuinely costs you less.',
      },
      {
        title: 'We prepare and file',
        text: 'Drafted for your approval, filed inside the window, confirmation sent to you.',
      },
    ],
    audience: [
      'Intent-to-use applicants not yet selling',
      'Founders whose launch has slipped',
      'Brands holding a name for a future product line',
    ],
    timeline: 'Prepared within two business days, faster where the deadline is imminent.',
    priceFrom: '$149 + USPTO fee',
    faqs: [
      {
        q: 'How many extensions can I file?',
        a: 'There is a statutory maximum measured from the Notice of Allowance date, filed in six-month increments, with later requests needing a showing of good cause. We will tell you exactly where you sit in that sequence.',
      },
      {
        q: 'What counts as use in commerce?',
        a: 'Real sales or transport of the goods in commerce, or actual rendering of the services — not a coming-soon page, not a private beta, and not a single sale arranged to manufacture a specimen.',
      },
      {
        q: 'What if I miss the window?',
        a: 'The application goes abandoned. Petitions to revive exist for unintentional delay but they are not guaranteed and they cost more than the extension would have. Do not let it run down.',
      },
    ],
    related: ['proof-of-commerce', 'federal-trademark-filing', 'office-action-response'],
  },
  {
    slug: 'proof-of-commerce',
    name: 'Proof of Commerce Filing',
    navName: 'Proof of commerce',
    code: 'STATEMENT OF USE',
    icon: 'check',
    summary:
      'The final step on an intent-to-use application. Get the specimen wrong here and you pay to do it twice.',
    metaTitle: 'Statement of Use Filing Services',
    metaDescription:
      'File your Statement of Use with the USPTO. Specimen preparation, dates of first use and allegations of use handled so your intent-to-use application reaches registration.',
    intro: [
      'A Statement of Use is how an intent-to-use application becomes a registration. You declare the date you first used the mark in commerce, list the goods and services you are actually selling, and submit a specimen showing the mark in real commercial use.',
      'This is where a surprising number of applications stumble at the last hurdle. Specimens get refused because they show a logo printed decoratively across a t-shirt rather than used as a brand, because they are a mock-up rather than a real product, because the screenshot has no URL and no date, or because the mark on the specimen is not quite the mark that was applied for.',
    ],
    included: [
      {
        title: 'Specimen assessment',
        text: 'We look at what you have before anything is filed and tell you whether it will pass — and what to reshoot if it will not.',
      },
      {
        title: 'Dates of first use',
        text: 'First use anywhere and first use in commerce established correctly, because these dates matter in any later dispute.',
      },
      {
        title: 'Goods reconciliation',
        text: 'If you are not yet selling everything you applied for, the goods you are not selling have to be deleted or divided out. Declaring use across the board when it is not true endangers the whole registration.',
      },
      {
        title: 'Ecommerce specimens',
        text: 'Marketplace and web-page specimens prepared with the URL, date, price and ordering information the USPTO requires to accept a screenshot as evidence of sale.',
      },
      {
        title: 'Service mark specimens',
        text: 'Services need the mark shown in connection with the service being rendered, which is a different standard from goods and is applied strictly.',
      },
      {
        title: 'Filing and follow-through',
        text: 'Filed inside the window, tracked to registration, certificate handled.',
      },
    ],
    steps: [
      {
        title: 'Send what you have',
        text: 'Product photos, packaging, listings or screenshots, plus your serial number.',
      },
      {
        title: 'We review the specimen',
        text: 'Pass or fail, with specific direction on what to change if it fails.',
      },
      {
        title: 'We prepare the filing',
        text: 'Dates, goods and declaration drafted for your signature.',
      },
      {
        title: 'We file and track',
        text: 'Submitted, monitored, and your registration certificate handled when it issues.',
      },
    ],
    audience: [
      'Intent-to-use applicants who have started selling',
      'Anyone whose specimen has already been refused once',
      'Ecommerce brands filing marketplace specimens',
    ],
    timeline: 'Specimen assessed within one business day, filing prepared within three.',
    priceFrom: '$199 + USPTO fee',
    faqs: [
      {
        q: 'What makes a good specimen?',
        a: 'For goods: the mark on the product, its packaging, its labels or tags, or on a point-of-sale display or web page that lets a customer actually order. For services: the mark in advertising or materials that show the service being offered. Mock-ups, invoices alone and decorative usage are all refused.',
      },
      {
        q: 'Can I file before I have sold anything?',
        a: 'No. Use in commerce means real sales or transport of the goods. Filing a Statement of Use before that is a false declaration and can invalidate the registration later.',
      },
      {
        q: 'What if I am only selling some of the goods I applied for?',
        a: 'You delete the ones you are not selling, or file a request to divide so the ready goods proceed to registration while the rest stay pending. We will tell you which makes sense.',
      },
    ],
    related: ['filing-an-extension', 'federal-trademark-filing', 'trademark-renewal'],
  },
  {
    slug: 'dmca-takedowns',
    name: 'Digital Piracy Takedowns',
    navName: 'DMCA takedowns',
    code: 'DMCA · ENFORCEMENT',
    icon: 'bolt',
    summary:
      'Counterfeit listings, stolen photography and copycat storefronts removed at the platform, usually in days.',
    metaTitle: 'DMCA Takedowns & Counterfeit Removal',
    metaDescription:
      'Remove infringing listings, stolen images and copycat storefronts from Amazon, Etsy, eBay, Shopify and Instagram with properly drafted DMCA and IP takedown notices.',
    intro: [
      'When someone lifts your product photography, clones your storefront or lists counterfeits under your brand, going through a court is rarely the fastest route. Every major platform runs a notice-and-takedown process, and a properly drafted notice usually gets the listing removed in days rather than months.',
      'Notices get rejected for predictable reasons: the wrong statutory basis, the wrong process for the platform, missing identification of the original work, or a trademark claim dressed up as a copyright claim. Filing a knowingly false notice also carries liability of its own, which is why the assessment before the notice matters as much as the notice.',
    ],
    included: [
      {
        title: 'Infringement assessment',
        text: 'We confirm what is actually being infringed — your copyright in the images, your registered trademark, or your trade dress — because the right basis determines the right process.',
      },
      {
        title: 'Evidence capture',
        text: 'Listings, storefronts and posts captured with timestamps and URLs before the infringer takes them down and disputes that they ever existed.',
      },
      {
        title: 'DMCA notices',
        text: 'Section 512(c) notices drafted with every statutory element, sent to the designated agent for the host or platform.',
      },
      {
        title: 'Platform IP complaints',
        text: 'Amazon Brand Registry, Etsy, eBay VeRO, Shopify, Walmart, Instagram, TikTok and Google — each has its own form and its own evidentiary expectations, and we file through the correct one.',
      },
      {
        title: 'Counter-notice handling',
        text: 'If the infringer files a counter-notice we advise on what happens next and on the escalation options.',
      },
      {
        title: 'Repeat infringer tracking',
        text: 'Sellers who reappear under new names are tracked, which is what turns a single removal into an actual deterrent.',
      },
    ],
    steps: [
      {
        title: 'Send us the links',
        text: 'The infringing listings or posts, and proof of your own rights.',
      },
      {
        title: 'We assess and capture',
        text: 'Basis confirmed, evidence preserved with timestamps.',
      },
      {
        title: 'We file the notice',
        text: 'Drafted and submitted through the correct channel for that platform.',
      },
      {
        title: 'We follow up',
        text: 'Removal confirmed, or escalated if the platform stalls.',
      },
    ],
    audience: [
      'Ecommerce brands facing counterfeit listings',
      'Photographers and designers whose work is being reused',
      'Course creators whose material is being resold',
      'Any brand with a copycat storefront',
    ],
    timeline:
      'Notice filed within two business days. Platform response times vary; most act within one to two weeks, and Amazon Brand Registry is often faster.',
    priceFrom: '$149 per notice',
    faqs: [
      {
        q: 'Do I need a registered copyright to file a DMCA notice?',
        a: 'No. A DMCA notice can be sent based on unregistered copyright. Registration becomes essential if you want to sue, and it makes a claim far harder for a platform or infringer to brush off.',
      },
      {
        q: 'What if it is my brand name being used, not my images?',
        a: 'That is a trademark complaint rather than a DMCA notice, and it goes through a different platform process. Platforms generally require a registration number for trademark claims, which is one more reason to register.',
      },
      {
        q: 'They keep coming back under new names. What then?',
        a: 'We track repeat infringers and escalate through the platform’s repeat-infringer policy. Where the same operator keeps returning, the realistic next step is legal action, and we will tell you when you have reached that point.',
      },
    ],
    related: ['brand-monitoring', 'copyright-registration', 'federal-trademark-filing'],
  },
];

export function getService(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}

export const serviceSlugs = services.map((s) => s.slug);
