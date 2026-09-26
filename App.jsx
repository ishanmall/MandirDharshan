const { useState, useEffect, useMemo } = React;

const templeData = [
    { file: "asthabhujadevi.jpg", name: "Ashtabhuja Devi", loc: "Vindhyachal, Uttar Pradesh", desc: "A prominent temple dedicated to Goddess Ashtabhuja, situated on the scenic Vindhya mountain range. | यह विंध्य पर्वत पर स्थित देवी अष्टभुजा को समर्पित एक प्रमुख मंदिर है।" },
    { file: "vindhyavasinidevi.jpg", name: "Vindhyavasini Devi", loc: "Vindhyachal, Uttar Pradesh", desc: "One of the most revered Shakti Peethas situated on the banks of the river Ganges. | गंगा के तट पर स्थित सबसे पूजनीय शक्तिपीठों में से एक।" },
    { file: "vaishno devi.jpg", name: "Vaishno Devi", loc: "Katra, Jammu and Kashmir", desc: "A holy cave shrine dedicated to Shakti, located in the Trikuta Mountains. | त्रिकुटा पर्वतों में स्थित शक्ति को समर्पित एक पवित्र गुफा मंदिर।" },
    { file: "mrityunajaymahadev.jpg", name: "Mrityunjay Mahadev", loc: "Varanasi, Uttar Pradesh", desc: "An ancient temple dedicated to Lord Shiva, known to cure ailments and conquer death. | भगवान शिव का प्राचीन मंदिर, जो रोगों को दूर करने के लिए जाना जाता है।" },
    { file: "annapurna.jpg", name: "Annapurna Temple", loc: "Varanasi, Uttar Pradesh", desc: "Dedicated to Goddess Annapurna, the deity of food and nourishment. | भोजन और पोषण की देवी अन्नपूर्णा को समर्पित।" },
    { file: "durgakand.jpg", name: "Durga Kund", loc: "Varanasi, Uttar Pradesh", desc: "An 18th-century temple dedicated to Goddess Durga, painted in vibrant red. | लाल रंग से रंगा देवी दुर्गा का 18वीं सदी का मंदिर।" },
    { file: "kalbhairav.jpg", name: "Kaal Bhairav", loc: "Varanasi, Uttar Pradesh", desc: "Dedicated to Kaal Bhairav, the fierce manifestation of Lord Shiva and the protector of Varanasi. | वाराणसी के रक्षक और भगवान शिव के उग्र रूप काल भैरव को समर्पित।" },
    { file: "kashivishwanath.jpg", name: "Kashi Vishwanath", loc: "Varanasi, Uttar Pradesh", desc: "One of the most famous Hindu temples and one of the twelve Jyotirlingas dedicated to Lord Shiva. | भगवान शिव के 12 ज्योतिर्लिंगों में से एक अत्यंत प्रसिद्ध मंदिर।" },
    { file: "kanakbhawan.jpg", name: "Kanak Bhawan", loc: "Ayodhya, Uttar Pradesh", desc: "A beautifully decorated temple gifted to Goddess Sita by Kaikeyi. | कैकेयी द्वारा देवी सीता को उपहार में दिया गया एक सुंदर मंदिर।" },
    { file: "hanumangarhi.jpg", name: "Hanuman Garhi", loc: "Ayodhya, Uttar Pradesh", desc: "A 10th-century temple dedicated to Lord Hanuman, approached by 76 steps. | 76 सीढ़ियों वाला भगवान हनुमान का 10वीं सदी का मंदिर।" },
    { file: "ram-murti.webp", name: "Ram Mandir (Ram Murti)", loc: "Ayodhya, Uttar Pradesh", desc: "The grand temple marking the birthplace of Lord Shri Ram. | भगवान श्री राम की जन्मभूमि पर बना भव्य मंदिर।" },
    { file: "ratanawali.jpg", name: "Ratnavali Shakti Peeth", loc: "Hooghly, West Bengal", desc: "A sacred Shakti Peeth where the right shoulder of Devi Sati is believed to have fallen. | पवित्र शक्तिपीठ जहां देवी सती का दाहिना कंधा गिरा था।" },
    { file: "janasthan.jpg", name: "Janasthan Shakti Peeth", loc: "Nashik, Maharashtra", desc: "Also known as Bhramari, it is where the chin of Devi Sati fell. | इसे भ्रामरी भी कहा जाता है, जहां देवी सती की ठुड्डी गिरी थी।" },
    { file: "mithila.jpg", name: "Mithila Shakti Peeth", loc: "Janakpur, Nepal border", desc: "A revered site where the left shoulder of Sati fell, represented by Goddess Uma. | जहां सती का बायां कंधा गिरा था, यहां देवी उमा की पूजा होती है।" },
    { file: "mahamaya.jpg", name: "Amarnath Cave Temple", loc: "Amarnath, Jammu and Kashmir", desc: "A highly revered Hindu cave shrine famous for the naturally occurring ice Shiva Lingam. | प्राकृतिक रूप से बनने वाले बर्फ के शिवलिंग के लिए प्रसिद्ध एक अत्यंत पवित्र गुफा मंदिर।" },
    { file: "indrakshi.jpg", name: "Indrakshi Shakti Peeth", loc: "Nainativu, Sri Lanka", desc: "The site where the anklets of Devi Sati fell. | वह स्थान जहां देवी सती की पायल गिरी थी।" },
    { file: "jayanti.jpg", name: "Jayanti Shakti Peeth", loc: "Baurbhag, Meghalaya", desc: "Dedicated to Goddess Jayanti, where the left thigh of Sati fell. | देवी जयंती को समर्पित, जहां सती की बाईं जांघ गिरी थी।" },
    { file: "panchsagar.jpg", name: "Panchsagar Shakti Peeth", loc: "Varanasi, Uttar Pradesh", desc: "Where the lower jaw of Sati is believed to have fallen. | ऐसा माना जाता है कि यहां सती का निचला जबड़ा गिरा था।" },
    { file: "nandikeshwari.jpg", name: "Nandikeshwari Temple", loc: "Birbhum, West Bengal", desc: "A renowned Shakti Peeth where the necklace of Devi Sati fell. | एक प्रसिद्ध शक्तिपीठ जहां देवी सती का हार गिरा था।" },
    { file: "chandrabhaga.jpg", name: "Chandrabhaga", loc: "Prabhas Patan, Gujarat", desc: "Located near Somnath, representing the stomach of Sati. | सोमनाथ के पास स्थित, जो सती के पेट का प्रतिनिधित्व करता है।" },
    { file: "maniband.png", name: "Manibandh Shakti Peeth", loc: "Pushkar, Rajasthan", desc: "The sacred site where the wrists of Goddess Sati fell. | पवित्र स्थल जहां देवी सती की कलाइयां गिरी थीं।" },
    { file: "kankalitala.png", name: "Kankalitala", loc: "Bolpur, West Bengal", desc: "A famous Shakti Peeth on the banks of the Kopai River where the pelvis of Sati fell. | कोपाई नदी के तट पर प्रसिद्ध शक्तिपीठ जहां सती का श्रोणि (pelvis) गिरा था।" },
    { file: "kiriteshwari.jpg", name: "Kiriteshwari Temple", loc: "Murshidabad, West Bengal", desc: "Considered as the sleeping place of Devi Sati, where her crown (kirit) fell. | इसे सती का शयन स्थान माना जाता है, जहां उनका मुकुट गिरा था।" },
    { file: "kanyakumari.jpg", name: "Kanyakumari Temple", loc: "Kanyakumari, Tamil Nadu", desc: "Dedicated to Devi Kanya Kumari, located at the southernmost tip of India. | भारत के दक्षिणी छोर पर स्थित देवी कन्या कुमारी को समर्पित।" },
    { file: "biraja.jpg", name: "Biraja Temple", loc: "Jajpur, Odisha", desc: "An ancient Hindu temple where the navel of Sati fell. | एक प्राचीन मंदिर जहां सती की नाभि गिरी थी।" },
    { file: "avanti.jpg", name: "Avanti (Harsiddhi Mata)", loc: "Ujjain, Madhya Pradesh", desc: "A powerful Shakti Peeth where the elbow of Sati fell. | एक शक्तिशाली शक्तिपीठ जहां सती की कोहनी गिरी थी।" },
    { file: "bakreshwar.jpg", name: "Bakreshwar Temple", loc: "Birbhum, West Bengal", desc: "Known for its hot springs and as the site where the mind (center of brows) of Sati fell. | अपने गर्म झरनों के लिए प्रसिद्ध, जहां सती का मन गिरा था।" },
    { file: "bahulla.jpg", name: "Bahula Shakti Peeth", loc: "Burdwan, West Bengal", desc: "Where the left arm of Goddess Sati is believed to have fallen. | माना जाता है कि यहां देवी सती का बायां हाथ गिरा था।" },
    { file: "fullara.jpg", name: "Attahas (Fullara)", loc: "Birbhum, West Bengal", desc: "A revered site where the lips of Devi Sati fell. | पूजनीय स्थल जहां देवी सती के होंठ गिरे थे।" },
    { file: "guhyeshwari.jpg", name: "Guhyeshwari Temple", loc: "Kathmandu, Nepal", desc: "A highly revered Shakti Peeth near Pashupatinath. | पशुपतिनाथ के पास एक अत्यधिक पूजनीय शक्तिपीठ।" },
    { file: "gandakitemple.jpg", name: "Gandaki Chandi", loc: "Muktinath, Nepal", desc: "The site where the temple (head) of Devi Sati fell. | वह स्थान जहां देवी सती का मस्तक गिरा था।" },
    { file: "nainadevi.jpg", name: "Naina Devi", loc: "Bilaspur, Himachal Pradesh", desc: "A famous hilltop temple where the eyes of Devi Sati fell. | पहाड़ी पर स्थित मंदिर जहां देवी सती की आंखें गिरी थीं।" },
    { file: "bramarambamata.jpg", name: "Bhramaramba Mata", loc: "Srisailam, Andhra Pradesh", desc: "Located within the Mallikarjuna Jyotirlinga complex. | यह मल्लिकार्जुन ज्योतिर्लिंग परिसर के भीतर स्थित है।" },
    { file: "kanchikamaskhi.jpg", name: "Kanchi Kamakshi", loc: "Kanchipuram, Tamil Nadu", desc: "A majestic temple representing the naval of the Goddess. | देवी की नाभि का प्रतिनिधित्व करने वाला एक राजसी मंदिर।" },
    { file: "shankaridevi.jpg", name: "Shankari Devi", loc: "Trincomalee, Sri Lanka", desc: "An ancient Shakti Peeth located in the Koneswaram temple complex. | कोनेस्वरम मंदिर परिसर में स्थित प्राचीन शक्तिपीठ।" },
    { file: "bhabani.jpg", name: "Bhavani (Tuljapur)", loc: "Tuljapur, Maharashtra", desc: "Dedicated to Goddess Bhavani, the family deity of Chhatrapati Shivaji Maharaj. | छत्रपति शिवाजी महाराज की कुलदेवी माँ भवानी को समर्पित।" },
    { file: "jeshorehwarikali.jpg", name: "Jeshoreshwari Kali", loc: "Satkhira, Bangladesh", desc: "A sacred site where the palms of Devi Sati fell. | पवित्र स्थल जहां देवी सती की हथेलियां गिरी थीं।" },
    { file: "chandranath-shaktipeeth.jpg", name: "Chandranath Temple", loc: "Sitakunda, Bangladesh", desc: "Located on top of the Chandranath hill, representing Sati's right arm. | चंद्रनाथ पहाड़ी की चोटी पर स्थित, जो सती की दाहिनी भुजा का प्रतिनिधित्व करता है।" },
    { file: "sugandha-devi-shaktipeeth.jpg", name: "Sugandha Shakti Peeth", loc: "Barisal, Bangladesh", desc: "Where the nose of Devi Sati is believed to have fallen. | जहां देवी सती की नाक गिरने की मान्यता है।" },
    { file: "shailshakti.webp", name: "Shailputri Mata", loc: "Varanasi, Uttar Pradesh", desc: "Dedicated to the first form of Goddess Durga worshipped during Navratri. | नवरात्रि के दौरान पूजे जाने वाले देवी दुर्गा के पहले स्वरूप को समर्पित।" },
    { file: "shaptashrungi.jpg", name: "Saptashrungi", loc: "Vani, Maharashtra", desc: "A site of pilgrimage situated on seven hills, housing the half-Shakti Peeth. | सात पहाड़ियों पर स्थित तीर्थस्थल जिसे आधा शक्तिपीठ माना जाता है।" },
    { file: "vishalakshi.jpg", name: "Vishalakshi Temple", loc: "Varanasi, Uttar Pradesh", desc: "The wide-eyed Goddess, where the earrings of Sati fell. | विशाल नेत्रों वाली देवी, जहां सती के झुमके गिरे थे।" },
    { file: "lalitadevi.webp", name: "Lalita Devi", loc: "Prayagraj, Uttar Pradesh", desc: "A major Shakti Peeth where the fingers of Devi Sati fell. | प्रमुख शक्तिपीठ जहां देवी सती की उंगलियां गिरी थीं।" },
    { file: "shardapeeth.jpg", name: "Sharda Peeth", loc: "Neelum Valley, POK", desc: "An ancient centre of learning and a highly revered Kashmiri Pandit temple. | विद्या का प्राचीन केंद्र और कश्मीरी पंडितों का पूजनीय मंदिर।" },
    { file: "Hinglajmata.jpg", name: "Hinglaj Mata", loc: "Balochistan, Pakistan", desc: "A cave temple and a major Shakti Peeth where the head of Sati fell. | एक गुफा मंदिर जहां सती का सिर गिरा था।" },
    { file: "devitalab.jpg", name: "Devi Talab Mandir", loc: "Jalandhar, Punjab", desc: "A 200-year-old temple dedicated to Goddess Durga, featuring a sacred pond. | पवित्र तालाब वाला देवी दुर्गा का 200 साल पुराना मंदिर।" },
    { file: "mayadevi.jpg", name: "Maya Devi Temple", loc: "Haridwar, Uttarakhand", desc: "The presiding deity of Haridwar, where the heart and navel of Sati fell. | हरिद्वार की अधिष्ठात्री देवी, जहां सती का हृदय और नाभि गिरी थी।" },
    { file: "danteshwarimata.jpg", name: "Danteshwari Mata", loc: "Dantewada, Chhattisgarh", desc: "Dedicated to Goddess Danteshwari, where the tooth of Sati fell. | देवी दंतेश्वरी को समर्पित, जहां सती का दांत गिरा था।" },
    { file: "bhadrakali.jpg", name: "Bhadrakali Temple", loc: "Kurukshetra, Haryana", desc: "An ancient temple where the right ankle of Devi Sati is believed to have fallen. | प्राचीन मंदिर जहां देवी सती का दाहिना टखना गिरा था।" },
    { file: "mahakali.jpg", name: "Mahakali Temple", loc: "Pavagadh, Gujarat", desc: "A revered hilltop shrine dedicated to Goddess Mahakali. | देवी महाकाली को समर्पित पहाड़ी पर स्थित पूजनीय मंदिर।" },
    { file: "patandevi.jpg", name: "Patan Devi", loc: "Patna, Bihar", desc: "The oldest and one of the most sacred temples of Patna, representing Sati's right thigh. | सती की दाहिनी जांघ का प्रतिनिधित्व करने वाला पटना का सबसे पुराना मंदिर।" },
    { file: "manglagauri.jpg", name: "Mangla Gauri", loc: "Gaya, Bihar", desc: "A prominent Shakti Peeth where the breast of Devi Sati fell. | एक प्रमुख शक्तिपीठ जहां देवी सती का वक्ष गिरा था।" },
    { file: "brajeshwarimata.jpg", name: "Brajeshwari Mata", loc: "Kangra, Himachal Pradesh", desc: "A highly revered temple where the left breast of Sati fell. | एक पूजनीय मंदिर जहां सती का बायां वक्ष गिरा था।" },
    { file: "jwalamata.webp", name: "Jwala Ji", loc: "Kangra, Himachal Pradesh", desc: "A temple without an idol, where the Goddess is worshipped as a perpetual blue flame. | बिना मूर्ति का मंदिर जहां देवी की पूजा नीली ज्वाला के रूप में होती है।" },
    { file: "tripuramata.jpg", name: "Tripura Sundari", loc: "Udaipur, Tripura", desc: "One of the 51 Shakti Peethas, where the right foot of Sati fell. | 51 शक्तिपीठों में से एक, जहां सती का दाहिना पैर गिरा था।" },
    { file: "Kalighatkalitemple.jpg", name: "Kalighat Kali", loc: "Kolkata, West Bengal", desc: "One of the most famous Kali temples in India, where the toes of Sati fell. | भारत के प्रसिद्ध काली मंदिरों में से एक, जहां सती के पैर की उंगलियां गिरी थीं।" },
    { file: "kamakhyatemple.jpg", name: "Kamakhya Temple", loc: "Guwahati, Assam", desc: "One of the oldest of the 51 Shakti Pithas, dedicated to the mother goddess Kamakhya. | कामाख्या देवी को समर्पित सबसे पुराने शक्तिपीठों में से एक।" },
    { file: "maa-chintpurni.jpg", name: "Maa Chintpurni", loc: "Una, Himachal Pradesh", desc: "A major pilgrimage site where the feet of Sati fell. | एक प्रमुख तीर्थस्थल जहां सती के चरण गिरे थे।" },
    { file: "bankebihari.jpg", name: "Banke Bihari", loc: "Vrindavan, Uttar Pradesh", desc: "A highly revered temple dedicated to Lord Krishna in his child form. | बाल रूप में भगवान कृष्ण को समर्पित एक पूजनीय मंदिर।" },
    { file: "bhuteshwarmahadev.jpg", name: "Bhuteshwar Mahadev", loc: "Mathura, Uttar Pradesh", desc: "An ancient shrine dedicated to Lord Shiva in the holy city of Mathura. | मथुरा शहर में भगवान शिव का एक प्राचीन मंदिर।" },
    { file: "rangeshwarmahadev.jpg", name: "Rangeshwar Mahadev", loc: "Mathura, Uttar Pradesh", desc: "A significant Shiva temple located in the heart of Mathura. | मथुरा के बीचों-बीच स्थित एक महत्वपूर्ण शिव मंदिर।" },
    { file: "govinddev.jpg", name: "Govind Dev Ji", loc: "Jaipur, Rajasthan", desc: "A famous Vaishnava temple dedicated to Lord Krishna. | भगवान कृष्ण को समर्पित एक प्रसिद्ध वैष्णव मंदिर।" },
    { file: "dwarkadheesh.jpg", name: "Dwarkadhish Temple", loc: "Dwarka, Gujarat", desc: "Also known as the Jagat Mandir, dedicated to Lord Krishna. | जगत मंदिर के रूप में भी जाना जाता है, जो भगवान कृष्ण को समर्पित है।" },
    { file: "chandrikadevi.jpg", name: "Chandrika Devi", loc: "Lucknow, Uttar Pradesh", desc: "A serene temple dedicated to Goddess Chandi, situated near the Gomti River. | गोमती नदी के पास स्थित देवी चंडी का शांत मंदिर।" },
    { file: "mankameshwarmahadev.jpg", name: "Mankameshwar Mandir", loc: "Agra, Uttar Pradesh", desc: "An ancient temple dedicated to Lord Shiva, believed to fulfill all wishes. | शिव का प्राचीन मंदिर जिसके बारे में माना जाता है कि यहां सभी मनोकामनाएं पूरी होती हैं।" },
    { file: "anandeshwarmahadev.jpg", name: "Anandeshwar Mahadev", loc: "Kanpur, Uttar Pradesh", desc: "A prominent Shiva temple located on the banks of the river Ganga. | गंगा नदी के तट पर स्थित एक प्रमुख शिव मंदिर।" },
    { file: "kalikhoh.jpg", name: "Kali Khoh Mata", loc: "Vindhyachal, Uttar Pradesh", desc: "A sacred cave temple dedicated to Goddess Kali, nestled in the Vindhya mountains. | विंध्य पर्वतों में स्थित देवी काली का एक पवित्र गुफा मंदिर।" },
    { file: "ISKCON Vrindavan.jpg", name: "ISKCON Vrindavan", loc: "Vrindavan, Uttar Pradesh", desc: "A major ISKCON temple dedicated to Lord Krishna and Balarama. | भगवान कृष्ण और बलराम को समर्पित एक प्रमुख इस्कॉन मंदिर।" },
    { file: "Ramanathaswamy.jpg", name: "Ramanathaswamy", loc: "Rameswaram, Tamil Nadu", desc: "A renowned Jyotirlinga temple famous for its grand corridors. | अपने भव्य गलियारों के लिए प्रसिद्ध एक प्रख्यात ज्योतिर्लिंग मंदिर।" },
    { file: "nageshwarnath.jpg", name: "Nageshwarnath", loc: "Ayodhya, Uttar Pradesh", desc: "Ancient temple dedicated to Lord Shiva, established by Lord Kusha. | भगवान शिव को समर्पित प्राचीन मंदिर, जिसकी स्थापना लव-कुश ने की थी।" },
    { file: "vaidyanath.jpg", name: "Vaidyanath Jyotirlinga", loc: "Deoghar, Jharkhand", desc: "One of the twelve Jyotirlingas, also known as Baba Baidyanath Dham. | 12 ज्योतिर्लिंगों में से एक, जिसे बाबा बैद्यनाथ धाम भी कहा जाता है।" },
    { file: "kedarnath.jpg", name: "Kedarnath", loc: "Uttarakhand", desc: "High-altitude Jyotirlinga temple dedicated to Lord Shiva. | ऊंचाई पर स्थित भगवान शिव का ज्योतिर्लिंग मंदिर।" },
    { file: "somnath-jyotirlinga-temple.jpg", name: "Somnath", loc: "Prabhas Patan, Gujarat", desc: "The first among the twelve Jyotirlinga shrines of Shiva. | शिव के बारह ज्योतिर्लिंगों में सबसे पहला।" },
    { file: "Srisailam Mallikarjuna.jpg", name: "Mallikarjuna Jyotirlinga", loc: "Srisailam, Andhra Pradesh", desc: "A Jyotirlinga and Shakti Peetha located on the Nallamala hills. | नल्लामाला पहाड़ियों पर स्थित एक ज्योतिर्लिंग और शक्तिपीठ।" },
    { file: "Raghunath Temple — Srinagar.jpg", name: "Raghunath Temple", loc: "Srinagar, Jammu & Kashmir", desc: "A historical and prominent temple situated in Srinagar. | श्रीनगर में स्थित एक ऐतिहासिक और प्रमुख मंदिर।" },
    { file: "Raghunath Temple — Jammu.jpg", name: "Raghunath Temple", loc: "Jammu, Jammu & Kashmir", desc: "One of the largest Hindu temple complexes in northern India. | उत्तर भारत के सबसे बड़े हिंदू मंदिर परिसरों में से एक।" },
    { file: "Machail Mata Temple — Kishtwar.jpg", name: "Machail Mata Temple", loc: "Kishtwar, Jammu & Kashmir", desc: "A famous shrine dedicated to Goddess Durga in the Paddar valley. | पाड्डर घाटी में देवी दुर्गा को समर्पित एक प्रसिद्ध तीर्थस्थल।" },
    { file: "Sheetla Chaukiya Dham — Jaunpur.jpg", name: "Sheetla Chaukiya Dham", loc: "Jaunpur, Uttar Pradesh", desc: "A highly revered temple dedicated to Goddess Sheetla. | देवी शीतला को समर्पित एक अत्यंत पूजनीय मंदिर।" },
    { file: "Kamadgiri Temple.jpg", name: "Kamadgiri Temple", loc: "Chitrakoot, Madhya Pradesh", desc: "A forested hill of religious significance surrounded by a sacred parikrama path. | एक पवित्र परिक्रमा पथ से घिरी धार्मिक महत्व वाली जंगली पहाड़ी।" },
    { file: "Kasba Kali Temple — Kamalasagar.jpg", name: "Kasba Kali Temple", loc: "Kamalasagar, Tripura", desc: "A 15th-century temple overlooking the Kamala Sagar lake. | कमला सागर झील के पास स्थित 15वीं सदी का मंदिर।" },
    { file: "Shri Govindajee Temple — Imphal.jpg", name: "Shri Govindajee Temple", loc: "Imphal, Manipur", desc: "A historic Vaishnavite temple dedicated to Lord Krishna. | भगवान कृष्ण को समर्पित एक ऐतिहासिक वैष्णव मंदिर।" },
    { file: "Mangalagiri Panakala Narasimha Temple.jpg", name: "Panakala Narasimha Temple", loc: "Mangalagiri, Andhra Pradesh", desc: "An ancient temple where the deity is offered panakam (jaggery water). | एक प्राचीन मंदिर जहां देवता को पानाकम (गुड़ का पानी) चढ़ाया जाता है।" },
    { file: "Kanaka Durga Temple — Vijayawada.jpg", name: "Kanaka Durga Temple", loc: "Vijayawada, Andhra Pradesh", desc: "A famous temple located on the Indrakeeladri hill on the banks of Krishna river. | कृष्णा नदी के तट पर इंद्रकीलाद्री पहाड़ी पर स्थित प्रसिद्ध मंदिर।" },
    { file: "Chilkur Balaji Temple — Hyderabad.jpg", name: "Chilkur Balaji Temple", loc: "Hyderabad, Telangana", desc: "Popularly known as the 'Visa Balaji' temple. | यह मंदिर 'वीजा बालाजी' के नाम से लोकप्रिय है।" },
    { file: "Akshardham.jpg", name: "Akshardham", loc: "New Delhi", desc: "A stunning modern temple complex showcasing traditional Hindu architecture. | पारंपरिक हिंदू वास्तुकला को दर्शाने वाला एक शानदार आधुनिक मंदिर परिसर।" },
    { file: "tirupati.jpg", name: "Tirupati Balaji", loc: "Tirupati, Andhra Pradesh", desc: "A highly revered and visited temple dedicated to Lord Venkateswara. | भगवान वेंकटेश्वर को समर्पित एक अत्यधिक पूजनीय और दर्शन किया जाने वाला मंदिर।" },
    { file: "grishneshwar.jpg", name: "Grishneshwar", loc: "Ellora, Maharashtra", desc: "The 12th Jyotirlinga on earth, located near the Ellora Caves. | एलोरा गुफाओं के पास स्थित पृथ्वी का 12वां ज्योतिर्लिंग।" },
    { file: "trimbakeshwar.jpg", name: "Trimbakeshwar", loc: "Nashik, Maharashtra", desc: "An ancient Jyotirlinga temple at the source of the Godavari River. | गोदावरी नदी के उद्गम पर स्थित एक प्राचीन ज्योतिर्लिंग मंदिर।" },
    { file: "omkareshwar.jpg", name: "Omkareshwar", loc: "Khandwa, Madhya Pradesh", desc: "A Jyotirlinga situated on an island shaped like the sacred symbol 'Om'. | 'ओम' के आकार के द्वीप पर स्थित एक ज्योतिर्लिंग।" },
    { file: "Khajuraho.jpg", name: "Khajuraho Group of Temples", loc: "Khajuraho, Madhya Pradesh", desc: "Famous for its stunning nagara-style architectural symbolism. | अपनी शानदार नागर शैली की वास्तुकला के लिए प्रसिद्ध।" },
    { file: "Rani Temple — Gulmarg.jpg", name: "Rani Temple", loc: "Gulmarg, Jammu & Kashmir", desc: "A historic Shiva temple prominently visible in Gulmarg. | गुलमर्ग में प्रमुखता से दिखाई देने वाला एक ऐतिहासिक शिव मंदिर।" },
    { file: "Martand Sun Temple.jpg", name: "Martand Sun Temple", loc: "Anantnag, Jammu & Kashmir", desc: "Ancient ruins of an 8th-century temple dedicated to Surya. | सूर्य देव को समर्पित 8वीं शताब्दी के मंदिर के प्राचीन खंडहर।" },
    { file: "Bawey Wali Mata Temple — Jammu.jpg", name: "Bawey Wali Mata", loc: "Jammu, Jammu & Kashmir", desc: "A highly revered shrine situated inside the Bahu Fort. | बाहु किले के अंदर स्थित एक अत्यधिक पूजनीय तीर्थस्थल।" },
    { file: "Gorakhnath Temple — Gorakhpur.jpg", name: "Gorakhnath Temple", loc: "Gorakhpur, Uttar Pradesh", desc: "The central seat of the Nath monastic order. | नाथ संप्रदाय का केंद्रीय पीठ।" },
    { file: "Tulsi Manas Temple.jpg", name: "Tulsi Manas Temple", loc: "Varanasi, Uttar Pradesh", desc: "A beautiful temple where the Ramcharitmanas was written. | एक सुंदर मंदिर जहां रामचरितमानस की रचना हुई थी।" },
    { file: "Umananda Temple — Guwahati.jpg", name: "Umananda Temple", loc: "Guwahati, Assam", desc: "A Shiva temple located on Peacock Island in the Brahmaputra River. | ब्रह्मपुत्र नदी में मयूर द्वीप पर स्थित एक शिव मंदिर।" },
    { file: "Bhuvaneswari Temple — Bhilwadi.jpg", name: "Bhuvaneswari Temple", loc: "Bhilwadi, Maharashtra", desc: "A prominent temple located on the banks of the Krishna River. | कृष्णा नदी के तट पर स्थित एक प्रमुख मंदिर।" },
    { file: "Nartiang Durga Temple — Jaintia Hills.jpg", name: "Nartiang Durga Temple", loc: "Jaintia Hills, Meghalaya", desc: "One of the 51 Shakti Peethas located in the Nartiang village. | नारतियांग गांव में स्थित 51 शक्तिपीठों में से एक।" },
    { file: "Ahobilam Temple.jpg", name: "Ahobilam Temple", loc: "Ahobilam, Andhra Pradesh", desc: "The holy abode of Lord Narasimha in nine different forms. | भगवान नरसिंह के नौ अलग-अलग रूपों का पवित्र निवास स्थान।" },
    { file: "Tirumala Venkateswara Temple — Tirupati.jpg", name: "Tirumala Venkateswara Temple", loc: "Tirupati, Andhra Pradesh", desc: "The primary hill shrine of Lord Venkateswara. | भगवान वेंकटेश्वर का मुख्य पहाड़ी तीर्थस्थल।" },
    { file: "Bhadrachalam Sri Sita Ramachandra Swamy Temple.jpg", name: "Sita Ramachandra Swamy Temple", loc: "Bhadrachalam, Telangana", desc: "A famous temple dedicated to Lord Rama on the banks of the Godavari. | गोदावरी के तट पर भगवान राम को समर्पित एक प्रसिद्ध मंदिर।" },
    { file: "Meenakshi Amman.jpg", name: "Meenakshi Amman Temple", loc: "Madurai, Tamil Nadu", desc: "A historic Hindu temple located on the southern bank of the Vaigai River. | वैगई नदी के दक्षिणी तट पर स्थित एक ऐतिहासिक हिंदू मंदिर।" },
    { file: "badrinath.jpg", name: "Badrinath", loc: "Uttarakhand", desc: "One of the Char Dham pilgrimage sites, dedicated to Lord Vishnu. | भगवान विष्णु को समर्पित चार धाम तीर्थस्थलों में से एक।" },
    { file: "rameshwar.jpg", name: "Ramanathaswamy Temple", loc: "Rameswaram, Tamil Nadu", desc: "A highly revered Jyotirlinga temple. | एक अत्यधिक पूजनीय ज्योतिर्लिंग मंदिर।" },
    { file: "bhimashankar.jpg", name: "Bhimashankar", loc: "Pune, Maharashtra", desc: "A Jyotirlinga situated in the lush Sahyadri hills. | हरी-भरी सह्याद्री पहाड़ियों में स्थित एक ज्योतिर्लिंग।" },
    { file: "mahakaleshwar.jpg", name: "Mahakaleshwar", loc: "Ujjain, Madhya Pradesh", desc: "A prominent Jyotirlinga known for its unique Bhasma Aarti. | भस्म आरती के लिए प्रसिद्ध एक प्रमुख ज्योतिर्लिंग।" },
    { file: "Guruvayur.jpg", name: "Guruvayur Temple", loc: "Guruvayur, Kerala", desc: "One of the most important places of worship for Hindus in Kerala. | केरल में हिंदुओं के लिए सबसे महत्वपूर्ण पूजा स्थलों में से एक।" },
    { file: "Tripureshwari Temple.jpg", name: "Tripureshwari Temple", loc: "Udaipur, Tripura", desc: "A famous Shakti Peetha located in Tripura. | त्रिपुरा में स्थित एक प्रसिद्ध शक्तिपीठ।" },
    { file: "Uma Devi Temple.jpg", name: "Uma Devi Temple", loc: "Karnaprayag, Uttarakhand", desc: "An ancient shrine located at the confluence of Alaknanda and Pindar rivers. | अलकनंदा और पिंडर नदियों के संगम पर स्थित एक प्राचीन मंदिर।" },
    { file: "Ranbireshwar Temple — Jammu.jpg", name: "Ranbireshwar Temple", loc: "Jammu, Jammu & Kashmir", desc: "A prominent Shiva temple featuring a massive crystal lingam. | एक विशाल क्रिस्टल शिवलिंग वाला प्रमुख शिव मंदिर।" },
    { file: "Kushmanda Devi Temple — Ghatampur.jpg", name: "Kushmanda Devi Temple", loc: "Ghatampur, Uttar Pradesh", desc: "A revered temple dedicated to the fourth form of Goddess Durga. | देवी दुर्गा के चौथे स्वरूप को समर्पित एक पूजनीय मंदिर।" },
    { file: "Sankatha Devi Temple.jpg", name: "Sankatha Devi Temple", loc: "Varanasi, Uttar Pradesh", desc: "A prominent temple dedicated to the Goddess of Remedies. | उपचार की देवी को समर्पित एक प्रमुख मंदिर।" },
    { file: "Navagraha Temple — Guwahati.jpg", name: "Navagraha Temple", loc: "Guwahati, Assam", desc: "An ancient temple dedicated to the nine celestial bodies. | नौ ग्रहों (खगोलीय पिंडों) को समर्पित एक प्राचीन मंदिर।" },
    { file: "Kirateshwar Mahadev Temple.jpg", name: "Kirateshwar Mahadev Temple", loc: "Legship, Sikkim", desc: "A prominent Shiva temple situated on the banks of the Rangeet River. | रंगीत नदी के तट पर स्थित एक प्रमुख शिव मंदिर।" },
    { file: "Lepakshi Veerabhadra Temple.jpg", name: "Veerabhadra Temple", loc: "Lepakshi, Andhra Pradesh", desc: "Known for its hanging pillar and magnificent Vijayanagara architectural style. | अपने लटकते स्तंभ और शानदार विजयनगर वास्तुकला शैली के लिए जाना जाता है।" },
    { file: "Srikalahasti Temple.jpg", name: "Srikalahasti Temple", loc: "Srikalahasti, Andhra Pradesh", desc: "An ancient Shiva temple known as the Kailash of the South. | एक प्राचीन शिव मंदिर जिसे दक्षिण के कैलाश के रूप में जाना जाता है।" },
    { file: "Birla Mandir — Hyderabad.jpg", name: "Birla Mandir", loc: "Hyderabad, Telangana", desc: "A majestic marble temple dedicated to Lord Venkateswara. | भगवान वेंकटेश्वर को समर्पित एक राजसी संगमरमर का मंदिर।" },
    { file: "Yadadri Lakshmi Narasimha Temple.jpg", name: "Yadadri Temple", loc: "Yadadri, Telangana", desc: "A grand renovated cave temple dedicated to Lord Narasimha. | भगवान नरसिंह को समर्पित एक भव्य पुनर्निर्मित गुफा मंदिर।" },
    { file: "Thiruchendur Murugan Temple.jpg", name: "Thiruchendur Murugan Temple", loc: "Thiruchendur, Tamil Nadu", desc: "A famous shore temple dedicated to Lord Murugan. | भगवान मुरुगन को समर्पित एक प्रसिद्ध तटीय मंदिर।" },
    { file: "Virupaksha Temple — Hampi.jpg", name: "Virupaksha Temple", loc: "Hampi, Karnataka", desc: "An ancient magnificent Shiva temple in the ruins of Vijayanagara. | विजयनगर के खंडहरों में स्थित भगवान शिव का एक प्राचीन और शानदार मंदिर।" },
    { file: "Eklingji Temple.jpg", name: "Eklingji Temple", loc: "Udaipur, Rajasthan", desc: "A complex of 108 temples dedicated to Lord Shiva. | भगवान शिव को समर्पित 108 मंदिरों का एक परिसर।" },
    { file: "Karni Mata Temple — Deshnok.jpg", name: "Karni Mata Temple", loc: "Deshnok, Rajasthan", desc: "The famous rat temple dedicated to Goddess Karni Mata. | देवी करणी माता को समर्पित प्रसिद्ध चूहों वाला मंदिर।" },
    { file: "Mahalakshmi Temple — Kolhapur.jpg", name: "Mahalakshmi Temple", loc: "Kolhapur, Maharashtra", desc: "A revered Shakti Peetha dedicated to Goddess Mahalakshmi (Ambabai). | देवी महालक्ष्मी (अंबाबाई) को समर्पित एक पूजनीय शक्तिपीठ।" },
    { file: "Hatkoti Temple.jpg", name: "Hatkoti Temple", loc: "Hatkoti, Himachal Pradesh", desc: "An ancient temple dedicated to Goddess Mahishasuramardini. | देवी महिषासुरमर्दिनी को समर्पित एक प्राचीन मंदिर।" },
    { file: "Madan Kamdev Temple — Assam.jpg", name: "Madan Kamdev Temple", loc: "Baihata, Assam", desc: "Known as the Khajuraho of Assam, featuring ancient archaeological ruins. | असम का खजुराहो, जो अपने प्राचीन पुरातात्विक खंडहरों के लिए जाना जाता है।" },
    { file: "Padmanabhaswamy.jpg", name: "Padmanabhaswamy Temple", loc: "Thiruvananthapuram, Kerala", desc: "The richest Hindu temple in the world dedicated to Lord Vishnu. | भगवान विष्णु को समर्पित दुनिया का सबसे अमीर हिंदू मंदिर।" },
    { file: "Murudeshwar.jpg", name: "Murudeshwar Temple", loc: "Murdeshwar, Karnataka", desc: "Famous for the world's second-tallest Shiva statue on the Arabian Sea coast. | अरब सागर के तट पर स्थित दुनिया की दूसरी सबसे ऊंची शिव प्रतिमा के लिए प्रसिद्ध।" },
    { file: "Arunachaleswarar.jpg", name: "Arunachaleswarar Temple", loc: "Tiruvannamalai, Tamil Nadu", desc: "A massive temple dedicated to Lord Shiva, associated with the element of fire. | अग्नि तत्व से जुड़े भगवान शिव को समर्पित एक विशाल मंदिर।" },
    { file: "Siddhivinayak Mumbai.jpg", name: "Siddhivinayak Temple", loc: "Mumbai, Maharashtra", desc: "One of the most famous and visited Ganesha temples in India. | भारत के सबसे प्रसिद्ध और दर्शन किए जाने वाले गणेश मंदिरों में से एक।" },
    { file: "Khatu Shyam.jpg", name: "Khatu Shyam Temple", loc: "Khatushyamji, Rajasthan", desc: "A highly revered pilgrimage site dedicated to Lord Krishna's devotee, Barbarika. | भगवान कृष्ण के भक्त बर्बरीक (खाटू श्याम) को समर्पित एक अत्यधिक पूजनीय तीर्थस्थल।" },
    { file: "Dakshineswar Kali.jpg", name: "Dakshineswar Kali Temple", loc: "Kolkata, West Bengal", desc: "A famous Kali temple located on the eastern bank of the Hooghly River. | हुगली नदी के पूर्वी तट पर स्थित एक प्रसिद्ध काली मंदिर।" },
    { file: "Ambaji.jpg", name: "Ambaji Temple", loc: "Ambaji, Gujarat", desc: "A major Shakti Peetha where there is no idol, but a holy Yantra is worshipped. | एक प्रमुख शक्तिपीठ जहां कोई मूर्ति नहीं है, बल्कि एक पवित्र यंत्र की पूजा होती है।" },
    { file: "Varadharaja Perumal Temple — Kanchipuram.jpg", name: "Varadharaja Perumal Temple", loc: "Kanchipuram, Tamil Nadu", desc: "A famous Vishnu temple and one of the 108 Divya Desams. | एक प्रसिद्ध विष्णु मंदिर और 108 दिव्य देशमों में से एक।" },
    { file: "Chennakeshava Temple — Belur.jpg", name: "Chennakeshava Temple", loc: "Belur, Karnataka", desc: "A marvel of Hoysala architecture dedicated to Lord Vishnu. | भगवान विष्णु को समर्पित होयसल वास्तुकला का एक अजूबा।" },
    { file: "Kaleshwaram Mukteswara Temple.jpg", name: "Kaleshwaram Mukteswara Temple", loc: "Kaleshwaram, Telangana", desc: "Unique temple featuring two Shiva Lingas on a single pedestal. | एक ही वेदी पर दो शिवलिंगों वाला एक अनूठा मंदिर।" },
    { file: "Shrinathji Temple — Nathdwara.jpg", name: "Shrinathji Temple", loc: "Nathdwara, Rajasthan", desc: "A major pilgrimage site dedicated to Shrinathji, a form of Lord Krishna. | भगवान कृष्ण के स्वरूप श्रीनाथजी को समर्पित एक प्रमुख तीर्थस्थल।" },
    { file: "Aundha Nagnath Temple.jpg", name: "Aundha Nagnath Temple", loc: "Hingoli, Maharashtra", desc: "An ancient temple believed to be the eighth of the 12 Jyotirlingas. | एक प्राचीन मंदिर जिसे 12 ज्योतिर्लिंगों में से आठवां माना जाता है।" },
    { file: "Mansa Devi Temple — Haridwar.jpg", name: "Mansa Devi Temple", loc: "Haridwar, Uttarakhand", desc: "A famous hilltop temple dedicated to Goddess Mansa Devi. | देवी मनसा को समर्पित एक प्रसिद्ध पहाड़ी मंदिर।" },
    { file: "Peer Kho Temple — Jammu.jpg", name: "Peer Kho Temple", loc: "Jammu, Jammu & Kashmir", desc: "A renowned cave temple dedicated to Lord Shiva. | भगवान शिव को समर्पित एक प्रसिद्ध गुफा मंदिर।" },
    { file: "Chhatarpur Temple Delhi.jpg", name: "Chhatarpur Temple", loc: "New Delhi", desc: "A magnificent temple complex dedicated to Goddess Katyayani. | देवी कात्यायनी को समर्पित एक शानदार मंदिर परिसर।" },
    { file: "Sabarimala.jpg", name: "Sabarimala Temple", loc: "Pathanamthitta, Kerala", desc: "A prominent hill shrine dedicated to Lord Ayyappa. | भगवान अय्यप्पा को समर्पित एक प्रमुख पहाड़ी तीर्थस्थल।" },
    { file: "Brihadeeswarar.jpg", name: "Brihadeeswarar Temple", loc: "Thanjavur, Tamil Nadu", desc: "A UNESCO World Heritage site and a brilliant example of Chola architecture. | यूनेस्को विश्व धरोहर स्थल और चोल वास्तुकला का एक शानदार उदाहरण।" },
    { file: "Chidambaram Nataraja.jpg", name: "Chidambaram Nataraja Temple", loc: "Chidambaram, Tamil Nadu", desc: "A famous temple where Lord Shiva is worshipped in his dancing form, Nataraja. | प्रसिद्ध मंदिर जहां भगवान शिव की उनके नटराज (नृत्य) रूप में पूजा की जाती है।" },
    { file: "Brahma Temple Pushkar.jpg", name: "Brahma Temple", loc: "Pushkar, Rajasthan", desc: "One of the very few existing temples dedicated to the Hindu creator-god Brahma. | हिंदू निर्माता भगवान ब्रह्मा को समर्पित बहुत कम मौजूदा मंदिरों में से एक।" },
    { file: "Shrinathji.jpg", name: "Shrinathji (Balak Form)", loc: "Nathdwara, Rajasthan", desc: "Revered shrine of Lord Krishna as a seven-year-old child. | सात साल के बच्चे (बालक) के रूप में भगवान कृष्ण का पूजनीय मंदिर।" },
    { file: "Tarapith.jpg", name: "Tarapith", loc: "Birbhum, West Bengal", desc: "A highly revered Tantric Hindu temple dedicated to Goddess Tara. | देवी तारा को समर्पित एक अत्यधिक पूजनीय तांत्रिक हिंदू मंदिर।" },
    { file: "Dharmasthala Manjunatha Temple — Dharmasthala.jpg", name: "Manjunatha Temple", loc: "Dharmasthala, Karnataka", desc: "An 800-year-old religious institution housing Lord Shiva (Manjunatha). | भगवान शिव (मंजुनाथ) का 800 साल पुराना धार्मिक संस्थान।" },
    { file: "Udupi Sri Krishna Temple — Udupi.jpg", name: "Udupi Sri Krishna Temple", loc: "Udupi, Karnataka", desc: "A famous Hindu temple dedicated to Lord Krishna and Dvaita matha. | भगवान कृष्ण और द्वैत मठ को समर्पित एक प्रसिद्ध हिंदू मंदिर।" },
    { file: "Moti Dungri Ganesh.jpg", name: "Moti Dungri Ganesh", loc: "Jaipur, Rajasthan", desc: "A popular Ganesha temple situated on a small hill in Jaipur. | जयपुर में एक छोटी पहाड़ी पर स्थित एक लोकप्रिय गणेश मंदिर।" },
    { file: "Mehandipur Balaji Temple.jpg", name: "Mehandipur Balaji Temple", loc: "Dausa, Rajasthan", desc: "A famous temple dedicated to Lord Hanuman, known for ritualistic healing. | भगवान हनुमान को समर्पित एक प्रसिद्ध मंदिर, जो अनुष्ठानिक उपचार के लिए जाना जाता है।" },
    { file: "Ganpatipule Temple.jpg", name: "Ganpatipule Temple", loc: "Ratnagiri, Maharashtra", desc: "A 400-year-old Ganesha temple situated on a spectacular beach. | एक शानदार समुद्र तट पर स्थित 400 साल पुराना गणेश मंदिर।" },
    { file: "Chandi Devi Temple — Haridwar.jpg", name: "Chandi Devi Temple", loc: "Haridwar, Uttarakhand", desc: "A highly revered hilltop temple dedicated to Goddess Chandi. | देवी चंडी को समर्पित एक अत्यधिक पूजनीय पहाड़ी मंदिर।" },
    { file: "Rajiv Lochan Temple — Rajim.jpg", name: "Rajiv Lochan Temple", loc: "Rajim, Chhattisgarh", desc: "An ancient temple dedicated to Lord Vishnu, located at the Triveni Sangam. | त्रिवेणी संगम पर स्थित भगवान विष्णु को समर्पित एक प्राचीन मंदिर।" },
    { file: "Laxminarayan Temple - Delhi.jpg", name: "Laxminarayan Temple (Birla Mandir)", loc: "New Delhi", desc: "Also known as Birla Mandir, dedicated to Lord Vishnu and Goddess Lakshmi. | इसे बिड़ला मंदिर भी कहा जाता है, जो भगवान विष्णु और देवी लक्ष्मी को समर्पित है।" },
    { file: "Udupi Krishna.jpg", name: "Udupi Krishna Matha", loc: "Udupi, Karnataka", desc: "The historic Sri Krishna Matha known for its unique 'Kanakana Kindi' viewing window. | ऐतिहासिक श्री कृष्ण मठ जो अपनी अनूठी 'कनकन किंडी' (दर्शन खिड़की) के लिए जाना जाता है।" },
    { file: "Srirangam.jpg", name: "Sri Ranganathaswamy Temple", loc: "Srirangam, Tamil Nadu", desc: "One of the most illustrious Vaishnava temples in South India. | दक्षिण भारत के सबसे शानदार वैष्णव मंदिरों में से एक।" },
    { file: "Shirdi.jpg", name: "Shirdi Sai Baba Temple", loc: "Shirdi, Maharashtra", desc: "The famous pilgrimage site and resting place of the revered spiritual leader Sai Baba. | श्रद्धेय आध्यात्मिक गुरु साईं बाबा का प्रसिद्ध तीर्थस्थल और विश्राम स्थल।" },
    { file: "Salasar Balaji.jpg", name: "Salasar Balaji Temple", loc: "Churu, Rajasthan", desc: "A prominent place of worship for Lord Hanuman devotees. | भगवान हनुमान के भक्तों के लिए पूजा का एक प्रमुख स्थान।" },
    { file: "Rajrappa Chhinnamasta.jpg", name: "Rajrappa Chhinnamasta Temple", loc: "Ramgarh, Jharkhand", desc: "A famous Shakti temple dedicated to the headless Goddess Chhinnamasta. | बिना सिर वाली देवी छिन्नमस्ता को समर्पित एक प्रसिद्ध शक्ति मंदिर।" },
    { file: "Vishnupad — Gaya.jpg", name: "Vishnupad Temple", loc: "Gaya, Bihar", desc: "An ancient temple containing a 40 cm long footprint of Lord Vishnu. | एक प्राचीन मंदिर जिसमें भगवान विष्णु का 40 सेमी लंबा पदचिह्न है।" },
    { file: "Kapaleeshwarar Temple — Chennai.jpg", name: "Kapaleeshwarar Temple", loc: "Chennai, Tamil Nadu", desc: "A masterpiece of Dravidian architecture dedicated to Lord Shiva. | भगवान शिव को समर्पित द्रविड़ वास्तुकला का एक उत्कृष्ट उदाहरण।" },
    { file: "Jagannath Temple — Puri.jpg", name: "Jagannath Temple", loc: "Puri, Odisha", desc: "A famous, sacred Hindu temple dedicated to Lord Jagannath and a part of the Char Dham. | भगवान जगन्नाथ को समर्पित एक प्रसिद्ध, पवित्र हिंदू मंदिर और चार धाम का एक हिस्सा।" },
    { file: "Kataragama Temple.jpg", name: "Kataragama Temple", loc: "Kataragama, Sri Lanka", desc: "A temple complex dedicated to Buddhist guardian deity Kataragama deviyo and Hindu God Murugan. | बौद्ध रक्षक देवता कतरगामा देवियो और हिंदू देवता मुरुगन को समर्पित एक मंदिर परिसर।" },
    { file: "Chatteshwari Temple — Chattogram.jpg", name: "Chatteshwari Temple", loc: "Chattogram, Bangladesh", desc: "A highly revered Shakti Peetha located in the center of Chittagong city. | चटगाँव शहर के केंद्र में स्थित एक अत्यधिक पूजनीय शक्तिपीठ।" },
    { file: "Tara Tarini Temple — Ganjam.jpg", name: "Tara Tarini Temple", loc: "Ganjam, Odisha", desc: "One of the oldest pilgrimage centers of the Hindu mother goddess on the Kumari hills. | कुमारी पहाड़ियों पर हिंदू देवी माँ के सबसे पुराने तीर्थ केंद्रों में से एक।" },
    { file: "Munneswaram Temple — Chilaw.jpg", name: "Munneswaram Temple", loc: "Chilaw, Sri Lanka", desc: "An important regional Hindu temple complex in Sri Lanka that has been in existence since 1000 CE. | श्रीलंका में एक महत्वपूर्ण क्षेत्रीय हिंदू मंदिर परिसर जो 1000 ईस्वी से अस्तित्व में है।" },
    { file: "Changu Narayan Temple — Bhaktapur.jpg", name: "Changu Narayan Temple", loc: "Bhaktapur, Nepal", desc: "Considered the oldest temple in Nepal, dedicated to Lord Vishnu. | इसे नेपाल का सबसे पुराना मंदिर माना जाता है, जो भगवान विष्णु को समर्पित है।" },
    { file: "Maa Samaleswari Temple — Sambalpur.jpg", name: "Maa Samaleswari Temple", loc: "Sambalpur, Odisha", desc: "A prominent 16th-century temple dedicated to Goddess Samaleswari. | देवी समलेश्वरी को समर्पित 16वीं सदी का एक प्रमुख मंदिर।" },
    { file: "Adinath Temple — Maheshkhali.jpg", name: "Adinath Temple", loc: "Maheshkhali, Bangladesh", desc: "A Shiva temple located on the summit of the Mainak Hill. | मैनाक पहाड़ी की चोटी पर स्थित एक शिव मंदिर।" },
    { file: "Pashupatinath Temple — Kathmandu.jpg", name: "Pashupatinath Temple", loc: "Kathmandu, Nepal", desc: "A famous, sacred Hindu temple complex dedicated to Lord Pashupatinath (Shiva) on the Bagmati River. | बागमती नदी के तट पर भगवान पशुपतिनाथ (शिव) को समर्पित एक प्रसिद्ध, पवित्र हिंदू मंदिर परिसर।" }
];

function App() {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedTemple, setSelectedTemple] = useState(null);
    const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'dark');

    useEffect(() => {
        document.body.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    }, [theme]);

    useEffect(() => {
        document.body.style.overflow = selectedTemple ? 'hidden' : 'auto';
    }, [selectedTemple]);

    const toggleTheme = () => setTheme(prev => prev === 'light' ? 'dark' : 'light');

    const filteredTemples = useMemo(() => {
        const term = searchTerm.toLowerCase();
        return templeData.filter(temple =>
            temple.name.toLowerCase().includes(term) ||
            temple.loc.toLowerCase().includes(term) ||
            temple.desc.toLowerCase().includes(term)
        );
    }, [searchTerm]);

    return (
        <div className="app-container">
            <nav className="navbar">
                <div className="nav-brand">🛕 Mandir Darshan</div>
                <button className="theme-btn" onClick={toggleTheme}>
                    {theme === 'dark' ? '☀️' : '🌙'}
                </button>
            </nav>

            <header className="hero">
                <h1 className="text-2-5d">MANDIR DARSHAN</h1>
                <p className="subtitle">Explore the sacred temples of India & Beyond</p>
                
                <div className="search-container">
                    <span>🔍</span>
                    <input 
                        type="text" 
                        className="search-input"
                        placeholder="Search temples, deities, locations..." 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </header>

            <main className="gallery-section">
                <div className="gallery-grid">
                    {filteredTemples.length > 0 ? (
                        filteredTemples.map((temple, idx) => (
                            <div key={idx} className="card" onClick={() => setSelectedTemple(temple)}>
                                <img src={`public/${temple.file}`} alt={temple.name} loading="lazy" />
                                <div className="card-content">
                                    <h3 className="card-title">{temple.name}</h3>
                                    <p className="card-location">📍 {temple.loc}</p>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="no-results">No temples found matching your search.</div>
                    )}
                </div>
            </main>

            {/* Beautiful Apology / Disclaimer Footer */}
            <footer className="footer-disclaimer">
                <p>
                    <span className="footer-highlight">🙏 Kshama Prarthana (Disclaimer)</span>
                    If any image, location, or information presented here is incorrect or unintentionally hurts anyone's religious sentiments, we sincerely apologize from the bottom of our hearts. This digital gallery is a humble effort created with pure devotion and utmost respect for all beliefs. <br/>(अगर अनजाने में किसी भी चित्र या जानकारी से किसी की भावनाओं को ठेस पहुंची हो, तो हम हृदय से क्षमाप्रार्थी हैं।)
                </p>
            </footer>

            {/* Modal - Sirf tab dikhega jab koi mandir select hoga */}
            {selectedTemple && (
                <div className="modal-overlay" onClick={() => setSelectedTemple(null)}>
                    <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
                        <button className="close-btn" onClick={() => setSelectedTemple(null)}>×</button>
                        <div className="modal-image-container">
                            <img src={`public/${selectedTemple.file}`} alt={selectedTemple.name} />
                        </div>
                        <div className="modal-info">
                            <h2>{selectedTemple.name}</h2>
                            <p className="modal-location">📍 {selectedTemple.loc}</p>
                            <div className="modal-desc-box">
                                <p>{selectedTemple.desc}</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);