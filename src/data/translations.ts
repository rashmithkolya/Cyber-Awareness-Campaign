import { QuizQuestion, Scenario, UrlCheckItem, SortItem } from '../types';

export const TRANSLATIONS = {
  en: {
    // Nav & Header
    collegeName: "Government Polytechnic Bantwal",
    deptName: "Department of Computer Science Engineering",
    techClub: "Technical Club",
    developerCredit: "Designed & Developed by Rashmith Kolya (2nd Year CSE)",
    switchLanguage: "ಕನ್ನಡ",
    shareCertificate: "Share Certificate",

    // Landing Page (Unknown Surprise / Mystery Experience)
    landingTagline: "MYSTERY EXPERIENCE • EXCLUSIVE ACCESS 2026",
    landingTitle: "The Unknown Surprise",
    landingSub: "Something unexpected awaits. Are you ready to discover what lies behind the mystery?",
    rewardBadge: "Curiosity Portal",
    rewardAmount: "Mystery Box",
    claimedCount: "1,420+ Curious Minds Participated",
    quickVerify: "100% Instant Access",
    studentOnly: "No Form Required",
    instantCredit: "Interactive Experience",
    formTitle: "Unlock the Mystery Experience",
    formSubtitle: "Click below to step into the unknown. No personal information required.",
    claimBtn: "REVEAL THE SURPRISE",
    privacyNotice: "🔒 Safe & Private Interactive Experience — Zero Data Collected",
    termsNotice: "* An intriguing experience presented by Technical Club, CSE Department, GPT Bantwal.",

    // Cinematic Reveal
    revealVerified: "CURIOSITY MADE YOU CLICK.",
    revealCredited: "You expected a surprise...",
    revealFreeze: "AND YOU FOUND ONE.",
    revealReflect: "Welcome, Curious Explorer",
    revealTrustMsg: "Every single day, attackers use curiosity, mystery, and tempting offers to attract unsuspecting victims online.",
    revealBigText: "A SINGLE CLICK CAN CHANGE EVERYTHING.",
    revealLessonText: "THIS IS A CYBER SECURITY LESSON.",
    revealSafeMsg: "Rest assured: No personal information was asked or saved. You are 100% safe inside this browser session.",
    revealActionBtn: "BEGIN AWARENESS EXPERIENCE",

    // Awareness Hero
    awarenessHeroTag: "AWARENESS CAMPAIGN 2026",
    awarenessHeroTitle: "Think Before You Click. Verify Before You Trust.",
    awarenessHeroSub: "In the digital world, psychological manipulation is far more dangerous than computer viruses. Learn how scammers exploit trust and how to protect yourself.",
    startLearning: "Explore Interactive Modules",
    certHighlightTitle: "Earn Your Verified Cyber Security Certificate",
    certHighlightDesc: "Complete the interactive security exercises, pass the 5-question awareness quiz, and generate a downloadable certificate of completion.",
    instagramTag: "Share on Instagram Story & tag @gptbantwal & @blackbyte_cs",

    // Section 1: What Just Happened
    sec1Title: "1. What Just Happened?",
    sec1Sub: "Deconstructing the anatomy of the GPT Reward Hunt lure.",
    sec1Card1Title: "1. The Free Money Bait",
    sec1Card1Desc: "Offering ₹500 triggers immediate reward anticipation, bypassing normal critical analysis.",
    sec1Card2Title: "2. Artificial Urgency & Social Proof",
    sec1Card2Desc: "'1,482 citizens claimed today' creates Fear Of Missing Out (FOMO) and fake social validation.",
    sec1Card3Title: "3. Institutional Branding",
    sec1Card3Desc: "Using 'Government Polytechnic Bantwal' makes the fake offer feel official and safe.",

    // Section 2: Why People Fall For Scams
    sec2Title: "2. The Psychology of Cyber Scams",
    sec2Sub: "Click each trigger to reveal how cybercriminals exploit human emotion.",
    triggerUrgencyTitle: "🔥 Artificial Urgency",
    triggerUrgencyDesc: "'Limited time only! Act now!' forces quick panic decisions before you can think clearly.",
    triggerAuthorityTitle: "🏛️ Fake Authority",
    triggerAuthorityDesc: "Impersonating college directors, banks, or police officers induces immediate compliance.",
    triggerGreedTitle: "🎁 Unearned Reward",
    triggerGreedDesc: "Promising free money, iPhones, or lotteries makes victim emotions override logic.",
    triggerFearTitle: "⚠️ Panic & Threat",
    triggerFearDesc: "'Your bank account is suspended!' causes immediate action to fix a fake problem.",

    // Section 3: Spot the Warning Signs (Interactive Hotspot)
    sec3Title: "3. Spot the Red Flags in Phishing",
    sec3Sub: "Hover or tap on the highlighted hotspots in the simulated email below to identify suspicious elements.",

    // Section 4: Checklist
    sec4Title: "4. The 4-Step Verification Rule",
    sec4Sub: "Memorize these steps before clicking any link or sharing sensitive info.",
    rule1Title: "1. Inspect the URL Carefully",
    rule1Desc: "Check for misspelled domain names like gptbantwa1.com or gpt-reward.xyz instead of gptbantwal.ac.in.",
    rule2Title: "2. Verify Urgency Demands",
    rule2Desc: "Legitimate institutions will never demand immediate actions under threat of account loss via SMS.",
    rule3Title: "3. Never Share OTP or Passwords",
    rule3Desc: "No bank, college official, or government staff will ever ask for your Login OTP.",
    rule4Title: "4. Ask & Cross-Check Directly",
    rule4Desc: "When in doubt, contact the department or bank using their official phone number or website.",

    // Section 5: Essential Defense Modules
    sec5Title: "5. Essential Cyber Defense Rules",
    sec5Sub: "Interactive core principles every digital citizen must practice online.",
    passTitle: "🔑 Password Hygiene",
    passDesc: "Use passphrase combinations with symbols. Never reuse your personal portal password across multiple accounts.",
    otpTitle: "📲 OTP & Banking Safety",
    otpDesc: "Entering a UPI PIN is ALWAYS for paying money, NEVER for receiving money or rewards.",
    qrTitle: "📷 QR Code Safety",
    qrDesc: "Scanning a QR code only sends money or opens URLs. You do NOT scan a QR code to receive cash.",
    wifiTitle: "🌐 Public Wi-Fi Risks",
    wifiDesc: "Avoid logging into bank accounts or entering passwords on open public airport/café Wi-Fi networks.",

    // Section 6: Real Life Scenarios
    sec6Title: "6. Real-Life Security Scenarios",
    sec6Sub: "What would you do? Test your real-time decision-making skills.",

    // Section 7: Interactive Challenges
    sec7Title: "7. Hands-on Cyber Challenges",
    sec7Sub: "Test your skills with interactive security mini-games.",
    challengeUrlTitle: "Challenge A: Domain Inspector",
    challengeUrlSub: "Is this URL genuine or a malicious phishing copycat?",
    challengeSortTitle: "Challenge B: Safe or Unsafe Sorting",
    challengeSortSub: "Classify incoming digital situations as Safe or Dangerous.",
    challengePassTitle: "Challenge C: Password Strength Analyzer",
    challengePassSub: "Type a password to test its crack time and entropy against brute-force attacks.",

    // Section 8: Quiz
    sec8Title: "8. Cyber Awareness Certification Quiz",
    sec8Sub: "Score at least 80% (4 out of 5) to earn your Official Cyber Security Awareness Certificate.",
    quizProgress: "Question {current} of {total}",
    quizScoreMsg: "Your Score: {score} / {total}",
    quizPassMsg: "🎉 Congratulations! You demonstrated excellent cyber security awareness.",
    quizFailMsg: " You scored below 80%. Review the sections above and retry to earn your certificate.",
    retryBtn: "Retry Quiz",
    unlockCertBtn: "Claim Your Certificate Below",

    // Section 9: Certificate
    sec9Title: "9. Certificate of Achievement",
    sec9Sub: "Generated locally in your browser. Fully valid for sharing.",
    certTitleText: "CERTIFICATE OF PARTICIPATION",
    certPresentedTo: "This certificate is proudly presented to",
    certBodyText: "for successfully completing the Cyber Security Awareness Training & Demonstration on Phishing Prevention, Social Engineering, and Digital Safety.",
    certDate: "Issued Date",
    certId: "Certificate Verification ID",
    certSignedBy: "Department of Computer Science Engineering",
    certCollege: "Government Polytechnic Bantwal",
    certClub: "Technical Club",
    certMotto: "Think Before You Click. Verify Before You Trust.",
    downloadPngBtn: "Download Certificate (PNG)",
    downloadPdfBtn: "Print / Save PDF Certificate",

    // Section 10: Feedback
    sec10Title: "10. Public Feedback & Campaign Metrics",
    sec10Sub: "Help us improve community cyber security education and awareness.",
    feedbackNotice: "ℹ️ Note: This embedded Google Form is the ONLY place on this website where feedback data is intentionally collected for educational purposes.",
    feedbackThx: "Thank you for supporting community cyber security awareness!",

    // Awareness Popup Modal
    popupTitle: "🏆 Earn Your Cyber Awareness Certificate!",
    popupSubtitle: "Welcome to the Cyber Security Awareness Campaign 2026",
    popupBadge: "Official Cyber Awareness Certification",
    popupDesc: "Complete the interactive learning modules, solve real-world scam challenges, and pass the short quiz to earn your Official Certificate of Completion provided by the Technical Club, Government Polytechnic Bantwal! After claiming your certificate, share it on your Instagram Story & tag @gptbantwal and @blackbyte_cs!",
    popupBtn: "Start Learning & Claim Certificate",
    popupCertHighlight: "Share Certificate on Instagram Story & tag @gptbantwal, @blackbyte_cs",

    // Footer
    footerQuote: "“Cyber security is not a technical problem — it is a human habit.”",
    footerCampaignTitle: "Cyber Awareness Campaign",
    footerInitiative: "An Initiative by the Technical Club",
    footerDeptFull: "Computer Science Engineering (CSE)",
    footerCollegeFull: "Government Polytechnic Bantwal",
    footerDevBy: "Designed & Developed by",
    footerDevName: "Rashmith Kolya",
    footerDevClass: "2nd Year – CSE",
    footerDept: "Department of Computer Science Engineering (CSE)",
    footerColl: "Government Polytechnic Bantwal",
    footerClub: "Technical Club",
    footerInsta: "Instagram Handles:",
    backToTop: "Back to Top ↑",
    copyRight: "© 2026 Government Polytechnic Bantwal. Educational Cyber Awareness Project.",
  },

  kn: {
    // Nav & Header (Kept in English as requested)
    collegeName: "Government Polytechnic Bantwal",
    deptName: "Department of Computer Science Engineering",
    techClub: "Technical Club",
    developerCredit: "Designed & Developed by Rashmith Kolya (2nd Year CSE)",
    switchLanguage: "English",
    shareCertificate: "Certificate ಹಂಚಿಕೊಳ್ಳಿ",

    // Landing Page (Unknown Surprise / Mystery Experience)
    landingTagline: "ರಹಸ್ಯ ಅನುಭವ • ವಿಶೇಷ ಪ್ರವೇಶ 2026",
    landingTitle: "ಅಜ್ಞಾತ ಆಶ್ಚರ್ಯ (The Unknown Surprise)",
    landingSub: "ನಿಮಗಾಗಿ ಒಂದು ಅಪರಿಚಿತ ಅನುಭವ ಕಾಯುತ್ತಿದೆ. ರಹಸ್ಯದ ಹಿಂದೆ ಏನಿದೆ ಎಂದು ತಿಳಿಯಲು ಸಿದ್ಧರಿದ್ದೀರಾ?",
    rewardBadge: "ಕುತೂಹಲದ ಪೋರ್ಟಲ್",
    rewardAmount: "Mystery Box",
    claimedCount: "1,420+ ಕುತೂಹಲ ಭರಿತ ಜನರು ವೀಕ್ಷಿಸಿದ್ದಾರೆ",
    quickVerify: "100% ತಕ್ಷಣದ ಪ್ರವೇಶ",
    studentOnly: "ಯಾವುದೇ ಫಾರ್ಮ್ ಅಗತ್ಯವಿಲ್ಲ",
    instantCredit: "ಇಂಟರಾಕ್ಟಿವ್ ಅನುಭವ",
    formTitle: "ರಹಸ್ಯ ಅನುಭವವನ್ನು ರವೀಲ್ ಮಾಡಿ",
    formSubtitle: "ಕೆಳಗಿನ ಬಟನ್ ಕ್ಲಿಕ್ ಮಾಡಿ. ಯಾವುದೇ ವೈಯಕ್ತಿಕ ಮಾಹಿತಿ ನೀಡುವ ಅಗತ್ಯವಿಲ್ಲ.",
    claimBtn: "REVEAL THE SURPRISE",
    privacyNotice: "🔒 ಸಂಪೂರ್ಣ ಸುರಕ್ಷಿತ ಇಂಟರಾಕ್ಟಿವ್ ಅನುಭವ — ಯಾವುದೇ ಮಾಹಿತಿ ಸಂಗ್ರಹಿಸುವುದಿಲ್ಲ",
    termsNotice: "* ಕಂಪ್ಯೂಟರ್ ಸೈನ್ಸ್ ತಾಂತ್ರಿಕ ಕ್ಲಬ್ ಪ್ರಸ್ತುತಪಡಿಸುವ ಆಸಕ್ತಿದಾಯಕ ಅನುಭವ.",

    // Cinematic Reveal
    revealVerified: "ಕುತೂಹಲವು ನಿಮ್ಮನ್ನು ಕ್ಲಿಕ್ ಮಾಡಲು ಪ್ರೇರೇಪಿಸಿತು.",
    revealCredited: "ನೀವು ಒಂದು ಆಶ್ಚರ್ಯವನ್ನು ನಿರೀಕ್ಷಿಸಿದ್ದೀರಿ...",
    revealFreeze: "ಮತ್ತು ನಿಮಗೊಂದು ಆಶ್ಚರ್ಯ ಸಿಕ್ಕಿತು.",
    revealReflect: "ಸ್ವಾಗತ, ಕುತೂಹಲಿ ವೀಕ್ಷಕರೇ",
    revealTrustMsg: "ಪ್ರತಿದಿನ, ಸೈಬರ್ ಮೋಸಗಾರರು ಜನರ ಕುತೂಹಲ, ರಹಸ್ಯ ಮತ್ತು ಆಕರ್ಷಕ ಕೊಡುಗೆಗಳನ್ನು ಬಳಸಿಕೊಂಡು ಜನರನ್ನು ವಂಚಿಸುತ್ತಾರೆ.",
    revealBigText: "ಒಂದು ಒಂದೇ ಕ್ಲಿಕ್ ಎಲ್ಲವನ್ನೂ ಬದಲಾಯಿಸಬಹುದು.",
    revealLessonText: "ಇದು ಒಂದು ಸೈಬರ್ ಜಾಗೃತಿಯ ಪಾಠ (LESSON).",
    revealSafeMsg: "ಖಾತರಿ ಇರಲಿ: ನಿಮ್ಮ ಯಾವುದೇ ವೈಯಕ್ತಿಕ ವಿವರಗಳನ್ನು ಕೇಳಲಾಗಿಲ್ಲ ಅಥವಾ ಸಂಗ್ರಹಿಸಿಲ್ಲ. ನಿಮ್ಮ ಬ್ರೌಸರ್ ಸಂಪೂರ್ಣ ಸುರಕ್ಷಿತವಾಗಿದೆ.",
    revealActionBtn: "ಜಾಗೃತಿ ಅಭಿಯಾನಕ್ಕೆ ಚಾಲನೆ ನೀಡಿ",

    // Awareness Hero
    awarenessHeroTag: "ಸೈಬರ್ ಜಾಗೃತಿ ಅಭಿಯಾನ 2026",
    awarenessHeroTitle: "Click ಮಾಡುವ ಮುನ್ನ ಯೋಚಿಸಿ. ನಂಬುವ ಮುನ್ನ Verify ಮಾಡಿ.",
    awarenessHeroSub: "ಡಿಜಿಟಲ್ ಜಗತ್ತಿನಲ್ಲಿ ಕಂಪ್ಯೂಟರ್ ವೈರಸ್‌ಗಿಂತ ಮಾನಸಿಕ ತಂತ್ರಗಳು (Psychological Scams) ಹೆಚ್ಚು ಅಪಾಯಕಾರಿ. ಆನ್‌ಲೈನ್ ವಂಚನೆಗಳಿಂದ ಹೇಗೆ ರಕ್ಷಿಸಿಕೊಳ್ಳುವುದು ಎಂದು ತಿಳಿಯಿರಿ.",
    startLearning: "ಕಲಿಕಾ ವಿಭಾಗಗಳನ್ನು ವೀಕ್ಷಿಸಿ",
    certHighlightTitle: "ಅಧಿಕೃತ ಸೈಬರ್ ಭದ್ರತಾ Certificate ಪಡೆಯಿರಿ",
    certHighlightDesc: "ಎಲ್ಲಾ ಸವಾಲುಗಳನ್ನು ಪೂರ್ಣಗೊಳಿಸಿ, 5 ಪ್ರಶ್ನೆಗಳ Quiz ನಲ್ಲಿ ಉತ್ತೀರ್ಣರಾಗಿ ಉಚಿತ Certificate ಡೌನ್‌ಲೋಡ್ ಮಾಡಿ.",
    instagramTag: "Share on Instagram Story & tag @gptbantwal & @blackbyte_cs",

    // Section 1: What Just Happened
    sec1Title: "1. ಈಗ ತಾನೇ ಏನಾಯಿತು?",
    sec1Sub: "GPT Reward Hunt ತಂತ್ರದ ಸಂಪೂರ್ಣ ವಿಶ್ಲೇಷಣೆ.",
    sec1Card1Title: "1. ಉಚಿತ ಹಣದ ಆಮಿಷ (Free Money Bait)",
    sec1Card1Desc: "ಉಚಿತ ₹500 ನೀಡುವ ಆಸೆ ಜನರ ಜಾಗರೂಕತೆಯನ್ನು ಕಡಿಮೆ ಮಾಡುತ್ತದೆ.",
    sec1Card2Title: "2. ಕೃತಕ ತುರ್ತು ಮತ್ತು ಸಾಮಾಜಿಕ ಬೆಂಬಲ (Urgency & Social Proof)",
    sec1Card2Desc: "'1,482 ನಾಗರಿಕರು ಪಡೆದಿದ್ದಾರೆ' ಎಂಬ ಮಾತು ಸುಳ್ಳು ನಂಬಿಕೆಯನ್ನು ಹುಟ್ಟುಹಾಕುತ್ತದೆ.",
    sec1Card3Title: "3. ಕಾಲೇಜಿನ ಹೆಸರಿನ ದುರುಪಯೋಗ",
    sec1Card3Desc: "'Government Polytechnic Bantwal' ಹೆಸರು ಬಳಸಿದಾಗ ಜನರು ಇದನ್ನು ಅಧಿಕೃತವೆಂದು ನಂಬುತ್ತಾರೆ.",

    // Section 2: Why People Fall For Scams
    sec2Title: "2. Scam ಗಳ ಹಿಂದಿನ ಮಾನಸಿಕ ತಂತ್ರಗಳು",
    sec2Sub: "ಪ್ರತಿಯೊಂದು ತಂತ್ರದ ಮೇಲೆ Click ಮಾಡಿ ಅವು ಹೇಗೆ ಕೆಲಸ ಮಾಡುತ್ತವೆ ಎಂದು ತಿಳಿಯಿರಿ.",
    triggerUrgencyTitle: "🔥 ತುರ್ತಿನ ಒತ್ತಡ (Artificial Urgency)",
    triggerUrgencyDesc: "'ಕೊನೆಯ ದಿನಾಂಕ ಇಂದು!' ಎಂಬ ಮಾತು ತಕ್ಷಣ ನಿರ್ಧಾರ ತೆಗೆದುಕೊಳ್ಳುವಂತೆ ಮಾಡುತ್ತದೆ.",
    triggerAuthorityTitle: "🏛️ ನಕಲಿ ಅಧಿಕಾರಿಗಳ ಹೆಸರು (Fake Authority)",
    triggerAuthorityDesc: "ಪೊಲೀಸ್, ಬ್ಯಾಂಕ್ ಅಥವಾ ಕಾಲೇಜು ಪ್ರಿನ್ಸಿಪಾಲ್ ಹೆಸರು ಹೇಳಿ ಹೆದರಿಸುವುದು.",
    triggerGreedTitle: "🎁 ಉಚಿತ ಆಮಿಷಗಳು (Unearned Rewards)",
    triggerGreedDesc: "ಉಚಿತ iPhone, Lottery ಅಥವಾ ಹಣದ ಆಸೆ ತೋರಿಸಿ ಖಾಸಗಿ Data ಪಡೆಯುವುದು.",
    triggerFearTitle: "⚠️ ಭಯ ಹುಟ್ಟಿಸುವುದು (Panic & Threats)",
    triggerFearDesc: "'ನಿಮ್ಮ Account ಬ್ಲಾಕ್ ಆಗಿದೆ!' ಎಂದು ಭಯ ಹುಟ್ಟಿಸಿ OTP ಕೇಳುವುದು.",

    // Section 3: Spot the Warning Signs
    sec3Title: "3. Phishing ನ ಸುಳಿವುಗಳನ್ನು ಪತ್ತೆಹಚ್ಚಿ",
    sec3Sub: "ಕೆಳಗಿನ ಮಾದರಿ ಇಮೇಲ್‌ನಲ್ಲಿರುವ ಕೆಂಪು ಗುರುತುಗಳ ಮೇಲೆ Click ಮಾಡಿ ಸುಳಿವುಗಳನ್ನು ತಿಳಿಯಿರಿ.",

    // Section 4: Checklist
    sec4Title: "4. Verify ಮಾಡಲು 4 ಮುಖ್ಯ ನಿಯಮಗಳು",
    sec4Sub: "ಯಾವುದೇ Link ക്ಲಿಕ್ ಮಾಡುವ ಮೊದಲು ಈ ನಿಯಮಗಳನ್ನು ನೆನಪಿನಲ್ಲಿಡಿ.",
    rule1Title: "1. Website URL ಪರಿಶೀಲಿಸಿ",
    rule1Desc: "gptbantwal.ac.in ಬದಲು gptbantwa1.com ಅಥವಾ gpt-reward.xyz ನಂತಹ ನಕಲಿ Link ಗಳನ್ನು ಗಮನಿಸಿ.",
    rule2Title: "2. ತುರ್ತು ಸಂದೇಶಗಳನ್ನು ನಂಬಬೇಡಿ",
    rule2Desc: "ಯಾವುದೇ ಅಧಿಕೃತ ಬ್ಯಾಂಕ್ ಅಥವಾ ಕಾಲೇಜು SMS ಮೂಲಕ ತಕ್ಷಣದ ಹಣ ಕೇಳುವುದಿಲ್ಲ.",
    rule3Title: "3. OTP ಮತ್ತು Password ಹಂಚಿಕೊಳ್ಳಬೇಡಿ",
    rule3Desc: "ಯಾರೇ ಆದರೂ ನಿಮ್ಮ Login OTP ಕೇಳಿದರೆ ಅದು 100% Scam.",
    rule4Title: "4. ಕಾಲೇಜು/ಬ್ಯಾಂಕ್‌ಗೆ ನೇರವಾಗಿ ಕರೆ ಮಾಡಿ",
    rule4Desc: "ಸಂಶಯವಿದ್ದರೆ ಅಧಿಕೃತ ಫೋನ್ ಸಂಖ್ಯೆಗೆ ಕರೆ ಮಾಡಿ ನಿಜವೇ ಎಂದು ಖಚಿತಪಡಿಸಿಕೊಳ್ಳಿ.",

    // Section 5: Essential Defense Modules
    sec5Title: "5. ಪ್ರಮುಖ ಸೈಬರ್ ರಕ್ಷಣಾ ನಿಯಮಗಳು",
    sec5Sub: "ಪ್ರತಿಯೊಬ್ಬ ಡಿಜಿಟಲ್ ಪ್ರಜೆಯೂ ಪಾಲಿಸಬೇಕಾದ ಸುರಕ್ಷತಾ ನಿಯಮಗಳು.",
    passTitle: "🔑 Password ಸುರಕ್ಷತೆ",
    passDesc: "ಕಠಿಣ Passwords ಬಳಸಿ. ಒಂದೇ Password ಅನ್ನು ವಿವಿಧ ವೆಬ್‌ಸೈಟ್‌ಗಳಿಗೆ ಬಳಸಬೇಡಿ.",
    otpTitle: "📲 OTP & Banking ಸುರಕ್ಷತೆ",
    otpDesc: "UPI PIN ನಮೂದಿಸುವುದು ಹಣ ಪಾವತಿಸಲು (Pay) ಮಾತ್ರ, ಹಣ ಪಡೆಯಲು (Receive) ಅಲ್ಲ!",
    qrTitle: "📷 QR Code ಸುರಕ್ಷತೆ",
    qrDesc: "QR Code Scan ಮಾಡುವುದು ಹಣ ಕಳುಹಿಸಲು ಮಾತ್ರ. ಹಣ ಪಡೆಯಲು QR Scan ಮಾಡುವ ಅಗತ್ಯವಿಲ್ಲ.",
    wifiTitle: "🌐 Public Wi-Fi ಅಪಾಯಗಳು",
    wifiDesc: "ಉಚಿತ Public Wi-Fi ನಲ್ಲಿ Bank Login ಅಥವಾ ಆನ್‌ಲೈನ್ ಪಾವತಿಗಳನ್ನು ಮಾಡಬೇಡಿ.",

    // Section 6: Real Life Scenarios
    sec6Title: "6. ನೈಜ ಸೈಬರ್ ಸನ್ನಿವೇಶಗಳು",
    sec6Sub: "ನೀವಾಗಿದ್ದರೆ ಏನು ಮಾಡುತ್ತಿದ್ದೀರಿ? ನಿಮ್ಮ ನಿರ್ಧಾರವನ್ನು ಪರೀಕ್ಷಿಸಿ.",

    // Section 7: Interactive Challenges
    sec7Title: "7. ಸೈಬರ್ ಸವಾಲುಗಳು (Challenges)",
    sec7Sub: "ಇಂಟರ್ಯಾಕ್ಟಿವ್ ಆಟಗಳ ಮೂಲಕ ನಿಮ್ಮ ಸೈಬರ್ ಜ್ಞಾನ ಪರೀಕ್ಷಿಸಿ.",
    challengeUrlTitle: "Challenge A: URL ಪರಿಶೀಲನೆ",
    challengeUrlSub: "ಈ URL ನಿಜವೇ ಅಥವಾ ನಕಲಿ ಫಿಶಿಂಗ್ (Phishing) ಲಿಂಕೇ?",
    challengeSortTitle: "Challenge B: Safe ಅಥವಾ Unsafe ವಿಂಗಡಣೆ",
    challengeSortSub: "ಬರುವ ಸಂದೇಶಗಳನ್ನು ಸುರಕ್ಷಿತ (Safe) ಅಥವಾ ಅಪಾಯಕಾರಿ (Unsafe) ಎಂದು ವಿಂಗಡಿಸಿ.",
    challengePassTitle: "Challenge C: Password Strength ಪರೀಕ್ಷೆ",
    challengePassSub: "ನಿಮ್ಮ Password ಎಷ್ಟು ಪ್ರಬಲವಾಗಿದೆ ಎಂದು ಪರಿಶೀಲಿಸಿ.",

    // Section 8: Quiz
    sec8Title: "8. ಸೈಬರ್ ಜಾಗೃತಿ Quiz",
    sec8Sub: "ಅಧಿಕೃತ Certificate ಪಡೆಯಲು ಕನಿಷ್ಠ 80% (5 ರಲ್ಲಿ 4) ಅಂಕಗಳನ್ನು ಪಡೆಯಿರಿ.",
    quizProgress: "ಪ್ರಶ್ನೆ {current} / {total}",
    quizScoreMsg: "ನಿಮ್ಮ ಅಂಕಗಳು: {score} / {total}",
    quizPassMsg: "🎉 ಅಭಿನಂದನೆಗಳು! ನೀವು ಸೈಬರ್ ಸುರಕ್ಷತಾ ಪರೀಕ್ಷೆಯಲ್ಲಿ ಉತ್ತೀರ್ಣರಾಗಿದ್ದೀರಿ.",
    quizFailMsg: " ನೀವು 80% ಕ್ಕಿಂತ ಕಡಿಮೆ ಪಡೆದಿದ್ದೀರಿ. ಮೇಲಿನ ವಿಷಯಗಳನ್ನು ಮತ್ತೆ ಓದಿ ಪುನಃ ಪ್ರಯತ್ನಿಸಿ.",
    retryBtn: "ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ (Retry)",
    unlockCertBtn: "ನಿಮ್ಮ Certificate ಪಡೆಯಿರಿ",

    // Section 9: Certificate
    sec9Title: "9. ಸಾಧನೆಯ ಪ್ರಶಸ್ತಿ ಪತ್ರ (Certificate)",
    sec9Sub: "ನಿಮ್ಮ Browser ನಲ್ಲೇ ತಕ್ಷಣ ರಚನೆಯಾಗುತ್ತದೆ. ಶೇರ್ ಮಾಡಲು ಸಂಪೂರ್ಣ ಅರ್ಹವಾಗಿದೆ.",
    certTitleText: "CERTIFICATE OF PARTICIPATION",
    certPresentedTo: "ಈ ಪ್ರಶಸ್ತಿ ಪತ್ರವನ್ನು ಗೌರವಪೂರ್ವಕವಾಗಿ ನೀಡಲಾಗಿದೆ:",
    certBodyText: "ಸೈಬರ್ ಸುರಕ್ಷತೆ, ಫಿಶಿಂಗ್ ತಡೆಗಟ್ಟುವಿಕೆ ಮತ್ತು ಆನ್‌ಲೈನ್ ಜಾಗೃತಿ ತರಬೇತಿಯನ್ನು ಯಶಸ್ವಿಯಾಗಿ ಪೂರ್ಣಗೊಳಿಸಿದ್ದಕ್ಕಾಗಿ.",
    certDate: "ನೀಡಿದ ದಿನಾಂಕ",
    certId: "Certificate ID",
    certSignedBy: "ಕಂಪ್ಯೂಟರ್ ಸೈನ್ಸ್ ಎಂಜಿನಿಯರಿಂಗ್ ವಿಭಾಗ",
    certCollege: "ಸರ್ಕಾರಿ ಪಾಲಿಟೆಕ್ನಿಕ್ ಬಂಟ್ವಾಳ",
    certClub: "ತಾಂತ್ರಿಕ ಕ್ಲಬ್",
    certMotto: "Think Before You Click. Verify Before You Trust.",
    downloadPngBtn: "Certificate ಡೌನ್‌ಲೋಡ್ (PNG)",
    downloadPdfBtn: "Print / PDF ಆಗಿ ಉಳಿಸಿ",

    // Section 10: Feedback
    sec10Title: "10. ಸಾರ್ವಜನಿಕ ಪ್ರತಿಕ್ರಿಯೆ (Feedback)",
    sec10Sub: "ಸಾರ್ವಜನಿಕರಲ್ಲಿ ಸೈಬರ್ ಜಾಗೃತಿ ಹೆಚ್ಚಿಸಲು ನಿಮ್ಮ ಅಭಿಪ್ರಾಯ ತಿಳಿಸಿ.",
    feedbackNotice: "ℹ️ ಗಮನಿಸಿ: ಈ ವೆಬ್‌ಸೈಟ್‌ನಲ್ಲಿ ಪ್ರತಿಕ್ರಿಯೆ ಪಡೆಯಲು ಮಾತ್ರ ಈ Google Form ಅನ್ನು ಬಳಸಲಾಗಿದೆ.",
    feedbackThx: "ಸೈಬರ್ ಜಾಗೃತಿಗೆ ಬೆಂಬಲ ನೀಡಿದ್ದಕ್ಕಾಗಿ ಧನ್ಯವಾದಗಳು!",

    // Awareness Popup Modal
    popupTitle: "🏆 Earn Your Cyber Awareness Certificate!",
    popupSubtitle: "Cyber Security Awareness Campaign 2026",
    popupBadge: "Official Cyber Awareness Certification",
    popupDesc: "Complete the interactive learning modules, solve real-world scam challenges, and pass the short quiz to earn your Official Certificate of Completion provided by the Technical Club, Government Polytechnic Bantwal! Share your certificate on Instagram Story & tag @gptbantwal and @blackbyte_cs!",
    popupBtn: "Start Learning & Claim Certificate",
    popupCertHighlight: "Share Certificate on Instagram Story & tag @gptbantwal, @blackbyte_cs",

    // Footer (Kept in English as requested)
    footerQuote: "“Cyber security is not a technical problem — it is a human habit.”",
    footerCampaignTitle: "Cyber Awareness Campaign",
    footerInitiative: "An Initiative by the Technical Club",
    footerDeptFull: "Computer Science Engineering (CSE)",
    footerCollegeFull: "Government Polytechnic Bantwal",
    footerDevBy: "Designed & Developed by",
    footerDevName: "Rashmith Kolya",
    footerDevClass: "2nd Year – CSE",
    footerDept: "Department of Computer Science Engineering (CSE)",
    footerColl: "Government Polytechnic Bantwal",
    footerClub: "Technical Club",
    footerInsta: "Instagram Handles:",
    backToTop: "Back to Top ↑",
    copyRight: "© 2026 Government Polytechnic Bantwal. Educational Cyber Awareness Project.",
  }
};

export const HOTSPOTS = [
  {
    id: "h1",
    x: 18,
    y: 22,
    titleEn: "Suspicious Sender Address",
    titleKn: "ಸಂದೇಹಾಸ್ಪದ Email Sender",
    descriptionEn: "Notice the domain 'admin@gpt-reward-grant.xyz' instead of the official 'dept@gptbantwal.ac.in'.",
    descriptionKn: "ಅಧಿಕೃತ 'gptbantwal.ac.in' ಬದಲು 'gpt-reward-grant.xyz' ಎಂಬ ನಕಲಿ Domain ಬಳಸಲಾಗಿದೆ.",
    isRedFlag: true
  },
  {
    id: "h2",
    x: 80,
    y: 35,
    titleEn: "Fake Sense of Urgency",
    titleKn: "ಕೃತಕ ತುರ್ತು (Fake Urgency)",
    descriptionEn: "'EXPIRES IN 2 HOURS' forces you to act immediately without verifying the truth.",
    descriptionKn: "'2 ಗಂಟೆಗಳಲ್ಲಿ ಮುಕ್ತಾಯ' ಎಂಬ ಮಾತು ಯೋಚನೆ ಮಾಡದೆ Click ಮಾಡಲು ಪ್ರಚೋದಿಸುತ್ತದೆ.",
    isRedFlag: true
  },
  {
    id: "h3",
    x: 45,
    y: 65,
    titleEn: "Generic Greeting",
    titleKn: "ಸಾಮಾನ್ಯ ಸಂಬೋಧನೆ (Generic Greeting)",
    descriptionEn: "'Dear Customer / Citizen' or 'Dear Student' instead of your official registered name.",
    descriptionKn: "ನಿಮ್ಮ ನಿಜವಾದ ಹೆಸರಿನ ಬದಲು 'Dear Customer' ಅಥವಾ 'Dear User' ಎಂದು ಸಾಮಾನ್ಯವಾಗಿ ಕರೆಯಲಾಗಿದೆ.",
    isRedFlag: true
  },
  {
    id: "h4",
    x: 50,
    y: 85,
    titleEn: "Unofficial Link Button",
    titleKn: "ನಕಲಿ Click Button",
    descriptionEn: "Button points to a shortener link (bit.ly/claim-500) hiding the real malicious destination.",
    descriptionKn: "Button ನ ಲಿಂಕ್ ನೈಜ ವೆಬ್‌ಸೈಟ್‌ಗೆ ಹೋಗದೆ ಅಡಗಿಸಿಟ್ಟ ನಕಲಿ ಲಿಂಕ್‌ಗೆ (bit.ly) ಕೊಂಡೊಯ್ಯುತ್ತದೆ.",
    isRedFlag: true
  }
];

export const URL_ITEMS: UrlCheckItem[] = [
  {
    id: "u1",
    url: "https://www.gptbantwal.ac.in/admissions",
    isSafe: true,
    reasonEn: "Official government polytechnic portal with legitimate .ac.in domain extension.",
    reasonKn: "ಅಧಿಕೃತ ಸರ್ಕಾರಿ ಪಾಲಿಟೆಕ್ನಿಕ್ ವೆಬ್‌ಸೈಟ್ (.ac.in domain)."
  },
  {
    id: "u2",
    url: "http://gptbantwa1-free-scholarship.com/login",
    isSafe: false,
    reasonEn: "Phishing site! Replaces 'l' with '1' (typosquatting) and uses insecure HTTP.",
    reasonKn: "ನಕಲಿ ವೆಬ್‌ಸೈಟ್! 'l' ಬದಲು '1' ಬಳಸಲಾಗಿದೆ ಮತ್ತು ಸುರಕ್ಷಿತ HTTPs ಇಲ್ಲ."
  },
  {
    id: "u3",
    url: "https://onlinesbi.sbi.co.in/portal",
    isSafe: true,
    reasonEn: "Legitimate State Bank of India sub-domain ending in .co.in.",
    reasonKn: "ಸ್ಟೇಟ್ ಬ್ಯಾಂಕ್ ಆಫ್ ಇಂಡಿಯಾದ ಅಧಿಕೃತ ಸಬ್-ಡೊಮೇನ್."
  },
  {
    id: "u4",
    url: "https://sbi-kyc-update-urgent.net/verify",
    isSafe: false,
    reasonEn: "Scam domain! Banks never host KYC portals on .net or demand urgent web verification.",
    reasonKn: "ವಂಚನೆಯ ಲಿಂಕ್! ಬ್ಯಾಂಕುಗಳು KYC ಗಾಗಿ .net ವೆಬ್‌ಸೈಟ್ ಬಳಸುವುದಿಲ್ಲ."
  }
];

export const SORT_ITEMS: SortItem[] = [
  {
    id: "s1",
    textEn: "SMS: 'Your electricity bill is unpaid. Power will cut at 9 PM. Call 98765xxxx'",
    textKn: "SMS: 'ನಿಮ್ಮ ಕರೆಂಟ್ ಬಿಲ್ ಪಾವತಿಯಾಗಿಲ್ಲ. ಇಂದು ರಾತ್ರಿ 9 ಗಂಟೆಗೆ ವಿದ್ಯುತ್ ಕಟ್ ಆಗಲಿದೆ. ಈ ಸಂಖ್ಯೆಗೆ ಕರೆ ಮಾಡಿ: 98765xxxx'",
    isSafe: false,
    explanationEn: "Electricity boards never send personal mobile numbers for disconnection warnings.",
    explanationKn: "ವಿದ್ಯುತ್ ಇಲಾಖೆಯು ವೈಯಕ್ತಿಕ ಮೊಬೈಲ್ ಸಂಖ್ಯೆಗೆ ಕರೆ ಮಾಡಲು SMS ಕಳುಹಿಸುವುದಿಲ್ಲ."
  },
  {
    id: "s2",
    textEn: "Official email from gptbantwal.ac.in announcing semester timetable.",
    textKn: "gptbantwal.ac.in ನಿಂದ ಪರೀಕ್ಷಾ ವೇಳಾಪಟ್ಟಿಯ ಅಧಿಕೃತ ಇಮೇಲ್.",
    isSafe: true,
    explanationEn: "Genuine communication originating from official college domain.",
    explanationKn: "ಅಧಿಕೃತ ಕಾಲೇಜು ಇಮೇಲ್ ಡೊಮೇನ್‌ನಿಂದ ಬಂದ ಮಾಹಿತಿ."
  },
  {
    id: "s3",
    textEn: "WhatsApp message with APK file attachment: 'Install this app to get free 50GB data'.",
    textKn: "WhatsApp ಸಂದೇಶ: 'ಉಚಿತ 50GB ಇಂಟರ್ನೆಟ್ ಪಡೆಯಲು ಈ APK ಆಪ್ ಇನ್‌ಸ್ಟಾಲ್ ಮಾಡಿ'.",
    isSafe: false,
    explanationEn: "Never install unknown APK files. They contain spyware and trojans.",
    explanationKn: "ಅಪರಿಚಿತ APK ಫೈಲ್‌ಗಳನ್ನು ಇನ್‌ಸ್ಟಾಲ್ ಮಾಡಬೇಡಿ. ಅವುಗಳಲ್ಲಿ ವೈರಸ್‌ಗಳಿರುತ್ತವೆ."
  },
  {
    id: "s4",
    textEn: "Scanning a QR code at a college canteen counter to pay ₹40 for tea.",
    textKn: "ಕ್ಯಾಂಟೀನ್‌ನಲ್ಲಿ ಚಹಾಕ್ಕಾಗಿ ₹40 ಪಾವತಿಸಲು QR Code Scan ಮಾಡುವುದು.",
    isSafe: true,
    explanationEn: "Scanning to pay at a physical, known counter is standard UPI usage.",
    explanationKn: "ಅಂಗಡಿಯಲ್ಲಿ ಹಣ ಪಾವತಿಸಲು QR scan ಮಾಡುವುದು ಸುರಕ್ಷಿತ."
  }
];

export const SCENARIOS: Scenario[] = [
  {
    id: "sc1",
    titleEn: "Scenario 1: The Urgent Bank Call",
    titleKn: "ಸನ್ನಿವೇಶ 1: ಬ್ಯಾಂಕ್ ಮ್ಯಾನೇಜರ್ ಹೆಸರಿನ ಕರೆ",
    situationEn: "You receive a phone call from someone claiming to be an SBI manager. He says your debit card will be blocked within 30 minutes unless you read out the 6-digit OTP sent to your phone.",
    situationKn: "ನಿಮಗೆ SBI ಬ್ಯಾಂಕ್ ಮ್ಯಾನೇಜರ್ ಎಂದು ಹೇಳಿಕೊಳ್ಳುವ ವ್ಯಕ್ತಿಯಿಂದ ಕರೆ ಬರುತ್ತದೆ. ನಿಮ್ಮ ATM ಕಾರ್ಡ್ 30 ನಿಮಿಷಗಳಲ್ಲಿ ಬ್ಲಾಕ್ ಆಗಲಿದೆ, ತಕ್ಷಣ ನಿಮ್ಮ ಫೋನ್‌ಗೆ ಬಂದ 6 ಸಂಖ್ಯೆಯ OTP ತಿಳಿಸಿ ಎನ್ನುತ್ತಾರೆ.",
    choices: [
      {
        textEn: "Immediately give the OTP so your card remains active.",
        textKn: "ಕಾರ್ಡ್ ಬ್ಲಾಕ್ ಆಗದಿರಲು ತಕ್ಷಣವೇ OTP ಹೇಳಿಬಿಡುವುದು.",
        isSafe: false,
        feedbackEn: "❌ DANGEROUS! Banks NEVER ask for OTP over the phone. Giving this OTP allows the caller to empty your bank account instantly.",
        feedbackKn: "❌ ಅಪಾಯಕಾರಿ! ಬ್ಯಾಂಕ್ ಸಿಬ್ಬಂದಿ ಎಂದಿಗೂ ಫೋನ್‌ನಲ್ಲಿ OTP ಕೇಳುವುದಿಲ್ಲ. OTP ನೀಡಿದರೆ ನಿಮ್ಮ ಖಾತೆಯ ಹಣ ಖಾಲಿಯಾಗುತ್ತದೆ."
      },
      {
        textEn: "Disconnect the call immediately and call the official bank branch number.",
        textKn: "ತಕ್ಷಣ ಫೋನ್ ಕಟ್ ಮಾಡಿ, ಬ್ಯಾಂಕಿನ ಅಧಿಕೃತ ಸಂಖ್ಯೆಗೆ ಕರೆ ಮಾಡುವುದು.",
        isSafe: true,
        feedbackEn: "✅ CORRECT! Disconnecting and verifying via official phone numbers stops Vishing (Voice Phishing) attacks.",
        feedbackKn: "✅ ಸರಿಯಾದ ನಿರ್ಧಾರ! ಫೋನ್ ಕಟ್ ಮಾಡಿ ಬ್ಯಾಂಕನ್ನು ಸಂಪರ್ಕಿಸುವುದು ಸುರಕ್ಷಿತ ಕ್ರಮ."
      }
    ]
  },
  {
    id: "sc2",
    titleEn: "Scenario 2: The QR Code Buyer",
    titleKn: "ಸನ್ನಿವೇಶ 2: OLX ನಲ್ಲಿ ವಸ್ತು ಖರೀದಿಸುವ ನೆಪ",
    situationEn: "You posted your old laptop for sale online for ₹15,000. A buyer sends you a QR code on WhatsApp and says: 'Scan this QR code and enter your UPI PIN to receive your ₹15,000 payment.'",
    situationKn: "ನೀವು ಹಳೆಯ ಲ್ಯಾಪ್‌ಟಾಪ್ ಮಾರಾಟ ಮಾಡಲು ಜಾಹೀರಾತು ನೀಡಿದ್ದೀರಿ. ಖರೀದಿದಾರ WhatsApp ನಲ್ಲಿ QR Code ಕಳುಹಿಸಿ: 'ನಿಮಗೆ ₹15,000 ಹಣ ಬರಲು ಈ QR Scan ಮಾಡಿ UPI PIN ಹಾಕಿ' ಎನ್ನುತ್ತಾನೆ.",
    choices: [
      {
        textEn: "Scan the QR code and enter your UPI PIN to collect money.",
        textKn: "ಹಣ ಪಡೆಯಲು QR Scan ಮಾಡಿ UPI PIN ಹಾಕುವುದು.",
        isSafe: false,
        feedbackEn: "❌ DANGEROUS! Entering a UPI PIN always DEDUCTS money from your account. You NEVER enter a PIN to receive cash.",
        feedbackKn: "❌ ಅಪಾಯಕಾರಿ! UPI PIN ಹಾಕುವುದು ನಿಮ್ಮ ಖಾತೆಯಿಂದ ಹಣ ಕಡಿತಗೊಳಿಸಲು ಮಾತ್ರ, ಹಣ ಪಡೆಯಲು PIN ಅಗತ್ಯವಿಲ್ಲ!"
      },
      {
        textEn: "Refuse to scan and demand direct bank account transfer or cash on delivery.",
        textKn: "QR Scan ಮಾಡಲು ನಿರಾಕರಿಸಿ, ನೇರ ಬ್ಯಾಂಕ್ Transfer ಅಥವಾ ನಗದು ಕೇಳುವುದು.",
        isSafe: true,
        feedbackEn: "✅ CORRECT! Money sent to you arrives automatically without any PIN or QR scanning.",
        feedbackKn: "✅ ಸರಿಯಾದ ನಿರ್ಧಾರ! ನಿಮಗೆ ಯಾರಾದರೂ ಹಣ ಕಳುಹಿಸಿದರೆ ಅದು ಸ್ವಯಂಚಾಲಿತವಾಗಿ ಖಾತೆಗೆ ಜಮಾ ಆಗುತ್ತದೆ."
      }
    ]
  }
];

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    questionEn: "What is the primary purpose of entering your UPI PIN in a payment app like Google Pay or PhonePe?",
    questionKn: "Google Pay ಅಥವಾ PhonePe ಅಪ್ಲಿಕೇಶನ್‌ನಲ್ಲಿ UPI PIN ನಮೂದಿಸುವುದರ ಮುಖ್ಯ ಉದ್ದೇಶವೇನು?",
    optionsEn: [
      "To pay or deduct money from your account",
      "To receive money into your bank account",
      "To check your mobile network speed",
      "To verify your identity or attendance"
    ],
    optionsKn: [
      "ನಿಮ್ಮ ಖಾತೆಯಿಂದ ಹಣ ಪಾವತಿಸಲು (Deduct)",
      "ನಿಮ್ಮ ಖಾತೆಗೆ ಹಣ ಪಡೆದುಕೊಳ್ಳಲು (Receive)",
      "ನಿಮ್ಮ ಇಂಟರ್ನೆಟ್ ವೇಗ ಪರೀಕ್ಷಿಸಲು",
      "ನಿಮ್ಮ ಐಡಿ / ಹಾಜರಾತಿ ಪರೀಕ್ಷಿಸಲು"
    ],
    correctIndex: 0,
    explanationEn: "Entering a UPI PIN strictly authorizes money to leave your account. You NEVER enter a PIN to receive payments.",
    explanationKn: "UPI PIN ಹಾಕುವುದು ನಿಮ್ಮ ಖಾತೆಯಿಂದ ಹಣ ಕಳುಹಿಸಲು ಮಾತ್ರ. ಹಣ ಪಡೆಯಲು PIN ಅಗತ್ಯವಿಲ್ಲ."
  },
  {
    id: 2,
    questionEn: "If an email claims to be from Government Polytechnic Bantwal but the domain is 'gptbantwa1.com', what is this called?",
    questionKn: "ಇಮೇಲ್ 'Government Polytechnic Bantwal' ಎಂದು ಹೇಳಿಕೊಂಡರೂ ಅದರ ವೆಬ್‌ಸೈಟ್ 'gptbantwa1.com' ಎಂದಿದ್ದರೆ ಅದನ್ನು ಏನೆಂದು ಕರೆಯುತ್ತಾರೆ?",
    optionsEn: [
      "Official college server mirror",
      "Typosquatting Phishing Attack",
      "Government discount portal",
      "Encrypted secure backup site"
    ],
    optionsKn: [
      "ಕಾಲೇಜಿನ ಅಧಿಕೃತ ಸರ್ವರ್",
      "Typosquatting (ನಕಲಿ Phishing ಲಿಂಕ್)",
      "ಸರ್ಕಾರಿ ರಿಯಾಯಿತಿ ಪೋರ್ಟಲ್",
      "ಸುರಕ್ಷಿತ ಬ್ಯಾಕಪ್ ವೆಬ್‌ಸೈಟ್"
    ],
    correctIndex: 1,
    explanationEn: "Typosquatting substitutes lookalike letters (like '1' for 'l') to trick victims into believing a scam site is real.",
    explanationKn: "ನೈಜ ಪದಗಳಂತೆ ಕಾಣುವ ನಕಲಿ ಅಕ್ಷರಗಳನ್ನು ('l' ಬದಲು '1') ಬಳಸಿ ಜನರನ್ನು ವಂಚಿಸುವುದಕ್ಕೆ Typosquatting ಎನ್ನಲಾಗುತ್ತದೆ."
  },
  {
    id: 3,
    questionEn: "What should you do if someone claiming to be a police officer or bank director calls demanding immediate money transfer to avoid arrest?",
    questionKn: "ಪೊಲೀಸ್ ಅಥವಾ ಬ್ಯಾಂಕ್ ಮ್ಯಾನೇಜರ್ ಎಂದು ಹೇಳಿಕೊಳ್ಳುವ ವ್ಯಕ್ತಿ ಬಂಧನದಿಂದ ತಪ್ಪಿಸಿಕೊಳ್ಳಲು ತಕ್ಷಣ ಹಣ ಕಳುಹಿಸಿ ಎಂದರೆ ನೀವು ಏನು ಮಾಡಬೇಕು?",
    optionsEn: [
      "Immediately transfer money due to fear",
      "Share your Aadhaar and OTP to prove innocence",
      "Disconnect immediately, stay calm, and verify through official emergency contacts",
      "Forward the call to your friends"
    ],
    optionsKn: [
      "ಭಯದಿಂದ ತಕ್ಷಣ ಹಣ ಕಳುಹಿಸುವುದು",
      "ನಿರಪರಾಧಿ ಎಂದು ಸಾಬೀತುಪಡಿಸಲು OTP ನೀಡುವುದು",
      "ತಕ್ಷಣ ಫೋನ್ ಕಟ್ ಮಾಡಿ, ಶಾಂತವಾಗಿ ಅಧಿಕೃತ ಸಹಾಯವಾಣಿಗೆ ಸಂಪರ್ಕಿಸುವುದು",
      "ಕಲೆಯನ್ನು ಸ್ನೇಹಿತರಿಗೆ ಕಳುಹಿಸುವುದು"
    ],
    correctIndex: 2,
    explanationEn: "Scammers use Digital Arrest threats and fake panic. Real police forces do not demand money transfers over telephone calls.",
    explanationKn: "ಡಿಜಿಟಲ್ ಬಂಧನದ ಹೆಸರಿನಲ್ಲಿ ಹೆದರಿಸಿ ಹಣ ದೋಚುವುದು ವಂಚಕರ ತಂತ್ರ. ನೈಜ ಪೊಲೀಸರು ಫೋನ್‌ನಲ್ಲಿ ಹಣ ಕೇಳುವುದಿಲ್ಲ."
  },
  {
    id: 4,
    questionEn: "Why is connecting to open public Wi-Fi networks (e.g., at railway stations or cafes) without a VPN risky?",
    questionKn: "ಉಚಿತ Public Wi-Fi ಜಾಲಗಳಲ್ಲಿ (ರೈಲ್ವೆ ಸ್ಟೇಷನ್/ಕೆಫೆ) ಬ್ಯಾಂಕಿಂಗ್ ಮಾಡುವುದು ಏಕೆ ಅಪಾಯಕಾರಿ?",
    optionsEn: [
      "It drains your smartphone battery faster",
      "Attackers on the same network can intercept unencrypted login traffic (Man-In-The-Middle)",
      "Public Wi-Fi deletes your saved photos",
      "Public Wi-Fi reduces your mobile storage"
    ],
    optionsKn: [
      "ಅದು ಬ್ಯಾಟರಿ ಬೇಗ ಖಾಲಿ ಮಾಡುತ್ತದೆ",
      "ಅದೇ ನೆಟ್‌ವರ್ಕ್‌ನಲ್ಲಿರುವ ಹ್ಯಾಕರ್‌ಗಳು ನಿಮ್ಮ ಖಾಸಗಿ Data ಮತ್ತು Passwords ಕದಿಯಬಹುದು (Man-in-the-Middle)",
      "ಅದು ನಿಮ್ಮ ಫೋಟೋಗಳನ್ನು ಅಳಿಸಿಹಾಕುತ್ತದೆ",
      "ಅದು ಫೋನ್ ಸಂಗ್ರಹಣೆಯನ್ನು ಕಡಿಮೆ ಮಾಡುತ್ತದೆ"
    ],
    correctIndex: 1,
    explanationEn: "Unsecured public networks allow attackers on the same hotspot to capture unencrypted data packets transmitted by your device.",
    explanationKn: "ಸುರಕ್ಷಿತವಲ್ಲದ Public Wi-Fi ನಲ್ಲಿ ಹ್ಯಾಕರ್‌ಗಳು ನೀವು ಜಾಲತಾಣಗಳಲ್ಲಿ ನಮೂದಿಸುವ Passwords ಸುಲಭವಾಗಿ ಕದಿಯಬಹುದು."
  },
  {
    id: 5,
    questionEn: "Which of the following password habits provides the highest resistance against cyber attacks?",
    questionKn: "ಕೆಳಗಿನವುಗಳಲ್ಲಿ ಯಾವುದು ಸೈಬರ್ ದಾಳಿಗಳಿಂದ ಅತ್ಯಂತ ಸುರಕ್ಷಿತವಾದ Password ಅಭ್ಯಾಸವಾಗಿದೆ?",
    optionsEn: [
      "Using '12345678' because it's easy to remember",
      "Using your mobile number as the password for all accounts",
      "Using a long unique passphrase with letters, numbers & symbols, and enabling 2-Factor Authentication (2FA)",
      "Writing your password on a sticky note pasted on your screen"
    ],
    optionsKn: [
      "ನೆನಪಿಡಲು ಸುಲಭವಾದ '12345678' ಬಳಸುವುದು",
      "ಎಲ್ಲಾ Account ಗಳಿಗೂ ಮೊಬೈಲ್ ಸಂಖ್ಯೆಯನ್ನೇ Password ಮಾಡುವುದು",
      "ಅಕ್ಷರ, ಸಂಖ್ಯೆ, ಚಿಹ್ನೆಗಳಿರುವ ಉದ್ದನೆಯ ಕಠಿಣ Passphrase ಮತ್ತು 2-Factor Authentication (2FA) ಬಳಸುವುದು",
      "Screen ಮೇಲೆ ಬರೆದು ಅಂಟಿಸಿಡುವುದು"
    ],
    correctIndex: 2,
    explanationEn: "Strong passphrases combined with Two-Factor Authentication (2FA) stop over 99% of automated account takeover attempts.",
    explanationKn: "ಕಠಿಣ Passphrase ಮತ್ತು 2-Factor Authentication (2FA) ಬಳಕೆಯು 99% ಸೈಬರ್ ದಾಳಿಗಳನ್ನು ತಡೆಯುತ್ತದೆ."
  }
];
