import React from 'react';
import { Text, View } from 'react-native';
import { useSelector } from 'react-redux';
import { eventsApi } from '../services/eventsApi';
import { styles } from '../styles';

export default function CacheExplanation({ selectedEventId }) {
  const apiState = useSelector((state) => state[eventsApi.reducerPath]);
  const detailEntries = Object.entries(apiState?.queries || {})
    .filter(([, query]) => query.endpointName === 'getEvent')
    .sort(([, a], [, b]) => String(a.originalArgs).localeCompare(String(b.originalArgs), undefined, { numeric: true }));

  return (
    <View style={styles.cacheExplanationCard}>
      <Text style={styles.sectionEyebrow}>CACHE OBSERVATION</Text>
      <Text style={styles.cacheExplanationTitle}>Endpoint + serialized argument = cache identity</Text>
      <View style={styles.identityRows}>
        {['1', '2', '3'].map((id) => (
          <View key={id} style={styles.identityRow}>
            <Text style={styles.identityQuery}>getEvent + {id}</Text>
            <Text style={styles.identityArrow}>→</Text>
            <Text style={styles.identityResult}>one cache entry</Text>
          </View>
        ))}
      </View>

      <View style={styles.currentArgument}>
        <Text style={styles.currentArgumentLabel}>CURRENT SELECTION</Text>
        <Text style={styles.currentArgumentValue}>
          {selectedEventId ? `getEvent(${JSON.stringify(selectedEventId)})` : 'No ID selected · detail query skipped'}
        </Text>
      </View>

      <Text style={styles.cacheEntriesTitle}>Observed detail cache entries · {detailEntries.length}</Text>
      {detailEntries.length ? detailEntries.map(([key, query]) => (
        <View key={key} style={styles.cacheEntryRow}>
          <Text style={styles.cacheEntryKey}>{key}</Text>
          <Text style={styles.cacheEntryStatus}>{query.status}</Text>
        </View>
      )) : (
        <Text style={styles.cacheEmpty}>Select an event to create a detail cache entry.</Text>
      )}

      <Text style={styles.cacheRetentionNote}>
        Detail entries are kept for five minutes after their last subscriber leaves. Returning to an ID during that window can show cached data immediately without another request.
      </Text>
      <Text style={styles.cacheArgsNote}>
        Primitive ID arguments are stable and easy to serialize. Unstable or unnecessarily complex argument objects can create confusing cache identities.
      </Text>
    </View>
  );
}
