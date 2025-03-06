import type { GetPath } from "@yext/pages";
import type { DirectoryProfile, TemplateProps } from "src/types/entities";

/**
 * Defines the path that the generated file will live at for production.
 *
 * NOTE: This currently has no impact on the local dev path. Local dev urls currently
 * take on the form: featureName/entityId
 */
export const getPath: GetPath<TemplateProps<DirectoryProfile<never>>> = (
  data
) => {
  // slugが存在し、かつテンプレート形式（[[...]]）でない場合はそれを使用
  if (data.document.slug && !data.document.slug.includes("[[")) {
    return data.document.slug;
  }
  
  // slugがない場合やテンプレート形式の場合、ID + 名前を使用してパスを生成
  let slugifiedName = "";
  if (data.document.name) {
    slugifiedName = `-${data.document.name.toLowerCase().replace(/[^\w\s]/g, "").replace(/\s+/g, "-")}`;
  }
  
  return `city-${data.document.id}${slugifiedName}`;
};
