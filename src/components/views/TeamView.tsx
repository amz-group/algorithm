import React, { useState } from 'react';
import {
  Github,
  Linkedin,
  Globe,
  Edit3,
  Plus,
  RotateCcw,
  Save,
  X
} from 'lucide-react';

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  initials: string;
  avatarColor: string;
  githubUrl?: string;
  linkedinUrl?: string;
  websiteUrl?: string;
}

const DEFAULT_TEAM_MEMBERS: TeamMember[] = [
  {
    id: '1',
    name: 'K. R. Daniyal',
    role: 'Lead Algorithm Engineer',
    bio: 'Specializes in computational complexity theory and asymptotic optimization. Designed the real-time execution engine and interactive tracing algorithms for KRD ALGORITHM.',
    initials: 'KD',
    avatarColor: 'from-[#F5C542] to-[#D4A72C] text-[#111111]',
    githubUrl: 'https://github.com',
    linkedinUrl: 'https://linkedin.com',
    websiteUrl: 'https://example.com'
  },
  {
    id: '2',
    name: 'Dr. Rehan Al-Khatib',
    role: 'Senior CS Educator & Researcher',
    bio: 'Former university faculty in algorithms and discrete structures. Curated pedagogical step traces, asymptotic proofs, and comparative divide-and-conquer models.',
    initials: 'RA',
    avatarColor: 'from-[#171717] to-[#2B2B2B] text-[#F5C542] border border-[#D4A72C]',
    githubUrl: 'https://github.com',
    linkedinUrl: 'https://linkedin.com'
  },
  {
    id: '3',
    name: 'Dalia M. Farouk',
    role: 'Full-Stack Systems Designer',
    bio: 'Architected the interactive SVG graph visualization engine, numerical data tokenizer, and multi-language compiler source code suites for all ten algorithms.',
    initials: 'DF',
    avatarColor: 'from-[#F5C542] to-[#E5B535] text-[#111111]',
    githubUrl: 'https://github.com',
    websiteUrl: 'https://example.com'
  }
];

export const TeamView: React.FC = () => {
  const [members, setMembers] = useState<TeamMember[]>(() => {
    const saved = localStorage.getItem('krd_team_members');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      } catch {
        return DEFAULT_TEAM_MEMBERS;
      }
    }
    return DEFAULT_TEAM_MEMBERS;
  });

  const [editingMember, setEditingMember] = useState<TeamMember | null>(null);
  const [isAddingNew, setIsAddingNew] = useState(false);

  const saveToLocalStorage = (updated: TeamMember[]) => {
    setMembers(updated);
    localStorage.setItem('krd_team_members', JSON.stringify(updated));
  };

  const handleResetDefaults = () => {
    saveToLocalStorage(DEFAULT_TEAM_MEMBERS);
    setEditingMember(null);
    setIsAddingNew(false);
  };

  const handleSaveMember = (member: TeamMember) => {
    if (isAddingNew) {
      const updated = [...members, member];
      saveToLocalStorage(updated);
      setIsAddingNew(false);
    } else {
      const updated = members.map((m) => (m.id === member.id ? member : m));
      saveToLocalStorage(updated);
      setEditingMember(null);
    }
  };

  const handleDeleteMember = (id: string) => {
    const updated = members.filter((m) => m.id !== id);
    saveToLocalStorage(updated);
    setEditingMember(null);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-10">
      {/* Simple, Clean Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E5E5E0] dark:border-[#282828]">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-1.5 h-4 bg-[#F5C542] rounded-xs" />
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-[#171717] dark:text-[#FAFAFA]">
              Meet the Team
            </h1>
          </div>
          <p className="text-xs text-[#737373] dark:text-[#A3A3A3]">
            The educators, engineers, and researchers behind KRD ALGORITHM.
          </p>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              setEditingMember({
                id: String(Date.now()),
                name: '',
                role: 'Algorithm Researcher',
                bio: '',
                initials: 'NM',
                avatarColor: 'from-[#F5C542] to-[#D4A72C] text-[#111111]',
                githubUrl: '',
                linkedinUrl: '',
                websiteUrl: ''
              });
              setIsAddingNew(true);
            }}
            className="px-3.5 py-1.5 rounded-lg bg-[#F5C542] hover:bg-[#e6b635] text-[#111111] font-bold text-xs flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Member</span>
          </button>

          <button
            onClick={handleResetDefaults}
            className="px-3 py-1.5 rounded-lg bg-white dark:bg-[#1E1E1E] hover:bg-[#F2F2ED] dark:hover:bg-[#282828] text-[#737373] dark:text-[#A3A3A3] hover:text-[#171717] dark:hover:text-[#FAFAFA] text-xs border border-[#E5E5E0] dark:border-[#2E2E2E] transition-colors flex items-center gap-1.5 cursor-pointer"
            title="Reset to default team profiles"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset</span>
          </button>
        </div>
      </div>

      {/* Clean, Simple Team Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {members.map((member) => (
          <div
            key={member.id}
            className="p-5 rounded-xl bg-white dark:bg-[#1E1E1E] border border-[#E5E5E0] dark:border-[#2E2E2E] shadow-xs flex flex-col justify-between transition-all"
          >
            <div className="space-y-3">
              {/* Avatar + Quick Edit Button */}
              <div className="flex items-start justify-between">
                <div
                  className={`w-11 h-11 rounded-lg bg-gradient-to-br ${member.avatarColor} flex items-center justify-center font-bold text-sm font-mono shadow-xs`}
                >
                  {member.initials}
                </div>

                <button
                  onClick={() => {
                    setEditingMember(member);
                    setIsAddingNew(false);
                  }}
                  className="p-1.5 rounded-lg text-[#888888] hover:text-[#171717] dark:hover:text-[#FAFAFA] hover:bg-[#F7F7F4] dark:hover:bg-[#282828] transition-colors cursor-pointer"
                  title="Edit member"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Name & Role */}
              <div>
                <h3 className="text-base font-bold text-[#171717] dark:text-[#FAFAFA]">
                  {member.name}
                </h3>
                <p className="text-xs font-semibold text-[#D4A72C] mt-0.5">
                  {member.role}
                </p>
              </div>

              {/* Biography */}
              <p className="text-xs text-[#525252] dark:text-[#CCCCCC] leading-relaxed">
                {member.bio}
              </p>
            </div>

            {/* Social / Portfolio Links Bar */}
            <div className="pt-3 mt-4 border-t border-[#F0F0EC] dark:border-[#282828] flex items-center justify-between text-xs">
              <div className="flex items-center gap-1.5">
                {member.githubUrl && (
                  <a
                    href={member.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="p-1.5 rounded-md text-[#737373] hover:text-[#171717] dark:hover:text-white hover:bg-[#F2F2ED] dark:hover:bg-[#282828] transition-colors"
                    title="GitHub"
                  >
                    <Github className="w-3.5 h-3.5" />
                  </a>
                )}
                {member.linkedinUrl && (
                  <a
                    href={member.linkedinUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="p-1.5 rounded-md text-[#737373] hover:text-[#171717] dark:hover:text-white hover:bg-[#F2F2ED] dark:hover:bg-[#282828] transition-colors"
                    title="LinkedIn"
                  >
                    <Linkedin className="w-3.5 h-3.5" />
                  </a>
                )}
                {member.websiteUrl && (
                  <a
                    href={member.websiteUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="p-1.5 rounded-md text-[#737373] hover:text-[#171717] dark:hover:text-white hover:bg-[#F2F2ED] dark:hover:bg-[#282828] transition-colors"
                    title="Portfolio / Website"
                  >
                    <Globe className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>

              <button
                onClick={() => {
                  setEditingMember(member);
                  setIsAddingNew(false);
                }}
                className="text-[11px] font-medium text-[#737373] dark:text-[#888888] hover:text-[#171717] dark:hover:text-[#FAFAFA] transition-colors cursor-pointer"
              >
                Edit
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Edit / Add Modal */}
      {editingMember && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="w-full max-w-md bg-white dark:bg-[#1E1E1E] rounded-xl border border-[#E5E5E0] dark:border-[#2E2E2E] shadow-xl p-5 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#F0F0EC] dark:border-[#282828]">
              <h3 className="font-bold text-sm text-[#171717] dark:text-[#FAFAFA]">
                {isAddingNew ? 'Add Team Member' : 'Edit Member Profile'}
              </h3>
              <button
                onClick={() => setEditingMember(null)}
                className="p-1 rounded-md text-[#737373] hover:text-[#171717] dark:hover:text-white cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-[#525252] dark:text-[#A3A3A3] mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  value={editingMember.name ?? ''}
                  onChange={(e) =>
                    setEditingMember({ ...editingMember, name: e.target.value })
                  }
                  className="w-full px-3 py-1.5 bg-[#F7F7F4] dark:bg-[#141414] border border-[#E5E5E0] dark:border-[#333333] rounded-lg text-[#171717] dark:text-[#FAFAFA]"
                />
              </div>

              <div>
                <label className="block font-semibold text-[#525252] dark:text-[#A3A3A3] mb-1">
                  Role / Specialization
                </label>
                <input
                  type="text"
                  value={editingMember.role ?? ''}
                  onChange={(e) =>
                    setEditingMember({ ...editingMember, role: e.target.value })
                  }
                  className="w-full px-3 py-1.5 bg-[#F7F7F4] dark:bg-[#141414] border border-[#E5E5E0] dark:border-[#333333] rounded-lg text-[#171717] dark:text-[#FAFAFA]"
                />
              </div>

              <div>
                <label className="block font-semibold text-[#525252] dark:text-[#A3A3A3] mb-1">
                  Initials (2 letters)
                </label>
                <input
                  type="text"
                  maxLength={2}
                  value={editingMember.initials ?? ''}
                  onChange={(e) =>
                    setEditingMember({ ...editingMember, initials: e.target.value.toUpperCase() })
                  }
                  className="w-16 px-3 py-1.5 font-mono uppercase bg-[#F7F7F4] dark:bg-[#141414] border border-[#E5E5E0] dark:border-[#333333] rounded-lg text-[#171717] dark:text-[#FAFAFA] text-center font-bold"
                />
              </div>

              <div>
                <label className="block font-semibold text-[#525252] dark:text-[#A3A3A3] mb-1">
                  Biography
                </label>
                <textarea
                  rows={3}
                  value={editingMember.bio ?? ''}
                  onChange={(e) =>
                    setEditingMember({ ...editingMember, bio: e.target.value })
                  }
                  className="w-full px-3 py-1.5 bg-[#F7F7F4] dark:bg-[#141414] border border-[#E5E5E0] dark:border-[#333333] rounded-lg text-[#171717] dark:text-[#FAFAFA]"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-semibold text-[#525252] dark:text-[#A3A3A3] mb-1">
                    GitHub URL
                  </label>
                  <input
                    type="text"
                    value={editingMember.githubUrl ?? ''}
                    onChange={(e) =>
                      setEditingMember({ ...editingMember, githubUrl: e.target.value })
                    }
                    placeholder="https://github.com/..."
                    className="w-full px-3 py-1.5 bg-[#F7F7F4] dark:bg-[#141414] border border-[#E5E5E0] dark:border-[#333333] rounded-lg text-[#171717] dark:text-[#FAFAFA]"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-[#525252] dark:text-[#A3A3A3] mb-1">
                    LinkedIn URL
                  </label>
                  <input
                    type="text"
                    value={editingMember.linkedinUrl ?? ''}
                    onChange={(e) =>
                      setEditingMember({ ...editingMember, linkedinUrl: e.target.value })
                    }
                    placeholder="https://linkedin.com/..."
                    className="w-full px-3 py-1.5 bg-[#F7F7F4] dark:bg-[#141414] border border-[#E5E5E0] dark:border-[#333333] rounded-lg text-[#171717] dark:text-[#FAFAFA]"
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-[#F0F0EC] dark:border-[#282828]">
              {!isAddingNew ? (
                <button
                  type="button"
                  onClick={() => handleDeleteMember(editingMember.id)}
                  className="text-xs text-rose-600 hover:text-rose-700 font-medium cursor-pointer"
                >
                  Delete
                </button>
              ) : <div />}

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setEditingMember(null)}
                  className="px-3 py-1.5 text-xs text-[#737373] hover:text-[#171717] cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => handleSaveMember(editingMember)}
                  className="px-4 py-1.5 text-xs font-bold rounded-lg bg-[#F5C542] hover:bg-[#e6b635] text-[#111111] flex items-center gap-1.5 shadow-xs cursor-pointer"
                >
                  <Save className="w-3.5 h-3.5" />
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
