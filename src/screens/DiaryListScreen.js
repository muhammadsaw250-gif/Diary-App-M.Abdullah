
import React from 'react';
import {
  Text,
  StyleSheet,
  ScrollView,
  View,
  Image,
} from 'react-native';
import DiaryCard from '../components/DiaryCard';

const diaryEntries = [
  {
    id: 1,
    title: 'Jadwal Makan Siang',
    date: '2025-10-06',
    preview: 'Ayam Bakar, Seblak, dan nasi.',
    mood: 'happy',
    moodUri: require('../../assets/moods/happy.png'),
  },
  {
    id: 2,
    title: 'Murojaah',
    date: '2025-10-05',
    preview: 'Jam 17.30 - 19.30. Alhamdulillah!',
    mood: 'calm',
    moodUri: require('../../assets/moods/happy.png'),
  },
  {
    id: 3,
    title: 'Ngerjain Tugas',
    date: '2025-10-04',
    preview: 'Dari jam 10.30 - 11.40.',
    mood: 'focus',
    moodUri: require('../../assets/moods/happy.png'),
  },
  {
    id: 4,
    title: 'Belajar React Native',
    date: '2025-10-03',
    preview: 'Belajar komponen Image dan ScrollView.',
    mood: 'focus',
    moodUri: require('../../assets/moods/happy.png'),
  },
  {
    id: 5,
    title: 'Bersepeda Sore',
    date: '2025-10-02',
    preview: 'Bersepeda sore membuat pikiran lebih segar.',
    mood: 'happy',
    moodUri: require('../../assets/moods/happy.png'),
  },
];

export default function DiaryListScreen() {
  return (
    <ScrollView style={styles.container}
      contentContainerStyle={styles.content}>
      <View style={styles.profile}>
        <Image
          source={require('../../assets/moods/happy.png')}
          style={styles.avatar}
        />
        <View>
          <Text style={styles.name}>Diary Harian</Text>
          <Text style={styles.subtitle}>Catatan kegiatan saya</Text>
        </View>
      </View>

      <Text style={styles.header}>Buku Harian</Text>
      <Text style={styles.count}>
        {diaryEntries.length} catatan kegiatan
      </Text>

      {diaryEntries.map((entry) => (
        <DiaryCard
          key={entry.id}
          title={entry.title}
          date={entry.date}
          preview={entry.preview}
          moodUri={entry.moodUri}
          mood={entry.mood}
        />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },
  content: {
    padding: 16,
    paddingBottom: 32,
  },
  profile: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 16,
  },
  avatar: {
    width: 54,
    height: 54,
    borderRadius: 27,
    marginRight: 12,
    borderWidth: 2,
    borderColor: '#16A34A',
  },
  name: {
    fontSize: 18,
    fontWeight: '700',
    color: '#166534',
  },
  subtitle: {
    fontSize: 13,
    color: '#64748B',
    marginTop: 4,
  },
  header: {
    fontSize: 24,
    fontWeight: '700',
    color: '#166534',
    marginBottom: 6,
  },
  count: {
    fontSize: 14,
    color: '#64748B',
    marginBottom: 16,
  },
});
