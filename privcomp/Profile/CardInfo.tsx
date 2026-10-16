/* eslint-disable react/jsx-no-undef */
import React, { useState } from 'react'
import FlipContainer from './FlipContainer';
import CardFront from './CardFront';
import CardBack from './CardBack';


interface Profile {
  id: string;
  name: string;
  email: string;
  photo: string | null;
  createdAt: string;
}

interface UpdateProfilePayload {
    id: string;
    name: string;
    email: string;
    photo: File | null;
    createdAt: string;
}

interface CardInfoProps {
  isDark: boolean;
  profile: Profile;
  joinedDate: string;
  onSave: (data: UpdateProfilePayload) => Promise<void>;
}

export default function CardInfo({ isDark, profile, joinedDate, onSave }: CardInfoProps) {
   const [isEditing, setIsEditing] = useState(false);

return (
    <FlipContainer
        isFlipped={isEditing}
        className="h-195"
        front={
            <CardFront
                profile={profile}
                joinedDate={joinedDate}
                isDark={isDark}
                onEdit={() => setIsEditing(true)}
                />
            }
            back={
            <CardBack
                onSave={onSave}
                profile={profile}
                isDark={isDark}
                onCancel={() => setIsEditing(false)}
            />
        }
    />
    );
}