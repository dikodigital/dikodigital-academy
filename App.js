import { useState } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity,
  StyleSheet, SafeAreaView, StatusBar, Modal
} from 'react-native';

const C = {
  bg: '#0A0A0F',
  card: '#13131A',
  border: '#2A2A38',
  accent: '#FF6B2B',
  gold: '#FFD93D',
  purple: '#8B5CF6',
  green: '#22C55E',
  white: '#FFFFFF',
  text: '#F0F0F8',
  muted: '#7A7A9A',
  dim: '#3A3A50',
};

const COURSES = [
  {
    id: 1, title: 'Graphic Design Fundamentals',
    subtitle: 'Start from zero — no experience needed',
    level: 'Beginner', free: true, lessons: 12,
    duration: '4.5 hrs', students: 1840, rating: 4.9,
    color: '#FF6B2B', emoji: '🎨', tag: 'FREE',
    progress: 75, enrolled: true,
    modules: [
      { title: 'Introduction to Design', lessons: 3, done: true },
      { title: 'Color Theory Basics', lessons: 3, done: true },
      { title: 'Typography on Mobile', lessons: 3, done: false },
      { title: 'Your First Poster', lessons: 3, done: false },
    ],
    videos: [
      { title: 'Welcome & What You\'ll Learn', duration: '5:20', free: true, done: true },
      { title: 'Understanding Design Principles', duration: '12:45', free: true, done: true },
      { title: 'Color Theory Explained', duration: '18:30', free: true, done: false },
      { title: 'Choosing the Right Fonts', duration: '14:10', free: false, done: false },
      { title: 'Designing Your First Poster', duration: '22:00', free: false, done: false },
    ]
  },
  {
    id: 2, title: 'CapCut Mastery',
    subtitle: 'Video editing like a pro on your phone',
    level: 'Intermediate', free: false, price: '₦4,500',
    lessons: 18, duration: '7 hrs', students: 963, rating: 4.8,
    color: '#8B5CF6', emoji: '🎬', tag: 'BESTSELLER',
    progress: 0, enrolled: false, modules: [], videos: []
  },
  {
    id: 3, title: 'Logo Design with Canva',
    subtitle: 'Create client-ready logos using only your phone',
    level: 'Beginner', free: false, price: '₦3,200',
    lessons: 15, duration: '5.5 hrs', students: 1205, rating: 4.7,
    color: '#FFD93D', emoji: '✏️', tag: 'HOT',
    progress: 0, enrolled: false, modules: [], videos: []
  },
  {
    id: 4, title: 'Social Media Content Creation',
    subtitle: 'Design posts that get likes & followers',
    level: 'Intermediate', free: false, price: '₦5,000',
    lessons: 20, duration: '8 hrs', students: 732, rating: 4.9,
    color: '#22C55E', emoji: '📱', tag: 'NEW',
    progress: 0, enrolled: false, modules: [], videos: []
  },
];

const QUIZ = [
  { q: 'What are the 3 primary colors?', options: ['Red, Blue, Yellow', 'Red, Green, Blue', 'Cyan, Magenta, Yellow', 'Black, White, Grey'], answer: 0 },
  { q: 'Best app for logo design on phone?', options: ['TikTok', 'Canva', 'WhatsApp', 'Chrome'], answer: 1 },
  { q: 'What does typography mean?', options: ['Art of color', 'Art of arranging text', 'Taking photos', 'Creating animations'], answer: 1 },
  { q: 'What is a brand color?', options: ['Any random color', 'Colors that represent a brand', 'Only black and white', 'The darkest shade'], answer: 1 },
];

// ── SPLASH ──────────────────────────────────────────────
function SplashScreen() {
  return (
    <View style={s.splashWrap}>
      <View style={s.splashLogo}>
        <Text style={{ fontSize: 44 }}>🎨</Text>
      </View>
      <Text style={s.splashTitle}>Graphix Academy</Text>
      <Text style={s.splashSub}>Design with your phone</Text>
    </View>
  );
}

// ── HOME ─────────────────────────────────────────────────
function HomeScreen({ setScreen, setCourse }) {
  const enrolled = COURSES.filter(c => c.enrolled);
  return (
    <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingBottom: 100 }}>
      {/* Hero */}
      <View style={s.hero}>
        <Text style={s.heroTag}>Welcome Back 👋</Text>
        <Text style={s.heroTitle}>Design Like A Pro{'\n'}
          <Text style={{ color: C.accent }}>With Your Phone</Text>
        </Text>
        <Text style={s.heroSub}>Learn graphics design from your smartphone. No laptop needed.</Text>
        <TouchableOpacity style={s.heroBt} onPress={() => setScreen(1)}>
          <Text style={s.heroBtTxt}>Browse Courses →</Text>
        </TouchableOpacity>
      </View>

      {/* Stats */}
      <View style={s.statsRow}>
        {[{ label: 'Students', value: '4,700+', icon: '👥' }, { label: 'Courses', value: '4', icon: '🎨' }, { label: 'Certificates', value: 'Free', icon: '🏆' }].map((s2, i) => (
          <View key={i} style={s.statCard}>
            <Text style={{ fontSize: 20 }}>{s2.icon}</Text>
            <Text style={s.statNum}>{s2.value}</Text>
            <Text style={s.statLabel}>{s2.label}</Text>
          </View>
        ))}
      </View>

      {/* Continue Learning */}
      {enrolled.length > 0 && (
        <View style={s.section}>
          <Text style={s.sectionTitle}>Continue Learning</Text>
          {enrolled.map(c => (
            <TouchableOpacity key={c.id} style={s.card} onPress={() => { setCourse(c); setScreen(4); }}>
              <View style={{ flexDirection: 'row', gap: 12, alignItems: 'center' }}>
                <View style={[s.courseIcon, { backgroundColor: c.color + '22' }]}>
                  <Text style={{ fontSize: 26 }}>{c.emoji}</Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={s.cardTitle}>{c.title}</Text>
                  <View style={s.progressBg}>
                    <View style={[s.progressFill, { width: c.progress + '%', backgroundColor: c.color }]} />
                  </View>
                  <Text style={s.progressTxt}>{c.progress}% complete</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      )}

      {/* Why us */}
      <View style={s.section}>
        <Text style={s.sectionTitle}>Why Learn Here?</Text>
        <View style={s.whyGrid}>
          {[{ icon: '📱', title: 'Phone Only', desc: 'No laptop needed' }, { icon: '🎥', title: 'HD Videos', desc: 'YouTube & Drive' }, { icon: '🏆', title: 'Certificate', desc: 'On completion' }, { icon: '💬', title: 'Community', desc: 'WhatsApp support' }].map((f, i) => (
            <View key={i} style={s.whyCard}>
              <Text style={{ fontSize: 22, marginBottom: 6 }}>{f.icon}</Text>
              <Text style={s.whyTitle}>{f.title}</Text>
              <Text style={s.whyDesc}>{f.desc}</Text>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

// ── COURSES ───────────────────────────────────────────────
function CoursesScreen({ setCourse, setScreen }) {
  const [filter, setFilter] = useState('All');
  const filters = ['All', 'Free', 'Paid', 'Beginner', 'Intermediate'];
  const filtered = COURSES.filter(c => {
    if (filter === 'Free') return c.free;
    if (filter === 'Paid') return !c.free;
    if (filter === 'Beginner') return c.level === 'Beginner';
    if (filter === 'Intermediate') return c.level === 'Intermediate';
    return true;
  });
  return (
    <ScrollView style={{ flex: 1 }} contentContainerStyle={{ padding: 16, paddingBottom: 100 }}>
      <Text style={s.pageTitle}>All Courses</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 16 }}>
        {filters.map(f => (
          <TouchableOpacity key={f} onPress={() => setFilter(f)}
            style={[s.chip, { backgroundColor: filter === f ? C.accent : C.card, borderColor: filter === f ? C.accent : C.border }]}>
            <Text style={{ color: filter === f ? '#fff' : C.muted, fontSize: 12, fontWeight: '700' }}>{f}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      {filtered.map(c => (
        <TouchableOpacity key={c.id} style={[s.card, { marginBottom: 14 }]} onPress={() => { setCourse(c); setScreen(4); }}>
          <View style={{ flexDirection: 'row', gap: 14 }}>
            <View style={[s.courseIconLg, { backgroundColor: c.color + '22', borderColor: c.color + '33' }]}>
              <Text style={{ fontSize: 30 }}>{c.emoji}</Text>
            </View>
            <View style={{ flex: 1 }}>
              <View style={{ flexDirection: 'row', gap: 6, marginBottom: 5 }}>
                <View style={[s.badge, { backgroundColor: c.color + '22' }]}>
                  <Text style={{ color: c.color, fontSize: 9, fontWeight: '800' }}>{c.tag}</Text>
                </View>
                <View style={[s.badge, { backgroundColor: C.dim }]}>
                  <Text style={{ color: C.muted, fontSize: 9, fontWeight: '700' }}>{c.level}</Text>
                </View>
              </View>
              <Text style={s.cardTitle}>{c.title}</Text>
              <Text style={[s.cardSub, { marginBottom: 8 }]}>{c.subtitle}</Text>
              <Text style={s.meta}>⭐ {c.rating}  📹 {c.lessons} lessons  ⏱ {c.duration}</Text>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 10 }}>
                <Text style={{ fontWeight: '800', fontSize: 16, color: c.free ? C.green : C.gold }}>
                  {c.free ? 'FREE' : c.price}
                </Text>
                <View style={[s.enrollBtn, { backgroundColor: c.enrolled ? '#22C55E18' : C.accent }]}>
                  <Text style={{ color: c.enrolled ? C.green : '#fff', fontSize: 12, fontWeight: '700' }}>
                    {c.enrolled ? '✅ Enrolled' : 'Enroll Now'}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

// ── MY LEARNING ───────────────────────────────────────────
function MyLearningScreen({ setCourse, setScreen }) {
  const [tab, setTab] = useState('courses');
  const enrolled = COURSES.filter(c => c.enrolled);
  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ padding: 16, paddingBottom: 100 }}>
        <Text style={s.pageTitle}>My Learning</Text>
        <View style={s.tabRow}>
          {[['courses', '📚 Courses'], ['quiz', '🧠 Quiz'], ['cert', '🏆 Certificate']].map(([k, label]) => (
            <TouchableOpacity key={k} onPress={() => setTab(k)}
              style={[s.tabBtn, { backgroundColor: tab === k ? C.accent : 'transparent' }]}>
              <Text style={{ color: tab === k ? '#fff' : C.muted, fontSize: 11, fontWeight: '700' }}>{label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {tab === 'courses' && (
          enrolled.length === 0
            ? <View style={s.empty}><Text style={{ fontSize: 50 }}>🎨</Text><Text style={s.emptyTitle}>No courses yet</Text><Text style={s.emptySub}>Enroll in a course to start</Text></View>
            : enrolled.map(c => (
              <TouchableOpacity key={c.id} style={[s.card, { marginBottom: 12 }]} onPress={() => { setCourse(c); setScreen(4); }}>
                <View style={{ flexDirection: 'row', gap: 12, alignItems: 'center', marginBottom: 12 }}>
                  <Text style={{ fontSize: 28 }}>{c.emoji}</Text>
                  <View style={{ flex: 1 }}>
                    <Text style={s.cardTitle}>{c.title}</Text>
                    <Text style={s.meta}>{c.lessons} lessons · {c.duration}</Text>
                  </View>
                </View>
                <View style={s.progressBg}>
                  <View style={[s.progressFill, { width: c.progress + '%', backgroundColor: c.color }]} />
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 6 }}>
                  <Text style={s.meta}>{c.progress}% complete</Text>
                  <Text style={{ color: c.color, fontSize: 12, fontWeight: '700' }}>Continue →</Text>
                </View>
              </TouchableOpacity>
            ))
        )}

        {tab === 'quiz' && <QuizSection />}
        {tab === 'cert' && <CertSection enrolled={enrolled} />}
      </ScrollView>
    </View>
  );
}

// ── QUIZ ──────────────────────────────────────────────────
function QuizSection() {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [done, setDone] = useState(false);

  const handle = (idx) => {
    setSelected(idx);
    setTimeout(() => {
      const a = [...answers, idx === QUIZ[current].answer];
      setAnswers(a);
      if (current + 1 < QUIZ.length) { setCurrent(current + 1); setSelected(null); }
      else setDone(true);
    }, 800);
  };

  const reset = () => { setCurrent(0); setSelected(null); setAnswers([]); setDone(false); };
  const score = answers.filter(Boolean).length;

  if (done) return (
    <View style={{ alignItems: 'center', paddingTop: 20 }}>
      <Text style={{ fontSize: 60, marginBottom: 12 }}>{score >= 3 ? '🏆' : '📚'}</Text>
      <Text style={[s.pageTitle, { textAlign: 'center' }]}>{score}/{QUIZ.length} Correct</Text>
      <Text style={[s.cardSub, { textAlign: 'center', marginBottom: 20 }]}>
        {score === 4 ? 'Perfect! You are a design star! 🌟' : score >= 3 ? 'Great job! Keep going!' : 'Keep studying — you will get there!'}
      </Text>
      <View style={[s.card, { width: '100%', alignItems: 'center', marginBottom: 20, backgroundColor: score >= 3 ? '#22C55E18' : '#FF6B2B18' }]}>
        <Text style={{ fontSize: 28, color: C.white, fontWeight: '900' }}>{Math.round((score / QUIZ.length) * 100)}%</Text>
        <Text style={s.meta}>Your Score</Text>
      </View>
      <TouchableOpacity style={s.heroBt} onPress={reset}>
        <Text style={s.heroBtTxt}>Try Again</Text>
      </TouchableOpacity>
    </View>
  );

  const q = QUIZ[current];
  return (
    <View>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 }}>
        <Text style={s.meta}>Question {current + 1} of {QUIZ.length}</Text>
        <Text style={{ color: C.accent, fontSize: 13, fontWeight: '700' }}>{Math.round((current / QUIZ.length) * 100)}%</Text>
      </View>
      <View style={s.progressBg}>
        <View style={[s.progressFill, { width: (current / QUIZ.length * 100) + '%', backgroundColor: C.accent }]} />
      </View>
      <View style={[s.card, { marginVertical: 16 }]}>
        <Text style={[s.cardTitle, { fontSize: 15, lineHeight: 22 }]}>{q.q}</Text>
      </View>
      {q.options.map((opt, i) => (
        <TouchableOpacity key={i} onPress={() => selected === null && handle(i)}
          style={[s.optionBtn, {
            backgroundColor: selected === null ? C.card : selected === i ? (i === q.answer ? '#22C55E18' : '#FF444420') : i === q.answer && selected !== null ? '#22C55E18' : C.card,
            borderColor: selected === i ? (i === q.answer ? C.green : '#FF4444') : i === q.answer && selected !== null ? C.green : C.border,
          }]}>
          <Text style={{ color: C.muted, fontWeight: '700', marginRight: 10 }}>{['A', 'B', 'C', 'D'][i]}.</Text>
          <Text style={{ color: C.text, fontSize: 14, flex: 1 }}>{opt}{selected !== null && i === q.answer ? ' ✅' : ''}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

// ── CERTIFICATE ───────────────────────────────────────────
function CertSection({ enrolled }) {
  return (
    <View>
      <View style={[s.card, { backgroundColor: '#FFD93D18', borderColor: '#FFD93D44', alignItems: 'center', padding: 28 }]}>
        <Text style={{ fontSize: 11, color: C.gold, letterSpacing: 3, textTransform: 'uppercase', marginBottom: 8 }}>Sample Certificate</Text>
        <Text style={{ color: C.white, fontSize: 18, fontWeight: '900', marginBottom: 4 }}>Certificate of Completion</Text>
        <Text style={[s.meta, { marginBottom: 12 }]}>This certifies that</Text>
        <Text style={{ color: C.accent, fontSize: 20, fontWeight: '800', fontStyle: 'italic', marginBottom: 12 }}>Your Name Here</Text>
        <Text style={[s.meta, { marginBottom: 4 }]}>has successfully completed</Text>
        <Text style={{ color: C.white, fontSize: 14, fontWeight: '700', marginBottom: 20 }}>Graphic Design Fundamentals</Text>
        <View style={{ flexDirection: 'row', gap: 40 }}>
          <View style={{ alignItems: 'center' }}>
            <View style={{ borderTopWidth: 1, borderColor: C.dim, paddingTop: 6 }}>
              <Text style={s.meta}>Date</Text>
            </View>
          </View>
          <View style={{ alignItems: 'center' }}>
            <View style={{ borderTopWidth: 1, borderColor: C.dim, paddingTop: 6 }}>
              <Text style={s.meta}>Instructor</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

// ── COURSE DETAIL ─────────────────────────────────────────
function CourseDetailScreen({ course, onBack }) {
  const [tab, setTab] = useState('overview');
  return (
    <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingBottom: 100 }}>
      {/* Header */}
      <View style={[s.detailHeader, { backgroundColor: course.color + '22' }]}>
        <TouchableOpacity onPress={onBack} style={{ marginBottom: 12 }}>
          <Text style={{ color: C.muted, fontSize: 14 }}>← Back</Text>
        </TouchableOpacity>
        <View style={{ flexDirection: 'row', gap: 14 }}>
          <Text style={{ fontSize: 44 }}>{course.emoji}</Text>
          <View style={{ flex: 1 }}>
            <View style={[s.badge, { backgroundColor: course.color + '33', alignSelf: 'flex-start', marginBottom: 6 }]}>
              <Text style={{ color: course.color, fontSize: 9, fontWeight: '800' }}>{course.tag}</Text>
            </View>
            <Text style={[s.cardTitle, { fontSize: 17 }]}>{course.title}</Text>
            <Text style={s.cardSub}>{course.subtitle}</Text>
          </View>
        </View>
        <Text style={[s.meta, { marginTop: 12 }]}>⭐ {course.rating}  📹 {course.lessons} lessons  ⏱ {course.duration}  👥 {course.students.toLocaleString()}</Text>
        {course.enrolled && (
          <View style={{ marginTop: 14 }}>
            <View style={s.progressBg}>
              <View style={[s.progressFill, { width: course.progress + '%', backgroundColor: course.color }]} />
            </View>
            <Text style={[s.meta, { marginTop: 4 }]}>{course.progress}% complete</Text>
          </View>
        )}
        {!course.enrolled && (
          <View style={{ flexDirection: 'row', gap: 10, alignItems: 'center', marginTop: 14 }}>
            <Text style={{ fontWeight: '900', fontSize: 20, color: course.free ? C.green : C.gold }}>
              {course.free ? 'FREE' : course.price}
            </Text>
            <TouchableOpacity style={[s.heroBt, { flex: 1, paddingVertical: 12 }]}>
              <Text style={s.heroBtTxt}>{course.free ? 'Enroll Free' : 'Buy Now — ' + course.price}</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      {/* Tabs */}
      <View style={s.detailTabs}>
        {[['overview', 'Overview'], ['lessons', 'Lessons'], ['modules', 'Modules']].map(([k, label]) => (
          <TouchableOpacity key={k} onPress={() => setTab(k)} style={[s.detailTab, { borderBottomColor: tab === k ? course.color : 'transparent' }]}>
            <Text style={{ color: tab === k ? course.color : C.muted, fontWeight: tab === k ? '700' : '400', fontSize: 13 }}>{label}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={{ padding: 16 }}>
        {tab === 'overview' && (
          <View>
            <View style={s.card}>
              <Text style={s.overviewLabel}>What You Will Learn</Text>
              {['Design professional graphics using only your phone', 'Master color theory and typography', 'Create logos, posters, and social media content', 'Use Canva, CapCut and other free tools', 'Build a portfolio to attract clients'].map((item, i) => (
                <View key={i} style={{ flexDirection: 'row', gap: 8, paddingVertical: 6, borderBottomWidth: i < 4 ? 1 : 0, borderBottomColor: C.border }}>
                  <Text style={{ color: C.green }}>✓</Text>
                  <Text style={{ color: C.text, fontSize: 13, flex: 1 }}>{item}</Text>
                </View>
              ))}
            </View>
          </View>
        )}

        {tab === 'lessons' && (
          <View>
            {(course.videos.length > 0 ? course.videos : [{ title: 'Lesson content available after enrollment', duration: '--:--', free: false, done: false }]).map((v, i) => (
              <View key={i} style={[s.card, { marginBottom: 10 }]}>
                <View style={{ flexDirection: 'row', gap: 12, alignItems: 'center' }}>
                  <View style={[s.lessonIcon, { backgroundColor: v.done ? '#22C55E18' : v.free ? '#FF6B2B18' : C.dim }]}>
                    <Text style={{ fontSize: 16 }}>{v.done ? '✅' : v.free ? '▶️' : '🔒'}</Text>
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={{ color: v.free ? C.white : C.muted, fontSize: 13, fontWeight: '600', marginBottom: 2 }}>{v.title}</Text>
                    <Text style={s.meta}>{v.duration}</Text>
                  </View>
                  {v.free && <View style={[s.badge, { backgroundColor: '#22C55E18' }]}><Text style={{ color: C.green, fontSize: 9, fontWeight: '700' }}>FREE</Text></View>}
                </View>
              </View>
            ))}
          </View>
        )}

        {tab === 'modules' && (
          <View>
            {(course.modules.length > 0 ? course.modules : [{ title: 'Modules unlock after enrollment', lessons: 0, done: false }]).map((mod, i) => (
              <View key={i} style={[s.card, { marginBottom: 10 }]}>
                <View style={{ flexDirection: 'row', gap: 10, alignItems: 'center' }}>
                  <View style={[s.modIcon, { backgroundColor: mod.done ? '#22C55E18' : '#FF6B2B18' }]}>
                    <Text style={{ color: mod.done ? C.green : C.accent, fontWeight: '700', fontSize: 14 }}>{mod.done ? '✅' : i + 1}</Text>
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={s.cardTitle}>{mod.title}</Text>
                    <Text style={s.meta}>{mod.lessons} lessons</Text>
                  </View>
                  <Text style={{ color: mod.done ? C.green : C.muted, fontSize: 12 }}>{mod.done ? 'Done ✅' : '→'}</Text>
                </View>
              </View>
            ))}
          </View>
        )}
      </View>
    </ScrollView>
  );
}

// ── PROFILE ───────────────────────────────────────────────
function ProfileScreen() {
  return (
    <ScrollView style={{ flex: 1 }} contentContainerStyle={{ padding: 16, paddingBottom: 100 }}>
      <Text style={s.pageTitle}>My Profile</Text>
      <View style={{ alignItems: 'center', marginBottom: 24 }}>
        <View style={s.avatar}>
          <Text style={{ fontSize: 36 }}>🎨</Text>
        </View>
        <Text style={{ color: C.white, fontWeight: '800', fontSize: 18, marginBottom: 4 }}>Student Name</Text>
        <Text style={s.meta}>Graphics Design Student</Text>
      </View>
      <View style={{ flexDirection: 'row', gap: 10, marginBottom: 20 }}>
        {[{ val: '1', label: 'Course' }, { val: '75%', label: 'Progress' }, { val: '0', label: 'Certs' }].map((st, i) => (
          <View key={i} style={[s.card, { flex: 1, alignItems: 'center', padding: 14 }]}>
            <Text style={{ color: C.accent, fontSize: 20, fontWeight: '900' }}>{st.val}</Text>
            <Text style={s.meta}>{st.label}</Text>
          </View>
        ))}
      </View>
      {[
        { icon: '🎓', label: 'My Courses', desc: '1 enrolled' },
        { icon: '🏆', label: 'Certificates', desc: '0 earned' },
        { icon: '🧠', label: 'Quiz History', desc: 'Practice anytime' },
        { icon: '💬', label: 'WhatsApp Community', desc: 'Connect with students' },
        { icon: '⭐', label: 'Rate the App', desc: 'Help us improve' },
        { icon: '📞', label: 'Contact Instructor', desc: 'Get help & support' },
      ].map((item, i) => (
        <TouchableOpacity key={i} style={[s.card, { marginBottom: 10 }]}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
            <Text style={{ fontSize: 22 }}>{item.icon}</Text>
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

// ── MAIN APP ──────────────────────────────────────────────
export default function App() {
  const [screen, setScreen] = useState(-1);
  const [course, setCourse] = useState(null);

  // Splash
  if (screen === -1) {
    setTimeout(() => setScreen(0), 2500);
    return <SplashScreen />;
  }

  const TABS = ['🏠', '🎨', '📚', '👤'];
  const LABELS = ['Home', 'Courses', 'Learning', 'Profile'];

  return (
    <SafeAreaView style={s.root}>
      <StatusBar barStyle="light-content" backgroundColor={C.bg} />
      {/* Status bar */}
      <View style={s.statusBar}>
        <Text style={s.statusTxt}>9:41</Text>
        <Text style={[s.statusTxt, { color: C.accent, fontWeight: '700' }]}>Graphix Academy</Text>
        <Text style={s.statusTxt}>📶🔋</Text>
      </View>

      {/* Content */}
      <View style={{ flex: 1 }}>
        {screen === 4 && course
          ? <CourseDetailScreen course={course} onBack={() => setScreen(1)} />
          : screen === 0 ? <HomeScreen setScreen={setScreen} setCourse={setCourse} />
          : screen === 1 ? <CoursesScreen setCourse={setCourse} setScreen={setScreen} />
          : screen === 2 ? <MyLearningScreen setCourse={setCourse} setScreen={setScreen} />
          : <ProfileScreen />
        }
      </View>

      {/* Bottom Nav */}
      {screen !== 4 && (
        <View style={s.bottomNav}>
          {TABS.map((icon, i) => (
            <TouchableOpacity key={i} style={s.navBtn} onPress={() => setScreen(i)}>
              <Text style={{ fontSize: 22 }}>{icon}</Text>
              <Text style={[s.navLabel, { color: screen === i ? C.accent : C.muted, fontWeight: screen === i ? '700' : '400' }]}>{LABELS[i]}</Text>
              {screen === i && <View style={s.navDot} />}
            </TouchableOpacity>
          ))}
        </View>
      )}
    </SafeAreaView>
  );
}

// ── STYLES ────────────────────────────────────────────────
const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: C.bg },
  splashWrap: { flex: 1, backgroundColor: C.bg, alignItems: 'center', justifyContent: 'center' },
  splashLogo: { width: 90, height: 90, borderRadius: 26, backgroundColor: C.accent, alignItems: 'center', justifyContent: 'center', marginBottom: 18, shadowColor: C.accent, shadowOpacity: 0.5, shadowRadius: 20 },
  splashTitle: { color: C.white, fontSize: 28, fontWeight: '900', letterSpacing: -1, marginBottom: 6 },
  splashSub: { color: C.muted, fontSize: 14 },
  statusBar: { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 16, paddingVertical: 6, backgroundColor: C.bg },
  statusTxt: { color: C.muted, fontSize: 11 },
  hero: { backgroundColor: '#1A0A2E', padding: 28, paddingBottom: 32 },
  heroTag: { color: C.accent, fontSize: 13, fontWeight: '700', letterSpacing: 2, textTransform: 'uppercase', marginBottom: 8 },
  heroTitle: { color: C.white, fontSize: 28, fontWeight: '900', lineHeight: 34, marginBottom: 10, letterSpacing: -0.5 },
  heroSub: { color: C.muted, fontSize: 13, marginBottom: 20, lineHeight: 20 },
  heroBt: { backgroundColor: C.accent, borderRadius: 12, paddingVertical: 14, paddingHorizontal: 24, alignSelf: 'flex-start' },
  heroBtTxt: { color: '#fff', fontWeight: '800', fontSize: 14 },
  statsRow: { flexDirection: 'row', gap: 10, padding: 16 },
  statCard: { flex: 1, backgroundColor: C.card, borderRadius: 12, padding: 12, alignItems: 'center', borderWidth: 1, borderColor: C.border },
  statNum: { color: C.white, fontWeight: '800', fontSize: 15, marginTop: 2 },
  statLabel: { color: C.muted, fontSize: 11, marginTop: 1 },
  section: { padding: 16, paddingTop: 4 },
  sectionTitle: { color: C.white, fontWeight: '800', fontSize: 16, marginBottom: 12 },
  card: { backgroundColor: C.card, borderRadius: 14, padding: 14, borderWidth: 1, borderColor: C.border },
  cardTitle: { color: C.white, fontWeight: '700', fontSize: 14, marginBottom: 3 },
  cardSub: { color: C.muted, fontSize: 12, lineHeight: 18 },
  courseIcon: { width: 52, height: 52, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  courseIconLg: { width: 64, height: 64, borderRadius: 14, alignItems: 'center', justifyContent: 'center', borderWidth: 1 },
  progressBg: { height: 6, backgroundColor: C.dim, borderRadius: 10, overflow: 'hidden' },
  progressFill: { height: '100%', borderRadius: 10 },
  progressTxt: { color: C.muted, fontSize: 11, marginTop: 4 },
  whyGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  whyCard: { width: '47%', backgroundColor: C.card, borderRadius: 12, padding: 14, borderWidth: 1, borderColor: C.border },
  whyTitle: { color: C.white, fontWeight: '700', fontSize: 13, marginBottom: 3 },
  whyDesc: { color: C.muted, fontSize: 12 },
  pageTitle: { color: C.white, fontSize: 22, fontWeight: '900', marginBottom: 16, letterSpacing: -0.5 },
  chip: { borderWidth: 1, borderRadius: 20, paddingVertical: 6, paddingHorizontal: 14, marginRight: 8 },
  badge: { paddingVertical: 3, paddingHorizontal: 8, borderRadius: 20 },
  enrollBtn: { borderRadius: 8, paddingVertical: 8, paddingHorizontal: 16 },
  meta: { color: C.muted, fontSize: 12 },
  tabRow: { flexDirection: 'row', backgroundColor: C.card, borderRadius: 12, padding: 4, marginBottom: 20, borderWidth: 1, borderColor: C.border },
  tabBtn: { flex: 1, paddingVertical: 10, borderRadius: 10, alignItems: 'center' },
  empty: { alignItems: 'center', paddingTop: 60 },
  emptyTitle: { color: C.white, fontSize: 16, fontWeight: '700', marginTop: 12, marginBottom: 6 },
  emptySub: { color: C.muted, fontSize: 13 },
  optionBtn: { flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderRadius: 12, padding: 14, marginBottom: 10 },
  detailHeader: { padding: 20, paddingBottom: 24, borderBottomWidth: 1, borderBottomColor: C.border },
  detailTabs: { flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: C.border, backgroundColor: C.card },
  detailTab: { flex: 1, paddingVertical: 12, alignItems: 'center', borderBottomWidth: 2 },
  overviewLabel: { color: C.accent, fontWeight: '700', fontSize: 13, marginBottom: 10, textTransform: 'uppercase', letterSpacing: 1 },
  lessonIcon: { width: 40, height: 40, borderRadius: 10, alignItems: 'center', justifyContent: 'center' },
  modIcon: { width: 36, height: 36, borderRadius: 10, alignItems: 'center', justifyContent: 'center' },
  avatar: { width: 80, height: 80, borderRadius: 40, backgroundColor: C.accent, alignItems: 'center', justifyContent: 'center', marginBottom: 12 },
  bottomNav: { flexDirection: 'row', backgroundColor: C.card, borderTopWidth: 1, borderTopColor: C.border, paddingBottom: 8 },
  navBtn: { flex: 1, paddingTop: 10, paddingBottom: 6, alignItems: 'center', gap: 3 },
  navLabel: { fontSize: 10 },
  navDot: { width: 4, height: 4, borderRadius: 2, backgroundColor: C.accent },
});
