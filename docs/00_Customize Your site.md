# Overview of Templates | Yext Hitchhikers Platform

## What You’ll Learn

<<<<<<< HEAD
In this section, you will:

- Learn about the difference between streams-generated page templates and static pages
- Learn about common template exports that live in both types of templates
- # Look at examples of each

In this section, you will:

- Learn about the difference between streams-generated page templates and static pages
- Learn about common template exports that live in both types of templates
- Look at examples of each
  > > > > > > > 63dca8d5539d2e868b14b5069e1529afc878a3b5

💡 **Prerequisites**
Before you can customize your site, you’ll need to build it. If you haven’t already, complete the Build Your Site module before doing this one!

## Overview

# <<<<<<< HEAD

> > > > > > > 63dca8d5539d2e868b14b5069e1529afc878a3b5
> > > > > > > In the last module, you laid the foundation for your site by setting up your local development environment, creating a site, and deploying it to Yext. Now let’s start customizing it!

In this unit, we’ll go into more detail on the two types of templates you can create:

<<<<<<< HEAD

- Entity templates
- Static page templates

## Entity Templates

=======

- Entity templates
- Static page templates

## Entity Templates

> > > > > > > 63dca8d5539d2e868b14b5069e1529afc878a3b5
> > > > > > > Entity templates (aka stream templates) allow you to generate pages based on entities in your Content, all with the same underlying structure and styling.

Hence the name, each stream template is powered by a stream, which you can think of as the vehicle that delivers Content to Pages in the form of JSON documents.

The `config` export in your template is where you specify the entity and fields you require for your template. In the Turtlehead Tacos example, the location template is used to create individual pages for each location entity. Check out the `config` export in `src/templates/location.tsx`

```
export const config: TemplateConfig = {
  stream: {
    $id: "my-stream-id-1",
    // Specifies the exact data that each generated document will contain. This data is passed in
    // directly as props to the default exported function.
    fields: [
      "id",
      "uid",
      "meta",
      "name",
      "address",
      "mainPhone",
      "description",
      "hours",
      "slug",
      "geocodedCoordinate",
      "services",
    ],
    // Defines the scope of entities that qualify for this stream.
    filter: {
      entityTypes: ["location"],
    },
    // The entity language profiles that documents will be generated for.
    localization: {
      locales: ["en"]
    },
  },
};
```

The `filter` field allows you to specify which `entityTypes` you want to pull from the Content. You can create your own custom filters to pull any subset of data you like, but here, we are grabbing all entities of type `location`.

The `fields` array is where you specify which fields from the chosen `entityType` that will be made available to your template. All of the field names listed in that array will be passed the default export as props on the document object e.g `props.document.address` or `props.document.name`

Streams-powered pages are simple but powerful. By specifying the entity type and the desired fields in `config` you can make hundreds or thousands of pages, each with a uniform structure, but supplied with entity-driven data from the Content.

## Static Page Templates

# <<<<<<< HEAD

> > > > > > > 63dca8d5539d2e868b14b5069e1529afc878a3b5
> > > > > > > Static pages are one-off pages which are not powered by streams, so they will not generate multiple entity-driven pages per template.

The starter repo has a static page under `src/templates/static.tsx`.

```
export const config: TemplateConfig = {
  // The name of the feature. If not set the name of this file will be used (without extension).
  // Use this when you need to override the feature name.
  name: "turtlehead-tacos",
};
```

The `config` export isn’t necessary, but it allows you to specify a name if you want to override the file name.

Let’s look at the `transformProps` function. This function can be used to make external API calls (calls non-Content resources) or to modify props before they are passed to the default export.

```
export const transformProps: TransformProps<ExternalImageData> = async (
  data
) => {
  const url = YEXT_PUBLIC_EXTERNAL_IMAGE_API_BASE_URL + "/2";
  const externalImage = (await fetch(url).then((res: any) =>
    res.json()
  )) as ExternalImage;
  return { ...data, externalImage };
};
```

In the example above, a simple get request is made to an external API and the response `externalImage` is added to the return object. The return value of `transformProps` is then passed to the default export as props.

💡 **Note**
This function will be run during generation and pass its return value directly as props to the default export function.

Although static pages are not powered by streams, they can still be updated with information from the Content through [Global Data](#global-data).

Global data is often used for information stored in headers and footers, that is shared across all pages on your site. You’ll learn about this powerful concept later in this module.

# Customize Templates | Yext Hitchhikers Platform

## What You’ll Learn

<<<<<<< HEAD
In this section, you will:

- Add new Content
- Update a streams-generated page template and preview those changes
- Update a static page

## Overview

=======

In this section, you will:

- Add new Content
- Update a streams-generated page template and preview those changes
- Update a static page

## Overview

> > > > > > > 63dca8d5539d2e868b14b5069e1529afc878a3b5
> > > > > > > Now that you’ve learned about the two types of templates included in the starter repo, let’s learn how to customize them!

The starter repo has fleshed out templates for both the streams-generated page template (`location.tsx`) and static pages (`static.tsx`), so we’ll walk through how to customize them from there.

## Customize Streams-Generated Page Templates

# <<<<<<< HEAD

> > > > > > > 63dca8d5539d2e868b14b5069e1529afc878a3b5
> > > > > > > Since streams-generated page templates create pages for entities from the Yext platform, you’ll need to update both your Content and the template in your repo.

The `src/templates/location.tsx` file in the starter repo already uses a handful of fields from the location entity — such as `name`, `address`, and `mainPhone` — but you may want to add others.

Let’s say Turtlehead Tacos is now offering catering. Now every location should display a dedicated catering phone number that we’ll surface on location pages. To set this up, we will:

1.  Add the content
2.  Configure the platform to store the content
3.  Fill in the content for each location
4.  Update the stream for `location.tsx`
5.  Update the template for `location.tsx`
6.  Preview your updated template

### 1. Add Content

<<<<<<< HEAD
The first step is making sure you have the content you want to use in the platform.

#### A. Configure the Yext Platform

Catering phone numbers are not currently stored in the platform. First add a custom field so you have a place to store the information. In the catering phone number example, you may add a custom field with a configuration like:

- Field Type = number
- Field Name = “Catering Phone Number” (the API name will automatically fill in as `c_cateringPhoneNumber`)
- # Field Availability = location (this says to add the field to the “location” entity type)

The first step is making sure you have the content you want to use in the platform.

#### A. Configure the Yext Platform

Catering phone numbers are not currently stored in the platform. First add a custom field so you have a place to store the information. In the catering phone number example, you may add a custom field with a configuration like:

- Field Type = number
- Field Name = “Catering Phone Number” (the API name will automatically fill in as `c_cateringPhoneNumber`)
- Field Availability = location (this says to add the field to the “location” entity type)
  > > > > > > > 63dca8d5539d2e868b14b5069e1529afc878a3b5

💡 **Note**
If you want to create a field that stores related entities (for example, menu items sold at each location, and each menu item has multiple associated fields) and that entity type doesn’t exist yet, you’ll want to create a custom entity type before adding the field.

#### B. Fill in the Content

# <<<<<<< HEAD

> > > > > > > 63dca8d5539d2e868b14b5069e1529afc878a3b5
> > > > > > > Now that you have a catering phone number field for location entities, fill in the content for each one! You’ve got a few options for updating content.

We suggest you [upload a spreadsheet](https://www.yext.com/support/s/article/Uploading-Entities-via-Spreadsheet). You can also navigate to Content > Entities and filter for locations, then click into each individual entity to edit or [edit entities in bulk](https://www.yext.com/support/s/article/Bulk-Editing-Entities).

### 2. Update the Stream for `location.tsx`

# <<<<<<< HEAD

> > > > > > > 63dca8d5539d2e868b14b5069e1529afc878a3b5
> > > > > > > A Stream is the vehicle that delivers Content to Pages as JSON documents. Every Streams-powered template requires a Stream definition, which is a named export of type `TemplateConfig`. The fields and entity types in the Stream definition determine what data is available to the template.

The Pages architecture generates web pages programmatically through streams. A stream allows you to push a configurable set of data from the Content to Pages for page generation.

[sites overview](https://www.yext.com/support/s/article/Pages-Overview)

Typically, you will create a separate stream for each entity type to programmatically generate the set of relevant pages. Each stream will use its own template, tailored to the data in that stream.

#### A. Add Field to the Stream

# <<<<<<< HEAD

> > > > > > > 63dca8d5539d2e868b14b5069e1529afc878a3b5
> > > > > > > In your repo, navigate to `src/templates/location.tsx`. Take a look at the stream defined. You’ll notice a few key sections of the stream:

```
export const config: TemplateConfig = {
  stream: {
    $id: "my-stream-id-1",
    fields: [ **array of fields here** ],
    filter: {
      entityTypes: ["location"],
    },
    localization: {
      locales: ["en"]
    },
  },
};
```

The `fields` array designates the fields that are being pulled in from these entities. Since we want to use a new field in the HTML template, add the API name of the field to this array: `c_cateringPhoneNumber`

💡 **Note**
If you’re using a related entities field type, you can also add any fields you want to pull from those related entities using dot notation: `"c_relatedProducts.name"`, `"c_relatedProducts.price"`.

#### B. Pull Stream Changes into Local Data

# <<<<<<< HEAD

> > > > > > > 63dca8d5539d2e868b14b5069e1529afc878a3b5
> > > > > > > Navigate to your `/localData` folder and open one of the streams json files that we generated earlier. Notice that it contains strictly the fields we specified in the previous version of our Stream.

In your terminal, ensure you’ve killed your previous local dev server command (`CTRL + C`) and run `npm run dev` which will rebuild your `features.json` to specify the new field. Your local data files will regenerate to account for this change.

You should now see the catering phone number field we just added pulled directly into the document from your Content!

#### C. Other Stream Customizations

<<<<<<< HEAD
There are other configurations you can modify:

- `filter` - This stream filters by the entity type “location”, meaning all location-type entities will have a landing page generated using this template.
  - It is most common to filter based on entity type, but you can also use saved filters here or filter on specific fields, say if there is a field that indicates whether entities should have a landing page.
- `localization` - By default, pages will be generated only for the `en` (English) entity language profile. Update or add language profiles in the `localization` field to generate pages in other language profiles.

### 3. Update the Template for `location.tsx`

=======

There are other configurations you can modify:

- `filter` - This stream filters by the entity type “location”, meaning all location-type entities will have a landing page generated using this template.
  - It is most common to filter based on entity type, but you can also use saved filters here or filter on specific fields, say if there is a field that indicates whether entities should have a landing page.
- `localization` - By default, pages will be generated only for the `en` (English) entity language profile. Update or add language profiles in the `localization` field to generate pages in other language profiles.

### 3. Update the Template for `location.tsx`

> > > > > > > 63dca8d5539d2e868b14b5069e1529afc878a3b5
> > > > > > > This is the fun part! Now you can use the fields you imported to display content where and how you want.

Since `c_cateringPhoneNumber` is specified in the `fields` array of the `config`, you will now have access to it in the default export. Just like the other fields, you can access `c_cateringPhoneNumber` on `props.document`. A super simple example:

```
const Location: Template<TemplateRenderProps> = ( { document }) => {
  const { c_cateringPhoneNumber } = document;

  return (
    <>
      <h1>
        Catering Phone Number {c_cateringPhoneNumber}
      </h1>
    </>
  );
};
```

If you are following along, practice pulling in the new field, and check it out on one of your location pages.

### 4. Preview Your Updated Template

# <<<<<<< HEAD

> > > > > > > 63dca8d5539d2e868b14b5069e1529afc878a3b5
> > > > > > > To start your local dev server and preview changes as you make them, run the following command in your CLI:

```
npm run dev
```

This will spin up your site at `localhost:5173` in your browser. Navigate to the pages of your site just as we did before in the [Create & Deploy Your Site unit](https://hitchhikers.yext.com/modules/build-your-site/create-and-deploy-your-site).

If you go to the one of the location pages for which you added a catering phone number, you should now be able to see it.

## Customize Static Pages

# <<<<<<< HEAD

> > > > > > > 63dca8d5539d2e868b14b5069e1529afc878a3b5
> > > > > > > Static pages can be updated like any web page page using HTML, CSS, JS, and React. Let’s update the copy on the about page - it’s currently got some Latin placeholder text.

In your repo, navigate to `./src/templates/static.tsx` and modify the JSX to your heart’s content.

Notice that the starter repo pulls in data from an external API, which is then rendered in the template. Experiment with pulling in external data, bearing in mind that the call to the external API occurs at build-time, not when the page is visited in the browser.

```
.const Static: Template<ExternalImageRenderData> = ({ relativePrefixToRoot, path, document}) => {

  return (
    <>
      <PageLayout>
        <div className="centered-container">
          <div className="bg-red-900 text-5xl font-bold text-white p-10 flex items-center justify-center flex-col gap-x-14 gap-y-10 md:flex-row">
            <h1>Welcome to Turtlehead Tacos</h1>
          </div>
          <div className="space-y-5">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
            <p>
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?
            </p>
            <div>
              <Card {...externalImage} />
            </div>
          </div>
        </div>
      </PageLayout>
    </>
  );
};
```

Save your changes and take a look at the updated page in your local dev server (if you’re not running your local dev server, run `npm run dev`)!

While Yext Pages is primarily used to create landing pages from entities in the platform, most website have a handful of static pages, such as “index’ or “about” pages.

## Customize Components

# <<<<<<< HEAD

> > > > > > > 63dca8d5539d2e868b14b5069e1529afc878a3b5
> > > > > > > You’ll also notice that the templates also uses custom components defined in the `./src/components` folder. It’s best practice to create custom components for any content on your site that will be repeated, like the header and footer.

You can also create your own custom components. If you prefer a different directory structure, feel free to put your components wherever, but you must observe two rules:

1.  All custom files or directories must live under the `src` directory if you want to import them into your templates
2.  Any custom files or directories that are not templates must NOT live in `templates`

# Global Data | Yext Hitchhikers Platform

## What You’ll Learn

<<<<<<< HEAD
In this section, you will:

- Learn about common use cases for using global data
- Set up your Content to easily configure global data
- Set up a site stream to access global data in your site

## Overview

=======

In this section, you will:

- Learn about common use cases for using global data
- Set up your Content to easily configure global data
- Set up a site stream to access global data in your site

## Overview

> > > > > > > 63dca8d5539d2e868b14b5069e1529afc878a3b5
> > > > > > > Websites frequently have content that is shared across all pages - think logos, taglines, site names, etc. It is a best practice to have a single-source-of-truth, so that any changes will propagate across your entire sites. This helps make updates easier and ensure brand unity.

In this scenario, you can use the platform to power global data, which is accessible across all pages on your site - both static and stream-powered pages!

Common global data variable use cases include your brand’s:

<<<<<<< HEAD

- Name
- Primary and secondary color hex values
- URL links for your header and footer
- Image URL or path for your logo
- # Yext Account ID

* Name
* Primary and secondary color hex values
* URL links for your header and footer
* Image URL or path for your logo
* Yext Account ID
  > > > > > > > 63dca8d5539d2e868b14b5069e1529afc878a3b5

In this unit, we’ll walk through how to set up a site stream to use data across your site. At a high level, you’ll need to create a site entity in the platform to store the content and then create a site stream in your repo to pass in the data to be used across templates.

Check out the [Global Data reference doc](https://www.yext.com/support/s/article/Global-Data) for more info.

## Create a Site Entity

<<<<<<< HEAD
First, you will want to [create a site entity type](https://www.yext.com/support/s/article/Creating-Custom-Entity-Types) and [create one entity](https://www.yext.com/support/s/article/Adding-Entities) of that type. While the entity type and the schema can be anything you want we recommend the following conventions:

- Create a new `Site` entity type
- Add any fields to this entity type that you’ll want to leverage across pages of the site
- Create an instance of a `Site` entity
- # Populate the fields on your new entity

First, you will want to [create a site entity type](https://www.yext.com/support/s/article/Creating-Custom-Entity-Types) and [create one entity](https://www.yext.com/support/s/article/Adding-Entities) of that type. While the entity type and the schema can be anything you want we recommend the following conventions:

- Create a new `Site` entity type
- Add any fields to this entity type that you’ll want to leverage across pages of the site
- Create an instance of a `Site` entity
- Populate the fields on your new entity
  > > > > > > > 63dca8d5539d2e868b14b5069e1529afc878a3b5

This entity should include all of the content that you would like to acess across pages of the site (e.g., a logo for the header, relevant links for the footer). It could look something like the following:

[Turtlehead Tacos site entity](https://i.imgur.com/s17y67j.png)

## Set up a Site Stream

<<<<<<< HEAD
Once the entity is created you will need to set up a site stream in your repo at `config.yaml` that is filtered to the site entity.

- `fields` - Delete any fields you’re not using and add any fields you want to use.
- `entityIds` - Note that unlike a stream in a template, this stream will filter by `entityIds` and not `entityTypes`. Make sure the entity ID in the stream matches that of the site entity you created in the Content.
- # `locales` - The default locale is `en`. Update this to change or add other locales.

Once the entity is created you will need to set up a site stream in your repo at `config.yaml` that is filtered to the site entity.

- `fields` - Delete any fields you’re not using and add any fields you want to use.
- `entityIds` - Note that unlike a stream in a template, this stream will filter by `entityIds` and not `entityTypes`. Make sure the entity ID in the stream matches that of the site entity you created in the Content.
- `locales` - The default locale is `en`. Update this to change or add other locales.
  > > > > > > > 63dca8d5539d2e868b14b5069e1529afc878a3b5

The stream for the Turtlehead Tacos entity above could look something like this:

```
# The site stream allows for specification of site entity whose data will be injected to all
# generation contexts under the `_site` property.
siteStream:
  id: site-entity
  entityId: turtlehead-tacos-site
  fields:
    - logo
    - c_header
    - c_footer
  localization:
    locales:
      - en
```

## Access Site Data

# <<<<<<< HEAD

> > > > > > > 63dca8d5539d2e868b14b5069e1529afc878a3b5
> > > > > > > After your new site stream is configured, you can now access Global Data across your app. The global data object will be available on the `_site` object which lives on `props.document` A quick example:

```
const Index: Template<Data> = ({ document }) => {
  const { _site } = document;

  return (
    <>
      <div>{_site.name}</div>
    </>
  );
};
```

Try pulling in some global data into the header or footer of your starter repo. You can remove hardcoded references to Turtlehead Tacos with `_site.name` if you configure site name in your Site entity in the platform. Do the same for logos, social links, and beyond!

💡 **Note**
Global Data is accessible on static pages, as well as stream-powered pages. Even though each static page isn’t backed by an individual entity in the Content, a static page will reflect updates to Global Data.

# Styling and Customizations | Yext Hitchhikers Platform

## Styling

<<<<<<< HEAD
Out of the box, the starter template ([https://github.com/YextSolutions/pages-starter-react-locations](https://github.com/YextSolutions/pages-starter-react-locations)) uses [Tailwind](https://tailwindcss.com/) for styling. You can find the tailwind configuration inside of `tailwind.config.cjs`. Postcss is used to process the tailwind and you can find the configuration in `postcss.config.cjs`. Be sure to import the `index.css` file into your templates in order to import these styles.

# You can also use many other CSS frameworks on Yext Pages. Under the hood we use Vite for building. You can learn more about

Out of the box, the starter template ([https://github.com/YextSolutions/pages-starter-react-locations](https://github.com/YextSolutions/pages-starter-react-locations)) uses [Tailwind](https://tailwindcss.com/) for styling. You can find the tailwind configuration inside of `tailwind.config.cjs`. Postcss is used to process the tailwind and you can find the configuration in `postcss.config.cjs`. Be sure to import the `index.css` file into your templates in order to import these styles.

You can also use many other CSS frameworks on Yext Pages. Under the hood we use Vite for building. You can learn more about

> > > > > > > 63dca8d5539d2e868b14b5069e1529afc878a3b5
