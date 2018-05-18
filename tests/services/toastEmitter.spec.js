import { onSuccess,
         onInfo,
         onError,
         removeSuccessListener,
         removeInfoListener,
         removeErrorListener,
         toastSuccess,
         toastInfo,
         toastError } from 'services/toastEmitter';
import sinon from 'sinon';

describe('(Service) toastEmitter', () => {
  const successAction = sinon.spy();
  const infoAction = sinon.spy();
  const errorAction = sinon.spy();

  beforeEach(() => {
    onSuccess(successAction);
    onInfo(infoAction);
    onError(errorAction);
  });

  afterEach(() => {
    removeSuccessListener();
    removeInfoListener();
    removeErrorListener();
    successAction.reset();
    infoAction.reset();
    errorAction.reset();
  });

  it('Should invoke success action on toast success', () => {
    toastSuccess();
    expect(successAction).to.have.property('callCount', 1);
  });

  it('Should invoke info action on toast info', () => {
    toastInfo();
    expect(infoAction).to.have.property('callCount', 1);
  });

  it('Should invoke error action on toast error', () => {
    toastError();
    expect(errorAction).to.have.property('callCount', 1);
  });

  it('Should not invoke success action on toast error', () => {
    toastError();
    expect(successAction).to.have.property('callCount', 0);
  });

  it('Should invoke error with message and sub-message', () => {
    toastError('Message', 'Sub-message');
    expect(errorAction).to.have.been.calledWith('Message', 'Sub-message');
  });

  it('Should invoke info with message, null sub-message and time', () => {
    toastInfo('Message', null, 6000);
    expect(infoAction).to.have.been.calledWith('Message', null, 6000);
  });

  it('Should invoke success with message, sub-message and time', () => {
    toastSuccess('Message', 'Sub-message', 6000);
    expect(successAction).to.have.been.calledWith('Message', 'Sub-message', 6000);
  });
});
