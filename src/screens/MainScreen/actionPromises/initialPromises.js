

export default async function initialPromise(setIsInitialApp) {
  try {
    setIsInitialApp(true);
  }catch(error) {
    throw error;
  }
}