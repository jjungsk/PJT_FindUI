const useSleep = async delay => {
  await new Promise(resolve => setTimeout(resolve, delay));
};

export default useSleep;
