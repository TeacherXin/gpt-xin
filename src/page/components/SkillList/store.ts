import { create } from 'zustand';

interface SkillStore {
    selectedSkill: 'picture' | '';
    setSelectedSkill: (skill: 'picture' | '') => void;
}

export const useSkillStore = create<SkillStore>((set) => ({
    selectedSkill: '',
    setSelectedSkill: (skill) => set({ selectedSkill: skill }),
}))