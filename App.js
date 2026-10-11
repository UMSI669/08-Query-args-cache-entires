import React from 'react';
import { Provider, useSelector } from 'react-redux';
import { store } from './app/store';
import { selectSelectedEventId } from './features/selection/selectionSlice';
import EventDetailScreen from './screens/EventDetailScreen';
import EventListScreen from './screens/EventListScreen';
import CacheExplanation from './components/CacheExplanation';
import { ScrollView, SafeAreaView, StatusBar, Text, View } from 'react-native';
import { styles } from './styles';

function AppContent() {
  const selectedEventId = useSelector(selectSelectedEventId);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />
      <ScrollView contentContainerStyle={styles.page}>
        <View style={styles.hero}>
          <Text style={styles.eyebrow}>RTK QUERY · CACHE IDENTITY</Text>
          <Text style={styles.heroTitle}>Conference events</Text>
          <Text style={styles.heroCopy}>
            Choose an event, open its detail query, then revisit it to observe how endpoint arguments identify cached data.
          </Text>
        </View>

        <View style={styles.ownershipStrip}>
          <View style={styles.ownerItem}>
            <Text style={styles.ownerLabel}>CLIENT SLICE</Text>
            <Text style={styles.ownerValue}>selectedEventId</Text>
          </View>
          <Text style={styles.ownerArrow}>→</Text>
          <View style={styles.ownerItem}>
            <Text style={styles.ownerLabel}>QUERY CACHE</Text>
            <Text style={styles.ownerValue}>getEvent(id) record</Text>
          </View>
        </View>

        {selectedEventId ? <EventDetailScreen eventId={selectedEventId} /> : <EventListScreen />}
        <CacheExplanation selectedEventId={selectedEventId} />
      </ScrollView>
    </SafeAreaView>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
}
