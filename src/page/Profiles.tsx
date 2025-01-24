import { useEffect, useState } from "react";
import { Profile } from "../types";
import { getProfiles } from "../modules/getProfiles";
import { GoPlus } from "react-icons/go";

export default function Profiles() {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [isAddingProfile, setIsAddingProfile] = useState(false);
  const [newProfileName, setNewProfileName] = useState("");

  const handleAddProfile = () => {
    const user_id = localStorage.getItem("user_id");

    if (!user_id) return;
  };

  useEffect(() => {
    const user_id = localStorage.getItem("user_id");

    if (!user_id) return;

    const fetchProfiles = async () => {
      const profilesResponse = await getProfiles(user_id);

      if (!profilesResponse) return;

      setProfiles(profilesResponse);
    };

    fetchProfiles();
  }, []);

  return (
    <div className="flex justify-center items-center h-full w-full bg-neutral-900">
      {isAddingProfile ? (
        <form className="flex" onSubmit={handleAddProfile}>
          <input
            onChange={(e) => setNewProfileName(e.target.value)}
            value={newProfileName}
            type="text"
            placeholder="Nome do Perfil"
          />
          <button>Adicionar</button>
        </form>
      ) : (
        <ul>
          {profiles.map((profile) => (
            <li className="text-white font-semibold text-8xl" key={profile.id}>
              {profile.name}
            </li>
          ))}

          <button
            onClick={() => {
              setIsAddingProfile(true);
            }}
            className="flex items-center gap-5 text-white font-semibold p-2"
          >
            <span className="w-20 h-20 rounded-full bg-gray-700 flex items-center justify-center text-7xl p-0 m-0">
              <GoPlus color="white" size={40} />
            </span>

            <span className="text-xl">Adicionar Perfil</span>
          </button>
        </ul>
      )}
    </div>
  );
}
