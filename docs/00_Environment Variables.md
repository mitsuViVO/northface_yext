Yext allows you to define environment variables that are accessible during your build. You can define two types of variables:

### Public Variables (i.e. variables for the browser)

Any variables prefixed with `YEXT_PUBLIC_` will be made accessible to the browser, i.e. made available in the JS bundle that is delivered to the client. These variables can be used in your templates and components.

### Private Variables

Any variables not prefixed with `YEXT_PUBLIC_` will be treated as “private” variables: only available during the build phase within your Node.js environment. This means they can be used in template `transformProps` functions, HTTP serverless functions, and in `config.yaml`.

### Using Public Variables

Public environments variables are included in the JS bundle and are intended to be used client-side. In the following example, a Yext Content API is called using an API Key stored as a public variable:

```typescript
// src/utils.ts

export const fetchReviews = async (
  entityId: string
): Promise<YextResponse<Reviews>> => {
  const response = await fetch(
    `https://cdn.yextapis.com/v2/accounts/me/content/reviews?
     api_key=${YEXT_PUBLIC_YEXT_API_KEY}
     &v=20230817&id=${entityId}`
  );
  const data = await response.json();
  return data;
};
```

### Using Private Variables

Private variables can be used to store secrets that aren’t intended to be shared client side. The following HTTP function calls a Yext Management API to update an entity:

```typescript
// src/functions/http/entity/[entityId].ts

async function updateEntity(
  entityId?: string,
  entityBody?: Record<string, any>
): Promise<PagesHttpResponse> {
  const mgmtApiResp = await fetch(
    `https://api.yextapis.com/v2/accounts/me/entities/${entityId}
     ?api_key=${YEXT_API_KEY}&v=20230901`, // no PUBLIC prefix on this env var
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(entityBody),
    }
  );

  // handle mgmtApiResp
}
```

### Local Development

During local development, environment variables should be declared in your `.env` file. The local dev toolchain will automatically grab any variables in this file and use them in the local serving flow.

Refer to the code snippet below:

```
// .env

YEXT_PUBLIC_ENTITY_ID=test-location
YEXT_PUBLIC_SEARCH_API_KEY=foo
PRIVATE_KEY=secret
```

> **Note**
> If you change your environment variables, you will need to restart your local dev server.
> As a best practice, we recommend not checking in your `.env` file to source control in case secret keys are inadvertently stored there. If you deploy a site with a `.env` file and environment variables configured in platform, the environment variables in the platform will override values specified in the `.env` files.

### Production

To define and use environment variables in production, you must declare them in Site Settings. You have two options:

- **Site-level**: You can declare site-wide environment variables in the **Site Settings > Environment Variables** section. Each variable declared here will be accessible across all branches.
- **Branch-level**: You can declare branch-specific environment variables in the **Site Settings > Branch Configuration > Branch Settings** section. Variables here are declared on a per-branch basis.

When updating environment variables in the platform, you must trigger a new deploy in order to see those updated values reflected in your website.

### Variable Processing Order

In production, Yext will respect the following order when accessing environment variables:

1.  Branch-level environment variables
2.  Site-level environment variables
3.  `.env` file

### Example 1

Assume the following variables are defined:

- **Site-level**
  ```
  VAR1 = var1
  VAR2 = var2
  ```
- **Branch-level**
  ```
  VAR2 = var2-branch
  ```
- `.env` file (nothing)

Your production deployment would use the following environment variable values:

```
VAR1 = var1
VAR2 = var2-branch
```

### Example 2

Assume the following variables are defined:

- **Site-level** (nothing)
- **Branch-level** (nothing)
- `.env` file
  ```
  VAR1 = var1-local
  VAR2 = var2-local
  ```

Your production deployment would use the following environment variable values:

```
VAR1 = var1-local
VAR2 = var2-local
```

### Example 3

Assume the following variables are defined:

- **Site-level**
  ```
  VAR1 = var1
  VAR2 = var2
  ```
- **Branch-level**
  ```
  VAR2 = var2-branch
  VAR3 = var3-branch
  ```
- `.env` file
  ```
  VAR1 = var1-local
  VAR4 = var4-local
  ```

Your production deployment would use the following environment variable values:

```
VAR1 = var1
VAR2 = var2-branch
VAR3 = var3-branch
VAR4 = var4-local
```
