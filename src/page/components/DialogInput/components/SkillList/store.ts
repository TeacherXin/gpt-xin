import { create } from 'zustand';

interface SkillStore {
    selectedSkill: 'picture' | 'html' | '';
    setSelectedSkill: (skill: 'picture' | 'html' | '') => void;
}

export const useSkillStore = create<SkillStore>((set) => ({
    selectedSkill: '',
    setSelectedSkill: (skill) => set({ selectedSkill: skill }),
}))