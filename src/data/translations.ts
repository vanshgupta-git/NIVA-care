import { Language } from '../types';

export interface TranslationDictionary {
  appName: string;
  appSubtitle: string;
  gridStatus: string;
  campusEmergencyBtn: string;
  somethingHappened: string;
  showNivaSubtitle: string;
  showNivaBtn: string;
  describeBtn: string;
  describePlaceholder: string;
  locationLabel: string;
  selectLocation: string;
  customLocationPlaceholder: string;
  analyzeBtn: string;
  analyzingTitle: string;
  analyzingSubtitle: string;
  instantPresetsTitle: string;
  instantPresetsSubtitle: string;
  runDemoFlow: string;
  triageAssessment: string;
  severityLabels: {
    minor: string;
    minorAction: string;
    moderate: string;
    moderateAction: string;
    critical: string;
    criticalAction: string;
  };
  whyGuidance: string;
  protocolTitle: string;
  protocolSubtitle: string;
  stepOf: string;
  stepSeconds: string;
  stepMinutes: string;
  pause: string;
  resume: string;
  nextStep: string;
  prevStep: string;
  resetTimer: string;
  readStep: string;
  stopVoice: string;
  voiceActive: string;
  doNotTitle: string;
  doNotSubtitle: string;
  needHumanHelp: string;
  callDispensary: string;
  dispensaryDesc: string;
  callSecurity: string;
  securityDesc: string;
  call112: string;
  nationalDesc: string;
  sendCampusSos: string;
  whatsappSecurity: string;
  whatsappModalTitle: string;
  whatsappModalDesc: string;
  sendWhatsAppBtn: string;
  copyMessageBtn: string;
  copied: string;
  newAssessmentBtn: string;
  errorFallbackNotice: string;
  offlineNotice: string;
  installApp: string;
  installIOS: string;
  close: string;
  photoCaptured: string;
  removePhoto: string;
  takePhoto: string;
  uploadPhoto: string;
  dragDropPhoto: string;
  verifiedProtocolBadge: string;
  aiLiveAssessmentBadge: string;
  campusLocations: string[];
}

export const TRANSLATIONS: Record<Language, TranslationDictionary> = {
  en: {
    appName: 'NIVA',
    appSubtitle: 'AI CAMPUS SAFETY CO-PILOT',
    gridStatus: 'IIT / CAMPUS HEALTH GRID ONLINE',
    campusEmergencyBtn: 'CAMPUS EMERGENCY',
    somethingHappened: 'SOMETHING HAPPENED?',
    showNivaSubtitle: "Show NIVA what you're dealing with.",
    showNivaBtn: '📷 SHOW NIVA',
    describeBtn: '✎ DESCRIBE',
    describePlaceholder: 'Describe what happened (e.g. Acid splash on arm, student fainted, dog bite near canteen)...',
    locationLabel: 'CAMPUS LOCATION',
    selectLocation: 'Select location',
    customLocationPlaceholder: 'Enter custom room / building...',
    analyzeBtn: 'ANALYZE & GENERATE PROTOCOL',
    analyzingTitle: 'TRIAGING INCIDENT...',
    analyzingSubtitle: 'Applying campus clinical safety protocols & calculating emergency timeline',
    instantPresetsTitle: 'INSTANT CAMPUS INCIDENT PRESETS',
    instantPresetsSubtitle: 'Select a verified scenario to launch immediate 60-second procedural guidance:',
    runDemoFlow: 'LAUNCH PROTOCOL',
    triageAssessment: 'SAFETY ASSESSMENT',
    severityLabels: {
      minor: 'LOW',
      minorAction: 'DISPENSARY / SELF-CARE',
      moderate: 'MODERATE',
      moderateAction: 'HEALTH CENTRE TRANSFER',
      critical: 'CRITICAL',
      criticalAction: '112 + CAMPUS SOS'
    },
    whyGuidance: 'Why this guidance?',
    protocolTitle: '60-SECOND SAFETY PROTOCOL',
    protocolSubtitle: 'Execute each procedural step in strict sequence. Do not skip steps.',
    stepOf: 'STEP',
    stepSeconds: 'SEC',
    stepMinutes: 'MIN',
    pause: 'PAUSE',
    resume: 'RESUME',
    nextStep: 'NEXT STEP',
    prevStep: 'PREVIOUS',
    resetTimer: 'RESET TIMER',
    readStep: 'READ THIS STEP',
    stopVoice: 'STOP VOICE',
    voiceActive: 'NARRATING...',
    doNotTitle: 'DO NOT',
    doNotSubtitle: 'High-risk mistakes that worsen injuries — strictly prohibited:',
    needHumanHelp: 'NEED HUMAN HELP?',
    callDispensary: 'CAMPUS DISPENSARY',
    dispensaryDesc: 'First-aid and immediate medical assessment',
    callSecurity: 'CAMPUS SECURITY',
    securityDesc: 'Immediate safety response and quick transit',
    call112: '112 EMERGENCY',
    nationalDesc: 'National emergency ambulance response',
    sendCampusSos: 'SEND CAMPUS SOS',
    whatsappSecurity: 'WHATSAPP WARDEN / SECURITY',
    whatsappModalTitle: 'PRE-COMPOSED CAMPUS SOS',
    whatsappModalDesc: 'Ready-to-dispatch emergency broadcast with location, incident type, and active response status:',
    sendWhatsAppBtn: 'OPEN WHATSAPP & SEND',
    copyMessageBtn: 'COPY SOS TEXT',
    copied: 'COPIED TO CLIPBOARD',
    newAssessmentBtn: 'NEW INCIDENT ASSESSMENT',
    errorFallbackNotice: 'AI assessment is temporarily unavailable. Using verified campus safety protocol.',
    offlineNotice: 'Offline Mode active. Cached safety protocols and local speech runner are fully operational.',
    installApp: 'Install App',
    installIOS: 'Install on iOS',
    close: 'Close',
    photoCaptured: 'Photo attached for multimodal visual analysis',
    removePhoto: 'Remove photo',
    takePhoto: 'Use Camera',
    uploadPhoto: 'Upload Image',
    dragDropPhoto: 'Drag & drop incident photo, or click to capture',
    verifiedProtocolBadge: 'VERIFIED CAMPUS SAFETY PROTOCOL',
    aiLiveAssessmentBadge: 'GEMINI MULTIMODAL ASSESSMENT',
    campusLocations: [
      'Chemistry Lab — Lab Annex 3',
      'Hostel Wing B — 2nd Floor',
      'Near Main Canteen',
      'Sports Ground',
      'Central Workshop',
      'Main Academic Block — 1st Floor',
      'Hostel Wing A',
      'Library Complex',
      'Campus Main Gate'
    ]
  },
  hi: {
    appName: 'निवा (NIVA)',
    appSubtitle: 'एआई कैंपस सुरक्षा एवं आपातकालीन साथी',
    gridStatus: 'आईआईटी / कैंपस हेल्थ ग्रिड सक्रिय',
    campusEmergencyBtn: 'कैंपस इमरजेंसी',
    somethingHappened: 'कुछ आपातकाल हुआ?',
    showNivaSubtitle: 'निवा को दिखाएं कि क्या हुआ है।',
    showNivaBtn: '📷 निवा को दिखाएं',
    describeBtn: '✎ विवरण लिखें',
    describePlaceholder: 'बताएं क्या हुआ (उदा. हाथ पर एसिड गिर गया, छात्र बेहोश हो गया, कुत्ते ने काटा)...',
    locationLabel: 'कैंपस स्थान',
    selectLocation: 'स्थान चुनें',
    customLocationPlaceholder: 'कमरा / बिल्डिंग का नाम लिखें...',
    analyzeBtn: 'विश्लेषण करें व प्रोटोकॉल शुरू करें',
    analyzingTitle: 'जोखिम का विश्लेषण हो रहा है...',
    analyzingSubtitle: 'कैंपस आपातकालीन प्रोटोकॉल और 60-सेकंड टाइमलाइन तैयार की जा रही है',
    instantPresetsTitle: 'त्वरित कैंपस घटना प्रीसेट्स',
    instantPresetsSubtitle: 'तुरंत 60-सेकंड सुरक्षा प्रोटोकॉल देखने के लिए कोई भी परिदृश्य चुनें:',
    runDemoFlow: 'प्रोटोकॉल शुरू करें',
    triageAssessment: 'सुरक्षा मूल्यांकन (TRIAGE)',
    severityLabels: {
      minor: 'कम जोखिम (LOW)',
      minorAction: 'डिस्पेंसरी / प्राथमिक उपचार',
      moderate: 'मध्यम जोखिम (MODERATE)',
      moderateAction: 'हेल्थ सेंटर ट्रांसफर आवश्यक',
      critical: 'अति गंभीर (CRITICAL)',
      criticalAction: '112 + कैंपस एसओएस (SOS)'
    },
    whyGuidance: 'यह मार्गदर्शन क्यों दिया गया?',
    protocolTitle: '60-सेकंड सुरक्षा प्रोटोकॉल',
    protocolSubtitle: 'प्रत्येक चरण का क्रमवार पालन करें। किसी भी चरण को न छोड़ें।',
    stepOf: 'चरण',
    stepSeconds: 'सेकंड',
    stepMinutes: 'मिनट',
    pause: 'रोकें',
    resume: 'जारी रखें',
    nextStep: 'अगला चरण',
    prevStep: 'पिछला',
    resetTimer: 'टाइमर रीसेट',
    readStep: 'यह चरण बोलकर सुनाएं',
    stopVoice: 'आवाज रोकें',
    voiceActive: 'सुना रहा है...',
    doNotTitle: 'क्या न करें (DO NOT)',
    doNotSubtitle: 'वे गलतियां जिनसे नुकसान बढ़ सकता है — पूरी तरह वर्जित:',
    needHumanHelp: 'मानवीय सहायता चाहिए?',
    callDispensary: 'कैंपस डिस्पेंसरी',
    dispensaryDesc: 'प्राथमिक उपचार एवं डॉक्टर की सलाह',
    callSecurity: 'कैंपस सिक्योरिटी',
    securityDesc: 'तुरंत सुरक्षा दल और वाहन सहायता',
    call112: '112 राष्ट्रीय आपातकाल',
    nationalDesc: 'राष्ट्रीय आपातकालीन एम्बुलेंस सेवा',
    sendCampusSos: 'कैंपस एसओएस (SOS) भेजें',
    whatsappSecurity: 'वार्डन / सिक्योरिटी को व्हाट्सएप करें',
    whatsappModalTitle: 'तैयार कैंपस एसओएस संदेश',
    whatsappModalDesc: 'स्थान, घटना का प्रकार और वर्तमान स्थिति के साथ तैयार संदेश:',
    sendWhatsAppBtn: 'व्हाट्सएप खोलें और भेजें',
    copyMessageBtn: 'संदेश कॉपी करें',
    copied: 'कॉपी कर लिया गया',
    newAssessmentBtn: 'नई घटना का विश्लेषण',
    errorFallbackNotice: 'एआई सेवा अस्थायी रूप से अनुपलब्ध है। सत्यापित कैंपस प्रोटोकॉल का उपयोग किया जा रहा है।',
    offlineNotice: 'ऑफ़लाइन मोड सक्रिय। सभी स्थानीय सुरक्षा प्रोटोकॉल और वॉयस गाइड काम कर रहे हैं।',
    installApp: 'ऐप इंस्टॉल करें',
    installIOS: 'iOS पर इंस्टॉल करें',
    close: 'बंद करें',
    photoCaptured: 'छवि संलग्न की गई',
    removePhoto: 'छवि हटाएं',
    takePhoto: 'कैमरा उपयोग करें',
    uploadPhoto: 'फोटो अपलोड करें',
    dragDropPhoto: 'फोटो यहां खींचें या क्लिक करके चुनें',
    verifiedProtocolBadge: 'सत्यापित कैंपस सुरक्षा प्रोटोकॉल',
    aiLiveAssessmentBadge: 'जेमिनी मल्टीमॉडल मूल्यांकन',
    campusLocations: [
      'केमिस्ट्री लैब — लैब एनेक्स 3',
      'हॉस्टल विंग बी — दूसरी मंजिल',
      'मुख्य कैंटीन के पास',
      'स्पोर्ट्स ग्राउंड',
      'सेंट्रल वर्कशॉप',
      'मुख्य शैक्षणिक भवन — पहली मंजिल',
      'हॉस्टल विंग ए',
      'लाइब्रेरी परिसर',
      'कैंपस मेन गेट'
    ]
  },
  ta: {
    appName: 'நிவா (NIVA)',
    appSubtitle: 'AI வளாக பாதுகாப்பு & அவசர கால துணை',
    gridStatus: 'IIT / வளாக சுகாதார கட்டமைப்பு இணைப்பில் உள்ளது',
    campusEmergencyBtn: 'வளாக அவசர உதவி',
    somethingHappened: 'ஏதாவது அசம்பாவிதம் நிகழ்ந்ததா?',
    showNivaSubtitle: 'என்ன நடந்தது என்பதை நிவாவிடம் காட்டுங்கள்.',
    showNivaBtn: '📷 நிவாவிடம் காட்டுங்கள்',
    describeBtn: '✎ விவரிக்கவும்',
    describePlaceholder: 'என்ன நடந்தது என விவரிக்கவும் (எ.கா. கையில் ஆசிட் கொட்டியது, மயங்கி விழுந்தார், நாய் கடி)...',
    locationLabel: 'வளாக இடம்',
    selectLocation: 'இடத்தை தேர்வு செய்க',
    customLocationPlaceholder: 'அறை அல்லது கட்டிட பெயர்...',
    analyzeBtn: 'ஆய்வு செய்து வழிகாட்டுதலைப் பெறுக',
    analyzingTitle: 'அவசர நிலை பகுப்பாய்வு செய்யப்படுகிறது...',
    analyzingSubtitle: 'வளாக மருத்துவ பாதுகாப்பு நெறிமுறை & 60 வினாடி காலக்கெடு உருவாக்கப்படுகிறது',
    instantPresetsTitle: 'உடனடி வளாக அவசர முன்னமைவுகள்',
    instantPresetsSubtitle: '60 வினாடி வழிகாட்டுதலை உடனடியாக தொடங்க ஏதேனும் ஒரு சம்பவத்தை தேர்ந்தெடுக்கவும்:',
    runDemoFlow: 'நெறிமுறையை தொடங்கு',
    triageAssessment: 'பாதுகாப்பு மதிப்பீடு',
    severityLabels: {
      minor: 'குறைந்த ஆபத்து',
      minorAction: 'மருந்தகம் / சுய பாதுகாப்பு',
      moderate: 'நடுத்தர ஆபத்து',
      moderateAction: 'சுகாதார மைய பரிசோதனை தேவை',
      critical: 'மிக தீவிர ஆபத்து',
      criticalAction: '112 + வளாக அவசர SOS'
    },
    whyGuidance: 'இந்த வழிகாட்டுதலுக்கான காரணம்?',
    protocolTitle: '60-வினாடி பாதுகாப்பு நெறிமுறை',
    protocolSubtitle: 'ஒவ்வொரு செயலையும் வரிசையாக செய்யவும். எந்த படியையும் தவிர்க்காதீர்கள்.',
    stepOf: 'படி',
    stepSeconds: 'விநாடிகள்',
    stepMinutes: 'நிமிடங்கள்',
    pause: 'நிறுத்து',
    resume: 'தொடரவும்',
    nextStep: 'அடுத்த படி',
    prevStep: 'முந்தைய',
    resetTimer: 'நேரத்தை மீட்டமை',
    readStep: 'இதை வாசித்து காட்டு',
    stopVoice: 'குரலை நிறுத்து',
    voiceActive: 'வாசிக்கிறது...',
    doNotTitle: 'செய்யக் கூடாதவை (DO NOT)',
    doNotSubtitle: 'பாதிப்பை தீவிரமாக்கும் ஆபத்தான தவறுகள் — முற்றிலும் தடை செய்யப்பட்டுள்ளது:',
    needHumanHelp: 'நேரடி மனித உதவி தேவையா?',
    callDispensary: 'வளாக மருந்தகம்',
    dispensaryDesc: 'முதலுதவி மற்றும் அவசர மருத்துவ பரிசோதனை',
    callSecurity: 'வளாக பாதுகாப்பு பிரிவு',
    securityDesc: 'உடனடி பாதுகாப்பு உதவி மற்றும் வாகனம்',
    call112: '112 அவசர உதவி',
    nationalDesc: 'தேசிய அவசர ஆம்புலன்ஸ் சேவை',
    sendCampusSos: 'வளாக SOS அனுப்பவும்',
    whatsappSecurity: 'வார்டன் / பாதுகாப்பு பிரிவுக்கு வாட்ஸ்அப்',
    whatsappModalTitle: 'முன் தயாரிக்கப்பட்ட வளாக SOS',
    whatsappModalDesc: 'இடம், சம்பவம் மற்றும் தற்போதைய நிலை குறித்த அவசர செய்தி:',
    sendWhatsAppBtn: 'வாட்ஸ்அப் திறந்து அனுப்பவும்',
    copyMessageBtn: 'உரையை நகலெடுக்கவும்',
    copied: 'நகலெடுக்கப்பட்டது',
    newAssessmentBtn: 'புதிய சம்பவ மதிப்பீடு',
    errorFallbackNotice: 'AI சேவை தற்போது கிடைக்கவில்லை. சரிபார்க்கப்பட்ட வளாக நெறிமுறை பயன்படுத்தப்படுகிறது.',
    offlineNotice: 'ஆஃப்லைன் முறை செயலில் உள்ளது. அனைத்து பாதுகாப்பு நெறிமுறைகளும் இயங்குகின்றன.',
    installApp: 'செயலியை நிறுவுக',
    installIOS: 'iOS இல் நிறுவுக',
    close: 'மூடுக',
    photoCaptured: 'படம் இணைக்கப்பட்டுள்ளது',
    removePhoto: 'படத்தை நீக்கு',
    takePhoto: 'கேமராவை பயன்படுத்துக',
    uploadPhoto: 'படத்தை பதிவேற்றுக',
    dragDropPhoto: 'படத்தை இங்கே இழுத்து விடவும்',
    verifiedProtocolBadge: 'சரிபார்க்கப்பட்ட வளாக பாதுகாப்பு நெறிமுறை',
    aiLiveAssessmentBadge: 'ஜெமினி மல்டிமாடல் மதிப்பீடு',
    campusLocations: [
      'வேதியியல் ஆய்வகம் — லேப் இணைப்பு 3',
      'விடுதி பிரிவு பி — 2வது தளம்',
      'பிரதான கேண்டீன் அருகில்',
      'விளையாட்டு மைதானம்',
      'மத்திய பணிமனை (Workshop)',
      'கல்வி வளாகம் — 1வது தளம்',
      'விடுதி பிரிவு ஏ',
      'நூலக வளாகம்',
      'வளாக பிரதான நுழைவாயில்'
    ]
  },
  te: {
    appName: 'నివా (NIVA)',
    appSubtitle: 'AI క్యాంపస్ భద్రత మరియు అత్యవసర కో-పైలట్',
    gridStatus: 'IIT / క్యాంపస్ హెల్త్ గ్రిడ్ ఆన్‌లైన్',
    campusEmergencyBtn: 'క్యాంపస్ ఎమర్జెన్సీ',
    somethingHappened: 'ఏదైనా ప్రమాదం జరిగిందా?',
    showNivaSubtitle: 'ఏం జరిగిందో నివాకి చూపించండి.',
    showNivaBtn: '📷 నివాకి చూపించండి',
    describeBtn: '✎ వివరించండి',
    describePlaceholder: 'ఏం జరిగిందో రాయండి (ఉదా. చేతిపై యాసిడ్ పడింది, విద్యార్థి స్పృహతప్పి పడ్డాడు, కుక్క కాటు)...',
    locationLabel: 'క్యాంపస్ ప్రదేశం',
    selectLocation: 'ప్రదేశాన్ని ఎంచుకోండి',
    customLocationPlaceholder: 'గది లేదా భవనం పేరు రాయండి...',
    analyzeBtn: 'విశ్లేషించి ప్రోటోకాల్ ప్రారంభించండి',
    analyzingTitle: 'పరిస్థితిని విశ్లేషిస్తున్నారు...',
    analyzingSubtitle: 'క్యాంపస్ క్లినికల్ సేఫ్టీ ప్రోటోకాల్ & 60-సెకన్ల సమయ పట్టిక సిద్ధమవుతోంది',
    instantPresetsTitle: 'తక్షణ క్యాంపస్ ప్రమాద నమూనాలు',
    instantPresetsSubtitle: '60-సెకన్ల భద్రతా మార్గదర్శకాలను వెంటనే ప్రారంభించడానికి ఎంచుకోండి:',
    runDemoFlow: 'ప్రోటోకాల్ ప్రారంభించు',
    triageAssessment: 'భద్రతా నిర్ధారణ (TRIAGE)',
    severityLabels: {
      minor: 'తక్కువ ప్రమాదం',
      minorAction: 'డిస్పెన్సరీ / ప్రాథమిక చికిత్స',
      moderate: 'మధ్యస్థ ప్రమాదం',
      moderateAction: 'హెల్త్ సెంటర్ బదిలీ అవసరం',
      critical: 'తీవ్ర ప్రమాదం',
      criticalAction: '112 + క్యాంపస్ SOS అలర్ట్'
    },
    whyGuidance: 'ఈ మార్గదర్శకం ఎందుకు?',
    protocolTitle: '60-సెకన్ల భద్రతా ప్రోటోకాల్',
    protocolSubtitle: 'ప్రతి చర్యను వరుస క్రమంలో పాటించండి. దేనినీ దాటవేయవద్దు.',
    stepOf: 'దశ',
    stepSeconds: 'సెకన్లు',
    stepMinutes: 'నిమిషాలు',
    pause: 'ఆపు',
    resume: 'కొనసాగించు',
    nextStep: 'తర్వాతి దశ',
    prevStep: 'మునుపటి',
    resetTimer: 'రీసెట్ టైమర్',
    readStep: 'ఈ దశను చదివి వినిపించు',
    stopVoice: 'వాయిస్ ఆపు',
    voiceActive: 'వినిపిస్తోంది...',
    doNotTitle: 'చేయకూడనివి (DO NOT)',
    doNotSubtitle: 'గాయాన్ని మరింత తీవ్రం చేసే ప్రమాదకరమైన తప్పులు — ఖచ్చితంగా నిషిద్ధం:',
    needHumanHelp: 'ప్రత్యక్ష మానవ సహాయం కావాలా?',
    callDispensary: 'క్యాంపస్ డిస్పెన్సరీ',
    dispensaryDesc: 'ప్రాథమిక చికిత్స మరియు వైద్యుల పర్యవేక్షణ',
    callSecurity: 'క్యాంపస్ సెక్యూరిటీ',
    securityDesc: 'తక్షణ భద్రతా స్పందన మరియు వాహనం',
    call112: '112 ఎమర్జెన్సీ',
    nationalDesc: 'జాతీయ అత్యవసర అంబులెన్స్ సేవ',
    sendCampusSos: 'క్యాంపస్ SOS పంపండి',
    whatsappSecurity: 'వార్డెన్ / సెక్యూరిటీకి వాట్సాప్',
    whatsappModalTitle: 'సిద్ధంగా ఉన్న క్యాంపస్ SOS సందేశం',
    whatsappModalDesc: 'ప్రదేశం, ప్రమాద రకం మరియు ప్రస్తుత స్థితితో కూడిన అత్యవసర సందేశం:',
    sendWhatsAppBtn: 'వాట్సాప్ ఓపెన్ చేసి పంపండి',
    copyMessageBtn: 'సందేశాన్ని కాపీ చేయండి',
    copied: 'కాపీ చేయబడింది',
    newAssessmentBtn: 'కొత్త ప్రమాద విశ్లేషణ',
    errorFallbackNotice: 'AI సేవ తాత్కాలికంగా అందుబాటులో లేదు. ధృవీకరించబడిన ప్రోటోకాల్ ఉపయోగించబడుతోంది.',
    offlineNotice: 'ఆఫ్‌లైన్ మోడ్ సక్రియంగా ఉంది. స్థానిక భద్రతా ప్రోటోకాల్స్ పనిచేస్తున్నాయి.',
    installApp: 'యాప్‌ను ఇన్‌స్టాల్ చేయండి',
    installIOS: 'iOS లో ఇన్‌స్టాల్ చేయండి',
    close: 'మూసివేయి',
    photoCaptured: 'ఫోటో జతచేయబడింది',
    removePhoto: 'ఫోటో తొలగించు',
    takePhoto: 'కెమెరా వాడండి',
    uploadPhoto: 'ఫోటో అప్‌లోడ్ చేయండి',
    dragDropPhoto: 'ఫోటోను ఇక్కడ లాగి వదలండి',
    verifiedProtocolBadge: 'ధృవీకరించబడిన క్యాంపస్ సేఫ్టీ ప్రోటోకాల్',
    aiLiveAssessmentBadge: 'జెమిని మల్టీమోడల్ విశ్లేషణ',
    campusLocations: [
      'రసాయన శాస్త్ర ప్రయోగశాల — ల్యాబ్ అనెక్స్ 3',
      'హాస్టల్ వింగ్ బి — 2వ అంతస్తు',
      'ప్రధాన క్యాంటీన్ సమీపంలో',
      'క్రీడా మైదానం',
      'సెంట్రల్ వర్క్‌షాప్',
      'ప్రధాన విద్యా భవనం — 1వ అంతస్తు',
      'హాస్టల్ వింగ్ ఎ',
      'లైబ్రరీ భవనం',
      'క్యాంపస్ మెయిన్ గేట్'
    ]
  }
};
