import React from 'react';
import { ActivityIndicator, Pressable, Text, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { useGetEventsQuery } from '../services/eventsApi';
import { eventSelected } from '../features/selection/selectionSlice';
import EventRow from '../components/EventRow';
import { styles } from '../styles';

export default function EventListScreen() {
  const dispatch = useDispatch();
  const { data, error, isError, isFetching, isLoading, refetch } = useGetEventsQuery();
  const events = data || [];

  return (
    <View style={styles.screenCard}>
      <View style={styles.screenHeader}>
        <View>
          <Text style={styles.sectionEyebrow}>COLLECTION QUERY · getEvents()</Text>
          <Text style={styles.screenTitle}>Choose a session</Text>
        </View>
        <Pressable onPress={refetch} style={styles.refetchButton}>
          <Text style={styles.refetchText}>↻ Refresh</Text>
        </Pressable>
      </View>

      {isLoading && !data ? (
        <View style={styles.loadingPanel}>
          <ActivityIndicator size="large" color="#4b63dd" />
          <Text style={styles.loadingTitle}>Loading the collection</Text>
          <Text style={styles.loadingCopy}>The list query uses one cache entry for this collection.</Text>
        </View>
      ) : null}

      {isFetching && data ? (
        <View style={styles.fetchingBanner}>
          <ActivityIndicator size="small" color="#4b63dd" />
          <Text style={styles.fetchingText}>Fetching updates · cached collection remains visible</Text>
        </View>
      ) : null}

      {isError ? (
        <View style={styles.errorPanel}>
          <Text style={styles.errorTitle}>{data ? 'Refresh failed · keeping cached collection' : 'Collection request failed'}</Text>
          <Text style={styles.errorCopy}>{error?.error || `The request could not be completed${error?.status ? ` (${error.status})` : ''}.`}</Text>
          <Pressable onPress={refetch} style={styles.retryButton}>
            <Text style={styles.retryText}>Retry collection</Text>
          </Pressable>
        </View>
      ) : null}

      {!isLoading && !isError && data && events.length === 0 ? (
        <View style={styles.emptyPanel}>
          <Text style={styles.emptyTitle}>No events returned</Text>
          <Text style={styles.emptyCopy}>The collection query succeeded with an empty result.</Text>
        </View>
      ) : null}

      {events.length > 0 ? (
        <View style={styles.eventRows}>
          <Text style={styles.collectionCount}>{events.length} events · tap any row to load its detail</Text>
          {events.map((event) => (
            <EventRow key={event.id} event={event} onPress={() => dispatch(eventSelected(event.id))} />
          ))}
        </View>
      ) : null}

      <Pressable onPress={() => dispatch(eventSelected('999'))} style={styles.missingItemButton}>
        <Text style={styles.missingItemText}>Try a missing record (ID 999)</Text>
      </Pressable>
    </View>
  );
}
