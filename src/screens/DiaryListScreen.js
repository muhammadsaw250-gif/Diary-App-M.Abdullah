import React from 'react'; 
import { 
  Text, 
  StyleSheet, 
  ScrollView, 
} from 'react-native'; 
import DiaryCard from '../components/DiaryCard';

const diaryEntries = [ 
  { 
    id: 1, 
    title: 'Jadual Makan Siang', 
    date: '2025-10-06', 
    preview: 'Ayam Bakar,Seblak,.', 
    moodUri: 'https://picsum.photos/seed/happy/80', 
  }, 
  { 
    id: 2, 
    title: 'Murojaah', 
    date: '2025-10-05', 
    preview: 'jam 17.30 - 19.30.', 
    moodUri: 'https://picsum.photos/seed/focus/80', 
  }, 
  { 
    id: 3, 
    title: ' Ngerjain Tugas', 
    date: '2025-10-04', 
    preview: 'Dari Jam 10.30 - 11.40', 
    moodUri: 'https://picsum.photos/seed/calm/80', 
  }, 
]; 

export default function DiaryListScreen() { 
  return ( 
    <ScrollView 
      style={styles.container} 
      contentContainerStyle={styles.content} 
    > 
      <Text style={styles.header}>Buku Harian</Text> 

      {diaryEntries.map((entry) => ( 
        <DiaryCard 
          key={entry.id}
          title={entry.title}
          date={entry.date}
          preview={entry.preview}
          moodUri={entry.moodUri}
        />
      ))} 
    </ScrollView> 
  ); 
} 

const styles = StyleSheet.create({ 
  container: { 
    flex: 1, 
    backgroundColor: '#f5eded', 
  }, 
  content: { 
    padding: 16, 
  }, 
  header: { 
    fontSize: 24, 
    fontWeight: '700', 
    marginBottom: 12, 
  }, 
});