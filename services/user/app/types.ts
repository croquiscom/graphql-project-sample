import DataLoader from 'dataloader';

export interface Context {
  loader: { [loader_name: string]: DataLoader<{}, any> };
}
