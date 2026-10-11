import React from 'react';
import { ActivityIndicator, Pressable, Text, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { useGetEventQuery, isValidEventId } from '../services/eventsApi';
import { selectionCleared } from '../features/selection/selectionSlice';
import { styles } from '../styles';

export default function EventDetailScreen({ eventId }) {
  const dispatch = useDispatch();
  const validId = isValidEventId(eventId);
  const query = useGetEventQuery(eventId, { skip: !validId });
  const event = query.currentData;

  return (
    <View style={styles.screenCard}>
      <View style={styles.screenHeader}>
        <View>
          <Text style={styles.sectionEyebrow}>DETAIL QUERY · getEvent(id)</Text>
          <Text style={styles.screenTitle}>Event details</Text>
        </View>
        <Pressable onPress={() => dispatch(selectionCleared())} style={styles.backButton}>
          <Text style={styles.backButtonText}>←  All events</Text>
        </Pressable>
      </View>

      <View style={styles.argumentCard}>
        <Text style={styles.argumentLabel}>CURRENT SERIALIZABLE ARGUMENT</Text>
        <Text style={styles.argumentValue}>getEvent({JSON.stringify(eventId)})</Text>
        <Text style={styles.argumentCaption}>Endpoint + argument produce a distinct cache identity.</Text>
      </View>

      {!validId ? (
        <View style={styles.errorPanel}>
          <Text style={styles.errorTitle}>Invalid event ID</Text>
          <Text style={styles.errorCopy}>No detail query was started because this is not a positive numeric ID.</Text>
        </View>
      ) : null}

      {validId && query.isLoading ? (
        <View style={styles.loadingPanel}>
          <ActivityIndicator size="large" color="#4b63dd" />
          <Text style={styles.loadingTitle}>Loading event {eventId}</Text>
          <Text style={styles.loadingCopy}>Initial load for this endpoint argument.</Text>
        </View>
      ) : null}

      {validId && query.isFetching && event ? (
        <View style={styles.fetchingBanner}>
          <ActivityIndicator size="small" color="#4b63dd" />
          <Text style={styles.fetchingText}>Fetching event {eventId} again · cached detail stays visible</Text>
        </View>
      ) : null}

      {validId && query.isError ? (
        <View style={styles.errorPanel}>
          <Text style={styles.errorTitle}>{event ? 'Refresh failed · showing cached detail' : 'Could not load this event'}</Text>
          <Text style={styles.errorCopy}>{query.error?.error || `The detail request failed${query.error?.status ? ` (${query.error.status})` : ''}.`}</Text>
          <Pressable onPress={query.refetch} style={styles.retryButton}>
            <Text style={styles.retryText}>Retry detail</Text>
          </Pressable>
        </View>
      ) : null}

      {validId && !query.isLoading && !query.isError && query.isSuccess && !event ? (
        <View style={styles.emptyPanel}>
          <Text style={styles.emptyTitle}>No event found for ID {eventId}</Text>
          <Text style={styles.emptyCopy}>The API returned no record for this valid-looking ID. Return to the list to choose an existing event.</Text>
        </View>
      ) : null}

      {event ? (
        <View style={styles.detailCard}>
          <View style={styles.detailHeader}>
            <View style={styles.timePill}><Text style={styles.timeText}>{event.time}</Text></View>
            <Text style={styles.trackTag}>{event.track.toUpperCase()}</Text>
          </View>
          <Text style={styles.detailTitle}>{event.title}</Text>
          <Text style={styles.detailDescription}>{event.description}</Text>
          <Text style={styles.detailSpeaker}>{event.speaker}</Text>
          <View style={[styles.cacheBadge, !query.isFetching && styles.cacheBadgeReady]}>
            <Text style={[styles.cacheBadgeText, !query.isFetching && styles.cacheBadgeTextReady]}>
              {query.isFetching ? 'FETCHING' : 'AVAILABLE FROM QUERY CACHE'}
            </Text>
          </View>
        </View>
      ) : null}

      {validId && event ? (
        <Pressable onPress={query.refetch} style={styles.detailRefetchButton}>
          <Text style={styles.detailRefetchText}>↻  Refetch current item</Text>
        </Pressable>
      ) : null}
    </View>
  );
}
