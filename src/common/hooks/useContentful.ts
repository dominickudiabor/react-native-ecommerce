import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import _isEmpty from 'lodash/isEmpty'

import { loadData } from 'common/redux/actions/features'
import { FeatureType, AppState } from 'common/redux/types'
import { ContentfulApiResponse } from 'features/types'

type ReturnType = {
  data: ContentfulApiResponse | null
  loading?: boolean
}

export default function useContentful(query: string, feature: FeatureType): ReturnType {
  const dispatch = useDispatch()

  const data = useSelector((state: AppState) => state.features[feature]?.all ?? null)

  useEffect(() => {
    if (_isEmpty(data)) {
      dispatch(loadData(query, feature))
    }
  }, [dispatch, query, feature])

  return { data, loading: !data }
}
