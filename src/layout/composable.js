import { computed } from 'vue'
import { useRoute } from 'vue-router'

export const useBreadcrumbs = () => {
  const route = useRoute()
  return computed(() => route.matched.map(r => ({ title: r.name })).slice(1))
}
