
import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

export default function DiaryCard({
  title,
  date,
  preview,
  mood = 'happy',
  moodUri,
}) {
  const moodColors = {
    happy: '#16A34A',
    calm: '#0EA5E9',
    focus: '#8B5CF6',
  };

  const moodLabels = {
    happy: 'Bahagia',
    calm: 'Tenang',
    focus: 'Fokus',
  };

  const borderColor = moodColors[mood] || '#16A34A';

  return (
    <View style={[styles.card, { borderColor }]}>
      <Image
        source={moodUri || require('../../assets/moods/happy.png')}
        style={[styles.mood, { borderColor }]}
        resizeMode="cover"
      />

      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.date}>{date}</Text>
        <Text style={styles.preview} numberOfLines={3}>
          {preview}
        </Text>
        <Text style={[styles.moodLabel, { color: borderColor }]}>
          Mood: {moodLabels[mood] || 'Bahagia'}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 14,
    marginBottom: 14,
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderRadius: 16,
    elevation: 2,
    shadowColor: '#000000',
    shadowOpacity: 0.08,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
  },
  mood: {
    width: 62,
    height: 62,
    borderRadius: 31,
    borderWidth: 2,
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1E293B',
    marginBottom: 4,
  },
  date: {
    fontSize: 12,
    color: '#64748B',
    marginBottom: 6,
  },
  preview: {
    fontSize: 14,
    color: '#475569',
    lineHeight: 20,
  },
  moodLabel: {
    fontSize: 12,
    fontWeight: '700',
    marginTop: 8,
  },
});
