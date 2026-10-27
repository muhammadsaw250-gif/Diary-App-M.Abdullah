import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Pressable,
} from 'react-native';

import {
  COLORS,
  SPACE,
  RADIUS,
  TYPO,
} from '../styles/tokens';

export default function DiaryCard({
  title,
  date,
  preview,
  mood = 'happy',
  moodUri,
  liked = false,
  onPress = () => {},
  onToggleLike = () => {},
  variant = 'list',
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
    <View
      style={[
        styles.card,
        { borderColor },
        variant === 'grid' && styles.cardGrid,
      ]}
    >
      <Pressable
        onPress={onPress}
        android_ripple={{ color: '#E5E7EB' }}
        accessibilityRole="button"
        accessibilityLabel={`Buka entri ${title}, tanggal ${date}`}
        style={({ pressed }) => [
          styles.mainContent,
          { opacity: pressed ? 0.85 : 1 },
        ]}
      >
        <Image
          source={
            moodUri || require('../../assets/moods/happy.png')
          }
          style={[styles.mood, { borderColor }]}
          resizeMode="cover"
        />

        <View style={styles.content}>
          <Text style={styles.title} numberOfLines={1}>
            {title}
          </Text>

          <Text style={styles.date}>{date}</Text>

          <Text
            style={styles.preview}
            numberOfLines={3}
            ellipsizeMode="tail"
          >
            {preview}
          </Text>

          <Text style={[styles.moodLabel, { color: borderColor }]}>
            Mood: {moodLabels[mood] || 'Bahagia'}
          </Text>
        </View>
      </Pressable>

      <Pressable
        onPress={onToggleLike}
        hitSlop={8}
        accessibilityRole="button"
        accessibilityLabel={liked ? 'Batal suka' : 'Suka'}
        accessibilityState={{ selected: liked }}
        style={({ pressed }) => [
          styles.likeButton,
          { opacity: pressed ? 0.6 : 1 },
        ]}
      >
        <Text style={[styles.likeIcon, liked && styles.likedIcon]}>
          {liked ? '♥' : '♡'}
        </Text>
        <Text style={styles.likeLabel}>
          {liked ? 'Disukai' : 'Suka'}
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACE.m,
    padding: SPACE.m,
    marginBottom: SPACE.m,
    backgroundColor: COLORS.surface,
    borderWidth: 2,
    borderColor: COLORS.border,
    borderRadius: RADIUS.card,
    elevation: 2,
    shadowColor: '#000000',
    shadowOpacity: 0.08,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
  },

  cardGrid: {
    alignItems: 'flex-start',
  },

  mainContent: {
    flex: 1,
    minWidth: 0,
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACE.m,
  },

  mood: {
    width: 64,
    height: 64,
    borderRadius: RADIUS.avatar,
    borderWidth: 2,
    backgroundColor: '#EEF2FF',
  },

  content: {
    flex: 1,
    minWidth: 0,
  },

  title: {
    fontSize: TYPO.title,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: SPACE.xs,
  },

  date: {
    fontSize: TYPO.caption,
    color: COLORS.muted,
    marginBottom: SPACE.s,
  },

  preview: {
    fontSize: TYPO.body,
    color: COLORS.text,
    lineHeight: 20,
  },

  moodLabel: {
    fontSize: TYPO.caption,
    fontWeight: '700',
    marginTop: SPACE.s,
  },

  likeButton: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: SPACE.xs,
    paddingVertical: SPACE.s,
    minWidth: 48,
  },

  likeIcon: {
    fontSize: 27,
    color: '#64748B',
  },

  likedIcon: {
    color: '#E11D48',
  },

  likeLabel: {
    fontSize: 11,
    color: COLORS.muted,
    fontWeight: '600',
  },
});