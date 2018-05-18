import EventEmitter from 'eventemitter3';

const emitter = new EventEmitter();
const TOAST_SUCCESS = 'toast/success';
const TOAST_INFO = 'toast/info';
const TOAST_ERROR = 'toast/error';

export function onSuccess(action) {
  emitter.on(TOAST_SUCCESS, action);
}

export function onInfo(action) {
  emitter.on(TOAST_INFO, action);
}

export function onError(action) {
  emitter.on(TOAST_ERROR, action);
}

export function removeSuccessListener() {
  emitter.removeListener(TOAST_SUCCESS);
}

export function removeInfoListener() {
  emitter.removeListener(TOAST_INFO);
}

export function removeErrorListener() {
  emitter.removeListener(TOAST_ERROR);
}

export function toastSuccess(message, subMessage, time = 6000) {
  emitter.emit(TOAST_SUCCESS, message, subMessage, time);
}

export function toastInfo(message, subMessage, time = 6000) {
  emitter.emit(TOAST_INFO, message, subMessage, time);
}

export function toastError(message, subMessage, time = 6000) {
  emitter.emit(TOAST_ERROR, message, subMessage, time);
}
