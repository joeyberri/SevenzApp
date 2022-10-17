// apollo.config.js
module.exports = {
  client: {
    service: {
      name: "sevenz_app",
      // URL to the GraphQL API
      url: "https://testdrive.kompletecare.com/graphql",
    },
    // Files processed by the extension
    includes: ["src/**/*.vue", "src/**/*.js"],
  },
};
