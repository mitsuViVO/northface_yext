import { SandboxEndpoints } from "@yext/search-headless-react"; // Add if using a sandbox account

...

return provideHeadless({
 apiKey,
 experienceKey: "testsearch",
 locale,
 verticalKey: "Vertical",
 experienceVersion,
 endpoints: SandboxEndpoints // Add if using a sandbox account
});
