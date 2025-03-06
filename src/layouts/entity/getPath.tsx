import type { LocationProfile } from "src/types/entities";
import type { GetPath } from "@yext/pages";
import type { TemplateProps } from "src/types/entities";

/**
 * Defines the path that the generated file will live at for production.
 *
 * NOTE: This currently has no impact on the local dev path. Local dev urls currently
 * take on the form: featureName/entityId
 */
export const getPath: GetPath<TemplateProps<LocationProfile>> = (data) => {
  // slugが存在する場合はそれを使用
  if (data.document.slug) {
    return data.document.slug;
  }
  
  // slugが存在しない場合はIDを文字列化してパスにする
  // または他のフィールドを組み合わせてパスを生成
  return `location-${data.document.id}`;
};
