import React, { useState, useEffect, useMemo } from 'react';
import './App.css';

// Temple Database
const templeData = [
    { file: "asthabhujadevi.jpg", name: "Ashtabhuja Devi", loc: "Vindhyachal, Uttar Pradesh", desc: "A prominent temple dedicated to Goddess Ashtabhuja, situated on the scenic Vindhya mountain range." },
    { file: "vindhyavasinidevi.jpg", name: "Vindhyavasini Devi", loc: "Vindhyachal, Uttar Pradesh", desc: "One of the most revered Shakti Peethas situated on the banks of the river Ganges." },
    { file: "vaishno devi.jpg", name: "Vaishno Devi", loc: "Katra, Jammu and Kashmir", desc: "A holy cave shrine dedicated to Shakti, located in the Trikuta Mountains." },
    { file: "mrityunajaymahadev.jpg", name: "Mrityunjay Mahadev", loc: "Varanasi, Uttar Pradesh", desc: "An ancient temple dedicated to Lord Shiva, known to cure ailments and conquer death." },
    { file: "annapurna.jpg", name: "Annapurna Temple", loc: "Varanasi, Uttar Pradesh", desc: "Dedicated to Goddess Annapurna, the deity of food and nourishment." },
    { file: "durgakand.jpg", name: "Durga Kund", loc: "Varanasi, Uttar Pradesh", desc: "An 18th-century temple dedicated to Goddess Durga, painted in vibrant red." },
    { file: "kalbhairav.jpg", name: "Kaal Bhairav", loc: "Varanasi, Uttar Pradesh", desc: "Dedicated to Kaal Bhairav, the fierce manifestation of Lord Shiva and the protector of Varanasi." },
    { file: "kashivishwanath.jpg", name: "Kashi Vishwanath", loc: "Varanasi, Uttar Pradesh", desc: "One of the most famous Hindu temples and one of the twelve Jyotirlingas dedicated to Lord Shiva." },
    { file: "nageshwarnath.jpg", name: "Nageshwarnath", loc: "Ayodhya, Uttar Pradesh", desc: "Established by Kush, son of Lord Rama, dedicated to Lord Shiva." },
    { file: "kanakbhawan.jpg", name: "Kanak Bhawan", loc: "Ayodhya, Uttar Pradesh", desc: "A beautifully decorated temple gifted to Goddess Sita by Kaikeyi." },
    { file: "hanumangarhi.jpg", name: "Hanuman Garhi", loc: "Ayodhya, Uttar Pradesh", desc: "A 10th-century temple dedicated to Lord Hanuman, approached by 76 steps." },
    { file: "ram-murti.webp", name: "Ram Mandir (Ram Murti)", loc: "Ayodhya, Uttar Pradesh", desc: "The grand temple marking the birthplace of Lord Shri Ram." },
    { file: "ratanawali.jpg", name: "Ratnavali Shakti Peeth", loc: "Hooghly, West Bengal", desc: "A sacred Shakti Peeth where the right shoulder of Devi Sati is believed to have fallen." },
    { file: "janasthan.jpg", name: "Janasthan Shakti Peeth", loc: "Nashik, Maharashtra", desc: "Also known as Bhramari, it is where the chin of Devi Sati fell." },
    { file: "mithila.jpg", name: "Mithila Shakti Peeth", loc: "Janakpur, Nepal border", desc: "A revered site where the left shoulder of Sati fell, represented by Goddess Uma." },
    { file: "mahamaya.jpg", name: "Mahamaya Temple", loc: "Amarnath, Jammu and Kashmir", desc: "A powerful shrine dedicated to Goddess Mahamaya." },
    { file: "indrakshi.jpg", name: "Indrakshi Shakti Peeth", loc: "Nainativu, Sri Lanka", desc: "The site where the anklets of Devi Sati fell." },
    { file: "jayanti.jpg", name: "Jayanti Shakti Peeth", loc: "Baurbhag, Meghalaya", desc: "Dedicated to Goddess Jayanti, where the left thigh of Sati fell." },
    { file: "panchsagar.jpg", name: "Panchsagar Shakti Peeth", loc: "Varanasi, Uttar Pradesh", desc: "Where the lower jaw of Sati is believed to have fallen." },
    { file: "nandikeshwari.jpg", name: "Nandikeshwari Temple", loc: "Birbhum, West Bengal", desc: "A renowned Shakti Peeth where the necklace of Devi Sati fell." },
    { file: "chandrabhaga.jpg", name: "Chandrabhaga", loc: "Prabhas Patan, Gujarat", desc: "Located near Somnath, representing the stomach of Sati." },
    { file: "maniband.png", name: "Manibandh Shakti Peeth", loc: "Pushkar, Rajasthan", desc: "The sacred site where the wrists of Goddess Sati fell." },
    { file: "kankalitala.png", name: "Kankalitala", loc: "Bolpur, West Bengal", desc: "A famous Shakti Peeth on the banks of the Kopai River where the pelvis of Sati fell." },
    { file: "kiriteshwari.jpg", name: "Kiriteshwari Temple", loc: "Murshidabad, West Bengal", desc: "Considered as the sleeping place of Devi Sati, where her crown (kirit) fell." },
    { file: "kanyakumari.jpg", name: "Kanyakumari Temple", loc: "Kanyakumari, Tamil Nadu", desc: "Dedicated to Devi Kanya Kumari, located at the southernmost tip of India." },
    { file: "biraja.jpg", name: "Biraja Temple", loc: "Jajpur, Odisha", desc: "An ancient Hindu temple where the navel of Sati fell." },
    { file: "avanti.jpg", name: "Avanti (Harsiddhi Mata)", loc: "Ujjain, Madhya Pradesh", desc: "A powerful Shakti Peeth where the elbow of Sati fell." },
    { file: "bakreshwar.jpg", name: "Bakreshwar Temple", loc: "Birbhum, West Bengal", desc: "Known for its hot springs and as the site where the mind (center of brows) of Sati fell." },
    { file: "bahulla.jpg", name: "Bahula Shakti Peeth", loc: "Burdwan, West Bengal", desc: "Where the left arm of Goddess Sati is believed to have fallen." },
    { file: "fullara.jpg", name: "Attahas (Fullara)", loc: "Birbhum, West Bengal", desc: "A revered site where the lips of Devi Sati fell." },
    { file: "guhyeshwari.jpg", name: "Guhyeshwari Temple", loc: "Kathmandu, Nepal", desc: "A highly revered Shakti Peeth near Pashupatinath." },
    { file: "gandakitemple.jpg", name: "Gandaki Chandi", loc: "Muktinath, Nepal", desc: "The site where the temple (head) of Devi Sati fell." },
    { file: "nainadevi.jpg", name: "Naina Devi", loc: "Bilaspur, Himachal Pradesh", desc: "A famous hilltop temple where the eyes of Devi Sati fell." },
    { file: "bramarambamata.jpg", name: "Bhramaramba Mata", loc: "Srisailam, Andhra Pradesh", desc: "Located within the Mallikarjuna Jyotirlinga complex." },
    { file: "kanchikamaskhi.jpg", name: "Kanchi Kamakshi", loc: "Kanchipuram, Tamil Nadu", desc: "A majestic temple representing the naval of the Goddess." },
    { file: "shankaridevi.jpg", name: "Shankari Devi", loc: "Trincomalee, Sri Lanka", desc: "An ancient Shakti Peeth located in the Koneswaram temple complex." },
    { file: "bhabani.jpg", name: "Bhavani (Tuljapur)", loc: "Tuljapur, Maharashtra", desc: "Dedicated to Goddess Bhavani, the family deity of Chhatrapati Shivaji Maharaj." },
    { file: "jeshorehwarikali.jpg", name: "Jeshoreshwari Kali", loc: "Satkhira, Bangladesh", desc: "A sacred site where the palms of Devi Sati fell." },
    { file: "chandranath-shaktipeeth.jpg", name: "Chandranath Temple", loc: "Sitakunda, Bangladesh", desc: "Located on top of the Chandranath hill, representing Sati's right arm." },
    { file: "sugandha-devi-shaktipeeth.jpg", name: "Sugandha Shakti Peeth", loc: "Barisal, Bangladesh", desc: "Where the nose of Devi Sati is believed to have fallen." },
    { file: "shailshakti.webp", name: "Shailputri Mata", loc: "Varanasi, Uttar Pradesh", desc: "Dedicated to the first form of Goddess Durga worshipped during Navratri." },
    { file: "shaptashrungi.jpg", name: "Saptashrungi", loc: "Vani, Maharashtra", desc: "A site of pilgrimage situated on seven hills, housing the half-Shakti Peeth." },
    { file: "vishalakshi.jpg", name: "Vishalakshi Temple", loc: "Varanasi, Uttar Pradesh", desc: "The wide-eyed Goddess, where the earrings of Sati fell." },
    { file: "lalitadevi.webp", name: "Lalita Devi", loc: "Prayagraj, Uttar Pradesh", desc: "A major Shakti Peeth where the fingers of Devi Sati fell." },
    { file: "shardapeeth.jpg", name: "Sharda Peeth", loc: "Neelum Valley, POK", desc: "An ancient centre of learning and a highly revered Kashmiri Pandit temple." },
    { file: "Hinglajmata.jpg", name: "Hinglaj Mata", loc: "Balochistan, Pakistan", desc: "A cave temple and a major Shakti Peeth where the head of Sati fell." },
    { file: "devitalab.jpg", name: "Devi Talab Mandir", loc: "Jalandhar, Punjab", desc: "A 200-year-old temple dedicated to Goddess Durga, featuring a sacred pond." },
    { file: "mayadevi.jpg", name: "Maya Devi Temple", loc: "Haridwar, Uttarakhand", desc: "The presiding deity of Haridwar, where the heart and navel of Sati fell." },
    { file: "danteshwarimata.jpg", name: "Danteshwari Mata", loc: "Dantewada, Chhattisgarh", desc: "Dedicated to Goddess Danteshwari, where the tooth of Sati fell." },
    { file: "bhadrakali.jpg", name: "Bhadrakali Temple", loc: "Kurukshetra, Haryana", desc: "An ancient temple where the right ankle of Devi Sati is believed to have fallen." },
    { file: "mahakali.jpg", name: "Mahakali Temple", loc: "Pavagadh, Gujarat", desc: "A revered hilltop shrine dedicated to Goddess Mahakali." },
    { file: "patandevi.jpg", name: "Patan Devi", loc: "Patna, Bihar", desc: "The oldest and one of the most sacred temples of Patna, representing Sati's right thigh." },
    { file: "manglagauri.jpg", name: "Mangla Gauri", loc: "Gaya, Bihar", desc: "A prominent Shakti Peeth where the breast of Devi Sati fell." },
    { file: "brajeshwarimata.jpg", name: "Brajeshwari Mata", loc: "Kangra, Himachal Pradesh", desc: "A highly revered temple where the left breast of Sati fell." },
    { file: "jwalamata.webp", name: "Jwala Ji", loc: "Kangra, Himachal Pradesh", desc: "A temple without an idol, where the Goddess is worshipped as a perpetual blue flame." },
    { file: "tripuramata.jpg", name: "Tripura Sundari", loc: "Udaipur, Tripura", desc: "One of the 51 Shakti Peethas, where the right foot of Sati fell." },
    { file: "Kalighatkalitemple.jpg", name: "Kalighat Kali", loc: "Kolkata, West Bengal", desc: "One of the most famous Kali temples in India, where the toes of Sati fell." },
    { file: "kamakhyatemple.jpg", name: "Kamakhya Temple", loc: "Guwahati, Assam", desc: "One of the oldest of the 51 Shakti Pithas, dedicated to the mother goddess Kamakhya." },
    { file: "maa-chintpurni.jpg", name: "Maa Chintpurni", loc: "Una, Himachal Pradesh", desc: "A major pilgrimage site where the feet of Sati fell." },
    { file: "grishneshwar.jpg", name: "Grishneshwar", loc: "Ellora, Maharashtra", desc: "The 12th Jyotirlinga on earth, located near the famous Ellora Caves." },
    { file: "rameshwar.jpg", name: "Ramanathaswamy", loc: "Rameswaram, Tamil Nadu", desc: "A Jyotirlinga temple known for its long corridors and holy water tanks." },
    { file: "vaidyanath.jpg", name: "Baidyanath Jyotirlinga", loc: "Deoghar, Jharkhand", desc: "A revered Jyotirlinga, also known as Baba Baidyanath Dham." },
    { file: "trimbakeshwar.jpg", name: "Trimbakeshwar", loc: "Nashik, Maharashtra", desc: "An ancient Jyotirlinga temple at the source of the Godavari River." },
    { file: "bhimashankar.jpg", name: "Bhimashankar", loc: "Pune, Maharashtra", desc: "A Jyotirlinga situated in the lush Sahyadri hills." },
    { file: "kedarnath.jpg", name: "Kedarnath", loc: "Garhwal Himalayas, Uttarakhand", desc: "The highest Jyotirlinga, located near the Mandakini river." },
    { file: "omkareshwar.jpg", name: "Omkareshwar", loc: "Khandwa, Madhya Pradesh", desc: "A Jyotirlinga situated on an island shaped like the sacred symbol 'Om'." },
    { file: "mahakaleshwar.jpg", name: "Mahakaleshwar", loc: "Ujjain, Madhya Pradesh", desc: "A prominent Jyotirlinga known for its unique Bhasma Aarti." },
    { file: "somnath-jyotirlinga-temple.jpg", name: "Somnath", loc: "Prabhas Patan, Gujarat", desc: "The first among the twelve Jyotirlinga shrines of Shiva." },
    { file: "bankebihari.jpg", name: "Banke Bihari", loc: "Vrindavan, Uttar Pradesh", desc: "A highly revered temple dedicated to Lord Krishna in his child form." },
    { file: "bhuteshwarmahadev.jpg", name: "Bhuteshwar Mahadev", loc: "Mathura, Uttar Pradesh", desc: "An ancient shrine dedicated to Lord Shiva in the holy city of Mathura." },
    { file: "rangeshwarmahadev.jpg", name: "Rangeshwar Mahadev", loc: "Mathura, Uttar Pradesh", desc: "A significant Shiva temple located in the heart of Mathura." },
    { file: "govinddev.jpg", name: "Govind Dev Ji", loc: "Jaipur, Rajasthan", desc: "A famous Vaishnava temple dedicated to Lord Krishna." },
    { file: "dwarkadheesh.jpg", name: "Dwarkadhish Temple", loc: "Dwarka, Gujarat", desc: "Also known as the Jagat Mandir, dedicated to Lord Krishna." },
    { file: "chandrikadevi.jpg", name: "Chandrika Devi", loc: "Lucknow, Uttar Pradesh", desc: "A serene temple dedicated to Goddess Chandi, situated near the Gomti River." },
    { file: "mankameshwarmahadev.jpg", name: "Mankameshwar Mandir", loc: "Agra, Uttar Pradesh", desc: "An ancient temple dedicated to Lord Shiva, believed to fulfill all wishes." },
    { file: "anandeshwarmahadev.jpg", name: "Anandeshwar Mahadev", loc: "Kanpur, Uttar Pradesh", desc: "A prominent Shiva temple located on the banks of the river Ganga." },
    { file: "kalikhoh.jpg", name: "Kali Khoh Mata", loc: "Vindhyachal, Uttar Pradesh", desc: "A sacred cave temple dedicated to Goddess Kali, nestled in the Vindhya mountains." }
];

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTemple, setSelectedTemple] = useState(null);
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light');

  // Handle Theme Switching
  useEffect(() => {
    document.body.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Handle body scroll locking for modal
  useEffect(() => {
    if (selectedTemple) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [selectedTemple]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  // Real-time Search Filtering
  const filteredTemples = useMemo(() => {
    const lowerSearch = searchTerm.toLowerCase();
    return templeData.filter(temple =>
      temple.name.toLowerCase().includes(lowerSearch) ||
      temple.loc.toLowerCase().includes(lowerSearch) ||
      temple.desc.toLowerCase().includes(lowerSearch)
    );
  }, [searchTerm]);

  return (
    <div className="app-container">
      {/* Navbar */}
      <nav className="navbar">
        <div className="nav-brand">🛕 Mandir Darshan</div>
        <div className="nav-links">
          <a href="#gallery">Temples</a>
          <button className="theme-btn" onClick={toggleTheme} aria-label="Toggle Theme">
            {theme === 'dark' ? '☀️' : '🌙'}
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="hero">
        <h1 className="text-2-5d">MANDIR DARSHAN</h1>
        <p className="subtitle">Explore the sacred temples of India</p>
        
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

      {/* Gallery */}
      <main id="gallery" className="gallery-section">
        <div className="gallery-grid">
          {filteredTemples.length > 0 ? (
            filteredTemples.map((temple, index) => (
              <div 
                key={index} 
                className="card"
                onClick={() => setSelectedTemple(temple)}
              >
                {/* Ensure your images are inside the "public" folder of your React app */}
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

      {/* 2.5D Modal */}
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

export default App;