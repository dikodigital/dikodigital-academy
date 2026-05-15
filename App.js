import { useState } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity,
  StyleSheet, SafeAreaView, StatusBar, Linking,
  TextInput, Platform
} from 'react-native';

const C = {
  bg: '#0A1628',
  card: '#0F1F3D',
  border: '#1E3A5F',
  accent: '#FFD700',
  blue: '#1565C0',
  blue2: '#1976D2',
  blue3: '#42A5F5',
  white: '#FFFFFF',
  text: '#E8F0FE',
  muted: '#7A9CC0',
  dim: '#1A3050',
  green: '#22C55E',
  greenSoft: '#22C55E18',
  red: '#EF4444',
};

const WHATSAPP = '2347034660781';
const PAYMENT_LINK = 'https://flutterwave.com/pay/eipjb8nruhf7';
const INSTRUCTOR = 'Dikodigital';
const ACADEMY = 'Dikodigital Design';
const TAGLINE = 'Master Digital Skills · Get Certified · Earn Money just with your phone';

const COURSES = [
  { id: 1, title: 'Basic Graphics Design', subtitle: 'Start from zero — no laptop needed', level: 'Beginner', price: '₦5,000', lessons: 10, duration: '4 hrs', students: 120, rating: 4.9, color: '#1976D2', emoji: '🎨', tag: 'BASIC', category: 'Design',
    objectives: ['Use Canva like a pro', 'Design posters and flyers', 'Understand color theory', 'Create social media graphics'],
    modules: [{ title: 'Introduction to Design', lessons: 3, done: false }, { title: 'Color & Typography', lessons: 3, done: false }, { title: 'Your First Design', lessons: 4, done: false }],
    videos: [{ title: 'Welcome & Course Overview', duration: '5:00', free: true }, { title: 'Design Tools on Your Phone', duration: '10:00', free: true }, { title: 'Understanding Colors', duration: '15:00', free: false }, { title: 'Typography Basics', duration: '12:00', free: false }, { title: 'Creating Your First Poster', duration: '20:00', free: false }],
    resources: ['Design Color Guide PDF', 'Font Collection PDF'],
    quiz: [{ q: 'What are the 3 primary colors?', options: ['Red, Blue, Yellow', 'Red, Green, Blue', 'Black, White, Grey', 'Purple, Orange, Green'], answer: 0 }, { q: 'Which app is best for mobile design?', options: ['WhatsApp', 'Canva', 'TikTok', 'Chrome'], answer: 1 }] },

  { id: 2, title: 'Intermediate Graphics Design', subtitle: 'Level up your design skills', level: 'Intermediate', price: '₦10,000', lessons: 15, duration: '6 hrs', students: 85, rating: 4.8, color: '#7B1FA2', emoji: '🖌️', tag: 'INTER', category: 'Design',
    objectives: ['Advanced Canva techniques', 'Brand identity design', 'Logo creation', 'Professional layouts'],
    modules: [{ title: 'Advanced Color Theory', lessons: 4, done: false }, { title: 'Brand Identity', lessons: 5, done: false }, { title: 'Logo Design', lessons: 6, done: false }],
    videos: [{ title: 'Welcome to Intermediate', duration: '5:00', free: true }, { title: 'Advanced Color Techniques', duration: '18:00', free: true }, { title: 'Creating Brand Identity', duration: '22:00', free: false }, { title: 'Logo Design Masterclass', duration: '25:00', free: false }, { title: 'Professional Portfolio', duration: '20:00', free: false }],
    resources: ['Brand Identity Template', 'Logo Design Checklist'],
    quiz: [{ q: 'What makes a good logo?', options: ['Many colors', 'Simple and memorable', 'Very detailed', 'Large size'], answer: 1 }] },

  { id: 3, title: 'Full Master Graphics Design', subtitle: 'Become a professional designer', level: 'Advanced', price: '₦10,000', lessons: 25, duration: '12 hrs', students: 60, rating: 5.0, color: '#C62828', emoji: '🏆', tag: 'MASTER', category: 'Design',
    objectives: ['Complete design mastery', 'Client projects', 'Freelancing skills', 'Build design portfolio'],
    modules: [{ title: 'Professional Design', lessons: 8, done: false }, { title: 'Client Management', lessons: 8, done: false }, { title: 'Freelancing', lessons: 9, done: false }],
    videos: [{ title: 'Master Course Overview', duration: '5:00', free: true }, { title: 'Professional Design Workflow', duration: '30:00', free: true }, { title: 'Working with Clients', duration: '25:00', free: false }, { title: 'Pricing Your Services', duration: '20:00', free: false }, { title: 'Building Your Portfolio', duration: '35:00', free: false }],
    resources: ['Client Contract Template', 'Pricing Guide', 'Portfolio Template'],
    quiz: [{ q: 'How do you price design work?', options: ['Always free', 'Based on time and skill', 'Fixed ₦100', 'Random'], answer: 1 }] },

  { id: 4, title: 'Basic Video Editing', subtitle: 'Edit videos like a pro on your phone', level: 'Beginner', price: '₦5,000', lessons: 10, duration: '4 hrs', students: 95, rating: 4.8, color: '#00695C', emoji: '🎬', tag: 'BASIC', category: 'Video',
    objectives: ['Use CapCut professionally', 'Add effects and transitions', 'Export in HD', 'Create reels'],
    modules: [{ title: 'CapCut Basics', lessons: 4, done: false }, { title: 'Effects & Transitions', lessons: 3, done: false }, { title: 'Export & Share', lessons: 3, done: false }],
    videos: [{ title: 'Welcome to Video Editing', duration: '5:00', free: true }, { title: 'CapCut Interface Tour', duration: '12:00', free: true }, { title: 'Cutting & Trimming', duration: '15:00', free: false }, { title: 'Adding Effects', duration: '18:00', free: false }, { title: 'Exporting Your Video', duration: '10:00', free: false }],
    resources: ['CapCut Shortcuts Guide', 'Transition Effects List'],
    quiz: [{ q: 'Which app is best for mobile video editing?', options: ['WhatsApp', 'CapCut', 'Calculator', 'Gallery'], answer: 1 }] },

  { id: 5, title: 'Intermediate Video Editing', subtitle: 'Advanced video production skills', level: 'Intermediate', price: '₦10,000', lessons: 15, duration: '7 hrs', students: 55, rating: 4.9, color: '#E65100', emoji: '🎥', tag: 'INTER', category: 'Video',
    objectives: ['Advanced CapCut features', 'Color grading', 'Sound design', 'Content creation'],
    modules: [{ title: 'Advanced Editing', lessons: 5, done: false }, { title: 'Color & Audio', lessons: 5, done: false }, { title: 'Content Strategy', lessons: 5, done: false }],
    videos: [{ title: 'Intermediate Overview', duration: '5:00', free: true }, { title: 'Advanced CapCut Features', duration: '20:00', free: true }, { title: 'Color Grading on Phone', duration: '18:00', free: false }, { title: 'Audio & Sound Design', duration: '15:00', free: false }, { title: 'Creating Viral Content', duration: '22:00', free: false }],
    resources: ['Color Grading Guide', 'Sound Effects List'],
    quiz: [{ q: 'What is color grading?', options: ['Coloring a drawing', 'Adjusting video colors', 'Deleting colors', 'Adding stickers'], answer: 1 }] },

  { id: 6, title: 'Full Video Editing Course', subtitle: 'Complete video production mastery', level: 'Advanced', price: '₦10,000', lessons: 25, duration: '12 hrs', students: 40, rating: 5.0, color: '#1A237E', emoji: '🎞️', tag: 'MASTER', category: 'Video',
    objectives: ['Professional video production', 'YouTube content creation', 'Monetize your videos', 'Build audience'],
    modules: [{ title: 'Pro Video Production', lessons: 8, done: false }, { title: 'YouTube & Social Media', lessons: 8, done: false }, { title: 'Monetization', lessons: 9, done: false }],
    videos: [{ title: 'Full Course Overview', duration: '5:00', free: true }, { title: 'Professional Production Tips', duration: '30:00', free: true }, { title: 'YouTube Channel Setup', duration: '25:00', free: false }, { title: 'Growing Your Audience', duration: '28:00', free: false }, { title: 'Monetizing Your Content', duration: '35:00', free: false }],
    resources: ['YouTube SEO Guide', 'Content Calendar Template'],
    quiz: [{ q: 'How do you monetize YouTube?', options: ['Just posting', 'Ads, sponsors, products', 'Buying views', 'Deleting videos'], answer: 1 }] },

  { id: 7, title: 'Full Image Editing', subtitle: 'Master photo editing on your phone', level: 'Intermediate', price: '₦10,000', lessons: 15, duration: '6 hrs', students: 70, rating: 4.8, color: '#880E4F', emoji: '🖼️', tag: 'FULL', category: 'Design',
    objectives: ['Photo retouching', 'Background removal', 'Color correction', 'Photo manipulation'],
    modules: [{ title: 'Photo Basics', lessons: 5, done: false }, { title: 'Retouching', lessons: 5, done: false }, { title: 'Advanced Effects', lessons: 5, done: false }],
    videos: [{ title: 'Image Editing Overview', duration: '5:00', free: true }, { title: 'Best Photo Apps for Phone', duration: '12:00', free: true }, { title: 'Photo Retouching', duration: '20:00', free: false }, { title: 'Background Removal', duration: '15:00', free: false }, { title: 'Advanced Photo Effects', duration: '25:00', free: false }],
    resources: ['Lightroom Presets', 'Photo Editing Checklist'],
    quiz: [{ q: 'What is photo retouching?', options: ['Deleting photos', 'Improving photo quality', 'Taking selfies', 'Printing photos'], answer: 1 }] },

  { id: 8, title: 'Basic Web Design & Development', subtitle: 'Build websites using your phone', level: 'Beginner', price: '₦5,000', lessons: 12, duration: '5 hrs', students: 50, rating: 4.7, color: '#004D40', emoji: '🌐', tag: 'BASIC', category: 'Tech',
    objectives: ['HTML & CSS basics', 'Build simple websites', 'Mobile-first design', 'Publish online for free'],
    modules: [{ title: 'HTML Basics', lessons: 4, done: false }, { title: 'CSS Styling', lessons: 4, done: false }, { title: 'Publishing', lessons: 4, done: false }],
    videos: [{ title: 'Welcome to Web Design', duration: '5:00', free: true }, { title: 'What is HTML?', duration: '15:00', free: true }, { title: 'Building Your First Page', duration: '20:00', free: false }, { title: 'CSS Styling Basics', duration: '18:00', free: false }, { title: 'Publishing Your Website', duration: '15:00', free: false }],
    resources: ['HTML Cheat Sheet', 'CSS Reference Guide'],
    quiz: [{ q: 'What does HTML stand for?', options: ['HyperText Markup Language', 'High Tech Modern Language', 'Home Tool Markup Language', 'None of these'], answer: 0 }] },

  { id: 9, title: 'Complete Web Design', subtitle: 'Full professional web development', level: 'Advanced', price: '₦10,000', lessons: 25, duration: '15 hrs', students: 35, rating: 5.0, color: '#01579B', emoji: '💻', tag: 'FULL', category: 'Tech',
    objectives: ['Full website development', 'JavaScript basics', 'Responsive design', 'Freelance web projects'],
    modules: [{ title: 'Advanced HTML & CSS', lessons: 8, done: false }, { title: 'JavaScript Basics', lessons: 8, done: false }, { title: 'Freelance Projects', lessons: 9, done: false }],
    videos: [{ title: 'Complete Web Course Intro', duration: '5:00', free: true }, { title: 'Advanced CSS Techniques', duration: '25:00', free: true }, { title: 'JavaScript Fundamentals', duration: '30:00', free: false }, { title: 'Building Real Projects', duration: '35:00', free: false }, { title: 'Getting Web Clients', duration: '20:00', free: false }],
    resources: ['JavaScript Cheat Sheet', 'Web Project Templates'],
    quiz: [{ q: 'What is JavaScript used for?', options: ['Styling pages', 'Making pages interactive', 'Creating images', 'Hosting websites'], answer: 1 }] },

  { id: 10, title: 'Content Writing', subtitle: 'Write content that sells and engages', level: 'Beginner', price: '₦5,000', lessons: 10, duration: '4 hrs', students: 80, rating: 4.8, color: '#33691E', emoji: '✍️', tag: 'BASIC', category: 'Writing',
    objectives: ['Write compelling content', 'SEO writing', 'Social media copy', 'Freelance writing'],
    modules: [{ title: 'Writing Fundamentals', lessons: 3, done: false }, { title: 'SEO & Digital Writing', lessons: 4, done: false }, { title: 'Freelance Writing', lessons: 3, done: false }],
    videos: [{ title: 'Content Writing Overview', duration: '5:00', free: true }, { title: 'Types of Content Writing', duration: '12:00', free: true }, { title: 'Writing for Social Media', duration: '18:00', free: false }, { title: 'SEO Content Writing', duration: '20:00', free: false }, { title: 'Getting Writing Clients', duration: '15:00', free: false }],
    resources: ['Content Writing Templates', 'SEO Keywords Guide'],
    quiz: [{ q: 'What is SEO writing?', options: ['Writing poems', 'Writing for search engines', 'Writing letters', 'Writing code'], answer: 1 }] },

  { id: 11, title: 'Data Analysis', subtitle: 'Analyse data and make smart decisions', level: 'Intermediate', price: '₦10,000', lessons: 15, duration: '8 hrs', students: 45, rating: 4.9, color: '#4527A0', emoji: '📊', tag: 'INTER', category: 'Tech',
    objectives: ['Excel data analysis', 'Charts and graphs', 'Data interpretation', 'Business reports'],
    modules: [{ title: 'Data Basics', lessons: 5, done: false }, { title: 'Excel & Spreadsheets', lessons: 5, done: false }, { title: 'Reports & Insights', lessons: 5, done: false }],
    videos: [{ title: 'Data Analysis Overview', duration: '5:00', free: true }, { title: 'Introduction to Excel', duration: '20:00', free: true }, { title: 'Creating Charts', duration: '18:00', free: false }, { title: 'Data Interpretation', duration: '22:00', free: false }, { title: 'Business Reports', duration: '25:00', free: false }],
    resources: ['Excel Formulas Guide', 'Data Analysis Templates'],
    quiz: [{ q: 'What is data analysis?', options: ['Deleting data', 'Examining data to find insights', 'Storing data', 'Creating data'], answer: 1 }] },

  { id: 12, title: 'Certified Microsoft Office', subtitle: 'Word, Excel, PowerPoint mastery', level: 'Beginner', price: '₦5,000', lessons: 12, duration: '6 hrs', students: 110, rating: 4.8, color: '#BF360C', emoji: '📝', tag: 'CERT', category: 'Office',
    objectives: ['Microsoft Word mastery', 'Excel spreadsheets', 'PowerPoint presentations', 'Get certified'],
    modules: [{ title: 'Microsoft Word', lessons: 4, done: false }, { title: 'Microsoft Excel', lessons: 4, done: false }, { title: 'PowerPoint', lessons: 4, done: false }],
    videos: [{ title: 'Microsoft Office Overview', duration: '5:00', free: true }, { title: 'Word Document Basics', duration: '18:00', free: true }, { title: 'Excel Spreadsheets', duration: '22:00', free: false }, { title: 'PowerPoint Presentations', duration: '20:00', free: false }, { title: 'Certification Exam Prep', duration: '25:00', free: false }],
    resources: ['Office Keyboard Shortcuts', 'Practice Files'],
    quiz: [{ q: 'Which Microsoft app is used for spreadsheets?', options: ['Word', 'Excel', 'PowerPoint', 'Outlook'], answer: 1 }] },

  { id: 13, title: 'Animation', subtitle: 'Create stunning animations on your phone', level: 'Intermediate', price: '₦10,000', lessons: 15, duration: '8 hrs', students: 38, rating: 4.9, color: '#006064', emoji: '🎭', tag: 'INTER', category: 'Design',
    objectives: ['Motion graphics basics', 'Animated logos', 'Video animations', 'Social media animations'],
    modules: [{ title: 'Animation Basics', lessons: 5, done: false }, { title: 'Motion Graphics', lessons: 5, done: false }, { title: 'Advanced Animation', lessons: 5, done: false }],
    videos: [{ title: 'Animation Overview', duration: '5:00', free: true }, { title: 'Animation Principles', duration: '20:00', free: true }, { title: 'Creating Animated Logos', duration: '25:00', free: false }, { title: 'Motion Graphics', duration: '28:00', free: false }, { title: 'Social Media Animations', duration: '22:00', free: false }],
    resources: ['Animation Templates', 'Motion Graphics Pack'],
    quiz: [{ q: 'What is animation?', options: ['Taking photos', 'Creating moving images', 'Editing videos', 'Writing text'], answer: 1 }] },

  { id: 14, title: 'AI Skills', subtitle: 'Use AI tools to work smarter and faster', level: 'Beginner', price: '₦5,000', lessons: 10, duration: '4 hrs', students: 150, rating: 5.0, color: '#1B5E20', emoji: '🤖', tag: 'HOT🔥', category: 'Tech',
    objectives: ['Use ChatGPT effectively', 'AI image generation', 'AI for business', 'Automate your work'],
    modules: [{ title: 'AI Fundamentals', lessons: 3, done: false }, { title: 'AI Tools', lessons: 4, done: false }, { title: 'AI for Business', lessons: 3, done: false }],
    videos: [{ title: 'AI Skills Overview', duration: '5:00', free: true }, { title: 'Introduction to ChatGPT', duration: '15:00', free: true }, { title: 'AI Image Generation', duration: '18:00', free: false }, { title: 'AI for Business & Work', duration: '20:00', free: false }, { title: 'Making Money with AI', duration: '22:00', free: false }],
    resources: ['Top 50 AI Tools Guide', 'ChatGPT Prompts Pack'],
    quiz: [{ q: 'What is ChatGPT?', options: ['A social media', 'An AI chatbot', 'A video game', 'A website'], answer: 1 }] },

  { id: 15, title: 'App Design & Development', subtitle: 'Design and build mobile apps', level: 'Advanced', price: '₦10,000', lessons: 20, duration: '12 hrs', students: 30, rating: 5.0, color: '#37474F', emoji: '📱', tag: 'MASTER', category: 'Tech',
    objectives: ['App UI/UX design', 'Build real apps', 'Publish to Play Store', 'Earn from apps'],
    modules: [{ title: 'App Design Basics', lessons: 6, done: false }, { title: 'App Development', lessons: 7, done: false }, { title: 'Publishing & Earning', lessons: 7, done: false }],
    videos: [{ title: 'App Development Overview', duration: '5:00', free: true }, { title: 'Designing App UI', duration: '25:00', free: true }, { title: 'Building Your First App', duration: '35:00', free: false }, { title: 'Publishing to Play Store', duration: '28:00', free: false }, { title: 'Monetizing Your App', duration: '30:00', free: false }],
    resources: ['App Design Templates', 'Play Store Guide'],
    quiz: [{ q: 'What is UI design?', options: ['User Interface design', 'Underground Internet', 'Unique Identity', 'Universal Input'], answer: 0 }] },

  { id: 16, title: 'Proposal & Project Writing', subtitle: 'Write winning proposals and projects', level: 'Beginner', price: '₦5,000', lessons: 10, duration: '5 hrs', students: 65, rating: 4.8, color: '#4E342E', emoji: '📄', tag: 'BASIC', category: 'Writing',
    objectives: ['Business proposals', 'Seminar papers', 'Project writing', 'Academic writing'],
    modules: [{ title: 'Writing Fundamentals', lessons: 3, done: false }, { title: 'Proposal Writing', lessons: 4, done: false }, { title: 'Project & Seminar', lessons: 3, done: false }],
    videos: [{ title: 'Writing Course Overview', duration: '5:00', free: true }, { title: 'Structure of a Proposal', duration: '15:00', free: true }, { title: 'Writing Business Proposals', duration: '20:00', free: false }, { title: 'Seminar Paper Writing', duration: '18:00', free: false }, { title: 'Project Writing Tips', duration: '22:00', free: false }],
    resources: ['Proposal Template', 'Project Writing Guide'],
    quiz: [{ q: 'What is a business proposal?', options: ['A love letter', 'A document to pitch ideas', 'A receipt', 'A contract'], answer: 1 }] },
];

const CATEGORIES = ['All', 'Design', 'Video', 'Tech', 'Writing', 'Office'];

function SplashScreen() {
  return (
    <View style={s.splashWrap}>
      <View style={s.splashLogo}><Text style={{ fontSize: 44 }}>🎓</Text></View>
      <Text style={s.splashTitle}>{ACADEMY}</Text>
      <Text style={s.splashSub}>{TAGLINE}</Text>
    </View>
  );
}

function HomeScreen({ setScreen, setCourse }) {
  return (
    <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingBottom: 100 }}>
      <View style={s.hero}>
        <View style={s.heroBadge}><Text style={s.heroBadgeTxt}>🇳🇬 Nigeria's #1 Digital Academy</Text></View>
        <Text style={s.heroTitle}>Master Digital{'\n'}<Text style={{ color: C.accent }}>Skills & Earn</Text></Text>
        <Text style={s.heroSub}>{TAGLINE}</Text>
        <View style={{ flexDirection: 'row', gap: 10 }}>
          <TouchableOpacity style={s.heroBt} onPress={() => setScreen(1)}><Text style={s.heroBtTxt}>Browse 16 Courses →</Text></TouchableOpacity>
          <TouchableOpacity style={s.heroWaBt} onPress={() => Linking.openURL(`https://wa.me/${WHATSAPP}`)}><Text style={s.heroWaTxt}>💬 Chat</Text></TouchableOpacity>
        </View>
      </View>

      <View style={s.statsRow}>
        {[{ label: 'Students', value: '1,000+', icon: '👥' }, { label: 'Courses', value: '16', icon: '📚' }, { label: 'Certificate', value: 'Free', icon: '🏆' }, { label: 'Rating', value: '4.9⭐', icon: '✨' }].map((st, i) => (
          <View key={i} style={s.statCard}>
            <Text style={{ fontSize: 18 }}>{st.icon}</Text>
            <Text style={s.statNum}>{st.value}</Text>
            <Text style={s.statLabel}>{st.label}</Text>
          </View>
        ))}
      </View>

      <View style={s.section}>
        <Text style={s.sectionTitle}>🔥 Popular Courses</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {COURSES.slice(0, 6).map(c => (
            <TouchableOpacity key={c.id} style={s.featCard} onPress={() => { setCourse(c); setScreen(4); }}>
              <View style={[s.featImg, { backgroundColor: c.color + '33' }]}><Text style={{ fontSize: 36 }}>{c.emoji}</Text></View>
              <View style={{ padding: 10 }}>
                <Text style={[s.cardTitle, { fontSize: 12 }]} numberOfLines={2}>{c.title}</Text>
                <Text style={{ color: C.accent, fontWeight: '800', fontSize: 13, marginTop: 4 }}>{c.price}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <View style={s.section}>
        <Text style={s.sectionTitle}>💪 Why Choose Us?</Text>
        <View style={s.whyGrid}>
          {[{ icon: '📱', title: 'Phone Only', desc: 'No laptop needed' }, { icon: '🏆', title: 'Certificate', desc: 'Free on completion' }, { icon: '💰', title: 'Earn Money', desc: 'Get paid clients' }, { icon: '💬', title: 'WhatsApp Support', desc: 'Direct instructor help' }, { icon: '🎥', title: 'HD Videos', desc: 'Clear lessons' }, { icon: '⚡', title: 'Fast Learn', desc: 'Short practical lessons' }].map((f, i) => (
            <View key={i} style={s.whyCard}>
              <Text style={{ fontSize: 24, marginBottom: 6 }}>{f.icon}</Text>
              <Text style={s.whyTitle}>{f.title}</Text>
              <Text style={s.whyDesc}>{f.desc}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={[s.section, { marginTop: 8 }]}>
        <TouchableOpacity style={s.payBtn} onPress={() => Linking.openURL(PAYMENT_LINK)}>
          <Text style={s.payBtnTxt}>💳 Pay & Enroll Now</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[s.waBtn, { marginTop: 10 }]} onPress={() => Linking.openURL(`https://wa.me/${WHATSAPP}?text=I want to enroll in a course`)}>
          <Text style={s.waBtnTxt}>💬 Contact Us on WhatsApp</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

function CoursesScreen({ setCourse, setScreen }) {
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');
  const filtered = COURSES.filter(c => {
    const matchCat = filter === 'All' || c.category === filter;
    const matchSearch = c.title.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <ScrollView style={{ flex: 1 }} contentContainerStyle={{ padding: 16, paddingBottom: 100 }}>
      <Text style={s.pageTitle}>All Courses 📚</Text>
      <View style={s.searchBox}>
        <Text style={{ color: C.muted, fontSize: 16, marginRight: 8 }}>🔍</Text>
        <TextInput style={s.searchInput} placeholder="Search courses..." placeholderTextColor={C.muted} value={search} onChangeText={setSearch} />
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 16 }}>
        {CATEGORIES.map(f => (
          <TouchableOpacity key={f} onPress={() => setFilter(f)} style={[s.chip, { backgroundColor: filter === f ? C.accent : C.card, borderColor: filter === f ? C.accent : C.border }]}>
            <Text style={{ color: filter === f ? C.bg : C.muted, fontSize: 12, fontWeight: '700' }}>{f}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <Text style={[s.meta, { marginBottom: 12 }]}>{filtered.length} courses found</Text>
      {filtered.map(c => (
        <TouchableOpacity key={c.id} style={[s.card, { marginBottom: 14 }]} onPress={() => { setCourse(c); setScreen(4); }}>
          <View style={{ flexDirection: 'row', gap: 14 }}>
            <View style={[s.courseIconLg, { backgroundColor: c.color + '33', borderColor: c.color + '44' }]}><Text style={{ fontSize: 30 }}>{c.emoji}</Text></View>
            <View style={{ flex: 1 }}>
              <View style={{ flexDirection: 'row', gap: 6, marginBottom: 5, flexWrap: 'wrap' }}>
                <View style={[s.badge, { backgroundColor: c.color + '33' }]}><Text style={{ color: c.color, fontSize: 9, fontWeight: '800' }}>{c.tag}</Text></View>
                <View style={[s.badge, { backgroundColor: C.dim }]}><Text style={{ color: C.muted, fontSize: 9 }}>{c.level}</Text></View>
              </View>
              <Text style={s.cardTitle}>{c.title}</Text>
              <Text style={[s.cardSub, { marginBottom: 6 }]}>{c.subtitle}</Text>
              <Text style={s.meta}>📹 {c.lessons} lessons · ⏱ {c.duration} · ⭐ {c.rating}</Text>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 10 }}>
                <Text style={{ fontWeight: '800', fontSize: 16, color: C.accent }}>{c.price}</Text>
                <TouchableOpacity style={s.enrollBtn} onPress={() => { setCourse(c); setScreen(4); }}><Text style={{ color: C.bg, fontSize: 12, fontWeight: '800' }}>View →</Text></TouchableOpacity>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

function MyLearningScreen({ setCourse, setScreen }) {
  const [tab, setTab] = useState('courses');
  return (
    <ScrollView style={{ flex: 1 }} contentContainerStyle={{ padding: 16, paddingBottom: 100 }}>
      <Text style={s.pageTitle}>My Learning 📖</Text>
      <View style={s.tabRow}>
        {[['courses', '📚 Courses'], ['quiz', '🧠 Quiz'], ['cert', '🏆 Cert']].map(([k, label]) => (
          <TouchableOpacity key={k} onPress={() => setTab(k)} style={[s.tabBtn, { backgroundColor: tab === k ? C.accent : 'transparent' }]}>
            <Text style={{ color: tab === k ? C.bg : C.muted, fontSize: 11, fontWeight: '800' }}>{label}</Text>
          </TouchableOpacity>
        ))}
      </View>
      {tab === 'courses' && (
        <View style={s.empty}>
          <Text style={{ fontSize: 50 }}>🎓</Text>
          <Text style={s.emptyTitle}>No courses enrolled yet</Text>
          <Text style={s.emptySub}>Pay and enroll to start learning</Text>
          <TouchableOpacity style={[s.heroBt, { marginTop: 16, alignSelf: 'center' }]} onPress={() => setScreen(1)}><Text style={s.heroBtTxt}>Browse Courses</Text></TouchableOpacity>
          <TouchableOpacity style={[s.waBtn, { marginTop: 10, paddingHorizontal: 20 }]} onPress={() => Linking.openURL(PAYMENT_LINK)}><Text style={s.waBtnTxt}>💳 Pay Now</Text></TouchableOpacity>
        </View>
      )}
      {tab === 'quiz' && <QuizSection />}
      {tab === 'cert' && <CertSection />}
    </ScrollView>
  );
}

function QuizSection() {
  const [courseIdx, setCourseIdx] = useState(0);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [done, setDone] = useState(false);
  const course = COURSES[courseIdx];
  const quiz = course.quiz;
  const handle = (idx) => {
    setSelected(idx);
    setTimeout(() => {
      const a = [...answers, idx === quiz[current].answer];
      setAnswers(a);
      if (current + 1 < quiz.length) { setCurrent(current + 1); setSelected(null); }
      else setDone(true);
    }, 800);
  };
  const reset = () => { setCurrent(0); setSelected(null); setAnswers([]); setDone(false); };
  const score = answers.filter(Boolean).length;

  return (
    <View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 16 }}>
        {COURSES.map((c, i) => (
          <TouchableOpacity key={c.id} onPress={() => { setCourseIdx(i); reset(); }} style={[s.chip, { backgroundColor: courseIdx === i ? C.accent : C.card, borderColor: courseIdx === i ? C.accent : C.border }]}>
            <Text style={{ color: courseIdx === i ? C.bg : C.muted, fontSize: 11, fontWeight: '700' }}>{c.emoji} {c.title.split(' ').slice(0, 2).join(' ')}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      {done ? (
        <View style={{ alignItems: 'center', paddingTop: 20 }}>
          <Text style={{ fontSize: 60, marginBottom: 12 }}>{score >= quiz.length * 0.7 ? '🏆' : '📚'}</Text>
          <Text style={[s.pageTitle, { textAlign: 'center' }]}>{score}/{quiz.length} Correct</Text>
          <View style={[s.card, { width: '100%', alignItems: 'center', marginVertical: 16 }]}>
            <Text style={{ fontSize: 32, color: C.accent, fontWeight: '900' }}>{Math.round((score / quiz.length) * 100)}%</Text>
            <Text style={s.meta}>Your Score</Text>
          </View>
          <TouchableOpacity style={s.heroBt} onPress={reset}><Text style={s.heroBtTxt}>Try Again</Text></TouchableOpacity>
        </View>
      ) : (
        <View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 }}>
            <Text style={s.meta}>Question {current + 1} of {quiz.length}</Text>
            <Text style={{ color: C.accent, fontSize: 13, fontWeight: '700' }}>{course.title}</Text>
          </View>
          <View style={s.progressBg}><View style={[s.progressFill, { width: (current / quiz.length * 100) + '%', backgroundColor: C.accent }]} /></View>
          <View style={[s.card, { marginVertical: 16 }]}><Text style={[s.cardTitle, { fontSize: 15, lineHeight: 22 }]}>{quiz[current].q}</Text></View>
          {quiz[current].options.map((opt, i) => (
            <TouchableOpacity key={i} onPress={() => selected === null && handle(i)}
              style={[s.optionBtn, { backgroundColor: selected === null ? C.card : selected === i ? (i === quiz[current].answer ? '#22C55E18' : '#FF444420') : i === quiz[current].answer && selected !== null ? '#22C55E18' : C.card, borderColor: selected === i ? (i === quiz[current].answer ? C.green : '#FF4444') : i === quiz[current].answer && selected !== null ? C.green : C.border }]}>
              <Text style={{ color: C.muted, fontWeight: '700', marginRight: 10 }}>{['A', 'B', 'C', 'D'][i]}.</Text>
              <Text style={{ color: C.text, fontSize: 14, flex: 1 }}>{opt}{selected !== null && i === quiz[current].answer ? ' ✅' : ''}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
}

function CertSection() {
  return (
    <View style={[s.card, { backgroundColor: '#FFD70018', borderColor: '#FFD70044', alignItems: 'center', padding: 28 }]}>
      <Text style={{ fontSize: 11, color: C.accent, letterSpacing: 3, textTransform: 'uppercase', marginBottom: 8 }}>Sample Certificate</Text>
      <Text style={{ color: C.white, fontSize: 20, fontWeight: '900', marginBottom: 4 }}>Certificate of Completion</Text>
      <Text style={[s.meta, { marginBottom: 12 }]}>This certifies that</Text>
      <Text style={{ color: C.blue3, fontSize: 22, fontWeight: '800', fontStyle: 'italic', marginBottom: 12 }}>Your Name Here</Text>
      <Text style={[s.meta, { marginBottom: 4 }]}>has successfully completed</Text>
      <Text style={{ color: C.white, fontSize: 15, fontWeight: '700', marginBottom: 4 }}>a course at</Text>
      <Text style={{ color: C.accent, fontSize: 16, fontWeight: '900', marginBottom: 20 }}>{ACADEMY}</Text>
      <View style={{ flexDirection: 'row', gap: 40 }}>
        <View style={{ alignItems: 'center' }}><View style={{ borderTopWidth: 1, borderColor: C.dim, paddingTop: 6 }}><Text style={s.meta}>Date</Text></View></View>
        <View style={{ alignItems: 'center' }}><View style={{ borderTopWidth: 1, borderColor: C.dim, paddingTop: 6 }}><Text style={s.meta}>{INSTRUCTOR}</Text></View></View>
      </View>
    </View>
  );
}

function CourseDetailScreen({ course, onBack }) {
  const [tab, setTab] = useState('overview');
  const [note, setNote] = useState('');
  const [notes, setNotes] = useState([]);
  const [question, setQuestion] = useState('');
  const [qas, setQas] = useState([]);

  return (
    <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingBottom: 100 }}>
      <View style={[s.detailHeader, { backgroundColor: course.color + '33' }]}>
        <TouchableOpacity onPress={onBack} style={{ marginBottom: 12 }}><Text style={{ color: C.muted, fontSize: 14 }}>← Back</Text></TouchableOpacity>
        <View style={{ flexDirection: 'row', gap: 14 }}>
          <Text style={{ fontSize: 50 }}>{course.emoji}</Text>
          <View style={{ flex: 1 }}>
            <Text style={[s.cardTitle, { fontSize: 18, lineHeight: 24 }]}>{course.title}</Text>
            <Text style={s.cardSub}>By {INSTRUCTOR} · {course.level}</Text>
            <Text style={s.meta}>⭐ {course.rating} · 📹 {course.lessons} lessons · ⏱ {course.duration}</Text>
          </View>
        </View>
        <View style={{ marginTop: 16 }}>
          <Text style={{ color: C.accent, fontWeight: '900', fontSize: 22, marginBottom: 10 }}>{course.price}</Text>
          <TouchableOpacity style={s.payBtn} onPress={() => Linking.openURL(PAYMENT_LINK)}><Text style={s.payBtnTxt}>💳 Pay Now — {course.price}</Text></TouchableOpacity>
          <TouchableOpacity style={[s.waBtn, { marginTop: 8 }]} onPress={() => Linking.openURL(`https://wa.me/${WHATSAPP}?text=I want to enroll in ${course.title}`)}><Text style={s.waBtnTxt}>💬 Pay via WhatsApp</Text></TouchableOpacity>
        </View>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ backgroundColor: C.card, borderBottomWidth: 1, borderBottomColor: C.border }}>
        {[['overview', '📋 Overview'], ['lessons', '🎥 Lessons'], ['modules', '📦 Modules'], ['notes', '📝 Notes'], ['qa', '❓ Q&A'], ['resources', '📁 Resources']].map(([k, label]) => (
          <TouchableOpacity key={k} onPress={() => setTab(k)} style={[s.detailTab, { borderBottomColor: tab === k ? C.accent : 'transparent' }]}>
            <Text style={{ color: tab === k ? C.accent : C.muted, fontWeight: tab === k ? '800' : '400', fontSize: 12 }}>{label}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <View style={{ padding: 16 }}>
        {tab === 'overview' && (
          <View>
            <View style={[s.card, { marginBottom: 12 }]}>
              <Text style={s.overviewLabel}>📌 What You Will Learn</Text>
              {course.objectives.map((obj, i) => (
                <View key={i} style={{ flexDirection: 'row', gap: 8, paddingVertical: 6, borderBottomWidth: i < course.objectives.length - 1 ? 1 : 0, borderBottomColor: C.border }}>
                  <Text style={{ color: C.green }}>✓</Text>
                  <Text style={{ color: C.text, fontSize: 13, flex: 1 }}>{obj}</Text>
                </View>
              ))}
            </View>
            <View style={s.card}>
              <Text style={s.overviewLabel}>📋 Requirements</Text>
              {['A smartphone (Android or iOS)', 'No prior experience needed', 'Willingness to practice daily'].map((r, i) => (
                <Text key={i} style={{ color: C.muted, fontSize: 13, paddingVertical: 4 }}>• {r}</Text>
              ))}
            </View>
          </View>
        )}

        {tab === 'lessons' && (
          <View>
            <Text style={[s.meta, { marginBottom: 12 }]}>🔓 First 2 videos are FREE preview</Text>
            {course.videos.map((v, i) => (
              <View key={i} style={[s.card, { marginBottom: 10 }]}>
                <View style={{ flexDirection: 'row', gap: 12, alignItems: 'center' }}>
                  <View style={[s.lessonIcon, { backgroundColor: v.free ? C.accent + '22' : C.dim }]}>
                    <Text style={{ fontSize: 18 }}>{v.free ? '▶️' : '🔒'}</Text>
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={{ color: v.free ? C.white : C.muted, fontSize: 13, fontWeight: '600', marginBottom: 2 }}>{v.title}</Text>
                    <Text style={s.meta}>⏱ {v.duration}</Text>
                  </View>
                  {v.free && <View style={[s.badge, { backgroundColor: C.greenSoft }]}><Text style={{ color: C.green, fontSize: 9, fontWeight: '800' }}>FREE</Text></View>}
                </View>
                {!v.free && (
                  <TouchableOpacity style={s.unlockBtn} onPress={() => Linking.openURL(PAYMENT_LINK)}>
                    <Text style={s.unlockTxt}>🔓 Unlock — Pay {course.price}</Text>
                  </TouchableOpacity>
                )}
              </View>
            ))}
          </View>
        )}

        {tab === 'modules' && (
          <View>
            {course.modules.map((mod, i) => (
              <View key={i} style={[s.card, { marginBottom: 10 }]}>
                <View style={{ flexDirection: 'row', gap: 10, alignItems: 'center' }}>
                  <View style={[s.modIcon, { backgroundColor: C.accent + '22' }]}><Text style={{ color: C.accent, fontWeight: '700', fontSize: 14 }}>{i + 1}</Text></View>
                  <View style={{ flex: 1 }}>
                    <Text style={s.cardTitle}>{mod.title}</Text>
                    <Text style={s.meta}>{mod.lessons} lessons</Text>
                  </View>
                  <Text style={{ color: C.muted, fontSize: 12 }}>→</Text>
                </View>
              </View>
            ))}
          </View>
        )}

        {tab === 'notes' && (
          <View>
            <Text style={[s.cardTitle, { marginBottom: 12 }]}>📝 My Notes</Text>
            <View style={s.card}>
              <TextInput style={s.noteInput} placeholder="Type your note here..." placeholderTextColor={C.muted} value={note} onChangeText={setNote} multiline />
              <TouchableOpacity style={[s.heroBt, { alignSelf: 'flex-end', paddingVertical: 8, paddingHorizontal: 16 }]} onPress={() => { if (note.trim()) { setNotes([...notes, { text: note, time: new Date().toLocaleTimeString() }]); setNote(''); } }}>
                <Text style={[s.heroBtTxt, { fontSize: 12 }]}>Save Note</Text>
              </TouchableOpacity>
            </View>
            {notes.length === 0 ? (
              <View style={s.empty}><Text style={{ fontSize: 40 }}>📝</Text><Text style={s.emptySub}>No notes yet. Start writing!</Text></View>
            ) : notes.map((n, i) => (
              <View key={i} style={[s.card, { marginTop: 10 }]}>
                <Text style={{ color: C.text, fontSize: 13, lineHeight: 20 }}>{n.text}</Text>
                <Text style={[s.meta, { marginTop: 6 }]}>🕐 {n.time}</Text>
              </View>
            ))}
          </View>
        )}

        {tab === 'qa' && (
          <View>
            <Text style={[s.cardTitle, { marginBottom: 12 }]}>❓ Ask Your Instructor</Text>
            <View style={s.card}>
              <TextInput style={s.noteInput} placeholder="Ask a question about this course..." placeholderTextColor={C.muted} value={question} onChangeText={setQuestion} multiline />
              <TouchableOpacity style={[s.heroBt, { alignSelf: 'flex-end', paddingVertical: 8, paddingHorizontal: 16 }]} onPress={() => { if (question.trim()) { setQas([...qas, { q: question, time: new Date().toLocaleTimeString() }]); setQuestion(''); } }}>
                <Text style={[s.heroBtTxt, { fontSize: 12 }]}>Submit</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity style={[s.waBtn, { marginTop: 10 }]} onPress={() => Linking.openURL(`https://wa.me/${WHATSAPP}?text=Question about ${course.title}: `)}><Text style={s.waBtnTxt}>💬 Ask on WhatsApp (Faster)</Text></TouchableOpacity>
            {qas.map((qa, i) => (
              <View key={i} style={[s.card, { marginTop: 10 }]}>
                <Text style={{ color: C.accent, fontSize: 12, fontWeight: '700', marginBottom: 4 }}>You asked:</Text>
                <Text style={{ color: C.text, fontSize: 13 }}>{qa.q}</Text>
                <View style={{ height: 1, backgroundColor: C.border, marginVertical: 8 }} />
                <Text style={{ color: C.green, fontSize: 12 }}>📩 Reply sent to your WhatsApp! Check {WHATSAPP}</Text>
              </View>
            ))}
          </View>
        )}

        {tab === 'resources' && (
          <View>
            <Text style={[s.cardTitle, { marginBottom: 12 }]}>📁 Course Resources</Text>
            {course.resources.map((r, i) => (
              <TouchableOpacity key={i} style={[s.card, { marginBottom: 10 }]} onPress={() => Linking.openURL(`https://wa.me/${WHATSAPP}?text=Please send me: ${r} from ${course.title}`)}>
                <View style={{ flexDirection: 'row', gap: 12, alignItems: 'center' }}>
                  <Text style={{ fontSize: 24 }}>📄</Text>
                  <View style={{ flex: 1 }}><Text style={s.cardTitle}>{r}</Text><Text style={s.meta}>Tap to request from instructor</Text></View>
                  <Text style={{ color: C.accent }}>↓</Text>
                </View>
              </TouchableOpacity>
            ))}
            <View style={[s.card, { backgroundColor: C.blue2 + '22', borderColor: C.blue2 + '44', marginTop: 8 }]}>
              <Text style={{ color: C.blue3, fontSize: 13, textAlign: 'center' }}>💡 Resources are sent via WhatsApp after payment!</Text>
            </View>
          </View>
        )}
      </View>
    </ScrollView>
  );
}

function ProfileScreen() {
  return (
    <ScrollView style={{ flex: 1 }} contentContainerStyle={{ padding: 16, paddingBottom: 100 }}>
      <Text style={s.pageTitle}>Profile 👤</Text>
      <View style={{ alignItems: 'center', marginBottom: 24 }}>
        <View style={s.avatar}><Text style={{ fontSize: 40 }}>🎓</Text></View>
        <Text style={{ color: C.white, fontWeight: '800', fontSize: 20, marginBottom: 4 }}>Student</Text>
        <Text style={s.meta}>{ACADEMY}</Text>
      </View>
      <View style={{ flexDirection: 'row', gap: 10, marginBottom: 20 }}>
        {[{ val: '0', label: 'Courses' }, { val: '0%', label: 'Progress' }, { val: '0', label: 'Certs' }].map((st, i) => (
          <View key={i} style={[s.card, { flex: 1, alignItems: 'center', padding: 14 }]}>
            <Text style={{ color: C.accent, fontSize: 22, fontWeight: '900' }}>{st.val}</Text>
            <Text style={s.meta}>{st.label}</Text>
          </View>
        ))}
      </View>
      <View style={[s.card, { backgroundColor: C.blue2 + '22', borderColor: C.blue2 + '44', marginBottom: 16 }]}>
        <View style={{ flexDirection: 'row', gap: 12, alignItems: 'center' }}>
          <View style={[s.avatar, { width: 50, height: 50, borderRadius: 25 }]}><Text style={{ fontSize: 24 }}>👨‍🏫</Text></View>
          <View style={{ flex: 1 }}>
            <Text style={{ color: C.white, fontWeight: '800', fontSize: 15 }}>{INSTRUCTOR}</Text>
            <Text style={s.meta}>Your Instructor · {ACADEMY}</Text>
          </View>
        </View>
        <TouchableOpacity style={[s.waBtn, { marginTop: 12 }]} onPress={() => Linking.openURL(`https://wa.me/${WHATSAPP}`)}><Text style={s.waBtnTxt}>💬 Chat with Instructor</Text></TouchableOpacity>
      </View>
      {[
        { icon: '💳', label: 'Make Payment', desc: 'Pay for any course', action: () => Linking.openURL(PAYMENT_LINK) },
        { icon: '💬', label: 'WhatsApp Us', desc: 'Get help & support', action: () => Linking.openURL(`https://wa.me/${WHATSAPP}`) },
        { icon: '📚', label: 'Browse Courses', desc: '16 courses available', action: null },
        { icon: '🏆', label: 'My Certificates', desc: 'Complete a course to earn', action: null },
        { icon: '🧠', label: 'Take Quiz', desc: 'Test your knowledge', action: null },
        { icon: '⭐', label: 'Rate the App', desc: 'Help us improve', action: null },
      ].map((item, i) => (
        <TouchableOpacity key={i} style={[s.card, { marginBottom: 10 }]} onPress={item.action || (() => {})}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
            <Text style={{ fontSize: 24 }}>{item.icon}</Text>
            <View style={{ flex: 1 }}>
              <Text style={{ color: C.white, fontSize: 14, fontWeight: '600' }}>{item.label}</Text>
              <Text style={s.meta}>{item.desc}</Text>
            </View>
            <Text style={{ color: C.muted, fontSize: 18 }}>›</Text>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

export default function App() {
  const [screen, setScreen] = useState(-1);
  const [course, setCourse] = useState(null);

  if (screen === -1) {
    setTimeout(() => setScreen(0), 2500);
    return <SplashScreen />;
  }

  return (
    <SafeAreaView style={s.root}>
      <StatusBar barStyle="light-content" backgroundColor={C.bg} />
      <View style={{ flex: 1 }}>
        {screen === 4 && course ? <CourseDetailScreen course={course} onBack={() => setScreen(1)} />
          : screen === 0 ? <HomeScreen setScreen={setScreen} setCourse={setCourse} />
          : screen === 1 ? <CoursesScreen setCourse={setCourse} setScreen={setScreen} />
          : screen === 2 ? <MyLearningScreen setCourse={setCourse} setScreen={setScreen} />
          : <ProfileScreen />}
      </View>
      {screen !== 4 && (
        <View style={s.bottomNav}>
          {[['🏠', 'Home'], ['📚', 'Courses'], ['📖', 'Learning'], ['👤', 'Profile']].map(([icon, label], i) => (
            <TouchableOpacity key={i} style={s.navBtn} onPress={() => setScreen(i)}>
              <Text style={{ fontSize: 22 }}>{icon}</Text>
              <Text style={[s.navLabel, { color: screen === i ? C.accent : C.muted, fontWeight: screen === i ? '800' : '400' }]}>{label}</Text>
              {screen === i && <View style={s.navDot} />}
            </TouchableOpacity>
          ))}
        </View>
      )}
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: C.bg, paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0 },
  splashWrap: { flex: 1, backgroundColor: C.bg, alignItems: 'center', justifyContent: 'center', padding: 20 },
  splashLogo: { width: 100, height: 100, borderRadius: 28, backgroundColor: C.accent, alignItems: 'center', justifyContent: 'center', marginBottom: 20 },
  splashTitle: { color: C.white, fontSize: 28, fontWeight: '900', letterSpacing: -1, marginBottom: 8, textAlign: 'center' },
  splashSub: { color: C.muted, fontSize: 13, textAlign: 'center', lineHeight: 20, paddingHorizontal: 20 },
  hero: { backgroundColor: '#0A1E3D', padding: 24, paddingBottom: 28 },
  heroBadge: { backgroundColor: C.accent + '22', borderWidth: 1, borderColor: C.accent + '44', borderRadius: 20, paddingVertical: 5, paddingHorizontal: 12, alignSelf: 'flex-start', marginBottom: 12 },
  heroBadgeTxt: { color: C.accent, fontSize: 11, fontWeight: '700' },
  heroTitle: { color: C.white, fontSize: 30, fontWeight: '900', lineHeight: 36, marginBottom: 10 },
  heroSub: { color: C.muted, fontSize: 13, marginBottom: 20, lineHeight: 20 },
  heroBt: { backgroundColor: C.accent, borderRadius: 12, paddingVertical: 12, paddingHorizontal: 20 },
  heroBtTxt: { color: C.bg, fontWeight: '900', fontSize: 14 },
  heroWaBt: { backgroundColor: C.green + '22', borderWidth: 1, borderColor: C.green + '44', borderRadius: 12, paddingVertical: 12, paddingHorizontal: 16 },
  heroWaTxt: { color: C.green, fontWeight: '700', fontSize: 14 },
  statsRow: { flexDirection: 'row', gap: 8, padding: 16 },
  statCard: { flex: 1, backgroundColor: C.card, borderRadius: 12, padding: 10, alignItems: 'center', borderWidth: 1, borderColor: C.border },
  statNum: { color: C.white, fontWeight: '800', fontSize: 13, marginTop: 2 },
  statLabel: { color: C.muted, fontSize: 10, marginTop: 1 },
  section: { padding: 16, paddingTop: 4 },
  sectionTitle: { color: C.white, fontWeight: '800', fontSize: 17, marginBottom: 12 },
  card: { backgroundColor: C.card, borderRadius: 14, padding: 14, borderWidth: 1, borderColor: C.border },
  cardTitle: { color: C.white, fontWeight: '700', fontSize: 14, marginBottom: 3 },
  cardSub: { color: C.muted, fontSize: 12, lineHeight: 18 },
  courseIconLg: { width: 68, height: 68, borderRadius: 14, alignItems: 'center', justifyContent: 'center', borderWidth: 1 },
  featCard: { width: 170, backgroundColor: C.card, borderRadius: 16, borderWidth: 1, borderColor: C.border, overflow: 'hidden', marginRight: 12 },
  featImg: { height: 90, alignItems: 'center', justifyContent: 'center' },
  progressBg: { height: 6, backgroundColor: C.dim, borderRadius: 10, overflow: 'hidden' },
  progressFill: { height: '100%', borderRadius: 10 },
  whyGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  whyCard: { width: '47%', backgroundColor: C.card, borderRadius: 12, padding: 14, borderWidth: 1, borderColor: C.border },
  whyTitle: { color: C.white, fontWeight: '700', fontSize: 13, marginBottom: 3 },
  whyDesc: { color: C.muted, fontSize: 11, lineHeight: 16 },
  pageTitle: { color: C.white, fontSize: 22, fontWeight: '900', marginBottom: 16, letterSpacing: -0.5 },
  searchBox: { flexDirection: 'row', alignItems: 'center', backgroundColor: C.card, borderRadius: 12, borderWidth: 1, borderColor: C.border, paddingHorizontal: 12, marginBottom: 12 },
  searchInput: { flex: 1, color: C.white, fontSize: 14, paddingVertical: 12 },
  chip: { borderWidth: 1, borderRadius: 20, paddingVertical: 6, paddingHorizontal: 14, marginRight: 8 },
  badge: { paddingVertical: 3, paddingHorizontal: 8, borderRadius: 20 },
  enrollBtn: { backgroundColor: C.accent, borderRadius: 8, paddingVertical: 8, paddingHorizontal: 14 },
  meta: { color: C.muted, fontSize: 12 },
  tabRow: { flexDirection: 'row', backgroundColor: C.card, borderRadius: 12, padding: 4, marginBottom: 20, borderWidth: 1, borderColor: C.border },
  tabBtn: { flex: 1, paddingVertical: 10, borderRadius: 10, alignItems: 'center' },
  empty: { alignItems: 'center', paddingTop: 40, paddingBottom: 20 },
  emptyTitle: { color: C.white, fontSize: 16, fontWeight: '700', marginTop: 12, marginBottom: 6 },
  emptySub: { color: C.muted, fontSize: 13 },
  optionBtn: { flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderRadius: 12, padding: 14, marginBottom: 10 },
  detailHeader: { padding: 20, paddingBottom: 24, borderBottomWidth: 1, borderBottomColor: C.border },
  detailTab: { paddingVertical: 12, paddingHorizontal: 16, borderBottomWidth: 2 },
  overviewLabel: { color: C.accent, fontWeight: '700', fontSize: 13, marginBottom: 10, textTransform: 'uppercase', letterSpacing: 1 },
  lessonIcon: { width: 44, height: 44, borderRadius: 10, alignItems: 'center', justifyContent: 'center' },
  modIcon: { width: 36, height: 36, borderRadius: 10, alignItems: 'center', justifyContent: 'center' },
  unlockBtn: { backgroundColor: C.accent + '22', borderWidth: 1, borderColor: C.accent + '44', borderRadius: 8, paddingVertical: 8, alignItems: 'center', marginTop: 10 },
  unlockTxt: { color: C.accent, fontSize: 12, fontWeight: '700' },
  payBtn: { backgroundColor: C.accent, borderRadius: 12, paddingVertical: 14, alignItems: 'center', marginBottom: 8 },
  payBtnTxt: { color: C.bg, fontWeight: '900', fontSize: 15 },
  waBtn: { backgroundColor: C.green + '18', borderWidth: 1, borderColor: C.green + '44', borderRadius: 12, paddingVertical: 12, alignItems: 'center' },
  waBtnTxt: { color: C.green, fontWeight: '700', fontSize: 14 },
  noteInput: { color: C.white, fontSize: 14, minHeight: 80, textAlignVertical: 'top', marginBottom: 10, lineHeight: 22 },
  avatar: { width: 80, height: 80, borderRadius: 40, backgroundColor: C.blue2, alignItems: 'center', justifyContent: 'center', marginBottom: 12 },
  bottomNav: { flexDirection: 'row', backgroundColor: C.card, borderTopWidth: 1, borderTopColor: C.border, paddingBottom: 30 },
  navBtn: { flex: 1, paddingTop: 10, paddingBottom: 6, alignItems: 'center', gap: 3 },
  navLabel: { fontSize: 10 },
  navDot: { width: 4, height: 4, borderRadius: 2, backgroundColor: C.accent },
});
