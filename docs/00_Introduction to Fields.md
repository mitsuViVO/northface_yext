# What is a Field

<<<<<<< HEAD
| Yext Hitchhikers Platform

## What You’ll Learn

In this section, you will learn:

- What a field is
- Examples of fields on some built-in types
- The “field is a field is a field” principle

## Fields Overview

=======

| Yext Hitchhikers Platform

## What You’ll Learn

In this section, you will learn:

- What a field is
- Examples of fields on some built-in types
- The “field is a field is a field” principle

## Fields Overview

> > > > > > > 63dca8d5539d2e868b14b5069e1529afc878a3b5
> > > > > > > As you learned in the [Entity Types Module](TODO: link to entity types module), entities are the core objects stored in Yext Content and fields provide additional information about each entity type.

Each Entity Type comes with a number of Yext pre-built fields and you can add additional custom fields as needed. Remember (as we showed in the [Entity Types Module](TODO: link to entity types module)) there are some fields that are on all entity types – built-in or custom. These include:

<<<<<<< HEAD

- Entity ID (unique identifier)
- Name
- Folder
- # Labels

* Entity ID (unique identifier)
* Name
* Folder
* Labels
  > > > > > > > 63dca8d5539d2e868b14b5069e1529afc878a3b5

Here are some example fields on some of the built-in Yext types –

**Location:**

<<<<<<< HEAD

- Name
- Address
- Phone
- Hours
- Description
- Logo
- etc.

**Event**

- Name
- Start/End Date/Time
- Event Location
- Ticket URL
- etc.

**Healthcare Professional**

- Name (First, Middle, Last)
- NPI
- Office Address
- Office Phone
- Headshot
- Photo Gallery
- Education
- etc.

**Restaurant**

- Name
- Address
- Hours
- Description
- Logo
- Attire
- Price Range
- etc.

**Job**

- Name
- Job Location
- Description
- Keywords
- # etc.

* Name
* Address
* Phone
* Hours
* Description
* Logo
* etc.

**Event**

- Name
- Start/End Date/Time
- Event Location
- Ticket URL
- etc.

**Healthcare Professional**

- Name (First, Middle, Last)
- NPI
- Office Address
- Office Phone
- Headshot
- Photo Gallery
- Education
- etc.

**Restaurant**

- Name
- Address
- Hours
- Description
- Logo
- Attire
- Price Range
- etc.

**Job**

- Name
- Job Location
- Description
- Keywords
- etc.
  > > > > > > > 63dca8d5539d2e868b14b5069e1529afc878a3b5

Additional fields are also automatically enabled if you are subscribed to certain publishers. For example, if your package includes Google Business Profile, your Location entities will also have fields like Google Cover Photo or Google attributes.

All fields have a few properties:

<<<<<<< HEAD

- A Type, like string, phone, or url
- A Display Name, like “Keywords”, “Main Phone”, or “Description” used to reference the field in the UI
- An API name, like `description` or `c_customfield` used to reference the field in the API
- # Validation, like maximum character counts, count of items for lists, or aspect ratio for photos

* A Type, like string, phone, or url
* A Display Name, like “Keywords”, “Main Phone”, or “Description” used to reference the field in the UI
* An API name, like `description` or `c_customfield` used to reference the field in the API
* Validation, like maximum character counts, count of items for lists, or aspect ratio for photos
  > > > > > > > 63dca8d5539d2e868b14b5069e1529afc878a3b5

An important tenet of fields in Yext Data Modeling is that “a field is a field is a field”. This means that, once-defined, a field maintains the same properties like Name and Validation no matter where it appears. Fields are often shared between types – like the Description field – but no matter where it appears it will have the same validation, API name, and UX.

### Field is the same no matter what type

<<<<<<< HEAD
In this example, the Name field is present on each of these types and its validation and UI presentation is the same.

# Built-in vs. Custom Fields

| Yext Hitchhikers Platform

## What You’ll Learn

In this section, you will learn:

- The difference between built-in and custom fields
- When to use each

## Differences between Built-in vs. Custom Fields

Just like Entity Types, fields can either be:

- Built-in and pre-defined by Yext
- # Custom defined by you

In this example, the Name field is present on each of these types and its validation and UI presentation is the same.

# Built-in vs. Custom Fields

| Yext Hitchhikers Platform

## What You’ll Learn

In this section, you will learn:

- The difference between built-in and custom fields
- When to use each

## Differences between Built-in vs. Custom Fields

Just like Entity Types, fields can either be:

- Built-in and pre-defined by Yext
- Custom defined by you
  > > > > > > > 63dca8d5539d2e868b14b5069e1529afc878a3b5

Built-in fields will have built-in semantics and destinations, just like Entity Types. For example, Yext knows that the Description field on a Location entity should be the Description that we deliver to Google Maps and display on a location page. Since it’s built in, we don’t need users to tell us what the default behavior should be. We also determine the field’s validation based on that default behavior, like knowing the character limit lengths imposed by publishers.

You’ll recall that on a Location like the Yext headquarters in New York, we have fields like Name, Address, Phone Number, Description and Website. In fact, the built-in Location entity type has over 70 built-in fields!

For Custom Fields, You get to decide what the field means by defining the type yourself and therefore you have flexibility over things like the name, the validation and the multi-language profile behavior. More on those details later.

Where possible, we recommend that you use built-in fields, but we expect every graph to contain custom fields that make it unique to each Brand. Some custom fields are used purely for organizational or internal purposes (like keeping track of a store’s square footage or documenting the data source for an Entity), while others are meant to be consumer facing (like Promotions on Pages).

<<<<<<< HEAD
| Built-in Field | Custom Field  
=======
| Built-in Field | Custom Field

> > > > > > > 63dca8d5539d2e868b14b5069e1529afc878a3b5
