import {pushTarget, popTarget} from './watch.js'

export function callHook (vm, hook) {
    // #7573 disable dep collection when invoking lifecycle hooks
    pushTarget()
    const handlers = vm.$options[hook]
    const info = `${hook} hook`
    if (handlers) {
      for (let i = 0, j = handlers.length; i < j; i++) {
        invokeWithErrorHandling(handlers[i], vm, null, vm, info)
      }
    }
    if (vm._hasHookEvent) {
      vm.$emit('hook:' + hook)
    }
    popTarget()
  }
// callHook(vm, 'created')
