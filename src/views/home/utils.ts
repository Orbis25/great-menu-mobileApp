import { SectionListRenderItem } from "react-native";

export interface SectionBase<ItemT> {
  data: ReadonlyArray<ItemT>;

  key?: string;

  renderItem?: SectionListRenderItem<ItemT>;

  ItemSeparatorComponent?: React.ComponentType<any> | null;

  keyExtractor?: (item: ItemT, index: number) => string;
}

export interface SectionListData<ItemT> extends SectionBase<ItemT> {
  [key: string]: any;
}
