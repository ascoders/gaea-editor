export const pipeEvent = (func: any) => {
  return (event: React.ChangeEvent<HTMLInputElement>) => {
    return func(event.target.value, event);
  };
};
