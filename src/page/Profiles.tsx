import { useEffect, useState } from "react";
import { Profile } from "../types";
import { getProfiles } from "../modules/getProfiles";
import { GoPlus } from "react-icons/go";
import Input from "../components/Input";
import Button from "../components/Button";
import { addProfile } from "../modules/addProfiles";
import { useNavigate } from "react-router-dom";
import Avatar from "../components/Avatar";

export default function Profiles() {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [isAddingProfile, setIsAddingProfile] = useState(false);
  const [newProfileName, setNewProfileName] = useState("");

  const navigate = useNavigate();

  const handleAddProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    const user_id = localStorage.getItem("user_id");

    if (!user_id) return;

    const profile = await addProfile({ name: newProfileName, user_id });

    setIsAddingProfile(false);
    setProfiles([...profiles, profile]);
  };

  useEffect(() => {
    const user_id = localStorage.getItem("user_id");

    if (!user_id) return navigate("/");

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
        <form className="flex flex-col gap-5" onSubmit={handleAddProfile}>
          <Input
            onChange={(e) => setNewProfileName(e.target.value)}
            value={newProfileName}
            type="text"
            placeholder="Nome do Perfil"
          />
          <Button>Adicionar</Button>
        </form>
      ) : (
        <ul className="flex items-center gap-6">
          {profiles.map((profile) => (
            <Avatar
              name={profile.name}
              onClick={() => {
                localStorage.setItem("profile_id", profile.id);
                navigate("/home");
              }}
            />
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
