import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { styles } from '../styles';

export default function EventRow({ event, onPress }) {
  return (
    <Pressable onPress={onPress} style={styles.eventRow}>
      <View style={styles.eventRowContent}>
        <View style={styles.eventRowTop}>
          <Text style={styles.eventTime}>{event.time}</Text>
          <Text style={styles.eventTrack}>{event.track.toUpperCase()}</Text>
        </View>
        <Text style={styles.eventTitle}>{event.title}</Text>
        <Text style={styles.eventSpeaker}>{event.speaker}</Text>
      </View>
      <View style={styles.eventRowAction}>
        <Text style={styles.eventRowActionText}>View</Text>
        <Text style={styles.eventRowArrow}>›</Text>
      </View>
    </Pressable>
  );
}
