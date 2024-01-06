import { color } from "react-native-reanimated";
import { Category } from "./model";
import uuid from "react-native-uuid";

export class CategoryClass {
  id: string;
  type: Category;
  color: string;
  constructor(type: Category, color: string, id: string) {
    this.id = id;
    this.type = type;
    this.color = color;
  }
}

export const categoryList = [
  new CategoryClass("Food", "#0A4D68", uuid.v4().toString()),
  new CategoryClass("Internet", "#1300DF", uuid.v4().toString()),
  new CategoryClass("Movie", "#BA0A4E", uuid.v4().toString()),
  new CategoryClass("Others", "#0079FF", uuid.v4().toString()),
  new CategoryClass("Transport", "#5C2B41", uuid.v4().toString()),
];
