import { NestedKeyOf } from "../components/Form";

export function get<T extends object>(
  object: React.MutableRefObject<T>,
  path: NestedKeyOf<T>
): any {
  const keys = path.split(".");
  let result = object.current;
  for (const key of keys) {
    // we are sure the path is correct
    if (result) result = (result as any)[key];
    else return undefined;
  }
  return result;
}

export function set<T extends object>(
  object: React.MutableRefObject<T>,
  path: NestedKeyOf<T>,
  value: any
): void {
  const keys = path.split(".");
  let result = object.current;
  for (const key of keys) {
    // we are sure the path is correct
    if (result) result = (result as any)[key];
    else return undefined;
  }
  result = value;
}
