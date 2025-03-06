Global Data| Yext Hitchhikers Platform
Overview
Often there is shared data that you want to use across pages on your site. You could hardcode this information, but sometimes you want this content to be configurable by a separate content team. In this scenario, you can use Content to power global data via a site entity.

Content
First, you will want to create a site entity type and create one entity of that type. While the entity type and the schema can be anything you want, we recommend the following conventions:

- Create a new Site entity type.
- Add any relevant fields to this entity type.
- Create a single instance of your new Site entity type.
- Populate the fields on the entity with content you want to make accessible across your site.

Stream Definition in YAML Config
Next, you need to define a site stream in `config.yaml`. Below is an example definition. Note that unlike a stream in a template, this stream will filter by `entityIds` and not `entityTypes`.

```yaml
# The site stream allows for specification of site entity whose data will be injected to all
# generation contexts under the `_site` property.
siteStream:
  id: site-stream
  entityId: site
  fields:
    - name
    - logo
  localization:
    locales:
      - en
  transform:
    replaceOptionValuesWithDisplayNames:
      - c_singleOptionFieldList
    expandOptionFields:
      - c_singleOptionFieldList
```

- `id`: This is a unique identifier for the site stream configuration.
- `entityId`: This field specifies the ID of the site entity in Content. In this case, it’s `site`. This entity typically contains information relevant to the entire website, such as global settings or site-wide metadata.
- `fields`: This is an array that lists the specific Content field IDs of the site entity that should be included in the `_site` object.
- `localization`: This object deals with the localization settings for the site stream. It includes:
  - `locales`: An array of locale strings.
- `transform`: Allows you to transform certain data from Content on the server-side.
  - `replaceOptionValuesWithDisplayNames`: For option-select fields in Yext Content, this transform returns the display name of your option values instead of the IDs. We always recommend using this transform when returning any option-select fields in your `fields` array.
  - `expandOptionFields`: For Option-select fields, this transform returns all possible options for that field, as opposed to only the selected option.

> **Note**
> Just like templates, you can localize your site stream data. Learn more in the Multiple Language Support reference doc.

Access Site Data
Once the site stream has been set up, you can then access the site data in any template, and there will be a new field on the document named `_site`. This property will contain any of the fields specified in the definition above.

Here is an example of a template that uses global data.

```typescript
const Static: Template<TemplateRenderProps> = ({ document }) => {
  const { _site } = document;

  return (
    <Layout footer={<div>©️ {_site.name}</div>}>
      <div>Hello World</div>
    </Layout>
  );
};
```
