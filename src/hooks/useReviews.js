import { useCallback, useEffect, useState } from 'react';
import { fetchReviews } from '../utils/reviewsApi';

const roundAverage = (value) => (value === null ? null : Math.round(value * 10) / 10);

/**
 * Loads published reviews page by page and keeps the list, count and average in sync
 * when a review is added or removed in this browser.
 * status: 'loading' | 'ready' | 'error'
 */
export function useReviews(pageSize = 6) {
  const [state, setState] = useState({ status: 'loading', reviews: [], count: 0, average: null, error: '' });
  const [loadingMore, setLoadingMore] = useState(false);
  const [moreError, setMoreError] = useState('');

  const load = useCallback(async () => {
    setState((s) => ({ ...s, status: 'loading', error: '' }));
    try {
      const data = await fetchReviews({ limit: pageSize });
      setState({
        status: 'ready',
        reviews: data.reviews ?? [],
        count: data.count ?? 0,
        average: data.average,
        error: '',
      });
    } catch (err) {
      setState((s) => ({ ...s, status: 'error', error: err.message }));
    }
  }, [pageSize]);

  useEffect(() => {
    load();
  }, [load]);

  const loadMore = async () => {
    setLoadingMore(true);
    setMoreError('');
    try {
      const data = await fetchReviews({ limit: pageSize, offset: state.reviews.length });
      setState((s) => {
        const known = new Set(s.reviews.map((r) => r.id));
        return {
          ...s,
          reviews: [...s.reviews, ...(data.reviews ?? []).filter((r) => !known.has(r.id))],
          count: data.count ?? s.count,
          average: data.average,
        };
      });
    } catch (err) {
      setMoreError(err.message);
    } finally {
      setLoadingMore(false);
    }
  };

  const add = (review) =>
    setState((s) => ({
      ...s,
      status: 'ready',
      reviews: [review, ...s.reviews],
      count: s.count + 1,
      average: roundAverage(((s.average ?? 0) * s.count + review.rating) / (s.count + 1)),
    }));

  const remove = (id) =>
    setState((s) => {
      const review = s.reviews.find((r) => r.id === id);
      if (!review) return s;
      const count = Math.max(s.count - 1, 0);
      return {
        ...s,
        reviews: s.reviews.filter((r) => r.id !== id),
        count,
        average: count ? roundAverage(((s.average ?? 0) * s.count - review.rating) / count) : null,
      };
    });

  return {
    ...state,
    hasMore: state.reviews.length < state.count,
    loadingMore,
    moreError,
    reload: load,
    loadMore,
    add,
    remove,
  };
}
