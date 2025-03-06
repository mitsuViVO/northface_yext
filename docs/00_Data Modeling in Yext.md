# Entities vs. Fields| Yext Hitchhikers Platform

<<<<<<< HEAD

## What You’ll Learn

In this section, you will learn:

- When to use a field vs. an entity
- How data modeling relates to user permissions
- Listings-specific considerations for Data Modeling

## When is something an Entity vs. a Field?

=======

## What You’ll Learn

In this section, you will learn:

- When to use a field vs. an entity
- How data modeling relates to user permissions
- Listings-specific considerations for Data Modeling

## When is something an Entity vs. a Field?

> > > > > > > 63dca8d5539d2e868b14b5069e1529afc878a3b5
> > > > > > > This is one of the most important questions to ask yourself as an expert Yext Data Modeler. And the answer isn’t easy – it depends.

Remember what we learned before: Entities are the thing. Fields are what describes that thing.

### Entity vs. Field

One rule of thumb is what can an entity do vs. what can a field do.

An Entity can be:

<<<<<<< HEAD

- Listed (given there’s a network for that type)
- Reviewed
- Published as a page
- Returned as a Result Card in Search

Fields can be:

- Displayed on an Entity’s listing or Page
- Used as a direct answer in Search
- # Used as criteria for Advanced Filters or Saved Searches

* Listed (given there’s a network for that type)
* Reviewed
* Published as a page
* Returned as a Result Card in Search

Fields can be:

- Displayed on an Entity’s listing or Page
- Used as a direct answer in Search
- Used as criteria for Advanced Filters or Saved Searches
  > > > > > > > 63dca8d5539d2e868b14b5069e1529afc878a3b5

Typically, Entities will be things like Locations, People, Events, Products, whereas fields will be the details of those things like name, description, photos. You can relate Entities together using fields – you’ll learn more about this soon.

### Additional Considerations

# <<<<<<< HEAD

> > > > > > > 63dca8d5539d2e868b14b5069e1529afc878a3b5
> > > > > > > Consider how your end users will interact with Yext.

Fields have permissions but you cannot assign sub-field permissions. If a user is only able to update parts of a field, you will either need to break into two separate fields or you will need to make it an entity.

You want users to be able to navigate their data model easily. Simple is usually better.

Anything listed on Google Maps needs to be a Built-in Entity with an Address. Therefore, if there is not a specialized Built-in Type for your Entity that needs to be listed, use “Location” type. Not sure if you can list the entity type on Google Maps? Ask our Listings experts by contacting Yext Support (or ask in the Community)! Our Built-in Entity Types that can be synced to Listings (e.g., Google Maps) are:

<<<<<<< HEAD

- Locations
- Healthcare Professionals
- Healthcare Facilities
- ATMs
- Restaurants
- Hotels

In order to send structured lists to Google Maps (or other Listings Publishers), the data must be in “Enhanced Content Lists” (ECLs). These can be turned on in Account Settings > Account Features which can be found by click the Account Details icon at the bottom of the navigation bar. There are 3 types of ECLs:

- Menus
- Products/Services
- # Bios

* Locations
* Healthcare Professionals
* Healthcare Facilities
* ATMs
* Restaurants
* Hotels

In order to send structured lists to Google Maps (or other Listings Publishers), the data must be in “Enhanced Content Lists” (ECLs). These can be turned on in Account Settings > Account Features which can be found by click the Account Details icon at the bottom of the navigation bar. There are 3 types of ECLs:

- Menus
- Products/Services
- Bios
  > > > > > > > 63dca8d5539d2e868b14b5069e1529afc878a3b5

If you also need to feature this kind of data in Results cards in Search, you will need to create a Custom Entity Type to store the data.

Although ECLs are a relatively minor feature in the scheme of Yext’s data modeling, as they primarily used to create structured lists to display on publisher sites — it’s important to remember that you’ll need to enable ECLs in Account Features in order to sync that data to publishers.

# Linking Entities Together| Yext Hitchhikers Platform

<<<<<<< HEAD

## What You’ll Learn

In this section, you will learn:

- When to link entities together
- How to link entities together
- Important considerations around linking entities

## Relating Entities

### Understanding One Way Relationships

=======

## What You’ll Learn

In this section, you will learn:

- When to link entities together
- How to link entities together
- Important considerations around linking entities

## Relating Entities

### Understanding One Way Relationships

> > > > > > > 63dca8d5539d2e868b14b5069e1529afc878a3b5
> > > > > > > Part of the power of Yext Content is the ability to relate entities together. This can be done via the Entity Relationship custom field type.

One Way Relationships in Yext have 3 properties:

<<<<<<< HEAD

- The source entity
- The destination entity
- The relationship context (the field)

=======

- The source entity
- The destination entity
- The relationship context (the field)

> > > > > > > 63dca8d5539d2e868b14b5069e1529afc878a3b5
> > > > > > > ![visual description of relating entities](visual description of relating entities)

For example, if we wanted to say that Products are available at specific Locations, we could create a field called “Available at” on the Product type. We can use custom field validation to limit what type of entities can be the “destination Entity”. In this case, we would limit it to just Locations. Once the field is created, we would update the “Available at” field on Product entity to point to a location or set of locations.

![example of relating entities](example of relating entities)

### Creating a One Way Relationship

1.  Navigate to **Content > Configuration > Fields**
2.  Click on the ”**+ Add Field**” button
3.  Select **Entity Relationship** for Field Type
4.  Select **One Way** for the Relationship Type
5.  Enter a name for the field. The ID will populate based on the name you choose, but you can edit it if you’d like.
6.  Select the entity type(s) that you want this custom field to be available for in the **Field Availability** field. This is where the relationship will be accessed and stored in the Content. (In this example, you would select Restaurants)
7.  Click on the **Field Settings** and select **Validation** to choose the Entity Type(s) you want to link from. (In this example you would select FAQs)
8.  Click **Save Field**.

### Understanding Two Way Relationships

# <<<<<<< HEAD

> > > > > > > 63dca8d5539d2e868b14b5069e1529afc878a3b5
> > > > > > > An understanding of One Way Relationships is useful to understand Two Way Relationships. More often than not, it is desirable to be able to view and traverse a relationship from (the entity on) either side of the relationship, so that we can search and display information from the linked entity from either direction. In order to support this bi-directional linking, Yext gives users the option to automatically sync relationships between entities, via a Two Way Relationship. Two way relationships are composed of slightly different properties, depending on the type of relationship selected:

#### Two Way (via a Shared Field) Relationships have the following properties:

<<<<<<< HEAD

- The related entities
- The relationship context (the shared field)

=======

- The related entities
- The relationship context (the shared field)

> > > > > > > 63dca8d5539d2e868b14b5069e1529afc878a3b5
> > > > > > > ![visual description of two way entity relationships via a shared field](visual description of two way entity relationships via a shared field)

For example, consider the relationship between two siblings; we can use a Two Way Relationship with a Shared Field to represent this relationship. Regardless of which sibling the user is viewing the relationship from, the related entity should live in the same “Siblings” field, so this is our shared field. We can then populate a related entity Persons 2 in the “Siblings” Field on Person 1, and the “Siblings” Field on Person 2 will be updated to include Person 1! This configuration allows us to access data about related “sibling” entities from either side of the relationship, and the related entities are automatically kept in sync.

![example of two way entity relationships via a shared field](example of two way entity relationships via a shared field)

#### Creating a Two Way (via a Shared Field) Relationship

1.  Navigate to **Content > Configuration > Fields**.
2.  Click on the **+ Add Field** button.
3.  Select **Entity Relationship** for Field Type
4.  Select **Two Way** for the Relationship Type and select **Shared Field** in the drop-down.
5.  Enter a name for the field. The ID will populate based on the name you choose, but you can edit it if you’d like.
6.  Select the entity type(s) that you want this custom field to be available for in the **Field Availability** field. This is where the relationship will be accessed and stored in Content. (In this example, you would select the People entity type)

<<<<<<< HEAD
_Note that this parameter also defines which Entity Types you will be able to select as the related entity in this field, since populating Entity B in the field on Entity A necessarily results in that field being populated with Entity A on Entity B._
=======
_Note that this parameter also defines which Entity Types you will be able to select as the related entity in this field, since populating Entity B in the field on Entity A necessarily results in that field being populated with Entity A on Entity B._

> > > > > > > 63dca8d5539d2e868b14b5069e1529afc878a3b5 7. Click **Save Field**.

#### Two Way (via Distinct Fields) Relationships have the following properties:

<<<<<<< HEAD

- The related entities
- Two relationship context = two distinct fields

=======

- The related entities
- Two relationship context = two distinct fields

> > > > > > > 63dca8d5539d2e868b14b5069e1529afc878a3b5
> > > > > > > ![visual description of two way entity relationships via a distinct field](visual description of two way entity relationships via a distinct field)

In some cases, there may be a semantic difference in the way the relationship should be represented, depending on which entity the relationship is being examined from. For example, we may want a two-way relationship between a Company and People. From the perspective of the company, the related people are its staff. From the perspective of the Person, the related company is where they work. In this sort of hierarchical two-way relationship, we would want to use a Two Way Relationship with Distinct Fields. The first field would be the “Staff” field, and would be available to the Company Entity Type; the second field would be the “Works At” field and would be available to the Person Entity Type. Then, when updating the “Works At” Field of a Person entity to include a Company entity, the “Staff” field of that same Company would be updated to include the Person whom it employs.

![example of two way entity relationships via a distinct field](example of two way entity relationships via a distinct field)

#### Creating a Two Way (via Distinct Fields) Relationship

1.  Navigate to **Content > Configuration > Fields**.
2.  Click on the **+ Add Field** button.
3.  Select **Entity Relationship** for Field Type.
4.  Select **Two Way** for the Relationship Type and select **Distinct Field** in the drop-down.
5.  Configure Field 1 (In this example, c_staff):
    <<<<<<< HEAD
    _ Enter a name for the field. The ID will populate based on the name you choose, but you can edit it if you’d like.
    _ Select the entity type(s) that you want this custom field to be available for in the **Field Availability** field. This is where the relationship will be accessed and stored in Content. (In this example, you would select Company)
6.  Configure Field 2 (In this example, c_worksAt):
    - Enter a name for the field. The ID will populate based on the name you choose, but you can edit it if you’d like.
    - Select the entity type(s) that you want this custom field to be available for in the **Field Availability** field. This is where the relationship will be accessed and stored in Content. (In this example, you would select People)
7.  Click **Save Field**.

### How to View Entity Relationships

======= - Enter a name for the field. The ID will populate based on the name you choose, but you can edit it if you’d like. - Select the entity type(s) that you want this custom field to be available for in the **Field Availability** field. This is where the relationship will be accessed and stored in Content. (In this example, you would select Company) 6. Configure Field 2 (In this example, c_worksAt): - Enter a name for the field. The ID will populate based on the name you choose, but you can edit it if you’d like. - Select the entity type(s) that you want this custom field to be available for in the **Field Availability** field. This is where the relationship will be accessed and stored in Content. (In this example, you would select People) 7. Click **Save Field**.

### How to View Entity Relationships

> > > > > > > 63dca8d5539d2e868b14b5069e1529afc878a3b5
> > > > > > > Once a relationship exists, you can see the information about relationships for a specific entity using the Linked Entities Module in Entity Edit. This module will list all relationships organized by Entity Type and Field, including when the relationship is either outgoing or incoming (i.e., another entity is pointing to it). The arrow indicates the relationship direction – if the arrow is pointing to the right, the relationship is outgoing, meaning is pointing to other entities. If the arrow is pointing to the left, the relationship is incoming, meaning another entity is pointing to it. You can view the count of entities that the entity you are on is related to, or you can click on the field name to view the list of entities related.

You can also navigate to the specific field where the relationship is stored for the Entity in Entity Edit. If the relationship is stored on the entity, that means the relationship is outgoing; clicking into the relevant field should show all the entities linked from the entity you are viewing for that particular relationship.

![Linked Entities Module](Linked Entities Module)

### Common Use Cases

<<<<<<< HEAD
There are many reasons to want to link entities together. For example:

- Pull in data from linked entities for Pages (e.g., feature doctor headshots on a facility page or featured menu items on a restaurant page).
- Relate entities together to answer questions (e.g., “where does Dr. Sara work?” or “what offices have open job positions”)
- Filter related entity names in Search (like condition names for Healthcare Professionals for queries like “doctors who treat back pain”)
- Organize your data for easier management (e.g., bulk editing)

### Updating Linked Entity Fields

You can update the linked entity fields just like any other field! You can use the platform for single or bulk edit and we will display an easy-to-search UI for selecting the related entities. You can also use Entity Upload or use the API to update these fields – all you’ll need is the Entity ID (unique identifier) of the related entities.

### Important Considerations

While this feature is very powerful, there are a few things to keep in mind when working with Linked Entities:

- You can use Validation to determine what types of entities can be linked (e.g., if you only want users to be able to select the Location type entity).
- You can use Validation on the item count to limit the number of relatable entities (1 to unlimited).
- For Search, you can only use the related entity’s name for filters or indexing. You cannot use other related data at this time.

# Linking Entities Together| Yext Hitchhikers Platform

## What You’ll Learn

In this section, you will learn:

- When to link entities together
- How to link entities together
- Important considerations around linking entities

## Relating Entities

### Understanding One Way Relationships

=======

There are many reasons to want to link entities together. For example:

- Pull in data from linked entities for Pages (e.g., feature doctor headshots on a facility page or featured menu items on a restaurant page).
- Relate entities together to answer questions (e.g., “where does Dr. Sara work?” or “what offices have open job positions”)
- Filter related entity names in Search (like condition names for Healthcare Professionals for queries like “doctors who treat back pain”)
- Organize your data for easier management (e.g., bulk editing)

### Updating Linked Entity Fields

You can update the linked entity fields just like any other field! You can use the platform for single or bulk edit and we will display an easy-to-search UI for selecting the related entities. You can also use Entity Upload or use the API to update these fields – all you’ll need is the Entity ID (unique identifier) of the related entities.

### Important Considerations

While this feature is very powerful, there are a few things to keep in mind when working with Linked Entities:

- You can use Validation to determine what types of entities can be linked (e.g., if you only want users to be able to select the Location type entity).
- You can use Validation on the item count to limit the number of relatable entities (1 to unlimited).
- For Search, you can only use the related entity’s name for filters or indexing. You cannot use other related data at this time.

# Linking Entities Together| Yext Hitchhikers Platform

## What You’ll Learn

In this section, you will learn:

- When to link entities together
- How to link entities together
- Important considerations around linking entities

## Relating Entities

### Understanding One Way Relationships

> > > > > > > 63dca8d5539d2e868b14b5069e1529afc878a3b5
> > > > > > > Part of the power of Yext Content is the ability to relate entities together. This can be done via the Entity Relationship custom field type.

One Way Relationships in Yext have 3 properties:

<<<<<<< HEAD

- The source entity
- The destination entity
- The relationship context (the field)

=======

- The source entity
- The destination entity
- The relationship context (the field)

> > > > > > > 63dca8d5539d2e868b14b5069e1529afc878a3b5
> > > > > > > ![visual description of relating entities](visual description of relating entities)

For example, if we wanted to say that Products are available at specific Locations, we could create a field called “Available at” on the Product type. We can use custom field validation to limit what type of entities can be the “destination Entity”. In this case, we would limit it to just Locations. Once the field is created, we would update the “Available at” field on Product entity to point to a location or set of locations.

![example of relating entities](example of relating entities)

### Creating a One Way Relationship

1.  Navigate to **Content > Configuration > Fields**
2.  Click on the ”**+ Add Field**” button
3.  Select **Entity Relationship** for Field Type
4.  Select **One Way** for the Relationship Type
5.  Enter a name for the field. The ID will populate based on the name you choose, but you can edit it if you’d like.
6.  Select the entity type(s) that you want this custom field to be available for in the **Field Availability** field. This is where the relationship will be accessed and stored in the Content. (In this example, you would select Restaurants)
7.  Click on the **Field Settings** and select **Validation** to choose the Entity Type(s) you want to link from. (In this example you would select FAQs)
8.  Click **Save Field**.

### Understanding Two Way Relationships

# <<<<<<< HEAD

> > > > > > > 63dca8d5539d2e868b14b5069e1529afc878a3b5
> > > > > > > An understanding of One Way Relationships is useful to understand Two Way Relationships. More often than not, it is desirable to be able to view and traverse a relationship from (the entity on) either side of the relationship, so that we can search and display information from the linked entity from either direction. In order to support this bi-directional linking, Yext gives users the option to automatically sync relationships between entities, via a Two Way Relationship. Two way relationships are composed of slightly different properties, depending on the type of relationship selected:

#### Two Way (via a Shared Field) Relationships have the following properties:

<<<<<<< HEAD

- The related entities
- The relationship context (the shared field)

=======

- The related entities
- The relationship context (the shared field)

> > > > > > > 63dca8d5539d2e868b14b5069e1529afc878a3b5
> > > > > > > ![visual description of two way entity relationships via a shared field](visual description of two way entity relationships via a shared field)

For example, consider the relationship between two siblings; we can use a Two Way Relationship with a Shared Field to represent this relationship. Regardless of which sibling the user is viewing the relationship from, the related entity should live in the same “Siblings” field, so this is our shared field. We can then populate a related entity Persons 2 in the “Siblings” Field on Person 1, and the “Siblings” Field on Person 2 will be updated to include Person 1! This configuration allows us to access data about related “sibling” entities from either side of the relationship, and the related entities are automatically kept in sync.

![example of two way entity relationships via a shared field](example of two way entity relationships via a shared field)

#### Creating a Two Way (via a Shared Field) Relationship

1.  Navigate to **Content > Configuration > Fields**.
2.  Click on the **+ Add Field** button.
3.  Select **Entity Relationship** for Field Type
4.  Select **Two Way** for the Relationship Type and select **Shared Field** in the drop-down.
5.  Enter a name for the field. The ID will populate based on the name you choose, but you can edit it if you’d like.
6.  Select the entity type(s) that you want this custom field to be available for in the **Field Availability** field. This is where the relationship will be accessed and stored in Content. (In this example, you would select the People entity type)

<<<<<<< HEAD
_Note that this parameter also defines which Entity Types you will be able to select as the related entity in this field, since populating Entity B in the field on Entity A necessarily results in that field being populated with Entity A on Entity B._
=======
_Note that this parameter also defines which Entity Types you will be able to select as the related entity in this field, since populating Entity B in the field on Entity A necessarily results in that field being populated with Entity A on Entity B._

> > > > > > > 63dca8d5539d2e868b14b5069e1529afc878a3b5 7. Click **Save Field**.

#### Two Way (via Distinct Fields) Relationships have the following properties:

<<<<<<< HEAD

- The related entities
- Two relationship context = two distinct fields

=======

- The related entities
- Two relationship context = two distinct fields

> > > > > > > 63dca8d5539d2e868b14b5069e1529afc878a3b5
> > > > > > > ![visual description of two way entity relationships via a distinct field](visual description of two way entity relationships via a distinct field)

In some cases, there may be a semantic difference in the way the relationship should be represented, depending on which entity the relationship is being examined from. For example, we may want a two-way relationship between a Company and People. From the perspective of the company, the related people are its staff. From the perspective of the Person, the related company is where they work. In this sort of hierarchical two-way relationship, we would want to use a Two Way Relationship with Distinct Fields. The first field would be the “Staff” field, and would be available to the Company Entity Type; the second field would be the “Works At” field and would be available to the Person Entity Type. Then, when updating the “Works At” Field of a Person entity to include a Company entity, the “Staff” field of that same Company would be updated to include the Person whom it employs.

![example of two way entity relationships via a distinct field](example of two way entity relationships via a distinct field)

#### Creating a Two Way (via Distinct Fields) Relationship

1.  Navigate to **Content > Configuration > Fields**.
2.  Click on the **+ Add Field** button.
3.  Select **Entity Relationship** for Field Type.
4.  Select **Two Way** for the Relationship Type and select **Distinct Field** in the drop-down.
5.  Configure Field 1 (In this example, c_staff):
    <<<<<<< HEAD
    _ Enter a name for the field. The ID will populate based on the name you choose, but you can edit it if you’d like.
    _ Select the entity type(s) that you want this custom field to be available for in the **Field Availability** field. This is where the relationship will be accessed and stored in Content. (In this example, you would select Company)
6.  Configure Field 2 (In this example, c_worksAt):
    - Enter a name for the field. The ID will populate based on the name you choose, but you can edit it if you’d like.
    - Select the entity type(s) that you want this custom field to be available for in the **Field Availability** field. This is where the relationship will be accessed and stored in Content. (In this example, you would select People)
7.  Click **Save Field**.

### How to View Entity Relationships

======= - Enter a name for the field. The ID will populate based on the name you choose, but you can edit it if you’d like. - Select the entity type(s) that you want this custom field to be available for in the **Field Availability** field. This is where the relationship will be accessed and stored in Content. (In this example, you would select Company) 6. Configure Field 2 (In this example, c_worksAt): - Enter a name for the field. The ID will populate based on the name you choose, but you can edit it if you’d like. - Select the entity type(s) that you want this custom field to be available for in the **Field Availability** field. This is where the relationship will be accessed and stored in Content. (In this example, you would select People) 7. Click **Save Field**.

### How to View Entity Relationships

> > > > > > > 63dca8d5539d2e868b14b5069e1529afc878a3b5
> > > > > > > Once a relationship exists, you can see the information about relationships for a specific entity using the Linked Entities Module in Entity Edit. This module will list all relationships organized by Entity Type and Field, including when the relationship is either outgoing or incoming (i.e., another entity is pointing to it). The arrow indicates the relationship direction – if the arrow is pointing to the right, the relationship is outgoing, meaning is pointing to other entities. If the arrow is pointing to the left, the relationship is incoming, meaning another entity is pointing to it. You can view the count of entities that the entity you are on is related to, or you can click on the field name to view the list of entities related.

You can also navigate to the specific field where the relationship is stored for the Entity in Entity Edit. If the relationship is stored on the entity, that means the relationship is outgoing; clicking into the relevant field should show all the entities linked from the entity you are viewing for that particular relationship.

![Linked Entities Module](Linked Entities Module)

### Common Use Cases

<<<<<<< HEAD
There are many reasons to want to link entities together. For example:

- Pull in data from linked entities for Pages (e.g., feature doctor headshots on a facility page or featured menu items on a restaurant page).
- Relate entities together to answer questions (e.g., “where does Dr. Sara work?” or “what offices have open job positions”)
- Filter related entity names in Search (like condition names for Healthcare Professionals for queries like “doctors who treat back pain”)
- Organize your data for easier management (e.g., bulk editing)

### Updating Linked Entity Fields

You can update the linked entity fields just like any other field! You can use the platform for single or bulk edit and we will display an easy-to-search UI for selecting the related entities. You can also use Entity Upload or use the API to update these fields – all you’ll need is the Entity ID (unique identifier) of the related entities.

### Important Considerations

While this feature is very powerful, there are a few things to keep in mind when working with Linked Entities:

- You can use Validation to determine what types of entities can be linked (e.g., if you only want users to be able to select the Location type entity).
- You can use Validation on the item count to limit the number of relatable entities (1 to unlimited).
- For Search, you can only use the related entity’s name for filters or indexing. You cannot use other related data at this time.

# Data Model Example - Food Services| Yext Hitchhikers Platform

## What You’ll Learn

In this section, you will learn:

- Common entity types used in Food Services data model
- How data is modeled in example scenarios

## Common Entity Types in Food

There are a lot of types that are common in food accounts, this includes:

- **Restaurant** - this can be used for Restaurants, Cafes, Bars or other places where a customer would order and consume a meal
- **Events** - this can be used for any events that a restaurant or brand would host
- **Jobs** - this can be used for available or featured jobs at restaurants or at corporate offices
- **FAQs** - this can be used to store common guest or customer questions and answers to help cut down on support costs and improve guest experience
- **Menu Item (Custom)** - many restaurant groups choose to create a custom type for Menu Items if they want to have landing pages or Result cards in Search for their menu items (remember: if they want to sync menu items to listings, they’ll need to turn on the Menu ECL)
- **Services (Custom)** - many restaurant groups choose to create a custom type for Services they provide like Catering or Delivery if they want to have a landing page or Result cards in Search for these services
- # **Local Services (Custom)** - many restaurant groups choose to create a custom type for Local Services that describe one of their services specific to a location or services area if they want to have a landing page for these services

There are many reasons to want to link entities together. For example:

- Pull in data from linked entities for Pages (e.g., feature doctor headshots on a facility page or featured menu items on a restaurant page).
- Relate entities together to answer questions (e.g., “where does Dr. Sara work?” or “what offices have open job positions”)
- Filter related entity names in Search (like condition names for Healthcare Professionals for queries like “doctors who treat back pain”)
- Organize your data for easier management (e.g., bulk editing)

### Updating Linked Entity Fields

You can update the linked entity fields just like any other field! You can use the platform for single or bulk edit and we will display an easy-to-search UI for selecting the related entities. You can also use Entity Upload or use the API to update these fields – all you’ll need is the Entity ID (unique identifier) of the related entities.

### Important Considerations

While this feature is very powerful, there are a few things to keep in mind when working with Linked Entities:

- You can use Validation to determine what types of entities can be linked (e.g., if you only want users to be able to select the Location type entity).
- You can use Validation on the item count to limit the number of relatable entities (1 to unlimited).
- For Search, you can only use the related entity’s name for filters or indexing. You cannot use other related data at this time.

# Data Model Example - Food Services| Yext Hitchhikers Platform

## What You’ll Learn

In this section, you will learn:

- Common entity types used in Food Services data model
- How data is modeled in example scenarios

## Common Entity Types in Food

There are a lot of types that are common in food accounts, this includes:

- **Restaurant** - this can be used for Restaurants, Cafes, Bars or other places where a customer would order and consume a meal
- **Events** - this can be used for any events that a restaurant or brand would host
- **Jobs** - this can be used for available or featured jobs at restaurants or at corporate offices
- **FAQs** - this can be used to store common guest or customer questions and answers to help cut down on support costs and improve guest experience
- **Menu Item (Custom)** - many restaurant groups choose to create a custom type for Menu Items if they want to have landing pages or Result cards in Search for their menu items (remember: if they want to sync menu items to listings, they’ll need to turn on the Menu ECL)
- **Services (Custom)** - many restaurant groups choose to create a custom type for Services they provide like Catering or Delivery if they want to have a landing page or Result cards in Search for these services
- **Local Services (Custom)** - many restaurant groups choose to create a custom type for Local Services that describe one of their services specific to a location or services area if they want to have a landing page for these services
  > > > > > > > 63dca8d5539d2e868b14b5069e1529afc878a3b5

Remember: if a customer wants to sync their Menus to publishers in our Menus Publisher Pack, they’ll need to turn on Menu ECLs, which are separate from Entity Types for now.

## Example Scenario

<<<<<<< HEAD
A restaurant group wants to:

- List their Restaurants with Menu Syncing
- Build pages for Restaurants and services at each restaurant (e.g., catering at 123 Main St, delivery at 13 Main St)
- # Feature Restaurants, Menu items, Services (generic), Limited Time Offers, Jobs and FAQs in Search

A restaurant group wants to:

- List their Restaurants with Menu Syncing
- Build pages for Restaurants and services at each restaurant (e.g., catering at 123 Main St, delivery at 13 Main St)
- Feature Restaurants, Menu items, Services (generic), Limited Time Offers, Jobs and FAQs in Search
  > > > > > > > 63dca8d5539d2e868b14b5069e1529afc878a3b5

We would model their account with:

**Built-in:**

<<<<<<< HEAD

- Restaurant
- Menu ECLs
- FAQ
- Job

**Custom**

- Location Service
- Service
- Menu Item
- # Limited Time Offer

* Restaurant
* Menu ECLs
* FAQ
* Job

**Custom**

- Location Service
- Service
- Menu Item
- Limited Time Offer
  > > > > > > > 63dca8d5539d2e868b14b5069e1529afc878a3b5
