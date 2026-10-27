import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
  Alert,
} from 'react-native';

import { COLORS, SPACE, RADIUS, TYPO } from '../styles/tokens';

export default function EntryForm({ onSubmit }) {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState(
    new Date().toISOString().slice(0, 10)
  );
  const [preview, setPreview] = useState('');

  const canSubmit =
    title.trim().length > 0 &&
    preview.trim().length > 0;

  const submit = () => {
    if (!canSubmit) {
      Alert.alert(
        'Data belum lengkap',
        'Isi judul dan ringkasan diary terlebih dahulu.'
      );
      return;
    }

    onSubmit?.({
      id: Date.now(),
      title: title.trim(),
      date: date.trim(),
      preview: preview.trim(),
      body: preview.trim(),
      moodImage: require('../../assets/moods/happy.png'),
    });

    setTitle('');
    setDate(new Date().toISOString().slice(0, 10));
    setPreview('');

    Alert.alert('Berhasil', 'Entri diary berhasil ditambahkan.');
  };

  return (
    <View style={styles.form}>
      <Text style={styles.heading}>Tambah Entri Diary</Text>

      <TextInput
        value={title}
        onChangeText={setTitle}
        placeholder="Judul diary"
        style={styles.input}
      />

      <TextInput
        value={date}
        onChangeText={setDate}
        placeholder="YYYY-MM-DD"
        style={styles.input}
      />

      <TextInput
        value={preview}
        onChangeText={setPreview}
        placeholder="Ceritakan kegiatan hari ini..."
        style={[styles.input, styles.multiline]}
        multiline
      />

      <Pressable
        onPress={submit}
        disabled={!canSubmit}
        style={[
          styles.button,
          !canSubmit && styles.buttonDisabled,
        ]}
      >
        <Text style={styles.buttonText}>Simpan Diary</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  form: {
    padding: SPACE.l,
    gap: SPACE.s,
  },
  heading: {
    fontSize: TYPO.title,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: SPACE.s,
  },
  input: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: RADIUS.card,
    paddingHorizontal: SPACE.m,
    paddingVertical: 10,
    backgroundColor: '#fff',
    color: COLORS.text,
  },
  multiline: {
    minHeight: 80,
    textAlignVertical: 'top',
  },
  button: {
    marginTop: SPACE.s,
    padding: SPACE.m,
    borderRadius: RADIUS.card,
    backgroundColor: COLORS.accent,
    alignItems: 'center',
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '700',
  },
});