export type ConfigMenuType = {
  id: string;
  label: string;
  icon: () => React.ReactNode;
  action: () => void;
};
