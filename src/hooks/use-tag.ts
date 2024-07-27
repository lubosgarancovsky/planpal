const useTag = () => {
  const label = (tag: string) => {
    return tag.split('$')[0];
  };

  const color = (tag: string) => {
    return tag.split('$')[1];
  };

  return { label, color };
};

export default useTag;
