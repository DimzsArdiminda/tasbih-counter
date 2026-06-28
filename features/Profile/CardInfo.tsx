/* eslint-disable react/jsx-no-undef */
import React, { useState } from 'react'
import { Calendar, Mail, User } from "lucide-react";
import Image from "next/image";
import Field from '../ui/field';
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

interface CardInfoProps {
    isDark: boolean;
    profile: Profile;
    joinedDate: string;
}

export default function CardInfo({ isDark, profile, joinedDate }: CardInfoProps) {
   const [isEditing, setIsEditing] = useState(false);

return (
    <FlipContainer
        isFlipped={isEditing}
        className="h-[750px]"
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
                profile={profile}
                isDark={isDark}
                onCancel={() => setIsEditing(false)}
            />
        }
    />
    );
}