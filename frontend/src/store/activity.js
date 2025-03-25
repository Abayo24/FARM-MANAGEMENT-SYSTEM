import { create } from 'zustand';

export const useActivityStore = create((set) => ({
    activities: [],
    setActivities: (activities) => set({ activities }),
    createActivity: async (newActivity) => {
        if (!newActivity.description || !newActivity.date || !newActivity.crop) {
            return { success: false, message: 'Please fill all fields' };
        }
        const res = await fetch('/api/activities', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newActivity),
        });
        const data = await res.json();
        if (!data.success) return { success: false, message: data.message };

        set((state) => ({ activities: [...state.activities, data.data] }));
        return { success: true, message: 'Activity created successfully' };
    },
    fetchActivities: async () => {
        const res = await fetch('/api/activities');
        const data = await res.json();
        if (!data.success) return { success: false, message: data.message };

        set({ activities: data.data });
        return { success: true, message: 'Activities fetched successfully' };
    },
    deleteActivity: async (id) => {
        const res = await fetch(`/api/activities/${id}`, {
            method: 'DELETE',
        });
        const data = await res.json();
        if (!data.success) return { success: false, message: data.message };

        // Update the UI immediately, without needing a refresh
        set((state) => ({
            activities: state.activities.filter((activity) => activity._id !== id),
        }));
        return { success: true, message: data.message };
    },
    updateActivity: async (id, selectedActivity) => {
        const res = await fetch(`/api/activities/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(selectedActivity),
        });
        const data = await res.json();
        if (!data.success) return { success: false, message: data.message };

        // Update the UI immediately, without needing a refresh
        set((state) => ({
            activities: state.activities.map((activity) =>
                activity._id === id ? data.data : activity
            ),
        }));

        return { success: true, message: data.message };
    },
}));