import React from "react";

const NewsPosts = () => {
  return (
    <div className="space-y-10">
      <section id="create">
        <h2 className="text-xl font-bold mb-2">Opret opslag</h2>
        <p>Sådan opretter du en nyhed eller et opslag via dashboardet.</p>
      </section>

      <section id="upload">
        <h2 className="text-xl font-bold mb-2">Upload billeder/video</h2>
        <p>Lær hvordan du uploader billeder eller videoer til opslag.</p>
      </section>
    </div>
  );
};

export default NewsPosts;
