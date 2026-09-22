/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { initialWeddingData } from './data/defaultWeddingData';
import { WeddingData, RsvpEntry } from './types';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { CountdownSection } from './components/CountdownSection';
import { CoupleSection } from './components/CoupleSection';
import { EventsSection } from './components/EventsSection';
import { RsvpSection } from './components/RsvpSection';
import { Footer } from './components/Footer';
import { MusicPlayer } from './components/MusicPlayer';
import { FallingPetals } from './components/FallingPetals';
import { GuidanceModal } from './components/GuidanceModal';
import { EditorModal } from './components/EditorModal';
import { LinkGeneratorModal } from './components/LinkGeneratorModal';
import { InvitationDoorIntro } from './components/InvitationDoorIntro';

const WEDDING_STORAGE_KEY = 'wedding_invitation_data_v13';
const WISHES_STORAGE_KEY = 'wedding_guest_wishes_v1';
const RSVP_STORAGE_KEY = 'wedding_rsvp_entries_v1';

export default function App() {
  // Read ?to= from URL parameter for personalized guest invitation
  const [guestName, setGuestName] = useState<string | null>(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const toParam = params.get('to');
      return toParam ? toParam.trim() : null;
    } catch {
      return null;
    }
  });
  // 1. Wedding Data State (persisted to localStorage)
  const [weddingData, setWeddingData] = useState<WeddingData>(() => {
    try {
      const saved = localStorage.getItem(WEDDING_STORAGE_KEY) || localStorage.getItem('wedding_invitation_data_v12') || localStorage.getItem('wedding_invitation_data_v11');
      if (saved) {
        const parsed = JSON.parse(saved);
        // Ensure only 2 ceremonies: Lễ Vu Quy & Lễ Thành Hôn
        if (parsed.events && parsed.events.length > 2) {
          parsed.events = initialWeddingData.events;
        }
        // Ensure Lễ Vu Quy venue, address, and map link are updated if matching older defaults
        if (parsed.events && Array.isArray(parsed.events)) {
          const vuQuy = parsed.events.find((e: any) => e.id === 'event-1' || e.title === 'Lễ Vu Quy');
          if (vuQuy && (vuQuy.venueName === 'Tư gia Nhà Gái' || vuQuy.address === 'Trung Tâm văn hóa Bạch Đằng' || vuQuy.address?.includes('Tư gia Nhà Gái') || vuQuy.mapUrl === 'https://maps.google.com/?q=Tu+Gia+Nha+Gai')) {
            vuQuy.venueName = initialWeddingData.events[0].venueName;
            vuQuy.address = initialWeddingData.events[0].address;
            vuQuy.mapUrl = initialWeddingData.events[0].mapUrl;
          }
          const thanhHon = parsed.events.find((e: any) => e.id === 'event-2' || e.title === 'Lễ Thành Hôn');
          if (thanhHon && (thanhHon.address === 'Tư gia Nhà Trai' || thanhHon.address?.includes('Sẽ cập nhật') || thanhHon.mapUrl === 'https://maps.google.com/?q=Tu+Gia+Nha+Trai')) {
            thanhHon.address = initialWeddingData.events[1].address;
            thanhHon.mapUrl = initialWeddingData.events[1].mapUrl;
          }
        }
        // Ensure bride parents are updated to current official names if they match older defaults
        if (parsed.bride) {
          if (!parsed.bride.fatherName || parsed.bride.fatherName === 'Nguyễn Văn Dũng') {
            parsed.bride.fatherName = initialWeddingData.bride.fatherName;
          }
          if (!parsed.bride.motherName || parsed.bride.motherName === 'Nguyễn Thị Điệp') {
            parsed.bride.motherName = initialWeddingData.bride.motherName;
          }
          if (!parsed.bride.origin || parsed.bride.origin === 'Tân Nương') {
            parsed.bride.origin = initialWeddingData.bride.origin;
          }
        }
        if (parsed.groom) {
          if (!parsed.groom.origin || parsed.groom.origin === 'Tân Lang') {
            parsed.groom.origin = initialWeddingData.groom.origin;
          }
          parsed.groom.bio = '';
        }
        if (parsed.bride) {
          if (!parsed.bride.origin || parsed.bride.origin === 'Tân Nương') {
            parsed.bride.origin = initialWeddingData.bride.origin;
          }
          parsed.bride.bio = '';
        }
        return parsed;
      }
    } catch {
      // ignore
    }
    return initialWeddingData;
  });

  // RSVP Entries State
  const [rsvpList, setRsvpList] = useState<RsvpEntry[]>(() => {
    try {
      const saved = localStorage.getItem(RSVP_STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return [];
  });

  // Modals state
  const [isGuidanceOpen, setIsGuidanceOpen] = useState(false);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [isLinkGenOpen, setIsLinkGenOpen] = useState(false);

  // Door opening animation state
  const [showDoorIntro, setShowDoorIntro] = useState(true);
  const [doorIntroKey, setDoorIntroKey] = useState(1);
  const [musicAutoPlayTrigger, setMusicAutoPlayTrigger] = useState(false);

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(WEDDING_STORAGE_KEY, JSON.stringify(weddingData));
    } catch {
      // ignore
    }
  }, [weddingData]);

  useEffect(() => {
    try {
      localStorage.setItem(RSVP_STORAGE_KEY, JSON.stringify(rsvpList));
    } catch {
      // ignore
    }
  }, [rsvpList]);

  // Handle adding new RSVP response
  const handleAddRsvp = (newRsvp: Omit<RsvpEntry, 'id' | 'createdAt'>) => {
    const rsvpEntry: RsvpEntry = {
      ...newRsvp,
      id: `rsvp-${Date.now()}`,
      createdAt: new Date().toLocaleString('vi-VN'),
    };
    setRsvpList((prev) => [rsvpEntry, ...prev]);
  };

  // Handle save from Editor
  const handleSaveData = (newData: WeddingData) => {
    setWeddingData(newData);
  };

  // Handle reset to default
  const handleResetData = () => {
    setWeddingData(initialWeddingData);
    localStorage.removeItem(WEDDING_STORAGE_KEY);
  };

  // Handle opening the door (with pink ribbon bow click)
  const handleOpenDoor = () => {
    setMusicAutoPlayTrigger(true);
  };

  // Handle replaying the door opening effect
  const handleReplayDoor = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setShowDoorIntro(false);
    setTimeout(() => {
      setDoorIntroKey((prev) => prev + 1);
      setShowDoorIntro(true);
    }, 60);
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#2C2825] relative selection:bg-[#E5D2C5] selection:text-[#38281F]">
      {/* Interactive Double-Door Invitation with Pink Ribbon Bow */}
      {showDoorIntro && (
        <InvitationDoorIntro
          key={doorIntroKey}
          weddingData={weddingData}
          guestName={guestName}
          onOpen={handleOpenDoor}
        />
      )}

      {/* Gentle falling petals effect */}
      <FallingPetals />

      {/* Background audio player */}
      <MusicPlayer
        title={weddingData.musicTitle}
        musicUrl={weddingData.musicUrl}
        startTime={weddingData.musicStartTime ?? 153}
        autoPlayTrigger={musicAutoPlayTrigger}
      />

      {/* Main Top Navigation */}
      <Navbar
        weddingData={weddingData}
        onReplayDoor={handleReplayDoor}
      />

      <main>
        {/* Hero Section / Cover */}
        <HeroSection weddingData={weddingData} guestName={guestName} />

        {/* Real-time Countdown */}
        <CountdownSection weddingData={weddingData} />

        {/* Groom & Bride Section */}
        <CoupleSection weddingData={weddingData} />

        {/* Events / Timeline & Map (Lễ Vu Quy & Lễ Thành Hôn) */}
        <EventsSection weddingData={weddingData} />

        {/* Attendance RSVP Form */}
        <RsvpSection
          weddingData={weddingData}
          rsvpList={rsvpList}
          onAddRsvp={handleAddRsvp}
        />
      </main>

      {/* Footer */}
      <Footer
        weddingData={weddingData}
        onOpenLinkGenerator={() => setIsLinkGenOpen(true)}
        onOpenEditor={() => setIsEditorOpen(true)}
        onReplayDoor={handleReplayDoor}
      />

      {/* Personalized Link Generator Tool for the couple */}
      <LinkGeneratorModal
        isOpen={isLinkGenOpen}
        onClose={() => setIsLinkGenOpen(false)}
      />

      {/* Senior Dev Guidance Modal for Beginners */}
      <GuidanceModal
        isOpen={isGuidanceOpen}
        onClose={() => setIsGuidanceOpen(false)}
        onOpenEditor={() => setIsEditorOpen(true)}
      />

      {/* No-Code Data Customizer Modal */}
      <EditorModal
        isOpen={isEditorOpen}
        onClose={() => setIsEditorOpen(false)}
        data={weddingData}
        onSave={handleSaveData}
        onReset={handleResetData}
      />
    </div>
  );
}
