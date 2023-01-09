import { NestedKeyOf } from "../components/Form";

export function get<T extends object>(
  object: React.MutableRefObject<T>,
  path: NestedKeyOf<T>
): any {
  try {
    const keys = path.split(".");
    let result = object.current;
    for (const key of keys) {
      // we are sure the path is correct
      if (result) result = (result as any)[key];
      else return undefined;
    }
    return result;
  } catch (e) {
    console.error(e);
    console.error("path", path);
    return "undefined";
  }
}

export function set<T extends object>(
  object: React.MutableRefObject<T>,
  path: NestedKeyOf<T>,
  value: any
): void {
  try {
    const keys = path.split(".");
    let result = object.current;
    for (let i = 0; i < keys.length - 1; i++) {
      // we are sure the path is correct
      result = (result as any)[keys[i]];
    }
    if (result) (result as any)[keys[keys.length - 1]] = value;
  } catch (e) {
    console.error(e);
    console.error("path", path);
    console.error("value", value);
  }
}
