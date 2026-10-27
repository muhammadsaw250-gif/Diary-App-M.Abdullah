
import React from 'react';
import {
  Modal,
  View,
  Text,
  Image,
  StyleSheet,
  Pressable,
  ScrollView,
} from 'react-native';

import {
  COLORS,
  SPACE,
  RADIUS,
  TYPO,
} from '../styles/tokens';

export default function DiaryDetailModal({
  visible,
  onClose,
  entry,
}) {
  if (!entry) return null;

  const { title, date, body, heroUri, moodUri } = entry;

  // Mendukung gambar URL maupun gambar lokal dari require()
  const imageSource = heroUri
    ? typeof heroUri === 'string'
      ? { uri: heroUri }
      : heroUri
    : typeof moodUri === 'string'
      ? { uri: moodUri }
      : moodUri;

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="fullScreen"
      onRequestClose={onClose}
    >
      <View style={styles.container}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {imageSource ? (
            <Image
              source={imageSource}
              style={styles.hero}
              resizeMode="cover"
            />
          ) : (
            <View style={styles.imagePlaceholder}>
              <Text style={styles.placeholderText}>
                Tidak ada gambar
              </Text>
            </View>
          )}

          <View style={styles.content}>
            <Text style={styles.title}>
              {title || 'Tanpa Judul'}
            </Text>

            <Text style={styles.date}>
              {date || 'Tanggal tidak tersedia'}
            </Text>

            <Text style={styles.body}>
              {body || 'Belum ada isi catatan.'}
            </Text>

            <Pressable
              onPress={onClose}
              style={({ pressed }) => [
                styles.button,
                pressed && styles.buttonPressed,
              ]}
              accessibilityRole="button"
              accessibilityLabel="Tutup detail catatan"
            >
              <Text style={styles.buttonText}>
                Tutup
              </Text>
            </Pressable>
          </View>
        </ScrollView>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.surface,
  },

  scrollContent: {
    flexGrow: 1,
    paddingBottom: SPACE.xl,
  },

  hero: {
    width: '100%',
    aspectRatio: 16 / 9,
    backgroundColor: '#DDDDDD',
    borderBottomLeftRadius: RADIUS.card,
    borderBottomRightRadius: RADIUS.card,
  },

  imagePlaceholder: {
    width: '100%',
    aspectRatio: 16 / 9,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
  },

  placeholderText: {
    color: COLORS.muted,
    fontSize: TYPO.body,
  },

  content: {
    padding: SPACE.l,
    gap: SPACE.s,
  },

  title: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.text,
  },

  date: {
    fontSize: TYPO.caption,
    color: COLORS.muted,
    marginBottom: SPACE.s,
  },

  body: {
    fontSize: TYPO.body,
    color: COLORS.text,
    lineHeight: 22,
  },

  button: {
    marginTop: SPACE.l,
    padding: SPACE.m,
    borderRadius: RADIUS.card,
    backgroundColor: COLORS.accent,
    alignItems: 'center',
    justifyContent: 'center',
  },

  buttonPressed: {
    opacity: 0.75,
  },

  buttonText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: TYPO.body,
  },
});