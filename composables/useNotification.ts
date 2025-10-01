import type { IziToastSettings } from 'izitoast'
import { useToast } from '#imports'
/**
 * iziToast.js options 참고
 * https://marcelodolza.github.io/iziToast/
 */

export default function () {
  const toast = useToast()

  toast.settings({
    timeout: 2000,
    close: false,
    closeOnClick: true,
    backgroundColor: '#000000b3',
    messageColor: '#ffffff',
    icon: '',
    position: 'bottomCenter',
    messageSize: '14',
    progressBar: false,
    messageLineHeight: '20', // px,
    displayMode: 2 // 토스트 메시지 하나만 뜨도록
  })

  const showToast = (options: IziToastSettings, overrides?: IziToastSettings) => {
    toast.show({
      ...options,
      ...overrides
    })
  }

  const infoNotification = (options: string | IziToastSettings) => {
    if (typeof options === 'string') {
      options = { message: options }
    }
    showToast(options)
  }

  const successNotification = (options: string | IziToastSettings) => {
    if (typeof options === 'string') {
      options = { message: options }
    }
    showToast(options, {
      backgroundColor: '#DDEEC2',
      messageColor: '#56761F',
      position: 'topCenter'
    })
  }

  const errorNotification = (options: string | IziToastSettings) => {
    if (typeof options === 'string') {
      options = { message: options }
    }
    showToast(options, {
      backgroundColor: '#FFE0E5',
      messageColor: '#F14960',
      position: 'topCenter'
    })
  }

  const requsetNotification = (options: string | IziToastSettings) => {
    if (typeof options === 'string') {
      options = { message: options }
    }
    showToast(options, {
      backgroundColor: '#FFF9DF',
      messageColor: '#A18000',
      position: 'topCenter'
    })
  }

  const infoNotificationWithDelay = (options: string | IziToastSettings, timeout: number = 500) => {
    if (typeof options === 'string') {
      options = { message: options }
    }
    if (timeout && typeof timeout === 'number') {
      return setTimeout(() => {
        showToast(options)
      }, timeout)
    }
    showToast(options)
  }

  const successNotificationWithDelay = (options: string | IziToastSettings, timeout: number = 500) => {
    if (typeof options === 'string') {
      options = { message: options }
    }
    if (timeout && typeof timeout === 'number') {
      return setTimeout(() => {
        showToast(options, {
          backgroundColor: '#4C7FF7',
          messageColor: '#F7F7F7'
        })
      }, timeout)
    }
    showToast(options, {
      backgroundColor: '#4C7FF7',
      messageColor: '#F7F7F7'
    })
  }

  const errorNotificationWithDelay = (options: string | IziToastSettings, timeout: number = 500) => {
    if (typeof options === 'string') {
      options = { message: options }
    }
    if (timeout && typeof timeout === 'number') {
      return setTimeout(() => {
        showToast(options, {
          backgroundColor: '#F14960',
          messageColor: '#F7F7F7'
        })
      }, timeout)
    }
    showToast(options, {
      backgroundColor: '#F14960',
      messageColor: '#F7F7F7'
    })
  }

  return {
    infoNotification,
    successNotification,
    errorNotification,
    requsetNotification,
    infoNotificationWithDelay,
    successNotificationWithDelay,
    errorNotificationWithDelay
  }
}
