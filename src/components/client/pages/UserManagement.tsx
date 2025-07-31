import React from "react";

const UserManagement = () => {
  return (
    <div className="space-y-10">
      <section id="manage">
        <h2 className="text-xl font-bold mb-2">Brugeradministration</h2>
        <p>Tilføj, rediger eller fjern brugere i dit system.</p>
      </section>

      <section id="roles">
        <h2 className="text-xl font-bold mb-2">Roller og tilladelser</h2>
        <p>
          Definér hvilke rettigheder og funktioner forskellige brugertyper har.
        </p>
      </section>
    </div>
  );
};

export default UserManagement;
