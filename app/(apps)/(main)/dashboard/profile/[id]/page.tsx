"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

interface Profile {
  id: string;
  name: string;
  email: string;
  photo: string | null;
}

export default function Profile() {
  const { id } = useParams<{ id: string }>();

  const [profile, setProfile] = useState<Profile | null>(null);

  useEffect(() => {
    async function fetchProfile() {
      const resp = await fetch(`/api/profile/${id}`);

      if (!resp.ok) {
        throw new Error("Failed to fetch profile");
      }

      const data = await resp.json();

      setProfile(data);
    }

    fetchProfile();
  }, [id]);

  if (!profile) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>{profile.name}</h2>
      <p>{profile.email}</p>
      {profile.photo && <img src={profile.photo} alt={profile.name} />}
    </div>
  );
}
