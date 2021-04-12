import React from "react";

export default function Loader() {
  return (
    <section className="loader">
      <img src={require("../../src/assets/img/loader.gif").default} alt="" />
    </section>
  );
}
