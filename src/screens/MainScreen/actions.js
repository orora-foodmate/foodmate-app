function initialPromise() {
  return Promise.all([
  ]);
}

export const initialAppAction = () => ({
  types: ['INITIAL_APP', 'INITIAL_APP_SUCCESS', 'INITIAL_APP_ERROR'],
  promise: initialPromise,
})