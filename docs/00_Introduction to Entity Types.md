What is an Entity| Yext Hitchhikers Platform
What You’ll Learn
In this section, you will learn:

The difference between Entity Types and Fields
Examples of Entity Types
What information is stored on an entity
How to find an Entity in the Yext Platform
What is an Entity?
An entity is the primary object stored in Yext Content – like a row in a database. Entities have a type and are comprised of fields based on that type.

Examples of Entity Types:

Location - fields like Name, Address, Phone, and more
Event - fields like Name, Start/End Date/Time, Location, Ticket URL, and more
Healthcare Professional - fields like Name, NPI, Education, Office Addresses, and more
Job - fields like Name, Job Location, Department, and more
FAQ - fields like Question, Answer, Keyword, and more
Product - fields like Photo, Description, Stock Status
Custom Entity Type - you define the name and fields (you’ll learn about these later)
What do Entities Look Like?
Entities are comprised of two parts:

Metadata, like the Entity Type, a unique identifier called Entity ID, profile language and country. These are properties of the entity itself, and not brand content stored in fields.

Fields, like Name, Hours, Phone Number, Photo Gallery, all of which can store values or brand content. These fields describe the entity from the brand’s perspective.

For example, the Yext headquarters in New York could be stored as a Location entity of type Location, country US, and entity ID of “NewYork”. It is made up of fields like Name, Address, Phone, Description, Website, and more.

You can find individual Entities by navigating to Content and clicking on an entity. This view is called Entity Edit.

<<<<<<< HEAD

=======

> > > > > > > 63dca8d5539d2e868b14b5069e1529afc878a3b5
> > > > > > > Under the hood, the entity is just a list of field-value pairs that describe that entity. Here’s what the Yext New York HQ looks like programmatically via our Entities API endpoint:

Copy
"name": "Yext",
"address": {
<<<<<<< HEAD
"city": "New York",
"countryCode": "US",
"line1": "61 Ninth Ave",
"line2": "",
"postalCode": "10011",
"region": "New York",
},
"mainPhone": "+12129943900",
"featuredMessage": {
"description": "Scan Your Business Here",
"url": "http://www.yext.com"
},
"websiteUrl": {
"displayUrl": "http://www.yext.com",
"preferDisplayUrl": true,
"url": "http://www.yext.com"
=======
"city": "New York",
"countryCode": "US",
"line1": "61 Ninth Ave",
"line2": "",
"postalCode": "10011",
"region": "New York",
},
"mainPhone": "+12129943900",
"featuredMessage": {
"description": "Scan Your Business Here",
"url": "http://www.yext.com"
},
"websiteUrl": {
"displayUrl": "http://www.yext.com",
"preferDisplayUrl": true,
"url": "http://www.yext.com"

> > > > > > > 63dca8d5539d2e868b14b5069e1529afc878a3b5
> > > > > > > },
> > > > > > > "yearEstablished": 2006,
> > > > > > > .
> > > > > > > .
> > > > > > > .
> > > > > > > The important thing to remember is that these are both describing the same entity, just in different ways.

Built-in vs. Custom Entity Types| Yext Hitchhikers Platform
What You’ll Learn
In this section, you will learn:

The difference between Built-in and Custom Entity Types
Best practices for when to use each type
Differences between a Built-in Type and a Custom Type
Entity types can either be built-in by Yext or custom-defined by you for your specific account(s).

Yext provides a number of “Built-In” Entity Types for common data objects, like Locations, Healthcare Professionals, Products, or Jobs. These entity types are pre-defined by Yext and Yext controls properties like the display name and the API name. You can add additional custom fields to these types, but you cannot remove fields defined on the Entity. Over time, Yext will expose more Built-In Entity Types as we observe common patterns or behavior or as we build out more Entity Types in our Knowledge Network.

Can’t find an entity type that describes what you’re trying to do? Not a problem!

Customers can also define their own objects called “Custom” Entity Types. Custom entity types can be used for any kind of data – each brand can control the name and the properties of these types as needed.

If you can, we recommend that you use Built-In types so that you can take advantage of any pre-built configurations and product-wide compatibility. Unlike Built-In types, Custom Entity Types are not compatible with Listings and may not be compatible with all Third Party systems / integrations.
<<<<<<< HEAD

=======

> > > > > > > 63dca8d5539d2e868b14b5069e1529afc878a3b5
