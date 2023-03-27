import { useQuasar } from 'quasar'
import { useAuthStore } from 'src/stores/auth'
import { computed } from 'vue'

export default function () {

  const store = useAuthStore()
  const $q = useQuasar()
  const isMobile = computed(() => $q.platform.is.mobile)
  const isMe = computed(() => row => store.user?.id === row.id)

  return {
    isMe, isMobile, store
  }
}
