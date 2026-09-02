import { IncidentPreset, SafetyAssessment } from '../types';

export const INCIDENT_PRESETS: IncidentPreset[] = [
  {
    id: 'acid-splash',
    code: 'PRESET 01',
    title: 'CHEMISTRY LAB ACID SPLASH',
    descriptionSnippet: 'H₂SO₄ spill on forearm',
    location: 'Lab Annex 3',
    iconType: 'chemistry',
    data: {
      en: {
        hazard_type: 'Chemical exposure / acid burn',
        severity: 'critical',
        campus_context: 'Chemistry Lab — Lab Annex 3',
        why_guidance: 'NIVA identified concentrated acid contact requiring immediate, high-volume irrigation to halt dermal chemical destruction and systemic toxicity.',
        do_not_rules: [
          'Do NOT rub the affected area.',
          'Do NOT attempt to neutralize the chemical with another substance.',
          'Do NOT apply creams, toothpaste, ghee or other home remedies.'
        ],
        steps: [
          {
            title: 'Move away from the spill',
            duration_seconds: 10,
            action_detail: 'Move to a safe area while avoiding further contact with the chemical.'
          },
          {
            title: 'Start continuous water flushing',
            duration_seconds: 900,
            action_detail: 'Flush the affected skin with copious running tap water.'
          },
          {
            title: 'Remove contaminated clothing',
            duration_seconds: 30,
            action_detail: 'Carefully remove contaminated clothing while continuing to avoid spreading the chemical.'
          },
          {
            title: 'Get medical assessment',
            duration_seconds: 60,
            action_detail: 'Contact the campus dispensary or emergency medical service.'
          }
        ],
        whatsapp_message: '🚨 CAMPUS EMERGENCY ALERT 🚨\n📍 Location: Lab Annex 3\n⚠️ Incident: Chemical exposure / acid burn\n🩹 Immediate Action: Continuous water flushing underway\n🚑 Action Needed: Campus medical response required'
      },
      hi: {
        hazard_type: 'रासायनिक रिसाव / एसिड बर्न (तेजाब का संपर्क)',
        severity: 'critical',
        campus_context: 'केमिस्ट्री लैब — लैब एनेक्स 3',
        why_guidance: 'निवा ने सांद्र एसिड संपर्क की पहचान की है जिसमें त्वचा को क्षति से बचाने के लिए तत्काल निरंतर जल प्रवाह आवश्यक है।',
        do_not_rules: [
          'प्रभावित त्वचा को बिल्कुल न रगड़ें।',
          'केमिकल को किसी अन्य पदार्थ (क्षार/साबुन) से खुद बेअसर करने की कोशिश न करें।',
          'क्रीम, टूथपेस्ट, घी या कोई अन्य घरेलू उपचार न लगाएं।'
        ],
        steps: [
          {
            title: 'रिसाव स्थल से तुरंत दूर हटें',
            duration_seconds: 10,
            action_detail: 'सुरक्षित स्थान पर जाएं और केमिकल के आगे संपर्क से बचें।'
          },
          {
            title: 'लगातार बहते पानी से धोना शुरू करें',
            duration_seconds: 900,
            action_detail: 'प्रभावित त्वचा को नल के ठंडे बहते पानी से कम से कम 15 मिनट तक लगातार धोएं।'
          },
          {
            title: 'दूषित कपड़े सावधानी से उतारें',
            duration_seconds: 30,
            action_detail: 'केमिकल को शरीर के अन्य हिस्सों पर फैलने से बचाते हुए दूषित कपड़े उतारें।'
          },
          {
            title: 'चिकित्सा सहायता प्राप्त करें',
            duration_seconds: 60,
            action_detail: 'कैंपस डिस्पेंसरी या आपातकालीन चिकित्सा सेवा को तुरंत सूचित करें।'
          }
        ],
        whatsapp_message: '🚨 कैंपस आपातकालीन चेतावनी 🚨\n📍 स्थान: लैब एनेक्स 3\n⚠️ घटना: रासायनिक रिसाव / एसिड बर्न\n🩹 तत्काल कार्रवाई: लगातार पानी से धुलाई जारी है\n🚑 आवश्यक सहायता: कैंपस मेडिकल टीम की तुरंत जरूरत है'
      },
      ta: {
        hazard_type: 'இரசாயன காயம் / அமில தீக்காயம்',
        severity: 'critical',
        campus_context: 'வேதியியல் ஆய்வகம் — லேப் இணைப்பு 3',
        why_guidance: 'அமில பாதிப்பு கண்டறியப்பட்டுள்ளது. தோல் சேதத்தைத் தடுக்க உடனடியாக ஓடும் நீரில் தொடர்ந்து கழுவ வேண்டும்.',
        do_not_rules: [
          'பாதிக்கப்பட்ட பகுதியை தேய்க்க வேண்டாம்.',
          'வேதியியல் பொருளை நீங்களாகவே நடுநிலையாக்க முயற்சிக்க வேண்டாம்.',
          'கிரீம், பற்பசை, நெய் போன்ற வீட்டு வைத்தியங்களைப் பயன்படுத்த வேண்டாம்.'
        ],
        steps: [
          {
            title: 'பாதிக்கப்பட்ட இடத்திலிருந்து விலகிச் செல்லுங்கள்',
            duration_seconds: 10,
            action_detail: 'இரசாயனத்துடன் கூடுதல் தொடர்பு ஏற்படுவதைத் தவிர்த்து பாதுகாப்பான இடத்திற்கு செல்லுங்கள்.'
          },
          {
            title: 'தொடர்ந்து ஓடும் நீரில் கழுவுங்கள்',
            duration_seconds: 900,
            action_detail: 'பாதிக்கப்பட்ட சருமத்தை ஓடும் குழாய் நீரில் 15 நிமிடங்கள் இடைவிடாமல் கழுவுங்கள்.'
          },
          {
            title: 'மாசுபட்ட ஆடைகளை அகற்றுங்கள்',
            duration_seconds: 30,
            action_detail: 'இரசாயனம் பரவாமல் கவனமாக பாதிக்கப்பட்ட ஆடைகளை அகற்றவும்.'
          },
          {
            title: 'மருத்துவ உதவியை அணுகுங்கள்',
            duration_seconds: 60,
            action_detail: 'வளாக மருந்தகம் அல்லது அவசர மருத்துவ சேவையை உடனடியாக தொடர்பு கொள்ளுங்கள்.'
          }
        ],
        whatsapp_message: '🚨 வளாக அவசர எச்சரிக்கை 🚨\n📍 இடம்: லேப் இணைப்பு 3\n⚠️ சம்பவம்: இரசாயன அமில காயம்\n🩹 உடனடி நடவடிக்கை: தொடர்ந்து நீரில் கழுவப்படுகிறது\n🚑 தேவை: வளாக ஆம்புலன்ஸ் மற்றும் மருத்துவ உதவி'
      },
      te: {
        hazard_type: 'రసాయన స్పర్శ / యాసిడ్ కాలిన గాయం',
        severity: 'critical',
        campus_context: 'రసాయన శాస్త్ర ప్రయోగశాల — ల్యాబ్ అనెక్స్ 3',
        why_guidance: 'గాఢ యాసిడ్ స్పర్శను నివా గుర్తించింది. చర్మ రక్షణ కోసం వెంటనే ధారాళమైన నీటితో కడగడం తప్పనిసరి.',
        do_not_rules: [
          'బాధిత భాగాన్ని ఎట్టి పరిస్థితుల్లోనూ రుద్దవద్దు.',
          'రసాయనాన్ని ఇతర పదార్థాలతో మీరే న్యూట్రలైజ్ చేయడానికి ప్రయత్నించవద్దు.',
          'క్రీములు, టూత్‌పేస్ట్, నెయ్యి లేదా ఇతర ఇంటి చిట్కాలను రాయవద్దు.'
        ],
        steps: [
          {
            title: 'ప్రమాద స్థలం నుండి దూరంగా వెళ్ళండి',
            duration_seconds: 10,
            action_detail: 'రసాయనంతో మరింత సంబంధం లేకుండా సురక్షితమైన ప్రదేశానికి వెళ్ళండి.'
          },
          {
            title: 'ధారగా వచ్చే నీటితో కడగడం ప్రారంభించండి',
            duration_seconds: 900,
            action_detail: 'బాధిత చర్మాన్ని కుళాయి నీటి కింద కనీసం 15 నిమిషాల పాటు కడగండి.'
          },
          {
            title: 'కలుషితమైన దుస్తులను తొలగించండి',
            duration_seconds: 30,
            action_detail: 'రసాయనం ఇతర శరీర భాగాలకు అంటకుండా దుస్తులను జాగ్రత్తగా విప్పండి.'
          },
          {
            title: 'వైద్య సహాయం పొందండి',
            duration_seconds: 60,
            action_detail: 'క్యాంపస్ డిస్పెన్సరీ లేదా అత్యవసర వైద్య విభాగానికి సమాచారం అందించండి.'
          }
        ],
        whatsapp_message: '🚨 క్యాంపస్ అత్యవసర హెచ్చరిక 🚨\n📍 ప్రదేశం: ల్యాబ్ అనెక్స్ 3\n⚠️ సంఘటన: కెమికల్ యాసిడ్ బర్న్\n🩹 తక్షణ చర్య: నిరంతర నీటి ప్రవాహంతో కడుగుతున్నారు\n🚑 అవసరం: క్యాంపస్ అత్యవసర వైద్య స్పందన'
      }
    }
  },
  {
    id: 'immersion-rod',
    code: 'PRESET 02',
    title: 'HOSTEL IMMERSION ROD SCALD',
    descriptionSnippet: 'Electric immersion rod incident',
    location: 'Hostel Wing B · 2nd Floor',
    iconType: 'electrical',
    data: {
      en: {
        hazard_type: 'Electrical burn / thermal scald',
        severity: 'moderate',
        campus_context: 'Hostel Wing B — 2nd Floor',
        why_guidance: 'NIVA detected electrical thermal injury requiring safe power isolation followed by prolonged ambient cooling.',
        do_not_rules: [
          'Do NOT touch an electrical source with wet hands.',
          'Do NOT reconnect the immersion rod.',
          'Do NOT apply toothpaste, ghee or ice directly to a burn.'
        ],
        steps: [
          {
            title: 'Switch off the power safely',
            duration_seconds: 20,
            action_detail: 'Move away from the electrical source and switch off power only if it can be done safely.'
          },
          {
            title: 'Cool the burn',
            duration_seconds: 600,
            action_detail: 'Cool the affected area under cool running water.'
          },
          {
            title: 'Protect the affected area',
            duration_seconds: 30,
            action_detail: 'Keep the area clean and protected while waiting for medical assessment.'
          }
        ],
        whatsapp_message: '🚨 CAMPUS HEALTH ALERT 🚨\n📍 Location: Hostel Wing B — 2nd Floor\n⚠️ Incident: Electrical / thermal injury\n🩹 Immediate Action: Power isolated and burn cooling underway\n🏥 Action Needed: Campus medical assessment'
      },
      hi: {
        hazard_type: 'विद्युत बर्न / थर्मल स्कैल्ड (गर्म पानी की छड़ से चोट)',
        severity: 'moderate',
        campus_context: 'हॉस्टल विंग बी — दूसरी मंजिल',
        why_guidance: 'निवा ने विद्युत तापीय चोट की पहचान की है जिसमें पहले पावर कट और फिर प्रभावित अंग को ठंडा करना जरूरी है।',
        do_not_rules: [
          'गीले हाथों से बिजली के उपकरण या स्विच को बिल्कुल न छुएं।',
          'इमर्शन रॉड को दोबारा चालू करने की कोशिश न करें।',
          'जले हुए स्थान पर टूथपेस्ट, घी या बर्फ सीधे न लगाएं।'
        ],
        steps: [
          {
            title: 'बिजली का स्विच सुरक्षित रूप से बंद करें',
            duration_seconds: 20,
            action_detail: 'बिजली के स्रोत से दूर रहें और सुरक्षित होने पर ही मुख्य स्विच बंद करें।'
          },
          {
            title: 'जले हुए स्थान को ठंडा करें',
            duration_seconds: 600,
            action_detail: 'प्रभावित हिस्से पर 10 मिनट तक सामान्य ठंडा बहता पानी डालें।'
          },
          {
            title: 'प्रभावित क्षेत्र को सुरक्षित रखें',
            duration_seconds: 30,
            action_detail: 'घाव को साफ व ढीले सूती कपड़े से ढकें और मेडिकल जांच का इंतजार करें।'
          }
        ],
        whatsapp_message: '🚨 कैंपस स्वास्थ्य चेतावनी 🚨\n📍 स्थान: हॉस्टल विंग बी — दूसरी मंजिल\n⚠️ घटना: इमर्शन रॉड बर्न / तापीय चोट\n🩹 तत्काल कार्रवाई: बिजली बंद व पानी से ठंडक दी जा रही है\n🏥 आवश्यक सहायता: डिस्पेंसरी डॉक्टर की जांच'
      },
      ta: {
        hazard_type: 'மின்சார தீக்காயம் / வெப்ப காயம்',
        severity: 'moderate',
        campus_context: 'விடுதி பிரிவு பி — 2வது தளம்',
        why_guidance: 'மின் வெப்ப காயம் கண்டறியப்பட்டுள்ளது. மின்சாரத்தை உடனடியாக துண்டித்து சருமத்தை குளிர்விக்க வேண்டும்.',
        do_not_rules: [
          'ஈரமான கைகளால் மின் இணைப்பைத் தொடாதீர்கள்.',
          'ராடை மீண்டும் இயக்க முயற்சிக்காதீர்கள்.',
          'பற்பசை, நெய் அல்லது பனிக்கட்டியை நேரடியாக வைக்க வேண்டாம்.'
        ],
        steps: [
          {
            title: 'மின்சாரத்தை பாதுகாப்பாக அணைக்கவும்',
            duration_seconds: 20,
            action_detail: 'மின்சார மூலத்திலிருந்து விலகி, பாதுகாப்பாக இருந்தால் மட்டும் சுவிட்சை அணைக்கவும்.'
          },
          {
            title: 'தீக்காயத்தை குளிர்விக்கவும்',
            duration_seconds: 600,
            action_detail: 'குளிர்ந்த ஓடும் நீரில் 10 நிமிடங்கள் வரை பாதிக்கப்பட்ட பகுதியை வைக்கவும்.'
          },
          {
            title: 'பாதிக்கப்பட்ட பகுதியை பாதுகாக்கவும்',
            duration_seconds: 30,
            action_detail: 'மருத்துவ உதவி வரும் வரை பகுதியை சுத்தமாக வைத்திருக்கவும்.'
          }
        ],
        whatsapp_message: '🚨 வளாக சுகாதார எச்சரிக்கை 🚨\n📍 இடம்: விடுதி பிரிவு பி — 2வது தளம்\n⚠️ சம்பவம்: மின்சார தீக்காயம்\n🩹 உடனடி நடவடிக்கை: மின்சாரம் துண்டிக்கப்பட்டு குளிர்விக்கப்படுகிறது\n🏥 தேவை: வளாக மருத்துவ பரிசோதனை'
      },
      te: {
        hazard_type: 'విద్యుత్ కాలిన గాయం / ఉష్ణ గాయం',
        severity: 'moderate',
        campus_context: 'హాస్టల్ వింగ్ బి — 2వ అంతస్తు',
        why_guidance: 'విద్యుత్ ఉష్ణ గాయం గుర్తించబడింది. మొదట కరెంటు సరఫరాను ఆపి, ఆపై ప్రవహించే నీటితో చల్లబరచాలి.',
        do_not_rules: [
          'తడి చేతులతో విద్యుత్ స్విచ్ లేదా రాడ్ తాకవద్దు.',
          'ఇమ్మర్షన్ రాడ్‌ను మళ్లీ ప్లగ్ చేయవద్దు.',
          'టూత్‌పేస్ట్, నెయ్యి లేదా మంచు గడ్డలను నేరుగా గాయంపై పెట్టవద్దు.'
        ],
        steps: [
          {
            title: 'విద్యుత్ సరఫరాను సురక్షితంగా ఆపండి',
            duration_seconds: 20,
            action_detail: 'విద్యుత్ వనరు నుండి దూరంగా జరిగి మెయిన్ స్విచ్ ఆఫ్ చేయండి.'
          },
          {
            title: 'గాయాన్ని చల్లబరచండి',
            duration_seconds: 600,
            action_detail: 'చల్లటి నీటి ధార కింద గాయాన్ని 10 నిమిషాలు ఉంచండి.'
          },
          {
            title: 'గాయాన్ని సురక్షితంగా ఉంచండి',
            duration_seconds: 30,
            action_detail: 'వైద్య పరీక్షల కోసం వేచి ఉండే సమయంలో గాయంపై దుమ్ము పడకుండా చూడండి.'
          }
        ],
        whatsapp_message: '🚨 క్యాంపస్ ఆరోగ్య హెచ్చరిక 🚨\n📍 ప్రదేశం: హాస్టల్ వింగ్ బి — 2వ అంతస్తు\n⚠️ సంఘటన: విద్యుత్ హీటర్ గాయం\n🩹 తక్షణ చర్య: విద్యుత్ ఆపి నీటితో చల్లబరుస్తున్నారు\n🏥 అవసరం: క్యాంపస్ మెడికల్ చెకప్'
      }
    }
  },
  {
    id: 'dog-bite',
    code: 'PRESET 03',
    title: 'STRAY DOG SCRATCH / BITE',
    descriptionSnippet: 'Possible bite or scratch',
    location: 'Near Main Canteen',
    iconType: 'animal',
    data: {
      en: {
        hazard_type: 'Animal bite / rabies exposure risk',
        severity: 'moderate',
        campus_context: 'Near Main Canteen',
        why_guidance: 'NIVA identified potential rabies exposure vector. Immediate mechanical washing with soap and water removes infectious viral load prior to urgent PEP assessment.',
        do_not_rules: [
          'Do NOT ignore even a minor bite or scratch.',
          'Do NOT apply chilli, toothpaste, ghee or other irritants.',
          'Do NOT delay professional medical assessment.'
        ],
        steps: [
          {
            title: 'Wash the wound',
            duration_seconds: 600,
            action_detail: 'Wash thoroughly with soap and running water for about 10 minutes.'
          },
          {
            title: 'Avoid covering contamination',
            duration_seconds: 30,
            action_detail: 'Do not apply irritants or home remedies to the wound.'
          },
          {
            title: 'Contact the campus dispensary',
            duration_seconds: 60,
            action_detail: 'Seek medical assessment promptly for wound care and rabies post-exposure guidance.'
          }
        ],
        whatsapp_message: '🚨 CAMPUS HEALTH ALERT 🚨\n📍 Location: Near Main Canteen\n⚠️ Incident: Dog scratch / bite\n🩹 Immediate Action: Wound washing underway\n🏥 Action Needed: Medical assessment and rabies PEP evaluation'
      },
      hi: {
        hazard_type: 'जानवर का काटना / रेबीज का जोखिम',
        severity: 'moderate',
        campus_context: 'मुख्य कैंटीन के पास',
        why_guidance: 'निवा ने संभावित रेबीज जोखिम की पहचान की है। वायरस के प्रभाव को खत्म करने के लिए साबुन और पानी से 10 मिनट तक तुरंत धोना आवश्यक है।',
        do_not_rules: [
          'हल्के खरोंच या छोटे घाव को भी बिल्कुल अनदेखा न करें।',
          'घाव पर मिर्च, हल्दी, टूथपेस्ट, घी या चूना न लगाएं।',
          'पेशेवर डॉक्टर और एंटी-रेबीज इंजेक्शन में देरी न करें।'
        ],
        steps: [
          {
            title: 'घाव को अच्छी तरह धोएं',
            duration_seconds: 600,
            action_detail: 'साबुन और तेज बहते पानी से कम से कम 10 मिनट तक घाव को अच्छी तरह धोएं।'
          },
          {
            title: 'कोई भी घरेलू नुस्खा न लगाएं',
            duration_seconds: 30,
            action_detail: 'घाव पर कोई जलन पैदा करने वाली वस्तु या पट्टी कसकर न बांधें।'
          },
          {
            title: 'कैंपस डिस्पेंसरी से संपर्क करें',
            duration_seconds: 60,
            action_detail: 'रेबीज टीकाकरण (PEP) और टिटनेस शॉट के लिए तुरंत डिस्पेंसरी जाएं।'
          }
        ],
        whatsapp_message: '🚨 कैंपस स्वास्थ्य चेतावनी 🚨\n📍 स्थान: मुख्य कैंटीन के पास\n⚠️ घटना: कुत्ते का काटना / खरोंच\n🩹 तत्काल कार्रवाई: साबुन व पानी से धुलाई जारी\n🏥 आवश्यक सहायता: एंटी-रेबीज (PEP) मूल्यांकन व डॉक्टर जांच'
      },
      ta: {
        hazard_type: 'விலங்கு கடி / ரேபிஸ் தொற்று ஆபத்து',
        severity: 'moderate',
        campus_context: 'பிரதான கேண்டீன் அருகில்',
        why_guidance: 'ரேபிஸ் பரவல் அபாயம் கண்டறியப்பட்டுள்ளது. சோப்பு மற்றும் ஓடும் நீரில் 10 நிமிடங்கள் கழுவுவது அவசியமாகும்.',
        do_not_rules: [
          'சிறிய கீறல் அல்லது காயத்தைக் கூட புறக்கணிக்காதீர்கள்.',
          'மிளகாய் பொடி, பற்பசை, நெய் போன்றவற்றை பூசாதீர்கள்.',
          'மருத்துவமனைக்கு செல்வதை தாமதப்படுத்தாதீர்கள்.'
        ],
        steps: [
          {
            title: 'காயத்தை உடனடியாக கழுவவும்',
            duration_seconds: 600,
            action_detail: 'சோப்பு மற்றும் ஓடும் நீரில் குறைந்தது 10 நிமிடங்கள் தீவிரமாக கழுவவும்.'
          },
          {
            title: 'வீட்டு வைத்தியங்களை தவிர்க்கவும்',
            duration_seconds: 30,
            action_detail: 'காயத்தின் மீது எவ்வித எரிச்சலூட்டும் பொருட்களையும் இட வேண்டாம்.'
          },
          {
            title: 'வளாக மருந்தகத்தை அணுகவும்',
            duration_seconds: 60,
            action_detail: 'ரேபிஸ் தடுப்பூசி (PEP) வழிகாட்டுதலுக்கு உடனே மருத்துவரை அணுகவும்.'
          }
        ],
        whatsapp_message: '🚨 வளாக சுகாதார எச்சரிக்கை 🚨\n📍 இடம்: பிரதான கேண்டீன் அருகில்\n⚠️ சம்பவம்: நாய் கீறல் / கடி\n🩹 உடனடி நடவடிக்கை: சோப்பு நீரால் கழுவப்படுகிறது\n🏥 தேவை: ரேபிஸ் தடுப்பூசி மற்றும் மருத்துவ உதவி'
      },
      te: {
        hazard_type: 'జంతువు కాటు / రేబీస్ ప్రమాదం',
        severity: 'moderate',
        campus_context: 'ప్రధాన క్యాంటీన్ సమీపంలో',
        why_guidance: 'రేబీస్ సంక్రమణ అవకాశాన్ని నివా గుర్తించింది. వైరస్ తొలగింపుకు సబ్బు మరియు నీటితో 10 నిమిషాల వాషింగ్ అత్యంత ముఖ్యం.',
        do_not_rules: [
          'చిన్న గీత లేదా కాటును కూడా నిర్లక్ష్యం చేయవద్దు.',
          'కారం, టూత్‌పేస్ట్, నెయ్యి లేదా సున్నం వంటివి రాయవద్దు.',
          'వైద్యుడిని సంప్రదించడంలో ఏమాత్రం ఆలస్యం చేయవద్దు.'
        ],
        steps: [
          {
            title: 'గాయాన్ని బాగా కడగండి',
            duration_seconds: 600,
            action_detail: 'సబ్బు మరియు ప్రవహించే నీటితో కనీసం 10 నిమిషాల పాటు శుభ్రం చేయండి.'
          },
          {
            title: 'ఇంటి చిట్కాలను నివారించండి',
            duration_seconds: 30,
            action_detail: 'గాయంపై ఎటువంటి రసాయనాలు లేదా చికాకు కలిగించే పదార్థాలు పెట్టవద్దు.'
          },
          {
            title: 'క్యాంపస్ డిస్పెన్సరీకి వెళ్లండి',
            duration_seconds: 60,
            action_detail: 'రేబీస్ వ్యాక్సిన్ (PEP) కొరకు తక్షణమే డిస్పెన్సరీని సంప్రదించండి.'
          }
        ],
        whatsapp_message: '🚨 క్యాంపస్ హెల్త్ అలర్ట్ 🚨\n📍 ప్రదేశం: ప్రధాన క్యాంటీన్ దగ్గర\n⚠️ సంఘటన: కుక్క కాటు / గీత\n🩹 తక్షణ చర్య: సబ్బు నీటితో శుభ్రం చేస్తున్నారు\n🏥 అవసరం: రేబీస్ టీకా మరియు వైద్య చికిత్స'
      }
    }
  },
  {
    id: 'heat-stroke',
    code: 'PRESET 04',
    title: 'HEAT STROKE / FAINTING',
    descriptionSnippet: 'Student collapsed during outdoor session',
    location: 'Sports Ground',
    iconType: 'heat',
    data: {
      en: {
        hazard_type: 'Heat illness / possible heat stroke',
        severity: 'critical',
        campus_context: 'Sports Ground',
        why_guidance: 'NIVA detected acute thermal breakdown / syncope. Rapid evaporative cooling, airway protection, and emergency campus ambulance dispatch are required.',
        do_not_rules: [
          'Do NOT leave the person alone.',
          'Do NOT give fluids if the person is unconscious or unable to swallow.',
          'Do NOT delay emergency medical assistance if severe symptoms are present.'
        ],
        steps: [
          {
            title: 'Move to a cooler area',
            duration_seconds: 30,
            action_detail: 'Move the person away from direct heat if it is safe to do so.'
          },
          {
            title: 'Check responsiveness',
            duration_seconds: 20,
            action_detail: 'Check whether the person responds and is breathing normally.'
          },
          {
            title: 'Cool the person',
            duration_seconds: 120,
            action_detail: 'Begin appropriate cooling while arranging emergency medical help.'
          },
          {
            title: 'Call emergency support',
            duration_seconds: 30,
            action_detail: 'Contact campus emergency personnel or 112 for severe symptoms.'
          }
        ],
        whatsapp_message: '🚨 CAMPUS EMERGENCY ALERT 🚨\n📍 Location: Sports Ground\n⚠️ Incident: Suspected severe heat illness\n🩹 Immediate Action: Cooling initiated\n🚑 Action Needed: Campus emergency medical response'
      },
      hi: {
        hazard_type: 'हीट स्ट्रोक / लू लगना एवं बेहोशी',
        severity: 'critical',
        campus_context: 'स्पोर्ट्स ग्राउंड',
        why_guidance: 'निवा ने गंभीर हीट स्ट्रोक और बेहोशी की पहचान की है। तुरंत छायादार स्थान, शीतलन और आपातकालीन एम्बुलेंस आवश्यक है।',
        do_not_rules: [
          'पीड़ित छात्र को कभी भी अकेला न छोड़ें।',
          'यदि व्यक्ति बेहोश है या निगलने में असमर्थ है, तो मुंह से पानी या कोई तरल न दें।',
          'गंभीर लक्षणों में आपातकालीन मेडिकल सहायता बुलाने में बिल्कुल देरी न करें।'
        ],
        steps: [
          {
            title: 'तुरंत ठंडी / छायादार जगह पर ले जाएं',
            duration_seconds: 30,
            action_detail: 'छात्र को सीधी धूप से हटाकर पंखे या पेड़ की ठंडी छाया में ले जाएं।'
          },
          {
            title: 'चेतना और सांस की जांच करें',
            duration_seconds: 20,
            action_detail: 'देखें कि क्या छात्र जवाब दे रहा है और सामान्य रूप से सांस ले रहा है।'
          },
          {
            title: 'शरीर को ठंडा करना शुरू करें',
            duration_seconds: 120,
            action_detail: 'गीले कपड़े से चेहरे व गर्दन को पोंछें और हवा दें।'
          },
          {
            title: 'आपातकालीन सहायता को कॉल करें',
            duration_seconds: 30,
            action_detail: 'कैंपस इमरजेंसी व 112 पर तुरंत एम्बुलेंस के लिए कॉल करें।'
          }
        ],
        whatsapp_message: '🚨 कैंपस आपातकालीन चेतावनी 🚨\n📍 स्थान: स्पोर्ट्स ग्राउंड\n⚠️ घटना: हीट स्ट्रोक / छात्र बेहोश\n🩹 तत्काल कार्रवाई: छाया में शीतलन जारी है\n🚑 आवश्यक सहायता: कैंपस एम्बुलेंस तुरंत भेजें'
      },
      ta: {
        hazard_type: 'வெப்ப பக்கவாதம் / மயக்கம் (ஹீட் ஸ்ட்ரோக்)',
        severity: 'critical',
        campus_context: 'விளையாட்டு மைதானம்',
        why_guidance: 'கடுமையான வெப்ப மயக்கம் கண்டறியப்பட்டுள்ளது. உடலை உடனடியாக குளிர்வித்து ஆம்புலன்ஸை அழைக்கவும்.',
        do_not_rules: [
          'மயக்கமடைந்தவரை தனியாக விட்டுச் செல்லாதீர்கள்.',
          'மயக்கத்தில் இருக்கும்போது வாயில் தண்ணீர் அல்லது திரவம் எதையும் புகட்ட வேண்டாம்.',
          'அவசர மருத்துவ உதவியை அழைப்பதில் தாமதிக்க வேண்டாம்.'
        ],
        steps: [
          {
            title: 'குளிர்ந்த பகுதிக்கு மாற்றவும்',
            duration_seconds: 30,
            action_detail: 'பாதிக்கப்பட்டவரை வெயிலில் இருந்து உடனடியாக நிழலான இடத்திற்கு கொண்டு செல்லவும்.'
          },
          {
            title: 'சுவாசத்தை சரிபார்க்கவும்',
            duration_seconds: 20,
            action_detail: 'சுவாசம் மற்றும் விழிப்புணர்வை உறுதி செய்யுங்கள்.'
          },
          {
            title: 'உடலை குளிர்விக்கவும்',
            duration_seconds: 120,
            action_detail: 'ஈரமான துணியால் துடைத்து உடனடியாக விசிறி விடவும்.'
          },
          {
            title: 'அவசர உதவிக்கு அழைக்கவும்',
            duration_seconds: 30,
            action_detail: 'வளாக அவசர உதவிக்கு அல்லது 112க்கு உடனடியாக அழைக்கவும்.'
          }
        ],
        whatsapp_message: '🚨 வளாக அவசர எச்சரிக்கை 🚨\n📍 இடம்: விளையாட்டு மைதானம்\n⚠️ சம்பவம்: வெப்ப பக்கவாதம் / மயக்கம்\n🩹 உடனடி நடவடிக்கை: நிழலில் குளிர்விக்கப்படுகிறது\n🚑 தேவை: வளாக அவசர ஆம்புலன்ஸ்'
      },
      te: {
        hazard_type: 'వడదెబ్బ / స్పృహ తప్పి పడిపోవడం (హీట్ స్ట్రోక్)',
        severity: 'critical',
        campus_context: 'క్రీడా మైదానం',
        why_guidance: 'తీవ్రమైన వడదెబ్బను నివా గుర్తించింది. వెంటనే నీడకు చేర్చి, చల్లబరిచి, అత్యవసర అంబులెన్స్ పిలవాలి.',
        do_not_rules: [
          'బాధిత విద్యార్థిని ఒంటరిగా వదిలి వెళ్లవద్దు.',
          'స్పృహ లేని వ్యక్తికి నోటి ద్వారా నీరు లేదా ద్రవాలు తాగించవద్దు.',
          'అత్యవసర వైద్య సహాయాన్ని పిలవడంలో ఆలస్యం చేయవద్దు.'
        ],
        steps: [
          {
            title: 'చల్లని ప్రదేశానికి తరలించండి',
            duration_seconds: 30,
            action_detail: 'విద్యార్థిని ఎండ నుండి వెంటనే నీడ ఉన్న ప్రదేశానికి చేర్చండి.'
          },
          {
            title: 'శ్వాస మరియు స్పృహను పరిశీలించండి',
            duration_seconds: 20,
            action_detail: 'విద్యార్థి స్పందిస్తున్నాడో లేదో మరియు శ్వాస సరిగ్గా ఆడుతుందో లేదో చూడండి.'
          },
          {
            title: 'శరీరాన్ని చల్లబరచండి',
            duration_seconds: 120,
            action_detail: 'తడి గుడ్డతో తల, మెడను తుడుస్తూ గాలి వేయండి.'
          },
          {
            title: 'అత్యవసర విభాగానికి కాల్ చేయండి',
            duration_seconds: 30,
            action_detail: 'క్యాంపస్ హెల్త్ సెంటర్ లేదా 112కు తక్షణ అంబులెన్స్ కోసం కాల్ చేయండి.'
          }
        ],
        whatsapp_message: '🚨 క్యాంపస్ అత్యవసర హెచ్చరిక 🚨\n📍 ప్రదేశం: స్పోర్ట్స్ గ్రౌండ్\n⚠️ సంఘటన: తీవ్రమైన వడదెబ్బ / అపస్మారక స్థితి\n🩹 తక్షణ చర్య: నీడలో చల్లబరుస్తున్నారు\n🚑 అవసరం: క్యాంపస్ అంబులెన్స్ తక్షణ స్పందన'
      }
    }
  }
];
