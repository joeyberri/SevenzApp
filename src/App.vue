<template>
  <div class="viewport">
    <div class="grid-container">
      <div class="menu-icon">
        <strong> &#9776;</strong>
      </div>
      <PageAside></PageAside>

      <div class="right-container">
        <PageHeader></PageHeader>
        <PageMain></PageMain>
      </div>
    </div>
  </div>
</template>

<script>
import PageAside from "./components/PageAside.vue";
import PageHeader from "./components/PageHeader.vue";
import PageMain from "./components/PageMain.vue";

export default {
  name: "App",
  components: { PageAside, PageHeader, PageMain },

  data() {
    return {
      investigations: [],
    };
  },
  setup() {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var graphql = JSON.stringify({
      query:
        'mutation {\n  login(email:"tester@kompletecare.com", password:"password")\n}',
      variables: {},
    });
    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: graphql,
      redirect: "follow",
    };

    fetch("https://testdrive.kompletecare.com/graphql", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        var accessToken = result.data.login;
        return accessToken;
      })
      .then((accessToken) => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", "Bearer " + accessToken);

        var graphql = JSON.stringify({
          query:
            "{\n  investigations {\n    id\n    title\n    type {\n      id\n      title\n    }\n  }\n}",
          variables: {},
        });
        var requestOptions = {
          method: "POST",
          headers: myHeaders,
          body: graphql,
          redirect: "follow",
        };

        fetch("https://testdrive.kompletecare.com/graphql", requestOptions)
          .then((response) => response.text())
          .then((result) => {
            var datalist = result;

            return datalist;
          })
          .catch((error) => console.log("error", error));

        return this.datalist;
      })
      .catch((error) => console.log("error", error));
  },
};
</script>

<style>
@font-face {
  font-family: "Avenir";
  src: url("@/assets/fonts/AvenirLTStd-Roman.otf") format("opentype");
}

@font-face {
  font-family: "Product Sans";
  src: url("@/assets/fonts/ProductSansRegular.ttf") format("truetype");
}

* {
  transition: 0.5s all;
}

.viewport {
  margin: 0;
  padding: 0;
  background-color: #f5f5fb;
  box-sizing: border-box;
  font-family: monospace;
  font-size: 15px;
}
.grid-container {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 50px 1fr 50px;

  grid-template-areas:
    "header"
    "main"
    "footer";
  height: 100vh;
}

h1,
h2,
h3,
h4,
h5,
h6 {
  font-family: Avenir, Arial, Helvetica, sans-serif;
}

h1 {
  font-style: normal;
  font-weight: 900;
  font-size: 32px;
  line-height: 44px;
  color: #382f90;
}

h2 {
  margin: 0;
  padding: 0;
  font-family: "Avenir";
  font-style: normal;
  font-weight: 900;
  font-size: 18px;
  line-height: 25px;
  /* identical to box height */
  color: rgba(56, 47, 144, 0.6);
}
h3 {
  font-style: normal;
  font-weight: 900;
  font-size: 18px;
  line-height: 25px;
  color: #382f90;
}

h4 {
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 20px;
  letter-spacing: 0.3px;
  color: #9fa2b4;
  margin-top: 0 !important;
}

strong {
  font-size: 20px;
}

p,
label {
  font-family: Lato, Arial, Helvetica, sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 14px;
  line-height: 17px;
  cursor: pointer;
}

hr {
  opacity: 0.7;
  border: 1px solid #dfe0eb;
}

.right-container {
  padding: 50px;
  margin-left: 5em;
}

.header {
  grid-area: header;
}

.main {
  margin-top: 74px;
  color: black;
  grid-area: main;
}

.card {
  padding-top: 3%;
  padding-left: 7%;
  background: #ffffff;
  border-radius: 5px;
}

.card div {
  padding-bottom: 1.5em;
}

/* flexing header and footer*/
.pulled-right {
  display: inline-flex;
  flex-direction: row;
  align-items: center;
  padding: auto;
  margin: auto;
  gap: 3.5em;
  vertical-align: middle;
}

.pulled-right > * {
  cursor: pointer;
}

.list-boxes {
  display: flex;
  flex-wrap: wrap;
}

.list-boxes div {
  width: 25%;
}
.header {
  position: absolute;
  right: 5em;
}
.footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: darkblue;
  padding: 0 15px;
}

/* flexing aside */
.aside {
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 309px;
  position: fixed;
  overflow-y: auto;
  z-index: 2;
  transform: translateX(-309px);
  grid-area: aside;
  background-color: #fff;
  color: #a0a0a0;
  font-family: "Product Sans";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;
}

.aside.active {
  transform: translateX(0);
}

.aside_list {
  padding: 0;
  margin-top: 150px;
  list-style-type: none;
}

.aside_list-item {
  padding: 20px 20px 20px 40px;
}

.aside_list-item svg {
  padding-right: 20px;
  height: 16px;
}

.active {
  background-color: #2a36a4;
  color: white;
  font-weight: 700;
}

.aside_list-item:hover {
  cursor: pointer;
}

/* responsive layout */
@media only screen and (min-width: 750px) {
  .grid-container {
    display: grid;
    grid-template-columns: 240px 1fr;
    grid-template-rows: 50px 1fr 50px;
    grid-template-areas:
      "aside header"
      "aside main"
      "aside footer";
    height: 100vh;
  }

  .aside {
    display: flex;
    flex-direction: column;
    position: relative;
    transform: translateX(0);
  }

  .main_cards {
    margin: 10px;
    display: grid;
    grid-template-columns: 2fr 1fr;
    grid-template-rows: 200px 300px;
    grid-template-areas:
      "card1 card2"
      "card1 card3";
    grid-gap: 10px;
  }
}

.menu-icon {
  position: fixed;
  display: flex;
  top: 2px;
  left: 8px;
  align-items: center;
  justify-content: center;
  z-index: 1;
  cursor: pointer;
  padding: 12px;
  color: black;
}

.aside_close-icon {
  position: absolute;
  visibility: visible;
  top: 20px;
  right: 20px;
  cursor: pointer;
}
@media only screen and (min-width: 750px) {
  .aside_close-icon {
    display: none;
  }
}
</style>
