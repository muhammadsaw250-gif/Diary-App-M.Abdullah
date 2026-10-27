
import React, { useMemo, useState } from 'react';
import {
  Text,
  StyleSheet,
  View,
  Image,
  FlatList,
  useWindowDimensions,
} from 'react-native';

import DiaryCard from '../components/DiaryCard';
import DiaryDetailModal from '../components/DiaryDetailModal';
import SearchBar from '../components/SearchBar';
import EntryForm from '../components/EntryForm';

import {
  COLORS,
  SPACE,
  TYPO,
  BREAKPOINTS,
} from '../styles/tokens';

// Data awal diary dengan gambar lokal sesuai mood
const INITIAL_ENTRIES = [
  {
    id: '1',
    title: 'Jadwal Makan Siang',
    date: '2025-10-06',
    preview: 'Ayam Bakar, Seblak, dan nasi.',
    body: 'Catatan makan siang hari ini: ayam bakar, seblak, dan nasi. Semoga tetap semangat menjalani aktivitas.',
    mood: 'happy',
    moodUri: require('../../assets/moods/happy.png'),
  },
  {
    id: '2',
    title: 'Murojaah',
    date: '2025-10-05',
    preview: 'Jam 17.30 - 19.30. Alhamdulillah!',
    body: 'Melaksanakan murojaah dari pukul 17.30 sampai 19.30. Alhamdulillah, semoga hafalan semakin kuat.',
    mood: 'calm',
    moodUri: require('../../assets/moods/calm.png'),
  },
  {
    id: '3',
    title: 'Ngerjain Tugas',
    date: '2025-10-04',
    preview: 'Dari jam 10.30 - 11.40.',
    body: 'Mengerjakan tugas dari pukul 10.30 sampai 11.40. Tetap konsisten menyelesaikan tugas kuliah.',
    mood: 'focus',
    moodUri: require('../../assets/moods/focus.png'),
  },
  {
    id: '4',
    title: 'Belajar React Native',
    date: '2025-10-03',
    preview: 'Belajar komponen Image dan ScrollView.',
    body: 'Mempelajari penggunaan komponen Image dan ScrollView di React Native untuk membangun antarmuka aplikasi.',
    mood: 'focus',
    moodUri: require('../../assets/moods/focus.png'),
  },
  {
    id: '5',
    title: 'Bersepeda Sore',
    date: '2025-10-02',
    preview: 'Bersepeda sore membuat pikiran lebih segar.',
    body: 'Bersepeda sore untuk menjaga kebugaran dan menyegarkan pikiran setelah menyelesaikan kegiatan.',
    mood: 'happy',
    moodUri: require('../../assets/moods/happy.png'),
  },
];

export default function DiaryListScreen() {
  const { width } = useWindowDimensions();
  const isTablet = width >= BREAKPOINTS.tablet;

  // State utama aplikasi
  const [entries, setEntries] = useState(INITIAL_ENTRIES);
  const [query, setQuery] = useState('');
  const [likedIds, setLikedIds] = useState(new Set());
  const [selectedEntry, setSelectedEntry] = useState(null);

  // Memfilter diary berdasarkan judul, ringkasan, atau tanggal
  const filteredEntries = useMemo(() => {
    const keyword = query.trim().toLowerCase();

    if (!keyword) {
      return entries;
    }

    return entries.filter((entry) =>
      entry.title.toLowerCase().includes(keyword) ||
      entry.preview.toLowerCase().includes(keyword) ||
      entry.date.toLowerCase().includes(keyword)
    );
  }, [entries, query]);

  // Mengubah status Suka
  const toggleLike = (id) => {
    setLikedIds((previous) => {
      const next = new Set(previous);

      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }

      return next;
    });
  };

  // Menambahkan diary baru dari EntryForm
  const addEntry = (newEntry) => {
    const newId = String(newEntry.id);

    setEntries((previous) => [
      {
        ...newEntry,
        id: newId,
        mood: 'happy',
        moodUri: newEntry.moodImage,
      },
      ...previous,
    ]);
  };

  // Memperbarui daftar saat berpindah antara list dan grid
  const listKey = isTablet ? 'diary-grid' : 'diary-list';

  // Tampilan setiap kartu diary
  const renderItem = ({ item }) => (
    <View
      style={[
        styles.itemWrapper,
        isTablet && styles.gridItem,
      ]}
    >
      <DiaryCard
        title={item.title}
        date={item.date}
        preview={item.preview}
        moodUri={item.moodUri}
        mood={item.mood}
        liked={likedIds.has(item.id)}
        onToggleLike={() => toggleLike(item.id)}
        variant={isTablet ? 'grid' : 'list'}
        onPress={() => setSelectedEntry(item)}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header profil */}
      <View style={styles.profile}>
        <Image
          source={require('../../assets/moods/happy.png')}
          style={styles.avatar}
          resizeMode="cover"
        />

        <View style={styles.profileText}>
          <Text style={styles.name}>Diary Harian</Text>
          <Text style={styles.subtitle}>
            Catatan kegiatan saya
          </Text>
        </View>
      </View>

      {/* Judul dan jumlah diary */}
      <Text style={styles.header}>Buku Harian</Text>

      <Text style={styles.count}>
        {entries.length} catatan kegiatan
      </Text>

      {/* Pencarian */}
      <SearchBar onChange={setQuery} />

      {/* Daftar diary dan form tambah */}
      <FlatList
        key={listKey}
        data={filteredEntries}
        keyExtractor={(item) => String(item.id)}
        renderItem={renderItem}
        numColumns={isTablet ? 2 : 1}
        columnWrapperStyle={
          isTablet ? styles.columnWrapper : undefined
        }
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        ListEmptyComponent={
          <Text style={styles.empty}>
            Tidak ada catatan yang cocok.
          </Text>
        }
        ListFooterComponent={
          <EntryForm onSubmit={addEntry} />
        }
      />

      {/* Modal detail diary */}
      <DiaryDetailModal
        visible={selectedEntry !== null}
        entry={selectedEntry}
        onClose={() => setSelectedEntry(null)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
    paddingHorizontal: SPACE.l,
    paddingTop: SPACE.l,
  },

  profile: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    padding: SPACE.l,
    borderRadius: 16,
    marginBottom: SPACE.l,
  },

  avatar: {
    width: 54,
    height: 54,
    borderRadius: 27,
    marginRight: SPACE.m,
    borderWidth: 2,
    borderColor: '#16A34A',
  },

  profileText: {
    flex: 1,
  },

  name: {
    fontSize: 18,
    fontWeight: '700',
    color: '#166534',
  },

  subtitle: {
    fontSize: TYPO.caption,
    color: COLORS.muted,
    marginTop: SPACE.xs,
  },

  header: {
    fontSize: TYPO.h1,
    fontWeight: '700',
    color: '#166534',
    marginBottom: SPACE.xs,
  },

  count: {
    fontSize: TYPO.body,
    color: COLORS.muted,
    marginBottom: SPACE.m,
  },

  listContent: {
    paddingBottom: SPACE.xl,
  },

  itemWrapper: {
    flex: 1,
    minWidth: 0,
    marginBottom: SPACE.m,
  },

  gridItem: {
    flex: 1,
  },

  columnWrapper: {
    gap: SPACE.m,
  },

  empty: {
    textAlign: 'center',
    color: COLORS.muted,
    marginTop: SPACE.xl,
  },
});
